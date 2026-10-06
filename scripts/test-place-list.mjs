import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import ts from 'typescript'
const module={exports:{}}
Function('module','exports',ts.transpileModule(readFileSync('src/utils/placeList.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(module,module.exports)
const {buildPersonalPlaceSources,collectPlaces,getScopedSources,filterPlaces,placeCoordinates,distanceToPlace,featurePlaceEntry}=module.exports
const point=(id,name,coordinates=[1,44])=>({id,name,coordinates,category:'Fossiel',notes:'Bij de beek',status:'todo',createdAt:'2026-10-05'})
const layers=[{id:'a',name:'Reis',color:'#123456',visible:false,archived:false,points:[point('one','Ákker 2')]},{id:'b',buddyLayerId:'shared',buddyRole:'read',name:'Reis',color:'#654321',visible:true,archived:false,points:[point('one','Akker 10',[2,44])]},{id:'archive',name:'Archief',points:[],archived:true}]
const imports=[{id:'i',name:'Import',visible:true,color:'#112233',contentHash:'hash-i',style:{points:{color:'#abcdef'}},popupConfig:{titleField:'custom_name'},features:{features:[{type:'Feature',geometry:{type:'Point',coordinates:[1.2,44]},properties:{custom_name:'Eigen titel',description:'<p>beek</p>'}},{type:'Feature',geometry:{type:'Polygon',coordinates:[[[1,44],[2,44],[2,45],[1,44]]]},properties:{naam:'Vlak'}}]}}]
const sources=buildPersonalPlaceSources(layers,imports)
assert.equal(sources.length,3);assert.equal(sources[0].entries[0].editable,true);assert.equal(sources[1].entries[0].editable,false);assert.equal(sources[2].entries[0].name,'Eigen titel');assert.equal(sources[2].entries[0].color,'#abcdef');assert.equal(sources[2].entries[0].editable,false)
assert.equal(new Set(collectPlaces(sources).map(e=>e.id)).size,4,'Same layer and point names keep separate identities')
const presets=[{id:'p',name:'Preset',layers:['LiDAR'],customLayerStates:{'point:a':{visible:true},'buddy:shared':{visible:false},'hash:hash-i':{visible:true}}}]
assert.deepEqual(getScopedSources(sources,'preset:p',presets).map(s=>s.key),['point:a','imported:i']);assert.equal(getScopedSources(sources,'visible',presets).length,2);assert.equal(getScopedSources(sources,'point:b',presets).length,1);assert.equal(getScopedSources(sources,'preset:missing',presets).length,0)
const entries=collectPlaces(sources),options={query:'akker beek',layer:'',category:'',sort:'name',gps:null}
assert.deepEqual(filterPlaces(entries,options).map(e=>e.name),['Ákker 2','Akker 10']);assert.equal(filterPlaces(entries,{...options,layer:'point:b'}).length,1);assert.equal(filterPlaces(entries,{...options,query:'',extent:[.9,43,1.1,44.1]}).length,2);assert.equal(filterPlaces(entries,{...options,query:'',sort:'distance',gps:{lng:1.2,lat:44}})[0].name,'Eigen titel')
assert.deepEqual(placeCoordinates(imports[0].features.features[1].geometry),[1.5,44.5]);assert.equal(placeCoordinates({type:'Point',coordinates:[Infinity,44]}),null);assert.equal(placeCoordinates({type:'Point',coordinates:[1,100]}),null);assert.equal(distanceToPlace([1,44],{lng:1,lat:44}),0)
const builtin={key:'builtin:Places',name:'Places',kind:'builtin',snapshotKey:'Places',visible:true,color:'#123456'}
const seeded={type:'Feature',geometry:{type:'Point',coordinates:[1,44]},properties:{naam:'Seed',detectSeedId:'one'}}
const seedEntry=featurePlaceEntry(seeded,builtin,0)
const seedSources=[{...builtin,entries:[seedEntry]},{...sources[2],entries:[{...seedEntry,id:'imported:i:seed'}]}]
assert.equal(collectPlaces(seedSources).length,1);assert.equal(collectPlaces(seedSources)[0].id,'imported:i:seed')
assert.equal(getScopedSources([{...builtin,entries:[]}],'preset:p',[{id:'p',layers:['Places'],layerStates:{Places:{visible:false}}}]).length,0)
const before=JSON.stringify({layers,imports,presets});getScopedSources(sources,'preset:p',presets);filterPlaces(entries,options);assert.equal(JSON.stringify({layers,imports,presets}),before,'Listing never changes data, visibility or preset snapshots')
console.log('Place list: identities, read-only permissions, preset snapshots/buddies/hashes, search, filters, GPS sort, geometries, seed deduplication and no mutations passed.')
