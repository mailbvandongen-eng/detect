import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke, Text } from 'ol/style'

// Goudrivieren - locaties waar goudwassen mogelijk is
// Bronnen: goldwaschkarte.de, goldlineorpaillage.fr, pan4gold.nl
const GOLD_RIVERS = [
  // === NEDERLAND ===
  {
    name: 'Rijn bij Spijk',
    coords: [6.0333, 51.9167],
    country: 'NL',
    river: 'Rijn',
    region: 'Gelderland',
    goldType: 'Fijn stofgoud, flinters',
    origin: 'Alpengoud via Zwitserland',
    access: 'Vrij toegankelijk, uiterwaarden',
    tips: 'Zoek in binnenbochten op kleilaag. 1 gram per 2 dagen werk.',
    legal: 'Toegestaan met handgereedschap'
  },
  {
    name: 'Rijn bij Gendt',
    coords: [5.9667, 51.8833],
    country: 'NL',
    river: 'Rijn',
    region: 'Gelderland',
    goldType: 'Fijn stofgoud',
    origin: 'Alpengoud',
    access: 'Uiterwaarden, strandjes',
    tips: 'Beste na hoogwater wanneer nieuw sediment is afgezet',
    legal: 'Toegestaan'
  },
  {
    name: 'Maas (diverse locaties)',
    coords: [5.8500, 51.4500],
    country: 'NL',
    river: 'Maas',
    region: 'Noord-Brabant/Limburg',
    goldType: 'Zeer fijn stofgoud',
    origin: 'Ardennen/Vogezen',
    access: 'Uiterwaarden',
    tips: 'Minder productief dan Rijn, maar goud is aanwezig',
    legal: 'Toegestaan'
  },

  // === BELGIE (Let op: VERBODEN maar historisch interessant) ===
  {
    name: 'Amblève (historisch)',
    coords: [5.8667, 50.4167],
    country: 'BE',
    river: 'Amblève',
    region: 'Ardennen (Luik)',
    goldType: 'Alluviaal goud, kleine pépites',
    origin: 'Stavelot Massief',
    access: 'VERBODEN - alleen informatief',
    tips: 'Goudkoorts van 1896! Tot 5 gram/ton sediment gevonden',
    legal: 'VERBODEN in België'
  },
  {
    name: 'Chefna vallei (historisch)',
    coords: [5.9333, 50.4333],
    country: 'BE',
    river: 'Chefna',
    region: 'Ardennen',
    goldType: 'Alluviaal goud',
    origin: 'Stavelot Massief',
    access: 'VERBODEN - alleen informatief',
    tips: 'Beroemd door Julius Jung expedities',
    legal: 'VERBODEN in België'
  },

  // === DUITSLAND ===
  {
    name: 'Rhein bei Mainz-Koblenz',
    coords: [7.6000, 50.0000],
    country: 'DE',
    river: 'Rhein',
    region: 'Rheinland-Pfalz',
    goldType: 'Feine Flitter, manchmal größere Stücke',
    origin: 'Alpengold aus der Schweiz',
    access: 'Erlaubt mit Genehmigung',
    tips: 'Romeinen zochten hier al! Profi vindt 0,5g/dag',
    legal: 'Erlaubt, Wasserbehörde kontaktieren'
  },
  {
    name: 'Oberrhein (Schwarzwald)',
    coords: [7.8000, 48.0000],
    country: 'DE',
    river: 'Rhein',
    region: 'Baden-Württemberg',
    goldType: 'Rheingold, feine Flitter',
    origin: 'Alpen + Schwarzwald',
    access: 'Teilweise erlaubt',
    tips: 'Historisch belangrijkste goudwasgebied van Duitsland',
    legal: 'Regelungen beachten'
  },
  {
    name: 'Mosel bei Bernkastel-Kues',
    coords: [7.0667, 49.9167],
    country: 'DE',
    river: 'Mosel',
    region: 'Rheinland-Pfalz',
    goldType: 'Feines Waschgold',
    origin: 'Hunsrück/Eifel',
    access: 'Erlaubt',
    tips: 'Kiesbänke doorzoeken, ook bij Cochem en Traben-Trarbach',
    legal: 'Erlaubt'
  },
  {
    name: 'Eder (Goldhausen)',
    coords: [9.0000, 51.1000],
    country: 'DE',
    river: 'Eder',
    region: 'Hessen (Waldeck)',
    goldType: 'Gröberes Gold, manchmal kleine Nuggets',
    origin: 'Eisenberg bei Korbach (größte Goldreserve Mitteleuropas)',
    access: 'Goldwaschkurse beschikbaar',
    tips: 'Sinds 1308 bekend! 0,5-1 gram/dag realistisch. Goldwelten.de',
    legal: 'Erlaubt, Kurse empfohlen'
  },
  {
    name: 'Schwarza (Thüringen)',
    coords: [11.1667, 50.6000],
    country: 'DE',
    river: 'Schwarza',
    region: 'Thüringen',
    goldType: 'Nuggets möglich!',
    origin: 'Thüringer Schiefergebirge',
    access: 'Erlaubt',
    tips: '2004: 9 gram nugget gevonden! Beste rivier voor nuggets in DE',
    legal: 'Erlaubt'
  },
  {
    name: 'Isar (Bayern)',
    coords: [11.5833, 48.1333],
    country: 'DE',
    river: 'Isar',
    region: 'Bayern (München)',
    goldType: 'Alpengold, feine Flitter',
    origin: 'Alpen (Tirol)',
    access: 'Stadtnah möglich',
    tips: 'Zelfs in München te vinden! Beste spots bovenstrooms',
    legal: 'Erlaubt'
  },
  {
    name: 'Inn (Bayern)',
    coords: [12.8833, 48.2333],
    country: 'DE',
    river: 'Inn',
    region: 'Bayern (Passau)',
    goldType: 'Alpengold',
    origin: 'Tiroler Alpen',
    access: 'Erlaubt',
    tips: 'Historisch belangrijk, Romeinse goudwinning',
    legal: 'Erlaubt'
  },
  {
    name: 'Kinzig (Schwarzwald)',
    coords: [8.0500, 48.2833],
    country: 'DE',
    river: 'Kinzig',
    region: 'Schwarzwald',
    goldType: 'Schwarzwaldgold',
    origin: 'Lokale ertsaders',
    access: 'Erlaubt',
    tips: 'Combineer met bezoek aan Grube Clara!',
    legal: 'Erlaubt'
  },

  // === FRANKRIJK ===
  {
    name: 'Gardon d\'Anduze',
    coords: [3.9833, 44.0500],
    country: 'FR',
    river: 'Gardon',
    region: 'Gard (Cévennes)',
    goldType: 'Hoogste concentratie van Frankrijk!',
    origin: 'Cevennen gebergte',
    access: 'Déclaration DDT vereist',
    tips: 'BESTE plek in Frankrijk! Romeinen wonnen hier al goud',
    legal: '1 mei - 31 okt, déclaration verplicht'
  },
  {
    name: 'Gardon de Mialet',
    coords: [3.9333, 44.1000],
    country: 'FR',
    river: 'Gardon',
    region: 'Gard (Cévennes)',
    goldType: 'Alluviaal goud, paillettes',
    origin: 'Cevennen',
    access: 'Déclaration DDT vereist',
    tips: 'Prachtige omgeving, goed voor beginners',
    legal: 'Seizoensgebonden'
  },
  {
    name: 'La Cèze',
    coords: [4.2167, 44.2000],
    country: 'FR',
    river: 'Cèze',
    region: 'Gard',
    goldType: 'Paillettes d\'or',
    origin: 'Cevennen',
    access: 'Déclaration vereist',
    tips: 'Mooie rivier, combineer met wandelen',
    legal: 'Check DDT Gard'
  },
  {
    name: 'Le Salat',
    coords: [0.9500, 42.9667],
    country: 'FR',
    river: 'Salat',
    region: 'Ariège (Pyrénées)',
    goldType: 'Or de crue (na hoogwater)',
    origin: 'Pyrénées',
    access: '1 mei - 31 okt',
    tips: 'Goud zit in eerste 20cm na verwijderen oppervlakte grind',
    legal: 'Déclaration préfecture Ariège'
  },
  {
    name: 'L\'Ariège',
    coords: [1.6000, 42.9333],
    country: 'FR',
    river: 'Ariège',
    region: 'Ariège',
    goldType: 'Alluviaal goud, soms kleine pépites',
    origin: 'Pyrénées centrale',
    access: 'Seizoensgebonden',
    tips: 'Hele rivier is aurifère van bron tot Garonne',
    legal: 'Déclaration vereist'
  },
  {
    name: 'Le Vicdessos',
    coords: [1.5000, 42.7667],
    country: 'FR',
    river: 'Vicdessos',
    region: 'Ariège',
    goldType: 'Berggoud',
    origin: 'Hoge Pyrénées',
    access: 'Berggebied, ervaring nodig',
    tips: 'Minder bezocht, potentieel goede vondsten',
    legal: 'Check lokale regels'
  },
  {
    name: 'L\'Hérault',
    coords: [3.5667, 43.7000],
    country: 'FR',
    river: 'Hérault',
    region: 'Hérault',
    goldType: 'Fijn alluviaal goud',
    origin: 'Cevennen/Montagne Noire',
    access: 'Déclaration DDT',
    tips: 'Minder bekend dan Gard, rustiger',
    legal: 'Seizoensregels'
  },
  {
    name: 'L\'Arve',
    coords: [6.1167, 46.0833],
    country: 'FR',
    river: 'Arve',
    region: 'Haute-Savoie',
    goldType: 'Alpengoud, soms grote pépites',
    origin: 'Mont-Blanc massief',
    access: 'Déclaration vereist',
    tips: 'Grootste pépite van Frankrijk hier gevonden!',
    legal: 'Check DDT Haute-Savoie'
  },
  {
    name: 'Le Rhône (amont)',
    coords: [5.9333, 45.7500],
    country: 'FR',
    river: 'Rhône',
    region: 'Savoie/Ain',
    goldType: 'Alpengoud',
    origin: 'Zwitserse/Franse Alpen',
    access: 'Diverse toegangspunten',
    tips: 'Grote rivier, zoek rustige zijarmen',
    legal: 'Afhankelijk van département'
  },
  {
    name: 'La Têt',
    coords: [2.8833, 42.6833],
    country: 'FR',
    river: 'Têt',
    region: 'Pyrénées-Orientales',
    goldType: 'Or des Pyrénées',
    origin: 'Oostelijke Pyrénées',
    access: 'Check DDT 66',
    tips: 'Mediterrane sfeer, warm klimaat',
    legal: 'Déclaration vereist'
  }
]

// Style voor goud rivieren - gouden markers
function createGoldStyle(feature: Feature) {
  const name = feature.get('name') || ''
  const country = feature.get('country') || ''
  const legal = feature.get('legal') || ''

  // Rood voor verboden (BE), goud voor toegestaan
  const isProhibited = legal.includes('VERBODEN') || legal.includes('INTERDIT')

  const fillColor = isProhibited
    ? 'rgba(200, 50, 50, 0.9)'  // Rood voor verboden
    : 'rgba(255, 215, 0, 0.9)' // Goud

  const strokeColor = isProhibited ? '#8B0000' : '#B8860B'

  return new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: fillColor }),
      stroke: new Stroke({ color: strokeColor, width: 2 })
    }),
    text: new Text({
      text: name,
      font: 'bold 11px sans-serif',
      offsetY: -18,
      fill: new Fill({ color: '#1a1a1a' }),
      stroke: new Stroke({ color: 'white', width: 3 }),
      textAlign: 'center'
    })
  })
}

export async function createGoudrivierenLayerOL() {
  const features = GOLD_RIVERS.map(spot => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(spot.coords))
    })

    feature.setProperties({
      name: spot.name,
      country: spot.country,
      river: spot.river,
      region: spot.region,
      goldType: spot.goldType,
      origin: spot.origin,
      access: spot.access,
      tips: spot.tips,
      legal: spot.legal,
      layerType: 'goudrivier'
    })

    return feature
  })

  const source = new VectorSource({ features })

  const layer = new VectorLayer({
    source,
    properties: { title: 'Goudrivieren' },
    visible: false,
    zIndex: 25,
    style: createGoldStyle
  })

  console.log(`✓ Goudrivieren loaded (${features.length} locations: NL/BE/DE/FR)`)
  return layer
}
