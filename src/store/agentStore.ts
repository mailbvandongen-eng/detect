import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getCenter, getWidth, getHeight } from 'ol/extent'
import { toLonLat } from 'ol/proj'
import { analyzeArea, deriveSignals } from '../lib/agent/analysisEngine'
import { layerRegistry } from '../layers/layerRegistry'
import { useLayerStore } from './layerStore'
import { useMapStore } from './mapStore'
import type { AgentAnalysisResult, AgentPeriodId, AgentPreferences } from '../types/agent'

interface AgentState {
  isOpen: boolean
  isAnalyzing: boolean
  surpriseMode: boolean
  selectedPeriods: AgentPeriodId[]
  preferences: AgentPreferences
  lastResult: AgentAnalysisResult | null
  lastError: string | null
  openPanel: () => void
  closePanel: () => void
  togglePanel: () => void
  togglePeriod: (period: AgentPeriodId) => void
  setSurpriseMode: (enabled: boolean) => void
  setPreference: (key: keyof AgentPreferences, value: number) => void
  enableRecommendedLayers: () => Promise<void>
  runAnalysis: () => Promise<void>
}

const DEFAULT_PERIODS: AgentPeriodId[] = [
  'paleolithicum',
  'neolithicum',
  'bronstijd',
  'ijzertijd',
  'romeins',
  'vroege_middeleeuwen',
  'midden_middeleeuwen',
  'late_middeleeuwen',
  'stortgrond'
]

const NON_ANALYSIS_LAYERS = new Set([
  'CartoDB (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'Labels Overlay',
  'Mijn Vondsten'
])

function getAnalyzableActiveLayers(visible: Record<string, boolean>): string[] {
  return Object.entries(visible)
    .filter(([, isVisible]) => isVisible)
    .map(([name]) => name)
    .filter((name) => !NON_ANALYSIS_LAYERS.has(name))
    .filter((name) => Boolean(layerRegistry[name]))
}

function filterExistingLayers(layerNames: string[]): string[] {
  return layerNames.filter((name) => Boolean(layerRegistry[name]))
}

export const useAgentStore = create<AgentState>()(
  persist((set, get) => ({
    isOpen: false,
    isAnalyzing: false,
    surpriseMode: true,
    selectedPeriods: DEFAULT_PERIODS,
    preferences: {
      findFocus: 78,
      contextFocus: 54,
      surpriseFocus: 72,
      disturbanceTolerance: 64
    },
    lastResult: null,
    lastError: null,

    openPanel: () => {
      set({ isOpen: true })
    },

    closePanel: () => {
      set({ isOpen: false })
    },

    togglePanel: () => {
      set({ isOpen: !get().isOpen })
    },

    togglePeriod: (period) => {
      const current = get().selectedPeriods
      if (current.includes(period)) {
        if (current.length > 1) {
          set({ selectedPeriods: current.filter((item) => item !== period) })
        }
      } else {
        set({ selectedPeriods: [...current, period] })
      }
    },

    setSurpriseMode: (enabled) => {
      set({ surpriseMode: enabled })
    },

    setPreference: (key, value) => {
      set({
        preferences: {
          ...get().preferences,
          [key]: value
        }
      })
    },

    enableRecommendedLayers: async () => {
      const { lastResult } = get()
      const layersToEnable = filterExistingLayers(lastResult?.missingLayers ?? [])
      const layerStore = useLayerStore.getState()

      for (const layer of layersToEnable) {
        layerStore.setLayerVisibility(layer, true)
      }

      await get().runAnalysis()
    },

    runAnalysis: async () => {
      const map = useMapStore.getState().map
      if (!map) {
        set({
          lastError: 'Kaart is nog niet klaar voor analyse.',
          isOpen: true
        })
        return
      }

      set({
        isAnalyzing: true,
        lastError: null,
        isOpen: true
      })

      try {
        const { visible } = useLayerStore.getState()
        const activeLayers = getAnalyzableActiveLayers(visible)

        const mapSize = map.getSize()
        if (!mapSize) {
          throw new Error('Kan kaartgrootte niet bepalen voor analyse.')
        }

        const extent = map.getView().calculateExtent(mapSize)
        const center = getCenter(extent)
        const [lon, lat] = toLonLat(center)
        const zoom = map.getView().getZoom() ?? 0

        const input = {
          area: {
            centerLon: lon,
            centerLat: lat,
            zoom,
            extent: [extent[0], extent[1], extent[2], extent[3]] as [number, number, number, number],
            widthKm: Number((getWidth(extent) / 1000).toFixed(2)),
            heightKm: Number((getHeight(extent) / 1000).toFixed(2)),
          },
          activeLayers,
          selectedPeriods: get().selectedPeriods,
          surpriseMode: get().surpriseMode,
          preferences: get().preferences,
          visibleSignals: deriveSignals(activeLayers)
        }

        const result = analyzeArea(input)

        set({
          lastResult: {
            ...result,
            checkedLayers: filterExistingLayers(result.checkedLayers),
            missingLayers: filterExistingLayers(result.missingLayers)
          },
          lastError: null,
          isAnalyzing: false
        })
      } catch (error) {
        set({
          lastError: error instanceof Error ? error.message : 'Analyse mislukt.',
          isAnalyzing: false
        })
      }
    }
  }), {
    name: 'detect-agent-settings',
    partialize: (state) => ({
      selectedPeriods: state.selectedPeriods,
      surpriseMode: state.surpriseMode,
      preferences: state.preferences
    })
  })
)
