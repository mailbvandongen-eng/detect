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

  // Actions
  setDefaultBackground: (bg: DefaultBackground) => void
  setShowScaleBar: (value: boolean) => void
  setGpsAutoStart: (value: boolean) => void
  setHeadingUpMode: (value: boolean) => void
  setShowAccuracyCircle: (value: boolean) => void
  setHapticFeedback: (value: boolean) => void
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

      // Actions
      setDefaultBackground: (defaultBackground) => set({ defaultBackground }),
      setShowScaleBar: (showScaleBar) => set({ showScaleBar }),
      setGpsAutoStart: (gpsAutoStart) => set({ gpsAutoStart }),
      setHeadingUpMode: (headingUpMode) => set({ headingUpMode }),
      setShowAccuracyCircle: (showAccuracyCircle) => set({ showAccuracyCircle }),
      setHapticFeedback: (hapticFeedback) => set({ hapticFeedback })
    }),
    {
      name: 'detectorapp-settings'
    }
  )
)
