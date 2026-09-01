import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { useUIStore } from '../../store'
import { useCustomPointLayerStore, type PhotoData } from '../../store/customPointLayerStore'
import { PhotoCapture } from './PhotoCapture'
import { AppWindow } from '../UI/AppWindow'

export function AddPointModal() {
  const addPointModalOpen = useUIStore(state => state.activeWindow === 'addPoint')
  const addPointModalLayerId = useUIStore(state => state.addPointModalLayerId)
  const addPointModalLocation = useUIStore(state => state.addPointModalLocation)
  const closeAddPointModal = useUIStore(state => state.closeAddPointModal)
  const { addPoint, getLayer } = useCustomPointLayerStore()

  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [url, setUrl] = useState('')
  const [photos, setPhotos] = useState<PhotoData[]>([])

  const layer = addPointModalLayerId ? getLayer(addPointModalLayerId) : null

  const handleSubmit = () => {
    if (!name.trim() || !addPointModalLayerId || !addPointModalLocation) return

    addPoint(addPointModalLayerId, {
      name: name.trim(),
      category: 'Overig',
      notes: notes.trim(),
      url: url.trim() || undefined,
      coordinates: [addPointModalLocation.lng, addPointModalLocation.lat],
      photos: photos.length > 0 ? photos : undefined
    })

    // Reset form
    setName('')
    setNotes('')
    setUrl('')
    setPhotos([])
    closeAddPointModal()
  }

  const handleClose = () => {
    setName('')
    setNotes('')
    setUrl('')
    setPhotos([])
    closeAddPointModal()
  }

  if (!layer) return null

  return (
    <AppWindow
      isOpen={addPointModalOpen}
      title="Punt toevoegen"
      icon={<MapPin size={18} />}
      placement="modal"
      onClose={handleClose}
      subHeader={
        <div className="px-4 py-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: layer.color }}
                />
                <span className="text-sm text-gray-600">{layer.name}</span>
              </div>
        </div>
      }
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
            Toevoegen
          </button>
        </div>
      }
    >
            <div className="p-4 space-y-3">
              {/* Point name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1" style={{ fontSize: '0.9em' }}>
                  Naam *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white rounded-lg border-0 outline-none hover:bg-blue-50 transition-colors"
                  style={{ fontSize: '1em' }}
                  autoFocus
                />
              </div>

              {/* Photos */}
              <PhotoCapture
                photos={photos}
                onAddPhoto={(photo) => setPhotos([...photos, photo])}
                onRemovePhoto={(photoId) => setPhotos(photos.filter(p => p.id !== photoId))}
              />

              {/* Notes */}
              <div>
                <label className="block font-medium text-gray-700 mb-1" style={{ fontSize: '0.9em' }}>
                  Notities
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Beschrijving, tips, opmerkingen..."
                  rows={2}
                  className="w-full px-3 py-1.5 bg-white rounded-lg border-0 outline-none hover:bg-blue-50 transition-colors resize-none"
                  style={{ fontSize: '1em' }}
                />
              </div>

              {/* URL */}
              <div>
                <label className="block font-medium text-gray-700 mb-1" style={{ fontSize: '0.9em' }}>
                  Link
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-1.5 bg-white rounded-lg border-0 outline-none hover:bg-blue-50 transition-colors"
                  style={{ fontSize: '1em' }}
                />
              </div>
            </div>
    </AppWindow>
  )
}
