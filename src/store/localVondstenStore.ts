import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Simplified local vondst type (no Firebase fields)
export interface LocalVondst {
  id: string
  location: {
    lat: number
    lng: number
  }
  timestamp: string // ISO date string
  notes: string
  objectType: string
  material: string
  period: string
  depth?: number // cm
}

interface LocalVondstenState {
  vondsten: LocalVondst[]
  addVondst: (vondst: Omit<LocalVondst, 'id' | 'timestamp'>) => void
  removeVondst: (id: string) => void
  updateVondst: (id: string, updates: Partial<LocalVondst>) => void
  clearAll: () => void
}

export const useLocalVondstenStore = create<LocalVondstenState>()(
  persist(
    (set) => ({
      vondsten: [],

      addVondst: (vondst) => set((state) => ({
        vondsten: [
          ...state.vondsten,
          {
            ...vondst,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString()
          }
        ]
      })),

      removeVondst: (id) => set((state) => ({
        vondsten: state.vondsten.filter(v => v.id !== id)
      })),

      updateVondst: (id, updates) => set((state) => ({
        vondsten: state.vondsten.map(v =>
          v.id === id ? { ...v, ...updates } : v
        )
      })),

      clearAll: () => set({ vondsten: [] })
    }),
    {
      name: 'detectorapp-local-vondsten'
    }
  )
)
