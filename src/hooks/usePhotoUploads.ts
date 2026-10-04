import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useCustomPointLayerStore } from '../store/customPointLayerStore'
import { flushPhotoUploads, retryPhotoUploads, usePhotoUploadState } from '../services/photoUploads'

export function usePhotoUploads() {
  const user = useAuthStore(state => state.user)
  const ready = useAuthStore(state => state.ready)
  const layers = useCustomPointLayerStore(state => state.layers)
  useEffect(() => { usePhotoUploadState.setState({ uid: user?.uid || null, busy: false, errors: {} }) }, [user?.uid])
  useEffect(() => {
    if (!user || !ready) return
    const timer = window.setTimeout(() => { void flushPhotoUploads(user.uid) }, 300)
    return () => window.clearTimeout(timer)
  }, [user?.uid, ready, layers])
  useEffect(() => {
    if (!user || !ready) return
    const retry = () => { if (document.visibilityState === 'visible') void retryPhotoUploads(user.uid, true) }
    const timer = window.setInterval(retry, 30000)
    window.addEventListener('online', retry)
    document.addEventListener('visibilitychange', retry)
    return () => { window.clearInterval(timer); window.removeEventListener('online', retry); document.removeEventListener('visibilitychange', retry) }
  }, [user?.uid, ready])
}
