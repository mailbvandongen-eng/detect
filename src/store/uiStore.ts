import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UIState {
  // Panel states
  layerControlOpen: boolean
  legendOpen: boolean
  backgroundsPanelOpen: boolean
  themesPanelOpen: boolean
  settingsPanelOpen: boolean
  infoPanelOpen: boolean
  presetsPanelOpen: boolean

  // Collapsed categories
  collapsedCategories: Set<string>

  // Actions
  closeAllPanels: () => void
  toggleLayerControl: () => void
  toggleLegend: () => void
  toggleBackgroundsPanel: () => void
  toggleThemesPanel: () => void
  toggleSettingsPanel: () => void
  toggleInfoPanel: () => void
  togglePresetsPanel: () => void
  toggleCategory: (category: string) => void
  setLayerControlOpen: (open: boolean) => void
  setLegendOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
  immer((set, get) => ({
    layerControlOpen: false,
    legendOpen: false,
    backgroundsPanelOpen: false,
    themesPanelOpen: false,
    settingsPanelOpen: false,
    infoPanelOpen: false,
    presetsPanelOpen: false,
    collapsedCategories: new Set<string>(),

    closeAllPanels: () => {
      set(state => {
        state.backgroundsPanelOpen = false
        state.themesPanelOpen = false
        state.settingsPanelOpen = false
        state.infoPanelOpen = false
        state.presetsPanelOpen = false
      })
    },

    toggleLayerControl: () => {
      set(state => {
        state.layerControlOpen = !state.layerControlOpen
      })
    },

    toggleLegend: () => {
      set(state => {
        state.legendOpen = !state.legendOpen
      })
    },

    toggleBackgroundsPanel: () => {
      set(state => {
        const wasOpen = state.backgroundsPanelOpen
        // Close ALL panels first
        state.backgroundsPanelOpen = false
        state.themesPanelOpen = false
        state.settingsPanelOpen = false
        state.infoPanelOpen = false
        state.presetsPanelOpen = false
        // Toggle this one
        if (!wasOpen) state.backgroundsPanelOpen = true
      })
    },

    toggleThemesPanel: () => {
      set(state => {
        const wasOpen = state.themesPanelOpen
        // Close ALL panels first
        state.backgroundsPanelOpen = false
        state.themesPanelOpen = false
        state.settingsPanelOpen = false
        state.infoPanelOpen = false
        state.presetsPanelOpen = false
        // Toggle this one
        if (!wasOpen) state.themesPanelOpen = true
      })
    },

    toggleSettingsPanel: () => {
      set(state => {
        const wasOpen = state.settingsPanelOpen
        // Close ALL panels first
        state.backgroundsPanelOpen = false
        state.themesPanelOpen = false
        state.settingsPanelOpen = false
        state.infoPanelOpen = false
        state.presetsPanelOpen = false
        // Toggle this one
        if (!wasOpen) state.settingsPanelOpen = true
      })
    },

    toggleInfoPanel: () => {
      set(state => {
        const wasOpen = state.infoPanelOpen
        // Close ALL panels first
        state.backgroundsPanelOpen = false
        state.themesPanelOpen = false
        state.settingsPanelOpen = false
        state.infoPanelOpen = false
        state.presetsPanelOpen = false
        // Toggle this one
        if (!wasOpen) state.infoPanelOpen = true
      })
    },

    togglePresetsPanel: () => {
      set(state => {
        const wasOpen = state.presetsPanelOpen
        // Close ALL panels first
        state.backgroundsPanelOpen = false
        state.themesPanelOpen = false
        state.settingsPanelOpen = false
        state.infoPanelOpen = false
        state.presetsPanelOpen = false
        // Toggle this one
        if (!wasOpen) state.presetsPanelOpen = true
      })
    },

    toggleCategory: (category: string) => {
      set(state => {
        if (state.collapsedCategories.has(category)) {
          state.collapsedCategories.delete(category)
        } else {
          state.collapsedCategories.add(category)
        }
      })
    },

    setLayerControlOpen: (open: boolean) => {
      set(state => {
        state.layerControlOpen = open
      })
    },

    setLegendOpen: (open: boolean) => {
      set(state => {
        state.legendOpen = open
      })
    }
  }))
)
