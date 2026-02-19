import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { LAYER_STYLES } from './iconStyles'

/**
 * Grafheuvels (burial mounds/tumuli) layer from OpenStreetMap
 * 1815 Bronze Age and Iron Age burial mounds in the Netherlands
 */
export async function createGrafheuvelsLayerOL() {
  const response = await fetch('/detect/data/grafheuvels.geojson')
  const geojson = await response.json()

  const source = new VectorSource({
    features: new GeoJSON().readFeatures(geojson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  })

  console.log(`📍 Grafheuvels: ${source.getFeatures().length} grafheuvels geladen`)

  const layer = new VectorLayer({
    source: source,
    properties: {
      title: 'Grafheuvels'
    },
    visible: false,
    zIndex: 25,
    style: LAYER_STYLES.grafheuvel()
  })

  return layer
}
