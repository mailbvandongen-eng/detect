export type ThediracResearchSite = {
  id: string
  category: 'prehistorie' | 'middeleeuwen' | 'romeins'
  nameNl: string
  nameFr: string
  lon: number
  lat: number
  periodNl: string
  periodFr: string
  descriptionNl: string
  descriptionFr: string
  source: string
  sourceUrl?: string
  protected?: boolean
  locationQuality: 'exact' | 'source-centroid' | 'approximate'
}

// Coordinaten worden nooit door Detect verplaatst of vervaagd.
// 'exact' betekent: de openbare bron publiceert dit punt als locatie.
// 'source-centroid'/'approximate' betekent: de bron zelf geeft alleen een
// centrum-/globale locatie. Detect bewaart ook die bronpositie ongewijzigd.
export const THEDIRAC_RESEARCH_SITES: ThediracResearchSite[] = [
  {
    id: 'surges-dolmen',
    category: 'prehistorie',
    nameNl: 'Dolmen van Surgès',
    nameFr: 'Site archéologique du dolmen de Surgès',
    lon: 1.30557920416873,
    lat: 44.6208014204898,
    periodNl: 'Neolithicum – Chalcolithicum',
    periodFr: 'Néolithique – Chalcolithique',
    descriptionNl: 'Uitzonderlijk megalithisch monument in Quercy. De kamer opent via een zij-ingang en ligt aan het oostelijke uiteinde van een cairn van circa 30 meter. Het monument is gedurende meerdere millennia aangepast en hergebruikt.',
    descriptionFr: 'Dolmen mégalithique exceptionnel en Quercy. La chambre possède une entrée latérale et se trouve à l’extrémité est d’un cairn d’environ 30 mètres. Le monument a connu des remaniements et réutilisations sur plusieurs millénaires.',
    source: 'Ministère de la Culture — POP / Mérimée PA46000063',
    sourceUrl: 'https://pop.culture.gouv.fr/notice/merimee/PA46000063',
    protected: true,
    locationQuality: 'exact'
  },
  {
    id: 'riffat-i',
    category: 'prehistorie',
    nameNl: 'Dolmen du Riffat I',
    nameFr: 'Dolmen du Riffat I',
    lon: 1.3167,
    lat: 44.5833,
    periodNl: 'Laat-Neolithicum / Chalcolithicum',
    periodFr: 'Néolithique final / Chalcolithique',
    descriptionNl: 'Publiek beschreven megalithische vindplaats bij Thédirac. In de literatuur is menselijk bot van deze context gedateerd op circa 4090 ±130 BP. Dit is de gepubliceerde globale bronpositie; Detect heeft het punt niet verschoven.',
    descriptionFr: 'Site mégalithique documenté près de Thédirac. La littérature mentionne une datation d’ossement humain d’environ 4090 ±130 BP. Il s’agit de la position globale publiée par la source; Detect ne déplace pas le point.',
    source: 'Archeologische literatuur — publieke locatie-indicatie',
    protected: true,
    locationQuality: 'approximate'
  },
  {
    id: 'thedirac-chateau',
    category: 'middeleeuwen',
    nameNl: 'Kasteel van Thédirac',
    nameFr: 'Château de Thédirac',
    lon: 1.3183,
    lat: 44.6017,
    periodNl: 'Middeleeuwen – vooral eind 15e eeuw',
    periodFr: 'Moyen Âge – principalement fin du XVe siècle',
    descriptionNl: 'Het inventarisdossier noemt de familie Thédirac al in de jaren 1150. Het huidige kasteel bevat vooral laatmiddeleeuwse bouwfasen. De huidige bronpositie ligt op dorpsniveau; Detect verplaatst deze niet.',
    descriptionFr: 'Le dossier d’inventaire mentionne les Thédirac dès les années 1150. Le château actuel conserve surtout des phases de construction de la fin du Moyen Âge. La position source actuelle est au niveau du village; Detect ne la déplace pas.',
    source: 'Région Occitanie / Département du Lot — POP / Mérimée IA46101577',
    sourceUrl: 'https://pop.culture.gouv.fr/notice/merimee/IA46101577',
    locationQuality: 'source-centroid'
  },
  {
    id: 'catus-roman',
    category: 'romeins',
    nameNl: 'Romeinse bewoning Catus',
    nameFr: 'Occupation antique de Catus',
    lon: 1.335,
    lat: 44.557,
    periodNl: 'Romeinse tijd, ca. 1e–4e eeuw',
    periodFr: 'Époque romaine, env. Ier–IVe siècle',
    descriptionNl: 'Archeologische context rond Catus met Romeins bouwmateriaal en aardewerk. Dit is de beschikbare globale bronpositie en geen door Detect verschoven vindplaats.',
    descriptionFr: 'Contexte archéologique autour de Catus avec matériaux de construction et céramiques antiques. Il s’agit de la position globale disponible dans la source, et non d’un point déplacé par Detect.',
    source: 'Publieke archeologische onderzoekscontext Catus',
    locationQuality: 'approximate'
  }
]
