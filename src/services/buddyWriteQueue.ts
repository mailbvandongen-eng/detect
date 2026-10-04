import type { User } from 'firebase/auth'
import { applyBuddyWrite } from './buddyLayers'
import { useBuddyWriteStore, acknowledgeBuddyWrite, failBuddyWrite } from '../store/buddyWriteStore'
import { writeTarget } from '../utils/buddyWrites'

let flight: {uid:string; valid:()=>boolean; promise:Promise<void>} | null=null
export function flushBuddyWrites(user: User, isCurrent:()=>boolean): Promise<void> {
  if(!isCurrent() || !navigator.onLine)return Promise.resolve()
  if(flight?.uid===user.uid && flight.valid())return flight.promise
  const run=async()=>{
    while(isCurrent() && navigator.onLine) {
      const items=useBuddyWriteStore.getState().items.filter(item=>item.uid===user.uid)
      const blocked=new Set(items.filter(item=>item.status==='failed').map(writeTarget))
      const blockedLayers=new Set(items.filter(item=>item.status==='failed'&&item.mutation.kind==='deleteLayer').map(item=>item.buddyLayerId))
      const next=items.find(item=>item.status==='pending'&&!blocked.has(writeTarget(item))&&!blockedLayers.has(item.buddyLayerId))
      if(!next)break
      useBuddyWriteStore.setState({sending:next.id})
      try {
        await applyBuddyWrite(next,isCurrent)
        if(!isCurrent())return
        if(!acknowledgeBuddyWrite(next.id))break
      } catch(error) {
        if(!isCurrent())return
        const code=(error as {code?:string})?.code?.replace('firestore/','')
        const retryable=!navigator.onLine||['unavailable','deadline-exceeded','aborted'].includes(code || '')
        const message=code==='permission-denied'?'Je hebt geen bewerkrechten meer. Je lokale wijzigingen blijven bewaard.':error instanceof Error?error.message:'Opslaan mislukt. Je lokale wijzigingen blijven bewaard.'
        failBuddyWrite(next.id,message,retryable)
        if(retryable)break
      } finally {
        if(isCurrent())useBuddyWriteStore.setState({sending:null})
      }
    }
  }
  const request={uid:user.uid,valid:isCurrent,promise:Promise.resolve()}
  request.promise=run().finally(()=>{if(flight===request)flight=null})
  flight=request
  return request.promise
}
