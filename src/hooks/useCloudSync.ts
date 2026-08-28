import { useCallback, useEffect, useRef, useState } from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore, type CustomPointLayer } from '../store/customPointLayerStore'
import { useLocalVondstenStore, type LocalVondst } from '../store/localVondstenStore'
import { useRouteRecordingStore, type RecordedRoute } from '../store/routeRecordingStore'
import {
  applyCloudSettings,
  getCloudSettings,
  useSettingsStore,
  type CloudSettings
} from '../store/settingsStore'
import {
  normalizePresetCollection,
  usePresetStore,
  type Preset
} from '../store/presetStore'

const SYNC_DEBOUNCE = 2000

type SyncStatus = 'signed-out' | 'connecting' | 'synced' | 'error'

interface CloudPresetState {
  presets: Preset[]
  customDefaults: Preset[] | null
}

interface SyncCounts {
  layers: number
  vondsten: number
  routes: number
}

export interface CloudSyncResult {
  success: boolean
  uploaded: SyncCounts
  downloaded: SyncCounts
  error?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getPresetCloudState(): CloudPresetState {
  const { presets, customDefaults } = usePresetStore.getState()

  // Strip optional undefined values because Firestore only accepts JSON-like data.
  return JSON.parse(JSON.stringify({ presets, customDefaults })) as CloudPresetState
}

function applyPresetCloudState(value: unknown): boolean {
  if (!isRecord(value) || !Array.isArray(value.presets)) return false

  const presets = normalizePresetCollection(value.presets as Preset[])
  const customDefaults = Array.isArray(value.customDefaults)
    ? normalizePresetCollection(value.customDefaults as Preset[])
    : null

  usePresetStore.setState({ presets, customDefaults })
  return true
}

function getFriendlySyncError(error: unknown): string {
  const code = isRecord(error) && typeof error.code === 'string' ? error.code : ''

  if (code === 'permission-denied' || code === 'firestore/permission-denied') {
    return 'Cloudtoegang geweigerd. De Firestore-beveiligingsregels moeten worden bijgewerkt.'
  }

  if (code === 'unavailable' || code === 'firestore/unavailable') {
    return 'Cloud tijdelijk niet bereikbaar. Je lokale gegevens blijven bewaard.'
  }

  return error instanceof Error ? error.message : 'Synchronisatie mislukt'
}

function mergeById<T extends { id: string }>(cloudItems: T[], localItems: T[]) {
  const cloudIds = new Set(cloudItems.map((item) => item.id))
  const localIds = new Set(localItems.map((item) => item.id))
  const newLocalItems = localItems.filter((item) => !cloudIds.has(item.id))
  const newCloudItems = cloudItems.filter((item) => !localIds.has(item.id))

  return {
    merged: [...cloudItems, ...newLocalItems],
    newLocalItems,
    newCloudItems
  }
}

async function waitForHydration(): Promise<void> {
  const stores = [
    useCustomPointLayerStore,
    useLocalVondstenStore,
    useRouteRecordingStore,
    useSettingsStore,
    usePresetStore
  ]

  await Promise.all(stores.map((store) => {
    if (store.persist.hasHydrated()) return Promise.resolve()

    return new Promise<void>((resolve) => {
      const unsubscribe = store.persist.onFinishHydration(() => {
        unsubscribe()
        resolve()
      })
    })
  }))
}

export function useCloudSync() {
  const user = useAuthStore(state => state.user)
  const layers = useCustomPointLayerStore(state => state.layers)
  const vondsten = useLocalVondstenStore(state => state.vondsten)
  const savedRoutes = useRouteRecordingStore(state => state.savedRoutes)
  const settingsState = useSettingsStore()
  const presetState = usePresetStore()

  const layerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const vondstTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const routeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settingsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const presetsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitialLoadRef = useRef(true)
  const lastSyncedLayersRef = useRef('')
  const lastSyncedVondstenRef = useRef('')
  const lastSyncedRoutesRef = useRef('')
  const lastSyncedSettingsRef = useRef('')
  const lastSyncedPresetsRef = useRef('')
  const [isHydrated, setIsHydrated] = useState(false)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('signed-out')
  const [syncError, setSyncError] = useState<string | null>(null)

  const reportSyncError = useCallback((error: unknown, label: string) => {
    const message = getFriendlySyncError(error)
    setSyncStatus('error')
    setSyncError(message)
    console.error(`❌ Fout bij synchroniseren ${label}:`, error)
    return message
  }, [])

  const markSynced = useCallback(() => {
    setSyncStatus('synced')
    setSyncError(null)
  }, [])

  useEffect(() => {
    waitForHydration().then(() => {
      setIsHydrated(true)
      console.log('💧 Stores gehydrateerd uit localStorage')
    })
  }, [])

  const syncLayersToCloud = useCallback(async (layersData: CustomPointLayer[]) => {
    if (!user) return false

    try {
      await setDoc(doc(db, 'users', user.uid), {
        layers: layersData,
        layersUpdatedAt: serverTimestamp()
      }, { merge: true })
      markSynced()
      console.log('☁️ Lagen gesynchroniseerd naar cloud')
      return true
    } catch (error) {
      reportSyncError(error, 'lagen')
      return false
    }
  }, [user, markSynced, reportSyncError])

  const syncVondstenToCloud = useCallback(async (vondstenData: LocalVondst[]) => {
    if (!user) return false

    try {
      await setDoc(doc(db, 'users', user.uid), {
        vondsten: vondstenData,
        vondstenUpdatedAt: serverTimestamp()
      }, { merge: true })
      markSynced()
      console.log('☁️ Vondsten gesynchroniseerd naar cloud')
      return true
    } catch (error) {
      reportSyncError(error, 'vondsten')
      return false
    }
  }, [user, markSynced, reportSyncError])

  const syncRoutesToCloud = useCallback(async (routesData: RecordedRoute[]) => {
    if (!user) return false

    try {
      await setDoc(doc(db, 'users', user.uid), {
        routes: routesData,
        routesUpdatedAt: serverTimestamp()
      }, { merge: true })
      markSynced()
      console.log('☁️ Routes gesynchroniseerd naar cloud')
      return true
    } catch (error) {
      reportSyncError(error, 'routes')
      return false
    }
  }, [user, markSynced, reportSyncError])

  const syncSettingsToCloud = useCallback(async (settings: CloudSettings) => {
    if (!user) return false

    try {
      await setDoc(doc(db, 'users', user.uid), {
        settings,
        settingsUpdatedAt: serverTimestamp()
      }, { merge: true })
      markSynced()
      console.log('☁️ Instellingen gesynchroniseerd naar cloud')
      return true
    } catch (error) {
      reportSyncError(error, 'instellingen')
      return false
    }
  }, [user, markSynced, reportSyncError])

  const syncPresetsToCloud = useCallback(async (presets: CloudPresetState) => {
    if (!user) return false

    try {
      await setDoc(doc(db, 'users', user.uid), {
        presetSettings: presets,
        presetsUpdatedAt: serverTimestamp()
      }, { merge: true })
      markSynced()
      console.log('☁️ Presets gesynchroniseerd naar cloud')
      return true
    } catch (error) {
      reportSyncError(error, 'presets')
      return false
    }
  }, [user, markSynced, reportSyncError])

  const loadFromCloud = useCallback(async () => {
    if (!user) return

    setSyncStatus('connecting')
    setSyncError(null)

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userDocRef)
      const localLayers = useCustomPointLayerStore.getState().layers
      const localVondsten = useLocalVondstenStore.getState().vondsten
      const localRoutes = useRouteRecordingStore.getState().savedRoutes
      const missingCloudData: Record<string, unknown> = {}

      if (docSnap.exists()) {
        const data = docSnap.data()

        if (Array.isArray(data.layers)) {
          const merged = mergeById(data.layers as CustomPointLayer[], localLayers).merged
          useCustomPointLayerStore.setState({ layers: merged })
          console.log(`☁️ ${data.layers.length} lagen geladen uit cloud`)
        } else {
          missingCloudData.layers = localLayers
          missingCloudData.layersUpdatedAt = serverTimestamp()
        }

        if (Array.isArray(data.vondsten)) {
          const merged = mergeById(data.vondsten as LocalVondst[], localVondsten).merged
          useLocalVondstenStore.setState({ vondsten: merged })
          console.log(`☁️ ${data.vondsten.length} vondsten geladen uit cloud`)
        } else {
          missingCloudData.vondsten = localVondsten
          missingCloudData.vondstenUpdatedAt = serverTimestamp()
        }

        if (Array.isArray(data.routes)) {
          const merged = mergeById(data.routes as RecordedRoute[], localRoutes).merged
          useRouteRecordingStore.setState({
            savedRoutes: merged,
            visibleRouteIds: new Set(merged.map((route) => route.id))
          })
          console.log(`☁️ ${data.routes.length} routes geladen uit cloud`)
        } else {
          missingCloudData.routes = localRoutes
          missingCloudData.routesUpdatedAt = serverTimestamp()
        }

        if (isRecord(data.settings)) {
          applyCloudSettings(data.settings as Partial<CloudSettings>)
          console.log('☁️ Instellingen geladen uit cloud')
        } else {
          missingCloudData.settings = getCloudSettings()
          missingCloudData.settingsUpdatedAt = serverTimestamp()
        }

        if (applyPresetCloudState(data.presetSettings)) {
          console.log('☁️ Presets geladen uit cloud')
        } else {
          missingCloudData.presetSettings = getPresetCloudState()
          missingCloudData.presetsUpdatedAt = serverTimestamp()
        }

        if (Object.keys(missingCloudData).length > 0) {
          await setDoc(userDocRef, missingCloudData, { merge: true })
        }
      } else {
        await setDoc(userDocRef, {
          layers: localLayers,
          vondsten: localVondsten,
          routes: localRoutes,
          settings: getCloudSettings(),
          presetSettings: getPresetCloudState(),
          layersUpdatedAt: serverTimestamp(),
          vondstenUpdatedAt: serverTimestamp(),
          routesUpdatedAt: serverTimestamp(),
          settingsUpdatedAt: serverTimestamp(),
          presetsUpdatedAt: serverTimestamp()
        })
        console.log('☁️ Eerste cloudkopie aangemaakt')
      }

      lastSyncedLayersRef.current = JSON.stringify(useCustomPointLayerStore.getState().layers)
      lastSyncedVondstenRef.current = JSON.stringify(useLocalVondstenStore.getState().vondsten)
      lastSyncedRoutesRef.current = JSON.stringify(useRouteRecordingStore.getState().savedRoutes)
      lastSyncedSettingsRef.current = JSON.stringify(getCloudSettings())
      lastSyncedPresetsRef.current = JSON.stringify(getPresetCloudState())
      markSynced()
    } catch (error) {
      reportSyncError(error, 'cloudgegevens')
    } finally {
      isInitialLoadRef.current = false
    }
  }, [user, markSynced, reportSyncError])

  useEffect(() => {
    if (!isHydrated) return

    if (user) {
      isInitialLoadRef.current = true
      loadFromCloud()
    } else {
      isInitialLoadRef.current = true
      lastSyncedLayersRef.current = ''
      lastSyncedVondstenRef.current = ''
      lastSyncedRoutesRef.current = ''
      lastSyncedSettingsRef.current = ''
      lastSyncedPresetsRef.current = ''
      setSyncStatus('signed-out')
      setSyncError(null)
    }
  }, [user?.uid, isHydrated, loadFromCloud])

  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return
    const serialized = JSON.stringify(layers)
    if (serialized === lastSyncedLayersRef.current) return

    if (layerTimeoutRef.current) clearTimeout(layerTimeoutRef.current)
    layerTimeoutRef.current = setTimeout(async () => {
      if (await syncLayersToCloud(layers)) lastSyncedLayersRef.current = serialized
    }, SYNC_DEBOUNCE)

    return () => {
      if (layerTimeoutRef.current) clearTimeout(layerTimeoutRef.current)
    }
  }, [user, isHydrated, layers, syncLayersToCloud])

  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return
    const serialized = JSON.stringify(vondsten)
    if (serialized === lastSyncedVondstenRef.current) return

    if (vondstTimeoutRef.current) clearTimeout(vondstTimeoutRef.current)
    vondstTimeoutRef.current = setTimeout(async () => {
      if (await syncVondstenToCloud(vondsten)) lastSyncedVondstenRef.current = serialized
    }, SYNC_DEBOUNCE)

    return () => {
      if (vondstTimeoutRef.current) clearTimeout(vondstTimeoutRef.current)
    }
  }, [user, isHydrated, vondsten, syncVondstenToCloud])

  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return
    const serialized = JSON.stringify(savedRoutes)
    if (serialized === lastSyncedRoutesRef.current) return

    if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current)
    routeTimeoutRef.current = setTimeout(async () => {
      if (await syncRoutesToCloud(savedRoutes)) lastSyncedRoutesRef.current = serialized
    }, SYNC_DEBOUNCE)

    return () => {
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current)
    }
  }, [user, isHydrated, savedRoutes, syncRoutesToCloud])

  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return
    const settings = getCloudSettings()
    const serialized = JSON.stringify(settings)
    if (serialized === lastSyncedSettingsRef.current) return

    if (settingsTimeoutRef.current) clearTimeout(settingsTimeoutRef.current)
    settingsTimeoutRef.current = setTimeout(async () => {
      if (await syncSettingsToCloud(settings)) lastSyncedSettingsRef.current = serialized
    }, SYNC_DEBOUNCE)

    return () => {
      if (settingsTimeoutRef.current) clearTimeout(settingsTimeoutRef.current)
    }
  }, [user, isHydrated, settingsState, syncSettingsToCloud])

  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return
    const presets = getPresetCloudState()
    const serialized = JSON.stringify(presets)
    if (serialized === lastSyncedPresetsRef.current) return

    if (presetsTimeoutRef.current) clearTimeout(presetsTimeoutRef.current)
    presetsTimeoutRef.current = setTimeout(async () => {
      if (await syncPresetsToCloud(presets)) lastSyncedPresetsRef.current = serialized
    }, SYNC_DEBOUNCE)

    return () => {
      if (presetsTimeoutRef.current) clearTimeout(presetsTimeoutRef.current)
    }
  }, [user, isHydrated, presetState, syncPresetsToCloud])

  const syncNow = useCallback(async (): Promise<CloudSyncResult> => {
    if (!user) {
      return {
        success: false,
        uploaded: { layers: 0, vondsten: 0, routes: 0 },
        downloaded: { layers: 0, vondsten: 0, routes: 0 },
        error: 'Niet ingelogd'
      }
    }

    setSyncStatus('connecting')
    setSyncError(null)

    try {
      const currentLayers = useCustomPointLayerStore.getState().layers
      const currentVondsten = useLocalVondstenStore.getState().vondsten
      const currentRoutes = useRouteRecordingStore.getState().savedRoutes
      const currentSettings = getCloudSettings()
      const currentPresets = getPresetCloudState()
      const userDocRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userDocRef)
      const cloudData = docSnap.exists() ? docSnap.data() : {}

      const layerMerge = mergeById((cloudData.layers || []) as CustomPointLayer[], currentLayers)
      const vondstMerge = mergeById((cloudData.vondsten || []) as LocalVondst[], currentVondsten)
      const routeMerge = mergeById((cloudData.routes || []) as RecordedRoute[], currentRoutes)

      useCustomPointLayerStore.setState({ layers: layerMerge.merged })
      useLocalVondstenStore.setState({ vondsten: vondstMerge.merged })
      useRouteRecordingStore.setState({
        savedRoutes: routeMerge.merged,
        visibleRouteIds: new Set(routeMerge.merged.map((route) => route.id))
      })

      const localSettingsChanged = lastSyncedSettingsRef.current === '' ||
        JSON.stringify(currentSettings) !== lastSyncedSettingsRef.current
      if (!localSettingsChanged && isRecord(cloudData.settings)) {
        applyCloudSettings(cloudData.settings as Partial<CloudSettings>)
      }

      const localPresetsChanged = lastSyncedPresetsRef.current === '' ||
        JSON.stringify(currentPresets) !== lastSyncedPresetsRef.current
      if (!localPresetsChanged) applyPresetCloudState(cloudData.presetSettings)

      const settingsToSync = getCloudSettings()
      const presetsToSync = getPresetCloudState()

      await setDoc(userDocRef, {
        layers: layerMerge.merged,
        vondsten: vondstMerge.merged,
        routes: routeMerge.merged,
        settings: settingsToSync,
        presetSettings: presetsToSync,
        layersUpdatedAt: serverTimestamp(),
        vondstenUpdatedAt: serverTimestamp(),
        routesUpdatedAt: serverTimestamp(),
        settingsUpdatedAt: serverTimestamp(),
        presetsUpdatedAt: serverTimestamp()
      }, { merge: true })

      lastSyncedLayersRef.current = JSON.stringify(layerMerge.merged)
      lastSyncedVondstenRef.current = JSON.stringify(vondstMerge.merged)
      lastSyncedRoutesRef.current = JSON.stringify(routeMerge.merged)
      lastSyncedSettingsRef.current = JSON.stringify(settingsToSync)
      lastSyncedPresetsRef.current = JSON.stringify(presetsToSync)
      markSynced()
      console.log('☁️ Handmatige sync voltooid, inclusief instellingen en presets')

      return {
        success: true,
        uploaded: {
          layers: layerMerge.newLocalItems.length,
          vondsten: vondstMerge.newLocalItems.length,
          routes: routeMerge.newLocalItems.length
        },
        downloaded: {
          layers: layerMerge.newCloudItems.length,
          vondsten: vondstMerge.newCloudItems.length,
          routes: routeMerge.newCloudItems.length
        }
      }
    } catch (error) {
      return {
        success: false,
        uploaded: { layers: 0, vondsten: 0, routes: 0 },
        downloaded: { layers: 0, vondsten: 0, routes: 0 },
        error: reportSyncError(error, 'handmatige synchronisatie')
      }
    }
  }, [user, markSynced, reportSyncError])

  return {
    isLoggedIn: !!user,
    syncStatus,
    syncError,
    syncLayersToCloud,
    syncVondstenToCloud,
    syncRoutesToCloud,
    syncNow
  }
}
