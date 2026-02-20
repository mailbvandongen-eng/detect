/**
 * Monuments Historiques Île-de-France
 * 3,991 beschermde monumenten (classés en inscrits) in de regio Parijs
 * Bron: Open Data Île-de-France
 */
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Circle, Fill, Stroke } from 'ol/style'

export async function createMonumentsIdfLayerOL(): Promise<VectorLayer<VectorSource>> {
  const response = await fetch('/detect/data/monuments_idf.geojson')
  const geojson = await response.json()

  console.log(`📍 Monuments IDF: ${geojson.features?.length || 0} monumenten`)

  const source = new VectorSource({
    features: new GeoJSON().readFeatures(geojson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  })

  const layer = new VectorLayer({
    source,
    properties: {
      title: 'Monumenten IDF',
      type: 'overlay'
    },
    visible: false,
    style: new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: 'rgba(139, 69, 19, 0.7)' }), // Bruin
        stroke: new Stroke({ color: '#5D3A1A', width: 1 })
      })
    })
  })

  return layer
}
