import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {resolve,dirname} from 'node:path'
import {createRequire} from 'node:module'
const require=createRequire(import.meta.url),ts=require('typescript')
const entries=new Map()
let full=false
const backing={get length(){return entries.size},key:index=>[...entries.keys()][index]??null,getItem:key=>entries.get(key)??null,setItem:(key,value)=>{if(full)throw new Error('QuotaExceededError');entries.set(key,value)},removeItem:key=>entries.delete(key)}
globalThis.localStorage=backing
Object.defineProperty(globalThis,'navigator',{value:{onLine:false},configurable:true})
const auth={currentUser:{uid:'owner',email:'owner@example.com'}}
let handler=async()=>{},calls=[]
const service={applyBuddyWrite:async(write,current)=>{calls.push(write);await handler(write,current)}}
const mocks={
 '../lib/firebase':{auth,db:{}},'./buddyLayers':service,
 'ol/proj':{fromLonLat:x=>x,toLonLat:x=>x},
 './layerStore':{useLayerStore:{getState:()=>({layers:[]})}},
 './mapStore':{useMapStore:{getState:()=>({map:null})}},
}
const cache=new Map()
function load(path){
 path=resolve(path);if(cache.has(path))return cache.get(path).exports
 const m={exports:{}};cache.set(path,m)
 const code=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
 Function('require','module','exports',code)(name=>name in mocks?mocks[name]:name.startsWith('.')?load(resolve(dirname(path),name+'.ts')):require(name),m,m.exports)
 return m.exports
}
const accounts=load('src/utils/accountStorage.ts')
function switchScope(uid){accounts.beginAccountSwitch(uid);accounts.finishAccountSwitch()}
switchScope('owner')
const writes=load('src/store/buddyWriteStore.ts'),queue=writes.useBuddyWriteStore
const points=load('src/store/customPointLayerStore.ts').useCustomPointLayerStore
const overlay=load('src/utils/buddyWrites.ts')
const runner=load('src/services/buddyWriteQueue.ts')
await queue.persist.rehydrate()
let count=0;const pass=label=>{count++;console.log('PASS '+label)}
const point={id:'p',name:'Punt',coordinates:[1,2],category:'Overig',notes:'Oud',status:'todo',createdAt:'2026-10-04'}
const layer={id:'local',name:'Reis',color:'#7c5ac7',categories:[],visible:true,archived:false,createdAt:point.createdAt,buddyLayerId:'shared',buddyRole:'owner',points:[point]}
points.setState({layers:[layer]})
assert.equal(points.getState().updatePoint(layer.id,point.id,{notes:'Offline notities'}),true)
assert.deepEqual(queue.getState().items[0].mutation.fields,{notes:'Offline notities'})
assert.equal(points.getState().layers[0].points[0].notes,'Offline notities')
assert.equal(JSON.parse([...entries.values()].find(v=>v.includes('Offline notities')&&v.includes('deviceId'))).mutation.fields.notes,'Offline notities')
pass('Actual point store persists only changed fields before acknowledging an offline edit')
full=true
assert.equal(points.getState().updatePoint(layer.id,point.id,{name:'Niet veilig'}),false)
assert.equal(points.getState().layers[0].points[0].name,'Punt')
assert.equal(queue.getState().items.length,1)
assert.match(queue.getState().storageError,/niet uitgevoerd/)
full=false
pass('Full storage rejects the edit without altering the point or durable queue')
queue.setState(queue.getInitialState(),true)
await queue.persist.rehydrate()
assert.equal(queue.getState().items[0].mutation.fields.notes,'Offline notities')
assert.equal(overlay.overlayBuddyPoints([{...point,name:'Buddy naam',status:'done'}],queue.getState().items)[0].name,'Buddy naam')
assert.equal(overlay.overlayBuddyPoints([{...point,name:'Buddy naam',status:'done'}],queue.getState().items)[0].status,'done')
pass('Cold reload restores pending edits; cloud overlays preserve unrelated buddy changes')
const ownerSession=accounts.accountSession('owner')
switchScope('other');queue.setState(queue.getInitialState(),true);await queue.persist.rehydrate()
assert.equal(queue.getState().items.length,0)
assert.equal(writes.enqueueBuddyWrite('owner',layer,{kind:'delete',pointId:'p'}),false)
switchScope('owner');await queue.persist.rehydrate()
assert.equal(queue.getState().items.length,1)
assert.equal(ownerSession(),false)
pass('Account switch isolates the queue, rejects wrong-account enqueue and invalidates old sessions')
const user=auth.currentUser,current=accounts.accountSession(user.uid)
await runner.flushBuddyWrites(user,current);assert.equal(calls.length,0)
navigator.onLine=true
handler=async()=>{throw Object.assign(new Error('No rights'),{code:'permission-denied'})}
await runner.flushBuddyWrites(user,current)
assert.equal(queue.getState().items[0].status,'failed')
assert.equal(queue.getState().items[0].snapshot.notes,'Offline notities')
assert.equal(queue.getState().items[0].retryable,false)
writes.retryBuddyWrites(true);assert.equal(queue.getState().items[0].status,'failed')
pass('Offline never sends; revoked access retains the draft and does not retry endlessly')
writes.retryBuddyWrites();handler=async()=>{}
await runner.flushBuddyWrites(user,current)
assert.equal(queue.getState().items.length,0)
assert.ok(queue.getState().lastSavedAt)
pass('Explicit retry drains the queue only after successful server acknowledgement')
points.getState().updatePoint(layer.id,'p',{notes:'Late account edit'})
let release,started
const entered=new Promise(resolve=>started=resolve)
handler=async()=>{started();await new Promise(resolve=>release=resolve)}
const oldFlight=runner.flushBuddyWrites(user,current);await entered
switchScope('other');queue.setState(queue.getInitialState(),true);await queue.persist.rehydrate()
release();await oldFlight
assert.equal(queue.getState().items.length,0)
switchScope('owner');await queue.persist.rehydrate()
assert.equal(queue.getState().items[0].mutation.fields.notes,'Late account edit')
pass('Late completion cannot acknowledge or contaminate the next account; original draft survives')
writes.forgetBuddyWrites(queue.getState().items.map(item=>item.id))
points.getState().updatePoint(layer.id,'p',{phone:'123'})
points.getState().updatePoint(layer.id,'p',{phone:undefined})
assert.deepEqual(queue.getState().items.at(-1).mutation.removedFields,['phone'])
points.getState().addPhotoToPoint(layer.id,'p',{id:'photo-a',thumbnailBase64:'data:image/png;base64,a'})
points.getState().addPhotoToPoint(layer.id,'p',{id:'photo-b',thumbnailBase64:'data:image/png;base64,b'})
points.getState().updatePhotoInPoint(layer.id,'p','photo-a',{thumbnailBase64:undefined,thumbnailUrl:'https://example.com/a'})
const photoWrite=queue.getState().items.at(-1)
assert.equal(photoWrite.mutation.kind,'photo');assert.deepEqual(photoWrite.mutation.removedFields,['thumbnailBase64'])
const merged=overlay.applyPhotoMutation([{id:'photo-a',thumbnailBase64:'old'},{id:'photo-b',thumbnailBase64:'keep'}],photoWrite.mutation)
assert.equal(merged[0].thumbnailBase64,undefined);assert.equal(merged[1].thumbnailBase64,'keep')
pass('Point and photo field removals survive JSON persistence without changing other photos')
points.setState({layers:[{...layer,buddyRole:'read'}]})
const before=queue.getState().items.length
assert.equal(points.getState().addPoint(layer.id,{name:'Forbidden',coordinates:[1,2],category:'Overig',notes:''}),false)
assert.equal(points.getState().updatePoint(layer.id,'p',{notes:'Forbidden'}),false)
points.getState().addPhotoToPoint(layer.id,'p',{id:'forbidden'})
assert.equal(queue.getState().items.length,before)
pass('Read-only layers cannot enqueue points, fields or photos')
writes.forgetBuddyWrites(queue.getState().items.map(item=>item.id))
// Simulate two tab modules holding stale in-memory queue snapshots.
cache.delete(resolve('src/store/buddyWriteStore.ts'))
const second=load('src/store/buddyWriteStore.ts')
await second.useBuddyWriteStore.persist.rehydrate()
assert.equal(writes.enqueueBuddyWrite('owner',layer,{kind:'patch',pointId:'p',fields:{notes:'Tab A'}},point),true)
assert.equal(second.enqueueBuddyWrite('owner',layer,{kind:'patch',pointId:'p',fields:{status:'done'}},point),true)
await queue.persist.rehydrate()
assert.equal(queue.getState().items.length,2)
assert.equal(new Set(queue.getState().items.map(item=>item.deviceId)).size,2)
assert.equal(writes.acknowledgeBuddyWrite(queue.getState().items[0].id),true)
await second.useBuddyWriteStore.persist.rehydrate()
assert.equal(second.useBuddyWriteStore.getState().items.length,1)
pass('Two stale tab snapshots keep both journal entries and acknowledge only one operation')
const privateLayer={...layer,id:'private-photo',buddyLayerId:undefined,buddyRole:undefined,points:[{...point,photos:[{id:'private-image',pendingUpload:true}]}]}
points.setState({layers:[privateLayer]})
full=true
assert.equal(points.getState().addPhotoToPoint(privateLayer.id,'p',{id:'new-photo',createdAt:point.createdAt}),false)
assert.equal(points.getState().updatePhotoInPoint(privateLayer.id,'p','private-image',{pendingUpload:false,imageUrl:'lost'}),false)
assert.equal(points.getState().layers[0].points[0].photos.length,1)
assert.equal(points.getState().layers[0].points[0].photos[0].pendingUpload,true)
full=false
assert.equal(points.getState().updatePhotoInPoint(privateLayer.id,'p','missing',{imageUrl:'resurrected'}),false)
assert.equal(points.getState().updatePhotoInPoint(privateLayer.id,'p','private-image',{pendingUpload:false,imageUrl:'saved'}),true)
await points.persist.rehydrate()
assert.equal(points.getState().layers[0].points[0].photos[0].imageUrl,'saved')
pass('Actual private photo store rejects quota/missing photos before changing memory and persists acknowledged URLs across reload')
assert.notEqual(accounts.accountPhotoKey('private-image'),'')
const oldPhotoKey=accounts.accountPhotoKey('private-image')
switchScope('other');assert.notEqual(accounts.accountPhotoKey('private-image'),oldPhotoKey)
switchScope('owner');assert.equal(accounts.accountPhotoKey('private-image'),oldPhotoKey)
pass('Local full-photo keys isolate accounts and preserve the first claimed workspace')
console.log(count+' shared-write and photo-storage regression checks passed')
