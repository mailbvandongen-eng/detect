import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import LayerGroup from 'ol/layer/Group'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Stroke } from 'ol/style'
import { LAYER_STYLES } from './iconStyles'

// Combined Roman Forts layer (points + lines in one layer group)
export async function createRomeinseFortenLayerOL() {
  // Load both GeoJSON files in parallel
  const [fortenResponse, lijnenResponse] = await Promise.all([
    fetch('/detectorapp-nl/data/romeinse_forten.geojson'),
    fetch('/detectorapp-nl/data/romeinse_forten_lijnen.geojson')
  ])

  const [fortenGeojson, lijnenGeojson] = await Promise.all([
    fortenResponse.json(),
    lijnenResponse.json()
  ])

  // Create points features
  const pointFeatures = new GeoJSON().readFeatures(fortenGeojson, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  })
  pointFeatures.forEach(f => f.set('layerType', 'romeinsFort'))

  // Create line features
  const lineFeatures = new GeoJSON().readFeatures(lijnenGeojson, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  })
  lineFeatures.forEach(f => f.set('layerType', 'romeinsFortLijn'))

  // Lines layer (under points)
  const lijnenLayer = new VectorLayer({
    source: new VectorSource({ features: lineFeatures }),
    properties: { title: 'Forten Lijnen' },
    zIndex: 19,
    style: new Style({
      stroke: new Stroke({
        color: '#b91c1c',  // Red for Roman military
        width: 3,
        lineDash: [6, 4]  // Dashed line for historical/reconstructed walls
      })
    })
  })

  // Points layer (on top of lines)
  const fortenLayer = new VectorLayer({
    source: new VectorSource({ features: pointFeatures }),
    properties: { title: 'Forten Punten' },
    zIndex: 20,
    style: LAYER_STYLES.landmark('#b91c1c')  // Red for Roman military
  })

  // Combine in a layer group
  const group = new LayerGroup({
    properties: { title: 'Romeinse Forten' },
    visible: false,
    layers: [lijnenLayer, fortenLayer]
  })

  return group
}
