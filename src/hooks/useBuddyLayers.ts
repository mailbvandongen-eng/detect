import { useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore, type CustomPoint } from '../store/customPointLayerStore'
import { normalizeBuddyEmail, type BuddyLayerRecord } from '../services/buddyLayers'
import { upsertBuddyLayer } from '../utils/buddyLayerState'
import { useBuddySyncStore } from '../store/buddySyncStore'

export function useBuddyLayers() {
  const user = useAuthStore(state => state.user)
  const revision = useBuddySyncStore(state => state.revision)

  useEffect(() => {
    const refresh = () => useBuddySyncStore.getState().refresh()
    const onVisible = () => { if (document.visibilityState === 'visible') refresh() }
    window.addEventListener('online', refresh)
    window.addEventListener('pageshow', refresh)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('online', refresh)
      window.removeEventListener('pageshow', refresh)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  useEffect(() => {
    let active = true
    useBuddySyncStore.setState({ error: null })
    const reportError = (error: unknown) => {
      if (!active) return
      console.error('Buddy-lagen laden mislukt:', error)
      useBuddySyncStore.setState({ error: 'Buddy-lagen konden niet worden geladen. Probeer opnieuw.' })
    }
    if (!user?.email) {
      useCustomPointLayerStore.setState(state => ({
        layers: state.layers.filter(layer => !layer.buddyLayerId)
      }))
      return
    }

    const email = normalizeBuddyEmail(user.email)
    const pointUnsubs = new Map<string, () => void>()

    const q = query(
      collection(db, 'buddyLayers'),
      where('memberEmails', 'array-contains', email)
    )

    const metaUnsub = onSnapshot(q, { includeMetadataChanges: true }, snapshot => {
      if (!active) return
      useBuddySyncStore.setState({ error: null })
      const remoteIds = new Set(snapshot.docs.map(item => item.id))

      pointUnsubs.forEach((unsubscribe, buddyLayerId) => {
        if (!remoteIds.has(buddyLayerId)) {
          unsubscribe()
          pointUnsubs.delete(buddyLayerId)
        }
      })

      // An empty cache is not evidence that a freshly created layer was deleted.
      if (!snapshot.metadata.fromCache) {
        useCustomPointLayerStore.setState(state => ({
          layers: state.layers.filter(layer => !layer.buddyLayerId || remoteIds.has(layer.buddyLayerId))
        }))
      }

      snapshot.docs.forEach(item => {
        const data = item.data() as BuddyLayerRecord
        if (data.ready === false) return
        const buddyLayerId = item.id
        useCustomPointLayerStore.setState(state => ({
          layers: upsertBuddyLayer(state.layers, { ...data, id: buddyLayerId }, user.uid, email),
          deletedLayerIds: data.ownerUid === user.uid && data.sourceLayerId
            ? [...new Set([...(state.deletedLayerIds || []), data.sourceLayerId])]
            : state.deletedLayerIds,
        }))

        if (pointUnsubs.has(buddyLayerId)) return

        const unsubscribePoints = onSnapshot(
          collection(db, 'buddyLayers', buddyLayerId, 'points'),
          pointSnapshot => {
            if (!active) return
            const points = pointSnapshot.docs.map(pointDoc => {
              const raw = pointDoc.data() as CustomPoint
              return { ...raw, id: pointDoc.id } as CustomPoint
            })

            useCustomPointLayerStore.setState(state => ({
              layers: state.layers.map(layer =>
                layer.buddyLayerId === buddyLayerId ? { ...layer, points } : layer
              )
            }))
          },
          reportError
        )
        pointUnsubs.set(buddyLayerId, unsubscribePoints)
      })
    }, reportError)

    return () => {
      active = false
      metaUnsub()
      pointUnsubs.forEach(unsubscribe => unsubscribe())
    }
  }, [user, revision])
}
