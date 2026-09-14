/**
 * Sites Classés et Inscrits - Per Franse Regio
 * Beschermde sites (AC2 servitudes) per regio
 * Bron: Géoplateforme IGN - Ministère de la Transition écologique
 */
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Fill, Stroke } from 'ol/style'

// Regio configuratie
export const SITES_CLASSES_REGIONS = {
  'Sites Classés Bretagne': { file: 'sites_classes_bretagne.geojson', color: '#228B22' },
  'Sites Classés Normandie': { file: 'sites_classes_normandie.geojson', color: '#2E8B57' },
  'Sites Classés Hauts-de-France': { file: 'sites_classes_hauts_de_france.geojson', color: '#3CB371' },
  'Sites Classés Grand Est': { file: 'sites_classes_grand_est.geojson', color: '#20B2AA' },
  'Sites Classés Île-de-France': { file: 'sites_classes_ile_de_france.geojson', color: '#008B8B' },
  'Sites Classés Centre-Val de Loire': { file: 'sites_classes_centre_vdl.geojson', color: '#006400' },
  'Sites Classés Bourgogne-FC': { file: 'sites_classes_bourgogne_fc.geojson', color: '#556B2F' },
  'Sites Classés Pays de la Loire': { file: 'sites_classes_pays_de_la_loire.geojson', color: '#6B8E23' },
  'Sites Classés Nouvelle-Aquitaine': { file: 'sites_classes_nouvelle_aquitaine.geojson', color: '#808000' },
  'Sites Classés Auvergne-RA': { file: 'sites_classes_auvergne_ra.geojson', color: '#9ACD32' },
  'Sites Classés Occitanie': { file: 'sites_classes_occitanie.geojson', color: '#32CD32' },
  'Sites Classés PACA': { file: 'sites_classes_paca.geojson', color: '#00FA9A' },
  'Sites Classés Corse': { file: 'sites_classes_corse.geojson', color: '#00FF7F' }
} as const

export type SitesClassesRegion = keyof typeof SITES_CLASSES_REGIONS

export async function createSitesClassesRegionLayerOL(
  regionName: SitesClassesRegion
): Promise<VectorLayer<VectorSource>> {
  const config = SITES_CLASSES_REGIONS[regionName]

  const response = await fetch(`./data/${config.file}`)
  const geojson = await response.json()

  console.log(`📍 ${regionName}: ${geojson.features?.length || 0} sites`)

  const source = new VectorSource({
    features: new GeoJSON().readFeatures(geojson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  })

  const layer = new VectorLayer({
    source,
    properties: {
      title: regionName,
      type: 'overlay'
    },
    visible: false,
    style: new Style({
      fill: new Fill({ color: `${config.color}40` }), // 25% opacity
      stroke: new Stroke({ color: config.color, width: 2 })
    })
  })

  return layer
}
