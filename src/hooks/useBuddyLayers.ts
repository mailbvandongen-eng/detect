import { useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore, type CustomPoint } from '../store/customPointLayerStore'
import { normalizeBuddyEmail, type BuddyLayerRecord } from '../services/buddyLayers'
import { upsertBuddyLayer } from '../utils/buddyLayerState'
import { useBuddyWriteStore } from '../store/buddyWriteStore'
import { overlayBuddyPoints, overlayBuddyMetadata } from '../utils/buddyWrites'
import { useBuddySyncStore } from '../store/buddySyncStore'

export function useBuddyLayers() {
  const user = useAuthStore(state => state.user)
  const revision = useBuddySyncStore(state => state.revision)

  useEffect(() => {
    const refresh = () => useBuddySyncStore.getState().refresh()
    const onVisible = () => { if (document.visibilityState === 'visible') refresh() }
    window.addEventListener('detect-buddy-refresh', refresh)
    window.addEventListener('online', refresh)
    window.addEventListener('pageshow', refresh)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('detect-buddy-refresh', refresh)
      window.removeEventListener('online', refresh)
      window.removeEventListener('pageshow', refresh)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  useEffect(() => {
    let active = true
    const isCurrent = () => active && useAuthStore.getState().user?.uid === user?.uid
    useBuddySyncStore.setState({ error: null })
    const reportError = (error: unknown) => {
      if (!isCurrent()) return
      console.error('Buddy-lagen laden mislukt:', error)
      useBuddySyncStore.setState({ error: 'Buddy-lagen konden niet worden geladen. Probeer opnieuw.' })
    }
    if (!user?.email) {
      useCustomPointLayerStore.setState(state => ({
        layers: state.layers.filter(layer => !layer.buddyLayerId)
      }))
      return
    }

    // Shared layers themselves are cached by Firestore, while unacknowledged
    // drafts must also be recoverable without that cache after a cold start.
    const queued=useBuddyWriteStore.getState().items.filter(write=>write.uid===user.uid)
    useCustomPointLayerStore.setState(state=>{
      const layers=[...state.layers]
      for(const id of new Set(queued.map(write=>write.buddyLayerId))) {
        const writes=queued.filter(write=>write.buddyLayerId===id)
        if(writes.some(write=>write.mutation.kind==='deleteLayer')||layers.some(layer=>layer.buddyLayerId===id))continue
        layers.push(overlayBuddyMetadata({...writes[0].layer,points:overlayBuddyPoints([],writes)},writes))
      }
      return {layers}
    })
    const email = normalizeBuddyEmail(user.email)
    const pointUnsubs = new Map<string, () => void>()

    const q = query(
      collection(db, 'buddyLayers'),
      where('memberEmails', 'array-contains', email)
    )

    const metaUnsub = onSnapshot(q, { includeMetadataChanges: true }, snapshot => {
      if (!isCurrent()) return
      useBuddySyncStore.setState({ error: null })
      const remoteIds = new Set(snapshot.docs.filter(item=>!item.data().deleted&&!useBuddyWriteStore.getState().deletedBuddyIds.includes(item.id)&&!useBuddyWriteStore.getState().items.some(write=>write.uid===user.uid&&write.buddyLayerId===item.id&&write.mutation.kind==='deleteLayer')).map(item => item.id))

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
        if (data.ready === false || !remoteIds.has(item.id)) return
        const buddyLayerId = item.id
        useCustomPointLayerStore.setState(state => ({
          layers: upsertBuddyLayer(state.layers, { ...data, id: buddyLayerId }, user.uid, email).map(layer=>layer.buddyLayerId===buddyLayerId?overlayBuddyMetadata(layer,useBuddyWriteStore.getState().items.filter(write=>write.uid===user.uid&&write.buddyLayerId===buddyLayerId)):layer),
          deletedLayerIds: data.ownerUid === user.uid && data.sourceLayerId
            ? [...new Set([...(state.deletedLayerIds || []), data.sourceLayerId])]
            : state.deletedLayerIds,
        }))

        if (pointUnsubs.has(buddyLayerId)) return

        const unsubscribePoints = onSnapshot(
          collection(db, 'buddyLayers', buddyLayerId, 'points'),
          pointSnapshot => {
            if (!isCurrent()) return
            const points = pointSnapshot.docs.filter(pointDoc=>!pointDoc.data().deleted).map(pointDoc => {
              const {writeCursors:_cursors,updatedAt:_updated,deleted:_deleted,...raw}=pointDoc.data()
              return { ...raw, id: pointDoc.id } as CustomPoint
            })

            useCustomPointLayerStore.setState(state => ({
              layers: state.layers.map(layer =>
                layer.buddyLayerId === buddyLayerId ? { ...layer, points:overlayBuddyPoints(points,useBuddyWriteStore.getState().items.filter(write=>write.uid===user.uid&&write.buddyLayerId===buddyLayerId)) } : layer
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
