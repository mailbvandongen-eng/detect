import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
import {readFileSync} from 'node:fs'
const require=createRequire(process.env.BUDDY_BROWSER_MODULE_ROOT?process.env.BUDDY_BROWSER_MODULE_ROOT+'/package.json':import.meta.url)
const {webkit,devices}=require('playwright')
// Guards for paths that are impractical to render in the small browser fixture.
for(const path of ['src/App.tsx','src/components/Map/Popup.tsx','src/components/LayerControl/ThemesPanel.tsx','src/lib/firebase.ts','src/components/CustomPoints/LayerDashboard.tsx'])assert.doesNotMatch(readFileSync(path,'utf8'),/PhotoCapture|PhotoGallery|PhotoUploadStatus|usePhotoUploads|firebase\/storage|uploadPointPhoto|point\.photos/)
assert.equal(JSON.parse(readFileSync('firebase.json','utf8')).storage,undefined)
const fixture=`
import React,{useState} from 'react';import {createRoot} from 'react-dom/client';
import {AddPointModal} from '/src/components/CustomPoints/AddPointModal';
import {AddVondstForm} from '/src/components/Vondst/AddVondstForm';
import {RouteDetailsModal} from '/src/components/Route/RouteDetailsModal';
import {useCustomPointLayerStore as points} from '/src/store/customPointLayerStore';
import {useRouteRecordingStore as routes} from '/src/store/routeRecordingStore';
import {useUIStore as ui} from '/src/store/uiStore';
import {useAuthStore as auth} from '/src/store/authStore';
import {activatePrivateAccount} from '/src/services/privateAccountData';
import {sanitizePopupHtml,safeContentUrl} from '/src/utils/safePopupHtml';
import '/src/style.css';import '/src/detect-theme.css';
await activatePrivateAccount('no-photos-owner');auth.setState({user:{uid:'no-photos-owner',email:'owner@example.com'},ready:true});
if(!points.getState().layers.some(l=>l.id==='test-layer'))points.setState({layers:[{id:'test-layer',name:'Mijn punten',color:'#7c5ac7',visible:true,archived:false,createdAt:'2026-10-05',categories:[],points:[{id:'legacy-point',name:'Bestaand',category:'Overig',coordinates:[5,52],createdAt:'2026-10-05',photos:[{id:'legacy-photo',thumbnailBase64:'legacy-bytes',pendingUpload:true}]}]}]});
if(!routes.getState().savedRoutes.some(r=>r.id==='test-route'))routes.setState({savedRoutes:[{id:'test-route',name:'Mijn route',points:[],startTime:1,endTime:60001,totalDuration:60000,totalDistance:1250,pausedDuration:0,createdAt:'2026-10-05',photos:[{id:'legacy-route-photo',url:'blob:old-url',timestamp:'2026-10-05'}]}]});
window.test={points,routes,ui,sanitizePopupHtml,safeContentUrl,switch:async uid=>{auth.setState({user:null});await activatePrivateAccount(uid);auth.setState({user:{uid,email:uid+'@example.com'},ready:true})}};
document.documentElement.dataset.detectTheme='purple';document.documentElement.dataset.detectColorScheme='dark';
function Test(){const [mode,setMode]=useState(null);const route=routes(s=>s.savedRoutes.find(r=>r.id==='test-route'));return <><nav><button onClick={()=>{setMode(null);ui.getState().openAddPointModal({kind:'point',id:'test-layer'},{lat:52,lng:5})}}>Nieuw punt</button><button onClick={()=>{ui.getState().closeWindow();setMode('vondst')}}>Nieuwe vondst</button><button onClick={()=>{ui.getState().closeWindow();setMode('route')}}>Route bekijken</button></nav><AddPointModal/>{mode==='vondst'&&<AddVondstForm initialLocation={{lat:52,lng:5}} onClose={()=>setMode(null)}/ >}{mode==='route'&&route&&<RouteDetailsModal route={route} onClose={()=>setMode(null)}/>}<div id="safe" dangerouslySetInnerHTML={{__html:sanitizePopupHtml('<table><tr><td>Behoud tabel</td></tr></table><strong style="color:#7c5ac7">Paars</strong><a href="https://example.com" target="_blank">Veilige link</a><img src=x onerror="window.hacked=true"><svg onload="window.hacked=true"></svg><a href="javascript:window.hacked=true">Foute link</a><form><input name=location></form>')}}/></>}
createRoot(document.getElementById('root')).render(<Test/>);
`

const fixtureId=resolve('prio-three-fixture.jsx')
const server=await createServer({configFile:false,optimizeDeps:{noDiscovery:true,entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','zustand/middleware/immer','immer','dompurify','lucide-react','framer-motion','firebase/app','firebase/auth','firebase/firestore','ol/proj','xlsx']},server:{host:'127.0.0.1',port:0},plugins:[{name:'no-photo-fixture',enforce:'pre',resolveId(id){if(id.includes('lib/firebase'))return '\0test-firebase';if(id==='/prio-three-fixture.jsx')return fixtureId},load(id){if(id==='\0test-firebase')return 'export const auth={currentUser:null};export const googleProvider={};export const db={};';if(id===fixtureId)return fixture},configureServer(server){server.middlewares.use('/photo-test',async(_,res)=>{res.setHeader('Content-Type','text/html');res.end(await server.transformIndexHtml('/photo-test','<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div><script type="module" src="/prio-three-fixture.jsx"></script></body></html>'))})}},react()]})
await server.listen();let browser
try {
 browser=await webkit.launch({headless:true});const context=await browser.newContext({...devices['iPhone 13']});
 const page=await context.newPage(),errors=[],storageRequests=[]
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/firebasestorage|storage.googleapis.com/.test(r.url()))storageRequests.push(r.url())})
 page.on('dialog',d=>d.accept());const url=server.resolvedUrls.local[0]+'photo-test'
 await page.goto(url);await page.getByRole('button',{name:'Nieuw punt',exact:true}).waitFor()
 const sanitizing=await page.evaluate(()=>({hacked:window.hacked||false,table:!!document.querySelector('#safe table'),color:document.querySelector('#safe strong').style.color,rel:document.querySelector('#safe a').rel,bad:document.querySelector('#safe a:nth-of-type(2)').hasAttribute('href'),svg:!!document.querySelector('#safe svg'),input:!!document.querySelector('#safe input'),urls:['javascript:alert(1)','data:image/svg+xml;base64,PHN2Zz4=','java\nscript:alert(1)'].map(v=>window.test.safeContentUrl(v,true)),overlay:window.test.sanitizePopupHtml('<div class="fixed inset-0 z-50" style="position:fixed;background-image:url(https://bad.test);color:purple">x</div>')}))
 assert.equal(sanitizing.hacked,false);assert.equal(sanitizing.table,true);assert.equal(sanitizing.color,'rgb(124, 90, 199)');assert.equal(sanitizing.rel,'noopener noreferrer');assert.equal(sanitizing.bad,false);assert.equal(sanitizing.svg,false);assert.equal(sanitizing.input,false);assert.deepEqual(sanitizing.urls,[undefined,undefined,undefined]);assert.ok(!sanitizing.overlay.includes('fixed'));assert.ok(!sanitizing.overlay.includes('url('))
 console.log('PASS iPhone WebKit: malicious HTML/URLs/overlay classes rejected; tables, chosen colour and safe external links retained')

 // Seed old photo bytes directly, then verify ordinary edits and reload leave them intact.
 await page.evaluate(()=>new Promise((resolve,reject)=>{const r=indexedDB.open('detectorapp-photos',1);r.onupgradeneeded=()=>r.result.createObjectStore('photos',{keyPath:'id'});r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,tx=db.transaction('photos','readwrite');tx.objectStore('photos').put({id:'legacy-photo',fullImage:new Uint8Array([1,2,3]).buffer});tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>reject(tx.error)}}))
 const noPhotoUI=async()=>{assert.equal(await page.locator('input[type=file]').count(),0);assert.equal(await page.getByRole('button',{name:/foto|camera|upload/i}).count(),0)}
 await page.getByRole('button',{name:'Nieuw punt',exact:true}).tap()
 const pointDialog=page.getByRole('dialog',{name:'Punt toevoegen',exact:true});await pointDialog.waitFor();await noPhotoUI()
 await pointDialog.locator('input[type=text]').fill('Nieuw zonder foto');await pointDialog.locator('input[type=tel]').fill('0612345678');await pointDialog.locator('textarea').fill('Mijn notitie');await pointDialog.locator('input[type=url]').fill('https://example.com')
 await pointDialog.getByRole('button',{name:'Toevoegen',exact:true}).tap()
 const point=await page.evaluate(()=>window.test.points.getState().layers.find(l=>l.id==='test-layer').points.find(p=>p.name==='Nieuw zonder foto'))
 assert.equal(point.phone,'0612345678');assert.equal(point.notes,'Mijn notitie');assert.deepEqual(point.coordinates,[5,52]);assert.equal(point.photos,undefined)
 await page.getByRole('button',{name:'Nieuwe vondst',exact:true}).tap();const vondst=page.getByRole('dialog');await vondst.waitFor();await noPhotoUI()
 await vondst.getByPlaceholder('Naam van het punt...').fill('Vondst zonder foto');await vondst.getByRole('button',{name:'Opslaan',exact:true}).tap()
 await page.waitForFunction(()=>window.test.points.getState().layers.find(l=>l.id==='test-layer').points.some(p=>p.name==='Vondst zonder foto'))
 await page.getByRole('button',{name:'Route bekijken',exact:true}).tap();const route=page.getByRole('dialog',{name:'Mijn route',exact:true});await route.waitFor();await noPhotoUI()
 await route.getByRole('button',{name:'Notities',exact:true}).tap();await route.locator('textarea').fill('Route blijft bruikbaar');await route.getByRole('button',{name:'Notities opslaan',exact:true}).tap()
 const legacy=await page.evaluate(()=>({point:window.test.points.getState().layers.find(l=>l.id==='test-layer').points.find(p=>p.id==='legacy-point').photos,route:window.test.routes.getState().savedRoutes.find(r=>r.id==='test-route').photos}))
 await page.evaluate(()=>window.test.points.getState().updatePoint('test-layer','legacy-point',{notes:'Bewerkt zonder foto'}))
 await page.evaluate(()=>window.test.switch('other-owner'));assert.equal(await page.evaluate(()=>window.test.points.getState().layers.some(l=>l.id==='test-layer')),false)
 await page.evaluate(()=>window.test.switch('no-photos-owner'));await page.reload();await page.getByRole('button',{name:'Nieuw punt',exact:true}).waitFor()
 const after=await page.evaluate(()=>({point:window.test.points.getState().layers.find(l=>l.id==='test-layer').points.find(p=>p.id==='legacy-point').photos,route:window.test.routes.getState().savedRoutes.find(r=>r.id==='test-route').photos,notes:window.test.routes.getState().savedRoutes.find(r=>r.id==='test-route').notes,count:window.test.points.getState().layers.find(l=>l.id==='test-layer').points.length}))
 assert.deepEqual(after.point,legacy.point);assert.deepEqual(after.route,legacy.route);assert.equal(after.notes,'Route blijft bruikbaar');assert.equal(after.count,3)
 const bytes=await page.evaluate(()=>new Promise((resolve,reject)=>{const r=indexedDB.open('detectorapp-photos',1);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,tx=db.transaction('photos','readonly'),q=tx.objectStore('photos').get('legacy-photo');q.onsuccess=()=>resolve(Array.from(new Uint8Array(q.result.fullImage)));tx.oncomplete=()=>db.close()}}));assert.deepEqual(bytes,[1,2,3])
 assert.deepEqual(storageRequests,[]);assert.deepEqual(errors,[])
 console.log('PASS iPhone WebKit: point/vondst creation and route notes work without photo controls; reload/account switch preserve old metadata and IndexedDB bytes; no Storage requests')
} catch(error) {const page=browser?.contexts()[0]?.pages()[0];if(page)console.error('Diagnostic:',await page.evaluate(()=>document.body.innerText).catch(()=>null));throw error}
finally {await browser?.close();await server.close()}
