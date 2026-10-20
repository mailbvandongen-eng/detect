import { NAPOLEON_LOT_LAYER } from '../data/lotCadastreArchives'
import { THEDIRAC_RESEARCH_LAYER_NAME } from '../data/thediracResearchSites'
import { THEDIRAC_CONTEXT_LAYER_NAME } from '../data/thediracLandscapeContext'
import { THEDIRAC_SIGHTS_LAYER_NAME } from '../data/thediracSights'
import { THEDIRAC_HIKES_LAYER_NAME } from '../data/thediracHikes'
import {
  THEDIRAC_FOSSILS_LAYER_NAME,
  THEDIRAC_MINERALS_LAYER_NAME
} from '../data/thediracGeologySites'

export type FranceResearchGroup =
  | 'terrain'
  | 'water'
  | 'geology'
  | 'finds'
  | 'history'
  | 'archaeology'
  | 'sights'
  | 'hikes'

export interface FranceResearchLayerDefinition {
  name: string
  group: FranceResearchGroup
  opacity: number
  zIndex: number
  defaultVisible: boolean
  historicalMap?: boolean
}

// This is the single order used by the preset, the layer panel, transparency
// controls and map rendering. Do not create a second hand-maintained list.
export const FRANCE_RESEARCH_LAYER_DEFINITIONS: FranceResearchLayerDefinition[] = [
  { name: 'LiDAR HD terrein FR', group: 'terrain', opacity: 0.48, zIndex: 20, defaultVisible: true },
  { name: 'Waterlopen BD TOPAGE 2026', group: 'water', opacity: 0.92, zIndex: 34, defaultVisible: true },
  { name: 'OCS GE landbedekking 2021-2023', group: 'water', opacity: 0.24, zIndex: 21, defaultVisible: true },
  { name: 'Bodem/geologie 1:50.000 FR', group: 'geology', opacity: 0.28, zIndex: 22, defaultVisible: true },
  { name: 'Geologie + reliëf FR', group: 'geology', opacity: 0.66, zIndex: 23, defaultVisible: false },
  { name: 'BRGM boringen · BSS', group: 'geology', opacity: 1, zIndex: 24, defaultVisible: false },
  { name: 'BRGM IDPR · infiltratie/afstroming', group: 'geology', opacity: 0.55, zIndex: 25, defaultVisible: false },
  { name: 'BRGM cavités · ondergrondse holtes', group: 'geology', opacity: 1, zIndex: 26, defaultVisible: false },
  { name: 'Oude bossen · Forêts anciennes', group: 'archaeology', opacity: 0.38, zIndex: 27, defaultVisible: true },
  { name: THEDIRAC_MINERALS_LAYER_NAME, group: 'finds', opacity: 1, zIndex: 54, defaultVisible: true },
  { name: THEDIRAC_FOSSILS_LAYER_NAME, group: 'finds', opacity: 1, zIndex: 55, defaultVisible: true },
  { name: 'Luchtfoto · 1950–1965', group: 'history', opacity: 1, zIndex: 13, defaultVisible: true, historicalMap: true },
  { name: 'IGN-kaart · 1950', group: 'history', opacity: 1, zIndex: 12, defaultVisible: false, historicalMap: true },
  { name: 'État-major · 1820–1866', group: 'history', opacity: 1, zIndex: 11, defaultVisible: false, historicalMap: true },
  { name: 'Carte de Cassini · 18e eeuw', group: 'history', opacity: 0.8, zIndex: 10, defaultVisible: false, historicalMap: true },
  { name: NAPOLEON_LOT_LAYER, group: 'history', opacity: 1, zIndex: 51, defaultVisible: true },
  { name: THEDIRAC_CONTEXT_LAYER_NAME, group: 'archaeology', opacity: 1, zIndex: 35, defaultVisible: true },
  { name: THEDIRAC_RESEARCH_LAYER_NAME, group: 'archaeology', opacity: 1, zIndex: 50, defaultVisible: true },
  { name: THEDIRAC_SIGHTS_LAYER_NAME, group: 'sights', opacity: 1, zIndex: 52, defaultVisible: true },
  { name: THEDIRAC_HIKES_LAYER_NAME, group: 'hikes', opacity: 1, zIndex: 53, defaultVisible: true }
]

export const FRANCE_RESEARCH_LAYER_ORDER = FRANCE_RESEARCH_LAYER_DEFINITIONS.map(layer => layer.name)
export const FRANCE_RESEARCH_LAYER_BY_NAME = new Map(FRANCE_RESEARCH_LAYER_DEFINITIONS.map(layer => [layer.name, layer]))
export const FRANCE_HISTORICAL_MAP_NAMES = FRANCE_RESEARCH_LAYER_DEFINITIONS
  .filter(layer => layer.historicalMap)
  .map(layer => layer.name)

export const FRANCE_RESEARCH_DEFAULT_STATES = Object.fromEntries(
  FRANCE_RESEARCH_LAYER_DEFINITIONS.map(layer => [layer.name, {
    visible: layer.defaultVisible,
    opacity: layer.opacity
  }])
)
