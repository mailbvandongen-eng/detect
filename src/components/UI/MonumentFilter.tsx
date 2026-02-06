/**
 * Monument Filter Component
 * Compact filter button that expands to show filter controls
 * Placed in bottom-left corner of the map
 */

import { useState, useEffect, useRef } from 'react'
import { Filter, X, ChevronUp, ChevronDown } from 'lucide-react'
import { useMonumentFilterStore } from '../../store/monumentFilterStore'
import { PROVINCES } from '../../utils/monumentSearch'
import { useMapStore } from '../../store'

export function MonumentFilter() {
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    keyword,
    province,
    isActive,
    totalCount,
    filteredCount,
    setKeyword,
    setProvince,
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

    // Find AMK layers and refresh their style
    map.getLayers().forEach(layer => {
      const title = layer.get('title')
      if (title && title.startsWith('AMK')) {
        // Force style recalculation by changing and restoring something
        layer.changed()
      }
    })
  }, [map, keyword, province, isActive])

  const handleApplyFilter = () => {
    if (keyword.length >= 2 || province !== 'all') {
      setActive(true)
    }
  }

  const handleClearFilter = () => {
    clearFilter()
  }

  const hasFilter = keyword.length >= 2 || province !== 'all'

  return (
    <div
      ref={containerRef}
      className="fixed left-3 bottom-20 z-[1000]"
    >
      {/* Collapsed: Just the button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg transition-all ${
            isActive
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          title="Monument filter"
        >
          <Filter size={18} />
          {isActive && (
            <span className="text-sm font-medium">
              {filteredCount}/{totalCount}
            </span>
          )}
        </button>
      )}

      {/* Expanded: Filter panel */}
      {isExpanded && (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden w-64">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <span className="font-medium text-sm">Monument Filter</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded hover:bg-white/20 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 space-y-3">
            {/* Keyword input */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Zoekwoord</label>
              <input
                ref={inputRef}
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="bijv. bouwvoor, villa, graf..."
                className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Province select */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Provincie</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Object.entries(PROVINCES).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            {/* Filter toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-sm text-gray-600">Filter actief</span>
              <button
                onClick={() => hasFilter ? setActive(!isActive) : null}
                disabled={!hasFilter}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isActive
                    ? 'bg-purple-500'
                    : hasFilter
                      ? 'bg-gray-300'
                      : 'bg-gray-200 cursor-not-allowed'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    isActive ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Stats */}
            {isActive && totalCount > 0 && (
              <div className="text-center py-2 bg-purple-50 rounded-lg">
                <span className="text-purple-700 font-medium">
                  {filteredCount} van {totalCount} monumenten
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleClearFilter}
                className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Wissen
              </button>
              <button
                onClick={handleApplyFilter}
                disabled={!hasFilter}
                className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                  hasFilter
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Toepassen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
