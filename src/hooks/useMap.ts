import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'
import { Attribution, ScaleLine } from 'ol/control'
import { useMapStore, useSettingsStore } from '../store'
import type { MapViewOptions } from '../types/map'

const MAP_CLICK_MOVE_TOLERANCE_PX = 8

interface UseMapOptions {
  target: string
  viewOptions?: Partial<MapViewOptions>
}

export function useMap({ target, viewOptions }: UseMapOptions) {
  const mapRef = useRef<Map | null>(null)
  const scaleLineRef = useRef<ScaleLine | null>(null)
  const setMap = useMapStore(state => state.setMap)
  const showScaleBar = useSettingsStore(state => state.showScaleBar)

  useEffect(() => {
    if (!mapRef.current) {
      const defaultView: MapViewOptions = {
        center: [5.1214, 52.0907],
        zoom: 8,
        rotation: 0,
        minZoom: 3,
        maxZoom: 19,
        ...viewOptions
      }

      const map = new Map({
        target,
        controls: [
          new Attribution({
            collapsible: true,
            collapsed: true,
            tipLabel: 'Kaartbronnen'
          })
        ],
        moveTolerance: MAP_CLICK_MOVE_TOLERANCE_PX,
        view: new View({
          center: fromLonLat(defaultView.center),
          zoom: defaultView.zoom,
          rotation: defaultView.rotation,
          minZoom: defaultView.minZoom,
          maxZoom: defaultView.maxZoom
        })
      })

      mapRef.current = map
      setMap(map)

      ;(window as any).__olMap = map
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined)
        setMap(null)
        ;(window as any).__olMap = null
      }
    }
  }, [target, viewOptions, setMap])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (showScaleBar) {
      if (!scaleLineRef.current) {
        scaleLineRef.current = new ScaleLine({
          units: 'metric',
          bar: false,
          text: true,
          minWidth: 80
        })
        map.addControl(scaleLineRef.current)
      }
    } else if (scaleLineRef.current) {
      map.removeControl(scaleLineRef.current)
      scaleLineRef.current = null
    }
  }, [showScaleBar])

  return mapRef.current
}
