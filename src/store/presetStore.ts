import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { accountStorage } from '../utils/accountStorage'
import { fromLonLat, toLonLat } from 'ol/proj'
import { THEDIRAC_RESEARCH_LAYER_NAME } from '../data/thediracResearchSites'
import { THEDIRAC_CONTEXT_LAYER_NAME } from '../data/thediracLandscapeContext'
import { THEDIRAC_SIGHTS_LAYER_NAME } from '../data/thediracSights'
import { THEDIRAC_HIKES_LAYER_NAME } from '../data/thediracHikes'
import {
  THEDIRAC_FOSSILS_LAYER_NAME,
  THEDIRAC_MINERALS_LAYER_NAME
} from '../data/thediracGeologySites'
import { useLayerStore } from './layerStore'
import { useMapStore } from './mapStore'
import { useCustomLayerStore } from './customLayerStore'
import { useCustomPointLayerStore } from './customPointLayerStore'

export interface PresetLayerState {
  visible: boolean
  opacity: number
}

export interface Preset {
  id: string
  name: string
  icon: string
  layers: string[]
  baseLayer?: string
  layerOpacities?: Record<string, number>
  layerStates?: Record<string, PresetLayerState>
  customLayerStates?: Record<string, PresetLayerState>
  mapView?: {
    center: [number, number]
    zoom: number
  }
  isBuiltIn: boolean
}

const THEDIRAC_CENTER: [number, number] = [1.34, 44.625]
const THEDIRAC_ARCHAEOLOGY_LAYER = THEDIRAC_RESEARCH_LAYER_NAME

const FRANCE_FIELD_LAYERS = [
  'LiDAR HD terrein FR',
  'Waterlopen BD TOPAGE 2026',
  'OCS GE landbedekking 2021-2023',
  'Bodem/geologie 1:50.000 FR',
  'Oude bossen · Forêts anciennes',
  THEDIRAC_ARCHAEOLOGY_LAYER,
  THEDIRAC_CONTEXT_LAYER_NAME,
  THEDIRAC_MINERALS_LAYER_NAME,
  THEDIRAC_FOSSILS_LAYER_NAME,
  THEDIRAC_SIGHTS_LAYER_NAME,
  THEDIRAC_HIKES_LAYER_NAME,
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
  THEDIRAC_ARCHAEOLOGY_LAYER,
  THEDIRAC_CONTEXT_LAYER_NAME,
  THEDIRAC_MINERALS_LAYER_NAME,
  THEDIRAC_FOSSILS_LAYER_NAME,
  THEDIRAC_SIGHTS_LAYER_NAME,
  THEDIRAC_HIKES_LAYER_NAME,
])

const BUILT_IN_PRESETS: Preset[] = [
  {
    id: 'detectie-uitgebreid',
    name: 'Detectie',
    icon: 'Compass',
    layers: [
      'AHN4 Hoogtekaart Kleur',
      'Geomorfologie',
      'AMK Monumenten',
      'Gewaspercelen',
      'Kadastrale Grenzen',
      'AHN4 Multi-Hillshade NL',
      'Romeinse wegen (regio)',
      'Essen',
      'Bodemkaart',
      'IKAW',
      'UIKAV Punten',
      'UIKAV Vlakken',
      'UIKAV Buffer',
      'UIKAV Expert',
      'UIKAV Indeling',
      'Parken',
      'Speeltuinen',
      'Strandjes'
    ],
    baseLayer: 'Luchtfoto',
    layerOpacities: {
      'AHN4 Hoogtekaart Kleur': 0.20,
      'Geomorfologie': 0.80,
      'AMK Monumenten': 0.60,
      'Gewaspercelen': 0.10,
      'Kadastrale Grenzen': 0.50,
      'AHN4 Multi-Hillshade NL': 0.20,
      'Romeinse wegen (regio)': 1,
      'Essen': 0.10,
      'Bodemkaart': 0.10,
      'IKAW': 0.10,
      'UIKAV Punten': 0.10,
      'UIKAV Vlakken': 0.10,
      'UIKAV Buffer': 0.10,
      'UIKAV Expert': 0.10,
      'UIKAV Indeling': 0.10,
      'Parken': 0.10,
      'Speeltuinen': 0.10,
      'Strandjes': 0.10
    },
    isBuiltIn: true
  },
  {
    id: 'veld-hoogtekaart',
    name: 'Hoogtekaart',
    icon: 'Mountain',
    layers: ['AHN4 Hoogtekaart Kleur', 'AMK Monumenten'],
    baseLayer: 'Esri (licht)',
    layerOpacities: {
      'AHN4 Hoogtekaart Kleur': 1,
      'AMK Monumenten': 0.60
    },
    isBuiltIn: true
  },
  {
    id: 'veld-lidar',
    name: 'LiDAR',
    icon: 'Grid',
    layers: ['AHN4 Multi-Hillshade NL', 'AMK Monumenten'],
    baseLayer: 'Esri (licht)',
    layerOpacities: {
      'AHN4 Multi-Hillshade NL': 1,
      'AMK Monumenten': 0.60
    },
    isBuiltIn: true
  },
  {
    id: 'veld-geomorfologie',
    name: 'Geomorfologie',
    icon: 'Layers',
    layers: ['Geomorfologie', 'AMK Monumenten'],
    baseLayer: 'Esri (licht)',
    layerOpacities: {
      'Geomorfologie': 1,
      'AMK Monumenten': 0.60
    },
    isBuiltIn: true
  },
  {
    id: 'veld-tmk-1850',
    name: '1850',
    icon: 'Map',
    layers: ['TMK 1850', 'AMK Monumenten'],
    baseLayer: 'Luchtfoto',
    layerOpacities: {
      'TMK 1850': 0.8,
      'AMK Monumenten': 0.60
    },
    isBuiltIn: true
  },
  {
    id: 'veld-bonnebladen-1900',
    name: '1900',
    icon: 'Map',
    layers: ['Bonnebladen 1900', 'AMK Monumenten'],
    baseLayer: 'Luchtfoto',
    layerOpacities: {
      'Bonnebladen 1900': 0.8,
      'AMK Monumenten': 0.60
    },
    isBuiltIn: true
  },
  {
    id: 'thedirac-2026',
    name: 'Thédirac 2026',
    icon: 'Compass',
    layers: [...FRANCE_FIELD_LAYERS],
    baseLayer: 'Hybride (wereld)',
    mapView: {
      center: THEDIRAC_CENTER,
      zoom: 10.7
    },
    layerOpacities: {
      'LiDAR HD terrein FR': 0.48,
      'Waterlopen BD TOPAGE 2026': 0.92,
      'OCS GE landbedekking 2021-2023': 0.24,
      'Bodem/geologie 1:50.000 FR': 0.28,
      'Oude bossen · Forêts anciennes': 0.38,
      [THEDIRAC_ARCHAEOLOGY_LAYER]: 1,
      [THEDIRAC_MINERALS_LAYER_NAME]: 1,
      [THEDIRAC_FOSSILS_LAYER_NAME]: 1,
      [THEDIRAC_SIGHTS_LAYER_NAME]: 1,
      [THEDIRAC_HIKES_LAYER_NAME]: 1
    },
    isBuiltIn: true
  }
]

const LEGACY_STANDARD_PRESET_IDS = new Set([
  'detectie',
  'detectie-basis',
  'terreinanalyse',
  'lidar-hoogte',
  'bodem-landschap',
  'percelen-historie',
  'steentijd',
  'romeins-midvroeg',
  'midlaat-nieuwetijd',
  'woii-militair',
  'analyse',
  'frankrijk'
])

function customLayerSnapshotKey(layer: { id: string; contentHash?: string }): string {
  return layer.contentHash ? `hash:${layer.contentHash}` : `id:${layer.id}`
}

function pointLayerSnapshotKey(layer: { id: string; buddyLayerId?: string }): string {
  return layer.buddyLayerId ? `buddy:${layer.buddyLayerId}` : `point:${layer.id}`
}

interface PresetState {
  presets: Preset[]
  customDefaults: Preset[] | null
  updatedAt: number
  applyPreset: (id: string) => void
  createPreset: (name: string, icon: string, rememberMapView?: boolean) => void
  updatePreset: (id: string, changes: Partial<Pick<Preset, 'name' | 'icon' | 'layers' | 'baseLayer' | 'layerOpacities' | 'layerStates' | 'customLayerStates' | 'mapView'>>) => void
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
  'Hybride (wereld)'
]

const BUILT_IN_PRESET_MAP = new Map(BUILT_IN_PRESETS.map((preset) => [preset.id, preset]))
const REMOVED_LAYERS = new Set([
  'Kringloopwinkels',
  'Ruiterpaden',
  'Laarzenpaden',
  'Musea',
  'Onderzoekszone Thédirac',
  'Hellingklassen Thédirac',
  'Onderzoekskaart Thédirac',
  'ArcheOcc · archeologie Occitanie',
  'ArcheOcc · Thédirac-regio'
])

function migrateLegacyBaseLayer(baseLayer: string | undefined): string | undefined {
  return baseLayer === 'CartoDB (licht)' ? 'Esri (licht)' : baseLayer
}

function migrateFranceLayerName(layerName: string): string {
  if (layerName === 'Bekende plekken · Thédirac') return THEDIRAC_ARCHAEOLOGY_LAYER
  if (/^Archeologische plekken · (?:regio )?Thédirac \(\d+\)$/.test(layerName)) {
    return THEDIRAC_ARCHAEOLOGY_LAYER
  }
  return layerName
}

function normalizeLayerOpacities(opacities: Record<string, number> | undefined): Record<string, number> | undefined {
  if (!opacities) return undefined
  return Object.fromEntries(
    Object.entries(opacities)
      .map(([layerName, opacity]) => [migrateFranceLayerName(layerName), opacity] as const)
      .filter(([layerName]) => !REMOVED_LAYERS.has(layerName))
  )
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

  // Ingebouwde presets leveren alleen migratie-fallbacks. Een bestaande preset
  // blijft van de gebruiker: verwijderde lagen mogen bij herstart of cloud-sync
  // niet stilletjes uit de ingebouwde definitie worden teruggezet.
  const configuredLayers = (preset.layers ?? builtInPreset.layers).map(migrateFranceLayerName)

  return {
    ...builtInPreset,
    ...preset,
    layers: configuredLayers.filter((layer) => !REMOVED_LAYERS.has(layer)),
    baseLayer: migrateLegacyBaseLayer(preset.baseLayer ?? builtInPreset.baseLayer),
    layerOpacities: normalizeLayerOpacities(preset.layerOpacities ?? builtInPreset.layerOpacities),
    mapView: preset.mapView ?? builtInPreset.mapView
  }
}

export function normalizePresetCollection(presets: Preset[]): Preset[] {
  const builtInIds = new Set(BUILT_IN_PRESETS.map(preset => preset.id))
  const custom = presets
    .filter(preset => !builtInIds.has(preset.id) && !LEGACY_STANDARD_PRESET_IDS.has(preset.id))
    .map(normalizePreset)

  return [...BUILT_IN_PRESETS, ...custom]
}

function isOverlayLayer(layerName: string): boolean {
  return !BASE_LAYER_NAMES.includes(layerName)
}

export function captureCurrentPresetSnapshot() {
  const layerStore = useLayerStore.getState()
  const customLayerStore = useCustomLayerStore.getState()
  const pointLayerStore = useCustomPointLayerStore.getState()
  const activeBaseLayer = BASE_LAYER_NAMES.find((layerName) => layerStore.visible[layerName])

  const layerStates = Object.fromEntries(
    Object.keys(layerStore.visible)
      .filter(isOverlayLayer)
      .map(layerName => [
        layerName,
        {
          visible: !!layerStore.visible[layerName],
          opacity: layerStore.opacity[layerName] ?? 1
        }
      ])
  )

  const customLayerStates = Object.fromEntries([
    ...customLayerStore.layers.map(layer => [
      customLayerSnapshotKey(layer),
      {
        visible: layer.visible,
        opacity: layer.opacity
      }
    ] as const),
    ...pointLayerStore.layers.map(layer => [
      pointLayerSnapshotKey(layer),
      {
        visible: layer.visible,
        opacity: 1
      }
    ] as const)
  ])

  return {
    layers: Object.entries(layerStates)
      .filter(([, state]) => state.visible)
      .map(([layerName]) => layerName),
    baseLayer: activeBaseLayer || 'Esri (licht)',
    layerOpacities: Object.fromEntries(
      Object.entries(layerStates).map(([layerName, state]) => [layerName, state.opacity])
    ),
    layerStates,
    customLayerStates
  }
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
    if (!factory) return

    const layer = factory()
    map.addLayer(layer)
    latestStore.registerLayer(layerName, layer)
    latestStore.setLayerVisibility(layerName, true)
  }).catch(error => console.error(`Frankrijk-laag kon niet worden geladen: ${layerName}`, error))

  return true
}

export const usePresetStore = create<PresetState>()(
  persist(
    (set, get) => ({
      presets: [...BUILT_IN_PRESETS],
      customDefaults: null,
      updatedAt: 0,

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
          .forEach(layerName => {
            const snapshot = preset.layerStates?.[layerName]
            const shouldShow = snapshot ? snapshot.visible : preset.layers.includes(layerName)
            const opacity = snapshot?.opacity ?? preset.layerOpacities?.[layerName]

            if (typeof opacity === 'number') {
              layerStore.setLayerOpacity(layerName, opacity)
            }
            if (shouldShow && activateFranceResearchLayer(layerName)) {
              return
            }
            layerStore.setLayerVisibility(layerName, shouldShow)
          })

        const customLayerStore = useCustomLayerStore.getState()
        customLayerStore.layers.forEach(layer => {
          const snapshot = preset.customLayerStates?.[customLayerSnapshotKey(layer)]
          if (!snapshot) return
          customLayerStore.updateLayer(layer.id, {
            visible: snapshot.visible,
            opacity: snapshot.opacity
          })
        })

        const pointLayerStore = useCustomPointLayerStore.getState()
        pointLayerStore.layers.forEach(layer => {
          const snapshot = preset.customLayerStates?.[pointLayerSnapshotKey(layer)]
          if (!snapshot) return
          pointLayerStore.updateLayer(layer.id, { visible: snapshot.visible })
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

      createPreset: (name: string, icon: string, rememberMapView = false) => {
        const snapshot = captureCurrentPresetSnapshot()
        const map = useMapStore.getState().map
        const view = map?.getView()
        const center = view?.getCenter()
        const zoom = view?.getZoom()
        const mapView = rememberMapView && center && typeof zoom === 'number'
          ? {
              center: toLonLat(center) as [number, number],
              zoom
            }
          : undefined

        const newPreset: Preset = {
          id: `custom-${Date.now()}`,
          name,
          icon,
          ...snapshot,
          ...(mapView ? { mapView } : {}),
          isBuiltIn: false
        }

        set(state => ({
          presets: [...state.presets, newPreset],
          updatedAt: Date.now()
        }))

        console.log(`✨ Preset aangemaakt: ${name} als volledige kaartsnapshot`)
      },

      updatePreset: (id: string, changes: Partial<Pick<Preset, 'name' | 'icon' | 'layers' | 'baseLayer' | 'layerOpacities' | 'layerStates' | 'customLayerStates' | 'mapView'>>) => {
        set(state => ({
          presets: state.presets.map(p =>
            p.id === id ? { ...p, ...changes } : p
          ),
          updatedAt: Date.now()
        }))
      },

      deletePreset: (id: string) => {
        set(state => ({
          presets: state.presets.filter(p => p.id !== id || p.isBuiltIn),
          updatedAt: Date.now()
        }))
      },

      saveAsDefaults: () => {
        const currentPresets = get().presets
        set({ customDefaults: [...currentPresets], updatedAt: Date.now() })
        console.log('💾 Presets opgeslagen als standaard')
      },

      resetToDefaults: () => {
        const { customDefaults } = get()
        if (customDefaults) {
          set({ presets: normalizePresetCollection(customDefaults), updatedAt: Date.now() })
          console.log('🔄 Presets hersteld naar eigen standaard')
        } else {
          set({ presets: [...BUILT_IN_PRESETS], updatedAt: Date.now() })
          console.log('🔄 Presets hersteld naar originele standaard')
        }
      },

      resetToBuiltIn: () => {
        set({ presets: [...BUILT_IN_PRESETS], customDefaults: null, updatedAt: Date.now() })
        console.log('🔄 Presets gereset naar originele instellingen')
      }
    }),
    {
      name: 'detectorapp-presets',
      storage: createJSONStorage(() => accountStorage),
      version: 30,
      migrate: (persistedState: unknown, version: number) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return {
            presets: [...BUILT_IN_PRESETS],
            customDefaults: null,
            updatedAt: 0
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
            ? normalizePresetCollection(state.presets)
            : [...BUILT_IN_PRESETS],
          customDefaults: Array.isArray(state.customDefaults)
            ? normalizePresetCollection(state.customDefaults)
            : null,
          updatedAt: typeof state.updatedAt === 'number' ? state.updatedAt : 0
        }
      }
    }
  )
)
