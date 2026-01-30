/**
 * Kansenkaart - Predictive Archaeological Expectation Map
 *
 * Combines multiple data sources to create a weighted heatmap showing
 * areas with high archaeological potential based on known finds and features.
 *
 * Score weights:
 * - AMK Zeer Hoog: 5 (proven very important site)
 * - AMK Hoog: 4 (proven important site)
 * - AMK Basis: 3 (known archaeological value)
 * - Grafheuvels: 4 (prehistoric habitation indicator)
 * - Hunebedden: 4 (Neolithic culture marker)
 * - Steentijd sites: 3 (prehistoric habitation)
 * - UIKAV Punten: 3 (Utrecht expectation data)
 * - Kastelen: 2 (medieval habitation)
 * - Ruïnes: 2 (historic structures)
 *
 * The edges of hotspots indicate areas likely to contain undiscovered sites.
 */

import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Vector as VectorSource } from 'ol/source'
import { Heatmap as HeatmapLayer } from 'ol/layer'
import GeoJSON from 'ol/format/GeoJSON'
import { fromLonLat } from 'ol/proj'
import { loadTopoJSON, parseGeoJSON } from '../utils/layerLoaderOL'

// Weight configuration for different feature types
const WEIGHTS = {
  amk_zeer_hoog: 1.0,      // Maximum weight
  amk_hoog: 0.8,
  amk_basis: 0.6,
  grafheuvel: 0.8,
  hunebed: 0.8,
  steentijd: 0.6,
  uikav: 0.6,
  kasteel: 0.4,
  ruine: 0.4,
}

// Cache for loaded data
let cachedWeightedPoints: Feature<Point>[] | null = null
let isLoading = false
let loadPromise: Promise<Feature<Point>[]> | null = null

/**
 * Load GeoJSON file and return features
 */
async function loadGeoJSONFeatures(url: string): Promise<Feature[]> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.warn(`Kansenkaart: Could not load ${url}`)
      return []
    }
    const geojson = await response.json()
    return new GeoJSON().readFeatures(geojson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  } catch (error) {
    console.warn(`Kansenkaart: Error loading ${url}:`, error)
    return []
  }
}

/**
 * Extract centroid point from any geometry type
 */
function getCentroid(feature: Feature): [number, number] | null {
  const geom = feature.getGeometry()
  if (!geom) return null

  if (geom.getType() === 'Point') {
    return (geom as Point).getCoordinates() as [number, number]
  }

  // For polygons and other geometries, get the center of the extent
  const extent = geom.getExtent()
  return [
    (extent[0] + extent[2]) / 2,
    (extent[1] + extent[3]) / 2
  ]
}

/**
 * Create a weighted point feature for the heatmap
 */
function createWeightedPoint(coords: [number, number], weight: number): Feature<Point> {
  const feature = new Feature({
    geometry: new Point(coords),
    weight: weight
  })
  return feature
}

/**
 * Load all data sources and create weighted point features
 */
async function loadAllWeightedPoints(): Promise<Feature<Point>[]> {
  if (cachedWeightedPoints) return cachedWeightedPoints

  // Prevent duplicate loading
  if (isLoading && loadPromise) return loadPromise

  isLoading = true

  loadPromise = (async () => {
    const weightedPoints: Feature<Point>[] = []

    console.log('🗺️ Kansenkaart: Loading archaeological data sources...')

    // Load all data sources in parallel
    const [
      amkGeojson,
      grafheuvelsFeatures,
      hunebeddenFeatures,
      steentijdFeatures,
      uikavFeatures,
      kastelenFeatures,
      ruinesFeatures
    ] = await Promise.all([
      // AMK - TopoJSON
      loadTopoJSON('/detectorapp-nl/data/amk_monumenten_full.topojson').catch(() => null),
      // Grafheuvels
      loadGeoJSONFeatures('/detectorapp-nl/data/grafheuvels.geojson'),
      // Hunebedden
      loadGeoJSONFeatures('/detectorapp-nl/data/steentijd/hunebedden.geojson'),
      // EuroEVOL Steentijd sites
      loadGeoJSONFeatures('/detectorapp-nl/data/steentijd/euroevol_nl_be.geojson'),
      // UIKAV Punten
      loadGeoJSONFeatures('/detectorapp-nl/data/uikav/uikav_archeo_punten.geojson'),
      // Kastelen
      loadGeoJSONFeatures('/detectorapp-nl/data/kastelen.geojson'),
      // Ruïnes
      loadGeoJSONFeatures('/detectorapp-nl/data/ruines_osm.geojson')
    ])

    // Process AMK monuments with quality-based weights
    if (amkGeojson) {
      const amkFeatures = parseGeoJSON(amkGeojson)
      for (const feature of amkFeatures) {
        const coords = getCentroid(feature)
        if (!coords) continue

        const quality = (feature.get('kwaliteitswaarde') || '').toLowerCase()
        let weight = WEIGHTS.amk_basis

        if (quality.includes('zeer hoge')) {
          weight = WEIGHTS.amk_zeer_hoog
        } else if (quality.includes('hoge')) {
          weight = WEIGHTS.amk_hoog
        }

        weightedPoints.push(createWeightedPoint(coords, weight))
      }
      console.log(`  ✓ AMK: ${amkFeatures.length} monumenten`)
    }

    // Process Grafheuvels
    for (const feature of grafheuvelsFeatures) {
      const coords = getCentroid(feature)
      if (coords) {
        weightedPoints.push(createWeightedPoint(coords, WEIGHTS.grafheuvel))
      }
    }
    console.log(`  ✓ Grafheuvels: ${grafheuvelsFeatures.length}`)

    // Process Hunebedden
    for (const feature of hunebeddenFeatures) {
      const coords = getCentroid(feature)
      if (coords) {
        weightedPoints.push(createWeightedPoint(coords, WEIGHTS.hunebed))
      }
    }
    console.log(`  ✓ Hunebedden: ${hunebeddenFeatures.length}`)

    // Process Steentijd sites
    for (const feature of steentijdFeatures) {
      const coords = getCentroid(feature)
      if (coords) {
        weightedPoints.push(createWeightedPoint(coords, WEIGHTS.steentijd))
      }
    }
    console.log(`  ✓ Steentijd sites: ${steentijdFeatures.length}`)

    // Process UIKAV
    for (const feature of uikavFeatures) {
      const coords = getCentroid(feature)
      if (coords) {
        weightedPoints.push(createWeightedPoint(coords, WEIGHTS.uikav))
      }
    }
    console.log(`  ✓ UIKAV punten: ${uikavFeatures.length}`)

    // Process Kastelen
    for (const feature of kastelenFeatures) {
      const coords = getCentroid(feature)
      if (coords) {
        weightedPoints.push(createWeightedPoint(coords, WEIGHTS.kasteel))
      }
    }
    console.log(`  ✓ Kastelen: ${kastelenFeatures.length}`)

    // Process Ruïnes
    for (const feature of ruinesFeatures) {
      const coords = getCentroid(feature)
      if (coords) {
        weightedPoints.push(createWeightedPoint(coords, WEIGHTS.ruine))
      }
    }
    console.log(`  ✓ Ruïnes: ${ruinesFeatures.length}`)

    console.log(`🗺️ Kansenkaart: ${weightedPoints.length} total weighted points loaded`)

    cachedWeightedPoints = weightedPoints
    isLoading = false
    return weightedPoints
  })()

  return loadPromise
}

/**
 * Create the Kansenkaart heatmap layer
 */
export async function createKansenkaartLayerOL() {
  try {
    const weightedPoints = await loadAllWeightedPoints()

    const source = new VectorSource({
      features: weightedPoints
    })

    const heatmapLayer = new HeatmapLayer({
      source: source,
      properties: {
        title: 'Kansenkaart',
        type: 'heatmap'
      },
      visible: false,
      opacity: 0.7,
      zIndex: 5, // Below other layers but above base map
      blur: 25,
      radius: 15,
      weight: (feature) => {
        // Get the weight we stored on the feature
        return feature.get('weight') || 0.5
      },
      // Gradient: blue (low) -> green -> yellow -> red (high)
      gradient: ['#0000ff', '#00ffff', '#00ff00', '#ffff00', '#ff8800', '#ff0000']
    })

    console.log('✓ Kansenkaart heatmap layer created')
    return heatmapLayer

  } catch (error) {
    console.error('Failed to create Kansenkaart layer:', error)
    return null
  }
}

/**
 * Get statistics about loaded data
 */
export function getKansenkaartStats() {
  return {
    totalPoints: cachedWeightedPoints?.length || 0,
    isLoaded: cachedWeightedPoints !== null
  }
}
