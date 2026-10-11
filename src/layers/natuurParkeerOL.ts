import { getMapPointStyle } from '../utils/mapPointStyle'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Style } from 'ol/style'

// Cache for localStorage
const CACHE_KEY = 'natuurparkeer_cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface ParkeerCache {
  timestamp: number
  data: ParkeerFeature[]
}

interface ParkeerFeature {
  lon: number
  lat: number
  name?: string
  fee?: string
  capacity?: string
  access?: string
  surface?: string
  operator?: string
  opening_hours?: string
  natuurgebied?: string
}

/**
 * Fetch parking areas near nature reserves from OpenStreetMap via Overpass API
 */
async function fetchNatuurParkeer(): Promise<ParkeerFeature[]> {
  // Check cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { timestamp, data } = JSON.parse(cached) as ParkeerCache
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log(`✓ Natuurparkeerplaatsen loaded from cache (${data.length} locations)`)
        return data
      }
    }
  } catch {
    // Cache read failed
  }

  // Fetch parking areas associated with nature reserves, forests, parks
  // Broader query to find more relevant parking spots
  const query = `
    [out:json][timeout:60];
    area["ISO3166-1"="NL"]->.nl;
    (
      // Parkeren bij Staatsbosbeheer, Natuurmonumenten, etc.
      nwr["amenity"="parking"]["operator"~"Staatsbosbeheer|Natuurmonumenten|Landschap|PWN|Waternet",i](area.nl);
      // Parkeren met natuur-gerelateerde namen
      nwr["amenity"="parking"]["name"~"bos|natuur|heide|duin|wandel|recreatie|forest|park",i](area.nl);
      // Parkeren bij bezoekerscentra (vaak bij natuurgebieden)
      nwr["amenity"="parking"]["tourism"](area.nl);
      // Onverharde parkeerplaatsen (vaak in natuur)
      nwr["amenity"="parking"]["surface"~"gravel|unpaved|grass|ground"](area.nl);
      // Gratis parkeren op afgelegen locaties
      nwr["amenity"="parking"]["fee"="no"]["access"!="private"](area.nl);
    );
    out center;
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

    const features: ParkeerFeature[] = data.elements
      .filter((el: any) => {
        const lon = el.lon ?? el.center?.lon
        const lat = el.lat ?? el.center?.lat
        return lon && lat
      })
      .map((el: any) => {
        const tags = el.tags || {}
        const lon = el.lon ?? el.center?.lon
        const lat = el.lat ?? el.center?.lat

        // Determine fee status text
        let feeText = tags.fee
        if (feeText === 'yes') feeText = 'Betaald'
        else if (feeText === 'no') feeText = 'Gratis'

        return {
          lon,
          lat,
          name: tags.name || 'Parkeerplaats',
          fee: feeText,
          capacity: tags.capacity,
          access: tags.access,
          surface: tags.surface,
          operator: tags.operator,
          opening_hours: tags.opening_hours,
          natuurgebied: tags['is_in'] || tags.description
        }
      })

    // Cache the result
    try {
      const cache: ParkeerCache = { timestamp: Date.now(), data: features }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
    } catch {
      // Cache write failed
    }

    console.log(`✓ Natuurparkeerplaatsen fetched from OSM (${features.length} locations)`)
    return features

  } catch (error) {
    console.warn('⚠ Failed to fetch natuurparkeer from Overpass:', error)

    // Try stale cache
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data } = JSON.parse(cached) as ParkeerCache
        console.log(`✓ Using stale cache (${data.length} locations)`)
        return data
      }
    } catch {
      // No cache
    }

    return []
  }
}

function getParkeerStyle(feature: any, resolution: number): Style {
  return getMapPointStyle(feature.get('fee') === 'Betaald' ? '#f59e0b' : '#22c55e', resolution)
}

/**
 * Parkeerplaatsen bij natuurgebieden in Nederland
 * Bron: OpenStreetMap via Overpass API
 * Groen = gratis, Oranje = betaald
 * Uses lazy loading - data is only fetched when layer is first made visible
 */
export async function createNatuurParkeerLayerOL() {
  // Start with empty source - data loaded lazily
  const source = new VectorSource()
  let dataLoaded = false
  let isLoading = false

  const layer = new VectorLayer({
    source: source,
    properties: { title: 'Natuurparkeren', type: 'overlay' },
    visible: false,
    style: (feature, resolution) => getParkeerStyle(feature, resolution),
    zIndex: 26
  })

  // Lazy load data when layer becomes visible
  layer.on('change:visible', async () => {
    if (layer.getVisible() && !dataLoaded && !isLoading) {
      isLoading = true
      console.log('🔄 Natuurparkeren: laden...')

      const parkeerData = await fetchNatuurParkeer()

      const features = parkeerData.map(item => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([item.lon, item.lat])),
          name: item.name,
          fee: item.fee,
          capacity: item.capacity,
          access: item.access,
          surface: item.surface,
          operator: item.operator,
          opening_hours: item.opening_hours,
          natuurgebied: item.natuurgebied
        })
        return feature
      })

      source.addFeatures(features)
      dataLoaded = true
      isLoading = false
      console.log(`✓ Natuurparkeren geladen (${features.length} locaties)`)
    }
  })

  return layer
}
