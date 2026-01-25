import { useEffect, useRef, useState, useCallback } from 'react'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { useMapStore } from '../../store/mapStore'
import { useSettingsStore } from '../../store/settingsStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudRain, Play, Pause, X, Clock, ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'lucide-react'

interface RadarFrame {
  path: string
  time: number
}

interface RainRadarLayerProps {
  isVisible: boolean
  onClose: () => void
}

export function RainRadarLayer({ isVisible, onClose }: RainRadarLayerProps) {
  const map = useMapStore(state => state.map)
  const fontScale = useSettingsStore(state => state.fontScale)

  const layerRef = useRef<TileLayer<XYZ> | null>(null)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  // Radar state
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal')
  const [mode, setMode] = useState<'2h' | '24h'>('2h')
  const [opacity, setOpacity] = useState(70)

  // Speed in ms
  const speedMs = speed === 'slow' ? 800 : speed === 'normal' ? 500 : 250

  // Fetch radar frames from RainViewer API
  const fetchRadarData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('https://api.rainviewer.com/public/weather-maps.json')
      const data = await response.json()

      const allFrames: RadarFrame[] = []

      // Past frames (last ~2 hours)
      if (data.radar?.past) {
        data.radar.past.forEach((f: { path: string; time: number }) => {
          allFrames.push({ path: f.path, time: f.time * 1000 })
        })
      }

      // Nowcast/forecast frames (next ~2 hours)
      if (data.radar?.nowcast) {
        data.radar.nowcast.forEach((f: { path: string; time: number }) => {
          allFrames.push({ path: f.path, time: f.time * 1000 })
        })
      }

      setFrames(allFrames)
      // Start at most recent past frame
      const nowIndex = data.radar?.past?.length ? data.radar.past.length - 1 : 0
      setCurrentFrameIndex(nowIndex)
    } catch (error) {
      console.error('Failed to fetch radar data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    if (isVisible) {
      fetchRadarData()
      // Refresh radar data every 5 minutes
      const refreshInterval = setInterval(fetchRadarData, 5 * 60 * 1000)
      return () => clearInterval(refreshInterval)
    }
  }, [isVisible, fetchRadarData])

  // Create and manage the radar layer
  useEffect(() => {
    if (!map || !isVisible || frames.length === 0) return

    const frame = frames[currentFrameIndex]
    if (!frame) return

    // Create tile URL
    const tileUrl = `https://tilecache.rainviewer.com${frame.path}/256/{z}/{x}/{y}/2/1_1.png`

    // If layer exists, update source
    if (layerRef.current) {
      const source = layerRef.current.getSource()
      if (source) {
        source.setUrl(tileUrl)
        source.refresh()
      }
    } else {
      // Create new layer
      const source = new XYZ({
        url: tileUrl,
        crossOrigin: 'anonymous'
      })

      const layer = new TileLayer({
        source,
        opacity: opacity / 100,
        zIndex: 1500, // Above most layers but below UI
        properties: {
          name: 'rain-radar-layer',
          title: 'Buienradar'
        }
      })

      layerRef.current = layer
      map.addLayer(layer)
    }

    return () => {
      // Don't remove layer here, we manage it separately
    }
  }, [map, isVisible, frames, currentFrameIndex])

  // Update opacity
  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.setOpacity(opacity / 100)
    }
  }, [opacity])

  // Remove layer when hidden
  useEffect(() => {
    if (!isVisible && layerRef.current && map) {
      map.removeLayer(layerRef.current)
      layerRef.current = null
    }
  }, [isVisible, map])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current)
        layerRef.current = null
      }
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [map])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || frames.length === 0 || !isVisible) {
      if (animationRef.current) {
        clearInterval(animationRef.current)
        animationRef.current = null
      }
      return
    }

    animationRef.current = setInterval(() => {
      setCurrentFrameIndex(prev => (prev + 1) % frames.length)
    }, speedMs)

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isPlaying, frames.length, speedMs, isVisible])

  // Get time label for current frame
  const getTimeLabel = useCallback(() => {
    if (frames.length === 0 || !frames[currentFrameIndex]) return 'Laden...'

    const frameTime = frames[currentFrameIndex].time
    const now = Date.now()
    const diffMinutes = Math.round((frameTime - now) / 60000)

    const time = new Date(frameTime)
    const timeStr = time.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })

    if (Math.abs(diffMinutes) < 3) return `${timeStr} (Nu)`
    if (diffMinutes < 0) return `${timeStr} (${diffMinutes} min)`
    return `${timeStr} (+${diffMinutes} min)`
  }, [frames, currentFrameIndex])

  // Step through frames manually
  const stepFrame = (direction: 'prev' | 'next') => {
    setIsPlaying(false)
    setCurrentFrameIndex(prev => {
      if (direction === 'prev') {
        return prev > 0 ? prev - 1 : frames.length - 1
      }
      return (prev + 1) % frames.length
    })
  }

  // Jump to start or end
  const jumpTo = (position: 'start' | 'end' | 'now') => {
    setIsPlaying(false)
    if (position === 'start') {
      setCurrentFrameIndex(0)
    } else if (position === 'end') {
      setCurrentFrameIndex(frames.length - 1)
    } else {
      // Find frame closest to now
      const now = Date.now()
      const nowIndex = frames.findIndex(f => f.time >= now)
      setCurrentFrameIndex(nowIndex >= 0 ? Math.max(0, nowIndex - 1) : frames.length - 1)
    }
  }

  if (!isVisible) return null

  const baseFontSize = 14 * fontScale / 100

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-20 left-2 right-2 z-[1600] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200"
        style={{ fontSize: `${baseFontSize}px` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CloudRain size={18} className="text-blue-500" />
            <span className="font-medium text-gray-800">Buienradar</span>
            {isLoading && (
              <span className="text-xs text-gray-400 animate-pulse">Laden...</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors border-0 outline-none bg-transparent"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Time display */}
        <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span className="font-medium text-gray-700">{getTimeLabel()}</span>
            </div>
            <div className="text-xs text-gray-500">
              Frame {currentFrameIndex + 1} / {frames.length}
            </div>
          </div>
        </div>

        {/* Timeline slider */}
        <div className="px-3 py-2">
          <input
            type="range"
            min="0"
            max={Math.max(0, frames.length - 1)}
            value={currentFrameIndex}
            onChange={(e) => {
              setIsPlaying(false)
              setCurrentFrameIndex(parseInt(e.target.value))
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>-2 uur</span>
            <span className="text-blue-500 font-medium">Nu</span>
            <span>+2 uur</span>
          </div>
        </div>

        {/* Controls */}
        <div className="px-3 py-2 flex items-center justify-between gap-2">
          {/* Playback controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => jumpTo('start')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-0 outline-none bg-transparent"
              title="Naar begin"
            >
              <SkipBack size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => stepFrame('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-0 outline-none bg-transparent"
              title="Vorige frame"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-lg transition-colors border-0 outline-none ${
                isPlaying ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isPlaying ? 'Pauzeren' : 'Afspelen'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={() => stepFrame('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-0 outline-none bg-transparent"
              title="Volgende frame"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => jumpTo('end')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-0 outline-none bg-transparent"
              title="Naar einde"
            >
              <SkipForward size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Speed control */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            {(['slow', 'normal', 'fast'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 text-xs rounded-md transition-colors border-0 outline-none ${
                  speed === s
                    ? 'bg-white text-blue-600 shadow-sm font-medium'
                    : 'text-gray-600 hover:text-gray-800 bg-transparent'
                }`}
              >
                {s === 'slow' ? '0.5x' : s === 'normal' ? '1x' : '2x'}
              </button>
            ))}
          </div>
        </div>

        {/* Opacity slider */}
        <div className="px-3 py-2 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-16">Dekking</span>
            <input
              type="range"
              min="20"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-xs text-gray-600 w-10 text-right">{opacity}%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-center gap-2">
          <span className="text-[10px] text-gray-500">Licht</span>
          <div className="flex h-2 rounded overflow-hidden">
            <div className="w-5" style={{ backgroundColor: '#88D0F3' }} />
            <div className="w-5" style={{ backgroundColor: '#32B8A4' }} />
            <div className="w-5" style={{ backgroundColor: '#F4E61F' }} />
            <div className="w-5" style={{ backgroundColor: '#F09D1C' }} />
            <div className="w-5" style={{ backgroundColor: '#E12E18' }} />
          </div>
          <span className="text-[10px] text-gray-500">Zwaar</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
