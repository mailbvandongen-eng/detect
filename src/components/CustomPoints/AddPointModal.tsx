import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin } from 'lucide-react'
import { useUIStore, useSettingsStore } from '../../store'
import { useCustomPointLayerStore, type PhotoData } from '../../store/customPointLayerStore'
import { PhotoCapture } from './PhotoCapture'

export function AddPointModal() {
  const { addPointModalOpen, addPointModalLayerId, addPointModalLocation, closeAddPointModal } = useUIStore()
  const { addPoint, getLayer } = useCustomPointLayerStore()
  const settings = useSettingsStore()

  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [url, setUrl] = useState('')
  const [photos, setPhotos] = useState<PhotoData[]>([])

  const layer = addPointModalLayerId ? getLayer(addPointModalLayerId) : null

  // Calculate font size based on fontScale setting
  const baseFontSize = 14 * settings.fontScale / 100

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
    <AnimatePresence>
      {addPointModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[1700] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 z-[1701] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-sm mx-auto my-auto max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Header - oranje voor eigen lagen */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="font-medium">Punt toevoegen</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Font size slider */}
                <span className="text-[10px] opacity-70">T</span>
                <input
                  type="range"
                  min="80"
                  max="150"
                  step="10"
                  value={settings.fontScale}
                  onChange={(e) => settings.setFontScale(parseInt(e.target.value))}
                  className="header-slider w-16 opacity-70 hover:opacity-100 transition-opacity"
                  title={`Tekstgrootte: ${settings.fontScale}%`}
                />
                <span className="text-xs opacity-70">T</span>
                <button
                  onClick={handleClose}
                  className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none ml-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Layer info */}
            <div className="px-4 py-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: layer.color }}
                />
                <span className="text-sm text-gray-600">{layer.name}</span>
              </div>
            </div>

            {/* Content - met font scaling */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ fontSize: `${baseFontSize}px` }}>
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

            {/* Footer */}
            <div className="p-3 flex gap-3" style={{ fontSize: `${baseFontSize}px` }}>
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-1.5 bg-white hover:bg-blue-50 rounded-lg transition-colors border-0 outline-none text-gray-600"
                style={{ fontSize: '1em' }}
              >
                Annuleren
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name.trim()}
                className="flex-1 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors border-0 outline-none"
                style={{ fontSize: '1em' }}
              >
                Toevoegen
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
