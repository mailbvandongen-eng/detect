import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

// Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'REPLACE_WITH_YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Initialize Firestore with persistent cache (modern API - replaces deprecated enableIndexedDbPersistence)
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
})

export const storage = getStorage(app)

// ============================================
// Photo Storage Helpers
// ============================================

/**
 * Upload a photo thumbnail to Firebase Storage
 * Path: users/{userId}/layers/{layerId}/points/{pointId}/{photoId}.jpg
 */
export async function uploadPhotoThumbnail(
  userId: string,
  layerId: string,
  pointId: string,
  photoId: string,
  imageBlob: Blob
): Promise<string> {
  const path = `users/${userId}/layers/${layerId}/points/${pointId}/${photoId}.jpg`
  const ref = storageRef(storage, path)
  await uploadBytes(ref, imageBlob, { contentType: 'image/jpeg' })
  return getDownloadURL(ref)
}

/**
 * Delete a photo from Firebase Storage
 */
export async function deletePhotoFromStorage(
  userId: string,
  layerId: string,
  pointId: string,
  photoId: string
): Promise<void> {
  const path = `users/${userId}/layers/${layerId}/points/${pointId}/${photoId}.jpg`
  const ref = storageRef(storage, path)
  try {
    await deleteObject(ref)
  } catch (error: any) {
    // Ignore if file doesn't exist
    if (error.code !== 'storage/object-not-found') {
      throw error
    }
  }
}

/**
 * Convert base64 data URL to Blob
 */
export function base64ToBlob(base64: string): Blob {
  const parts = base64.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}
