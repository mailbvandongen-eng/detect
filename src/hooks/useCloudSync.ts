import { independentPointLayer, independentImport, recoverLegacyPoints } from '../utils/independentLayers'
import { useCallback, useEffect, useRef, useState } from 'react'
import { synchronizePrivateData, type CloudPrivateData } from '../services/privateCloudSync'
import { initializePrivateTracking, privateData, privateRevision } from '../services/privateAccountData'
import { accountSession } from '../utils/accountStorage'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore } from '../store/customPointLayerStore'
import { useCustomLayerStore } from '../store/customLayerStore'
import {
  getOwnedShares,
  getIncomingShares,
  materializeSharedImportedLayer,
  materializeSharedOverlay,
} from '../services/sharedImportedLayers'
import { useLocalVondstenStore } from '../store/localVondstenStore'
import { useRouteRecordingStore } from '../store/routeRecordingStore'
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

// Synchronization has one entry point: transactional merge for startup, automatic
// updates and the manual button. No path can blindly overwrite an entire list.
export function useCloudSync() {
  const user = useAuthStore(state => state.user)
  const layers = useCustomPointLayerStore(state => state.layers)
  const deletedLayerIds = useCustomPointLayerStore(state => state.deletedLayerIds)
  const vondsten = useLocalVondstenStore(state => state.vondsten)
  const routes = useRouteRecordingStore(state => state.savedRoutes)
  const settingsState = useSettingsStore()
  const presetsState = usePresetStore()
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('signed-out')
  const [syncError, setSyncError] = useState<string | null>(null)
  const [revision, refresh] = useState(0)
  const acknowledged = useRef('')
  const settingsBaseline = useRef('')
  const presetsBaseline = useRef('')
  const initialized = useRef(false)
  const inflight = useRef<{ uid: string; promise: Promise<CloudSyncResult>; token: object; isCurrent: () => boolean } | null>(null)
  const signature = () => JSON.stringify({ data: privateData(), metadata: privateRevision(), deletedLayerIds: useCustomPointLayerStore.getState().deletedLayerIds, settings: getCloudSettings(), presets: getPresetCloudState() })

  const refreshLegacyShares = useCallback(async (isCurrent: () => boolean) => {
    if (!user?.email) return
    const [incoming, owned] = await Promise.all([getIncomingShares(user.email), getOwnedShares(user.uid)])
    if (!isCurrent()) return
    const records = [...new Map([...incoming, ...owned].map(record => [record.shareId, record])).values()]
    for (const record of records) {
      if (!isCurrent()) return
      const pointState = useCustomPointLayerStore.getState()
      if (pointState.recoveredLegacyShareIds.includes(record.shareId) || pointState.deletedLayerIds.includes(`recovered-${record.shareId}`)) continue
      let imported = useCustomLayerStore.getState().layers.find(layer => layer.contentHash === record.layerHash)
      if (!imported && incoming.some(item => item.shareId === record.shareId)) {
        const recovered = await materializeSharedImportedLayer(record)
        if (!isCurrent()) return
        if (!recovered) continue
        imported = independentImport(recovered)
        useCustomLayerStore.setState(state => ({ layers: [...state.layers, imported!] }))
      }
      const overlay = independentPointLayer(materializeSharedOverlay(record, imported?.id || ''))
      const missing = recoverLegacyPoints(useCustomPointLayerStore.getState().layers, overlay.points, record.shareId)
      useCustomPointLayerStore.setState(state => ({
        layers: missing.length ? [...state.layers, { ...overlay, id: `recovered-${record.shareId}`, points: missing }] : state.layers,
        recoveredLegacyShareIds: [...state.recoveredLegacyShareIds, record.shareId],
      }))
    }
  }, [user])

  const syncNow = useCallback((): Promise<CloudSyncResult> => {
    const failed = (error: string): CloudSyncResult => ({ success: false, uploaded: { layers: 0, vondsten: 0, routes: 0 }, downloaded: { layers: 0, vondsten: 0, routes: 0 }, error })
    if (!user) return Promise.resolve(failed('Niet ingelogd'))
    if (inflight.current?.uid === user.uid && inflight.current.isCurrent()) return inflight.current.promise
    const validSession = accountSession(user.uid)
    const isCurrent = () => validSession() && useAuthStore.getState().user?.uid === user.uid
    const token = {}
    const initial = !initialized.current
    const promise = (async (): Promise<CloudSyncResult> => {
      setSyncStatus('connecting')
      setSyncError(null)
      try {
        const before = privateData()
        if (initial) await refreshLegacyShares(isCurrent)
        if (!isCurrent()) return failed('Account is gewijzigd.')
        const settings = getCloudSettings(), presets = getPresetCloudState()
        const localSettingsChanged = !initial && JSON.stringify(settings) !== settingsBaseline.current
        const localPresetsChanged = !initial && JSON.stringify(presets) !== presetsBaseline.current
        const result = await synchronizePrivateData(user.uid, isCurrent, (cloud: CloudPrivateData) => ({
          settings: !localSettingsChanged && isRecord(cloud.settings) ? cloud.settings : settings,
          presetSettings: !localPresetsChanged && isRecord(cloud.presetSettings) && typeof cloud.presetSettings.updatedAt === 'number' && cloud.presetSettings.updatedAt > presets.updatedAt ? cloud.presetSettings : presets,
          recoveredLegacyShareIds: [...new Set([...useCustomPointLayerStore.getState().recoveredLegacyShareIds, ...(((cloud as Record<string, unknown>).recoveredLegacyShareIds || []) as string[])])],
        }))
        if (!isCurrent()) return failed('Account is gewijzigd.')
        // Never overwrite settings changed while the transaction was in flight.
        if (JSON.stringify(getCloudSettings()) === JSON.stringify(settings)) applyCloudSettings(result.additional.settings as Partial<CloudSettings>)
        if (JSON.stringify(getPresetCloudState()) === JSON.stringify(presets)) applyPresetCloudState(result.additional.presetSettings)
        const after = result.data
        // Acknowledge the committed data, not newer changes made during the request.
        acknowledged.current = JSON.stringify({ data: after, metadata: result.revision, deletedLayerIds: result.deletedLayerIds, settings: result.additional.settings, presets: result.additional.presetSettings })
        settingsBaseline.current = JSON.stringify(result.additional.settings)
        presetsBaseline.current = JSON.stringify(result.additional.presetSettings)
        initialized.current = true
        setSyncStatus('synced')
        const changed = <T extends { id: string }>(items: T[], previous: T[]) => items.filter(item => JSON.stringify(item) !== JSON.stringify(previous.find(old => old.id === item.id))).length
        return { success: true,
          uploaded: { layers: changed(after.layers, result.cloud.layers || []), vondsten: changed(after.vondsten, result.cloud.vondsten || []), routes: changed(after.routes, result.cloud.routes || []) },
          downloaded: { layers: changed(after.layers, before.layers), vondsten: changed(after.vondsten, before.vondsten), routes: changed(after.routes, before.routes) } }

      } catch (error) {
        const message = getFriendlySyncError(error)
        if (isCurrent()) { setSyncStatus('error'); setSyncError(message) }
        return failed(message)
      } finally {
        if (inflight.current?.token === token) inflight.current = null
        if (isCurrent()) refresh(value => value + 1)
      }
    })()
    inflight.current = { uid: user.uid, promise, token, isCurrent }
    return promise
  }, [user, refreshLegacyShares])

  useEffect(() => {
    initialized.current = false
    acknowledged.current = ''
    settingsBaseline.current = ''
    presetsBaseline.current = ''
    if (!user) { setSyncStatus('signed-out'); setSyncError(null); return }
    initializePrivateTracking()
    void syncNow()
  }, [user?.uid, syncNow])

  useEffect(() => {
    if (!user || syncStatus === 'error' || !initialized.current || inflight.current || signature() === acknowledged.current) return
    const timeout = setTimeout(() => { void syncNow() }, SYNC_DEBOUNCE)
    return () => clearTimeout(timeout)
  }, [user, layers, deletedLayerIds, vondsten, routes, settingsState, presetsState, revision, syncStatus, syncNow])

  useEffect(() => {
    const reconnect = () => { if (user) void syncNow() }
    window.addEventListener('online', reconnect)
    const visible = () => { if (document.visibilityState === 'visible') reconnect() }
    document.addEventListener('visibilitychange', visible)
    return () => { window.removeEventListener('online', reconnect); document.removeEventListener('visibilitychange', visible) }
  }, [user, syncNow])

  return { isLoggedIn: !!user, syncStatus, syncError, syncNow,
    syncLayersToCloud: async () => (await syncNow()).success,
    syncVondstenToCloud: async () => (await syncNow()).success,
    syncRoutesToCloud: async () => (await syncNow()).success }
}
