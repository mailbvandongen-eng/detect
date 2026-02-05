import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useMapStore } from '../../store'
import { useEffect, useState } from 'react'

export function ZoomButtons() {
  const map = useMapStore(state => state.map)
  const [compassVisible, setCompassVisible] = useState(false)

  // Listen to map rotation to know when compass is visible
  useEffect(() => {
    if (!map) return

    const view = map.getView()

    const updateCompassVisibility = () => {
      const rot = view.getRotation()
      // Compass shows when rotated more than ~5 degrees
      setCompassVisible(Math.abs(rot) > 0.087)
    }

    updateCompassVisibility()
    view.on('change:rotation', updateCompassVisibility)

    return () => {
      view.un('change:rotation', updateCompassVisibility)
    }
  }, [map])

  const handleZoomIn = () => {
    if (!map) return
    const view = map.getView()
    const zoom = view.getZoom()
    if (zoom !== undefined) {
      view.animate({ zoom: zoom + 1, duration: 200 })
    }
  }

  const handleZoomOut = () => {
    if (!map) return
    const view = map.getView()
    const zoom = view.getZoom()
    if (zoom !== undefined) {
      view.animate({ zoom: zoom - 1, duration: 200 })
    }
  }

  // Position below hamburger menu, or below compass if visible
  // Compass is at top-[60px] and is 44px tall, so offset by 112px when visible
  const topPosition = compassVisible
    ? 'calc(max(0.5rem, env(safe-area-inset-top, 0.5rem)) + 112px)'
    : 'calc(max(0.5rem, env(safe-area-inset-top, 0.5rem)) + 52px)'

  return (
    <motion.div
      className="fixed right-2 z-[800] flex flex-col gap-1"
      style={{ top: topPosition }}
      animate={{ top: topPosition }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        className="w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-white/90 rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
        onClick={handleZoomIn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Inzoomen"
      >
        <Plus size={18} className="text-gray-600" />
      </motion.button>
      <motion.button
        className="w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-white/90 rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
        onClick={handleZoomOut}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Uitzoomen"
      >
        <Minus size={18} className="text-gray-600" />
      </motion.button>
    </motion.div>
  )
}
