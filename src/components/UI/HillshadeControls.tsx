import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Mountain, Palette, X, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { useHillshadeStore, type ColorRamp } from '../../store/hillshadeStore'

const COLOR_RAMPS: { id: ColorRamp; name: string; preview: string[] }[] = [
  { id: 'terrain', name: 'Terrein', preview: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'] },
  { id: 'viridis', name: 'Viridis', preview: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'] },
  { id: 'magma', name: 'Magma', preview: ['#000004', '#51127c', '#b73779', '#fc8861', '#fcfdbf'] },
  { id: 'spectral', name: 'Spectrum', preview: ['#5e4fa2', '#3288bd', '#66c2a5', '#fee08b', '#f46d43', '#9e0142'] },
  { id: 'grayscale', name: 'Grijs', preview: ['#000000', '#444444', '#888888', '#cccccc', '#ffffff'] }
]

export function HillshadeControls() {
  const {
    sunAzimuth, setSunAzimuth,
    sunElevation, setSunElevation,
    verticalExaggeration, setVerticalExaggeration,
    colorRamp, setColorRamp,
    minElevation, setMinElevation,
    maxElevation, setMaxElevation,
    showControls, setShowControls,
    resetToDefaults
  } = useHillshadeStore()

  const [showColorPicker, setShowColorPicker] = useState(false)

  if (!showControls) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-20 left-2 right-2 z-[1400] max-w-sm mx-auto"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <div className="flex items-center gap-2">
              <Mountain size={16} />
              <span className="font-medium text-sm">Hoogtekaart instellingen</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetToDefaults}
                className="p-1.5 rounded hover:bg-white/20 transition-colors border-0 outline-none"
                title="Reset naar standaard"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setShowControls(false)}
                className="p-1.5 rounded hover:bg-white/20 transition-colors border-0 outline-none"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="p-3 space-y-4">
            {/* Sun Direction */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sun size={14} className="text-amber-500" />
                <span className="text-xs font-medium text-gray-700">Lichtrichting</span>
                <span className="text-xs text-gray-400 ml-auto">{sunAzimuth}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={sunAzimuth}
                onChange={(e) => setSunAzimuth(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>N</span>
                <span>O</span>
                <span>Z</span>
                <span>W</span>
                <span>N</span>
              </div>
            </div>

            {/* Sun Elevation */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sun size={14} className="text-yellow-500" />
                <span className="text-xs font-medium text-gray-700">Zonhoogte</span>
                <span className="text-xs text-gray-400 ml-auto">{sunElevation}°</span>
              </div>
              <input
                type="range"
                min="5"
                max="90"
                step="5"
                value={sunElevation}
                onChange={(e) => setSunElevation(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>Laag</span>
                <span>Hoog</span>
              </div>
            </div>

            {/* Vertical Exaggeration */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Mountain size={14} className="text-green-600" />
                <span className="text-xs font-medium text-gray-700">Overdrijving</span>
                <span className="text-xs text-gray-400 ml-auto">{verticalExaggeration}×</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={verticalExaggeration}
                onChange={(e) => setVerticalExaggeration(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>1× (realistisch)</span>
                <span>10× (overdreven)</span>
              </div>
            </div>

            {/* Elevation Range (collapsible) */}
            <div>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center gap-2 w-full text-left border-0 outline-none bg-transparent"
              >
                <Palette size={14} className="text-purple-500" />
                <span className="text-xs font-medium text-gray-700">Kleuren & hoogtebereik</span>
                {showColorPicker ? (
                  <ChevronUp size={14} className="text-gray-400 ml-auto" />
                ) : (
                  <ChevronDown size={14} className="text-gray-400 ml-auto" />
                )}
              </button>

              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 space-y-3">
                      {/* Color Ramp Selection */}
                      <div className="grid grid-cols-5 gap-1">
                        {COLOR_RAMPS.map((ramp) => (
                          <button
                            key={ramp.id}
                            onClick={() => setColorRamp(ramp.id)}
                            className={`p-1 rounded border-2 transition-colors ${
                              colorRamp === ramp.id
                                ? 'border-blue-500'
                                : 'border-transparent hover:border-gray-300'
                            }`}
                            title={ramp.name}
                          >
                            <div className="h-4 rounded-sm flex overflow-hidden">
                              {ramp.preview.map((color, i) => (
                                <div
                                  key={i}
                                  className="flex-1"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <div className="text-[8px] text-gray-500 mt-0.5 truncate">
                              {ramp.name}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Min Elevation */}
                      <div>
                        <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                          <span>Min hoogte</span>
                          <span>{minElevation}m</span>
                        </div>
                        <input
                          type="range"
                          min="-10"
                          max="20"
                          step="1"
                          value={minElevation}
                          onChange={(e) => setMinElevation(Number(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      {/* Max Elevation */}
                      <div>
                        <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                          <span>Max hoogte</span>
                          <span>{maxElevation}m</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="350"
                          step="5"
                          value={maxElevation}
                          onChange={(e) => setMaxElevation(Number(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                        />
                      </div>

                      <div className="text-[10px] text-gray-400 italic">
                        Tip: Voor vlak terrein (polder), zet max op 10-20m.
                        Voor heuvelachtig (Limburg), zet max op 200-350m.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
