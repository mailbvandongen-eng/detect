import { useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore, type CustomPoint, type CustomPointLayer } from '../store/customPointLayerStore'
import { normalizeBuddyEmail, type BuddyLayerRecord } from '../services/buddyLayers'

function localLayerId(buddyLayerId: string): string {
  return `buddy-${buddyLayerId}`
}

function roleFor(record: BuddyLayerRecord, uid: string, email: string): 'owner' | 'edit' | 'read' {
  if (record.ownerUid === uid) return 'owner'
  const normalized = normalizeBuddyEmail(email)
  if ((record.editEmails || []).map(normalizeBuddyEmail).includes(normalized)) return 'edit'
  return 'read'
}

export function useBuddyLayers() {
  const user = useAuthStore(state => state.user)

  useEffect(() => {
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

    const metaUnsub = onSnapshot(q, snapshot => {
      const remoteIds = new Set(snapshot.docs.map(item => item.id))

      pointUnsubs.forEach((unsubscribe, buddyLayerId) => {
        if (!remoteIds.has(buddyLayerId)) {
          unsubscribe()
          pointUnsubs.delete(buddyLayerId)
        }
      })

      useCustomPointLayerStore.setState(state => ({
        layers: state.layers.filter(layer => !layer.buddyLayerId || remoteIds.has(layer.buddyLayerId))
      }))

      snapshot.docs.forEach(item => {
        const data = item.data() as BuddyLayerRecord
        const buddyLayerId = item.id
        const id = localLayerId(buddyLayerId)
        const role = roleFor(data, user.uid, email)

        useCustomPointLayerStore.setState(state => {
          const existing = state.layers.find(layer => layer.buddyLayerId === buddyLayerId)
          const next: CustomPointLayer = {
            id,
            name: data.name || 'Buddy-laag',
            color: data.color || '#06b6d4',
            categories: existing?.categories || [],
            points: existing?.points || [],
            visible: existing?.visible ?? true,
            archived: false,
            createdAt: existing?.createdAt || new Date().toISOString(),
            buddyLayerId,
            buddyOwnerUid: data.ownerUid,
            buddyOwnerEmail: data.ownerEmail,
            buddyRole: role,
            buddyMemberEmails: data.memberEmails || [],
            buddyEditEmails: data.editEmails || [],
            buddyReadEmails: data.readEmails || [],
          }

          const without = state.layers.filter(layer => layer.buddyLayerId !== buddyLayerId)
          return { layers: [...without, next] }
        })

        if (pointUnsubs.has(buddyLayerId)) return

        const unsubscribePoints = onSnapshot(
          collection(db, 'buddyLayers', buddyLayerId, 'points'),
          pointSnapshot => {
            const points = pointSnapshot.docs.map(pointDoc => {
              const raw = pointDoc.data() as CustomPoint
              return { ...raw, id: pointDoc.id } as CustomPoint
            })

            useCustomPointLayerStore.setState(state => ({
              layers: state.layers.map(layer =>
                layer.buddyLayerId === buddyLayerId ? { ...layer, points } : layer
              )
            }))
          }
        )
        pointUnsubs.set(buddyLayerId, unsubscribePoints)
      })
    })

    return () => {
      metaUnsub()
      pointUnsubs.forEach(unsubscribe => unsubscribe())
    }
  }, [user])
}
