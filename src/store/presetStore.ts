import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useLayerStore } from './layerStore'

export interface Preset {
  id: string
  name: string
  icon: string  // lucide icon name
  layers: string[]
  baseLayer?: string  // Optional base layer to activate (e.g., 'Luchtfoto')
  layerOpacities?: Record<string, number>  // Optional per-layer opacity overrides
  isBuiltIn: boolean
}

// Built-in presets - only Detectie is protected (isBuiltIn: true)
// Logisch ontworpen presets per periode/gebruik:
// - Steentijd: luchtfoto + reliëf om zandverstuivingen te zien
// - Romeins/Vroege ME: percelen zijn belangrijk voor nederzettingspatronen
// - Late ME/Nieuw: kadaster en historische structuren
// - WOII: militaire objecten en linies
// - Analyse: bodem en terrein voor onderzoek
const BUILT_IN_PRESETS: Preset[] = [
  {
    id: 'detectie',
    name: 'Detectie',
    icon: 'Compass',
    layers: ['AMK Monumenten', 'Gewaspercelen', 'Geomorfologie', 'AHN4 Hoogtekaart Kleur', 'Kadastrale Grenzen'],
    baseLayer: 'Esri (licht)',  // Explicit default base layer
    layerOpacities: {
      'AMK Monumenten': 0.50,
      'Gewaspercelen': 0.25,
      'Geomorfologie': 0.25,
      'AHN4 Hoogtekaart Kleur': 0.25
    },
    isBuiltIn: false  // Now editable like other presets
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
    // Luchtfoto achtergrond om zandverstuivingen/heide te herkennen
    // Reliëfkaart voor grafheuvels en oude structuren
    // Labels overlay voor plaatsnamen
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
    // Percelen belangrijk voor nederzettingspatronen
    // Romeinse wegen en forten
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
    // Historische structuren en erfgoed
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
    // Bodem en terrein voor onderzoek, reliëf en hoogtekaart
    layers: [
      'IKAW', 'Geomorfologie', 'Bodemkaart',
      'AHN4 Multi-Hillshade NL', 'AHN4 Hoogtekaart Kleur'
    ],
    isBuiltIn: false
  }
]

interface PresetState {
  presets: Preset[]
  customDefaults: Preset[] | null  // User's saved defaults (null = use BUILT_IN_PRESETS)

  // Actions
  applyPreset: (id: string) => void
  createPreset: (name: string, icon: string) => void
  updatePreset: (id: string, changes: Partial<Pick<Preset, 'name' | 'icon' | 'layers' | 'baseLayer'>>) => void
  deletePreset: (id: string) => void
  saveAsDefaults: () => void  // Save current presets as user's defaults
  resetToDefaults: () => void  // Reset to user's defaults (or BUILT_IN if no custom)
  resetToBuiltIn: () => void  // Reset to original BUILT_IN_PRESETS
}

const BASE_LAYER_NAMES = [
  'Esri (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
]

const BUILT_IN_PRESET_MAP = new Map(BUILT_IN_PRESETS.map((preset) => [preset.id, preset]))
const NEW_RESEARCH_PRESET_IDS = new Set(['lidar-hoogte', 'bodem-landschap', 'percelen-historie'])
const REMOVED_LAYERS = new Set([
  'Kringloopwinkels',
  'Ruiterpaden',
  'Laarzenpaden',
  'Musea',
])

function migrateLegacyBaseLayer(baseLayer: string | undefined): string | undefined {
  return baseLayer === 'CartoDB (licht)' ? 'Esri (licht)' : baseLayer
}

function normalizePreset(preset: Preset): Preset {
  const builtInPreset = BUILT_IN_PRESET_MAP.get(preset.id)

  if (!builtInPreset) {
    return {
      ...preset,
      layers: preset.layers.filter((layer) => !REMOVED_LAYERS.has(layer)),
      baseLayer: migrateLegacyBaseLayer(preset.baseLayer)
    }
  }

  return {
    ...builtInPreset,
    ...preset,
    layers: (preset.layers ?? builtInPreset.layers).filter((layer) => !REMOVED_LAYERS.has(layer)),
    baseLayer: migrateLegacyBaseLayer(preset.baseLayer ?? builtInPreset.baseLayer),
    layerOpacities: preset.layerOpacities ?? builtInPreset.layerOpacities
  }
}

export function normalizePresetCollection(presets: Preset[]): Preset[] {
  return presets.map(normalizePreset)
}

function addMissingResearchPresets(presets: Preset[]): Preset[] {
  const normalized = normalizePresetCollection(presets)
  const existingIds = new Set(normalized.map((preset) => preset.id))
  const additions = BUILT_IN_PRESETS.filter(
    (preset) => NEW_RESEARCH_PRESET_IDS.has(preset.id) && !existingIds.has(preset.id)
  )

  return [...normalized, ...additions]
}

// All overlay layer names for clearing - must match PresetButtons.tsx
const ALL_OVERLAYS = [
  'Labels Overlay',
  // Steentijd
  'Hunebedden', 'FAMKE Steentijd', 'Grafheuvels', 'Terpen',
  // Archeologie
  'AMK Monumenten', 'AMK Romeins', 'AMK Steentijd', 'AMK Vroege ME', 'AMK Late ME', 'AMK Overig',
  'Romeinse wegen (regio)', 'Romeinse wegen (Wereld)', 'Romeinse Forten', 'Kastelen', 'IKAW',
  // Erfgoed
  'Rijksmonumenten', 'Werelderfgoed', 'Religieus Erfgoed', 'Essen',
  // Militair
  'WWII Bunkers', 'Slagvelden', 'Militaire Vliegvelden',
  'Verdedigingslinies', 'Inundatiegebieden', 'Militaire Objecten',
  // Paleokaarten
  'Paleokaart 800 n.Chr.', 'Paleokaart 100 n.Chr.', 'Paleokaart 500 v.Chr.',
  'Paleokaart 1500 v.Chr.', 'Paleokaart 2750 v.Chr.', 'Paleokaart 5500 v.Chr.', 'Paleokaart 9000 v.Chr.',
  // UIKAV
  'UIKAV Punten', 'UIKAV Vlakken', 'UIKAV Expert', 'UIKAV Buffer', 'UIKAV Indeling',
  // Hoogtekaarten
  'AHN4 Hoogtekaart Kleur', 'AHN4 Hillshade NL', 'AHN4 Multi-Hillshade NL', 'AHN 0.5m',
  // Terrein
  'Veengebieden', 'Geomorfologie', 'Bodemkaart',
  // Fossielen
  'Fossielen Nederland', 'Fossielen België', 'Fossielen Duitsland', 'Fossielen Frankrijk',
  // Recreatie
  'Parken', 'Speeltuinen', 'Strandjes',
  // Percelen
  'Gewaspercelen', 'Kadastrale Grenzen',
  // Provinciale Waardenkaarten - Zuid-Holland
  'Scheepswrakken', 'Woonheuvels ZH', 'Windmolens', 'Erfgoedlijnen', 'Oude Kernen',
  // Provinciale Waardenkaarten - Gelderland
  'Relictenkaart Punten', 'Relictenkaart Lijnen', 'Relictenkaart Vlakken',
  // Provinciale Waardenkaarten - Zeeland
  'Verdronken Dorpen'
]

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

        // Turn off all overlays
        ALL_OVERLAYS.forEach(layer => layerStore.setLayerVisibility(layer, false))

        // Turn on preset layers
        preset.layers.forEach(layer => layerStore.setLayerVisibility(layer, true))

        // Apply layer opacities if specified
        if (preset.layerOpacities) {
          Object.entries(preset.layerOpacities).forEach(([layerName, opacity]) => {
            layerStore.setLayerOpacity(layerName, opacity)
          })
        }

        // Always leave exactly one base layer active so a preset can never blank the map.
        BASE_LAYER_NAMES.forEach((layerName) => {
          layerStore.setLayerVisibility(layerName, layerName === nextBaseLayer)
        })
        layerStore.setLayerVisibility(
          'Labels Overlay',
          nextBaseLayer === 'Esri (licht)' || preset.layers.includes('Labels Overlay')
        )

        console.log(`🎨 Preset toegepast: ${preset.name} (${nextBaseLayer})`)
      },

      createPreset: (name: string, icon: string) => {
        const layerStore = useLayerStore.getState()
        const activeBaseLayer = BASE_LAYER_NAMES.find((layerName) => layerStore.visible[layerName])

        // Get currently visible layers
        const visibleLayers = Object.entries(layerStore.visible)
          .filter(([layerName, isVisible]) => isVisible && ALL_OVERLAYS.includes(layerName))
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
          set({ presets: [...customDefaults] })
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
      version: 18,
      migrate: (persistedState: unknown, version: number) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return {
            presets: [...BUILT_IN_PRESETS],
            customDefaults: null
          }
        }

        const state = persistedState as Partial<PresetState>

        // v13: Changed AMK opacity from 60% to 50% in Detectie preset
        // v12: Updated Detectie preset with specific opacities and added Kadastrale Grenzen
        // v11: Added Geomorfologie and AHN4 Hoogtekaart Kleur to Detectie preset with low opacity
        // v10: Removed non-existent 'Archeo Landschappen' from Terrein Analyse preset
        // v14: Preserve base layers on presets and repair legacy built-in preset metadata
        // v15: Strip removed live Overpass recreation layers from persisted presets
        // v16: Strip remaining live Overpass recreation layers from persisted presets
        // v17: Replace the retired CARTO light basemap in saved presets
        // v18: Add three practical research presets without changing existing presets
        if (version < 13) {
          return {
            presets: [...BUILT_IN_PRESETS],
            customDefaults: null
          }
        }

        return {
          ...state,
          presets: Array.isArray(state.presets)
            ? version < 18
              ? addMissingResearchPresets(state.presets)
              : normalizePresetCollection(state.presets)
            : [...BUILT_IN_PRESETS],
          customDefaults: Array.isArray(state.customDefaults)
            ? version < 18
              ? addMissingResearchPresets(state.customDefaults)
              : normalizePresetCollection(state.customDefaults)
            : null
        }
      }
    }
  )
)
