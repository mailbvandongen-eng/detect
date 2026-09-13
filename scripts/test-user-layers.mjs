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
assert.deepEqual(catalog.map(item => item.name), [
  'Losse punten',
  'Bewaarde punten',
  'Vondsten en locaties',
])
assert.deepEqual(catalog.map(item => item.target.kind), ['point', 'point', 'imported'])
assert.equal(catalog.at(-1).objectCount, 4, 'Import en gekoppelde handpunten tellen samen')
assert.equal(catalog.some(item => item.name === 'Import-overlay'), false, 'Overlay krijgt geen dubbele rij')

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

console.log('Mijn lagen: catalogus, overlay en popupvolgorde zijn goed.')
