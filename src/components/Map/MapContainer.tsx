import { useEffect, useRef } from 'react'
import 'ol/ol.css'
import { useMap } from '../../hooks/useMap'
import { useGPSStore, useLayerStore, useMapStore, useSettingsStore } from '../../store'
import { createBaseLayers } from '../../map/createBaseLayers'
import { loadImmediateLayers } from '../../map/loadImmediateLayers'
import { useDefaultBackground } from './useDefaultBackground'
import { useGpsAutostart } from './useGpsAutostart'

export function MapContainer() {
  const containerRef = useRef<HTMLDivElement>(null)

  useMap({ target: 'map' })

  const map = useMapStore((state) => state.map)
  const registerLayer = useLayerStore((state) => state.registerLayer)
  const setLayerVisibility = useLayerStore((state) => state.setLayerVisibility)
  const defaultBackground = useSettingsStore((state) => state.defaultBackground)
  const gpsAutoStart = useSettingsStore((state) => state.gpsAutoStart)
  const startTracking = useGPSStore((state) => state.startTracking)

  useEffect(() => {
    if (!map) {
      return
    }

    const baseLayers = createBaseLayers()
    baseLayers.forEach(({ id, layer }) => {
      map.addLayer(layer)
      registerLayer(id, layer)
    })

    map.updateSize()
    void loadImmediateLayers({ map, registerLayer })
  }, [map, registerLayer])

  useDefaultBackground({
    mapReady: Boolean(map),
    defaultBackground,
    setLayerVisibility,
  })

  useGpsAutostart({
    mapReady: Boolean(map),
    gpsAutoStart,
    startTracking,
  })

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div
        id="map"
        ref={containerRef}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  )
}
