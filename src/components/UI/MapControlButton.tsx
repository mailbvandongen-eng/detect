import type { ReactNode } from 'react'

interface MapControlButtonProps {
  label: string
  controls: string
  isOpen: boolean
  onClick: () => void
  children: ReactNode
}

export function MapControlButton({ label, controls, isOpen, onClick, children }: MapControlButtonProps) {
  return (
    <button
      type="button"
      className="detect-map-control"
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
