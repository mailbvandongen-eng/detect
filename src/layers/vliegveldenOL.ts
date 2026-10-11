import { getMapPointStyle } from '../utils/mapPointStyle'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'

// Militaire Vliegvelden (Military Airfields) from OpenStreetMap
// Includes active and historic military air bases

export async function createVliegveldenLayerOL(): Promise<VectorLayer<VectorSource>> {
  try {
    const response = await fetch('./data/military/vliegvelden.geojson')
    if (!response.ok) throw new Error('Failed to load vliegvelden data')

    const geojson = await response.json()

    const source = new VectorSource({
      features: new GeoJSON().readFeatures(geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
    })

    const layer = new VectorLayer({
      source,
      properties: { title: 'Militaire Vliegvelden' },
      visible: false,
      zIndex: 34,
      style: (_feature, resolution) => getMapPointStyle('#0369a1', resolution)
    })

    console.log(`✈️ Militaire Vliegvelden loaded (${geojson.features.length} locations)`)
    return layer
  } catch (error) {
    console.error('Failed to load vliegvelden:', error)
    return new VectorLayer({
      source: new VectorSource(),
      properties: { title: 'Militaire Vliegvelden' },
      visible: false,
      zIndex: 34
    })
  }
}
