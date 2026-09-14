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

const gesture = loadTypeScriptModule('src/utils/fieldReliability.ts')
assert.equal(gesture.MAP_CLICK_MOVE_TOLERANCE_PX, 3)
assert.equal(gesture.MAP_DRAG_POPUP_SUPPRESSION_MS, 300)

assert.equal(gesture.isMapPopupGestureAllowed({
  now: 1000,
  lastPointerDragAt: Number.NEGATIVE_INFINITY,
  viewInteracting: false,
  viewAnimating: false,
}), true, 'Een rustige tik moet een popup kunnen openen')

assert.equal(gesture.isMapPopupGestureAllowed({
  now: 1000,
  lastPointerDragAt: 750,
  viewInteracting: false,
  viewAnimating: false,
}), false, 'Een tik direct na slepen moet worden genegeerd')

assert.equal(gesture.isMapPopupGestureAllowed({
  now: 1000,
  lastPointerDragAt: 699,
  viewInteracting: false,
  viewAnimating: false,
}), true, 'Na de korte onderdrukking moet een bewuste tik weer werken')

assert.equal(gesture.isMapPopupGestureAllowed({
  now: 1000,
  lastPointerDragAt: 0,
  viewInteracting: true,
  viewAnimating: false,
}), false, 'Tijdens slepen mag geen popup openen')

assert.equal(gesture.isMapPopupGestureAllowed({
  now: 1000,
  lastPointerDragAt: 0,
  viewInteracting: false,
  viewAnimating: true,
}), false, 'Tijdens kinetische kaartbeweging mag geen popup openen')

const popupSource = readFileSync('src/components/Map/Popup.tsx', 'utf8')
assert.match(popupSource, /map\.on\('singleclick', handleClick\)/)
assert.doesNotMatch(popupSource, /map\.on\('click', handleClick\)/)
assert.match(popupSource, /isParcel \|\| hasVisibleParcelLayer/)
assert.match(popupSource, /Opnieuw proberen/)

const parcelSource = readFileSync('src/layers/parcelHighlight.ts', 'utf8')
assert.doesNotMatch(parcelSource, /cacheBuster|Date\.now\(\).*wfsUrl/)
assert.match(parcelSource, /PARCEL_CACHE_KEY/)
assert.match(parcelSource, /FETCH_ATTEMPT_TIMEOUTS_MS = \[8000, 12000\]/)
assert.match(parcelSource, /imageloadend/)
assert.match(parcelSource, /imageloaderror/)

console.log('Veldgebruik: rustige kaartgebaren, hergebruik en foutafhandeling zijn goed.')
