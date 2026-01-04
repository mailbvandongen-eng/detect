import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke, Text } from 'ol/style'

// Fossiel hotspots - populaire zoeklocaties voor fossielen in Nederland
// Bronnen: Paleontica.org, Oervondstchecker.nl, algemene kennis
const FOSSIL_HOTSPOTS = [
  {
    name: 'Cadzand-Bad',
    coords: [3.4042, 51.3750],
    type: 'strand',
    finds: 'Haaientanden, roggentanden, schelpen',
    period: 'Mioceen - Plioceen (5-20 miljoen jaar)',
    tips: 'Zoek bij vloedlijn in schelpengruis. Beste na storm.',
    region: 'Zeeuws-Vlaanderen'
  },
  {
    name: 'Zwarte Polder (Nieuwvliet)',
    coords: [3.4500, 51.3900],
    type: 'strand',
    finds: 'Haaientanden (klein), vissentanden, roggenstekels',
    period: 'Mioceen - Plioceen',
    tips: 'Beste plek voor kleine fossielen. Bij radartoren.',
    region: 'Zeeuws-Vlaanderen'
  },
  {
    name: 'Het Zwin',
    coords: [3.3600, 51.3650],
    type: 'strand',
    finds: 'Oudere haaientanden, schelpen',
    period: 'Eoceen - Oligoceen (34-56 miljoen jaar)',
    tips: 'Natuurreservaat, makkelijk toegankelijk. Oudere fossielen dan Cadzand.',
    region: 'Zeeuws-Vlaanderen'
  },
  {
    name: 'Maasvlakte strand',
    coords: [4.0333, 51.9600],
    type: 'strand',
    finds: 'Mammoet, neushoorn, hert, soms Neanderthaler werktuigen',
    period: 'Pleistoceen (10.000-2,5 miljoen jaar)',
    tips: 'Opgespoten zand uit Noordzee. Zoek na storm tussen schelpenbanken.',
    region: 'Zuid-Holland'
  },
  {
    name: 'Zandmotor',
    coords: [4.1833, 52.0500],
    type: 'strand',
    finds: 'Mammoet, reuzenhert, witte haai tanden',
    period: 'Pleistoceen',
    tips: 'Kunstmatig schiereiland. Zand bevat Noordzee-fossielen.',
    region: 'Zuid-Holland'
  },
  {
    name: 'Hoge Platen (Westerschelde)',
    coords: [3.5500, 51.4000],
    type: 'zandplaat',
    finds: 'Zelfde als Cadzand, maar minder concurrentie',
    period: 'Mioceen - Plioceen',
    tips: 'Alleen per boot (De Festijn vanuit Breskens). Zomer.',
    region: 'Zeeland'
  },
  {
    name: 'Vrouwenpolder',
    coords: [3.5833, 51.5833],
    type: 'strand',
    finds: 'Haaientanden, schelpen, soms bewerkt vuursteen',
    period: 'Diverse periodes',
    tips: 'Strand aan Oosterschelde-zijde.',
    region: 'Zeeland'
  },
  {
    name: 'Brouwersdam',
    coords: [3.8667, 51.7500],
    type: 'dam',
    finds: 'Schelpen, soms fossielen in opgebaggerd zand',
    period: 'Diverse periodes',
    tips: 'Zeezijde van de dam, vooral na zandsuppletie.',
    region: 'Zuid-Holland'
  },
  {
    name: 'Borssele strand',
    coords: [3.7167, 51.4167],
    type: 'strand',
    finds: 'Haaientanden, schelpen uit Westerschelde',
    period: 'Mioceen - Plioceen',
    tips: 'Minder bekend dan Cadzand, rustiger.',
    region: 'Zeeland'
  },
  {
    name: 'Walcheren (diverse stranden)',
    coords: [3.5000, 51.5000],
    type: 'strand',
    finds: 'Haaientanden, schelpen, bewerkt vuursteen',
    period: 'Diverse periodes',
    tips: 'Hele westkust van Walcheren, variabele vondsten.',
    region: 'Zeeland'
  }
]

// Style voor fossiel hotspots
function createHotspotStyle(feature: Feature) {
  const name = feature.get('name') || ''

  return new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: 'rgba(139, 69, 19, 0.8)' }), // Bruin/amber
      stroke: new Stroke({ color: '#5D4037', width: 2 })
    }),
    text: new Text({
      text: name,
      font: 'bold 11px sans-serif',
      offsetY: -18,
      fill: new Fill({ color: '#3E2723' }),
      stroke: new Stroke({ color: 'white', width: 3 }),
      textAlign: 'center'
    })
  })
}

export async function createFossielHotspotsLayerOL() {
  const features = FOSSIL_HOTSPOTS.map(spot => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(spot.coords))
    })

    feature.setProperties({
      name: spot.name,
      type: spot.type,
      finds: spot.finds,
      period: spot.period,
      tips: spot.tips,
      region: spot.region,
      layerType: 'fossielHotspot'
    })

    return feature
  })

  const source = new VectorSource({ features })

  const layer = new VectorLayer({
    source,
    properties: { title: 'Fossiel Hotspots' },
    visible: false,
    zIndex: 25,
    style: createHotspotStyle
  })

  console.log(`✓ Fossiel Hotspots loaded (${features.length} locations)`)
  return layer
}
