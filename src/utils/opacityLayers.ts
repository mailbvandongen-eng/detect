// Imagery, internal labels and personal/user layers are not analysis overlays.
import { FRANCE_RESEARCH_LAYER_ORDER } from '../config/franceResearchLayers'

const NON_OPACITY_LAYERS = new Set([
  'Esri (licht)', 'OpenStreetMap', 'Luchtfoto', 'Satelliet (wereld)',
  'Hybride (wereld)', 'Labels Overlay', 'Hybrid Reference Overlay',
  'Mijn Vondsten',
])

interface OpacityLayer {
  id: string
  layerKey: string
  name: string
  kind: 'standard' | 'imported'
  opacity: number
}

export function getActiveOpacityLayers(
  visible: Record<string, boolean>,
  opacity: Record<string, number>,
  registered: Record<string, { getOpacity: () => number }>,
  imports: { id: string; name: string; visible: boolean; opacity: number }[] = [],
): OpacityLayer[] {
  const standard = Object.keys(visible)
    .filter(name => visible[name] && !NON_OPACITY_LAYERS.has(name))
    .filter(name => opacity[name] !== undefined || registered[name])
    .map(name => ({
      id: `standard-${name}`,
      layerKey: name,
      name,
      kind: 'standard' as const,
      opacity: opacity[name] ?? registered[name].getOpacity(),
    }))
  const canonicalOrder = new Map(FRANCE_RESEARCH_LAYER_ORDER.map((name, index) => [name, index]))
  const orderedStandard = standard
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ai = canonicalOrder.get(a.item.name)
      const bi = canonicalOrder.get(b.item.name)
      if (ai === undefined && bi === undefined) return a.index - b.index
      if (ai === undefined) return 1
      if (bi === undefined) return -1
      return ai - bi
    })
    .map(({ item }) => item)
  return [...orderedStandard, ...imports.filter(layer => layer.visible).map(layer => ({
    id: `imported-${layer.id}`, layerKey: layer.id, name: layer.name,
    kind: 'imported' as const, opacity: layer.opacity,
  }))]
}
