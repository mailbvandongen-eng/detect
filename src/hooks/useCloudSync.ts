import { useCallback, useEffect, useRef, useState } from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore, type CustomPointLayer } from '../store/customPointLayerStore'
import { useCustomLayerStore, type CustomLayer } from '../store/customLayerStore'
import {
  deleteImportedLayerPayload,
  downloadImportedLayerPayload,
  uploadImportedLayerPayload,
  type CloudImportedLayerMetadata
} from '../services/importedLayerCloud'
import {
  downloadSharedLayer,
  getIncomingShares,
  getOwnedShares,
  getSharedOverlayLayer,
  shareImportedLayer,
  syncEditedSharedLayer,
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

  if (code === 'storage/unauthorized') {
    return 'Opslagtoegang voor geïmporteerde lagen is geweigerd. Firebase Storage-regels moeten toegang tot je eigen gebruikersmap toestaan.'
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
  const deletedImportedLayerIds = useCustomLayerStore(state => state.deletedLayerIds)
  const layerCleanupVersion = useCustomPointLayerStore(state => state.layerCleanupVersion)
  const vondsten = useLocalVondstenStore(state => state.vondsten)
  const savedRoutes = useRouteRecordingStore(state => state.savedRoutes)
  const settingsState = useSettingsStore()
  const presetState = usePresetStore()

  const layerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const importedLayerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const vondstTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const routeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settingsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const presetsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitialLoadRef = useRef(true)
  const lastSyncedLayersRef = useRef('')
  const lastSyncedImportedLayersRef = useRef('')
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


  const reconcileImportedLayers = useCallback(async (
    cloudMetadata: CloudImportedLayerMetadata[],
    localLayers: CustomLayer[],
    deletedIds: string[]
  ) => {
    if (!user) return { layers: localLayers, metadata: cloudMetadata, uploaded: 0, downloaded: 0 }

    const deleted = new Set(deletedIds)
    const sharedLocalLayers = localLayers.filter(layer => !!layer.shareId)
    const ownLocalLayers = localLayers.filter(layer => !layer.shareId)
    const cloudById = new Map(cloudMetadata.filter(meta => !deleted.has(meta.id)).map(meta => [meta.id, meta]))
    const localById = new Map(ownLocalLayers.filter(layer => !deleted.has(layer.id)).map(layer => [layer.id, layer]))
    const nextLayers = [...localById.values()]
    const nextMetadata = new Map<string, CloudImportedLayerMetadata>()
    let uploaded = 0
    let downloaded = 0

    for (const meta of cloudById.values()) {
      if (localById.has(meta.id)) continue
      try {
        const downloadedLayer = await downloadImportedLayerPayload(user.uid, meta)
        nextLayers.push(downloadedLayer)
        localById.set(downloadedLayer.id, downloadedLayer)
        nextMetadata.set(meta.id, meta)
        downloaded += 1
      } catch (error) {
        reportSyncError(error, `geïmporteerde laag ${meta.name}`)
      }
    }

    for (const layer of nextLayers) {
      const cloud = cloudById.get(layer.id)
      const needsUpload = !cloud || !layer.contentHash || cloud.contentHash !== layer.contentHash
      if (needsUpload) {
        const metadata = await uploadImportedLayerPayload(user.uid, layer)
        nextMetadata.set(layer.id, metadata)
        if (layer.contentHash !== metadata.contentHash) {
          layer.contentHash = metadata.contentHash
        }
        uploaded += 1
      } else {
        nextMetadata.set(layer.id, {
          ...cloud,
          name: layer.name,
          visible: layer.visible,
          opacity: layer.opacity,
          color: layer.color,
          style: layer.style,
          popupConfig: layer.popupConfig,
          sourceFileName: layer.sourceFileName,
        })
      }
    }

    for (const id of deleted) {
      if (cloudById.has(id)) {
        await deleteImportedLayerPayload(user.uid, id)
      }
      nextMetadata.delete(id)
    }

    return {
      layers: [...nextLayers.filter(layer => !deleted.has(layer.id)), ...sharedLocalLayers],
      metadata: [...nextMetadata.values()],
      uploaded,
      downloaded
    }
  }, [user, reportSyncError])


  const refreshSharedImportedLayers = useCallback(async () => {
    if (!user?.email) return

    const importedStore = useCustomLayerStore.getState()
    const pointStore = useCustomPointLayerStore.getState()
    let ownLayers = importedStore.layers.filter(layer => !layer.shareId)
    let ownPointLayers = pointStore.layers.filter(layer => !layer.shareId)

    const incomingRecords = await getIncomingShares(user.email)
    const incomingLayers = await Promise.all(incomingRecords.map(downloadSharedLayer))
    const incomingOverlays = incomingRecords
      .map(getSharedOverlayLayer)
      .filter((layer): layer is CustomPointLayer => !!layer)

    const ownedShares = await getOwnedShares(user.uid)
    for (const record of ownedShares) {
      const index = ownLayers.findIndex(layer => layer.id === record.layerId)
      if (index >= 0) {
        const local = ownLayers[index]
        if (record.contentHash !== local.contentHash) {
          const edited = await downloadSharedLayer(record)
          ownLayers[index] = {
            ...local,
            name: edited.name,
            features: edited.features,
            visible: edited.visible,
            opacity: edited.opacity,
            color: edited.color,
            style: edited.style,
            popupConfig: edited.popupConfig,
            sourceFileName: edited.sourceFileName,
            contentHash: edited.contentHash,
          }
        }
      }

      if (record.overlayLayer) {
        const overlayIndex = ownPointLayers.findIndex(
          layer => layer.linkedImportedLayerId === record.layerId
        )
        if (overlayIndex >= 0) {
          ownPointLayers[overlayIndex] = {
            ...record.overlayLayer,
            linkedImportedLayerId: record.layerId,
          }
        } else {
          ownPointLayers.push({
            ...record.overlayLayer,
            linkedImportedLayerId: record.layerId,
          })
        }
      }
    }

    useCustomLayerStore.setState({
      layers: [...ownLayers, ...incomingLayers],
    })
    useCustomPointLayerStore.setState({
      layers: [...ownPointLayers, ...incomingOverlays],
    })
  }, [user])

  const syncImportedLayersToCloud = useCallback(async () => {
    if (!user) return false

    try {
      const sharedEditableLayers = useCustomLayerStore.getState().layers.filter(
        layer => layer.shareId && layer.sharePermission === 'edit'
      )
      for (const layer of sharedEditableLayers) {
        await syncEditedSharedLayer(user, layer)
      }

      const userDocRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userDocRef)
      const cloudData = docSnap.exists() ? docSnap.data() : {}
      const cloudMetadata = Array.isArray(cloudData.importedLayers)
        ? cloudData.importedLayers as CloudImportedLayerMetadata[]
        : []
      const localState = useCustomLayerStore.getState()
      const reconciled = await reconcileImportedLayers(
        cloudMetadata,
        localState.layers,
        localState.deletedLayerIds
      )

      useCustomLayerStore.setState({ layers: reconciled.layers })
      await setDoc(userDocRef, {
        importedLayers: reconciled.metadata,
        deletedImportedLayerIds: localState.deletedLayerIds,
        importedLayersUpdatedAt: serverTimestamp()
      }, { merge: true })

      lastSyncedImportedLayersRef.current = JSON.stringify({
        layers: reconciled.layers,
        deletedLayerIds: localState.deletedLayerIds
      })
      markSynced()
      return true
    } catch (error) {
      reportSyncError(error, 'geïmporteerde lagen')
      return false
    }
  }, [user, reconcileImportedLayers, markSynced, reportSyncError])

  const syncLayersToCloud = useCallback(async (layersData: CustomPointLayer[]) => {
    if (!user) return false

    try {
      const sharedPointLayers = layersData.filter(layer => !!layer.shareId)
      const ownPointLayers = layersData.filter(layer => !layer.shareId)

      for (const sharedPointLayer of sharedPointLayers) {
        if (sharedPointLayer.sharePermission !== 'edit') continue
        const importedLayer = useCustomLayerStore.getState().layers.find(
          layer => layer.id === sharedPointLayer.linkedImportedLayerId && layer.shareId === sharedPointLayer.shareId
        )
        if (importedLayer) await syncEditedSharedLayer(user, importedLayer)
      }

      const ownedShares = await getOwnedShares(user.uid)
      const importedLayersState = useCustomLayerStore.getState().layers
      for (const share of ownedShares) {
        const importedLayer = importedLayersState.find(
          layer => layer.id === share.layerId && !layer.shareId
        )
        if (importedLayer) {
          await shareImportedLayer(user, importedLayer, share.recipientEmail, share.permission)
        }
      }

      const pointLayerState = useCustomPointLayerStore.getState()
      await setDoc(doc(db, 'users', user.uid), {
        layers: ownPointLayers,
        deletedLayerIds: pointLayerState.deletedLayerIds,
        layerCleanupVersion: pointLayerState.layerCleanupVersion,
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
      const localImportedState = useCustomLayerStore.getState()
      const localDeletedLayerIds = useCustomPointLayerStore.getState().deletedLayerIds
      const localLayerCleanupVersion = useCustomPointLayerStore.getState().layerCleanupVersion
      const localVondsten = useLocalVondstenStore.getState().vondsten
      const localRoutes = useRouteRecordingStore.getState().savedRoutes
      const missingCloudData: Record<string, unknown> = {}

      if (docSnap.exists()) {
        const data = docSnap.data()


        const cloudImportedMetadata = Array.isArray(data.importedLayers)
          ? data.importedLayers as CloudImportedLayerMetadata[]
          : []
        const cloudDeletedImportedLayerIds = Array.isArray(data.deletedImportedLayerIds)
          ? data.deletedImportedLayerIds.filter((id): id is string => typeof id === 'string')
          : []
        const mergedDeletedImportedLayerIds = [...new Set([
          ...cloudDeletedImportedLayerIds,
          ...localImportedState.deletedLayerIds
        ])]
        const reconciledImported = await reconcileImportedLayers(
          cloudImportedMetadata,
          localImportedState.layers,
          mergedDeletedImportedLayerIds
        )
        useCustomLayerStore.setState({
          layers: reconciledImported.layers,
          deletedLayerIds: mergedDeletedImportedLayerIds
        })
        missingCloudData.importedLayers = reconciledImported.metadata
        missingCloudData.deletedImportedLayerIds = mergedDeletedImportedLayerIds
        missingCloudData.importedLayersUpdatedAt = serverTimestamp()

        if (Array.isArray(data.layers)) {
          const cloudDeletedLayerIds = Array.isArray(data.deletedLayerIds)
            ? data.deletedLayerIds.filter((id): id is string => typeof id === 'string')
            : []
          const cloudCleanupVersion = typeof data.layerCleanupVersion === 'number'
            ? data.layerCleanupVersion
            : 0
          const rawMerged = mergeById(data.layers as CustomPointLayer[], localLayers).merged
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

        if (applyPresetCloudState(data.presetSettings)) {
          console.log('☁️ Presets geladen uit cloud')
          const repairedPresetSettings = getPresetCloudState()
          if (JSON.stringify(data.presetSettings) !== JSON.stringify(repairedPresetSettings)) {
            missingCloudData.presetSettings = repairedPresetSettings
            missingCloudData.presetsUpdatedAt = serverTimestamp()
          }
        } else {
          missingCloudData.presetSettings = getPresetCloudState()
          missingCloudData.presetsUpdatedAt = serverTimestamp()
        }

        if (Object.keys(missingCloudData).length > 0) {
          await setDoc(userDocRef, missingCloudData, { merge: true })
        }
      } else {
        const initialImported = await reconcileImportedLayers(
          [],
          localImportedState.layers,
          localImportedState.deletedLayerIds
        )
        useCustomLayerStore.setState({
          layers: initialImported.layers,
          deletedLayerIds: localImportedState.deletedLayerIds
        })
        await setDoc(userDocRef, {
          layers: localLayers,
          deletedLayerIds: localDeletedLayerIds,
          importedLayers: initialImported.metadata,
          deletedImportedLayerIds: localImportedState.deletedLayerIds,
          layerCleanupVersion: localLayerCleanupVersion,
          vondsten: localVondsten,
          routes: localRoutes,
          settings: getCloudSettings(),
          presetSettings: getPresetCloudState(),
          layersUpdatedAt: serverTimestamp(),
          importedLayersUpdatedAt: serverTimestamp(),
          vondstenUpdatedAt: serverTimestamp(),
          routesUpdatedAt: serverTimestamp(),
          settingsUpdatedAt: serverTimestamp(),
          presetsUpdatedAt: serverTimestamp()
        })
        console.log('☁️ Eerste cloudkopie aangemaakt')
      }

      await refreshSharedImportedLayers()

      const syncedPointLayerState = useCustomPointLayerStore.getState()
      const syncedImportedState = useCustomLayerStore.getState()
      lastSyncedImportedLayersRef.current = JSON.stringify({
        layers: syncedImportedState.layers,
        deletedLayerIds: syncedImportedState.deletedLayerIds,
      })
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
  }, [user, markSynced, reportSyncError, reconcileImportedLayers, refreshSharedImportedLayers])

  useEffect(() => {
    if (!isHydrated) return

    if (user) {
      isInitialLoadRef.current = true
      loadFromCloud()
    } else {
      isInitialLoadRef.current = true
      lastSyncedLayersRef.current = ''
      lastSyncedImportedLayersRef.current = ''
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
    const serialized = JSON.stringify({ layers: importedLayers, deletedLayerIds: deletedImportedLayerIds })
    if (serialized === lastSyncedImportedLayersRef.current) return

    if (importedLayerTimeoutRef.current) clearTimeout(importedLayerTimeoutRef.current)
    importedLayerTimeoutRef.current = setTimeout(async () => {
      await syncImportedLayersToCloud()
    }, SYNC_DEBOUNCE)

    return () => {
      if (importedLayerTimeoutRef.current) clearTimeout(importedLayerTimeoutRef.current)
    }
  }, [user, isHydrated, importedLayers, deletedImportedLayerIds, syncImportedLayersToCloud])

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
      const editableShared = useCustomLayerStore.getState().layers.filter(
        layer => layer.shareId && layer.sharePermission === 'edit'
      )
      for (const layer of editableShared) {
        await syncEditedSharedLayer(user, layer)
      }
      await refreshSharedImportedLayers()
      const currentLayers = useCustomPointLayerStore.getState().layers
      const currentImportedState = useCustomLayerStore.getState()
      const currentDeletedLayerIds = useCustomPointLayerStore.getState().deletedLayerIds
      const currentVondsten = useLocalVondstenStore.getState().vondsten
      const currentRoutes = useRouteRecordingStore.getState().savedRoutes
      const currentSettings = getCloudSettings()
      const currentPresets = getPresetCloudState()
      const userDocRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userDocRef)
      const cloudData = docSnap.exists() ? docSnap.data() : {}

      const cloudImportedMetadata = Array.isArray(cloudData.importedLayers)
        ? cloudData.importedLayers as CloudImportedLayerMetadata[]
        : []
      const cloudDeletedImportedLayerIds = Array.isArray(cloudData.deletedImportedLayerIds)
        ? cloudData.deletedImportedLayerIds.filter((id): id is string => typeof id === 'string')
        : []
      const mergedDeletedImportedLayerIds = [...new Set([
        ...cloudDeletedImportedLayerIds,
        ...currentImportedState.deletedLayerIds
      ])]
      const importedReconcile = await reconcileImportedLayers(
        cloudImportedMetadata,
        currentImportedState.layers,
        mergedDeletedImportedLayerIds
      )
      useCustomLayerStore.setState({
        layers: importedReconcile.layers,
        deletedLayerIds: mergedDeletedImportedLayerIds
      })

      const cloudLayers = Array.isArray(cloudData.layers) ? cloudData.layers as CustomPointLayer[] : []
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
        importedLayers: importedReconcile.metadata,
        deletedImportedLayerIds: mergedDeletedImportedLayerIds,
        layerCleanupVersion: reconciledLayers.cleanupVersion,
        vondsten: vondstMerge.merged,
        routes: routeMerge.merged,
        settings: settingsToSync,
        presetSettings: presetsToSync,
        layersUpdatedAt: serverTimestamp(),
        importedLayersUpdatedAt: serverTimestamp(),
        vondstenUpdatedAt: serverTimestamp(),
        routesUpdatedAt: serverTimestamp(),
        settingsUpdatedAt: serverTimestamp(),
        presetsUpdatedAt: serverTimestamp()
      }, { merge: true })

      lastSyncedImportedLayersRef.current = JSON.stringify({
        layers: importedReconcile.layers,
        deletedLayerIds: mergedDeletedImportedLayerIds,
      })
      lastSyncedLayersRef.current = JSON.stringify({
        layers: reconciledLayers.layers,
        deletedLayerIds: reconciledLayers.deletedLayerIds,
        layerCleanupVersion: reconciledLayers.cleanupVersion,
      })
      lastSyncedVondstenRef.current = JSON.stringify(vondstMerge.merged)
      lastSyncedRoutesRef.current = JSON.stringify(routeMerge.merged)
      lastSyncedSettingsRef.current = JSON.stringify(settingsToSync)
      lastSyncedPresetsRef.current = JSON.stringify(presetsToSync)
      markSynced()
      console.log('☁️ Handmatige sync voltooid, inclusief instellingen en presets')

      return {
        success: true,
        uploaded: {
          layers: layerMerge.newLocalItems.filter(item =>
            reconciledLayers.layers.some(layer => layer.id === item.id)
          ).length + importedReconcile.uploaded,
          vondsten: vondstMerge.newLocalItems.length,
          routes: routeMerge.newLocalItems.length
        },
        downloaded: {
          layers: layerMerge.newCloudItems.filter(item =>
            reconciledLayers.layers.some(layer => layer.id === item.id)
          ).length + importedReconcile.downloaded,
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
  }, [user, markSynced, reportSyncError, reconcileImportedLayers, refreshSharedImportedLayers])

  return {
    isLoggedIn: !!user,
    syncStatus,
    syncError,
    syncLayersToCloud,
    syncImportedLayersToCloud,
    syncVondstenToCloud,
    syncRoutesToCloud,
    syncNow
  }
}
