import type { CustomPointLayer } from '../store/customPointLayerStore'
import type { CustomLayer } from '../store/customLayerStore'

// Detach old import overlays without changing points, permissions or visibility.
export function independentPointLayer(layer: CustomPointLayer): CustomPointLayer {
  if (layer.buddyLayerId) return layer
  const { linkedImportedLayerId, linkedImportedLayerHash, shareId, shareOwnerUid,
    shareOwnerEmail, sharePermission, ...own } = layer
  const name = (typeof layer.name === 'string' ? layer.name : '').replace(/\s+[–-] eigen punten$/, '').trim()
  const repairedName = /^#[0-9a-f]{3,8}$/i.test(name) || !name ? 'Bewaarde punten' : name
  if (!linkedImportedLayerId && !linkedImportedLayerHash && !shareId && repairedName === layer.name) return layer
  return { ...own, name: repairedName, originalImportName: layer.originalImportName || layer.name }
}

export function independentPointLayers(layers: CustomPointLayer[]): CustomPointLayer[] {
  const used = new Set(layers.filter(layer => independentPointLayer(layer).name === layer.name).map(layer => layer.name))
  return layers.map(layer => {
    const repaired = independentPointLayer(layer)
    if (repaired === layer || repaired.name !== 'Bewaarde punten') return repaired
    let name = repaired.name
    let number = 2
    while (used.has(name)) name = `Bewaarde punten ${number++}`
    used.add(name)
    return { ...repaired, name }
  })
}

// Only explicit merges between private layers are allowed. Preserve conflicting
// versions of an ID, including notes, geometry, photos and original properties.
export function mergePrivatePointLayers(layers: CustomPointLayer[], sourceId: string, targetId: string, newId: () => string): CustomPointLayer[] {
  const source = layers.find(layer => layer.id === sourceId)
  const target = layers.find(layer => layer.id === targetId)
  if (!source || !target || sourceId === targetId || [source, target].some(layer => layer.buddyLayerId || layer.shareId || layer.archived)) return layers
  const points = [...target.points]
  for (const point of source.points) {
    const duplicate = points.find(existing => existing.id === point.id)
    if (!duplicate) points.push(point)
    else if (JSON.stringify(duplicate) !== JSON.stringify(point)) points.push({ ...point, id: newId() })
  }
  return layers.filter(layer => layer.id !== sourceId).map(layer => layer.id === targetId ? {
    ...layer, points, categories: [...new Set([...(target.categories || []), ...(source.categories || [])])],
    visible: target.visible || source.visible,
  } : layer)
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
