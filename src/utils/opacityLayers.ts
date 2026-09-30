// Imagery and internal labels are backgrounds, not analysis overlays.
const BACKGROUND_LAYERS = new Set([
  'Esri (licht)', 'OpenStreetMap', 'Luchtfoto', 'Satelliet (wereld)',
  'Hybride (wereld)', 'Labels Overlay', 'Hybrid Reference Overlay',
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
  imported: { id: string; name: string; visible: boolean; opacity: number }[],
): OpacityLayer[] {
  const standard = Object.keys(visible)
    .filter(name => visible[name] && !BACKGROUND_LAYERS.has(name))
    .filter(name => opacity[name] !== undefined || registered[name])
    .map(name => ({
      id: `standard-${name}`,
      layerKey: name,
      name,
      kind: 'standard' as const,
      opacity: opacity[name] ?? registered[name].getOpacity(),
    }))
  return [
    ...standard,
    ...imported.filter(layer => layer.visible).map(layer => ({
      id: `imported-${layer.id}`,
      layerKey: layer.id,
      name: layer.name,
      kind: 'imported' as const,
      opacity: layer.opacity,
    })),
  ]
}
