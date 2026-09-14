export const MAP_CLICK_MOVE_TOLERANCE_PX = 3
export const MAP_DRAG_POPUP_SUPPRESSION_MS = 300

interface MapPopupGestureState {
  now: number
  lastPointerDragAt: number
  viewInteracting: boolean
  viewAnimating: boolean
}

export function isMapPopupGestureAllowed({
  now,
  lastPointerDragAt,
  viewInteracting,
  viewAnimating,
}: MapPopupGestureState): boolean {
  if (viewInteracting || viewAnimating) return false
  return now - lastPointerDragAt >= MAP_DRAG_POPUP_SUPPRESSION_MS
}
