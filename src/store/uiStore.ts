import { create } from 'zustand'

export type UIWindowId =
  | 'menu'
  | 'layers'
  | 'layerControl'
  | 'legend'
  | 'backgrounds'
  | 'settings'
  | 'info'
  | 'manual'
  | 'welcome'
  | 'presets'
  | 'changeLog'
  | 'monumentSearch'
  | 'monumentFilter'
  | 'vondstForm'
  | 'vondstDashboard'
  | 'createLayer'
  | 'addPoint'
  | 'layerManager'
  | 'layerDashboard'
  | 'routeDashboard'
  | 'importLayer'
  | 'print'
  | 'opacity'
  | 'measure'
  | 'draw'

interface UIState {
  // Eén bron van waarheid: er kan maar één hoofdvenster zichtbaar zijn.
  activeWindow: UIWindowId | null
  returnWindow: UIWindowId | null

  // Context voor vensters die gegevens meekrijgen.
  vondstFormLocation: { lat: number; lng: number } | null
  vondstFormPhoto: File | null
  addPointModalLayerId: string | null
  addPointModalLocation: { lat: number; lng: number } | null
  layerDashboardLayerId: string | null

  // Drawing/measuring mode - blocks popups, maar is zelf geen venster.
  isDrawingMode: boolean

  // Collapsed categories
  collapsedCategories: Set<string>

  // Centrale vensteracties
  openWindow: (window: UIWindowId, returnTo?: UIWindowId | null) => void
  toggleWindow: (window: UIWindowId) => void
  closeWindow: () => void
  backWindow: () => void
  closeAllPanels: () => void

  // Compatibele domeinacties
  toggleLayerControl: () => void
  toggleLegend: () => void
  toggleBackgroundsPanel: () => void
  toggleThemesPanel: () => void
  toggleSettingsPanel: () => void
  toggleInfoPanel: () => void
  togglePresetsPanel: () => void
  openChangeLog: () => void
  closeChangeLog: () => void
  toggleCategory: (category: string) => void
  setLayerControlOpen: (open: boolean) => void
  setLegendOpen: (open: boolean) => void
  openVondstForm: (location?: { lat: number; lng: number }, photo?: File) => void
  closeVondstForm: () => void
  toggleVondstDashboard: () => void
  openCreateLayerModal: () => void
  closeCreateLayerModal: () => void
  openAddPointModal: (layerId: string, location: { lat: number; lng: number }) => void
  closeAddPointModal: () => void
  openLayerManagerModal: () => void
  closeLayerManagerModal: () => void
  openLayerDashboard: (layerId: string) => void
  closeLayerDashboard: () => void
  toggleRouteDashboard: () => void
  toggleMonumentSearch: () => void
  closeMonumentSearch: () => void
  toggleMonumentFilter: () => void
  closeMonumentFilter: () => void
  setDrawingMode: (active: boolean) => void
}

const closeWindowState = {
  activeWindow: null,
  returnWindow: null
} as const

export const useUIStore = create<UIState>()((set, get) => ({
  activeWindow: null,
  returnWindow: null,
  vondstFormLocation: null,
  vondstFormPhoto: null,
  addPointModalLayerId: null,
  addPointModalLocation: null,
  layerDashboardLayerId: null,
  isDrawingMode: false,
  collapsedCategories: new Set<string>(),

  openWindow: (activeWindow, returnWindow = null) => {
    set({ activeWindow, returnWindow })
  },

  toggleWindow: (window) => {
    set(state => state.activeWindow === window
      ? closeWindowState
      : { activeWindow: window, returnWindow: null }
    )
  },

  closeWindow: () => set(closeWindowState),

  backWindow: () => {
    const returnWindow = get().returnWindow
    set(returnWindow
      ? { activeWindow: returnWindow, returnWindow: null }
      : closeWindowState
    )
  },

  closeAllPanels: () => set(closeWindowState),

  toggleLayerControl: () => get().toggleWindow('layerControl'),
  toggleLegend: () => get().toggleWindow('legend'),
  toggleBackgroundsPanel: () => get().toggleWindow('backgrounds'),
  toggleThemesPanel: () => get().toggleWindow('layers'),
  toggleSettingsPanel: () => get().toggleWindow('settings'),
  toggleInfoPanel: () => get().toggleWindow('info'),
  togglePresetsPanel: () => get().toggleWindow('presets'),
  openChangeLog: () => get().openWindow('changeLog'),
  closeChangeLog: () => {
    if (get().activeWindow === 'changeLog') get().closeWindow()
  },

  toggleCategory: (category) => {
    set(state => {
      const collapsedCategories = new Set(state.collapsedCategories)
      if (collapsedCategories.has(category)) {
        collapsedCategories.delete(category)
      } else {
        collapsedCategories.add(category)
      }
      return { collapsedCategories }
    })
  },

  setLayerControlOpen: (open) => {
    if (open) get().openWindow('layerControl')
    else if (get().activeWindow === 'layerControl') get().closeWindow()
  },

  setLegendOpen: (open) => {
    if (open) get().openWindow('legend')
    else if (get().activeWindow === 'legend') get().closeWindow()
  },

  openVondstForm: (location, photo) => {
    set({
      activeWindow: 'vondstForm',
      returnWindow: null,
      vondstFormLocation: location || null,
      vondstFormPhoto: photo || null
    })
  },

  closeVondstForm: () => {
    set(state => ({
      ...(state.activeWindow === 'vondstForm' ? closeWindowState : {}),
      vondstFormLocation: null,
      vondstFormPhoto: null
    }))
  },

  toggleVondstDashboard: () => get().toggleWindow('vondstDashboard'),

  openCreateLayerModal: () => get().openWindow('createLayer'),
  closeCreateLayerModal: () => {
    if (get().activeWindow === 'createLayer') get().closeWindow()
  },

  openAddPointModal: (layerId, location) => {
    set({
      activeWindow: 'addPoint',
      returnWindow: null,
      addPointModalLayerId: layerId,
      addPointModalLocation: location
    })
  },

  closeAddPointModal: () => {
    set(state => ({
      ...(state.activeWindow === 'addPoint' ? closeWindowState : {}),
      addPointModalLayerId: null,
      addPointModalLocation: null
    }))
  },

  openLayerManagerModal: () => get().openWindow('layerManager'),
  closeLayerManagerModal: () => {
    if (get().activeWindow === 'layerManager') get().closeWindow()
  },

  openLayerDashboard: (layerId) => {
    set({
      activeWindow: 'layerDashboard',
      returnWindow: 'layerManager',
      layerDashboardLayerId: layerId
    })
  },

  closeLayerDashboard: () => {
    set(state => ({
      ...(state.activeWindow === 'layerDashboard' ? closeWindowState : {}),
      layerDashboardLayerId: null
    }))
  },

  toggleRouteDashboard: () => get().toggleWindow('routeDashboard'),
  toggleMonumentSearch: () => get().toggleWindow('monumentSearch'),
  closeMonumentSearch: () => {
    if (get().activeWindow === 'monumentSearch') get().closeWindow()
  },
  toggleMonumentFilter: () => get().toggleWindow('monumentFilter'),
  closeMonumentFilter: () => {
    if (get().activeWindow === 'monumentFilter') get().closeWindow()
  },
  setDrawingMode: (isDrawingMode) => set({ isDrawingMode })
}))
