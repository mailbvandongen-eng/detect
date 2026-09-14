export const POINT_LAYER_CLEANUP_VERSION = 1

const RETIRED_LAYER_NAMES = new Set([
  'Mijn vondsten',
  'Vakantie Frankrijk 2026',
  'Haaientanden zoeken',
  'Testlaag om te archiveren',
])

interface PointLayerIdentity {
  id: string
  name: string
}

export interface PointLayerCleanupResult<T> {
  layers: T[]
  deletedLayerIds: string[]
  cleanupVersion: number
  removedLayerIds: string[]
}

/**
 * Houdt verwijderingen ook bij cloud-sync in stand en ruimt éénmalig de vier
 * oude proeflagen op. Een versienummer voorkomt dat een later nieuw aangemaakte
 * laag met dezelfde naam opnieuw wordt verwijderd.
 */
export function reconcilePointLayerDeletions<T extends PointLayerIdentity>(
  layers: T[],
  deletedLayerIds: string[],
  cleanupVersion: number
): PointLayerCleanupResult<T> {
  const deletedIds = new Set(deletedLayerIds.filter(id => typeof id === 'string' && id.length > 0))
  const removedLayerIds: string[] = []

  if (cleanupVersion < POINT_LAYER_CLEANUP_VERSION) {
    for (const layer of layers) {
      if (layer.id === 'default-vondsten' || RETIRED_LAYER_NAMES.has(layer.name)) {
        deletedIds.add(layer.id)
        removedLayerIds.push(layer.id)
      }
    }
  }

  return {
    layers: layers.filter(layer => !deletedIds.has(layer.id)),
    deletedLayerIds: [...deletedIds],
    cleanupVersion: POINT_LAYER_CLEANUP_VERSION,
    removedLayerIds,
  }
}
