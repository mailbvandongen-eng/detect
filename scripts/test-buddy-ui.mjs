import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(process.env.BUDDY_TEST_MODULE_ROOT
  ? process.env.BUDDY_TEST_MODULE_ROOT + '/package.json' : import.meta.url)
const ts = require('typescript')

function load(path, mocks = {}) {
  const output = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  const module = { exports: {} }
  Function('require', 'module', 'exports', output)(name => {
    if (name in mocks) return mocks[name]
    throw new Error('Unexpected test import: ' + name)
  }, module, module.exports)
  return module.exports
}

const stateHelpers = load('src/utils/buddyLayerState.ts')
const catalog = load('src/utils/userLayerCatalog.ts')
const user = { uid: 'owner', email: 'owner@example.com' }
const record = { id: 'new-buddy', name: 'Frankrijk gedeeld', color: '#06b6d4',
  ownerUid: user.uid, ownerEmail: user.email, memberEmails: [user.email], editEmails: [], readEmails: [] }
let pointState = { layers: [{ id: 'private', name: 'Privé', color: '#ff0000', points: [], archived: false }] }
const pointStore = Object.assign(() => ({ addLayer: name => { pointState.layers.push({ id: 'new-private', name, color: '#7c5ac7', points: [], archived: false }) } }), {
  getState: () => pointState,
  setState: update => { pointState = { ...pointState, ...(typeof update === 'function' ? update(pointState) : update) } },
})
let syncState = { revision: 0, error: null, refresh: () => { syncState.revision++; syncState.error = null } }
const syncStore = Object.assign(selector => selector(syncState), {
  getState: () => syncState,
  setState: update => { syncState = { ...syncState, ...update } },
})
let authUser = user
const authStore = Object.assign(selector => selector({ user: authUser }), { getState: () => ({ user: authUser }) })
let returnedToLayers = false
let stateIndex = 0
const fields = [record.name]
const jsx = (type, props) => ({ type, props })
const modal = load('src/components/CustomPoints/CreateLayerModal.tsx', {
  react: { useState: () => [fields[stateIndex++], () => {}] },
  'react/jsx-runtime': { jsx, jsxs: jsx },
  'lucide-react': { Layers: () => null },
  '../../store': { useUIStore: selector => selector({ activeWindow: 'createLayer', backWindow: () => { returnedToLayers = true } }), useAuthStore: authStore },
  '../../store/customPointLayerStore': { useCustomPointLayerStore: pointStore },
  '../UI/AppWindow': { AppWindow: () => null },
  '../../services/buddyLayers': { createBuddyLayer: async () => record.id, normalizeBuddyEmail: email => email.trim().toLowerCase() },
  '../../utils/buddyLayerState': stateHelpers,
  '../../store/buddySyncStore': { useBuddySyncStore: syncStore },
})
const rendered = modal.CreateLayerModal()
await rendered.props.footer.props.children[1].props.onClick()
assert.equal(returnedToLayers, true)
assert.equal(syncState.revision, 0, 'Creating a private layer does not require Firebase')
assert.equal(pointState.layers.find(layer => layer.id === 'new-private')?.name, record.name)
assert.equal(pointState.layers.some(layer => layer.buddyLayerId), false)
console.log('PASS new layer is immediately visible and private without network access')
pointState.layers = pointState.layers.filter(layer => layer.id !== 'new-private')
pointState.layers = stateHelpers.upsertBuddyLayer(pointState.layers, record, user.uid, user.email)

const effects = []
let effectIndex = 0
function useEffect(callback, deps) {
  const i = effectIndex++
  const previous = effects[i]
  if (!previous || deps.some((value, j) => value !== previous.deps[j])) {
    previous?.cleanup?.()
    effects[i] = { deps, cleanup: callback() }
  }
}
const listeners = []
const events = new Map()
globalThis.window = {
  addEventListener: (name, fn) => events.set(name, fn),
  removeEventListener: name => events.delete(name),
}
globalThis.document = {
  visibilityState: 'visible',
  addEventListener: (name, fn) => events.set(name, fn),
  removeEventListener: name => events.delete(name),
}
const hook = load('src/hooks/useBuddyLayers.ts', {
  react: { useEffect },
  'firebase/firestore': {
    collection: (_, ...path) => path.join('/'), query: (path, filter) => ({ path, filter }), where: (...args) => args,
    onSnapshot: (target, ...args) => {
      const entry = { target, next: typeof args[0] === 'function' ? args[0] : args[1],
        error: typeof args[0] === 'function' ? args[1] : args[2], stopped: false }
      listeners.push(entry)
      return () => { entry.stopped = true }
    },
  },
  '../lib/firebase': { db: {} },
  '../store/authStore': { useAuthStore: authStore },
  '../store/customPointLayerStore': { useCustomPointLayerStore: pointStore },
  '../services/buddyLayers': { normalizeBuddyEmail: email => email.trim().toLowerCase() },
  '../utils/buddyLayerState': stateHelpers,
  '../store/buddySyncStore': { useBuddySyncStore: syncStore },
})
function renderHook() { effectIndex = 0; hook.useBuddyLayers() }
renderHook()
const failed = listeners[0]
const originalError = console.error
try { console.error = () => {}; failed.error({ code: 'permission-denied' }) } finally { console.error = originalError }
assert.ok(syncState.error)
syncState.refresh()
renderHook()
assert.equal(failed.stopped, true)
assert.equal(listeners.length, 2)
console.log('PASS retry restarts a terminal permission-denied listener and surfaces its error')
const active = listeners[1]
active.next({ docs: [], metadata: { fromCache: true } })
assert.ok(pointState.layers.some(layer => layer.buddyLayerId === record.id))
console.log('PASS empty cache does not erase newly acknowledged layer')
active.next({ docs: [{ id: record.id, data: () => record }], metadata: { fromCache: false } })
assert.equal(pointState.layers.filter(layer => layer.buddyLayerId === record.id).length, 1)
assert.equal(pointState.layers.find(layer => layer.buddyLayerId === record.id).buddyRole, 'owner')
listeners[2].next({ docs: [{ id: 'point', data: () => ({ name: 'Saved point', coordinates: [0, 0] }) }] })
assert.equal(pointState.layers.find(layer => layer.buddyLayerId === record.id).points[0].name, 'Saved point')
console.log('PASS actual metadata and point listeners populate one layer without duplication')
const privateOnly = [pointState.layers[0]]
pointState.layers = stateHelpers.preserveBuddyLayers(pointState.layers, privateOnly)
assert.equal(pointState.layers.length, 2)
assert.equal(pointState.layers[1].points.length, 1)
console.log('PASS private sync replacement preserves buddy layer and points')
const original = { id: 'original', name: 'Eigen punten', color: '#7c5ac7', points: [{id: 'old-point'}], categories: [], visible: true, archived: false }
const promoted = stateHelpers.upsertBuddyLayer([original], {...record, sourceLayerId: original.id}, user.uid, user.email)
assert.equal(promoted.length, 1)
assert.equal(promoted[0].id, original.id)
assert.equal(promoted[0].points[0].id, 'old-point')
assert.equal(stateHelpers.preserveBuddyLayers(promoted, [original]).length, 1)
console.log('PASS sharing existing layer preserves ID and points; stale private cloud copy cannot duplicate it')
events.get('visibilitychange')()
renderHook()
assert.equal(active.stopped, true)
assert.equal(listeners[2].stopped, true)
console.log('PASS returning to app restarts metadata and point subscriptions')
// A stale asynchronous callback from a stopped subscription must not erase state.
active.next({ docs: [], metadata: { fromCache: false } })
assert.equal(pointState.layers.length, 2)
const latest = listeners.at(-1)
latest.next({ docs: [], metadata: { fromCache: false } })
assert.equal(pointState.layers.length, 1)
console.log('PASS confirmed server deletion removes layer; stale callback cannot')
const readerLayers = stateHelpers.upsertBuddyLayer(privateOnly, record, 'reader', 'reader@example.com')
assert.equal(catalog.getStandalonePointLayers(readerLayers, [], { includeReadOnly: true }).length, 2)
assert.equal(catalog.getStandalonePointLayers(readerLayers, []).length, 1)
console.log('PASS read-only buddy layer is displayed but excluded from add-point choices')
authUser = null
const beforeLateCallback = JSON.stringify(pointState.layers)
latest.next({ docs: [{ id: 'old-account', data: () => record }], metadata: { fromCache: false } })
assert.equal(JSON.stringify(pointState.layers), beforeLateCallback)
console.log('PASS old-account callback is blocked immediately before React cleanup')
pointState.layers = readerLayers
renderHook()
assert.equal(pointState.layers.length, 1)
console.log('PASS sign-out removes buddy layers')
effects.forEach(effect => effect.cleanup?.())
console.log('11 buddy UI regression checks passed')
