import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WeatherCode = 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 56 | 57 | 61 | 63 | 65 | 66 | 67 | 71 | 73 | 75 | 77 | 80 | 81 | 82 | 85 | 86 | 95 | 96 | 99

export interface SavedLocation {
  id: string
  name: string
  lat: number
  lon: number
  isCurrentLocation?: boolean
}

export interface HourlyForecast {
  time: string
  temperature: number
  precipitation: number
  precipitationProbability: number
  weatherCode: WeatherCode
  windSpeed: number
  windDirection: number
  windGusts: number
  humidity: number
  sunshineDuration: number
}

export interface DailyForecast {
  date: string
  temperatureMax: number
  temperatureMin: number
  precipitationSum: number
  precipitationProbability: number
  weatherCode: WeatherCode
  windSpeedMax: number
  sunrise: string
  sunset: string
}

export interface PrecipitationForecast {
  time: string
  precipitation: number
}

export interface WeatherData {
  location: SavedLocation
  current: {
    temperature: number
    apparentTemperature: number
    humidity: number
    precipitation: number
    weatherCode: WeatherCode
    windSpeed: number
    windDirection: number
    windGusts: number
    cloudCover: number
    isDay: boolean
    snowDepth?: number
  }
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  precipitation15min: PrecipitationForecast[]
  precipitation48h: PrecipitationForecast[]
  frostDays: number
  lastUpdated: number
}

interface WeatherState {
  weatherData: WeatherData | null
  isLoading: boolean
  error: string | null
  savedLocations: SavedLocation[]
  selectedLocationId: string | null
  weatherPanelOpen: boolean
  showBuienradar: boolean
  setWeatherData: (data: WeatherData | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addLocation: (location: Omit<SavedLocation, 'id'>) => void
  removeLocation: (id: string) => void
  setSelectedLocation: (id: string | null) => void
  updateCurrentLocation: (lat: number, lon: number) => void
  toggleWeatherPanel: () => void
  setWeatherPanelOpen: (open: boolean) => void
  setShowBuienradar: (show: boolean) => void
  fetchWeather: (lat: number, lon: number, locationName?: string) => Promise<void>
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const weatherCodeDescriptions: Record<number, string> = {
  0: 'Helder', 1: 'Overwegend helder', 2: 'Halfbewolkt', 3: 'Bewolkt', 45: 'Mist', 48: 'Rijp/mist',
  51: 'Lichte motregen', 53: 'Motregen', 55: 'Dichte motregen', 56: 'Lichte ijzel', 57: 'Ijzel',
  61: 'Lichte regen', 63: 'Regen', 65: 'Hevige regen', 66: 'Lichte ijsregen', 67: 'IJsregen',
  71: 'Lichte sneeuw', 73: 'Sneeuw', 75: 'Hevige sneeuw', 77: 'Korrelsneeuw', 80: 'Lichte buien',
  81: 'Buien', 82: 'Hevige buien', 85: 'Lichte sneeuwbuien', 86: 'Sneeuwbuien', 95: 'Onweer',
  96: 'Onweer met hagel', 99: 'Zwaar onweer met hagel'
}

export function windDirectionToText(degrees: number): string {
  const directions = ['N', 'NNO', 'NO', 'ONO', 'O', 'OZO', 'ZO', 'ZZO', 'Z', 'ZZW', 'ZW', 'WZW', 'W', 'WNW', 'NW', 'NNW']
  return directions[Math.round(degrees / 22.5) % 16]
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      weatherData: null,
      isLoading: false,
      error: null,
      savedLocations: [{ id: 'current', name: 'Huidige locatie', lat: 0, lon: 0, isCurrentLocation: true }],
      selectedLocationId: 'current',
      weatherPanelOpen: false,
      showBuienradar: false,
      setWeatherData: weatherData => set({ weatherData }),
      setIsLoading: isLoading => set({ isLoading }),
      setError: error => set({ error }),
      addLocation: location => set(state => ({ savedLocations: [...state.savedLocations, { ...location, id: generateId() }] })),
      removeLocation: id => set(state => ({
        savedLocations: state.savedLocations.filter(l => l.id !== id),
        selectedLocationId: state.selectedLocationId === id ? 'current' : state.selectedLocationId
      })),
      setSelectedLocation: selectedLocationId => set({ selectedLocationId }),
      updateCurrentLocation: (lat, lon) => set(state => ({
        savedLocations: state.savedLocations.map(l => l.isCurrentLocation ? { ...l, lat, lon } : l)
      })),
      toggleWeatherPanel: () => set(state => ({ weatherPanelOpen: !state.weatherPanelOpen })),
      setWeatherPanelOpen: weatherPanelOpen => set({ weatherPanelOpen }),
      setShowBuienradar: showBuienradar => set({ showBuienradar }),

      fetchWeather: async (lat, lon, locationName) => {
        const { savedLocations, selectedLocationId } = get()
        set({ isLoading: true, error: null })
        try {
          const url = new URL('https://api.open-meteo.com/v1/forecast')
          url.searchParams.set('latitude', String(lat))
          url.searchParams.set('longitude', String(lon))
          url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloud_cover,is_day,snow_depth')
          url.searchParams.set('hourly', 'temperature_2m,precipitation,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,relative_humidity_2m,sunshine_duration')
          url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset')
          url.searchParams.set('minutely_15', 'precipitation')
          url.searchParams.set('timezone', 'auto')
          url.searchParams.set('forecast_days', '7')
          url.searchParams.set('past_days', '7')

          const response = await fetch(url.toString())
          if (!response.ok) throw new Error('Kon weerdata niet ophalen')
          const data = await response.json()
          const now = new Date()
          const todayStr = data.current?.time?.slice(0, 10) ?? now.toISOString().slice(0, 10)

          let frostDays = 0
          const todayIndex = data.daily.time.indexOf(todayStr)
          for (let i = todayIndex - 1; i >= 0; i--) {
            if (data.daily.temperature_2m_min[i] < 0) frostDays++
            else break
          }

          const precipitation15min: PrecipitationForecast[] = []
          const precipitation48h: PrecipitationForecast[] = []
          if (data.minutely_15?.time && data.minutely_15?.precipitation) {
            const twoHoursLater = new Date(now.getTime() + 2 * 3600000)
            const fortyEightHoursLater = new Date(now.getTime() + 48 * 3600000)
            data.minutely_15.time.forEach((timeText: string, i: number) => {
              const time = new Date(timeText)
              if (time < now) return
              const point = { time: timeText, precipitation: data.minutely_15.precipitation[i] ?? 0 }
              if (time <= twoHoursLater) precipitation15min.push(point)
              if (time <= fortyEightHoursLater) precipitation48h.push(point)
            })
          }

          const hourly: HourlyForecast[] = data.hourly.time.map((time: string, i: number) => ({
            time,
            temperature: data.hourly.temperature_2m[i],
            precipitation: data.hourly.precipitation[i],
            precipitationProbability: data.hourly.precipitation_probability[i],
            weatherCode: data.hourly.weather_code[i] as WeatherCode,
            windSpeed: data.hourly.wind_speed_10m[i],
            windDirection: data.hourly.wind_direction_10m[i],
            windGusts: data.hourly.wind_gusts_10m[i],
            humidity: data.hourly.relative_humidity_2m[i],
            sunshineDuration: data.hourly.sunshine_duration[i] ?? 0
          })).filter((h: HourlyForecast) => new Date(h.time) >= now).slice(0, 24)

          const daily: DailyForecast[] = data.daily.time.map((date: string, i: number) => ({
            date,
            temperatureMax: data.daily.temperature_2m_max[i],
            temperatureMin: data.daily.temperature_2m_min[i],
            precipitationSum: data.daily.precipitation_sum[i],
            precipitationProbability: data.daily.precipitation_probability_max[i],
            weatherCode: data.daily.weather_code[i] as WeatherCode,
            windSpeedMax: data.daily.wind_speed_10m_max[i],
            sunrise: data.daily.sunrise[i],
            sunset: data.daily.sunset[i]
          })).filter((d: DailyForecast) => d.date >= todayStr)

          const selected = savedLocations.find(l => l.id === selectedLocationId) || savedLocations[0]
          const weatherData: WeatherData = {
            location: { ...selected, name: locationName || selected.name, lat, lon },
            current: {
              temperature: data.current.temperature_2m,
              apparentTemperature: data.current.apparent_temperature,
              humidity: data.current.relative_humidity_2m,
              precipitation: data.current.precipitation,
              weatherCode: data.current.weather_code as WeatherCode,
              windSpeed: data.current.wind_speed_10m,
              windDirection: data.current.wind_direction_10m,
              windGusts: data.current.wind_gusts_10m,
              cloudCover: data.current.cloud_cover,
              isDay: data.current.is_day === 1,
              snowDepth: data.current.snow_depth
            },
            hourly, daily, precipitation15min, precipitation48h, frostDays, lastUpdated: Date.now()
          }

          // Store the useful forecast immediately. Secondary data must never block the widget.
          set({ weatherData, isLoading: false })
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Onbekende fout', isLoading: false })
        }
      }
    }),
    {
      name: 'detectorapp-weather',
      partialize: state => ({
        weatherData: state.weatherData,
        savedLocations: state.savedLocations,
        selectedLocationId: state.selectedLocationId,
        showBuienradar: state.showBuienradar
      })
    }
  )
)
