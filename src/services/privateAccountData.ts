import { useCustomPointLayerStore } from '../store/customPointLayerStore'
import { useCustomLayerStore } from '../store/customLayerStore'
import { useLocalVondstenStore } from '../store/localVondstenStore'
import { useRouteRecordingStore } from '../store/routeRecordingStore'
import { useSettingsStore } from '../store/settingsStore'
import { usePresetStore } from '../store/presetStore'
import { useUIStore } from '../store/uiStore'
import { accountStorage, beginAccountSwitch, finishAccountSwitch, lockAccountStorage, currentAccountScope } from '../utils/accountStorage'
import { emptyPrivateRevision, latestRevision, trackChanges, type PrivateRevision, type SyncItem } from '../utils/privateSyncMerge'

const stores = [useCustomPointLayerStore, useCustomLayerStore, useLocalVondstenStore, useRouteRecordingStore, useSettingsStore, usePresetStore]
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))
let applying = false
let initialized = false
let revision = emptyPrivateRevision()
let clock = 0
export function privateData() {
  return clone({
    layers: useCustomPointLayerStore.getState().layers.filter(layer => !layer.buddyLayerId),
    vondsten: useLocalVondstenStore.getState().vondsten,
    routes: useRouteRecordingStore.getState().savedRoutes,
  })
}
let baseline: ReturnType<typeof privateData>
function readRevision() {
  const saved = accountStorage.getItem('detect-private-sync')
  revision = typeof saved === 'string' ? JSON.parse(saved) : emptyPrivateRevision()
  clock = latestRevision(revision)
  baseline = privateData()
}
export function privateRevision() { return clone(revision) }
export function observePrivateRevision(remote: PrivateRevision) { clock = Math.max(clock, latestRevision(remote)) }
export function applyPrivateData(next: ReturnType<typeof privateData>, metadata: PrivateRevision) {
  applying = true
  try {
    revision = metadata
    clock = Math.max(clock, latestRevision(metadata))
    accountStorage.setItem('detect-private-sync', JSON.stringify(metadata))
    useCustomPointLayerStore.setState(state => ({ layers: [...state.layers.filter(layer => !!layer.buddyLayerId), ...next.layers] }))
    useLocalVondstenStore.setState({ vondsten: next.vondsten })
    useRouteRecordingStore.setState(state => ({ savedRoutes: next.routes,
      visibleRouteIds: new Set([...state.visibleRouteIds].filter(id => next.routes.some(route => route.id === id)).concat(next.routes.filter(route => !baseline.routes.some(old => old.id === route.id)).map(route => route.id))) }))
    baseline = privateData()
  } finally { applying = false }
}
function track() {
  if (applying) return
  const next = privateData()
  if (JSON.stringify(next) === JSON.stringify(baseline)) return
  clock = Math.max(Date.now(), clock + 1)
  for (const name of ['layers', 'vondsten', 'routes'] as const) {
    revision[name] = trackChanges(baseline[name] as unknown as SyncItem[], next[name] as unknown as SyncItem[], revision[name], clock, name === 'layers')
  }
  accountStorage.setItem('detect-private-sync', JSON.stringify(revision))
  baseline = next
}
export function initializePrivateTracking() {
  if (initialized) return
  initialized = true
  readRevision()
  useCustomPointLayerStore.subscribe((next, previous) => { if (next.layers !== previous.layers) track() })
  useLocalVondstenStore.subscribe((next, previous) => { if (next.vondsten !== previous.vondsten) track() })
  useRouteRecordingStore.subscribe((next, previous) => { if (next.savedRoutes !== previous.savedRoutes) track() })
}
export async function activatePrivateAccount(uid: string | null) {
  initializePrivateTracking()
  if (currentAccountScope() !== (uid || 'anonymous') && useRouteRecordingStore.getState().state !== 'idle') {
    useRouteRecordingStore.getState().stopRecording('Route vóór accountwisseling')
  }
  applying = true
  try {
    if (!beginAccountSwitch(uid)) return
    useUIStore.setState(useUIStore.getInitialState(), true)
    // Reset transient state too: no recording or in-memory layers cross accounts.
    for (const store of stores) store.setState(store.getInitialState() as never, true)
    await Promise.all(stores.map(store => store.persist.rehydrate()))
    if (stores.some(store => !store.persist.hasHydrated())) throw new Error('Lokale accountgegevens konden niet worden geladen.')
    readRevision()
  } catch (error) {
    // Fail closed without writing empty defaults over either account's saved data.
    lockAccountStorage()
    useUIStore.setState(useUIStore.getInitialState(), true)
    for (const store of stores) store.setState(store.getInitialState() as never, true)
    revision = emptyPrivateRevision()
    baseline = privateData()
    throw error
  } finally {
    applying = false
    finishAccountSwitch()
  }
}
