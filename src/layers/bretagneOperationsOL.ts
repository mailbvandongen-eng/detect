import { createMapPointImage } from '../utils/mapPointStyle'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { Style } from 'ol/style'

// Bretagne Archaeological Operations (Opérations Archéologiques)
// Data from GéoBretagne WFS - DRAC Bretagne
// 3,623 archaeological operations (excavations, surveys, diagnostics)

export async function createBretagneOperationsLayerOL() {
  try {
    const response = await fetch('./data/bretagne_operations_fr.geojson')

    if (!response.ok) {
      throw new Error(`Bretagne operations fetch error: ${response.status}`)
    }

    const geojson = await response.json()
    console.log(`🔍 Bretagne Operations: loaded ${geojson.features?.length || 0} operations`)

    const source = new VectorSource({
      features: new GeoJSON().readFeatures(geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
    })

    const layer = new VectorLayer({
      source: source,
      properties: { title: 'Operaties Bretagne' },
      visible: false,
      zIndex: 27,
      style: (_feature, resolution) => new Style({
        image: createMapPointImage('#f59e0b', resolution)
      })
    })

    return layer
  } catch (error) {
    console.error('❌ Failed to load Bretagne Operations:', error)
    return new VectorLayer({
      source: new VectorSource(),
      properties: { title: 'Operaties Bretagne' },
      visible: false
    })
  }
}
