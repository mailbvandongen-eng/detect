import { useState } from 'react'
import { RotateCcw, Compass, TreePalm, Layers, ChevronUp, Mountain, Waves, Search, Target, Grid3X3, Save, Plus, RotateCw, Check, LucideIcon, Bookmark, Trash2, Map, List, Pencil } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLayerStore, useGPSStore, useUIStore, usePresetStore, useSettingsStore, useMapStore } from '../../store'
import { useMonumentFilterStore } from '../../store/monumentFilterStore'
import { captureCurrentPresetSnapshot, type Preset } from '../../store/presetStore'
import { fromLonLat, toLonLat } from 'ol/proj'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'
import { AppWindow } from './AppWindow'

const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  TreePalm,
  Mountain,
  Waves,
  Search,
  Target,
  Layers,
  Grid: Grid3X3,
  Map
}

const ICON_COLORS: Record<string, string> = {
  Compass: 'text-purple-600',
  Waves: 'text-cyan-600',
  TreePalm: 'text-green-600',
  Mountain: 'text-stone-600',
  Search: 'text-amber-600',
  Target: 'text-red-600',
  Layers: 'text-blue-600',
  Grid: 'text-lime-600',
  Map: 'text-amber-700'
}

const HOVER_COLORS: Record<string, string> = {
  Compass: 'hover:bg-purple-50',
  Waves: 'hover:bg-cyan-50',
  TreePalm: 'hover:bg-green-50',
  Mountain: 'hover:bg-stone-50',
  Search: 'hover:bg-amber-50',
  Target: 'hover:bg-red-50',
  Layers: 'hover:bg-blue-50',
  Grid: 'hover:bg-lime-50',
  Map: 'hover:bg-amber-50'
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
  const { presets, applyPreset, updatePreset, createPreset, deletePreset, resetToDefaults } = usePresetStore()
  const visible = useLayerStore(state => state.visible)

  const fontScale = useSettingsStore(state => state.fontScale)
  const baseFontSize = 14 * fontScale / 100
  const spacingScale = fontScale / 100

  const [savedPresetId, setSavedPresetId] = useState<string | null>(null)
  const [showAddPreset, setShowAddPreset] = useState(false)
  const [newPresetName, setNewPresetName] = useState('')
  const [rememberMapView, setRememberMapView] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editRememberView, setEditRememberView] = useState(false)
  const saveEdit = () => {
    if (!editingId || !editName.trim()) return
    const existing = presets.find(p => p.id === editingId)
    const center = map?.getView().getCenter()
    const zoom = map?.getView().getZoom()
    if (editRememberView && !existing?.mapView && (!center || typeof zoom !== 'number')) return
    updatePreset(editingId, { name: editName.trim(), mapView: editRememberView
      ? existing?.mapView || { center: toLonLat(center!) as [number, number], zoom: zoom! }
      : null })
    setEditingId(null)
  }

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

    for (const store of [useCustomLayerStore, useCustomPointLayerStore]) {
      const state = store.getState()
      state.layers.filter(layer => layer.visible).forEach(layer => state.toggleVisibility(layer.id))
    }
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
    const selectedPreset = presets.find((preset) => preset.id === id)
    if (selectedPreset?.mapView) stopTracking()
    applyPreset(id)
    useUIStore.setState({ placeListScope: `preset:${id}` })
    closeAllPanels()
  }

  const handleSaveToPreset = (event: React.MouseEvent, presetId: string, presetName: string) => {
    event.stopPropagation()

    if (!confirm(`Preset "${presetName}" overschrijven met huidige lagen?`)) return

    const snapshot = captureCurrentPresetSnapshot()
    const existingPreset = presets.find(preset => preset.id === presetId)
    const view = map?.getView()
    const center = view?.getCenter()
    const zoom = view?.getZoom()
    const currentMapView = existingPreset?.mapView && center && typeof zoom === 'number'
      ? {
          center: toLonLat(center) as [number, number],
          zoom
        }
      : existingPreset?.mapView

    updatePreset(presetId, {
      ...snapshot,
      mapView: currentMapView
    })

    setSavedPresetId(presetId)
    setTimeout(() => setSavedPresetId(null), 2000)
    console.log('💾 Preset volledig opgeslagen: vaste lagen, Mijn lagen, basiskaart en transparantie')
  }

  const handleAddPreset = () => {
    if (!newPresetName.trim()) return
    createPreset(newPresetName.trim(), 'Layers', rememberMapView)
    setNewPresetName('')
    setRememberMapView(false)
    setShowAddPreset(false)
  }

  const handleDeletePreset = (event: React.MouseEvent, preset: Preset) => {
    event.stopPropagation()
    if (preset.isBuiltIn) return
    if (!confirm(`Preset "${preset.name}" verwijderen?`)) return
    deletePreset(preset.id)
  }

  const handleResetPresets = () => {
    if (confirm('Standaardpresets herstellen? Hun opgeslagen laagkeuzes en kaartpositie worden teruggezet. Je eigen presets blijven behouden.')) resetToDefaults()
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
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPresetName}
                  onChange={(event) => setNewPresetName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleAddPreset()
                    if (event.key === 'Escape') {
                      setRememberMapView(false)
                      setShowAddPreset(false)
                    }
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
              <label className="flex items-center gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMapView}
                  onChange={(event) => setRememberMapView(event.target.checked)}
                  className="h-4 w-4 accent-blue-600"
                />
                <span>Locatie & zoom onthouden</span>
              </label>
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
              <div key={preset.id} className="mb-1 rounded-lg" data-preset-id={preset.id}><div className="flex items-center gap-1">
              <button
                onClick={() => handleApplyPreset(preset.id)}
                className={`min-h-[44px] min-w-0 flex-1 flex items-center gap-1.5 px-2.5 ${hoverColor} rounded-lg text-left transition-colors border-0 outline-none bg-transparent overflow-hidden ${isSaved ? 'bg-green-50' : ''}`}
                style={{
                  fontSize: `${baseFontSize}px`,
                  paddingTop: `${6 * spacingScale}px`,
                  paddingBottom: `${6 * spacingScale}px`
                }}
              >
                <IconComponent size={15} className={`${iconColor} flex-shrink-0`} />
                <span className="text-gray-700 truncate flex-1">{preset.name}</span>
              </button>
              <button type="button" className="detect-window-icon-button shrink-0" style={{minWidth:44,minHeight:44}} title="Huidige lagen opslaan naar deze preset" aria-label={`Lagen opslaan in ${preset.name}`} onClick={event => handleSaveToPreset(event,preset.id,preset.name)}>{isSaved ? <Check size={18} className="text-green-500"/> : <Save size={18}/>}</button>
              <button type="button" className="detect-window-icon-button shrink-0" style={{minWidth:44,minHeight:44}} aria-label={`Preset ${preset.name} bewerken`} title="Preset bewerken" onClick={() => {setEditingId(preset.id);setEditName(preset.name);setEditRememberView(!!preset.mapView)}}><Pencil size={18}/></button>
              <button type="button" className="detect-window-icon-button shrink-0" style={{minWidth:44,minHeight:44}} aria-label={`Lijst van ${preset.name}`} title={`Lijst van ${preset.name}`} onClick={() => useUIStore.getState().openPlaceList(`preset:${preset.id}`)}><List size={18}/></button>
              </div>
              {editingId === preset.id && <form className="p-2 space-y-2" onSubmit={event => {event.preventDefault();saveEdit()}}>
                <label className="block text-sm">Naam preset<input aria-label="Naam preset" className="block w-full border rounded-lg p-2" value={editName} onChange={event => setEditName(event.target.value)} required/></label>
                <label className="flex items-center gap-2 min-h-[44px] text-sm"><input type="checkbox" checked={editRememberView} onChange={event => setEditRememberView(event.target.checked)}/>Locatie & zoom onthouden</label>
                <div className="flex gap-2"><button type="submit" className="detect-window-primary-button" disabled={!editName.trim()}>Opslaan</button><button type="button" className="detect-window-secondary-button" onClick={() => setEditingId(null)}>Annuleren</button>{!preset.isBuiltIn && <button type="button" className="detect-window-icon-button" style={{minWidth:44,minHeight:44}} title="Preset verwijderen" aria-label={`Preset ${preset.name} verwijderen`} onClick={event => handleDeletePreset(event,preset)}><Trash2 size={18}/></button>}</div>
              </form>}
              </div>
            )
          })}
        </div>
      </AppWindow>
    </>
  )
}
