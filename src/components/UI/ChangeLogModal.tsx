import { Check, History } from 'lucide-react'
import { version } from '../../../package.json'
import { CHANGELOG, markChangeLogSeen } from '../../data/changelog'
import { AppWindow } from './AppWindow'

interface ChangeLogModalProps {
  isOpen: boolean
  onClose: () => void
}

const currentRelease = {
  version: '2.33.21',
  date: '3 september 2026',
  title: 'Water, landbedekking en archeologie hersteld',
  changes: [
    'BD TOPAGE-waterlopen worden rond Thédirac op dorpsniveau duidelijk dikker getekend. De 59 lokale waterobjecten zijn klikbaar; bij 33 daarvan publiceert de bron een naam.',
    'OCS GE vertaalt de officiële CS- en US-codes voortaan naar gewone Nederlandse bodembedekking en grondgebruik, met peiljaar en oppervlakte in hectare.',
    'De lege lokale ArcheOcc-laag is verwijderd: de officiële publieksdataset bevat nul objecten in de zeven onderzoeksgemeenten. De 22 echte bronlocaties staan voortaan herkenbaar als Archeologische plekken · Thédirac (22) in de preset.'
  ]
}

const recentReleases = [
  {
    version: '2.33.20',
    date: '3 september 2026',
    title: 'Bekende archeologische plekken op de kaart',
    changes: [
      'De Frankrijk · Thédirac-preset toont nu een aparte kaartlaag met 22 nader onderzochte steentijd-, Keltische, Romeinse en middeleeuwse locaties.',
      'Beschermd of no-detect betekent voortaan alleen een duidelijke waarschuwing in de popup: het punt blijft zichtbaar voor het archeologische totaalbeeld.',
      'Exacte bronpunten, lieu-ditcentra en globale gemeenteposities krijgen verschillende symbolen en iedere popup vermeldt de locatieprecisie en bron.'
    ]
  },
  {
    version: '2.33.19',
    date: '3 september 2026',
    title: 'Frankrijk · Thédirac-preset hersteld',
    changes: [
      'Frankrijk · Thédirac staat voortaan altijd onderaan Presets, ook wanneer een oudere lokale of cloudlijst deze preset nog niet bevatte.',
      'De preset kiest Hybride wereld, activeert de zes bewezen Franse veldlagen en verplaatst de kaart naar de onderzoeksregio Thédirac.',
      'Een verouderde cloudlijst wordt na het laden automatisch met de ontbrekende preset gerepareerd.'
    ]
  },
  {
    version: '2.33.18',
    date: '3 september 2026',
    title: 'Thédirac-analyse opgeschoond',
    changes: [
      'De veldtest van de nieuwe Thédirac-analyse was niet goed genoeg: Hellingklassen, Onderzoekskaart en het losse Onderzoekszone-vlak zijn daarom weer verwijderd in plaats van als gekleurde vakken zonder bruikbare meerwaarde te blijven staan.',
      'De lokale onderzoeksafbakening blijft intern bestaan om ArcheOcc alleen voor Thédirac, Catus, Montgesty, Lavercantière, Peyrilles, Uzech en Gindou te laden; daarvoor is geen extra kaartvlak nodig.',
      'De Frankrijk-preset is opgeschoond en bevat nu alleen de bewezen veldlagen: Hybride wereld, LiDAR HD, BD TOPAGE-waterlopen, OCS GE landbedekking, geologie 1:50.000, Forêts anciennes en de lokale ArcheOcc-laag.',
      'BSS-boringen, IDPR, cavités en geologie + reliëf blijven handmatig beschikbaar, maar worden niet automatisch door de Frankrijk-preset aangezet.',
      'Een nieuwe analysekaart komt pas terug als de informatie per locatie duidelijk uitlegbaar en in de praktijk bruikbaar is.'
    ]
  },
  {
    version: '2.33.17',
    date: '3 september 2026',
    title: 'Thédirac-analyse en Frankrijk-preset',
    changes: [
      'Thédirac–Catus–Montgesty–Lavercantière–Peyrilles–Uzech–Gindou werd als lokale onderzoekszone ingericht en ArcheOcc werd tot deze gemeenten beperkt.',
      'Een eerste berekende Thédirac-analyse met helling, reliëf, waterafstand en ArcheOcc-context werd toegevoegd; deze analyse is na veldtest in 2.33.18 weer verwijderd omdat de presentatie onvoldoende bruikbaar bleek.',
      'Onderaan Presets werd Frankrijk toegevoegd met Hybride wereld en de belangrijkste Franse onderzoekslagen.'
    ]
  },
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

  const curatedReleases = version === currentRelease.version
    ? [currentRelease, ...recentReleases]
    : [...recentReleases]
  const curatedVersions = new Set(curatedReleases.map(entry => entry.version))
  const entries = [...curatedReleases, ...CHANGELOG.filter(entry => !curatedVersions.has(entry.version))]

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
