import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CloudRain, X, Play, Pause } from 'lucide-react'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { useMapStore } from '../../store'

interface RadarFrame {
  time: number
  path: string
}

interface RainRadarLayerProps {
  isVisible: boolean
  onClose: () => void
}

export function RainRadarLayer({ isVisible, onClose }: RainRadarLayerProps) {
  const map = useMapStore(state => state.map)
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nowIndex, setNowIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const layerRef = useRef<TileLayer<XYZ> | null>(null)
  const playIntervalRef = useRef<number | null>(null)

  // Fetch available radar frames from RainViewer
  const fetchFrames = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('https://api.rainviewer.com/public/weather-maps.json')
      const data = await response.json()

      // Combine past and nowcast (future) frames
      const pastFrames: RadarFrame[] = (data.radar?.past || []).map((f: any) => ({
        time: f.time,
        path: f.path
      }))
      const nowcastFrames: RadarFrame[] = (data.radar?.nowcast || []).map((f: any) => ({
        time: f.time,
        path: f.path
      }))

      const allFrames = [...pastFrames, ...nowcastFrames]
      setFrames(allFrames)

      // Find "now" index (last past frame)
      const nowIdx = pastFrames.length > 0 ? pastFrames.length - 1 : 0
      setNowIndex(nowIdx)
      setCurrentIndex(nowIdx)
    } catch (err) {
      console.error('Failed to fetch radar frames:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    if (isVisible) {
      fetchFrames()
      // Refresh every 5 minutes
      const interval = setInterval(fetchFrames, 5 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [isVisible, fetchFrames])

  // Create/update radar layer on map
  useEffect(() => {
    if (!map || !isVisible || frames.length === 0) return

    const frame = frames[currentIndex]
    if (!frame) return

    const radarSource = new XYZ({
      url: `https://tilecache.rainviewer.com${frame.path}/256/{z}/{x}/{y}/2/1_1.png`,
      tileSize: 256,
      attributions: 'RainViewer.com'
    })

    // Remove old layer if exists
    if (layerRef.current) {
      map.removeLayer(layerRef.current)
    }

    // Create new layer
    const radarLayer = new TileLayer({
      source: radarSource,
      opacity: 0.6,
      zIndex: 100
    })

    map.addLayer(radarLayer)
    layerRef.current = radarLayer

    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current)
        layerRef.current = null
      }
    }
  }, [map, isVisible, frames, currentIndex])

  // Cleanup layer when closing
  useEffect(() => {
    if (!isVisible && layerRef.current && map) {
      map.removeLayer(layerRef.current)
      layerRef.current = null
    }
  }, [isVisible, map])

  // Playback animation - slower for smoother viewing
  useEffect(() => {
    if (isPlaying && frames.length > 0) {
      playIntervalRef.current = window.setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % frames.length)
      }, 700) // Slower animation
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current)
      playIntervalRef.current = null
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
      }
    }
  }, [isPlaying, frames.length])

  // Format relative time from now
  const formatRelativeTime = (timestamp: number, nowTimestamp: number) => {
    const diffMinutes = Math.round((timestamp - nowTimestamp) / 60)

    if (Math.abs(diffMinutes) < 5) return 'nu'

    if (diffMinutes < 0) {
      const absMin = Math.abs(diffMinutes)
      if (absMin >= 60) {
        const hours = Math.floor(absMin / 60)
        const mins = absMin % 60
        return mins > 0 ? `-${hours}u${mins}m` : `-${hours}u`
      }
      return `-${absMin}m`
    } else {
      if (diffMinutes >= 60) {
        const hours = Math.floor(diffMinutes / 60)
        const mins = diffMinutes % 60
        return mins > 0 ? `+${hours}u${mins}m` : `+${hours}u`
      }
      return `+${diffMinutes}m`
    }
  }

  // Format current time display
  const formatCurrentTime = (timestamp: number, nowTimestamp: number) => {
    const diffMinutes = Math.round((timestamp - nowTimestamp) / 60)
    const time = new Date(timestamp * 1000).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })

    if (Math.abs(diffMinutes) < 5) return `${time} (nu)`

    if (diffMinutes < 0) {
      return `${time} (${Math.abs(diffMinutes)} min geleden)`
    } else {
      return `${time} (+${diffMinutes} min)`
    }
  }

  if (!isVisible) return null

  const currentFrame = frames[currentIndex]
  const nowTimestamp = frames[nowIndex]?.time || Date.now() / 1000

  // Calculate relative times for labels
  const startLabel = frames.length > 0 ? formatRelativeTime(frames[0].time, nowTimestamp) : ''
  const endLabel = frames.length > 0 ? formatRelativeTime(frames[frames.length - 1].time, nowTimestamp) : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 left-2 right-2 z-[1600] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200"
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <CloudRain size={16} className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Buienradar</span>
          {currentFrame && (
            <span className="text-xs text-gray-500">
              {formatCurrentTime(currentFrame.time, nowTimestamp)}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors border-0 outline-none bg-transparent"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Controls */}
      <div className="px-3 py-3">
        {isLoading ? (
          <div className="text-center py-2 text-sm text-gray-500">Laden...</div>
        ) : frames.length === 0 ? (
          <div className="text-center py-2 text-sm text-gray-500">Geen data</div>
        ) : (
          <>
            {/* Time labels above slider */}
            <div className="flex justify-between text-[11px] text-gray-500 mb-1 px-10">
              <span>{startLabel}</span>
              <span className="text-red-500 font-medium">nu</span>
              <span>{endLabel}</span>
            </div>

            {/* Play button + Slider */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white border-0 outline-none transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <div className="flex-1 relative">
                <input
                  type="range"
                  min={0}
                  max={frames.length - 1}
                  value={currentIndex}
                  onChange={(e) => {
                    setIsPlaying(false)
                    setCurrentIndex(parseInt(e.target.value))
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />

                {/* "Nu" marker line */}
                <div
                  className="absolute top-0 w-0.5 h-2 bg-red-500 pointer-events-none rounded"
                  style={{ left: `${(nowIndex / Math.max(frames.length - 1, 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Attribution */}
            <div className="text-[7px] text-gray-300 text-center mt-2">
              RainViewer.com
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
