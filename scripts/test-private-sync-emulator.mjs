import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const localRequire = createRequire(import.meta.url)
const require = createRequire(process.env.PRIVATE_SYNC_TEST_MODULE_ROOT + '/package.json')
const ts = localRequire('typescript')
const firestore = require('firebase/firestore')
const { initializeTestEnvironment, assertFails } = require('@firebase/rules-unit-testing')
function load(file, mocks) {
  const output = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const module = { exports: {} }
  Function('require','module','exports',output)(name => { if (name in mocks) return mocks[name]; throw new Error('Unexpected import ' + name) }, module, module.exports)
  return module.exports
}
const helpers = load('src/utils/privateSyncMerge.ts', {})
const cleanup = load('src/utils/pointLayerCleanup.ts', {})
const independent = load('src/utils/independentLayers.ts', {})
const env = await initializeTestEnvironment({ projectId: 'demo-private-data', firestore: { rules: readFileSync('firestore.rules','utf8') } })
const clone = x => structuredClone(x)
let count = 0
const pass = name => { count++; console.log('PASS ' + name) }
function device(uid, data, revision = helpers.emptyPrivateRevision()) {
  const db = env.authenticatedContext(uid).firestore()
  const state = { data: clone(data), revision: clone(revision), deletedLayerIds: [], layerCleanupVersion: 1 }
  const service = load('src/services/privateCloudSync.ts', {
    'firebase/firestore': firestore, '../lib/firebase': { db },
    './privateAccountData': { privateData: () => clone(state.data), privateRevision: () => clone(state.revision), observePrivateRevision: () => {}, applyPrivateData: (data, revision) => { state.data = data; state.revision = revision } },
    '../utils/privateSyncMerge': helpers, '../utils/pointLayerCleanup': cleanup,
    '../store/customPointLayerStore': { useCustomPointLayerStore: { getState: () => state, setState: updates => Object.assign(state, updates) } },
    '../utils/independentLayers': independent,
  })
  return { ...service, db, state }
}
const base = { layers: [{ id: 'layer', name: 'Frankrijk', color: '#7c5ac7', visible: true, points: [{ id: 'base', notes: 'oud' }] }], vondsten: [{ id: 'find' }], routes: [{ id: 'route' }] }
try {
  const one = clone(base), two = clone(base)
  one.layers[0].points.push({ id: 'one', notes: 'apparaat 1' })
  two.layers[0].points.push({ id: 'two', notes: 'apparaat 2' })
  one.layers[0].name = 'Nieuwe naam'
  two.layers[0].color = '#123456'
  const m1 = helpers.emptyPrivateRevision(), m2 = helpers.emptyPrivateRevision()
  m1.layers = helpers.trackChanges(base.layers, one.layers, {}, 10, true)
  m2.layers = helpers.trackChanges(base.layers, two.layers, {}, 11, true)
  const a = device('owner', one, m1), b = device('owner', two, m2), outsider = device('other', { layers: [], vondsten: [], routes: [] })
  await firestore.setDoc(firestore.doc(a.db, 'users', 'owner'), base)
  await Promise.all([a.synchronizePrivateData('owner', () => true), b.synchronizePrivateData('owner', () => true)])
  let snapshot = await firestore.getDoc(firestore.doc(a.db, 'users', 'owner'))
  assert.deepEqual(snapshot.data().layers[0].points.map(p => p.id).sort(), ['base', 'one', 'two'])
  assert.equal(snapshot.data().layers[0].name, 'Nieuwe naam'); assert.equal(snapshot.data().layers[0].color, '#123456')
  pass('Concurrent real Firestore transactions retain both devices points and field changes')
  await a.synchronizePrivateData('owner', () => true)
  const previous = clone(a.state.data)
  a.state.data.layers[0].points = a.state.data.layers[0].points.filter(p => p.id !== 'base')
  a.state.data.vondsten = []; a.state.data.routes = []
  for (const key of ['layers', 'vondsten', 'routes']) a.state.revision[key] = helpers.trackChanges(previous[key], a.state.data[key], a.state.revision[key], 20, key === 'layers')
  await a.synchronizePrivateData('owner', () => true)
  // Device b has old copies and an old revision. It must not resurrect deletions.
  await b.synchronizePrivateData('owner', () => true)
  snapshot = await firestore.getDoc(firestore.doc(a.db, 'users', 'owner'))
  assert.equal(snapshot.data().layers[0].points.some(p => p.id === 'base'), false)
  assert.equal(snapshot.data().vondsten.length, 0); assert.equal(snapshot.data().routes.length, 0)
  pass('Second authenticated device cannot resurrect deleted points, finds or routes')
  await assertFails(firestore.getDoc(firestore.doc(outsider.db, 'users', 'owner')))
  await assertFails(outsider.synchronizePrivateData('owner', () => true))
  pass('Actual security rules reject cross-account reads and transactional writes')
  await outsider.synchronizePrivateData('other', () => true)
  snapshot = await firestore.getDoc(firestore.doc(outsider.db, 'users', 'other'))
  assert.deepEqual(snapshot.data().layers, [])
  pass('New account creates its own empty cloud document')
  await assert.rejects(a.synchronizePrivateData('owner', () => false), /Account/)
  pass('Invalidated session is rejected before cloud access')
  console.log(`${count} real Firebase private-data checks passed`)
} finally { await env.cleanup() }
