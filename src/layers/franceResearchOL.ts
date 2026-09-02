import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'

const IGN_WMTS = 'https://data.geopf.fr/wmts'
const IGN_WMS = 'https://data.geopf.fr/wms-r/wms'
const BRGM_GEOLOGY_WMS = 'https://geoservices.brgm.fr/geologie'
const TOPAGE_2026_WMS = 'https://services.sandre.eaufrance.fr/geo/topage2026?'
const ARCHEOCC_GEOJSON = 'https://data.laregion.fr/api/explore/v2.1/catalog/datasets/base_archeocc_opendata/exports/geojson?lang=fr&timezone=Europe%2FParis'

function geologyLayer(title: string, layerName: string, opacity: number) {
  return new TileLayer({
    properties: { title, type: 'overlay' },
    visible: false,
    opacity,
    source: new TileWMS({
      url: BRGM_GEOLOGY_WMS,
      params: { LAYERS: layerName, TILED: true, FORMAT: 'image/png', TRANSPARENT: true },
      crossOrigin: 'anonymous',
      attributions: '© BRGM — InfoTerre'
    })
  })
}

function ignWmsLayer(title: string, layerName: string, opacity: number) {
  return new TileLayer({
    properties: { title, type: 'overlay' },
    visible: false,
    opacity,
    source: new TileWMS({
      url: IGN_WMS,
      params: { LAYERS: layerName, TILED: true, FORMAT: 'image/png', TRANSPARENT: true },
      crossOrigin: 'anonymous',
      attributions: '© IGN — OCS GE'
    })
  })
}

const archeOccStyle = new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({ color: '#dc2626' }),
    stroke: new Stroke({ color: '#fff', width: 1.5 })
  })
})

export function createFranceLidarTerrainLayerOL() {
  return new TileLayer({
    properties: { title: 'LiDAR HD terrein FR', type: 'overlay' },
    visible: false,
    opacity: 0.78,
    source: new XYZ({
      url: `${IGN_WMTS}?layer=IGNF_LIDAR-HD_MNT_ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW&style=normal&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png`,
      maxZoom: 22,
      crossOrigin: 'anonymous',
      attributions: '© IGN — LiDAR HD MNT'
    })
  })
}

export function createFranceGeology50LayerOL() {
  return geologyLayer('Bodem/geologie 1:50.000 FR', 'SCAN_D_GEOL50', 0.68)
}

export function createFranceGeologyReliefLayerOL() {
  return geologyLayer('Geologie + reliëf FR', 'SCAN_H_RELIEF_GEOL50', 0.66)
}

export function createFranceTopageWatercoursesLayerOL() {
  return new TileLayer({
    properties: { title: 'Waterlopen BD TOPAGE 2026', type: 'overlay' },
    visible: false,
    opacity: 0.9,
    source: new TileWMS({
      url: TOPAGE_2026_WMS,
      params: { LAYERS: 'CoursEau_FXX_Topage2026', TILED: true, FORMAT: 'image/png', TRANSPARENT: true },
      crossOrigin: 'anonymous',
      attributions: '© IGN / OFB / Sandre — BD TOPAGE® 2026'
    })
  })
}

export function createFranceOcsCoverageLayerOL() {
  return ignWmsLayer('OCS GE landbedekking 2021-2023', 'OCSGE.COUVERTURE.2021-2023', 0.62)
}

function firstText(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number') return String(value)
  }
  return ''
}

export function createArcheOccLayerOL() {
  const source = new VectorSource({
    url: ARCHEOCC_GEOJSON,
    format: new GeoJSON(),
    attributions: 'Région Occitanie — ArcheOcc · Licence Ouverte 2.0'
  })

  source.on('featuresloadend', event => {
    for (const feature of event.features ?? []) {
      const p = feature.getProperties()
      const name = firstText(
        p.nom_du_site_du_musee_ou_du_centre_d_interpretation,
        p.sous_titre,
        p.lieu_de_decouverte0,
        p.phrase_d_accroche0,
        p.commune,
        'Archeologische locatie'
      )
      const period = firstText(p.periodes_objet_1, p.periodes_objet_2, p.periodes_objet_3)
      const dating = firstText(p.datation_objet_1, p.datation_objet_2, p.datation_objet_3)
      const description = firstText(
        p.decription_courte0,
        p.decription_longue_historique0,
        p.phrase_d_accroche0,
        p.informations_supplementaires
      )
      const discovery = firstText(p.lieu_de_decouverte0, p.lieu_de_decouverte1)
      const occupation = firstText(p.type_d_occupation)
      const municipality = firstText(p.commune)
      const department = firstText(p.departement)
      const notice = firstText(p.notice_liee)

      for (const key of Object.keys(p)) {
        if (key !== 'geometry') feature.unset(key, true)
      }

      feature.setProperties({
        layerType: 'importedLayer',
        layerName: 'ArcheOcc · Occitanie',
        layerColor: '#dc2626',
        name,
        ...(municipality ? { Gemeente: municipality } : {}),
        ...(department ? { Departement: department } : {}),
        ...(occupation ? { 'Type locatie': occupation } : {}),
        ...(period ? { Periode: period } : {}),
        ...(dating ? { Datering: dating } : {}),
        ...(discovery ? { 'Vindplaats / lieu de découverte': discovery } : {}),
        ...(description ? { Omschrijving: description } : {}),
        ...(notice ? { 'Bronverwijzing': notice } : {}),
        Bron: 'Région Occitanie — ArcheOcc',
        Licentie: 'Licence Ouverte 2.0'
      }, true)
    }
  })

  return new VectorLayer({
    properties: { title: 'ArcheOcc · archeologie Occitanie', type: 'overlay' },
    visible: false,
    source,
    style: archeOccStyle
  })
}

export const FRANCE_RESEARCH_FACTORIES: Record<string, () => any> = {
  'LiDAR HD terrein FR': createFranceLidarTerrainLayerOL,
  'Bodem/geologie 1:50.000 FR': createFranceGeology50LayerOL,
  'Geologie + reliëf FR': createFranceGeologyReliefLayerOL,
  'Waterlopen BD TOPAGE 2026': createFranceTopageWatercoursesLayerOL,
  'OCS GE landbedekking 2021-2023': createFranceOcsCoverageLayerOL,
  'ArcheOcc · archeologie Occitanie': createArcheOccLayerOL
}
