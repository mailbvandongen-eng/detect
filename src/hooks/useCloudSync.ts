import { useCallback, useEffect, useRef, useState } from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore, type CustomPointLayer } from '../store/customPointLayerStore'
import { useCustomLayerStore } from '../store/customLayerStore'
import {
  getIncomingShares,
  materializeSharedOverlay,
  syncOwnedShares,
  syncRecipientOverlay,
} from '../services/sharedImportedLayers'
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
import { reconcilePointLayerDeletions } from '../utils/pointLayerCleanup'

const SYNC_DEBOUNCE = 2000

type SyncStatus = 'signed-out' | 'connecting' | 'synced' | 'error'

interface CloudPresetState {
  presets: Preset[]
  customDefaults: Preset[] | null
  updatedAt: number
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
  const { presets, customDefaults, updatedAt } = usePresetStore.getState()

  // Strip optional undefined values because Firestore only accepts JSON-like data.
  return JSON.parse(JSON.stringify({ presets, customDefaults, updatedAt })) as CloudPresetState
}

function applyPresetCloudState(value: unknown): boolean {
  if (!isRecord(value) || !Array.isArray(value.presets)) return false

  const presets = normalizePresetCollection(value.presets as Preset[])
  const customDefaults = Array.isArray(value.customDefaults)
    ? normalizePresetCollection(value.customDefaults as Preset[])
    : null

  const updatedAt = typeof value.updatedAt === 'number' ? value.updatedAt : 0
  usePresetStore.setState({ presets, customDefaults, updatedAt })
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
    useCustomLayerStore,
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
  const deletedLayerIds = useCustomPointLayerStore(state => state.deletedLayerIds)
  const importedLayers = useCustomLayerStore(state => state.layers)
  const layerCleanupVersion = useCustomPointLayerStore(state => state.layerCleanupVersion)
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

  const refreshSharedOverlays = useCallback(async () => {
    if (!user?.email) return

    const incoming = await getIncomingShares(user.email)
    const localImported = useCustomLayerStore.getState().layers
    const pointState = useCustomPointLayerStore.getState()
    const ownPointLayers = pointState.layers.filter(layer => !layer.shareId)

    const sharedOverlays = incoming.flatMap(record => {
      const imported = localImported.find(layer => layer.contentHash === record.layerHash)
      if (!imported) return []
      const overlay = materializeSharedOverlay(record, imported.id)
      return overlay ? [overlay] : []
    })

    useCustomPointLayerStore.setState({
      layers: [...ownPointLayers, ...sharedOverlays]
    })
  }, [user])

  const syncLayersToCloud = useCallback(async (layersData: CustomPointLayer[]) => {
    if (!user) return false

    try {
      const sharedLayers = layersData.filter(layer => !!layer.shareId)
      const ownLayers = layersData.filter(layer => !layer.shareId)

      for (const sharedLayer of sharedLayers) {
        if (sharedLayer.sharePermission === 'edit') {
          await syncRecipientOverlay(user, sharedLayer)
        }
      }

      await syncOwnedShares(user)

      const pointLayerState = useCustomPointLayerStore.getState()
      await setDoc(doc(db, 'users', user.uid), {
        layers: ownLayers,
        deletedLayerIds: pointLayerState.deletedLayerIds,
        layerCleanupVersion: pointLayerState.layerCleanupVersion,
        layersUpdatedAt: serverTimestamp()
      }, { merge: true })
      markSynced()
      console.log('☁️ Eigen lagen en gedeelde punten gesynchroniseerd')
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
      const allLocalLayers = useCustomPointLayerStore.getState().layers
      const localLayers = allLocalLayers.filter(layer => !layer.shareId)
      const localDeletedLayerIds = useCustomPointLayerStore.getState().deletedLayerIds
      const localLayerCleanupVersion = useCustomPointLayerStore.getState().layerCleanupVersion
      const localVondsten = useLocalVondstenStore.getState().vondsten
      const localRoutes = useRouteRecordingStore.getState().savedRoutes
      const missingCloudData: Record<string, unknown> = {}

      if (docSnap.exists()) {
        const data = docSnap.data()

        if (Array.isArray(data.layers)) {
          const cloudDeletedLayerIds = Array.isArray(data.deletedLayerIds)
            ? data.deletedLayerIds.filter((id): id is string => typeof id === 'string')
            : []
          const cloudCleanupVersion = typeof data.layerCleanupVersion === 'number'
            ? data.layerCleanupVersion
            : 0
          const cloudOwnLayers = (data.layers as CustomPointLayer[]).filter(layer => !layer.shareId)
          const rawMerged = mergeById(cloudOwnLayers, localLayers).merged
          const reconciled = reconcilePointLayerDeletions(
            rawMerged,
            [...cloudDeletedLayerIds, ...localDeletedLayerIds],
            cloudCleanupVersion
          )
          useCustomPointLayerStore.setState({
            layers: reconciled.layers,
            deletedLayerIds: reconciled.deletedLayerIds,
            layerCleanupVersion: reconciled.cleanupVersion,
          })
          console.log(`☁️ ${data.layers.length} lagen geladen uit cloud`)

          if (
            JSON.stringify(data.layers) !== JSON.stringify(reconciled.layers) ||
            JSON.stringify(cloudDeletedLayerIds) !== JSON.stringify(reconciled.deletedLayerIds) ||
            cloudCleanupVersion !== reconciled.cleanupVersion
          ) {
            missingCloudData.layers = reconciled.layers
            missingCloudData.deletedLayerIds = reconciled.deletedLayerIds
            missingCloudData.layerCleanupVersion = reconciled.cleanupVersion
            missingCloudData.layersUpdatedAt = serverTimestamp()
          }
        } else {
          missingCloudData.layers = localLayers
          missingCloudData.deletedLayerIds = localDeletedLayerIds
          missingCloudData.layerCleanupVersion = localLayerCleanupVersion
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

        const localPresetSettings = getPresetCloudState()
        const cloudPresetSettings = isRecord(data.presetSettings) && Array.isArray(data.presetSettings.presets)
          ? data.presetSettings
          : null
        const cloudPresetUpdatedAt = cloudPresetSettings && typeof cloudPresetSettings.updatedAt === 'number'
          ? cloudPresetSettings.updatedAt
          : 0

        if (cloudPresetSettings && (cloudPresetUpdatedAt > localPresetSettings.updatedAt || localPresetSettings.updatedAt === 0)) {
          applyPresetCloudState(cloudPresetSettings)
          console.log('☁️ Nieuwere presets geladen uit cloud')
          const repairedPresetSettings = getPresetCloudState()
          if (JSON.stringify(data.presetSettings) !== JSON.stringify(repairedPresetSettings)) {
            missingCloudData.presetSettings = repairedPresetSettings
            missingCloudData.presetsUpdatedAt = serverTimestamp()
          }
        } else {
          missingCloudData.presetSettings = localPresetSettings
          missingCloudData.presetsUpdatedAt = serverTimestamp()
          if (localPresetSettings.updatedAt > cloudPresetUpdatedAt) {
            console.log('☁️ Lokale presetwijzigingen zijn nieuwer en worden naar cloud gestuurd')
          }
        }

        if (Object.keys(missingCloudData).length > 0) {
          await setDoc(userDocRef, missingCloudData, { merge: true })
        }
      } else {
        await setDoc(userDocRef, {
          layers: localLayers,
          deletedLayerIds: localDeletedLayerIds,
          layerCleanupVersion: localLayerCleanupVersion,
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

      await refreshSharedOverlays()

      const syncedPointLayerState = useCustomPointLayerStore.getState()
      lastSyncedLayersRef.current = JSON.stringify({
        layers: syncedPointLayerState.layers,
        deletedLayerIds: syncedPointLayerState.deletedLayerIds,
        layerCleanupVersion: syncedPointLayerState.layerCleanupVersion,
      })
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
  }, [user, markSynced, reportSyncError, refreshSharedOverlays])

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
    const serialized = JSON.stringify({ layers, deletedLayerIds, layerCleanupVersion })
    if (serialized === lastSyncedLayersRef.current) return

    if (layerTimeoutRef.current) clearTimeout(layerTimeoutRef.current)
    layerTimeoutRef.current = setTimeout(async () => {
      if (await syncLayersToCloud(layers)) lastSyncedLayersRef.current = serialized
    }, SYNC_DEBOUNCE)

    return () => {
      if (layerTimeoutRef.current) clearTimeout(layerTimeoutRef.current)
    }
  }, [user, isHydrated, layers, deletedLayerIds, layerCleanupVersion, syncLayersToCloud])

  useEffect(() => {
    if (!user || !isHydrated || isInitialLoadRef.current) return
    void refreshSharedOverlays()
  }, [user, isHydrated, importedLayers, refreshSharedOverlays])

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
      const allCurrentLayers = useCustomPointLayerStore.getState().layers
      for (const sharedLayer of allCurrentLayers.filter(layer => layer.shareId && layer.sharePermission === 'edit')) {
        await syncRecipientOverlay(user, sharedLayer)
      }
      await syncOwnedShares(user)

      const currentLayers = allCurrentLayers.filter(layer => !layer.shareId)
      const currentDeletedLayerIds = useCustomPointLayerStore.getState().deletedLayerIds
      const currentVondsten = useLocalVondstenStore.getState().vondsten
      const currentRoutes = useRouteRecordingStore.getState().savedRoutes
      const currentSettings = getCloudSettings()
      const currentPresets = getPresetCloudState()
      const userDocRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userDocRef)
      const cloudData = docSnap.exists() ? docSnap.data() : {}

      const cloudLayers = Array.isArray(cloudData.layers)
        ? (cloudData.layers as CustomPointLayer[]).filter(layer => !layer.shareId)
        : []
      const cloudDeletedLayerIds = Array.isArray(cloudData.deletedLayerIds)
        ? cloudData.deletedLayerIds.filter((id): id is string => typeof id === 'string')
        : []
      const cloudCleanupVersion = typeof cloudData.layerCleanupVersion === 'number'
        ? cloudData.layerCleanupVersion
        : 0
      const layerMerge = mergeById(cloudLayers, currentLayers)
      const reconciledLayers = reconcilePointLayerDeletions(
        layerMerge.merged,
        [...cloudDeletedLayerIds, ...currentDeletedLayerIds],
        cloudCleanupVersion
      )
      const vondstMerge = mergeById((cloudData.vondsten || []) as LocalVondst[], currentVondsten)
      const routeMerge = mergeById((cloudData.routes || []) as RecordedRoute[], currentRoutes)

      useCustomPointLayerStore.setState({
        layers: reconciledLayers.layers,
        deletedLayerIds: reconciledLayers.deletedLayerIds,
        layerCleanupVersion: reconciledLayers.cleanupVersion,
      })
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
        layers: reconciledLayers.layers,
        deletedLayerIds: reconciledLayers.deletedLayerIds,
        layerCleanupVersion: reconciledLayers.cleanupVersion,
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

      await refreshSharedOverlays()
      const finalPointLayerState = useCustomPointLayerStore.getState()

      lastSyncedLayersRef.current = JSON.stringify({
        layers: finalPointLayerState.layers,
        deletedLayerIds: finalPointLayerState.deletedLayerIds,
        layerCleanupVersion: finalPointLayerState.layerCleanupVersion,
      })
      lastSyncedVondstenRef.current = JSON.stringify(vondstMerge.merged)
      lastSyncedRoutesRef.current = JSON.stringify(routeMerge.merged)
      lastSyncedSettingsRef.current = JSON.stringify(settingsToSync)
      lastSyncedPresetsRef.current = JSON.stringify(presetsToSync)
      markSynced()
      console.log('☁️ Handmatige sync voltooid, inclusief gedeelde punten')

      return {
        success: true,
        uploaded: {
          layers: layerMerge.newLocalItems.filter(item =>
            reconciledLayers.layers.some(layer => layer.id === item.id)
          ).length,
          vondsten: vondstMerge.newLocalItems.length,
          routes: routeMerge.newLocalItems.length
        },
        downloaded: {
          layers: layerMerge.newCloudItems.filter(item =>
            reconciledLayers.layers.some(layer => layer.id === item.id)
          ).length,
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
  }, [user, markSynced, reportSyncError, refreshSharedOverlays])

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
