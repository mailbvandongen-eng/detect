import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke, Text } from 'ol/style'

// Mineralen hotspots - populaire zoeklocaties in FR/BE/DE
// Bronnen: Mindat.org, Mineralienatlas.de, Geoforum.fr
const MINERAL_HOTSPOTS = [
  // === FRANKRIJK ===
  {
    name: 'Mine de Pégut',
    coords: [3.3908, 45.4580],
    country: 'FR',
    region: 'Auvergne',
    minerals: 'Amethist (enige echte amethistmijn van Europa)',
    geology: 'Hydrothermale kwarts aders in graniet',
    access: 'Bezoekbaar met rondleiding, zelf zoeken mogelijk',
    tips: 'Reserveren via amethystes-auvergne.com'
  },
  {
    name: 'Maison de l\'Améthyste',
    coords: [3.3844, 45.5028],
    country: 'FR',
    region: 'Auvergne (Vernet-la-Varenne)',
    minerals: 'Amethist, kwarts',
    geology: 'Livradois amethist district - grootste in Frankrijk',
    access: 'Museum + omliggende vindplaatsen',
    tips: 'Goed startpunt voor exploratie van de regio'
  },
  {
    name: 'Grotte aux Cristaux (Belle-Croix)',
    coords: [2.6997, 48.4219],
    country: 'FR',
    region: 'Fontainebleau',
    minerals: 'Calciet kristallen in zand (wereldberoemd)',
    geology: 'Stampien zanden met calciet concreties',
    access: 'Beschermd monument, alleen kijken',
    tips: 'Unieke zandcalciet formaties, ook bij Nemours en Darvault'
  },
  {
    name: 'Huelgoat Mines',
    coords: [-3.7450, 48.3617],
    country: 'FR',
    region: 'Bretagne (Finistère)',
    minerals: 'Galeniet, pyromorphiet (groen/bruin), zilver',
    geology: 'Hercynische ertsgangen in graniet',
    access: 'Oude mijnhaldes, deels toegankelijk',
    tips: 'Historische 18e eeuwse mijnen, check lokale toegang'
  },
  {
    name: 'Chaillac Mines',
    coords: [1.2976, 46.4340],
    country: 'FR',
    region: 'Indre (Centre-Val de Loire)',
    minerals: 'Fluoriet (geel/violet/roze), bariet, pyromorphiet',
    geology: 'Contact metamorf/sedimentair - grootste bariet deposit ter wereld',
    access: 'Rossignol mijn gesloten (1997), haldes mogelijk',
    tips: 'Beroemd om gele fluoriet en groene pyromorphiet'
  },
  {
    name: 'Le Beix',
    coords: [2.7667, 45.6833],
    country: 'FR',
    region: 'Auvergne (Puy-de-Dôme)',
    minerals: 'Fluoriet (groen/blauw/violet), bariet, galeniet',
    geology: 'Langs Sillon Houiller breukzone',
    access: 'Oude mijngalerijen, check toegankelijkheid',
    tips: 'Prachtige fluoriet kristallen in graniet holtes'
  },
  {
    name: 'Bourg d\'Oisans',
    coords: [6.0333, 45.0500],
    country: 'FR',
    region: 'Isère (Alpen)',
    minerals: 'Bergkristal, rookkwarts, titaniet',
    geology: 'Alpine kloven in gneiss/graniet',
    access: 'Berggebied, diverse oude mijnen',
    tips: 'Beroemd om grote kwarts kristallen'
  },
  {
    name: 'Mont-Blanc Massief',
    coords: [6.8650, 45.8326],
    country: 'FR',
    region: 'Haute-Savoie (Alpen)',
    minerals: 'Bergkristal, fluoriet, titaniet, epidoot',
    geology: 'Alpine kloven in graniet',
    access: 'Hooggebergte, ervaring vereist',
    tips: 'Kristalliers traditie, sommige sites beschermd'
  },

  // === BELGIE ===
  {
    name: 'Carrière de Vielsalm',
    coords: [5.9167, 50.2833],
    country: 'BE',
    region: 'Ardennen (Luxemburg)',
    minerals: 'Coticule (slijpsteen), spessartien granaat, ottreliet',
    geology: 'Stavelot Massief - Paleozoisch metamorf',
    access: 'Haldes bij groeve, toestemming vragen',
    tips: 'Unieke Belgische mineralen, 16e eeuwse traditie'
  },
  {
    name: 'Boom-Rumst',
    coords: [4.3667, 51.0833],
    country: 'BE',
    region: 'Antwerpen',
    minerals: 'Septaria knollen met calciet, pyriet, chalcopyriet',
    geology: 'Boomse klei (Oligoceen)',
    access: 'Kleigroeves, check toegang',
    tips: 'Zoek na regenval in afgegraven klei'
  },
  {
    name: 'Namen-Charleroi regio',
    coords: [4.7500, 50.3500],
    country: 'BE',
    region: 'Wallonië',
    minerals: 'Calciet, pyriet, gips, fluoriet, sideriet',
    geology: 'Carboon kalksteengroeves',
    access: 'Diverse groeves, toestemming nodig',
    tips: 'Veel actieve groeves, weekend toegang soms mogelijk'
  },
  {
    name: 'Bastenaken (Bastogne)',
    coords: [5.7167, 50.0000],
    country: 'BE',
    region: 'Ardennen',
    minerals: 'Zwarte toermalijn (schörl), kwarts',
    geology: 'Pegmatiet gangen in Ardens massief',
    access: 'Verspreid in regio',
    tips: 'Zeldzaam in België, zoek in verweerde pegmatieten'
  },

  // === DUITSLAND ===
  {
    name: 'Grube Clara (Mineralienhalde)',
    coords: [8.2130, 48.2859],
    country: 'DE',
    region: 'Schwarzwald (Wolfach)',
    minerals: '400+ soorten! Fluoriet, bariet, pyriet, azuriet, malachiet',
    geology: 'Hydrothermale aders in gneis - rijkste mijn ter wereld',
    access: 'Mineralienhalde OPEN voor publiek',
    tips: 'Dagelijks nieuw materiaal, succes gegarandeerd!'
  },
  {
    name: 'Edelsteinminen Steinkaulenberg',
    coords: [7.2786, 49.7267],
    country: 'DE',
    region: 'Idar-Oberstein (Hunsrück)',
    minerals: 'Agaat, amethist, bergkristal, jaspis, rookkwarts',
    geology: 'Permische vulkanische lava met gas holtes',
    access: 'Schaubergwerk OPEN (15 maart-15 nov)',
    tips: 'Enige bezoekbare edelsteenmijn in Europa, 400m stollen'
  },
  {
    name: 'Laacher See / Mendig',
    coords: [7.2700, 50.4100],
    country: 'DE',
    region: 'Eifel (Vulkanpark)',
    minerals: 'Hauyn (zeldzaam blauw!), sanidien, leuciet, nosean',
    geology: 'Jonge vulkaan (13.000 jaar), unieke mineralen',
    access: 'Diverse groeves, toestemming vragen',
    tips: 'Belangrijkste hauyn vindplaats ter wereld'
  },
  {
    name: 'Bellerberg / Ettringen',
    coords: [7.2119, 50.3683],
    country: 'DE',
    region: 'Eifel (Mayen)',
    minerals: '238 soorten! Mullit, osumilith, ettringiet, haematiet',
    geology: '200.000 jaar oude vulkaan met xenolieten',
    access: 'Steinbruch Caspar - alleen met begeleiding',
    tips: '19 type-localiteiten, micromounts paradijs'
  },
  {
    name: 'Arensberg',
    coords: [6.8000, 50.3667],
    country: 'DE',
    region: 'Eifel (Zilsdorf)',
    minerals: 'Olivijn, augiet, magnetiet, perowskiet',
    geology: 'Basaltische vulkaan met mantel xenolieten',
    access: 'Check lokale toegang',
    tips: 'Mooie olivijn kristallen in basalt'
  },
  {
    name: 'Fichtelgebirge',
    coords: [11.8500, 50.0500],
    country: 'DE',
    region: 'Beieren',
    minerals: 'Topaas, beryl, fluoriet, wolframiet',
    geology: 'Hercynisch graniet met pegmatieten',
    access: 'Diverse oude mijnen, check toegang',
    tips: 'Historisch mijnbouwgebied sinds middeleeuwen'
  },
  {
    name: 'Harz Gebergte',
    coords: [10.5000, 51.7500],
    country: 'DE',
    region: 'Niedersachsen/Sachsen-Anhalt',
    minerals: 'Galeniet, sfaleriet, calciet, sideriet, pyriet',
    geology: 'Hercynische ertsaders - UNESCO mijnbouw erfgoed',
    access: 'Schaubergwerke open, haldes deels toegankelijk',
    tips: 'Rammelsberg (UNESCO), Clausthal-Zellerfeld mijnen'
  }
]

// Style voor mineraal hotspots
function createHotspotStyle(feature: Feature) {
  const name = feature.get('name') || ''
  const country = feature.get('country') || ''

  // Kleur per land
  const colors: Record<string, { fill: string; stroke: string }> = {
    'FR': { fill: 'rgba(0, 85, 164, 0.8)', stroke: '#002654' },      // Frans blauw
    'BE': { fill: 'rgba(255, 205, 0, 0.8)', stroke: '#000000' },     // Belgisch geel
    'DE': { fill: 'rgba(221, 0, 0, 0.8)', stroke: '#000000' }        // Duits rood
  }

  const color = colors[country] || { fill: 'rgba(128, 0, 128, 0.8)', stroke: '#4B0082' }

  return new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: color.fill }),
      stroke: new Stroke({ color: color.stroke, width: 2 })
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

export async function createMineralenHotspotsLayerOL() {
  const features = MINERAL_HOTSPOTS.map(spot => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(spot.coords))
    })

    feature.setProperties({
      name: spot.name,
      country: spot.country,
      region: spot.region,
      minerals: spot.minerals,
      geology: spot.geology,
      access: spot.access,
      tips: spot.tips,
      layerType: 'mineralenHotspot'
    })

    return feature
  })

  const source = new VectorSource({ features })

  const layer = new VectorLayer({
    source,
    properties: { title: 'Mineralen Hotspots' },
    visible: false,
    zIndex: 25,
    style: createHotspotStyle
  })

  console.log(`✓ Mineralen Hotspots loaded (${features.length} locations: FR/BE/DE)`)
  return layer
}
