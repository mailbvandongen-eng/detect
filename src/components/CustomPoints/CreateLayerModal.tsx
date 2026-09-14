import { useState } from 'react'
import { Layers } from 'lucide-react'
import { useUIStore } from '../../store'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'
import { AppWindow } from '../UI/AppWindow'

export function CreateLayerModal() {
  const createLayerModalOpen = useUIStore(state => state.activeWindow === 'createLayer')
  const backWindow = useUIStore(state => state.backWindow)
  const { addLayer } = useCustomPointLayerStore()

  const [name, setName] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return

    addLayer(name.trim(), [])

    setName('')
    backWindow()
  }

  const handleClose = () => {
    setName('')
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
            disabled={!name.trim()}
            className="detect-window-primary-button flex-1 disabled:opacity-50"
          >
            Aanmaken
          </button>
        </div>
      }
    >
            <div className="p-4">
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
            </div>
    </AppWindow>
  )
}
