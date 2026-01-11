import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog, Loader } from 'lucide-react'
import { useWeatherStore, useSettingsStore, useGPSStore } from '../../store'
import type { WeatherCode } from '../../store'

// Compact weather icon
function WeatherIconSmall({ code, isDay = true }: { code: WeatherCode; isDay?: boolean }) {
  const size = 18
  // Clear
  if (code === 0) return isDay ? <Sun size={size} className="text-yellow-400" /> : <Cloud size={size} className="text-gray-300" />
  // Partly cloudy
  if (code >= 1 && code <= 3) return <Cloud size={size} className="text-gray-300" />
  // Fog
  if (code === 45 || code === 48) return <CloudFog size={size} className="text-gray-300" />
  // Drizzle/Rain
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={size} className="text-blue-300" />
  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow size={size} className="text-blue-200" />
  // Thunderstorm
  if (code >= 95) return <CloudLightning size={size} className="text-purple-300" />
  return <Cloud size={size} className="text-gray-300" />
}

export function WeatherButton() {
  const showWeatherButton = useSettingsStore(state => state.showWeatherButton)
  const gps = useGPSStore()
  const weather = useWeatherStore()

  // Auto-fetch weather on mount if GPS available and no data yet
  useEffect(() => {
    if (showWeatherButton && gps.position && !weather.weatherData && !weather.isLoading) {
      weather.fetchWeather(gps.position.lat, gps.position.lon)
    }
  }, [showWeatherButton, gps.position?.lat])

  // Don't render if disabled
  if (!showWeatherButton) return null

  const hasData = weather.weatherData && !weather.isLoading
  const temp = hasData ? Math.round(weather.weatherData.current.temperature) : null

  return (
    <motion.button
      className="fixed bottom-[230px] right-2 z-[800] flex items-center gap-1.5 px-3 py-2 bg-white/90 hover:bg-white rounded-full shadow-lg border border-gray-200/50 backdrop-blur-sm transition-colors"
      onClick={() => weather.toggleWeatherPanel()}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Weer bekijken"
    >
      {weather.isLoading ? (
        <Loader size={18} className="animate-spin text-blue-500" />
      ) : hasData ? (
        <>
          <WeatherIconSmall
            code={weather.weatherData.current.weatherCode}
            isDay={weather.weatherData.current.isDay}
          />
          <span className="font-semibold text-sm text-gray-700">{temp}°</span>
        </>
      ) : (
        <Cloud size={18} className="text-gray-400" />
      )}
    </motion.button>
  )
}
