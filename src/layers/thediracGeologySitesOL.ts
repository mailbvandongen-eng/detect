import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style'
import {
  INPG_DATASET_URL,
  THEDIRAC_FOSSIL_SITES,
  THEDIRAC_FOSSILS_LAYER_NAME,
  THEDIRAC_MINERAL_SITES,
  THEDIRAC_MINERALS_LAYER_NAME,
  inpgSiteUrl,
  type ThediracGeologySite
} from '../data/thediracGeologySites'

type GeologyLayerKind = 'mineral' | 'fossil'

const THEDIRAC_ORIGIN = { lat: 44.6005861, lon: 1.3164838 }

const layerSettings: Record<GeologyLayerKind, { color: string; title: string; zIndex: number }> = {
  mineral: { color: '#7c3aed', title: THEDIRAC_MINERALS_LAYER_NAME, zIndex: 41 },
  fossil: { color: '#d97706', title: THEDIRAC_FOSSILS_LAYER_NAME, zIndex: 42 }
}

const styleCache = new Map<string, Style[]>()

function markerStyles(kind: GeologyLayerKind, site: ThediracGeologySite, resolution: number) {
  const showLabel = resolution <= 20
  const cacheKey = `${kind}:${showLabel ? site.id : 'marker'}`
  const cached = styleCache.get(cacheKey)
  if (cached) return cached

  const { color } = layerSettings[kind]
  const image = kind === 'mineral'
    ? new RegularShape({
        points: 4,
        radius: 10.5,
        angle: Math.PI / 4,
        fill: new Fill({ color }),
        stroke: new Stroke({ color: '#ffffff', width: 3 })
      })
    : new CircleStyle({
        radius: 9.5,
        fill: new Fill({ color }),
        stroke: new Stroke({ color: '#ffffff', width: 3 })
      })

  const styles = [
    new Style({ image }),
    ...(kind === 'fossil'
      ? [new Style({
          image: new CircleStyle({
            radius: 3.2,
            fill: new Fill({ color: '#78350f' }),
            stroke: new Stroke({ color: '#fef3c7', width: 1 })
          })
        })]
      : []),
    ...(showLabel
      ? [new Style({
          text: new Text({
            text: site.shortName,
            font: '600 12px sans-serif',
            offsetY: -18,
            padding: [2, 4, 2, 4],
            fill: new Fill({ color: '#111827' }),
            stroke: new Stroke({ color: '#ffffff', width: 3 }),
            backgroundFill: new Fill({ color: 'rgba(255,255,255,0.88)' }),
            backgroundStroke: new Stroke({ color: 'rgba(15,23,42,0.25)', width: 1 })
          })
        })]
      : [])
  ]

  styleCache.set(cacheKey, styles)
  return styles
}

function directionsUrl(site: ThediracGeologySite) {
  const origin = `${THEDIRAC_ORIGIN.lat},${THEDIRAC_ORIGIN.lon}`
  const destination = `${site.lat},${site.lon}`
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
}

function mapUrl(site: ThediracGeologySite) {
  return `https://www.openstreetmap.org/?mlat=${site.lat}&mlon=${site.lon}#map=16/${site.lat}/${site.lon}`
}

function driveStatus(kind: GeologyLayerKind, site: ThediracGeologySite) {
  if (site.driveMinutes <= 90) return 'Binnen de selectie van circa 1½ uur'
  if (kind === 'mineral') return 'Randgeval: circa 1½ uur zonder verkeer'
  return 'Uitzonderlijke fossieldagtocht: rijk genoeg voor de langere rit'
}

function createFeature(kind: GeologyLayerKind, site: ThediracGeologySite) {
  const settings = layerSettings[kind]
  const feature = new Feature({
    geometry: new Point(fromLonLat([site.lon, site.lat]))
  })

  feature.setId(site.id)
  feature.setStyle((_feature, resolution) => markerStyles(kind, site, resolution))
  feature.setProperties({
    layerType: 'importedLayer',
    layerName: settings.title,
    layerColor: settings.color,
    name: site.name,
    'Categorie': kind === 'mineral' ? 'Mineraal- of gesteentelocatie' : 'Fossielvindplaats',
    [kind === 'mineral' ? 'Mineraal / gesteente' : 'Tijdvak / fossielcontext']: site.materialOrAge,
    'Bewijs': site.evidenceNl,
    'Terrein': site.terrainNl,
    'Aan het oppervlak': site.surfaceNl,
    'Toegang': site.accessNl,
    'Verzamelen': site.collectingNl,
    ...(site.protectionNl ? { 'Bescherming': site.protectionNl } : {}),
    ...(site.stars ? { 'INPG-waardering': `${site.stars} van 3 sterren` } : {}),
    'Rijtijd vanaf Thédirac': `circa ${site.driveMinutes} min · ${site.driveKm.toFixed(1)} km enkele reis`,
    'Rijtijdstatus': driveStatus(kind, site),
    'Routeberekening': 'OSRM-richtwaarde zonder actuele verkeersdrukte',
    'Markerprecisie': site.coordinateBasisNl,
    'Coördinaten bronpunt': `${site.lat.toFixed(6)}, ${site.lon.toFixed(6)}`,
    'Route richting brongebied': directionsUrl(site),
    'Punt op OpenStreetMap': mapUrl(site),
    ...(site.officialUrl ? { 'Officiële bezoekersinformatie': site.officialUrl } : {}),
    ...(site.protectionUrl ? { 'Bescherming / beheer': site.protectionUrl } : {}),
    ...(site.inpgCode ? { 'INPG-bronfiche': inpgSiteUrl(site.inpgCode) } : {}),
    ...(site.inpgCode ? { 'INPG-dataset': INPG_DATASET_URL } : {}),
    ...(site.sourceUrl ? { 'Bronpublicatie': site.sourceUrl } : {})
  }, true)

  return feature
}

function createLayer(kind: GeologyLayerKind, sites: ThediracGeologySite[]) {
  const settings = layerSettings[kind]
  return new VectorLayer({
    properties: { title: settings.title, type: 'overlay' },
    visible: false,
    opacity: 1,
    zIndex: settings.zIndex,
    declutter: true,
    renderBuffer: 120,
    source: new VectorSource({
      features: sites.map(site => createFeature(kind, site)),
      attributions: 'Geosites: DREAL Occitanie / INPG / MNHN / BRGM; rijtijdindicatie: OSRM'
    })
  })
}

export function createThediracMineralsLayerOL() {
  return createLayer('mineral', THEDIRAC_MINERAL_SITES)
}

export function createThediracFossilsLayerOL() {
  return createLayer('fossil', THEDIRAC_FOSSIL_SITES)
}
