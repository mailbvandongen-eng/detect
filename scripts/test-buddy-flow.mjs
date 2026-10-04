import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(process.env.BUDDY_TEST_MODULE_ROOT + '/package.json')
let ts
try {ts=createRequire(import.meta.url)('typescript')}catch{ts=require('typescript')}
const { initializeTestEnvironment, assertFails, assertSucceeds } = require('@firebase/rules-unit-testing')
const firestore = require('firebase/firestore')
const env = await initializeTestEnvironment({
  projectId: 'demo-detect-flow',
  firestore: { rules: readFileSync('firestore.rules', 'utf8') }
})
const owner = {uid: 'owner', email: 'owner@example.com'}
const editor = {uid: 'editor', email: 'editor@example.com'}
const reader = {uid: 'reader', email: 'reader@example.com'}
const outsider = {uid: 'outsider', email: 'outsider@example.com'}
function client(user) {
  const db = env.authenticatedContext(user.uid, {email: user.email}).firestore()
  const compiled = ts.transpileModule(readFileSync('src/services/buddyLayers.ts','utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}
  }).outputText
  const module = {exports:{}}
  Function('require','module','exports',compiled)(
    name => name === '../lib/firebase' ? {db} : name === '../utils/buddyWrites' ? writeHelpers : require(name), module, module.exports
  )
  return {db, ...module.exports}
}
function loadHelper(){
 const m={exports:{}};const output=ts.transpileModule(readFileSync('src/utils/buddyWrites.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;Function('module','exports',output)(m,m.exports);return m.exports
}
const writeHelpers=loadHelper()
let count = 0
function pass(label) { count++; console.log('PASS ' + label) }
try {
  const a = client(owner), b = client(editor), c = client(reader), d = client(outsider)
  const id = await assertSucceeds(a.createBuddyLayer(owner,'  Flowtest  '))
  pass('Actual app createBuddyLayer creates layer')
  let snap = await firestore.getDoc(firestore.doc(a.db,'buddyLayers',id))
  assert.equal(snap.data().name,'Flowtest')
  assert.equal(snap.data().ownerUid,owner.uid)
  pass('Layer persisted with trimmed name and correct owner')
  let results = await firestore.getDocs(firestore.query(firestore.collection(a.db,'buddyLayers'),
    firestore.where('memberEmails','array-contains',owner.email)))
  assert.equal(results.size,1)
  pass('Actual app layer query finds owner layer')
  await assertFails(firestore.getDoc(firestore.doc(d.db,'buddyLayers',id)))
  pass('Outsider cannot read layer')
  await a.addBuddyMember(owner,id,'  EDITOR@example.com  ','edit')
  await a.addBuddyMember(owner,id,reader.email,'read')
  pass('Actual app addBuddyMember grants editor and reader roles')
  results = await firestore.getDocs(firestore.query(firestore.collection(b.db,'buddyLayers'),
    firestore.where('memberEmails','array-contains',editor.email)))
  assert.equal(results.size,1)
  pass('Buddy sees shared layer via actual app query')
  const point = {id:'test-point',name:'Test point',coordinates:[0,0],notes:'',category:'Overig',
    status:'todo',createdAt:new Date().toISOString()}
  await assertSucceeds(a.saveBuddyPoint(id,point))
  pass('Owner saves point via actual app saveBuddyPoint')
  snap = await firestore.getDoc(firestore.doc(b.db,'buddyLayers',id,'points',point.id))
  assert.equal(snap.data().name,point.name)
  pass('Buddy reads persisted point from separate authenticated client')
  await assertSucceeds(b.saveBuddyPoint(id,{...point,name:'Editor changed point'}))
  pass('Editor changes point')
  snap = await firestore.getDoc(firestore.doc(c.db,'buddyLayers',id,'points',point.id))
  assert.equal(snap.data().name,'Editor changed point')
  pass('Reader sees editor change')
  await assertFails(c.saveBuddyPoint(id,{...point,name:'Forbidden'}))
  pass('Reader cannot modify point')
  await assertFails(d.saveBuddyPoint(id,point))
  pass('Outsider cannot save point')
  await assertFails(firestore.updateDoc(firestore.doc(b.db,'buddyLayers',id),{name:'Forbidden'}))
  pass('Editor cannot rename layer')
  await a.updateBuddyLayerMetadata(owner,id,{name:'Renamed',color:'#ff0000'})
  snap = await firestore.getDoc(firestore.doc(b.db,'buddyLayers',id))
  assert.equal(snap.data().name,'Renamed')
  assert.equal(snap.data().color,'#ff0000')
  pass('Owner renames and recolors layer; buddy sees changes')
  await assertFails(firestore.updateDoc(firestore.doc(a.db,'buddyLayers',id),{ownerUid:editor.uid}))
  pass('Ownership cannot be forged')
  await a.removeBuddyMember(owner,id,editor.email)
  await assertFails(b.saveBuddyPoint(id,point))
  await assertFails(firestore.getDoc(firestore.doc(b.db,'buddyLayers',id)))
  pass('Revoked buddy loses access')
  await assertFails(c.deleteBuddyPoint(id,point.id))
  pass('Reader cannot delete point')
  await a.deleteBuddyPoint(id,point.id)
  snap = await firestore.getDoc(firestore.doc(a.db,'buddyLayers',id,'points',point.id))
  assert.equal(snap.exists(),false)
  pass('Owner deletes point')
  await a.saveBuddyPoint(id,{...point,id:'second'})
  await a.deleteBuddyLayer(owner,id)
  await env.withSecurityRulesDisabled(async context => {
    const adminDb = context.firestore()
    const deleted = await firestore.getDoc(firestore.doc(adminDb,'buddyLayers',id))
    assert.equal(deleted.exists(),false)
    const leftover = await firestore.getDocs(firestore.collection(adminDb,'buddyLayers',id,'points'))
    assert.equal(leftover.size,0)
  })
  pass('Actual app deleteBuddyLayer removes layer and its points')
  const privateLayer = {id:'local-existing', name:'Bestaande punten', color:'#7c5ac7', points:[{...point,geometry:undefined}, {...point,id:'old-second'}]}
  const promoted = await a.shareOwnPointLayer(owner, privateLayer, editor.email, 'edit')
  assert.equal(promoted.sourceLayerId,privateLayer.id)
  let sharedPoints = await firestore.getDocs(firestore.collection(b.db,'buddyLayers',promoted.id,'points'))
  assert.equal(sharedPoints.size,2)
  pass('Sharing an existing private layer publishes all existing points before granting access')
  await b.saveBuddyPoint(promoted.id,{...point,name:'Keep concurrent edit'})
  const retried = await a.shareOwnPointLayer(owner, privateLayer, reader.email, 'read')
  assert.equal(retried.id,promoted.id)
  snap = await firestore.getDoc(firestore.doc(c.db,'buddyLayers',promoted.id,'points',point.id))
  assert.equal(snap.data().name,'Keep concurrent edit')
  pass('Retry reuses same layer and never overwrites a shared point with stale private data')
  await assertFails(c.saveBuddyPoint(promoted.id,point))
  pass('Promoted layer honors read-only permissions')
  const partialId='point-owner-partial'
  await firestore.setDoc(firestore.doc(a.db,'buddyLayers',partialId),{id:partialId,name:'Partial',color:'#7c5ac7',sourceLayerId:'partial',ownerUid:owner.uid,ownerEmail:owner.email,memberEmails:[owner.email],editEmails:[],readEmails:[],ready:false})
  await assertFails(firestore.getDoc(firestore.doc(b.db,'buddyLayers',partialId)))
  await a.saveBuddyPoint(partialId,{...point,name:'Already persisted; preserve me'})
  const resumed=await a.shareOwnPointLayer(owner,{...privateLayer,id:'partial'},editor.email,'edit')
  sharedPoints=await firestore.getDocs(firestore.collection(b.db,'buddyLayers',resumed.id,'points'))
  assert.equal(sharedPoints.size,2)
  pass('Interrupted promotion remains private and safely resumes with all points')
  snap=await firestore.getDoc(firestore.doc(a.db,'buddyLayers',resumed.id,'points',point.id))
  assert.equal(snap.data().name,'Already persisted; preserve me')
  pass('Resumed initial promotion never overwrites a point already published by another request')

  const a2=client(owner)
  await Promise.all([a.addBuddyMember(owner,promoted.id,'extra-one@example.com','read'),a2.addBuddyMember(owner,promoted.id,'extra-two@example.com','edit')])
  snap=await firestore.getDoc(firestore.doc(a.db,'buddyLayers',promoted.id))
  assert.ok(snap.data().memberEmails.includes('extra-one@example.com'))
  assert.ok(snap.data().memberEmails.includes('extra-two@example.com'))
  await Promise.all([a.removeBuddyMember(owner,promoted.id,'extra-one@example.com'),a2.addBuddyMember(owner,promoted.id,'extra-three@example.com','read')])
  snap=await firestore.getDoc(firestore.doc(a.db,'buddyLayers',promoted.id))
  assert.ok(!snap.data().memberEmails.includes('extra-one@example.com'))
  assert.ok(snap.data().readEmails.includes('extra-three@example.com'))
  pass('Concurrent member grants and revoke/grant preserve unrelated permissions')
  const operation=(uid,deviceId,sequence,mutation)=>({id:deviceId+sequence,uid,deviceId,sequence,buddyLayerId:promoted.id,layer:privateLayer,mutation,status:'pending'})
  const create=operation(owner.uid,'owner-device',1,{kind:'create',point:{...point,id:'concurrent'}})
  await a.applyBuddyWrite(create,()=>true)
  const notes=operation(owner.uid,'owner-device',2,{kind:'patch',pointId:'concurrent',fields:{notes:'Owner notes'}})
  const status=operation(editor.uid,'editor-device',1,{kind:'patch',pointId:'concurrent',fields:{status:'done'}})
  await Promise.all([a.applyBuddyWrite(notes,()=>true),b.applyBuddyWrite(status,()=>true)])
  const reference=firestore.doc(a.db,'buddyLayers',promoted.id,'points','concurrent')
  snap=await firestore.getDoc(reference)
  assert.equal(snap.data().notes,'Owner notes');assert.equal(snap.data().status,'done')
  pass('Two authenticated clients editing different point fields preserve both changes')
  await b.applyBuddyWrite(operation(editor.uid,'editor-device',2,{kind:'patch',pointId:'concurrent',fields:{notes:'Later buddy notes'}}),()=>true)
  await a.applyBuddyWrite(notes,()=>true)
  snap=await firestore.getDoc(reference);assert.equal(snap.data().notes,'Later buddy notes')
  pass('Retry after lost acknowledgement cannot overwrite a later buddy edit')
  const photo=id=>({id,thumbnailBase64:'data:image/png;base64,test',createdAt:point.createdAt})
  await Promise.all([a.applyBuddyWrite(operation(owner.uid,'owner-device',3,{kind:'photo',pointId:'concurrent',action:'add',photoId:'a',photo:photo('a')}),()=>true),b.applyBuddyWrite(operation(editor.uid,'editor-device',3,{kind:'photo',pointId:'concurrent',action:'add',photoId:'b',photo:photo('b')}),()=>true)])
  snap=await firestore.getDoc(reference);assert.deepEqual(snap.data().photos.map(p=>p.id).sort(),['a','b'])
  await a.applyBuddyWrite(operation(owner.uid,'owner-device',4,{kind:'photo',pointId:'concurrent',action:'update',photoId:'a',fields:{thumbnailUrl:'https://example.com/photo'},removedFields:['thumbnailBase64']}),()=>true)
  snap=await firestore.getDoc(reference);assert.equal(snap.data().photos.find(p=>p.id==='a').thumbnailBase64,undefined)
  pass('Concurrent photo additions preserve both photos; replacement clears only the selected thumbnail')
  await a.applyBuddyWrite(operation(owner.uid,'owner-device',5,{kind:'patch',pointId:'concurrent',fields:{phone:'123'}}),()=>true)
  await a.applyBuddyWrite(operation(owner.uid,'owner-device',6,{kind:'patch',pointId:'concurrent',fields:{},removedFields:['phone']}),()=>true)
  snap=await firestore.getDoc(reference);assert.equal(snap.data().phone,undefined)
  await a.applyBuddyWrite(operation(owner.uid,'owner-device',7,{kind:'delete',pointId:'concurrent'}),()=>true)
  await a.applyBuddyWrite(create,()=>true)
  await assert.rejects(b.applyBuddyWrite(operation(editor.uid,'editor-device',4,{kind:'patch',pointId:'concurrent',fields:{notes:'Stale'}}),()=>true),error=>error.code==='point-deleted')
  snap=await firestore.getDoc(reference);assert.equal(snap.data().deleted,true)
  pass('Field removals persist and deleted points cannot be resurrected by queued retries')
  await a.removeBuddyMember(owner,promoted.id,editor.email)
  await assertFails(b.applyBuddyWrite(operation(editor.uid,'editor-device',5,{kind:'patch',pointId:point.id,fields:{notes:'Offline before revoke'}}),()=>true))
  await assert.rejects(a.applyBuddyWrite(operation(owner.uid,'owner-device',8,{kind:'patch',pointId:point.id,fields:{notes:'Wrong account'}}),()=>false),/Account is gewijzigd/)
  pass('Revoked and stale-account writes cannot change shared points')

  const deletion=operation(owner.uid,'owner-device',9,{kind:'deleteLayer'})
  await a.applyBuddyWrite(deletion,()=>true)
  await a.applyBuddyWrite(deletion,()=>true)
  snap=await firestore.getDoc(firestore.doc(a.db,'buddyLayers',promoted.id))
  assert.equal(snap.data().deleted,true)
  assert.deepEqual(snap.data().memberEmails,[owner.email])
  assert.equal((await firestore.getDocs(firestore.collection(a.db,'buddyLayers',promoted.id,'points'))).size,0)
  await assert.rejects(a.applyBuddyWrite(operation(owner.uid,'owner-device',10,{kind:'create',point:{...point,id:'after-delete'}}),()=>true),error=>error.code==='layer-deleted')
  await assertFails(firestore.getDoc(firestore.doc(c.db,'buddyLayers',promoted.id)))
  pass('Layer deletion is replay-safe, revokes access atomically and rejects concurrent new points')
  console.log(count + ' integration checks passed. No production database used.')
} finally { await env.cleanup() }
