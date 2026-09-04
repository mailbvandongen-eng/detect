import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SOURCE = 'https://services.sandre.eaufrance.fr/geo/topage2026'
const OUTPUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data/topage_thedirac_2026.geojson')
const BBOX = [1.12, 44.45, 1.57, 44.81]
const SIMPLIFY_TOLERANCE = 0.00004

function outCode([x, y]) {
  let code = 0
  if (x < BBOX[0]) code |= 1
  else if (x > BBOX[2]) code |= 2
  if (y < BBOX[1]) code |= 4
  else if (y > BBOX[3]) code |= 8
  return code
}

function clipSegment(start, end) {
  let [x0, y0] = start
  let [x1, y1] = end
  let code0 = outCode([x0, y0])
  let code1 = outCode([x1, y1])

  while (true) {
    if (!(code0 | code1)) return [[x0, y0], [x1, y1]]
    if (code0 & code1) return null

    const code = code0 || code1
    let x
    let y

    if (code & 8) {
      x = x0 + ((x1 - x0) * (BBOX[3] - y0)) / (y1 - y0)
      y = BBOX[3]
    } else if (code & 4) {
      x = x0 + ((x1 - x0) * (BBOX[1] - y0)) / (y1 - y0)
      y = BBOX[1]
    } else if (code & 2) {
      y = y0 + ((y1 - y0) * (BBOX[2] - x0)) / (x1 - x0)
      x = BBOX[2]
    } else {
      y = y0 + ((y1 - y0) * (BBOX[0] - x0)) / (x1 - x0)
      x = BBOX[0]
    }

    if (code === code0) {
      x0 = x
      y0 = y
      code0 = outCode([x0, y0])
    } else {
      x1 = x
      y1 = y
      code1 = outCode([x1, y1])
    }
  }
}

function samePoint(a, b) {
  return Math.abs(a[0] - b[0]) < 1e-10 && Math.abs(a[1] - b[1]) < 1e-10
}

function clipLine(line) {
  const parts = []
  let current = []

  for (let index = 1; index < line.length; index += 1) {
    const clipped = clipSegment(line[index - 1], line[index])
    if (!clipped) {
      if (current.length > 1) parts.push(current)
      current = []
      continue
    }

    const [start, end] = clipped
    if (!current.length || !samePoint(current[current.length - 1], start)) {
      if (current.length > 1) parts.push(current)
      current = [start, end]
    } else if (!samePoint(current[current.length - 1], end)) {
      current.push(end)
    }
  }

  if (current.length > 1) parts.push(current)
  return parts
}

function distanceToSegmentSquared(point, start, end) {
  let x = start[0]
  let y = start[1]
  let dx = end[0] - x
  let dy = end[1] - y

  if (dx || dy) {
    const t = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy)
    if (t > 1) {
      x = end[0]
      y = end[1]
    } else if (t > 0) {
      x += dx * t
      y += dy * t
    }
  }

  dx = point[0] - x
  dy = point[1] - y
  return dx * dx + dy * dy
}

function simplifyLine(points, tolerance) {
  if (points.length <= 2) return points
  const squaredTolerance = tolerance * tolerance

  function simplifySection(first, last, output) {
    let maxDistance = squaredTolerance
    let splitIndex = -1

    for (let index = first + 1; index < last; index += 1) {
      const distance = distanceToSegmentSquared(points[index], points[first], points[last])
      if (distance > maxDistance) {
        splitIndex = index
        maxDistance = distance
      }
    }

    if (splitIndex > -1) {
      if (splitIndex - first > 1) simplifySection(first, splitIndex, output)
      output.push(points[splitIndex])
      if (last - splitIndex > 1) simplifySection(splitIndex, last, output)
    }
  }

  const output = [points[0]]
  simplifySection(0, points.length - 1, output)
  output.push(points[points.length - 1])
  return output
}

function geometryLines(geometry) {
  if (geometry?.type === 'LineString') return [geometry.coordinates]
  if (geometry?.type === 'MultiLineString') return geometry.coordinates
  return []
}

const url = new URL(SOURCE)
url.searchParams.set('SERVICE', 'WFS')
url.searchParams.set('VERSION', '2.0.0')
url.searchParams.set('REQUEST', 'GetFeature')
url.searchParams.set('TYPENAMES', 'sa:CoursEau_FXX_Topage2026')
url.searchParams.set('SRSNAME', 'EPSG:4326')
// WFS 2.0 honours the EPSG:4326 latitude/longitude axis order here.
url.searchParams.set('BBOX', `${BBOX[1]},${BBOX[0]},${BBOX[3]},${BBOX[2]},EPSG:4326`)
url.searchParams.set('OUTPUTFORMAT', 'application/json; subtype=geojson')

const response = await fetch(url)
if (!response.ok) throw new Error(`BD TOPAGE WFS returned ${response.status}`)
const source = await response.json()

const features = source.features.flatMap(feature => {
  const parts = geometryLines(feature.geometry)
    .flatMap(clipLine)
    .map(line => simplifyLine(line, SIMPLIFY_TOLERANCE))
    .filter(line => line.length > 1)

  if (!parts.length) return []

  return [{
    type: 'Feature',
    id: feature.id,
    properties: {
      CdOH: feature.properties?.CdOH ?? '',
      TopoOH: feature.properties?.TopoOH ?? '',
      StatutOH: feature.properties?.StatutOH ?? '',
      SourceNomOH: feature.properties?.SourceNomOH ?? ''
    },
    geometry: {
      type: 'MultiLineString',
      coordinates: parts
    }
  }]
})

const output = {
  type: 'FeatureCollection',
  name: 'BD TOPAGE 2026 — Thédirac en omgeving',
  bbox: BBOX,
  source: url.toString(),
  features
}

await mkdir(dirname(OUTPUT), { recursive: true })
await writeFile(OUTPUT, `${JSON.stringify(output)}\n`)
console.log(`BD TOPAGE: ${features.length} waterlopen geschreven naar ${OUTPUT}`)
