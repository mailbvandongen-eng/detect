import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { accountStorage } from '../utils/accountStorage'
import { fromLonLat, toLonLat } from 'ol/proj'
import { THEDIRAC_RESEARCH_LAYER_NAME } from '../data/thediracResearchSites'
import { NAPOLEON_LOT_LAYER } from '../data/lotCadastreArchives'
import { FRANCE_RESEARCH_LAYER_ORDER } from '../config/franceResearchLayers'
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
  /** Transparantie van de basiskaart (1 = volledig zichtbaar). */
  baseOpacity?: number
  layerOpacities?: Record<string, number>
  layerStates?: Record<string, PresetLayerState>
  customLayerStates?: Record<string, PresetLayerState>
  mapView?: {
    center: [number, number]
    zoom: number
  } | null
  historicalMapsAdded?: boolean
  cassiniAdded?: boolean
  detectieRevision?: number
  isBuiltIn: boolean
}

const FRANCE_RESEARCH_LAYER_NAMES = new Set(FRANCE_RESEARCH_LAYER_ORDER)
const THEDIRAC_ARCHAEOLOGY_LAYER = THEDIRAC_RESEARCH_LAYER_NAME

/** Verhoog om de ingebouwde Detectie-preset eenmalig opnieuw uit te rollen. */
const DETECTIE_REVISION = 2

const BUILT_IN_PRESETS: Preset[] = [
  {
    id: 'detectie-uitgebreid',
    name: 'Detectie',
    icon: 'Compass',
    detectieRevision: DETECTIE_REVISION,
    // Volgorde op de kaart volgt LAYER_STACK_ORDER: geomorfologie boven
    // Hillshade Kleur, daaronder LiDAR; AMK en Romeinse wegen liggen bovenop.
    layers: [
      'AMK Monumenten',
      'Romeinse wegen (regio)',
      'Geomorfologie',
      'AHN4 Hillshade Kleur',
      'AHN4 Multi-Hillshade NL'
    ],
    baseLayer: 'Luchtfoto',
    layerOpacities: {
      'AMK Monumenten': 0.60,
      'Romeinse wegen (regio)': 1,
      'Geomorfologie': 0.60,
      'AHN4 Hillshade Kleur': 0.60,
      'AHN4 Multi-Hillshade NL': 0.20
    },
    isBuiltIn: true
  },
  {
    id: 'veld-hoogte-lidar',
    name: 'Hoogte & LiDAR',
    icon: 'Mountain',
    // Actuele hoogtekaart en LiDAR samen, elk apart regelbaar in de
    // transparantieregelaar. LiDAR ligt boven de hoogtekaart (layerOrder).
    layers: ['AHN4 Hoogtekaart Kleur', 'AHN4 Multi-Hillshade NL', 'AMK Monumenten', 'Romeinse wegen (regio)'],
    baseLayer: 'Esri (licht)',
    layerOpacities: {
      'AHN4 Hoogtekaart Kleur': 0.8,
      'AHN4 Multi-Hillshade NL': 0.5,
      'AMK Monumenten': 0.60,
      'Romeinse wegen (regio)': 1
    },
    isBuiltIn: true
  },
  {
    id: 'veld-geomorfologie',
    name: 'Geomorfologie',
    icon: 'Layers',
    layers: ['Geomorfologie', 'AMK Monumenten', 'Romeinse wegen (regio)'],
    baseLayer: 'Esri (licht)',
    layerOpacities: {
      'Geomorfologie': 1,
      'AMK Monumenten': 0.60,
      'Romeinse wegen (regio)': 1
    },
    isBuiltIn: true
  },
  {
    id: 'veld-tmk-1850',
    name: '1850',
    icon: 'Map',
    layers: ['TMK 1850', 'AMK Monumenten', 'Romeinse wegen (regio)'],
    baseLayer: 'Luchtfoto',
    layerOpacities: {
      'TMK 1850': 0.8,
      'AMK Monumenten': 0.60,
      'Romeinse wegen (regio)': 1
    },
    isBuiltIn: true
  },
  {
    id: 'veld-bonnebladen-1900',
    name: '1900',
    icon: 'Map',
    layers: ['Bonnebladen 1900', 'AMK Monumenten', 'Romeinse wegen (regio)'],
    baseLayer: 'Luchtfoto',
    layerOpacities: {
      'Bonnebladen 1900': 0.8,
      'AMK Monumenten': 0.60,
      'Romeinse wegen (regio)': 1
    },
    isBuiltIn: true
  },
  {
    id: 'frankrijk-historie',
    name: 'Frankrijk historie',
    icon: 'Map',
    // Alle werkende historische kaarten gestapeld (luchtfoto 1950–1965 boven,
    // Cassini onder) met de BRGM-bodemkaart erover; regel per laag de dekking.
    layers: [
      'Bodem/geologie 1:50.000 FR',
      'Luchtfoto · 1950–1965',
      'IGN-kaart · 1950',
      'État-major · 1820–1866',
      'Carte de Cassini · 18e eeuw',
      NAPOLEON_LOT_LAYER
    ],
    baseLayer: 'Hybride (wereld)',
    layerOpacities: {
      'Bodem/geologie 1:50.000 FR': 0.35,
      'Luchtfoto · 1950–1965': 0.7,
      'IGN-kaart · 1950': 0.7,
      'État-major · 1820–1866': 0.7,
      'Carte de Cassini · 18e eeuw': 0.8,
      [NAPOLEON_LOT_LAYER]: 1
    },
    isBuiltIn: true
  },
  {
    id: 'vakantie-onderzoek-fr',
    name: 'Vakantie-onderzoek FR',
    icon: 'Search',
    // Sjabloon om een bestemming in Frankrijk voor te bereiden: alleen lagen
    // die in heel Frankrijk werken. Ga naar de plek en sla via
    // Preset toevoegen een eigen kopie op met "Locatie & zoom onthouden".
    layers: [
      'Bodem/geologie 1:50.000 FR',
      'LiDAR HD terrein FR',
      'Waterlopen BD TOPAGE 2026',
      'Oude bossen · Forêts anciennes',
      'Hist. Gebouwen FR',
      'INRAP Sites FR',
      'Romeinse wegen (Wereld)'
    ],
    baseLayer: 'Hybride (wereld)',
    layerOpacities: {
      'Bodem/geologie 1:50.000 FR': 0.35,
      'LiDAR HD terrein FR': 0.5,
      'Waterlopen BD TOPAGE 2026': 0.9,
      'Oude bossen · Forêts anciennes': 0.35,
      'Hist. Gebouwen FR': 1,
      'INRAP Sites FR': 1,
      'Romeinse wegen (Wereld)': 1
    },
    isBuiltIn: true
  }
]

const ALWAYS_VISIBLE_PRESET_IDS = new Set(['detectie-uitgebreid', 'veld-hoogte-lidar', 'veld-geomorfologie', 'veld-tmk-1850', 'veld-bonnebladen-1900'])

const LEGACY_STANDARD_PRESET_IDS = new Set([
  'thedirac-2026',
  'veld-hoogtekaart',
  'veld-lidar',
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
  updatePreset: (id: string, changes: Partial<Pick<Preset, 'name' | 'icon' | 'layers' | 'baseLayer' | 'baseOpacity' | 'layerOpacities' | 'layerStates' | 'customLayerStates' | 'mapView'>>) => void
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
  layerName = layerName.replace('Sites ClassÃ©s ', 'Sites Classés ').replace('ÃŽle-de-France', 'Île-de-France')
  if (layerName === 'Bekende plekken · Thédirac') return THEDIRAC_ARCHAEOLOGY_LAYER
  if (/^Archeologische plekken · (?:regio )?Thédirac \(\d+\)$/.test(layerName)) {
    return THEDIRAC_ARCHAEOLOGY_LAYER
  }
  return layerName
}

function normalizeLayerStates(states: Record<string, PresetLayerState> | undefined) {
  if (!states) return undefined
  // Als beide namen voorkomen, gaat de huidige naam boven de oude alias.
  return Object.fromEntries(Object.entries(states)
    .sort(([a], [b]) => Number(a === migrateFranceLayerName(a)) - Number(b === migrateFranceLayerName(b)))
    .map(([name, state]) => [migrateFranceLayerName(name), state] as const)
    .filter(([name]) => !REMOVED_LAYERS.has(name)))
}

function normalizeLayerOpacities(opacities: Record<string, number> | undefined): Record<string, number> | undefined {
  if (!opacities) return undefined
  return Object.fromEntries(
    Object.entries(opacities)
      .sort(([a], [b]) => Number(a === migrateFranceLayerName(a)) - Number(b === migrateFranceLayerName(b)))
      .map(([layerName, opacity]) => [migrateFranceLayerName(layerName), opacity] as const)
      .filter(([layerName]) => !REMOVED_LAYERS.has(layerName))
  )
}

function normalizePreset(preset: Preset): Preset {
  const builtInPreset = BUILT_IN_PRESET_MAP.get(preset.id)

  // Nieuwe basis voor Detectie (nov 2026): de opgeslagen versie wordt eenmalig
  // vervangen; een eventueel onthouden kaartbeeld blijft behouden.
  if (builtInPreset && preset.id === 'detectie-uitgebreid' && (preset.detectieRevision ?? 0) < DETECTIE_REVISION) {
    preset = { ...builtInPreset, mapView: preset.mapView ?? builtInPreset.mapView }
  }

  if (!builtInPreset) {
    return {
      ...preset,
      layers: preset.layers
        .map(migrateFranceLayerName)
        .filter((layer) => !REMOVED_LAYERS.has(layer)),
      baseLayer: migrateLegacyBaseLayer(preset.baseLayer),
      layerStates: normalizeLayerStates(preset.layerStates),
      layerOpacities: normalizeLayerOpacities(preset.layerOpacities)
    }
  }

  // Ingebouwde presets leveren alleen migratie-fallbacks. Een bestaande preset
  // blijft van de gebruiker: verwijderde lagen mogen bij herstart of cloud-sync
  // niet stilletjes uit de ingebouwde definitie worden teruggezet.
  const configuredLayers = (preset.layers ?? builtInPreset.layers).map(migrateFranceLayerName)

  let layerStates = normalizeLayerStates(preset.layerStates)
  const layerOpacities = normalizeLayerOpacities(preset.layerOpacities ?? builtInPreset.layerOpacities)

  // Monumenten en Romeinse wegen zijn in alle Nederlandse standaardpresets
  // altijd zichtbaar, ook in een eerder opgeslagen versie.
  if (ALWAYS_VISIBLE_PRESET_IDS.has(preset.id)) {
    for (const [name, fallbackOpacity] of [['AMK Monumenten', 0.6], ['Romeinse wegen (regio)', 1]] as const) {
      if (!configuredLayers.includes(name)) configuredLayers.push(name)
      const opacity = layerStates?.[name]?.opacity ?? layerOpacities?.[name] ?? fallbackOpacity
      if (layerStates) layerStates = { ...layerStates, [name]: { visible: true, opacity } }
      if (layerOpacities) layerOpacities[name] = opacity
    }
  }

  // Houd de LiDAR-laag vast in Detectie, ook als een oudere opgeslagen preset
  // deze expliciet had uitgezet. De bestaande transparantie blijft behouden.
  if (preset.id === 'detectie-uitgebreid') {
    const lidarLayer = 'AHN4 Multi-Hillshade NL'
    if (!configuredLayers.includes(lidarLayer)) configuredLayers.push(lidarLayer)
    const lidarOpacity = layerStates?.[lidarLayer]?.opacity ?? layerOpacities?.[lidarLayer] ?? 0.2
    layerStates = {
      ...layerStates,
      [lidarLayer]: { visible: true, opacity: lidarOpacity }
    }
    if (layerOpacities) layerOpacities[lidarLayer] = lidarOpacity
  }

  return {
    ...builtInPreset,
    ...preset,
    layers: configuredLayers.filter((layer) => !REMOVED_LAYERS.has(layer)),
    baseLayer: migrateLegacyBaseLayer(preset.baseLayer ?? builtInPreset.baseLayer),
    layerStates,
    layerOpacities,
    mapView: preset.mapView === undefined ? builtInPreset.mapView : preset.mapView
  }
}

export function normalizePresetCollection(presets: Preset[]): Preset[] {
  const builtInIds = new Set(BUILT_IN_PRESETS.map(preset => preset.id))
  const custom = presets
    .filter(preset => !builtInIds.has(preset.id) && !LEGACY_STANDARD_PRESET_IDS.has(preset.id))
    .map(normalizePreset)

  const saved = new Map(presets.map(preset => [preset.id, preset]))
  return [...BUILT_IN_PRESETS.map(preset => normalizePreset(saved.get(preset.id) ?? preset)), ...custom]
}

function isOverlayLayer(layerName: string): boolean {
  return !BASE_LAYER_NAMES.includes(layerName)
}

export function applyPresetSnapshot(rawPreset: Preset) {
  const preset = normalizePreset(rawPreset)
  const layerStore = useLayerStore.getState()
  const currentBaseLayer = BASE_LAYER_NAMES.find((layerName) => layerStore.visible[layerName])
  const nextBaseLayer = BASE_LAYER_NAMES.includes(preset.baseLayer || '')
    ? preset.baseLayer!
    : currentBaseLayer || 'Esri (licht)'

  const overlayNames = [...new Set([...Object.keys(layerStore.visible), ...preset.layers, ...Object.keys(preset.layerStates ?? {})])]
  overlayNames.filter(isOverlayLayer)
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
  layerStore.setLayerOpacity(nextBaseLayer, preset.baseOpacity ?? 1)
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
    baseOpacity: layerStore.opacity[activeBaseLayer || 'Esri (licht)'] ?? 1,
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
  // Deze lagen hebben een eigen factory. Leg de keuze vóór het laden vast,
  // zodat een latere preset of handmatig uitzetten de lopende aanvraag wint.
  layerStore.setLayerVisibility(layerName, true, false)
  const registeredLayer = layerStore.layers[layerName]
  if (registeredLayer) {
    layerStore.setLayerStatus(layerName, 'loaded')
    layerStore.setLayerVisibility(layerName, true)
    return true
  }

  const map = useMapStore.getState().map
  if (!map) return true

  void import('../layers/franceResearchOL').then(({ FRANCE_RESEARCH_FACTORIES }) => {
    const latestStore = useLayerStore.getState()
    if (!latestStore.visible[layerName]) return
    if (latestStore.layers[layerName]) {
      return
    }

    const factory = FRANCE_RESEARCH_FACTORIES[layerName]
    if (!factory) {
      latestStore.setLayerStatus(layerName, 'error')
      return
    }

    try {
      latestStore.setLayerStatus(layerName, 'loading')
      const layer = factory()
      map.addLayer(layer)
      latestStore.registerLayer(layerName, layer)
      latestStore.setLayerStatus(layerName, 'loaded')
    } catch (error) {
      latestStore.setLayerStatus(layerName, 'error')
      console.error(`Frankrijk-laag kon niet worden geladen: ${layerName}`, error)
    }
  }).catch(error => {
    useLayerStore.getState().setLayerStatus(layerName, 'error')
    console.error(`Frankrijk-laag kon niet worden geladen: ${layerName}`, error)
  })

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
        applyPresetSnapshot(rawPreset)
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
        const { customDefaults, presets } = get()
        const defaults = normalizePresetCollection(customDefaults || BUILT_IN_PRESETS)
        set({ presets: [...defaults.filter(p => p.isBuiltIn), ...presets.filter(p => !p.isBuiltIn)], updatedAt: Date.now() })
      },

      resetToBuiltIn: () => {
        set({ presets: [...BUILT_IN_PRESETS, ...get().presets.filter(p => !p.isBuiltIn)], customDefaults: null, updatedAt: Date.now() })
      }
    }),
    {
      name: 'detectorapp-presets',
      storage: createJSONStorage(() => accountStorage),
      version: 33,
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
