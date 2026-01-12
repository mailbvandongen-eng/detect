import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { getPhoto, getPhotoUrl, deletePhoto, type StoredPhoto } from '../../lib/photoStorage'

interface Props {
  photoId: string
  onClose: () => void
  onDelete?: () => void
  // For multi-photo navigation
  allPhotoIds?: string[]
  currentIndex?: number
  onNavigate?: (photoId: string, index: number) => void
}

export function PhotoViewer({ photoId, onClose, onDelete, allPhotoIds, currentIndex = 0, onNavigate }: Props) {
  const [photo, setPhoto] = useState<StoredPhoto | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load photo from IndexedDB
  useEffect(() => {
    let url: string | null = null

    async function loadPhoto() {
      setLoading(true)
      setError(null)

      try {
        const storedPhoto = await getPhoto(photoId)
        if (storedPhoto) {
          setPhoto(storedPhoto)
          url = getPhotoUrl(storedPhoto)
          setPhotoUrl(url)
        } else {
          setError('Foto niet gevonden')
        }
      } catch (err) {
        console.error('Failed to load photo:', err)
        setError('Fout bij laden van foto')
      } finally {
        setLoading(false)
      }
    }

    loadPhoto()

    // Cleanup object URL on unmount
    return () => {
      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [photoId])

  const handleDownload = () => {
    if (photoUrl && photo) {
      const a = document.createElement('a')
      a.href = photoUrl
      a.download = photo.originalName || `foto-${photoId}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Weet je zeker dat je deze foto wilt verwijderen?')) return

    try {
      await deletePhoto(photoId)
      onDelete?.()
      onClose()
    } catch (err) {
      console.error('Failed to delete photo:', err)
      alert('Fout bij verwijderen van foto')
    }
  }

  const canNavigate = allPhotoIds && allPhotoIds.length > 1
  const canGoPrev = canNavigate && currentIndex > 0
  const canGoNext = canNavigate && currentIndex < (allPhotoIds?.length || 0) - 1

  const handlePrev = () => {
    if (canGoPrev && allPhotoIds && onNavigate) {
      onNavigate(allPhotoIds[currentIndex - 1], currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (canGoNext && allPhotoIds && onNavigate) {
      onNavigate(allPhotoIds[currentIndex + 1], currentIndex + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, allPhotoIds])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[3000] bg-black/90 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors border-0 outline-none"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Action buttons */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleDownload() }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors border-0 outline-none"
            title="Download"
          >
            <Download size={20} className="text-white" />
          </button>
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete() }}
              className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-full transition-colors border-0 outline-none"
              title="Verwijderen"
            >
              <Trash2 size={20} className="text-white" />
            </button>
          )}
        </div>

        {/* Navigation buttons */}
        {canGoPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors border-0 outline-none"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
        )}
        {canGoNext && (
          <button
            onClick={(e) => { e.stopPropagation(); handleNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors border-0 outline-none"
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        )}

        {/* Photo counter */}
        {canNavigate && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white/10 rounded-full text-white text-sm">
            {currentIndex + 1} / {allPhotoIds?.length}
          </div>
        )}

        {/* Content */}
        <div className="max-w-full max-h-full p-4" onClick={(e) => e.stopPropagation()}>
          {loading && (
            <div className="text-white text-center">
              <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2" />
              <p>Laden...</p>
            </div>
          )}

          {error && (
            <div className="text-red-400 text-center">
              <p>{error}</p>
            </div>
          )}

          {photoUrl && (
            <motion.img
              src={photoUrl}
              alt="Vondst foto"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20 }}
            />
          )}

          {/* Photo info */}
          {photo && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/60 text-xs text-center">
              {photo.width} x {photo.height} px | {(photo.size / 1024).toFixed(0)} KB
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
