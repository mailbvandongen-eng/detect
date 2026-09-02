export interface ChangeLogEntry {
  version: string
  date: string
  title: string
  changes: string[]
}

export const CHANGELOG: ChangeLogEntry[] = [
  {
    version: '2.33.10',
    date: '2 september 2026',
    title: 'Vensters en transparantie opgeschoond',
    changes: [
      'Zijvensters liggen voortaan boven alle kaartbediening, zodat onder meer de GPS-knop niet meer door Kaartlagen of het menu heen kan komen.',
      'Transparantie opent compact rechtsonder en toont direct alle zichtbare lagen waarvoor een opacity-instelling bestaat; er worden geen sliders meer kunstmatig na drie regels verborgen.',
      'Het presetvenster is compacter gemaakt, het versienummer in het hamburgermenu staat op dezelfde regel als Instellingen en presets behandelen Hybride wereld voortaan correct als basiskaart.'
    ]
  },
  {
    version: '2.33.9',
    date: '2 september 2026',
    title: 'GPS rustiger en opnieuw inzoomen hersteld',
    changes: [
      'De eerste GPS-stand toont voortaan alleen een duidelijke blauwe locatiepunt; de richtingpijl en meedraaiende kaart verschijnen pas in de tweede GPS-stand.',
      'Na GPS uit- en weer aanzetten wacht Detect op de eerste nieuwe actieve GPS-meting en zoomt daarna opnieuw betrouwbaar naar straatniveau.',
      'In de meedraaiende GPS-stand worden positie, koers en kaartrotatie bij stilstand bevroren. Met aparte stop- en startdrempels voorkomt Detect dat kleine snelheids- en GPS-schommelingen het scherm nerveus maken.'
    ]
  },
  {
    version: '2.33.8',
    date: '2 september 2026',
    title: 'Terugknop en sluiten beveiligd',
    changes: [
      'De Android-terugknop sluit Detect niet meer direct: een open venster sluit eerst, en vanaf de kaart vraagt Detect daarna expliciet of je echt wilt afsluiten.',
      'Dezelfde beveiliging werkt wanneer Detect gewoon in een browsertab draait; sluiten, verversen of de pagina verlaten krijgt waar de browser dat toestaat een extra waarschuwing.',
      'Automatische herstarts na een Detect-update blijven zonder onnodige sluitwaarschuwing werken.'
    ]
  },
  {
    version: '2.33.7',
    date: '2 september 2026',
    title: 'Wayback en dubbele kaartlabels hersteld',
    changes: [
      'Esri World Imagery Wayback gebruikt nu de officiële WMTS-route met MapServer in het pad, zodat het wereldarchief weer bereikbaar is.',
      'De rijke referentielaag wordt na het laden opnieuw met de actieve basiskaart gesynchroniseerd en kan daardoor niet meer op Esri licht blijven hangen.',
      'Hybride wereld is expliciet opgenomen in de beginstatus van de laagwinkel, zodat schakelen tussen basiskaarten voorspelbaar blijft.'
    ]
  },
  {
    version: '2.33.6',
    date: '2 september 2026',
    title: 'Betere hybride kaart en luchtfoto-tijdreis',
    changes: [
      'Satelliet- en luchtfotokaarten krijgen voortaan een rijkere referentielaag met straat-, water-, plaats- en gebiedsnamen uit OpenFreeMap/OpenStreetMap; als die bron niet bereikbaar is valt Detect terug op Esri.',
      'Luchtfoto NL heeft een tijdschuif met de officiële PDOK-jaargangen vanaf 2016, waarbij automatisch de beste beschikbare resolutie per jaar wordt gekozen.',
      'Satelliet wereld heeft een tijdschuif op basis van Esri World Imagery Wayback vanaf 2014. Het getoonde jaar is het archief- of publicatiejaar; de lokale opname kan ouder zijn.',
      'OpenFreeMap, PDOK en Esri Wayback worden meegenomen in de veldcache en kaartbronvermeldingen zijn weer zichtbaar via de inklapbare bronknop.'
    ]
  },
  {
    version: '2.33.5',
    date: '2 september 2026',
    title: 'Hybride wereldkaart toegevoegd',
    changes: [
      'Nieuwe basislaag Hybride (wereld) combineert Esri World Imagery met de actuele Hybrid Reference Layer voor dynamische wegen, plaatsen en gebiedsnamen.',
      'De bestaande Satelliet (wereld)-laag blijft apart beschikbaar voor een schoon satellietbeeld zonder automatische referentielaag.',
      'Hybride (wereld) kan ook als standaardkaart worden gekozen in Instellingen.'
    ]
  },
  {
    version: '2.33.4',
    date: '2 september 2026',
    title: 'Vierkleurige Detect-huisstijl en betrouwbare publicatie',
    changes: [
      'De gekozen Detect-kleur (blauw, bosgroen, aarde of paars) loopt nu ook door in venstertabs, primaire acties en de belangrijkste kaartknoppen.',
      'De centrale vensterlogica blijft leidend: een nieuw appvenster vervangt het bestaande venster direct, zonder overlappende uitstapanimatie.',
      'De ontbrekende runtime-afhankelijkheden zijn hersteld, zodat de echte productiebuild en GitHub Pages-publicatie weer volledig slagen.'
    ]
  },
  {
    version: '2.33.1',
    date: '1 september 2026',
    title: 'Vensterwissel sluit het oude venster direct',
    changes: [
      'Bij het wisselen verdwijnt het oude venster nu vóór het nieuwe opent; ook op tragere telefoons kunnen menu en kaartlagen niet kort over elkaar heen staan.'
    ]
  },
  {
    version: '2.33.0',
    date: '1 september 2026',
    title: 'Eén huisstijl en nog maar één venster tegelijk',
    changes: [
      'Menu, kaartlagen, presets, instellingen, handleiding, wijzigingen en gereedschappen gebruiken voortaan hetzelfde venstersjabloon.',
      'Een nieuw venster sluit automatisch het venster dat al openstond; menu en kaartlagen kunnen dus niet meer over elkaar heen staan.',
      'Kop en voet blijven vast staan en alleen het middendeel scrolt, zodat knoppen en versienummer bereikbaar blijven.',
      'De algemene tekstgrootte schaalt nu ook regelafstand en verticale ruimte mee in alle nieuwe vensters.',
      'In Instellingen kun je een blauw, groen, aarde- of paars kleurenschema voor alle vensters kiezen.'
    ]
  },
  {
    version: '2.32.71',
    date: '1 september 2026',
    title: 'Hamburgermenu werkt weer op kleinere schermen',
    changes: [
      'De kop en onderkant van het menu blijven zichtbaar, terwijl de opties ertussen soepel kunnen scrollen.',
      'Instellingen en het versienummer blijven altijd bereikbaar en de footer gebruikt nu de naam Detect.',
      'De verticale ruimte tussen menu-opties groeit en krimpt voortaan mee met de gekozen tekstgrootte.'
    ]
  },
  {
    version: '2.32.70',
    date: '31 augustus 2026',
    title: 'Detect is voortaan volledig persoonlijk',
    changes: [
      'De commerciële abonnements- en premiumlogica is verwijderd; alle aanwezige lagen zijn direct beschikbaar.',
      'De vaste koers en ontwikkelvolgorde zijn vastgelegd rond metaaldetectie, steentijd, landschap, bodem, hoogte en LiDAR.',
      'Nieuwe prioriteiten voor hybride kaart, Android-terugknop en betrouwbaardere GPS zijn aan de planning toegevoegd.',
      'GitHub bouwt en publiceert Detect voortaan automatisch na een broncode-update.'
    ]
  },
  {
    version: '2.32.69',
    date: '29 augustus 2026',
    title: 'Updates direct zichtbaar',
    changes: [
      'Detect controleert bij openen en terugkeren naar de app direct op een nieuwe versie.',
      'Een nieuwe serviceworker neemt de app automatisch over zodat een oude versie minder lang blijft hangen.'
    ]
  },
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
