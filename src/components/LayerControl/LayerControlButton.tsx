import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { useUIStore } from '../../store'
import { useControlSlot } from '../../hooks/useControlSlot'

export function KaartlagenButton() {
  const themesPanelOpen = useUIStore(state => state.activeWindow === 'layers')
  const toggleThemesPanel = useUIStore(state => state.toggleThemesPanel)
  const slotStyle = useControlSlot('layers')

  return (
    <motion.button
      className={`
        fixed z-[800]
        w-11 h-11 cursor-pointer border-0 outline-none
        flex items-center justify-center
        rounded-xl backdrop-blur-sm
        transition-all duration-200
        ${themesPanelOpen
          ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/30'
          : 'bg-white/80 text-gray-500 hover:bg-white/90 shadow-sm'
        }
      `}
      style={slotStyle}
      onClick={toggleThemesPanel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={themesPanelOpen ? 'Kaartlagen sluiten' : 'Kaartlagen openen'}
      title="Kaartlagen"
    >
      <Layers size={22} strokeWidth={2} className="drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
    </motion.button>
  )
}

// Keep old export for backwards compatibility
export function LayerControlButton() {
  return <KaartlagenButton />
}
