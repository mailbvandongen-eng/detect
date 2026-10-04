import { useAuthStore } from '../../store/authStore'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'
import { retryPhotoUploads, usePhotoUploadState } from '../../services/photoUploads'

export function PhotoUploadStatus() {
  const user = useAuthStore(state => state.user)
  const layers = useCustomPointLayerStore(state => state.layers)
  const state = usePhotoUploadState()
  const pending = layers.flatMap(layer => layer.points.flatMap(point => (point.photos || []).filter(photo => photo.pendingUpload && (!photo.uploadOwnerUid || photo.uploadOwnerUid === user?.uid))))
  if (!pending.length) return null
  const errors = state.uid === user?.uid ? [...new Set(Object.values(state.errors).map(error => error.message))] : []
  return <div className="rounded-lg p-2 text-sm my-2" style={{ color: 'var(--detect-window-text)', background: 'var(--detect-window-bg)', border: '1px solid var(--detect-accent)' }}>
    <p role="status">{pending.length} foto’s lokaal bewaard. {state.uid === user?.uid && state.busy ? 'Uploaden…' : !user ? 'Log in om ze te synchroniseren.' : !navigator.onLine ? 'Upload wacht op verbinding.' : 'Nog niet volledig gesynchroniseerd.'}</p>
    {errors.map(message => <p role="alert" key={message}>{message}</p>)}
    {user && <button type="button" disabled={state.busy || !navigator.onLine} onClick={() => void retryPhotoUploads(user.uid)} className="mt-1 underline" style={{ color: 'var(--detect-accent)' }}>Foto-upload opnieuw proberen</button>}
  </div>
}
