import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useMapStore } from '../../store'

export function ZoomButtons() {
  const map = useMapStore(state => state.map)

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

  return (
    <div className="fixed bottom-[30px] md:bottom-10 right-14 z-[800] flex gap-1">
      <motion.button
        className="w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white/90 rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
        onClick={handleZoomOut}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Uitzoomen"
      >
        <Minus size={20} className="text-gray-600" />
      </motion.button>
      <motion.button
        className="w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white/90 rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
        onClick={handleZoomIn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Inzoomen"
      >
        <Plus size={20} className="text-gray-600" />
      </motion.button>
    </div>
  )
}
