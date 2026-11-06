import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, relative, resolve } from 'node:path'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const moduleCache = new Map()
function loadModule(path) {
  const filename = resolve(process.cwd(), path)
  if (moduleCache.has(filename)) return moduleCache.get(filename).exports
  const module = { exports: {} }
  moduleCache.set(filename, module)
  const output = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const nodeRequire = createRequire(filename)
  const sourceRequire = specifier => {
    if (!specifier.startsWith('.')) return nodeRequire(specifier)
    const base = resolve(dirname(filename), specifier)
    for (const candidate of [`${base}.ts`, `${base}.tsx`, resolve(base, 'index.ts'), resolve(base, 'index.tsx')]) {
      if (existsSync(candidate)) return loadModule(relative(process.cwd(), candidate))
    }
    return nodeRequire(specifier)
  }
  Function('module', 'exports', 'require', output)(module, module.exports, sourceRequire)
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

const layout = loadModule('src/config/controlLayout.ts')
const seen = new Set()
for (const ids of Object.values(layout.CONTROL_LAYOUT)) for (const id of ids) {
  assert.equal(seen.has(id), false, `Knop ${id} staat maar op één plek in het schema`)
  seen.add(id)
}
const shown = new Set(['menu', 'layers', 'measure', 'print', 'reset', 'presets', 'gps', 'timeTravel', 'route'])
assert.equal(layout.getControlPosition('print', shown).top, layout.getControlPosition('draw', new Set(['measure'])).top, 'Verborgen tekenknop laat geen gat: export schuift op')
assert.equal(layout.getControlPosition('timeTravel', shown).bottom, '56px', 'Jaarkeuze sluit direct aan op GPS als transparantie ontbreekt')
assert.equal(layout.getControlPosition('route', shown).right, '56px', 'Route schuift naar de vrije plek naast GPS')
shown.add('vondst')
assert.equal(layout.getControlPosition('route', shown).right, '104px', 'Een extra knop schuift de rest door')
assert.equal(layout.getControlPosition('gps', shown).right, '8px')
assert.equal(layout.getControlPosition('gps', shown).bottom, '8px', 'GPS staat in de hoek nu de zoomknoppen weg zijn')
const compassShown = new Set(['menu', 'layers', 'compass'])
assert.equal(layout.getControlPosition('layers', compassShown).top, layout.getControlPosition('layers', new Set(['menu'])).top, 'Kompas verschuift de lagenknop niet')

const { buildDefaultVisibility } = loadModule('src/store/layerStore.ts')
const { layerRegistry } = loadModule('src/layers/layerRegistry.ts')
const { FRANCE_RESEARCH_LAYER_DEFINITIONS } = loadModule('src/config/franceResearchLayers.ts')
const defaults = buildDefaultVisibility()
for (const name of [...Object.keys(layerRegistry), ...FRANCE_RESEARCH_LAYER_DEFINITIONS.map(layer => layer.name)]) {
  assert.equal(defaults[name], false, `Nieuwe laag ${name} start automatisch uit`)
}
assert.equal(defaults['Esri (licht)'], true)
assert.equal(Object.keys(defaults).some(name => name.includes('Ã')), false, 'Geen kapotte laagnamen')

const { getStackZIndex } = loadModule('src/config/layerOrder.ts')
for (const name of ['Geomorfologie', 'AHN4 Hillshade Kleur', 'AHN4 Multi-Hillshade NL', 'AHN4 Hoogtekaart Kleur']) {
  assert.ok(layerRegistry[name], `${name} bestaat in het register`)
}
assert.ok(getStackZIndex('Geomorfologie') > getStackZIndex('AHN4 Hillshade Kleur'), 'Geomorfologie ligt boven Hillshade Kleur')
assert.ok(getStackZIndex('AHN4 Hillshade Kleur') > getStackZIndex('AHN4 Multi-Hillshade NL'))
assert.ok(getStackZIndex('Geomorfologie') < 10, 'Vlakken blijven onder AMK (z 10)')
assert.ok(getStackZIndex('TMK 1850') > 0, 'Historische kaart blijft boven de basiskaart')
const ordered = getActiveOpacityLayers(
  { 'AHN4 Hillshade Kleur': true, 'Geomorfologie': true, 'AHN4 Multi-Hillshade NL': true, 'AMK Monumenten': true },
  { 'AHN4 Hillshade Kleur': 0.6, 'Geomorfologie': 0.6, 'AHN4 Multi-Hillshade NL': 0.3 },
  { 'AMK Monumenten': { getOpacity: () => 0.6, getZIndex: () => 10 } },
).map(layer => layer.name)
assert.deepEqual(ordered, ['AMK Monumenten', 'Geomorfologie', 'AHN4 Hillshade Kleur', 'AHN4 Multi-Hillshade NL'], 'Regelaar volgt de kaartvolgorde, bovenste eerst')
console.log('Kaartbediening: complete lagenlijst, import-ID’s, nul-opacity, één-venster-regel en knoppenschema zonder gaten goed.')
