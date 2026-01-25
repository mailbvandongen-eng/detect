/**
 * Monument Search Component
 * Search through AMK monument descriptions for keywords like "bouwvoor", "scherven", etc.
 */

import { useState, useRef, useEffect } from 'react'
import { Search, X, MapPin, ChevronRight, Landmark } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMapStore, useSettingsStore } from '../../store'
import { fromLonLat } from 'ol/proj'
import { searchMonuments, type MonumentSearchResult } from '../../utils/monumentSearch'

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

export function MonumentSearch({ isOpen, onClose }: MonumentSearchProps) {
  const map = useMapStore(state => state.map)
  const settings = useSettingsStore()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MonumentSearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedResult, setSelectedResult] = useState<MonumentSearchResult | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<number>()

  const baseFontSize = 14 * settings.fontScale / 100

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
      setHasSearched(false)
      setSelectedResult(null)
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
        const searchResults = await searchMonuments(query, 100)
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
  }, [query])

  const handleSelectResult = (result: MonumentSearchResult) => {
    if (!map) return

    // Zoom to location
    const view = map.getView()
    view.animate({
      center: fromLonLat(result.coordinates),
      zoom: 16,
      duration: 1000
    })

    // Show detail view
    setSelectedResult(result)
  }

  const handleGoToResult = (result: MonumentSearchResult) => {
    handleSelectResult(result)
    onClose()
  }

  // Highlight matched words in text
  const highlightMatches = (text: string) => {
    if (!query || query.length < 2) return text

    const words = query.toLowerCase().split(/\s+/).filter(w => w.length >= 2)
    let result = text

    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi')
      result = result.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 px-0.5 rounded">$1</mark>')
    })

    return result
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 z-[1700]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-4 z-[1701] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-lg mx-auto my-auto max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center gap-2">
            <Landmark size={18} />
            <span className="font-medium">Zoek in monumenten</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] opacity-70">T</span>
            <input
              type="range"
              min="80"
              max="150"
              step="10"
              value={settings.fontScale}
              onChange={(e) => settings.setFontScale(parseInt(e.target.value))}
              className="header-slider w-16 opacity-70 hover:opacity-100 transition-opacity"
            />
            <span className="text-xs opacity-70">T</span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="p-4 border-b border-gray-100" style={{ fontSize: `${baseFontSize}px` }}>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek op 'bouwvoor', 'scherven', 'muntschat'..."
              className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-purple-500"
              style={{ fontSize: '1em' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 border-0 outline-none bg-transparent"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Doorzoekt {'>'}13.000 AMK monumenten op trefwoorden in de omschrijving
          </p>
        </div>

        {/* Results or detail view */}
        <div className="flex-1 overflow-y-auto" style={{ fontSize: `${baseFontSize}px` }}>
          {selectedResult ? (
            // Detail view
            <div className="p-4">
              <button
                onClick={() => setSelectedResult(null)}
                className="flex items-center gap-1 text-purple-600 hover:text-purple-700 mb-3 border-0 outline-none bg-transparent"
                style={{ fontSize: '0.9em' }}
              >
                <ChevronRight size={16} className="rotate-180" />
                Terug naar resultaten
              </button>

              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontSize: '1.1em' }}>
                {selectedResult.toponiem}
              </h3>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded text-white text-xs ${QUALITY_COLORS[selectedResult.kwaliteitswaarde] || 'bg-gray-500'}`}>
                  {QUALITY_SHORT[selectedResult.kwaliteitswaarde] || selectedResult.kwaliteitswaarde}
                </span>
                <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs">
                  #{selectedResult.monumentnummer}
                </span>
              </div>

              {selectedResult.periode && (
                <p className="text-sm text-purple-700 mb-3">
                  {selectedResult.periode}
                </p>
              )}

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p
                  className="text-sm text-gray-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: highlightMatches(selectedResult.omschrijving) }}
                />
              </div>

              <button
                onClick={() => handleGoToResult(selectedResult)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors border-0 outline-none"
              >
                <MapPin size={18} />
                Bekijk op kaart
              </button>
            </div>
          ) : (
            // Results list
            <>
              {searching && (
                <div className="p-4 text-center text-gray-500">
                  Zoeken...
                </div>
              )}

              {!searching && hasSearched && results.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  Geen monumenten gevonden met "{query}"
                </div>
              )}

              {!searching && results.length > 0 && (
                <div className="divide-y divide-gray-100">
                  <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
                    {results.length} resultaten gevonden
                  </div>
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelectResult(result)}
                      className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors border-0 outline-none bg-transparent"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate" style={{ fontSize: '0.95em' }}>
                            {result.toponiem}
                          </p>
                          <p
                            className="text-xs text-gray-600 mt-1 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: highlightMatches(result.matchedText) }}
                          />
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className={`px-1.5 py-0.5 rounded text-white text-[10px] ${QUALITY_COLORS[result.kwaliteitswaarde] || 'bg-gray-500'}`}>
                            {QUALITY_SHORT[result.kwaliteitswaarde] || 'AMK'}
                          </span>
                          <ChevronRight size={14} className="text-gray-400" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {!searching && !hasSearched && (
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">Voorbeelden van zoektermen:</p>
                  <div className="flex flex-wrap gap-2">
                    {['bouwvoor', 'scherven', 'muntschat', 'grafveld', 'huisplattegrond', 'waterput', 'fibula', 'aardewerk'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full text-sm transition-colors border-0 outline-none"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
