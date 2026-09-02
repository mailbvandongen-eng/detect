import { useEffect, useRef } from 'react'
import 'ol/ol.css'
import { Tile as TileLayer } from 'ol/layer'
import VectorTileLayer from 'ol/layer/VectorTile'
import { OSM, XYZ } from 'ol/source'
import { applyStyle } from 'ol-mapbox-style'
import { useMap } from '../../hooks/useMap'
import { useLayerStore, useMapStore, useSettingsStore, useGPSStore } from '../../store'

const ESRI_WORLD_IMAGERY_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const ESRI_HYBRID_REFERENCE_STYLE_URL = 'https://cdn.arcgis.com/sharing/rest/content/items/30d6b8271e1849cd9c3042060001f425/resources/styles/root.json'

const BASE_LAYERS = [
  'Esri (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'Hybride (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
]

const FIELD_LABEL_BASE_LAYERS = [
  'Luchtfoto',
  'Satelliet (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
]

export function MapContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialBgApplied = useRef(false)

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
        maxZoom: 19
      })
    })

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
      zIndex: 100
    })

    void applyStyle(hybridReferenceLayer, ESRI_HYBRID_REFERENCE_STYLE_URL).catch(error => {
      console.error('Hybrid Reference Layer kon niet worden geladen', error)
    })

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
  }, [map, registerLayer])

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
  const hybridReferenceShouldBeVisible = activeBaseLayer === 'Hybride (wereld)'

  useEffect(() => {
    if (!map) return
    setLayerVisibility('Labels Overlay', labelsShouldBeVisible)
  }, [labelsShouldBeVisible, map, setLayerVisibility])

  useEffect(() => {
    if (!map) return
    setLayerVisibility('Hybrid Reference Overlay', hybridReferenceShouldBeVisible)
  }, [hybridReferenceShouldBeVisible, map, setLayerVisibility])

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

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div
        id="map"
        ref={containerRef}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  )
}
