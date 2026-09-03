import { useState } from 'react'
import { ChevronRight, Folder, FolderOpen } from 'lucide-react'
import { useLayerStore, useMapStore } from '../../store'
import { FRANCE_RESEARCH_FACTORIES } from '../../layers/franceResearchOL'

const TERRAIN = [
  ['LiDAR HD terrein FR', 0.78]
] as const

const WATER_LANDSCAPE = [
  ['Waterlopen BD TOPAGE 2026', 0.9],
  ['OCS GE landbedekking 2021-2023', 0.62]
] as const

const SOIL_GEOLOGY = [
  ['Bodem/geologie 1:50.000 FR', 0.68],
  ['Geologie + reliëf FR', 0.66],
  ['BRGM boringen · BSS', 1],
  ['BRGM IDPR · infiltratie/afstroming', 0.55],
  ['BRGM cavités · ondergrondse holtes', 1]
] as const

const ARCHAEOLOGY_HISTORY = [
  ['ArcheOcc · Thédirac-regio', 1],
  ['Oude bossen · Forêts anciennes', 0.72]
] as const

const ANALYSIS = [
  ['Onderzoekszone Thédirac', 0.9],
  ['Hellingklassen Thédirac', 0.5],
  ['Onderzoekskaart Thédirac', 0.72]
] as const

export const FRANCE_RESEARCH_LAYERS = [
  ...TERRAIN,
  ...WATER_LANDSCAPE,
  ...SOIL_GEOLOGY,
  ...ARCHAEOLOGY_HISTORY,
  ...ANALYSIS
] as const

function ensureLayer(
  name: string,
  opacity: number,
  map: any,
  registered: Record<string, any>,
  registerLayer: any,
  setLayerOpacity: any
) {
  if (registered[name]) return
  const factory = FRANCE_RESEARCH_FACTORIES[name]
  if (!factory || !map) return
  const layer = factory()
  map.addLayer(layer)
  registerLayer(name, layer)
  setLayerOpacity(name, opacity)
}

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
    if (next) ensureLayer(name, opacity, map, registered, registerLayer, setLayerOpacity)
    setLayerVisibility(name, next)
  }

  return (
    <div className="mb-0.5">
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
        className="w-full flex items-center gap-1 py-1 px-1 hover:bg-blue-50 transition-colors bg-transparent border-0 outline-none text-left"
        style={{ fontSize: 'inherit' }}
      >
        <ChevronRight size={14} className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        {expanded ? <FolderOpen size={15} className="text-blue-500" /> : <Folder size={15} className="text-blue-500" />}
        <span className="text-gray-700 font-medium">{title}</span>
      </button>
      {expanded && (
        <div className="ml-5">
          {layers.map(([name, opacity]) => (
            <button
              key={name}
              onClick={(e) => { e.stopPropagation(); toggle(name, opacity) }}
              className={`w-full flex items-center justify-between py-1 pl-2 pr-1 border-0 outline-none transition-colors text-left ${visible[name] ? 'bg-blue-50' : 'bg-transparent hover:bg-blue-50'}`}
              style={{ fontSize: 'inherit' }}
            >
              <span className="text-gray-600">{name}</span>
              <span
                className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: visible[name] ? '#3b82f6' : 'white', border: '2px solid #60a5fa', color: 'white' }}
              >
                {visible[name] && <span style={{ fontSize: 11, lineHeight: 1 }}>✓</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function FranceResearchLayers() {
  return (
    <div className="mb-1 border-b border-gray-100 pb-1">
      <ResearchFolder title="Terrein & reliëf" layers={TERRAIN} />
      <ResearchFolder title="Water & landschap" layers={WATER_LANDSCAPE} />
      <ResearchFolder title="Bodem & geologie" layers={SOIL_GEOLOGY} />
      <ResearchFolder title="Archeologie & historie" layers={ARCHAEOLOGY_HISTORY} />
      <ResearchFolder title="Analyse" layers={ANALYSIS} />
    </div>
  )
}
