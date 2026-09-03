import { Check, History } from 'lucide-react'
import { version } from '../../../package.json'
import { CHANGELOG, markChangeLogSeen } from '../../data/changelog'
import { AppWindow } from './AppWindow'

interface ChangeLogModalProps {
  isOpen: boolean
  onClose: () => void
}

const currentRelease = {
  version: '2.33.17',
  date: '3 september 2026',
  title: 'Thédirac-analyse en Frankrijk-preset',
  changes: [
    'Thédirac–Catus–Montgesty–Lavercantière–Peyrilles–Uzech–Gindou is nu een vaste lokale onderzoekszone; ArcheOcc laadt voor dit onderzoek alleen nog deze gemeenten in plaats van heel Occitanie.',
    'Nieuwe analysegroep met Onderzoekszone Thédirac, Hellingklassen Thédirac en Onderzoekskaart Thédirac. De berekening gebruikt officiële IGN-hoogtegegevens, lokaal reliëf, afstand tot BD TOPAGE-water en nabijheid van ArcheOcc-context en vermeldt per vak waarom het opvalt.',
    'De Frankrijk-groepen zijn consequent ingedeeld als Terrein & reliëf, Water & landschap, Bodem & geologie, Archeologie & historie en Analyse. Lokale vectorpopups tonen Nederlandstalige en Franstalige veldnamen plus bronkwaliteit.',
    'Onderaan Presets staat nu Frankrijk. Die kiest Hybride wereld en zet de praktisch bruikbare LiDAR-, water-, landbedekkings-, geologie-, oude-bossen-, ArcheOcc- en Thédirac-analysetlagen met leesbare transparantie klaar.',
    'De onderzoekskaart is nadrukkelijk een verklaarbare onderzoekshulp en geen bewijs van archeologie; OCS GE, BRGM-geologie en Forêts anciennes blijven zichtbare controlelagen naast de berekende score.'
  ]
}

const recentReleases = [
  {
    version: '2.33.16',
    date: '3 september 2026',
    title: 'Bodem, geologie en ondergrond Frankrijk',
    changes: [
      'BRGM-boringen (BSS), IDPR en gelokaliseerde ondergrondse holtes zijn toegevoegd onder Bodem & geologie.',
      'BRGM-lagen gebruiken de officiële services en blijven aanvullende onderzoeksinformatie; ze staan niet standaard in de Frankrijk-preset.',
      'De geologie- en ondergrondlagen zijn onder één duidelijke Frankrijk-groep gezet.'
    ]
  },
  {
    version: '2.33.15',
    date: '3 september 2026',
    title: 'Oude bossen Frankrijk',
    changes: [
      'De officiële IGN-laag Forêts anciennes is toegevoegd.',
      'Daarmee worden oude, recente en verdwenen bosgebieden zichtbaar op basis van de 19e-eeuwse État-major-bosbedekking en de moderne BD Forêt.'
    ]
  },
  {
    version: '2.33.14',
    date: '3 september 2026',
    title: 'ArcheOcc bruikbaar gemaakt',
    changes: [
      'ArcheOcc gebruikt de primaire sitevelden uit de officiële regionale dataset in plaats van vrijwel lege losse objectvelden.',
      'Naam, omschrijving, periode, datering, type locatie, vindplaats, gemeente, bescherming en bronverwijzingen worden waar aanwezig in de popup getoond.',
      'De Frankrijk-hoofdschakelaar neemt de onderzoekslagen mee.'
    ]
  },
  {
    version: '2.33.13',
    date: '2 september 2026',
    title: 'Frankrijk-onderzoek opgeschoond',
    changes: [
      'De dubbele OCS GE-laag is teruggebracht tot de bruikbare landbedekkingslaag.',
      'De vier zwakke handmatig ingevoerde Thédirac-punten zijn uit de interface verwijderd.',
      'Waterlopen BD TOPAGE 2026 zijn behouden en ArcheOcc is voorbereid op inhoudelijke popups.'
    ]
  }
]

export function ChangeLogModal({ isOpen, onClose }: ChangeLogModalProps) {
  const handleClose = () => {
    markChangeLogSeen(version)
    onClose()
  }

  const entries = version === currentRelease.version
    ? [currentRelease, ...recentReleases, ...CHANGELOG]
    : [...recentReleases, ...CHANGELOG]

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
