import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Layer } from 'ol/layer'
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
    visible: {
      'CartoDB (licht)': true,
      'OpenStreetMap': false,
      'Luchtfoto': false,
      'Satelliet (wereld)': false,
      'Labels Overlay': false,
      'TMK 1850': false,
      'Bonnebladen 1900': false,
      'Hunebedden': false,
      'FAMKE Steentijd': false,
      'FAMKE IJzertijd': false,
      'Grafheuvels': false,
      'Terpen': false,
      'AMK Monumenten': false,
      'AMK Romeins': false,
      'AMK Steentijd': false,
      'AMK Vroege ME': false,
      'AMK Late ME': false,
      'AMK Overig': false,
      'Archeo Onderzoeken': false,
      'Romeinse wegen (regio)': false,
      'Romeinse wegen (Wereld)': false,
      'Kastelen': false,
      'IKAW': false,
      'Essen': false,
      'Rijksmonumenten': false,
      'Werelderfgoed': false,
      'WWII Bunkers': false,
      'Slagvelden': false,
      'Militaire Vliegvelden': false,
      'Verdedigingslinies': false,
      'Inundatiegebieden': false,
      'Militaire Objecten': false,
      'Paleokaart 800 n.Chr.': false,
      'Paleokaart 100 n.Chr.': false,
      'Paleokaart 500 v.Chr.': false,
      'Paleokaart 1500 v.Chr.': false,
      'Paleokaart 2750 v.Chr.': false,
      'Paleokaart 5500 v.Chr.': false,
      'Paleokaart 9000 v.Chr.': false,
      'Religieus Erfgoed': false,
      'UIKAV Punten': false,
      'UIKAV Vlakken': false,
      'UIKAV Buffer': false,
      'UIKAV Expert': false,
      'UIKAV Indeling': false,
      'AHN4 Hoogtekaart Kleur': false,
      'AHN4 Hillshade NL': false,
      'AHN4 Multi-Hillshade NL': false,
      'AHN4 Hillshade Kleur': false,
      'AHN 0.5m': false,
      'Veengebieden': false,
      'Geomorfologie': false,
      'Bodemkaart': false,
      'Fossielen Nederland': false,
      'Fossielen BelgiÃ«': false,
      'Fossielen Duitsland': false,
      'Fossielen Frankrijk': false,
      'Monumenten BE': false,
      'Archeo Zones BE': false,
      'Arch Sites BE': false,
      'Erfgoed Landschap BE': false,
      'CAI Elementen': false,
      'Hist. Gebouwen FR': false,
      'INRAP Sites FR': false,
      'Archeo Sites Bretagne': false,
      'Operaties Bretagne': false,
      'Archeo Parijs': false,
      'Sites Patrimoine Occitanie': false,
      'Sites Patrimoine PACA': false,
      'Sites Patrimoine Normandie': false,
      'Maginotlinie': false,
      'Sites ClassÃ©s Bretagne': false,
      'Sites ClassÃ©s Normandie': false,
      'Sites ClassÃ©s Hauts-de-France': false,
      'Sites ClassÃ©s Grand Est': false,
      'Sites ClassÃ©s ÃŽle-de-France': false,
      'Sites ClassÃ©s Centre-Val de Loire': false,
      'Sites ClassÃ©s Bourgogne-FC': false,
      'Sites ClassÃ©s Pays de la Loire': false,
      'Sites ClassÃ©s Nouvelle-Aquitaine': false,
      'Sites ClassÃ©s Auvergne-RA': false,
      'Sites ClassÃ©s Occitanie': false,
      'Sites ClassÃ©s PACA': false,
      'Sites ClassÃ©s Corse': false,
      'Monumenten IDF': false,
      'Gewaspercelen': false,
      'Kadastrale Grenzen': false,
      'Scheepswrakken': false,
      'Woonheuvels ZH': false,
      'Romeinse Forten': false,
      'Windmolens': false,
      'Erfgoedlijnen': false,
      'Oude Kernen': false,
      'Relictenkaart Punten': false,
      'Relictenkaart Lijnen': false,
      'Relictenkaart Vlakken': false,
      'Verdronken Dorpen': false,
      'Mijn Vondsten': true
    },

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
      'Sites ClassÃ©s Bretagne': 0.5,
      'Sites ClassÃ©s Normandie': 0.5,
      'Sites ClassÃ©s Hauts-de-France': 0.5,
      'Sites ClassÃ©s Grand Est': 0.5,
      'Sites ClassÃ©s ÃŽle-de-France': 0.5,
      'Sites ClassÃ©s Centre-Val de Loire': 0.5,
      'Sites ClassÃ©s Bourgogne-FC': 0.5,
      'Sites ClassÃ©s Pays de la Loire': 0.5,
      'Sites ClassÃ©s Nouvelle-Aquitaine': 0.5,
      'Sites ClassÃ©s Auvergne-RA': 0.5,
      'Sites ClassÃ©s Occitanie': 0.5,
      'Sites ClassÃ©s PACA': 0.5,
      'Sites ClassÃ©s Corse': 0.5
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
