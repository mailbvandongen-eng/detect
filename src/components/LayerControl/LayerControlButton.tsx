import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { useUIStore } from '../../store'

export function KaartlagenButton() {
  const themesPanelOpen = useUIStore(state => state.activeWindow === 'layers')
  const toggleThemesPanel = useUIStore(state => state.toggleThemesPanel)

  // Part of the bottom-right map controls, separated from app management.
  // Leave 12px between the 44px touch targets (zoom, opacity, time travel, layers).
  return (
    <motion.button
      className={`fixed right-2 z-[900] w-11 h-11 cursor-pointer border-0 outline-none
        flex items-center justify-center rounded-lg backdrop-blur-sm transition-colors
        ${themesPanelOpen
          ? 'bg-blue-500 text-white shadow-lg'
          : 'bg-white/90 text-gray-600 hover:bg-white shadow-sm'}`}
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 164px)' }}
      onClick={toggleThemesPanel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-expanded={themesPanelOpen}
      aria-label={themesPanelOpen ? 'Kaartlagen sluiten' : 'Kaartlagen openen'}
      title="Kaartlagen"
    >
      <Layers size={22} strokeWidth={2} aria-hidden="true" />
    </motion.button>
  )
}

export function LayerControlButton() {
  return <KaartlagenButton />
}
