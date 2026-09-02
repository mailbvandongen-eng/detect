import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { THEDIRAC_RESEARCH_SITES, type ThediracResearchSite } from '../data/thediracResearchSites'

const IGN_WMTS = 'https://data.geopf.fr/wmts'
const BRGM_GEOLOGY_WMS = 'https://geoservices.brgm.fr/geologie'
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

const researchStyles: Record<ThediracResearchSite['category'], Style> = {
  prehistorie: new Style({ image: new CircleStyle({ radius: 8, fill: new Fill({ color: '#b45309' }), stroke: new Stroke({ color: '#fff', width: 2 }) }) }),
  middeleeuwen: new Style({ image: new CircleStyle({ radius: 8, fill: new Fill({ color: '#7c3aed' }), stroke: new Stroke({ color: '#fff', width: 2 }) }) }),
  romeins: new Style({ image: new CircleStyle({ radius: 8, fill: new Fill({ color: '#b91c1c' }), stroke: new Stroke({ color: '#fff', width: 2 }) }) })
}

const archeOccStyle = new Style({ image: new CircleStyle({ radius: 6, fill: new Fill({ color: '#dc2626' }), stroke: new Stroke({ color: '#fff', width: 1.5 }) }) })

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

export function createArcheOccLayerOL() {
  return new VectorLayer({
    properties: { title: 'ArcheOcc · archeologie Occitanie', type: 'overlay' },
    visible: false,
    source: new VectorSource({
      url: ARCHEOCC_GEOJSON,
      format: new GeoJSON(),
      attributions: 'Région Occitanie — ArcheOcc · Licence Ouverte 2.0'
    }),
    style: archeOccStyle
  })
}

function createResearchVectorLayer(title: string, categories: ThediracResearchSite['category'][]) {
  const features = THEDIRAC_RESEARCH_SITES.filter(site => categories.includes(site.category)).map(site => new Feature({
    geometry: new Point(fromLonLat([site.lon, site.lat])),
    layerType: 'thediracResearch',
    ...site
  }))
  return new VectorLayer({ properties: { title, type: 'overlay' }, visible: false, source: new VectorSource({ features }), style: feature => researchStyles[feature.get('category') as ThediracResearchSite['category']] })
}

export function createThediracPrehistoryLayerOL() { return createResearchVectorLayer('Thédirac prehistorie & megalieten', ['prehistorie']) }
export function createThediracHistoryLayerOL() { return createResearchVectorLayer('Thédirac Romeins & middeleeuws', ['romeins', 'middeleeuwen']) }

export const FRANCE_RESEARCH_FACTORIES: Record<string, () => any> = {
  'LiDAR HD terrein FR': createFranceLidarTerrainLayerOL,
  'Bodem/geologie 1:50.000 FR': createFranceGeology50LayerOL,
  'Geologie + reliëf FR': createFranceGeologyReliefLayerOL,
  'ArcheOcc · archeologie Occitanie': createArcheOccLayerOL,
  'Thédirac prehistorie & megalieten': createThediracPrehistoryLayerOL,
  'Thédirac Romeins & middeleeuws': createThediracHistoryLayerOL
}
