/**
 * Layer visibility configuration.
 *
 * The old commercial/personal split is retired. The app now exposes every
 * configured theme, base layer and special section by default.
 */

const visibleThemes = new Set<string>([
  'Steentijd & Prehistorie',
  'Paleokaarten',
  'Archeologische lagen',
  'Archeologische verwachtingen',
  'Erfgoed & Monumenten',
  'WOII & Militair',
  'Hillshade & LiDAR',
  'Terrein & Bodem',
  'Percelen',
  "Provinciale Thema's",
  'Fossielen, Mineralen & Goud',
  'Recreatie',
])

const visibleBaseLayers = new Set<string>([
  'Esri (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'TMK 1850',
  'Bonnebladen 1900',
])

const visibleSpecialSections = new Set<string>(['Specials (3D)'])

export const VISIBLE_THEMES = Array.from(visibleThemes)
export const VISIBLE_BASE_LAYERS = Array.from(visibleBaseLayers)
export const VISIBLE_SPECIAL_SECTIONS = Array.from(visibleSpecialSections)

export function isThemeVisible(themeName: string): boolean {
  return visibleThemes.has(themeName)
}

export function isBaseLayerVisible(layerName: string): boolean {
  return visibleBaseLayers.has(layerName)
}

export function isSpecialSectionVisible(sectionName: string): boolean {
  return visibleSpecialSections.has(sectionName)
}

export function getBuildModeLabel(): string {
  return 'DetectorApp NL'
}
