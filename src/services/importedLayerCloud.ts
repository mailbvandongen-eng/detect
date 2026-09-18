import { getBytes, ref as storageRef, uploadBytes, deleteObject } from 'firebase/storage'
import { storage } from '../lib/firebase'
import type { CustomFeatureCollection, CustomLayer } from '../store/customLayerStore'

export interface CloudImportedLayerMetadata {
  id: string
  name: string
  type: CustomLayer['type']
  visible: boolean
  opacity: number
  color: string
  style: CustomLayer['style']
  popupConfig: CustomLayer['popupConfig']
  createdAt: string
  sourceFileName: string
  contentHash: string
  storagePath: string
  featureCount: number
  updatedAt: string
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']'
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    return '{' + Object.keys(record).sort().map(key => JSON.stringify(key) + ':' + stableStringify(record[key])).join(',') + '}'
  }
  return JSON.stringify(value)
}

export async function fingerprintFeatureCollection(features: CustomFeatureCollection): Promise<string> {
  const bytes = new TextEncoder().encode(stableStringify(features))
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export async function uploadImportedLayerPayload(
  userId: string,
  layer: CustomLayer
): Promise<CloudImportedLayerMetadata> {
  const contentHash = layer.contentHash || await fingerprintFeatureCollection(layer.features)
  const storagePath = `users/${userId}/imports/${layer.id}.geojson`
  const payload = new Blob([JSON.stringify(layer.features)], { type: 'application/geo+json' })

  await uploadBytes(storageRef(storage, storagePath), payload, {
    contentType: 'application/geo+json',
    customMetadata: {
      layerId: layer.id,
      contentHash,
      sourceFileName: layer.sourceFileName || '',
    }
  })

  return {
    id: layer.id,
    name: layer.name,
    type: layer.type,
    visible: layer.visible,
    opacity: layer.opacity,
    color: layer.color,
    style: layer.style,
    popupConfig: layer.popupConfig,
    createdAt: layer.createdAt,
    sourceFileName: layer.sourceFileName,
    contentHash,
    storagePath,
    featureCount: layer.features.features.length,
    updatedAt: new Date().toISOString(),
  }
}

export async function downloadImportedLayerPayload(
  metadata: CloudImportedLayerMetadata
): Promise<CustomLayer> {
  const bytes = await getBytes(storageRef(storage, metadata.storagePath))
  const text = new TextDecoder().decode(bytes)
  const features = JSON.parse(text) as CustomFeatureCollection

  return {
    id: metadata.id,
    name: metadata.name,
    type: metadata.type,
    features,
    visible: metadata.visible,
    opacity: metadata.opacity,
    color: metadata.color,
    style: metadata.style,
    popupConfig: metadata.popupConfig,
    createdAt: metadata.createdAt,
    sourceFileName: metadata.sourceFileName,
    contentHash: metadata.contentHash,
  }
}

export async function deleteImportedLayerPayload(userId: string, layerId: string): Promise<void> {
  try {
    await deleteObject(storageRef(storage, `users/${userId}/imports/${layerId}.geojson`))
  } catch (error: any) {
    if (error?.code !== 'storage/object-not-found') throw error
  }
}
