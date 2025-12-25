import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'nl' | 'en'
export type ColorScheme = 'light' | 'dark' | 'system'
export type Units = 'metric' | 'imperial'
export type DefaultBackground = 'CartoDB (licht)' | 'CartoDB (donker)' | 'Luchtfoto' | 'OpenTopoMap'

interface SettingsState {
  // Algemeen
  language: Language
  colorScheme: ColorScheme
  units: Units

  // Kaart
  defaultBackground: DefaultBackground
  rememberLastLocation: boolean
  showScaleBar: boolean

  // GPS
  gpsAutoStart: boolean
  headingUpMode: boolean
  showAccuracyCircle: boolean

  // Weergave
  markerClustering: boolean
  showCoordinates: boolean

  // Feedback
  hapticFeedback: boolean

  // Actions
  setLanguage: (language: Language) => void
  setColorScheme: (colorScheme: ColorScheme) => void
  setUnits: (units: Units) => void
  setDefaultBackground: (bg: DefaultBackground) => void
  setRememberLastLocation: (value: boolean) => void
  setShowScaleBar: (value: boolean) => void
  setGpsAutoStart: (value: boolean) => void
  setHeadingUpMode: (value: boolean) => void
  setShowAccuracyCircle: (value: boolean) => void
  setMarkerClustering: (value: boolean) => void
  setShowCoordinates: (value: boolean) => void
  setHapticFeedback: (value: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Defaults
      language: 'nl',
      colorScheme: 'light',
      units: 'metric',
      defaultBackground: 'CartoDB (licht)',
      rememberLastLocation: true,
      showScaleBar: true,
      gpsAutoStart: false,
      headingUpMode: false,
      showAccuracyCircle: true,
      markerClustering: true,
      showCoordinates: false,
      hapticFeedback: true,

      // Actions
      setLanguage: (language) => set({ language }),
      setColorScheme: (colorScheme) => set({ colorScheme }),
      setUnits: (units) => set({ units }),
      setDefaultBackground: (defaultBackground) => set({ defaultBackground }),
      setRememberLastLocation: (rememberLastLocation) => set({ rememberLastLocation }),
      setShowScaleBar: (showScaleBar) => set({ showScaleBar }),
      setGpsAutoStart: (gpsAutoStart) => set({ gpsAutoStart }),
      setHeadingUpMode: (headingUpMode) => set({ headingUpMode }),
      setShowAccuracyCircle: (showAccuracyCircle) => set({ showAccuracyCircle }),
      setMarkerClustering: (markerClustering) => set({ markerClustering }),
      setShowCoordinates: (showCoordinates) => set({ showCoordinates }),
      setHapticFeedback: (hapticFeedback) => set({ hapticFeedback })
    }),
    {
      name: 'detectorapp-settings'
    }
  )
)
