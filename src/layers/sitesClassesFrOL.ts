/**
 * Sites Classés et Inscrits - Frankrijk Nationaal
 * 5,000+ beschermde sites (classés en inscrits) in heel Frankrijk
 * Bron: Géoplateforme IGN - Ministère de la Transition écologique
 */
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Fill, Stroke } from 'ol/style'

export async function createSitesClassesFrLayerOL(): Promise<VectorLayer<VectorSource>> {
  const response = await fetch('/detect/data/sites_classes_fr.geojson')
  const geojson = await response.json()

  console.log(`📍 Sites Classés FR: ${geojson.features?.length || 0} sites`)

  const source = new VectorSource({
    features: new GeoJSON().readFeatures(geojson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  })

  // Sites zijn polygonen, dus Fill style
  const layer = new VectorLayer({
    source,
    properties: {
      title: 'Sites Classés FR',
      type: 'overlay'
    },
    visible: false,
    style: new Style({
      fill: new Fill({ color: 'rgba(34, 139, 34, 0.3)' }), // Groen transparant
      stroke: new Stroke({ color: '#228B22', width: 2 })
    })
  })

  return layer
}
