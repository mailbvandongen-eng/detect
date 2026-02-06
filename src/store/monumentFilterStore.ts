/**
 * Monument Filter Store
 * Controls keyword and province filtering for AMK monuments
 */

import { create } from 'zustand'
import { PROVINCES } from '../utils/monumentSearch'

interface MonumentFilterState {
  // Filter settings
  keyword: string
  province: string
  isActive: boolean

  // Stats
  totalCount: number
  filteredCount: number

  // Actions
  setKeyword: (keyword: string) => void
  setProvince: (province: string) => void
  setActive: (active: boolean) => void
  toggleActive: () => void
  clearFilter: () => void
  updateCounts: (total: number, filtered: number) => void
}

export const useMonumentFilterStore = create<MonumentFilterState>((set, get) => ({
  keyword: '',
  province: 'all',
  isActive: false,
  totalCount: 0,
  filteredCount: 0,

  setKeyword: (keyword) => set({ keyword }),
  setProvince: (province) => set({ province }),
  setActive: (active) => set({ isActive: active }),
  toggleActive: () => set(state => ({ isActive: !state.isActive })),

  clearFilter: () => set({
    keyword: '',
    province: 'all',
    isActive: false
  }),

  updateCounts: (total, filtered) => set({
    totalCount: total,
    filteredCount: filtered
  })
}))

// Helper to check if a feature matches the filter
export function featureMatchesFilter(
  omschrijving: string,
  toponiem: string,
  txtLabel: string,
  lng: number,
  lat: number,
  keyword: string,
  province: string
): boolean {
  // Check keyword match (AND logic for multiple words)
  if (keyword.length >= 2) {
    const lowerKeyword = keyword.toLowerCase()
    const queryWords = lowerKeyword.split(/\s+/).filter(w => w.length >= 2)
    const lowerOmschrijving = omschrijving.toLowerCase()
    const lowerToponiem = toponiem.toLowerCase()
    const lowerTxtLabel = txtLabel.toLowerCase()

    const allWordsMatch = queryWords.every(word =>
      lowerOmschrijving.includes(word) ||
      lowerToponiem.includes(word) ||
      lowerTxtLabel.includes(word)
    )

    if (!allWordsMatch) return false
  }

  // Check province match
  if (province !== 'all') {
    const provinceBounds = PROVINCES[province]?.bounds
    if (provinceBounds) {
      const [minLng, minLat, maxLng, maxLat] = provinceBounds
      if (lng < minLng || lng > maxLng || lat < minLat || lat > maxLat) {
        return false
      }
    }
  }

  return true
}
