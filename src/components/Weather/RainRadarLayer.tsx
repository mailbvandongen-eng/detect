import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudRain, X, RefreshCw } from 'lucide-react'
import { useGPSStore } from '../../store'

interface PrecipData {
  time: string
  precipitation: number
}

interface RainRadarLayerProps {
  isVisible: boolean
  onClose: () => void
}

// Default location: center of Netherlands
const DEFAULT_LOCATION = { lat: 52.1326, lon: 5.2913 }

export function RainRadarLayer({ isVisible, onClose }: RainRadarLayerProps) {
  const gps = useGPSStore()

  const [data, setData] = useState<PrecipData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'2u' | '6u' | '24u'>('2u')

  // Fetch precipitation data from Open-Meteo
  const fetchPrecipData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const loc = gps.position || DEFAULT_LOCATION

    try {
      // Use DWD-ICON model for 15-minute resolution in Netherlands
      const url = `https://api.open-meteo.com/v1/dwd-icon?latitude=${loc.lat}&longitude=${loc.lon}&minutely_15=precipitation&timezone=Europe/Amsterdam`

      const response = await fetch(url)
      if (!response.ok) throw new Error('API error')

      const result = await response.json()

      if (result.minutely_15?.time && result.minutely_15?.precipitation) {
        const precipData: PrecipData[] = result.minutely_15.time.map((time: string, i: number) => ({
          time,
          precipitation: result.minutely_15.precipitation[i] || 0
        }))
        setData(precipData)
      }
    } catch (err) {
      console.error('Failed to fetch precipitation data:', err)
      setError('Kon neerslagdata niet laden')
    } finally {
      setIsLoading(false)
    }
  }, [gps.position?.lat, gps.position?.lon])

  // Initial fetch and refresh
  useEffect(() => {
    if (isVisible) {
      fetchPrecipData()
      // Refresh every 5 minutes
      const interval = setInterval(fetchPrecipData, 5 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [isVisible, fetchPrecipData])

  // Filter data based on time range
  const getFilteredData = useCallback(() => {
    if (data.length === 0) return []

    const now = new Date()
    const hoursAhead = timeRange === '2u' ? 2 : timeRange === '6u' ? 6 : 24
    const endTime = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000)

    // Filter to show from now to endTime
    return data.filter(d => {
      const t = new Date(d.time)
      return t >= now && t <= endTime
    })
  }, [data, timeRange])

  const filteredData = getFilteredData()
  const maxPrecip = Math.max(...filteredData.map(d => d.precipitation), 0.5)
  const totalPrecip = filteredData.reduce((sum, d) => sum + d.precipitation, 0)
  const hasRain = filteredData.some(d => d.precipitation > 0)

  // Format time as HH:MM
  const formatTime = (isoTime: string) => {
    return new Date(isoTime).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
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
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CloudRain size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Neerslag</span>
            {!isLoading && !error && (
              <span className={`text-xs ${hasRain ? 'text-blue-600' : 'text-green-600'}`}>
                {hasRain ? `${totalPrecip.toFixed(1)} mm` : 'Droog'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Time range selector */}
            <div className="flex items-center gap-0.5 bg-gray-100 rounded p-0.5">
              {(['2u', '6u', '24u'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2 py-0.5 text-[10px] rounded transition-colors border-0 outline-none ${
                    timeRange === range ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 bg-transparent'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors border-0 outline-none bg-transparent"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-3 py-3">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-4">
              <RefreshCw size={16} className="animate-spin text-blue-500" />
              <span className="text-sm text-gray-500">Laden...</span>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <span className="text-sm text-red-500">{error}</span>
              <button
                onClick={fetchPrecipData}
                className="block mx-auto mt-2 text-xs text-blue-500 hover:underline border-0 bg-transparent"
              >
                Opnieuw proberen
              </button>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-4 text-sm text-gray-500">
              Geen data beschikbaar
            </div>
          ) : (
            <>
              {/* Bar chart */}
              <div className="relative h-16 bg-gray-50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-end">
                  {filteredData.map((d, i) => {
                    const height = (d.precipitation / maxPrecip) * 100
                    const intensity = d.precipitation > 2 ? 'bg-blue-600' :
                                     d.precipitation > 0.5 ? 'bg-blue-500' :
                                     d.precipitation > 0.1 ? 'bg-blue-400' :
                                     d.precipitation > 0 ? 'bg-blue-300' : 'bg-transparent'
                    return (
                      <div
                        key={i}
                        className="flex-1"
                        title={`${formatTime(d.time)}: ${d.precipitation.toFixed(1)} mm`}
                      >
                        <div
                          className={`w-full rounded-t ${intensity}`}
                          style={{ height: `${Math.max(height, d.precipitation > 0 ? 8 : 0)}%` }}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* "Nu" indicator line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-500" />
                <div className="absolute left-0 top-0 text-[8px] text-red-500 font-medium px-0.5">
                  nu
                </div>
              </div>

              {/* Time labels */}
              <div className="flex justify-between text-[9px] text-gray-400 mt-1 px-0.5">
                <span>nu</span>
                <span>
                  {filteredData.length > 0 ? formatTime(filteredData[Math.floor(filteredData.length / 2)].time) : ''}
                </span>
                <span>
                  {filteredData.length > 0 ? formatTime(filteredData[filteredData.length - 1].time) : ''}
                </span>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <span className="text-[8px] text-gray-400">Licht</span>
                <div className="flex h-1.5 rounded overflow-hidden">
                  <div className="w-3 bg-blue-300" />
                  <div className="w-3 bg-blue-400" />
                  <div className="w-3 bg-blue-500" />
                  <div className="w-3 bg-blue-600" />
                </div>
                <span className="text-[8px] text-gray-400">Zwaar</span>
              </div>

              {/* Attribution */}
              <div className="text-[7px] text-gray-300 text-center mt-2">
                Data: Open-Meteo.com (DWD ICON)
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
