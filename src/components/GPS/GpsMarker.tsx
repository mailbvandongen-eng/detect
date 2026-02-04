import { useEffect, useRef, useMemo } from 'react'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Style, Fill, Icon, Circle as CircleStyle } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import { useMapStore, useGPSStore } from '../../store'
import { useSettingsStore } from '../../store/settingsStore'

// Arrow SVG - rotates with heading to show direction
const ARROW_SVG = (() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <polygon points="24,6 38,38 24,30 10,38" fill="#4285F4" stroke="white" stroke-width="3" stroke-linejoin="round"/>
  </svg>`
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
})()

export function GpsMarker() {
  const map = useMapStore(state => state.map)
  const position = useGPSStore(state => state.position)
  const accuracy = useGPSStore(state => state.accuracy)
  const tracking = useGPSStore(state => state.tracking)
  const smoothHeading = useGPSStore(state => state.smoothHeading)
  const navigationMode = useGPSStore(state => state.navigationMode)
  const showAccuracyCircle = useSettingsStore(state => state.showAccuracyCircle)
  const firstFix = useGPSStore(state => state.firstFix)
  const resetFirstFix = useGPSStore(state => state.resetFirstFix)
  const centerOnUser = useGPSStore(state => state.config.centerOnUser)

  const markerRef = useRef<Feature | null>(null)
  const accuracyRef = useRef<Feature | null>(null)
  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)

  // Arrow style - rotates with heading to show direction on the MAP
  // rotateWithView: true means rotation is relative to the map, not the screen
  const createArrowStyle = useMemo(() => (rotation: number) => new Style({
    image: new Icon({
      src: ARROW_SVG,
      scale: 0.9,
      rotation: rotation,
      rotateWithView: true,
      anchor: [0.5, 0.5]
    })
  }), [])

  // Initialize GPS marker layer
  useEffect(() => {
    if (!map) return
    if (!tracking && !position) return

    const defaultCoords = fromLonLat([5.1214, 52.0907])

    // GPS marker
    markerRef.current = new Feature({
      geometry: new Point(defaultCoords)
    })
    markerRef.current.setStyle(createArrowStyle(0))

    // Accuracy circle
    accuracyRef.current = new Feature({
      geometry: new Point(defaultCoords)
    })

    layerRef.current = new VectorLayer({
      source: new VectorSource({
        features: [accuracyRef.current, markerRef.current]
      }),
      zIndex: 1000
    })

    map.addLayer(layerRef.current)

    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current)
      }
    }
  }, [map, tracking, position, createArrowStyle])

  // Update position and center map
  useEffect(() => {
    if (!map || !position || !markerRef.current || !accuracyRef.current) return

    const coords = fromLonLat([position.lng, position.lat])

    // Update marker position
    markerRef.current.getGeometry()?.setCoordinates(coords)
    accuracyRef.current.getGeometry()?.setCoordinates(coords)

    // Update accuracy circle
    if (showAccuracyCircle && accuracy) {
      const metersPerPixel = map.getView().getResolution() || 1
      const accuracyRadius = Math.min(accuracy / metersPerPixel, 80)

      accuracyRef.current.setStyle(
        new Style({
          image: new CircleStyle({
            radius: accuracyRadius,
            fill: new Fill({ color: 'rgba(66, 133, 244, 0.12)' })
          })
        })
      )
    } else {
      accuracyRef.current.setStyle(new Style({}))
    }

    // First GPS fix: jump to position
    if (firstFix && tracking) {
      map.getView().setCenter(coords)
      map.getView().setZoom(17)
      resetFirstFix()
      return
    }

    // Center on user when tracking
    if (tracking && centerOnUser && !firstFix) {
      map.getView().animate({
        center: coords,
        duration: 150
      })
    }
  }, [map, tracking, position, accuracy, firstFix, resetFirstFix, centerOnUser, showAccuracyCircle])

  // Update arrow rotation - arrow rotates with heading relative to the map
  useEffect(() => {
    if (!markerRef.current) return

    const rotation = smoothHeading !== null ? (smoothHeading * Math.PI) / 180 : 0
    markerRef.current.setStyle(createArrowStyle(rotation))
  }, [smoothHeading, createArrowStyle])

  // Heading-up mode: rotate map so heading direction is "up"
  useEffect(() => {
    if (!map || !tracking) return

    if (navigationMode === 'headingUp' && smoothHeading !== null) {
      // Rotate map so the heading direction points up on screen
      // OL: positive rotation = counter-clockwise
      // To make heading direction point up: rotation = -heading_radians
      const targetRotation = -(smoothHeading * Math.PI) / 180
      const view = map.getView()
      const currentRotation = view.getRotation()

      // Smooth rotation - only animate if difference is significant
      let diff = targetRotation - currentRotation
      // Normalize to -π..π
      while (diff > Math.PI) diff -= 2 * Math.PI
      while (diff < -Math.PI) diff += 2 * Math.PI

      if (Math.abs(diff) > 0.01) { // ~0.6 degrees threshold
        view.animate({
          rotation: currentRotation + diff,
          duration: 200
        })
      }
    }
  }, [map, tracking, navigationMode, smoothHeading])

  // Reset map rotation when leaving heading-up mode
  useEffect(() => {
    if (!map) return

    if (navigationMode === 'free') {
      const view = map.getView()
      const currentRotation = view.getRotation()
      if (Math.abs(currentRotation) > 0.01) {
        view.animate({
          rotation: 0,
          duration: 300
        })
      }
    }
  }, [map, navigationMode])

  return null
}
