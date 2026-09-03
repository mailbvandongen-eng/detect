import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import type Geometry from 'ol/geom/Geometry'
import Polygon from 'ol/geom/Polygon'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import { Fill, Stroke, Style } from 'ol/style'

export const THEDIRAC_RESEARCH_BBOX = [1.20, 44.48, 1.48, 44.71] as const
export const THEDIRAC_RESEARCH_COMMUNES = [
  'Thédirac',
  'Catus',
  'Montgesty',
  'Lavercantière',
  'Peyrilles',
  'Uzech',
  'Gindou'
] as const

const ARCHEOCC_EXPORT = 'https://data.laregion.fr/api/explore/v2.1/catalog/datasets/base_archeocc_opendata/exports/geojson'
const TOPAGE_WFS = 'https://services.sandre.eaufrance.fr/geo/topage2026'
const ALTITUDE_API = 'https://data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json'
const GRID_COLUMNS = 24
const GRID_ROWS = 18
const SLOPE_SAMPLE_METERS = 60

interface SamplePoint {
  lon: number
  lat: number
}

interface GridCell {
  row: number
  col: number
  centerLon: number
  centerLat: number
  polygon: Polygon
  altitude: number
  slopePercent: number
  relativeRelief: number
  waterDistance: number
  archaeologyDistance: number
  archaeologyName: string
  score: number
}

interface AnalysisData {
  cells: GridCell[]
  waterAvailable: boolean
  archaeologyAvailable: boolean
  altitudeResource: string
}

let archeOccPromise: Promise<Record<string, unknown>> | null = null
let analysisPromise: Promise<AnalysisData> | null = null

function buildArcheOccUrl(): string {
  const url = new URL(ARCHEOCC_EXPORT)
  const communeList = THEDIRAC_RESEARCH_COMMUNES.map(name => `"${name}"`).join(', ')
  url.searchParams.set('where', `commune IN (${communeList})`)
  url.searchParams.set('lang', 'fr')
  url.searchParams.set('timezone', 'Europe/Paris')
  return url.toString()
}

export function getThediracArcheOccUrl(): string {
  return buildArcheOccUrl()
}

export async function fetchThediracArcheOccGeoJson(): Promise<Record<string, unknown>> {
  if (!archeOccPromise) {
    archeOccPromise = (async () => {
      const response = await fetch(buildArcheOccUrl())
      if (!response.ok) throw new Error(`ArcheOcc ${response.status}`)
      return await response.json() as Record<string, unknown>
    })()
  }
  return archeOccPromise
}

function makeCellPolygon(minLon: number, minLat: number, maxLon: number, maxLat: number): Polygon {
  const ring = [
    [minLon, minLat],
    [maxLon, minLat],
    [maxLon, maxLat],
    [minLon, maxLat],
    [minLon, minLat]
  ].map(([lon, lat]) => fromLonLat([lon, lat]))
  return new Polygon([ring])
}

function createGrid() {
  const [minLon, minLat, maxLon, maxLat] = THEDIRAC_RESEARCH_BBOX
  const lonStep = (maxLon - minLon) / GRID_COLUMNS
  const latStep = (maxLat - minLat) / GRID_ROWS
  const cells: Array<{
    row: number
    col: number
    centerLon: number
    centerLat: number
    polygon: Polygon
  }> = []

  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLUMNS; col += 1) {
      const cellMinLon = minLon + col * lonStep
      const cellMinLat = minLat + row * latStep
      const cellMaxLon = cellMinLon + lonStep
      const cellMaxLat = cellMinLat + latStep
      cells.push({
        row,
        col,
        centerLon: (cellMinLon + cellMaxLon) / 2,
        centerLat: (cellMinLat + cellMaxLat) / 2,
        polygon: makeCellPolygon(cellMinLon, cellMinLat, cellMaxLon, cellMaxLat)
      })
    }
  }
  return cells
}

async function fetchElevationResource(points: SamplePoint[], resource: string): Promise<number[]> {
  const values: number[] = []
  const chunkSize = 240

  for (let offset = 0; offset < points.length; offset += chunkSize) {
    const chunk = points.slice(offset, offset + chunkSize)
    const url = new URL(ALTITUDE_API)
    url.searchParams.set('lon', chunk.map(point => point.lon.toFixed(7)).join('|'))
    url.searchParams.set('lat', chunk.map(point => point.lat.toFixed(7)).join('|'))
    url.searchParams.set('resource', resource)
    url.searchParams.set('delimiter', '|')
    url.searchParams.set('indent', 'false')
    url.searchParams.set('measures', 'false')
    url.searchParams.set('zonly', 'true')

    const response = await fetch(url.toString())
    if (!response.ok) throw new Error(`IGN altimetrie ${response.status}`)
    const data = await response.json() as { elevations?: unknown[] }
    if (!Array.isArray(data.elevations)) throw new Error('IGN altimetrie: geen elevations-array')
    values.push(...data.elevations.map(value => Number(value)))
  }

  return values
}

async function fetchElevations(points: SamplePoint[]): Promise<{ values: number[]; resource: string }> {
  const lidarResource = 'ign_lidar_hd_mnt_mono_wld'
  try {
    const values = await fetchElevationResource(points, lidarResource)
    const valid = values.filter(value => Number.isFinite(value) && value > -90000).length
    if (valid >= Math.floor(points.length * 0.8)) return { values, resource: 'IGN LiDAR HD MNT' }
  } catch (error) {
    console.warn('LiDAR HD altimetrie niet volledig beschikbaar, RGE ALTI fallback:', error)
  }

  const values = await fetchElevationResource(points, 'ign_rge_alti_wld')
  return { values, resource: 'IGN RGE ALTI' }
}

async function fetchTopageFeatures(): Promise<Feature<Geometry>[]> {
  const [minLon, minLat, maxLon, maxLat] = THEDIRAC_RESEARCH_BBOX
  const url = new URL(TOPAGE_WFS)
  url.searchParams.set('SERVICE', 'WFS')
  url.searchParams.set('VERSION', '2.0.0')
  url.searchParams.set('REQUEST', 'GetFeature')
  url.searchParams.set('TYPENAMES', 'CoursEau_FXX_Topage2026')
  url.searchParams.set('SRSNAME', 'EPSG:4326')
  url.searchParams.set('BBOX', `${minLon},${minLat},${maxLon},${maxLat},EPSG:4326`)
  url.searchParams.set('OUTPUTFORMAT', 'application/json')

  const response = await fetch(url.toString())
  if (!response.ok) throw new Error(`BD TOPAGE WFS ${response.status}`)
  const data = await response.json() as Record<string, unknown>
  return new GeoJSON().readFeatures(data, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  })
}

async function fetchArchaeologyFeatures(): Promise<Feature<Geometry>[]> {
  const data = await fetchThediracArcheOccGeoJson()
  return new GeoJSON().readFeatures(data, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  })
}

function localMetersFromMercator(distance: number, latitude: number): number {
  return distance * Math.cos(latitude * Math.PI / 180)
}

function closestFeature(
  coordinate: number[],
  latitude: number,
  features: Feature<Geometry>[]
): { distance: number; feature: Feature<Geometry> | null } {
  let bestDistance = Number.POSITIVE_INFINITY
  let bestFeature: Feature<Geometry> | null = null

  for (const feature of features) {
    const geometry = feature.getGeometry()
    if (!geometry) continue
    const closest = geometry.getClosestPoint(coordinate)
    const webMercatorDistance = Math.hypot(closest[0] - coordinate[0], closest[1] - coordinate[1])
    const distance = localMetersFromMercator(webMercatorDistance, latitude)
    if (distance < bestDistance) {
      bestDistance = distance
      bestFeature = feature
    }
  }

  return { distance: bestDistance, feature: bestFeature }
}

function archaeologyLabel(feature: Feature<Geometry> | null): string {
  if (!feature) return ''
  const properties = feature.getProperties()
  const candidates = [
    properties.nom_du_site_du_musee_ou_du_centre_d_interpretation,
    properties.sous_titre,
    properties.lieu_de_decouverte,
    properties.commune
  ]
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim()
  }
  return 'ArcheOcc-locatie'
}

function scoreSlope(slope: number): number {
  if (slope <= 3) return 3
  if (slope <= 7) return 2
  if (slope <= 12) return 1
  return 0
}

function scoreWater(distance: number): number {
  if (!Number.isFinite(distance)) return 0
  if (distance >= 120 && distance <= 700) return 3
  if (distance > 700 && distance <= 1400) return 2
  if ((distance >= 50 && distance < 120) || (distance > 1400 && distance <= 2200)) return 1
  return 0
}

function scoreRelief(relativeRelief: number, slope: number): number {
  if (slope > 12) return 0
  if (relativeRelief >= 3 && relativeRelief <= 20) return 2
  if ((relativeRelief >= 1 && relativeRelief < 3) || (relativeRelief > 20 && relativeRelief <= 40)) return 1
  return 0
}

function scoreArchaeology(distance: number): number {
  if (!Number.isFinite(distance)) return 0
  if (distance <= 1500) return 2
  if (distance <= 3000) return 1
  return 0
}

async function buildAnalysis(): Promise<AnalysisData> {
  const grid = createGrid()
  const samplePoints: SamplePoint[] = []

  for (const cell of grid) {
    const northDelta = SLOPE_SAMPLE_METERS / 111320
    const eastDelta = SLOPE_SAMPLE_METERS / (111320 * Math.cos(cell.centerLat * Math.PI / 180))
    samplePoints.push(
      { lon: cell.centerLon, lat: cell.centerLat },
      { lon: cell.centerLon + eastDelta, lat: cell.centerLat },
      { lon: cell.centerLon, lat: cell.centerLat + northDelta }
    )
  }

  const elevationResult = await fetchElevations(samplePoints)
  const centerElevations: number[] = []
  const slopes: number[] = []

  grid.forEach((_cell, index) => {
    const base = index * 3
    const center = elevationResult.values[base]
    const east = elevationResult.values[base + 1]
    const north = elevationResult.values[base + 2]
    centerElevations.push(center)

    if (![center, east, north].every(value => Number.isFinite(value) && value > -90000)) {
      slopes.push(Number.NaN)
      return
    }

    const eastRise = east - center
    const northRise = north - center
    slopes.push(Math.sqrt(eastRise * eastRise + northRise * northRise) / SLOPE_SAMPLE_METERS * 100)
  })

  let waterFeatures: Feature<Geometry>[] = []
  let archaeologyFeatures: Feature<Geometry>[] = []
  let waterAvailable = true
  let archaeologyAvailable = true

  try {
    waterFeatures = await fetchTopageFeatures()
  } catch (error) {
    waterAvailable = false
    console.warn('BD TOPAGE analyse niet geladen:', error)
  }

  try {
    archaeologyFeatures = await fetchArchaeologyFeatures()
  } catch (error) {
    archaeologyAvailable = false
    console.warn('ArcheOcc analyse niet geladen:', error)
  }

  const cells: GridCell[] = grid.map((cell, index) => {
    const centerCoordinate = fromLonLat([cell.centerLon, cell.centerLat])
    const slope = slopes[index]
    const altitude = centerElevations[index]

    let localMinimum = altitude
    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
        if (rowOffset === 0 && colOffset === 0) continue
        const neighborRow = cell.row + rowOffset
        const neighborCol = cell.col + colOffset
        if (neighborRow < 0 || neighborRow >= GRID_ROWS || neighborCol < 0 || neighborCol >= GRID_COLUMNS) continue
        const neighborAltitude = centerElevations[neighborRow * GRID_COLUMNS + neighborCol]
        if (Number.isFinite(neighborAltitude) && neighborAltitude > -90000) {
          localMinimum = Math.min(localMinimum, neighborAltitude)
        }
      }
    }

    const relativeRelief = Number.isFinite(altitude) ? Math.max(0, altitude - localMinimum) : Number.NaN
    const water = closestFeature(centerCoordinate, cell.centerLat, waterFeatures)
    const archaeology = closestFeature(centerCoordinate, cell.centerLat, archaeologyFeatures)
    const score = Number.isFinite(slope) && Number.isFinite(relativeRelief)
      ? scoreSlope(slope) + scoreWater(water.distance) + scoreRelief(relativeRelief, slope) + scoreArchaeology(archaeology.distance)
      : 0

    return {
      ...cell,
      altitude,
      slopePercent: slope,
      relativeRelief,
      waterDistance: water.distance,
      archaeologyDistance: archaeology.distance,
      archaeologyName: archaeologyLabel(archaeology.feature),
      score
    }
  })

  return {
    cells: cells.filter(cell => Number.isFinite(cell.altitude) && Number.isFinite(cell.slopePercent)),
    waterAvailable,
    archaeologyAvailable,
    altitudeResource: elevationResult.resource
  }
}

function getAnalysis(): Promise<AnalysisData> {
  if (!analysisPromise) analysisPromise = buildAnalysis()
  return analysisPromise
}

const slopeStyles = {
  flat: new Style({ fill: new Fill({ color: 'rgba(34,197,94,0.28)' }), stroke: new Stroke({ color: 'rgba(21,128,61,0.45)', width: 0.6 }) }),
  gentle: new Style({ fill: new Fill({ color: 'rgba(250,204,21,0.24)' }), stroke: new Stroke({ color: 'rgba(161,98,7,0.42)', width: 0.6 }) }),
  medium: new Style({ fill: new Fill({ color: 'rgba(249,115,22,0.24)' }), stroke: new Stroke({ color: 'rgba(194,65,12,0.42)', width: 0.6 }) }),
  steep: new Style({ fill: new Fill({ color: 'rgba(239,68,68,0.22)' }), stroke: new Stroke({ color: 'rgba(185,28,28,0.42)', width: 0.6 }) })
}

function slopeStyle(slope: number): Style {
  if (slope <= 3) return slopeStyles.flat
  if (slope <= 7) return slopeStyles.gentle
  if (slope <= 12) return slopeStyles.medium
  return slopeStyles.steep
}

const candidateStyles = {
  medium: new Style({ fill: new Fill({ color: 'rgba(250,204,21,0.24)' }), stroke: new Stroke({ color: 'rgba(161,98,7,0.65)', width: 1 }) }),
  good: new Style({ fill: new Fill({ color: 'rgba(74,222,128,0.25)' }), stroke: new Stroke({ color: 'rgba(22,101,52,0.72)', width: 1.1 }) }),
  high: new Style({ fill: new Fill({ color: 'rgba(22,163,74,0.32)' }), stroke: new Stroke({ color: 'rgba(20,83,45,0.9)', width: 1.3 }) })
}

function candidateStyle(score: number): Style {
  if (score >= 9) return candidateStyles.high
  if (score >= 7) return candidateStyles.good
  return candidateStyles.medium
}

function roundedDistance(distance: number): string {
  return Number.isFinite(distance) ? `${Math.round(distance)} m` : 'niet beschikbaar / indisponible'
}

export function createThediracResearchZoneLayerOL() {
  const [minLon, minLat, maxLon, maxLat] = THEDIRAC_RESEARCH_BBOX
  const feature = new Feature({
    geometry: makeCellPolygon(minLon, minLat, maxLon, maxLat),
    layerType: 'importedLayer',
    layerName: 'Onderzoekszone Thédirac',
    layerColor: '#2563eb',
    name: 'Onderzoekszone Thédirac / zone de recherche',
    'Gebied / zone': THEDIRAC_RESEARCH_COMMUNES.join(' · '),
    'Omschrijving / description': 'Werkgebied voor de lokale onderzoekslagen. Dit vlak is een praktische afbakening en geen archeologische vindplaats.',
    'Locatiekwaliteit / précision': 'werkgebied / emprise de travail',
    'Bron / source': 'Detect onderzoeksconfiguratie'
  })
  feature.setStyle(new Style({
    fill: new Fill({ color: 'rgba(37,99,235,0.025)' }),
    stroke: new Stroke({ color: 'rgba(37,99,235,0.85)', width: 1.5, lineDash: [7, 5] })
  }))
  return new VectorLayer({
    properties: { title: 'Onderzoekszone Thédirac', type: 'overlay' },
    visible: false,
    source: new VectorSource({ features: [feature] })
  })
}

export function createThediracSlopeLayerOL() {
  const source = new VectorSource({ attributions: '© IGN — LiDAR HD / RGE ALTI' })
  void getAnalysis().then(data => {
    const features = data.cells.map(cell => {
      const feature = new Feature({
        geometry: cell.polygon.clone(),
        layerType: 'importedLayer',
        layerName: 'Hellingklassen Thédirac',
        layerColor: '#f59e0b',
        name: `Helling ${cell.slopePercent.toFixed(1)}%`,
        'Helling / pente': `${cell.slopePercent.toFixed(1)}%`,
        'Hoogte / altitude': `${cell.altitude.toFixed(1)} m`,
        'Hoogtebron / source altimétrique': data.altitudeResource,
        'Betekenis / sens': cell.slopePercent <= 3 ? 'vrij vlak / presque plat' : cell.slopePercent <= 7 ? 'zwak hellend / pente faible' : cell.slopePercent <= 12 ? 'matig hellend / pente moyenne' : 'sterk hellend / pente forte',
        'Bronkwaliteit / qualité': 'berekend raster; bedoeld voor terreinvergelijking, niet als landmeetkundige meting'
      })
      feature.setStyle(slopeStyle(cell.slopePercent))
      return feature
    })
    source.addFeatures(features)
  }).catch(error => console.error('Hellingklassen Thédirac konden niet worden opgebouwd:', error))

  return new VectorLayer({
    properties: { title: 'Hellingklassen Thédirac', type: 'overlay' },
    visible: false,
    opacity: 0.5,
    source
  })
}

export function createThediracResearchMapLayerOL() {
  const source = new VectorSource({ attributions: '© IGN · © OFB/Sandre · Région Occitanie — berekening Detect' })
  void getAnalysis().then(data => {
    const features = data.cells
      .filter(cell => cell.score >= 6)
      .map(cell => {
        const feature = new Feature({
          geometry: cell.polygon.clone(),
          layerType: 'importedLayer',
          layerName: 'Onderzoekskaart Thédirac',
          layerColor: '#16a34a',
          name: `Onderzoekszone ${cell.score}/10`,
          'Score / score': `${cell.score}/10`,
          'Helling / pente': `${cell.slopePercent.toFixed(1)}%`,
          'Hoogte / altitude': `${cell.altitude.toFixed(1)} m`,
          'Lokaal hoger terrein / relief local': `${cell.relativeRelief.toFixed(1)} m boven laagste buurcel`,
          'Afstand water / distance eau': roundedDistance(cell.waterDistance),
          'Nabije archeologie / archéologie proche': data.archaeologyAvailable ? `${roundedDistance(cell.archaeologyDistance)}${cell.archaeologyName ? ` · ${cell.archaeologyName}` : ''}` : 'ArcheOcc niet beschikbaar',
          'Berekening / calcul': 'helling + lokaal reliëf + afstand tot BD TOPAGE-water + nabijheid van bekende ArcheOcc-context',
          'Controlelagen / couches de contrôle': 'OCS GE landbedekking · BRGM geologie · Forêts anciennes',
          'Waterbron / source eau': data.waterAvailable ? 'BD TOPAGE 2026' : 'niet beschikbaar tijdens berekening',
          'Hoogtebron / source altimétrique': data.altitudeResource,
          'Betekenis / sens': 'verklaarbare onderzoekshulp; dit is geen bewijs dat hier archeologie of vondsten liggen',
          'Bronkwaliteit / qualité': 'berekend uit officiële open bronnen; resolutie en actualiteit verschillen per bron'
        })
        feature.setStyle(candidateStyle(cell.score))
        return feature
      })
    source.addFeatures(features)
  }).catch(error => console.error('Onderzoekskaart Thédirac kon niet worden opgebouwd:', error))

  return new VectorLayer({
    properties: { title: 'Onderzoekskaart Thédirac', type: 'overlay' },
    visible: false,
    opacity: 0.72,
    source
  })
}
