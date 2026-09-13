import { useState } from 'react'
import { MapPin, Phone } from 'lucide-react'
import { useUIStore } from '../../store'
import { useCustomPointLayerStore, type PhotoData } from '../../store/customPointLayerStore'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { PhotoCapture } from './PhotoCapture'
import { AppWindow } from '../UI/AppWindow'

export function AddPointModal() {
  const addPointModalOpen = useUIStore(state => state.activeWindow === 'addPoint')
  const addPointModalLayerTarget = useUIStore(state => state.addPointModalLayerTarget)
  const addPointModalLocation = useUIStore(state => state.addPointModalLocation)
  const closeAddPointModal = useUIStore(state => state.closeAddPointModal)
  const {
    addPoint,
    getLayer,
    ensureImportedLayerOverlay,
    updateLayer: updatePointLayer,
  } = useCustomPointLayerStore()
  const importedLayers = useCustomLayerStore(state => state.layers)
  const updateImportedGeometryStyle = useCustomLayerStore(state => state.updateGeometryStyle)
  const updateImportedLayer = useCustomLayerStore(state => state.updateLayer)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [url, setUrl] = useState('')
  const [photos, setPhotos] = useState<PhotoData[]>([])

  const pointLayer = addPointModalLayerTarget?.kind === 'point'
    ? getLayer(addPointModalLayerTarget.id)
    : null
  const importedLayer = addPointModalLayerTarget?.kind === 'imported'
    ? importedLayers.find(layer => layer.id === addPointModalLayerTarget.id)
    : null
  const layerName = pointLayer?.name || importedLayer?.name || ''
  const layerColor = pointLayer?.color || importedLayer?.style.points.color || importedLayer?.color || '#3b82f6'

  const handleSubmit = () => {
    if (!name.trim() || !addPointModalLayerTarget || !addPointModalLocation || !layerName) return
    const trimmedPhone = phone.trim()
    const trimmedUrl = url.trim()

    const targetLayerId = addPointModalLayerTarget.kind === 'point'
      ? addPointModalLayerTarget.id
      : ensureImportedLayerOverlay(addPointModalLayerTarget.id, layerName, layerColor)

    if (addPointModalLayerTarget.kind === 'imported') {
      updateImportedGeometryStyle(addPointModalLayerTarget.id, 'points', { visible: true })
      updateImportedLayer(addPointModalLayerTarget.id, { visible: true })
    } else {
      updatePointLayer(addPointModalLayerTarget.id, { visible: true })
    }

    addPoint(targetLayerId, {
      name: name.trim(),
      category: 'Overig',
      notes: notes.trim(),
      coordinates: [addPointModalLocation.lng, addPointModalLocation.lat],
      ...(trimmedPhone ? { phone: trimmedPhone } : {}),
      ...(trimmedUrl ? { url: trimmedUrl } : {}),
      ...(photos.length > 0 ? { photos } : {})
    })

    // Reset form
    setName('')
    setPhone('')
    setNotes('')
    setUrl('')
    setPhotos([])
    closeAddPointModal()
  }

  const handleClose = () => {
    setName('')
    setPhone('')
    setNotes('')
    setUrl('')
    setPhotos([])
    closeAddPointModal()
  }

  if (!layerName) return null

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
              style={{ backgroundColor: layerColor }}
            />
            <span className="text-sm text-gray-600">{layerName}</span>
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

              {/* Phone */}
              <div>
                <label className="block font-medium text-gray-700 mb-1" style={{ fontSize: '0.9em' }}>
                  Telefoonnummer
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="bijv. 06 12345678"
                    className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg border-0 outline-none hover:bg-blue-50 transition-colors"
                    style={{ fontSize: '1em' }}
                  />
                </div>
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
