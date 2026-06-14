import type Map from 'ol/Map'
import type { Layer } from 'ol/layer'
import { getImmediateLoadLayers } from '../layers/layerRegistry'

interface LoadImmediateLayersOptions {
  map: Map
  registerLayer: (name: string, layer: Layer) => void
}

export async function loadImmediateLayers({
  map,
  registerLayer,
}: LoadImmediateLayersOptions): Promise<void> {
  const immediateLoadLayers = getImmediateLoadLayers()

  const results = await Promise.allSettled(
    immediateLoadLayers.map(async (layerDefinition) => {
      try {
        const layer = await layerDefinition.factory()
        if (!layer) {
          return null
        }

        return { name: layerDefinition.name, layer }
      } catch (error) {
        console.warn(`Failed to create ${layerDefinition.name}:`, error)
        return null
      }
    })
  )

  results.forEach((result) => {
    if (result.status !== 'fulfilled' || !result.value) {
      return
    }

    const { name, layer } = result.value
    map.addLayer(layer)
    registerLayer(name, layer)
  })
}
