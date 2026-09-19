import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  POINT_LAYER_CLEANUP_VERSION,
  reconcilePointLayerDeletions,
} from '../utils/pointLayerCleanup'

// Color cycle for new layers
const LAYER_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
]

// Default categories for new layers
export const DEFAULT_CATEGORIES = [
  'Mineraal',
  'Fossiel',
  'Erfgoed',
  'Monument',
  'Overig'
]

// Legacy ID: blijft alleen bestaan om oude vondstvelden correct te lezen.
export const DEFAULT_VONDSTEN_LAYER_ID = 'default-vondsten'

export type PointStatus = 'todo' | 'completed' | 'skipped'

// Photo data for custom points
export interface PhotoData {
  id: string
  thumbnailUrl?: string      // Firebase Storage URL (when uploaded)
  thumbnailBase64?: string   // Local base64 fallback (offline/before upload)
  createdAt: string
  pendingUpload?: boolean    // True when offline, needs sync
}

// Geometry types for storing complex shapes
export type GeometryType = 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'

export interface FeatureGeometry {
  type: GeometryType
  coordinates: number[] | number[][] | number[][][] | number[][][][]
}

export interface CustomPoint {
  id: string
  name: string
  category: string
  notes: string
  phone?: string
  url?: string
  coordinates: [number, number] // [lon, lat] WGS84 - center point for display
  createdAt: string
  // POI management fields
  status: PointStatus
  sourceLayer?: string   // e.g., "AMK Monumenten", "Bunkers"
  sourceId?: string      // original feature ID from source layer
  // Photo support
  photos?: PhotoData[]
  // Full geometry support (for polygons, lines, etc.)
  geometry?: FeatureGeometry  // Full geometry if not just a point
  // Original properties from source feature
  sourceProperties?: Record<string, unknown>
  // HTML content for popup display
  popupContent?: string
  // Route linking v2.28.0
  routeId?: string       // ID of active route when point was created
  routeName?: string     // Name of the route (for display)
}

export interface CustomPointLayer {
  id: string
  name: string
  color: string
  categories: string[]
  points: CustomPoint[]
  visible: boolean
  archived: boolean
  createdAt: string
  // Handmatige punten die logisch bij een geïmporteerde laag horen.
  // De zware importgeometrie blijft lokaal; deze punten blijven cloud-synchroniseerbaar.
  linkedImportedLayerId?: string
  linkedImportedLayerHash?: string
  shareId?: string
  shareOwnerUid?: string
  shareOwnerEmail?: string
  sharePermission?: 'read' | 'edit'
}

interface CustomPointLayerStore {
  layers: CustomPointLayer[]
  colorIndex: number
  deletedLayerIds: string[]
  layerCleanupVersion: number

  // Layer operations
  addLayer: (name: string, categories?: string[]) => string
  ensureImportedLayerOverlay: (importedLayerId: string, importedLayerHash: string | undefined, name: string, color: string) => string
  removeLayer: (id: string) => void
  updateLayer: (id: string, updates: Partial<Omit<CustomPointLayer, 'id' | 'points' | 'createdAt'>>) => void
  toggleVisibility: (id: string) => void
  toggleArchived: (id: string) => void

  // Point operations
  addPoint: (layerId: string, point: Omit<CustomPoint, 'id' | 'createdAt' | 'status'> & { status?: PointStatus }) => void
  removePoint: (layerId: string, pointId: string) => void
  updatePoint: (layerId: string, pointId: string, updates: Partial<Omit<CustomPoint, 'id' | 'createdAt'>>) => void
  setPointStatus: (layerId: string, pointId: string, status: PointStatus) => void

  // Category operations
  addCategory: (layerId: string, category: string) => void
  removeCategory: (layerId: string, category: string) => void

  // Photo operations
  addPhotoToPoint: (layerId: string, pointId: string, photo: PhotoData) => void
  removePhotoFromPoint: (layerId: string, pointId: string, photoId: string) => void
  updatePhotoInPoint: (layerId: string, pointId: string, photoId: string, updates: Partial<PhotoData>) => void

  // Export/Import
  exportLayerAsGeoJSON: (id: string) => void
  importLayerFromGeoJSON: (geojson: string) => { success: boolean; error?: string; layerId?: string }

  // Utility
  getLayer: (id: string) => CustomPointLayer | undefined
  getActiveLayerCount: () => number
  getArchivedLayerCount: () => number
  clearAll: () => void
}

export const useCustomPointLayerStore = create<CustomPointLayerStore>()(
  persist(
    (set, get) => ({
      layers: [],
      colorIndex: 0,
      deletedLayerIds: [],
      layerCleanupVersion: POINT_LAYER_CLEANUP_VERSION,

      addLayer: (name, categories = DEFAULT_CATEGORIES) => {
        const id = crypto.randomUUID()
        const color = LAYER_COLORS[get().colorIndex % LAYER_COLORS.length]

        set(state => ({
          layers: [
            ...state.layers,
            {
              id,
              name,
              color,
              categories: [...categories],
              points: [],
              visible: true,
              archived: false,
              createdAt: new Date().toISOString()
            }
          ],
          colorIndex: state.colorIndex + 1
        }))

        return id
      },

      ensureImportedLayerOverlay: (importedLayerId, importedLayerHash, name, color) => {
        const existing = get().layers.find(layer =>
          layer.linkedImportedLayerId === importedLayerId ||
          (!!importedLayerHash && layer.linkedImportedLayerHash === importedLayerHash)
        )
        if (existing) return existing.id

        const preferredId = `import-overlay-${importedLayerId}`
        const id = get().layers.some(layer => layer.id === preferredId) || get().deletedLayerIds.includes(preferredId)
          ? crypto.randomUUID()
          : preferredId
        set(state => ({
          layers: [
            ...state.layers,
            {
              id,
              name,
              color,
              categories: [],
              points: [],
              visible: true,
              archived: false,
              createdAt: new Date().toISOString(),
              linkedImportedLayerId: importedLayerId,
              linkedImportedLayerHash: importedLayerHash,
            }
          ]
        }))
        return id
      },

      removeLayer: (id) => {
        set(state => ({
          layers: state.layers.filter(l => l.id !== id),
          deletedLayerIds: state.deletedLayerIds.includes(id)
            ? state.deletedLayerIds
            : [...state.deletedLayerIds, id],
        }))
      },

      updateLayer: (id, updates) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === id ? { ...l, ...updates } : l
          )
        }))
      },

      toggleVisibility: (id) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === id ? { ...l, visible: !l.visible } : l
          )
        }))
      },

      toggleArchived: (id) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === id ? { ...l, archived: !l.archived, visible: l.archived ? l.visible : false } : l
          )
        }))
      },

      addPoint: (layerId, point) => {
        const newPoint: CustomPoint = {
          ...point,
          status: point.status || 'todo',
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        }

        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? { ...l, points: [...l.points, newPoint] }
              : l
          )
        }))
      },

      removePoint: (layerId, pointId) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? { ...l, points: l.points.filter(p => p.id !== pointId) }
              : l
          )
        }))
      },

      updatePoint: (layerId, pointId, updates) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? {
                  ...l,
                  points: l.points.map(p =>
                    p.id === pointId ? { ...p, ...updates } : p
                  )
                }
              : l
          )
        }))
      },

      setPointStatus: (layerId, pointId, status) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? {
                  ...l,
                  points: l.points.map(p =>
                    p.id === pointId ? { ...p, status } : p
                  )
                }
              : l
          )
        }))
      },

      addCategory: (layerId, category) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId && !l.categories.includes(category)
              ? { ...l, categories: [...l.categories, category] }
              : l
          )
        }))
      },

      removeCategory: (layerId, category) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? { ...l, categories: l.categories.filter(c => c !== category) }
              : l
          )
        }))
      },

      addPhotoToPoint: (layerId, pointId, photo) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? {
                  ...l,
                  points: l.points.map(p =>
                    p.id === pointId
                      ? { ...p, photos: [...(p.photos || []), photo] }
                      : p
                  )
                }
              : l
          )
        }))
      },

      removePhotoFromPoint: (layerId, pointId, photoId) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? {
                  ...l,
                  points: l.points.map(p =>
                    p.id === pointId
                      ? { ...p, photos: (p.photos || []).filter(ph => ph.id !== photoId) }
                      : p
                  )
                }
              : l
          )
        }))
      },

      updatePhotoInPoint: (layerId, pointId, photoId, updates) => {
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? {
                  ...l,
                  points: l.points.map(p =>
                    p.id === pointId
                      ? {
                          ...p,
                          photos: (p.photos || []).map(ph =>
                            ph.id === photoId ? { ...ph, ...updates } : ph
                          )
                        }
                      : p
                  )
                }
              : l
          )
        }))
      },

      exportLayerAsGeoJSON: (id) => {
        const layer = get().layers.find(l => l.id === id)
        if (!layer) return

        const geojson = {
          type: 'FeatureCollection',
          properties: {
            name: layer.name,
            color: layer.color,
            categories: layer.categories,
            createdAt: layer.createdAt,
            exportedAt: new Date().toISOString()
          },
          features: layer.points.map(point => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: point.coordinates
            },
            properties: {
              id: point.id,
              name: point.name,
              category: point.category,
              notes: point.notes,
              phone: point.phone,
              url: point.url,
              status: point.status,
              sourceLayer: point.sourceLayer,
              sourceId: point.sourceId,
              photos: point.photos,
              createdAt: point.createdAt
            }
          }))
        }

        const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${layer.name.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.geojson`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      },

      importLayerFromGeoJSON: (geojsonString) => {
        try {
          const geojson = JSON.parse(geojsonString)

          if (geojson.type !== 'FeatureCollection') {
            return { success: false, error: 'Ongeldig GeoJSON formaat' }
          }

          const props = geojson.properties || {}
          const name = props.name || `Geïmporteerd ${new Date().toLocaleDateString('nl-NL')}`
          const categories = props.categories || DEFAULT_CATEGORIES
          const color = props.color || LAYER_COLORS[get().colorIndex % LAYER_COLORS.length]

          const points: CustomPoint[] = (geojson.features || [])
            .filter((f: any) => f.geometry?.type === 'Point')
            .map((f: any) => ({
              id: f.properties?.id || crypto.randomUUID(),
              name: f.properties?.name || 'Naamloos',
              category: f.properties?.category || 'Overig',
              notes: f.properties?.notes || '',
              phone: f.properties?.phone,
              url: f.properties?.url,
              status: f.properties?.status || 'todo',
              sourceLayer: f.properties?.sourceLayer,
              sourceId: f.properties?.sourceId,
              photos: f.properties?.photos,
              coordinates: f.geometry.coordinates as [number, number],
              createdAt: f.properties?.createdAt || new Date().toISOString()
            }))

          const layerId = crypto.randomUUID()

          set(state => ({
            layers: [
              ...state.layers,
              {
                id: layerId,
                name,
                color,
                categories,
                points,
                visible: true,
                archived: false,
                createdAt: new Date().toISOString()
              }
            ],
            colorIndex: state.colorIndex + 1
          }))

          return { success: true, layerId }
        } catch (e) {
          return { success: false, error: 'Fout bij parsen van GeoJSON' }
        }
      },

      getLayer: (id) => {
        return get().layers.find(l => l.id === id)
      },

      getActiveLayerCount: () => {
        return get().layers.filter(l => !l.archived).length
      },

      getArchivedLayerCount: () => {
        return get().layers.filter(l => l.archived).length
      },

      clearAll: () => {
        set(state => ({
          layers: [],
          deletedLayerIds: [...new Set([
            ...state.deletedLayerIds,
            ...state.layers.map(layer => layer.id),
          ])],
          colorIndex: 0
        }))
      }
    }),
    {
      name: 'detectorapp-custom-point-layers',
      version: 5,
      onRehydrateStorage: () => (state) => {
        if (state) {
          const reconciled = reconcilePointLayerDeletions(
            state.layers || [],
            state.deletedLayerIds || [],
            state.layerCleanupVersion || 0
          )
          state.layers = reconciled.layers
          state.deletedLayerIds = reconciled.deletedLayerIds
          state.layerCleanupVersion = reconciled.cleanupVersion
        }
      },
      migrate: (persistedState: unknown) => {
        const state = persistedState as Partial<CustomPointLayerStore>
        const reconciled = reconcilePointLayerDeletions(
          Array.isArray(state.layers) ? state.layers : [],
          Array.isArray(state.deletedLayerIds) ? state.deletedLayerIds : [],
          typeof state.layerCleanupVersion === 'number' ? state.layerCleanupVersion : 0
        )

        return {
          ...state,
          layers: reconciled.layers,
          deletedLayerIds: reconciled.deletedLayerIds,
          layerCleanupVersion: reconciled.cleanupVersion,
          colorIndex: typeof state.colorIndex === 'number' ? state.colorIndex : 0,
        }
      }
    }
  )
)
