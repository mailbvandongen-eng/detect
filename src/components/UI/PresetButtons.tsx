import { useState } from 'react'
import { RotateCcw, Compass, TreePalm, Layers, ChevronUp, Mountain, Waves, Search, Target, Grid3X3, Save, Plus, RotateCw, Check, LucideIcon, Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLayerStore, useGPSStore, useUIStore, usePresetStore, useSettingsStore, useMapStore } from '../../store'
import { useMonumentFilterStore } from '../../store/monumentFilterStore'
import type { Preset } from '../../store/presetStore'
import { fromLonLat } from 'ol/proj'
import { AppWindow } from './AppWindow'

// Icon mapping for dynamic icon rendering
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

// Icon color mapping
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

// All overlay layers for reset - must include ALL layers from layerStore
const ALL_OVERLAYS = [
  // Mijn data
  'Mijn Vondsten',
  'Labels Overlay',
  // Steentijd
  'Hunebedden', 'FAMKE Steentijd', 'FAMKE IJzertijd', 'Grafheuvels', 'Terpen',
  // Archeologie
  'AMK Monumenten', 'AMK Romeins', 'AMK Steentijd', 'AMK Vroege ME', 'AMK Late ME', 'AMK Overig',
  'Romeinse wegen (regio)', 'Romeinse wegen (Wereld)', 'Romeinse Forten', 'Kastelen', 'IKAW', 'Archeo Onderzoeken',
  // Erfgoed
  'Rijksmonumenten', 'Werelderfgoed', 'Religieus Erfgoed', 'Essen', 'Ruïnes',
  // Militair
  'WWII Bunkers', 'Slagvelden', 'Militaire Vliegvelden',
  'Verdedigingslinies', 'Inundatiegebieden', 'Militaire Objecten',
  // Paleokaarten
  'Paleokaart 800 n.Chr.', 'Paleokaart 100 n.Chr.', 'Paleokaart 500 v.Chr.',
  'Paleokaart 1500 v.Chr.', 'Paleokaart 2750 v.Chr.', 'Paleokaart 5500 v.Chr.', 'Paleokaart 9000 v.Chr.',
  // UIKAV
  'UIKAV Punten', 'UIKAV Vlakken', 'UIKAV Expert', 'UIKAV Buffer', 'UIKAV Indeling',
  // Hoogtekaarten (Esri + WebGL)
  'Hoogtekaart (WebGL)', 'AHN4 Hoogtekaart Kleur', 'AHN4 Hillshade NL', 'AHN4 Multi-Hillshade NL', 'AHN 0.5m',
  // Terrein
  'Veengebieden', 'Geomorfologie', 'Bodemkaart',
  // Fossielen, Mineralen & Goud
  'Fossiel Hotspots', 'Mineralen Hotspots', 'Goudrivieren',
  'Fossielen Nederland', 'Fossielen België', 'Fossielen Duitsland', 'Fossielen Frankrijk',
  // Recreatie
  'Parken', 'Speeltuinen', 'Strandjes',
  // Percelen
  'Gewaspercelen', 'Kadastrale Grenzen',
  // Provinciale Waardenkaarten - Zuid-Holland
  'Scheepswrakken', 'Woonheuvels ZH', 'Windmolens', 'Erfgoedlijnen', 'Oude Kernen',
  // Provinciale Waardenkaarten - Gelderland
  'Relictenkaart Punten', 'Relictenkaart Lijnen', 'Relictenkaart Vlakken',
  // Provinciale Waardenkaarten - Zeeland
  'Verdronken Dorpen'
]

// Base layers
const BASE_LAYERS = [
  'Esri (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
]

// Center of Netherlands (Utrecht area) and zoom level for ~50km view
const NL_CENTER = [5.2913, 52.1326] // [lon, lat]
const NL_ZOOM = 8 // ~50km view

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

  // State for save feedback
  const [savedPresetId, setSavedPresetId] = useState<string | null>(null)
  const [showAddPreset, setShowAddPreset] = useState(false)
  const [newPresetName, setNewPresetName] = useState('')

  const resetAll = () => {
    // Close any open panels
    closeAllPanels()

    // Turn off all overlay layers
    ALL_OVERLAYS.forEach(layer => setLayerVisibility(layer, false))

    // Set the light worldwide map as active base layer
    BASE_LAYERS.forEach(layer => {
      setLayerVisibility(layer, layer === 'Esri (licht)')
    })
    setLayerVisibility('Labels Overlay', true)

    // Stop GPS tracking
    stopTracking()

    // Clear monument filter
    clearMonumentFilter()

    // Zoom to center of Netherlands at ~50km view
    if (map) {
      const view = map.getView()
      view.animate({
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

  // Save current visible layers to a preset
  const handleSaveToPreset = (e: React.MouseEvent, presetId: string, presetName: string) => {
    e.stopPropagation()

    // Confirm before overwriting
    if (!confirm(`Preset "${presetName}" overschrijven met huidige lagen?`)) {
      return
    }

    const currentLayers = Object.entries(visible)
      .filter(([layerName, isVisible]) => isVisible && ALL_OVERLAYS.includes(layerName))
      .map(([layerName]) => layerName)
    const currentBaseLayer = BASE_LAYERS.find((layerName) => visible[layerName])
    updatePreset(presetId, {
      layers: currentLayers,
      baseLayer: currentBaseLayer || 'Esri (licht)'
    })

    // Show feedback
    setSavedPresetId(presetId)
    setTimeout(() => setSavedPresetId(null), 2000)
    console.log(`💾 Lagen opgeslagen naar preset`)
  }

  // Add new preset with current layers
  const handleAddPreset = () => {
    if (!newPresetName.trim()) return
    createPreset(newPresetName.trim(), 'Layers')
    setNewPresetName('')
    setShowAddPreset(false)
  }

  // Reset presets to defaults
  const handleResetPresets = () => {
    if (confirm('Presets terugzetten naar standaard?')) {
      resetToDefaults()
    }
  }

  return (
    <>
      {/* Reset button - bottom left, above nothing */}
      <motion.button
        onClick={resetAll}
        className="fixed bottom-2 left-2 z-[800] w-11 h-11 flex items-center justify-center bg-white/80 hover:bg-white/90 rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Reset - lichtgrijze kaart, alle lagen uit, GPS uit"
      >
        <RotateCcw size={20} className="text-gray-600 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
      </motion.button>

      {/* Presets button - above reset */}
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
                onChange={(e) => setNewPresetName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddPreset()
                  if (e.key === 'Escape') setShowAddPreset(false)
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
        <div className="p-2">
          {presets.map((preset: Preset) => {
            const IconComponent = ICON_MAP[preset.icon] || Layers
            const iconColor = ICON_COLORS[preset.icon] || 'text-blue-600'
            const hoverColor = HOVER_COLORS[preset.icon] || 'hover:bg-blue-50'
            const isSaved = savedPresetId === preset.id

            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className={`w-full flex items-center gap-2 px-3 ${hoverColor} rounded-lg text-left transition-colors border-0 outline-none bg-transparent overflow-hidden ${isSaved ? 'bg-green-50' : ''}`}
                style={{
                  fontSize: `${baseFontSize}px`,
                  paddingTop: `${8 * spacingScale}px`,
                  paddingBottom: `${8 * spacingScale}px`
                }}
              >
                <IconComponent size={16} className={`${iconColor} flex-shrink-0`} />
                <span className="text-gray-700 truncate flex-1">{preset.name}</span>
                {isSaved ? (
                  <span className="p-1 flex-shrink-0">
                    <Check size={16} className="text-green-500" />
                  </span>
                ) : (
                  <span
                    onClick={(e) => handleSaveToPreset(e, preset.id, preset.name)}
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                    title="Huidige lagen opslaan naar deze preset"
                  >
                    <Save size={14} className="text-gray-400 hover:text-blue-500" />
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
