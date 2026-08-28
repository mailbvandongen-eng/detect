import { Check, History, X } from 'lucide-react'
import { version } from '../../../package.json'
import { CHANGELOG, markChangeLogSeen } from '../../data/changelog'
import { useSettingsStore } from '../../store/settingsStore'

interface ChangeLogModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChangeLogModal({ isOpen, onClose }: ChangeLogModalProps) {
  const fontScale = useSettingsStore(state => state.fontScale)
  const setFontScale = useSettingsStore(state => state.setFontScale)

  if (!isOpen) return null

  const handleClose = () => {
    markChangeLogSeen(version)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[1700] bg-black/40"
      onClick={handleClose}
      role="presentation"
    >
      <section
        className="fixed inset-4 z-[1701] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-sm mx-auto my-auto max-h-[85vh]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="changelog-title"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center gap-2">
            <History size={18} />
            <span id="changelog-title" className="font-medium">Wijzigingen</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] opacity-70">T</span>
            <input
              type="range"
              min="80"
              max="150"
              step="10"
              value={fontScale}
              onChange={(event) => setFontScale(parseInt(event.target.value))}
              className="header-slider w-16 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Tekstgrootte"
            />
            <span className="text-xs opacity-70">T</span>
            <button
              onClick={handleClose}
              className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none ml-1"
              aria-label="Wijzigingen sluiten"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ fontSize: '1em' }}>
          <p className="text-gray-600 leading-relaxed">
            Dit is er aangepast. De nieuwste versie staat bovenaan; eerdere updates blijven hieronder terug te lezen.
          </p>

          {CHANGELOG.map((entry, index) => (
            <article
              key={entry.version}
              className={`rounded-xl p-3 ${index === 0 ? 'bg-blue-50' : 'bg-gray-50'}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-gray-800">Versie {entry.version}</h2>
                    {index === 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white" style={{ fontSize: '0.7em' }}>
                        Nieuw
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500" style={{ fontSize: '0.78em' }}>{entry.date}</p>
                </div>
              </div>

              <h3 className="font-medium text-gray-700 mb-2">{entry.title}</h3>
              <ul className="space-y-2">
                {entry.changes.map((change) => (
                  <li key={change} className="flex items-start gap-2 text-gray-700 leading-relaxed">
                    <Check size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-0 outline-none transition-colors"
          >
            Gezien
          </button>
        </div>
      </section>
    </div>
  )
}
