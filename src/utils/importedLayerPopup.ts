import type { GeometryGroup, ImportedLayerPopupConfig } from '../store/customLayerStore'

const SYSTEM_FIELDS = new Set([
  'geometry',
  'layerType',
  'layerId',
  'layerName',
  'layerColor',
  'layerPopupConfig',
  'importedGeometryType',
  'importedGeometryGroup',
  'importedPointIndex',
  'featureIndex',
  'clusterCount',
  'clusterMembers',
  'clusterMaxZoom',
])

const TECHNICAL_FIELD_PATTERNS = [
  /^objectid(_\d+)?$/i,
  /^fid$/i,
  /^id$/i,
  /^globalid$/i,
  /^shape(_length|_area)?$/i,
  /^geometry$/i,
  /^style(url)?$/i,
  /^symbolid$/i,
  /^gx_/i,
  /^ogr_/i,
  /^created_(date|user)$/i,
  /^last_edited_(date|user)$/i,
]

const AUTO_TITLE_FIELDS = [
  'name', 'naam', 'title', 'titel', 'label', 'toponiem', 'locatie', 'location', 'plaats', 'site',
]

const FIELD_LABELS: Record<string, string> = {
  descr: 'Omschrijving',
  description: 'Omschrijving',
  omschrijving: 'Omschrijving',
  toelichting: 'Toelichting',
  onderzoek: 'Onderzoek',
  onderzoekstype: 'Onderzoekstype',
  methode: 'Methode',
  periode: 'Periode',
  datering: 'Datering',
  vondsten: 'Vondsten',
  sporen: 'Sporen',
  bron: 'Bron',
  source: 'Bron',
  url: 'Link',
  link: 'Link',
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function decodeHtml(value: string): string {
  if (typeof document === 'undefined') {
    return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  }
  const element = document.createElement('textarea')
  element.innerHTML = value
  return element.value
}

function stripHtml(value: string): string {
  const withSpacing = value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>|<\/div>|<\/tr>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
  return decodeHtml(withSpacing)
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim()
}

function stringifyValue(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function isUsefulValue(value: unknown): boolean {
  if (value === null || value === undefined) return false
  const text = stringifyValue(value)
  return text !== '' && text !== 'null' && text !== 'undefined'
}

function isGenericTitle(value: string): boolean {
  const normalized = stripHtml(value).trim().toLowerCase()
  return normalized === '' || normalized === 'arcgis' || normalized === 'feature' ||
    /^feature\s*\d+$/i.test(normalized) || normalized === 'untitled' || normalized === 'onbekend'
}

export function isTechnicalImportedField(key: string): boolean {
  if (SYSTEM_FIELDS.has(key)) return true
  return TECHNICAL_FIELD_PATTERNS.some(pattern => pattern.test(key))
}

export function formatImportedFieldLabel(key: string): string {
  const normalized = key.toLowerCase().replace(/[\s_-]/g, '')
  if (FIELD_LABELS[normalized]) return FIELD_LABELS[normalized]
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, character => character.toUpperCase())
}

function findPropertyKey(properties: Record<string, unknown>, wanted: string): string | undefined {
  return Object.keys(properties).find(key => key.toLowerCase() === wanted.toLowerCase())
}

function findTitle(
  properties: Record<string, unknown>,
  config: ImportedLayerPopupConfig,
  group: GeometryGroup
): { title: string; titleKey?: string } {
  if (config.titleField) {
    const key = findPropertyKey(properties, config.titleField)
    if (key && isUsefulValue(properties[key])) {
      const value = stringifyValue(properties[key])
      if (!isGenericTitle(value)) return { title: stripHtml(value), titleKey: key }
    }
  }

  for (const wanted of AUTO_TITLE_FIELDS) {
    const key = findPropertyKey(properties, wanted)
    if (!key || !isUsefulValue(properties[key])) continue
    const value = stringifyValue(properties[key])
    if (!isGenericTitle(value)) return { title: stripHtml(value), titleKey: key }
  }

  if (group === 'points') return { title: 'Vondstconcentratie' }
  if (group === 'polygons') return { title: 'Onderzoeksgebied' }
  return { title: 'Traject' }
}

function parseDescriptionTable(value: string): Array<[string, string]> {
  if (!/<table|<tr|<td/i.test(value)) return []
  const entries: Array<[string, string]> = []
  const rows = value.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || []
  for (const row of rows) {
    const cells = [...row.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)]
      .map(match => stripHtml(match[1]))
      .filter(Boolean)
    if (cells.length >= 2 && cells[0] !== cells[1]) entries.push([cells[0], cells.slice(1).join(' ')])
  }
  return entries
}

function fieldPriority(key: string): number {
  const normalized = key.toLowerCase()
  const priorities = [
    'onderzoek', 'project', 'methode', 'type', 'periode', 'datering', 'vondst', 'spoor',
    'omschrijving', 'description', 'toelichting', 'rapport', 'bron', 'source', 'url', 'link',
  ]
  const index = priorities.findIndex(value => normalized.includes(value))
  return index === -1 ? priorities.length : index
}

function renderValue(value: string): string {
  const plainValue = stripHtml(value)
  const shortened = plainValue.length > 500 ? `${plainValue.slice(0, 500)}…` : plainValue
  if (/^https?:\/\/\S+$/i.test(plainValue)) {
    return `<a href="${escapeHtml(plainValue)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Open link</a>`
  }
  const text = escapeHtml(shortened).replace(/\n/g, '<br/>')
  return `<span class="text-gray-700">${text}</span>`
}

export function formatImportedLayerPopup(properties: Record<string, unknown>): string {
  const layerName = stringifyValue(properties.layerName) || 'Geïmporteerde laag'
  const configuredColor = stringifyValue(properties.layerColor)
  const layerColor = /^#[0-9a-f]{6}$/i.test(configuredColor) ? configuredColor : '#8b5cf6'
  const group = properties.importedGeometryGroup === 'polygons' || properties.importedGeometryGroup === 'lines'
    ? properties.importedGeometryGroup
    : 'points'
  const rawConfig = properties.layerPopupConfig
  const config: ImportedLayerPopupConfig = rawConfig && typeof rawConfig === 'object' && !Array.isArray(rawConfig)
    ? {
        titleField: typeof (rawConfig as ImportedLayerPopupConfig).titleField === 'string'
          ? (rawConfig as ImportedLayerPopupConfig).titleField
          : null,
        hiddenFields: Array.isArray((rawConfig as ImportedLayerPopupConfig).hiddenFields)
          ? (rawConfig as ImportedLayerPopupConfig).hiddenFields
          : [],
        showTechnicalFields: (rawConfig as ImportedLayerPopupConfig).showTechnicalFields === true,
      }
    : { titleField: null, hiddenFields: [], showTechnicalFields: false }

  const { title, titleKey } = findTitle(properties, config, group)
  let arcGisSource = false
  const rows: Array<[string, string, number]> = []

  for (const [key, rawValue] of Object.entries(properties)) {
    if (SYSTEM_FIELDS.has(key) || key === titleKey || config.hiddenFields.includes(key)) continue
    if (!config.showTechnicalFields && isTechnicalImportedField(key)) continue
    if (!isUsefulValue(rawValue)) continue

    const value = stringifyValue(rawValue)
    if (stripHtml(value).trim().toLowerCase() === 'arcgis') {
      arcGisSource = true
      continue
    }

    if (/^(description|omschrijving|descr)$/i.test(key)) {
      const tableEntries = parseDescriptionTable(value)
      if (tableEntries.length > 0) {
        tableEntries.forEach(([tableKey, tableValue], index) => {
          if (tableValue.trim().toLowerCase() === 'arcgis') {
            arcGisSource = true
          } else if (tableValue) {
            rows.push([tableKey, tableValue, fieldPriority(tableKey) + index / 100])
          }
        })
        continue
      }
    }

    rows.push([key, value, fieldPriority(key)])
  }

  rows.sort((a, b) => a[2] - b[2])
  let html = `<strong style="color:${layerColor}">${escapeHtml(title)}</strong>`
  html += `<br/><span class="text-xs text-gray-500">${escapeHtml(layerName)}</span>`

  if (rows.length > 0) {
    html += '<div class="mt-2 space-y-1">'
    for (const [key, value] of rows) {
      html += `<div class="text-sm"><span class="text-gray-500">${escapeHtml(formatImportedFieldLabel(key))}:</span> ${renderValue(value)}</div>`
    }
    html += '</div>'
  }

  if (arcGisSource) {
    html += '<div class="mt-2 pt-1 border-t border-gray-100"><span class="text-xs text-gray-400">Bron: ArcGIS</span></div>'
  }

  return html
}
