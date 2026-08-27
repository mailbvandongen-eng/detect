import { useState, useRef, useEffect } from 'react'
import { Search, X, ExternalLink } from 'lucide-react'
import { useMapStore, useSettingsStore } from '../../store'
import { fromLonLat } from 'ol/proj'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
  text: string
  magicKey: string
  isCollection: boolean
}

interface GeocodeCandidate {
  location?: {
    x: number
    y: number
  }
}

const WORLD_GEOCODER_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'

export function SearchBox() {
  const map = useMapStore(state => state.map)
  const showWeatherButton = useSettingsStore(state => state.showWeatherButton)

  const [isExpanded, setIsExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<number>()
  const requestRef = useRef<AbortController | null>(null)

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  // Click outside to collapse
  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        collapse()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpanded])

  // Escape to collapse
  useEffect(() => {
    if (!isExpanded) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        collapse()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isExpanded])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    const trimmedQuery = query.trim()

    requestRef.current?.abort()

    if (trimmedQuery.length < 2) {
      setResults([])
      setSearching(false)
      setSearchError(null)
      return
    }

    setResults([])
    setSearching(true)
    setSearchError(null)

    debounceRef.current = window.setTimeout(async () => {
      const controller = new AbortController()
      requestRef.current = controller

      try {
        const params = new URLSearchParams({
          text: trimmedQuery,
          f: 'json',
          maxSuggestions: '7'
        })
        const response = await fetch(`${WORLD_GEOCODER_URL}/suggest?${params}`, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`Zoekdienst gaf status ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error.message || 'Zoekdienst niet beschikbaar')
        }

        setResults(Array.isArray(data.suggestions) ? data.suggestions : [])
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('Search error:', error)
        setResults([])
        setSearchError('Zoeken lukt nu niet. Probeer het opnieuw.')
      } finally {
        if (requestRef.current === controller) {
          requestRef.current = null
          setSearching(false)
        }
      }
    }, 350)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      requestRef.current?.abort()
    }
  }, [query])

  const collapse = () => {
    setIsExpanded(false)
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSearching(false)
    setSearchError(null)
    requestRef.current?.abort()
  }

  const getCoordinates = async (result: SearchResult): Promise<{lng: number, lat: number} | null> => {
    try {
      const params = new URLSearchParams({
        SingleLine: result.text,
        magicKey: result.magicKey,
        f: 'json',
        maxLocations: '1',
        outFields: 'Match_addr,Addr_type,Country',
        forStorage: 'false'
      })
      const response = await fetch(`${WORLD_GEOCODER_URL}/findAddressCandidates?${params}`)

      if (!response.ok) {
        throw new Error(`Zoekdienst gaf status ${response.status}`)
      }

      const data = await response.json()
      const candidate = data.candidates?.[0] as GeocodeCandidate | undefined

      if (candidate?.location) {
        return {
          lng: candidate.location.x,
          lat: candidate.location.y
        }
      }
    } catch (error) {
      console.error('Lookup error:', error)
    }
    return null
  }

  const handleSelect = async (result: SearchResult) => {
    if (!map) return

    const coords = await getCoordinates(result)
    if (coords) {
      // Zoom to location
      const view = map.getView()
      view.animate({
        center: fromLonLat([coords.lng, coords.lat]),
        zoom: 16,
        duration: 1000
      })
      collapse()
    } else {
      setSearchError('Deze locatie kon niet worden geopend.')
    }
  }

  const handleOpenGoogleMaps = async (result: SearchResult, e: React.MouseEvent) => {
    e.stopPropagation() // Don't trigger handleSelect

    const coords = await getCoordinates(result)
    if (coords) {
      const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
      window.open(url, '_blank')
      collapse()
    } else {
      setSearchError('Deze locatie kon niet worden geopend.')
    }
  }

  // Safe top position for mobile browsers (accounts for notch/status bar)
  const safeTopStyle = { top: 'max(0.5rem, env(safe-area-inset-top, 0.5rem))' }

  // Collapsed state: just a search icon button
  if (!isExpanded) {
    return (
      <motion.button
        className="fixed right-14 z-[800] w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
        style={safeTopStyle}
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Zoeken in Europa"
      >
        <Search size={22} className="text-gray-600 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
      </motion.button>
    )
  }

  // Expanded state: full search bar (leave space for hamburger icon and weather widget)
  return (
    <div
      ref={containerRef}
      className={`fixed right-14 z-[1150] left-2 ${showWeatherButton ? 'sm:left-[220px]' : 'sm:left-[52px]'}`}
      style={safeTopStyle}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="search-input-wrapper"
      >
        <Search size={18} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Zoek adres of plaats in Europa..."
          className="search-input"
        />
        <button
          onClick={collapse}
          className="search-clear"
          title="Sluiten"
        >
          <X size={18} />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.ul
            className="search-results"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {results.map((result) => (
              <li
                key={result.magicKey}
                className="search-result-item"
              >
                <div
                  className="search-result-content"
                  onClick={() => handleSelect(result)}
                >
                  <span className="search-result-text">
                    {result.text}
                  </span>
                </div>
                <button
                  className="search-navigate-btn"
                  onClick={(e) => handleOpenGoogleMaps(result, e)}
                  title="Open in Google Maps"
                >
                  <ExternalLink size={20} />
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {isOpen && searching && (
        <div className="search-loading">Zoeken...</div>
      )}

      {isOpen && !searching && searchError && (
        <div className="search-loading search-error">{searchError}</div>
      )}

      {isOpen && !searching && !searchError && query.trim().length >= 2 && results.length === 0 && (
        <div className="search-loading">Geen locaties gevonden</div>
      )}
    </div>
  )
}
