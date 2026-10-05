import { buildFrance2026SeedFeatures } from './france2026Seed'
import { THEDIRAC_RESEARCH_LAYER_NAME } from '../data/thediracResearchSites'
import { THEDIRAC_SIGHTS_LAYER_NAME } from '../data/thediracSights'
import { THEDIRAC_HIKES_LAYER_NAME } from '../data/thediracHikes'
import { THEDIRAC_MINERALS_LAYER_NAME, THEDIRAC_FOSSILS_LAYER_NAME } from '../data/thediracGeologySites'
import { featurePlaceEntry, type PlaceSource } from './placeList'

const GROUPS = [
  ['archeologie', THEDIRAC_RESEARCH_LAYER_NAME, '#b45309'],
  ['bezienswaardigheid', THEDIRAC_SIGHTS_LAYER_NAME, '#7c5ac7'],
  ['mineraal', THEDIRAC_MINERALS_LAYER_NAME, '#0891b2'],
  ['fossiel', THEDIRAC_FOSSILS_LAYER_NAME, '#d97706'],
  ['wandeling', THEDIRAC_HIKES_LAYER_NAME, '#15803d'],
]
const features = buildFrance2026SeedFeatures()
export function getThediracPlaceSources(visible: Record<string, boolean>): PlaceSource[] {
  return GROUPS.map(([prefix, name, color]) => {
    const source: Omit<PlaceSource, 'entries'> = {key: `builtin:${name}`, name, color, visible: !!visible[name], kind: 'builtin', snapshotKey: name}
    return {...source, entries: features.filter(f => String(f.properties.detectSeedId).startsWith(`${prefix}:`)).map((f,i) => featurePlaceEntry(f, source, i))}
  })
}
