import type { ThediracResearchSite } from './thediracResearchSites'

// Alleen gepubliceerde meldingen. Een gemeentecentrum blijft expliciet een
// globale positie, ook wanneer het onderzoek zelf goed gedocumenteerd is.
const communeNote = 'Marker op het openbare gemeentecentrum (geo.api.gouv.fr); de exacte vindplaats is hiermee niet gelokaliseerd.'
export const THEDIRAC_RESEARCH_EXPANSION: ThediracResearchSite[] = [
  {
    id: 'montgesty-secades-biface', category: 'prehistorie',
    nameNl: 'Les Secades — biface-hachereau van Montgesty', nameFr: 'Les Secades — biface-hachereau de Montgesty',
    siteTypeNl: 'Geïsoleerde oppervlaktevondst', siteTypeFr: 'Découverte isolée de surface',
    lon: 1.271812, lat: 44.565330,
    periodNl: 'Oud-Paleolithicum; in de publicatie toegeschreven aan het Acheuléen', periodFr: 'Paléolithique inférieur ; attribution acheuléenne publiée',
    descriptionNl: 'Maury en Turq publiceerden een sterk verweerde biface-hachereau van kwartsiet, aan het oppervlak gevonden op kalksteen. De typologische toeschrijving is geen absolute datering en de losse vondst bewijst geen nederzetting.',
    descriptionFr: 'Maury et Turq publient un biface-hachereau en quartzite très altéré, découvert en surface sur le calcaire. L’attribution typologique ne fournit pas de datation absolue ni de preuve d’habitat.',
    source: 'G. Maury & A. Turq, Bulletin de la Société des études du Lot, tome 104, 1983 — Le biface hachereau de Montgesty',
    sourceUrl: 'https://societedesetudesdulot.org/wp-content/uploads/2023/01/Bulletin-de-la-SEL-T104-1983.pdf',
    locationQuality: 'exact',
    locationNoteNl: 'Gepubliceerd bronpunt uit 1983: Lambert III x=515425, y=3252250, omgerekend naar WGS84. Historische bronprecisie; geen actuele perceelgrens.',
    locationNoteFr: 'Coordonnées Lambert III publiées en 1983, converties en WGS84 ; précision historique, pas une limite parcellaire actuelle.'
  },
  {
    id: 'roc-de-combe-payrignac', category: 'prehistorie',
    nameNl: 'Roc de Combe — onderzoek bij Payrignac', nameFr: 'Roc de Combe — Payrignac',
    siteTypeNl: 'Grot en rotsabri; opgravingsonderzoek', siteTypeFr: 'Grotte et abri ; fouilles',
    lon: 1.3423, lat: 44.7612,
    periodNl: 'Midden- en Laat-Paleolithicum', periodFr: 'Paléolithique moyen et supérieur',
    descriptionNl: 'Bordes en Labrot beschrijven een opeenvolging van Moustérien, Châtelperronien, Aurignacien en Gravettien. Dit is een referentie voor meerdere bewoningsfasen, zonder daarmee ononderbroken bewoning aan te tonen.',
    descriptionFr: 'Bordes et Labrot décrivent une séquence moustérienne, châtelperronienne, aurignacienne et gravettienne. Plusieurs phases sont attestées, sans démontrer une occupation continue.',
    source: 'F. Bordes & J. Labrot, Bulletin de la Société préhistorique française, 1967, pp. 15–28 ; positie: API Découpage administratif, Payrignac 46216',
    sourceUrl: 'https://www.persee.fr/doc/bspf_0249-7638_1967_hos_64_1_4097',
    locationQuality: 'approximate', locationNoteNl: communeNote, locationNoteFr: 'Centre communal public, pas l’emplacement de la grotte.'
  },
  {
    id: 'les-bosses-lamagdelaine', category: 'prehistorie',
    nameNl: 'Les Bosses — steentechnologie bij Lamagdelaine', nameFr: 'Les Bosses — Lamagdelaine',
    siteTypeNl: 'Onderzochte lithische industrie', siteTypeFr: 'Industrie lithique étudiée',
    lon: 1.5011, lat: 44.4768,
    periodNl: 'Paleolithicum', periodFr: 'Paléolithique',
    descriptionNl: 'Een onderzoek van Mourre, Jarry, Colonge en Lelouvier behandelt het splijten van stenen op een aambeeld bij Les Bosses. De techniek is hier gedocumenteerd; deze vermelding geeft geen exact bezoek- of zoekpunt.',
    descriptionFr: 'Mourre, Jarry, Colonge et Lelouvier étudient le débitage sur enclume aux Bosses. Cette notice documente la technique, sans fournir un point exact de visite ou de prospection.',
    source: 'Mourre et al., PALEO, numéro spécial 2009–2010, pp. 49–62 ; positie: API Découpage administratif, Lamagdelaine 46149',
    sourceUrl: 'https://journals.openedition.org/paleo/1894',
    locationQuality: 'approximate', locationNoteNl: communeNote, locationNoteFr: 'Centre communal public ; emplacement exact non reporté.'
  },
  {
    id: 'les-combes-lacapelle-cabanac', category: 'prehistorie',
    nameNl: 'Les Combes — Acheuléen bij Lacapelle-Cabanac', nameFr: 'Les Combes — Lacapelle-Cabanac',
    siteTypeNl: 'Gepubliceerde oppervlaktecollectie', siteTypeFr: 'Collection de surface publiée',
    lon: 1.0739, lat: 44.4707,
    periodNl: 'Oud-Paleolithicum / Acheuléen', periodFr: 'Paléolithique inférieur / Acheuléen',
    descriptionNl: 'Alain Turq publiceert een inventaris van de oppervlaktecollectie van Les Combes, met vuursteen en kwarts of verwante gesteenten. Het is een andere locatie dan de Romeinse tegels bij Chemin des Combes in Montgesty.',
    descriptionFr: 'Alain Turq publie l’inventaire de la collection de surface des Combes, en silex et quartz ou roches assimilées. Site distinct du Chemin des Combes à Montgesty.',
    source: 'A. Turq, Paléo supplément, 2000, inventaire n° 4 ; positie: API Découpage administratif, Lacapelle-Cabanac 46142',
    sourceUrl: 'https://www.persee.fr/doc/pal_1145-3370_2000_sup_2_1_1284?pageId=T1_448',
    locationQuality: 'approximate', locationNoteNl: communeNote, locationNoteFr: 'Centre communal public ; pas le point de récolte.'
  },
  {
    id: 'la-plane-mazeyrolles', category: 'prehistorie',
    nameNl: 'La Plane — openluchtvindplaats bij Mazeyrolles', nameFr: 'La Plane — Mazeyrolles',
    siteTypeNl: 'Opgegraven openluchtvindplaats', siteTypeFr: 'Site de plein air fouillé',
    lon: 0.996, lat: 44.6721,
    periodNl: 'Midden-Paleolithicum / Moustérien', periodFr: 'Paléolithique moyen / Moustérien',
    descriptionNl: 'Turq beschrijft een lithische concentratie op de waterscheiding tussen Lot en Dordogne. Het onderzoek vond geen duidelijke ruimtelijke inrichting. Deze regionale vergelijking laat zien waarom uitsluitend beekoevers bekijken te beperkt is.',
    descriptionFr: 'Turq décrit une concentration lithique sur l’interfluve Lot–Dordogne, sans organisation spatiale nette. Référence régionale montrant l’intérêt des interfluves, pas seulement des berges.',
    source: 'A. Turq, Bulletin de la Société préhistorique française, 1990, pp. 314–316 ; positie: API Découpage administratif, Mazeyrolles 24263',
    sourceUrl: 'https://www.persee.fr/doc/bspf_0249-7638_1990_hos_87_10_9914',
    locationQuality: 'approximate', locationNoteNl: communeNote, locationNoteFr: 'Centre communal public ; pas l’emprise de fouille.'
  },
  {
    id: 'mas-viel-saint-simon', category: 'prehistorie',
    nameNl: 'Mas-Viel — Moustérien bij Saint-Simon', nameFr: 'Mas-Viel — Saint-Simon',
    siteTypeNl: 'Grot; lithische industrie en menselijke resten', siteTypeFr: 'Grotte ; industrie lithique et restes humains',
    lon: 1.8313, lat: 44.6997,
    periodNl: 'Midden-Paleolithicum / Moustérien', periodFr: 'Paléolithique moyen / Moustérien',
    descriptionNl: 'Turq bespreekt beperkt opgravingsonderzoek en neanderthalerresten in Mas-Viel. Opgenomen als regionale vergelijkingslocatie ten oosten van de directe Thédirac-regio, niet als exact gelokaliseerde grot.',
    descriptionFr: 'Turq présente des fouilles limitées et des restes néandertaliens du Mas-Viel. Référence régionale à l’est du secteur de Thédirac ; grotte non localisée précisément ici.',
    source: 'A. Turq, Bulletin de la Société préhistorique française, 1990 ; positie: API Découpage administratif, Saint-Simon 46292',
    sourceUrl: 'https://www.persee.fr/doc/bspf_0249-7638_1990_hos_87_10_9914?pageId=T1_315',
    locationQuality: 'approximate', locationNoteNl: communeNote, locationNoteFr: 'Centre communal public ; pas l’entrée de la grotte.'
  }
]
