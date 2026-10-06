import { buildFrance2026SeedFeatures } from './france2026Seed'
import { THEDIRAC_RESEARCH_LAYER_NAME } from '../data/thediracResearchSites'
import { THEDIRAC_SIGHTS_LAYER_NAME } from '../data/thediracSights'
import { THEDIRAC_HIKES_LAYER_NAME } from '../data/thediracHikes'
import { THEDIRAC_MINERALS_LAYER_NAME, THEDIRAC_FOSSILS_LAYER_NAME } from '../data/thediracGeologySites'
import { featurePlaceEntry, type PlaceSource } from './placeList'
import { THEDIRAC_CONTEXT_LAYER_NAME, THEDIRAC_LANDSCAPE_FEATURES, THEDIRAC_SOURCE_GUIDES } from '../data/thediracLandscapeContext'

const GROUPS = [
  ['archeologie', THEDIRAC_RESEARCH_LAYER_NAME, '#b45309'],
  ['bezienswaardigheid', THEDIRAC_SIGHTS_LAYER_NAME, '#7c5ac7'],
  ['mineraal', THEDIRAC_MINERALS_LAYER_NAME, '#0891b2'],
  ['fossiel', THEDIRAC_FOSSILS_LAYER_NAME, '#d97706'],
  ['wandeling', THEDIRAC_HIKES_LAYER_NAME, '#15803d'],
]
const features = buildFrance2026SeedFeatures()
export function getThediracPlaceSources(visible: Record<string, boolean>): PlaceSource[] {
  const places = GROUPS.map(([prefix, name, color]) => {
    const source: Omit<PlaceSource, 'entries'> = {key: `builtin:${name}`, name, color, visible: !!visible[name], kind: 'builtin', snapshotKey: name}
    return {...source, entries: features.filter(f => String(f.properties.detectSeedId).startsWith(`${prefix}:`)).map((f,i) => featurePlaceEntry(f, source, i))}
  })
  const context: Omit<PlaceSource, 'entries'> = {key: `builtin:${THEDIRAC_CONTEXT_LAYER_NAME}`, name: THEDIRAC_CONTEXT_LAYER_NAME, color: '#0f766e', visible: !!visible[THEDIRAC_CONTEXT_LAYER_NAME], kind: 'builtin', snapshotKey: THEDIRAC_CONTEXT_LAYER_NAME}
  return [...places, {...context, entries: [
    ...THEDIRAC_LANDSCAPE_FEATURES.map((f,i) => featurePlaceEntry(f,context,i)),
    ...THEDIRAC_SOURCE_GUIDES.map(guide => ({
      id: `${context.key}:guide:${guide.id}`, sourceKey: context.key, layerId: context.name, layerName: context.name, color: context.color,
      name: guide.naam, category: 'Bron & kaart', description: guide.omschrijving,
      coordinates: null, createdAt: '', geometryType: '', editable: false,
      properties: {...guide, categorie: 'Bron & kaart', bewijsstatus: 'Bron & kaart'},
    }))
  ]}]
}
