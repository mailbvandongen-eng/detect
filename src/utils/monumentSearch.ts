/**
 * Monument Search Utility
 * Searches through AMK monument descriptions for keywords
 */

import { loadTopoJSON, parseGeoJSON } from './layerLoaderOL'
import type { Feature } from 'ol'
import { getCenter } from 'ol/extent'
import { transform } from 'ol/proj'

export interface MonumentSearchResult {
  id: number
  monumentnummer: number
  toponiem: string
  kwaliteitswaarde: string
  periode: string
  omschrijving: string
  matchedText: string // The part of description that matched
  coordinates: [number, number] // [lng, lat] in WGS84
  extent: [number, number, number, number] // [minX, minY, maxX, maxY] in EPSG:3857
}

// Province bounding boxes (approximate, in WGS84 lng/lat)
export const PROVINCES: Record<string, { name: string; bounds: [number, number, number, number] }> = {
  'all': { name: 'Alle provincies', bounds: [3.37, 50.75, 7.21, 53.47] },
  'groningen': { name: 'Groningen', bounds: [6.2, 53.1, 7.21, 53.47] },
  'friesland': { name: 'Friesland', bounds: [5.05, 52.85, 6.25, 53.45] },
  'drenthe': { name: 'Drenthe', bounds: [6.1, 52.65, 7.1, 53.15] },
  'overijssel': { name: 'Overijssel', bounds: [5.85, 52.15, 6.9, 52.7] },
  'flevoland': { name: 'Flevoland', bounds: [5.15, 52.25, 6.0, 52.65] },
  'gelderland': { name: 'Gelderland', bounds: [5.0, 51.75, 6.4, 52.45] },
  'utrecht': { name: 'Utrecht', bounds: [4.85, 51.9, 5.65, 52.25] },
  'noord-holland': { name: 'Noord-Holland', bounds: [4.5, 52.2, 5.25, 52.95] },
  'zuid-holland': { name: 'Zuid-Holland', bounds: [3.85, 51.8, 4.9, 52.35] },
  'zeeland': { name: 'Zeeland', bounds: [3.37, 51.2, 4.3, 51.75] },
  'noord-brabant': { name: 'Noord-Brabant', bounds: [4.35, 51.25, 6.0, 51.85] },
  'limburg': { name: 'Limburg', bounds: [5.55, 50.75, 6.25, 51.8] },
}

function isInProvince(lng: number, lat: number, provinceKey: string): boolean {
  if (provinceKey === 'all') return true
  const province = PROVINCES[provinceKey]
  if (!province) return true
  const [minLng, minLat, maxLng, maxLat] = province.bounds
  return lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat
}

// Cache for AMK data
let cachedFeatures: Feature[] | null = null

async function loadAMKData(): Promise<Feature[]> {
  if (cachedFeatures) return cachedFeatures

  const geojson = await loadTopoJSON('/detectorapp-nl/data/amk_monumenten_full.topojson')
  cachedFeatures = parseGeoJSON(geojson)
  return cachedFeatures
}

/**
 * Extract a snippet of text around the matched keyword
 */
function extractMatchSnippet(text: string, keyword: string, contextLength: number = 50): string {
  const lowerText = text.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  const index = lowerText.indexOf(lowerKeyword)

  if (index === -1) return text.substring(0, 100) + '...'

  const start = Math.max(0, index - contextLength)
  const end = Math.min(text.length, index + keyword.length + contextLength)

  let snippet = ''
  if (start > 0) snippet += '...'
  snippet += text.substring(start, end)
  if (end < text.length) snippet += '...'

  return snippet
}

/**
 * Search monuments by keyword in description
 */
export async function searchMonuments(
  query: string,
  maxResults: number = 50,
  province: string = 'all'
): Promise<MonumentSearchResult[]> {
  if (!query || query.length < 2) return []

  const features = await loadAMKData()
  const results: MonumentSearchResult[] = []
  const lowerQuery = query.toLowerCase()

  // Split query into words for multi-word search
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length >= 2)

  for (const feature of features) {
    const omschrijving = (feature.get('omschrijving') || '').toLowerCase()
    const toponiem = (feature.get('toponiem') || '').toLowerCase()
    const txtLabel = (feature.get('txt_label') || '').toLowerCase()

    // Check if ALL query words are present (AND logic)
    const allWordsMatch = queryWords.every(word =>
      omschrijving.includes(word) || toponiem.includes(word) || txtLabel.includes(word)
    )

    if (allWordsMatch) {
      // Get center coordinates first to check province
      const geometry = feature.getGeometry()
      if (!geometry) continue

      const extent = geometry.getExtent()
      const center = getCenter(extent)
      const [lng, lat] = transform(center, 'EPSG:3857', 'EPSG:4326')

      // Check if in selected province
      if (!isInProvince(lng, lat, province)) continue

      const originalOmschrijving = feature.get('omschrijving') || ''

      results.push({
        id: feature.get('ID') || feature.get('monumentnummer'),
        monumentnummer: feature.get('monumentnummer'),
        toponiem: feature.get('toponiem') || 'Onbekend',
        kwaliteitswaarde: feature.get('kwaliteitswaarde') || '',
        periode: feature.get('txt_label') || '',
        omschrijving: originalOmschrijving,
        matchedText: extractMatchSnippet(originalOmschrijving, queryWords[0]),
        coordinates: [lng, lat],
        extent: extent as [number, number, number, number]
      })

      if (results.length >= maxResults) break
    }
  }

  // Sort by quality (zeer hoge > hoge > archeologische waarde)
  results.sort((a, b) => {
    const qualityOrder: Record<string, number> = {
      'zeer hoge archeologische waarde': 3,
      'hoge archeologische waarde': 2,
      'archeologische waarde': 1
    }
    return (qualityOrder[b.kwaliteitswaarde] || 0) - (qualityOrder[a.kwaliteitswaarde] || 0)
  })

  return results
}

/**
 * Preload AMK data for faster first search
 */
export async function preloadMonumentData(): Promise<void> {
  await loadAMKData()
}

/**
 * Get total monument count
 */
export async function getMonumentCount(): Promise<number> {
  const features = await loadAMKData()
  return features.length
}

/**
 * Get monument feature by monumentnummer for highlighting
 */
export async function getMonumentFeature(monumentnummer: number): Promise<Feature | null> {
  const features = await loadAMKData()
  return features.find(f => f.get('monumentnummer') === monumentnummer) || null
}
