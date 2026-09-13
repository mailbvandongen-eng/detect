import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MapBrowserEvent } from 'ol'
import { X, MapPin, ExternalLink, Layers, ChevronRight, Crosshair, PersonStanding } from 'lucide-react'
import { toLonLat } from 'ol/proj'
import { useMapStore } from '../../store'
import { useUIStore } from '../../store/uiStore'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { buildGoogleMapsLocationUrl, buildGoogleStreetViewUrl } from '../../utils/googleMapsUrls'
import { buildUserLayerCatalog, type UserLayerTarget } from '../../utils/userLayerCatalog'

interface LongPressLocation {
  pixel: [number, number]
  coordinate: [number, number] // [lng, lat]
}

export function LongPressMenu() {
  const map = useMapStore(state => state.map)
  const openVondstForm = useUIStore(state => state.openVondstForm)
  const openAddPointModal = useUIStore(state => state.openAddPointModal)
  const pointLayers = useCustomPointLayerStore(state => state.layers)
  const importedLayers = useCustomLayerStore(state => state.layers)
  const selectableLayers = buildUserLayerCatalog(pointLayers, importedLayers)

  const [menuLocation, setMenuLocation] = useState<LongPressLocation | null>(null)
  const [visible, setVisible] = useState(false)
  const [canClose, setCanClose] = useState(false) // Prevent immediate close on finger lift
  const [showLayerSubmenu, setShowLayerSubmenu] = useState(false)

  const longPressTimer = useRef<number | null>(null)
  const startPos = useRef<{ x: number; y: number } | null>(null)
  const longPressTriggered = useRef(false)
  const suppressionResetTimer = useRef<number | null>(null)
  const visibleRef = useRef(false)

  useEffect(() => {
    visibleRef.current = visible
  }, [visible])

  useEffect(() => {
    if (!map) {
      console.log('📍 LongPressMenu: map not ready')
      return
    }

    const viewport = map.getViewport()
    if (!viewport) {
      console.log('📍 LongPressMenu: viewport not ready')
      return
    }

    console.log('📍 LongPressMenu: attached to viewport', viewport)

    const LONG_PRESS_DURATION = 600 // ms
    const MOVE_THRESHOLD = 15 // pixels
    const SUPPRESSION_RESET_DELAY = 1000 // Safety reset if no map pointerup arrives

    const clearSuppressionReset = () => {
      if (suppressionResetTimer.current !== null) {
        clearTimeout(suppressionResetTimer.current)
        suppressionResetTimer.current = null
      }
    }

    const scheduleSuppressionReset = () => {
      clearSuppressionReset()
      suppressionResetTimer.current = window.setTimeout(() => {
        longPressTriggered.current = false
        suppressionResetTimer.current = null
      }, SUPPRESSION_RESET_DELAY)
    }

    const handleTouchStart = (e: TouchEvent) => {
      console.log('👆 Touch start, touches:', e.touches.length)
      if (e.touches.length !== 1) return // Only single touch

      const touch = e.touches[0]
      startPos.current = { x: touch.clientX, y: touch.clientY }
      longPressTriggered.current = false
      clearSuppressionReset()
      console.log('👆 Starting long press timer at:', startPos.current)

      // Clear any existing timer
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }

      longPressTimer.current = window.setTimeout(() => {
        longPressTimer.current = null
        console.log('⏱️ Timer fired! startPos:', startPos.current)
        if (!startPos.current) return

        // Get map from global reference (not immer-wrapped)
        const currentMap = (window as any).__olMap
        if (!currentMap) {
          console.log('❌ Map not available (global)')
          return
        }

        // Get the map element's bounding rect
        const rect = viewport.getBoundingClientRect()
        const pixel: [number, number] = [
          startPos.current.x - rect.left,
          startPos.current.y - rect.top
        ]

        // Get coordinate at pixel
        const coordinate = currentMap.getCoordinateFromPixel(pixel)
        if (coordinate) {
          const lonLat = toLonLat(coordinate) as [number, number]
          longPressTriggered.current = true

          setMenuLocation({
            pixel: [startPos.current.x, startPos.current.y],
            coordinate: lonLat
          })
          setVisible(true)
          setCanClose(false) // Prevent immediate close

          // Allow closing after finger is lifted (300ms delay)
          setTimeout(() => setCanClose(true), 300)

          // Haptic feedback
          if ('vibrate' in navigator) {
            navigator.vibrate(50)
          }

          console.log('🎯 Long press detected at:', lonLat)
        }
      }, LONG_PRESS_DURATION)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!longPressTimer.current || !startPos.current) return

      const touch = e.touches[0]
      const dx = touch.clientX - startPos.current.x
      const dy = touch.clientY - startPos.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > MOVE_THRESHOLD) {
        console.log('👆 Touch moved too much, cancelling. Distance:', distance)
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
    }

    const handleTouchEnd = () => {
      console.log('👆 Touch end, timer active:', !!longPressTimer.current)
      if (longPressTimer.current) {
        console.log('👆 Cancelling timer on touch end')
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
      startPos.current = null
      if (longPressTriggered.current) {
        scheduleSuppressionReset()
      }
    }

    // Prevent default context menu on long press
    const handleContextMenu = (e: Event) => {
      if (longPressTriggered.current || visibleRef.current) {
        e.preventDefault()
      }
    }

    // Mouse events for desktop
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return // Only left click
      console.log('🖱️ Mouse down')
      startPos.current = { x: e.clientX, y: e.clientY }
      longPressTriggered.current = false
      clearSuppressionReset()

      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }

      longPressTimer.current = window.setTimeout(() => {
        longPressTimer.current = null
        console.log('⏱️ Mouse timer fired!')
        if (!startPos.current) return

        // Get map from global reference (not immer-wrapped)
        const currentMap = (window as any).__olMap
        console.log('🗺️ __olMap:', currentMap)
        console.log('🗺️ __olMap constructor:', currentMap?.constructor?.name)
        console.log('🗺️ has getCoordinateAtPixel:', typeof currentMap?.getCoordinateAtPixel)
        if (!currentMap) {
          console.log('❌ Map not available (global)')
          return
        }

        const rect = viewport.getBoundingClientRect()
        const pixel: [number, number] = [
          startPos.current.x - rect.left,
          startPos.current.y - rect.top
        ]

        console.log('📍 Pixel:', pixel)
        const coordinate = currentMap.getCoordinateFromPixel(pixel)
        console.log('📍 Coordinate:', coordinate)
        if (coordinate) {
          const lonLat = toLonLat(coordinate) as [number, number]
          longPressTriggered.current = true

          setMenuLocation({
            pixel: [startPos.current.x, startPos.current.y],
            coordinate: lonLat
          })
          setVisible(true)
          setCanClose(false)
          setTimeout(() => setCanClose(true), 300)

          console.log('🎯 Long press (mouse) detected at:', lonLat)
        }
      }, LONG_PRESS_DURATION)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!longPressTimer.current || !startPos.current) return

      const dx = e.clientX - startPos.current.x
      const dy = e.clientY - startPos.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > MOVE_THRESHOLD) {
        console.log('🖱️ Mouse moved, cancelling')
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
    }

    const handleMouseUp = () => {
      console.log('🖱️ Mouse up')
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
      startPos.current = null
      if (longPressTriggered.current) {
        scheduleSuppressionReset()
      }
    }

    // OpenLayers creates its click event after dispatching pointerup. Marking
    // this pointerup as handled prevents a completed long press from also
    // opening the regular feature popup when the user releases their finger.
    const handleMapPointerUp = (evt: MapBrowserEvent<PointerEvent>) => {
      if (!longPressTriggered.current) return

      evt.preventDefault()
      longPressTriggered.current = false
      clearSuppressionReset()
    }

    // Add touch event listeners
    viewport.addEventListener('touchstart', handleTouchStart, { passive: false })
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true })
    viewport.addEventListener('touchend', handleTouchEnd)
    viewport.addEventListener('touchcancel', handleTouchEnd)
    viewport.addEventListener('contextmenu', handleContextMenu)

    // Add mouse event listeners
    viewport.addEventListener('mousedown', handleMouseDown)
    viewport.addEventListener('mousemove', handleMouseMove)
    viewport.addEventListener('mouseup', handleMouseUp)
    viewport.addEventListener('mouseleave', handleMouseUp)
    // OpenLayers dispatches pointerup at runtime, but omits it from the public
    // TypeScript event-name union in v10.7.
    map.on('pointerup' as any, handleMapPointerUp as any)

    return () => {
      viewport.removeEventListener('touchstart', handleTouchStart)
      viewport.removeEventListener('touchmove', handleTouchMove)
      viewport.removeEventListener('touchend', handleTouchEnd)
      viewport.removeEventListener('touchcancel', handleTouchEnd)
      viewport.removeEventListener('contextmenu', handleContextMenu)
      viewport.removeEventListener('mousedown', handleMouseDown)
      viewport.removeEventListener('mousemove', handleMouseMove)
      viewport.removeEventListener('mouseup', handleMouseUp)
      viewport.removeEventListener('mouseleave', handleMouseUp)
      map.un('pointerup' as any, handleMapPointerUp as any)

      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
      clearSuppressionReset()
    }
  }, [map])

  const handleClose = () => {
    if (!canClose) return // Prevent closing immediately after opening
    setVisible(false)
    setMenuLocation(null)
    setCanClose(false)
    setShowLayerSubmenu(false)
  }

  const forceClose = () => {
    setVisible(false)
    setMenuLocation(null)
    setCanClose(false)
    setShowLayerSubmenu(false)
  }

  const handleAddToLayer = (target: UserLayerTarget) => {
    if (!menuLocation) return

    const [lng, lat] = menuLocation.coordinate
    openAddPointModal(target, { lat, lng })

    forceClose()
  }

  const handleAddVondst = () => {
    if (!menuLocation) return

    const [lng, lat] = menuLocation.coordinate

    // Open vondst form with this location
    openVondstForm({ lat, lng })

    // Close menu
    setVisible(false)
    setMenuLocation(null)
    setCanClose(false)
  }

  const handleOpenGoogleMaps = () => {
    if (!menuLocation) return

    const [lng, lat] = menuLocation.coordinate
    const url = buildGoogleMapsLocationUrl(lat, lng)
    window.open(url, '_blank')

    // Close menu
    setVisible(false)
    setMenuLocation(null)
    setCanClose(false)
  }

  const handleOpenStreetView = () => {
    if (!menuLocation) return

    const [lng, lat] = menuLocation.coordinate
    window.open(buildGoogleStreetViewUrl(lat, lng), '_blank')

    forceClose()
  }


  // Format coordinate for display
  const formatCoordinate = (coord: [number, number]) => {
    const [lng, lat] = coord
    return `${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E`
  }

  return (
    <AnimatePresence>
      {visible && menuLocation && (
        <>
          {/* Backdrop - tap to close */}
          <motion.div
            className="fixed inset-0 z-[1600]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Context Menu */}
          <motion.div
            className="fixed z-[1601] bg-white rounded-xl shadow-md overflow-hidden min-w-[200px] border-0 outline-none"
            style={{
              // Position menu near the long press location
              // Calculate available space and position accordingly
              left: Math.min(menuLocation.pixel[0], window.innerWidth - 220),
              // Keep the compact menu clear of the pressed location.
              top: (() => {
                const menuHeight = showLayerSubmenu ? 440 : 320
                const spaceBelow = window.innerHeight - menuLocation.pixel[1]
                // If not enough space below, position above the click point
                if (spaceBelow < menuHeight && menuLocation.pixel[1] > menuHeight) {
                  return menuLocation.pixel[1] - menuHeight + 40
                }
                return Math.min(menuLocation.pixel[1], window.innerHeight - menuHeight)
              })()
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {/* Header with coordinates - white bg, blue text */}
            <div className="px-4 py-3 bg-white border-b border-gray-100">
              <div className="flex items-center gap-2 text-blue-600">
                <MapPin size={16} />
                <span className="text-xs font-mono">
                  {formatCoordinate(menuLocation.coordinate)}
                </span>
              </div>
            </div>

            {/* Menu items */}
            <div className="bg-white">
              {/* Generic point: choose from every personal layer, including imports. */}
              <div className="relative">
                <button
                  onClick={() => setShowLayerSubmenu(!showLayerSubmenu)}
                  className="w-full px-4 py-3 flex items-center gap-3 transition-colors hover:bg-blue-50 text-gray-700 bg-white border-0 outline-none"
                >
                  <Layers size={20} className="text-purple-500" />
                  <span className="font-medium flex-1 text-left">Punt toevoegen</span>
                  <ChevronRight size={16} className={`text-gray-400 transition-transform ${showLayerSubmenu ? 'rotate-90' : ''}`} />
                </button>

                {/* Layer submenu */}
                <AnimatePresence>
                  {showLayerSubmenu && (
                    <motion.div
                      className="bg-gray-50 border-t border-gray-100 max-h-52 overflow-y-auto"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {selectableLayers.length === 0 ? (
                        <div className="px-4 py-3 pl-11 text-sm text-gray-500">
                          Maak eerst een laag via Kaartlagen
                        </div>
                      ) : (
                        selectableLayers.map(layer => (
                          <button
                            key={layer.key}
                            onClick={() => handleAddToLayer(layer.target)}
                            className="w-full px-4 py-2.5 pl-11 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 bg-transparent border-0 outline-none"
                          >
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: layer.color }}
                            />
                            <span className="truncate">{layer.name}</span>
                          </button>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Detailed archaeological find registration stays separate. */}
              <button
                onClick={handleAddVondst}
                className="w-full px-4 py-3 flex items-center gap-3 transition-colors hover:bg-orange-50 text-gray-700 bg-white border-0 outline-none"
              >
                <Crosshair size={20} className="text-orange-500" />
                <span className="font-medium">Vondst registreren</span>
              </button>

              {/* Open in Google Maps */}
              <button
                onClick={handleOpenGoogleMaps}
                className="w-full px-4 py-3 flex items-center gap-3 transition-colors hover:bg-blue-50 text-gray-700 bg-white border-0 outline-none"
              >
                <ExternalLink size={20} className="text-blue-600" />
                <span className="font-medium">Open in Google Maps</span>
              </button>

              {/* Open Street View */}
              <button
                onClick={handleOpenStreetView}
                className="w-full px-4 py-3 flex items-center gap-3 transition-colors hover:bg-yellow-50 text-gray-700 bg-white border-0 outline-none"
              >
                <PersonStanding size={20} className="text-yellow-600" />
                <span className="font-medium">Street View</span>
              </button>
            </div>

            {/* Cancel button */}
            <div className="bg-white">
              <button
                onClick={forceClose}
                className="w-full px-4 py-3 flex items-center justify-center gap-2 text-gray-500 hover:bg-blue-50 transition-colors bg-white border-0 outline-none"
              >
                <X size={18} />
                <span>Annuleren</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
