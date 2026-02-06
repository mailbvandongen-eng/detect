/**
 * Monument Filter Component
 * Only visible when AMK monument layers are active
 * Compact design with inline toggle
 */

import { useEffect, useRef } from 'react'
import { Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMonumentFilterStore } from '../../store/monumentFilterStore'
import { useLayerStore, useUIStore } from '../../store'

// AMK layers that trigger filter visibility
const AMK_LAYERS = [
  'AMK Monumenten',
  'AMK Romeins',
  'AMK Steentijd',
  'AMK Vroege ME',
  'AMK Late ME',
  'AMK Overig'
]

export function MonumentFilter() {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    keyword,
    isActive,
    totalCount,
    filteredCount,
    setKeyword,
    setActive,
    clearFilter
  } = useMonumentFilterStore()

  // Use UIStore for panel state (closes other panels)
  const isExpanded = useUIStore(state => state.monumentFilterOpen)
  const toggleMonumentFilter = useUIStore(state => state.toggleMonumentFilter)
  const closeMonumentFilter = useUIStore(state => state.closeMonumentFilter)

  // Check if any AMK layer is visible
  const visible = useLayerStore(state => state.visible)
  const isAMKVisible = AMK_LAYERS.some(layer => visible[layer])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isExpanded])

  // Toggle filter on/off
  const handleToggle = () => {
    if (keyword.length >= 2) {
      setActive(!isActive)
    }
  }

  // Clear everything
  const handleClear = () => {
    clearFilter()
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const hasKeyword = keyword.length >= 2

  // Don't render if no AMK layer is visible
  if (!isAMKVisible) {
    return null
  }

  return (
    <div>
      {/* Button - same style as preset buttons, positioned above them */}
      <motion.button
        onClick={toggleMonumentFilter}
        className={`fixed bottom-[116px] left-2 z-[800] w-11 h-11 flex items-center justify-center rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm ${
          isActive
            ? 'bg-purple-500 text-white'
            : 'bg-white/80 hover:bg-white/90 text-purple-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Monument filter"
      >
        <Filter size={20} />
      </motion.button>

      {/* Expanded panel - compact design */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Invisible backdrop */}
            <motion.div
              className="fixed inset-0 z-[800]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMonumentFilter}
            />
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed bottom-[116px] left-[56px] z-[801] bg-white/95 rounded-lg shadow-lg backdrop-blur-sm overflow-hidden"
            >
              <div className="p-2 space-y-1.5">
                {/* Search + toggle row */}
                <div className="flex items-center gap-2">
                  {/* Search input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Filter..."
                    className="w-24 px-2 py-1.5 text-sm bg-gray-100 rounded border-0 outline-none focus:ring-2 focus:ring-purple-400"
                  />

                  {/* Toggle switch */}
                  <button
                    onClick={handleToggle}
                    disabled={!hasKeyword}
                    className={`relative w-10 h-5 rounded-full transition-colors border-0 outline-none ${
                      isActive
                        ? 'bg-purple-500'
                        : hasKeyword
                          ? 'bg-gray-300'
                          : 'bg-gray-200 cursor-not-allowed'
                    }`}
                    title={isActive ? 'Filter uit' : 'Filter aan'}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        isActive ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Count indicator - always visible when there's data */}
                {totalCount > 0 && (
                  <div className="text-xs text-gray-500 text-center">
                    {isActive ? (
                      <span className="text-purple-600 font-medium">{filteredCount} van {totalCount}</span>
                    ) : (
                      <span>{totalCount} monumenten</span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
