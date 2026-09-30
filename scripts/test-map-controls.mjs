import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import ts from 'typescript'

const require = createRequire(import.meta.url)
function loadModule(path) {
  const output = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const module = { exports: {} }
  Function('module', 'exports', 'require', output)(module, module.exports, require)
  return module.exports
}

const { getActiveOpacityLayers } = loadModule('src/utils/opacityLayers.ts')
const visible = {
  'Hoogtekaart': true, 'Bodemkaart': true, 'AMK': true,
  'AHN4 Multi-Hillshade NL': true, 'Nieuwe analyse': true,
  'Luchtfoto': true, 'Labels Overlay': true, 'Uitgeschakeld': false,
}
const sliders = getActiveOpacityLayers(
  visible,
  { 'Hoogtekaart': 0.2, 'Bodemkaart': 0.6, 'AMK': 0.45, 'AHN4 Multi-Hillshade NL': 0, 'Uitgeschakeld': 0.9 },
  { 'Nieuwe analyse': { getOpacity: () => 0.73 }, 'Labels Overlay': { getOpacity: () => 1 } },
  [
    { id: 'import-1', name: 'Bodemkaart', visible: true, opacity: 0.35 },
    { id: 'import-2', name: 'Verborgen import', visible: false, opacity: 1 },
  ],
)
assert.equal(sliders.length, 6, 'Ook lagen na de eerste drie en zichtbare imports moeten beschikbaar blijven')
assert.equal(sliders.find(layer => layer.name === 'AHN4 Multi-Hillshade NL').opacity, 0, 'Een transparante laag blijft regelbaar')
assert.equal(sliders.find(layer => layer.name === 'Nieuwe analyse').opacity, 0.73, 'Nieuwe geregistreerde lagen hoeven geen handmatige sliderdefinitie')
assert.equal(sliders.find(layer => layer.kind === 'imported').layerKey, 'import-1', 'Imports gebruiken hun eigen ID en store')
assert.equal(new Set(sliders.map(layer => layer.id)).size, sliders.length, 'Gelijke namen mogen geen regelaar delen')
assert.equal(sliders.some(layer => layer.name === 'Luchtfoto' || layer.name === 'Labels Overlay'), false)

const { useUIStore } = loadModule('src/store/uiStore.ts')
const ui = useUIStore.getState()
ui.toggleWindow('timeTravel')
assert.equal(useUIStore.getState().activeWindow, 'timeTravel')
ui.toggleWindow('opacity')
assert.equal(useUIStore.getState().activeWindow, 'opacity', 'Transparantie vervangt de jaarkeuze')
ui.openWindow('layers')
assert.equal(useUIStore.getState().activeWindow, 'layers', 'Andere panelen sluiten ook de compacte bediening')
ui.toggleWindow('timeTravel')
ui.toggleWindow('timeTravel')
assert.equal(useUIStore.getState().activeWindow, null)
console.log('Kaartbediening: complete lagenlijst, import-ID’s, nul-opacity en één-venster-regel goed.')
