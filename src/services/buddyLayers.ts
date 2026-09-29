import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { db } from '../lib/firebase'
import type { CustomPoint } from '../store/customPointLayerStore'

export type BuddyPermission = 'read' | 'edit'

export interface BuddyLayerRecord {
  id: string
  name: string
  color: string
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
  permission: BuddyPermission
): Promise<void> {
  const email = normalizeBuddyEmail(emailInput)
  if (!email) throw new Error('Vul een Google-e-mailadres in.')
  if (email === normalizeBuddyEmail(user.email || '')) throw new Error('Je bent zelf al eigenaar van deze laag.')

  const ref = doc(db, 'buddyLayers', buddyLayerId)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Buddy-laag bestaat niet meer.')
  const data = snap.data() as BuddyLayerRecord
  if (data.ownerUid !== user.uid) throw new Error('Alleen de eigenaar kan buddies beheren.')

  const members = new Set((data.memberEmails || []).map(normalizeBuddyEmail))
  const editors = new Set((data.editEmails || []).map(normalizeBuddyEmail))
  const readers = new Set((data.readEmails || []).map(normalizeBuddyEmail))
  members.add(email)
  editors.delete(email)
  readers.delete(email)
  if (permission === 'edit') editors.add(email)
  else readers.add(email)

  await updateDoc(ref, {
    memberEmails: [...members],
    editEmails: [...editors],
    readEmails: [...readers],
    updatedAt: serverTimestamp(),
  })
}

export async function removeBuddyMember(user: User, buddyLayerId: string, emailInput: string): Promise<void> {
  const email = normalizeBuddyEmail(emailInput)
  const ref = doc(db, 'buddyLayers', buddyLayerId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const data = snap.data() as BuddyLayerRecord
  if (data.ownerUid !== user.uid) throw new Error('Alleen de eigenaar kan buddies beheren.')
  if (email === normalizeBuddyEmail(data.ownerEmail || '')) throw new Error('De eigenaar kan niet uit de laag worden verwijderd.')

  await updateDoc(ref, {
    memberEmails: (data.memberEmails || []).map(normalizeBuddyEmail).filter(item => item !== email),
    editEmails: (data.editEmails || []).map(normalizeBuddyEmail).filter(item => item !== email),
    readEmails: (data.readEmails || []).map(normalizeBuddyEmail).filter(item => item !== email),
    updatedAt: serverTimestamp(),
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
    ...point,
    updatedAt: serverTimestamp(),
  }, { merge: true })
}

export async function deleteBuddyPoint(buddyLayerId: string, pointId: string): Promise<void> {
  await deleteDoc(doc(db, 'buddyLayers', buddyLayerId, 'points', pointId))
}

export async function deleteBuddyLayer(user: User, buddyLayerId: string): Promise<void> {
  const ref = doc(db, 'buddyLayers', buddyLayerId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const data = snap.data() as BuddyLayerRecord
  if (data.ownerUid !== user.uid) throw new Error('Alleen de eigenaar kan deze buddy-laag verwijderen.')

  const points = await getDocs(collection(db, 'buddyLayers', buddyLayerId, 'points'))
  await Promise.all(points.docs.map(point => deleteDoc(point.ref)))
  await deleteDoc(ref)
}
