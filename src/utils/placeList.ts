import type { CustomLayer, CustomFeature } from '../store/customLayerStore'
import type { CustomPointLayer } from '../store/customPointLayerStore'
import type { Preset } from '../store/presetStore'

export type PlaceListScope = 'visible' | 'all' | `preset:${string}` | `point:${string}` | `imported:${string}` | `builtin:${string}`
export interface PlaceEntry {
  id: string
  sourceKey: PlaceListScope
  layerId: string
  layerName: string
  color: string
  name: string
  category: string
  description: string
  coordinates: [number, number] | null
  createdAt: string
  properties: Record<string, unknown>
  geometryType: string
  geometry?: CustomFeature['geometry']
  pointId?: string
  popupHtml?: string
  editable: boolean
  seedId?: string
}
export interface PlaceSource {
  key: PlaceListScope
  name: string
  color: string
  visible: boolean
  kind: 'point' | 'imported' | 'builtin'
  snapshotKey: string
  entries: PlaceEntry[]
}

export function plainPlaceText(value: unknown): string {
  if (typeof value !== 'string' && typeof value !== 'number') return ''
  const text = String(value).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ')
  if (typeof document !== 'undefined') {
    const el = document.createElement('textarea')
    el.innerHTML = text
    return el.value.replace(/\s+/g, ' ').trim()
  }
  return text.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}
function propertyText(properties: Record<string, unknown>, names: string[]) {
  for (const name of names) {
    const key = Object.keys(properties).find(k => k.toLowerCase() === name.toLowerCase())
    const value = key ? plainPlaceText(properties[key]) : ''
    if (value) return value
  }
  return ''
}
export function placeCoordinates(geometry: CustomFeature['geometry'] | undefined): [number, number] | null {
  if (!geometry) return null
  let west = Infinity, east = -Infinity, south = Infinity, north = -Infinity
  let first: [number, number] | null = null
  const walk = (item: unknown) => {
    if (!Array.isArray(item)) return
    if (typeof item[0] === 'number' && typeof item[1] === 'number') {
      const [lon, lat] = item
      if (Number.isFinite(lon) && Number.isFinite(lat) && Math.abs(lon) <= 180 && Math.abs(lat) <= 90) {
        first ??= [lon, lat]
        west = Math.min(west, lon); east = Math.max(east, lon); south = Math.min(south, lat); north = Math.max(north, lat)
      }
    } else item.forEach(walk)
  }
  walk(geometry.coordinates)
  if (!first) return null
  if (geometry.type === 'Point') return first
  return [(west + east) / 2, (south + north) / 2]
}
function placeIntersectsExtent(entry: PlaceEntry, extent: number[]) {
  const [west,south,east,north] = extent
  if (entry.geometry && entry.geometryType !== 'Point') {
    let w=Infinity,s=Infinity,e=-Infinity,n=-Infinity
    const walk = (item: unknown) => {
      if (!Array.isArray(item)) return
      if (typeof item[0] === 'number' && typeof item[1] === 'number') {
        if (Number.isFinite(item[0]) && Number.isFinite(item[1])) {w=Math.min(w,item[0]);e=Math.max(e,item[0]);s=Math.min(s,item[1]);n=Math.max(n,item[1])}
      } else item.forEach(walk)
    }
    walk(entry.geometry.coordinates)
    return w <= east && e >= west && s <= north && n >= south
  }
  return !!entry.coordinates && entry.coordinates[0] >= west && entry.coordinates[0] <= east && entry.coordinates[1] >= south && entry.coordinates[1] <= north
}
export function featurePlaceEntry(feature: CustomFeature, source: Omit<PlaceSource, 'entries'>, index: number, titleField?: string | null): PlaceEntry {
  const p = feature.properties || {}
  const seedId = propertyText(p, ['detectSeedId']) || undefined
  return {
    id: `${source.key}:${index}`, sourceKey: source.key, layerId: source.key.slice(source.key.indexOf(':') + 1), layerName: source.name, color: source.color,
    name: propertyText(p, [...(titleField ? [titleField] : []), 'naam', 'name', 'titel', 'title', 'label', 'toponiem', 'locatie']) || `${source.name} · ${index + 1}`,
    category: propertyText(p, ['categorie', 'category', 'type', 'soort']) || (feature.geometry?.type.includes('Polygon') ? 'Vlak' : feature.geometry?.type.includes('Line') ? 'Lijn' : 'Overig'),
    description: propertyText(p, ['omschrijving', 'description', 'notes', 'notities', 'descr', 'toelichting', 'bewijs', 'highlights']),
    coordinates: placeCoordinates(feature.geometry), createdAt: propertyText(p, ['createdAt', 'created_at', 'datum']), properties: p,
    geometryType: feature.geometry?.type || '', geometry: feature.geometry, editable: false, seedId,
  }
}
export function buildPersonalPlaceSources(points: CustomPointLayer[], imports: CustomLayer[]): PlaceSource[] {
  const pointSources = points.filter(l => !l.archived).map(layer => {
    const key = `point:${layer.id}` as const
    return {
      key, name: layer.name, color: layer.color, visible: layer.visible, kind: 'point' as const,
      snapshotKey: layer.buddyLayerId ? `buddy:${layer.buddyLayerId}` : key,
      entries: layer.points.map(point => ({
        id: `${key}:${point.id}`, sourceKey: key, layerId: layer.id, layerName: layer.name, color: layer.color,
        name: point.name || 'Naamloze plek', category: point.category || 'Overig', description: plainPlaceText(point.notes),
        coordinates: placeCoordinates({type: 'Point', coordinates: point.coordinates}), createdAt: point.createdAt,
        properties: {...point.sourceProperties, naam: point.name, categorie: point.category, notities: point.notes, status: point.status, telefoon: point.phone, link: point.url},
        geometryType: point.geometry?.type || 'Point', pointId: point.id, popupHtml: point.popupContent,
        editable: layer.buddyRole !== 'read' && layer.sharePermission !== 'read',
      })),
    }
  })
  const importSources = imports.map(layer => {
    const source: Omit<PlaceSource, 'entries'> = {
      key: `imported:${layer.id}`, name: layer.name, color: layer.style?.points?.color || layer.color,
      visible: layer.visible, kind: 'imported', snapshotKey: layer.contentHash ? `hash:${layer.contentHash}` : `id:${layer.id}`,
    }
    return {...source, entries: layer.features.features.map((feature, i) => featurePlaceEntry(feature, source, i, layer.popupConfig?.titleField))}
  })
  return [...pointSources, ...importSources]
}
export function getScopedSources(sources: PlaceSource[], scope: PlaceListScope, presets: Preset[]): PlaceSource[] {
  if (scope === 'all') return sources
  if (scope === 'visible') return sources.filter(s => s.visible)
  if (!scope.startsWith('preset:')) return sources.filter(s => s.key === scope)
  const preset = presets.find(p => `preset:${p.id}` === scope)
  if (!preset) return []
  return sources.filter(source => {
    if (source.kind === 'builtin') return preset.layerStates?.[source.name]?.visible ?? preset.layers.includes(source.name)
    const snapshot = preset.customLayerStates?.[source.snapshotKey]
    return snapshot ? snapshot.visible : preset.layers.includes(source.name)
  })
}
export function collectPlaces(sources: PlaceSource[]): PlaceEntry[] {
  const seenSeeds = new Set<string>()
  const builtinMetadata = new Map(sources.filter(s => s.kind === 'builtin').flatMap(s => s.entries).filter(e => e.seedId).map(e => [e.seedId, e.properties]))
  // Prefer the local imported record when the same seeded place also occurs in a built-in layer.
  return [...sources].sort((a,b) => Number(a.kind === 'builtin') - Number(b.kind === 'builtin')).flatMap(s => s.entries).filter(entry => {
    if (!entry.seedId) return true
    if (seenSeeds.has(entry.seedId)) return false
    seenSeeds.add(entry.seedId)
    return true
  }).map(entry => {
    const published = entry.seedId ? builtinMetadata.get(entry.seedId) : undefined
    if (!published) return entry
    // Older seeded imports keep user text and geometry; missing catalog metadata
    // is supplied only in the read model. No import or account storage is edited.
    return {...entry, properties:{...published, ...entry.properties}}
  })
}
export function distanceToPlace(coordinates: [number, number] | null, gps: {lat: number; lng: number} | null): number | null {
  if (!coordinates || !gps) return null
  const rad = Math.PI / 180, [lon, lat] = coordinates
  const h = Math.sin((lat - gps.lat) * rad / 2) ** 2 + Math.cos(lat * rad) * Math.cos(gps.lat * rad) * Math.sin((lon - gps.lng) * rad / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, h)))
}
export function placeResearchMetadata(entry: PlaceEntry) {
  const p = entry.properties
  const period = propertyText(p, ['periode', 'period', 'Periode / période', 'datering'])
  const classification = `${period} ${propertyText(p, ['periodegroep', 'periodGroup'])}`
  const periods: string[] = []
  if (/steentijd|prehistor|paleolith|paléolith|neolith|néolith|chalcolith|moustér|acheul|mesolith|mésolith/i.test(classification)) periods.push('Steentijd')
  if (/brons|bronze/i.test(classification)) periods.push('Bronstijd')
  if (/ijzertijd|kelt|gaul|âge du fer|iron age/i.test(classification)) periods.push('IJzertijd / Keltisch')
  if (/romein|romain|roman|antiquit/i.test(classification)) periods.push('Romeins')
  if (/middeleeuw|médiéval|moyen.âge|medieval/i.test(classification)) periods.push('Middeleeuwen')
  if (/nieuwe tijd|modern/i.test(classification)) periods.push('Nieuwe tijd')
  if (/^alle perioden$/i.test(period)) periods.push('Steentijd','Bronstijd','IJzertijd / Keltisch','Romeins','Middeleeuwen','Nieuwe tijd')
  const evidence = propertyText(p, ['bewijsstatus', 'evidenceStatus']) || (entry.seedId?.startsWith('archeologie:') ? (entry.seedId.endsWith('gindou-paleolithic-unlocated') ? 'Melding' : 'Gepubliceerd') : '')
  const quality = propertyText(p, ['locatienauwkeurigheid', 'locationQuality', 'Locatieprecisie'])
  const precision = !entry.coordinates ? 'Geen kaartlocatie' : ({exact:'Exact bronpunt', 'source-centroid':'Toponiem / complex', approximate:'Globale positie', schematic:'Schematisch gebied'}[quality] || quality)
  return {period, periods, evidence, precision, source: propertyText(p, ['bron', 'source', 'Bron / source'])}
}
export function placeSourceUrl(entry: PlaceEntry): string | null {
  const link = propertyText(entry.properties, ['link', 'bronlink', 'sourceUrl', 'url'])
  try { const url = new URL(link); return ['https:', 'http:'].includes(url.protocol) ? url.href : null } catch { return null }
}
export function filterPlaces(entries: PlaceEntry[], options: {query: string; layer: string; category: string; period?: string; evidence?: string; precision?: string; sort: 'name' | 'distance' | 'latest'; gps: {lat: number; lng: number} | null; extent?: number[] | null}): PlaceEntry[] {
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const words = normalize(options.query).split(/\s+/).filter(Boolean)
  return entries.filter(e => {
    if (options.layer && e.sourceKey !== options.layer) return false
    if (options.category && e.category !== options.category) return false
    if (options.period || options.evidence || options.precision) {
      const meta = placeResearchMetadata(e)
      if (options.period && !meta.periods.includes(options.period)) return false
      if (options.evidence && meta.evidence !== options.evidence) return false
      if (options.precision && meta.precision !== options.precision) return false
    }
    if (options.extent) {
      if (!placeIntersectsExtent(e, options.extent)) return false
    }
    const text = normalize(`${e.name} ${e.description} ${e.category} ${e.layerName} ${Object.values(e.properties).map(plainPlaceText).join(' ')}`)
    return words.every(word => text.includes(word))
  }).sort((a,b) => {
    if (options.sort === 'distance' && options.gps) {
      const delta = (distanceToPlace(a.coordinates, options.gps) ?? Infinity) - (distanceToPlace(b.coordinates, options.gps) ?? Infinity)
      if (delta) return delta
    }
    if (options.sort === 'latest') {
      const delta = (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0)
      if (delta) return delta
    }
    return a.name.localeCompare(b.name, 'nl', {numeric: true, sensitivity: 'base'}) || a.id.localeCompare(b.id)
  })
}
