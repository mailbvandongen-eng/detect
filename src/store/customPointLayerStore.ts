import { independentPointLayers, mergePrivatePointLayers } from '../utils/independentLayers'
import { useSettingsStore } from './settingsStore'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { accountStorage } from '../utils/accountStorage'
import {
  POINT_LAYER_CLEANUP_VERSION,
  reconcilePointLayerDeletions,
} from '../utils/pointLayerCleanup'
import { auth } from '../lib/firebase'
import { enqueueBuddyWrite, useBuddyWriteStore } from './buddyWriteStore'
import { accountSession } from '../utils/accountStorage'
import type { BuddyMutation } from '../utils/buddyWrites'

function queueBuddyEdit(layer: CustomPointLayer, mutation: BuddyMutation, snapshot?: CustomPoint): boolean {
  const uid=auth.currentUser?.uid
  if(!uid || !accountSession(uid)()) {
    useBuddyWriteStore.setState({storageError:'Wacht tot je Google-account geladen is voordat je een gedeelde laag bewerkt.'})
    return false
  }
  return enqueueBuddyWrite(uid,layer,mutation,snapshot)
}

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
  pendingUpload?: boolean    // Full photo stays local until upload is acknowledged
  imageUrl?: string
  uploadOwnerUid?: string
  uploadError?: string
  uploadRetryable?: boolean
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
  originalImportName?: string
  // Handmatige punten die logisch bij een geïmporteerde laag horen.
  // De zware importgeometrie blijft lokaal; deze punten blijven cloud-synchroniseerbaar.
  linkedImportedLayerId?: string
  linkedImportedLayerHash?: string
  shareId?: string
  shareOwnerUid?: string
  shareOwnerEmail?: string
  sharePermission?: 'read' | 'edit'
  // Echte gezamenlijke buddy-laag. Staat los van geïmporteerde-laagdeling.
  buddyLayerId?: string
  buddyOwnerUid?: string
  buddyOwnerEmail?: string
  buddyRole?: 'owner' | 'edit' | 'read'
  buddyMemberEmails?: string[]
  buddyEditEmails?: string[]
  buddyReadEmails?: string[]
}

interface CustomPointLayerStore {
  layers: CustomPointLayer[]
  colorIndex: number
  deletedLayerIds: string[]
  layerCleanupVersion: number
  recoveredLegacyShareIds: string[]

  // Layer operations
  addLayer: (name: string, categories?: string[]) => string
  removeLayer: (id: string) => void
  mergePrivateLayers: (sourceId: string, targetId: string) => void
  updateLayer: (id: string, updates: Partial<Omit<CustomPointLayer, 'id' | 'points' | 'createdAt'>>) => void
  toggleVisibility: (id: string) => void
  toggleArchived: (id: string) => void

  // Point operations
  addPoint: (layerId: string, point: Omit<CustomPoint, 'id' | 'createdAt' | 'status'> & { status?: PointStatus }) => boolean
  removePoint: (layerId: string, pointId: string) => void
  updatePoint: (layerId: string, pointId: string, updates: Partial<Omit<CustomPoint, 'id' | 'createdAt'>>) => boolean
  setPointStatus: (layerId: string, pointId: string, status: PointStatus) => void

  // Category operations
  addCategory: (layerId: string, category: string) => void
  removeCategory: (layerId: string, category: string) => void

  // Photo operations
  addPhotoToPoint: (layerId: string, pointId: string, photo: PhotoData) => boolean
  removePhotoFromPoint: (layerId: string, pointId: string, photoId: string) => void
  updatePhotoInPoint: (layerId: string, pointId: string, photoId: string, updates: Partial<PhotoData>) => boolean

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
      recoveredLegacyShareIds: [],
      deletedLayerIds: [],
      layerCleanupVersion: POINT_LAYER_CLEANUP_VERSION,

      addLayer: (name, categories = DEFAULT_CATEGORIES) => {
        const id = crypto.randomUUID()
        const color = { blue: '#2563eb', forest: '#2d7a57', earth: '#a5693d', purple: '#7c5ac7' }[useSettingsStore.getState().uiTheme]

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

      removeLayer: (id) => {
        const layer = get().layers.find(l => l.id === id)
        if (layer?.buddyLayerId) {
          if (layer.buddyRole !== 'owner' || !auth.currentUser) return
          if (!queueBuddyEdit(layer, {kind:'deleteLayer'})) return
        }
        set(state => ({
          layers: state.layers.filter(l => l.id !== id),
          deletedLayerIds: layer?.buddyLayerId || state.deletedLayerIds.includes(id)
            ? state.deletedLayerIds
            : [...state.deletedLayerIds, id],
        }))
      },

      mergePrivateLayers: (sourceId, targetId) => {
        set(state => {
          const layers = mergePrivatePointLayers(state.layers, sourceId, targetId, () => crypto.randomUUID())
          if (layers === state.layers) return state
          return { layers, deletedLayerIds: [...new Set([...state.deletedLayerIds, sourceId])] }
        })
      },

      updateLayer: (id, updates) => {
        const layer = get().layers.find(l => l.id === id)
        if (layer?.buddyLayerId && layer.buddyRole !== 'owner') {
          const { name: _name, color: _color, ...localOnly } = updates
          updates = localOnly
        }
        if(layer?.buddyLayerId && layer.buddyRole==='owner') {
          const fields: {name?:string;color?:string}={}
          if(typeof updates.name==='string' && updates.name!==layer.name)fields.name=updates.name.trim()
          if(typeof updates.color==='string' && updates.color!==layer.color)fields.color=updates.color
          if(Object.keys(fields).length && !queueBuddyEdit(layer,{kind:'metadata',fields}))return
        }
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
        const layer = get().layers.find(l => l.id === layerId)
        if (!layer || layer.buddyRole === 'read') return false
        const newPoint: CustomPoint = {
          ...point,
          status: point.status || 'todo',
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        }

        if(layer?.buddyLayerId && !queueBuddyEdit(layer,{kind:'create',point:newPoint}))return false
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? { ...l, points: [...l.points, newPoint] }
              : l
          )
        }))
        return true
      },

      removePoint: (layerId, pointId) => {
        const layer = get().layers.find(l => l.id === layerId)
        if (layer?.buddyLayerId && layer.buddyRole === 'read') return
        if(layer?.buddyLayerId && !queueBuddyEdit(layer,{kind:'delete',pointId},layer.points.find(point=>point.id===pointId)))return
        set(state => ({
          layers: state.layers.map(l =>
            l.id === layerId
              ? { ...l, points: l.points.filter(p => p.id !== pointId) }
              : l
          )
        }))

      },

      updatePoint: (layerId, pointId, updates) => {
        const layer = get().layers.find(l => l.id === layerId)
        if (!layer || layer.buddyRole === 'read') return false
        const original=layer?.points.find(point=>point.id===pointId)
        if(!original)return false
        const fields=Object.fromEntries(Object.entries(updates).filter(([key,value])=>JSON.stringify(original[key as keyof CustomPoint])!==JSON.stringify(value)))
        if(!Object.keys(fields).length)return true
        if(layer?.buddyLayerId && !queueBuddyEdit(layer,{kind:'patch',pointId,fields}, {...original,...fields}))return false
        set(state => ({
          layers: state.layers.map(l => {
            if (l.id !== layerId) return l
            const points = l.points.map(p => {
              if (p.id !== pointId) return p
              return { ...p, ...fields }
            })
            return { ...l, points }
          })
        }))
        return true
      },

      setPointStatus: (layerId, pointId, status) => {
        get().updatePoint(layerId,pointId,{status})
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
        const layer=get().layers.find(item=>item.id===layerId)
        const point=layer?.points.find(item=>item.id===pointId)
        if(!layer || !point || layer.buddyRole==='read' || point.photos?.some(item=>item.id===photo.id) || (point.photos?.length || 0)>=5)return false
        const snapshot={...point,photos:[...(point.photos || []),photo]}
        if(layer.buddyLayerId && !queueBuddyEdit(layer,{kind:'photo',pointId,action:'add',photoId:photo.id,photo},snapshot))return false
        if (!layer.buddyLayerId) {
          try {
            const state = get()
            const next = { ...state, layers: state.layers.filter(item=>!item.buddyLayerId).map(item=>item.id===layerId?{...item,points:item.points.map(value=>value.id===pointId?snapshot:value)}:item) }
            accountStorage.setItem('detectorapp-custom-point-layers', JSON.stringify({ state: next, version: 7 }))
          } catch { return false }
        }
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
        return true
      },

      removePhotoFromPoint: (layerId, pointId, photoId) => {
        const layer=get().layers.find(item=>item.id===layerId)
        const point=layer?.points.find(item=>item.id===pointId)
        if(!layer || !point || layer.buddyRole==='read')return
        const snapshot={...point,photos:(point.photos || []).filter(item=>item.id!==photoId)}
        if(layer.buddyLayerId && !queueBuddyEdit(layer,{kind:'photo',pointId,action:'remove',photoId},snapshot))return
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
        const layer=get().layers.find(item=>item.id===layerId)
        const point=layer?.points.find(item=>item.id===pointId)
        if(!layer || !point || !point.photos?.some(photo=>photo.id===photoId) || layer.buddyRole==='read')return false
        const snapshot={...point,photos:(point.photos || []).map(item=>item.id===photoId?{...item,...updates}:item)}
        if(layer.buddyLayerId && !queueBuddyEdit(layer,{kind:'photo',pointId,action:'update',photoId,fields:updates},snapshot))return false
        if (!layer.buddyLayerId) {
          // Commit before changing memory: quota failures must never acknowledge
          // an upload whose URL would disappear on the next reload.
          try {
            const state = get()
            const next = { ...state, layers: state.layers.filter(item=>!item.buddyLayerId).map(item=>item.id===layerId?{...item,points:item.points.map(value=>value.id===pointId?snapshot:value)}:item) }
            accountStorage.setItem('detectorapp-custom-point-layers', JSON.stringify({ state: next, version: 7 }))
          } catch { return false }
        }
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
        return true
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
      storage: createJSONStorage(() => accountStorage),
      version: 7,
      partialize: (state) => ({
        ...state,
        layers: state.layers.filter(layer => !layer.buddyLayerId),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const reconciled = reconcilePointLayerDeletions(
            state.layers || [],
            state.deletedLayerIds || [],
            state.layerCleanupVersion || 0
          )
          state.layers = independentPointLayers(reconciled.layers)
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
          layers: independentPointLayers(reconciled.layers),
          deletedLayerIds: reconciled.deletedLayerIds,
          layerCleanupVersion: reconciled.cleanupVersion,
          recoveredLegacyShareIds: state.recoveredLegacyShareIds || [],
          colorIndex: typeof state.colorIndex === 'number' ? state.colorIndex : 0,
        }
      }
    }
  )
)
