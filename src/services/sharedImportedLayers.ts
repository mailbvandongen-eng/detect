import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { User } from 'firebase/auth'
import type { CustomLayer, CustomFeatureCollection } from '../store/customLayerStore'
import { useCustomPointLayerStore, type CustomPointLayer } from '../store/customPointLayerStore'
import { fingerprintFeatureCollection, readFeatureChunks, writeFeatureChunks } from './importedLayerCloud'

export type SharePermission = 'read' | 'edit'

export interface SharedImportedLayerRecord {
  shareId: string
  ownerUid: string
  ownerEmail: string
  recipientEmail: string
  permission: SharePermission
  layerId: string
  layerName: string
  type: CustomLayer['type']
  color: string
  style: CustomLayer['style']
  popupConfig: CustomLayer['popupConfig']
  opacity: number
  visible: boolean
  sourceFileName: string
  createdAt: string
  contentHash: string
  chunkCount: number
  overlayLayer?: CustomPointLayer | null
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function shareIdFor(ownerUid: string, layerId: string, recipientEmail: string): string {
  const safeEmail = normalizeEmail(recipientEmail).replace(/[^a-z0-9._@-]/g, '_')
  return `${ownerUid}__${layerId}__${safeEmail}`
}

async function uploadSharedPayload(shareId: string, features: CustomFeatureCollection): Promise<{ chunkCount: number; contentHash: string }> {
  const contentHash = await fingerprintFeatureCollection(features)
  const chunkCount = await writeFeatureChunks(`sharedImportedLayers/${shareId}`, features)
  return { chunkCount, contentHash }
}

export async function shareImportedLayer(
  user: User,
  layer: CustomLayer,
  recipientEmail: string,
  permission: SharePermission
): Promise<string> {
  const normalized = normalizeEmail(recipientEmail)
  if (!normalized || normalized === normalizeEmail(user.email || '')) {
    throw new Error('Kies een ander Google-e-mailadres.')
  }

  const shareId = shareIdFor(user.uid, layer.id, normalized)
  const { chunkCount, contentHash } = await uploadSharedPayload(shareId, layer.features)
  const overlayLayer = useCustomPointLayerStore.getState().layers.find(
    pointLayer => pointLayer.linkedImportedLayerId === layer.id && !pointLayer.shareId
  ) || null

  await setDoc(doc(db, 'sharedImportedLayers', shareId), {
    shareId,
    ownerUid: user.uid,
    ownerEmail: normalizeEmail(user.email || ''),
    recipientEmail: normalized,
    permission,
    layerId: layer.id,
    layerName: layer.name,
    type: layer.type,
    color: layer.color,
    style: layer.style,
    popupConfig: layer.popupConfig,
    opacity: layer.opacity,
    visible: layer.visible,
    sourceFileName: layer.sourceFileName,
    createdAt: layer.createdAt,
    contentHash,
    chunkCount,
    overlayLayer,
    updatedAt: serverTimestamp(),
  })
  return shareId
}

export async function revokeImportedLayerShare(shareId: string): Promise<void> {
  const chunks = await getDocs(collection(db, `sharedImportedLayers/${shareId}/chunks`))
  await Promise.all(chunks.docs.map(item => deleteDoc(item.ref)))
  await deleteDoc(doc(db, 'sharedImportedLayers', shareId))
}

export async function getOutgoingShares(ownerUid: string, layerId: string): Promise<SharedImportedLayerRecord[]> {
  const q = query(
    collection(db, 'sharedImportedLayers'),
    where('ownerUid', '==', ownerUid)
  )
  const snap = await getDocs(q)
  return snap.docs
    .map(item => item.data() as SharedImportedLayerRecord)
    .filter(item => item.layerId === layerId)
}

export async function getOwnedShares(ownerUid: string): Promise<SharedImportedLayerRecord[]> {
  const q = query(
    collection(db, 'sharedImportedLayers'),
    where('ownerUid', '==', ownerUid)
  )
  const snap = await getDocs(q)
  return snap.docs.map(item => item.data() as SharedImportedLayerRecord)
}

export async function getIncomingShares(email: string): Promise<SharedImportedLayerRecord[]> {
  const q = query(
    collection(db, 'sharedImportedLayers'),
    where('recipientEmail', '==', normalizeEmail(email))
  )
  const snap = await getDocs(q)
  return snap.docs.map(item => item.data() as SharedImportedLayerRecord)
}

export function getSharedOverlayLayer(record: SharedImportedLayerRecord): CustomPointLayer | null {
  if (!record.overlayLayer) return null
  return {
    ...record.overlayLayer,
    linkedImportedLayerId: record.layerId,
    shareId: record.shareId,
    shareOwnerUid: record.ownerUid,
    shareOwnerEmail: record.ownerEmail,
    sharePermission: record.permission,
  }
}

export async function downloadSharedLayer(record: SharedImportedLayerRecord): Promise<CustomLayer> {
  const features = await readFeatureChunks(`sharedImportedLayers/${record.shareId}`)
  return {
    id: record.layerId,
    name: record.layerName,
    type: record.type,
    features,
    visible: record.visible,
    opacity: record.opacity,
    color: record.color,
    style: record.style,
    popupConfig: record.popupConfig,
    createdAt: record.createdAt,
    sourceFileName: record.sourceFileName,
    contentHash: record.contentHash,
    shareId: record.shareId,
    shareOwnerUid: record.ownerUid,
    shareOwnerEmail: record.ownerEmail,
    sharePermission: record.permission,
  }
}

export async function syncEditedSharedLayer(user: User, layer: CustomLayer): Promise<void> {
  if (!layer.shareId || layer.sharePermission !== 'edit') return
  const ref = doc(db, 'sharedImportedLayers', layer.shareId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const current = snap.data() as SharedImportedLayerRecord
  const overlayLayer = useCustomPointLayerStore.getState().layers.find(
    pointLayer => pointLayer.linkedImportedLayerId === layer.id && pointLayer.shareId === layer.shareId
  ) || null
  const hash = await fingerprintFeatureCollection(layer.features)
  if (hash === current.contentHash &&
      JSON.stringify(layer.style) === JSON.stringify(current.style) &&
      JSON.stringify(layer.popupConfig) === JSON.stringify(current.popupConfig) &&
      JSON.stringify(overlayLayer) === JSON.stringify(current.overlayLayer || null) &&
      layer.name === current.layerName) return

  const { chunkCount, contentHash } = await uploadSharedPayload(layer.shareId, layer.features)
  await setDoc(ref, {
    ...current,
    layerName: layer.name,
    color: layer.color,
    style: layer.style,
    popupConfig: layer.popupConfig,
    opacity: layer.opacity,
    visible: layer.visible,
    sourceFileName: layer.sourceFileName,
    contentHash,
    chunkCount,
    overlayLayer,
    updatedAt: serverTimestamp(),
    lastEditorUid: user.uid,
  })
}
