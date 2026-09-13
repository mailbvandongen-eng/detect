export type UserLayerTarget =
  | { kind: 'point'; id: string }
  | { kind: 'imported'; id: string }

interface PointLayerLike {
  id: string
  name: string
  color: string
  points: unknown[]
  archived: boolean
  linkedImportedLayerId?: string
}

interface ImportedLayerLike {
  id: string
  name: string
  color: string
  features: { features: unknown[] }
  style: { points: { color: string } }
}

export interface UserLayerCatalogItem {
  key: string
  target: UserLayerTarget
  name: string
  color: string
  objectCount: number
}

export function getLinkedPointLayer<T extends PointLayerLike>(
  importedLayerId: string,
  pointLayers: T[]
): T | undefined {
  return pointLayers.find(layer => layer.linkedImportedLayerId === importedLayerId)
}

export function getStandalonePointLayers<T extends PointLayerLike, U extends ImportedLayerLike>(
  pointLayers: T[],
  importedLayers: U[]
): T[] {
  const importedIds = new Set(importedLayers.map(layer => layer.id))
  return pointLayers.filter(layer =>
    !layer.archived && (!layer.linkedImportedLayerId || !importedIds.has(layer.linkedImportedLayerId))
  )
}

export function buildUserLayerCatalog<T extends PointLayerLike, U extends ImportedLayerLike>(
  pointLayers: T[],
  importedLayers: U[]
): UserLayerCatalogItem[] {
  const standalone = getStandalonePointLayers(pointLayers, importedLayers).map(layer => ({
    key: `point:${layer.id}`,
    target: { kind: 'point', id: layer.id } as const,
    name: layer.name,
    color: layer.color,
    objectCount: layer.points.length,
  }))

  const imported = importedLayers.map(layer => {
    const linkedLayer = getLinkedPointLayer(layer.id, pointLayers)
    return {
      key: `imported:${layer.id}`,
      target: { kind: 'imported', id: layer.id } as const,
      name: layer.name,
      color: layer.style.points.color || layer.color,
      objectCount: layer.features.features.length + (linkedLayer?.points.length || 0),
    }
  })

  return [...standalone, ...imported]
}
