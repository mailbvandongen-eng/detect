/**
 * AMK Monumenten Layer for OpenLayers
 * RCE Archeologische Monumentenkaart with full local data (13,010 monumenten)
 * Data includes: toponiem, kwaliteitswaarde, txt_label, omschrijving
 *
 * Period-specific layers filter based on txt_label field:
 * - Romeins: contains "Romeinse tijd"
 * - Steentijd: contains "Paleolithicum", "Mesolithicum", or "Neolithicum"
 * - Vroege ME: contains "Middeleeuwen vroeg"
 * - Late ME: contains "Middeleeuwen laat" but NOT "Middeleeuwen vroeg"
 * - Overig: everything else
 *
 * Exception: if both Romeins AND Vroege ME are mentioned, feature appears in BOTH
 */

import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Style, Fill, Stroke } from 'ol/style'
import { loadTopoJSON, parseGeoJSON } from '../utils/layerLoaderOL.js'
import type { Feature } from 'ol'

// AMK color scheme (RCE official colors)
const AMK_COLORS: Record<string, string> = {
  'archeologische waarde': '#c4b5fd',
  'hoge archeologische waarde': '#8b5cf6',
  'zeer hoge archeologische waarde': '#6d28d9'
}

// Period-specific colors
const PERIOD_COLORS = {
  romeins: '#ef4444',      // red
  steentijd: '#f59e0b',    // amber
  vroegeME: '#22c55e',     // green
  lateME: '#3b82f6',       // blue
  overig: '#8b5cf6'        // purple (default AMK)
}

// Check if txt_label indicates Romeinse tijd
function isRomeins(txtLabel: string): boolean {
  return /romeinse tijd/i.test(txtLabel)
}

// Check if txt_label indicates Steentijd (Paleo, Meso, Neo)
function isSteentijd(txtLabel: string): boolean {
  return /paleolithicum|mesolithicum|neolithicum/i.test(txtLabel)
}

// Check if txt_label indicates Vroege Middeleeuwen
function isVroegeME(txtLabel: string): boolean {
  return /middeleeuwen vroeg/i.test(txtLabel)
}

// Check if txt_label indicates Late Middeleeuwen (but not Vroege)
function isLateME(txtLabel: string): boolean {
  return /middeleeuwen laat/i.test(txtLabel) && !/middeleeuwen vroeg/i.test(txtLabel)
}

// Cached data to avoid reloading
let cachedFeatures: Feature[] | null = null

async function loadAMKData(): Promise<Feature[]> {
  if (cachedFeatures) return cachedFeatures

  const geojson = await loadTopoJSON('/detectorapp-nl/data/amk_monumenten_full.topojson')
  cachedFeatures = parseGeoJSON(geojson)
  return cachedFeatures
}

// Original AMK layer with all monuments
export async function createAMKLayerOL() {
  try {
    const features = await loadAMKData()

    const layer = new VectorLayer({
      title: 'AMK Monumenten',
      source: new VectorSource({ features }),
      style: (feature) => {
        const waarde = (feature.get('kwaliteitswaarde') || '').trim()
        const color = AMK_COLORS[waarde] || '#ddd'

        return new Style({
          fill: new Fill({ color: color }),
          stroke: new Stroke({ color: color, width: 1.1 })
        })
      },
      opacity: 0.45,
      zIndex: 10
    })

    console.log(`✓ AMK Monumenten loaded (${features.length} features)`)
    return layer

  } catch (error) {
    console.error('Failed to load AMK layer:', error)
    return null
  }
}

// Helper to create a filtered AMK layer
async function createFilteredAMKLayer(
  title: string,
  filterFn: (txtLabel: string) => boolean,
  color: string
) {
  try {
    const allFeatures = await loadAMKData()

    // Clone features that match the filter
    const filteredFeatures = allFeatures.filter(feature => {
      const txtLabel = feature.get('txt_label') || ''
      return filterFn(txtLabel)
    }).map(feature => feature.clone())

    const layer = new VectorLayer({
      title,
      source: new VectorSource({ features: filteredFeatures }),
      style: (feature) => {
        const waarde = (feature.get('kwaliteitswaarde') || '').trim()
        // Use period color with opacity based on quality
        const opacity = waarde === 'zeer hoge archeologische waarde' ? 0.9 :
                       waarde === 'hoge archeologische waarde' ? 0.7 : 0.5

        return new Style({
          fill: new Fill({ color: color + Math.round(opacity * 255).toString(16).padStart(2, '0') }),
          stroke: new Stroke({ color: color, width: 1.5 })
        })
      },
      opacity: 0.6,
      zIndex: 11
    })

    console.log(`✓ ${title} loaded (${filteredFeatures.length} features)`)
    return layer

  } catch (error) {
    console.error(`Failed to load ${title}:`, error)
    return null
  }
}

// Romeinse tijd monuments
export async function createAMKRomeinsLayerOL() {
  return createFilteredAMKLayer(
    'AMK Romeins',
    isRomeins,
    PERIOD_COLORS.romeins
  )
}

// Steentijd monuments (Paleolithicum, Mesolithicum, Neolithicum)
export async function createAMKSteentijdLayerOL() {
  return createFilteredAMKLayer(
    'AMK Steentijd',
    isSteentijd,
    PERIOD_COLORS.steentijd
  )
}

// Vroege Middeleeuwen monuments
export async function createAMKVroegeMELayerOL() {
  return createFilteredAMKLayer(
    'AMK Vroege ME',
    isVroegeME,
    PERIOD_COLORS.vroegeME
  )
}

// Late Middeleeuwen monuments (excluding those that also have Vroege ME)
export async function createAMKLateMELayerOL() {
  return createFilteredAMKLayer(
    'AMK Late ME',
    isLateME,
    PERIOD_COLORS.lateME
  )
}

// Overig - everything that doesn't match above categories
export async function createAMKOverigLayerOL() {
  return createFilteredAMKLayer(
    'AMK Overig',
    (txtLabel) => !isRomeins(txtLabel) && !isSteentijd(txtLabel) && !isVroegeME(txtLabel) && !isLateME(txtLabel),
    PERIOD_COLORS.overig
  )
}
