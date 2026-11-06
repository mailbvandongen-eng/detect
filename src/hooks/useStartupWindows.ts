import { useEffect, useRef } from 'react'
import { version } from '../../package.json'
import { useAuthStore } from '../store/authStore'
import { useUIStore } from '../store/uiStore'
import { useSettingsStore } from '../store/settingsStore'
import { shouldShowAutomaticChangeLog } from '../data/changelog'

/**
 * Bij het opstarten opent hoogstens één venster: de uitleg, tenzij die is
 * uitgezet. Nieuwe wijzigingen openen geen venster meer; die worden met een
 * stipje op de menuknop gemeld (zie useUnseenChangeLog).
 */
export function useStartupWindows() {
  const authReady = useAuthStore(state => state.ready)
  const activeWindow = useUIStore(state => state.activeWindow)
  const openWindow = useUIStore(state => state.openWindow)
  const closeWindow = useUIStore(state => state.closeWindow)

  const hideWelcomeModal = useSettingsStore(state => state.hideWelcomeModal)
  const welcomeModalOpen = activeWindow === 'welcome'
  const manualOpen = activeWindow === 'manual'
  const startupInitialized = useRef(false)

  const changeLogOpen = activeWindow === 'changeLog'
  const closeChangeLog = useUIStore(state => state.closeChangeLog)

  useEffect(() => {
    if (!authReady || startupInitialized.current) return
    startupInitialized.current = true
    if (!hideWelcomeModal) openWindow('welcome')
  }, [authReady, hideWelcomeModal, openWindow])

  const handleWelcomeClose = () => {
    closeWindow()
  }

  const handleOpenManual = () => {
    openWindow('manual')
  }

  return { welcomeModalOpen, manualOpen, changeLogOpen, closeChangeLog, handleWelcomeClose, handleOpenManual }
}

/** True zolang de wijzigingen van deze versie nog niet zijn gelezen. */
export function useUnseenChangeLog(): boolean {
  // Opnieuw beoordelen bij elke vensterwissel, zodat het stipje verdwijnt
  // zodra het wijzigingsvenster is gesloten.
  useUIStore(state => state.activeWindow)
  return shouldShowAutomaticChangeLog(version)
}
