import { useEffect, useRef, useState } from 'react'
import 'ol/ol.css'
import { Tile as TileLayer } from 'ol/layer'
import VectorTileLayer from 'ol/layer/VectorTile'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import { OSM, XYZ } from 'ol/source'
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS'
import { applyStyle } from 'ol-mapbox-style'
import { useMap } from '../../hooks/useMap'
import { useLayerStore, useMapStore, useSettingsStore, useGPSStore } from '../../store'

const ESRI_WORLD_IMAGERY_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const ESRI_HYBRID_REFERENCE_STYLE_URL = 'https://cdn.arcgis.com/sharing/rest/content/items/30d6b8271e1849cd9c3042060001f425/resources/styles/root.json'
const OPENFREEMAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'
const PDOK_WMTS_CAPABILITIES_URL = 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0?request=GetCapabilities&service=WMTS'
const WAYBACK_WMTS_CAPABILITIES_URL = 'https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/1.0.0/WMTSCapabilities.xml'
const REFERENCE_LINE_WIDTH_SCALE = 0.72

const BASE_LAYERS = [
  'Esri (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'Hybride (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
]

const FIELD_LABEL_BASE_LAYERS = ['TMK 1850', 'Bonnebladen 1900']
const IMAGERY_WITH_REFERENCE = ['Luchtfoto', 'Satelliet (wereld)', 'Hybride (wereld)']

type ArchiveStatus = 'loading' | 'ready' | 'error'

interface ArchiveRelease {
  year: number
  identifier: string
  title: string
  date?: string
}

interface ScoredArchiveRelease extends ArchiveRelease {
  score: number
}

interface MapboxStyleLayer {
  id?: string
  type?: string
  source?: string
  paint?: Record<string, unknown>
}

interface MapboxStyleDocument {
  layers?: MapboxStyleLayer[]
}

function scaleReferenceLineWidth(width: unknown): unknown {
  if (typeof width === 'number') return width * REFERENCE_LINE_WIDTH_SCALE
  if (Array.isArray(width)) return ['*', REFERENCE_LINE_WIDTH_SCALE, width]
  if (!width || typeof width !== 'object') return width

  const legacyWidth = { ...width } as Record<string, unknown>
  if (Array.isArray(legacyWidth.stops)) {
    legacyWidth.stops = legacyWidth.stops.map(stop => (
      Array.isArray(stop) && typeof stop[1] === 'number'
        ? [stop[0], stop[1] * REFERENCE_LINE_WIDTH_SCALE]
        : stop
    ))
  }
  if (typeof legacyWidth.default === 'number') {
    legacyWidth.default *= REFERENCE_LINE_WIDTH_SCALE
  }

  return legacyWidth
}

function thinReferenceLineWidths(style: MapboxStyleDocument): MapboxStyleDocument {
  const lineWidthProperties = ['line-width', 'line-gap-width']

  style.layers?.forEach(layer => {
    if (layer.type !== 'line' || !layer.paint) return

    lineWidthProperties.forEach(property => {
      const width = layer.paint?.[property]
      if (width !== undefined) layer.paint![property] = scaleReferenceLineWidth(width)
    })
  })

  return style
}

function capabilityLayers(capabilities: any): any[] {
  return Array.isArray(capabilities?.Contents?.Layer) ? capabilities.Contents.Layer : []
}

function pdokReleasesFromCapabilities(capabilities: any): ArchiveRelease[] {
  const bestByYear = new Map<number, ScoredArchiveRelease>()

  capabilityLayers(capabilities).forEach(layer => {
    const title = String(layer?.Title ?? '')
    if (/Quick/i.test(title)) return

    const match = title.match(/Luchtfoto\s+(\d{4})\s+Ortho\s+(.+?)\s+RGB/i)
    if (!match) return

    const year = Number(match[1])
    const identifier = String(layer?.Identifier ?? '')
    if (!identifier || year < 2016) return

    const resolutionText = match[2]
    const score = /(5\s*(en|\/)\s*8|8cm|5cm)/i.test(resolutionText) ? 2 : /25cm/i.test(resolutionText) ? 1 : 0
    const existing = bestByYear.get(year)

    if (!existing || score > existing.score) {
      bestByYear.set(year, { year, identifier, title, score })
    }
  })

  return Array.from(bestByYear.values())
    .sort((a, b) => a.year - b.year)
    .map(release => ({ year: release.year, identifier: release.identifier, title: release.title }))
}

function waybackReleasesFromCapabilities(capabilities: any): ArchiveRelease[] {
  const latestByYear = new Map<number, ArchiveRelease>()

  capabilityLayers(capabilities).forEach(layer => {
    const title = String(layer?.Title ?? '')
    const match = title.match(/Wayback\s+(\d{4}-\d{2}-\d{2})/i)
    if (!match) return

    const date = match[1]
    const year = Number(date.slice(0, 4))
    const identifier = String(layer?.Identifier ?? '')
    if (!identifier || year < 2014) return

    const existing = latestByYear.get(year)
    if (!existing?.date || date > existing.date) {
      latestByYear.set(year, { year, identifier, title, date })
    }
  })

  return Array.from(latestByYear.values()).sort((a, b) => a.year - b.year)
}

function createWmtsSource(capabilities: any, release: ArchiveRelease, attribution: string): WMTS | null {
  try {
    const options = optionsFromCapabilities(capabilities, {
      layer: release.identifier,
      projection: 'EPSG:3857'
    })

    if (!options) return null

    return new WMTS({
      ...options,
      attributions: attribution,
      crossOrigin: 'anonymous'
    })
  } catch (error) {
    console.error(`WMTS-bron kon niet worden gemaakt voor ${release.title}`, error)
    return null
  }
}

function openFreeMapReferenceLayerIds(style: MapboxStyleDocument): string[] {
  const layers = Array.isArray(style.layers) ? style.layers : []
  const sourceId = layers.find(layer => layer.type === 'symbol' && typeof layer.source === 'string')?.source
    ?? layers.find(layer => layer.type === 'line' && typeof layer.source === 'string')?.source

  if (!sourceId) return []

  return layers
    .filter(layer => layer.source === sourceId && typeof layer.id === 'string')
    .filter(layer => {
      const id = String(layer.id).toLowerCase()

      if (layer.type === 'symbol') {
        return !/(poi|housenumber|building|airport|aeroway)/.test(id)
      }

      if (layer.type === 'line') {
        return /(road|street|highway|motor|trunk|path|rail|boundary|water|river|stream|canal|ferry)/.test(id)
      }

      return false
    })
    .map(layer => String(layer.id))
}

function shouldShowRichReference(): boolean {
  const visible = useLayerStore.getState().visible
  return IMAGERY_WITH_REFERENCE.some(layerName => Boolean(visible[layerName]))
}

export function MapContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialBgApplied = useRef(false)
  const pdokLayerRef = useRef<TileLayer | null>(null)
  const worldArchiveLayerRef = useRef<TileLayer | null>(null)
  const pdokCapabilitiesRef = useRef<any>(null)
  const waybackCapabilitiesRef = useRef<any>(null)

  const [pdokReleases, setPdokReleases] = useState<ArchiveRelease[]>([])
  const [pdokYear, setPdokYear] = useState(2026)
  const [pdokStatus, setPdokStatus] = useState<ArchiveStatus>('loading')
  const [worldReleases, setWorldReleases] = useState<ArchiveRelease[]>([])
  const [worldYear, setWorldYear] = useState(2026)
  const [worldStatus, setWorldStatus] = useState<ArchiveStatus>('loading')

  useMap({ target: 'map' })
  const map = useMapStore(state => state.map)
  const registerLayer = useLayerStore(state => state.registerLayer)
  const setLayerVisibility = useLayerStore(state => state.setLayerVisibility)
  const visibleLayers = useLayerStore(state => state.visible)
  const defaultBackground = useSettingsStore(state => state.defaultBackground)
  const fieldModeEnabled = useSettingsStore(state => state.fieldModeEnabled)
  const fieldModeOfflineLabels = useSettingsStore(state => state.fieldModeOfflineLabels)

  useEffect(() => {
    if (!map) {
      console.warn('Map not initialized yet')
      return
    }

    console.log('Initializing map layers...')

    const osmLayer = new TileLayer({
      properties: { title: 'OpenStreetMap', type: 'base' },
      visible: false,
      source: new OSM()
    })

    const lightGrayLayer = new TileLayer({
      properties: { title: 'Esri (licht)', type: 'base' },
      visible: true,
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        attributions: '© Esri, HERE, Garmin, OpenStreetMap contributors en de GIS-community',
        crossOrigin: 'anonymous',
        maxZoom: 16
      })
    })

    const satelliteLayer = new TileLayer({
      properties: { title: 'Luchtfoto', type: 'base' },
      visible: false,
      source: new XYZ({
        url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg',
        attributions: '© Kadaster / PDOK Luchtfoto',
        maxZoom: 19,
        crossOrigin: 'anonymous'
      })
    })
    pdokLayerRef.current = satelliteLayer

    const worldSatelliteLayer = new TileLayer({
      properties: { title: 'Satelliet (wereld)', type: 'base' },
      visible: false,
      source: new XYZ({
        url: ESRI_WORLD_IMAGERY_URL,
        attributions: '© Esri, Maxar, Earthstar Geographics',
        maxZoom: 19,
        crossOrigin: 'anonymous'
      })
    })
    worldArchiveLayerRef.current = worldSatelliteLayer

    const hybridWorldLayer = new TileLayer({
      properties: { title: 'Hybride (wereld)', type: 'base' },
      visible: false,
      source: new XYZ({
        url: ESRI_WORLD_IMAGERY_URL,
        attributions: '© Esri, Maxar, Earthstar Geographics',
        maxZoom: 19,
        crossOrigin: 'anonymous'
      })
    })

    const labelsLayer = new TileLayer({
      properties: { title: 'Labels Overlay', type: 'overlay' },
      visible: false,
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
        attributions: '© Esri, HERE, Garmin, OpenStreetMap contributors en de GIS-community',
        crossOrigin: 'anonymous',
        maxZoom: 16
      }),
      zIndex: 100
    })

    const hybridReferenceLayer = new VectorTileLayer({
      properties: { title: 'Hybrid Reference Overlay', type: 'overlay' },
      visible: false,
      declutter: true,
      // Onder alle puntlagen, maar boven de basiskaart en rasteranalyses.
      zIndex: 17
    })

    const syncHybridReferenceVisibility = () => {
      hybridReferenceLayer.setVisible(shouldShowRichReference())
    }

    void (async () => {
      try {
        const response = await fetch(OPENFREEMAP_STYLE_URL)
        if (!response.ok) throw new Error(`OpenFreeMap style HTTP ${response.status}`)

        const style = thinReferenceLineWidths(await response.json() as MapboxStyleDocument)
        const referenceLayerIds = openFreeMapReferenceLayerIds(style)
        if (referenceLayerIds.length === 0) throw new Error('Geen bruikbare referentielagen in OpenFreeMap style')

        await applyStyle(hybridReferenceLayer, style, referenceLayerIds, OPENFREEMAP_STYLE_URL)
        hybridReferenceLayer.getSource()?.setAttributions('OpenFreeMap © OpenMapTiles · Data from OpenStreetMap')
        syncHybridReferenceVisibility()
        console.log(`OpenFreeMap reference loaded (${referenceLayerIds.length} style layers)`)
      } catch (openFreeMapError) {
        console.warn('OpenFreeMap reference niet beschikbaar, Esri fallback wordt gebruikt', openFreeMapError)
        try {
          const response = await fetch(ESRI_HYBRID_REFERENCE_STYLE_URL)
          if (!response.ok) throw new Error(`Esri reference style HTTP ${response.status}`)

          const style = thinReferenceLineWidths(await response.json() as MapboxStyleDocument)
          await applyStyle(hybridReferenceLayer, style, undefined, ESRI_HYBRID_REFERENCE_STYLE_URL)
          syncHybridReferenceVisibility()
        } catch (esriError) {
          hybridReferenceLayer.setVisible(false)
          console.error('Ook Esri Hybrid Reference kon niet worden geladen', esriError)
        }
      }
    })()

    const tmk1850Layer = new TileLayer({
      properties: { title: 'TMK 1850', type: 'base' },
      visible: false,
      source: new XYZ({
        url: 'https://s.map5.nl/map/gast/tiles/tmk_1850/EPSG3857/{z}/{x}/{y}.png',
        attributions: '© Kadaster / Map5.nl',
        crossOrigin: 'anonymous',
        maxZoom: 14
      })
    })

    const bonne1900Layer = new TileLayer({
      properties: { title: 'Bonnebladen 1900', type: 'base' },
      visible: false,
      source: new XYZ({
        url: 'https://s.map5.nl/map/gast/tiles/bonne_1900/EPSG3857/{z}/{x}/{y}.png',
        attributions: '© Kadaster / Map5.nl',
        crossOrigin: 'anonymous',
        maxZoom: 14
      })
    })

    map.addLayer(osmLayer)
    map.addLayer(lightGrayLayer)
    map.addLayer(satelliteLayer)
    map.addLayer(worldSatelliteLayer)
    map.addLayer(hybridWorldLayer)
    map.addLayer(labelsLayer)
    map.addLayer(hybridReferenceLayer)
    map.addLayer(tmk1850Layer)
    map.addLayer(bonne1900Layer)

    registerLayer('OpenStreetMap', osmLayer)
    registerLayer('Esri (licht)', lightGrayLayer)
    registerLayer('Luchtfoto', satelliteLayer)
    registerLayer('Satelliet (wereld)', worldSatelliteLayer)
    registerLayer('Hybride (wereld)', hybridWorldLayer)
    registerLayer('Labels Overlay', labelsLayer)
    registerLayer('Hybrid Reference Overlay', hybridReferenceLayer)
    registerLayer('TMK 1850', tmk1850Layer)
    registerLayer('Bonnebladen 1900', bonne1900Layer)

    map.updateSize()

    return () => {
      pdokLayerRef.current = null
      worldArchiveLayerRef.current = null
    }
  }, [map, registerLayer])

  useEffect(() => {
    if (!map) return
    let cancelled = false
    setPdokStatus('loading')

    void fetch(PDOK_WMTS_CAPABILITIES_URL)
      .then(response => {
        if (!response.ok) throw new Error(`PDOK WMTS HTTP ${response.status}`)
        return response.text()
      })
      .then(text => {
        if (cancelled) return
        const capabilities = new WMTSCapabilities().read(text)
        const releases = pdokReleasesFromCapabilities(capabilities)
        if (releases.length === 0) throw new Error('Geen PDOK luchtfotojaargangen gevonden')

        pdokCapabilitiesRef.current = capabilities
        setPdokReleases(releases)
        setPdokYear(releases[releases.length - 1].year)
        setPdokStatus('ready')
      })
      .catch(error => {
        if (cancelled) return
        console.error('PDOK luchtfoto-archief kon niet worden geladen', error)
        setPdokStatus('error')
      })

    return () => { cancelled = true }
  }, [map])

  useEffect(() => {
    const capabilities = pdokCapabilitiesRef.current
    const layer = pdokLayerRef.current
    const release = pdokReleases.find(item => item.year === pdokYear)
    if (!capabilities || !layer || !release) return

    const source = createWmtsSource(capabilities, release, '© Kadaster / PDOK Luchtfoto')
    if (source) layer.setSource(source)
  }, [pdokReleases, pdokYear])

  useEffect(() => {
    if (!map) return
    let cancelled = false
    setWorldStatus('loading')

    void fetch(WAYBACK_WMTS_CAPABILITIES_URL)
      .then(response => {
        if (!response.ok) throw new Error(`Esri Wayback WMTS HTTP ${response.status}`)
        return response.text()
      })
      .then(text => {
        if (cancelled) return
        const capabilities = new WMTSCapabilities().read(text)
        const releases = waybackReleasesFromCapabilities(capabilities)
        if (releases.length === 0) throw new Error('Geen Esri Wayback-jaargangen gevonden')

        waybackCapabilitiesRef.current = capabilities
        setWorldReleases(releases)
        setWorldYear(releases[releases.length - 1].year)
        setWorldStatus('ready')
      })
      .catch(error => {
        if (cancelled) return
        console.error('Esri Wayback-archief kon niet worden geladen', error)
        setWorldStatus('error')
      })

    return () => { cancelled = true }
  }, [map])

  useEffect(() => {
    const capabilities = waybackCapabilitiesRef.current
    const layer = worldArchiveLayerRef.current
    const release = worldReleases.find(item => item.year === worldYear)
    if (!capabilities || !layer || !release) return

    const source = createWmtsSource(capabilities, release, '© Esri World Imagery Wayback')
    if (source) layer.setSource(source)
  }, [worldReleases, worldYear])

  useEffect(() => {
    if (!map || initialBgApplied.current) return

    const timer = setTimeout(() => {
      const bgToApply = defaultBackground || 'Esri (licht)'

      BASE_LAYERS.forEach(layer => {
        setLayerVisibility(layer, false)
      })

      if (BASE_LAYERS.includes(bgToApply)) {
        setLayerVisibility(bgToApply, true)
      } else {
        setLayerVisibility('Esri (licht)', true)
      }

      initialBgApplied.current = true
      console.log(`Default background: ${bgToApply}`)
    }, 100)

    return () => clearTimeout(timer)
  }, [map, defaultBackground, setLayerVisibility])

  const activeBaseLayer = BASE_LAYERS.find(layerName => visibleLayers[layerName]) ?? 'Esri (licht)'
  const labelsShouldBeVisible = activeBaseLayer === 'Esri (licht)'
    || (fieldModeEnabled && fieldModeOfflineLabels && FIELD_LABEL_BASE_LAYERS.includes(activeBaseLayer))
  const richReferenceShouldBeVisible = IMAGERY_WITH_REFERENCE.includes(activeBaseLayer)

  useEffect(() => {
    if (!map) return
    setLayerVisibility('Labels Overlay', labelsShouldBeVisible)
  }, [labelsShouldBeVisible, map, setLayerVisibility])

  useEffect(() => {
    if (!map) return
    setLayerVisibility('Hybrid Reference Overlay', richReferenceShouldBeVisible)
  }, [richReferenceShouldBeVisible, map, setLayerVisibility])

  const gpsAutoStart = useSettingsStore(state => state.gpsAutoStart)
  const startTracking = useGPSStore(state => state.startTracking)
  const gpsStarted = useRef(false)

  useEffect(() => {
    if (!map || gpsStarted.current) return

    if (gpsAutoStart) {
      const timer = setTimeout(() => {
        startTracking()
        gpsStarted.current = true
        console.log('GPS autostart enabled - tracking started')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [map, gpsAutoStart, startTracking])

  const selectedPdokIndex = Math.max(0, pdokReleases.findIndex(release => release.year === pdokYear))
  const selectedWorldIndex = Math.max(0, worldReleases.findIndex(release => release.year === worldYear))
  const selectedWorldRelease = worldReleases.find(release => release.year === worldYear)
  const timeTravelVisible = activeBaseLayer === 'Luchtfoto' || activeBaseLayer === 'Satelliet (wereld)'

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div
        id="map"
        ref={containerRef}
        style={{ width: '100%', height: '100vh' }}
      />

      {timeTravelVisible && (
        <div
          onPointerDown={event => event.stopPropagation()}
          onClick={event => event.stopPropagation()}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
            transform: 'translateX(-50%)',
            width: 'min(430px, 92vw)',
            zIndex: 1200,
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(148,163,184,0.45)',
            borderRadius: 12,
            padding: '10px 12px',
            boxShadow: '0 5px 18px rgba(15,23,42,0.22)'
          }}
        >
          {activeBaseLayer === 'Luchtfoto' && (
            <>
              <div className="flex items-center justify-between gap-3 text-sm font-medium text-gray-800">
                <span>Luchtfoto NL · tijdreis</span>
                <strong className="text-[var(--detect-accent-text)]">{pdokStatus === 'ready' ? pdokYear : 'actueel'}</strong>
              </div>
              <input
                aria-label="Luchtfoto jaargang Nederland"
                type="range"
                min={0}
                max={Math.max(0, pdokReleases.length - 1)}
                step={1}
                value={selectedPdokIndex}
                disabled={pdokStatus !== 'ready' || pdokReleases.length < 2}
                onChange={event => {
                  const release = pdokReleases[Number(event.target.value)]
                  if (release) setPdokYear(release.year)
                }}
                className="w-full mt-2 accent-[var(--detect-accent)]"
              />
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>{pdokReleases[0]?.year ?? '2016'}</span>
                <span>{pdokStatus === 'loading' ? 'Archief laden…' : pdokStatus === 'error' ? 'Archief niet bereikbaar · actuele foto' : 'PDOK · officiële jaargang'}</span>
                <span>{pdokReleases[pdokReleases.length - 1]?.year ?? '2026'}</span>
              </div>
            </>
          )}

          {activeBaseLayer === 'Satelliet (wereld)' && (
            <>
              <div className="flex items-center justify-between gap-3 text-sm font-medium text-gray-800">
                <span>Satelliet wereld · tijdreis</span>
                <strong className="text-[var(--detect-accent-text)]">{worldStatus === 'ready' ? worldYear : 'actueel'}</strong>
              </div>
              <input
                aria-label="Satelliet archiefjaar wereld"
                type="range"
                min={0}
                max={Math.max(0, worldReleases.length - 1)}
                step={1}
                value={selectedWorldIndex}
                disabled={worldStatus !== 'ready' || worldReleases.length < 2}
                onChange={event => {
                  const release = worldReleases[Number(event.target.value)]
                  if (release) setWorldYear(release.year)
                }}
                className="w-full mt-2 accent-[var(--detect-accent)]"
              />
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>{worldReleases[0]?.year ?? '2014'}</span>
                <span>{worldStatus === 'loading' ? 'Wayback laden…' : worldStatus === 'error' ? 'Wayback niet bereikbaar · actuele satelliet' : selectedWorldRelease?.date ? `Esri Wayback · ${selectedWorldRelease.date}` : 'Esri Wayback'}</span>
                <span>{worldReleases[worldReleases.length - 1]?.year ?? '2026'}</span>
              </div>
              {worldStatus === 'ready' && (
                <p className="mt-1 text-[10px] leading-tight text-gray-400">Archiefjaar is de publicatieversie; de lokale opname kan ouder zijn.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
