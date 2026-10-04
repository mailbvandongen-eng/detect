import { useEffect, useRef, useState } from 'react'
import { Camera, X, ImagePlus } from 'lucide-react'
import { blobToBase64, generatePhotoId } from '../../lib/imageUtils'
import { savePhoto } from '../../lib/photoStorage'
import { accountPhotoKey, accountSession, currentAccountScope } from '../../utils/accountStorage'
import { useAuthStore } from '../../store/authStore'
import { safeContentUrl } from '../../utils/safePopupHtml'
import type { PhotoData } from '../../store/customPointLayerStore'

const MAX_PHOTOS = 5

interface PhotoCaptureProps {
  photos: PhotoData[]
  onAddPhoto: (photo: PhotoData) => void | boolean
  onRemovePhoto: (photoId: string) => void
  disabled?: boolean
}

export function PhotoCapture({ photos, onAddPhoto, onRemovePhoto, disabled }: PhotoCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const mounted = useRef(true)
  const busy = useRef(false)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const files = Array.from(input.files || [])
    input.value = ''
    if (disabled || busy.current || !files.length) return
    const valid = accountSession(currentAccountScope())
    const current = () => mounted.current && valid()
    busy.current = true
    setProcessing(true)
    setError(null)
    const remainingSlots = MAX_PHOTOS - photos.length
    try {
      for (const file of files.slice(0, remainingSlots)) {
        if (!current()) break
        if (!file.type.startsWith('image/') || file.size > 30 * 1024 * 1024) {
          setError('Kies een afbeelding van maximaal 30 MB.'); continue
        }
        try {
          const id = generatePhotoId()
          const key = accountPhotoKey(id)
          const stored = await savePhoto(key, file)
          const thumbnailBase64 = await blobToBase64(stored.thumbnail)
          if (!current()) break
          const added = onAddPhoto({ id, thumbnailBase64, createdAt: stored.createdAt, pendingUpload: true,
            uploadOwnerUid: useAuthStore.getState().user?.uid })
          if (added === false) setError('De foto is lokaal bewaard, maar kon niet aan het punt worden toegevoegd. Probeer opnieuw; controleer je bewerkrechten en vrije opslagruimte.')
        } catch {
          if (current()) setError('Foto kon niet worden verwerkt of lokaal opgeslagen. Probeer een andere afbeelding; je bestaande foto’s blijven bewaard.')
        }
      }
    } finally {
      busy.current = false
      if (current()) setProcessing(false)
    }
  }

  const canAddMore = photos.length < MAX_PHOTOS

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700" style={{ fontSize: '0.9em' }}>
        Foto's ({photos.length}/{MAX_PHOTOS})
      </label>

      <div className="flex flex-wrap gap-2">
        {/* Existing photos */}
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
          >
            <img
              src={safeContentUrl(photo.thumbnailUrl || photo.thumbnailBase64, true)}
              alt="Foto"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={() => onRemovePhoto(photo.id)}
                className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-0 outline-none"
              >
                <X size={12} className="text-white" />
              </button>
            )}
            {photo.pendingUpload && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-0.5" style={{ fontSize: '0.6em' }}>
                Lokaal
              </div>
            )}
          </div>
        ))}

        {/* Add photo buttons */}
        {canAddMore && !disabled && (
          <>
            {/* Camera button */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 hover:opacity-80 flex flex-col items-center justify-center gap-1 transition-colors bg-transparent outline-none"
              disabled={processing}
              style={{ borderColor: 'var(--detect-accent)' }}
              title="Maak foto"
            >
              <Camera size={20} className="text-gray-400" />
              <span className="text-gray-400" style={{ fontSize: '0.6em' }}>Camera</span>
            </button>

            {/* Gallery button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 hover:opacity-80 flex flex-col items-center justify-center gap-1 transition-colors bg-transparent outline-none"
              disabled={processing}
              style={{ borderColor: 'var(--detect-accent)' }}
              title="Kies foto"
            >
              <ImagePlus size={20} className="text-gray-400" />
              <span className="text-gray-400" style={{ fontSize: '0.6em' }}>Galerij</span>
            </button>
          </>
        )}
      </div>

      {processing && <p role="status">Foto lokaal opslaan…</p>}
      {error && <p role="alert">{error}</p>}
      {photos.some(photo => photo.pendingUpload) && <p style={{ fontSize: '0.8em' }}>Foto’s worden na het opslaan van het punt gesynchroniseerd. Zonder verbinding blijven ze op dit apparaat.</p>}
      {/* Hidden inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
