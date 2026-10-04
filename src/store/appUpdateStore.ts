import { create } from 'zustand'

export const useAppUpdateStore = create<{
  updateAvailable: boolean
  busy: boolean
  error: string | null
}>(() => ({ updateAvailable: false, busy: false, error: null }))
