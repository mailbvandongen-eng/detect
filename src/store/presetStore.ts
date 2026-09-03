import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { fromLonLat } from 'ol/proj'
import { useLayerStore } from './layerStore'
import { useMapStore } from './mapStore'

export interface Preset {
  id: string
  name: string
  icon: string
  layers: string[]
  baseLayer?: string
  layerOpacities?: Record<string, number>
  mapView?: {
    center: [number, number]
    zoom: number
  }
  isBuiltIn: boolean
}

const THEDIRAC_CENTER: [number, number] = [1.34, 44.595]

const FRANCE_FIELD_LAYERS = [
  'LiDAR HD terrein FR',
  'Waterlopen BD TOPAGE 2026',
  'OCS GE landbedekking 2021-2023',
  'Bodem/geologie 1:50.000 FR',
  'Oude bossen · Forêts anciennes',
  'ArcheOcc · Thédirac-regio'
] as const

const FRANCE_RESEARCH_LAYER_NAMES = new Set([
  'LiDAR HD terrein FR',
  'Bodem/geologie 1:50.000 FR',
  'Geologie + reliëf FR',
  'BRGM boringen · BSS',
  'BRGM IDPR · infiltratie/afstroming',
  'BRGM cavités · ondergrondse holtes',
  'Waterlopen BD TOPAGE 2026',
  'OCS GE landbedekking 2021-2023',
  'Oude bossen · Forêts anciennes',
  'ArcheOcc · Thédirac-regio'
])

const BUILT_IN_PRESETS: Preset[] = [
  {
    id: 'detectie',
    name: 'Detectie',
    icon: 'Compass',
    layers: ['AMK Monumenten', 'Gewaspercelen', 'Geomorfologie', 'AHN4 Hoogtekaart Kleur', 'Kadastrale Grenzen'],
    baseLayer: 'Esri (licht)',
    layerOpacities: {
      'AMK Monumenten': 0.50,
      'Gewaspercelen': 0.25,
      'Geomorfologie': 0.25,
      'AHN4 Hoogtekaart Kleur': 0.25
    },
    isBuiltIn: false
  },
  {
    id: 'lidar-hoogte',
    name: 'LiDAR & hoogte',
    icon: 'Mountain',
    layers: ['AHN4 Multi-Hillshade NL', 'AHN4 Hoogtekaart Kleur'],
    baseLayer: 'Esri (licht)',
    layerOpacities: {
      'AHN4 Multi-Hillshade NL': 0.70,
      'AHN4 Hoogtekaart Kleur': 0.35
    },
    isBuiltIn: false
  },
  {
    id: 'bodem-landschap',
    name: 'Bodem & landschap',
    icon: 'Layers',
    layers: ['Geomorfologie', 'Bodemkaart', 'Veengebieden'],
    baseLayer: 'Esri (licht)',
    layerOpacities: {
      'Geomorfologie': 0.55,
      'Bodemkaart': 0.35,
      'Veengebieden': 0.45
    },
    isBuiltIn: false
  },
  {
    id: 'percelen-historie',
    name: 'Percelen & historie',
    icon: 'Grid',
    layers: ['Gewaspercelen', 'Kadastrale Grenzen', 'Oude Kernen', 'Essen'],
    baseLayer: 'Luchtfoto',
    layerOpacities: {
      'Gewaspercelen': 0.35,
      'Kadastrale Grenzen': 0.75,
      'Oude Kernen': 0.50,
      'Essen': 0.45
    },
    isBuiltIn: false
  },
  {
    id: 'steentijd',
    name: 'Steentijd',
    icon: 'Mountain',
    layers: [
      'Hunebedden', 'Grafheuvels', 'Terpen', 'FAMKE Steentijd', 'AMK Steentijd',
      'AHN4 Multi-Hillshade NL', 'Labels Overlay'
    ],
    baseLayer: 'Luchtfoto',
    isBuiltIn: false
  },
  {
    id: 'romeins-midvroeg',
    name: 'Romeins - Mid vroeg',
    icon: 'Layers',
    layers: [
      'Romeinse wegen (regio)', 'Romeinse Forten', 'AMK Romeins', 'AMK Vroege ME',
      'Gewaspercelen', 'Kadastrale Grenzen'
    ],
    isBuiltIn: false
  },
  {
    id: 'midlaat-nieuwetijd',
    name: 'Mid laat - Nieuwe tijd',
    icon: 'Grid',
    layers: [
      'AMK Late ME', 'Kastelen', 'Essen', 'Rijksmonumenten',
      'Gewaspercelen', 'Kadastrale Grenzen', 'Oude Kernen'
    ],
    isBuiltIn: false
  },
  {
    id: 'woii-militair',
    name: 'WOII & Militair',
    icon: 'Target',
    layers: [
      'WWII Bunkers', 'Slagvelden', 'Militaire Vliegvelden',
      'Verdedigingslinies', 'Inundatiegebieden', 'Militaire Objecten'
    ],
    isBuiltIn: false
  },
  {
    id: 'analyse',
    name: 'Terrein Analyse',
    icon: 'Search',
    layers: [
      'IKAW', 'Geomorfologie', 'Bodemkaart',
      'AHN4 Multi-Hillshade NL', 'AHN4 Hoogtekaart Kleur'
    ],
    isBuiltIn: false
  },
  {
    id: 'frankrijk',
    name: 'Frankrijk · Thédirac',
    icon: 'Compass',
    layers: [...FRANCE_FIELD_LAYERS],
    baseLayer: 'Hybride (wereld)',
    mapView: {
      center: THEDIRAC_CENTER,
      zoom: 11
    },
    layerOpacities: {
      'LiDAR HD terrein FR': 0.48,
      'Waterlopen BD TOPAGE 2026': 0.92,
      'OCS GE landbedekking 2021-2023': 0.24,
      'Bodem/geologie 1:50.000 FR': 0.28,
      'Oude bossen · Forêts anciennes': 0.38,
      'ArcheOcc · Thédirac-regio': 1
    },
    isBuiltIn: false
  }
]

interface PresetState {
  presets: Preset[]
  customDefaults: Preset[] | null
  applyPreset: (id: string) => void
  createPreset: (name: string, icon: string) => void
  updatePreset: (id: string, changes: Partial<Pick<Preset, 'name' | 'icon' | 'layers' | 'baseLayer'>>) => void
  deletePreset: (id: string) => void
  saveAsDefaults: () => void
  resetToDefaults: () => void
  resetToBuiltIn: () => void
}

const BASE_LAYER_NAMES = [
  'Esri (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'Hybride (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
]

const BUILT_IN_PRESET_MAP = new Map(BUILT_IN_PRESETS.map((preset) => [preset.id, preset]))
const NEW_RESEARCH_PRESET_IDS = new Set(['lidar-hoogte', 'bodem-landschap', 'percelen-historie', 'frankrijk'])
const REQUIRED_PRESET_IDS = new Set(['frankrijk'])
const REMOVED_LAYERS = new Set([
  'Kringloopwinkels',
  'Ruiterpaden',
  'Laarzenpaden',
  'Musea',
  'Onderzoekszone Thédirac',
  'Hellingklassen Thédirac',
  'Onderzoekskaart Thédirac'
])

function migrateLegacyBaseLayer(baseLayer: string | undefined): string | undefined {
  return baseLayer === 'CartoDB (licht)' ? 'Esri (licht)' : baseLayer
}

function migrateFranceLayerName(layerName: string): string {
  return layerName === 'ArcheOcc · archeologie Occitanie' ? 'ArcheOcc · Thédirac-regio' : layerName
}

function normalizeLayerOpacities(opacities: Record<string, number> | undefined): Record<string, number> | undefined {
  if (!opacities) return undefined
  return Object.fromEntries(Object.entries(opacities).filter(([layerName]) => !REMOVED_LAYERS.has(layerName)))
}

function normalizePreset(preset: Preset): Preset {
  const builtInPreset = BUILT_IN_PRESET_MAP.get(preset.id)

  if (!builtInPreset) {
    return {
      ...preset,
      layers: preset.layers
        .map(migrateFranceLayerName)
        .filter((layer) => !REMOVED_LAYERS.has(layer)),
      baseLayer: migrateLegacyBaseLayer(preset.baseLayer),
      layerOpacities: normalizeLayerOpacities(preset.layerOpacities)
    }
  }

  return {
    ...builtInPreset,
    ...preset,
    name: REQUIRED_PRESET_IDS.has(preset.id) ? builtInPreset.name : preset.name,
    layers: (preset.layers ?? builtInPreset.layers)
      .map(migrateFranceLayerName)
      .filter((layer) => !REMOVED_LAYERS.has(layer)),
    baseLayer: migrateLegacyBaseLayer(preset.baseLayer ?? builtInPreset.baseLayer),
    layerOpacities: normalizeLayerOpacities(preset.layerOpacities ?? builtInPreset.layerOpacities),
    mapView: preset.mapView ?? builtInPreset.mapView
  }
}

export function normalizePresetCollection(presets: Preset[]): Preset[] {
  const normalized = presets.map(normalizePreset)
  const existingIds = new Set(normalized.map((preset) => preset.id))
  const requiredPresets = BUILT_IN_PRESETS.filter(
    (preset) => REQUIRED_PRESET_IDS.has(preset.id) && !existingIds.has(preset.id)
  )

  return [...normalized, ...requiredPresets]
}

function addMissingResearchPresets(presets: Preset[]): Preset[] {
  const normalized = normalizePresetCollection(presets)
  const existingIds = new Set(normalized.map((preset) => preset.id))
  const additions = BUILT_IN_PRESETS.filter(
    (preset) => NEW_RESEARCH_PRESET_IDS.has(preset.id) && !existingIds.has(preset.id)
  )

  return [...normalized, ...additions]
}

function isOverlayLayer(layerName: string): boolean {
  return !BASE_LAYER_NAMES.includes(layerName)
}

function activateFranceResearchLayer(layerName: string) {
  if (!FRANCE_RESEARCH_LAYER_NAMES.has(layerName)) return false

  const layerStore = useLayerStore.getState()
  const registeredLayer = layerStore.layers[layerName]
  if (registeredLayer) {
    layerStore.setLayerVisibility(layerName, true)
    return true
  }

  const map = useMapStore.getState().map
  if (!map) return true

  void import('../layers/franceResearchOL').then(({ FRANCE_RESEARCH_FACTORIES }) => {
    const latestStore = useLayerStore.getState()
    if (latestStore.layers[layerName]) {
      latestStore.setLayerVisibility(layerName, true)
      return
    }

    const factory = FRANCE_RESEARCH_FACTORIES[layerName]
    if (!factory) {
      console.warn(`France-laag niet gevonden: ${layerName}`)
      return
    }

    const layer = factory()
    map.addLayer(layer)
    latestStore.registerLayer(layerName, layer)
    latestStore.setLayerVisibility(layerName, true)
  }).catch(error => console.error(`France-laag kon niet worden geladen: ${layerName}`, error))

  return true
}

export const usePresetStore = create<PresetState>()(
  persist(
    (set, get) => ({
      presets: [...BUILT_IN_PRESETS],
      customDefaults: null,

      applyPreset: (id: string) => {
        const rawPreset = get().presets.find(p => p.id === id)
        if (!rawPreset) return

        const preset = normalizePreset(rawPreset)
        const layerStore = useLayerStore.getState()
        const currentBaseLayer = BASE_LAYER_NAMES.find((layerName) => layerStore.visible[layerName])
        const nextBaseLayer = BASE_LAYER_NAMES.includes(preset.baseLayer || '')
          ? preset.baseLayer!
          : currentBaseLayer || 'Esri (licht)'

        Object.keys(layerStore.visible)
          .filter(isOverlayLayer)
          .forEach(layerName => layerStore.setLayerVisibility(layerName, false))

        if (preset.layerOpacities) {
          Object.entries(preset.layerOpacities).forEach(([layerName, opacity]) => {
            layerStore.setLayerOpacity(layerName, opacity)
          })
        }

        preset.layers.forEach(layerName => {
          if (!activateFranceResearchLayer(layerName)) {
            layerStore.setLayerVisibility(layerName, true)
          }
        })

        BASE_LAYER_NAMES.forEach((layerName) => {
          layerStore.setLayerVisibility(layerName, layerName === nextBaseLayer)
        })
        layerStore.setLayerVisibility(
          'Labels Overlay',
          nextBaseLayer === 'Esri (licht)' || preset.layers.includes('Labels Overlay')
        )

        if (preset.mapView) {
          const map = useMapStore.getState().map
          map?.getView().animate({
            center: fromLonLat(preset.mapView.center),
            zoom: preset.mapView.zoom,
            rotation: 0,
            duration: 500
          })
        }

        console.log(`🎨 Preset toegepast: ${preset.name} (${nextBaseLayer})`)
      },

      createPreset: (name: string, icon: string) => {
        const layerStore = useLayerStore.getState()
        const activeBaseLayer = BASE_LAYER_NAMES.find((layerName) => layerStore.visible[layerName])

        const visibleLayers = Object.entries(layerStore.visible)
          .filter(([layerName, isVisible]) => isVisible && isOverlayLayer(layerName))
          .map(([layerName]) => layerName)

        const newPreset: Preset = {
          id: `custom-${Date.now()}`,
          name,
          icon,
          layers: visibleLayers,
          baseLayer: activeBaseLayer || 'Esri (licht)',
          isBuiltIn: false
        }

        set(state => ({
          presets: [...state.presets, newPreset]
        }))

        console.log(`✨ Preset aangemaakt: ${name} met ${visibleLayers.length} lagen`)
      },

      updatePreset: (id: string, changes: Partial<Pick<Preset, 'name' | 'icon' | 'layers' | 'baseLayer'>>) => {
        set(state => ({
          presets: state.presets.map(p =>
            p.id === id ? { ...p, ...changes } : p
          )
        }))
      },

      deletePreset: (id: string) => {
        set(state => ({
          presets: state.presets.filter(p => p.id !== id || p.isBuiltIn)
        }))
      },

      saveAsDefaults: () => {
        const currentPresets = get().presets
        set({ customDefaults: [...currentPresets] })
        console.log('💾 Presets opgeslagen als standaard')
      },

      resetToDefaults: () => {
        const { customDefaults } = get()
        if (customDefaults) {
          set({ presets: normalizePresetCollection(customDefaults) })
          console.log('🔄 Presets hersteld naar eigen standaard')
        } else {
          set({ presets: [...BUILT_IN_PRESETS] })
          console.log('🔄 Presets hersteld naar originele standaard')
        }
      },

      resetToBuiltIn: () => {
        set({ presets: [...BUILT_IN_PRESETS], customDefaults: null })
        console.log('🔄 Presets gereset naar originele instellingen')
      }
    }),
    {
      name: 'detectorapp-presets',
      version: 21,
      migrate: (persistedState: unknown, version: number) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return {
            presets: [...BUILT_IN_PRESETS],
            customDefaults: null
          }
        }

        const state = persistedState as Partial<PresetState>

        if (version < 13) {
          return {
            presets: [...BUILT_IN_PRESETS],
            customDefaults: null
          }
        }

        return {
          ...state,
          presets: Array.isArray(state.presets)
            ? version < 19
              ? addMissingResearchPresets(state.presets)
              : normalizePresetCollection(state.presets)
            : [...BUILT_IN_PRESETS],
          customDefaults: Array.isArray(state.customDefaults)
            ? version < 19
              ? addMissingResearchPresets(state.customDefaults)
              : normalizePresetCollection(state.customDefaults)
            : null
        }
      }
    }
  )
)
