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
  maxResults: number = 50
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
      // Get center coordinates
      const geometry = feature.getGeometry()
      if (!geometry) continue

      const extent = geometry.getExtent()
      const center = getCenter(extent)
      // Transform from EPSG:3857 (Web Mercator) to WGS84
      const [lng, lat] = transform(center, 'EPSG:3857', 'EPSG:4326')

      const originalOmschrijving = feature.get('omschrijving') || ''

      results.push({
        id: feature.get('ID') || feature.get('monumentnummer'),
        monumentnummer: feature.get('monumentnummer'),
        toponiem: feature.get('toponiem') || 'Onbekend',
        kwaliteitswaarde: feature.get('kwaliteitswaarde') || '',
        periode: feature.get('txt_label') || '',
        omschrijving: originalOmschrijving,
        matchedText: extractMatchSnippet(originalOmschrijving, queryWords[0]),
        coordinates: [lng, lat]
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
