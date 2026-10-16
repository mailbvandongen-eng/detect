import { LOT_ARCHIVE_COMMUNES, NAPOLEON_LOT_LAYER, NAPOLEON_LOT_ARCHIVES_URL, NAPOLEON_LOT_COLOR } from '../data/lotCadastreArchives'
import { THEDIRAC_FORTIFICATION_COLOR, THEDIRAC_FORTIFICATION_CATEGORY } from '../data/thediracFortifications'
import { getMapPointStyle } from '../utils/mapPointStyle'
import TileLayer from 'ol/layer/Tile'
import LayerGroup from 'ol/layer/Group'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import { fromLonLat } from 'ol/proj'
import { Fill, Stroke, Style } from 'ol/style'
import {
  THEDIRAC_RESEARCH_LAYER_NAME,
  THEDIRAC_RESEARCH_SITES,
  researchSiteProperties,
  type ThediracResearchSite
} from '../data/thediracResearchSites'
import { THEDIRAC_CONTEXT_LAYER_NAME, THEDIRAC_LANDSCAPE_FEATURES } from '../data/thediracLandscapeContext'
import { THEDIRAC_SIGHTS_LAYER_NAME } from '../data/thediracSights'
import { THEDIRAC_HIKES_LAYER_NAME } from '../data/thediracHikes'
import {
  THEDIRAC_FOSSILS_LAYER_NAME,
  THEDIRAC_MINERALS_LAYER_NAME
} from '../data/thediracGeologySites'
import { createThediracSightsLayerOL } from './thediracSightsOL'
import { createThediracHikesLayerOL } from './thediracHikesOL'
import {
  createThediracFossilsLayerOL,
  createThediracMineralsLayerOL
} from './thediracGeologySitesOL'

const IGN_WMTS = 'https://data.geopf.fr/wmts'
const IGN_WMS = 'https://data.geopf.fr/wms-r/wms'
const BRGM_GEOLOGY_WMS = 'https://geoservices.brgm.fr/geologie'
const BRGM_RISKS_WMS = 'https://geoservices.brgm.fr/risques'
const TOPAGE_2026_WMS = 'https://services.sandre.eaufrance.fr/geo/topage2026?'
const TOPAGE_THEDIRAC_DATA = './data/topage_thedirac_2026.geojson'

function queryableWmsLayer(title: string, url: string, layerName: string, opacity: number, attribution: string) {
  return new TileLayer({
    properties: { title, type: 'overlay', queryableWms: true, queryLayer: layerName, sourceLabel: attribution },
    visible: false,
    opacity,
    source: new TileWMS({
      url,
      params: { LAYERS: layerName, QUERY_LAYERS: layerName, INFO_FORMAT: 'application/json', TILED: true, FORMAT: 'image/png', TRANSPARENT: true },
      crossOrigin: 'anonymous',
      attributions: attribution
    })
  })
}

function geologyLayer(title: string, layerName: string, opacity: number) {
  return queryableWmsLayer(title, BRGM_GEOLOGY_WMS, layerName, opacity, '© BRGM — InfoTerre')
}

function ignWmsLayer(title: string, layerName: string, opacity: number, attribution = '© IGN') {
  return new TileLayer({
    properties: { title, type: 'overlay' },
    visible: false,
    opacity,
    source: new TileWMS({
      url: IGN_WMS,
      params: { LAYERS: layerName, TILED: true, FORMAT: 'image/png', TRANSPARENT: true },
      crossOrigin: 'anonymous',
      attributions: attribution
    })
  })
}

const researchSiteColors: Record<ThediracResearchSite['category'], string> = {
  prehistorie: '#f59e0b',
  ijzertijd: '#16a34a',
  romeins: '#dc2626',
  middeleeuwen: '#7c3aed',
  onbepaald: '#475569'
}

const researchSiteCategoryLabels: Record<ThediracResearchSite['category'], string> = {
  prehistorie: 'Prehistorie',
  ijzertijd: 'IJzertijd / Keltisch',
  romeins: 'Romeins',
  middeleeuwen: 'Middeleeuwen',
  onbepaald: 'Periode onbekend'
}

const researchSitePrecisionLabels: Record<ThediracResearchSite['locationQuality'], string> = {
  exact: 'Exact openbaar bronpunt',
  'source-centroid': 'Openbaar centrum van lieu-dit of complex',
  approximate: 'Globale bronpositie; exacte vindplek onbekend'
}

export function createKnownThediracSitesLayerOL() {
  const features = THEDIRAC_RESEARCH_SITES.map(site => {
    const color = site.fortification ? THEDIRAC_FORTIFICATION_COLOR : researchSiteColors[site.category]
    const feature = new Feature({
      geometry: new Point(fromLonLat([site.lon, site.lat]))
    })
    feature.setId(site.id)
    feature.setStyle((_feature, resolution) => getMapPointStyle(color, resolution))
    feature.setProperties({
      layerType: 'importedLayer',
      layerName: THEDIRAC_RESEARCH_LAYER_NAME,
      layerColor: color,
      name: site.nameNl,
      'Bewijsstatus': researchSiteProperties(site).bewijsstatus,
      ...(site.fortification ? { 'Kaartlegenda': THEDIRAC_FORTIFICATION_CATEGORY } : {}),
      ...(site.positionSourceUrl ? { 'Bron kaartpositie': site.positionSourceUrl } : {}),
      'Categorie / catégorie': researchSiteCategoryLabels[site.category],
      'Type locatie / type de site': site.siteTypeNl,
      'Periode / période': site.periodNl,
      'Omschrijving': site.descriptionNl,
      'Kaartstatus': site.protected
        ? 'Op kaart voor het archeologische beeld · beschermd/no-detect op de locatie'
        : 'Openbare onderzoekscontext · toestemming en bescherming afzonderlijk beoordelen',
      'Locatieprecisie': researchSitePrecisionLabels[site.locationQuality],
      ...(site.locationNoteNl ? { 'Toelichting positie': site.locationNoteNl } : {}),
      'Coördinaten bronpunt': `${site.lat.toFixed(6)}, ${site.lon.toFixed(6)}`,
      'Bron / source': site.source,
      ...(site.sourceUrl ? { Bronlink: site.sourceUrl } : {})
    }, true)
    return feature
  })

  return new VectorLayer({
    properties: { title: THEDIRAC_RESEARCH_LAYER_NAME, type: 'overlay' },
    visible: false,
    opacity: 1,
    zIndex: 38,
    source: new VectorSource({
      features,
      attributions: 'Publieke archeologische en erfgoedbronnen — bron per punt vermeld'
    })
  })
}

export function createThediracLandscapeContextLayerOL() {
  const features = new GeoJSON().readFeatures({type:'FeatureCollection', features:THEDIRAC_LANDSCAPE_FEATURES}, {featureProjection:'EPSG:3857'})
  for (const feature of features) feature.setProperties({layerType:'importedLayer', layerName:THEDIRAC_CONTEXT_LAYER_NAME, layerColor:'#0f766e', name:feature.get('naam'), 'Locatieprecisie':'Schematisch gebied', layerPopupConfig:{titleField:'naam', hiddenFields:['detectSeedId','locatienauwkeurigheid'],showTechnicalFields:false}})
  return new VectorLayer({
    properties:{title:THEDIRAC_CONTEXT_LAYER_NAME, type:'overlay'}, visible:false, opacity:1, zIndex:35,
    source:new VectorSource({features, attributions:'Landschappelijke context: openbare publicaties; schematische oriëntatiekaders van Detect'}),
    style:new Style({fill:new Fill({color:'rgba(15,118,110,0.035)'}), stroke:new Stroke({color:'#0f766e',width:2,lineDash:[8,6]})})
  })
}

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

export function createFranceBssLayerOL() {
  return queryableWmsLayer('BRGM boringen · BSS', BRGM_GEOLOGY_WMS, 'BSS', 1, '© BRGM — Banque du Sous-Sol')
}

export function createFranceIdprLayerOL() {
  return queryableWmsLayer('BRGM IDPR · infiltratie/afstroming', BRGM_GEOLOGY_WMS, 'IDPR', 0.55, '© BRGM — IDPR')
}

export function createFranceCavitiesLayerOL() {
  return queryableWmsLayer('BRGM cavités · ondergrondse holtes', BRGM_RISKS_WMS, 'CAVITE_LOCALISEE', 1, '© BRGM — Géorisques / cavités')
}

export function createFranceTopageWatercoursesLayerOL() {
  const rasterLayer = new TileLayer({
    visible: true,
    source: new TileWMS({
      url: TOPAGE_2026_WMS,
      params: { LAYERS: 'CoursEau_FXX_Topage2026', TILED: true, FORMAT: 'image/png', TRANSPARENT: true },
      hidpi: false,
      crossOrigin: 'anonymous',
      attributions: '© IGN / OFB / Sandre — BD TOPAGE® 2026'
    })
  })

  const localSource = new VectorSource({
    url: TOPAGE_THEDIRAC_DATA,
    format: new GeoJSON(),
    attributions: '© IGN / OFB / Sandre — BD TOPAGE® 2026'
  })

  localSource.on('featuresloadend', () => {
    for (const feature of localSource.getFeatures()) {
      const properties = feature.getProperties()
      const name = firstText(properties.TopoOH)
      const code = firstText(properties.CdOH)
      const status = firstText(properties.StatutOH)
      const sourceName = firstText(properties.SourceNomOH)

      for (const key of Object.keys(properties)) {
        if (key !== 'geometry') feature.unset(key, true)
      }

      feature.setProperties({
        layerType: 'importedLayer',
        layerName: 'Waterlopen BD TOPAGE 2026',
        layerColor: '#2563eb',
        name: name || 'Naam niet beschikbaar',
        ...(code ? { 'Code waterloop': code } : {}),
        ...(status ? { 'Status bronobject': status } : {}),
        'Bron': sourceName ? `Sandre / ${sourceName}` : 'Sandre / IGN / OFB',
        'Gegevensjaar': '2026'
      }, true)
    }
  })

  const styleCache = new Map<string, Style[]>()
  const localVectorLayer = new VectorLayer({
    visible: true,
    minZoom: 10,
    zIndex: 2,
    source: localSource,
    style: (_feature, resolution) => {
      const width = resolution <= 5 ? 4.5 : resolution <= 15 ? 4 : resolution <= 40 ? 3.25 : 2.5
      const cacheKey = String(width)
      const cached = styleCache.get(cacheKey)
      if (cached) return cached

      const styles = [
        new Style({ stroke: new Stroke({ color: 'rgba(255,255,255,0.92)', width: width + 2.25 }) }),
        new Style({ stroke: new Stroke({ color: '#244ee8', width }) })
      ]
      styleCache.set(cacheKey, styles)
      return styles
    }
  })

  return new LayerGroup({
    properties: { title: 'Waterlopen BD TOPAGE 2026', type: 'overlay' },
    visible: false,
    opacity: 0.9,
    zIndex: 34,
    layers: [rasterLayer, localVectorLayer]
  })
}

export function createFranceOcsCoverageLayerOL() {
  return queryableWmsLayer('OCS GE landbedekking 2021-2023', IGN_WMS, 'OCSGE.COUVERTURE.2021-2023', 0.62, '© IGN — OCS GE')
}

// IGN WMTS capabilities: BNF Cassini, PM_6_14, PNG, zoom 6–14.
// Reuse the final tile level when zooming in further.
export function createFranceCassiniLayerOL() {
  return new TileLayer({
    properties: { title: 'Carte de Cassini · 18e eeuw', type: 'overlay' },
    visible: false,
    opacity: 0.8,
    zIndex: 10,
    source: new XYZ({
      url: `${IGN_WMTS}?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=BNF-IGNF_GEOGRAPHICALGRIDSYSTEMS.CASSINI&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM_6_14&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}`,
      minZoom: 6,
      maxZoom: 14,
      wrapX: false,
      crossOrigin: 'anonymous',
      attributions: '© BnF / IGN — Carte de Cassini (18e eeuw)'
    })
  })
}

// Paramètres vérifiés dans le GetCapabilities IGN (17 octobre 2026).
function createHistoricalIgnLayer(title: string, technicalName: string, matrix: string, format: string, minZoom: number, maxZoom: number, zIndex: number) {
  return new TileLayer({
    properties: { title, type: 'overlay' }, visible: false, opacity: 1, zIndex,
    source: new XYZ({
      url: `${IGN_WMTS}?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${technicalName}&STYLE=normal&FORMAT=${format}&TILEMATRIXSET=${matrix}&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}`,
      minZoom, maxZoom, wrapX: false, crossOrigin: 'anonymous',
      attributions: `© IGN — ${title}`
    })
  })
}

export function createFranceEtatMajorLayerOL() {
  return createHistoricalIgnLayer('État-major · 1820–1866', 'GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR40', 'PM_6_15', 'image/jpeg', 6, 15, 11)
}

export function createFranceMap1950LayerOL() {
  return createHistoricalIgnLayer('IGN-kaart · 1950', 'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN50.1950', 'PM_3_15', 'image/jpeg', 3, 15, 12)
}

export function createFranceAerial1950LayerOL() {
  return createHistoricalIgnLayer('Luchtfoto · 1950–1965', 'ORTHOIMAGERY.ORTHOPHOTOS.1950-1965', 'PM_0_18', 'image/png', 0, 18, 13)
}

export function createLotNapoleonArchivesLayerOL() {
  const features = LOT_ARCHIVE_COMMUNES.map(([code, commune, lon, lat]) => {
    const feature = new Feature({ geometry: new Point(fromLonLat([lon, lat])) })
    feature.setId(`cadastre-archive:${code}`)
    feature.setStyle((_feature, resolution) => getMapPointStyle(NAPOLEON_LOT_COLOR, resolution))
    feature.setProperties({
      layerType: 'importedLayer', layerName: NAPOLEON_LOT_LAYER, layerColor: NAPOLEON_LOT_COLOR,
      name: `Kadasterarchief — ${commune}`,
      Gemeente: commune, 'Code INSEE': code,
      Omschrijving: 'Toegang tot de historische kadasterbladen van het Lot. Dit punt is het gemeentemiddelpunt; het is geen historisch gebouw of vindplaats.',
      'Kaartstatus': 'Archiefingang; geen doorlopende historische kaartlaag',
      'Zo bekijk je de bladen': `Open de bronlink, kies Cadastre en zoek op ${commune}. Kies het Napoleontische kadaster en daarna een sectieblad. Historische gemeentegrenzen kunnen afwijken.`,
      'Locatieprecisie': 'Gemeentemiddelpunt (huidige gemeente); kaartbladen niet op deze locatie uitgelijnd',
      'Bron / source': 'Archives départementales du Lot; gemeentemiddelpunten: API Découpage administratif',
      Bronlink: NAPOLEON_LOT_ARCHIVES_URL
    }, true)
    return feature
  })
  return new VectorLayer({
    properties: { title: NAPOLEON_LOT_LAYER, type: 'overlay' },
    visible: false, opacity: 1, zIndex: 39,
    source: new VectorSource({ features, attributions: 'Archives départementales du Lot · Gemeentemiddelpunten: geo.api.gouv.fr' })
  })
}

export function createFranceAncientForestsLayerOL() {
  return ignWmsLayer('Oude bossen · Forêts anciennes', 'IGNF_FORETS-ANCIENNES', 0.72, '© IGN — BD Forêts anciennes')
}

function firstText(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number') return String(value)
  }
  return ''
}

export const FRANCE_RESEARCH_FACTORIES: Record<string, () => any> = {
  'Luchtfoto · 1950–1965': createFranceAerial1950LayerOL,
  'IGN-kaart · 1950': createFranceMap1950LayerOL,
  'État-major · 1820–1866': createFranceEtatMajorLayerOL,
  [NAPOLEON_LOT_LAYER]: createLotNapoleonArchivesLayerOL,
  'Carte de Cassini · 18e eeuw': createFranceCassiniLayerOL,
  'LiDAR HD terrein FR': createFranceLidarTerrainLayerOL,
  'Bodem/geologie 1:50.000 FR': createFranceGeology50LayerOL,
  'Geologie + reliëf FR': createFranceGeologyReliefLayerOL,
  'BRGM boringen · BSS': createFranceBssLayerOL,
  'BRGM IDPR · infiltratie/afstroming': createFranceIdprLayerOL,
  'BRGM cavités · ondergrondse holtes': createFranceCavitiesLayerOL,
  'Waterlopen BD TOPAGE 2026': createFranceTopageWatercoursesLayerOL,
  'OCS GE landbedekking 2021-2023': createFranceOcsCoverageLayerOL,
  'Oude bossen · Forêts anciennes': createFranceAncientForestsLayerOL,
  [THEDIRAC_RESEARCH_LAYER_NAME]: createKnownThediracSitesLayerOL,
  [THEDIRAC_CONTEXT_LAYER_NAME]: createThediracLandscapeContextLayerOL,
  [THEDIRAC_MINERALS_LAYER_NAME]: createThediracMineralsLayerOL,
  [THEDIRAC_FOSSILS_LAYER_NAME]: createThediracFossilsLayerOL,
  [THEDIRAC_SIGHTS_LAYER_NAME]: createThediracSightsLayerOL,
  [THEDIRAC_HIKES_LAYER_NAME]: createThediracHikesLayerOL
}
