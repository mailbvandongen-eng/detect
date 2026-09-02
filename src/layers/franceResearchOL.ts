import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import XYZ from 'ol/source/XYZ'

const IGN_WMTS = 'https://data.geopf.fr/wmts'
const BRGM_GEOLOGY_WMS = 'https://mapsref.brgm.fr/wxs/referentiel/geologie'
const OCCITANIE_HYDRO_WMS = 'https://ws.carmencarto.fr/WMS/151/Carte_hydrogeol.map'

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

export const FRANCE_RESEARCH_FACTORIES: Record<string, () => TileLayer<any>> = {
  'LiDAR HD terrein FR': createFranceLidarTerrainLayerOL,
  'Geologie 1:50.000 FR': createFranceGeology50LayerOL,
  'Geologie geharmoniseerd FR': createFranceGeologyHarmonizedLayerOL,
  'Hydrogeologie Lot (46)': createLotHydrogeologyLayerOL
}
