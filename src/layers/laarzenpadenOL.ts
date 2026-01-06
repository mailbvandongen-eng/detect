import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Feature } from 'ol'
import { LineString } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Style, Stroke } from 'ol/style'

// Cache for localStorage
const CACHE_KEY = 'laarzenpaden_cache'
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

interface LaarzenpadCache {
  timestamp: number
  data: LaarzenpadFeature[]
}

interface LaarzenpadFeature {
  coords: [number, number][]
  name?: string
  surface?: string
  smoothness?: string
  trail_visibility?: string
  access?: string
}

/**
 * Fetch muddy/wet trails (laarzenpaden) from OpenStreetMap via Overpass API
 * These are paths where rubber boots are recommended
 */
async function fetchLaarzenpaden(): Promise<LaarzenpadFeature[]> {
  // Check cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { timestamp, data } = JSON.parse(cached) as LaarzenpadCache
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log(`✓ Laarzenpaden loaded from cache (${data.length} trails)`)
        return data
      }
    }
  } catch {
    // Cache read failed
  }

  // Fetch trails that are typically muddy/wet
  // - surface=mud/ground/grass/dirt
  // - smoothness=very_bad/horrible/very_horrible
  // - trail_visibility=bad/horrible/no
  const query = `
    [out:json][timeout:90];
    area["ISO3166-1"="NL"]->.nl;
    (
      // Paths with muddy surfaces
      way["highway"~"path|track|footway"]["surface"="mud"](area.nl);
      way["highway"~"path|track"]["surface"="ground"]["smoothness"~"very_bad|horrible|very_horrible"](area.nl);
      // Paths explicitly tagged for hiking with bad smoothness
      way["highway"~"path|track"]["sac_scale"~"hiking|mountain_hiking"]["smoothness"~"bad|very_bad|horrible"](area.nl);
      // Paths in wetlands/marshes
      way["highway"~"path|track"]["wetland"](area.nl);
      // Difficult trails with poor visibility
      way["highway"="path"]["trail_visibility"~"bad|horrible|no"](area.nl);
    );
    out geom;
  `

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`
    })

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`)
    }

    const data = await response.json()

    const features: LaarzenpadFeature[] = data.elements
      .filter((el: any) => el.type === 'way' && el.geometry && el.geometry.length > 1)
      .map((el: any) => {
        const tags = el.tags || {}
        const coords: [number, number][] = el.geometry.map((g: any) => [g.lon, g.lat])

        return {
          coords,
          name: tags.name || undefined,
          surface: tags.surface,
          smoothness: tags.smoothness,
          trail_visibility: tags.trail_visibility,
          access: tags.access
        }
      })

    // Cache the result
    try {
      const cache: LaarzenpadCache = { timestamp: Date.now(), data: features }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
    } catch {
      // Cache write failed (too large?)
      console.warn('⚠ Could not cache laarzenpaden (too large)')
    }

    console.log(`✓ Laarzenpaden fetched from OSM (${features.length} trails)`)
    return features

  } catch (error) {
    console.warn('⚠ Failed to fetch laarzenpaden from Overpass:', error)

    // Try stale cache
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data } = JSON.parse(cached) as LaarzenpadCache
        console.log(`✓ Using stale cache (${data.length} trails)`)
        return data
      }
    } catch {
      // No cache
    }

    return []
  }
}

// Create style based on zoom - muddy trail styling (brown dotted line)
function getLaarzenpadStyle(resolution: number): Style {
  let width = 3
  if (resolution > 100) width = 1.5
  else if (resolution > 50) width = 2
  else if (resolution > 20) width = 2.5
  else if (resolution > 10) width = 3
  else width = 4

  return new Style({
    stroke: new Stroke({
      color: '#78350f', // Amber-900 (dark muddy brown)
      width: width,
      lineDash: [4, 4], // Dotted line for challenging trails
      lineCap: 'round',
      lineJoin: 'round'
    })
  })
}

/**
 * Laarzenpaden in Nederland
 * Modderige/natte paden waar laarzen nodig zijn
 * Bron: OpenStreetMap via Overpass API
 */
export async function createLaarzenpadenLayerOL() {
  const laarzenpadData = await fetchLaarzenpaden()

  const features = laarzenpadData.map(item => {
    const coords = item.coords.map(c => fromLonLat(c))
    const feature = new Feature({
      geometry: new LineString(coords),
      name: item.name || 'Laarzenpad',
      surface: item.surface,
      smoothness: item.smoothness,
      trail_visibility: item.trail_visibility,
      access: item.access
    })
    return feature
  })

  const source = new VectorSource({ features })

  const layer = new VectorLayer({
    source: source,
    properties: { title: 'Laarzenpaden', type: 'overlay' },
    visible: false,
    style: (feature, resolution) => getLaarzenpadStyle(resolution),
    zIndex: 14 // Below point markers, similar to ruiterpaden
  })

  return layer
}
