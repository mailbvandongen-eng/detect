import { useEffect, useRef } from 'react'
import { useMapStore } from '../../store'
import { useCustomPointLayerStore, type FeatureGeometry } from '../../store/customPointLayerStore'
import { useCustomLayerStore } from '../../store/customLayerStore'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import type { Geometry } from 'ol/geom'
import { getAutomaticImportedPointRadius } from '../../utils/importedLayerStyle'

// Helper to convert FeatureGeometry (WGS84) to OpenLayers geometry (EPSG:3857)
function createOLGeometry(geometry: FeatureGeometry): Geometry {
  const { type, coordinates } = geometry

  // Transform coordinates from WGS84 [lon, lat] to Web Mercator
  const transformCoords = (coords: any): any => {
    if (typeof coords[0] === 'number') {
      // Single coordinate [lon, lat]
      return fromLonLat(coords as [number, number])
    }
    // Nested array - recurse
    return coords.map(transformCoords)
  }

  const webMercatorCoords = transformCoords(coordinates)

  switch (type) {
    case 'Point':
      return new Point(webMercatorCoords)
    case 'LineString':
      return new LineString(webMercatorCoords)
    case 'Polygon':
      return new Polygon(webMercatorCoords)
    case 'MultiPoint':
      return new MultiPoint(webMercatorCoords)
    case 'MultiLineString':
      return new MultiLineString(webMercatorCoords)
    case 'MultiPolygon':
      return new MultiPolygon(webMercatorCoords)
    default:
      // Fallback to point
      return new Point(fromLonLat(coordinates as [number, number]))
  }
}

export function CustomPointMarkers() {
  const map = useMapStore(state => state.map)
  const layers = useCustomPointLayerStore(state => state.layers)
  const importedLayers = useCustomLayerStore(state => state.layers)
  const layersRef = useRef<Map<string, VectorLayer<VectorSource>>>(new Map())

  useEffect(() => {
    if (!map) return

    const existingLayerIds = new Set(layers.map(l => l.id))

    // Remove layers that no longer exist
    layersRef.current.forEach((layer, id) => {
      if (!existingLayerIds.has(id)) {
        map.removeLayer(layer)
        layersRef.current.delete(id)
      }
    })

    // Add/update layers
    layers.forEach(customLayer => {
      const linkedImport = customLayer.linkedImportedLayerId
        ? importedLayers.find(layer => layer.id === customLayer.linkedImportedLayerId)
        : undefined
      const displayName = linkedImport?.name || customLayer.name
      const displayColor = linkedImport?.style.points.color || customLayer.color
      const displayVisible = linkedImport
        ? linkedImport.visible && linkedImport.style.points.visible
        : customLayer.visible
      const source = new VectorSource()

      // Add features for each point
      customLayer.points.forEach(point => {
        // Use full geometry if available, otherwise create point from coordinates
        let olGeometry: Geometry
        const hasFullGeometry = point.geometry && point.geometry.type !== 'Point'

        if (point.geometry) {
          olGeometry = createOLGeometry(point.geometry)
        } else {
          olGeometry = new Point(fromLonLat(point.coordinates))
        }

        const feature = new Feature({
          geometry: olGeometry,
          // Store data for popup
          layerType: 'customPoint',
          customPoint: point,
          customLayerId: customLayer.id,
          customLayerName: displayName,
          customLayerColor: displayColor
        })

        // Style depends on geometry type
        if (hasFullGeometry) {
          // Style for polygons, lines, etc.
          const geometryType = point.geometry!.type
          feature.setStyle(() => {
            if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
              return new Style({
                fill: new Fill({ color: displayColor + '40' }), // 25% opacity fill
                stroke: new Stroke({ color: displayColor, width: 2 })
              })
            } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
              return new Style({
                stroke: new Stroke({ color: displayColor, width: 3 })
              })
            }
            // MultiPoint or other - use circle style
            return new Style({
              image: new Circle({
                radius: 5,
                fill: new Fill({ color: displayColor }),
                stroke: new Stroke({ color: '#ffffff', width: 1 })
              })
            })
          })
        } else {
          // The same restrained automatic size routine used by imported points.
          feature.setStyle((_, resolution) => {
            const radius = getAutomaticImportedPointRadius(resolution)

            return new Style({
              image: new Circle({
                radius,
                fill: new Fill({ color: displayColor }),
                stroke: new Stroke({ color: '#ffffff', width: 1 })
              })
            })
          })
        }

        source.addFeature(feature)
      })

      // Check if layer exists
      const existingLayer = layersRef.current.get(customLayer.id)

      if (existingLayer) {
        // Update existing layer - combine global toggle with individual layer visibility
        existingLayer.setSource(source)
        existingLayer.setVisible(displayVisible)
      } else {
        // Create new layer - combine global toggle with individual layer visibility
        const vectorLayer = new VectorLayer({
          source,
          zIndex: 950, // Between imported layers (900) and vondsten (1000)
          properties: {
            title: displayName,
            customPointLayerId: customLayer.id
          },
          visible: displayVisible
        })
        map.addLayer(vectorLayer)
        layersRef.current.set(customLayer.id, vectorLayer)
      }
    })

    return () => {
      // Cleanup all layers on unmount
      layersRef.current.forEach(layer => {
        if (map) map.removeLayer(layer)
      })
      layersRef.current.clear()
    }
  }, [map, layers, importedLayers])

  return null // Render-less component
}
