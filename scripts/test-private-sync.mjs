import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const ts = require('typescript')
let count = 0
const pass = name => { count++; console.log('PASS ' + name) }
function storage() {
  const entries = new Map()
  return { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value), removeItem: key => entries.delete(key) }
}
globalThis.localStorage = storage()
const cache = new Map()
let transactionHook = null
let commitHook = null
let rejectWrite = false
const documents = new Map()
const firebase = {
  doc: (_, ...path) => path.join('/'), serverTimestamp: () => ({ server: true }),
  runTransaction: async (_, fn) => {
    const writes = []
    const result = await fn({ get: async path => {
      if (transactionHook) { const hook = transactionHook; transactionHook = null; await hook() }
      return { exists: () => documents.has(path), data: () => structuredClone(documents.get(path)) }
    }, set: (path, data) => writes.push({ path, data }) })
    if (rejectWrite) throw new Error('offline')
    for (const { path, data } of writes) documents.set(path, { ...documents.get(path), ...structuredClone(data) })
    if (commitHook) { const hook = commitHook; commitHook = null; await hook() }
    return result
  },
}
let authListener = null
let authSubscriptions = 0
const mocks = {
  'firebase/auth': { GoogleAuthProvider: class {}, onAuthStateChanged: (_, callback) => { authSubscriptions++; authListener = callback }, getRedirectResult: async () => null },
  'firebase/firestore': firebase,
  '../lib/firebase': { db: {}, auth: { currentUser: null } },
  '../services/buddyLayers': { deleteBuddyLayer: async () => {}, deleteBuddyPoint: async () => {}, saveBuddyPoint: async () => {}, updateBuddyLayerMetadata: async () => {} },
  'ol/proj': { fromLonLat: x => x, toLonLat: x => x },
  './layerStore': { useLayerStore: { getState: () => ({ layers: [] }) } },
  './mapStore': { useMapStore: { getState: () => ({ map: null }) } },
}
function load(path) {
  path = resolve(path)
  if (cache.has(path)) return cache.get(path).exports
  const module = { exports: {} }; cache.set(path, module)
  const compiled = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  Function('require', 'module', 'exports', compiled)(name => {
    if (name in mocks) return mocks[name]
    if (name.startsWith('.')) return load(resolve(dirname(path), name + '.ts'))
    return require(name)
  }, module, module.exports)
  return module.exports
}
const helpers = load('src/utils/privateSyncMerge.ts')
const { trackChanges, mergeCollection } = helpers
const old = [{ id: 'l', name: 'Frankrijk', points: [{ id: 'p', notes: 'oud' }] }]
const local = [{ ...old[0], points: [...old[0].points, { id: 'nieuw', notes: 'lokaal' }] }]
let meta = trackChanges(old, local, {}, 10, true)
assert.deepEqual(mergeCollection(old, local, {}, meta, true).items[0].points.map(p => p.id), ['p', 'nieuw'])
pass('Extra offline point survives merge with old cloud layer')
const changedLocal = [{ ...old[0], name: 'Nieuwe naam', points: [{ id: 'p', notes: 'lokaal' }] }]
const changedCloud = [{ ...old[0], color: 'purple', points: [...old[0].points, { id: 'ander-apparaat' }] }]
meta = trackChanges(old, changedLocal, {}, 20, true)
const cloudMeta = trackChanges(old, changedCloud, {}, 21, true)
const merged = mergeCollection(changedCloud, changedLocal, cloudMeta, meta, true)
assert.equal(merged.items[0].name, 'Nieuwe naam'); assert.equal(merged.items[0].color, 'purple')
assert.equal(merged.items[0].points.find(p => p.id === 'p').notes, 'lokaal')
assert.ok(merged.items[0].points.some(p => p.id === 'ander-apparaat'))
pass('Different fields and points from two devices both survive')
const deletedPoint = trackChanges(old, [{ ...old[0], points: [] }], {}, 30, true)
assert.equal(mergeCollection(old, [{ ...old[0], points: [] }], {}, deletedPoint, true).items[0].points.length, 0)
for (const name of ['vondst', 'route']) {
  const deleted = trackChanges([{ id: name }], [], {}, 30)
  assert.equal(mergeCollection([{ id: name }], [], {}, deleted).items.length, 0)
  assert.equal(mergeCollection([{ id: name, notes: 'stale edit' }], [], { [name]: { fields: { notes: 40 } } }, deleted).items.length, 0)
}
pass('Deleted points, finds and routes never return from stale devices')
const removedField = trackChanges([{ id: 'p', notes: 'oud' }], [{ id: 'p' }], {}, 50)
assert.equal(mergeCollection([{ id: 'p', notes: 'oud' }], [{ id: 'p' }], {}, removedField).items[0].notes, undefined)
pass('Removing a field is preserved')

const points = load('src/store/customPointLayerStore.ts').useCustomPointLayerStore
const finds = load('src/store/localVondstenStore.ts').useLocalVondstenStore
const routes = load('src/store/routeRecordingStore.ts').useRouteRecordingStore
const imports = load('src/store/customLayerStore.ts').useCustomLayerStore
const settings = load('src/store/settingsStore.ts').useSettingsStore
const accounts = load('src/services/privateAccountData.ts')
const scopes = load('src/utils/accountStorage.ts')
accounts.initializePrivateTracking()
points.setState({ layers: local })
finds.setState({ vondsten: [{ id: 'find-a', notes: 'a' }] })
routes.setState({ savedRoutes: [{ id: 'route-a', name: 'a' }] })
imports.setState({ layers: [{ id: 'import-a', features: [] }] })
settings.setState({ uiTheme: 'purple' })
await accounts.activatePrivateAccount('a')
assert.equal(points.getState().layers[0].id, 'l')
pass('One-time migration preserves existing local data for first account')
const aSession = scopes.accountSession('a')
await accounts.activatePrivateAccount('b')
assert.equal(aSession(), false)
assert.equal(points.getState().layers.length, 0); assert.equal(finds.getState().vondsten.length, 0)
assert.equal(routes.getState().savedRoutes.length, 0); assert.equal(imports.getState().layers.length, 0)
points.setState({ layers: [{ id: 'b-layer', points: [] }] })
await accounts.activatePrivateAccount('a')
assert.equal(points.getState().layers[0].id, 'l')
assert.equal(imports.getState().layers[0].id, 'import-a'); assert.equal(settings.getState().uiTheme, 'purple')
assert.equal(finds.getState().vondsten[0].id, 'find-a'); assert.equal(routes.getState().savedRoutes[0].id, 'route-a')
pass('Account switch isolates all private data and restores original account')
await accounts.activatePrivateAccount(null)
assert.equal(points.getState().layers.length, 0)
await accounts.activatePrivateAccount('b')
assert.equal(points.getState().layers[0].id, 'b-layer')
pass('Sign-out uses separate anonymous workspace; second account remains intact')
await accounts.activatePrivateAccount('a')
const cloudSync = load('src/services/privateCloudSync.ts')
const valid = scopes.accountSession('a')
documents.set('users/a', { layers: old, vondsten: [], routes: [] })
await cloudSync.synchronizePrivateData('a', valid)
assert.ok(documents.get('users/a').layers[0].points.some(p => p.id === 'nieuw'))
pass('Actual transactional service persists offline edits')
finds.getState().removeVondst('find-a')
routes.getState().deleteRoute('route-a')
await cloudSync.synchronizePrivateData('a', valid)
assert.equal(documents.get('users/a').vondsten.length, 0); assert.equal(documents.get('users/a').routes.length, 0)
assert.ok(documents.get('users/a').privateRevision.vondsten['find-a'].deleted)
pass('Actual store deletion writes persistent cloud deletion records')
commitHook = () => points.getState().addPoint('l', { name: 'during-write', coordinates: [0, 0], category: 'Overig', notes: '' })
await cloudSync.synchronizePrivateData('a', valid)
assert.ok(points.getState().layers[0].points.some(p => p.name === 'during-write'))
await cloudSync.synchronizePrivateData('a', valid)
assert.ok(documents.get('users/a').layers[0].points.some(p => p.name === 'during-write'))
pass('Changes during network request remain local and upload next time')
const future = Date.now() + 100000
const futureDoc = documents.get('users/a')
futureDoc.privateRevision.layers.l.points.p = { fields: { notes: future } }
futureDoc.layers[0].points.find(point => point.id === 'p').notes = 'ander apparaat'
commitHook = () => points.getState().updatePoint('l', 'p', { notes: 'nieuw tijdens opslag' })
await cloudSync.synchronizePrivateData('a', valid)
assert.equal(points.getState().layers[0].points.find(point => point.id === 'p').notes, 'nieuw tijdens opslag')
pass('Observed remote clock cannot overwrite a newer edit during the request')
points.getState().updateLayer('l', { name: 'Offline naam' })
rejectWrite = true
await assert.rejects(cloudSync.synchronizePrivateData('a', valid), /offline/)
assert.equal(points.getState().layers[0].name, 'Offline naam')
rejectWrite = false
await cloudSync.synchronizePrivateData('a', valid)
assert.equal(documents.get('users/a').layers[0].name, 'Offline naam')
pass('Failed cloud write keeps local changes; retry persists them')
const beforeCloud = structuredClone(documents.get('users/a'))
transactionHook = () => accounts.activatePrivateAccount('b')
await assert.rejects(cloudSync.synchronizePrivateData('a', valid), /Account/)
assert.deepEqual(documents.get('users/a'), beforeCloud)
assert.equal(points.getState().layers[0].id, 'b-layer')
assert.equal(documents.has('users/b'), false)
pass('Late old-account request neither overwrites new workspace nor uploads its data')

await accounts.activatePrivateAccount('a')
routes.setState({ state: 'recording', startTime: Date.now() - 2000, currentPoints: [{ coordinates: [4, 52], timestamp: Date.now() - 1000 }, { coordinates: [4.001, 52], timestamp: Date.now() }] })
await accounts.activatePrivateAccount('b')
await accounts.activatePrivateAccount('a')
assert.ok(routes.getState().savedRoutes.some(route => route.name === 'Route vóór accountwisseling'))
assert.equal(routes.getState().state, 'idle')
pass('Active route is saved to old account before switching')
const authStore = load('src/store/authStore.ts').useAuthStore
await accounts.activatePrivateAccount('a')
authStore.getState().initAuth(); authStore.getState().initAuth()
assert.equal(authSubscriptions, 1)
authListener({ uid: 'a' }); authListener({ uid: 'b' })
await new Promise(resolve => setImmediate(resolve))
assert.equal(authStore.getState().user.uid, 'b')
assert.equal(points.getState().layers[0].id, 'b-layer')
pass('Actual auth handler serializes rapid identity changes and exposes only final account')
localStorage.setItem('detect-account:corrupt:detectorapp-custom-point-layers', '{bad-json')
await assert.rejects(accounts.activatePrivateAccount('corrupt'))
assert.equal(points.getState().layers.length, 0)
assert.ok(localStorage.getItem('detect-account:b:detectorapp-custom-point-layers').includes('b-layer'))
pass('Corrupt account storage blocks switching instead of silently replacing data')

// Simulate a browser restart: cached private data remains locked until auth resolves.
cache.clear()
const restarted = load('src/utils/accountStorage.ts')
assert.equal(restarted.accountStorage.getItem('detectorapp-custom-point-layers'), null)
assert.equal(restarted.currentAccountScope(), 'locked')
pass('Restart does not expose previous account data before authentication')
globalThis.localStorage = storage()
localStorage.setItem('detectorapp-custom-point-layers', JSON.stringify({ state: { layers: [{ id: 'guest' }] }, version: 7 }))
cache.clear()
const guest = load('src/utils/accountStorage.ts')
guest.beginAccountSwitch(null); guest.finishAccountSwitch()
assert.ok(guest.accountStorage.getItem('detectorapp-custom-point-layers').includes('guest'))
guest.beginAccountSwitch('first-google-account'); guest.finishAccountSwitch()
assert.ok(guest.accountStorage.getItem('detectorapp-custom-point-layers').includes('guest'))
guest.beginAccountSwitch(null); guest.finishAccountSwitch()
assert.equal(guest.accountStorage.getItem('detectorapp-custom-point-layers'), null)
guest.beginAccountSwitch('second-google-account'); guest.finishAccountSwitch()
assert.equal(guest.accountStorage.getItem('detectorapp-custom-point-layers'), null)
pass('First signed-out startup migrates once; later account never inherits guest or owner data')
globalThis.localStorage = storage()
const large = JSON.stringify({ state: { layers: [{ id: 'large-import', data: 'x'.repeat(100000) }] }, version: 1 })
localStorage.setItem('detectorapp-custom-layers', large)
const write = localStorage.setItem
localStorage.setItem = (key, value) => { if (value.length > 10000) throw new Error('quota'); write(key, value) }
cache.clear()
const full = load('src/utils/accountStorage.ts')
full.beginAccountSwitch('owner-with-large-import'); full.finishAccountSwitch()
assert.equal(full.accountStorage.getItem('detectorapp-custom-layers'), large)
assert.equal(localStorage.getItem('detect-account:owner-with-large-import:detectorapp-custom-layers'), null)
full.beginAccountSwitch('other'); full.finishAccountSwitch()
assert.equal(full.accountStorage.getItem('detectorapp-custom-layers'), null)
pass('Large import migration needs no second copy and never exposes it to another account')
console.log(`${count} private sync and account isolation checks passed`)
