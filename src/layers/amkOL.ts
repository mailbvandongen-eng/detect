import type { FeatureLike } from 'ol/Feature'
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

import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Fill, Stroke } from 'ol/style'
import { loadTopoJSON, parseGeoJSON } from '../utils/layerLoaderOL.js'
import type { Feature } from 'ol'
import { getCenter } from 'ol/extent'
import { transform } from 'ol/proj'
import { useMonumentFilterStore, featureMatchesFilter } from '../store/monumentFilterStore'

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

import { isRomeins, isSteentijd, isVroegeME, isLateME } from '../utils/amkPeriods'

// Cached data to avoid reloading
let cachedFeatures: Feature[] | null = null

let loading: Promise<Feature[]> | null = null
export async function loadAMKData(): Promise<Feature[]> {
  if (cachedFeatures) return cachedFeatures

  if (!loading) loading = loadTopoJSON('./data/amk_monumenten_full.topojson').then(geojson => {
    cachedFeatures = parseGeoJSON(geojson)
    return cachedFeatures!
  }).finally(() => { loading = null })
  return loading
}

function featureMatchesCurrentFilter(feature: FeatureLike): boolean {
  const filterState = useMonumentFilterStore.getState()

  if (!filterState.isActive || (filterState.keyword.trim().length < 2 && filterState.province === 'all')) {
    return true
  }

  const omschrijving = feature.get('omschrijving') || ''
  const toponiem = feature.get('toponiem') || ''
  const txtLabel = feature.get('txt_label') || ''

  const geometry = feature.getGeometry()
  let lng = 5.5
  let lat = 52.0

  if (geometry) {
    const center = getCenter(geometry.getExtent())
    const lonLat = transform(center, 'EPSG:3857', 'EPSG:4326')
    lng = lonLat[0]
    lat = lonLat[1]
  }

  return featureMatchesFilter(
    omschrijving,
    toponiem,
    txtLabel,
    lng,
    lat,
    filterState.keyword,
    filterState.province
  )
}

function subscribeLayerToMonumentFilter(layer: VectorLayer<VectorSource>, features: Feature[]) {
  let prevKeyword = ''
  let prevProvince = 'all'
  let prevIsActive = false

  return useMonumentFilterStore.subscribe((state) => {
    if (
      state.keyword === prevKeyword &&
      state.province === prevProvince &&
      state.isActive === prevIsActive
    ) {
      return
    }

    prevKeyword = state.keyword
    prevProvince = state.province
    prevIsActive = state.isActive
    layer.changed()

    const filtered = state.isActive
      ? features.filter(feature => featureMatchesCurrentFilter(feature)).length
      : features.length

    useMonumentFilterStore.getState().updateCounts(features.length, filtered)
  })
}

// Original AMK layer with all monuments
export async function createAMKLayerOL() {
  try {
    const features = await loadAMKData()

    // Update total count in filter store
    useMonumentFilterStore.getState().updateCounts(features.length, features.length)

    const layer = new VectorLayer({
      properties: { title: 'AMK Monumenten' },
      source: new VectorSource({ features }),
      style: (feature) => {
        if (!featureMatchesCurrentFilter(feature)) return undefined

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

    subscribeLayerToMonumentFilter(layer, features)

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
      properties: { title },
      source: new VectorSource({ features: filteredFeatures }),
      style: (feature) => {
        if (!featureMatchesCurrentFilter(feature)) return undefined

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

    subscribeLayerToMonumentFilter(layer, filteredFeatures)

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
