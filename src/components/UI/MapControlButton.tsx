import type { ReactNode } from 'react'
import type { ControlId } from '../../config/controlLayout'
import { useControlSlot } from '../../hooks/useControlSlot'

interface MapControlButtonProps {
  slot: ControlId
  label: string
  controls: string
  isOpen: boolean
  onClick: () => void
  children: ReactNode
}

export function MapControlButton({ slot, label, controls, isOpen, onClick, children }: MapControlButtonProps) {
  const slotStyle = useControlSlot(slot)
  return (
    <button
      type="button"
      className="detect-map-control"
      style={slotStyle}
      aria-label={label}
      title={label}
      aria-controls={controls}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
