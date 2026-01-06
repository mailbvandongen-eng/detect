import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Stroke } from 'ol/style'
import { LAYER_STYLES } from './iconStyles'

// Create Roman Forts points layer (castella, watchtowers, etc.)
export async function createRomeinseFortenLayerOL() {
  const response = await fetch('/detectorapp-nl/data/romeinse_forten.geojson')
  const geojson = await response.json()

  const features = new GeoJSON().readFeatures(geojson, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  })

  // Add layerType property to each feature for popup identification
  features.forEach(f => f.set('layerType', 'romeinsFort'))

  const source = new VectorSource({
    features: features
  })

  const layer = new VectorLayer({
    source: source,
    properties: { title: 'Romeinse Forten' },
    visible: false,
    zIndex: 20,
    style: LAYER_STYLES.landmark('#b91c1c')  // Red for Roman military
  })

  return layer
}

// Create Roman Forts lines layer (fort outlines/walls)
export async function createRomeinseFortenLijnenLayerOL() {
  const response = await fetch('/detectorapp-nl/data/romeinse_forten_lijnen.geojson')
  const geojson = await response.json()

  const features = new GeoJSON().readFeatures(geojson, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  })

  // Add layerType property to each feature for popup identification
  features.forEach(f => f.set('layerType', 'romeinsFortLijn'))

  const source = new VectorSource({
    features: features
  })

  const layer = new VectorLayer({
    source: source,
    properties: { title: 'Romeinse Forten Lijnen' },
    visible: false,
    zIndex: 19,
    style: new Style({
      stroke: new Stroke({
        color: '#b91c1c',  // Red for Roman military
        width: 3,
        lineDash: [6, 4]  // Dashed line for historical/reconstructed walls
      })
    })
  })

  return layer
}
