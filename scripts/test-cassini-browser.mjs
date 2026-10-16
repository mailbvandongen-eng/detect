import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {resolve} from 'node:path'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react'
const require=createRequire(process.env.BUDDY_BROWSER_MODULE_ROOT?process.env.BUDDY_BROWSER_MODULE_ROOT+'/package.json':import.meta.url)
const {webkit,devices}=require('playwright')
const name='Carte de Cassini · 18e eeuw'
const fixtureId=resolve('cassini-fixture.jsx')
const fixture=`
import React from 'react';import {createRoot} from 'react-dom/client';import Map from 'ol/Map';import View from 'ol/View';import {fromLonLat} from 'ol/proj';
import {FranceResearchLayers} from '/src/components/LayerControl/FranceResearchLayers';import {createFranceCassiniLayerOL} from '/src/layers/franceResearchOL';import {usePresetStore as presets,normalizePresetCollection,captureCurrentPresetSnapshot} from '/src/store/presetStore';import {useLayerStore as layers} from '/src/store/layerStore';import {useMapStore as maps} from '/src/store/mapStore';import {getActiveOpacityLayers} from '/src/utils/opacityLayers';
import '/node_modules/ol/ol.css';
const map=new Map({target:'map',layers:[],view:new View({center:fromLonLat([1.34,44.625]),zoom:12}),controls:[]});maps.setState({map});
window.test={map,presets,layers,normalizePresetCollection,captureCurrentPresetSnapshot,createFranceCassiniLayerOL,getActiveOpacityLayers};createRoot(document.getElementById('root')).render(<FranceResearchLayers/>);
`
const server=await createServer({configFile:false,optimizeDeps:{noDiscovery:true,entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','zustand/middleware/immer','immer','lucide-react','firebase/app','firebase/auth','firebase/firestore','ol/proj']},server:{host:'127.0.0.1',port:0},plugins:[{name:'cassini-fixture',enforce:'pre',resolveId(id){if(id.includes('lib/firebase'))return '\0cassini-firebase';if(id==='/cassini-fixture.jsx')return fixtureId},load(id){if(id==='\0cassini-firebase')return 'export const auth={currentUser:null};export const db={};export const googleProvider={};';if(id===fixtureId)return fixture},configureServer(s){s.middlewares.use('/cassini-test',async(_,res)=>{res.setHeader('Content-Type','text/html');res.end(await s.transformIndexHtml('/cassini-test','<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><div id="map" style="position:fixed;inset:0"></div><div id="root" style="position:absolute;top:0;left:0;width:320px;max-width:100%;background:#fff;font:14px sans-serif"></div><script type="module" src="/cassini-fixture.jsx"></script></body></html>'))})}},react()]})
await server.listen();let browser
try {
 browser=await webkit.launch({headless:true})
 for(const device of [devices['iPhone 13'],{viewport:{width:1365,height:900}}]){
  const context=await browser.newContext(device),page=await context.newPage(),errors=[]
  page.on('pageerror',e=>errors.push(e.message))
  await page.route('https://**/*',route=>route.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==','base64'),headers:{'access-control-allow-origin':'*'}}))
  await page.addInitScript(()=>localStorage.setItem('detectorapp-presets',JSON.stringify({version:31,state:{presets:[{id:'thedirac-2026',name:'Mijn Thedirac',icon:'Compass',isBuiltIn:true,layers:[],baseLayer:'Hybride (wereld)',layerStates:{'Oude bossen · Forêts anciennes':{visible:false,opacity:.27}},layerOpacities:{'Oude bossen · Forêts anciennes':.27},customLayerStates:{'point:own':{visible:true,opacity:1}},mapView:null}],customDefaults:null,updatedAt:123}})))
  await page.goto(server.resolvedUrls.local[0]+'cassini-test');await page.waitForFunction(()=>window.test)
  assert.deepEqual(await page.evaluate(name=>{
   const t=window.test,p=t.presets.getState().presets.find(p=>p.id==='thedirac-2026');
   if(p.name!=='Mijn Thedirac'||p.mapView!==null||p.layerStates['Oude bossen · Forêts anciennes'].visible!==false||p.layerOpacities['Oude bossen · Forêts anciennes']!==.27||!p.customLayerStates['point:own'].visible)throw Error('Existing preset choices changed')
   t.presets.getState().applyPreset(p.id);return {added:p.cassiniAdded,visible:p.layerStates[name].visible,count:p.layers.filter(n=>n===name).length,version:JSON.parse(localStorage.getItem('detectorapp-presets')).version}
  },name),{added:true,visible:true,count:1,version:33})
  await page.waitForFunction(name=>window.test.layers.getState().layers[name]?.getVisible(),name)
  assert.equal(await page.evaluate(name=>{
   const t=window.test,l=t.layers.getState().layers[name],s=l.getSource();
   if(l.getOpacity()!==.8||s.getTileGrid().getMaxZoom()!==14||!s.getUrls()[0].includes('TILEMATRIXSET=PM_6_14'))throw Error('Cassini tile settings')
   const sliders=t.getActiveOpacityLayers(t.layers.getState().visible,t.layers.getState().opacity,t.layers.getState().layers,[]);if(!sliders.some(s=>s.name===name))throw Error('Missing transparency slider');t.layers.getState().setLayerOpacity(name,.35);return l.getOpacity()
  },name),.35)
  const button=page.getByRole('button',{name:/^Carte de Cassini/});const press=()=>device.hasTouch?button.tap():button.click();await press();assert.equal(await page.evaluate(name=>window.test.layers.getState().visible[name],name),false);await press();assert.equal(await page.evaluate(name=>window.test.layers.getState().layers[name].getOpacity(),name),.35)
  await page.evaluate(name=>{
   const t=window.test;t.layers.getState().setLayerVisibility(name,false);t.presets.getState().updatePreset('thedirac-2026',t.captureCurrentPresetSnapshot());
   const p=t.normalizePresetCollection(t.presets.getState().presets).find(p=>p.id==='thedirac-2026');if(p.layers.includes(name)||p.layerStates[name].visible)throw Error('Removed Cassini restored');
  },name)
  // Reload without overwriting storage: verify one-time migration and saved removal.
  await page.evaluate(async name=>{const t=window.test;await t.presets.persist.rehydrate();const p=t.presets.getState().presets.find(p=>p.id==='thedirac-2026');if(p.layers.includes(name)||!p.cassiniAdded)throw Error('Saved removal lost')},name)
  assert.deepEqual(errors,[]);await context.close();console.log('Cassini passed:',device.viewport.width,'preset migration, preserved selections, tile source, toggle, transparency and saved removal')
 }
}finally{await browser?.close();await server.close()}
