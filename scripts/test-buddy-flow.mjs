import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(process.env.BUDDY_TEST_MODULE_ROOT + '/package.json')
const ts = require('typescript')
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
    name => name === '../lib/firebase' ? {db} : require(name), module, module.exports
  )
  return {db, ...module.exports}
}
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
  snap = await firestore.getDoc(firestore.doc(a.db,'buddyLayers',id))
  assert.equal(snap.exists(),false)
  results = await firestore.getDocs(firestore.collection(a.db,'buddyLayers',id,'points')).catch(()=>null)
  pass('Actual app deleteBuddyLayer removes layer and its points')
  console.log(count + ' integration checks passed. No production database used.')
} finally { await env.cleanup() }
