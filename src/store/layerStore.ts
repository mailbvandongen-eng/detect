import { NAPOLEON_LOT_LAYER } from '../data/lotCadastreArchives'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Layer } from 'ol/layer'
import { layerRegistry } from '../layers/layerRegistry'
import { THEDIRAC_RESEARCH_LAYER_NAME } from '../data/thediracResearchSites'
import { THEDIRAC_CONTEXT_LAYER_NAME } from '../data/thediracLandscapeContext'
import { THEDIRAC_SIGHTS_LAYER_NAME } from '../data/thediracSights'
import { useMapStore } from './mapStore'
import { FRANCE_RESEARCH_LAYER_DEFINITIONS } from '../config/franceResearchLayers'
import { getStackZIndex } from '../config/layerOrder'

export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error'

interface LayerState {
  visible: Record<string, boolean>
  opacity: Record<string, number>
  loadingState: Record<string, LoadingState>
  layers: Record<string, Layer>
  toggleLayer: (name: string) => void
  setLayerVisibility: (name: string, visible: boolean, loadIfNeeded?: boolean) => void
  setLayerStatus: (name: string, status: LoadingState) => void
  setLayerOpacity: (name: string, opacity: number) => void
  registerLayer: (name: string, layer: Layer) => void
  unregisterLayer: (name: string) => void
  loadLayer: (name: string) => Promise<void>
}

/**
 * Beginstand van alle lagen. Wordt opgebouwd uit het laagregister en de
 * Frankrijk-definities, zodat een nieuwe laag hier niet met de hand bij hoeft.
 */
export function buildDefaultVisibility(): Record<string, boolean> {
  const visible: Record<string, boolean> = {
    'Esri (licht)': true,
    'OpenStreetMap': false,
    'Luchtfoto': false,
    'Satelliet (wereld)': false,
    'Labels Overlay': true,
  }
  for (const name of Object.keys(layerRegistry)) visible[name] = false
  for (const { name } of FRANCE_RESEARCH_LAYER_DEFINITIONS) visible[name] = false
  for (const name of [NAPOLEON_LOT_LAYER, THEDIRAC_RESEARCH_LAYER_NAME, THEDIRAC_CONTEXT_LAYER_NAME, THEDIRAC_SIGHTS_LAYER_NAME]) visible[name] = false
  visible['Mijn Vondsten'] = true
  return visible
}

export const useLayerStore = create<LayerState>()(
  immer((set, get) => ({
    visible: buildDefaultVisibility(),

    opacity: {
      'AHN4 Hoogtekaart Kleur': 0.85,
      'AHN4 Hillshade NL': 0.7,
      'AHN4 Multi-Hillshade NL': 0.7,
      'AHN4 Hillshade Kleur': 0.8,
      'AHN 0.5m': 0.7,
      'TMK 1850': 0.8,
      'Bonnebladen 1900': 0.8,
      'Geomorfologie': 0.5,
      'Bodemkaart': 0.6,
      'Veengebieden': 0.6,
      'IKAW': 0.5,
      'FAMKE Steentijd': 0.6,
      'FAMKE IJzertijd': 0.6,
      'Essen': 0.6,
      'Terpen': 0.7,
      'AMK Monumenten': 0.45,
      'AMK Romeins': 0.6,
      'AMK Steentijd': 0.6,
      'AMK Vroege ME': 0.6,
      'AMK Late ME': 0.6,
      'AMK Overig': 0.6,
      'Paleokaart 9000 v.Chr.': 0.7,
      'Paleokaart 5500 v.Chr.': 0.7,
      'Paleokaart 2750 v.Chr.': 0.7,
      'Paleokaart 1500 v.Chr.': 0.7,
      'Paleokaart 500 v.Chr.': 0.7,
      'Paleokaart 100 n.Chr.': 0.7,
      'Paleokaart 800 n.Chr.': 0.7,
      'Verdedigingslinies': 0.7,
      'Inundatiegebieden': 0.5,
      'Militaire Objecten': 0.8,
      'Religieus Erfgoed': 0.8,
      'Gewaspercelen': 0.6,
      'Kadastrale Grenzen': 0.7,
      'Erfgoedlijnen': 0.7,
      'Oude Kernen': 0.6,
      'Relictenkaart Vlakken': 0.5,
      'Luchtfoto · 1950–1965': 1,
      'IGN-kaart · 1950': 1,
      'État-major · 1820–1866': 1,
      [NAPOLEON_LOT_LAYER]: 1,
      'Carte de Cassini · 18e eeuw': 0.8,
      'LiDAR HD terrein FR': 0.78,
      'Bodem/geologie 1:50.000 FR': 0.68,
      'Geologie + reliëf FR': 0.66,
      'BRGM boringen · BSS': 1,
      'BRGM IDPR · infiltratie/afstroming': 0.55,
      'BRGM cavités · ondergrondse holtes': 1,
      'Waterlopen BD TOPAGE 2026': 0.9,
      'OCS GE landbedekking 2021-2023': 0.62,
      'Oude bossen · Forêts anciennes': 0.72,
      [THEDIRAC_RESEARCH_LAYER_NAME]: 1,
      [THEDIRAC_CONTEXT_LAYER_NAME]: 1,
      [THEDIRAC_SIGHTS_LAYER_NAME]: 1,
      'Sites Classés Bretagne': 0.5,
      'Sites Classés Normandie': 0.5,
      'Sites Classés Hauts-de-France': 0.5,
      'Sites Classés Grand Est': 0.5,
      'Sites Classés Île-de-France': 0.5,
      'Sites Classés Centre-Val de Loire': 0.5,
      'Sites Classés Bourgogne-FC': 0.5,
      'Sites Classés Pays de la Loire': 0.5,
      'Sites Classés Nouvelle-Aquitaine': 0.5,
      'Sites Classés Auvergne-RA': 0.5,
      'Sites Classés Occitanie': 0.5,
      'Sites Classés PACA': 0.5,
      'Sites Classés Corse': 0.5
    },

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

    setLayerVisibility: (name: string, visible: boolean, loadIfNeeded = true) => {
      const state = get()

      set(current => {
        current.visible[name] = visible
        const layer = current.layers[name]
        if (layer) {
          layer.setVisible(visible)
        }
      })

      if (loadIfNeeded && visible && !state.layers[name]) {
        void get().loadLayer(name)
      }
    },

    setLayerStatus: (name: string, status: LoadingState) => {
      set(state => {
        state.loadingState[name] = status
      })
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
      const stackZ = getStackZIndex(name)
      if (stackZ !== undefined) layer.setZIndex(stackZ)
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
        console.warn(`âš ï¸ Layer "${name}" not found in registry`)
        return
      }

      if (state.loadingState[name] === 'loading') return
      if (state.layers[name]) return

      const mapState = useMapStore.getState()
      if (!mapState.map) {
        console.warn(`âš ï¸ Cannot load layer "${name}": map not initialized`)
        return
      }

      set(current => {
        current.loadingState[name] = 'loading'
      })

      console.log(`â³ Loading OL layer: ${name}...`)

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

        const stackZ = getStackZIndex(name)
        if (stackZ !== undefined) olLayer.setZIndex(stackZ)
        mapState.map.addLayer(olLayer)

        set(current => {
          current.layers[name] = olLayer
          current.loadingState[name] = 'loaded'
        })

        console.log(`âœ… Layer loaded: ${name}`)
      } catch (error) {
        console.error(`âŒ Failed to load layer "${name}":`, error)
        set(current => {
          current.loadingState[name] = 'error'
        })
      }
    }
  }))
)
