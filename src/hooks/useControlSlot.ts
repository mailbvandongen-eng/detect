import { useLayoutEffect, type CSSProperties } from 'react'
import { create } from 'zustand'
import { getControlPosition, type ControlId } from '../config/controlLayout'

interface ControlSlotState {
  visible: ReadonlySet<string>
  show: (id: ControlId) => void
  hide: (id: ControlId) => void
}

export const useControlSlotStore = create<ControlSlotState>(set => ({
  visible: new Set(),
  show: id => set(state => (state.visible.has(id) ? state : { visible: new Set(state.visible).add(id) })),
  hide: id => set(state => {
    if (!state.visible.has(id)) return state
    const visible = new Set(state.visible)
    visible.delete(id)
    return { visible }
  }),
}))

/**
 * Geeft de positie van een kaartknop volgens het vaste knoppenschema.
 * Roep altijd aan (ook als de knop verborgen is) en geef via `shown` door of
 * de knop zichtbaar is, zodat andere knoppen de vrije plek opvullen.
 */
export function useControlSlot(id: ControlId, shown = true): CSSProperties {
  const show = useControlSlotStore(state => state.show)
  const hide = useControlSlotStore(state => state.hide)
  const visible = useControlSlotStore(state => state.visible)

  useLayoutEffect(() => {
    if (!shown) return
    show(id)
    return () => hide(id)
  }, [id, shown, show, hide])

  return getControlPosition(id, visible)
}
