import { useState } from 'react'
import { RotateCcw, Compass, TreePalm, Layers, ChevronUp, Mountain, Waves, Search, Target, Grid3X3, Save, Plus, RotateCw, Check, LucideIcon, Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLayerStore, useGPSStore, useUIStore, usePresetStore, useSettingsStore, useMapStore } from '../../store'
import { useMonumentFilterStore } from '../../store/monumentFilterStore'
import type { Preset } from '../../store/presetStore'
import { fromLonLat } from 'ol/proj'
import { AppWindow } from './AppWindow'

const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  TreePalm,
  Mountain,
  Waves,
  Search,
  Target,
  Layers,
  Grid: Grid3X3
}

const ICON_COLORS: Record<string, string> = {
  Compass: 'text-purple-600',
  Waves: 'text-cyan-600',
  TreePalm: 'text-green-600',
  Mountain: 'text-stone-600',
  Search: 'text-amber-600',
  Target: 'text-red-600',
  Layers: 'text-blue-600',
  Grid: 'text-lime-600'
}

const HOVER_COLORS: Record<string, string> = {
  Compass: 'hover:bg-purple-50',
  Waves: 'hover:bg-cyan-50',
  TreePalm: 'hover:bg-green-50',
  Mountain: 'hover:bg-stone-50',
  Search: 'hover:bg-amber-50',
  Target: 'hover:bg-red-50',
  Layers: 'hover:bg-blue-50',
  Grid: 'hover:bg-lime-50'
}

const BASE_LAYERS = [
  'Esri (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'Hybride (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
]

const NL_CENTER = [5.2913, 52.1326]
const NL_ZOOM = 8

export function PresetButtons() {
  const setLayerVisibility = useLayerStore(state => state.setLayerVisibility)
  const stopTracking = useGPSStore(state => state.stopTracking)
  const clearMonumentFilter = useMonumentFilterStore(state => state.clearFilter)
  const map = useMapStore(state => state.map)
  const presetsPanelOpen = useUIStore(state => state.activeWindow === 'presets')
  const togglePresetsPanel = useUIStore(state => state.togglePresetsPanel)
  const closeAllPanels = useUIStore(state => state.closeAllPanels)
  const { presets, applyPreset, updatePreset, createPreset, resetToDefaults } = usePresetStore()
  const visible = useLayerStore(state => state.visible)

  const fontScale = useSettingsStore(state => state.fontScale)
  const baseFontSize = 14 * fontScale / 100
  const spacingScale = fontScale / 100

  const [savedPresetId, setSavedPresetId] = useState<string | null>(null)
  const [showAddPreset, setShowAddPreset] = useState(false)
  const [newPresetName, setNewPresetName] = useState('')

  const resetAll = () => {
    closeAllPanels()

    // Alles behalve de bekende basislagen is een overlay. Hierdoor hoeft deze
    // knop niet meer handmatig bijgewerkt te worden wanneer er lagen bijkomen.
    Object.keys(visible)
      .filter(layerName => !BASE_LAYERS.includes(layerName))
      .forEach(layerName => setLayerVisibility(layerName, false))

    BASE_LAYERS.forEach(layerName => {
      setLayerVisibility(layerName, layerName === 'Esri (licht)')
    })
    setLayerVisibility('Labels Overlay', true)

    stopTracking()
    clearMonumentFilter()

    if (map) {
      map.getView().animate({
        center: fromLonLat(NL_CENTER),
        zoom: NL_ZOOM,
        duration: 500
      })
    }

    console.log('🔄 Reset: lichtgrijs, alle lagen uit, GPS uit, zoom naar Nederland')
  }

  const handleApplyPreset = (id: string) => {
    applyPreset(id)
    closeAllPanels()
  }

  const handleSaveToPreset = (event: React.MouseEvent, presetId: string, presetName: string) => {
    event.stopPropagation()

    if (!confirm(`Preset "${presetName}" overschrijven met huidige lagen?`)) return

    const currentLayers = Object.entries(visible)
      .filter(([layerName, isVisible]) => isVisible && !BASE_LAYERS.includes(layerName))
      .map(([layerName]) => layerName)
    const currentBaseLayer = BASE_LAYERS.find(layerName => visible[layerName])

    updatePreset(presetId, {
      layers: currentLayers,
      baseLayer: currentBaseLayer || 'Esri (licht)'
    })

    setSavedPresetId(presetId)
    setTimeout(() => setSavedPresetId(null), 2000)
    console.log('💾 Lagen opgeslagen naar preset')
  }

  const handleAddPreset = () => {
    if (!newPresetName.trim()) return
    createPreset(newPresetName.trim(), 'Layers')
    setNewPresetName('')
    setShowAddPreset(false)
  }

  const handleResetPresets = () => {
    if (confirm('Presets terugzetten naar standaard?')) resetToDefaults()
  }

  return (
    <>
      <motion.button
        onClick={resetAll}
        className="fixed bottom-2 left-2 z-[800] w-11 h-11 flex items-center justify-center bg-white/80 hover:bg-white/90 rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Reset - lichtgrijze kaart, alle lagen uit, GPS uit"
      >
        <RotateCcw size={20} className="text-gray-600 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
      </motion.button>

      <motion.button
        onClick={togglePresetsPanel}
        className="fixed bottom-[60px] left-2 z-[800] w-11 h-11 flex items-center justify-center bg-white/80 hover:bg-white/90 rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Presets"
      >
        {presetsPanelOpen ? (
          <ChevronUp size={20} className="text-gray-600 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
        ) : (
          <Bookmark size={20} className="text-gray-600 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
        )}
      </motion.button>

      <AppWindow
        isOpen={presetsPanelOpen}
        title="Presets"
        icon={<Bookmark size={18} />}
        placement="left"
        onClose={togglePresetsPanel}
        footer={
          showAddPreset ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newPresetName}
                onChange={(event) => setNewPresetName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleAddPreset()
                  if (event.key === 'Escape') setShowAddPreset(false)
                }}
                placeholder="Naam preset..."
                autoFocus
                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-blue-400"
              />
              <button
                onClick={handleAddPreset}
                disabled={!newPresetName.trim()}
                className="detect-window-primary-button px-3 disabled:opacity-50"
                aria-label="Preset toevoegen"
              >
                <Check size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setShowAddPreset(true)}
                className="detect-window-secondary-button flex items-center gap-2"
              >
                <Plus size={16} />
                <span>Preset toevoegen</span>
              </button>
              <button
                onClick={handleResetPresets}
                className="detect-window-icon-button"
                title="Standaardpresets herstellen"
                aria-label="Standaardpresets herstellen"
              >
                <RotateCw size={16} />
              </button>
            </div>
          )
        }
      >
        <div className="p-1.5">
          {presets.map((preset: Preset) => {
            const IconComponent = ICON_MAP[preset.icon] || Layers
            const iconColor = ICON_COLORS[preset.icon] || 'text-blue-600'
            const hoverColor = HOVER_COLORS[preset.icon] || 'hover:bg-blue-50'
            const isSaved = savedPresetId === preset.id

            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className={`w-full flex items-center gap-1.5 px-2.5 ${hoverColor} rounded-lg text-left transition-colors border-0 outline-none bg-transparent overflow-hidden ${isSaved ? 'bg-green-50' : ''}`}
                style={{
                  fontSize: `${baseFontSize}px`,
                  paddingTop: `${6 * spacingScale}px`,
                  paddingBottom: `${6 * spacingScale}px`
                }}
              >
                <IconComponent size={15} className={`${iconColor} flex-shrink-0`} />
                <span className="text-gray-700 truncate flex-1">{preset.name}</span>
                {isSaved ? (
                  <span className="p-1 flex-shrink-0">
                    <Check size={15} className="text-green-500" />
                  </span>
                ) : (
                  <span
                    onClick={(event) => handleSaveToPreset(event, preset.id, preset.name)}
                    className="p-1 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                    title="Huidige lagen opslaan naar deze preset"
                  >
                    <Save size={13} className="text-gray-400 hover:text-blue-500" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </AppWindow>
    </>
  )
}
