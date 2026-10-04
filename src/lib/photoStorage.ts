import { loadLocalImage } from './imageUtils'
/**
 * Photo Storage Library using IndexedDB
 *
 * Stores photos locally with compression and thumbnail generation.
 * Photos are linked to vondsten/points via their ID.
 */

const DB_NAME = 'detectorapp-photos'
const DB_VERSION = 1
const STORE_NAME = 'photos'

// Photo record in IndexedDB
export interface StoredPhoto {
  id: string                // Unique photo ID (usually same as vondst/point ID)
  fullImage: Blob          // Compressed full image (max 1024px)
  thumbnail: Blob          // Small thumbnail (max 200px)
  originalName?: string    // Original filename
  mimeType: string         // image/jpeg or image/webp
  width: number            // Full image width
  height: number           // Full image height
  size: number             // Full image size in bytes
  createdAt: string        // ISO timestamp
}

// Compression settings
const MAX_FULL_SIZE = 1024    // Max dimension for full image
const MAX_THUMB_SIZE = 200    // Max dimension for thumbnail
const JPEG_QUALITY = 0.8     // 80% quality
const THUMB_QUALITY = 0.7    // 70% quality for thumbnails

/**
 * Open IndexedDB connection
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('createdAt', 'createdAt', { unique: false })
      }
    }
  })
}

/**
 * Compress and resize an image
 */
async function compressImage(
  file: File | Blob,
  maxSize: number,
  quality: number
): Promise<{ blob: Blob; width: number; height: number }> {
  const image = await loadLocalImage(file)
  if (!image.width || !image.height) throw new Error('Afbeelding heeft geen geldige afmetingen.')
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Foto kan niet worden verwerkt.')
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(image, 0, 0, width, height)
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve({ blob, width, height }) : reject(new Error('Foto kan niet worden verwerkt.')), 'image/jpeg', quality))
}

/**
 * Save a photo to IndexedDB
 * @param id - Unique ID for the photo (typically the vondst/point ID)
 * @param file - The image file to store
 * @returns The stored photo record
 */
export async function savePhoto(id: string, file: File): Promise<StoredPhoto> {
  // Compress full image
  const { blob: fullImage, width, height } = await compressImage(
    file,
    MAX_FULL_SIZE,
    JPEG_QUALITY
  )

  // Create thumbnail
  const { blob: thumbnail } = await compressImage(
    fullImage,
    MAX_THUMB_SIZE,
    THUMB_QUALITY
  )

  const record: StoredPhoto = {
    id,
    fullImage,
    thumbnail,
    originalName: file.name,
    mimeType: 'image/jpeg',
    width,
    height,
    size: fullImage.size,
    createdAt: new Date().toISOString()
  }

  // Save to IndexedDB
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.put(record)

    request.onsuccess = () => {}
    request.onerror = () => reject(request.error)

    tx.oncomplete = () => { db.close(); resolve(record) }
    tx.onabort = () => { db.close(); reject(tx.error || new Error("Foto kon niet lokaal worden opgeslagen.")) }
  })
}

/**
 * Get a photo by ID
 */
export async function getPhoto(id: string): Promise<StoredPhoto | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(id)

    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)

    tx.oncomplete = () => db.close()
  })
}

/**
 * Delete a photo by ID
 */
export async function deletePhoto(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.delete(id)

    request.onsuccess = () => {}
    request.onerror = () => reject(request.error)

    tx.oncomplete = () => { db.close(); resolve() }
    tx.onabort = () => { db.close(); reject(tx.error || new Error("Foto kon niet worden verwijderd.")) }
  })
}

/**
 * Get all photos
 */
export async function getAllPhotos(): Promise<StoredPhoto[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result || [])
    request.onerror = () => reject(request.error)

    tx.oncomplete = () => db.close()
  })
}

/**
 * Get the full image URL (creates object URL - remember to revoke!)
 */
export function getPhotoUrl(photo: StoredPhoto): string {
  return URL.createObjectURL(photo.fullImage)
}

/**
 * Get the thumbnail URL (creates object URL - remember to revoke!)
 */
export function getThumbnailUrl(photo: StoredPhoto): string {
  return URL.createObjectURL(photo.thumbnail)
}

/**
 * Check if a photo exists
 */
export async function hasPhoto(id: string): Promise<boolean> {
  const photo = await getPhoto(id)
  return photo !== null
}

/**
 * Get total storage used by photos (in bytes)
 */
export async function getStorageUsed(): Promise<number> {
  const photos = await getAllPhotos()
  return photos.reduce((total, photo) => {
    return total + photo.fullImage.size + photo.thumbnail.size
  }, 0)
}

/**
 * Format bytes as human readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Clear all photos (use with caution!)
 */
export async function clearAllPhotos(): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.clear()

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)

    tx.oncomplete = () => db.close()
  })
}
