import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import XYZ from 'ol/source/XYZ'

const IGN_WMTS = 'https://data.geopf.fr/wmts'
const BRGM_GEOLOGY_WMS = 'https://mapsref.brgm.fr/wxs/referentiel/geologie'
const BRGM_CATALOGUE_WMS = 'https://mapsref.brgm.fr/wxs/infoterre/catalogue'
const BRGM_RISKS_WMS = 'https://geoservices.brgm.fr/risques'
const OCCITANIE_HYDRO_WMS = 'https://ws.carmencarto.fr/WMS/151/Carte_hydrogeol.map'
const SANDRE_HYDRO_WMS = 'https://services.sandre.eaufrance.fr/geo/eth'

function tileWms(title: string, url: string, layers: string, opacity: number, attribution: string) {
  return new TileLayer({
    properties: { title, type: 'overlay' },
    visible: false,
    opacity,
    source: new TileWMS({
      url,
      params: { LAYERS: layers, TILED: true, FORMAT: 'image/png', TRANSPARENT: true },
      crossOrigin: 'anonymous',
      attributions: attribution
    })
  })
}

export function createFranceLidarTerrainLayerOL() {
  return new TileLayer({
    properties: { title: 'LiDAR HD terrein FR', type: 'overlay' },
    visible: false,
    opacity: 0.72,
    source: new XYZ({
      url: `${IGN_WMTS}?layer=IGNF_LIDAR-HD_MNT_ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW&style=normal&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png`,
      maxZoom: 22,
      crossOrigin: 'anonymous',
      attributions: '© IGN — LiDAR HD MNT'
    })
  })
}

export function createFranceGeology50LayerOL() {
  return tileWms('Geologie 1:50.000 FR', BRGM_GEOLOGY_WMS, 'SCAN_GEOL50', 0.68, '© BRGM — carte géologique 1:50 000')
}

export function createFranceGeologyHarmonizedLayerOL() {
  return tileWms('Geologie geharmoniseerd FR', BRGM_GEOLOGY_WMS, 'GEOL50_HARM', 0.62, '© BRGM — géologie harmonisée')
}

export function createLotHydrogeologyLayerOL() {
  return tileWms('Hydrogeologie Lot (46)', OCCITANIE_HYDRO_WMS, 'Carte_hydro_46', 0.62, '© BRGM / SIGES Occitanie — carte hydrogéologique du Lot')
}

export function createFranceWatercoursesLayerOL() {
  return tileWms('Waterlopen FR', SANDRE_HYDRO_WMS, 'CoursEau_Carthage2017', 0.82, '© Sandre / Eaufrance — réseau hydrographique')
}

export function createFranceBssLayerOL() {
  return tileWms('Ondergrondboringen BRGM', BRGM_CATALOGUE_WMS, 'BSS_TOTAL', 0.9, '© BRGM — Banque du Sous-Sol')
}

export function createFranceCavitiesLayerOL() {
  return tileWms('Karst & ondergrondse holtes', BRGM_RISKS_WMS, 'CAVITE_LOCALISEE', 0.9, '© BRGM — cavités souterraines')
}

export function createFranceIdprLayerOL() {
  return tileWms('Infiltratie & afstroming (IDPR)', BRGM_GEOLOGY_WMS, 'IDPR', 0.5, '© BRGM — IDPR')
}

export const FRANCE_RESEARCH_FACTORIES: Record<string, () => TileLayer<any>> = {
  'LiDAR HD terrein FR': createFranceLidarTerrainLayerOL,
  'Geologie 1:50.000 FR': createFranceGeology50LayerOL,
  'Geologie geharmoniseerd FR': createFranceGeologyHarmonizedLayerOL,
  'Hydrogeologie Lot (46)': createLotHydrogeologyLayerOL,
  'Waterlopen FR': createFranceWatercoursesLayerOL,
  'Ondergrondboringen BRGM': createFranceBssLayerOL,
  'Karst & ondergrondse holtes': createFranceCavitiesLayerOL,
  'Infiltratie & afstroming (IDPR)': createFranceIdprLayerOL
}
