import { Map } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import ImageLayer from 'ol/layer/Image'
import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import { Fill, Stroke, Style } from 'ol/style'
import { GeoJSON } from 'ol/format'
import { toLonLat } from 'ol/proj'
import proj4 from 'proj4'
import type { Polygon, MultiPolygon } from 'ol/geom'

// Register RD projection if not already done
proj4.defs('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs')

// Store reference to the highlight layers
let highlightLayer: VectorLayer<VectorSource> | null = null
let ahnLayer: ImageLayer<ImageArcGISRest> | null = null

/**
 * Clear any existing parcel highlight from the map
 */
export function clearParcelHighlight(map: Map) {
  if (highlightLayer) {
    map.removeLayer(highlightLayer)
    highlightLayer = null
  }
  if (ahnLayer) {
    map.removeLayer(ahnLayer)
    ahnLayer = null
  }
}

/**
 * Fetch parcel geometry from BRP WFS and show height map overlay
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
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

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

    // Get extent for zooming and buffering
    const extent = geometry.getExtent()

    // Buffer the extent by 20% for better context
    const width = extent[2] - extent[0]
    const height = extent[3] - extent[1]
    const buffer = Math.max(width, height) * 0.2
    const bufferedExtent = [
      extent[0] - buffer,
      extent[1] - buffer,
      extent[2] + buffer,
      extent[3] + buffer
    ]

    // Create AHN layer using Esri ArcGIS ImageServer with Hillshade rendering
    // Shows the full hillshade layer - the parcel outline shows the boundaries
    ahnLayer = new ImageLayer({
      source: new ImageArcGISRest({
        url: 'https://ahn.arcgisonline.nl/arcgis/rest/services/Hoogtebestand/AHN4_DTM_5m/ImageServer',
        params: {
          renderingRule: JSON.stringify({
            rasterFunction: 'AHN - Hillshade (Multidirectionaal)'
          })
        },
        crossOrigin: 'anonymous'
      }),
      zIndex: 998,
      opacity: 0.8
    })

    // Create vector layer with parcel outline on top
    const vectorSource = new VectorSource({
      features: [feature]
    })

    highlightLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0)' // transparent fill
        }),
        stroke: new Stroke({
          color: '#dc2626', // red outline
          width: 3
        })
      }),
      zIndex: 999
    })

    // Add layers to map
    map.addLayer(ahnLayer)
    map.addLayer(highlightLayer)

    // Zoom to the parcel with some padding
    map.getView().fit(bufferedExtent as [number, number, number, number], {
      duration: 500,
      maxZoom: 18
    })

    console.log('✅ Parcel height map displayed, zoomed to extent')
    return true

  } catch (error) {
    console.error('Failed to show parcel height map:', error)
    return false
  }
}
