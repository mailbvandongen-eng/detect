import { useState } from 'react'
import { PhotoViewer } from './PhotoViewer'
import type { PhotoData } from '../../store/customPointLayerStore'

interface Props {
  photos: PhotoData[]
  onDeletePhoto?: (photoId: string) => void
  maxThumbnails?: number
  className?: string
}

export function PhotoGallery({ photos, onDeletePhoto, maxThumbnails = 4, className = '' }: Props) {
  const [viewingPhotoId, setViewingPhotoId] = useState<string | null>(null)
  const [viewingIndex, setViewingIndex] = useState(0)

  if (!photos || photos.length === 0) return null

  const visiblePhotos = photos.slice(0, maxThumbnails)
  const remainingCount = photos.length - maxThumbnails

  const handlePhotoClick = (photoId: string, index: number) => {
    setViewingPhotoId(photoId)
    setViewingIndex(index)
  }

  const handleNavigate = (photoId: string, index: number) => {
    setViewingPhotoId(photoId)
    setViewingIndex(index)
  }

  const handleDelete = () => {
    if (viewingPhotoId && onDeletePhoto) {
      onDeletePhoto(viewingPhotoId)
    }
  }

  const allPhotoIds = photos.map(p => p.id)

  return (
    <>
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {visiblePhotos.map((photo, index) => {
          const thumbnailSrc = photo.thumbnailUrl || photo.thumbnailBase64

          return (
            <button
              key={photo.id}
              onClick={() => handlePhotoClick(photo.id, index)}
              className="relative w-16 h-16 rounded-lg overflow-hidden border-0 outline-none cursor-pointer hover:opacity-90 transition-opacity"
            >
              {thumbnailSrc ? (
                <img
                  src={thumbnailSrc}
                  alt="Foto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  Foto
                </div>
              )}
            </button>
          )
        })}

        {remainingCount > 0 && (
          <div
            className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => handlePhotoClick(photos[maxThumbnails].id, maxThumbnails)}
          >
            +{remainingCount}
          </div>
        )}
      </div>

      {viewingPhotoId && (
        <PhotoViewer
          photoId={viewingPhotoId}
          onClose={() => setViewingPhotoId(null)}
          onDelete={onDeletePhoto ? handleDelete : undefined}
          allPhotoIds={allPhotoIds}
          currentIndex={viewingIndex}
          onNavigate={handleNavigate}
        />
      )}
    </>
  )
}
