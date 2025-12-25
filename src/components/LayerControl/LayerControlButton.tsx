import { motion } from 'framer-motion'
import { Map, Sparkles } from 'lucide-react'
import { useUIStore } from '../../store'

export function BackgroundsButton() {
  const backgroundsPanelOpen = useUIStore(state => state.backgroundsPanelOpen)
  const toggleBackgroundsPanel = useUIStore(state => state.toggleBackgroundsPanel)

  return (
    <motion.button
      className={`
        fixed top-2.5 left-2.5 z-[1000]
        w-10 h-10 cursor-pointer border-0 outline-none
        flex items-center justify-center
        rounded-xl backdrop-blur-sm
        transition-all duration-200
        ${backgroundsPanelOpen
          ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
          : 'bg-white/80 text-gray-500 hover:bg-white/90 shadow-sm'
        }
      `}
      onClick={toggleBackgroundsPanel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={backgroundsPanelOpen ? 'Achtergronden sluiten' : 'Achtergronden openen'}
      title="Achtergronden"
    >
      <Map size={20} strokeWidth={2} />
    </motion.button>
  )
}

export function ThemesButton() {
  const themesPanelOpen = useUIStore(state => state.themesPanelOpen)
  const toggleThemesPanel = useUIStore(state => state.toggleThemesPanel)

  return (
    <motion.button
      className={`
        fixed top-14 left-2.5 z-[1000]
        w-10 h-10 cursor-pointer border-0 outline-none
        flex items-center justify-center
        rounded-xl backdrop-blur-sm
        transition-all duration-200
        ${themesPanelOpen
          ? 'bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg shadow-purple-500/30'
          : 'bg-white/80 text-gray-500 hover:bg-white/90 shadow-sm'
        }
      `}
      onClick={toggleThemesPanel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={themesPanelOpen ? "Thema's sluiten" : "Thema's openen"}
      title="Thema's"
    >
      <Sparkles size={20} strokeWidth={2} />
    </motion.button>
  )
}

// Keep old export for backwards compatibility (will be removed)
export function LayerControlButton() {
  return (
    <>
      <BackgroundsButton />
      <ThemesButton />
    </>
  )
}
