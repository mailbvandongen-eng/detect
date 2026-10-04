import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
function load(path) {
  const module = { exports: {} }
  const js = ts.transpileModule(readFileSync(path,'utf8'), { compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022} }).outputText
  Function('module','exports',js)(module,module.exports)
  return module.exports
}
const {refreshAppSafely,isAppCodeCache}=load('src/utils/appMaintenance.ts')
const scope='https://detectapp.nl/'
const appCache=`workbox-precache-v2-${scope}`
let count=0
const pass=name=>{count++;console.log('PASS '+name)}
const make=()=>{
  const events=[]
  return {events,actions:{scope,online:true,repair:true,
    assertIdle:()=>events.push('guard'),verifyNetwork:async()=>events.push('network'),update:async()=>events.push('update'),
    registrations:async()=>[{scope,unregister:async()=>{events.push('unregister');return true}},{scope:scope+'other/',unregister:async()=>{throw Error('Other app must survive')}}],
    cacheNames:async()=>[appCache,'geojson-data','osm-tiles','esri-basemap-tiles',`workbox-precache-v2-${scope}other/`],
    deleteCache:async name=>{events.push(name);return true},reload:()=>events.push('reload'),
  }}
}
let test=make();await refreshAppSafely(test.actions)
assert.deepEqual(test.events.filter(e=>e.startsWith('workbox')),[appCache])
assert.equal(test.events.at(-1),'reload')
assert.equal(test.events.filter(e=>e==='reload').length,1)
assert.ok(test.events.indexOf('network')<test.events.indexOf('unregister'))
pass('Repair replaces only this app precache and registration, after network verification, with one reload')
for(const scenario of ['offline','network','busy','unregister']) {
 test=make()
 if(scenario==='offline')test.actions.online=false
 if(scenario==='network')test.actions.verifyNetwork=async()=>{throw Error('no network')}
 if(scenario==='busy')test.actions.assertIdle=()=>{throw Error('recording')}
 if(scenario==='unregister')test.actions.registrations=async()=>[{scope,unregister:async()=>false}]
 await assert.rejects(refreshAppSafely(test.actions))
 assert.ok(!test.events.includes(appCache)&&!test.events.includes('reload'))
}
pass('Offline, unreachable server, active work and failed unregister preserve cache and prevent reload')
test=make();test.actions.repair=false;await refreshAppSafely(test.actions)
assert.ok(test.events.includes('update'))
assert.ok(!test.events.includes('unregister')&&!test.events.includes(appCache))
pass('Normal renew applies update without deleting any cache')
test=make();test.actions.repair=false;test.actions.update=async()=>{test.actions.assertIdle=()=>{throw Error('route started')}}
await assert.rejects(refreshAppSafely(test.actions));assert.ok(!test.events.includes('reload'))
pass('Work started during update also prevents reload')
assert.equal(isAppCodeCache('workbox-precache-v2-'+scope+'other/',scope),false)
const changes=load('src/data/changelog.ts')
const entries=new Map()
globalThis.window={localStorage:{getItem:key=>entries.get(key)||null,setItem:(key,value)=>entries.set(key,value)}}
assert.equal(changes.hasSeenChangeLog('new'),false)
changes.markChangeLogSeen('new');assert.equal(changes.hasSeenChangeLog('new'),true)
assert.equal(load('src/data/changelog.ts').hasSeenChangeLog('new'),true)
entries.set('detect-last-seen-version','older-tab')
assert.equal(load('src/data/changelog.ts').hasSeenChangeLog('new'),true,'Old tab cannot reset a newer version acknowledgement')
window.localStorage.setItem=()=>{throw Error('quota')}
changes.markChangeLogSeen('quota');assert.equal(changes.hasSeenChangeLog('quota'),true)
pass('Seen version survives restart and does not repeat in-session when storage is blocked')
console.log(`${count} app maintenance checks passed`)
