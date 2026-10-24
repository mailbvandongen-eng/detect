import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore'

// Firebase web configuration is public client configuration. Keep usable defaults so
// production builds without deployment-specific VITE_* variables still authenticate.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDiV9VX6oQExwnv6Zs5qBvuMkK-BW-tsio',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'detect-personal.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'detect-personal',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'detect-personal.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '640587689726',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:640587689726:web:2ae2eb916c1ade465ebfaf'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Initialize Firestore with persistent cache (modern API - replaces deprecated enableIndexedDbPersistence)
export const db = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
})
