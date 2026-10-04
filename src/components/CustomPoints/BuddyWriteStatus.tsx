import { useBuddyWriteStore, retryBuddyWrites, forgetBuddyWrites } from '../../store/buddyWriteStore'
import { useAuthStore } from '../../store/authStore'
import { useCustomPointLayerStore, type CustomPointLayer } from '../../store/customPointLayerStore'
import { overlayBuddyPoints } from '../../utils/buddyWrites'
import { accountStorage, accountSession } from '../../utils/accountStorage'

export function BuddyWriteStatus() {
  const uid=useAuthStore(state=>state.user?.uid)
  const queue=useBuddyWriteStore()
  const items=queue.items.filter(item=>item.uid===uid)
  const failed=items.filter(item=>item.status==='failed')
  if(!items.length&&!queue.storageError&&!queue.lastSavedAt)return null
  const recover=()=>{
    try {
      if(!uid || !accountSession(uid)())return
      const store=useCustomPointLayerStore.getState()
      const recoveredIds=new Set<string>()
      const copies=[...new Set(items.map(item=>item.buddyLayerId))].flatMap(id=>{
        const writes=items.filter(item=>item.buddyLayerId===id)
        const snapshots=[...new Map(writes.filter(item=>item.snapshot).map(item=>[item.snapshot!.id,item.snapshot!])).values()]
        const points=overlayBuddyPoints(snapshots,writes)
        if(!points.length)return []
        recoveredIds.add(id)
        const source=writes[0].layer
        return [{id:`local-copy-${writes[0].id}`,name:`${source.name} (lokale kopie)`,color:source.color,categories:source.categories,points,visible:true,archived:false,createdAt:new Date().toISOString()}]
      })
      if(!copies.length) {useBuddyWriteStore.setState({storageError:'Deze bewerkingen bevatten geen punten om als privélaag te bewaren.'});return}
      const next:CustomPointLayer[]=store.layers.map(layer=>({...layer,points:[...layer.points]}))
      for(const copy of copies){
        const existing=next.find(layer=>layer.id===copy.id)
        if(!existing){next.push(copy);continue}
        // A repeated recovery must preserve edits made in the previous copy.
        for(const point of copy.points){
          if(existing.points.some(saved=>JSON.stringify(saved)===JSON.stringify(point)))continue
          existing.points=[...existing.points,{...point,id:existing.points.some(saved=>saved.id===point.id)?crypto.randomUUID():point.id}]
        }
      }
      accountStorage.setItem('detectorapp-custom-point-layers',JSON.stringify({state:{...store,layers:next.filter(layer=>!layer.buddyLayerId)},version:7}))
      useCustomPointLayerStore.setState({layers:next})
      forgetBuddyWrites(items.filter(item=>recoveredIds.has(item.buddyLayerId)).map(item=>item.id))
    } catch {useBuddyWriteStore.setState({storageError:'De privé-kopie kon niet worden opgeslagen. Je oorspronkelijke wijzigingen blijven in de wachtrij.'})}
  }
  return <div className="rounded-lg px-2 py-2 text-xs" style={{background:'var(--detect-accent-soft)',color:'var(--detect-window-text)'}}>
    <p role={failed.length||queue.storageError?'alert':'status'}>{queue.storageError || (failed.length?`${failed.length} wijziging(en) niet opgeslagen. ${failed[0].error}`:items.length?queue.sending?'Gedeelde wijzigingen opslaan…':`${items.length} wijziging(en) lokaal bewaard · wachten op verbinding`:'Gedeelde wijzigingen opgeslagen.')}</p>
    {!!items.length&&<p className="mt-1">Nog niet opgeslagen wijzigingen blijven op dit apparaat bewaard.</p>}
    {!!items.length&&(!!failed.length||!!queue.storageError)&&<div className="flex flex-wrap gap-2 mt-2">
      <button className="detect-window-secondary-button" onClick={()=>{retryBuddyWrites();window.dispatchEvent(new Event('detect-buddy-refresh'))}}>Opnieuw opslaan</button>
      <button className="detect-window-secondary-button" onClick={recover}>Bewaar wijzigingen als privélaag</button>
      <button className="detect-window-secondary-button" onClick={()=>{if(window.confirm('Mislukte bewerkingen annuleren? Bewaar gewenste puntwijzigingen eerst als privélaag.')){forgetBuddyWrites(failed.map(item=>item.id));window.dispatchEvent(new Event('detect-buddy-refresh'))}}}>Mislukte bewerkingen annuleren</button>
    </div>}
  </div>
}
