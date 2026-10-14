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
import {CustomPointMarkers} from '/src/components/CustomPoints/CustomPointMarkers';import {CustomLayerMarkers} from '/src/components/CustomLayers/CustomLayerMarkers';import {LocalVondstMarkers} from '/src/components/Vondst/LocalVondstMarkers';import {useMapStore as maps} from '/src/store/mapStore';import {useCustomPointLayerStore as points} from '/src/store/customPointLayerStore';import {useCustomLayerStore as imports} from '/src/store/customLayerStore';
import '/node_modules/ol/ol.css';
const map=new Map({target:'map-test',layers:[],view:new View({center:fromLonLat([1.31648,44.60058]),zoom:11}),controls:[]});maps.setState({map});
const point=(id,geometry)=>({id,name:id,coordinates:[1.31648,44.60058],status:'todo',category:'Erfgoed',notes:'Bestaande notitie',createdAt:'2026-10-11',...(geometry?{geometry}:{} )});
points.setState({layers:[{id:'own',name:'Eigen laag',color:'#e11d48',visible:true,archived:false,categories:[],createdAt:'2026-10-11',points:[point('own-point'),point('multi',{type:'MultiPoint',coordinates:[[1.32,44.60],[1.33,44.61]]}),point('area',{type:'Polygon',coordinates:[[[1.3,44.6],[1.31,44.6],[1.31,44.61],[1.3,44.6]]]})]},{id:'shared',name:'Gedeeld',color:'#0891b2',visible:true,archived:false,buddyLayerId:'b',buddyRole:'read',categories:[],createdAt:'2026-10-11',points:[point('buddy')]}]});
imports.getState().addLayer({name:'Import',type:'geojson',visible:true,opacity:.6,color:'#15803d',contentHash:'point-style-test',features:{type:'FeatureCollection',features:[{type:'Feature',geometry:{type:'Point',coordinates:[1.31,44.62]},properties:{name:'Importplek',notes:'Behoud'}}]}});
const imported=imports.getState().layers.at(-1);imports.getState().updateLayer(imported.id,{style:{...imported.style,points:{...imported.style.points,outlineWidth:5,outlineColor:'#000000'}}});
const layers=[createKnownThediracSitesLayerOL(),createThediracSightsLayerOL(),createThediracMineralsLayerOL(),createThediracFossilsLayerOL()];for(const l of layers){l.setVisible(true);map.addLayer(l)}
window.test={map,maps,points,imports,layers,Circle,LAYER_STYLES,before:JSON.stringify({points:points.getState().layers,imports:imports.getState().layers})};createRoot(document.getElementById('root')).render(<><CustomPointMarkers/><CustomLayerMarkers/><LocalVondstMarkers/></>);
`
const server=await createServer({configFile:false,optimizeDeps:{noDiscovery:true,entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','zustand/middleware/immer','immer','lucide-react','firebase/app','firebase/auth','firebase/firestore','ol/proj']},server:{host:'127.0.0.1',port:0},plugins:[{name:'point-fixture',enforce:'pre',resolveId(id){if(id.includes('lib/firebase'))return '\0point-firebase';if(id==='/map-points-fixture.jsx')return fixtureId},load(id){if(id==='\0point-firebase')return 'export const auth={currentUser:null};export const db={};export const googleProvider={};';if(id===fixtureId)return fixture},configureServer(s){s.middlewares.use('/points-test',async(_,res)=>{res.setHeader('Content-Type','text/html');res.end(await s.transformIndexHtml('/points-test','<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><div id="map-test" style="position:fixed;inset:0;background:#ecefe8"></div><div id="root"></div><script type="module" src="/map-points-fixture.jsx"></script></body></html>'))})}},react()]})
await server.listen();let browser
try{
 browser=await webkit.launch({headless:true});const context=await browser.newContext({...devices['iPhone 13']});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(server.resolvedUrls.local[0]+'points-test');await page.waitForFunction(()=>window.test?.map.getLayers().getLength()>=7);
 const result=await page.evaluate(()=>{
  const t=window.test;let count=0;const fail=(message)=>{throw new Error(message)};
  for(const resolution of [200,80,21,20,6,5,1,200]){
   const expected=resolution>80?3:resolution>20?4:resolution>5?5:6;
   for(const layer of t.map.getLayers().getArray()){
    for(const feature of layer.getSource()?.getFeatures()||[]){
     const fn=feature.getStyleFunction()||layer.getStyleFunction();const styles=[fn?.(feature,resolution)].flat().filter(Boolean);const images=styles.map(s=>s.getImage()).filter(Boolean);
     if(['Point','MultiPoint'].includes(feature.getGeometry().getType())){
      if(images.length!==1)fail('Each marker needs exactly one circle');const image=images[0];if(!(image instanceof t.Circle)||image.getRadius()!==expected||image.getStroke().getWidth()!==.75||image.getStroke().getLineDash())fail('Inconsistent marker');
      const color=feature.get('layerColor')||feature.get('customLayerColor');if(color&&image.getFill().getColor()!==color)fail('Category/layer color changed');count++;
     }else if(images.length)fail('Polygon acquired point symbol');
    }
   }
   for(const fn of Object.values(t.LAYER_STYLES)) {const image=fn()(null,resolution).getImage();if(!(image instanceof t.Circle)||image.getRadius()!==expected||image.getStroke().getWidth()!==.75)fail('Legacy layer style differs')}
  }
  const fortified=t.layers.flatMap(l=>l.getSource().getFeatures()).filter(f=>f.get('Kaartlegenda')==='Versterking / heuvelfort');
  if(fortified.length!==18)fail('Expected 18 distinct fortification markers');
  for(const f of fortified){const style=[f.getStyleFunction()(f,20)].flat()[0];if(f.get('layerColor')!=='#0284c7'||style.getImage().getFill().getColor()!=='#0284c7')fail('Fortification color differs')}
  if(JSON.stringify({points:t.points.getState().layers,imports:t.imports.getState().layers})!==t.before)fail('Rendering mutated user data');
  return {count,layers:t.layers.map(l=>l.getSource().getFeatures().length)};
 });
 assert.ok(result.count>100);assert.equal(errors.length,0,errors.join('\n'));
 // Actual map hit detection after zooming, rather than only style inspection.
 for(const resolution of [200,30,10,2,200]){
  await page.evaluate(res=>{const t=window.test;t.map.getView().setCenter(t.map.getLayers().getArray().find(l=>l.get('customPointLayerId')==='own').getSource().getFeatures()[0].getGeometry().getCoordinates());t.map.getView().setResolution(res);t.map.renderSync()},resolution);
  await page.waitForTimeout(100);
  assert.ok(await page.evaluate(()=>{const t=window.test;return t.map.getFeaturesAtPixel(t.map.getPixelFromCoordinate(t.map.getView().getCenter()),{hitTolerance:4}).some(f=>f.get('pointId')==='own-point'||f.get('customPoint')?.id==='own-point')}),'Personal point remains clickable at every zoom');
 }
 const fortHit=await page.evaluate(()=>{const t=window.test,f=t.layers[0].getSource().getFeatureById('pech-del-castel-le-roc');t.map.getView().setCenter(f.getGeometry().getCoordinates());t.map.getView().setResolution(2);t.map.renderSync();return t.map.getFeaturesAtPixel(t.map.getPixelFromCoordinate(f.getGeometry().getCoordinates()),{hitTolerance:4}).some(hit=>hit===f)});assert.ok(fortHit,'New hillfort remains tappable');
 console.log('iPhone map points passed:',JSON.stringify(result),'same circles and border at all zooms; stored colors/data, shared points, imports, MultiPoint, polygons, labels and hit detection preserved.');
}finally{await browser?.close();await server.close()}
