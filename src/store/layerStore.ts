import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Layer } from 'ol/layer'
import { createDefaultVisibilityState, DEFAULT_OPACITY_BY_LAYER } from '../layers/layerConfig'
import { layerRegistry } from '../layers/layerRegistry'
import { useMapStore } from './mapStore'

export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error'

interface LayerState {
  visible: Record<string, boolean>
  opacity: Record<string, number>
  loadingState: Record<string, LoadingState>
  layers: Record<string, Layer>
  toggleLayer: (name: string) => void
  setLayerVisibility: (name: string, visible: boolean) => void
  setLayerOpacity: (name: string, opacity: number) => void
  registerLayer: (name: string, layer: Layer) => void
  unregisterLayer: (name: string) => void
  loadLayer: (name: string) => Promise<void>
}

export const useLayerStore = create<LayerState>()(
  immer((set, get) => ({
    visible: createDefaultVisibilityState(),
    opacity: { ...DEFAULT_OPACITY_BY_LAYER },
    loadingState: {},
    layers: {},

    toggleLayer: (name: string) => {
      const state = get()
      const newVisible = !state.visible[name]

      set(current => {
        current.visible[name] = newVisible
      })

      if (newVisible && !state.layers[name]) {
        void get().loadLayer(name)
      } else if (state.layers[name]) {
        state.layers[name].setVisible(newVisible)
      }
    },

    setLayerVisibility: (name: string, visible: boolean) => {
      const state = get()

      set(current => {
        current.visible[name] = visible
        const layer = current.layers[name]
        if (layer) {
          layer.setVisible(visible)
        }
      })

      if (visible && !state.layers[name]) {
        void get().loadLayer(name)
      }
    },

    setLayerOpacity: (name: string, opacity: number) => {
      set(state => {
        state.opacity[name] = opacity
        const layer = state.layers[name]
        if (layer) {
          layer.setOpacity(opacity)
        }
      })
    },

    registerLayer: (name: string, layer: Layer) => {
      set(state => {
        state.layers[name] = layer
        state.loadingState[name] = 'loaded'
        if (state.visible[name] !== undefined) {
          layer.setVisible(state.visible[name])
        }
        if (state.opacity[name] !== undefined) {
          layer.setOpacity(state.opacity[name])
        }
      })
    },

    unregisterLayer: (name: string) => {
      set(state => {
        delete state.layers[name]
        delete state.loadingState[name]
      })
    },

    loadLayer: async (name: string) => {
      const state = get()
      const layerDef = layerRegistry[name]
      if (!layerDef) {
        console.warn(`Layer "${name}" not found in registry`)
        return
      }

      if (state.loadingState[name] === 'loading') return
      if (state.layers[name]) return

      const mapState = useMapStore.getState()
      if (!mapState.map) {
        console.warn(`Cannot load layer "${name}": map not initialized`)
        return
      }

      set(current => {
        current.loadingState[name] = 'loading'
      })

      try {
        const layer = await layerDef.factory()
        if (!layer) {
          throw new Error('Factory returned null')
        }

        const currentState = get()
        const olLayer = layer as Layer
        olLayer.setVisible(currentState.visible[name] ?? false)
        if (currentState.opacity[name] !== undefined) {
          olLayer.setOpacity(currentState.opacity[name])
        }

        mapState.map.addLayer(olLayer)

        set(current => {
          current.layers[name] = olLayer
          current.loadingState[name] = 'loaded'
        })
      } catch (error) {
        console.error(`Failed to load layer "${name}":`, error)
        set(current => {
          current.loadingState[name] = 'error'
        })
      }
    }
  }))
)
