import type { BuddyLayerRecord } from '../services/buddyLayers'
import type { CustomPointLayer } from '../store/customPointLayerStore'

export function upsertBuddyLayer(layers: CustomPointLayer[], record: BuddyLayerRecord, uid: string, email: string): CustomPointLayer[] {
  const existing = layers.find(layer => layer.buddyLayerId === record.id || (record.ownerUid === uid && layer.id === record.sourceLayerId))
  const next: CustomPointLayer = {
    id: existing?.id || (record.ownerUid === uid ? record.sourceLayerId : undefined) || `buddy-${record.id}`,
    name: record.name || 'Buddy-laag',
    color: record.color || '#06b6d4',
    categories: existing?.categories || [],
    points: existing?.points || [],
    visible: existing?.visible ?? true,
    archived: false,
    createdAt: existing?.createdAt || new Date().toISOString(),
    buddyLayerId: record.id,
    buddyOwnerUid: record.ownerUid,
    buddyOwnerEmail: record.ownerEmail,
    buddyRole: record.ownerUid === uid ? 'owner' : (record.editEmails || []).includes(email.trim().toLowerCase()) ? 'edit' : 'read',
    buddyMemberEmails: record.memberEmails || [],
    buddyEditEmails: record.editEmails || [],
    buddyReadEmails: record.readEmails || [],
  }
  return [...layers.filter(layer => layer.buddyLayerId !== record.id && layer.id !== next.id), next]
}

export function preserveBuddyLayers(current: CustomPointLayer[], privateLayers: CustomPointLayer[]): CustomPointLayer[] {
  return [...privateLayers.filter(layer => !layer.buddyLayerId && !current.some(item => item.buddyLayerId && item.id === layer.id)), ...current.filter(layer => !!layer.buddyLayerId)]
}
