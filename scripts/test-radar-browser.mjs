import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
const require = createRequire(process.env.BUDDY_BROWSER_MODULE_ROOT ? process.env.BUDDY_BROWSER_MODULE_ROOT + '/package.json' : import.meta.url)
const { webkit, devices } = require('playwright')
const fixtureId = resolve('radar-fixture.jsx')
const fixture = `
import React from 'react';import {createRoot} from 'react-dom/client';
import {WeatherWidget} from '/src/components/Weather/WeatherWidget';
import {RainRadarLayer} from '/src/components/Weather/RainRadarLayer';
import {useWeatherStore as weather} from '/src/store/weatherStore';
import {useMapStore as maps} from '/src/store/mapStore';
import '/src/style.css';import '/src/detect-theme.css';
const layers=[];maps.setState({map:{addLayer:l=>layers.push(l),removeLayer:l=>{const i=layers.indexOf(l);if(i>=0)layers.splice(i,1)},getView:()=>({getCenter:()=>[0,0]})}});
window.test={weather,layers};
function Test(){const visible=weather(s=>s.showBuienradar);return <div data-detect-theme="purple"><button id="map-control">Kaart bedienen</button><WeatherWidget/><RainRadarLayer isVisible={visible} onClose={()=>weather.getState().setShowBuienradar(false)}/></div>}
createRoot(document.getElementById('root')).render(<Test/>);
`
const server=await createServer({configFile:false,optimizeDeps:{noDiscovery:true,entries:[fixtureId],include:['react','react-dom/client','react/jsx-runtime','zustand','zustand/middleware','lucide-react','framer-motion','ol/proj']},server:{host:'127.0.0.1',port:0},plugins:[{name:'radar-fixture',enforce:'pre',resolveId(id,importer){if(id==='../../store'&&importer?.endsWith('WeatherWidget.tsx'))return '\0radar-stores';if(id==='/radar-fixture.jsx')return fixtureId},load(id){if(id===fixtureId)return fixture;if(id==='\0radar-stores')return `import {create} from 'zustand';export * from '/src/store/weatherStore';export {useMapStore} from '/src/store/mapStore';export const useSettingsStore=create(()=>({showWeatherButton:true,showFontSliders:false,weatherFontScale:100}));export const useGPSStore=create(()=>({position:null}));`},configureServer(s){s.middlewares.use('/radar-test',async(_,res)=>{res.setHeader('Content-Type','text/html');res.end(await s.transformIndexHtml('/radar-test','<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div><script type="module" src="/radar-fixture.jsx"></script></body></html>'))})}},react()]})
await server.listen();let browser
try{
 browser=await webkit.launch({headless:true});const context=await browser.newContext({...devices['iPhone 13']});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{if(!localStorage.getItem('detectorapp-weather'))localStorage.setItem('detectorapp-weather',JSON.stringify({state:{showBuienradar:true,selectedLocationId:'saved',savedLocations:[{id:'saved',name:'Thedirac',lat:44,lon:1}],weatherData:{lastUpdated:Date.now(),location:{lat:52.1326,lon:5.2913,name:'Nederland'},current:{temperature:18,apparentTemperature:17,windSpeed:10,windDirection:90,windGusts:20,cloudCover:20,weatherCode:0},hourly:[],precipitation15min:[]}},version:0}))});
 let radarMode='ok';let pending
 await page.route('https://api.rainviewer.com/**',async route=>{if(radarMode==='pending'){pending=route;return}await route.fulfill({status:radarMode==='error'?503:200,contentType:'application/json',body:JSON.stringify({radar:{past:[{path:'/one',time:1},{path:'/two',time:2}]}})})});
 const url=server.resolvedUrls.local[0]+'radar-test';await page.goto(url);await page.waitForFunction(()=>!!window.test);
 assert.equal(await page.evaluate(()=>window.test.weather.getState().showBuienradar),false,'Old persisted radar-open flag is ignored');
 async function open(){await page.getByRole('button').filter({hasText:'18°'}).click();await page.getByRole('button',{name:'Radar',exact:true}).click();await page.getByRole('button',{name:'Regenradar sluiten',exact:true}).waitFor()}
 async function closed(){await page.getByRole('region',{name:'Regenradar',exact:true}).waitFor({state:'detached'});assert.equal(await page.evaluate(()=>window.test.layers.length),0);assert.equal(await page.evaluate(()=>window.test.weather.getState().showBuienradar),false)}
 for(let i=0;i<3;i++){await open();await page.waitForFunction(()=>window.test.layers.length===1);const close=page.getByRole('button',{name:'Regenradar sluiten',exact:true});const box=await close.boundingBox();assert.ok(box.height>=44&&box.width>=44);await page.getByRole('region',{name:'Regenradar',exact:true}).locator('input').first().fill('0');await close.tap();await closed()}
 await open();await page.getByRole('button',{name:'Regenradar uitzetten',exact:true}).tap();await closed();
 radarMode='error';await open();await page.getByText('Radar tijdelijk niet beschikbaar.',{exact:false}).waitFor();await page.getByRole('button',{name:'Regenradar sluiten',exact:true}).tap();await closed();
 radarMode='pending';await open();await page.waitForFunction(()=>document.body.innerText.includes('Radar bijwerken'));await page.getByRole('button',{name:'Regenradar uitzetten',exact:true}).tap();await closed();await pending.fulfill({status:200,contentType:'application/json',body:'{"radar":{"past":[{"path":"/late","time":3}]}}'});assert.equal(await page.evaluate(()=>window.test.layers.length),0);
 radarMode='ok';for(const viewport of [{width:320,height:568},{width:844,height:390}]){await page.setViewportSize(viewport);await open();const button=page.getByRole('button',{name:'Regenradar sluiten',exact:true});const b=await button.boundingBox();assert.ok(b.x>=0&&b.y>=0&&b.x+b.width<=viewport.width&&b.y+b.height<=viewport.height);await button.tap();await closed()}await page.setViewportSize({width:390,height:844});await open();await page.keyboard.press('Escape');await closed();await open();await page.reload();await page.waitForFunction(()=>!!window.test);await closed();assert.equal(await page.evaluate(()=>window.test.weather.getState().savedLocations[0].name),'Thedirac');assert.equal(await page.evaluate(()=>window.test.weather.getState().weatherData.current.temperature),18);assert.equal(JSON.parse(await page.evaluate(()=>localStorage.getItem('detectorapp-weather'))).state.showBuienradar,undefined);assert.deepEqual(errors,[]);
 console.log('iPhone/WebKit: repeat open/close, two exits, sliders, error/loading, late response, Escape, legacy/reload and weather/location preservation passed.')
}finally{await browser?.close();await server.close()}
