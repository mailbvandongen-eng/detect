import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { User } from 'firebase/auth'
import { useCustomLayerStore, type CustomLayer } from '../store/customLayerStore'
import { useCustomPointLayerStore, type CustomPointLayer } from '../store/customPointLayerStore'

export type SharePermission = 'read' | 'edit'

export interface SharedImportedLayerRecord {
  shareId: string
  ownerUid: string
  ownerEmail: string
  recipientEmail: string
  permission: SharePermission
  layerHash: string
  layerName: string
  overlayLayer: CustomPointLayer | null
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function shareIdFor(ownerUid: string, layerHash: string, recipientEmail: string): string {
  const safeEmail = normalizeEmail(recipientEmail).replace(/[^a-z0-9._@-]/g, '_')
  return `${ownerUid}__${layerHash.slice(0, 24)}__${safeEmail}`
}

function findLocalOverlay(layer: CustomLayer): CustomPointLayer | null {
  const pointLayers = useCustomPointLayerStore.getState().layers
  return pointLayers.find(pointLayer =>
    pointLayer.linkedImportedLayerId === layer.id ||
    (!!layer.contentHash && pointLayer.linkedImportedLayerHash === layer.contentHash)
  ) || null
}

function cleanOverlayForCloud(overlay: CustomPointLayer | null, layerHash: string): CustomPointLayer | null {
  if (!overlay) return null
  const {
    shareId: _shareId,
    shareOwnerUid: _shareOwnerUid,
    shareOwnerEmail: _shareOwnerEmail,
    sharePermission: _sharePermission,
    ...rest
  } = overlay

  return {
    ...rest,
    linkedImportedLayerId: undefined,
    linkedImportedLayerHash: layerHash,
  }
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
  if (!layer.contentHash) {
    throw new Error('Importeer deze laag opnieuw zodat Detect hem betrouwbaar kan koppelen.')
  }

  const shareId = shareIdFor(user.uid, layer.contentHash, normalized)
  const overlayLayer = cleanOverlayForCloud(findLocalOverlay(layer), layer.contentHash)

  await setDoc(doc(db, 'sharedImportedLayers', shareId), {
    shareId,
    ownerUid: user.uid,
    ownerEmail: normalizeEmail(user.email || ''),
    recipientEmail: normalized,
    permission,
    layerHash: layer.contentHash,
    layerName: layer.name,
    overlayLayer,
    updatedAt: serverTimestamp(),
  })

  return shareId
}

export async function revokeImportedLayerShare(shareId: string): Promise<void> {
  await deleteDoc(doc(db, 'sharedImportedLayers', shareId))
}

export async function getOutgoingShares(ownerUid: string, layerHash: string): Promise<SharedImportedLayerRecord[]> {
  const q = query(collection(db, 'sharedImportedLayers'), where('ownerUid', '==', ownerUid))
  const snap = await getDocs(q)
  return snap.docs
    .map(item => item.data() as SharedImportedLayerRecord)
    .filter(item => item.layerHash === layerHash)
}

export async function getOwnedShares(ownerUid: string): Promise<SharedImportedLayerRecord[]> {
  const q = query(collection(db, 'sharedImportedLayers'), where('ownerUid', '==', ownerUid))
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

export function materializeSharedOverlay(
  record: SharedImportedLayerRecord,
  localImportedLayerId: string
): CustomPointLayer | null {
  if (!record.overlayLayer) return null

  return {
    ...record.overlayLayer,
    id: `shared-overlay-${record.shareId}`,
    linkedImportedLayerId: localImportedLayerId,
    linkedImportedLayerHash: record.layerHash,
    shareId: record.shareId,
    shareOwnerUid: record.ownerUid,
    shareOwnerEmail: record.ownerEmail,
    sharePermission: record.permission,
  }
}

export async function syncRecipientOverlay(user: User, overlay: CustomPointLayer): Promise<void> {
  if (!overlay.shareId || overlay.sharePermission !== 'edit') return

  const ref = doc(db, 'sharedImportedLayers', overlay.shareId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return

  const record = snap.data() as SharedImportedLayerRecord
  if (normalizeEmail(record.recipientEmail) !== normalizeEmail(user.email || '')) return

  await setDoc(ref, {
    overlayLayer: cleanOverlayForCloud(overlay, record.layerHash),
    updatedAt: serverTimestamp(),
    lastEditorUid: user.uid,
  }, { merge: true })
}

export async function syncOwnedShares(user: User): Promise<void> {
  const shares = await getOwnedShares(user.uid)
  if (shares.length === 0) return

  const importedLayers = useCustomLayerStore.getState().layers
  const pointLayers = useCustomPointLayerStore.getState().layers

  for (const share of shares) {
    const importedLayer = importedLayers.find(layer => layer.contentHash === share.layerHash)
    if (!importedLayer) continue

    const overlay = pointLayers.find(pointLayer =>
      pointLayer.linkedImportedLayerHash === share.layerHash ||
      pointLayer.linkedImportedLayerId === importedLayer.id
    ) || null

    await setDoc(doc(db, 'sharedImportedLayers', share.shareId), {
      layerName: importedLayer.name,
      overlayLayer: cleanOverlayForCloud(overlay, share.layerHash),
      updatedAt: serverTimestamp(),
      lastEditorUid: user.uid,
    }, { merge: true })
  }
}
