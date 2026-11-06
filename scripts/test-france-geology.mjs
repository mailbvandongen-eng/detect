import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

// Lokale BD Charm-50-data: eenheid opzoeken bij een tik en legenda tonen.
globalThis.fetch = async url => {
  try {
    const text = readFileSync(String(url).replace('./data/', 'public/data/'), 'utf8')
    return { ok: true, status: 200, json: async () => JSON.parse(text) }
  } catch {
    return { ok: false, status: 404, json: async () => null }
  }
}
const source = ts.transpileModule(readFileSync('src/utils/franceGeology.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ES2020, target: ts.ScriptTarget.ES2020 },
}).outputText
const geology = await import('data:text/javascript,' + encodeURIComponent(source))

const index = JSON.parse(readFileSync('public/data/geologie_fr/index.json', 'utf8'))
for (const dept of ['024', '046', '047']) {
  assert.ok(index.departments.some(d => d.dept === dept), `Departement ${dept} aanwezig`)
  const legend = JSON.parse(readFileSync(`public/data/geologie_fr/${dept}/legend.json`, 'utf8'))
  assert.ok(legend.every(unit => /^#[0-9a-f]{6}$/.test(unit.color) && unit.notation && unit.descr), `${dept}: elke eenheid heeft kleur, code en omschrijving`)
}

const places = { Bergerac: [0.4833, 44.8536], Thédirac: [1.34, 44.625], 'Les Eyzies': [1.0145, 44.9378], Villeneuve: [0.7056, 44.4081] }
for (const [name, [lon, lat]] of Object.entries(places)) {
  const hit = await geology.findGeologyUnit(lon, lat)
  assert.ok(hit, `${name}: eenheid gevonden`)
  const html = geology.formatGeologyPopup(hit.unit, hit.legend, hit.dept, 'https://infoterre.brgm.fr/')
  assert.ok(html.includes('Legenda departement'))
  console.log(`  ${name} (${hit.dept}): ${hit.unit.notation} — ${hit.unit.descr.slice(0, 70)}`)
}
assert.equal(await geology.findGeologyUnit(5.3, 52.0), null, 'Buiten de departementen geen eenheid')
console.log('Geologie Frankrijk: Dordogne, Lot en Lot-et-Garonne met eenheid en legenda per tik.')
