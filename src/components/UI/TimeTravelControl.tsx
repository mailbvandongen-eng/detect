import { useEffect, type CSSProperties } from 'react'
import { History, X } from 'lucide-react'
import { useSettingsStore } from '../../store/settingsStore'
import { useUIStore } from '../../store/uiStore'
import { MapControlButton } from './MapControlButton'

interface TimeTravelControlProps {
  visible: boolean
  name: string
  years: number[]
  selectedIndex: number
  year: string
  status: 'loading' | 'ready' | 'error'
  onSelect: (index: number) => void
}

export function TimeTravelControl({ visible, name, years, selectedIndex, year, status, onSelect }: TimeTravelControlProps) {
  const isOpen = useUIStore(state => state.activeWindow === 'timeTravel')
  const toggleWindow = useUIStore(state => state.toggleWindow)
  const closeWindow = useUIStore(state => state.closeWindow)
  const fontScale = useSettingsStore(state => state.fontScale)

  useEffect(() => {
    // A background change parks the control; selecting imagery never opens it.
    if (useUIStore.getState().activeWindow === 'timeTravel') closeWindow()
  }, [visible, name, closeWindow])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeWindow()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeWindow])

  if (!visible) return null

  return (
    <div className="detect-time-travel-control">
      <MapControlButton
        label={`${name}: jaar kiezen`}
        controls="time-travel-panel"
        isOpen={isOpen}
        onClick={() => toggleWindow('timeTravel')}
      >
        <History size={22} strokeWidth={2} aria-hidden="true" />
      </MapControlButton>
      {isOpen && (
        <>
          <button
            type="button"
            className="detect-window-backdrop detect-window-backdrop--clear"
            aria-label="Jaarkeuze sluiten"
            onClick={closeWindow}
          />
          <section
            id="time-travel-panel"
            className="detect-time-travel-panel"
            style={{ '--detect-ui-scale': fontScale / 100 } as CSSProperties}
            role="dialog"
            aria-label={`${name}: jaarkeuze`}
          >
            <div className="detect-time-travel-heading">
              <output aria-live="polite" aria-label="Gekozen jaar">{year}</output>
              <button type="button" className="detect-time-travel-close" aria-label="Jaarkeuze sluiten" onClick={closeWindow}>
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            {status === 'ready' ? (
              <>
                <span className="detect-time-travel-endpoint">{years[years.length - 1]}</span>
                <input
                  type="range"
                  className="detect-range-vertical"
                  min={0}
                  max={Math.max(0, years.length - 1)}
                  step={1}
                  value={selectedIndex}
                  disabled={years.length < 2}
                  aria-label={`${name}: jaar`}
                  aria-valuetext={year}
                  aria-orientation="vertical"
                  onChange={event => onSelect(Number(event.target.value))}
                />
                <span className="detect-time-travel-endpoint">{years[0]}</span>
              </>
            ) : (
              <span className="detect-time-travel-status" role="status">
                {status === 'loading' ? 'Archief laden…' : 'Archief niet bereikbaar. Actueel beeld.'}
              </span>
            )}
            {name === 'Satelliet wereld' && <span className="sr-only">Archiefjaar is de publicatieversie; de lokale opname kan ouder zijn.</span>}
          </section>
        </>
      )}
    </div>
  )
}
