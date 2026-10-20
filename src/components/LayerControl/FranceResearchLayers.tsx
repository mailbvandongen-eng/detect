import { THEDIRAC_FORTIFICATION_COLOR } from '../../data/thediracFortifications'
import { useState } from 'react'
import { AlertCircle, Check, ChevronRight, Circle, Folder, FolderOpen, Loader2 } from 'lucide-react'
import { useLayerStore, useMapStore } from '../../store'
import { FRANCE_RESEARCH_FACTORIES } from '../../layers/franceResearchOL'
import { THEDIRAC_RESEARCH_LAYER_NAME } from '../../data/thediracResearchSites'
import {
  FRANCE_HISTORICAL_MAP_NAMES,
  FRANCE_RESEARCH_LAYER_DEFINITIONS,
  type FranceResearchGroup,
  type FranceResearchLayerDefinition
} from '../../config/franceResearchLayers'

export const FRANCE_RESEARCH_LAYERS = FRANCE_RESEARCH_LAYER_DEFINITIONS.map(layer => [layer.name, layer.opacity] as const)

function ensureLayer(
  name: string,
  opacity: number,
  map: any,
  registered: Record<string, any>,
  registerLayer: any,
  setLayerOpacity: any,
  setLayerStatus: any
) {
  if (registered[name]) return
  const factory = FRANCE_RESEARCH_FACTORIES[name]
  if (!factory || !map) return
  setLayerStatus(name, 'loading')
  try {
    const layer = factory()
    map.addLayer(layer)
    registerLayer(name, layer)
    setLayerOpacity(name, opacity)
    setLayerStatus(name, 'loaded')
  } catch (error) {
    setLayerStatus(name, 'error')
    console.error(`Frankrijk-laag kon niet worden geladen: ${name}`, error)
  }
}

function ResearchFolder({ title, layers, help }: { title: string; layers: readonly FranceResearchLayerDefinition[]; help?: string }) {
  const [expanded, setExpanded] = useState(true)
  const map = useMapStore(state => state.map)
  const visible = useLayerStore(state => state.visible)
  const registered = useLayerStore(state => state.layers)
  const registerLayer = useLayerStore(state => state.registerLayer)
  const loadingState = useLayerStore(state => state.loadingState)
  const setLayerVisibility = useLayerStore(state => state.setLayerVisibility)
  const setLayerOpacity = useLayerStore(state => state.setLayerOpacity)
  const setLayerStatus = useLayerStore(state => state.setLayerStatus)

  const toggle = (name: string, opacity: number) => {
    const next = !visible[name]
    if (next) {
      if (FRANCE_HISTORICAL_MAP_NAMES.includes(name as typeof FRANCE_HISTORICAL_MAP_NAMES[number])) {
        FRANCE_HISTORICAL_MAP_NAMES
          .filter(otherName => otherName !== name)
          .forEach(otherName => setLayerVisibility(otherName, false))
      }
      ensureLayer(name, opacity, map, registered, registerLayer, setLayerOpacity, setLayerStatus)
    }
    setLayerVisibility(name, next, false)
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
          {help && <p className="px-2 py-1 text-xs text-gray-500">{help}</p>}
          {layers.map(layer => {
            const { name, opacity } = layer
            const status = loadingState[name]
            const ready = Boolean(registered[name]) && status !== 'error'
            return (
            <button
              key={name}
              onClick={(e) => { e.stopPropagation(); toggle(name, opacity) }}
              className={`w-full flex items-center justify-between py-1 pl-2 pr-1 border-0 outline-none transition-colors text-left ${visible[name] ? 'bg-blue-50' : 'bg-transparent hover:bg-blue-50'}`}
              style={{ fontSize: 'inherit' }}
            >
              <span className={`text-gray-600 ${status === 'error' ? 'text-red-600' : ''}`}>{name}{name.includes('Napoleontisch kadaster') && <small className="block text-gray-500">Gemeentepunten → klik voor archiefbladen</small>}</span>
              <span
                className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: visible[name] ? '#3b82f6' : 'white', border: '2px solid #60a5fa', color: 'white' }}
              >
                {status === 'loading' ? <Loader2 size={11} className="animate-spin" />
                  : status === 'error' ? <AlertCircle size={11} />
                    : visible[name] ? <Check size={11} /> : null}
              </span>
              {!visible[name] && status === 'loaded' && <span className="sr-only">geladen</span>}
              {visible[name] && status === 'error' && <span className="sr-only">laden mislukt</span>}
              {visible[name] && status !== 'error' && status !== 'loading' && !ready && <Circle size={10} className="text-gray-400" aria-label="niet geladen" />}
            </button>
          )
          })}
          {layers.some(layer => layer.name === THEDIRAC_RESEARCH_LAYER_NAME) && (
            <div className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-600">
              <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{backgroundColor: THEDIRAC_FORTIFICATION_COLOR, border: '0.75px solid white'}} />
              Versterkingen / heuvelforten
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function FranceResearchLayers() {
  const groups: Record<FranceResearchGroup, FranceResearchLayerDefinition[]> = {
    terrain: [], water: [], geology: [], finds: [], history: [], archaeology: [], sights: [], hikes: []
  }
  FRANCE_RESEARCH_LAYER_DEFINITIONS.forEach(layer => groups[layer.group].push(layer))
  return (
    <div className="mb-1 border-b border-gray-100 pb-1">
      <ResearchFolder title="Terrein & reliëf" layers={groups.terrain} />
      <ResearchFolder title="Water & landschap" layers={groups.water} />
      <ResearchFolder title="Bodem & geologie" layers={groups.geology} />
      <ResearchFolder title="Mineralen & fossielen" layers={groups.finds} />
      <ResearchFolder title="Historische kaarten" layers={groups.history} help="Kies één historische kaart voor een helder beeld. De andere kaarten blijven beschikbaar maar worden niet tegelijk over elkaar gelegd. Napoleon toont gemeentepunten naar de officiële archiefbladen." />
      <ResearchFolder title="Archeologie & historie" layers={groups.archaeology} />
      <ResearchFolder title="Bezienswaardigheden" layers={groups.sights} />
      <ResearchFolder title="Wandelroutes" layers={groups.hikes} />
    </div>
  )
}
