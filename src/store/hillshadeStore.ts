import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Color ramps for height visualization
export type ColorRamp = 'terrain' | 'viridis' | 'magma' | 'spectral' | 'grayscale'

interface HillshadeState {
  // Hillshade parameters
  sunAzimuth: number      // 0-360 degrees, compass direction of light
  sunElevation: number    // 0-90 degrees, angle of sun above horizon
  verticalExaggeration: number  // 1-10, multiplier for elevation differences

  // Color height map parameters
  colorRamp: ColorRamp
  minElevation: number    // -10 to 0, meters (for NL mostly below sea level areas)
  maxElevation: number    // 10 to 350, meters (Vaalserberg is ~323m)

  // UI state
  showControls: boolean   // Show/hide the hillshade control panel

  // Actions
  setSunAzimuth: (value: number) => void
  setSunElevation: (value: number) => void
  setVerticalExaggeration: (value: number) => void
  setColorRamp: (value: ColorRamp) => void
  setMinElevation: (value: number) => void
  setMaxElevation: (value: number) => void
  setShowControls: (value: boolean) => void
  resetToDefaults: () => void
}

const defaults = {
  sunAzimuth: 315,        // Northwest (classic cartographic convention)
  sunElevation: 45,       // 45 degrees above horizon
  verticalExaggeration: 2, // 2x exaggeration for flat NL terrain
  colorRamp: 'terrain' as ColorRamp,
  minElevation: -5,
  maxElevation: 50,       // Good range for most of NL
  showControls: false
}

export const useHillshadeStore = create<HillshadeState>()(
  persist(
    (set) => ({
      ...defaults,

      setSunAzimuth: (sunAzimuth) => set({ sunAzimuth }),
      setSunElevation: (sunElevation) => set({ sunElevation }),
      setVerticalExaggeration: (verticalExaggeration) => set({ verticalExaggeration }),
      setColorRamp: (colorRamp) => set({ colorRamp }),
      setMinElevation: (minElevation) => set({ minElevation }),
      setMaxElevation: (maxElevation) => set({ maxElevation }),
      setShowControls: (showControls) => set({ showControls }),
      resetToDefaults: () => set(defaults)
    }),
    {
      name: 'detectorapp-hillshade'
    }
  )
)
