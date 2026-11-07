// Imagery, internal labels and personal/user layers are not analysis overlays.
import { FRANCE_RESEARCH_LAYER_ORDER } from '../config/franceResearchLayers'
import { getStackZIndex } from '../config/layerOrder'

// Romeinse wegen staan gewoon aan of uit; transparantie voegt daar niets toe.
const NON_OPACITY_LAYERS = new Set([
  'Labels Overlay', 'Hybrid Reference Overlay', 'Mijn Vondsten',
  'Romeinse wegen (regio)', 'Romeinse wegen (Wereld)',
])

/** Basiskaarten staan onderaan de regelaar, met een herkenbare naam. */
const BASE_LAYER_LABELS: Record<string, string> = {
  'Esri (licht)': 'Basiskaart · Lichtgrijs',
  'OpenStreetMap': 'Basiskaart · OpenStreetMap',
  'Luchtfoto': 'Basiskaart · Luchtfoto NL',
  'Satelliet (wereld)': 'Basiskaart · Satelliet',
  'Hybride (wereld)': 'Basiskaart · Hybride',
}

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
    .filter(name => visible[name] && !NON_OPACITY_LAYERS.has(name) && !BASE_LAYER_LABELS[name])
    .map(name => ({
      id: `standard-${name}`,
      layerKey: name,
      name,
      kind: 'standard' as const,
      // Ook lagen die nog laden staan er direct in; de ingestelde waarde
      // wordt bij het laden overgenomen.
      opacity: opacity[name] ?? registered[name]?.getOpacity() ?? 1,
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
  const overlays = [...orderedStandard, ...imports.filter(layer => layer.visible).map(layer => ({
    id: `imported-${layer.id}`, layerKey: layer.id, name: layer.name,
    kind: 'imported' as const, opacity: layer.opacity,
  }))]
  // De basiskaart alleen tonen als er iets overheen ligt: dan helpt een
  // lichtere basiskaart de lagen erboven leesbaar te maken.
  if (!overlays.length) return overlays
  const base = Object.keys(BASE_LAYER_LABELS).find(name => visible[name])
  if (!base || (opacity[base] === undefined && !registered[base])) return overlays
  return [...overlays, {
    id: `standard-${base}`,
    layerKey: base,
    name: BASE_LAYER_LABELS[base],
    kind: 'standard' as const,
    opacity: opacity[base] ?? registered[base].getOpacity(),
  }]
}
