/**
 * Monument Search Component
 * Bottom sheet style - 35% default, click header for fullscreen
 * Highlight stays when closed
 */

import { useState, useRef, useEffect } from 'react'
import { Search, X, Landmark, ZoomIn, ChevronDown, ChevronUp, GripHorizontal } from 'lucide-react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useMapStore, useSettingsStore } from '../../store'
import { searchMonuments, getMonumentFeature, PROVINCES, type MonumentSearchResult } from '../../utils/monumentSearch'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Fill, Stroke } from 'ol/style'
import { buffer } from 'ol/extent'

interface MonumentSearchProps {
  isOpen: boolean
  onClose: () => void
}

// Quality badge colors
const QUALITY_COLORS: Record<string, string> = {
  'zeer hoge archeologische waarde': 'bg-purple-600',
  'hoge archeologische waarde': 'bg-purple-500',
  'archeologische waarde': 'bg-purple-400'
}

const QUALITY_SHORT: Record<string, string> = {
  'zeer hoge archeologische waarde': 'Zeer hoog',
  'hoge archeologische waarde': 'Hoog',
  'archeologische waarde': 'Waarde'
}

// Highlight layer for selected monument - persists after close
let highlightLayer: VectorLayer<VectorSource> | null = null

function getHighlightLayer(map: any): VectorLayer<VectorSource> {
  if (!highlightLayer) {
    highlightLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        fill: new Fill({ color: 'rgba(147, 51, 234, 0.5)' }),
        stroke: new Stroke({ color: '#9333ea', width: 3 })
      }),
      zIndex: 9999
    })
    map.addLayer(highlightLayer)
  }
  return highlightLayer
}

// Export for external clear (e.g., from map click)
export function clearMonumentHighlight() {
  if (highlightLayer) {
    highlightLayer.getSource()?.clear()
  }
}

async function highlightMonument(map: any, monumentnummer: number) {
  const feature = await getMonumentFeature(monumentnummer)
  if (!feature) return

  const layer = getHighlightLayer(map)
  const source = layer.getSource()
  source?.clear()

  const clonedFeature = feature.clone()
  source?.addFeature(clonedFeature)
}

export function MonumentSearch({ isOpen, onClose }: MonumentSearchProps) {
  const map = useMapStore(state => state.map)
  const settings = useSettingsStore()

  const [query, setQuery] = useState('')
  const [province, setProvince] = useState('all')
  const [results, setResults] = useState<MonumentSearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [maxResults, setMaxResults] = useState(50)
  const [isExpanded, setIsExpanded] = useState(false) // false = 35%, true = fullscreen

  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<number>()

  const baseFontSize = 13 * settings.fontScale / 100

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Reset search state when closed, but NOT the highlight
  useEffect(() => {
    if (!isOpen) {
      // Don't clear highlight - keep it visible!
      setIsExpanded(false)
    }
  }, [isOpen])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (query.length < 2) {
      setResults([])
      setHasSearched(false)
      return
    }

    debounceRef.current = window.setTimeout(async () => {
      setSearching(true)
      setHasSearched(true)
      try {
        const searchResults = await searchMonuments(query, maxResults, province)
        setResults(searchResults)
      } catch (error) {
        console.error('Monument search error:', error)
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 400)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, province, maxResults])

  const handleResultClick = async (result: MonumentSearchResult) => {
    if (!map) return

    const view = map.getView()

    if (selectedId === result.id) {
      // Second click: zoom in closer
      const paddedExtent = buffer(result.extent, 50)
      view.fit(paddedExtent, { duration: 500, maxZoom: 18 })
    } else {
      // First click: fit to monument extent with padding
      const paddedExtent = buffer(result.extent, 200)
      view.fit(paddedExtent, { duration: 500, maxZoom: 16 })

      // Highlight the monument polygon
      await highlightMonument(map, result.monumentnummer)
      setSelectedId(result.id)
      setExpandedId(result.id)
    }
  }

  const handleZoomClick = (result: MonumentSearchResult, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!map) return

    const view = map.getView()
    const paddedExtent = buffer(result.extent, 20)
    view.fit(paddedExtent, { duration: 500, maxZoom: 18 })
  }

  const toggleExpand = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedId(expandedId === id ? null : id)
  }

  const handleClose = () => {
    // Don't clear highlight - user can still see the monument
    onClose()
  }

  const handleClearAndClose = () => {
    clearMonumentHighlight()
    setQuery('')
    setProvince('all')
    setResults([])
    setHasSearched(false)
    setSelectedId(null)
    setExpandedId(null)
    setMaxResults(50)
    onClose()
  }

  // Handle drag gesture for swipe up/down
  const handleDragEnd = (_: any, info: PanInfo) => {
    const velocity = info.velocity.y
    const offset = info.offset.y

    if (!isExpanded) {
      // Currently at 38vh
      if (offset < -50 || velocity < -500) {
        setIsExpanded(true) // Swipe up → expand to 85vh
      } else if (offset > 100 || velocity > 500) {
        handleClose() // Strong swipe down → close
      }
    } else {
      // Currently at 85vh (expanded)
      if (offset > 50 || velocity > 300) {
        setIsExpanded(false) // Swipe down → back to 38vh
      }
    }
  }

  // Highlight matched words in text
  const highlightMatches = (text: string) => {
    if (!query || query.length < 2) return text
    const words = query.toLowerCase().split(/\s+/).filter(w => w.length >= 2)
    let result = text
    words.forEach(word => {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`(${escaped})`, 'gi')
      result = result.replace(regex, '<mark class="bg-yellow-200 px-0.5">$1</mark>')
    })
    return result
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[1701] bg-white rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ height: isExpanded ? '85vh' : '38vh' }}
      >
        {/* Header - click to toggle size */}
        <div
          className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <Landmark size={16} />
            <span className="font-medium text-sm">Zoek monumenten</span>
          </div>
          <div className="flex items-center gap-1">
            {/* Drag handle indicator */}
            <GripHorizontal size={20} className="opacity-70" />
            <button
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Search input + province */}
        <div className="p-2 border-b border-gray-100 space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedId(null); setExpandedId(null); }}
                placeholder="bouwvoor, scherven..."
                className="w-full pl-8 pr-8 py-2 bg-gray-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setSelectedId(null); setExpandedId(null); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 border-0 outline-none bg-transparent"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <select
              value={province}
              onChange={(e) => { setProvince(e.target.value); setSelectedId(null); setExpandedId(null); }}
              className="py-1.5 px-2 bg-gray-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-700 w-28"
            >
              {Object.entries(PROVINCES).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto" style={{ fontSize: `${baseFontSize}px` }}>
          {searching && (
            <div className="p-3 text-center text-gray-500 text-sm">
              Zoeken...
            </div>
          )}

          {!searching && hasSearched && results.length === 0 && (
            <div className="p-3 text-center text-gray-500 text-sm">
              Geen resultaten
            </div>
          )}

          {!searching && results.length > 0 && (
            <div className="divide-y divide-gray-100">
              <div className="px-3 py-1.5 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
                <span>{results.length}{results.length >= maxResults ? '+' : ''} gevonden</span>
                {results.length >= maxResults && (
                  <button
                    onClick={() => setMaxResults(maxResults + 50)}
                    className="text-purple-600 hover:text-purple-700 border-0 outline-none bg-transparent"
                  >
                    Meer laden
                  </button>
                )}
              </div>
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`transition-colors ${
                    selectedId === result.id ? 'bg-purple-50' : 'bg-transparent'
                  }`}
                >
                  <button
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-3 py-2 hover:bg-purple-50 transition-colors border-0 outline-none bg-transparent"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm">
                          {result.toponiem}
                        </p>
                        <p className="text-xs text-purple-600 mt-0.5">
                          {result.periode}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className={`px-1.5 py-0.5 rounded text-white text-[9px] ${QUALITY_COLORS[result.kwaliteitswaarde] || 'bg-gray-500'}`}>
                          {QUALITY_SHORT[result.kwaliteitswaarde] || 'AMK'}
                        </span>
                        {selectedId === result.id && (
                          <button
                            onClick={(e) => handleZoomClick(result, e)}
                            className="p-1 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors border-0 outline-none"
                            title="Zoom in"
                          >
                            <ZoomIn size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expandable description */}
                  {selectedId === result.id && (
                    <div className="px-3 pb-2">
                      <button
                        onClick={(e) => toggleExpand(result.id, e)}
                        className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 border-0 outline-none bg-transparent mb-1"
                      >
                        {expandedId === result.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {expandedId === result.id ? 'Minder' : 'Omschrijving'}
                      </button>

                      {expandedId === result.id && (
                        <div
                          className="text-xs text-gray-700 bg-gray-50 rounded p-2 max-h-32 overflow-y-auto whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: highlightMatches(result.omschrijving) }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!searching && !hasSearched && (
            <div className="p-3 text-xs text-gray-500">
              Zoek op trefwoorden in 13.000+ AMK monumenten
            </div>
          )}
        </div>

        {/* Footer with clear button */}
        {(selectedId || query) && (
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={handleClearAndClose}
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border-0 outline-none"
            >
              Wis zoekopdracht en highlight
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
