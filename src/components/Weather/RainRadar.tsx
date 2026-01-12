import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudRain, X, Play, Pause } from 'lucide-react'
import { useGPSStore } from '../../store'

interface RainRadarProps {
  isOpen: boolean
  onClose: () => void
}

// Rain Radar Modal with animated map using RainViewer API
export function RainRadar({ isOpen, onClose }: RainRadarProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [frameIndex, setFrameIndex] = useState(0)
  const [radarFrames, setRadarFrames] = useState<string[]>([])
  const position = useGPSStore(state => state.position)

  // RainViewer API for radar frames
  useEffect(() => {
    if (!isOpen) return

    const fetchRadarData = async () => {
      try {
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json')
        const data = await response.json()
        if (data.radar?.past) {
          const frames = data.radar.past.map((f: { path: string }) =>
            `https://tilecache.rainviewer.com${f.path}/256/{z}/{x}/{y}/2/1_1.png`
          )
          // Add nowcast frames
          if (data.radar?.nowcast) {
            frames.push(...data.radar.nowcast.map((f: { path: string }) =>
              `https://tilecache.rainviewer.com${f.path}/256/{z}/{x}/{y}/2/1_1.png`
            ))
          }
          setRadarFrames(frames)
        }
      } catch (error) {
        console.error('Failed to fetch radar data:', error)
      }
    }
    fetchRadarData()
  }, [isOpen])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || radarFrames.length === 0) return
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % radarFrames.length)
    }, 500)
    return () => clearInterval(interval)
  }, [isPlaying, radarFrames.length])

  // Default to center of Netherlands
  const lat = position?.lat || 52.1326
  const lng = position?.lon || 5.2913
  const zoom = 7

  // Calculate tile coordinates
  const n = Math.pow(2, zoom)
  const x = Math.floor((lng + 180) / 360 * n)
  const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n)

  const getTimeLabel = () => {
    if (radarFrames.length === 0) return 'Laden...'
    const pastFrames = 12 // Approximate past frames
    const diff = frameIndex - pastFrames
    if (diff < -5) return `-${Math.abs(diff) * 5} min`
    if (diff < 0) return `-${Math.abs(diff) * 5} min`
    if (diff === 0) return 'Nu'
    return `+${diff * 5} min`
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1800] flex items-center justify-center bg-black/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden select-none"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain size={20} className="text-blue-500" />
                <span className="font-semibold text-gray-800">Buienradar</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors border-0 outline-none bg-transparent">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Radar map */}
            <div className="relative bg-gray-200 rounded-xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
              {/* Base map (OSM) - 3x3 grid for more coverage */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                {[-1, 0, 1].map(dy =>
                  [-1, 0, 1].map(dx => (
                    <img
                      key={`${dx}-${dy}`}
                      src={`https://tile.openstreetmap.org/${zoom}/${x + dx}/${y + dy}.png`}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ filter: 'saturate(0.3) brightness(1.1)' }}
                    />
                  ))
                )}
              </div>

              {/* Radar overlay - 3x3 grid */}
              {radarFrames.length > 0 && (
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  {[-1, 0, 1].map(dy =>
                    [-1, 0, 1].map(dx => (
                      <img
                        key={`radar-${dx}-${dy}`}
                        src={radarFrames[frameIndex]?.replace('{z}', zoom.toString()).replace('{x}', (x + dx).toString()).replace('{y}', (y + dy).toString())}
                        alt=""
                        className="w-full h-full object-cover"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    ))
                  )}
                </div>
              )}

              {/* Time indicator */}
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                {getTimeLabel()}
              </div>

              {/* Location marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
              </div>
            </div>

            {/* Timeline slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={Math.max(0, radarFrames.length - 1)}
                value={frameIndex}
                onChange={(e) => {
                  setIsPlaying(false)
                  setFrameIndex(parseInt(e.target.value))
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[9px] text-gray-400">
                <span>-1 uur</span>
                <span>Nu</span>
                <span>+30 min</span>
              </div>
            </div>

            {/* Play controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors border-0 outline-none"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span className="text-sm font-medium">{isPlaying ? 'Pauzeren' : 'Afspelen'}</span>
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
              <span>Licht</span>
              <div className="flex h-2">
                <div className="w-4 bg-blue-200 rounded-l" />
                <div className="w-4 bg-blue-400" />
                <div className="w-4 bg-blue-600" />
                <div className="w-4 bg-purple-600" />
                <div className="w-4 bg-red-500 rounded-r" />
              </div>
              <span>Zwaar</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
