import { useEffect, useRef, useCallback, useState } from 'react'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore, type CustomPointLayer } from '../store/customPointLayerStore'
import { useLocalVondstenStore, type LocalVondst } from '../store/localVondstenStore'
import { useRouteRecordingStore, type RecordedRoute } from '../store/routeRecordingStore'

// Debounce time for syncing (ms)
const SYNC_DEBOUNCE = 2000

// Wait for all stores to hydrate from localStorage
async function waitForHydration(): Promise<void> {
  const stores = [
    useCustomPointLayerStore,
    useLocalVondstenStore,
    useRouteRecordingStore
  ]

  await Promise.all(stores.map(store => {
    // If already hydrated, resolve immediately
    if (store.persist.hasHydrated()) {
      return Promise.resolve()
    }
    // Otherwise wait for hydration
    return new Promise<void>(resolve => {
      const unsubscribe = store.persist.onFinishHydration(() => {
        unsubscribe()
        resolve()
      })
    })
  }))
}

export function useCloudSync() {
  const user = useAuthStore(state => state.user)
  const { layers, clearAll: clearLayers } = useCustomPointLayerStore()
  const { vondsten, clearAll: clearVondsten } = useLocalVondstenStore()
  const { savedRoutes } = useRouteRecordingStore()

  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoadRef = useRef(true)
  const lastSyncedLayersRef = useRef<string>('')
  const lastSyncedVondstenRef = useRef<string>('')
  const lastSyncedRoutesRef = useRef<string>('')
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait for hydration on mount
  useEffect(() => {
    waitForHydration().then(() => {
      setIsHydrated(true)
      console.log('💧 Stores gehydrateerd uit localStorage')
    })
  }, [])

  // Sync layers to Firestore
  const syncLayersToCloud = useCallback(async (layersData: CustomPointLayer[]) => {
    if (!user) return

    try {
      const userDocRef = doc(db, 'users', user.uid)
      await setDoc(userDocRef, {
        layers: layersData,
        layersUpdatedAt: serverTimestamp()
      }, { merge: true })

      console.log('☁️ Lagen gesynchroniseerd naar cloud')
    } catch (error) {
      console.error('❌ Fout bij synchroniseren lagen:', error)
    }
  }, [user])

  // Sync vondsten to Firestore
  const syncVondstenToCloud = useCallback(async (vondstenData: LocalVondst[]) => {
    if (!user) return

    try {
      const userDocRef = doc(db, 'users', user.uid)
      await setDoc(userDocRef, {
        vondsten: vondstenData,
        vondstenUpdatedAt: serverTimestamp()
      }, { merge: true })

      console.log('☁️ Vondsten gesynchroniseerd naar cloud')
    } catch (error) {
      console.error('❌ Fout bij synchroniseren vondsten:', error)
    }
  }, [user])

  // Sync routes to Firestore
  const syncRoutesToCloud = useCallback(async (routesData: RecordedRoute[]) => {
    if (!user) return

    try {
      const userDocRef = doc(db, 'users', user.uid)
      await setDoc(userDocRef, {
        routes: routesData,
        routesUpdatedAt: serverTimestamp()
      }, { merge: true })

      console.log('☁️ Routes gesynchroniseerd naar cloud')
    } catch (error) {
      console.error('❌ Fout bij synchroniseren routes:', error)
    }
  }, [user])

  // Load data from cloud on login
  const loadFromCloud = useCallback(async () => {
    if (!user) return

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userDocRef)

      if (docSnap.exists()) {
        const data = docSnap.data()

        // Load layers from cloud
        if (data.layers && Array.isArray(data.layers)) {
          const cloudLayers = data.layers as CustomPointLayer[]
          const localLayers = useCustomPointLayerStore.getState().layers

          // Merge: keep local layers that aren't in cloud, add cloud layers
          const mergedLayers = [...cloudLayers]

          // Add local layers that don't exist in cloud (by id)
          const cloudLayerIds = new Set(cloudLayers.map(l => l.id))
          localLayers.forEach(localLayer => {
            if (!cloudLayerIds.has(localLayer.id)) {
              mergedLayers.push(localLayer)
            }
          })

          // Update store with merged data
          useCustomPointLayerStore.setState({ layers: mergedLayers })
          lastSyncedLayersRef.current = JSON.stringify(mergedLayers)

          console.log(`☁️ ${cloudLayers.length} lagen geladen uit cloud`)
        }

        // Load vondsten from cloud
        if (data.vondsten && Array.isArray(data.vondsten)) {
          const cloudVondsten = data.vondsten as LocalVondst[]
          const localVondsten = useLocalVondstenStore.getState().vondsten

          // Merge: keep local vondsten that aren't in cloud
          const mergedVondsten = [...cloudVondsten]

          const cloudVondstIds = new Set(cloudVondsten.map(v => v.id))
          localVondsten.forEach(localVondst => {
            if (!cloudVondstIds.has(localVondst.id)) {
              mergedVondsten.push(localVondst)
            }
          })

          useLocalVondstenStore.setState({ vondsten: mergedVondsten })
          lastSyncedVondstenRef.current = JSON.stringify(mergedVondsten)

          console.log(`☁️ ${cloudVondsten.length} vondsten geladen uit cloud`)
        }

        // Load routes from cloud
        if (data.routes && Array.isArray(data.routes)) {
          const cloudRoutes = data.routes as RecordedRoute[]
          const localRoutes = useRouteRecordingStore.getState().savedRoutes

          // Merge: keep local routes that aren't in cloud
          const mergedRoutes = [...cloudRoutes]

          const cloudRouteIds = new Set(cloudRoutes.map(r => r.id))
          localRoutes.forEach(localRoute => {
            if (!cloudRouteIds.has(localRoute.id)) {
              mergedRoutes.push(localRoute)
            }
          })

          // Make all routes visible by default
          const allRouteIds = new Set(mergedRoutes.map(r => r.id))

          useRouteRecordingStore.setState({
            savedRoutes: mergedRoutes,
            visibleRouteIds: allRouteIds
          })
          lastSyncedRoutesRef.current = JSON.stringify(mergedRoutes)

          console.log(`☁️ ${cloudRoutes.length} routes geladen uit cloud`)
        }
      } else {
        // No cloud data yet, sync local data to cloud
        console.log('☁️ Geen cloud data gevonden, lokale data wordt gesynchroniseerd...')
        await syncLayersToCloud(layers)
        await syncVondstenToCloud(vondsten)
        await syncRoutesToCloud(savedRoutes)
      }

      isInitialLoadRef.current = false
    } catch (error) {
      console.error('❌ Fout bij laden uit cloud:', error)
      isInitialLoadRef.current = false
    }
  }, [user, layers, vondsten, savedRoutes, syncLayersToCloud, syncVondstenToCloud, syncRoutesToCloud])

  // Load from cloud when user logs in (after hydration)
  useEffect(() => {
    if (!isHydrated) return // Wait for localStorage hydration first

    if (user) {
      isInitialLoadRef.current = true
      loadFromCloud()
    } else {
      // Reset refs when user logs out
      isInitialLoadRef.current = true
      lastSyncedLayersRef.current = ''
      lastSyncedVondstenRef.current = ''
      lastSyncedRoutesRef.current = ''
    }
  }, [user?.uid, isHydrated]) // Trigger on user change AND when hydration completes

  // Sync layers when they change (debounced)
  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return

    const layersJson = JSON.stringify(layers)

    // Skip if data hasn't actually changed
    if (layersJson === lastSyncedLayersRef.current) return

    // Clear existing timeout
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current)
    }

    // Debounce sync
    syncTimeoutRef.current = setTimeout(() => {
      lastSyncedLayersRef.current = layersJson
      syncLayersToCloud(layers)
    }, SYNC_DEBOUNCE)

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current)
      }
    }
  }, [user, layers, syncLayersToCloud])

  // Sync vondsten when they change (debounced)
  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return

    const vondstenJson = JSON.stringify(vondsten)

    // Skip if data hasn't actually changed
    if (vondstenJson === lastSyncedVondstenRef.current) return

    // Clear existing timeout
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current)
    }

    // Debounce sync
    syncTimeoutRef.current = setTimeout(() => {
      lastSyncedVondstenRef.current = vondstenJson
      syncVondstenToCloud(vondsten)
    }, SYNC_DEBOUNCE)

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current)
      }
    }
  }, [user, vondsten, syncVondstenToCloud])

  // Sync routes when they change (debounced)
  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return

    const routesJson = JSON.stringify(savedRoutes)

    // Skip if data hasn't actually changed
    if (routesJson === lastSyncedRoutesRef.current) return

    // Clear existing timeout
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current)
    }

    // Debounce sync
    syncTimeoutRef.current = setTimeout(() => {
      lastSyncedRoutesRef.current = routesJson
      syncRoutesToCloud(savedRoutes)
    }, SYNC_DEBOUNCE)

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current)
      }
    }
  }, [user, savedRoutes, syncRoutesToCloud])

  return {
    isLoggedIn: !!user,
    syncLayersToCloud,
    syncVondstenToCloud,
    syncRoutesToCloud
  }
}
