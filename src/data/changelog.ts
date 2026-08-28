export interface ChangeLogEntry {
  version: string
  date: string
  title: string
  changes: string[]
}

export const CHANGELOG: ChangeLogEntry[] = [
  {
    version: '2.32.68',
    date: '27 augustus 2026',
    title: 'Onderzoek en synchronisatie',
    changes: [
      'Na iedere update verschijnt één keer een overzicht in gewone taal. Via Menu > Wijzigingen kun je het later opnieuw bekijken.',
      'Nieuwe onderzoeks-presets maken snel schakelen mogelijk tussen LiDAR en hoogte, bodem en landschap, en percelen en historie.',
      'Instellingen en presets gaan voortaan mee met de cloud-synchronisatie wanneer je met Google bent ingelogd.',
      'De cloudstatus meldt nu eerlijk of synchronisatie werkt of door Firebase wordt geweigerd.'
    ]
  },
  {
    version: '2.32.67',
    date: '27 augustus 2026',
    title: 'Nieuwe kaart en beter zoeken',
    changes: [
      'De defecte CARTO-basiskaart is vervangen door een stabiele, lichte wereldkaart van Esri zonder API-sleutelmelding.',
      'Adreszoeken werkt niet meer alleen in Nederland: ook plaatsen en adressen in Frankrijk en de rest van Europa worden gevonden.',
      'Het zoekvenster gebruikt op een telefoon meer ruimte en lange resultaten blijven leesbaar.'
    ]
  }
]

const LAST_SEEN_VERSION_KEY = 'detect-last-seen-version'

export function hasSeenChangeLog(version: string): boolean {
  if (typeof window === 'undefined') return true

  try {
    return window.localStorage.getItem(LAST_SEEN_VERSION_KEY) === version
  } catch {
    return false
  }
}

export function markChangeLogSeen(version: string): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(LAST_SEEN_VERSION_KEY, version)
  } catch {
    // De melding kan bij geblokkeerde opslag opnieuw verschijnen; de app blijft werken.
  }
}
