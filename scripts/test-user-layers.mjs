import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

function loadTypeScriptModule(path) {
  const source = readFileSync(path, 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText
  const loaded = { exports: {} }
  Function('module', 'exports', output)(loaded, loaded.exports)
  return loaded.exports
}

const catalogModule = loadTypeScriptModule('src/utils/userLayerCatalog.ts')
const popupModule = loadTypeScriptModule('src/utils/importedLayerPopup.ts')
const cleanupModule = loadTypeScriptModule('src/utils/pointLayerCleanup.ts')

const pointLayers = [
  { id: 'standalone', name: 'Losse punten', color: '#ff0000', points: [{}], archived: false },
  {
    id: 'overlay',
    name: 'Import-overlay',
    color: '#00ff00',
    points: [{}, {}],
    archived: false,
    linkedImportedLayerId: 'imported',
  },
  {
    id: 'orphan',
    name: 'Bewaarde punten',
    color: '#0000ff',
    points: [{}],
    archived: false,
    linkedImportedLayerId: 'missing-import',
  },
  { id: 'archived', name: 'Archief', color: '#999999', points: [], archived: true },
]

const importedLayers = [{
  id: 'imported',
  name: 'Vondsten en locaties',
  color: '#aaaaaa',
  features: { features: [{}, {}] },
  style: { points: { color: '#8b5cf6' } },
}]

const catalog = catalogModule.buildUserLayerCatalog(pointLayers, importedLayers)
assert.deepEqual(catalog.map(item => item.name), ['Losse punten', 'Import-overlay', 'Bewaarde punten'])
assert.ok(catalog.every(item => item.target.kind === 'point'), 'Imports never appear as point destinations')
assert.equal(catalog.find(item => item.target.id === 'overlay').objectCount, 2)
const independent = loadTypeScriptModule('src/utils/independentLayers.ts')
const old = {...pointLayers[1], shareId: 'legacy', sharePermission: 'edit'}
const migrated = independent.independentPointLayer(old)
assert.equal(migrated.linkedImportedLayerId, undefined)
assert.equal(migrated.shareId, undefined)
assert.equal(migrated.points, old.points, 'Migration preserves every existing point')
assert.equal(migrated.id, old.id)
assert.deepEqual(independent.independentPointLayer(migrated), migrated, 'Migration is idempotent')
assert.equal(independent.independentImport({...importedLayers[0], shareId: 'legacy'}).shareId, undefined)
const oldPoint = {id:'p',name:'Lokaal',notes:'Mijn wijzigingen',coordinates:[1,2]}
const remotePoint = {...oldPoint,notes:'Wijzigingen ontvanger'}
assert.deepEqual(independent.recoverLegacyPoints([{points:[oldPoint]}],[oldPoint],'share'),[])
const recovered = independent.recoverLegacyPoints([{points:[oldPoint]}],[remotePoint],'share')
assert.equal(recovered.length,1)
assert.equal(recovered[0].notes,remotePoint.notes)
assert.notEqual(recovered[0].id,oldPoint.id,'Conflicting legacy edits must both survive')
assert.deepEqual(independent.recoverLegacyPoints([{points:[oldPoint,...recovered]}],[remotePoint],'share'),[])

const popupHtml = popupModule.formatImportedLayerPopup({
  layerName: 'Vondsten en locaties',
  layerColor: '#8b5cf6',
  importedGeometryGroup: 'points',
  layerPopupConfig: { titleField: 'naam', hiddenFields: [], showTechnicalFields: false },
  naam: 'Keltische drachme',
  telefoon: '06 12345678',
})
assert.match(popupHtml, /^<strong>Vondsten en locaties<\/strong>/)
assert.match(popupHtml, /<strong style="color:#8b5cf6">Keltische drachme<\/strong>/)
assert.match(popupHtml, /Telefoonnummer:<\/span> <a href="tel:0612345678"/)
assert.ok(
  popupHtml.indexOf('Vondsten en locaties') < popupHtml.indexOf('Keltische drachme'),
  'Laagnaam moet vóór objectnaam staan',
)

const cleanup = cleanupModule.reconcilePointLayerDeletions([
  { id: 'default-vondsten', name: 'Mijn vondsten' },
  { id: 'vakantie', name: 'Vakantie Frankrijk 2026' },
  { id: 'haaien', name: 'Haaientanden zoeken' },
  { id: 'test', name: 'Testlaag om te archiveren' },
  { id: 'keep', name: 'Toestemming' },
], [], 0)
assert.deepEqual(cleanup.layers.map(layer => layer.name), ['Toestemming'])
assert.deepEqual(new Set(cleanup.deletedLayerIds), new Set([
  'default-vondsten', 'vakantie', 'haaien', 'test',
]))

const afterCleanup = cleanupModule.reconcilePointLayerDeletions([
  ...cleanup.layers,
  { id: 'later', name: 'Vakantie Frankrijk 2026' },
  { id: 'vakantie', name: 'Vakantie Frankrijk 2026' },
], cleanup.deletedLayerIds, cleanup.cleanupVersion)
assert.deepEqual(
  afterCleanup.layers.map(layer => layer.id),
  ['keep', 'later'],
  'Een tombstone houdt de verwijderde laag weg, maar de eenmalige naamopschoning wordt niet herhaald',
)

console.log('Mijn lagen: catalogus, popupvolgorde en blijvende verwijdering zijn goed.')
