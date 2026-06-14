import { baseLayerRegistry } from './registry/base'
import { internationalLayerRegistry } from './registry/international'
import { nlLayerRegistry } from './registry/nl'
import type { LayerDefinition } from './registry/shared'

export type { LayerDefinition } from './registry/shared'

export const layerRegistry: Record<string, LayerDefinition> = {
  ...baseLayerRegistry,
  ...nlLayerRegistry,
  ...internationalLayerRegistry,
}

export function getImmediateLoadLayers(): LayerDefinition[] {
  return Object.values(layerRegistry).filter((definition) => definition.immediateLoad)
}

export function getLazyLoadLayers(): LayerDefinition[] {
  return Object.values(layerRegistry).filter((definition) => !definition.immediateLoad)
}
