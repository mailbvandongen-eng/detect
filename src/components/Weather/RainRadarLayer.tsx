import { useEffect, useRef, useState, useCallback } from 'react'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { useMapStore } from '../../store/mapStore'
import { useWeatherStore } from '../../store/weatherStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudRain, Play, Pause, X, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const weatherData = useWeatherStore(state => state.weatherData)

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

  // Get 24h precipitation data grouped by hour
  const hourlyPrecip = weatherData?.precipitation48h
    ? weatherData.precipitation48h.reduce((acc: { time: string; precip: number }[], item, idx) => {
        if (idx % 4 === 0) {
          const hourTotal = weatherData.precipitation48h.slice(idx, idx + 4).reduce((sum, p) => sum + p.precipitation, 0)
          acc.push({ time: item.time, precip: hourTotal })
        }
        return acc
      }, []).slice(0, 24)
    : []

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

  // Hide radar layer when in 24h mode
  useEffect(() => {
    if (mode === '24h' && layerRef.current) {
      layerRef.current.setVisible(false)
    } else if (mode === '2h' && layerRef.current) {
      layerRef.current.setVisible(true)
    }
  }, [mode])

  // Create and manage the radar layer
  useEffect(() => {
    if (!map || !isVisible || frames.length === 0 || mode === '24h') return

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
    if (frames.length === 0 || !frames[currentFrameIndex]) return '--:--'

    const frameTime = frames[currentFrameIndex].time
    const now = Date.now()
    const diffMinutes = Math.round((frameTime - now) / 60000)

    const time = new Date(frameTime)
    const timeStr = time.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })

    if (Math.abs(diffMinutes) < 3) return `${timeStr} (nu)`
    if (diffMinutes < 0) return `${timeStr} (${diffMinutes}m)`
    return `${timeStr} (+${diffMinutes}m)`
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

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 left-2 right-2 z-[1600] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200"
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        {/* Compact single-row header with time and close */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CloudRain size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-gray-700">
              {isLoading ? 'Laden...' : getTimeLabel()}
            </span>
          </div>

          {/* 2h / 24h toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
            <button
              onClick={() => setMode('2h')}
              className={`px-2 py-0.5 text-[10px] rounded transition-colors border-0 outline-none ${
                mode === '2h' ? 'bg-white text-blue-600 shadow-sm font-medium' : 'text-gray-500 bg-transparent'
              }`}
            >
              2 uur
            </button>
            <button
              onClick={() => setMode('24h')}
              className={`px-2 py-0.5 text-[10px] rounded transition-colors border-0 outline-none ${
                mode === '24h' ? 'bg-white text-blue-600 shadow-sm font-medium' : 'text-gray-500 bg-transparent'
              }`}
            >
              24 uur
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors border-0 outline-none bg-transparent"
          >
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        {mode === '2h' ? (
          <>
            {/* Compact controls row for 2h radar */}
            <div className="px-3 py-2 flex items-center gap-2">
              {/* Play controls */}
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => stepFrame('prev')}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors border-0 outline-none bg-transparent"
                >
                  <ChevronLeft size={14} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-1.5 rounded transition-colors border-0 outline-none ${
                    isPlaying ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  onClick={() => stepFrame('next')}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors border-0 outline-none bg-transparent"
                >
                  <ChevronRight size={14} className="text-gray-600" />
                </button>
              </div>

              {/* Timeline slider */}
              <div className="flex-1 flex items-center gap-1">
                <span className="text-[9px] text-gray-400 w-6">-2u</span>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, frames.length - 1)}
                  value={currentFrameIndex}
                  onChange={(e) => {
                    setIsPlaying(false)
                    setCurrentFrameIndex(parseInt(e.target.value))
                  }}
                  className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-[9px] text-gray-400 w-6 text-right">+2u</span>
              </div>

              {/* Speed */}
              <div className="flex items-center gap-0.5 bg-gray-100 rounded p-0.5">
                {(['slow', 'normal', 'fast'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-1.5 py-0.5 text-[9px] rounded transition-colors border-0 outline-none ${
                      speed === s ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 bg-transparent'
                    }`}
                  >
                    {s === 'slow' ? '½' : s === 'normal' ? '1' : '2'}×
                  </button>
                ))}
              </div>

              {/* Opacity mini slider */}
              <input
                type="range"
                min="20"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-12 h-1 bg-gray-200 rounded appearance-none cursor-pointer accent-blue-500"
                title={`Dekking: ${opacity}%`}
              />
            </div>

            {/* Legend */}
            <div className="px-3 pb-1.5 flex items-center justify-center gap-1.5">
              <span className="text-[8px] text-gray-400">Licht</span>
              <div className="flex h-1.5 rounded overflow-hidden">
                <div className="w-3" style={{ backgroundColor: '#88D0F3' }} />
                <div className="w-3" style={{ backgroundColor: '#32B8A4' }} />
                <div className="w-3" style={{ backgroundColor: '#F4E61F' }} />
                <div className="w-3" style={{ backgroundColor: '#F09D1C' }} />
                <div className="w-3" style={{ backgroundColor: '#E12E18' }} />
              </div>
              <span className="text-[8px] text-gray-400">Zwaar</span>
            </div>
          </>
        ) : (
          /* 24h precipitation forecast graph */
          <div className="px-3 py-2">
            {hourlyPrecip.length > 0 ? (
              <div className="space-y-1">
                {/* Bar chart */}
                <div className="flex items-end gap-px h-12 bg-gray-50 rounded p-1">
                  {hourlyPrecip.map((hour, i) => {
                    const maxPrecip = Math.max(...hourlyPrecip.map(h => h.precip), 1)
                    const height = (hour.precip / maxPrecip) * 100
                    const time = new Date(hour.time)
                    const intensity = hour.precip > 2 ? 'bg-blue-600' :
                                     hour.precip > 0.5 ? 'bg-blue-500' :
                                     hour.precip > 0 ? 'bg-blue-400' : 'bg-gray-200'
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${intensity}`}
                        style={{ height: `${Math.max(height, hour.precip > 0 ? 10 : 4)}%` }}
                        title={`${time.getHours()}:00 - ${hour.precip.toFixed(1)} mm`}
                      />
                    )
                  })}
                </div>
                {/* Time labels */}
                <div className="flex justify-between text-[8px] text-gray-400">
                  <span>Nu</span>
                  <span>+6u</span>
                  <span>+12u</span>
                  <span>+18u</span>
                  <span>+24u</span>
                </div>
                {/* Total */}
                <div className="text-center text-[10px] text-gray-500">
                  Totaal: <span className="font-medium text-blue-600">{hourlyPrecip.reduce((s, h) => s + h.precip, 0).toFixed(1)} mm</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-xs text-gray-400">
                Geen voorspelling beschikbaar
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
