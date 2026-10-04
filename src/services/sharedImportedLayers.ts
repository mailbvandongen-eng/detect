// Read-only recovery of legacy import shares. New sharing uses independent point layers.
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { type CustomLayer } from '../store/customLayerStore'
import { type CustomPointLayer } from '../store/customPointLayerStore'
import { readFeatureChunks } from './importedLayerCloud'

export type SharePermission = 'read' | 'edit'

export interface SharedImportedLayerRecord {
  shareId: string
  ownerUid: string
  ownerEmail: string
  recipientEmail: string
  permission: SharePermission
  layerHash: string
  layerName: string
  layerColor: string
  layerType: CustomLayer['type']
  layerOpacity: number
  layerStyle: CustomLayer['style']
  layerPopupConfig: CustomLayer['popupConfig']
  sourceFileName: string
  createdAt: string
  ready?: boolean
  overlayLayer: CustomPointLayer | null
}

export async function getOwnedShares(ownerUid: string): Promise<SharedImportedLayerRecord[]> {
  const q = query(collection(db, 'sharedImportedLayers'), where('ownerUid', '==', ownerUid))
  const snap = await getDocs(q)
  return snap.docs.map(item => item.data() as SharedImportedLayerRecord)
}

export async function getIncomingShares(email: string): Promise<SharedImportedLayerRecord[]> {
  const q = query(
    collection(db, 'sharedImportedLayers'),
    where('recipientEmail', '==', email.trim().toLowerCase())
  )
  const snap = await getDocs(q)
  return snap.docs.map(item => item.data() as SharedImportedLayerRecord)
}

export async function materializeSharedImportedLayer(record: SharedImportedLayerRecord): Promise<CustomLayer | null> {
  if (record.ready !== true) return null

  const features = await readFeatureChunks(`sharedImportedLayers/${record.shareId}`)
  return {
    id: `shared-${record.shareId}`,
    name: record.layerName,
    type: record.layerType || 'geojson',
    features,
    visible: true,
    opacity: typeof record.layerOpacity === 'number' ? record.layerOpacity : 1,
    color: record.layerColor || '#8b5cf6',
    style: record.layerStyle,
    popupConfig: record.layerPopupConfig,
    createdAt: record.createdAt || new Date(0).toISOString(),
    sourceFileName: record.sourceFileName || `Gedeeld door ${record.ownerEmail}`,
    contentHash: record.layerHash,
    shareId: record.shareId,
    shareOwnerUid: record.ownerUid,
    shareOwnerEmail: record.ownerEmail,
    sharePermission: record.permission,
    sharedRecipientEmail: record.recipientEmail,
  }
}

export function materializeSharedOverlay(
  record: SharedImportedLayerRecord,
  localImportedLayerId: string
): CustomPointLayer {
  const base: CustomPointLayer = record.overlayLayer || {
    id: `shared-overlay-${record.shareId}`,
    name: record.layerName,
    color: record.layerColor || '#3b82f6',
    categories: [],
    points: [],
    visible: true,
    archived: false,
    createdAt: new Date(0).toISOString(),
    linkedImportedLayerHash: record.layerHash,
  }

  return {
    ...base,
    id: `shared-overlay-${record.shareId}`,
    linkedImportedLayerId: localImportedLayerId,
    linkedImportedLayerHash: record.layerHash,
    shareId: record.shareId,
    shareOwnerUid: record.ownerUid,
    shareOwnerEmail: record.ownerEmail,
    sharePermission: record.permission,
  }
}
