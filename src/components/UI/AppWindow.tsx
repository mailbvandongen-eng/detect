import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { useSettingsStore } from '../../store/settingsStore'

export type AppWindowPlacement = 'right' | 'left' | 'modal' | 'bottom'

interface AppWindowProps {
  isOpen: boolean
  title: string
  icon?: ReactNode
  children: ReactNode
  onClose: () => void
  onBack?: () => void
  footer?: ReactNode
  subHeader?: ReactNode
  placement?: AppWindowPlacement
  showScaleControl?: boolean
  bodyClassName?: string
  className?: string
  ariaLabel?: string
}

const placementClasses: Record<AppWindowPlacement, string> = {
  right: 'detect-window--right',
  left: 'detect-window--left',
  modal: 'detect-window--modal',
  bottom: 'detect-window--bottom'
}

export function AppWindow({
  isOpen,
  title,
  icon,
  children,
  onClose,
  onBack,
  footer,
  subHeader,
  placement = 'modal',
  showScaleControl = true,
  bodyClassName = '',
  className = '',
  ariaLabel
}: AppWindowProps) {
  const fontScale = useSettingsStore(state => state.fontScale)
  const setFontScale = useSettingsStore(state => state.setFontScale)
  const showFontSliders = useSettingsStore(state => state.showFontSliders)
  const scale = fontScale / 100

  const windowStyle = {
    '--detect-ui-scale': scale
  } as CSSProperties

  const isSideWindow = placement === 'right' || placement === 'left'

  // Een vensterwissel moet atomair zijn. Een exit-animatie laat het oude
  // venster nog even in de DOM staan terwijl het nieuwe al opent, waardoor
  // beide vensters op tragere telefoons zichtbaar over elkaar kunnen liggen.
  if (!isOpen) return null

  return (
    <>
      <motion.button
        type="button"
        className={`detect-window-backdrop ${isSideWindow ? 'detect-window-backdrop--clear' : ''}`}
        aria-label={`${title} sluiten`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      />

      <motion.section
        className={`detect-window ${placementClasses[placement]} ${className}`}
        style={windowStyle}
        initial={isSideWindow
          ? { opacity: 0, x: placement === 'right' ? 28 : -28, scale: 0.98 }
          : { opacity: 0, y: placement === 'bottom' ? 36 : 12, scale: 0.98 }
        }
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
      >
            <header className="detect-window__header">
              <div className="detect-window__title">
                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="detect-window__icon-button"
                    aria-label="Terug"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                {icon && <span className="detect-window__title-icon">{icon}</span>}
                <span>{title}</span>
              </div>

              <div className="detect-window__actions">
                {showScaleControl && showFontSliders && (
                  <label className="detect-window__scale">
                    <span className="detect-window__scale-small">T</span>
                    <input
                      type="range"
                      min="80"
                      max="130"
                      step="10"
                      value={fontScale}
                      onInput={(event) => setFontScale(parseInt((event.target as HTMLInputElement).value))}
                      onChange={(event) => setFontScale(parseInt(event.target.value))}
                      aria-label={`Tekstgrootte: ${fontScale}%`}
                      title={`Tekstgrootte: ${fontScale}%`}
                    />
                    <span className="detect-window__scale-large">T</span>
                  </label>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="detect-window__icon-button"
                  aria-label={`${title} sluiten`}
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {subHeader && <div className="detect-window__subheader">{subHeader}</div>}

            <div
              className={`detect-window__body ${bodyClassName}`}
              role="region"
              aria-label={`${title} inhoud`}
              tabIndex={0}
            >
              {children}
            </div>

            {footer && <footer className="detect-window__footer">{footer}</footer>}
      </motion.section>
    </>
  )
}
