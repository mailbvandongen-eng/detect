/**
 * Geologische eenheden voor Franse departementen uit BRGM BD Charm-50
 * (harmonisé, Licence Ouverte Etalab), gebouwd met
 * scripts/build-france-geology.cjs naar ./data/geologie_fr/.
 *
 * De BRGM-diensten geven voor de 1:50.000-geologie geen eenheid terug bij een
 * tik en hun legenda-afbeelding bevat geen eenheden. Daarom staan de vlakken
 * met officiële kleur en omschrijving lokaal, per vak van 0,25° opgedeeld.
 */

export interface GeologyUnit {
  code: number
  notation: string
  descr: string
  color: string
}

interface GeologyIndex {
  cell: number
  scale: number
  departments: { dept: string, bbox: [number, number, number, number], cells: string[] }[]
}

export interface GeologyPolygon {
  code: number
  bbox: [number, number, number, number]
  /** Ringen in lon/lat; de eerste is de buitenrand, de rest zijn gaten. */
  rings: number[][][]
}

/**
 * Departementen waarvoor BRGM geen geharmoniseerde kaart (SCAN_H_GEOL50)
 * serveert. Daar tekent Detect de vlakken zelf; elders toont de WMS-kaart
 * dezelfde kleuren.
 */
export const DEPARTMENTS_WITHOUT_HARMONISED_SCAN = new Set(['024', '047'])

const BASE = './data/geologie_fr'
let indexPromise: Promise<GeologyIndex | null> | null = null
const legendCache = new Map<string, Promise<GeologyUnit[]>>()
const cellCache = new Map<string, Promise<GeologyPolygon[]>>()

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url}: ${response.status}`)
  return response.json() as Promise<T>
}

export function loadGeologyIndex() {
  if (!indexPromise) {
    indexPromise = getJson<GeologyIndex>(`${BASE}/index.json`).catch(() => {
      indexPromise = null
      return null
    })
  }
  return indexPromise
}

export function loadGeologyLegend(dept: string) {
  let promise = legendCache.get(dept)
  if (!promise) {
    promise = getJson<GeologyUnit[]>(`${BASE}/${dept}/legend.json`)
    promise.catch(() => legendCache.delete(dept))
    legendCache.set(dept, promise)
  }
  return promise
}

function decodeRing(values: number[], scale: number) {
  const points: number[][] = []
  let x = 0, y = 0
  for (let i = 0; i < values.length; i += 2) {
    x += values[i]
    y += values[i + 1]
    points.push([x / scale, y / scale])
  }
  return points
}

export function loadGeologyCell(dept: string, key: string, scale: number) {
  const id = `${dept}/${key}`
  let promise = cellCache.get(id)
  if (!promise) {
    promise = getJson<[number, ...number[][]][]>(`${BASE}/${id}.json`).then(entries => entries.map(([code, ...rings]) => {
      const decoded = rings.map(ring => decodeRing(ring, scale))
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      for (const [x, y] of decoded[0]) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
      return { code, bbox: [minX, minY, maxX, maxY] as [number, number, number, number], rings: decoded }
    }))
    promise.catch(() => cellCache.delete(id))
    cellCache.set(id, promise)
  }
  return promise
}

export function cellKey(lon: number, lat: number, cell: number) {
  return `${Math.floor(lon / cell)}_${Math.floor(lat / cell)}`
}

function inRing(x: number, y: number, ring: number[][]) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

/** Zoekt de geologische eenheid op een punt; null zonder lokale data. */
export async function findGeologyUnit(lon: number, lat: number): Promise<{ unit: GeologyUnit, legend: GeologyUnit[], dept: string } | null> {
  const index = await loadGeologyIndex()
  if (!index) return null
  const key = cellKey(lon, lat, index.cell)
  for (const department of index.departments) {
    const [minX, minY, maxX, maxY] = department.bbox
    if (lon < minX || lon > maxX || lat < minY || lat > maxY || !department.cells.includes(key)) continue
    const [polygons, legend] = await Promise.all([loadGeologyCell(department.dept, key, index.scale), loadGeologyLegend(department.dept)])
    for (const polygon of polygons) {
      const [x0, y0, x1, y1] = polygon.bbox
      if (lon < x0 || lon > x1 || lat < y0 || lat > y1) continue
      if (!inRing(lon, lat, polygon.rings[0])) continue
      if (polygon.rings.slice(1).some(hole => inRing(lon, lat, hole))) continue
      const unit = legend.find(entry => entry.code === polygon.code)
      if (unit) return { unit, legend, dept: department.dept }
    }
  }
  return null
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char))

function swatch(color: string) {
  return `<span class="inline-block w-4 h-4 rounded-sm" style="background-color:${color}">&nbsp;</span>`
}

/** Popuptekst: de aangetikte eenheid bovenaan, daaronder de legenda van het departement. */
export function formatGeologyPopup(unit: GeologyUnit, legend: GeologyUnit[], dept: string, infoLink: string) {
  let html = '<strong class="text-amber-800">Geologische eenheid · BRGM 1:50.000</strong>'
  html += `<div class="mt-2 flex items-center gap-2">${swatch(unit.color)}<span class="font-semibold">${escapeHtml(unit.notation)}</span></div>`
  html += `<div class="text-sm text-gray-700 mt-1">${escapeHtml(unit.descr)}</div>`
  html += `<details class="mt-2"><summary class="text-blue-700 underline text-sm">Legenda departement ${escapeHtml(dept)} (${legend.length} eenheden)</summary><div class="mt-1">`
  for (const entry of legend) {
    const current = entry.code === unit.code ? ' font-semibold' : ''
    html += `<div class="flex items-center gap-2 text-xs${current}">${swatch(entry.color)}<span>${escapeHtml(entry.notation)} — ${escapeHtml(entry.descr)}</span></div>`
  }
  html += '</div></details>'
  html += '<div class="mt-2 text-xs text-gray-500">BRGM geharmoniseerde geologie (BD Charm-50). De gesteente-eenheid bewijst geen aanwezigheid van silex of vindplaatsen.</div>'
  html += `<div class="mt-1"><a href="${infoLink}" target="_blank" rel="noopener noreferrer" class="text-blue-700 text-sm underline">Kaartbladtoelichting in BRGM InfoTerre</a></div>`
  return html
}
