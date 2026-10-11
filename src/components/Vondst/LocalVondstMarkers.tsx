import { useEffect, useRef } from 'react'
import { useMapStore, useSettingsStore } from '../../store'
import { useLocalVondstenStore } from '../../store/localVondstenStore'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { getMapPointStyle } from '../../utils/mapPointStyle'

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

export function LocalVondstMarkers() {
  const map = useMapStore(state => state.map)
  const vondsten = useLocalVondstenStore(state => state.vondsten)
  const showLocalVondsten = useSettingsStore(state => state.showLocalVondsten)
  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)

  // Create/update layer with markers
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

      // Zoom-dependent style function
      feature.setStyle((_feature, resolution) => {
        return getMapPointStyle(color, resolution)
      })

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
      layerRef.current.setVisible(showLocalVondsten)
      map.addLayer(layerRef.current)
    }

    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current)
        layerRef.current = null
      }
    }
  }, [map, vondsten])

  // Update visibility when toggled
  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.setVisible(showLocalVondsten)
    }
  }, [showLocalVondsten])

  return null // This is a render-less component
}
