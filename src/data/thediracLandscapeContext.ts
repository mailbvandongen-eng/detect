import type { CustomFeature } from '../store/customLayerStore'

export const THEDIRAC_CONTEXT_LAYER_NAME = 'Landschap & bronnen · Thédirac'
const study = 'https://popups.lib.uliege.be/3041-5527/index.php?file=1&id=4228'

// Deze rechthoeken zijn oriëntatiekaders van Detect, geen geïnventariseerde
// vindplaatsen, officiële verwachtingszones of gedigitaliseerde bronbegrenzingen.
// Geen kansscore: de studie onderbouwt de context, niet een verwachting per perceel.
function context(id: string, naam: string, bounds: number[], omschrijving: string, bron: string, link: string): CustomFeature {
  const [w,s,e,n] = bounds
  return {
    type: 'Feature', geometry: {type: 'Polygon', coordinates: [[[w,s],[e,s],[e,n],[w,n],[w,s]]]},
    properties: {detectSeedId: `landschap:${id}`, naam, categorie: 'Landschappelijke context',
      periode: 'Steentijd / Paleolithicum', bewijsstatus: 'Landschappelijke aanwijzing',
      locatienauwkeurigheid: 'schematic',
      omschrijving, bron, link,
      locatienotitie: 'Schematisch oriëntatiekader van Detect; de grenzen zijn niet archeologisch onderzocht of uit de bron overgenomen.',
      kaartstatus: 'Geen officiële verwachtingenkaart en geen bewezen vindplaats. Binnen dit kader is geen hogere vondstkans per perceel vastgesteld.'}
  }
}

export const THEDIRAC_LANDSCAPE_FEATURES: CustomFeature[] = [
  context('bouriane', 'Bouriane — openluchtcontext steentijd', [1.15,44.55,1.43,44.80],
    'Jaubert beschrijft openlucht-Moustérien in de Bouriane. Grondstoffen en de randen van kalksteenplateaus zijn relevante onderzoeksfactoren. Vergelijk geologie en reliëf; dit kader markeert alleen een deel van de besproken regio.',
    'J. Jaubert, ERAUL 98, 2001, pp. 151–161 ; Detect-oriëntatiekader', study),
  context('lot-downstream', 'Lot beneden Cahors — terrassen en steentijdcontext', [1.02,44.43,1.38,44.51],
    'De regionale studie noemt openlucht-Moustérien in de Lotvallei beneden Cahors. Oude rivierterrassen en gesteentevoorkomens helpen het vroegere landschap begrijpen. De huidige rivierlijn is geen reconstructie van paleolithische oevers.',
    'J. Jaubert, ERAUL 98, 2001, pp. 151–161 ; Detect-oriëntatiekader', study),
  context('frau', 'Frau bij Thédirac — grondstoffencontext', [1.27,44.59,1.38,44.65],
    'Het departement beschrijft zand- en kiezelafzettingen in de Bouriane. De nabijgelegen gepubliceerde vindplaats Le Garisset documenteert het gebruik van lokaal kwarts en metaquartziet. Een natuurlijke steenconcentratie is op zichzelf geen menselijke bewerkingsplaats.',
    'Département du Lot — landschap Bouriane ; archeologische bron bij Le Garisset afzonderlijk vermeld',
    'https://patrimoines.lot.fr/default/les-paysages-du-lot-la-bouriane.aspx')
]

export const THEDIRAC_SOURCE_GUIDES = [
  {id:'atlas', naam:'Atlas des patrimoines — archeologische onderzoekszones', periode:'Alle perioden',
    omschrijving:'Openbare ZPPA-zones en erfgoedbescherming. Niet volledig en niet per periode ingedeeld. Een ontbrekende zone betekent niet dat er geen archeologie ligt. De dekking bij Thédirac is hier niet als volledige lokale kaart geïnventariseerd.',
    bron:'Ministère de la Culture', link:'https://atlas.patrimoines.culture.fr/'},
  {id:'national', naam:'Carte archéologique nationale — inventaris op aanvraag', periode:'Alle perioden',
    omschrijving:'De nationale inventaris is bij de SRA van DRAC Occitanie opvraagbaar. De beschikbare nauwkeurigheid hangt af van de bescherming van het erfgoed. Geen volledig openbare puntenexport.',
    bron:'Ministère de la Culture / DRAC Occitanie', link:'https://www.culture.gouv.fr/thematiques/archeologie/l-archeologie-en-france/la-carte-archeologique-nationale'},
  {id:'bsr', naam:'Onderzoeksverslagen — Occitanie en Midi-Pyrénées', periode:'Alle perioden',
    omschrijving:'Openbare regionale onderzoeksverslagen met korte notices per operatie en geografische en chronologische indices. Zoek voor oudere onderzoeken ook onder Midi-Pyrénées, departement Lot.',
    bron:'DRAC Occitanie — Bilans scientifiques régionaux', link:'https://www.culture.gouv.fr/regions/drac-occitanie/la-direction-regionale-des-affaires-culturelles-drac-occitanie/patrimoines-et-architecture/l-archeologie-a-la-drac-occitanie/bilans-scientifiques-regionaux-bsr-de-l-archeologie-en-occitanie'},
  {id:'cag', naam:'Carte archéologique de la Gaule — 46, Le Lot', periode:'IJzertijd / Romeins',
    omschrijving:'Herziene inventaris uit 2011 met plaatsbeschrijvingen en het communicatienetwerk. Link naar de uitgever; het boek is niet hier als gratis volledige tekst beschikbaar.',
    bron:'Éditions de la Maison des sciences de l’homme, 2011', link:'https://www.editions-msh.fr/livre/carte-archeologique-de-la-gaule-116/'},
  {id:'brgm', naam:'BRGM InfoTerre — geologie en rivierafzettingen', periode:'Alle perioden',
    omschrijving:'Openbare geologische kaarten en toelichtingen. Gebruik naast LiDAR om afzettingen en gesteenten te onderscheiden. De geologie is al als kaartlaag in de vakantiepreset aanwezig.',
    bron:'BRGM — InfoTerre', link:'https://infoterre.brgm.fr/'},
  {id:'lidar', naam:'IGN LiDAR HD — terrein onder begroeiing', periode:'Alle perioden',
    omschrijving:'Open terreinhoogtegegevens voor reliëf, terrassen en landschapsvormen. Een vorm in het reliëf heeft daarmee nog geen archeologische datering. De LiDAR-terreinlaag is al in de vakantiepreset aanwezig.',
    bron:'IGN — LiDAR HD', link:'https://www.ign.fr/institut/programme-lidar-hd-vers-une-nouvelle-cartographie-3d-du-territoire'}
]
