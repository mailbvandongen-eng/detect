import { useState } from 'react'
import { Settings, Map, Navigation, Smartphone, Layers, Plus, Trash2, MapPin, Download, BarChart3, Pencil, Upload, Bug, User, Sliders, Volume2, Cloud, WifiOff, Palette } from 'lucide-react'

const BUG_REPORT_URL = 'https://forms.gle/R5LCk11Bzu5XrkBj8'
import { useUIStore, useSettingsStore, usePresetStore } from '../../store'
import { useLocalVondstenStore } from '../../store/localVondstenStore'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'
import { VondstenDashboard } from '../Vondst/VondstenDashboard'
import { ImportLayerModal, CustomLayerItem } from '../CustomLayers'
import { GoogleSignInButton } from '../Auth/GoogleSignInButton'
import type { DefaultBackground, DetectTheme } from '../../store/settingsStore'
import { AppWindow } from './AppWindow'

type TabType = 'algemeen' | 'lagen' | 'vondsten'

const DETECT_THEMES: { id: DetectTheme; label: string; color: string }[] = [
  { id: 'blue', label: 'Detect-blauw', color: '#3b82f6' },
  { id: 'forest', label: 'Bosgroen', color: '#228b5a' },
  { id: 'earth', label: 'Aardetint', color: '#b86632' },
  { id: 'purple', label: 'Paars', color: '#7c4dca' }
]

export function SettingsPanel() {
  const settingsPanelOpen = useUIStore(state => state.activeWindow === 'settings')
  const vondstDashboardOpen = useUIStore(state => state.activeWindow === 'vondstDashboard')
  const importModalOpen = useUIStore(state => state.activeWindow === 'importLayer')
  const toggleSettingsPanel = useUIStore(state => state.toggleSettingsPanel)
  const openWindow = useUIStore(state => state.openWindow)
  const backWindow = useUIStore(state => state.backWindow)
  const settings = useSettingsStore()
  const { presets, createPreset, deletePreset, updatePreset } = usePresetStore()
  const vondsten = useLocalVondstenStore(state => state.vondsten)
  const customLayers = useCustomLayerStore(state => state.layers)
  const { layers: customPointLayers, updateLayer: updateCustomPointLayer } = useCustomPointLayerStore()
  const [newPresetName, setNewPresetName] = useState('')
  const [showNewPresetInput, setShowNewPresetInput] = useState(false)
  const [renamingPresetId, setRenamingPresetId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [renamingLayerId, setRenamingLayerId] = useState<string | null>(null)
  const [renameLayerValue, setRenameLayerValue] = useState('')
  const [activeTab, setActiveTab] = useState<TabType>('algemeen')

  const handleCreatePreset = () => {
    if (newPresetName.trim()) {
      createPreset(newPresetName.trim(), 'Layers')
      setNewPresetName('')
      setShowNewPresetInput(false)
    }
  }
  const startRenamePreset = (id: string, currentName: string) => { setRenamingPresetId(id); setRenameValue(currentName) }
  const handleRenamePreset = (id: string) => { if (renameValue.trim()) updatePreset(id, { name: renameValue.trim() }); setRenamingPresetId(null); setRenameValue('') }
  const cancelRename = () => { setRenamingPresetId(null); setRenameValue('') }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'algemeen', label: 'Algemeen', icon: <Sliders size={14} /> },
    { id: 'lagen', label: 'Lagen', icon: <Layers size={14} /> },
    { id: 'vondsten', label: 'Vondsten', icon: <MapPin size={14} /> }
  ]

  return (
    <>
      <AppWindow isOpen={settingsPanelOpen} title="Instellingen" icon={<Settings size={18} />} placement="modal" onClose={toggleSettingsPanel}
        subHeader={<div className="flex">{tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors border-0 outline-none ${activeTab === tab.id ? 'text-[var(--detect-accent-text)] border-b-2 border-[var(--detect-accent)] bg-[var(--detect-accent-soft)]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>{tab.icon}{tab.label}</button>)}</div>}
        footer={<div className="space-y-1"><a href={BUG_REPORT_URL} target="_blank" rel="noopener noreferrer" className="detect-window-secondary-button flex w-full items-center justify-center gap-2"><Bug size={16} /><span>Meld een bug</span></a><p className="text-center text-gray-400" style={{ fontSize: '0.75em' }}>Instellingen worden lokaal opgeslagen</p></div>}
      >
        <div className="p-3 space-y-5">
          {activeTab === 'algemeen' && <>
            <section><h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2"><Palette size={16} /> Detect huisstijl</h3><div className="grid grid-cols-2 gap-2">{DETECT_THEMES.map(theme => <button key={theme.id} onClick={() => settings.setUiTheme(theme.id)} className={`flex items-center gap-2 rounded-lg border p-2 text-left ${settings.uiTheme === theme.id ? 'border-[var(--detect-accent)] bg-[var(--detect-accent-soft)]' : 'border-gray-200'}`}><span className="w-4 h-4 rounded-full" style={{ background: theme.color }} /><span className="text-sm">{theme.label}</span></button>)}</div></section>
            <section className="space-y-2"><h3 className="font-medium text-gray-800 flex items-center gap-2"><Map size={16} /> Kaart</h3><label className="flex items-center justify-between text-sm"><span>Schaalbalk</span><input type="checkbox" checked={settings.showScaleBar} onChange={e => settings.setShowScaleBar(e.target.checked)} /></label><label className="flex items-center justify-between text-sm"><span>Standaardkaart</span><select value={settings.defaultBackground} onChange={e => settings.setDefaultBackground(e.target.value as DefaultBackground)}><option>Esri (licht)</option><option>Luchtfoto</option><option>OpenStreetMap</option></select></label></section>
            <section className="space-y-2"><h3 className="font-medium text-gray-800 flex items-center gap-2"><Navigation size={16} /> GPS</h3><label className="flex items-center justify-between text-sm"><span>GPS automatisch starten</span><input type="checkbox" checked={settings.gpsAutoStart} onChange={e => settings.setGpsAutoStart(e.target.checked)} /></label><label className="flex items-center justify-between text-sm"><span>Nauwkeurigheidscirkel</span><input type="checkbox" checked={settings.showAccuracyCircle} onChange={e => settings.setShowAccuracyCircle(e.target.checked)} /></label></section>
            <section className="space-y-2"><h3 className="font-medium text-gray-800 flex items-center gap-2"><Smartphone size={16} /> Interface</h3><label className="flex items-center justify-between text-sm"><span>Haptische feedback</span><input type="checkbox" checked={settings.hapticFeedback} onChange={e => settings.setHapticFeedback(e.target.checked)} /></label><label className="flex items-center justify-between text-sm"><span>Lettergrootte</span><input type="range" min="80" max="130" step="10" value={settings.fontScale} onChange={e => settings.setFontScale(Number(e.target.value))} /></label></section>
          </>}
          {activeTab === 'lagen' && <section className="space-y-3"><h3 className="font-medium text-gray-800 flex items-center gap-2"><Layers size={16} /> Lagen</h3><label className="flex items-center justify-between text-sm"><span>Eigen puntlagen tonen</span><input type="checkbox" checked={settings.showCustomPointLayers} onChange={e => settings.setShowCustomPointLayers(e.target.checked)} /></label><label className="flex items-center justify-between text-sm"><span>Vondsten op kaart tonen</span><input type="checkbox" checked={settings.showLocalVondsten} onChange={e => settings.setShowLocalVondsten(e.target.checked)} /></label><button className="detect-window-secondary-button w-full" onClick={() => openWindow('importLayer', 'settings')}><Upload size={16} /> Laag importeren</button></section>}
          {activeTab === 'vondsten' && <section className="space-y-3"><h3 className="font-medium text-gray-800 flex items-center gap-2"><MapPin size={16} /> Vondsten</h3><p className="text-sm text-gray-500">{vondsten.length} vondsten opgeslagen</p><label className="flex items-center justify-between text-sm"><span>Alleen lokaal opslaan</span><input type="checkbox" checked={settings.vondstenLocalOnly} onChange={e => settings.setVondstenLocalOnly(e.target.checked)} /></label><button className="detect-window-secondary-button w-full" onClick={() => openWindow('vondstDashboard', 'settings')}><BarChart3 size={16} /> Vondsten beheren</button></section>}
        </div>
      </AppWindow>
      <VondstenDashboard isOpen={vondstDashboardOpen} onClose={backWindow} />
      <ImportLayerModal isOpen={importModalOpen} onClose={backWindow} />
    </>
  )
}
