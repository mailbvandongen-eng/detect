import { create } from 'zustand'
import { accountStorage, accountStorageNames, accountSession } from '../utils/accountStorage'
import type { BuddyWrite, BuddyMutation } from '../utils/buddyWrites'
import type { CustomPoint, CustomPointLayer } from './customPointLayerStore'

const prefix = 'detectorapp-buddy-writes:'
const operationKey = (id: string) => `${prefix}operation:${id}`
// Each tab has its own cursor. Separate operation keys avoid read/modify/write
// races between tabs; acknowledgement removes only the completed operation.
const deviceId = crypto.randomUUID()
let sequence = 0
interface QueueState {
  items: BuddyWrite[]
  deletedBuddyIds: string[]
  sending: string | null
  storageError: string | null
  lastSavedAt: number | null
}
const initial: QueueState = { items: [], deletedBuddyIds: [], sending: null, storageError: null, lastSavedAt: null }
const queue = create<QueueState>(() => ({...initial}))
let hydrated = false
function readJournal() {
  const items: BuddyWrite[] = []
  const deletedBuddyIds: string[] = []
  for (const key of accountStorageNames(prefix).sort()) {
    const raw = accountStorage.getItem(key)
    if (typeof raw !== 'string') continue
    const value = JSON.parse(raw)
    if (key.startsWith(`${prefix}deleted:`)) {
      if (typeof value !== 'string') throw new Error('Ongeldige verwijdering in wachtrij.')
      deletedBuddyIds.push(value)
    } else if (key.startsWith(`${prefix}operation:`)) {
      if (!value.id || !value.uid || !value.buddyLayerId || !value.mutation || !Number.isFinite(value.sequence)) throw new Error('Ongeldige bewerking in wachtrij.')
      items.push(value as BuddyWrite)
    }
  }
  // Operations from one tab remain ordered. Across tabs their independent
  // fields are merged by Firestore transactions; equal fields use last save.
  items.sort((a,b)=>a.deviceId.localeCompare(b.deviceId)||a.sequence-b.sequence)
  return {items,deletedBuddyIds}
}
function storageFailure() {
  queue.setState({storageError:'Lokale opslag is vol of niet beschikbaar. De bewerking is niet uitgevoerd.'})
}
function refresh() {queue.setState({...readJournal(),storageError:null})}
export const useBuddyWriteStore = Object.assign(queue, { persist: {
  hasHydrated: () => hydrated,
  rehydrate: async () => {
    hydrated = false
    queue.setState({...initial,...readJournal()})
    hydrated = true
  },
}})
export function enqueueBuddyWrite(uid: string, layer: CustomPointLayer, mutation: BuddyMutation, snapshot?: CustomPoint): boolean {
  if (!layer.buddyLayerId || !accountSession(uid)()) return false
  const {points: _points, ...descriptor}=layer
  const item: BuddyWrite={id:crypto.randomUUID(),uid,deviceId:`${deviceId}:${uid}`,sequence:++sequence,buddyLayerId:layer.buddyLayerId,layer:descriptor,mutation,snapshot,status:'pending'}
  if (mutation.kind === 'patch' || mutation.kind === 'photo') {
    const fields = mutation.fields
    if (fields) item.mutation = {...mutation, removedFields:Object.keys(fields).filter(key=>fields[key as keyof typeof fields] === undefined)}
  }
  try {
    // Verify existing storage before accepting another operation.
    readJournal()
    accountStorage.setItem(operationKey(item.id),JSON.stringify(item))
    refresh()
    return true
  } catch {storageFailure();return false}
}
export function acknowledgeBuddyWrite(id: string): boolean {
  try {
    const item=readJournal().items.find(write=>write.id===id)
    if(item?.mutation.kind==='deleteLayer')accountStorage.setItem(`${prefix}deleted:${id}`,JSON.stringify(item.buddyLayerId))
    accountStorage.removeItem(operationKey(id))
    refresh()
    queue.setState({lastSavedAt:Date.now()})
    return true
  } catch {storageFailure();return false}
}
export function failBuddyWrite(id: string, error: string, retryable: boolean) {
  const item=queue.getState().items.find(item=>item.id===id)
  if(!item)return
  const failed={...item,status:'failed' as const,error,retryable}
  try {accountStorage.setItem(operationKey(id),JSON.stringify(failed));refresh()}
  catch {
    storageFailure()
    queue.setState({items:queue.getState().items.map(item=>item.id===id?failed:item)})
  }
}
export function retryBuddyWrites(transientOnly=false) {
  const failed=queue.getState().items.filter(item=>item.status==='failed'&&(!transientOnly||item.retryable))
  if(!failed.length)return
  try {
    for(const item of failed)accountStorage.setItem(operationKey(item.id),JSON.stringify({...item,status:'pending',error:undefined}))
    refresh()
  } catch {storageFailure()}
}
export function forgetBuddyWrites(ids: string[]) {
  try {for(const id of ids)accountStorage.removeItem(operationKey(id));refresh();return true}
  catch {storageFailure();return false}
}
void useBuddyWriteStore.persist.rehydrate().catch(()=>{queue.setState({storageError:'De lokale wachtrij kon niet worden geopend.'})})
