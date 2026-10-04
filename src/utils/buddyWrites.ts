import type { CustomPoint, CustomPointLayer, PhotoData } from '../store/customPointLayerStore'

export type BuddyMutation =
  | { kind: 'create'; point: CustomPoint }
  | { kind: 'patch'; pointId: string; fields: Partial<Omit<CustomPoint, 'id' | 'createdAt'>>; removedFields?: string[] }
  | { kind: 'delete'; pointId: string }
  | { kind: 'photo'; pointId: string; action: 'add' | 'update' | 'remove'; photoId: string; photo?: PhotoData; fields?: Partial<PhotoData>; removedFields?: string[] }
  | { kind: 'metadata'; fields: { name?: string; color?: string } }
  | { kind: 'deleteLayer' }

export interface BuddyWrite {
  id: string
  uid: string
  deviceId: string
  sequence: number
  buddyLayerId: string
  layer: Omit<CustomPointLayer, 'points'>
  mutation: BuddyMutation
  snapshot?: CustomPoint
  status: 'pending' | 'failed'
  error?: string
  retryable?: boolean
}

export function applyPhotoMutation(photos: PhotoData[] = [], mutation: Extract<BuddyMutation, {kind: 'photo'}>): PhotoData[] {
  if (mutation.action === 'remove') return photos.filter(photo => photo.id !== mutation.photoId)
  if (mutation.action === 'add' && mutation.photo) return photos.some(photo => photo.id === mutation.photoId) ? photos : [...photos, mutation.photo]
  return photos.map(photo => {
    if(photo.id !== mutation.photoId)return photo
    const updated={...photo,...mutation.fields,id:photo.id}
    for(const key of mutation.removedFields || [])delete updated[key as keyof PhotoData]
    return updated
  })
}

export function overlayBuddyPoints(points: CustomPoint[], writes: BuddyWrite[]): CustomPoint[] {
  let result = [...points]
  for (const write of writes) {
    const m = write.mutation
    if (m.kind === 'metadata' || m.kind === 'deleteLayer') continue
    const id = m.kind === 'create' ? m.point.id : m.pointId
    if (m.kind === 'delete') { result = result.filter(point => point.id !== id); continue }
    const index = result.findIndex(point => point.id === id)
    const base = index < 0 ? write.snapshot : result[index]
    const point = m.kind === 'create' ? (base || m.point) : base && (m.kind === 'patch' ? {...base, ...m.fields} : {...base, photos: applyPhotoMutation(base.photos, m)})
    if (!point) continue
    if(m.kind==='patch')for(const key of m.removedFields || [])delete point[key as keyof CustomPoint]
    if (index < 0) result.push(point)
    else result[index] = point
  }
  return result
}

export function overlayBuddyMetadata(layer: CustomPointLayer, writes: BuddyWrite[]): CustomPointLayer {
  return writes.reduce((current, write) => write.mutation.kind === 'metadata' ? {...current, ...write.mutation.fields} : current, layer)
}

export function writeTarget(write: BuddyWrite): string {
  const m = write.mutation
  return `${write.buddyLayerId}:${m.kind === 'metadata' || m.kind === 'deleteLayer' ? 'layer' : m.kind === 'create' ? m.point.id : m.pointId}`
}
