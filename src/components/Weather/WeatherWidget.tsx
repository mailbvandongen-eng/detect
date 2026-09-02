import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind, ChevronDown, ChevronUp, RefreshCw, Navigation, MapPin, Crosshair, Type } from 'lucide-react'
import { toLonLat } from 'ol/proj'
import { useWeatherStore, useSettingsStore, useGPSStore, useMapStore, weatherCodeDescriptions, windDirectionToText } from '../../store'
import type { WeatherCode, HourlyForecast, PrecipitationForecast } from '../../store'

const DEFAULT_LOCATION = { lat: 52.1326, lon: 5.2913 }
const TEN_MINUTES = 10 * 60 * 1000
const LOCATION_REFRESH_KM = 10

function WeatherIcon({ code, size = 18 }: { code: WeatherCode; size?: number }) {
  if (code === 0) return <Sun size={size} className="text-yellow-500" />
  if (code >= 1 && code <= 3) return <Cloud size={size} className="text-gray-400" />
  if (code === 45 || code === 48) return <CloudFog size={size} className="text-gray-400" />
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={size} className="text-blue-500" />
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow size={size} className="text-cyan-500" />
  if (code >= 95) return <CloudLightning size={size} className="text-purple-500" />
  return <Cloud size={size} className="text-gray-400" />
}

function WindArrow({ degrees, size = 13 }: { degrees: number; size?: number }) {
  return <span style={{ transform: `rotate(${degrees + 180}deg)` }} className="inline-flex"><Navigation size={size} className="text-blue-500" /></span>
}

function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const r = 6371
  const dLat = (b.lat - a.lat) * Math.PI / 180
  const dLon = (b.lon - a.lon) * Math.PI / 180
  const lat1 = a.lat * Math.PI / 180
  const lat2 = b.lat * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * r * Math.asin(Math.sqrt(h))
}

function drySummary(data: PrecipitationForecast[]) {
  if (!data.length) return 'Neerslagverwachting laden'
  const firstWet = data.find(point => point.precipitation >= 0.1)
  if (!firstWet) return 'Droog komende 2 uur'
  const minutes = Math.max(0, Math.round((new Date(firstWet.time).getTime() - Date.now()) / 60000))
  if (minutes <= 15) return 'Regen binnen 15 min'
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return `Regen over ±${hours ? `${hours}u ` : ''}${rest}m`
}

function HourlyFieldForecast({ hourly }: { hourly: HourlyForecast[] }) {
  const hours = hourly.slice(0, 12)
  if (!hours.length) return null
  return (
    <div>
      <div className="text-gray-500 mb-1" style={{ fontSize: '0.83em' }}>Veldweer · komende 12 uur</div>
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-1" style={{ width: 'max-content' }}>
          {hours.map((hour, i) => {
            const sunshineMinutes = Math.round((hour.sunshineDuration || 0) / 60)
            return (
              <div key={hour.time} className={`w-[64px] flex-shrink-0 rounded-lg p-1.5 text-center ${i === 0 ? 'bg-blue-100' : 'bg-gray-50'}`}>
                <div className="text-gray-500" style={{ fontSize: '0.72em' }}>{i === 0 ? 'Nu' : `${new Date(hour.time).getHours()}u`}</div>
                <div className="flex justify-center my-0.5"><WeatherIcon code={hour.weatherCode} size={15} /></div>
                <div className="font-semibold" style={{ fontSize: '0.9em' }}>{Math.round(hour.temperature)}°</div>
                <div className="text-blue-600" style={{ fontSize: '0.68em' }}>{Math.round(hour.precipitationProbability)}% · {hour.precipitation.toFixed(1)}mm</div>
                <div className="text-amber-600" style={{ fontSize: '0.68em' }}>☀ {sunshineMinutes}m</div>
                <div className="text-gray-500" style={{ fontSize: '0.68em' }}>{Math.round(hour.windSpeed)}/{Math.round(hour.windGusts)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function WeatherWidget() {
  const showWeatherButton = useSettingsStore(state => state.showWeatherButton)
  const showFontSliders = useSettingsStore(state => state.showFontSliders)
  const weatherFontScale = useSettingsStore(state => state.weatherFontScale)
  const setWeatherFontScale = useSettingsStore(state => state.setWeatherFontScale)
  const gpsPosition = useGPSStore(state => state.position)
  const map = useMapStore(state => state.map)
  const weather = useWeatherStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const baseFontSize = 12 * weatherFontScale / 100

  useEffect(() => {
    if (weather.showBuienradar) setIsExpanded(false)
  }, [weather.showBuienradar])

  useEffect(() => {
    if (!showWeatherButton) return
    const loc = gpsPosition || DEFAULT_LOCATION
    const cached = weather.weatherData
    const stale = !cached || Date.now() - cached.lastUpdated > TEN_MINUTES
    const moved = cached ? distanceKm(loc, cached.location) >= LOCATION_REFRESH_KM : true
    if (stale || moved) weather.fetchWeather(loc.lat, loc.lon, gpsPosition ? 'GPS-locatie' : 'Nederland')
  }, [showWeatherButton, gpsPosition?.lat, gpsPosition?.lon])

  useEffect(() => {
    if (!showWeatherButton) return
    const interval = window.setInterval(() => {
      const loc = gpsPosition || weather.weatherData?.location || DEFAULT_LOCATION
      weather.fetchWeather(loc.lat, loc.lon, weather.weatherData?.location.name)
    }, TEN_MINUTES)
    return () => window.clearInterval(interval)
  }, [showWeatherButton, gpsPosition?.lat, gpsPosition?.lon])

  const current = weather.weatherData?.current
  const hourly = weather.weatherData?.hourly || []
  const precip = weather.weatherData?.precipitation15min || []
  const rainText = useMemo(() => drySummary(precip), [precip])
  const sunshineNow = Math.round((hourly[0]?.sunshineDuration || 0) / 60)

  if (!showWeatherButton) return null

  const fetchMapCenter = () => {
    const center = map?.getView().getCenter()
    if (!center) return
    const [lon, lat] = toLonLat(center)
    weather.fetchWeather(lat, lon, 'Kaartpunt')
  }

  const fetchGps = () => {
    const loc = gpsPosition || DEFAULT_LOCATION
    weather.fetchWeather(loc.lat, loc.lon, gpsPosition ? 'GPS-locatie' : 'Nederland')
  }

  return (
    <>
      {isExpanded && <div className="fixed inset-0 z-[1099]" onClick={() => setIsExpanded(false)} />}
      <motion.div
        className={`fixed left-2 z-[1100] bg-white shadow-lg border border-gray-200 select-none rounded-xl ${isExpanded ? 'weather-widget-expanded' : 'weather-widget-compact'}`}
        style={{ top: 'max(0.5rem, env(safe-area-inset-top, 0.5rem))', width: isExpanded ? 'min(360px, calc(100vw - 16px))' : 'auto', maxWidth: 'calc(100vw - 16px)' }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} layout
      >
        {!current ? (
          <button onClick={fetchGps} className="p-3 flex items-center gap-2 border-0 bg-transparent" style={{ fontSize: `${baseFontSize}px` }}>
            <RefreshCw size={16} className={weather.isLoading ? 'animate-spin text-blue-500' : 'text-gray-500'} />
            <span className="text-gray-600">{weather.isLoading ? 'Weer ophalen…' : 'Weer laden'}</span>
          </button>
        ) : (
          <div className="p-2.5" style={{ fontSize: `${baseFontSize}px` }}>
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full border-0 outline-none bg-transparent p-0 text-left">
              <div className="weather-widget-summary flex items-center gap-2">
                <WeatherIcon code={current.weatherCode} size={24} />
                <span className="font-bold text-gray-800" style={{ fontSize: '1.5em' }}>{Math.round(current.temperature)}°</span>
                <span className="text-gray-500">{rainText}</span>
                {sunshineNow > 0 && <span className="text-amber-600">☀ {sunshineNow}m/u</span>}
                <span className="flex items-center gap-1 text-gray-600"><Wind size={13} />{Math.round(current.windSpeed)}<WindArrow degrees={current.windDirection} /></span>
                {weather.isLoading && <RefreshCw size={12} className="animate-spin text-blue-500" />}
                <span className="ml-auto">{isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}</span>
              </div>
              <div className="weather-widget-subline text-gray-500 mt-1" style={{ fontSize: '0.86em' }}>
                {weatherCodeDescriptions[current.weatherCode]} · voelt {Math.round(current.apparentTemperature)}° · {weather.weatherData?.location.name}
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pt-2 mt-2 border-t border-gray-200/50 space-y-3">
                    <div className="grid grid-cols-3 gap-1.5">
                      <button onClick={fetchGps} className="p-2 rounded-lg bg-blue-50 text-blue-700 border-0 flex items-center justify-center gap-1"><Crosshair size={14} /> GPS</button>
                      <button onClick={fetchMapCenter} className="p-2 rounded-lg bg-gray-50 text-gray-700 border-0 flex items-center justify-center gap-1"><MapPin size={14} /> Kaartpunt</button>
                      <button onClick={() => weather.setShowBuienradar(!weather.showBuienradar)} className="p-2 rounded-lg bg-gray-50 text-gray-700 border-0 flex items-center justify-center gap-1"><CloudRain size={14} /> Radar</button>
                    </div>

                    <div className="rounded-lg bg-blue-50 px-2 py-1.5 text-blue-800 font-medium">{rainText}</div>
                    <HourlyFieldForecast hourly={hourly} />

                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="bg-gray-50 rounded-lg p-2"><div className="text-gray-500" style={{ fontSize: '0.75em' }}>Windstoten</div><b>{Math.round(current.windGusts)} km/u</b></div>
                      <div className="bg-gray-50 rounded-lg p-2"><div className="text-gray-500" style={{ fontSize: '0.75em' }}>Wind</div><b>{windDirectionToText(current.windDirection)}</b></div>
                      <div className="bg-gray-50 rounded-lg p-2"><div className="text-gray-500" style={{ fontSize: '0.75em' }}>Bewolking</div><b>{current.cloudCover}%</b></div>
                    </div>

                    {weather.error && <div className="text-amber-700 bg-amber-50 rounded-lg p-2">Update mislukt; laatste gegevens blijven zichtbaar.</div>}
                    <div className="text-gray-400 text-center" style={{ fontSize: '0.75em' }}>Bijgewerkt {new Date(weather.weatherData!.lastUpdated).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</div>
                    {showFontSliders && <div className="flex items-center gap-2"><Type size={12} className="text-gray-400" /><input type="range" min="80" max="150" step="10" value={weatherFontScale} onChange={e => setWeatherFontScale(parseInt(e.target.value))} className="flex-1" /><span>{weatherFontScale}%</span></div>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </>
  )
}
