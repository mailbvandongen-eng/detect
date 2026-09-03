import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style } from 'ol/style'
import { fetchThediracArcheOccGeoJson } from './thediracAnalysisOL'
import { THEDIRAC_RESEARCH_SITES, type ThediracResearchSite } from '../data/thediracResearchSites'

const IGN_WMTS = 'https://data.geopf.fr/wmts'
const IGN_WMS = 'https://data.geopf.fr/wms-r/wms'
const BRGM_GEOLOGY_WMS = 'https://geoservices.brgm.fr/geologie'
const BRGM_RISKS_WMS = 'https://geoservices.brgm.fr/risques'
const TOPAGE_2026_WMS = 'https://services.sandre.eaufrance.fr/geo/topage2026?'

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

const archeOccStyle = new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({ color: '#dc2626' }),
    stroke: new Stroke({ color: '#fff', width: 1.5 })
  })
})

const RESEARCH_SITE_LAYER = 'Bekende plekken · Thédirac'
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

const researchSiteStyleCache = new Map<string, Style>()

function getResearchSiteStyle(site: ThediracResearchSite) {
  const { category, locationQuality } = site
  const isProtected = site.protected === true
  const color = researchSiteColors[category] ?? researchSiteColors.onbepaald
  const cacheKey = `${category}:${locationQuality}:${isProtected ? 'protected' : 'context'}`
  const cached = researchSiteStyleCache.get(cacheKey)
  if (cached) return cached

  const fillAlpha = locationQuality === 'approximate' ? '99' : locationQuality === 'source-centroid' ? 'd9' : 'ff'
  const stroke = new Stroke({
    color: isProtected ? '#111827' : '#ffffff',
    width: isProtected ? 3 : 1.7,
    ...(locationQuality === 'approximate' ? { lineDash: [3, 2] } : {})
  })
  const image = locationQuality === 'exact'
    ? new CircleStyle({ radius: 7.5, fill: new Fill({ color: `${color}${fillAlpha}` }), stroke })
    : new RegularShape({ points: 4, radius: 8.5, angle: Math.PI / 4, fill: new Fill({ color: `${color}${fillAlpha}` }), stroke })
  const style = new Style({ image })
  researchSiteStyleCache.set(cacheKey, style)
  return style
}

export function createKnownThediracSitesLayerOL() {
  const features = THEDIRAC_RESEARCH_SITES.map(site => {
    const color = researchSiteColors[site.category]
    const feature = new Feature({
      geometry: new Point(fromLonLat([site.lon, site.lat]))
    })
    feature.setId(site.id)
    feature.setStyle(getResearchSiteStyle(site))
    feature.setProperties({
      layerType: 'importedLayer',
      layerName: RESEARCH_SITE_LAYER,
      layerColor: color,
      name: site.nameNl,
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
    properties: { title: RESEARCH_SITE_LAYER, type: 'overlay' },
    visible: false,
    opacity: 1,
    zIndex: 38,
    source: new VectorSource({
      features,
      attributions: 'Publieke archeologische en erfgoedbronnen — bron per punt vermeld'
    })
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
  return ignWmsLayer('OCS GE landbedekking 2021-2023', 'OCSGE.COUVERTURE.2021-2023', 0.62, '© IGN — OCS GE')
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

function joinText(...values: unknown[]) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const value of values) {
    const text = firstText(value)
    if (text && !seen.has(text)) {
      seen.add(text)
      out.push(text)
    }
  }
  return out.join(' · ')
}

export function createArcheOccLayerOL() {
  const source = new VectorSource({
    attributions: 'Région Occitanie — ArcheOcc · Licence Ouverte 2.0'
  })

  void fetchThediracArcheOccGeoJson().then(data => {
    const features = new GeoJSON().readFeatures(data, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })

    for (const feature of features) {
      const p = feature.getProperties()
      const name = firstText(
        p.nom_du_site_du_musee_ou_du_centre_d_interpretation,
        p.sous_titre,
        p.lieu_de_decouverte,
        p.commune,
        'Archeologische locatie'
      )
      const description = firstText(
        p.decription_longue_historique,
        p.decription_courte,
        p.phrase_d_accroche,
        p.decription_longue_historique0,
        p.decription_courte0,
        p.phrase_d_accroche0,
        p.informations_supplementaires
      )
      const period = joinText(p.periodes, p.periodes_objet_1, p.periodes_objet_2, p.periodes_objet_3)
      const dating = joinText(p.datation, p.datation_objet_1, p.datation_objet_2, p.datation_objet_3)
      const discovery = joinText(p.lieu_de_decouverte, p.lieu_de_decouverte0, p.lieu_de_decouverte1)
      const remarkable = firstText(p.elements_remarquables)
      const keywords = firstText(p.mots_cles)
      const references = joinText(p.references_patriarche, p.reference_mh, p.references_bibliographiques, p.notice_liee, p.autre_lien)
      const occupation = firstText(p.type_d_occupation)
      const municipality = firstText(p.commune)
      const department = firstText(p.departement)
      const access = firstText(p.accessible_au_public)
      const protection = firstText(p.protections_et_labels)
      const property = firstText(p.statut_de_la_propriete)

      for (const key of Object.keys(p)) {
        if (key !== 'geometry') feature.unset(key, true)
      }

      feature.setProperties({
        layerType: 'importedLayer',
        layerName: 'ArcheOcc · Thédirac-regio',
        layerColor: '#dc2626',
        name,
        ...(description ? { 'Omschrijving / description': description } : {}),
        ...(period ? { 'Periode / période': period } : {}),
        ...(dating ? { 'Datering / datation': dating } : {}),
        ...(occupation ? { 'Type locatie / type de site': occupation } : {}),
        ...(discovery ? { 'Vindplaats / lieu de découverte': discovery } : {}),
        ...(remarkable ? { 'Bijzonderheden / éléments remarquables': remarkable } : {}),
        ...(keywords ? { 'Trefwoorden / mots-clés': keywords } : {}),
        ...(municipality ? { 'Gemeente / commune': municipality } : {}),
        ...(department ? { 'Departement / département': department } : {}),
        ...(access ? { 'Publiek toegankelijk / accessible': access } : {}),
        ...(protection ? { 'Bescherming / protection': protection } : {}),
        ...(property ? { 'Eigendom / propriété': property } : {}),
        ...(references ? { 'Referenties / références': references } : {}),
        'Bron / source': 'Région Occitanie — ArcheOcc',
        'Bronkwaliteit / qualité': 'officiële regionale open dataset; alleen de lokale onderzoeksgemeenten worden geladen',
        'Licentie / licence': 'Licence Ouverte 2.0'
      }, true)
    }

    source.addFeatures(features)
  }).catch(error => console.error('ArcheOcc Thédirac-regio kon niet worden geladen:', error))

  return new VectorLayer({
    properties: { title: 'ArcheOcc · Thédirac-regio', type: 'overlay' },
    visible: false,
    source,
    style: archeOccStyle
  })
}

export const FRANCE_RESEARCH_FACTORIES: Record<string, () => any> = {
  'LiDAR HD terrein FR': createFranceLidarTerrainLayerOL,
  'Bodem/geologie 1:50.000 FR': createFranceGeology50LayerOL,
  'Geologie + reliëf FR': createFranceGeologyReliefLayerOL,
  'BRGM boringen · BSS': createFranceBssLayerOL,
  'BRGM IDPR · infiltratie/afstroming': createFranceIdprLayerOL,
  'BRGM cavités · ondergrondse holtes': createFranceCavitiesLayerOL,
  'Waterlopen BD TOPAGE 2026': createFranceTopageWatercoursesLayerOL,
  'OCS GE landbedekking 2021-2023': createFranceOcsCoverageLayerOL,
  'Oude bossen · Forêts anciennes': createFranceAncientForestsLayerOL,
  [RESEARCH_SITE_LAYER]: createKnownThediracSitesLayerOL,
  'ArcheOcc · Thédirac-regio': createArcheOccLayerOL
}
