#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUTPUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data/thedirac_spectacular_hikes.geojson')
const CACHE_DIR = process.env.THEDIRAC_HIKES_GPX_DIR

const routes = [
  {
    id: 'autoire-reculee',
    file: 'autoire.gpx',
    distanceKm: 5.7,
    gpxUrl: 'https://cdt46.media.tourinsoft.eu/upload/circuit-de-la-reculee-dautoire.gpx'
  },
  {
    id: 'moulin-du-saut',
    file: 'moulin-saut.gpx',
    distanceKm: 4.6,
    gpxUrl: 'https://cdt46.media.tourinsoft.eu/upload/circuit-du-moulin-du-saut.gpx'
  },
  {
    id: 'canyon-alzou',
    file: 'alzou.gpx',
    distanceKm: 12.4,
    gpxUrl: 'https://cdt46.media.tourinsoft.eu/upload/vd29-le-canyon-de-lalzou-2.gpx'
  },
  {
    id: 'andre-breton',
    file: 'andre-breton.gpx',
    distanceKm: 9.7,
    gpxUrl: 'https://cdt46.media.tourinsoft.eu/upload/sur-les-traces-dandre-breton.gpx'
  },
  {
    id: 'trois-gouffres',
    file: 'trois-gouffres.gpx',
    distanceKm: 8.6,
    gpxUrl: 'https://cdt46.media.tourinsoft.eu/upload/la-boucle-des-3-gouffres.gpx'
  },
  {
    id: 'micoque',
    file: 'micoque.gpx',
    // De bronpagina noemt varianten van 8 en 15 km; de gekoppelde GPX meet 12,3 km.
    distanceKm: 12.3,
    gpxUrl: 'https://woody.cloudly.space/app/uploads/dordogne-perigord/2024/02/Boucle-de-la-micoque-1-1.gpx'
  },
  {
    id: 'bozouls-pr26',
    file: 'bozouls.gpx',
    distanceKm: 14,
    gpxUrl: 'https://www.tourisme-aveyron.com/lae/services1.0/plugins/laetis/diffusio-258/data-cdt12_SQL3c/downloadFile.php?file=https://medias.hit.enaveyron.fr/fiches/18588/documents/bd89210d-1463-4248-9ebe-6559eca1d49d.gpx'
  },
  {
    id: 'viaur-ens',
    file: 'viaur.gpx',
    distanceKm: 9.1,
    gpxUrl: 'https://un.cirkwi.com/exporter_gpx.php?id_circuit=373411&w=591183627993&lang=fr&id_outil=206695&id_flux_export=50&compter_visites=1&extension=.gpx'
  },
  {
    id: 'bec-aigle-puy-griou',
    file: 'puy-griou.gpx',
    distanceKm: 13.1,
    gpxUrl: 'https://static.apidae-tourisme.com/filestore/objets-touristiques/plans/217/3/16909273/n+31+bec+de+laigle+puy+griou.gpx'
  },
  {
    id: 'cascade-faillitoux',
    file: 'faillitoux.gpx',
    distanceKm: 4.5,
    gpxUrl: 'https://static.apidae-tourisme.com/filestore/objets-touristiques/plans/137/221/7396745/Cascade+du+Faillitoux+-+trace.gpx'
  },
  {
    id: 'pas-de-cere',
    file: 'pas-de-cere.gpx',
    // De GPX tekent de enkele lijn; de officiële afstand is 2 km heen-en-terug.
    distanceKm: 2,
    geometryDistanceKm: 1,
    gpxUrl: 'https://static.apidae-tourisme.com/filestore/objets-touristiques/plans/132/227/27583364/parcours_2647159.gpx'
  }
]

function parsePointTags(xml, tagName) {
  const pointPattern = new RegExp(`<${tagName}\\b([^>]*?)(?:\\/>|>([\\s\\S]*?)<\\/${tagName}>)`, 'g')
  return [...xml.matchAll(pointPattern)].map(match => {
    const latitude = Number(match[1].match(/lat=["']([^"']+)/)?.[1])
    const longitude = Number(match[1].match(/lon=["']([^"']+)/)?.[1])
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error(`Ongeldig ${tagName}-punt in GPX`)
    }
    return [longitude, latitude]
  })
}

function parseGpx(xml) {
  const trackSegments = [...xml.matchAll(/<trkseg\b[^>]*>([\s\S]*?)<\/trkseg>/g)]
    .map(match => parsePointTags(match[1], 'trkpt'))
    .filter(points => points.length > 1)

  if (trackSegments.length) return trackSegments

  const routes = [...xml.matchAll(/<rte\b[^>]*>([\s\S]*?)<\/rte>/g)]
    .map(match => parsePointTags(match[1], 'rtept'))
    .filter(points => points.length > 1)

  if (routes.length) return routes
  throw new Error('GPX bevat geen bruikbare track- of routesegmenten')
}

function distanceKm(segments) {
  const earthRadiusKm = 6371
  const radians = degrees => degrees * Math.PI / 180
  let total = 0

  for (const points of segments) {
    for (let index = 1; index < points.length; index += 1) {
      const [lon1, lat1] = points[index - 1]
      const [lon2, lat2] = points[index]
      const deltaLat = radians(lat2 - lat1)
      const deltaLon = radians(lon2 - lon1)
      const a = Math.sin(deltaLat / 2) ** 2
        + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(deltaLon / 2) ** 2
      total += 2 * earthRadiusKm * Math.asin(Math.sqrt(a))
    }
  }

  return total
}

async function loadGpx(route) {
  const cachedPath = CACHE_DIR ? resolve(CACHE_DIR, route.file) : ''
  if (cachedPath && existsSync(cachedPath)) return readFileSync(cachedPath, 'utf8')

  const response = await fetch(route.gpxUrl)
  if (!response.ok) throw new Error(`${route.id}: GPX-download gaf HTTP ${response.status}`)
  return response.text()
}

const features = []

for (const route of routes) {
  const segments = parseGpx(await loadGpx(route))
  const measuredDistance = distanceKm(segments)
  const expectedGeometryDistance = route.geometryDistanceKm ?? route.distanceKm
  const difference = Math.abs(measuredDistance - expectedGeometryDistance)

  if (difference > Math.max(0.35, expectedGeometryDistance * 0.08)) {
    throw new Error(`${route.id}: GPX meet ${measuredDistance.toFixed(2)} km; verwacht ${expectedGeometryDistance.toFixed(2)} km`)
  }

  for (const points of segments) {
    for (const [longitude, latitude] of points) {
      if (longitude < -2 || longitude > 5 || latitude < 42 || latitude > 47) {
        throw new Error(`${route.id}: punt ligt buiten de verwachte Zuidwest-Franse regio`)
      }
    }
  }

  features.push({
    type: 'Feature',
    id: route.id,
    properties: {
      routeId: route.id,
      geometryKm: Number(measuredDistance.toFixed(2)),
      pointCount: segments.reduce((sum, points) => sum + points.length, 0)
    },
    geometry: segments.length === 1
      ? { type: 'LineString', coordinates: segments[0] }
      : { type: 'MultiLineString', coordinates: segments }
  })

  console.log(`${route.id}: ${measuredDistance.toFixed(2)} km, ${features.at(-1).properties.pointCount} punten`)
}

writeFileSync(OUTPUT, `${JSON.stringify({
  type: 'FeatureCollection',
  name: 'Spectaculaire officiële wandelroutes rond Thédirac',
  generatedFrom: 'Officiële GPX-downloads; bronlinks staan per route in Detect',
  features
})}\n`)

console.log(`Geschreven: ${OUTPUT}`)
