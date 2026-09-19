import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { CustomFeature, CustomFeatureCollection, CustomLayer } from '../store/customLayerStore'

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
  featureCount: number
  chunkCount: number
  updatedAt: string
}

const TARGET_CHUNK_BYTES = 450_000

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

function chunkFeatures(features: CustomFeature[]): CustomFeature[][] {
  const chunks: CustomFeature[][] = []
  let current: CustomFeature[] = []
  let currentBytes = 0

  for (const feature of features) {
    const bytes = new TextEncoder().encode(JSON.stringify(feature)).length
    if (current.length > 0 && currentBytes + bytes > TARGET_CHUNK_BYTES) {
      chunks.push(current)
      current = []
      currentBytes = 0
    }
    current.push(feature)
    currentBytes += bytes
  }

  if (current.length > 0 || chunks.length === 0) chunks.push(current)
  return chunks
}

async function replaceChunks(basePath: string, chunks: CustomFeature[][]): Promise<void> {
  const chunksRef = collection(db, `${basePath}/chunks`)
  const existing = await getDocs(chunksRef)
  await Promise.all(existing.docs.map(item => deleteDoc(item.ref)))

  await Promise.all(chunks.map((features, index) =>
    setDoc(doc(db, `${basePath}/chunks/${String(index).padStart(5, '0')}`), {
      index,
      features
    })
  ))
}

export async function readFeatureChunks(basePath: string): Promise<CustomFeatureCollection> {
  const snap = await getDocs(collection(db, `${basePath}/chunks`))
  const chunks = snap.docs
    .map(item => item.data() as { index?: number; features?: CustomFeature[] })
    .sort((a, b) => (a.index || 0) - (b.index || 0))

  return {
    type: 'FeatureCollection',
    features: chunks.flatMap(chunk => Array.isArray(chunk.features) ? chunk.features : [])
  }
}

export async function writeFeatureChunks(basePath: string, features: CustomFeatureCollection): Promise<number> {
  const chunks = chunkFeatures(features.features)
  await replaceChunks(basePath, chunks)
  return chunks.length
}

export async function uploadImportedLayerPayload(
  userId: string,
  layer: CustomLayer
): Promise<CloudImportedLayerMetadata> {
  const contentHash = layer.contentHash || await fingerprintFeatureCollection(layer.features)
  const basePath = `users/${userId}/importedLayers/${layer.id}`
  const chunkCount = await writeFeatureChunks(basePath, layer.features)

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
    featureCount: layer.features.features.length,
    chunkCount,
    updatedAt: new Date().toISOString(),
  }
}

export async function downloadImportedLayerPayload(
  userId: string,
  metadata: CloudImportedLayerMetadata
): Promise<CustomLayer> {
  const features = await readFeatureChunks(`users/${userId}/importedLayers/${metadata.id}`)

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
  const basePath = `users/${userId}/importedLayers/${layerId}`
  const snap = await getDocs(collection(db, `${basePath}/chunks`))
  await Promise.all(snap.docs.map(item => deleteDoc(item.ref)))
}
