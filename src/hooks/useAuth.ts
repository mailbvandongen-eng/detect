import { useEffect } from 'react'
import { signInAnonymously, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const { user, initAuth } = useAuthStore()

  useEffect(() => { initAuth() }, [initAuth])

  const loginAnonymous = async () => {
    try {
      await signInAnonymously(auth)
    } catch (error: any) {
      console.error('Login failed:', error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error: any) {
      console.error('Logout failed:', error)
    }
  }

  return {
    user,
    loginAnonymous,
    logout,
    isAuthenticated: !!user
  }
}
