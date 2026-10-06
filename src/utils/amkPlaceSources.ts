import GeoJSON from 'ol/format/GeoJSON'
import { isRomeins, isSteentijd, isVroegeME, isLateME } from './amkPeriods'
import { featurePlaceEntry, type PlaceSource } from './placeList'
import type { CustomFeature } from '../store/customLayerStore'
const groups: [string, string, (period: string) => boolean][] = [
  ['AMK Monumenten', '#8b5cf6', () => true],
  ['AMK Romeins', '#ef4444', isRomeins],
  ['AMK Steentijd', '#f59e0b', isSteentijd],
  ['AMK Vroege ME', '#22c55e', isVroegeME],
  ['AMK Late ME', '#3b82f6', isLateME],
  ['AMK Overig', '#8b5cf6', p => !isRomeins(p) && !isSteentijd(p) && !isVroegeME(p) && !isLateME(p)]
]
let catalog: CustomFeature[] | null = null
export async function loadAMKPlaceCatalog(): Promise<CustomFeature[]> {
  const { loadAMKData } = await import('../layers/amkOL')
  if (!catalog) catalog = new GeoJSON().writeFeaturesObject(await loadAMKData(), {featureProjection:'EPSG:3857', dataProjection:'EPSG:4326'}).features as CustomFeature[]
  return catalog
}
export function getAMKPlaceSources(visible: Record<string, boolean>, features: CustomFeature[] = []): PlaceSource[] {
  return groups.map(([name, color, matches]) => {
    const source: Omit<PlaceSource, 'entries'> = {key:`builtin:${name}`, name, color, visible:!!visible[name], kind:'builtin', snapshotKey:name}
    return {...source, entries:features.flatMap((feature, index) => {
      const period = String(feature.properties?.txt_label || '')
      if (!matches(period)) return []
      return [featurePlaceEntry({...feature, properties:{...feature.properties, detectSeedId:`amk:${feature.properties?.monumentnummer ?? index}`, periode:period, categorie:'Archeologisch monument', bron:'Rijksdienst voor het Cultureel Erfgoed', bewijsstatus:'Gepubliceerd', locatienauwkeurigheid:'Brongebied'}}, source, index)]
    })}
  })
}
