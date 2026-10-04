/**
 * Image utility functions for resizing, compressing and converting images
 */

const MAX_THUMBNAIL_SIZE = 200
const JPEG_QUALITY = 0.7

/**
 * Resize an image to fit within maxSize while maintaining aspect ratio
 */
// Reading local files into a data URL avoids a fetch of a blob URL. In WebKit,
// those fetches can be blocked while the browser is offline.
export function loadLocalImage(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const image = new Image()
    const failed = () => reject(new Error('Deze afbeelding kan niet worden geopend.'))
    reader.onerror = failed
    reader.onabort = failed
    reader.onload = () => {
      if (typeof reader.result !== 'string') { failed(); return }
      image.onload = () => resolve(image)
      image.onerror = failed
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export async function resizeImage(file: File, maxSize: number = MAX_THUMBNAIL_SIZE): Promise<Blob> {
  const img = await loadLocalImage(file)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx || !img.width || !img.height) throw new Error('Foto kan niet worden verwerkt.')
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
  canvas.width = Math.max(1, Math.round(img.width * scale))
  canvas.height = Math.max(1, Math.round(img.height * scale))
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Foto kan niet worden verwerkt.')), 'image/jpeg', JPEG_QUALITY))
}

/**
 * Convert a Blob to base64 string
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert blob to base64'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read blob'))
    reader.readAsDataURL(blob)
  })
}

/**
 * Process an image file: resize to thumbnail and return both blob and base64
 */
export async function processImageForUpload(file: File): Promise<{
  thumbnailBlob: Blob
  thumbnailBase64: string
}> {
  const thumbnailBlob = await resizeImage(file, MAX_THUMBNAIL_SIZE)
  const thumbnailBase64 = await blobToBase64(thumbnailBlob)

  return {
    thumbnailBlob,
    thumbnailBase64
  }
}

/**
 * Generate a unique ID for photos
 */
export function generatePhotoId(): string {
  return `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
