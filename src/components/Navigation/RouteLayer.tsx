import { useEffect, useRef } from 'react'
import { Feature } from 'ol'
import { LineString, Point } from 'ol/geom'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import { useMapStore } from '../../store/mapStore'
import { useNavigationStore } from '../../store/navigationStore'
import { useGPSStore } from '../../store/gpsStore'

interface Coordinate {
  lng: number
  lat: number
}

// Calculate distance between two coordinates (Haversine formula)
function getDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371000 // Earth's radius in meters
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLon = (coord2.lng - coord1.lng) * Math.PI / 180
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Find the index of the closest point on the route to the user
function findClosestPointIndex(userPos: Coordinate, route: Coordinate[]): number {
  let minDist = Infinity
  let closestIdx = 0

  for (let i = 0; i < route.length; i++) {
    const dist = getDistance(userPos, route[i])
    if (dist < minDist) {
      minDist = dist
      closestIdx = i
    }
  }

  return closestIdx
}

export function RouteLayer() {
  const map = useMapStore(state => state.map)
  const routeCoordinates = useNavigationStore(state => state.routeCoordinates)
  const destination = useNavigationStore(state => state.destination)
  const isNavigating = useNavigationStore(state => state.isNavigating)
  const userPosition = useGPSStore(state => state.position)

  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const lastClosestIdxRef = useRef<number>(0) // Track progress to prevent jumping back

  useEffect(() => {
    if (!map) return

    // Create route layer
    const source = new VectorSource()
    layerRef.current = new VectorLayer({
      source,
      zIndex: 500 // Below GPS marker (1000) but above other layers
    })

    map.addLayer(layerRef.current)

    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current)
      }
    }
  }, [map])

  // Reset progress when starting new navigation
  useEffect(() => {
    if (!isNavigating) {
      lastClosestIdxRef.current = 0
    }
  }, [isNavigating])

  // Update route when coordinates or user position change
  useEffect(() => {
    if (!layerRef.current) return

    const source = layerRef.current.getSource()
    if (!source) return

    // Clear previous route
    source.clear()

    if (!isNavigating || !routeCoordinates || routeCoordinates.length === 0) {
      return
    }

    // Determine which portion of the route to show
    let startIdx = 0
    if (userPosition && routeCoordinates.length > 2) {
      const userCoord: Coordinate = { lng: userPosition.lng, lat: userPosition.lat }
      const closestIdx = findClosestPointIndex(userCoord, routeCoordinates)

      // Only advance (never go back) to prevent jumping when GPS is noisy
      if (closestIdx > lastClosestIdxRef.current) {
        lastClosestIdxRef.current = closestIdx
      }
      startIdx = lastClosestIdxRef.current

      // Safety: always keep at least 2 points ahead
      if (startIdx > routeCoordinates.length - 2) {
        startIdx = routeCoordinates.length - 2
      }
    }

    // Get remaining route from current position
    const remainingRoute = routeCoordinates.slice(startIdx)

    // Convert coordinates to OpenLayers format
    const olCoords = remainingRoute.map(coord =>
      fromLonLat([coord.lng, coord.lat])
    )

    // Create route line
    const routeLine = new Feature({
      geometry: new LineString(olCoords)
    })

    // Google Maps style route: blue line with white border
    routeLine.setStyle([
      // White border (drawn first, underneath)
      new Style({
        stroke: new Stroke({
          color: 'white',
          width: 8,
          lineCap: 'round',
          lineJoin: 'round'
        })
      }),
      // Blue route line
      new Style({
        stroke: new Stroke({
          color: '#4285F4',
          width: 5,
          lineCap: 'round',
          lineJoin: 'round'
        })
      })
    ])

    source.addFeature(routeLine)

    // Add destination marker
    if (destination) {
      const destMarker = new Feature({
        geometry: new Point(fromLonLat([destination.lng, destination.lat]))
      })

      destMarker.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 12,
            fill: new Fill({ color: '#EA4335' }), // Google Red
            stroke: new Stroke({ color: 'white', width: 3 })
          })
        })
      )

      source.addFeature(destMarker)
    }

    // Fit map to route extent only on first render (not during navigation)
    if (map && startIdx === 0) {
      const extent = source.getExtent()
      map.getView().fit(extent, {
        padding: [80, 80, 80, 80],
        duration: 500
      })
    }
  }, [map, isNavigating, routeCoordinates, destination, userPosition])

  return null
}
