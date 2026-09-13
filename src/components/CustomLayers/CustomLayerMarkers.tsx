import { useEffect, useRef } from 'react'
import { Feature } from 'ol'
import type { EventsKey } from 'ol/events'
import { LineString, MultiLineString, MultiPolygon, Point, Polygon } from 'ol/geom'
import type { Geometry } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import { unByKey } from 'ol/Observable'
import { fromLonLat } from 'ol/proj'
import Cluster from 'ol/source/Cluster'
import VectorSource from 'ol/source/Vector'
import { Circle, Fill, Stroke, Style, Text } from 'ol/style'
import { useMapStore } from '../../store'
import {
  getGeometryGroup,
  useCustomLayerStore,
  type CustomFeature,
  type CustomLayer,
  type PointLayerStyle,
} from '../../store/customLayerStore'

type OlFeature = Feature<Geometry>

interface RenderedLayerBundle {
  layers: VectorLayer<VectorSource<OlFeature>>[]
  viewListener?: EventsKey
}

function createGeometry(geoJsonGeometry: CustomFeature['geometry']): Geometry | null {
  const { type, coordinates } = geoJsonGeometry
  const transformCoords = (coords: number[]): number[] => fromLonLat(coords)
  const transformCoordsArray = (coords: number[][]): number[][] => coords.map(transformCoords)
  const transformCoordsArray2 = (coords: number[][][]): number[][][] => coords.map(transformCoordsArray)
  const transformCoordsArray3 = (coords: number[][][][]): number[][][][] => coords.map(transformCoordsArray2)

  switch (type) {
    case 'Point':
      return new Point(transformCoords(coordinates as number[]))
    case 'LineString':
      return new LineString(transformCoordsArray(coordinates as number[][]))
    case 'Polygon':
      return new Polygon(transformCoordsArray2(coordinates as number[][][]))
    case 'MultiLineString':
      return new MultiLineString(transformCoordsArray2(coordinates as number[][][]))
    case 'MultiPolygon':
      return new MultiPolygon(transformCoordsArray3(coordinates as number[][][][]))
    default:
      return null
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getPointRadius(style: PointLayerStyle, resolution: number): number {
  if (resolution > 80) return Math.max(2, style.radius - 1)
  if (resolution < 5) return Math.min(10, style.radius + 1)
  return style.radius
}

function createPointStyle(style: PointLayerStyle, resolution: number): Style {
  return new Style({
    image: new Circle({
      radius: getPointRadius(style, resolution),
      fill: new Fill({ color: style.color }),
      stroke: new Stroke({ color: style.outlineColor, width: style.outlineWidth }),
    }),
  })
}

function createClusterStyle(style: PointLayerStyle, count: number): Style {
  const radius = count > 99 ? 19 : count > 9 ? 17 : 15
  return new Style({
    image: new Circle({
      radius,
      fill: new Fill({ color: hexToRgba(style.color, 0.9) }),
      stroke: new Stroke({ color: '#ffffff', width: 1.5 }),
    }),
    text: new Text({
      text: String(count),
      fill: new Fill({ color: '#ffffff' }),
      stroke: new Stroke({ color: 'rgba(0,0,0,0.35)', width: 2 }),
      font: 'bold 11px sans-serif',
    }),
  })
}

function createFeatureProperties(
  layer: CustomLayer,
  feature: CustomFeature,
  featureIndex: number,
  geometryType: CustomFeature['geometry']['type']
) {
  const group = getGeometryGroup(geometryType)
  const color = group === 'points'
    ? layer.style.points.color
    : group === 'lines'
      ? layer.style.lines.color
      : layer.style.polygons.strokeColor

  return {
    ...(feature.properties || {}),
    layerType: 'importedLayer',
    layerId: layer.id,
    layerName: layer.name,
    layerColor: color,
    layerPopupConfig: layer.popupConfig,
    importedGeometryType: geometryType,
    importedGeometryGroup: group,
    featureIndex,
  }
}

function addPointFeatures(source: VectorSource<OlFeature>, layer: CustomLayer): void {
  layer.features.features.forEach((feature, featureIndex) => {
    if (!feature.geometry || getGeometryGroup(feature.geometry.type) !== 'points') return
    const coordinates = feature.geometry.type === 'Point'
      ? [feature.geometry.coordinates as number[]]
      : feature.geometry.coordinates as number[][]

    coordinates.forEach((coordinate, pointIndex) => {
      source.addFeature(new Feature({
        geometry: new Point(fromLonLat(coordinate)),
        ...createFeatureProperties(layer, feature, featureIndex, feature.geometry.type),
        importedPointIndex: pointIndex,
      }))
    })
  })
}

function addGeometryFeatures(
  source: VectorSource<OlFeature>,
  layer: CustomLayer,
  group: 'lines' | 'polygons'
): void {
  layer.features.features.forEach((feature, featureIndex) => {
    if (!feature.geometry || getGeometryGroup(feature.geometry.type) !== group) return
    const geometry = createGeometry(feature.geometry)
    if (!geometry) return
    source.addFeature(new Feature({
      geometry,
      ...createFeatureProperties(layer, feature, featureIndex, feature.geometry.type),
    }))
  })
}

function disposeBundle(map: ReturnType<typeof useMapStore.getState>['map'], bundle: RenderedLayerBundle): void {
  bundle.layers.forEach(layer => map?.removeLayer(layer))
  if (bundle.viewListener) unByKey(bundle.viewListener)
}

/** Beheert voor iedere import drie onafhankelijke kaartlagen: vlakken, lijnen en punten. */
export function CustomLayerMarkers() {
  const map = useMapStore(state => state.map)
  const layers = useCustomLayerStore(state => state.layers)
  const bundlesRef = useRef<Map<string, RenderedLayerBundle>>(new Map())

  useEffect(() => {
    if (!map) return

    // Een stijlwijziging bouwt alleen de relatief kleine geïmporteerde vectorlagen opnieuw op.
    bundlesRef.current.forEach(bundle => disposeBundle(map, bundle))
    bundlesRef.current.clear()

    layers.forEach(layer => {
      const renderedLayers: VectorLayer<VectorSource<OlFeature>>[] = []
      let viewListener: EventsKey | undefined

      const polygonSource = new VectorSource<OlFeature>()
      addGeometryFeatures(polygonSource, layer, 'polygons')
      if (polygonSource.getFeatures().length > 0) {
        const polygonLayer = new VectorLayer({
          source: polygonSource,
          zIndex: 900,
          visible: layer.visible && layer.style.polygons.visible,
          opacity: layer.opacity,
          style: new Style({
            fill: new Fill({
              color: hexToRgba(layer.style.polygons.fillColor, layer.style.polygons.fillOpacity),
            }),
            stroke: new Stroke({
              color: layer.style.polygons.strokeColor,
              width: layer.style.polygons.strokeWidth,
            }),
          }),
          properties: { title: `${layer.name} · Vlakken`, customLayerId: layer.id },
        })
        map.addLayer(polygonLayer)
        renderedLayers.push(polygonLayer)
      }

      const lineSource = new VectorSource<OlFeature>()
      addGeometryFeatures(lineSource, layer, 'lines')
      if (lineSource.getFeatures().length > 0) {
        const lineLayer = new VectorLayer({
          source: lineSource,
          zIndex: 901,
          visible: layer.visible && layer.style.lines.visible,
          opacity: layer.opacity,
          style: new Style({
            stroke: new Stroke({ color: layer.style.lines.color, width: layer.style.lines.width }),
          }),
          properties: { title: `${layer.name} · Lijnen`, customLayerId: layer.id },
        })
        map.addLayer(lineLayer)
        renderedLayers.push(lineLayer)
      }

      const pointSource = new VectorSource<OlFeature>()
      addPointFeatures(pointSource, layer)
      if (pointSource.getFeatures().length > 0) {
        const pointStyleCache = new Map<number, Style>()
        const clusterStyleCache = new Map<number, Style>()
        let displaySource: VectorSource<OlFeature> = pointSource

        if (layer.style.points.cluster) {
          const clusterSource = new Cluster<OlFeature>({
            distance: layer.style.points.clusterDistance,
            source: pointSource,
            createCluster: (point, members) => {
              if (members.length === 1) {
                const properties = { ...members[0].getProperties() }
                delete properties.geometry
                return new Feature({ geometry: point, ...properties })
              }
              return new Feature({
                geometry: point,
                layerType: 'importedCluster',
                layerId: layer.id,
                layerName: layer.name,
                layerColor: layer.style.points.color,
                clusterCount: members.length,
                clusterMembers: members,
                clusterMaxZoom: layer.style.points.clusterMaxZoom,
              })
            },
          })
          displaySource = clusterSource

          const updateClusterDistance = () => {
            const zoom = map.getView().getZoom() ?? 0
            clusterSource.setDistance(zoom < layer.style.points.clusterMaxZoom
              ? layer.style.points.clusterDistance
              : 0)
          }
          updateClusterDistance()
          viewListener = map.getView().on('change:resolution', updateClusterDistance)

          const pointLayer = new VectorLayer({
            source: displaySource,
            zIndex: 902,
            visible: layer.visible && layer.style.points.visible,
            opacity: layer.opacity,
            style: (feature, resolution) => {
              const count = Number(feature.get('clusterCount') || 1)
              if (count > 1) {
                if (!clusterStyleCache.has(count)) {
                  clusterStyleCache.set(count, createClusterStyle(layer.style.points, count))
                }
                return clusterStyleCache.get(count)
              }
              const radius = getPointRadius(layer.style.points, resolution)
              if (!pointStyleCache.has(radius)) {
                pointStyleCache.set(radius, createPointStyle(layer.style.points, resolution))
              }
              return pointStyleCache.get(radius)
            },
            properties: { title: `${layer.name} · Punten`, customLayerId: layer.id },
          })
          map.addLayer(pointLayer)
          renderedLayers.push(pointLayer)
        } else {
          const pointLayer = new VectorLayer({
            source: displaySource,
            zIndex: 902,
            visible: layer.visible && layer.style.points.visible,
            opacity: layer.opacity,
            style: (_feature, resolution) => {
              const radius = getPointRadius(layer.style.points, resolution)
              if (!pointStyleCache.has(radius)) {
                pointStyleCache.set(radius, createPointStyle(layer.style.points, resolution))
              }
              return pointStyleCache.get(radius)
            },
            properties: { title: `${layer.name} · Punten`, customLayerId: layer.id },
          })
          map.addLayer(pointLayer)
          renderedLayers.push(pointLayer)
        }
      }

      bundlesRef.current.set(layer.id, {
        layers: renderedLayers,
        viewListener,
      })
    })

    return () => {
      bundlesRef.current.forEach(bundle => disposeBundle(map, bundle))
      bundlesRef.current.clear()
    }
  }, [map, layers])

  return null
}
