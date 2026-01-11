import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Droplets,
  Thermometer, MapPin, Navigation, Plus, Trash2, RefreshCw, CloudFog,
  Sunrise, Sunset, ChevronDown, ChevronUp, Radio
} from 'lucide-react'
import {
  useWeatherStore,
  useSettingsStore,
  useGPSStore,
  weatherCodeDescriptions,
  windDirectionToText
} from '../../store'
import type { WeatherCode, HourlyForecast, DailyForecast, SavedLocation } from '../../store'

// Weather icon based on code
function WeatherIcon({ code, isDay = true, size = 24 }: { code: WeatherCode; isDay?: boolean; size?: number }) {
  // Clear
  if (code === 0) return isDay ? <Sun size={size} className="text-yellow-500" /> : <Cloud size={size} className="text-gray-400" />
  // Partly cloudy
  if (code >= 1 && code <= 3) return <Cloud size={size} className="text-gray-500" />
  // Fog
  if (code === 45 || code === 48) return <CloudFog size={size} className="text-gray-400" />
  // Drizzle/Rain
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={size} className="text-blue-500" />
  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow size={size} className="text-blue-300" />
  // Thunderstorm
  if (code >= 95) return <CloudLightning size={size} className="text-purple-500" />
  return <Cloud size={size} className="text-gray-500" />
}

// Wind direction arrow
function WindArrow({ degrees, size = 16 }: { degrees: number; size?: number }) {
  return (
    <div
      style={{ transform: `rotate(${degrees + 180}deg)` }}
      className="inline-block"
    >
      <Navigation size={size} className="text-blue-500" />
    </div>
  )
}

// Format time from ISO string
function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
}

// Format date
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return 'Vandaag'
  if (date.toDateString() === tomorrow.toDateString()) return 'Morgen'

  return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })
}

// Day name short
function getDayName(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return 'Vandaag'
  if (date.toDateString() === tomorrow.toDateString()) return 'Morgen'

  return date.toLocaleDateString('nl-NL', { weekday: 'short' })
}

export function WeatherPanel() {
  const settings = useSettingsStore()
  const gps = useGPSStore()
  const weather = useWeatherStore()
  const baseFontSize = 14 * settings.fontScale / 100

  const [showAddLocation, setShowAddLocation] = useState(false)
  const [newLocationName, setNewLocationName] = useState('')
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'weer' | 'buienradar'>('weer')

  // Fetch weather when panel opens or location changes
  useEffect(() => {
    if (weather.weatherPanelOpen) {
      const selectedLoc = weather.savedLocations.find(l => l.id === weather.selectedLocationId)
      if (selectedLoc) {
        // For current location, use GPS position
        if (selectedLoc.isCurrentLocation && gps.position) {
          weather.updateCurrentLocation(gps.position.lat, gps.position.lon)
          weather.fetchWeather(gps.position.lat, gps.position.lon)
        } else if (!selectedLoc.isCurrentLocation && selectedLoc.lat !== 0) {
          weather.fetchWeather(selectedLoc.lat, selectedLoc.lon)
        } else if (gps.position) {
          // Fallback to GPS
          weather.fetchWeather(gps.position.lat, gps.position.lon)
        }
      }
    }
  }, [weather.weatherPanelOpen, weather.selectedLocationId, gps.position?.lat])

  // Add current location as saved
  const handleAddLocation = () => {
    if (newLocationName.trim() && gps.position) {
      weather.addLocation({
        name: newLocationName.trim(),
        lat: gps.position.lat,
        lon: gps.position.lon
      })
      setNewLocationName('')
      setShowAddLocation(false)
    }
  }

  // Get current hour index for highlighting
  const currentHour = new Date().getHours()

  // Filter hourly to show from current hour
  const upcomingHours = weather.weatherData?.hourly.filter(h => {
    const hourTime = new Date(h.time).getHours()
    const hourDate = new Date(h.time).toDateString()
    const todayDate = new Date().toDateString()
    return hourDate === todayDate ? hourTime >= currentHour : true
  }).slice(0, 12) || []

  return (
    <AnimatePresence>
      {weather.weatherPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[1700] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => weather.toggleWeatherPanel()}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-4 z-[1701] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-sm mx-auto my-auto max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              style={{ fontSize: `${baseFontSize}px` }}
            >
              <div className="flex items-center gap-2">
                <Cloud size={18} />
                <span className="font-medium">Weer</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const selectedLoc = weather.savedLocations.find(l => l.id === weather.selectedLocationId)
                    if (selectedLoc) {
                      if (selectedLoc.isCurrentLocation && gps.position) {
                        weather.fetchWeather(gps.position.lat, gps.position.lon)
                      } else {
                        weather.fetchWeather(selectedLoc.lat, selectedLoc.lon)
                      }
                    }
                  }}
                  className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none"
                  title="Vernieuwen"
                >
                  <RefreshCw size={16} className={weather.isLoading ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => weather.toggleWeatherPanel()}
                  className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('weer')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors border-0 outline-none ${
                  activeTab === 'weer'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Cloud size={14} />
                Weersverwachting
              </button>
              <button
                onClick={() => setActiveTab('buienradar')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors border-0 outline-none ${
                  activeTab === 'buienradar'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Radio size={14} />
                Buienradar
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto" style={{ fontSize: `${baseFontSize}px` }}>
              {activeTab === 'weer' ? (
                <div className="p-4 space-y-4">
                  {/* Location selector */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-blue-600" />
                      <span className="font-medium text-gray-700" style={{ fontSize: '0.9em' }}>Locatie</span>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={weather.selectedLocationId || 'current'}
                        onChange={(e) => weather.setSelectedLocation(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ fontSize: '0.9em' }}
                      >
                        {weather.savedLocations.map(loc => (
                          <option key={loc.id} value={loc.id}>
                            {loc.isCurrentLocation ? '📍 ' : ''}{loc.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setShowAddLocation(!showAddLocation)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors border-0 outline-none"
                        title="Locatie opslaan"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {/* Add location form */}
                    {showAddLocation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-2 mt-2"
                      >
                        <input
                          type="text"
                          value={newLocationName}
                          onChange={(e) => setNewLocationName(e.target.value)}
                          placeholder="Naam voor deze locatie"
                          className="flex-1 px-3 py-2 bg-gray-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ fontSize: '0.9em' }}
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && handleAddLocation()}
                        />
                        <button
                          onClick={handleAddLocation}
                          disabled={!newLocationName.trim() || !gps.position}
                          className="px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg transition-colors border-0 outline-none"
                          style={{ fontSize: '0.9em' }}
                        >
                          Opslaan
                        </button>
                      </motion.div>
                    )}

                    {/* Saved locations list */}
                    {weather.savedLocations.filter(l => !l.isCurrentLocation).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {weather.savedLocations.filter(l => !l.isCurrentLocation).map(loc => (
                          <div
                            key={loc.id}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full text-blue-700"
                            style={{ fontSize: '0.75em' }}
                          >
                            <span>{loc.name}</span>
                            <button
                              onClick={() => weather.removeLocation(loc.id)}
                              className="p-0.5 hover:bg-blue-100 rounded-full transition-colors border-0 outline-none"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Loading state */}
                  {weather.isLoading && (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw size={24} className="animate-spin text-blue-500" />
                    </div>
                  )}

                  {/* Error state */}
                  {weather.error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg" style={{ fontSize: '0.9em' }}>
                      {weather.error}
                    </div>
                  )}

                  {/* Current weather */}
                  {weather.weatherData && !weather.isLoading && (
                    <>
                      {/* Current conditions */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <WeatherIcon
                                code={weather.weatherData.current.weatherCode}
                                isDay={weather.weatherData.current.isDay}
                                size={32}
                              />
                              <span className="text-3xl font-bold text-gray-800">
                                {Math.round(weather.weatherData.current.temperature)}°
                              </span>
                            </div>
                            <p className="text-gray-600 mt-1" style={{ fontSize: '0.9em' }}>
                              {weatherCodeDescriptions[weather.weatherData.current.weatherCode] || 'Onbekend'}
                            </p>
                            <p className="text-gray-500" style={{ fontSize: '0.75em' }}>
                              Voelt als {Math.round(weather.weatherData.current.apparentTemperature)}°
                            </p>
                          </div>
                          <div className="text-right space-y-1" style={{ fontSize: '0.75em' }}>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Droplets size={12} />
                              <span>{weather.weatherData.current.humidity}%</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Wind size={12} />
                              <span>{Math.round(weather.weatherData.current.windSpeed)} km/u</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <WindArrow degrees={weather.weatherData.current.windDirection} size={12} />
                              <span>{windDirectionToText(weather.weatherData.current.windDirection)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Wind details */}
                        <div className="flex items-center gap-4 pt-2 border-t border-blue-100">
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-1 text-blue-600">
                              <Wind size={14} />
                              <span style={{ fontSize: '0.75em' }}>Wind</span>
                            </div>
                            <p className="font-medium text-gray-800" style={{ fontSize: '0.9em' }}>
                              {Math.round(weather.weatherData.current.windSpeed)} km/u
                            </p>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-1 text-blue-600">
                              <Navigation size={14} />
                              <span style={{ fontSize: '0.75em' }}>Richting</span>
                            </div>
                            <p className="font-medium text-gray-800" style={{ fontSize: '0.9em' }}>
                              {windDirectionToText(weather.weatherData.current.windDirection)}
                            </p>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-1 text-blue-600">
                              <Wind size={14} />
                              <span style={{ fontSize: '0.75em' }}>Windstoten</span>
                            </div>
                            <p className="font-medium text-gray-800" style={{ fontSize: '0.9em' }}>
                              {Math.round(weather.weatherData.current.windGusts)} km/u
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Hourly forecast */}
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2" style={{ fontSize: '0.9em' }}>
                          <Thermometer size={14} className="text-blue-600" />
                          Komende uren
                        </h3>
                        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                          {upcomingHours.map((hour, i) => (
                            <div
                              key={hour.time}
                              className={`flex-shrink-0 w-16 p-2 rounded-lg text-center ${
                                i === 0 ? 'bg-blue-100' : 'bg-gray-50'
                              }`}
                            >
                              <p className="text-gray-500" style={{ fontSize: '0.7em' }}>
                                {i === 0 ? 'Nu' : formatTime(hour.time)}
                              </p>
                              <div className="my-1">
                                <WeatherIcon code={hour.weatherCode} size={20} />
                              </div>
                              <p className="font-medium text-gray-800" style={{ fontSize: '0.85em' }}>
                                {Math.round(hour.temperature)}°
                              </p>
                              {hour.precipitationProbability > 0 && (
                                <p className="text-blue-500" style={{ fontSize: '0.65em' }}>
                                  {hour.precipitationProbability}%
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Daily forecast */}
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2" style={{ fontSize: '0.9em' }}>
                          <Cloud size={14} className="text-blue-600" />
                          7-daagse voorspelling
                        </h3>
                        <div className="space-y-1">
                          {weather.weatherData.daily.map((day) => (
                            <div key={day.date}>
                              <button
                                onClick={() => setExpandedDay(expandedDay === day.date ? null : day.date)}
                                className="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border-0 outline-none"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-16 text-gray-600" style={{ fontSize: '0.85em' }}>
                                    {getDayName(day.date)}
                                  </span>
                                  <WeatherIcon code={day.weatherCode} size={20} />
                                </div>
                                <div className="flex items-center gap-3">
                                  {day.precipitationProbability > 0 && (
                                    <span className="text-blue-500" style={{ fontSize: '0.75em' }}>
                                      <Droplets size={12} className="inline mr-1" />
                                      {day.precipitationProbability}%
                                    </span>
                                  )}
                                  <span className="w-12 text-right font-medium text-gray-800" style={{ fontSize: '0.85em' }}>
                                    {Math.round(day.temperatureMax)}°
                                  </span>
                                  <span className="w-10 text-right text-gray-500" style={{ fontSize: '0.85em' }}>
                                    {Math.round(day.temperatureMin)}°
                                  </span>
                                  {expandedDay === day.date ? (
                                    <ChevronUp size={16} className="text-gray-400" />
                                  ) : (
                                    <ChevronDown size={16} className="text-gray-400" />
                                  )}
                                </div>
                              </button>

                              {/* Expanded details */}
                              <AnimatePresence>
                                {expandedDay === day.date && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-3 bg-blue-50 rounded-lg mt-1 space-y-2">
                                      <p className="text-gray-700" style={{ fontSize: '0.85em' }}>
                                        {weatherCodeDescriptions[day.weatherCode] || 'Onbekend'}
                                      </p>
                                      <div className="grid grid-cols-2 gap-2" style={{ fontSize: '0.75em' }}>
                                        <div className="flex items-center gap-1 text-gray-600">
                                          <Wind size={12} />
                                          <span>Max wind: {Math.round(day.windSpeedMax)} km/u</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600">
                                          <Droplets size={12} />
                                          <span>Neerslag: {day.precipitationSum.toFixed(1)} mm</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600">
                                          <Sunrise size={12} />
                                          <span>Opkomst: {formatTime(day.sunrise)}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600">
                                          <Sunset size={12} />
                                          <span>Ondergang: {formatTime(day.sunset)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Last updated */}
                      <p className="text-gray-400 text-center" style={{ fontSize: '0.7em' }}>
                        Bijgewerkt: {new Date(weather.weatherData.lastUpdated).toLocaleTimeString('nl-NL', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        {' '}&bull;{' '}
                        Data: Open-Meteo
                      </p>
                    </>
                  )}

                  {/* No data yet */}
                  {!weather.weatherData && !weather.isLoading && !weather.error && (
                    <div className="text-center py-8 text-gray-500">
                      <Cloud size={48} className="mx-auto mb-2 opacity-30" />
                      <p style={{ fontSize: '0.9em' }}>
                        {gps.position
                          ? 'Klik op vernieuwen om weerdata op te halen'
                          : 'GPS aanzetten voor weerdata'}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Buienradar tab */
                <div className="p-4 space-y-4">
                  <p className="text-gray-600" style={{ fontSize: '0.9em' }}>
                    Bekijk de actuele neerslagradar voor Nederland. Handig om te zien of er regen aankomt!
                  </p>

                  {/* Buienradar iframe */}
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src="https://gadgets.buienradar.nl/gadget/zoommap/?lat=52.1&lng=5.18&ovession=1&zoom=8&naam=Nederland&size=2&voor=1"
                      className="absolute inset-0 w-full h-full border-0"
                      title="Buienradar"
                      loading="lazy"
                    />
                  </div>

                  {/* Buienalarm for current location */}
                  {gps.position && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-700 flex items-center gap-2" style={{ fontSize: '0.9em' }}>
                        <MapPin size={14} className="text-blue-600" />
                        Buienalarm voor jouw locatie
                      </h3>
                      <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <iframe
                          src={`https://gadgets.buienradar.nl/gadget/buienradarwijzer/?lat=${gps.position.lat}&lng=${gps.position.lon}&ovession=1&naam=Mijn%20locatie&size=1`}
                          className="w-full h-32 border-0"
                          title="Buienalarm"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  {/* Link to full Buienradar */}
                  <a
                    href="https://www.buienradar.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    style={{ fontSize: '0.9em' }}
                  >
                    <Radio size={16} />
                    Open Buienradar.nl
                  </a>

                  <p className="text-gray-400 text-center" style={{ fontSize: '0.7em' }}>
                    Neerslagdata door Buienradar.nl
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
