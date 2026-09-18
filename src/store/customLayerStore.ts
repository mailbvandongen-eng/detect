import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// GeoJSON types for storage
export interface CustomFeature {
  type: 'Feature'
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'
    coordinates: number[] | number[][] | number[][][] | number[][][][]
  }
  properties: Record<string, unknown>
}

export interface CustomFeatureCollection {
  type: 'FeatureCollection'
  features: CustomFeature[]
}

export type GeometryGroup = 'points' | 'lines' | 'polygons'

export interface PointLayerStyle {
  visible: boolean
  color: string
  radius: number
  outlineColor: string
  outlineWidth: number
  cluster: boolean
  clusterDistance: number
  clusterMaxZoom: number
}

export interface LineLayerStyle {
  visible: boolean
  color: string
  width: number
}

export interface PolygonLayerStyle {
  visible: boolean
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeWidth: number
}

export interface CustomLayerStyle {
  points: PointLayerStyle
  lines: LineLayerStyle
  polygons: PolygonLayerStyle
}

export interface ImportedLayerPopupConfig {
  titleField: string | null
  hiddenFields: string[]
  showTechnicalFields: boolean
}

export interface ImportStyleDefaults {
  points: Omit<PointLayerStyle, 'color'>
  lines: Omit<LineLayerStyle, 'color'>
  polygons: Omit<PolygonLayerStyle, 'fillColor' | 'strokeColor'>
  mixedPolygonsVisible: boolean
  popup: Pick<ImportedLayerPopupConfig, 'showTechnicalFields'>
}

export interface CustomLayer {
  id: string
  name: string
  type: 'geojson' | 'kml' | 'gpx'
  features: CustomFeatureCollection
  visible: boolean
  opacity: number
  color: string // Legacy hoofdkleur; blijft bestaan voor oude imports en exports.
  style: CustomLayerStyle
  popupConfig: ImportedLayerPopupConfig
  createdAt: string
  sourceFileName: string
  contentHash?: string
  shareId?: string
  shareOwnerUid?: string
  shareOwnerEmail?: string
  sharePermission?: 'read' | 'edit'
}

type NewCustomLayer = Omit<CustomLayer, 'id' | 'createdAt' | 'style' | 'popupConfig'> & {
  style?: CustomLayerStyle
  popupConfig?: ImportedLayerPopupConfig
}

interface CustomLayerState {
  layers: CustomLayer[]
  deletedLayerIds: string[]
  importDefaults: ImportStyleDefaults

  addLayer: (layer: NewCustomLayer) => string
  removeLayer: (id: string) => void
  updateLayer: (id: string, updates: Partial<CustomLayer>) => void
  toggleVisibility: (id: string) => void
  setOpacity: (id: string, opacity: number) => void
  setColor: (id: string, color: string) => void
  updateGeometryStyle: (
    id: string,
    group: GeometryGroup,
    updates: Partial<PointLayerStyle | LineLayerStyle | PolygonLayerStyle>
  ) => void
  toggleGeometryVisibility: (id: string, group: GeometryGroup) => void
  updatePopupConfig: (id: string, updates: Partial<ImportedLayerPopupConfig>) => void
  resetLayerStyle: (id: string) => void
  saveLayerStyleAsDefaults: (id: string) => void
  setImportDefaultsFromStyle: (style: CustomLayerStyle, geometryCounts: Record<GeometryGroup, number>) => void
  removeGeometryGroup: (id: string, group: GeometryGroup) => void
  clearAll: () => void
}

// Iedere nieuwe import krijgt een andere hoofdkleur.
export const LAYER_COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
]

export const DEFAULT_IMPORT_STYLE_DEFAULTS: ImportStyleDefaults = {
  points: {
    visible: true,
    radius: 4,
    outlineColor: '#ffffff',
    outlineWidth: 1,
    cluster: false,
    clusterDistance: 36,
    clusterMaxZoom: 12,
  },
  lines: {
    visible: true,
    width: 1.5,
  },
  polygons: {
    visible: true,
    fillOpacity: 0.12,
    strokeWidth: 1.5,
  },
  mixedPolygonsVisible: false,
  popup: {
    showTechnicalFields: false,
  },
}

export function getGeometryGroup(type: CustomFeature['geometry']['type']): GeometryGroup {
  if (type === 'Point' || type === 'MultiPoint') return 'points'
  if (type === 'LineString' || type === 'MultiLineString') return 'lines'
  return 'polygons'
}

export function getGeometryCounts(features: CustomFeatureCollection): Record<GeometryGroup, number> {
  return features.features.reduce<Record<GeometryGroup, number>>((counts, feature) => {
    if (feature.geometry) counts[getGeometryGroup(feature.geometry.type)] += 1
    return counts
  }, { points: 0, lines: 0, polygons: 0 })
}

export function hasMixedPointPolygonGeometry(features: CustomFeatureCollection): boolean {
  const counts = getGeometryCounts(features)
  return counts.points > 0 && counts.polygons > 0
}

export function getImportedPropertyKeys(features: CustomFeatureCollection): string[] {
  const keys = new Set<string>()
  for (const feature of features.features) {
    Object.keys(feature.properties || {}).forEach(key => keys.add(key))
  }
  return [...keys].sort((a, b) => a.localeCompare(b, 'nl', { sensitivity: 'base' }))
}

export function getNextLayerColor(existingCount: number): string {
  return LAYER_COLORS[existingCount % LAYER_COLORS.length]
}

export function createLayerStyle(
  color: string,
  features: CustomFeatureCollection,
  defaults: ImportStyleDefaults = DEFAULT_IMPORT_STYLE_DEFAULTS
): CustomLayerStyle {
  const counts = getGeometryCounts(features)
  const mixedPointPolygon = counts.points > 0 && counts.polygons > 0

  return {
    points: {
      ...defaults.points,
      visible: counts.points > 0 && defaults.points.visible,
      color,
    },
    lines: {
      ...defaults.lines,
      visible: counts.lines > 0 && defaults.lines.visible,
      color,
    },
    polygons: {
      ...defaults.polygons,
      visible: counts.polygons > 0 && (mixedPointPolygon ? defaults.mixedPolygonsVisible : defaults.polygons.visible),
      fillColor: color,
      strokeColor: color,
    },
  }
}

function normalizeStyle(
  layer: Pick<CustomLayer, 'features' | 'color'> & { style?: Partial<CustomLayerStyle> },
  defaults: ImportStyleDefaults
): CustomLayerStyle {
  const fallback = createLayerStyle(layer.color || '#8b5cf6', layer.features, defaults)
  const style = layer.style

  return {
    points: { ...fallback.points, ...(style?.points || {}) },
    lines: { ...fallback.lines, ...(style?.lines || {}) },
    polygons: { ...fallback.polygons, ...(style?.polygons || {}) },
  }
}

function normalizePopupConfig(config?: Partial<ImportedLayerPopupConfig>): ImportedLayerPopupConfig {
  return {
    titleField: typeof config?.titleField === 'string' ? config.titleField : null,
    hiddenFields: Array.isArray(config?.hiddenFields) ? config.hiddenFields : [],
    showTechnicalFields: config?.showTechnicalFields === true,
  }
}

function normalizeLayer(layer: CustomLayer, defaults: ImportStyleDefaults): CustomLayer {
  const color = layer.color || '#8b5cf6'
  return {
    ...layer,
    color,
    visible: layer.visible !== false,
    opacity: typeof layer.opacity === 'number' ? layer.opacity : 1,
    style: normalizeStyle({ ...layer, color }, defaults),
    popupConfig: normalizePopupConfig(layer.popupConfig),
  }
}

function defaultsFromStyle(
  style: CustomLayerStyle,
  current: ImportStyleDefaults,
  geometryCounts: Record<GeometryGroup, number>
): ImportStyleDefaults {
  const mixedGeometry = geometryCounts.points > 0 && geometryCounts.polygons > 0
  return {
    points: geometryCounts.points > 0 ? {
      visible: style.points.visible,
      radius: style.points.radius,
      outlineColor: style.points.outlineColor,
      outlineWidth: style.points.outlineWidth,
      cluster: style.points.cluster,
      clusterDistance: style.points.clusterDistance,
      clusterMaxZoom: style.points.clusterMaxZoom,
    } : current.points,
    lines: geometryCounts.lines > 0 ? {
      visible: style.lines.visible,
      width: style.lines.width,
    } : current.lines,
    polygons: geometryCounts.polygons > 0 ? {
      visible: mixedGeometry ? current.polygons.visible : style.polygons.visible,
      fillOpacity: style.polygons.fillOpacity,
      strokeWidth: style.polygons.strokeWidth,
    } : current.polygons,
    mixedPolygonsVisible: mixedGeometry ? style.polygons.visible : current.mixedPolygonsVisible,
    popup: current.popup,
  }
}

export function migrateCustomLayerState(persistedState: unknown): {
  layers: CustomLayer[]
  importDefaults: ImportStyleDefaults
} & Record<string, unknown> {
  const oldState = (persistedState && typeof persistedState === 'object')
    ? persistedState as Partial<CustomLayerState>
    : {}
  const importDefaults = oldState.importDefaults || DEFAULT_IMPORT_STYLE_DEFAULTS
  const layers = Array.isArray(oldState.layers)
    ? oldState.layers.map(layer => normalizeLayer(layer, importDefaults))
    : []
  const deletedLayerIds = Array.isArray(oldState.deletedLayerIds)
    ? oldState.deletedLayerIds.filter((id): id is string => typeof id === 'string')
    : []

  return { ...oldState, importDefaults, layers, deletedLayerIds }
}

export const useCustomLayerStore = create<CustomLayerState>()(
  persist(
    (set, get) => ({
      layers: [],
      deletedLayerIds: [],
      importDefaults: DEFAULT_IMPORT_STYLE_DEFAULTS,

      addLayer: (layer) => {
        const id = crypto.randomUUID()
        const state = get()
        const color = layer.color || getNextLayerColor(state.layers.length)
        const style = layer.style
          ? normalizeStyle({ ...layer, color, style: layer.style }, state.importDefaults)
          : createLayerStyle(color, layer.features, state.importDefaults)

        set(current => ({
          layers: [
            ...current.layers,
            {
              ...layer,
              id,
              createdAt: new Date().toISOString(),
              color,
              visible: layer.visible ?? true,
              opacity: layer.opacity ?? 1,
              style,
              popupConfig: normalizePopupConfig(layer.popupConfig),
            }
          ]
        }))
        return id
      },

      removeLayer: (id) => set(state => ({
        layers: state.layers.filter(layer => layer.id !== id),
        deletedLayerIds: state.deletedLayerIds.includes(id)
          ? state.deletedLayerIds
          : [...state.deletedLayerIds, id],
      })),

      updateLayer: (id, updates) => set(state => ({
        layers: state.layers.map(layer => layer.id === id ? { ...layer, ...updates } : layer)
      })),

      toggleVisibility: (id) => set(state => ({
        layers: state.layers.map(layer =>
          layer.id === id ? { ...layer, visible: !layer.visible } : layer
        )
      })),

      setOpacity: (id, opacity) => set(state => ({
        layers: state.layers.map(layer => layer.id === id ? { ...layer, opacity } : layer)
      })),

      setColor: (id, color) => set(state => ({
        layers: state.layers.map(layer => layer.id === id ? {
          ...layer,
          color,
          style: {
            points: { ...layer.style.points, color },
            lines: { ...layer.style.lines, color },
            polygons: { ...layer.style.polygons, fillColor: color, strokeColor: color },
          }
        } : layer)
      })),

      updateGeometryStyle: (id, group, updates) => set(state => ({
        layers: state.layers.map(layer => {
          if (layer.id !== id) return layer
          const nextGroupStyle = { ...layer.style[group], ...updates }
          return {
            ...layer,
            style: { ...layer.style, [group]: nextGroupStyle } as CustomLayerStyle,
          }
        })
      })),

      toggleGeometryVisibility: (id, group) => set(state => ({
        layers: state.layers.map(layer => {
          if (layer.id !== id) return layer
          const groupStyle = layer.style[group]
          return {
            ...layer,
            style: {
              ...layer.style,
              [group]: { ...groupStyle, visible: !groupStyle.visible },
            } as CustomLayerStyle,
          }
        })
      })),

      updatePopupConfig: (id, updates) => set(state => ({
        layers: state.layers.map(layer => layer.id === id ? {
          ...layer,
          popupConfig: normalizePopupConfig({ ...layer.popupConfig, ...updates }),
        } : layer)
      })),

      resetLayerStyle: (id) => set(state => ({
        layers: state.layers.map(layer => layer.id === id ? {
          ...layer,
          style: createLayerStyle(layer.color, layer.features, state.importDefaults),
          popupConfig: normalizePopupConfig({
            showTechnicalFields: state.importDefaults.popup.showTechnicalFields,
          }),
        } : layer)
      })),

      saveLayerStyleAsDefaults: (id) => set(state => {
        const layer = state.layers.find(item => item.id === id)
        if (!layer) return state
        const styleDefaults = defaultsFromStyle(
          layer.style,
          state.importDefaults,
          getGeometryCounts(layer.features)
        )
        return {
          importDefaults: {
            ...styleDefaults,
            popup: { showTechnicalFields: layer.popupConfig.showTechnicalFields },
          }
        }
      }),

      setImportDefaultsFromStyle: (style, geometryCounts) => set(state => ({
        importDefaults: defaultsFromStyle(style, state.importDefaults, geometryCounts)
      })),

      removeGeometryGroup: (id, group) => set(state => ({
        layers: state.layers.map(layer => {
          if (layer.id !== id) return layer
          return {
            ...layer,
            features: {
              ...layer.features,
              features: layer.features.features.filter(feature => getGeometryGroup(feature.geometry.type) !== group),
            },
          }
        })
      })),

      clearAll: () => set(state => ({
        layers: [],
        deletedLayerIds: [...new Set([...state.deletedLayerIds, ...state.layers.map(layer => layer.id)])],
      })),
    }),
    {
      name: 'detectorapp-custom-layers',
      version: 3,
      migrate: migrateCustomLayerState,
    }
  )
)
