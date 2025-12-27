import { useEffect, useRef } from 'react'
import { useMapStore } from '../../store'
import { useLocalVondstenStore } from '../../store/localVondstenStore'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke, Text } from 'ol/style'

// Icon colors per object type
const TYPE_COLORS: Record<string, string> = {
  'Munt': '#f59e0b',      // amber
  'Aardewerk': '#a16207', // brown
  'Gesp': '#6b7280',      // gray
  'Fibula': '#8b5cf6',    // purple
  'Ring': '#ec4899',      // pink
  'Speld': '#6366f1',     // indigo
  'Sieraad': '#f43f5e',   // rose
  'Gereedschap': '#64748b', // slate
  'Wapen': '#ef4444',     // red
  'Anders': '#3b82f6'     // blue
}

// Short labels for markers
const TYPE_LABELS: Record<string, string> = {
  'Munt': 'M',
  'Aardewerk': 'A',
  'Gesp': 'G',
  'Fibula': 'F',
  'Ring': 'R',
  'Speld': 'S',
  'Sieraad': 'Si',
  'Gereedschap': 'Gr',
  'Wapen': 'W',
  'Anders': '?'
}

export function LocalVondstMarkers() {
  const map = useMapStore(state => state.map)
  const vondsten = useLocalVondstenStore(state => state.vondsten)
  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)

  useEffect(() => {
    if (!map) return

    // Create vector source with markers
    const source = new VectorSource()

    // Add features for each vondst
    vondsten.forEach(vondst => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([vondst.location.lng, vondst.location.lat])),
        vondst: vondst // Store vondst data on feature for popup
      })

      const color = TYPE_COLORS[vondst.objectType] || TYPE_COLORS['Anders']
      const label = TYPE_LABELS[vondst.objectType] || '?'

      feature.setStyle(new Style({
        image: new Circle({
          radius: 12,
          fill: new Fill({ color }),
          stroke: new Stroke({ color: '#ffffff', width: 2 })
        }),
        text: new Text({
          text: label,
          font: 'bold 10px sans-serif',
          fill: new Fill({ color: '#ffffff' }),
          offsetY: 1
        })
      }))

      source.addFeature(feature)
    })

    // Create or update layer
    if (layerRef.current) {
      layerRef.current.setSource(source)
    } else {
      layerRef.current = new VectorLayer({
        source,
        zIndex: 1000,
        properties: { title: 'Mijn Vondsten' }
      })
      map.addLayer(layerRef.current)
    }

    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current)
        layerRef.current = null
      }
    }
  }, [map, vondsten])

  return null // This is a render-less component
}
