import { Map } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Fill, Stroke, Style } from 'ol/style'
import { GeoJSON } from 'ol/format'
import { toLonLat } from 'ol/proj'
import proj4 from 'proj4'
import type { Polygon, MultiPolygon } from 'ol/geom'
import { useLayerStore } from '../store'

// Register RD projection if not already done
proj4.defs('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs')

// Store reference to the highlight layer
let highlightLayer: VectorLayer<VectorSource> | null = null
let hillshadeWasVisible = false

/**
 * Clear any existing parcel highlight from the map
 */
export function clearParcelHighlight(map: Map) {
  if (highlightLayer) {
    map.removeLayer(highlightLayer)
    highlightLayer = null
  }

  // Restore hillshade visibility to what it was before
  if (!hillshadeWasVisible) {
    useLayerStore.getState().setLayerVisibility('AHN4 Hillshade NL', false)
  }
}

/**
 * Fetch parcel geometry from BRP WFS and show height map overlay
 * Uses the existing AHN4 Hillshade layer instead of creating a new one
 */
export async function showParcelHeightMap(
  map: Map,
  coordinate: number[]
): Promise<boolean> {
  try {
    // Convert click coordinate to RD
    const lonLat = toLonLat(coordinate)
    const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)

    // Check if within Netherlands bounds
    if (rd[0] < 7000 || rd[0] > 300000 || rd[1] < 289000 || rd[1] > 629000) {
      return false
    }

    // Clear any existing highlight
    clearParcelHighlight(map)

    // Fetch parcel geometry via WFS with timeout
    const wfsUrl = `https://service.pdok.nl/rvo/brpgewaspercelen/wfs/v1_0?` +
      `SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=brpgewaspercelen:BrpGewas&` +
      `OUTPUTFORMAT=json&SRSNAME=EPSG:28992&` +
      `CQL_FILTER=INTERSECTS(geom,POINT(${rd[0]} ${rd[1]}))`

    // Add timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(wfsUrl, { signal: controller.signal })
    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error('WFS request failed:', response.status)
      return false
    }

    const data = await response.json()

    if (!data.features || data.features.length === 0) {
      console.log('No parcel found at location')
      return false
    }

    // Get the parcel feature
    const parcelFeature = data.features[0]

    // Parse the geometry (in RD coordinates)
    const geojsonFormat = new GeoJSON()
    const feature = geojsonFormat.readFeature(parcelFeature, {
      dataProjection: 'EPSG:28992',
      featureProjection: 'EPSG:3857'
    })

    const geometry = feature.getGeometry() as Polygon | MultiPolygon
    if (!geometry) {
      console.log('No geometry in parcel feature')
      return false
    }

    // Get extent for zooming
    const extent = geometry.getExtent()

    // Buffer the extent by 30% for better context
    const width = extent[2] - extent[0]
    const height = extent[3] - extent[1]
    const buffer = Math.max(width, height) * 0.3
    const bufferedExtent: [number, number, number, number] = [
      extent[0] - buffer,
      extent[1] - buffer,
      extent[2] + buffer,
      extent[3] + buffer
    ]

    // Remember if hillshade was already visible
    const layerStore = useLayerStore.getState()
    hillshadeWasVisible = layerStore.visible['AHN4 Hillshade NL'] ?? false

    // Turn on the existing AHN4 Hillshade layer
    layerStore.setLayerVisibility('AHN4 Hillshade NL', true)

    // Create vector layer with parcel outline
    const vectorSource = new VectorSource({
      features: [feature]
    })

    highlightLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(220, 38, 38, 0.1)' // light red fill
        }),
        stroke: new Stroke({
          color: '#dc2626', // red outline
          width: 3
        })
      }),
      zIndex: 999
    })

    // Add highlight layer to map
    map.addLayer(highlightLayer)

    // Zoom to the parcel
    map.getView().fit(bufferedExtent, {
      duration: 300,
      maxZoom: 17
    })

    console.log('✅ Parcel highlighted, hillshade enabled')
    return true

  } catch (error) {
    console.error('Failed to show parcel height map:', error)
    return false
  }
}
