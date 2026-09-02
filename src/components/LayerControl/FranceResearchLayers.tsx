import { useState } from 'react'
import { ChevronRight, Folder, FolderOpen } from 'lucide-react'
import { useLayerStore, useMapStore } from '../../store'
import { FRANCE_RESEARCH_FACTORIES } from '../../layers/franceResearchOL'

const TERRAIN = [
  ['LiDAR HD terrein FR', 0.78]
] as const

const ARCHAEOLOGY = [
  ['ArcheOcc · archeologie Occitanie', 1],
  ['Thédirac prehistorie & megalieten', 1],
  ['Thédirac Romeins & middeleeuws', 1]
] as const

function ResearchFolder({ title, layers }: { title: string; layers: readonly (readonly [string, number])[] }) {
  const [expanded, setExpanded] = useState(true)
  const map = useMapStore(state => state.map)
  const visible = useLayerStore(state => state.visible)
  const registered = useLayerStore(state => state.layers)
  const registerLayer = useLayerStore(state => state.registerLayer)
  const setLayerVisibility = useLayerStore(state => state.setLayerVisibility)
  const setLayerOpacity = useLayerStore(state => state.setLayerOpacity)

  const toggle = (name: string, opacity: number) => {
    const next = !visible[name]
    if (next && !registered[name]) {
      const factory = FRANCE_RESEARCH_FACTORIES[name]
      if (!factory || !map) return
      const layer = factory()
      map.addLayer(layer)
      registerLayer(name, layer)
      setLayerOpacity(name, opacity)
    }
    setLayerVisibility(name, next)
  }

  return <div className="mb-0.5">
    <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }} className="w-full flex items-center gap-1 py-1 px-1 hover:bg-blue-50 transition-colors bg-transparent border-0 outline-none text-left" style={{ fontSize: 'inherit' }}>
      <ChevronRight size={14} className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      {expanded ? <FolderOpen size={15} className="text-blue-500" /> : <Folder size={15} className="text-blue-500" />}
      <span className="text-gray-700 font-medium">{title}</span>
    </button>
    {expanded && <div className="ml-5">{layers.map(([name, opacity]) => <button key={name} onClick={(e) => { e.stopPropagation(); toggle(name, opacity) }} className={`w-full flex items-center justify-between py-1 pl-2 pr-1 border-0 outline-none transition-colors text-left ${visible[name] ? 'bg-blue-50' : 'bg-transparent hover:bg-blue-50'}`} style={{ fontSize: 'inherit' }}><span className="text-gray-600">{name}</span><span className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0" style={{ backgroundColor: visible[name] ? '#3b82f6' : 'white', border: '2px solid #60a5fa', color: 'white' }}>{visible[name] && <span style={{ fontSize: 11, lineHeight: 1 }}>✓</span>}</span></button>)}</div>}
  </div>
}

export function FranceResearchLayers() {
  return <div className="mb-1 border-b border-gray-100 pb-1">
    <ResearchFolder title="Frankrijk · reliëf" layers={TERRAIN} />
    <ResearchFolder title="Occitanie · archeologie" layers={ARCHAEOLOGY} />
  </div>
}
