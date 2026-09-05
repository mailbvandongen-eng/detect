export interface ChangeLogEntry {
  version: string
  date: string
  title: string
  changes: string[]
}

export const CHANGELOG: ChangeLogEntry[] = [
  {
    version: '2.33.28',
    date: '5 september 2026',
    title: 'Referentielijnen onder de punten',
    changes: [
      'De lichte gele en witte lijnen op de hybride luchtfoto zijn wegen uit de OpenFreeMap/OpenStreetMap-referentielaag; het zijn geen onderzoeksroutes of verbindingen tussen vindplaatsen.',
      'De referentielaag verhuist van z-index 110 naar 17, zodat kaartpunten en thematische lijnen er voortaan boven worden getekend.',
      'Wegen en overige referentielijnen zijn 28 procent dunner gemaakt. De blauwe BD TOPAGE-waterlopen blijven ongewijzigd.'
    ]
  },
  {
    version: '2.33.27',
    date: '5 september 2026',
    title: 'Brede regioscan toegevoegd',
    changes: [
      'De brede regioscan voegt 6 bewezen fossiellocaties, 2 archeologische contextsites en 8 officiële bezienswaardigheden of geosites toe. De mineralenlaag blijft bewust ongewijzigd omdat extra BRGM-indices geen betrouwbare publieks- of oppervlakteplekken opleverden.',
      'Spectaculaire wandelroutes groeit van 11 naar 15 officiële GPX-lijnen met Ouysse–Alzou, À Vercinge(to)ry, Pierre-Levée langs Vieux Sauliac en Monteils langs de Célé-kliffen.',
      'Privéterrein, groeve- en weggevaar, beschermde no-detectsites en tijdelijke sluiting worden expliciet gemeld. Roucadour blijft zichtbaar voor het archeologische beeld, maar is niet bezoekbaar.'
    ]
  },
  {
    version: '2.33.26',
    date: '4 september 2026',
    title: 'Mineralen en fossielen met bewijs',
    changes: [
      'Twee aparte puntlagen voegen 12 mineralogische locaties en 22 fossielvindplaatsen toe, geselecteerd uit de officieel gevalideerde INPG-inventaris en officiële bezoekersbronnen.',
      'Alle mineralenlocaties liggen binnen circa 1½ uur, met twee expliciete OSRM-randgevallen van 92 en 95 minuten. Twintig fossielplekken liggen binnen circa 90 minuten; alleen de uitzonderlijk rijke publieksvindplaatsen Béon en Sansan staan als langere dagtocht op de kaart.',
      'Iedere popup vermeldt terreintype, bewijs, zichtbaarheid aan het oppervlak, rijtijd, bron, markerprecisie, toegang en verzamelregels. Beschermd of privé blijft zichtbaar, maar wordt nooit als toestemming gepresenteerd.'
    ]
  },
  {
    version: '2.33.25',
    date: '4 september 2026',
    title: 'Officiële wandelroutes als lijnen',
    changes: [
      'Een aparte laag Spectaculaire wandelroutes toont elf echte routegeometrieën uit officiële GPX-downloads; geen punten en geen met de hand getekende benaderingen.',
      'De selectie loopt van de kliffen en watervallen van Lot en Dordogne via de kloven van Aveyron tot de vulkaanruggen van de Cantal. Makkelijk, gemiddeld en zwaar hebben herkenbare groene, oranje en rode lijnen.',
      'Een tik op een route toont afstand, D+, duur, markering, landschap en wildlife, klim- of klauterwerk, knie- en terreinwaarschuwingen, route naar de start, officiële website en officiële GPX.'
    ]
  },
  {
    version: '2.33.24',
    date: '4 september 2026',
    title: 'Bestemming bepaalt de rit',
    changes: [
      'Bezienswaardigheden groeit van 37 naar 69 gecontroleerde plekken. De 32 aanvullingen leggen de nadruk op authentieke grotkunst, prehistorische en Romeinse sites, ruïnes, oud bos en uitzonderlijk landschap.',
      'Prehistorie & archeologie is een eigen zevende categorie. Nieuwe popups leggen uit waarom een langere rit de moeite waard is en vermelden eerlijk replica’s, reservering, sluiting, trappen en zware toegang.',
      'De reistijd is geen harde uurgrens meer: 66 bestemmingen liggen binnen circa drie uur. Niaux, Gargas en Pair-non-Pair blijven als expliciete uitzonderingen zichtbaar op circa 3 uur 02 tot 3 uur 13.'
    ]
  },
  {
    version: '2.33.23',
    date: '4 september 2026',
    title: 'Bezienswaardigheden rond Thédirac',
    changes: [
      'Een aparte laag Bezienswaardigheden toont 37 echte bestemmingen rond Thédirac: grotten, kastelen en ruïnes, historische dorpen, natuur en oude bossen, uitzichtpunten en waterlandschap.',
      'Ieder punt heeft een eigen categoriesymbool, een label bij verder inzoomen en een tweetalige popup met bezoekinformatie, openbare coördinaten, bron en een directe autoroute vanaf Thédirac.',
      'De routeberekening vermeldt afstand en richttijd zonder verkeersdrukte. 34 plekken liggen binnen circa 63 minuten; Saint-Cirq-Lapopie, Padirac en Barrières staan eerlijk als randgebied op 67–71 minuten.'
    ]
  },
  {
    version: '2.33.22',
    date: '3 september 2026',
    title: 'Archeologische regio uitgebreid',
    changes: [
      'De bronlaag groeit van 22 naar 38 plekken. Nieuw zijn onder meer Le Piage, Cougnac, Combe Nègre, Roc de la Cave, zes dolmens, de oppida van l’Impernal en Murcens, het aquaduct van Vers, Cazals, Abbaye Nouvelle en het oude kasteelterrein van Luzech.',
      'Het onderzoekskader is verruimd tot circa 35 × 40 kilometer rond Thédirac; de Frankrijk-preset opent iets ruimer zodat ook Gourdon, Luzech en Murcens direct in beeld passen.',
      'De lokale BD TOPAGE-dekking volgt die verruiming met 150 klikbare waterlopen, waarvan 75 met een gepubliceerde naam. Beschermde en no-detectplekken blijven zichtbaar als archeologische context.'
    ]
  },
  {
    version: '2.33.21',
    date: '3 september 2026',
    title: 'Water, landbedekking en archeologie hersteld',
    changes: [
      'BD TOPAGE-waterlopen worden rond Thédirac op dorpsniveau duidelijk dikker getekend. De 59 lokale waterobjecten zijn klikbaar; bij 33 daarvan publiceert de bron een naam.',
      'OCS GE vertaalt de officiële CS- en US-codes voortaan naar gewone Nederlandse bodembedekking en grondgebruik, met peiljaar en oppervlakte in hectare.',
      'De lege lokale ArcheOcc-laag is verwijderd: de officiële publieksdataset bevat nul objecten in de zeven onderzoeksgemeenten. De 22 echte bronlocaties staan voortaan herkenbaar als Archeologische plekken · Thédirac (22) in de preset.'
    ]
  },
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
