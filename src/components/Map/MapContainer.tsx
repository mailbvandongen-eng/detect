import { useEffect, useRef } from 'react'
import 'ol/ol.css'
import { Tile as TileLayer } from 'ol/layer'
import { OSM, XYZ } from 'ol/source'
import { useMap } from '../../hooks/useMap'
import { useLayerStore, useMapStore, useSettingsStore, useGPSStore } from '../../store'
import { getImmediateLoadLayers } from '../../layers/layerRegistry'

const BASE_LAYERS = [
  'CartoDB (licht)',
  'OpenStreetMap',
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
  const defaultBackground = useSettingsStore(state => state.defaultBackground)

  useEffect(() => {
    if (!map) {
      console.warn('âš ï¸ Map not initialized yet')
      return
    }

    console.log('ðŸ—ºï¸ Initializing map layers...')

    const osmLayer = new TileLayer({
      properties: { title: 'OpenStreetMap', type: 'base' },
      visible: false,
      source: new OSM()
    })

    const cartoDBLayer = new TileLayer({
      properties: { title: 'CartoDB (licht)', type: 'base' },
      visible: true,
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        attributions: 'Â© OpenStreetMap contributors Â© CARTO'
      })
    })

    const satelliteLayer = new TileLayer({
      properties: { title: 'Luchtfoto', type: 'base' },
      visible: false,
      source: new XYZ({
        url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg',
        attributions: 'Â© Kadaster / PDOK Luchtfoto',
        maxZoom: 19
      })
    })

    const worldSatelliteLayer = new TileLayer({
      properties: { title: 'Satelliet (wereld)', type: 'base' },
      visible: false,
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Â© Esri, Maxar, Earthstar Geographics',
        maxZoom: 19,
        crossOrigin: 'anonymous'
      })
    })

    const labelsLayer = new TileLayer({
      properties: { title: 'Labels Overlay', type: 'overlay' },
      visible: false,
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png',
        attributions: 'Â© OpenStreetMap contributors Â© CARTO',
        maxZoom: 20
      }),
      zIndex: 100
    })

    const tmk1850Layer = new TileLayer({
      properties: { title: 'TMK 1850', type: 'base' },
      visible: false,
      source: new XYZ({
        url: 'https://s.map5.nl/map/gast/tiles/tmk_1850/EPSG3857/{z}/{x}/{y}.png',
        attributions: 'Â© Kadaster / Map5.nl',
        crossOrigin: 'anonymous',
        maxZoom: 14
      })
    })

    const bonne1900Layer = new TileLayer({
      properties: { title: 'Bonnebladen 1900', type: 'base' },
      visible: false,
      source: new XYZ({
        url: 'https://s.map5.nl/map/gast/tiles/bonne_1900/EPSG3857/{z}/{x}/{y}.png',
        attributions: 'Â© Kadaster / Map5.nl',
        crossOrigin: 'anonymous',
        maxZoom: 14
      })
    })

    map.addLayer(osmLayer)
    map.addLayer(cartoDBLayer)
    map.addLayer(satelliteLayer)
    map.addLayer(worldSatelliteLayer)
    map.addLayer(labelsLayer)
    map.addLayer(tmk1850Layer)
    map.addLayer(bonne1900Layer)

    registerLayer('OpenStreetMap', osmLayer)
    registerLayer('CartoDB (licht)', cartoDBLayer)
    registerLayer('Luchtfoto', satelliteLayer)
    registerLayer('Satelliet (wereld)', worldSatelliteLayer)
    registerLayer('Labels Overlay', labelsLayer)
    registerLayer('TMK 1850', tmk1850Layer)
    registerLayer('Bonnebladen 1900', bonne1900Layer)

    map.updateSize()
    void loadImmediateLayers()
  }, [map, registerLayer])

  async function loadImmediateLayers() {
    if (!map) {
      console.error('âŒ Cannot load layers: map is null')
      return
    }

    const immediateLoadLayers = getImmediateLoadLayers()
    console.log(`ðŸ“¦ Loading ${immediateLoadLayers.length} immediate-load layers (WMS/Tile)...`)

    const results = await Promise.allSettled(
      immediateLoadLayers.map(async (layerDef) => {
        try {
          const layer = await layerDef.factory()
          if (layer) {
            return { name: layerDef.name, layer }
          }
          return null
        } catch (error) {
          console.warn(`âš ï¸ Failed to create ${layerDef.name}:`, error)
          return null
        }
      })
    )

    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        const { name, layer } = result.value
        map.addLayer(layer)
        registerLayer(name, layer)
      }
    })
  }

  useEffect(() => {
    if (!map || initialBgApplied.current) return

    const timer = setTimeout(() => {
      const bgToApply = defaultBackground || 'CartoDB (licht)'

      BASE_LAYERS.forEach(layer => {
        setLayerVisibility(layer, false)
      })

      if (BASE_LAYERS.includes(bgToApply)) {
        setLayerVisibility(bgToApply, true)
      } else {
        setLayerVisibility('CartoDB (licht)', true)
      }

      initialBgApplied.current = true
      console.log(`ðŸ—ºï¸ Default background: ${bgToApply}`)
    }, 100)

    return () => clearTimeout(timer)
  }, [map, defaultBackground, setLayerVisibility])

  const gpsAutoStart = useSettingsStore(state => state.gpsAutoStart)
  const startTracking = useGPSStore(state => state.startTracking)
  const gpsStarted = useRef(false)

  useEffect(() => {
    if (!map || gpsStarted.current) return

    if (gpsAutoStart) {
      const timer = setTimeout(() => {
        startTracking()
        gpsStarted.current = true
        console.log('ðŸ“ GPS autostart enabled - tracking started')
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
