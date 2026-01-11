import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Weather condition codes from Open-Meteo
export type WeatherCode =
  | 0    // Clear sky
  | 1 | 2 | 3  // Mainly clear, partly cloudy, overcast
  | 45 | 48    // Fog
  | 51 | 53 | 55  // Drizzle
  | 56 | 57    // Freezing drizzle
  | 61 | 63 | 65  // Rain
  | 66 | 67    // Freezing rain
  | 71 | 73 | 75  // Snow
  | 77         // Snow grains
  | 80 | 81 | 82  // Rain showers
  | 85 | 86    // Snow showers
  | 95 | 96 | 99  // Thunderstorm

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
  humidity: number
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
  }
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  lastUpdated: number
}

interface WeatherState {
  // Data
  weatherData: WeatherData | null
  isLoading: boolean
  error: string | null

  // Saved locations
  savedLocations: SavedLocation[]
  selectedLocationId: string | null

  // Panel state
  weatherPanelOpen: boolean
  showBuienradar: boolean

  // Actions
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

  fetchWeather: (lat: number, lon: number) => Promise<void>
}

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9)

// Weather code descriptions
export const weatherCodeDescriptions: Record<number, string> = {
  0: 'Helder',
  1: 'Overwegend helder',
  2: 'Halfbewolkt',
  3: 'Bewolkt',
  45: 'Mist',
  48: 'Rijp/mist',
  51: 'Lichte motregen',
  53: 'Motregen',
  55: 'Dichte motregen',
  56: 'Lichte ijzel',
  57: 'Ijzel',
  61: 'Lichte regen',
  63: 'Regen',
  65: 'Hevige regen',
  66: 'Lichte ijsregen',
  67: 'IJsregen',
  71: 'Lichte sneeuw',
  73: 'Sneeuw',
  75: 'Hevige sneeuw',
  77: 'Korrelsneeuw',
  80: 'Lichte buien',
  81: 'Buien',
  82: 'Hevige buien',
  85: 'Lichte sneeuwbuien',
  86: 'Sneeuwbuien',
  95: 'Onweer',
  96: 'Onweer met hagel',
  99: 'Zwaar onweer met hagel'
}

// Wind direction to Dutch text
export function windDirectionToText(degrees: number): string {
  const directions = ['N', 'NNO', 'NO', 'ONO', 'O', 'OZO', 'ZO', 'ZZO', 'Z', 'ZZW', 'ZW', 'WZW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // Initial state
      weatherData: null,
      isLoading: false,
      error: null,
      savedLocations: [
        { id: 'current', name: 'Huidige locatie', lat: 0, lon: 0, isCurrentLocation: true }
      ],
      selectedLocationId: 'current',
      weatherPanelOpen: false,
      showBuienradar: false,

      // Actions
      setWeatherData: (data) => set({ weatherData: data }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      addLocation: (location) => set(state => ({
        savedLocations: [...state.savedLocations, { ...location, id: generateId() }]
      })),

      removeLocation: (id) => set(state => ({
        savedLocations: state.savedLocations.filter(l => l.id !== id),
        selectedLocationId: state.selectedLocationId === id ? 'current' : state.selectedLocationId
      })),

      setSelectedLocation: (id) => set({ selectedLocationId: id }),

      updateCurrentLocation: (lat, lon) => set(state => ({
        savedLocations: state.savedLocations.map(l =>
          l.isCurrentLocation ? { ...l, lat, lon } : l
        )
      })),

      toggleWeatherPanel: () => set(state => ({ weatherPanelOpen: !state.weatherPanelOpen })),
      setWeatherPanelOpen: (open) => set({ weatherPanelOpen: open }),
      setShowBuienradar: (show) => set({ showBuienradar: show }),

      fetchWeather: async (lat, lon) => {
        const { setIsLoading, setError, setWeatherData, savedLocations, selectedLocationId } = get()

        setIsLoading(true)
        setError(null)

        try {
          // Open-Meteo API - free, no API key needed
          const url = new URL('https://api.open-meteo.com/v1/forecast')
          url.searchParams.set('latitude', lat.toString())
          url.searchParams.set('longitude', lon.toString())
          url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloud_cover,is_day')
          url.searchParams.set('hourly', 'temperature_2m,precipitation,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m')
          url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset')
          url.searchParams.set('timezone', 'Europe/Amsterdam')
          url.searchParams.set('forecast_days', '7')

          const response = await fetch(url.toString())

          if (!response.ok) {
            throw new Error('Kon weerdata niet ophalen')
          }

          const data = await response.json()

          // Find current location info
          const selectedLocation = savedLocations.find(l => l.id === selectedLocationId) || savedLocations[0]

          // Transform to our format
          const weatherData: WeatherData = {
            location: { ...selectedLocation, lat, lon },
            current: {
              temperature: data.current.temperature_2m,
              apparentTemperature: data.current.apparent_temperature,
              humidity: data.current.relative_humidity_2m,
              precipitation: data.current.precipitation,
              weatherCode: data.current.weather_code,
              windSpeed: data.current.wind_speed_10m,
              windDirection: data.current.wind_direction_10m,
              windGusts: data.current.wind_gusts_10m,
              cloudCover: data.current.cloud_cover,
              isDay: data.current.is_day === 1
            },
            hourly: data.hourly.time.slice(0, 24).map((time: string, i: number) => ({
              time,
              temperature: data.hourly.temperature_2m[i],
              precipitation: data.hourly.precipitation[i],
              precipitationProbability: data.hourly.precipitation_probability[i],
              weatherCode: data.hourly.weather_code[i],
              windSpeed: data.hourly.wind_speed_10m[i],
              windDirection: data.hourly.wind_direction_10m[i],
              humidity: data.hourly.relative_humidity_2m[i]
            })),
            daily: data.daily.time.map((date: string, i: number) => ({
              date,
              temperatureMax: data.daily.temperature_2m_max[i],
              temperatureMin: data.daily.temperature_2m_min[i],
              precipitationSum: data.daily.precipitation_sum[i],
              precipitationProbability: data.daily.precipitation_probability_max[i],
              weatherCode: data.daily.weather_code[i],
              windSpeedMax: data.daily.wind_speed_10m_max[i],
              sunrise: data.daily.sunrise[i],
              sunset: data.daily.sunset[i]
            })),
            lastUpdated: Date.now()
          }

          setWeatherData(weatherData)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Onbekende fout')
        } finally {
          setIsLoading(false)
        }
      }
    }),
    {
      name: 'detectorapp-weather',
      partialize: (state) => ({
        savedLocations: state.savedLocations,
        selectedLocationId: state.selectedLocationId,
        showBuienradar: state.showBuienradar
      })
    }
  )
)
