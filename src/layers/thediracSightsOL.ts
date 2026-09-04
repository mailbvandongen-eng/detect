import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style'
import {
  THEDIRAC_SIGHTS,
  THEDIRAC_SIGHTS_LAYER_NAME,
  type ThediracSight,
  type ThediracSightCategory
} from '../data/thediracSights'

const THEDIRAC_ORIGIN = { lat: 44.6005861, lon: 1.3164838 }

const categoryColors: Record<ThediracSightCategory, string> = {
  'grot-ondergronds': '#7c3aed',
  'prehistorie-archeologie': '#0f766e',
  'kasteel-ruine': '#dc2626',
  'historisch-dorp': '#d97706',
  'natuur-bos': '#15803d',
  'uitzicht-hoogte': '#0891b2',
  'water-landschap': '#2563eb'
}

const categoryLabels: Record<ThediracSightCategory, string> = {
  'grot-ondergronds': 'Grot & ondergronds / grotte & souterrain',
  'prehistorie-archeologie': 'Prehistorie & archeologie / préhistoire & archéologie',
  'kasteel-ruine': 'Kasteel & ruïne / château & ruine',
  'historisch-dorp': 'Historisch dorp / village historique',
  'natuur-bos': 'Natuur & oud bos / nature & forêt ancienne',
  'uitzicht-hoogte': 'Uitzicht & hoogte / panorama & hauteur',
  'water-landschap': 'Water & landschap / eau & paysage'
}

const markerLabels: Record<ThediracSight['markerType'], string> = {
  ingang: 'Openbare ingang / entrée publique',
  bezoekerspunt: 'Bezoekerspunt / point d’accueil',
  plaatscentrum: 'Openbaar plaatscentrum / centre public',
  toegangsroute: 'Exact publiek punt op toegangsroute / point public exact sur l’accès',
  uitzichtpunt: 'Openbaar uitzichtpunt / belvédère public',
  object: 'Openbaar objectpunt / point public de l’objet'
}

const styleCache = new Map<string, Style[]>()

function createSymbol(category: ThediracSightCategory) {
  const color = categoryColors[category]
  const shared = {
    fill: new Fill({ color }),
    stroke: new Stroke({ color: '#ffffff', width: 3 })
  }

  switch (category) {
    case 'grot-ondergronds':
      return new RegularShape({ ...shared, points: 3, radius: 10, angle: Math.PI })
    case 'prehistorie-archeologie':
      return new RegularShape({ ...shared, points: 4, radius: 10, radius2: 4.5 })
    case 'kasteel-ruine':
      return new RegularShape({ ...shared, points: 4, radius: 9.5, angle: Math.PI / 4 })
    case 'historisch-dorp':
      return new RegularShape({ ...shared, points: 6, radius: 9.5 })
    case 'natuur-bos':
      return new RegularShape({ ...shared, points: 5, radius: 10, radius2: 4.8 })
    case 'uitzicht-hoogte':
      return new RegularShape({ ...shared, points: 3, radius: 10 })
    case 'water-landschap':
      return new CircleStyle({ ...shared, radius: 8.5 })
  }
}

function getSightStyles(site: ThediracSight, showLabel: boolean) {
  const cacheKey = `${site.category}:${showLabel ? site.id : 'marker'}`
  const cached = styleCache.get(cacheKey)
  if (cached) return cached

  const label = showLabel
    ? new Text({
        text: site.name,
        font: '600 12px sans-serif',
        offsetY: -18,
        padding: [2, 4, 2, 4],
        fill: new Fill({ color: '#111827' }),
        stroke: new Stroke({ color: '#ffffff', width: 3 }),
        backgroundFill: new Fill({ color: 'rgba(255,255,255,0.86)' }),
        backgroundStroke: new Stroke({ color: 'rgba(15,23,42,0.25)', width: 1 })
      })
    : undefined

  const styles = [new Style({ image: createSymbol(site.category), text: label })]
  styleCache.set(cacheKey, styles)
  return styles
}

function routeUrl(site: ThediracSight) {
  const origin = `${THEDIRAC_ORIGIN.lat},${THEDIRAC_ORIGIN.lon}`
  const destination = `${site.lat},${site.lon}`
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
}

function mapUrl(site: ThediracSight) {
  return `https://www.openstreetmap.org/?mlat=${site.lat}&mlon=${site.lon}#map=17/${site.lat}/${site.lon}`
}

function driveStatus(site: ThediracSight) {
  if (site.driveMinutes > 180) return 'Uitzonderlijke bestemming: iets meer dan 3 uur / destination exceptionnelle : un peu plus de 3 h'
  if (site.driveMinutes > 120) return 'Grote dagtocht: circa 2–3 uur / grande excursion : environ 2–3 h'
  if (site.driveMinutes > 65) return 'Dagtocht: circa 1–2 uur / excursion : environ 1–2 h'
  return 'Regiobezoek: tot circa 1 uur / visite régionale : jusqu’à environ 1 h'
}

export function createThediracSightsLayerOL() {
  const features = THEDIRAC_SIGHTS.map(site => {
    const color = categoryColors[site.category]
    const feature = new Feature({
      geometry: new Point(fromLonLat([site.lon, site.lat]))
    })

    feature.setId(site.id)
    feature.setStyle((_feature, resolution) => getSightStyles(site, resolution <= 20))
    feature.setProperties({
      layerType: 'importedLayer',
      layerName: THEDIRAC_SIGHTS_LAYER_NAME,
      layerColor: color,
      name: site.name,
      'Categorie / catégorie': categoryLabels[site.category],
      'Beschrijving': site.descriptionNl,
      'Description': site.descriptionFr,
      'Bezoek': site.visitNl,
      'Visite': site.visitFr,
      'Waarom de rit waard': site.whyWorthItNl,
      'Pourquoi le détour': site.whyWorthItFr,
      'Rijtijd vanaf Thédirac': `circa ${site.driveMinutes} min · ${site.driveKm.toFixed(1)} km enkele reis`,
      'Dagtocht / excursion': driveStatus(site),
      'Routeberekening': 'OSRM-richtwaarde zonder actuele verkeersdrukte',
      'Marker / repère': markerLabels[site.markerType],
      'Coördinaten': `${site.lat.toFixed(6)}, ${site.lon.toFixed(6)}`,
      'Route vanaf Thédirac': routeUrl(site),
      'Punt op OpenStreetMap': mapUrl(site),
      'Bron / source': site.source,
      'Bronlink': site.sourceUrl
    }, true)

    return feature
  })

  return new VectorLayer({
    properties: { title: THEDIRAC_SIGHTS_LAYER_NAME, type: 'overlay' },
    visible: false,
    opacity: 1,
    zIndex: 39,
    declutter: true,
    source: new VectorSource({
      features,
      attributions: 'Bezienswaardigheden: officiële bezoekers- en toerismebronnen, OpenStreetMap; rijtijdindicatie: OSRM'
    })
  })
}
