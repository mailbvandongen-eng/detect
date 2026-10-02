// Imagery, internal labels and personal/user layers are not analysis overlays.
const NON_OPACITY_LAYERS = new Set([
  'Esri (licht)', 'OpenStreetMap', 'Luchtfoto', 'Satelliet (wereld)',
  'Hybride (wereld)', 'Labels Overlay', 'Hybrid Reference Overlay',
  'Mijn Vondsten',
])

interface OpacityLayer {
  id: string
  layerKey: string
  name: string
  kind: 'standard'
  opacity: number
}

export function getActiveOpacityLayers(
  visible: Record<string, boolean>,
  opacity: Record<string, number>,
  registered: Record<string, { getOpacity: () => number }>,
): OpacityLayer[] {
  return Object.keys(visible)
    .filter(name => visible[name] && !NON_OPACITY_LAYERS.has(name))
    .filter(name => opacity[name] !== undefined || registered[name])
    .map(name => ({
      id: `standard-${name}`,
      layerKey: name,
      name,
      kind: 'standard' as const,
      opacity: opacity[name] ?? registered[name].getOpacity(),
    }))
}
