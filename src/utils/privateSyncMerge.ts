export interface SyncItem { id: string; [field: string]: unknown }
export interface ItemRevision {
  fields: Record<string, number>
  deleted?: number
  points?: CollectionRevision
}
export type CollectionRevision = Record<string, ItemRevision>
export interface PrivateRevision {
  layers: CollectionRevision
  vondsten: CollectionRevision
  routes: CollectionRevision
}
export const emptyPrivateRevision = (): PrivateRevision => ({ layers: {}, vondsten: {}, routes: {} })
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)
const copy = <T>(v: T): T => JSON.parse(JSON.stringify(v))

// Called for real local mutations, including field removal and nested point deletion.
export function trackChanges(before: SyncItem[], after: SyncItem[], previous: CollectionRevision, clock: number, nested = false): CollectionRevision {
  const revisions = copy(previous)
  const old = new Map(before.map(item => [item.id, item]))
  const next = new Map(after.map(item => [item.id, item]))
  for (const id of new Set([...old.keys(), ...next.keys()])) {
    const a = old.get(id), b = next.get(id)
    if (same(a, b)) continue
    const revision = revisions[id] ||= { fields: {} }
    if (!b) { revision.deleted = clock; continue }
    if (!a) delete revision.deleted
    for (const field of new Set([...Object.keys(a || {}), ...Object.keys(b)])) {
      if (field === 'id') continue
      if (nested && field === 'points') {
        revision.points = trackChanges((a?.points || []) as SyncItem[], (b.points || []) as SyncItem[], revision.points || {}, clock)
      } else if (!same(a?.[field], b[field])) revision.fields[field] = clock
    }
  }
  return revisions
}

// Merge per field, with nested point IDs and permanent deletion records.
// Legacy equal-clock values prefer local data so old offline edits survive migration.
export function mergeCollection<T extends { id: string }>(cloud: T[], local: T[], cloudRevision: CollectionRevision = {}, localRevision: CollectionRevision = {}, nested = false): { items: T[]; revision: CollectionRevision } {
  const remote = new Map(cloud.map(item => [item.id, item as unknown as SyncItem]))
  const own = new Map(local.map(item => [item.id, item as unknown as SyncItem]))
  const revision: CollectionRevision = {}
  const items: T[] = []
  for (const id of new Set([...remote.keys(), ...own.keys(), ...Object.keys(cloudRevision), ...Object.keys(localRevision)])) {
    const c = remote.get(id), l = own.get(id)
    const cr = cloudRevision[id] || { fields: {} }, lr = localRevision[id] || { fields: {} }
    const fields: Record<string, number> = {}
    const item: SyncItem = { id }
    const r: ItemRevision = { fields }
    for (const field of new Set([...Object.keys(c || {}), ...Object.keys(l || {}), ...Object.keys(cr.fields), ...Object.keys(lr.fields)])) {
      if (field === 'id' || (nested && field === 'points')) continue
      const ct = cr.fields[field] || 0, lt = lr.fields[field] || 0
      fields[field] = Math.max(ct, lt)
      const source = lt > ct ? l : ct > lt ? c : l || c
      if (source && source[field] !== undefined) item[field] = source[field]
    }
    if (nested) {
      const points = mergeCollection((c?.points || []) as SyncItem[], (l?.points || []) as SyncItem[], cr.points, lr.points)
      item.points = points.items
      r.points = points.revision
    }
    const deleted = Math.max(cr.deleted || 0, lr.deleted || 0)
    if (deleted) r.deleted = deleted
    revision[id] = r
    // A deletion remains final for this UUID, including edits from stale devices.
    if (!deleted && (c || l)) items.push(item as unknown as T)
  }
  return { items, revision }
}

export function latestRevision(revision: PrivateRevision): number {
  const walk = (collection: CollectionRevision): number => Math.max(0, ...Object.values(collection).map(r =>
    Math.max(r.deleted || 0, ...Object.values(r.fields), r.points ? walk(r.points) : 0)))
  return Math.max(walk(revision.layers), walk(revision.vondsten), walk(revision.routes))
}
