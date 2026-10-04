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
  buddyRole?: 'owner' | 'edit' | 'read'
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
  _importedLayers: U[],
  options: { includeReadOnly?: boolean } = {}
): T[] {
  return pointLayers.filter(layer => !layer.archived && (options.includeReadOnly || layer.buddyRole !== 'read'))
}

export function buildUserLayerCatalog<T extends PointLayerLike, U extends ImportedLayerLike>(
  pointLayers: T[],
  _importedLayers: U[]
): UserLayerCatalogItem[] {
  const standalone = getStandalonePointLayers(pointLayers, _importedLayers).map(layer => ({
    key: `point:${layer.id}`,
    target: { kind: 'point', id: layer.id } as const,
    name: layer.name,
    color: layer.color,
    objectCount: layer.points.length,
  }))

  return standalone
}
