import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { useLayerStore } from '../../store/layerStore'
import { useUIStore } from '../../store/uiStore'
import { AppWindow } from './AppWindow'

export function OpacitySliders() {
  const isOpen = useUIStore(state => state.activeWindow === 'opacity')
  const toggleWindow = useUIStore(state => state.toggleWindow)
  const closeWindow = useUIStore(state => state.closeWindow)
  const visibleLayers = useLayerStore(state => state.visible)
  const opacities = useLayerStore(state => state.opacity)
  const setLayerOpacity = useLayerStore(state => state.setLayerOpacity)

  // De opacity-store is de bron van waarheid: iedere zichtbare laag met een
  // opacity-instelling krijgt automatisch een slider. Zo kan de lijst niet
  // meer achterlopen op nieuwe of hernoemde kaartlagen.
  const activeSliders = Object.keys(opacities).filter(layerName => visibleLayers[layerName])

  useEffect(() => {
    if (isOpen && activeSliders.length === 0) closeWindow()
  }, [activeSliders.length, closeWindow, isOpen])

  if (activeSliders.length === 0) return null

  return (
    <div className="fixed bottom-[56px] right-2 z-[900]">
      <motion.button
        onClick={() => toggleWindow('opacity')}
        className="w-11 h-11 bg-white/80 rounded-xl backdrop-blur-sm shadow-sm flex items-center justify-center cursor-pointer border-0 outline-none hover:bg-white/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Transparantie"
        title={isOpen ? 'Sluit transparantie' : 'Open transparantie'}
      >
        <SlidersHorizontal size={22} strokeWidth={2} className="text-gray-500 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center">
          {activeSliders.length}
        </span>
      </motion.button>

      <AppWindow
        isOpen={isOpen}
        title="Transparantie"
        icon={<SlidersHorizontal size={18} />}
        placement="right"
        className="detect-window--compact-bottom-right"
        onClose={closeWindow}
      >
        <div className="p-3">
          <div className="space-y-2.5">
            {activeSliders.map(layerName => {
              const opacity = opacities[layerName]
              return (
                <div key={layerName}>
                  <label className="text-xs font-medium text-gray-700 mb-0.5 block truncate" title={layerName}>
                    {layerName}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={opacity * 100}
                      onChange={(event) => setLayerOpacity(layerName, parseInt(event.target.value) / 100)}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{ accentColor: 'var(--detect-accent)' }}
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
