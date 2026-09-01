import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Ruler, Trash2 } from 'lucide-react'
import { useMapStore, useUIStore, useSettingsStore } from '../../store'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Draw } from 'ol/interaction'
import { LineString } from 'ol/geom'
import { getLength } from 'ol/sphere'
import { Style, Stroke, Fill, Circle as CircleStyle, Text } from 'ol/style'
import { unByKey } from 'ol/Observable'
import type Feature from 'ol/Feature'
import type { FeatureLike } from 'ol/Feature'
import type { EventsKey } from 'ol/events'
import { AppWindow } from './AppWindow'

export function MeasureTool() {
  const map = useMapStore(state => state.map)
  const setDrawingMode = useUIStore(state => state.setDrawingMode)
  const isActive = useUIStore(state => state.activeWindow === 'measure')
  const openWindow = useUIStore(state => state.openWindow)
  const closeWindow = useUIStore(state => state.closeWindow)
  const showMeasureTool = useSettingsStore(state => state.showMeasureTool)
  const [currentDistance, setCurrentDistance] = useState<string | null>(null)
  const [totalMeasurements, setTotalMeasurements] = useState(0)

  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const sourceRef = useRef<VectorSource | null>(null)
  const drawRef = useRef<Draw | null>(null)
  const listenerRef = useRef<EventsKey | null>(null)

  // Initialize layer and source
  useEffect(() => {
    if (!map) return

    const source = new VectorSource()
    sourceRef.current = source

    const layer = new VectorLayer({
      source,
      style: createStyle,
      zIndex: 1000,
      properties: { name: 'measure-layer' }
    })
    layerRef.current = layer

    map.addLayer(layer)

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current)
      }
    }
  }, [map])

  // Set drawing mode when active changes
  useEffect(() => {
    setDrawingMode(isActive)
    return () => {
      if (isActive) setDrawingMode(false)
    }
  }, [isActive, setDrawingMode])

  // Handle measurement mode
  useEffect(() => {
    if (!map || !sourceRef.current) return

    if (isActive) {
      // Create draw interaction
      const draw = new Draw({
        source: sourceRef.current,
        type: 'LineString',
        style: createDrawingStyle
      })
      drawRef.current = draw

      let sketch: Feature | null = null

      draw.on('drawstart', (evt) => {
        sketch = evt.feature
        setCurrentDistance(null)

        // Listen for geometry changes
        const geom = sketch.getGeometry()
        if (geom) {
          listenerRef.current = geom.on('change', () => {
            const line = geom as LineString
            const length = getLength(line, { projection: 'EPSG:3857' })
            setCurrentDistance(formatLength(length))
          })
        }
      })

      draw.on('drawend', (evt) => {
        // Unsubscribe from geometry changes
        if (listenerRef.current) {
          unByKey(listenerRef.current)
          listenerRef.current = null
        }

        // Get final distance
        const geom = evt.feature.getGeometry() as LineString
        const length = getLength(geom, { projection: 'EPSG:3857' })
        const formattedLength = formatLength(length)

        // Set label on feature
        evt.feature.set('distance', formattedLength)

        setCurrentDistance(formattedLength)
        setTotalMeasurements(prev => prev + 1)
        sketch = null
      })

      map.addInteraction(draw)

      return () => {
        if (drawRef.current) {
          map.removeInteraction(drawRef.current)
          drawRef.current = null
        }
        if (listenerRef.current) {
          unByKey(listenerRef.current)
          listenerRef.current = null
        }
      }
    }
  }, [map, isActive])

  const toggleMeasure = () => {
    if (isActive) {
      closeWindow()
      setCurrentDistance(null)
    } else {
      openWindow('measure')
    }
  }

  const clearMeasurements = () => {
    if (sourceRef.current) {
      sourceRef.current.clear()
      setTotalMeasurements(0)
      setCurrentDistance(null)
    }
  }

  // Don't render if hidden
  if (!showMeasureTool) return null

  return (
    <>
      {/* Measure button - left side, under weather widget */}
      <motion.button
        onClick={toggleMeasure}
        className={`fixed top-[90px] left-2 z-[800] w-11 h-11 flex items-center justify-center rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm ${
          isActive ? 'bg-blue-500' : 'bg-white/80 hover:bg-white/90'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Afstanden meten"
      >
        <Ruler size={20} className={isActive ? 'text-white' : 'text-blue-500 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]'} />
      </motion.button>

      <AppWindow
        isOpen={isActive}
        title="Meten"
        icon={<Ruler size={18} />}
        placement="left"
        onClose={toggleMeasure}
        footer={totalMeasurements > 0 ? (
          <button
            onClick={clearMeasurements}
            className="detect-window-secondary-button w-full text-red-600"
          >
            <Trash2 size={14} />
            Wis metingen ({totalMeasurements})
          </button>
        ) : undefined}
      >
            <div className="p-3 space-y-2">
              <p className="text-xs text-gray-500">
                Klik om te meten. Dubbelklik om te stoppen.
              </p>

              {currentDistance && (
                <div className="bg-blue-50 rounded-lg p-2">
                  <div className="text-xs text-blue-600 font-medium">Afstand</div>
                  <div className="text-lg font-bold text-blue-700">{currentDistance}</div>
                </div>
              )}
            </div>
      </AppWindow>
    </>
  )
}

// Format length to human readable
function formatLength(length: number): string {
  if (length >= 1000) {
    return `${(length / 1000).toFixed(2)} km`
  }
  return `${Math.round(length)} m`
}

// Style for completed measurements
function createStyle(feature: FeatureLike): Style {
  const distance = feature.get('distance') as string | undefined

  return new Style({
    stroke: new Stroke({
      color: '#3b82f6',
      width: 3,
      lineDash: [10, 10]
    }),
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: '#3b82f6' }),
      stroke: new Stroke({ color: '#ffffff', width: 2 })
    }),
    text: distance ? new Text({
      text: distance,
      font: 'bold 12px sans-serif',
      fill: new Fill({ color: '#1e40af' }),
      stroke: new Stroke({ color: '#ffffff', width: 3 }),
      offsetY: -15,
      placement: 'line',
      overflow: true
    }) : undefined
  })
}

// Style while drawing
function createDrawingStyle(): Style {
  return new Style({
    stroke: new Stroke({
      color: '#ef4444',
      width: 3,
      lineDash: [10, 10]
    }),
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: '#ef4444' }),
      stroke: new Stroke({ color: '#ffffff', width: 2 })
    })
  })
}
