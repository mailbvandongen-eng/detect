import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import { useLayerStore } from '../../store/layerStore'
import { useUIStore } from '../../store/uiStore'
import { AppWindow } from './AppWindow'

// All layers that should have opacity sliders - vlak/overlay lagen, geen punten
const OPACITY_LAYERS = [
  // Hoogtekaarten
  { name: 'AHN4 Hoogtekaart Kleur', color: 'blue', default: 0.85 },
  { name: 'AHN4 Hillshade NL', color: 'blue', default: 0.7 },
  { name: 'AHN4 Multi-Hillshade NL', color: 'blue', default: 0.7 },
  { name: 'AHN 0.5m', color: 'blue', default: 0.7 },
  // Historische kaarten
  { name: 'TMK 1850', color: 'amber', default: 0.8 },
  { name: 'Bonnebladen 1900', color: 'amber', default: 0.8 },
  // Terrein/bodem
  { name: 'Geomorfologie', color: 'green', default: 0.5 },
  { name: 'Bodemkaart', color: 'amber', default: 0.6 },
  { name: 'Veengebieden', color: 'amber', default: 0.6 },
  // Archeologie (vlakken)
  { name: 'IKAW', color: 'orange', default: 0.5 },
  { name: 'Archeo Landschappen', color: 'green', default: 0.5 },
  { name: 'Terpen', color: 'orange', default: 0.7 },
  { name: 'Essen', color: 'amber', default: 0.6 },
  // AMK Monumenten - alle perioden
  { name: 'AMK Monumenten', color: 'purple', default: 0.45 },
  { name: 'AMK Romeins', color: 'red', default: 0.6 },
  { name: 'AMK Steentijd', color: 'amber', default: 0.6 },
  { name: 'AMK Vroege ME', color: 'green', default: 0.6 },
  { name: 'AMK Late ME', color: 'blue', default: 0.6 },
  { name: 'AMK Overig', color: 'purple', default: 0.6 },
  // Paleokaarten
  { name: 'Paleokaart 9000 v.Chr.', color: 'indigo', default: 0.7 },
  { name: 'Paleokaart 5500 v.Chr.', color: 'indigo', default: 0.7 },
  { name: 'Paleokaart 2750 v.Chr.', color: 'indigo', default: 0.7 },
  { name: 'Paleokaart 1500 v.Chr.', color: 'indigo', default: 0.7 },
  { name: 'Paleokaart 500 v.Chr.', color: 'indigo', default: 0.7 },
  { name: 'Paleokaart 100 n.Chr.', color: 'indigo', default: 0.7 },
  { name: 'Paleokaart 800 n.Chr.', color: 'indigo', default: 0.7 },
  // Militair (vlakken/lijnen)
  { name: 'Verdedigingslinies', color: 'red', default: 0.7 },
  { name: 'Inundatiegebieden', color: 'red', default: 0.5 },
  // Percelen
  { name: 'Gewaspercelen', color: 'green', default: 0.6 },
  // Provinciaal (vlakken)
  { name: 'Erfgoedlijnen', color: 'purple', default: 0.7 },
  { name: 'Oude Kernen', color: 'orange', default: 0.6 },
  { name: 'Relictenkaart Vlakken', color: 'green', default: 0.5 },
]

const COLOR_CLASSES: Record<string, string> = {
  blue: 'accent-blue-500',
  amber: 'accent-amber-500',
  red: 'accent-red-500',
  indigo: 'accent-indigo-500',
  green: 'accent-green-500',
  orange: 'accent-orange-500',
  purple: 'accent-purple-500',
}

export function OpacitySliders() {
  const [isExpanded, setIsExpanded] = useState(false)
  const isOpen = useUIStore(state => state.activeWindow === 'opacity')
  const toggleWindow = useUIStore(state => state.toggleWindow)
  const closeWindow = useUIStore(state => state.closeWindow)
  const visibleLayers = useLayerStore(state => state.visible)
  const opacities = useLayerStore(state => state.opacity)
  const setLayerOpacity = useLayerStore(state => state.setLayerOpacity)

  // Filter to only visible layers
  const activeSliders = OPACITY_LAYERS.filter(layer => visibleLayers[layer.name])

  useEffect(() => {
    if (isOpen && activeSliders.length === 0) closeWindow()
  }, [activeSliders.length, closeWindow, isOpen])

  // Only show if at least one layer is visible
  if (activeSliders.length === 0) return null

  // Show first 3 by default, or all if expanded
  const displayedSliders = isExpanded ? activeSliders : activeSliders.slice(0, 3)
  const hasMore = activeSliders.length > 3

  return (
    <div className="fixed bottom-[56px] right-2 z-[900]">
      {/* Toggle button */}
      <motion.button
        onClick={() => toggleWindow('opacity')}
        className="w-11 h-11 bg-white/80 rounded-xl backdrop-blur-sm shadow-sm flex items-center justify-center cursor-pointer border-0 outline-none hover:bg-white/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Opacity sliders"
        title={isOpen ? 'Sluit opacity sliders' : 'Open opacity sliders'}
      >
        <SlidersHorizontal size={22} strokeWidth={2} className="text-gray-500 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
        {activeSliders.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center">
            {activeSliders.length}
          </span>
        )}
      </motion.button>

      <AppWindow
        isOpen={isOpen}
        title="Transparantie"
        icon={<SlidersHorizontal size={18} />}
        placement="right"
        onClose={closeWindow}
        footer={hasMore ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="detect-window-secondary-button w-full"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {isExpanded ? 'Minder tonen' : `${activeSliders.length - 3} meer tonen`}
          </button>
        ) : undefined}
      >
            <div className="p-4">
            <div className="space-y-3">
              {displayedSliders.map(layer => {
                const opacity = opacities[layer.name] ?? layer.default
                return (
                  <div key={layer.name}>
                    <label className="text-xs font-medium text-gray-700 mb-1 block truncate" title={layer.name}>
                      {layer.name}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={opacity * 100}
                        onChange={(e) => setLayerOpacity(layer.name, parseInt(e.target.value) / 100)}
                        className={`flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${COLOR_CLASSES[layer.color]}`}
                      />
                      <span className="text-xs text-gray-500 w-8 text-right select-none pointer-events-none">
                        {Math.round(opacity * 100)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            </div>
      </AppWindow>
    </div>
  )
}
