import { create } from 'zustand'

export const useBuddySyncStore = create<{
  revision: number
  error: string | null
  refresh: () => void
}>((set) => ({
  revision: 0,
  error: null,
  refresh: () => set(state => ({ revision: state.revision + 1, error: null })),
}))
