import { useState } from 'react'
import { Layers } from 'lucide-react'
import { useUIStore, useAuthStore } from '../../store'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'
import { AppWindow } from '../UI/AppWindow'
import { createBuddyLayer } from '../../services/buddyLayers'

export function CreateLayerModal() {
  const createLayerModalOpen = useUIStore(state => state.activeWindow === 'createLayer')
  const backWindow = useUIStore(state => state.backWindow)
  const { addLayer } = useCustomPointLayerStore()
  const user = useAuthStore(state => state.user)

  const [name, setName] = useState('')
  const [layerType, setLayerType] = useState<'private' | 'buddy'>('private')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!name.trim() || busy) return
    setError(null)

    if (layerType === 'buddy') {
      if (!user) {
        setError('Log in met Google om een buddy-laag te maken.')
        return
      }
      setBusy(true)
      try {
        await createBuddyLayer(user, name.trim())
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : 'Buddy-laag aanmaken mislukt.')
        setBusy(false)
        return
      }
      setBusy(false)
    } else {
      addLayer(name.trim(), [])
    }

    setName('')
    setLayerType('private')
    backWindow()
  }

  const handleClose = () => {
    setName('')
    setLayerType('private')
    setError(null)
    backWindow()
  }

  return (
    <AppWindow
      isOpen={createLayerModalOpen}
      title="Nieuwe laag"
      icon={<Layers size={18} />}
      placement="modal"
      onClose={handleClose}
      onBack={handleClose}
      footer={
        <div className="flex gap-3">
          <button onClick={handleClose} className="detect-window-secondary-button flex-1">
            Annuleren
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || busy}
            className="detect-window-primary-button flex-1 disabled:opacity-50"
          >
            {busy ? 'Aanmaken…' : 'Aanmaken'}
          </button>
        </div>
      }
    >
            <div className="p-4">
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '0.9em' }}>
                  Soort laag
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLayerType('private')}
                    className={`rounded-lg px-3 py-2 text-sm border ${layerType === 'private' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600'}`}
                  >
                    Privé
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayerType('buddy')}
                    className={`rounded-lg px-3 py-2 text-sm border ${layerType === 'buddy' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-200 bg-white text-gray-600'}`}
                  >
                    Buddy-laag
                  </button>
                </div>
                {layerType === 'buddy' && (
                  <p className="mt-2 text-xs text-gray-500">Samen punten beheren met zoekmaatjes. Delen stel je na het aanmaken in.</p>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1" style={{ fontSize: '0.9em' }}>
                  Naam van de laag
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="bijv. Contactpunten"
                  className="w-full px-3 py-2 bg-white rounded-lg border-0 outline-none hover:bg-blue-50 transition-colors"
                  style={{ fontSize: '1em' }}
                  autoFocus
                  onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
                />
              </div>
              {error && <div className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div>}
            </div>
    </AppWindow>
  )
}
