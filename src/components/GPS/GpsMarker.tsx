import { useEffect, useRef, useMemo } from 'react'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Style, Fill, Stroke, Icon, Circle as CircleStyle } from 'ol/style'
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

// Passive/tracking dot style - small blue circle (Google Maps style)
const DOT_STYLE = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({ color: '#4285F4' }),
    stroke: new Stroke({ color: 'white', width: 2.5 })
  })
})

export function GpsMarker() {
  const map = useMapStore(state => state.map)
  const position = useGPSStore(state => state.position)
  const accuracy = useGPSStore(state => state.accuracy)
  const tracking = useGPSStore(state => state.tracking)
  const smoothHeading = useGPSStore(state => state.smoothHeading)
  const navigationMode = useGPSStore(state => state.navigationMode)
  const navigationMoving = useGPSStore(state => state.navigationMoving)
  const showAccuracyCircle = useSettingsStore(state => state.showAccuracyCircle)
  const firstFix = useGPSStore(state => state.firstFix)
  const resetFirstFix = useGPSStore(state => state.resetFirstFix)
  const centerOnUser = useGPSStore(state => state.config.centerOnUser)

  const markerRef = useRef<Feature | null>(null)
  const accuracyRef = useRef<Feature | null>(null)
  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const previousPositionRef = useRef(position)

  const isHeadingUp = tracking && navigationMode === 'headingUp'

  // Arrow style - rotates with heading to show direction on the MAP
  const createArrowStyle = useMemo(() => (rotation: number) => new Style({
    image: new Icon({
      src: ARROW_SVG,
      scale: 0.9,
      rotation: rotation,
      rotateWithView: true,
      anchor: [0.5, 0.5]
    })
  }), [])

  // Initialize GPS marker layer - show whenever we have a position
  useEffect(() => {
    if (!map || !position) return

    const coords = fromLonLat([position.lng, position.lat])
    const initialRotation = smoothHeading !== null ? (smoothHeading * Math.PI) / 180 : 0

    markerRef.current = new Feature({
      geometry: new Point(coords)
    })
    markerRef.current.setStyle(isHeadingUp ? createArrowStyle(initialRotation) : DOT_STYLE)

    accuracyRef.current = new Feature({
      geometry: new Point(coords)
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
  }, [map, !!position, createArrowStyle]) // Only re-create layer when map loads or position first appears

  // First GPS state is always a dot; only heading-up mode shows the direction arrow.
  useEffect(() => {
    if (!markerRef.current) return

    if (isHeadingUp) {
      const rotation = smoothHeading !== null ? (smoothHeading * Math.PI) / 180 : 0
      markerRef.current.setStyle(createArrowStyle(rotation))
    } else {
      markerRef.current.setStyle(DOT_STYLE)
    }
  }, [isHeadingUp, createArrowStyle])

  // Update position and center map
  useEffect(() => {
    const isFreshPosition = previousPositionRef.current !== position
    previousPositionRef.current = position

    if (!map || !position || !markerRef.current || !accuracyRef.current) return

    const coords = fromLonLat([position.lng, position.lat])

    markerRef.current.getGeometry()?.setCoordinates(coords)
    accuracyRef.current.getGeometry()?.setCoordinates(coords)

    // Accuracy circle - only when tracking
    if (tracking && showAccuracyCircle && accuracy) {
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

    // Every GPS session waits for its first NEW active fix before jumping to street level.
    // This avoids consuming firstFix on an old/passive position left from the previous session.
    if (firstFix && tracking && isFreshPosition) {
      map.getView().setCenter(coords)
      map.getView().setZoom(17)
      resetFirstFix()
      return
    }

    // Center on user while tracking. In heading-up mode, freeze the view while
    // stationary so small GPS position drift does not make the screen nervous.
    const shouldFollowPosition = navigationMode !== 'headingUp' || navigationMoving
    if (tracking && centerOnUser && !firstFix && shouldFollowPosition) {
      map.getView().animate({
        center: coords,
        duration: 150
      })
    }
  }, [map, tracking, position, accuracy, firstFix, resetFirstFix, centerOnUser, showAccuracyCircle, navigationMode, navigationMoving])

  // Update arrow rotation only while actually moving. When speed drops below
  // the stop threshold the last reliable direction remains visible.
  useEffect(() => {
    if (!markerRef.current || !isHeadingUp || !navigationMoving) return

    const rotation = smoothHeading !== null ? (smoothHeading * Math.PI) / 180 : 0
    markerRef.current.setStyle(createArrowStyle(rotation))
  }, [smoothHeading, createArrowStyle, isHeadingUp, navigationMoving])

  // Heading-up mode: rotate map so heading direction is "up" while moving.
  // At standstill both course and rotation stay frozen.
  useEffect(() => {
    if (!map || !isHeadingUp || !navigationMoving || smoothHeading === null) return

    const targetRotation = -(smoothHeading * Math.PI) / 180
    const view = map.getView()
    const currentRotation = view.getRotation()

    let diff = targetRotation - currentRotation
    while (diff > Math.PI) diff -= 2 * Math.PI
    while (diff < -Math.PI) diff += 2 * Math.PI

    if (Math.abs(diff) > 0.01) {
      view.animate({
        rotation: currentRotation + diff,
        duration: 200
      })
    }
  }, [map, isHeadingUp, navigationMoving, smoothHeading])

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
