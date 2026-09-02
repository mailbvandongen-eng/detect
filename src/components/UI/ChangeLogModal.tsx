import { Check, History } from 'lucide-react'
import { version } from '../../../package.json'
import { CHANGELOG, markChangeLogSeen } from '../../data/changelog'
import { AppWindow } from './AppWindow'

interface ChangeLogModalProps {
  isOpen: boolean
  onClose: () => void
}

const currentRelease = {
  version: '2.33.15',
  date: '3 september 2026',
  title: 'Historisch landschap Frankrijk',
  changes: [
    'Nieuwe officiële IGN-laag Oude bossen · Forêts anciennes toegevoegd onder Frankrijk · historisch landschap.',
    'De laag vergelijkt de bosbedekking van de 19e-eeuwse État-major-kaart met de moderne BD Forêt en maakt oude, recente en verdwenen bosgebieden zichtbaar.',
    'De laag valt automatisch onder de hoofdschakelaar Frankrijk en onder dezelfde zichtbaarheid- en transparantieregeling als de andere onderzoekslagen.',
    'Alleen de geverifieerde officiële IGN-bron is ingebouwd; État-major, Cassini en historische luchtfoto’s volgen pas nadat hun officiële kaartservices afzonderlijk zijn gecontroleerd.'
  ]
}

export function ChangeLogModal({ isOpen, onClose }: ChangeLogModalProps) {
  const handleClose = () => {
    markChangeLogSeen(version)
    onClose()
  }

  const entries = version === currentRelease.version ? [currentRelease, ...CHANGELOG] : CHANGELOG

  return (
    <AppWindow
      isOpen={isOpen}
      title="Wijzigingen"
      icon={<History size={18} />}
      placement="modal"
      onClose={handleClose}
      footer={<button onClick={handleClose} className="detect-window-primary-button w-full">Gezien</button>}
    >
      <div className="p-4 space-y-4">
        <p className="text-gray-600 leading-relaxed">
          Dit is er aangepast. De nieuwste versie staat bovenaan; eerdere updates blijven hieronder terug te lezen.
        </p>

        {entries.map((entry, index) => (
          <article key={entry.version} className={`rounded-xl p-3 ${index === 0 ? 'bg-blue-50' : 'bg-gray-50'}`}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-gray-800">Versie {entry.version}</h2>
                  {index === 0 && <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white" style={{ fontSize: '0.7em' }}>Nieuw</span>}
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
    </AppWindow>
  )
}
