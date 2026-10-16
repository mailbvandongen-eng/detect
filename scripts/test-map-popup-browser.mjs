import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
const require=createRequire(process.env.BUDDY_BROWSER_MODULE_ROOT?process.env.BUDDY_BROWSER_MODULE_ROOT+'/package.json':import.meta.url)
const {webkit,devices}=require('playwright')
const fixtureId=resolve('map-points-fixture.jsx')
const fixture=`
import React from 'react';import {createRoot} from 'react-dom/client';import Map from 'ol/Map';import View from 'ol/View';import Circle from 'ol/style/Circle';import {fromLonLat} from 'ol/proj';
import {createKnownThediracSitesLayerOL} from '/src/layers/franceResearchOL';import {createThediracSightsLayerOL} from '/src/layers/thediracSightsOL';import {createThediracMineralsLayerOL,createThediracFossilsLayerOL} from '/src/layers/thediracGeologySitesOL';import {LAYER_STYLES} from '/src/layers/iconStyles';
import {Popup} from '/src/components/Map/Popup';import '/src/style.css';import {CustomPointMarkers} from '/src/components/CustomPoints/CustomPointMarkers';import {CustomLayerMarkers} from '/src/components/CustomLayers/CustomLayerMarkers';import {LocalVondstMarkers} from '/src/components/Vondst/LocalVondstMarkers';import {useMapStore as maps} from '/src/store/mapStore';import {useCustomPointLayerStore as points} from '/src/store/customPointLayerStore';import {useCustomLayerStore as imports} from '/src/store/customLayerStore';
import Feature from 'ol/Feature';import Point from 'ol/geom/Point';import Polygon from 'ol/geom/Polygon';import VectorSource from 'ol/source/Vector';import VectorLayer from 'ol/layer/Vector';import TileLayer from 'ol/layer/Tile';import TileWMS from 'ol/source/TileWMS';
import '/node_modules/ol/ol.css';
const map=new Map({target:'map-test',layers:[],view:new View({center:fromLonLat([1.31648,44.60058]),zoom:11}),controls:[]});maps.setState({map});
const point=(id,geometry)=>({id,name:id,coordinates:[1.31648,44.60058],status:'todo',category:'Erfgoed',notes:'Bestaande notitie',createdAt:'2026-10-11',...(geometry?{geometry}:{} )});
points.setState({layers:[{id:'own',name:'Eigen laag',color:'#e11d48',visible:true,archived:false,categories:[],createdAt:'2026-10-11',points:[point('own-point'),point('multi',{type:'MultiPoint',coordinates:[[1.32,44.60],[1.33,44.61]]}),point('area',{type:'Polygon',coordinates:[[[1.3,44.6],[1.31,44.6],[1.31,44.61],[1.3,44.6]]]})]},{id:'shared',name:'Gedeeld',color:'#0891b2',visible:true,archived:false,buddyLayerId:'b',buddyRole:'read',categories:[],createdAt:'2026-10-11',points:[point('buddy')]}]});
imports.getState().addLayer({name:'Import',type:'geojson',visible:true,opacity:.6,color:'#15803d',contentHash:'point-style-test',features:{type:'FeatureCollection',features:[{type:'Feature',geometry:{type:'Point',coordinates:[1.31,44.62]},properties:{name:'Importplek',notes:'Behoud'}}]}});
const imported=imports.getState().layers.at(-1);imports.getState().updateLayer(imported.id,{style:{...imported.style,points:{...imported.style.points,outlineWidth:5,outlineColor:'#000000'}}});
const layers=[createKnownThediracSitesLayerOL(),createThediracSightsLayerOL(),createThediracMineralsLayerOL(),createThediracFossilsLayerOL()];for(const l of layers){l.setVisible(true);map.addLayer(l)}
const selectPlainLayer=(kind)=>{
 for(const layer of map.getLayers().getArray())layer.setVisible(false);
 const center=fromLonLat([1.31648,44.60058]);map.getView().setCenter(center);map.getView().setResolution(2);
 const [x,y]=center;
 const geometry=kind==='polygon'?new Polygon([[[x-500,y-500],[x+500,y-500],[x+500,y+500],[x-500,y+500],[x-500,y-500]]]):new Point(center);
 const layer=kind==='wms'?new TileLayer({source:new TileWMS({url:'https://popup-test.invalid/wms',params:{LAYERS:'soil'}})}):new VectorLayer({source:new VectorSource({features:[new Feature({geometry,name:kind==='polygon'?'Testvlak op de kaart':'Gewoon kaartpunt'})]})});
 layer.set('title',kind==='wms'?'Bodemkaart':'Gewone kaartlaag');map.addLayer(layer);map.renderSync();
};
window.test={map,maps,points,imports,layers,Circle,LAYER_STYLES,selectPlainLayer,before:JSON.stringify({points:points.getState().layers,imports:imports.getState().layers})};createRoot(document.getElementById('root')).render(<><CustomPointMarkers/><CustomLayerMarkers/><LocalVondstMarkers/><Popup/></>);
`
const server=await createServer({configFile:false,optimizeDeps:{noDiscovery:true,entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','zustand/middleware/immer','immer','lucide-react','firebase/app','firebase/auth','firebase/firestore','ol/proj']},server:{host:'127.0.0.1',port:0},plugins:[{name:'point-fixture',enforce:'pre',resolveId(id){if(id.includes('lib/firebase'))return '\0point-firebase';if(id==='/map-points-fixture.jsx')return fixtureId},load(id){if(id==='\0point-firebase')return 'export const auth={currentUser:null};export const db={};export const googleProvider={};';if(id===fixtureId)return fixture},configureServer(s){s.middlewares.use('/points-test',async(_,res)=>{res.setHeader('Content-Type','text/html');res.end(await s.transformIndexHtml('/points-test','<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><div id="map-test" style="position:fixed;inset:0;background:#ecefe8"></div><div id="root"></div><script type="module" src="/map-points-fixture.jsx"></script></body></html>'))})}},react()]})
await server.listen();let browser
try{
 browser=await webkit.launch({headless:true});
 const context=await browser.newContext({...devices['iPhone 13']});
 const page=await context.newPage();page.setDefaultTimeout(10000);page.setDefaultNavigationTimeout(60000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/https:\/\//,route=>route.fulfill({status:200,contentType:'application/json',body:'{}'}));
 await page.goto(server.resolvedUrls.local[0]+'points-test');
 await page.waitForFunction(()=>window.test?.map.getLayers().getLength()>=7);console.log('Map ready');
 const preview=page.locator('[data-map-preview]'),details=page.locator('[data-map-details]');
 const tap=async(x,y,type='singleclick')=>{
  await page.evaluate(({x,y,type})=>{const t=window.test;t.map.updateSize();const pixel=[x,y];
   const own=t.map.getLayers().getArray().find(l=>l.get('customPointLayerId')==='own');
   t.map.getView().setCenter(own.getSource().getFeatures()[0].getGeometry().getCoordinates());t.map.getView().setResolution(2);t.map.renderSync();
   // Put the selected point at each viewport edge using the real OL view.
   const center=t.map.getView().getCenter(),size=t.map.getSize();
   t.map.getView().setCenter([center[0]+(size[0]/2-x)*2,center[1]-(size[1]/2-y)*2]);t.map.renderSync();
   t.map.dispatchEvent({type,pixel,coordinate:t.map.getCoordinateFromPixel(pixel),originalEvent:{pointerType:type==='pointermove'?'mouse':'touch'},dragging:false});
  },{x,y,type});await preview.waitFor();
 };
 const bounded=async()=>{
  const b=await preview.boundingBox(),v=page.viewportSize();
  assert.ok(b.x>=11&&b.y>=11&&b.x+b.width<=v.width-11&&b.y+b.height<=v.height-11,JSON.stringify({b,v}));
  assert.equal(await preview.evaluate(el=>el.scrollWidth<=el.clientWidth+1),true,'No clipped text horizontally');
 };
 for(const viewport of [{width:390,height:664},{width:320,height:568},{width:844,height:390}]){
  await page.setViewportSize(viewport);console.log('Checking viewport',viewport);
  for(const [x,y] of [[5,5],[viewport.width-5,5],[5,viewport.height-5],[viewport.width-5,viewport.height-5],[viewport.width/2+1,viewport.height/2]]){
   await tap(x,y);await bounded();
  }
 }
 // Resize with the preview already open.
 await page.setViewportSize({width:320,height:568});await bounded();
 await preview.getByRole('button',{name:'Details bekijken'}).click();await details.waitFor();console.log('Details opened');
 assert.equal(await preview.count(),0);assert.equal(await details.count(),1);
 assert.equal(await page.getByRole('button',{name:'Overzicht',exact:true}).count(),0);
 assert.equal(await page.getByText('Kies kaartinformatie').count(),0);
 const title=await details.innerText();
 await details.getByRole('button',{name:'Volgende laag',exact:true}).click();
 assert.notEqual(await details.innerText(),title,'Existing navigation still selects next result');
 await details.getByRole('button',{name:'Vorige laag',exact:true}).click();
 assert.equal(await details.innerText(),title,'Previous result and actions preserved');
 await details.getByRole('button',{name:'Sluiten',exact:true}).click();await details.waitFor({state:'detached'});
 // Desktop hover opens details directly and does not reappear after closing.
 await tap(180,200,'pointermove');await bounded();
 await preview.getByRole('button',{name:'Details bekijken'}).click();await details.waitFor();console.log('Details opened');
 await details.getByRole('button',{name:'Sluiten',exact:true}).click();await details.waitFor({state:'detached'});
 assert.equal(await preview.count(),0);
 // A map drag and an empty tap each dismiss the preview without opening details.
 await tap(180,200);await page.evaluate(()=>window.test.map.dispatchEvent({type:'pointerdrag'}));
 await preview.waitFor({state:'detached'});assert.equal(await details.count(),0);
 await page.waitForTimeout(400);await tap(180,200);
 await page.evaluate(()=>{const t=window.test,pixel=[10,400];t.map.dispatchEvent({type:'singleclick',pixel,coordinate:t.map.getCoordinateFromPixel(pixel),originalEvent:{pointerType:'touch'}})});
 await preview.waitFor({state:'detached'});assert.equal(await details.count(),0);
 // Real mouse clicks and touch taps must also open legacy information for
 // ordinary vector points, polygons and raster WMS layers without a preview.
 for(const device of [{...devices['iPhone 13']},{viewport:{width:1280,height:800}}]){
  console.log('Native input device:',device.isMobile?'touch':'mouse');
  const legacyContext=await browser.newContext(device),legacy=await legacyContext.newPage();
  legacy.setDefaultTimeout(10000);legacy.setDefaultNavigationTimeout(60000);const legacyErrors=[];legacy.on('pageerror',e=>{legacyErrors.push(e.message);console.log('Browser error:',e.message)});
  let queries=0;
  await legacy.route(/https:\/\//,route=>{
   const info=/popup-test.invalid/.test(route.request().url())&&/GetFeatureInfo/i.test(route.request().url());
   if(info)queries++;
   return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(info?{features:[{properties:{first_soilname:'Testbodem uit kaartdienst',first_soilcode:'TEST'}}]}:{})});
  });
  await legacy.goto(server.resolvedUrls.local[0]+'points-test');
  await legacy.waitForFunction(()=>window.test?.map.getLayers().getLength()>=7);
  await legacy.evaluate(()=>{window.clickTrace=[];window.test.map.on('singleclick',e=>window.clickTrace.push({pixel:e.pixel,animating:window.test.map.getView().getAnimating(),interacting:window.test.map.getView().getInteracting()}))});
  await legacy.evaluate(()=>{const t=window.test,own=t.map.getLayers().getArray().find(l=>l.get('customPointLayerId')==='own');t.map.getView().setCenter(own.getSource().getFeatures()[0].getGeometry().getCoordinates());t.map.getView().setResolution(2);t.map.renderSync()});
  const size=legacy.viewportSize();
  if(device.isMobile)await legacy.touchscreen.tap(size.width/2,size.height/2);else await legacy.mouse.click(size.width/2,size.height/2);
  const pinned=legacy.locator('[data-map-preview]');await pinned.waitFor();
  if(device.isMobile)await pinned.getByRole('button',{name:'Details bekijken'}).tap();else await pinned.getByRole('button',{name:'Details bekijken'}).click();
  const ownSheet=legacy.locator('[data-map-details]');await ownSheet.waitFor();
  // Drain the native delayed singleclick after Details opens from hover.
  await legacy.waitForTimeout(350);
  assert.equal(await pinned.count(),0);assert.equal(await ownSheet.count(),1);
  await ownSheet.getByRole('button',{name:'Sluiten',exact:true}).click();await ownSheet.waitFor({state:'detached'});await legacy.locator('.fixed.inset-0').waitFor({state:'detached'});
  assert.equal(await pinned.count(),0,'Closing details must not uncover a delayed hidden preview');
  for(const kind of ['point','polygon','wms']){
   console.log('Native legacy layer:',kind);
   await legacy.evaluate(kind=>window.test.selectPlainLayer(kind),kind);
   const size=legacy.viewportSize(),x=size.width/2,y=size.height/2;
   if(device.isMobile)await legacy.touchscreen.tap(x,y);else await legacy.mouse.click(x,y);
   const sheet=legacy.locator('[data-map-details]');try{await sheet.waitFor()}catch(error){console.log('Native click trace:',await legacy.evaluate(()=>window.clickTrace));throw error}
   assert.equal(await legacy.locator('[data-map-preview]').count(),0);
   assert.equal(await sheet.count(),1);
   await sheet.getByText(kind==='point'?'Gewoon kaartpunt':kind==='polygon'?'Testvlak op de kaart':'Testbodem uit kaartdienst',{exact:false}).waitFor();
   if(kind==='wms')assert.ok(queries>0,'A real WMS feature-info query was issued');
   await sheet.getByRole('button',{name:'Sluiten',exact:true}).click();await sheet.waitFor({state:'detached'});await legacy.locator('.fixed.inset-0').waitFor({state:'detached'});
  }
  assert.deepEqual(legacyErrors,[]);await legacyContext.close();
 }
 assert.deepEqual(errors,[]);
 console.log('Popup regressions passed: iPhone portrait/landscape, 320px, every edge, resize, one details sheet, next/previous, mouse hover, close, pan and empty tap; real touch/mouse clicks on ordinary points, polygons and WMS.');
}finally{await browser?.close();await server.close()}
