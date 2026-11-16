import { Map } from 'ol'
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Fill, Stroke, Style } from 'ol/style'
import { GeoJSON } from 'ol/format'
import { toLonLat } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4'
import type Geometry from 'ol/geom/Geometry'
import type { Polygon, MultiPolygon } from 'ol/geom'
import ImageLayer from 'ol/layer/Image'
import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import type RenderEvent from 'ol/render/Event'

// Version for debugging
console.log('📦 parcelHighlight.ts v3.1 loaded - fixed pixelRatio for Android')

// Register RD projection with both proj4 and OpenLayers
proj4.defs('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs')
register(proj4)

// Store reference to the layers and geometry for clipping
let hillshadeLayer: ImageLayer<ImageArcGISRest> | null = null
let outlineLayer: VectorLayer<VectorSource> | null = null
let clipGeometry: Polygon | MultiPolygon | null = null

const PARCEL_CACHE_KEY = 'detect-parcel-height-cache-v1'
const PARCEL_CACHE_MAX_ENTRIES = 16
const PARCEL_CACHE_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000
const FETCH_ATTEMPT_TIMEOUTS_MS = [8000, 12000] as const
const IMAGE_ATTEMPT_TIMEOUTS_MS = [8000, 12000] as const

type RawParcelFeature = {
  id?: string | number
  type?: string
  geometry?: unknown
  properties?: Record<string, unknown>
}

type CachedParcel = {
  key: string
  savedAt: number
  feature: RawParcelFeature
}

export type ParcelHeightMapResult =
  | { status: 'shown'; source: 'cache' | 'network' }
  | { status: 'outside-netherlands' | 'not-found' | 'connection-error' | 'image-error' | 'cancelled' }

function getRdCoordinate(coordinate: number[]): number[] | null {
  const lonLat = toLonLat(coordinate)
  const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
  return rd && rd.every(Number.isFinite) ? rd : null
}

function isWithinAhnCoverage(rd: number[] | null): rd is number[] {
  return Boolean(rd && rd[0] >= 7000 && rd[0] <= 300000 && rd[1] >= 289000 && rd[1] <= 629000)
}

export function canShowParcelHeightMapAt(coordinate: number[]): boolean {
  return isWithinAhnCoverage(getRdCoordinate(coordinate))
}

function readParcelFeature(format: GeoJSON, rawFeature: RawParcelFeature): Feature<Geometry> | null {
  if (!rawFeature.geometry) return null

  try {
    return format.readFeature(rawFeature, {
      dataProjection: 'EPSG:28992',
      featureProjection: 'EPSG:3857'
    }) as Feature<Geometry>
  } catch {
    return null
  }
}

function readParcelCache(): CachedParcel[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(PARCEL_CACHE_KEY) || '[]') as CachedParcel[]
    if (!Array.isArray(parsed)) return []
    const minimumSavedAt = Date.now() - PARCEL_CACHE_MAX_AGE_MS
    return parsed.filter(entry =>
      entry &&
      typeof entry.key === 'string' &&
      typeof entry.savedAt === 'number' &&
      entry.savedAt >= minimumSavedAt &&
      Boolean(entry.feature?.geometry)
    )
  } catch {
    return []
  }
}

function findCachedParcel(format: GeoJSON, coordinate: number[]): Feature<Geometry> | null {
  for (const entry of readParcelCache()) {
    const feature = readParcelFeature(format, entry.feature)
    if (feature?.getGeometry()?.intersectsCoordinate(coordinate)) {
      return feature
    }
  }
  return null
}

function saveParcelToCache(rawFeature: RawParcelFeature, feature: Feature<Geometry>) {
  const geometry = feature.getGeometry()
  if (!geometry || !rawFeature.geometry) return

  const extentKey = geometry.getExtent().map(value => Math.round(value)).join(':')
  const key = String(rawFeature.id ?? extentKey)
  const compactFeature: RawParcelFeature = {
    id: rawFeature.id,
    type: 'Feature',
    geometry: rawFeature.geometry,
    properties: {}
  }
  const entries = readParcelCache().filter(entry => entry.key !== key)
  entries.unshift({ key, savedAt: Date.now(), feature: compactFeature })

  try {
    localStorage.setItem(PARCEL_CACHE_KEY, JSON.stringify(entries.slice(0, PARCEL_CACHE_MAX_ENTRIES)))
  } catch {
    try {
      localStorage.setItem(PARCEL_CACHE_KEY, JSON.stringify(entries.slice(0, 4)))
    } catch {
      // Cache is an optimisation; a full or blocked store must not break the map.
    }
  }
}

async function fetchParcelFeatures(url: string, signal?: AbortSignal): Promise<RawParcelFeature[]> {
  let lastError: unknown = new Error('Perceelgegevens konden niet worden opgehaald')

  for (let attempt = 0; attempt < FETCH_ATTEMPT_TIMEOUTS_MS.length; attempt += 1) {
    if (signal?.aborted) throw new DOMException('Afgebroken', 'AbortError')

    const controller = new AbortController()
    const forwardAbort = () => controller.abort()
    signal?.addEventListener('abort', forwardAbort, { once: true })
    const timeoutId = window.setTimeout(() => controller.abort(), FETCH_ATTEMPT_TIMEOUTS_MS[attempt])

    try {
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error(`WFS request failed: ${response.status}`)
      const data = await response.json() as { features?: RawParcelFeature[] }
      return Array.isArray(data.features) ? data.features : []
    } catch (error) {
      if (signal?.aborted) throw new DOMException('Afgebroken', 'AbortError')
      lastError = error
      if (attempt + 1 < FETCH_ATTEMPT_TIMEOUTS_MS.length && navigator.onLine) {
        await new Promise(resolve => window.setTimeout(resolve, 350))
      }
    } finally {
      window.clearTimeout(timeoutId)
      signal?.removeEventListener('abort', forwardAbort)
    }

    if (!navigator.onLine) break
  }

  throw lastError
}

function waitForImageLoad(
  source: ImageArcGISRest,
  timeoutMs: number,
  signal?: AbortSignal
): Promise<boolean> {
  return new Promise(resolve => {
    let settled = false
    const finish = (success: boolean) => {
      if (settled) return
      settled = true
      window.clearTimeout(timeoutId)
      source.un('imageloadend', handleLoad)
      source.un('imageloaderror', handleError)
      signal?.removeEventListener('abort', handleAbort)
      resolve(success)
    }
    const handleLoad = () => finish(true)
    const handleError = () => finish(false)
    const handleAbort = () => finish(false)
    const timeoutId = window.setTimeout(() => finish(false), timeoutMs)

    source.on('imageloadend', handleLoad)
    source.on('imageloaderror', handleError)
    signal?.addEventListener('abort', handleAbort, { once: true })
    if (signal?.aborted) finish(false)
  })
}

/**
 * Clear any existing parcel highlight from the map
 */
export function clearParcelHighlight(map: Map) {
  if (hillshadeLayer) {
    map.removeLayer(hillshadeLayer)
    hillshadeLayer = null
  }
  if (outlineLayer) {
    map.removeLayer(outlineLayer)
    outlineLayer = null
  }
  clipGeometry = null
}

/**
 * Fetch parcel geometry from BRP WFS and show height map overlay
 * Shows hillshade within parcel bounding box with parcel outline
 */
export async function showParcelHeightMap(
  map: Map,
  coordinate: number[],
  signal?: AbortSignal
): Promise<ParcelHeightMapResult> {
  try {
    // Convert click coordinate to RD
    const lonLat = toLonLat(coordinate)
    console.log(`🖱️ Click (3857): ${coordinate[0].toFixed(0)}, ${coordinate[1].toFixed(0)}`)
    console.log(`🖱️ LonLat (WGS84): ${lonLat[0].toFixed(5)}, ${lonLat[1].toFixed(5)}`)

    const rd = getRdCoordinate(coordinate)
    console.log(`🖱️ RD (28992): ${rd ? rd[0].toFixed(0) + ', ' + rd[1].toFixed(0) : 'FAILED'}`)

    // Check if within Netherlands bounds
    if (!isWithinAhnCoverage(rd)) {
      console.error('❌ Coordinate outside Netherlands or transformation failed:', rd)
      return { status: 'outside-netherlands' }
    }

    // Clear any existing highlight
    clearParcelHighlight(map)

    const geojsonFormat = new GeoJSON()
    let feature = findCachedParcel(geojsonFormat, coordinate)
    let featureSource: 'cache' | 'network' = 'cache'

    if (!feature) {
      // Fetch parcel geometry via WFS. Without a cache-buster, the service worker
      // can reuse a successful response on a weak or temporarily absent connection.
      const buffer = 1 // 1 meter buffer around click point
      const bbox = `${(rd[0] - buffer).toFixed(2)},${(rd[1] - buffer).toFixed(2)},${(rd[0] + buffer).toFixed(2)},${(rd[1] + buffer).toFixed(2)}`
      const wfsUrl = `https://service.pdok.nl/rvo/brpgewaspercelen/wfs/v1_0?` +
        `SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=brpgewaspercelen:BrpGewas&` +
        `OUTPUTFORMAT=json&SRSNAME=EPSG:28992&` +
        `BBOX=${bbox},EPSG:28992`
      console.log('🌐 WFS URL:', wfsUrl)

      let rawFeatures: RawParcelFeature[]
      try {
        rawFeatures = await fetchParcelFeatures(wfsUrl, signal)
      } catch (error) {
        if (signal?.aborted) return { status: 'cancelled' }
        console.error('WFS request failed after retry:', error)
        return { status: 'connection-error' }
      }

      const candidates = rawFeatures
        .map(rawFeature => ({ rawFeature, feature: readParcelFeature(geojsonFormat, rawFeature) }))
        .filter((candidate): candidate is { rawFeature: RawParcelFeature; feature: Feature<Geometry> } => Boolean(candidate.feature))
      const selected = candidates.find(candidate => candidate.feature.getGeometry()?.intersectsCoordinate(coordinate)) ?? candidates[0]

      if (!selected) {
        console.log('No parcel found at location')
        return { status: 'not-found' }
      }

      feature = selected.feature
      featureSource = 'network'
      saveParcelToCache(selected.rawFeature, selected.feature)
      console.log('📥 PARCEL ID:', selected.rawFeature.id || selected.rawFeature.properties?.id || 'geen ID')
    }

    if (signal?.aborted) return { status: 'cancelled' }

    const geometry = feature.getGeometry() as Polygon | MultiPolygon
    if (!geometry) {
      console.log('No geometry in parcel feature')
      return { status: 'not-found' }
    }

    // Debug: log parcel info
    console.log(`📍 Geometry type: ${geometry.getType()}, extent: ${geometry.getExtent().map((v: number) => v.toFixed(0)).join(', ')}`)

    // Get extent for the hillshade layer
    const extent = geometry.getExtent()

    // Buffer the extent slightly for the hillshade
    const width = extent[2] - extent[0]
    const height = extent[3] - extent[1]
    const hillshadeBuffer = Math.max(width, height) * 0.05
    const hillshadeExtent: [number, number, number, number] = [
      extent[0] - hillshadeBuffer,
      extent[1] - hillshadeBuffer,
      extent[2] + hillshadeBuffer,
      extent[3] + hillshadeBuffer
    ]

    // Store geometry for clipping
    clipGeometry = geometry

    // Create colored elevation layer with polygon clipping
    // Using AHN4 DTM 50cm from Esri Nederland ImageServer with DYNAMIC color ramp
    const imageSource = new ImageArcGISRest({
      url: 'https://ahn.arcgisonline.nl/arcgis/rest/services/Hoogtebestand/AHN4_DTM_50cm/ImageServer',
      params: {
        renderingRule: JSON.stringify({
          rasterFunction: 'AHN - Color Ramp D'  // DYNAMISCH! blauw→groen→geel→bruin
        })
      },
      crossOrigin: 'anonymous'
    })
    hillshadeLayer = new ImageLayer({
      source: imageSource,
      extent: hillshadeExtent,
      zIndex: 998
    })

    // Add canvas clipping to render only within polygon
    hillshadeLayer.on('prerender', (evt: RenderEvent) => {
      if (!clipGeometry) return
      const ctx = evt.context as CanvasRenderingContext2D
      if (!ctx) return

      const frameState = evt.frameState
      if (!frameState) return

      ctx.save()
      ctx.beginPath()

      // Get polygon coordinates and convert to render pixels using frameState
      const coords = clipGeometry.getType() === 'Polygon'
        ? (clipGeometry as Polygon).getCoordinates()[0]
        : (clipGeometry as MultiPolygon).getCoordinates()[0][0]

      // Use map's getPixelFromCoordinate for accurate conversion
      // This handles all transforms including pixelRatio correctly
      coords.forEach((coord, i) => {
        const pixel = map.getPixelFromCoordinate(coord)
        if (!pixel) return

        // Apply pixelRatio to convert CSS pixels to device pixels
        // The canvas is scaled by pixelRatio, so we need to scale the coordinates
        const pixelRatio = frameState.pixelRatio
        const px = pixel[0] * pixelRatio
        const py = pixel[1] * pixelRatio

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      })

      ctx.closePath()
      ctx.clip()
    })

    hillshadeLayer.on('postrender', (evt: RenderEvent) => {
      const ctx = evt.context as CanvasRenderingContext2D
      if (ctx) {
        ctx.restore()
      }
    })

    // Create vector layer with parcel outline (on top)
    const vectorSource = new VectorSource({
      features: [feature]
    })

    outlineLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0)' // transparent fill to show hillshade
        }),
        stroke: new Stroke({
          color: '#dc2626', // red outline
          width: 3
        })
      }),
      zIndex: 999
    })

    const firstImageLoad = waitForImageLoad(imageSource, IMAGE_ATTEMPT_TIMEOUTS_MS[0], signal)
    map.addLayer(hillshadeLayer)
    map.addLayer(outlineLayer)
    map.render()

    let imageLoaded = await firstImageLoad
    if (!imageLoaded && !signal?.aborted) {
      const retryImageLoad = waitForImageLoad(imageSource, IMAGE_ATTEMPT_TIMEOUTS_MS[1], signal)
      imageSource.refresh()
      map.render()
      imageLoaded = await retryImageLoad
    }

    if (signal?.aborted) {
      clearParcelHighlight(map)
      return { status: 'cancelled' }
    }

    if (!imageLoaded) {
      clearParcelHighlight(map)
      return { status: 'image-error' }
    }

    // Don't zoom - just show the overlay in place
    console.log('✅ Parcel height map displayed')
    return { status: 'shown', source: featureSource }

  } catch (error) {
    console.error('Failed to show parcel height map:', error)
    return signal?.aborted ? { status: 'cancelled' } : { status: 'connection-error' }
  }
}
