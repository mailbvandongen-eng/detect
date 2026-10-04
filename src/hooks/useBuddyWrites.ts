import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useBuddySyncStore } from '../store/buddySyncStore'
import { useBuddyWriteStore, retryBuddyWrites } from '../store/buddyWriteStore'
import { accountSession } from '../utils/accountStorage'
import { flushBuddyWrites } from '../services/buddyWriteQueue'

export function useBuddyWrites() {
  const user=useAuthStore(state=>state.user)
  const items=useBuddyWriteStore(state=>state.items)
  const revision=useBuddySyncStore(state=>state.revision)
  useEffect(()=>{
    const reloadJournal=(event:StorageEvent)=>{if(event.key?.includes('detectorapp-buddy-writes:'))void useBuddyWriteStore.persist.rehydrate().catch(()=>useBuddyWriteStore.setState({storageError:'De lokale wachtrij kon niet worden geladen.'}))}
    window.addEventListener('storage',reloadJournal)
    return ()=>window.removeEventListener('storage',reloadJournal)
  },[])
  useEffect(()=>{
    if(!user)return
    const validSession=accountSession(user.uid)
    const valid=()=>validSession()&&useAuthStore.getState().user?.uid===user.uid
    const timer=window.setTimeout(()=>{if(valid())void flushBuddyWrites(user,valid)},200)
    return ()=>window.clearTimeout(timer)
  },[user,items,revision])
  useEffect(()=>{
    if(!user)return
    const validSession=accountSession(user.uid)
    const retry=()=>{
      const valid=()=>validSession()&&useAuthStore.getState().user?.uid===user.uid
      if(valid()&&navigator.onLine){retryBuddyWrites(true);void flushBuddyWrites(user,valid)}
    }
    const visible=()=>{if(document.visibilityState==='visible')retry()}
    const timer=items.some(item=>item.uid===user.uid&&item.status==='failed'&&item.retryable)?window.setTimeout(retry,30000):undefined
    window.addEventListener('online',retry)
    document.addEventListener('visibilitychange',visible)
    return ()=>{window.clearTimeout(timer);window.removeEventListener('online',retry);document.removeEventListener('visibilitychange',visible)}
  },[user,items])
}
