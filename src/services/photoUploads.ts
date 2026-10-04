import { create } from 'zustand'
import { getPhoto } from '../lib/photoStorage'
import { uploadPointPhoto } from '../lib/firebase'
import { useCustomPointLayerStore } from '../store/customPointLayerStore'
import { useAuthStore } from '../store/authStore'
import { accountPhotoKey, accountSession } from '../utils/accountStorage'

export const usePhotoUploadState = create<{ uid: string | null; busy: boolean; errors: Record<string, { message: string; retryable: boolean }> }>(() => ({ uid: null, busy: false, errors: {} }))
const flights = new Set<string>()
export function photoUploadError(error: unknown) {
  const code = (error as { code?: string })?.code || ''
  if (['storage/unauthorized', 'storage/bucket-not-found', 'storage/project-not-found', 'storage/unknown'].includes(code)) return { message: 'Foto-opslag is niet beschikbaar of toegang is geweigerd. Controleer de Firebase-opslag en regels. De foto blijft lokaal bewaard.', retryable: false }
  if (code === 'photo/local-missing') return { message: 'Het volledige fotobestand ontbreekt op dit apparaat. De bestaande miniatuur blijft bewaard. Voeg de originele foto opnieuw toe.', retryable: false }
  if (code === 'photo/metadata') return { message: 'Foto geüpload, maar de koppeling kon niet worden opgeslagen. Probeer opnieuw; het lokale bestand blijft bewaard.', retryable: false }
  return { message: 'Upload onderbroken. De foto blijft lokaal bewaard en wordt met verbinding opnieuw geprobeerd.', retryable: true }
}

export async function flushPhotoUploads(uid: string, retryAll = false) {
  if (flights.has(uid) || !navigator.onLine) return
  const session = accountSession(uid)
  const current = () => session() && useAuthStore.getState().ready && useAuthStore.getState().user?.uid === uid
  if (!current()) return
  flights.add(uid)
  if (usePhotoUploadState.getState().uid !== uid) usePhotoUploadState.setState({ uid, busy: false, errors: {} })
  usePhotoUploadState.setState({ busy: true })
  try {
    const layers = useCustomPointLayerStore.getState().layers
    for (const layer of layers) for (const point of layer.points) for (const photo of point.photos || []) {
      if (!current() || !navigator.onLine) return
      if (!photo.pendingUpload || layer.buddyRole === 'read' || (photo.uploadOwnerUid && photo.uploadOwnerUid !== uid)) continue
      const errorKey = `${layer.id}/${point.id}/${photo.id}`
      const previous = usePhotoUploadState.getState().errors[errorKey]
      if (previous && !retryAll) continue
      const attached = () => {
        if (!current() || !navigator.onLine) return false
        const live = useCustomPointLayerStore.getState().layers.find(item => item.id === layer.id)
        return !!live && live.buddyRole !== 'read' && !!live.points.find(item => item.id === point.id)?.photos?.some(item => item.id === photo.id && item.pendingUpload && (!item.uploadOwnerUid || item.uploadOwnerUid === uid))
      }
      try {
        const stored = await getPhoto(accountPhotoKey(photo.id))
        if (!attached()) continue
        if (!stored) {
          // A buddy's or another device's pending photo does not grant access to
          // the uploader's local file. Never manufacture a full image from it.
          throw Object.assign(new Error(), { code: 'photo/local-missing' })
        }
        if (!useCustomPointLayerStore.getState().updatePhotoInPoint(layer.id, point.id, photo.id, { uploadOwnerUid: uid })) throw Object.assign(new Error(), { code: 'photo/metadata' })
        const urls = await uploadPointPhoto(uid, layer.id, point.id, photo.id, stored, attached)
        if (!attached()) continue
        const saved = useCustomPointLayerStore.getState().updatePhotoInPoint(layer.id, point.id, photo.id, { ...urls, pendingUpload: false })
        if (!saved) throw Object.assign(new Error(), { code: 'photo/metadata' })
        usePhotoUploadState.setState(state => { const errors = { ...state.errors }; delete errors[errorKey]; return { errors } })
      } catch (error) {
        if (!attached()) continue
        usePhotoUploadState.setState(state => ({ errors: { ...state.errors, [errorKey]: photoUploadError(error) } }))
      }
    }
  } finally {
    flights.delete(uid)
    if (current()) usePhotoUploadState.setState({ busy: false })
  }
}

export function retryPhotoUploads(uid: string, transientOnly = false) {
  if (usePhotoUploadState.getState().uid === uid) usePhotoUploadState.setState(state => ({ errors: Object.fromEntries(Object.entries(state.errors).filter(([, error]) => transientOnly && !error.retryable)) }))
  return flushPhotoUploads(uid)
}
