import { layerRegistry } from './layerRegistry'

export const BASE_LAYER_IDS = [
  'CartoDB (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
] as const

const NON_REGISTRY_LAYER_IDS = [
  'CartoDB (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'Labels Overlay',
  'Mijn Vondsten'
] as const

export const ALL_LAYER_IDS = [
  ...new Set([
    ...NON_REGISTRY_LAYER_IDS,
    ...Object.keys(layerRegistry)
  ])
]

export function createDefaultVisibilityState(): Record<string, boolean> {
  const visible = Object.fromEntries(
    ALL_LAYER_IDS.map((layerId) => [layerId, false])
  ) as Record<string, boolean>

  visible['CartoDB (licht)'] = true
  visible['Mijn Vondsten'] = true

  return visible
}

export const DEFAULT_OPACITY_BY_LAYER: Record<string, number> = {
  'AHN4 Hoogtekaart Kleur': 0.85,
  'AHN4 Hillshade NL': 0.7,
  'AHN4 Multi-Hillshade NL': 0.7,
  'AHN4 Hillshade Kleur': 0.8,
  'AHN 0.5m': 0.7,
  'TMK 1850': 0.8,
  'Bonnebladen 1900': 0.8,
  'Geomorfologie': 0.5,
  'Bodemkaart': 0.6,
  'Veengebieden': 0.6,
  'IKAW': 0.5,
  'FAMKE Steentijd': 0.6,
  'FAMKE IJzertijd': 0.6,
  'Essen': 0.6,
  'Terpen': 0.7,
  'AMK Monumenten': 0.45,
  'AMK Romeins': 0.6,
  'AMK Steentijd': 0.6,
  'AMK Vroege ME': 0.6,
  'AMK Late ME': 0.6,
  'AMK Overig': 0.6,
  'Paleokaart 9000 v.Chr.': 0.7,
  'Paleokaart 5500 v.Chr.': 0.7,
  'Paleokaart 2750 v.Chr.': 0.7,
  'Paleokaart 1500 v.Chr.': 0.7,
  'Paleokaart 500 v.Chr.': 0.7,
  'Paleokaart 100 n.Chr.': 0.7,
  'Paleokaart 800 n.Chr.': 0.7,
  'Verdedigingslinies': 0.7,
  'Inundatiegebieden': 0.5,
  'Militaire Objecten': 0.8,
  'Religieus Erfgoed': 0.8,
  'Gewaspercelen': 0.6,
  'Kadastrale Grenzen': 0.7,
  'Erfgoedlijnen': 0.7,
  'Oude Kernen': 0.6,
  'Relictenkaart Vlakken': 0.5,
  'Sites Classés Bretagne': 0.5,
  'Sites Classés Normandie': 0.5,
  'Sites Classés Hauts-de-France': 0.5,
  'Sites Classés Grand Est': 0.5,
  'Sites Classés Île-de-France': 0.5,
  'Sites Classés Centre-Val de Loire': 0.5,
  'Sites Classés Bourgogne-FC': 0.5,
  'Sites Classés Pays de la Loire': 0.5,
  'Sites Classés Nouvelle-Aquitaine': 0.5,
  'Sites Classés Auvergne-RA': 0.5,
  'Sites Classés Occitanie': 0.5,
  'Sites Classés PACA': 0.5,
  'Sites Classés Corse': 0.5
}
