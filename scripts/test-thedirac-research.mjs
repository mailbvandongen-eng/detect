import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {resolve,dirname} from 'node:path'
import ts from 'typescript'

const cache=new Map()
function load(path) {
  path=resolve(path.endsWith('.ts')?path:path+'.ts')
  if(cache.has(path))return cache.get(path).exports
  const module={exports:{}};cache.set(path,module)
  const code=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText
  Function('module','exports','require',code)(module,module.exports,id=>{
    if(id.includes('store/customLayerStore'))return {useCustomLayerStore:{getState(){throw new Error('Read-only catalog must never write imports')}}}
    return load(resolve(dirname(path),id))
  })
  return module.exports
}
const {THEDIRAC_RESEARCH_SITES}=load('src/data/thediracResearchSites.ts')
const {THEDIRAC_RESEARCH_EXPANSION}=load('src/data/thediracResearchExpansion.ts')
const {buildFrance2026SeedFeatures}=load('src/utils/france2026Seed.ts')
const {THEDIRAC_CONTEXT_LAYER_NAME,THEDIRAC_LANDSCAPE_FEATURES,THEDIRAC_SOURCE_GUIDES}=load('src/data/thediracLandscapeContext.ts')
const {getThediracPlaceSources}=load('src/utils/thediracPlaceSources.ts')
const {collectPlaces,filterPlaces,placeResearchMetadata,placeSourceUrl,placeExternalMapUrl,getScopedSources}=load('src/utils/placeList.ts')
assert.equal(THEDIRAC_RESEARCH_SITES.length,46)
assert.equal(THEDIRAC_RESEARCH_EXPANSION.length,6)
assert.equal(new Set(THEDIRAC_RESEARCH_SITES.map(s=>s.id)).size,46)
const features=buildFrance2026SeedFeatures();assert.equal(features.length,178)
assert.equal(features.filter(f=>!THEDIRAC_RESEARCH_EXPANSION.some(s=>f.properties.detectSeedId===`archeologie:${s.id}`)).length,172,'All previous vacation records remain in the catalog')
for(const s of THEDIRAC_RESEARCH_EXPANSION){assert.ok(s.sourceUrl.startsWith('https://'));assert.ok(s.descriptionNl);assert.ok(s.locationNoteNl);assert.ok(Number.isFinite(s.lon)&&Number.isFinite(s.lat))}
assert.equal(THEDIRAC_RESEARCH_EXPANSION.filter(s=>s.locationQuality==='approximate').length,5)
const sources=getThediracPlaceSources({[THEDIRAC_CONTEXT_LAYER_NAME]:true}),entries=collectPlaces(sources)
for(const e of entries.filter(e=>e.properties.bronvermelding!==true)){assert.ok(e.coordinates,`Map coordinates: ${e.name}`);assert.ok(e.coordinates.every(Number.isFinite));assert.ok(Math.abs(e.coordinates[0])<=180&&Math.abs(e.coordinates[1])<=90)}
assert.equal(entries.length,187);assert.equal(entries.filter(e=>e.category==='Bron & kaart').length,6)
assert.equal(getScopedSources(sources,'visible',[]).length,1)
const context=sources.at(-1);assert.equal(context.entries.length,9)
assert.equal(getScopedSources(sources,'preset:p',[{id:'p',layers:[THEDIRAC_CONTEXT_LAYER_NAME]}])[0].entries.length,9)
const options={query:'',layer:'',category:'',sort:'name',gps:null}
const steentijd=filterPlaces(entries,{...options,period:'Steentijd'});assert.ok(steentijd.some(e=>e.name.includes('Secades')))
assert.ok(steentijd.every(e=>placeResearchMetadata(e).periods.includes('Steentijd')))
assert.ok(filterPlaces(entries,{...options,period:'Romeins'}).some(e=>e.name.includes('Catus')))
assert.ok(filterPlaces(entries,{...options,period:'IJzertijd / Keltisch'}).some(e=>e.name.includes('Uzech')))
assert.equal(filterPlaces(entries,{...options,evidence:'Landschappelijke aanwijzing'}).length,3)
assert.equal(filterPlaces(entries,{...options,evidence:'Bron & kaart'}).length,6)
assert.ok(filterPlaces(entries,{...options,precision:'Globale positie'}).some(e=>e.name.includes('Roc de Combe')))
assert.equal(filterPlaces(entries,{...options,precision:'Externe kaart'}).length,3)
assert.equal(filterPlaces(entries,{...options,precision:'Bron zonder kaartpunt'}).length,3)
assert.ok(filterPlaces(entries,{...options,query:'Maury Secades'}).some(e=>e.name.includes('biface')))
assert.ok(filterPlaces(entries,{...options,extent:[1.16,44.56,1.17,44.57]}).some(e=>e.name.startsWith('Bouriane')),'Overlapping context area remains listed even when its centre is outside the map')
for(const f of THEDIRAC_LANDSCAPE_FEATURES){assert.equal(f.geometry.type,'Polygon');assert.equal(f.properties.locatienauwkeurigheid,'schematic');assert.match(f.properties.locatienotitie,/niet archeologisch onderzocht/)}
for(const guide of THEDIRAC_SOURCE_GUIDES){const e=entries.find(e=>e.id.endsWith(`guide:${guide.id}`));assert.equal(e.coordinates,null);assert.ok(placeSourceUrl(e))}
assert.equal(placeSourceUrl({...entries[0],properties:{link:'javascript:alert(1)'}}),null)
assert.equal(placeExternalMapUrl({...entries[0],properties:{kaartlink:'javascript:alert(1)'}}),null)
const atlas=entries.find(e=>e.id.endsWith('guide:atlas'));assert.equal(placeExternalMapUrl(atlas),'http://atlas.patrimoines.culture.fr/atlas/trunk/');assert.ok(placeSourceUrl(atlas).startsWith('https://www.culture.gouv.fr/'))
assert.ok(placeSourceUrl({...entries[0],properties:{link:'https://www.onf.fr/vivre-la-foret/que-faire-en-foret/balade-activites-en-foret/%2B/c0e%3A%3Aforet-de-gresigne-ou-lexcursion-dans-la-plus-grande-chenaie-du-sud-de-la-france.html'}}).startsWith('https://www.onf.fr/onf/'))
const before=JSON.stringify(sources);filterPlaces(entries,{...options,period:'Steentijd',evidence:'Gepubliceerd'});assert.equal(JSON.stringify(sources),before)
console.log('Thédirac: 172 preserved + 6 new sites + 3 schematic contexts + 6 source guides; period/evidence/precision filters, area intersection and safe links passed.')
