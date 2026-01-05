import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export interface CustomPoint {
  id: string
  name: string
  category: string
  notes: string
  url?: string
  coordinates: [number, number] // [lon, lat] WGS84
  createdAt: string
}

export interface CustomPointLayer {
  id: string
  name: string
  color: string
  categories: string[]
  points: CustomPoint[]
  visible: boolean
  createdAt: string
}

interface CustomPointLayerStore {
  layers: CustomPointLayer[]
  colorIndex: number

  // Layer operations
  addLayer: (name: string, categories?: string[]) => string
  removeLayer: (id: string) => void
  updateLayer: (id: string, updates: Partial<Omit<CustomPointLayer, 'id' | 'points' | 'createdAt'>>) => void
  toggleVisibility: (id: string) => void

  // Point operations
  addPoint: (layerId: string, point: Omit<CustomPoint, 'id' | 'createdAt'>) => void
  removePoint: (layerId: string, pointId: string) => void
  updatePoint: (layerId: string, pointId: string, updates: Partial<Omit<CustomPoint, 'id' | 'createdAt'>>) => void

  // Category operations
  addCategory: (layerId: string, category: string) => void
  removeCategory: (layerId: string, category: string) => void

  // Export/Import
  exportLayerAsGeoJSON: (id: string) => void
  importLayerFromGeoJSON: (geojson: string) => { success: boolean; error?: string; layerId?: string }

  // Utility
  getLayer: (id: string) => CustomPointLayer | undefined
  clearAll: () => void
}

export const useCustomPointLayerStore = create<CustomPointLayerStore>()(
  persist(
    (set, get) => ({
      layers: [],
      colorIndex: 0,

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
              createdAt: new Date().toISOString()
            }
          ],
          colorIndex: state.colorIndex + 1
        }))

        return id
      },

      removeLayer: (id) => {
        set(state => ({
          layers: state.layers.filter(l => l.id !== id)
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

      addPoint: (layerId, point) => {
        const newPoint: CustomPoint = {
          ...point,
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
              url: point.url,
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
              url: f.properties?.url,
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

      clearAll: () => {
        set({ layers: [], colorIndex: 0 })
      }
    }),
    {
      name: 'detectorapp-custom-point-layers'
    }
  )
)
