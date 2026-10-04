import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  runTransaction,
} from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { db } from '../lib/firebase'
import { applyPhotoMutation, type BuddyWrite } from '../utils/buddyWrites'
import type { CustomPoint } from '../store/customPointLayerStore'

export type BuddyPermission = 'read' | 'edit'

export interface BuddyLayerRecord {
  id: string
  name: string
  color: string
  sourceLayerId?: string
  ready?: boolean
  deleted?: boolean
  ownerUid: string
  ownerEmail: string
  memberEmails: string[]
  editEmails: string[]
  readEmails: string[]
}

export function normalizeBuddyEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function createBuddyLayer(user: User, name: string, color = '#06b6d4'): Promise<string> {
  if (!user.email) throw new Error('Je Google-account heeft geen bruikbaar e-mailadres.')
  const ref = doc(collection(db, 'buddyLayers'))
  const email = normalizeBuddyEmail(user.email)
  await setDoc(ref, {
    id: ref.id,
    name: name.trim(),
    color,
    ownerUid: user.uid,
    ownerEmail: email,
    memberEmails: [email],
    editEmails: [],
    readEmails: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function addBuddyMember(
  user: User,
  buddyLayerId: string,
  emailInput: string,
  permission: BuddyPermission,
  isCurrent: () => boolean = () => true,
): Promise<void> {
  const email = normalizeBuddyEmail(emailInput)
  if (!email) throw new Error('Vul een Google-e-mailadres in.')
  if (email === normalizeBuddyEmail(user.email || '')) throw new Error('Je bent zelf al eigenaar van deze laag.')

  const ref = doc(db, 'buddyLayers', buddyLayerId)
  await runTransaction(db, async transaction => {
    if (!isCurrent()) throw new Error('Account is gewijzigd.')
    const snap = await transaction.get(ref)
    if (!snap.exists()) throw new Error('Buddy-laag bestaat niet meer.')
    const data = snap.data() as BuddyLayerRecord
    if (data.ownerUid !== user.uid) throw new Error('Alleen de eigenaar kan buddies beheren.')
    const members = new Set((data.memberEmails || []).map(normalizeBuddyEmail))
    const editors = new Set((data.editEmails || []).map(normalizeBuddyEmail))
    const readers = new Set((data.readEmails || []).map(normalizeBuddyEmail))
    members.add(email); editors.delete(email); readers.delete(email)
    if (permission === 'edit') editors.add(email)
    else readers.add(email)
    if (!isCurrent()) throw new Error('Account is gewijzigd.')
    transaction.update(ref, { memberEmails:[...members], editEmails:[...editors], readEmails:[...readers], updatedAt:serverTimestamp() })
  })
}

export async function removeBuddyMember(user: User, buddyLayerId: string, emailInput: string, isCurrent: () => boolean = () => true): Promise<void> {
  const email = normalizeBuddyEmail(emailInput)
  const ref = doc(db, 'buddyLayers', buddyLayerId)
  await runTransaction(db, async transaction => {
    if (!isCurrent()) throw new Error('Account is gewijzigd.')
    const snap = await transaction.get(ref)
    if (!snap.exists()) throw new Error('Buddy-laag bestaat niet meer.')
    const data = snap.data() as BuddyLayerRecord
    if (data.ownerUid !== user.uid) throw new Error('Alleen de eigenaar kan buddies beheren.')
    if (email === normalizeBuddyEmail(data.ownerEmail || '')) throw new Error('De eigenaar kan niet uit de laag worden verwijderd.')
    if (!isCurrent()) throw new Error('Account is gewijzigd.')
    transaction.update(ref, {
      memberEmails:(data.memberEmails || []).map(normalizeBuddyEmail).filter(item=>item!==email),
      editEmails:(data.editEmails || []).map(normalizeBuddyEmail).filter(item=>item!==email),
      readEmails:(data.readEmails || []).map(normalizeBuddyEmail).filter(item=>item!==email),
      updatedAt:serverTimestamp(),
    })
  })
}

export async function updateBuddyLayerMetadata(
  user: User,
  buddyLayerId: string,
  updates: { name?: string; color?: string }
): Promise<void> {
  const ref = doc(db, 'buddyLayers', buddyLayerId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const data = snap.data() as BuddyLayerRecord
  if (data.ownerUid !== user.uid) throw new Error('Alleen de eigenaar kan naam en kleur wijzigen.')

  const clean: Record<string, unknown> = { updatedAt: serverTimestamp() }
  if (typeof updates.name === 'string' && updates.name.trim()) clean.name = updates.name.trim()
  if (typeof updates.color === 'string' && updates.color) clean.color = updates.color
  await updateDoc(ref, clean)
}

export async function saveBuddyPoint(buddyLayerId: string, point: CustomPoint): Promise<void> {
  await setDoc(doc(db, 'buddyLayers', buddyLayerId, 'points', point.id), {
    ...JSON.parse(JSON.stringify(point)),
    updatedAt: serverTimestamp(),
  }, { merge: true })
}

export async function deleteBuddyPoint(buddyLayerId: string, pointId: string): Promise<void> {
  await deleteDoc(doc(db, 'buddyLayers', buddyLayerId, 'points', pointId))
}

export async function deleteBuddyLayer(user: User, buddyLayerId: string, isCurrent: () => boolean = () => true): Promise<void> {
  const ref = doc(db, 'buddyLayers', buddyLayerId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const data = snap.data() as BuddyLayerRecord
  if (data.ownerUid !== user.uid) throw new Error('Alleen de eigenaar kan deze buddy-laag verwijderen.')

  if (!isCurrent()) throw new Error('Account is gewijzigd.')
  const points = await getDocs(collection(db, 'buddyLayers', buddyLayerId, 'points'))
  for (let offset=0; offset<points.docs.length; offset+=100) {
    if (!isCurrent()) throw new Error('Account is gewijzigd.')
    await Promise.all(points.docs.slice(offset,offset+100).map(point => deleteDoc(point.ref)))
  }
  if (!isCurrent()) throw new Error('Account is gewijzigd.')
  await deleteDoc(ref)
}

// Stable ID lets a failed upload be retried without creating extra layers.
// Access is granted only after all existing points have been stored.
export async function shareOwnPointLayer(
  user: User,
  layer: import('../store/customPointLayerStore').CustomPointLayer,
  recipient: string,
  permission: BuddyPermission,
  isCurrent: () => boolean = () => true,
): Promise<BuddyLayerRecord> {
  const assertCurrent = () => { if (!isCurrent()) throw new Error('Account is gewijzigd.') }
  assertCurrent()
  if (!user.email) throw new Error('Log in met een account met een e-mailadres.')
  if (normalizeBuddyEmail(recipient) === normalizeBuddyEmail(user.email)) throw new Error('Je bent zelf al eigenaar van deze laag.')
  const id = `point-${user.uid}-${layer.id}`
  const ref = doc(db, 'buddyLayers', id)
  let data: (BuddyLayerRecord & { ready?: boolean }) | undefined
  try {
    const snap = await getDoc(ref)
    if (snap.exists()) data = snap.data() as BuddyLayerRecord & { ready?: boolean }
  } catch (error) {
    // Rules hide a missing document. The subsequent create is still authorized by rules.
    if ((error as { code?: string }).code !== 'permission-denied') throw error
  }
  assertCurrent()
  if (data?.deleted) throw new Error('Deze gedeelde laag is verwijderd. Maak een nieuwe eigen laag om opnieuw te delen.')
  if (data && data.ownerUid !== user.uid) throw new Error('Alleen de eigenaar kan deze laag delen.')
  if (!data) {
    const email = normalizeBuddyEmail(user.email)
    data = { id, name: layer.name, color: layer.color, ownerUid: user.uid,
      ownerEmail: email, memberEmails: [email], editEmails: [], readEmails: [], sourceLayerId: layer.id, ready: false }
    await setDoc(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  }
  if (data.ready === false) {
    // Sequential chunks keep large layers within Firestore's write limits.
    for (let offset = 0; offset < layer.points.length; offset += 100) {
      assertCurrent()
      await Promise.all(layer.points.slice(offset, offset + 100).map(point => saveBuddyPoint(id, point)))
    }
    assertCurrent()
    await updateDoc(ref, { ready: true, updatedAt: serverTimestamp() })
  }
  assertCurrent()
  await addBuddyMember(user, id, recipient, permission, isCurrent)
  const shared = await getDoc(ref)
  assertCurrent()
  return { ...shared.data() as BuddyLayerRecord, id }
}


export async function applyBuddyWrite(write: BuddyWrite, isCurrent: () => boolean): Promise<void> {
  const assertCurrent=()=>{if(!isCurrent())throw new Error('Account is gewijzigd.')}
  assertCurrent()
  if (write.mutation.kind === 'deleteLayer') {
    const reference = doc(db, 'buddyLayers', write.buddyLayerId)
    // Keep an owner-readable deletion receipt. Removing the parent first would
    // make a retry indistinguishable from revoked access; removing it last would
    // allow concurrent clients to insert new points during cleanup.
    await runTransaction(db, async transaction => {
      const snap = await transaction.get(reference)
      assertCurrent()
      if (!snap.exists()) return
      const layer = snap.data() as BuddyLayerRecord
      if (layer.ownerUid !== write.uid) throw Object.assign(new Error('Alleen de eigenaar kan deze laag verwijderen.'), {code:'permission-denied'})
      if (!layer.deleted) transaction.update(reference, {
        deleted:true,memberEmails:[layer.ownerEmail],editEmails:[],readEmails:[],updatedAt:serverTimestamp(),
      })
    })
    assertCurrent()
    const points = await getDocs(collection(db,'buddyLayers',write.buddyLayerId,'points'))
    for(let offset=0;offset<points.docs.length;offset+=100){
      assertCurrent()
      await Promise.all(points.docs.slice(offset,offset+100).map(point=>deleteDoc(point.ref)))
    }
    return
  }
  const layerRef=doc(db,'buddyLayers',write.buddyLayerId)
  const mutation=write.mutation
  const pointId=mutation.kind==='metadata'?null:mutation.kind==='create'?mutation.point.id:mutation.pointId
  const reference=pointId?doc(db,'buddyLayers',write.buddyLayerId,'points',pointId):layerRef
  await runTransaction(db,async transaction=>{
    const parent=await transaction.get(layerRef)
    assertCurrent()
    if(!parent.exists() || parent.data().deleted)throw Object.assign(new Error('De gedeelde laag is verwijderd. Je lokale wijzigingen blijven bewaard.'),{code:'layer-deleted'})
    const layer=parent.data() as BuddyLayerRecord
    if(mutation.kind==='metadata' && layer.ownerUid!==write.uid)throw Object.assign(new Error('Alleen de eigenaar kan deze laag wijzigen.'),{code:'permission-denied'})
    const snap=pointId?await transaction.get(reference):parent
    assertCurrent()
    const remote=snap.exists()?snap.data():{}
    const cursors=(remote.writeCursors || {}) as Record<string,number>
    if((cursors[write.deviceId] || 0)>=write.sequence)return
    const writeCursors={...cursors,[write.deviceId]:write.sequence}
    if(mutation.kind==='create') {
      // Existing UUIDs (including tombstones) are never re-created on retry.
      if(snap.exists())return
      transaction.set(reference,{...JSON.parse(JSON.stringify(mutation.point)),writeCursors,updatedAt:serverTimestamp()})
    } else if(mutation.kind==='delete') {
      transaction.set(reference,{id:pointId,deleted:true,writeCursors,updatedAt:serverTimestamp()})
    } else {
      if(!snap.exists() || remote.deleted)throw Object.assign(new Error('Dit punt is inmiddels verwijderd. Je lokale wijzigingen blijven bewaard.'),{code:'point-deleted'})
      const fields=mutation.kind==='metadata'?mutation.fields:mutation.kind==='patch'?mutation.fields:{photos:applyPhotoMutation(remote.photos,mutation)}
      const clean=JSON.parse(JSON.stringify(fields))
      if(mutation.kind==='patch')for(const key of mutation.removedFields || [])clean[key]=deleteField()
      transaction.update(reference,{...clean,writeCursors,updatedAt:serverTimestamp()})
    }
  })
}
