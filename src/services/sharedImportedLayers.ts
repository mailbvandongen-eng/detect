import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { db, storage } from '../lib/firebase'
import type { User } from 'firebase/auth'
import type { CustomLayer, CustomFeatureCollection } from '../store/customLayerStore'
import { fingerprintFeatureCollection } from './importedLayerCloud'

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
  downloadUrl: string
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function shareIdFor(ownerUid: string, layerId: string, recipientEmail: string): string {
  const safeEmail = normalizeEmail(recipientEmail).replace(/[^a-z0-9._@-]/g, '_')
  return `${ownerUid}__${layerId}__${safeEmail}`
}

async function uploadSharedPayload(user: User, shareId: string, features: CustomFeatureCollection): Promise<{ downloadUrl: string; contentHash: string }> {
  const contentHash = await fingerprintFeatureCollection(features)
  const path = `users/${user.uid}/shared-imports/${shareId}.geojson`
  const blob = new Blob([JSON.stringify(features)], { type: 'application/geo+json' })
  const ref = storageRef(storage, path)
  await uploadBytes(ref, blob, { contentType: 'application/geo+json' })
  return { downloadUrl: await getDownloadURL(ref), contentHash }
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
  const { downloadUrl, contentHash } = await uploadSharedPayload(user, shareId, layer.features)
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
    downloadUrl,
    updatedAt: serverTimestamp(),
  })
  return shareId
}

export async function revokeImportedLayerShare(shareId: string): Promise<void> {
  await deleteDoc(doc(db, 'sharedImportedLayers', shareId))
}

export async function getOutgoingShares(ownerUid: string, layerId: string): Promise<SharedImportedLayerRecord[]> {
  const q = query(
    collection(db, 'sharedImportedLayers'),
    where('ownerUid', '==', ownerUid),
    where('layerId', '==', layerId)
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

export async function downloadSharedLayer(record: SharedImportedLayerRecord): Promise<CustomLayer> {
  const response = await fetch(record.downloadUrl)
  if (!response.ok) throw new Error(`Gedeelde laag “${record.layerName}” kon niet worden geladen.`)
  const features = await response.json() as CustomFeatureCollection
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
  const hash = await fingerprintFeatureCollection(layer.features)
  if (hash === current.contentHash &&
      JSON.stringify(layer.style) === JSON.stringify(current.style) &&
      JSON.stringify(layer.popupConfig) === JSON.stringify(current.popupConfig) &&
      layer.name === current.layerName) return

  const { downloadUrl, contentHash } = await uploadSharedPayload(user, layer.shareId, layer.features)
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
    downloadUrl,
    updatedAt: serverTimestamp(),
    lastEditorUid: user.uid,
  })
}
