import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Fill, Stroke, Style, Text } from 'ol/style'
import {
  THEDIRAC_HIKES_BY_ID,
  THEDIRAC_HIKES_LAYER_NAME,
  type ThediracHike,
  type ThediracHikeDifficulty
} from '../data/thediracHikes'

const HIKE_DATA_URL = '/detect/data/thedirac_spectacular_hikes.geojson'

const difficultyColors: Record<ThediracHikeDifficulty, string> = {
  makkelijk: '#16a34a',
  gemiddeld: '#f97316',
  zwaar: '#dc2626'
}

const styleCache = new Map<string, Style[]>()

function routeStyles(route: ThediracHike, resolution: number) {
  const close = resolution <= 20
  const showLabel = resolution <= 14
  const cacheKey = `${route.id}:${close ? 'close' : 'far'}:${showLabel ? 'label' : 'plain'}`
  const cached = styleCache.get(cacheKey)
  if (cached) return cached

  const color = difficultyColors[route.difficulty]
  const styles = [
    new Style({
      stroke: new Stroke({
        color: 'rgba(255,255,255,0.96)',
        width: close ? 8 : 6,
        lineCap: 'round',
        lineJoin: 'round'
      })
    }),
    new Style({
      stroke: new Stroke({
        color,
        width: close ? 5 : 3.5,
        lineCap: 'round',
        lineJoin: 'round'
      }),
      text: showLabel
        ? new Text({
            text: route.name,
            placement: 'line',
            overflow: true,
            font: '600 12px sans-serif',
            fill: new Fill({ color: '#111827' }),
            stroke: new Stroke({ color: '#ffffff', width: 4 })
          })
        : undefined
    })
  ]

  styleCache.set(cacheKey, styles)
  return styles
}

function directionsUrl(route: ThediracHike) {
  return `https://www.google.com/maps/dir/?api=1&destination=${route.startLat},${route.startLon}&travelmode=driving`
}

function enrichFeature(feature: any) {
  const routeId = String(feature.get('routeId') || feature.getId() || '')
  const route = THEDIRAC_HIKES_BY_ID.get(routeId)
  if (!route) return

  feature.setId(route.id)
  feature.unset('routeId', true)
  feature.unset('geometryKm', true)
  feature.unset('pointCount', true)
  feature.setProperties({
    layerType: 'importedLayer',
    layerName: THEDIRAC_HIKES_LAYER_NAME,
    layerColor: difficultyColors[route.difficulty],
    name: route.name,
    Afstand: route.distance,
    'Hoogteverschil': route.ascent,
    'Duur': route.duration,
    'Zwaarte in Detect': route.difficulty,
    'Officiële kwalificatie': route.officialDifficulty,
    'Route & markering': route.routeType,
    'Bijzonderheden': route.highlights,
    'Natuur & wildlife': route.natureWildlife,
    'Klimmen & klauteren': route.climbing,
    'Knieën & terrein': route.kneeTerrain,
    'Omstandigheden': route.conditions,
    'Statuscontrole': 'Routefiche en GPX gecontroleerd op 4 september 2026; controleer vlak voor vertrek actuele afsluitingen en weer.',
    'Route naar start': directionsUrl(route),
    'Officiële website': route.officialPage,
    'Officiële GPX': route.officialGpx,
    'Bron': route.source
  }, true)
}

export function createThediracHikesLayerOL() {
  const source = new VectorSource({
    url: HIKE_DATA_URL,
    format: new GeoJSON({ featureProjection: 'EPSG:3857' }),
    attributions: 'Wandelroutes en geometrie: officiële toerisme- en departementale routefiches/GPX-bestanden'
  })

  source.on('featuresloadend', () => {
    source.getFeatures().forEach(enrichFeature)
  })

  return new VectorLayer({
    properties: { title: THEDIRAC_HIKES_LAYER_NAME, type: 'overlay' },
    visible: false,
    opacity: 1,
    zIndex: 40,
    declutter: true,
    renderBuffer: 120,
    source,
    style: (feature, resolution) => {
      const routeId = String(feature.getId() || feature.get('routeId') || '')
      const route = THEDIRAC_HIKES_BY_ID.get(routeId)
      if (!route) return undefined
      return routeStyles(route, resolution)
    }
  })
}
