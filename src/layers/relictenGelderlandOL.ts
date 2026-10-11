import { getMapPointStyle } from '../utils/mapPointStyle'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import proj4 from 'proj4'
import { register } from 'ol/proj/proj4'
import { Style } from 'ol/style'

// Ensure EPSG:28992 is registered
proj4.defs('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs')
register(proj4)

// Cache for localStorage
const CACHE_KEY = 'relicten_gelderland_cache_v2'
const CACHE_DURATION = 14 * 24 * 60 * 60 * 1000 // 14 days (data doesn't change often)

interface RelictFeature {
  coords: [number, number] // lon, lat (WGS84)
  type: string
  klasse: number
}

interface RelictCache {
  timestamp: number
  data: RelictFeature[]
}

// Type code to icon mapping
// Type codes are like "KV14", "K21", "B35" - we extract the letter prefix
const TYPE_ICONS: Record<string, { icon: string; color: string; name: string }> = {
  'KV': { icon: 'castle', color: '#7c3aed', name: 'Kasteel/Vesting' },
  'K': { icon: 'church', color: '#9333ea', name: 'Kapel' },
  'M': { icon: 'windmill', color: '#b45309', name: 'Molen' },
  'EK': { icon: 'duck', color: '#0891b2', name: 'Eendenkooi' },
  'H': { icon: 'estate', color: '#4f46e5', name: 'Havezate' },
  'B': { icon: 'farm', color: '#65a30d', name: 'Boerderij' },
  'OB': { icon: 'ruins', color: '#6b7280', name: 'Oude Bebouwing' },
  'WM': { icon: 'watermill', color: '#0284c7', name: 'Watermolen' },
  'BR': { icon: 'bridge', color: '#64748b', name: 'Brug' },
  'S': { icon: 'landmark', color: '#0f766e', name: 'Spoor/Relict' },
  'G': { icon: 'tumulus', color: '#854d0e', name: 'Graf/Heuvel' },
  'T': { icon: 'terp', color: '#0d9488', name: 'Terp' },
  'P': { icon: 'well', color: '#0d9488', name: 'Put/Bron' },
  'V': { icon: 'bunker', color: '#57534e', name: 'Verdediging' }
}

// Default style for unknown types
const DEFAULT_ICON = { icon: 'mapPin', color: '#dc2626', name: 'Onbekend' }

// Extract type prefix from full type code (e.g., "KV14" -> "KV", "K21" -> "K")
function extractTypePrefix(typeCode: string): string {
  if (!typeCode) return ''
  // Match letters at start, up to 2 characters
  const match = typeCode.match(/^([A-Z]{1,2})/)
  return match ? match[1] : ''
}

// Get style for a feature based on its type
function getCachedStyle(typeCode: string, resolution: number): Style {
  const prefix = extractTypePrefix(typeCode)
  return getMapPointStyle((TYPE_ICONS[prefix] || DEFAULT_ICON).color, resolution)
}

/**
 * Fetch Relicten data from Gelderland WFS service
 */
async function fetchRelicten(): Promise<RelictFeature[]> {
  // Check cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { timestamp, data } = JSON.parse(cached) as RelictCache
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log(`✓ Relicten Gelderland loaded from cache (${data.length} features)`)
        return data
      }
    }
  } catch {
    // Cache read failed
  }

  // Fetch from WFS
  const wfsUrl = 'https://geoserver.gelderland.nl/geoserver/ngr_a/wfs?' +
    'service=WFS&version=2.0.0&request=GetFeature' +
    '&typeName=ChAr_Relictenkaart_p' +
    '&outputFormat=application/json'

  try {
    console.log('🔄 Relicten Gelderland: laden van WFS...')
    const response = await fetch(wfsUrl)

    if (!response.ok) {
      throw new Error(`WFS error: ${response.status}`)
    }

    const data = await response.json()

    const features: RelictFeature[] = data.features
      .filter((f: any) => f.geometry && f.geometry.coordinates)
      .map((f: any) => {
        // Convert RD (EPSG:28992) to WGS84 (EPSG:4326)
        const rdCoords = f.geometry.coordinates
        const wgs84 = proj4('EPSG:28992', 'EPSG:4326', rdCoords)

        return {
          coords: wgs84 as [number, number],
          type: f.properties.type || '',
          klasse: f.properties.klasse || 0
        }
      })

    // Cache the result
    try {
      const cache: RelictCache = { timestamp: Date.now(), data: features }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
      console.log(`✓ Relicten Gelderland cached (${features.length} features)`)
    } catch {
      console.warn('⚠ Could not cache Relicten Gelderland (too large)')
    }

    console.log(`✓ Relicten Gelderland fetched from WFS (${features.length} features)`)
    return features

  } catch (error) {
    console.warn('⚠ Failed to fetch Relicten Gelderland:', error)

    // Try stale cache
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data } = JSON.parse(cached) as RelictCache
        console.log(`✓ Using stale cache (${data.length} features)`)
        return data
      }
    } catch {
      // No cache
    }

    return []
  }
}

/**
 * Relictenkaart Punten Gelderland - met eigen iconen
 * Havezaten, molens, eendenkooien, kastelen, kapellen, etc.
 * Bron: Provincie Gelderland via WFS
 * Uses lazy loading - data is only fetched when layer is first made visible
 */
export async function createRelictenPuntenLayerOL() {
  // Start with empty source - data loaded lazily
  const source = new VectorSource()
  let dataLoaded = false
  let isLoading = false

  const layer = new VectorLayer({
    source: source,
    properties: { title: 'Relictenkaart Punten', type: 'overlay' },
    visible: false,
    style: (feature, resolution) => {
      const typeCode = feature.get('type') || ''
      return getCachedStyle(typeCode, resolution)
    },
    zIndex: 20,
    maxResolution: 150 // Alleen tonen vanaf ~10km hoogte
  })

  // Lazy load data when layer becomes visible
  layer.on('change:visible', async () => {
    if (layer.getVisible() && !dataLoaded && !isLoading) {
      isLoading = true

      const relictData = await fetchRelicten()

      const features = relictData.map(item => {
        // Convert lon/lat to Web Mercator
        const mercator = proj4('EPSG:4326', 'EPSG:3857', item.coords)
        const feature = new Feature({
          geometry: new Point(mercator),
          type: item.type,
          klasse: item.klasse
        })
        return feature
      })

      source.addFeatures(features)
      dataLoaded = true
      isLoading = false
      console.log(`✓ Relictenkaart Punten geladen (${features.length} punten)`)
    }
  })

  return layer
}

// Export type info for popup usage
export const RELICT_TYPE_INFO = TYPE_ICONS
