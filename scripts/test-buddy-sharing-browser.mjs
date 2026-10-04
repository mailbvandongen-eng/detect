import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const require = createRequire(process.env.BUDDY_BROWSER_MODULE_ROOT
  ? process.env.BUDDY_BROWSER_MODULE_ROOT + '/package.json' : import.meta.url)
const { webkit, devices } = require('playwright')
const fixture = `
import {activatePrivateAccount} from '/src/services/privateAccountData';
import React from 'react'; import {createRoot} from 'react-dom/client';
import {ThemesPanel} from '/src/components/LayerControl/ThemesPanel';
import {CreateLayerModal} from '/src/components/CustomPoints/CreateLayerModal';
import {OpacitySliders} from '/src/components/UI/OpacitySliders';
import {useCustomLayerStore as imports} from '/src/store/customLayerStore';
import {useUIStore} from '/src/store';
import {useAuthStore} from '/src/store/authStore';
import {useCustomPointLayerStore as points} from '/src/store/customPointLayerStore';
import {useSettingsStore as settings} from '/src/store/settingsStore';
import '/src/style.css'; import '/src/detect-theme.css';
const owner={uid:'test-owner',email:'owner@example.com'};
await activatePrivateAccount(owner.uid);
useAuthStore.setState({user:owner});
points.setState({layers:[{id:'buddy-test',name:'Frankrijk 2026 gedeeld',color:'#06b6d4',visible:true,archived:false,points:[],categories:[],createdAt:'2026-10-04'}]});
imports.setState({layers:[{id:'import-test',name:'Import test',features:{type:'FeatureCollection',features:[]},visible:true,opacity:1}]});
settings.setState({fontScale:130,uiTheme:'purple',colorScheme:'dark'});
useUIStore.setState({activeWindow:'layers'});
window.test={points,imports,openLayers:()=>useUIStore.setState({activeWindow:'layers'}),calls:[],fail:false,signOut:()=>useAuthStore.setState({user:null}),switchAccount:async uid=>{useAuthStore.setState({user:null});await activatePrivateAccount(uid);useAuthStore.setState({user:uid?{uid,email:uid==='test-owner'?'owner@example.com':'other@example.com'}:null});useUIStore.setState({activeWindow:'layers'})},theme:(value,scheme)=>{document.documentElement.dataset.detectTheme=value;document.documentElement.dataset.detectColorScheme=scheme}};
window.test.theme('purple','dark');
createRoot(document.getElementById('root')).render(<><ThemesPanel/><CreateLayerModal/><OpacitySliders/></>);
`
const service = `
export const normalizeBuddyEmail=email=>email.trim().toLowerCase();
export async function addBuddyMember(user,id,email,permission){
 window.test.calls.push({email,permission,id});
 if(window.test.fail)throw new Error('Test: delen geweigerd');
 await new Promise(resolve=>setTimeout(resolve,60));
}
export async function shareOwnPointLayer(user,layer,email,permission){
 await addBuddyMember(user,'test-layer',email,permission);
 return {id:'test-layer',sourceLayerId:layer.id,name:layer.name,color:layer.color,ownerUid:user.uid,ownerEmail:user.email,memberEmails:[user.email,email],editEmails:permission==='edit'?[email]:[],readEmails:permission==='read'?[email]:[]};
}
export async function removeBuddyMember(){}
export async function createBuddyLayer(){}
export async function saveBuddyPoint(){}
export async function deleteBuddyPoint(){}
export async function deleteBuddyLayer(){}
export async function updateBuddyLayerMetadata(){}
`
const fixtureId=resolve('buddy-fixture.jsx')
const server = await createServer({configFile:false,optimizeDeps:{entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','zustand/middleware/immer','immer','framer-motion','lucide-react','firebase/app','firebase/auth','firebase/firestore']},server:{host:'127.0.0.1',port:0},plugins:[{
 name:'buddy-browser-fixture',enforce:'pre',
 resolveId(id){if(id.includes('services/buddyLayers'))return '\0buddy-service';if(id==='/buddy-fixture.jsx')return fixtureId},
 load(id){if(id==='\0buddy-service')return service;if(id===fixtureId)return fixture},
 configureServer(server){server.middlewares.use('/buddy-test',async(_,res)=>{res.setHeader('Content-Type','text/html');res.end(await server.transformIndexHtml('/buddy-test','<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module" src="/buddy-fixture.jsx"></script></body></html>'))})},
},react()]})
await server.listen()
let browser
try {
 browser=await webkit.launch({headless:true})
 const context=await browser.newContext({...devices['iPhone 13'],viewport:{width:390,height:844}})
 const page=await context.newPage()
 page.on('pageerror',error=>console.error(error.stack))
 await page.goto(server.resolvedUrls.local[0]+'buddy-test')
 await page.getByTitle('Laaginstellingen',{exact:true}).first().tap()
 const input=page.getByRole('textbox',{name:'Google-e-mailadres',exact:true})
 await input.tap()
 await input.pressSequentially('Buddy@Example.com')
 assert.equal(await input.inputValue(),'Buddy@Example.com')
 assert.equal(await input.evaluate(el=>el===document.activeElement),true)
 assert.ok((await input.boundingBox()).width>=230,'Email must remain full width on iPhone at 130% text size')
 console.log('PASS WebKit iPhone: tap, focus and type into full-width recipient field at 130%')
 await page.getByRole('button',{name:'Toegang geven',exact:true}).tap()
 await page.getByRole('status').filter({hasText:'buddy@example.com'}).waitFor()
 assert.equal(await input.inputValue(),'')
 assert.deepEqual(await page.evaluate(()=>window.test.calls[0]),{email:'buddy@example.com',permission:'edit',id:'test-layer'})
 await page.getByText('buddy@example.com',{exact:true}).waitFor()
 console.log('PASS private layer promotion and successful share: normalized address, visible confirmation and member before listener update')
 await input.fill('reader@example.com')
 await page.getByLabel('Rechten',{exact:true}).selectOption('read')
 await input.press('Enter')
 await page.getByRole('status').filter({hasText:'reader@example.com'}).waitFor()
 assert.equal(await page.evaluate(()=>window.test.calls[1].permission),'read')
 console.log('PASS paste/fill, read permission and keyboard submit')
 await page.getByRole('button',{name:'Toegang intrekken voor reader@example.com',exact:true}).tap()
 await page.getByRole('status').filter({hasText:'Toegang ingetrokken'}).waitFor()
 assert.equal(await page.getByText('reader@example.com',{exact:true}).count(),0)
 console.log('PASS removing buddy updates member list after acknowledged write')
 await input.fill('geen-adres')
 await page.getByRole('button',{name:'Toegang geven',exact:true}).tap()
 await page.getByRole('alert').filter({hasText:'geldig'}).waitFor()
 assert.equal(await page.evaluate(()=>window.test.calls.length),2)
 await page.evaluate(()=>window.test.fail=true)
 await input.fill('failed@example.com')
 await page.getByRole('button',{name:'Toegang geven',exact:true}).tap()
 await page.getByRole('alert').filter({hasText:'geweigerd'}).waitFor()
 assert.equal(await input.inputValue(),'failed@example.com')
 console.log('PASS invalid email never sent; failed share keeps address and displays error')
 for(const theme of ['purple','forest','earth','blue'])for(const scheme of ['dark','light']){
   await page.evaluate(({theme,scheme})=>window.test.theme(theme,scheme),{theme,scheme})
   const expected={purple:['rgb(124, 90, 199)','rgb(104, 70, 178)'],forest:['rgb(22, 131, 95)','rgb(17, 106, 77)'],earth:['rgb(179, 106, 33)','rgb(146, 84, 22)'],blue:['rgb(59, 130, 246)','rgb(37, 99, 235)']}[theme]
   await page.waitForFunction(expected=>expected.includes(getComputedStyle([...document.querySelectorAll('button')].find(el=>el.textContent==='Toegang geven')).backgroundColor),expected)
   const colors=await page.getByRole('button',{name:'Toegang geven',exact:true}).evaluate(el=>({button:getComputedStyle(el).backgroundColor}))
   assert.ok(expected.includes(colors.button),`${theme}/${scheme}: ${colors.button}`)
   const fieldStyle=await page.getByLabel('Rechten',{exact:true}).evaluate(el=>({appearance:getComputedStyle(el).appearance,color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor}))
   assert.equal(fieldStyle.appearance,'none')
   assert.notEqual(fieldStyle.color,fieldStyle.background)
 }
 console.log('PASS share action follows all four chosen themes in light and dark')
 await page.evaluate(()=>window.test.theme('purple','dark'))
 await input.fill('')
 for(const width of [320,430]){
   await page.setViewportSize({width,height:844})
   await input.tap()
   await input.pressSequentially('test@example.com')
   assert.equal(await input.inputValue(),'test@example.com')
   const bounds=await input.boundingBox()
   assert.ok(bounds.width>=160&&bounds.x>=0&&bounds.x+bounds.width<=width)
   await input.fill('')
 }
 console.log('PASS recipient field usable at 320px and 430px widths')
 await page.setViewportSize({width:390,height:844})
 await page.getByRole('button',{name:'Nieuwe laag',exact:true}).tap()
 await page.getByLabel('Naam van de laag',{exact:true}).fill('Nieuwe eigen laag')
 assert.equal(await page.getByRole('button',{name:'Buddy-laag',exact:true}).count(),0)
 await page.getByRole('button',{name:'Aanmaken',exact:true}).tap()
 await page.getByTitle('Nieuwe eigen laag',{exact:true}).waitFor()
 const created=await page.evaluate(()=>window.test.points.getState().layers.find(layer=>layer.name==='Nieuwe eigen laag'))
 assert.equal(created.buddyLayerId,undefined)
 assert.equal(created.color,'#7c5ac7')
 console.log('PASS actual creation flow: immediately visible private layer in chosen purple')
 const importItem=page.getByTitle('Import test',{exact:true}).locator('..').locator('..')
 await importItem.getByTitle('Laaginstellingen',{exact:true}).tap()
 assert.equal(await importItem.getByRole('textbox',{name:'Google-e-mailadres',exact:true}).count(),0)
 console.log('PASS import settings offer no sharing form')
 await page.getByRole('button',{name:'Transparantie',exact:true}).tap()
 const importSlider=page.getByRole('slider',{name:/Import test/})
 await importSlider.press('ArrowLeft')
 assert.equal(await page.evaluate(()=>window.test.imports.getState().layers[0].opacity),0.99)
 console.log('PASS actual transparency control updates import store')
 await page.getByRole('dialog',{name:'Transparantie',exact:true}).getByRole('button',{name:'Transparantie sluiten',exact:true}).tap()
 await page.evaluate(()=>window.test.openLayers())
 await page.getByTitle('Laaginstellingen',{exact:true}).first().tap()
 if(process.env.BUDDY_SCREENSHOT)await page.screenshot({path:process.env.BUDDY_SCREENSHOT})
 await page.evaluate(()=>{window.test.theme('purple','dark');window.test.signOut()})
 await page.getByRole('alert').filter({hasText:'Log in'}).waitFor()
 console.log('PASS lost sign-in is visible instead of silently ignoring submit')
 await page.evaluate(()=>window.test.switchAccount('test-other'))
 assert.equal(await page.evaluate(()=>window.test.points.getState().layers.length),0)
 assert.equal(await page.evaluate(()=>window.test.imports.getState().layers.length),0)
 await page.evaluate(()=>window.test.points.getState().addLayer('Andere gebruiker'))
 await page.getByTitle('Andere gebruiker',{exact:true}).waitFor()
 await page.evaluate(()=>window.test.switchAccount('test-owner'))
 await page.getByTitle('Nieuwe eigen laag',{exact:true}).waitFor()
 await page.getByTitle('Import test',{exact:true}).waitFor()
 assert.equal(await page.getByTitle('Andere gebruiker',{exact:true}).count(),0)
 assert.equal(await page.evaluate(()=>window.test.points.getState().layers.find(layer=>layer.name==='Nieuwe eigen laag').color),'#7c5ac7')
 console.log('PASS iPhone account switch isolates points/imports and restores own private layer and purple color')
} finally {await browser?.close();await server.close()}
