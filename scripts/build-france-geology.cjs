/**
 * Bouwt de lokale geologie-data voor Frankrijk uit BRGM BD Charm-50 (harmonisé).
 *
 * Gebruik:
 *   1. Download per departement GEO050K_HARM_<ddd>.zip van
 *      https://infoterre.brgm.fr/telechargements/BDCharm50/ (Licence Ouverte Etalab)
 *      en pak uit in een map, bijvoorbeeld /tmp/charm/024.
 *   2. node scripts/build-france-geology.cjs /tmp/charm/024 /tmp/charm/046 ...
 *
 * Uitvoer in public/data/geologie_fr/:
 *   index.json            departementen met bbox en lijst van vakken
 *   <ddd>/legend.json     eenheden met code, notatie, omschrijving en kleur
 *   <ddd>/<x>_<y>.json    vlakken per vak van 0,25° (alleen geladen als nodig):
 *                         [code, buitenring, gat, ...], ringen als verschilgetallen x 1e5
 */
const fs = require('fs')
const path = require('path')
const shp = require('shapefile')
const proj4 = require('proj4')

proj4.defs('EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs')

const OUT = path.join(__dirname, '..', 'public', 'data', 'geologie_fr')
const CELL = 0.25
const EPS = 0.00012 // ongeveer 12 m: ruim binnen de nauwkeurigheid van 1:50.000 (1 mm = 50 m)
const SCALE = 1e5 // coördinaten als gehele getallen in 0,00001°

const decode = s => s.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const clamp = v => Math.min(100, Math.max(0, Number(v) || 0)) // BRGM gebruikt soms -1 voor 'geen'
const cmyk = (c, m, y, k) => '#' + [c, m, y].map(v => Math.round(255 * (1 - clamp(v) / 100) * (1 - clamp(k) / 100)).toString(16).padStart(2, '0')).join('')

function simplify(points) {
  if (points.length < 3) return points
  let max = 0, index = 0
  const [a, b] = [points[0], points[points.length - 1]]
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i], dx = b[0] - a[0], dy = b[1] - a[1]
    const d = Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / (Math.hypot(dx, dy) || 1e-12)
    if (d > max) { max = d; index = i }
  }
  if (max <= EPS) return [a, b]
  return simplify(points.slice(0, index + 1)).slice(0, -1).concat(simplify(points.slice(index)))
}

function ring(coords) {
  const q = coords.map(c => proj4('EPSG:2154', 'EPSG:4326', c)).map(([x, y]) => [+x.toFixed(5), +y.toFixed(5)])
  const mid = Math.floor(q.length / 2)
  const p = simplify(q.slice(0, mid + 1)).slice(0, -1).concat(simplify(q.slice(mid)))
  return p.length >= 4 ? p : null
}

/** Ring als platte lijst: eerste punt absoluut, daarna verschillen (gehele getallen). */
function encodeRing(points) {
  const out = []
  let px = 0, py = 0
  for (const [x, y] of points) {
    const ix = Math.round(x * SCALE), iy = Math.round(y * SCALE)
    out.push(ix - px, iy - py)
    px = ix; py = iy
  }
  return out
}

async function buildDepartment(dir) {
  const base = fs.readdirSync(dir).find(name => /_S_FGEOL_2154\.shp$/.test(name))
  if (!base) throw new Error(`Geen S_FGEOL-shapefile in ${dir}`)
  const dept = base.match(/HARM_(\d{3}|2[AB])_/)[1]
  const stem = path.join(dir, base.replace(/\.shp$/, ''))
  const qml = fs.readFileSync(stem + '.qml', 'utf8')
  const labels = {}
  for (const m of qml.matchAll(/filter="CODE_LEG='(\d+)'" label="([^"]*)"/g)) labels[m[1]] = decode(m[2]).replace(/ - \d+$/, '')

  const legend = {}
  const cells = {}
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  const source = await shp.open(stem + '.shp', stem + '.dbf', { encoding: 'utf-8' })
  for (;;) {
    const result = await source.read()
    if (result.done) break
    const { geometry, properties: p } = result.value
    const code = String(p.CODE_LEG)
    const polygons = (geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates)
      .map(rings => rings.map(ring).filter(Boolean))
      .filter(rings => rings.length && rings[0])
    if (!polygons.length) continue
    const label = labels[code] || `${p.NOTATION}, ${p.DESCR}`
    const split = label.indexOf(', ')
    legend[code] = {
      code: Number(code),
      notation: split > 0 ? label.slice(0, split) : String(p.NOTATION),
      descr: split > 0 ? label.slice(split + 2) : label,
      color: cmyk(p.C_FOND, p.M_FOND, p.J_FOND, p.N_FOND),
    }
    for (const rings of polygons) {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
      for (const [x, y] of rings[0]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y) }
      minX = Math.min(minX, x0); maxX = Math.max(maxX, x1); minY = Math.min(minY, y0); maxY = Math.max(maxY, y1)
      for (let cx = Math.floor(x0 / CELL); cx <= Math.floor(x1 / CELL); cx++) {
        for (let cy = Math.floor(y0 / CELL); cy <= Math.floor(y1 / CELL); cy++) {
          (cells[`${cx}_${cy}`] ||= []).push([Number(code), ...rings.map(encodeRing)])
        }
      }
    }
  }

  const deptDir = path.join(OUT, dept)
  fs.rmSync(deptDir, { recursive: true, force: true })
  fs.mkdirSync(deptDir, { recursive: true })
  fs.writeFileSync(path.join(deptDir, 'legend.json'), JSON.stringify(Object.values(legend).sort((a, b) => a.code - b.code)))
  let bytes = 0
  for (const [key, polygons] of Object.entries(cells)) {
    const file = path.join(deptDir, `${key}.json`)
    fs.writeFileSync(file, JSON.stringify(polygons))
    bytes += fs.statSync(file).size
  }
  console.log(`${dept}: ${Object.keys(legend).length} eenheden, ${Object.keys(cells).length} vakken, ${(bytes / 1e6).toFixed(1)} MB`)
  return { dept, bbox: [minX, minY, maxX, maxY].map(v => +v.toFixed(4)), cells: Object.keys(cells).sort() }
}

;(async () => {
  const dirs = process.argv.slice(2)
  if (!dirs.length) throw new Error('Geef één of meer uitgepakte BD Charm-50-mappen op')
  fs.mkdirSync(OUT, { recursive: true })
  const indexFile = path.join(OUT, 'index.json')
  const index = fs.existsSync(indexFile) ? JSON.parse(fs.readFileSync(indexFile, 'utf8')) : { cell: CELL, departments: [] }
  for (const dir of dirs) {
    const entry = await buildDepartment(dir)
    index.departments = index.departments.filter(d => d.dept !== entry.dept).concat(entry).sort((a, b) => a.dept.localeCompare(b.dept))
  }
  index.cell = CELL
  index.scale = SCALE
  index.source = 'BRGM BD Charm-50 harmonisée, Licence Ouverte Etalab'
  fs.writeFileSync(indexFile, JSON.stringify(index))
})()
