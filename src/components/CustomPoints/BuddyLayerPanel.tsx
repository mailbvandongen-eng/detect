import { useState } from 'react'
import { Share2, X } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import type { CustomPointLayer } from '../../store/customPointLayerStore'
import { addBuddyMember, removeBuddyMember, type BuddyPermission } from '../../services/buddyLayers'

export function BuddyLayerPanel({ layer }: { layer: CustomPointLayer }) {
  const user = useAuthStore(state => state.user)
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState<BuddyPermission>('edit')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!layer.buddyLayerId) return null

  const owner = layer.buddyRole === 'owner'
  const members = (layer.buddyMemberEmails || []).filter(item => item !== layer.buddyOwnerEmail)

  const handleAdd = async () => {
    if (!user || !email.trim() || busy) return
    setBusy(true)
    setError(null)
    try {
      await addBuddyMember(user, layer.buddyLayerId!, email, permission)
      setEmail('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Buddy toevoegen mislukt.')
    } finally {
      setBusy(false)
    }
  }

  const handleRemove = async (memberEmail: string) => {
    if (!user || busy) return
    setBusy(true)
    setError(null)
    try {
      await removeBuddyMember(user, layer.buddyLayerId!, memberEmail)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Buddy verwijderen mislukt.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-lg border border-cyan-100 bg-cyan-50/60 p-2 text-xs">
      <div className="mb-1 flex items-center gap-1.5 font-medium text-cyan-800">
        <Share2 size={13} />
        Buddy-laag
      </div>
      <div className="mb-2 text-[11px] text-cyan-700">
        {owner
          ? 'Jij bent eigenaar. Punten worden direct met alle buddies gesynchroniseerd.'
          : `Gedeeld door ${layer.buddyOwnerEmail || 'een zoekmaatje'} · ${layer.buddyRole === 'edit' ? 'samen bewerken' : 'alleen bekijken'}.`}
      </div>

      {owner && (
        <>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Google-e-mailadres"
              className="min-w-0 flex-1 rounded-lg border border-cyan-200 bg-white px-2 py-1.5"
            />
            <select
              value={permission}
              onChange={event => setPermission(event.target.value as BuddyPermission)}
              className="rounded-lg border border-cyan-200 bg-white px-2 py-1.5"
            >
              <option value="edit">Samen bewerken</option>
              <option value="read">Alleen bekijken</option>
            </select>
          </div>
          <button
            onClick={handleAdd}
            disabled={!email.trim() || busy}
            className="mt-2 w-full rounded-lg bg-cyan-600 px-3 py-1.5 font-medium text-white disabled:opacity-50"
          >
            {busy ? 'Bezig…' : 'Buddy toevoegen'}
          </button>
        </>
      )}

      {members.length > 0 && (
        <div className="mt-2 space-y-1">
          {members.map(memberEmail => {
            const canEdit = (layer.buddyEditEmails || []).includes(memberEmail)
            return (
              <div key={memberEmail} className="flex items-center gap-2 rounded bg-white/80 px-2 py-1.5">
                <span className="min-w-0 flex-1 truncate">{memberEmail}</span>
                <span className="text-[10px] text-gray-500">{canEdit ? 'bewerken' : 'bekijken'}</span>
                {owner && (
                  <button onClick={() => handleRemove(memberEmail)} title="Buddy verwijderen" className="text-gray-400 hover:text-red-600">
                    <X size={13} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {owner && members.length === 0 && (
        <div className="mt-2 text-[11px] text-gray-500">Nog niet gedeeld.</div>
      )}
      {error && <div className="mt-2 rounded bg-red-50 p-2 text-[11px] text-red-700">{error}</div>}
    </div>
  )
}
