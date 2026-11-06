// Imagery, internal labels and personal/user layers are not analysis overlays.
import { FRANCE_RESEARCH_LAYER_ORDER } from '../config/franceResearchLayers'
import { getStackZIndex } from '../config/layerOrder'

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
  registered: Record<string, { getOpacity: () => number, getZIndex?: () => number | undefined }>,
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
  // Zelfde volgorde als op de kaart: de bovenste laag staat bovenaan.
  const canonicalOrder = new Map(FRANCE_RESEARCH_LAYER_ORDER.map((name, index) => [name, index]))
  const zOf = (name: string) => getStackZIndex(name) ?? registered[name]?.getZIndex?.() ?? 0
  const orderedStandard = standard
    .map((item, index) => ({ item, index, z: zOf(item.name) }))
    .sort((a, b) => {
      if (a.z !== b.z) return b.z - a.z
      const ai = canonicalOrder.get(a.item.name)
      const bi = canonicalOrder.get(b.item.name)
      if (ai !== undefined && bi !== undefined) return ai - bi
      return a.index - b.index
    })
    .map(({ item }) => item)
  return [...orderedStandard, ...imports.filter(layer => layer.visible).map(layer => ({
    id: `imported-${layer.id}`, layerKey: layer.id, name: layer.name,
    kind: 'imported' as const, opacity: layer.opacity,
  }))]
}
