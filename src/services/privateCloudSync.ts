import { doc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { privateData, privateRevision, applyPrivateData, observePrivateRevision } from './privateAccountData'
import { emptyPrivateRevision, mergeCollection, type PrivateRevision } from '../utils/privateSyncMerge'
import { reconcilePointLayerDeletions } from '../utils/pointLayerCleanup'
import { useCustomPointLayerStore, type CustomPointLayer } from '../store/customPointLayerStore'
import type { LocalVondst } from '../store/localVondstenStore'
import type { RecordedRoute } from '../store/routeRecordingStore'
import { independentPointLayer } from '../utils/independentLayers'

type PrivateData = ReturnType<typeof privateData>
export interface CloudPrivateData {
  layers?: CustomPointLayer[]
  vondsten?: LocalVondst[]
  routes?: RecordedRoute[]
  privateRevision?: PrivateRevision
  deletedLayerIds?: string[]
  layerCleanupVersion?: number
  settings?: unknown
  presetSettings?: unknown
}
function mergePrivate(cloud: CloudPrivateData, local: PrivateData, localRevision: PrivateRevision) {
  const remote = cloud.privateRevision || emptyPrivateRevision()
  const layers = mergeCollection((cloud.layers || []).filter(layer => !layer.buddyLayerId).map(independentPointLayer), local.layers.map(independentPointLayer), remote.layers, localRevision.layers, true)
  const vondsten = mergeCollection(cloud.vondsten || [], local.vondsten, remote.vondsten, localRevision.vondsten)
  const routes = mergeCollection(cloud.routes || [], local.routes, remote.routes, localRevision.routes)
  const layerState = useCustomPointLayerStore.getState()
  const cleaned = reconcilePointLayerDeletions(layers.items, [...(cloud.deletedLayerIds || []), ...layerState.deletedLayerIds], cloud.layerCleanupVersion || 0)
  return {
    data: { layers: cleaned.layers, vondsten: vondsten.items, routes: routes.items },
    revision: { layers: layers.revision, vondsten: vondsten.revision, routes: routes.revision },
    deletedLayerIds: cleaned.deletedLayerIds,
    layerCleanupVersion: Math.max(cleaned.cleanupVersion, layerState.layerCleanupVersion),
  }
}
export async function synchronizePrivateData(uid: string, isCurrent: () => boolean, extras: (cloud: CloudPrivateData) => Record<string, unknown> = () => ({})) {
  if (!isCurrent()) throw new Error('Account is gewijzigd.')
  const reference = doc(db, 'users', uid)
  const result = await runTransaction(db, async transaction => {
    const snapshot = await transaction.get(reference)
    if (!isCurrent()) throw new Error('Account is gewijzigd.')
    const cloud = (snapshot.exists() ? snapshot.data() : {}) as CloudPrivateData
    observePrivateRevision(cloud.privateRevision || emptyPrivateRevision())
    // Read the latest local state on every transaction retry, not a stale closure.
    const merged = mergePrivate(cloud, privateData(), privateRevision())
    const additional = extras(cloud)
    const payload = {
      ...merged.data, privateRevision: merged.revision,
      deletedLayerIds: merged.deletedLayerIds, layerCleanupVersion: merged.layerCleanupVersion,
      ...additional,
    }
    transaction.set(reference, JSON.parse(JSON.stringify(payload)), { merge: true })
    // Keep native Firestore timestamp sentinels outside JSON serialization.
    transaction.set(reference, { layersUpdatedAt: serverTimestamp(), vondstenUpdatedAt: serverTimestamp(), routesUpdatedAt: serverTimestamp() }, { merge: true })
    return { ...merged, cloud, additional }
  })
  if (!isCurrent()) throw new Error('Account is gewijzigd.')
  // Edits made during the network round trip remain pending for the next sync.
  const rebased = mergePrivate({ ...result.data, privateRevision: result.revision, deletedLayerIds: result.deletedLayerIds, layerCleanupVersion: result.layerCleanupVersion }, privateData(), privateRevision())
  applyPrivateData(rebased.data, rebased.revision)
  useCustomPointLayerStore.setState({ deletedLayerIds: rebased.deletedLayerIds, layerCleanupVersion: rebased.layerCleanupVersion })
  return result
}
