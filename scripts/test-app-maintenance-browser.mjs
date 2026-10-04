import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
const require=createRequire(process.env.BUDDY_BROWSER_MODULE_ROOT ? process.env.BUDDY_BROWSER_MODULE_ROOT+'/package.json':import.meta.url)
const {webkit,devices}=require('playwright')
const fixture=`
import React from 'react';import {createRoot} from 'react-dom/client';
import {useStartupWindows} from '/src/hooks/useStartupWindows';
import {WelcomeModal} from '/src/components/UI/WelcomeModal';
import {ChangeLogModal} from '/src/components/UI/ChangeLogModal';
import {SettingsPanel} from '/src/components/UI/SettingsPanel';
import {initializeAppUpdates} from '/src/services/appMaintenance';
import {useAuthStore as auth} from '/src/store/authStore';
import {activatePrivateAccount} from '/src/services/privateAccountData';
import {useUIStore as ui} from '/src/store/uiStore';
import {useSettingsStore as settings} from '/src/store/settingsStore';
import {useCustomPointLayerStore as points} from '/src/store/customPointLayerStore';
import {useCustomLayerStore as imports} from '/src/store/customLayerStore';
import {useRouteRecordingStore as routes} from '/src/store/routeRecordingStore';
import {useAppUpdateStore as update} from '/src/store/appUpdateStore';
import '/src/style.css';import '/src/detect-theme.css';
window.test={auth,ui,settings,points,imports,routes,update};
const previous=Number(sessionStorage.getItem('change-count')||0);
ui.subscribe((next,old)=>{if(next.activeWindow==='changeLog'&&old.activeWindow!=='changeLog'){
 sessionStorage.setItem('change-count',String(Number(sessionStorage.getItem('change-count')||0)+1));
 if(!auth.getState().ready)sessionStorage.setItem('early-window','yes');
}});
function Startup(){const startup=useStartupWindows();return <><WelcomeModal isOpen={startup.welcomeModalOpen} onClose={startup.handleWelcomeClose} onOpenManual={startup.handleOpenManual}/><ChangeLogModal isOpen={startup.changeLogOpen} onClose={startup.closeChangeLog}/><SettingsPanel/></>}
createRoot(document.getElementById('root')).render(<Startup/>);
initializeAppUpdates();
setTimeout(async()=>{
 await activatePrivateAccount('browser-owner');
 if(!localStorage.getItem('fixture-seeded')){
  settings.setState({hideWelcomeModal:false,uiTheme:'purple'});
  points.setState({layers:[{id:'keep-point-layer',name:'Mijn punten',points:[{id:'keep-point',name:'Locatie',notes:'Bewaren',photos:[{id:'keep-photo',thumbnailBase64:'photo-data'}]}],categories:[],color:'#7c5ac7',visible:true,archived:false,createdAt:'2026-10-04'}]});
  imports.setState({layers:[{id:'keep-import',name:'Mijn import',features:{type:'FeatureCollection',features:[]},visible:true}]});
  localStorage.setItem('fixture-seeded','yes');
 }
 auth.setState({user:{uid:'browser-owner',email:'owner@example.com'},ready:true,loading:false});
},300);
`
let swVersion=1
const fixtureId=resolve('maintenance-fixture.jsx')
const html='<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module" src="/maintenance-fixture.jsx"></script></body></html>'
const server=await createServer({configFile:false,optimizeDeps:{entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','zustand/middleware/immer','immer','framer-motion','lucide-react','firebase/app','firebase/auth','firebase/firestore']},server:{host:'127.0.0.1',port:0},plugins:[{
 name:'maintenance-test',enforce:'pre',resolveId(id){if(id==='/maintenance-fixture.jsx')return fixtureId},load(id){if(id===fixtureId)return fixture},
 configureServer(server){server.middlewares.use(async(req,res,next)=>{
  if(req.url?.split('?')[0]==='/sw.js'){
   res.setHeader('Content-Type','text/javascript');res.setHeader('Cache-Control','no-store');
   res.end(`const version=${swVersion};self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});self.addEventListener('install',e=>e.waitUntil(caches.open('workbox-precache-v2-'+self.registration.scope).then(c=>c.put('/app-version',new Response(String(version))))));`);return;
  }
  if(['/maintenance-test','/index.html'].includes(req.url?.split('?')[0])){
   res.setHeader('Content-Type','text/html');res.end(await server.transformIndexHtml('/maintenance-test',html));return;
  }next();
 })},
},react()]})
await server.listen();let browser
try{
 browser=await webkit.launch({headless:true})
 const context=await browser.newContext({...devices['iPhone 13']})
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto(server.resolvedUrls.local[0]+'maintenance-test')
 await page.waitForFunction(()=>window.test?.auth.getState().ready)
 await page.getByRole('dialog',{name:'Hoe werkt Detect?',exact:true}).waitFor()
 assert.equal(await page.evaluate(()=>sessionStorage.getItem('change-count')),null,'Welcome must finish before changelog')
 await page.getByRole('button',{name:'Toon niet meer',exact:true}).tap()
 await page.getByRole('dialog',{name:'Wijzigingen',exact:true}).waitFor()
 assert.equal(await page.evaluate(()=>sessionStorage.getItem('early-window')),null)
 assert.equal(await page.evaluate(()=>sessionStorage.getItem('change-count')),'1')
 for(let i=0;i<8;i++){
  await page.reload();await page.waitForFunction(()=>window.test?.auth.getState().ready)
  assert.equal(await page.evaluate(()=>window.test.ui.getState().activeWindow),null)
 }
 assert.equal(await page.evaluate(()=>sessionStorage.getItem('change-count')),'1')
 console.log('PASS WebKit: delayed account startup, unseen changelog and eight refreshes without flash or repetition')
 await page.evaluate(()=>window.test.ui.getState().openChangeLog())
 await page.getByRole('dialog',{name:'Wijzigingen',exact:true}).waitFor()
 await page.evaluate(()=>window.test.ui.getState().closeWindow())
 await page.evaluate(async()=>{const r=await navigator.serviceWorker.ready;if(r.active?.state!=='activated')throw Error('SW not activated')})
 await page.reload();await page.waitForFunction(()=>window.test?.auth.getState().ready)
 swVersion=2
 await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();await r.update()})
 await page.waitForFunction(()=>window.test.update.getState().updateAvailable)
 const changedCount=await page.evaluate(()=>sessionStorage.getItem('change-count'))
 let navigations=0;page.on('framenavigated',frame=>{if(frame===page.mainFrame())navigations++})
 await page.waitForTimeout(700)
 assert.equal(navigations,0,'Waiting update must not automatically reload')
 await page.evaluate(()=>window.test.ui.getState().openWindow('settings'))
 await page.getByRole('button',{name:'App vernieuwen',exact:true}).tap()
 await page.waitForURL(/detect-refresh=/)
 await page.waitForFunction(()=>window.test?.auth.getState().ready)
 assert.equal(navigations,1)
 assert.equal(await page.evaluate(()=>sessionStorage.getItem('change-count')),changedCount)
 console.log('PASS WebKit: real waiting serviceworker update is quiet and explicit renew reloads once')
 await page.evaluate(async()=>{
  const scope=new URL('/',location.origin).href;
  const app=await caches.open('workbox-precache-v2-'+scope);await app.put('/repair-sentinel',new Response('old-code'));
  const map=await caches.open('osm-tiles');await map.put('/offline-tile',new Response('keep-map'));
  const other=await caches.open('workbox-precache-v2-'+scope+'other/');await other.put('/other-sentinel',new Response('keep-other'));
  await new Promise((resolve,reject)=>{const r=indexedDB.open('offline-photos',1);r.onupgradeneeded=()=>r.result.createObjectStore('photos');r.onsuccess=()=>{const db=r.result;const tx=db.transaction('photos','readwrite');tx.objectStore('photos').put('keep-photo','p');tx.oncomplete=()=>{db.close();resolve()};tx.onerror=reject}});
  window.test.ui.getState().openWindow('settings');window.test.routes.setState({state:'recording'});
 })
 await page.getByRole('button',{name:'App vernieuwen',exact:true}).tap()
 await page.getByRole('alert').filter({hasText:'route'}).waitFor()
 assert.equal(navigations,1)
 await page.evaluate(()=>window.test.routes.setState({state:'idle'}))
 await context.setOffline(true)
 await page.getByRole('button',{name:'App vernieuwen',exact:true}).tap()
 await page.getByRole('alert').filter({hasText:'internet'}).waitFor()
 assert.equal(navigations,1)
 await context.setOffline(false)
 await page.getByText('App herstellen',{exact:true}).tap()
 const repairNavigation=page.waitForEvent('framenavigated',{predicate:frame=>frame===page.mainFrame()})
 await page.getByRole('button',{name:'Appbestanden opnieuw laden',exact:true}).tap()
 await repairNavigation
 await page.waitForFunction(()=>window.test?.auth.getState().ready)
 // Wait for the second explicit navigation, not a potentially already matching URL.
 await page.waitForFunction(()=>!document.querySelector('[role="alert"]'))
 assert.equal(navigations,2)
 const retained=await page.evaluate(async()=>{
  const scope=new URL('/',location.origin).href;
  return {
   notes:window.test.points.getState().layers[0].points[0].notes,
   photo:window.test.points.getState().layers[0].points[0].photos[0].thumbnailBase64,
   importId:window.test.imports.getState().layers[0].id,
   theme:window.test.settings.getState().uiTheme,
   map:await(await caches.match('/offline-tile')).text(),other:await(await caches.match('/other-sentinel')).text(),
   oldCode:!!await caches.match('/repair-sentinel'),
   dbPhoto:await new Promise(resolve=>{const r=indexedDB.open('offline-photos',1);r.onsuccess=()=>{const db=r.result;const read=db.transaction('photos').objectStore('photos').get('p');read.onsuccess=()=>{db.close();resolve(read.result)}}}),
   user:window.test.auth.getState().user.uid,
  };
 })
 assert.deepEqual(retained,{notes:'Bewaren',photo:'photo-data',importId:'keep-import',theme:'purple',map:'keep-map',other:'keep-other',oldCode:false,dbPhoto:'keep-photo',user:'browser-owner'})
 assert.deepEqual(errors,[])
 console.log('PASS WebKit: offline/recording blocks reload; repair retains account, layers, imports, photos, theme, IndexedDB and map/other-app caches')
}finally{await browser?.close();await server.close()}
