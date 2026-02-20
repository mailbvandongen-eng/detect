import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useSettingsStore } from './settingsStore'

interface AuthState {
  user: User | null
  accessToken: string | null  // For Google Fit API
  loading: boolean
  error: string | null
  initialized: boolean

  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setAccessToken: (token: string | null) => void
  signInWithGoogle: () => Promise<void>
  connectGoogleFit: () => Promise<boolean>
  logout: () => Promise<void>
  initAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  immer((set, get) => ({
    user: null,
    accessToken: null,
    loading: false,  // Don't show spinner on initial load
    error: null,
    initialized: false,

    setUser: (user) => {
      set(state => {
        state.user = user
        state.loading = false
      })
    },

    setLoading: (loading) => {
      set(state => {
        state.loading = loading
      })
    },

    setError: (error) => {
      set(state => {
        state.error = error
      })
    },

    setAccessToken: (token) => {
      set(state => {
        state.accessToken = token
      })
    },

    signInWithGoogle: async () => {
      set(state => { state.loading = true; state.error = null })
      try {
        const provider = new GoogleAuthProvider()
        // Use redirect on production (GitHub Pages has COOP restrictions)
        // Use popup on localhost for faster development
        if (window.location.hostname === 'localhost') {
          await signInWithPopup(auth, provider)
        } else {
          await signInWithRedirect(auth, provider)
        }
        // User will be set by onAuthStateChanged (or getRedirectResult)
      } catch (error: any) {
        console.error('Google sign-in error:', error)
        set(state => {
          state.error = error.message
          state.loading = false
        })
      }
    },

    // Separate function to connect Google Fit (requires additional permission)
    connectGoogleFit: async () => {
      set(state => { state.loading = true; state.error = null })
      try {
        const provider = new GoogleAuthProvider()
        // Add Google Fit scope - this will show the "unverified app" warning
        provider.addScope('https://www.googleapis.com/auth/fitness.activity.read')
        const result = await signInWithPopup(auth, provider)
        // Get the access token for Google Fit API calls
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential?.accessToken) {
          set(state => {
            state.accessToken = credential.accessToken || null
            state.loading = false
          })
          console.log('🏃 Google Fit gekoppeld')
          return true
        }
        set(state => { state.loading = false })
        return false
      } catch (error: any) {
        console.error('Google Fit connect error:', error)
        set(state => {
          state.error = error.message
          state.loading = false
        })
        return false
      }
    },

    logout: async () => {
      set(state => { state.loading = true })
      try {
        await signOut(auth)
        set(state => { state.accessToken = null })
        // User will be set to null by onAuthStateChanged
      } catch (error: any) {
        console.error('Logout error:', error)
        set(state => {
          state.error = error.message
          state.loading = false
        })
      }
    },

    initAuth: () => {
      if (get().initialized) return

      set(state => { state.initialized = true })

      // Handle redirect result (for production sign-in)
      getRedirectResult(auth)
        .then((result) => {
          if (result?.user) {
            console.log('✅ Ingelogd via redirect')
          }
        })
        .catch((error) => {
          console.error('Redirect result error:', error)
          set(state => { state.error = error.message })
        })

      onAuthStateChanged(auth, (user) => {
        set(state => {
          state.user = user
          state.loading = false
        })

        // Auto-switch to cloud storage when logged in with Google
        if (user) {
          useSettingsStore.getState().setVondstenLocalOnly(false)
        }
      })
    }
  }))
)
