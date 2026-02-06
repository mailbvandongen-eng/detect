/**
 * Monument Filter Component
 * Matches preset button styling, positioned above presets
 */

import { useState, useEffect, useRef } from 'react'
import { Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMonumentFilterStore } from '../../store/monumentFilterStore'
import { useMapStore } from '../../store'

export function MonumentFilter() {
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
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

  const map = useMapStore(state => state.map)

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isExpanded])

  // Click outside to collapse
  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  // Trigger layer refresh when filter changes
  useEffect(() => {
    if (!map) return

    // Recursive function to find all layers (including nested in groups)
    const refreshAMKLayers = (layers: any) => {
      layers.forEach((layer: any) => {
        const title = layer.get('title')
        if (title && title.startsWith('AMK')) {
          // Force style recalculation
          layer.changed()
          const source = layer.getSource?.()
          if (source) {
            source.changed()
          }
        }
        // Check for nested layers (group layers)
        const nestedLayers = layer.getLayers?.()
        if (nestedLayers) {
          refreshAMKLayers(nestedLayers)
        }
      })
    }

    refreshAMKLayers(map.getLayers())
  }, [map, keyword, isActive])

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

  return (
    <div ref={containerRef}>
      {/* Button - same style as preset buttons, positioned above them */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
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

      {/* Expanded panel - opens to the right like presets */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Invisible backdrop */}
            <motion.div
              className="fixed inset-0 z-[800]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed bottom-[116px] left-[56px] z-[801] bg-white/95 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden w-[220px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-purple-500">
                <span className="text-sm font-medium text-white">Monument Filter</span>
                {isActive && totalCount > 0 && (
                  <span className="text-xs text-purple-200">
                    {filteredCount}/{totalCount}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-3 space-y-3">
                {/* Search input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Zoek in monumenten..."
                  className="w-full px-3 py-2 text-sm bg-gray-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-purple-400"
                />

                {/* Buttons row */}
                <div className="flex items-center gap-2">
                  {/* Toggle button */}
                  <button
                    onClick={handleToggle}
                    disabled={!hasKeyword}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors border-0 outline-none font-medium ${
                      isActive
                        ? 'bg-purple-500 text-white'
                        : hasKeyword
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isActive ? 'Filter Aan' : 'Filter Uit'}
                  </button>

                  {/* Clear button */}
                  {(hasKeyword || isActive) && (
                    <button
                      onClick={handleClear}
                      className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border-0 outline-none"
                      title="Wissen"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Help text */}
                <p className="text-xs text-gray-500">
                  Zoek op toponiem, omschrijving of periode
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
