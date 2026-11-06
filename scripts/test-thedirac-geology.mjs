import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

// Lokale BD Charm-50-uitsnede: eenheid opzoeken bij een tik en legenda tonen.
const data = JSON.parse(readFileSync('public/data/thedirac_geologie_brgm.json', 'utf8'))
globalThis.fetch = async () => ({ ok: true, json: async () => data })
const source = ts.transpileModule(readFileSync('src/utils/thediracGeology.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ES2020, target: ts.ScriptTarget.ES2020 },
}).outputText
const geology = await import('data:text/javascript,' + encodeURIComponent(source))

assert.ok(data.legend.length > 20, 'Legenda met eenheden aanwezig')
assert.ok(data.legend.every(unit => /^#[0-9a-f]{6}$/.test(unit.color) && unit.notation && unit.descr), 'Elke eenheid heeft kleur, code en omschrijving')
const first = data.features[0].geometry
const ring = first.type === 'Polygon' ? first.coordinates[0] : first.coordinates[0][0]
// Zwaartepunt van een driehoek uit opeenvolgende hoekpunten ligt meestal binnen; zoek een punt dat raak is.
let hit = null
for (let i = 0; i < ring.length - 2 && !hit; i++) {
  const lon = (ring[0][0] + ring[i + 1][0] + ring[i + 2][0]) / 3
  const lat = (ring[0][1] + ring[i + 1][1] + ring[i + 2][1]) / 3
  hit = await geology.findThediracGeologyUnit(lon, lat)
}
assert.ok(hit, 'Een punt in het gebied levert een eenheid op')
assert.equal(await geology.findThediracGeologyUnit(5.3, 52.0), null, 'Buiten het gebied geen eenheid')
const html = geology.formatThediracGeologyPopup(hit.unit, hit.legend, 'https://infoterre.brgm.fr/')
assert.ok(html.includes(hit.unit.notation) && html.includes('Legenda van het gebied'))
const thedirac = await geology.findThediracGeologyUnit(1.34, 44.625)
console.log(`Geologie Thédirac: ${data.features.length} vlakken, ${data.legend.length} eenheden; Thédirac zelf = ${thedirac?.unit.notation} (${thedirac?.unit.descr.slice(0, 60)})`)
