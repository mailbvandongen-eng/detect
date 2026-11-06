/**
 * Geologische eenheden rond Thédirac uit BRGM BD Charm-50 (harmonisé, Lot).
 *
 * De BRGM-kaartdiensten geven voor de 1:50.000-geologie geen eenheid terug bij
 * een tik (GEOL50_HARM is "not queryable") en de legenda-afbeelding bevat geen
 * eenheden. Daarom staan de vlakken met officiële kleur en omschrijving lokaal
 * in ./data/thedirac_geologie_brgm.json (gemaakt uit de open BRGM-download
 * GEO050K_HARM_046, Licence Ouverte Etalab).
 */

export interface GeologyUnit {
  code: number
  notation: string
  descr: string
  color: string
}

interface GeologyData {
  bbox: [number, number, number, number]
  source: string
  legend: GeologyUnit[]
  features: { properties: { c: number }, geometry: { type: 'Polygon' | 'MultiPolygon', coordinates: number[][][] | number[][][][] } }[]
}

interface IndexedPolygon {
  code: number
  bbox: [number, number, number, number]
  rings: number[][][]
}

let loading: Promise<{ data: GeologyData, polygons: IndexedPolygon[] } | null> | null = null

function load() {
  if (!loading) {
    loading = fetch('./data/thedirac_geologie_brgm.json')
      .then(response => response.ok ? response.json() as Promise<GeologyData> : null)
      .then(data => {
        if (!data) return null
        const polygons: IndexedPolygon[] = []
        for (const feature of data.features) {
          const parts = feature.geometry.type === 'Polygon'
            ? [feature.geometry.coordinates as number[][][]]
            : feature.geometry.coordinates as number[][][][]
          for (const rings of parts) {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
            for (const [x, y] of rings[0]) {
              if (x < minX) minX = x
              if (x > maxX) maxX = x
              if (y < minY) minY = y
              if (y > maxY) maxY = y
            }
            polygons.push({ code: feature.properties.c, bbox: [minX, minY, maxX, maxY], rings })
          }
        }
        return { data, polygons }
      })
      .catch(() => {
        loading = null
        return null
      })
  }
  return loading
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

export function isInThediracGeologyArea(lon: number, lat: number, bbox: readonly number[] = [1.12, 44.45, 1.57, 44.81]) {
  return lon >= bbox[0] && lon <= bbox[2] && lat >= bbox[1] && lat <= bbox[3]
}

/** Zoekt de geologische eenheid op een punt; null buiten het gebied of zonder data. */
export async function findThediracGeologyUnit(lon: number, lat: number): Promise<{ unit: GeologyUnit, legend: GeologyUnit[], source: string } | null> {
  if (!isInThediracGeologyArea(lon, lat)) return null
  const loaded = await load()
  if (!loaded) return null
  for (const polygon of loaded.polygons) {
    const [minX, minY, maxX, maxY] = polygon.bbox
    if (lon < minX || lon > maxX || lat < minY || lat > maxY) continue
    if (!inRing(lon, lat, polygon.rings[0])) continue
    if (polygon.rings.slice(1).some(hole => inRing(lon, lat, hole))) continue
    const unit = loaded.data.legend.find(entry => entry.code === polygon.code)
    if (unit) return { unit, legend: loaded.data.legend, source: loaded.data.source }
  }
  return null
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char))

function swatch(color: string) {
  return `<span class="inline-block w-4 h-4 rounded-sm" style="background-color:${color}">&nbsp;</span>`
}

/** Popuptekst: de aangetikte eenheid bovenaan, daaronder de volledige legenda van het gebied. */
export function formatThediracGeologyPopup(unit: GeologyUnit, legend: GeologyUnit[], infoLink: string) {
  let html = '<strong class="text-amber-800">Geologische eenheid · BRGM 1:50.000</strong>'
  html += `<div class="mt-2 flex items-center gap-2">${swatch(unit.color)}<span class="font-semibold">${escapeHtml(unit.notation)}</span></div>`
  html += `<div class="text-sm text-gray-700 mt-1">${escapeHtml(unit.descr)}</div>`
  html += '<details class="mt-2"><summary class="text-blue-700 underline text-sm">Legenda van het gebied</summary><div class="mt-1">'
  for (const entry of legend) {
    const current = entry.code === unit.code ? ' font-semibold' : ''
    html += `<div class="flex items-center gap-2 text-xs${current}">${swatch(entry.color)}<span>${escapeHtml(entry.notation)} — ${escapeHtml(entry.descr)}</span></div>`
  }
  html += '</div></details>'
  html += '<div class="mt-2 text-xs text-gray-500">BRGM geharmoniseerde geologie (BD Charm-50). De gesteente-eenheid bewijst geen aanwezigheid van silex of vindplaatsen.</div>'
  html += `<div class="mt-1"><a href="${infoLink}" target="_blank" rel="noopener noreferrer" class="text-blue-700 text-sm underline">Kaartbladtoelichting in BRGM InfoTerre</a></div>`
  return html
}
