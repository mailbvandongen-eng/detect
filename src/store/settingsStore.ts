import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DefaultBackground = 'CartoDB (licht)' | 'Luchtfoto' | 'OpenStreetMap'

interface SettingsState {
  // Kaart
  defaultBackground: DefaultBackground
  showScaleBar: boolean

  // GPS
  gpsAutoStart: boolean
  headingUpMode: boolean
  showAccuracyCircle: boolean

  // Feedback
  hapticFeedback: boolean

  // Vondsten
  vondstenLocalOnly: boolean  // true = localStorage, false = Firebase
  showVondstButton: boolean   // Show/hide the add vondst button

  // Actions
  setDefaultBackground: (bg: DefaultBackground) => void
  setShowScaleBar: (value: boolean) => void
  setGpsAutoStart: (value: boolean) => void
  setHeadingUpMode: (value: boolean) => void
  setShowAccuracyCircle: (value: boolean) => void
  setHapticFeedback: (value: boolean) => void
  setVondstenLocalOnly: (value: boolean) => void
  setShowVondstButton: (value: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Defaults
      defaultBackground: 'CartoDB (licht)',
      showScaleBar: true,
      gpsAutoStart: false,
      headingUpMode: false,
      showAccuracyCircle: true,
      hapticFeedback: true,
      vondstenLocalOnly: true,  // Default to local storage (no login needed)
      showVondstButton: false,  // Hidden by default

      // Actions
      setDefaultBackground: (defaultBackground) => set({ defaultBackground }),
      setShowScaleBar: (showScaleBar) => set({ showScaleBar }),
      setGpsAutoStart: (gpsAutoStart) => set({ gpsAutoStart }),
      setHeadingUpMode: (headingUpMode) => set({ headingUpMode }),
      setShowAccuracyCircle: (showAccuracyCircle) => set({ showAccuracyCircle }),
      setHapticFeedback: (hapticFeedback) => set({ hapticFeedback }),
      setVondstenLocalOnly: (vondstenLocalOnly) => set({ vondstenLocalOnly }),
      setShowVondstButton: (showVondstButton) => set({ showVondstButton })
    }),
    {
      name: 'detectorapp-settings'
    }
  )
)
