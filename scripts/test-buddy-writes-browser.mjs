import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
const require=createRequire(process.env.BUDDY_BROWSER_MODULE_ROOT?process.env.BUDDY_BROWSER_MODULE_ROOT+'/package.json':import.meta.url)
const {webkit,devices}=require('playwright')
const fixture=`
import React from 'react';import {createRoot} from 'react-dom/client';
import {useBuddyWrites} from '/src/hooks/useBuddyWrites';
import {BuddyWriteStatus} from '/src/components/CustomPoints/BuddyWriteStatus';
import {useBuddyWriteStore as queue} from '/src/store/buddyWriteStore';
import {useCustomPointLayerStore as points} from '/src/store/customPointLayerStore';
import {useAuthStore as auth} from '/src/store/authStore';
import {auth as firebaseAuth} from '/src/lib/firebase';
import {activatePrivateAccount} from '/src/services/privateAccountData';
import '/src/style.css';import '/src/detect-theme.css';
const owner={uid:'test-owner',email:'owner@example.com'};
const point={id:'point',name:'Punt',notes:'Oud',category:'Overig',status:'todo',coordinates:[1,2],createdAt:'2026-10-04'};
const layer={id:'shared-local',buddyLayerId:'shared',buddyRole:'owner',name:'Reis',color:'#7c5ac7',points:[point],categories:[],visible:true,archived:false,createdAt:point.createdAt};
await activatePrivateAccount(owner.uid);firebaseAuth.currentUser=owner;auth.setState({user:owner,ready:true});
points.setState(state=>({layers:[...state.layers.filter(l=>l.id!==layer.id),layer]}));
window.test={queue,points,mode:'ok',calls:[],edit:fields=>points.getState().updatePoint(layer.id,point.id,fields),switch:async uid=>{auth.setState({user:null});await activatePrivateAccount(uid);const user={uid,email:uid+'@example.com'};firebaseAuth.currentUser=user;auth.setState({user,ready:true});if(uid==='test-owner')points.setState(state=>({layers:[...state.layers,layer]}))}};
document.documentElement.dataset.detectTheme='purple';document.documentElement.dataset.detectColorScheme='dark';
function Test(){useBuddyWrites();const state=points(s=>s.layers);return <main style={{padding:20,background:'var(--detect-window-bg)',color:'var(--detect-window-text)'}}><h1>Gedeeld opslaan</h1><BuddyWriteStatus/>{state.map(l=><div key={l.id}>{l.name}: {l.points.map(p=>p.notes).join(', ')}</div>)}</main>}
createRoot(document.getElementById('root')).render(<Test/>);
`
const service=`
export async function applyBuddyWrite(write,current){
 window.test.calls.push(write);await new Promise(resolve=>setTimeout(resolve,100));
 if(!current())throw new Error('Account is gewijzigd.');
 if(window.test.mode==='denied')throw Object.assign(new Error('Denied'),{code:'permission-denied'});
 if(window.test.mode==='offline')throw Object.assign(new Error('Offline'),{code:'unavailable'});
}
`
const fixtureId=resolve('buddy-writes-fixture.jsx')
const server=await createServer({configFile:false,optimizeDeps:{noDiscovery:true,entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','zustand/middleware/immer','immer','firebase/app','firebase/auth','firebase/firestore','firebase/storage','ol/proj','xlsx']},server:{host:'127.0.0.1',port:0},plugins:[{
 name:'shared-write-fixture',enforce:'pre',resolveId(id){if(id.includes('services/buddyLayers')||id==='./buddyLayers')return '\0write-service';if(id==='/buddy-writes-fixture.jsx')return fixtureId},load(id){if(id==='\0write-service')return service;if(id===fixtureId)return fixture},configureServer(server){server.middlewares.use('/writes-test',async(_,res)=>{res.setHeader('Content-Type','text/html');res.end(await server.transformIndexHtml('/writes-test','<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div><script type="module" src="/buddy-writes-fixture.jsx"></script></body></html>'))})},
},react()]})
await server.listen();let browser
try{
 browser=await webkit.launch({headless:true});const context=await browser.newContext({...devices['iPhone 13']});const page=await context.newPage(),errors=[]
 page.on('pageerror',error=>errors.push(error.message));const url=server.resolvedUrls.local[0]+'writes-test'
 await page.goto(url);await page.getByText('Gedeeld opslaan',{exact:true}).waitFor()
 await context.setOffline(true)
 await page.evaluate(()=>window.test.edit({notes:'Offline mobiel'}))
 await page.getByRole('status').filter({hasText:'lokaal bewaard'}).waitFor()
 assert.equal(await page.evaluate(()=>window.test.calls.length),0)
 // Restore network while keeping the tab deliberately paused: the persisted
 // journal, rather than component memory, must survive the next page load.
 await page.evaluate(()=>window.test.mode='offline');await context.setOffline(false)
 await page.getByRole('alert').filter({hasText:'Offline'}).waitFor()
 await page.reload();await page.getByRole('alert').filter({hasText:'Offline'}).waitFor()
 assert.equal(await page.evaluate(()=>window.test.queue.getState().items[0].snapshot.notes),'Offline mobiel')
 await page.getByRole('button',{name:'Opnieuw opslaan',exact:true}).tap()
 await page.getByRole('status').filter({hasText:'wijzigingen opgeslagen'}).waitFor()
 assert.equal(await page.evaluate(()=>window.test.queue.getState().items.length),0)
 console.log('PASS WebKit iPhone: offline edit, cold reload, durable draft, visible failure and successful explicit retry')
 await page.evaluate(()=>{window.test.mode='denied';window.test.edit({notes:'Bewaar mijn werk'})})
 await page.getByRole('alert').filter({hasText:'bewerkrechten'}).waitFor()
 await page.getByRole('button',{name:'Bewaar wijzigingen als privélaag',exact:true}).tap()
 await page.getByText('Reis (lokale kopie): Bewaar mijn werk',{exact:true}).waitFor()
 assert.equal(await page.evaluate(()=>window.test.points.getState().layers.find(l=>l.name==='Reis (lokale kopie)').buddyLayerId),undefined)
 await page.reload();await page.getByText('Reis (lokale kopie): Bewaar mijn werk',{exact:true}).waitFor()
 console.log('PASS WebKit iPhone: revoked edit survives as a durable private copy without sharing permissions')
 await context.setOffline(true);await page.evaluate(()=>window.test.edit({notes:'Alleen eigenaar'}))
 await page.getByRole('status').filter({hasText:'lokaal bewaard'}).waitFor()
 await page.evaluate(()=>window.test.switch('test-other'))
 assert.equal(await page.getByText(/Alleen eigenaar/).count(),0)
 assert.equal(await page.evaluate(()=>window.test.queue.getState().items.length),0)
 await page.evaluate(()=>window.test.switch('test-owner'))
 assert.equal(await page.evaluate(()=>window.test.queue.getState().items[0].snapshot.notes),'Alleen eigenaar')
 console.log('PASS WebKit iPhone: account switch hides both private recovery and pending shared drafts and restores the owner queue')
 await context.setOffline(false)
 await page.getByRole('status').filter({hasText:'wijzigingen opgeslagen'}).waitFor()
 const other=await context.newPage();await other.goto(url);await other.getByText('Gedeeld opslaan',{exact:true}).waitFor()
 await context.setOffline(true)
 await Promise.all([page.evaluate(()=>window.test.edit({notes:'Tab een'})),other.evaluate(()=>window.test.edit({status:'done'}))])
 await page.waitForFunction(()=>window.test.queue.getState().items.length===2)
 await other.waitForFunction(()=>window.test.queue.getState().items.length===2)
 assert.equal(await page.evaluate(()=>new Set(window.test.queue.getState().items.map(w=>w.deviceId)).size),2)
 await context.setOffline(false)
 await page.waitForFunction(()=>window.test.queue.getState().items.length===0)
 await other.waitForFunction(()=>window.test.queue.getState().items.length===0)
 assert.deepEqual(errors,[])
 console.log('PASS WebKit iPhone: two tabs retain both simultaneous offline operations with distinct cursors and acknowledge only completed writes')
}catch(error){
 const page=browser?.contexts()[0]?.pages()[0]
 if(page)console.error('Mobile write diagnostic:',await page.evaluate(()=>({online:navigator.onLine,mode:window.test?.mode,queue:window.test?.queue.getState(),calls:window.test?.calls.length,text:document.body.innerText})).catch(()=>null))
 throw error
}finally{await browser?.close();await server.close()}
