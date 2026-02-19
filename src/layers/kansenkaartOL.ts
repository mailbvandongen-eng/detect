/**
 * Kansenkaart - Predictive Archaeological Expectation Map
 *
 * Combines multiple data sources to create a weighted heatmap showing
 * areas with high archaeological potential based on:
 *
 * 1. LANDSCAPE (geomorfologie) - where people COULD live:
 *    - Stroomruggen, oeverwallen (dry elevated river areas)
 *    - Rivierduinen (river dunes)
 *    - Dekzandruggen (cover sand ridges)
 *    - Terpen/wierden (artificial dwelling mounds)
 *
 * 2. FINDS - where people DID live:
 *    - AMK Monumenten (known archaeological sites)
 *    - Grafheuvels (burial mounds)
 *    - Hunebedden (megalithic tombs)
 *    - Steentijd sites (prehistoric settlements)
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
  // Geomorfologie - landscape potential (where people COULD live)
  geomorf_zeer_hoog: 1.0,   // Stroomruggen, oeverwallen, rivierduinen, terpen
  geomorf_hoog: 0.8,        // Dekzandruggen, dekzandkopjes, stuwwallen
  geomorf_middel: 0.6,      // Getij-oeverwallen, strandwallen, landduinen
  geomorf_laag: 0.4,        // Dekzandwelvingen, stroomrugglooiingen

  // Archaeological finds (where people DID live)
  amk_zeer_hoog: 1.0,       // Proven very important site
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
      ruinesFeatures,
      geomorfologieFeatures
    ] = await Promise.all([
      // AMK - TopoJSON
      loadTopoJSON('/detect/data/amk_monumenten_full.topojson').catch(() => null),
      // Grafheuvels
      loadGeoJSONFeatures('/detect/data/grafheuvels.geojson'),
      // Hunebedden
      loadGeoJSONFeatures('/detect/data/steentijd/hunebedden.geojson'),
      // EuroEVOL Steentijd sites
      loadGeoJSONFeatures('/detect/data/steentijd/euroevol_nl_be.geojson'),
      // UIKAV Punten
      loadGeoJSONFeatures('/detect/data/uikav/uikav_archeo_punten.geojson'),
      // Kastelen
      loadGeoJSONFeatures('/detect/data/kastelen.geojson'),
      // Ruïnes
      loadGeoJSONFeatures('/detect/data/ruines_osm.geojson'),
      // Geomorfologie hotspots (stroomruggen, rivierduinen, dekzandruggen, etc.)
      loadGeoJSONFeatures('/detect/data/geomorfologie_hotspots.geojson')
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

    // Process Geomorfologie hotspots (stroomruggen, rivierduinen, dekzandruggen, etc.)
    // The weight is already stored in the GeoJSON from the extraction script
    for (const feature of geomorfologieFeatures) {
      const coords = getCentroid(feature)
      if (coords) {
        // Get the pre-calculated weight from the feature properties
        const featureWeight = feature.get('weight') || 0.5
        weightedPoints.push(createWeightedPoint(coords, featureWeight))
      }
    }
    console.log(`  ✓ Geomorfologie hotspots: ${geomorfologieFeatures.length}`)

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
    console.log('🗺️ Kansenkaart: Starting layer creation...')
    const weightedPoints = await loadAllWeightedPoints()
    console.log(`🗺️ Kansenkaart: Got ${weightedPoints.length} weighted points`)

    const source = new VectorSource({
      features: weightedPoints
    })

    const heatmapLayer = new HeatmapLayer({
      source: source,
      properties: {
        title: 'Kansenkaart',
        type: 'heatmap',
        queryable: false  // No popup for heatmap
      },
      visible: false,
      opacity: 0.6,
      zIndex: 5, // Below other layers but above base map
      blur: 15,   // Reduced for better performance
      radius: 8,  // Reduced for better performance with many points
      weight: (feature) => {
        // Get the weight we stored on the feature
        return feature.get('weight') || 0.5
      },
      // Gradient: transparent -> blue -> cyan -> green -> yellow -> orange -> red
      gradient: ['rgba(0,0,255,0)', 'rgba(0,0,255,0.5)', '#00ffff', '#00ff00', '#ffff00', '#ff8800', '#ff0000']
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
