import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {resolve} from 'node:path'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react'
const require=createRequire(process.env.BUDDY_BROWSER_MODULE_ROOT?process.env.BUDDY_BROWSER_MODULE_ROOT+'/package.json':import.meta.url)
const {webkit,devices}=require('playwright')
const names=['Luchtfoto · 1950–1965','IGN-kaart · 1950','État-major · 1820–1866','Napoleontisch kadaster · Lot (archief)']
const fixtureId=resolve('history-fixture.jsx')
const fixture=`
import React from 'react';import {createRoot} from 'react-dom/client';import Map from 'ol/Map';import View from 'ol/View';import {fromLonLat} from 'ol/proj';
import {FranceResearchLayers} from '/src/components/LayerControl/FranceResearchLayers';import {FRANCE_RESEARCH_FACTORIES as factories} from '/src/layers/franceResearchOL';import {usePresetStore as presets,normalizePresetCollection,captureCurrentPresetSnapshot} from '/src/store/presetStore';import {useLayerStore as layers} from '/src/store/layerStore';import {useMapStore as maps} from '/src/store/mapStore';import {getActiveOpacityLayers} from '/src/utils/opacityLayers';import {Popup} from '/src/components/Map/Popup';import '/src/style.css';
import '/node_modules/ol/ol.css';
const map=new Map({target:'map',layers:[],view:new View({center:fromLonLat([1.3252,44.5969]),zoom:13}),controls:[]});maps.setState({map});
window.test={map,presets,layers,normalizePresetCollection,captureCurrentPresetSnapshot,factories,getActiveOpacityLayers};createRoot(document.getElementById('root')).render(<><div id="controls" style={{position:'absolute',top:0,left:0,width:300,maxWidth:'100%',background:'white',maxHeight:'90vh',overflow:'auto'}}><FranceResearchLayers/></div><Popup/></>);
`
const server=await createServer({configFile:false,optimizeDeps:{noDiscovery:true,entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','zustand/middleware/immer','immer','lucide-react','firebase/app','firebase/auth','firebase/firestore','ol/proj']},server:{host:'127.0.0.1',port:0},plugins:[{name:'history-fixture',enforce:'pre',resolveId(id){if(id.includes('lib/firebase'))return '\0history-firebase';if(id==='/history-fixture.jsx')return fixtureId},load(id){if(id==='\0history-firebase')return 'export const auth={currentUser:null};export const db={};export const googleProvider={};';if(id===fixtureId)return fixture},configureServer(s){s.middlewares.use('/history-test',async(_,res)=>{res.setHeader('Content-Type','text/html');res.end(await s.transformIndexHtml('/history-test','<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><div id="map" style="position:fixed;inset:0"></div><div id="root"></div><script type="module" src="/history-fixture.jsx"></script></body></html>'))})}},react()]})
await server.listen();let browser
try {
 browser=await webkit.launch({headless:true})
 for(const device of [devices['iPhone 13'],{viewport:{width:1365,height:900}}]){
  const context=await browser.newContext(device),page=await context.newPage(),errors=[];page.setDefaultTimeout(15000)
  page.on('pageerror',e=>errors.push(e.message))
  await page.route('https://**/*',route=>route.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==','base64'),headers:{'access-control-allow-origin':'*'}}))
  await page.addInitScript(()=>localStorage.setItem('detectorapp-presets',JSON.stringify({version:32,state:{presets:[{id:'thedirac-2026',name:'Mijn Thedirac',icon:'Compass',isBuiltIn:true,cassiniAdded:true,layers:['Carte de Cassini · 18e eeuw'],baseLayer:'Hybride (wereld)',layerStates:{'Carte de Cassini · 18e eeuw':{visible:true,opacity:.42},'Oude bossen · Forêts anciennes':{visible:false,opacity:.27}},layerOpacities:{'Carte de Cassini · 18e eeuw':.42,'Oude bossen · Forêts anciennes':.27},customLayerStates:{'point:own':{visible:true,opacity:1}},mapView:null}],customDefaults:null,updatedAt:123}})))
  await page.goto(server.resolvedUrls.local[0]+'history-test');await page.waitForFunction(()=>window.test)
  assert.equal(await page.evaluate(names=>{
   const t=window.test,p=t.presets.getState().presets.find(p=>p.id==='thedirac-2026');
   if(p.name!=='Mijn Thedirac'||p.mapView!==null||p.layerStates['Oude bossen · Forêts anciennes'].visible||p.layerStates['Carte de Cassini · 18e eeuw'].opacity!==.42||!p.customLayerStates['point:own'].visible)throw Error('Existing choices changed');
   for(const name of names)if(p.layerStates[name].visible!==(name==='Carte de Cassini · 18e eeuw')||p.layers.filter(n=>n===name).length!==1)throw Error('Historical layer migration mismatch '+name);
   t.presets.getState().applyPreset(p.id);return JSON.parse(localStorage.getItem('detectorapp-presets')).version
  },names),33)
  await page.waitForFunction(names=>names.every(n=>window.test.layers.getState().layers[n]),names)
  assert.equal(await page.evaluate(()=>window.test.layers.getState().layers['Carte de Cassini · 18e eeuw'].getVisible()),true)
  assert.equal(await page.evaluate(()=>window.test.layers.getState().layers['Luchtfoto · 1950–1965'].getVisible()),false)
  const config=await page.evaluate(names=>names.slice(0,3).map(n=>{const l=window.test.layers.getState().layers[n],s=l.getSource();return {max:s.getTileGrid().getMaxZoom(),min:s.getTileGrid().getMinZoom(),url:s.getUrls()[0],z:l.getZIndex()}}),names)
  for(const [i,matrix,max,min] of [[0,'PM_0_18',18,0],[1,'PM_3_15',15,3],[2,'PM_6_15',15,6]]){assert.ok(config[i].url.includes('TILEMATRIXSET='+matrix));assert.equal(config[i].max,max);assert.equal(config[i].min,min)}
  assert.ok(config[0].z>config[1].z&&config[1].z>config[2].z)
  for(const name of names){
   const button=page.getByRole('button',{name:new RegExp('^'+name.split(' · ')[0])});const press=()=>device.hasTouch?button.tap():button.click();await press();assert.equal(await page.evaluate(n=>window.test.layers.getState().visible[n],name),false);await press();
   assert.equal(await page.evaluate(n=>{const t=window.test,s=t.layers.getState();if(!t.getActiveOpacityLayers(s.visible,s.opacity,s.layers,[]).some(l=>l.name===n))throw Error('Missing slider');s.setLayerOpacity(n,.33);return s.layers[n].getOpacity()},name),.33)
  }
  // Verify real map hit detection and the existing details popup for an archive point.
  await page.evaluate(name=>{const t=window.test,l=t.layers.getState().layers[name],f=l.getSource().getFeatureById('cadastre-archive:46316');if(l.getSource().getFeatures().length!==312)throw Error('Municipal catalog incomplete');document.getElementById('controls').style.display='none';t.map.getView().setCenter(f.getGeometry().getCoordinates());t.map.getView().setZoom(14);t.map.renderSync();const pixel=t.map.getPixelFromCoordinate(f.getGeometry().getCoordinates());if(!t.map.getFeaturesAtPixel(pixel,{hitTolerance:4}).includes(f))throw Error('Archive point not tappable');t.map.dispatchEvent({type:'singleclick',pixel,coordinate:f.getGeometry().getCoordinates(),originalEvent:{pointerType:'touch'}})},names[3])
  const preview=page.locator('[data-map-preview]');await preview.waitFor();await preview.getByRole('button',{name:'Details bekijken'}).click();const details=page.locator('[data-map-details]');await details.waitFor();assert.match(await details.innerText(),/Thédirac/);assert.match(await details.innerText(),/gemeentemiddelpunt/i);assert.ok(await details.locator('a[href="https://archives.lot.fr/recherche-en-ligne/archives-numerisees"]').count()>0)
  await page.evaluate(async names=>{const t=window.test;for(const name of names)t.layers.getState().setLayerVisibility(name,false);t.presets.getState().updatePreset('thedirac-2026',t.captureCurrentPresetSnapshot());await t.presets.persist.rehydrate();const p=t.normalizePresetCollection(t.presets.getState().presets).find(p=>p.id==='thedirac-2026');if(!p.historicalMapsAdded||names.some(n=>p.layers.includes(n)||p.layerStates[n].visible))throw Error('Removed layer restored')},names)
  assert.deepEqual(errors,[]);await context.close();console.log('History passed:',device.viewport.width,'migration, original choices, tile settings, toggles, transparency, archive map hit/popup/link and saved removal')
 }
}finally{await browser?.close();await server.close()}
