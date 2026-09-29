/**
 * Compact AMK keyword filter.
 * Visible while one or more AMK layers are active.
 */

import { Filter, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMonumentFilterStore } from '../../store/monumentFilterStore'
import { useLayerStore, useUIStore } from '../../store'
import { AppWindow } from './AppWindow'

const AMK_LAYERS = [
  'AMK Monumenten',
  'AMK Romeins',
  'AMK Steentijd',
  'AMK Vroege ME',
  'AMK Late ME',
  'AMK Overig'
]

export function MonumentFilter() {
  const {
    keyword,
    isActive,
    totalCount,
    filteredCount,
    setKeyword,
    setActive,
    clearFilter
  } = useMonumentFilterStore()

  const isExpanded = useUIStore(state => state.activeWindow === 'monumentFilter')
  const toggleMonumentFilter = useUIStore(state => state.toggleMonumentFilter)
  const closeMonumentFilter = useUIStore(state => state.closeMonumentFilter)

  const visible = useLayerStore(state => state.visible)
  const isAMKVisible = AMK_LAYERS.some(layer => visible[layer])

  const handleKeywordChange = (value: string) => {
    setKeyword(value)
    setActive(value.trim().length >= 2)
  }

  const handleClear = () => {
    clearFilter()
  }

  if (!isAMKVisible) return null

  return (
    <div>
      <motion.button
        onClick={toggleMonumentFilter}
        className={`fixed bottom-[116px] left-2 z-[800] w-11 h-11 flex items-center justify-center rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm ${
          isActive
            ? 'bg-purple-500 text-white'
            : 'bg-white/80 hover:bg-white/90 text-purple-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="AMK verfijnen"
        aria-label="AMK verfijnen"
      >
        <Filter size={20} />
      </motion.button>

      <AppWindow
        isOpen={isExpanded}
        title="AMK verfijnen"
        icon={<Filter size={18} />}
        placement="left"
        onClose={closeMonumentFilter}
      >
        <div className="p-3 space-y-3">
          <div className="relative">
            <input
              type="search"
              value={keyword}
              onChange={(event) => handleKeywordChange(event.target.value)}
              placeholder="bijv. grafveld, Romeins, terp…"
              autoComplete="off"
              enterKeyHint="search"
              className="w-full pl-3 pr-9 py-2.5 text-sm bg-gray-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Doorzoek AMK op trefwoord"
            />
            {keyword && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 bg-transparent border-0 outline-none"
                title="Wissen"
                aria-label="AMK-filter wissen"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Typ minimaal 2 tekens. Meerdere woorden moeten allemaal in het monument voorkomen.
          </p>

          {totalCount > 0 && (
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className={isActive ? 'text-purple-600 font-medium' : 'text-gray-500'}>
                {isActive
                  ? `${filteredCount} van ${totalCount} monumenten zichtbaar`
                  : `${totalCount} monumenten zichtbaar`}
              </span>
              {keyword && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-purple-600 hover:text-purple-700 bg-transparent border-0 outline-none font-medium"
                >
                  Wissen
                </button>
              )}
            </div>
          )}
        </div>
      </AppWindow>
    </div>
  )
}
