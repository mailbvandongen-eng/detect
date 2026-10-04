import { upsertBuddyLayer } from '../../utils/buddyLayerState'
import { useBuddySyncStore } from '../../store/buddySyncStore'
import { useId, useState } from 'react'
import { Share2, X } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useCustomPointLayerStore, type CustomPointLayer } from '../../store/customPointLayerStore'
import { shareOwnPointLayer, addBuddyMember, removeBuddyMember, normalizeBuddyEmail, type BuddyPermission } from '../../services/buddyLayers'

export function BuddyLayerPanel({ layer }: { layer: CustomPointLayer }) {
  const user = useAuthStore(state => state.user)
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState<BuddyPermission>('edit')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fieldId = useId()

  const owner = !layer.buddyLayerId || layer.buddyRole === 'owner'
  const members = (layer.buddyMemberEmails || []).filter(item => item !== layer.buddyOwnerEmail)

  const handleAdd = async () => {
    if (busy) return
    setError(null)
    setSuccess(null)
    if (!user) {
      setError('Log in met Google om deze laag te delen.')
      return
    }
    const recipient = normalizeBuddyEmail(email)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      setError('Vul een geldig e-mailadres in.')
      return
    }
    setBusy(true)
    try {
      if (!layer.buddyLayerId) {
        const record = await shareOwnPointLayer(user, layer, recipient, permission)
        useCustomPointLayerStore.setState(state => ({ layers: upsertBuddyLayer(state.layers, record, user.uid, normalizeBuddyEmail(user.email || '')), deletedLayerIds: [...new Set([...state.deletedLayerIds, layer.id])] }))
        useBuddySyncStore.getState().refresh()
      } else {
        await addBuddyMember(user, layer.buddyLayerId, recipient, permission)
      }
      // Show the acknowledged change even before the cloud listener responds.
      useCustomPointLayerStore.setState(state => ({ layers: state.layers.map(item => {
        if (item.id !== layer.id) return item
        const withoutRecipient = (emails: string[] = []) => emails.filter(value => normalizeBuddyEmail(value) !== recipient)
        return { ...item,
          buddyMemberEmails: [...withoutRecipient(item.buddyMemberEmails), recipient],
          buddyEditEmails: [...withoutRecipient(item.buddyEditEmails), ...(permission === 'edit' ? [recipient] : [])],
          buddyReadEmails: [...withoutRecipient(item.buddyReadEmails), ...(permission === 'read' ? [recipient] : [])],
        }
      }) }))
      setEmail('')
      setSuccess(`Toegang gegeven aan ${recipient}.`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Toegang geven mislukt.')
    } finally {
      setBusy(false)
    }
  }

  const handleRemove = async (memberEmail: string) => {
    if (busy) return
    if (!user) { setError('Log in met Google om delen te beheren.'); return }
    setBusy(true)
    setError(null)
    setSuccess(null)
    try {
      await removeBuddyMember(user, layer.buddyLayerId!, memberEmail)
      useCustomPointLayerStore.setState(state => ({ layers: state.layers.map(item => item.buddyLayerId !== layer.buddyLayerId ? item : {
        ...item,
        buddyMemberEmails: item.buddyMemberEmails?.filter(value => value !== memberEmail),
        buddyEditEmails: item.buddyEditEmails?.filter(value => value !== memberEmail),
        buddyReadEmails: item.buddyReadEmails?.filter(value => value !== memberEmail),
      }) }))
      setSuccess(`Toegang ingetrokken voor ${memberEmail}.`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Buddy verwijderen mislukt.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="detect-sharing-panel rounded-lg p-3 text-xs">
      <div className="detect-accent-text mb-1 flex items-center gap-1.5 font-medium">
        <Share2 size={13} />
        Delen · {members.length ? 'Gedeeld' : 'Privé'}
      </div>
      <div className="mb-3 text-xs text-gray-500">
        {owner
          ? 'Deel met het Google-account waarmee je buddy in Detect inlogt. Er wordt geen e-mail verstuurd.'
          : `Gedeeld door ${layer.buddyOwnerEmail || 'een zoekmaatje'} · ${layer.buddyRole === 'edit' ? 'samen bewerken' : 'alleen bekijken'}.`}
      </div>

      {owner && (
        <form className="space-y-3" noValidate onSubmit={event => { event.preventDefault(); void handleAdd() }}>
          <div>
            <label htmlFor={`${fieldId}-email`} className="mb-1 block font-medium">Google-e-mailadres</label>
            <input
              id={`${fieldId}-email`}
              type="text"
              inputMode="email"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={email}
              onChange={event => { setEmail(event.target.value); setError(null); setSuccess(null) }}
              placeholder="naam@voorbeeld.nl"
              className="detect-form-field w-full"
              aria-describedby={`${fieldId}-help`}
              disabled={busy}
            />
          </div>
          <div>
            <label htmlFor={`${fieldId}-permission`} className="mb-1 block font-medium">Rechten</label>
            <select
              id={`${fieldId}-permission`}
              value={permission}
              onChange={event => setPermission(event.target.value as BuddyPermission)}
              className="detect-form-field w-full"
              disabled={busy}
            >
              <option value="edit">Samen bewerken</option>
              <option value="read">Alleen bekijken</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={!email.trim() || busy || !user}
            className="detect-window-primary-button w-full disabled:opacity-50"
          >
            {busy ? 'Bezig…' : 'Toegang geven'}
          </button>
          <p id={`${fieldId}-help`} className="text-xs text-gray-500">De ontvanger vindt de laag onder Mijn lagen na inloggen met dit adres.</p>
        </form>
      )}

      {members.length > 0 && (
        <div className="mt-2 space-y-1">
          {members.map(memberEmail => {
            const canEdit = (layer.buddyEditEmails || []).includes(memberEmail)
            return (
              <div key={memberEmail} className="detect-sharing-member flex items-center gap-2 rounded px-2 py-2">
                <span className="min-w-0 flex-1 break-all">{memberEmail}</span>
                <span className="text-[10px] text-gray-500">{canEdit ? 'bewerken' : 'bekijken'}</span>
                {owner && (
                  <button type="button" disabled={busy} onClick={() => handleRemove(memberEmail)} title="Buddy verwijderen" aria-label={`Toegang intrekken voor ${memberEmail}`} className="detect-window-icon-button shrink-0">
                    <X size={13} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {owner && members.length === 0 && (
        <div className="mt-2 text-[11px] text-gray-500">Deze puntenlaag is privé.</div>
      )}
      {success && <div role="status" className="mt-2 text-xs">{success}</div>}
      {owner && !user && <div role="alert" className="mt-2 text-xs">Log in met Google om deze laag te delen.</div>}
      {error && <div role="alert" className="mt-2 rounded bg-red-50 p-2 text-xs text-red-700">{error}</div>}
    </div>
  )
}
