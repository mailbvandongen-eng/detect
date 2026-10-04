import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {readFileSync} from 'node:fs'
const require=createRequire(process.env.BUDDY_TEST_MODULE_ROOT?process.env.BUDDY_TEST_MODULE_ROOT+'/package.json':import.meta.url)
const {initializeTestEnvironment,assertSucceeds,assertFails}=require('@firebase/rules-unit-testing')
const {ref,uploadBytes,getBytes,listAll,deleteObject}=require('firebase/storage')
const env=await initializeTestEnvironment({projectId:'demo-detect-photos',storage:{host:'127.0.0.1',port:9199,rules:readFileSync('storage.rules','utf8')}})
try {
 const path='users/owner/layers/layer/points/point/photo_123-full.jpg'
 const owner=env.authenticatedContext('owner').storage(),other=env.authenticatedContext('other').storage(),anon=env.unauthenticatedContext().storage()
 await assertSucceeds(uploadBytes(ref(owner,path),new Uint8Array([1,2]),{contentType:'image/jpeg'}))
 await assertSucceeds(getBytes(ref(owner,path)))
 await assertFails(uploadBytes(ref(other,path),new Uint8Array([3]),{contentType:'image/jpeg'}))
 await assertFails(getBytes(ref(other,path)))
 await assertFails(getBytes(ref(anon,path)))
 await assertFails(listAll(ref(owner,'users/owner/layers/layer/points/point')))
 await assertFails(uploadBytes(ref(owner,path),new Uint8Array([1]),{contentType:'text/html'}))
 await assertFails(uploadBytes(ref(owner,path),new Uint8Array(5*1024*1024),{contentType:'image/jpeg'}))
 await assertFails(uploadBytes(ref(owner,'users/owner/arbitrary.html'),new Uint8Array([1]),{contentType:'image/jpeg'}))
 await assertFails(deleteObject(ref(other,path)))
 await assertSucceeds(deleteObject(ref(owner,path)))
 console.log('PASS Storage emulator: owner upload/read/delete, account isolation, deny lists/anonymous/HTML/oversize/arbitrary paths')
} finally {await env.cleanup()}
