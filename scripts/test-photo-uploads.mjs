import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import ts from 'typescript'
import {create} from 'zustand'
let valid=true,user={uid:'owner'},mode='ok',calls=0,local=true,failMetadata=false,waiter=null
let layers=[]
const reset=()=>{valid=true;user={uid:'owner'};mode='ok';calls=0;local=true;failMetadata=false;layers=[{id:'layer',points:[{id:'point',photos:[{id:'photo',pendingUpload:true,uploadOwnerUid:'owner'},{id:'other',imageUrl:'existing'}]}]}]}
const points={getState:()=>({layers,updatePhotoInPoint:(l,p,id,fields)=>{if(failMetadata)return false;const photo=layers.find(x=>x.id===l)?.points.find(x=>x.id===p)?.photos.find(x=>x.id===id);if(!photo)return false;Object.assign(photo,fields);return true}})}
const mocks={'zustand':{create},'../lib/photoStorage':{getPhoto:async()=>local?{fullImage:new Blob(['full']),thumbnail:new Blob(['thumb'])}:null},'../lib/firebase':{uploadPointPhoto:async()=>{calls++;if(waiter)await waiter;if(mode==='denied')throw {code:'storage/unauthorized'};return {imageUrl:'full-url',thumbnailUrl:'thumb-url'}}},'../store/customPointLayerStore':{useCustomPointLayerStore:points},'../store/authStore':{useAuthStore:{getState:()=>({user,ready:true})}},'../utils/accountStorage':{accountPhotoKey:id=>id,accountSession:()=>()=>valid}}
Object.defineProperty(globalThis,'navigator',{value:{onLine:true},configurable:true})
const source=ts.transpileModule(readFileSync('src/services/photoUploads.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
const module={exports:{}};Function('require','module','exports',source)(name=>{if(!mocks[name])throw Error(name);return mocks[name]},module,module.exports)
const {flushPhotoUploads,retryPhotoUploads,usePhotoUploadState,photoUploadError}=module.exports
const fresh=()=>{reset();usePhotoUploadState.setState({uid:null,busy:false,errors:{}})}
fresh();navigator.onLine=false;await flushPhotoUploads('owner');assert.equal(calls,0);navigator.onLine=true;await flushPhotoUploads('owner');assert.equal(layers[0].points[0].photos[0].pendingUpload,false);assert.equal(layers[0].points[0].photos[1].imageUrl,'existing')
console.log('PASS Photo upload: offline retains pending file, success acknowledges only selected photo')
fresh();mode='denied';await flushPhotoUploads('owner');assert.equal(layers[0].points[0].photos[0].pendingUpload,true);assert.equal(Object.values(usePhotoUploadState.getState().errors)[0].retryable,false);await flushPhotoUploads('owner');assert.equal(calls,1);await retryPhotoUploads('owner',true);assert.equal(calls,1);mode='ok';await retryPhotoUploads('owner');assert.equal(calls,2);assert.equal(layers[0].points[0].photos[0].pendingUpload,false)
console.log('PASS Photo upload: terminal failure is visible, no retry loop, explicit retry preserves and uploads draft')
fresh();let resolve;waiter=new Promise(r=>resolve=r);const pending=flushPhotoUploads('owner');await new Promise(r=>setTimeout(r,0));user={uid:'other'};valid=false;resolve();await pending;waiter=null;assert.equal(layers[0].points[0].photos[0].imageUrl,undefined);assert.equal(layers[0].points[0].photos[0].pendingUpload,true)
console.log('PASS Photo upload: late old-account completion cannot attach URLs or acknowledge pending file')
fresh();waiter=new Promise(r=>resolve=r);const removed=flushPhotoUploads('owner');await new Promise(r=>setTimeout(r,0));layers[0].points[0].photos.shift();resolve();await removed;waiter=null;assert.equal(layers[0].points[0].photos.length,1);assert.equal(layers[0].points[0].photos[0].id,'other')
console.log('PASS Photo upload: deletion during upload never resurrects photo or modifies another photo')
fresh();layers[0].buddyRole='read';await flushPhotoUploads('owner');assert.equal(calls,0);layers[0].buddyRole='owner';layers[0].points[0].photos[0].uploadOwnerUid='other';await flushPhotoUploads('owner');assert.equal(calls,0)
console.log('PASS Photo upload: read-only layer and another uploader are never sent')
fresh();local=false;await flushPhotoUploads('owner');assert.equal(calls,0);assert.equal(layers[0].points[0].photos[0].pendingUpload,true);assert.match(Object.values(usePhotoUploadState.getState().errors)[0].message,/ontbreekt/)
fresh();failMetadata=true;await flushPhotoUploads('owner');assert.equal(calls,0);assert.equal(layers[0].points[0].photos[0].pendingUpload,true);assert.equal(Object.values(usePhotoUploadState.getState().errors)[0].retryable,false)
assert.equal(photoUploadError({code:'storage/retry-limit-exceeded'}).retryable,true)
console.log('PASS Photo upload: missing full image and metadata quota failure remain pending with actionable error')
