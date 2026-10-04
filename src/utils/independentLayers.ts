import type { CustomPointLayer } from '../store/customPointLayerStore'
import type { CustomLayer } from '../store/customLayerStore'

// Detach old import overlays without changing IDs, geometry, photos or visibility.
export function independentPointLayer(layer: CustomPointLayer): CustomPointLayer {
  const { linkedImportedLayerId, linkedImportedLayerHash, shareId, shareOwnerUid,
    shareOwnerEmail, sharePermission, ...own } = layer
  if (!linkedImportedLayerId && !linkedImportedLayerHash && !shareId) return layer
  return { ...own, name: `${layer.name} – eigen punten` }
}

export function independentImport(layer: CustomLayer): CustomLayer {
  const { shareId, shareOwnerUid, shareOwnerEmail, sharePermission, sharedRecipientEmail, ...own } = layer
  return own
}

// A legacy recipient may have edited a point with the same ID. Preserve that
// version separately rather than silently discarding either person's data.
export function recoverLegacyPoints(layers: CustomPointLayer[], points: CustomPointLayer['points'], shareId: string) {
  const existing = new Map(layers.flatMap(layer => layer.points.map(point => [point.id, point] as const)))
  const fields = ['name', 'category', 'notes', 'phone', 'url', 'coordinates', 'status', 'geometry', 'photos', 'sourceLayer', 'sourceId', 'sourceProperties', 'popupContent', 'routeId', 'routeName', 'createdAt'] as const
  return points.flatMap(point => {
    const local = existing.get(point.id)
    if (!local) return [point]
    if (fields.every(field => JSON.stringify(local[field]) === JSON.stringify(point[field]))) return []
    const recoveredId = `${point.id}-legacy-${shareId}`
    return existing.has(recoveredId) ? [] : [{ ...point, id: recoveredId }]
  })
}
