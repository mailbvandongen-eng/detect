import { useEffect, useRef, useState } from 'react'
import { version } from '../../package.json'
import { useAuthStore } from '../store/authStore'
import { useUIStore } from '../store/uiStore'
import { useSettingsStore } from '../store/settingsStore'
import { hasSeenChangeLog, markChangeLogSeen } from '../data/changelog'

export function useStartupWindows() {
  const authReady = useAuthStore(state => state.ready)
  const activeWindow = useUIStore(state => state.activeWindow)
  const openWindow = useUIStore(state => state.openWindow)
  const closeWindow = useUIStore(state => state.closeWindow)

  // Startup windows are queued: welcome first, then the changelog.
  const hideWelcomeModal = useSettingsStore(state => state.hideWelcomeModal)
  const welcomeModalOpen = activeWindow === 'welcome'
  const manualOpen = activeWindow === 'manual'
  const startupInitialized = useRef(false)
  const changeLogOffered = useRef(false)
  const [startupComplete, setStartupComplete] = useState(false)

  // Change log state - shown once after each version, after the welcome screen.
  const changeLogOpen = useUIStore(state => state.activeWindow === 'changeLog')
  const openChangeLog = useUIStore(state => state.openChangeLog)
  const closeChangeLog = useUIStore(state => state.closeChangeLog)

  useEffect(() => {
    if (!authReady || startupInitialized.current) return
    startupInitialized.current = true

    if (hideWelcomeModal) {
      setStartupComplete(true)
    } else {
      openWindow('welcome')
    }
  }, [authReady, hideWelcomeModal, openWindow])

  useEffect(() => {
    if (authReady && startupComplete && activeWindow === null && !changeLogOffered.current && !hasSeenChangeLog(version)) {
      changeLogOffered.current = true
      markChangeLogSeen(version)
      openChangeLog()
    }
  }, [authReady, activeWindow, startupComplete, openChangeLog])

  const handleWelcomeClose = () => {
    closeWindow()
    setStartupComplete(true)
  }

  const handleOpenManual = () => {
    setStartupComplete(true)
    openWindow('manual')
  }

  return { welcomeModalOpen, manualOpen, changeLogOpen, closeChangeLog, handleWelcomeClose, handleOpenManual }
}
