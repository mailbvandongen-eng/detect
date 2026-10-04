import { create } from 'zustand'
import type Map from 'ol/Map'

interface MapState {
  map: Map | null
  rotation: number
  rotationEnabled: boolean
  setMap: (map: Map | null) => void
  setRotation: (rotation: number) => void
  enableRotation: () => void
  disableRotation: () => void
}

// OpenLayers and DOM instances must keep their identity; never draft them with Immer.
export const useMapStore = create<MapState>((set, get) => ({
  map: null,
  rotation: 0,
  rotationEnabled: true,
  setMap: map => set({ map }),
  setRotation: rotation => {
    const { map, rotationEnabled } = get()
    if (map && rotationEnabled) map.getView().setRotation(rotation * Math.PI / 180)
    set({ rotation })
  },
  enableRotation: () => set({ rotationEnabled: true }),
  disableRotation: () => {
    get().map?.getView().animate({ rotation: 0, duration: 500 })
    set({ rotationEnabled: false, rotation: 0 })
  },
}))
