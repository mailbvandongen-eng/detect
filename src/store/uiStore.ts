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
  monumentSearchOpen: boolean
  monumentFilterOpen: boolean

  // Vondst form state
  vondstFormOpen: boolean
  vondstFormLocation: { lat: number; lng: number } | null
  vondstFormPhoto: File | null
  vondstDashboardOpen: boolean

  // Custom point layer state
  createLayerModalOpen: boolean
  addPointModalOpen: boolean
  addPointModalLayerId: string | null
  addPointModalLocation: { lat: number; lng: number } | null
  layerManagerModalOpen: boolean
  layerDashboardOpen: boolean
  layerDashboardLayerId: string | null

  // Route dashboard state
  routeDashboardOpen: boolean

  // Drawing/measuring mode - blocks popups
  isDrawingMode: boolean

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
  openVondstForm: (location?: { lat: number; lng: number }, photo?: File) => void
  closeVondstForm: () => void
  toggleVondstDashboard: () => void

  // Custom point layer actions
  openCreateLayerModal: () => void
  closeCreateLayerModal: () => void
  openAddPointModal: (layerId: string, location: { lat: number; lng: number }) => void
  closeAddPointModal: () => void
  openLayerManagerModal: () => void
  closeLayerManagerModal: () => void
  openLayerDashboard: (layerId: string) => void
  closeLayerDashboard: () => void

  // Route dashboard actions
  toggleRouteDashboard: () => void

  // Monument search actions
  toggleMonumentSearch: () => void
  closeMonumentSearch: () => void

  // Monument filter actions
  toggleMonumentFilter: () => void
  closeMonumentFilter: () => void

  // Drawing mode actions
  setDrawingMode: (active: boolean) => void
}

type ExclusivePanelKey =
  | 'backgroundsPanelOpen'
  | 'themesPanelOpen'
  | 'settingsPanelOpen'
  | 'infoPanelOpen'
  | 'presetsPanelOpen'
  | 'monumentFilterOpen'

function closeStandardPanels(state: UIState) {
  state.backgroundsPanelOpen = false
  state.themesPanelOpen = false
  state.settingsPanelOpen = false
  state.infoPanelOpen = false
  state.presetsPanelOpen = false
}

function closeExclusivePanels(state: UIState) {
  closeStandardPanels(state)
  state.monumentFilterOpen = false
}

function toggleExclusivePanel(state: UIState, key: ExclusivePanelKey) {
  const wasOpen = state[key]
  closeExclusivePanels(state)

  if (!wasOpen) {
    state[key] = true
  }
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
    monumentSearchOpen: false,
    monumentFilterOpen: false,
    vondstFormOpen: false,
    vondstFormLocation: null,
    vondstFormPhoto: null,
    vondstDashboardOpen: false,
    createLayerModalOpen: false,
    addPointModalOpen: false,
    addPointModalLayerId: null,
    addPointModalLocation: null,
    layerManagerModalOpen: false,
    layerDashboardOpen: false,
    layerDashboardLayerId: null,
    routeDashboardOpen: false,
    isDrawingMode: false,
    collapsedCategories: new Set<string>(),

    closeAllPanels: () => {
      set(state => {
        closeExclusivePanels(state)
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
        toggleExclusivePanel(state, 'backgroundsPanelOpen')
      })
    },

    toggleThemesPanel: () => {
      set(state => {
        toggleExclusivePanel(state, 'themesPanelOpen')
      })
    },

    toggleSettingsPanel: () => {
      set(state => {
        toggleExclusivePanel(state, 'settingsPanelOpen')
      })
    },

    toggleInfoPanel: () => {
      set(state => {
        toggleExclusivePanel(state, 'infoPanelOpen')
      })
    },

    togglePresetsPanel: () => {
      set(state => {
        toggleExclusivePanel(state, 'presetsPanelOpen')
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
    },

    openVondstForm: (location, photo) => {
      set(state => {
        closeStandardPanels(state)
        state.vondstFormOpen = true
        state.vondstFormLocation = location || null
        state.vondstFormPhoto = photo || null
      })
    },

    closeVondstForm: () => {
      set(state => {
        state.vondstFormOpen = false
        state.vondstFormLocation = null
        state.vondstFormPhoto = null
      })
    },

    toggleVondstDashboard: () => {
      set(state => {
        const wasOpen = state.vondstDashboardOpen
        closeStandardPanels(state)
        state.vondstDashboardOpen = !wasOpen
      })
    },

    // Custom point layer actions
    openCreateLayerModal: () => {
      set(state => {
        state.createLayerModalOpen = true
      })
    },

    closeCreateLayerModal: () => {
      set(state => {
        state.createLayerModalOpen = false
      })
    },

    openAddPointModal: (layerId, location) => {
      set(state => {
        state.addPointModalOpen = true
        state.addPointModalLayerId = layerId
        state.addPointModalLocation = location
      })
    },

    closeAddPointModal: () => {
      set(state => {
        state.addPointModalOpen = false
        state.addPointModalLayerId = null
        state.addPointModalLocation = null
      })
    },

    openLayerManagerModal: () => {
      set(state => {
        state.layerManagerModalOpen = true
      })
    },

    closeLayerManagerModal: () => {
      set(state => {
        state.layerManagerModalOpen = false
      })
    },

    openLayerDashboard: (layerId) => {
      set(state => {
        state.layerDashboardOpen = true
        state.layerDashboardLayerId = layerId
        state.layerManagerModalOpen = false // Close manager when opening dashboard
      })
    },

    closeLayerDashboard: () => {
      set(state => {
        state.layerDashboardOpen = false
        state.layerDashboardLayerId = null
      })
    },

    // Route dashboard actions
    toggleRouteDashboard: () => {
      set(state => {
        state.routeDashboardOpen = !state.routeDashboardOpen
      })
    },

    // Monument search actions
    toggleMonumentSearch: () => {
      set(state => {
        const wasOpen = state.monumentSearchOpen
        closeStandardPanels(state)
        state.monumentSearchOpen = !wasOpen
      })
    },

    closeMonumentSearch: () => {
      set(state => {
        state.monumentSearchOpen = false
      })
    },

    // Monument filter actions
    toggleMonumentFilter: () => {
      set(state => {
        toggleExclusivePanel(state, 'monumentFilterOpen')
      })
    },

    closeMonumentFilter: () => {
      set(state => {
        state.monumentFilterOpen = false
      })
    },

    // Drawing mode actions
    setDrawingMode: (active) => {
      set(state => {
        state.isDrawingMode = active
      })
    }
  }))
)
