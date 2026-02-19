import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Stroke, Circle, Fill, Text } from 'ol/style'

// Route metadata - matched to GPX filenames
interface RouteInfo {
  file: string           // GPX filename (without .gpx)
  name: string           // Display name
  country: 'NL' | 'BE'
  region: string
  distance: number       // km
  duration: string
  startAddress: string
  description: string
  url: string
}

const ROUTES: RouteInfo[] = [
  // Nederland
  {
    file: 'sint-pietersberg',
    name: 'Sint-Pietersberg',
    country: 'NL',
    region: 'Limburg',
    distance: 10.8,
    duration: '2 uur',
    startAddress: 'Luikerweg 71, Maastricht',
    description: 'Grensoverschrijdend natuurgebied met Fort Sint-Pieter, Duivelsgrot en uitkijkpunt de Ster.',
    url: 'https://www.routezoeker.com/wandelroutes/wandelroute-sint-pietersberg-lang'
  },
  {
    file: 'utrechtse-heuvelrug',
    name: 'Utrechtse Heuvelrug',
    country: 'NL',
    region: 'Utrecht',
    distance: 15,
    duration: '3 uur',
    startAddress: 'Station Driebergen-Zeist',
    description: 'Door afwisselende natuurgebieden: bossen, heide en het dorpje Austerlitz met de bekende piramide.',
    url: 'https://www.routezoeker.com/wandelroutes/ns-utrechtse-heuvelrug'
  },
  {
    file: 'duinreservaat',
    name: 'Noord-Hollands Duinreservaat',
    country: 'NL',
    region: 'Noord-Holland',
    distance: 15,
    duration: '3 uur',
    startAddress: 'Station Castricum',
    description: 'Door bossen, open velden en duinen naar het strand van Egmond aan Zee.',
    url: 'https://www.routezoeker.com/wandelroutes/ns-duinreservaat-noord-holland'
  },
  {
    file: 'kennemerduinen',
    name: 'Kennemerduinen',
    country: 'NL',
    region: 'Noord-Holland',
    distance: 16,
    duration: '3,5 uur',
    startAddress: 'Station Santpoort-Noord',
    description: 'Door landgoederen Duin- en Kruidberg naar de kust. Keuze tussen strand of duinen.',
    url: 'https://www.routezoeker.com/wandelroutes/ns-kennemerduinen'
  },
  {
    file: 'zoutelande',
    name: 'Duinwandeling Zoutelande',
    country: 'NL',
    region: 'Zeeland',
    distance: 5.8,
    duration: '1,5 uur',
    startAddress: 'Molemweg, Zoutelande',
    description: 'Door de hoogste duinen van Nederland met WOII-bunkers in het bos.',
    url: 'https://www.routezoeker.com/wandelroutes/duinwandeling-zoutelande'
  },
  {
    file: 'renesse',
    name: 'Duinen van Renesse',
    country: 'NL',
    region: 'Zeeland',
    distance: 12.2,
    duration: '3 uur',
    startAddress: 'Roelandsweg 11, Renesse',
    description: 'Gevarieerd duinlandschap met oude en jonge duinen, natte valleien en historische akkertjes.',
    url: 'https://www.routezoeker.com/wandelroutes/door-de-duinen-van-renesse'
  },
  {
    file: 'schiedam',
    name: 'Schiedam Jeneverstad',
    country: 'NL',
    region: 'Zuid-Holland',
    distance: 19,
    duration: '4 uur',
    startAddress: 'Station Delft Campus',
    description: 'Van Delft naar Rotterdam langs de Schie, door parken en weiden naar de historische molens van Schiedam.',
    url: 'https://www.routezoeker.com/wandelroutes/schiedam-jeneverstad'
  },
  // Belgie
  {
    file: 'vloethemveld',
    name: 'Vloethemveld',
    country: 'BE',
    region: 'West-Vlaanderen',
    distance: 8.7,
    duration: '2 uur',
    startAddress: 'Knooppunt 25, Diksmuidse Heirweg, Zedelgem',
    description: 'Voormalig militair domein, nu natuurgebied met heide en bos.',
    url: 'https://www.routezoeker.com/wandelroutes/t-beste-van-vloethemveld'
  }
]

// Kleuren per land
const ROUTE_COLORS: Record<string, string> = {
  NL: '#22c55e',  // Groen
  BE: '#f97316'   // Oranje
}

// Parse GPX XML and extract track coordinates
function parseGPX(gpxText: string): [number, number][] {
  const coords: [number, number][] = []
  const parser = new DOMParser()
  const doc = parser.parseFromString(gpxText, 'text/xml')

  // Get all trackpoints
  const trkpts = doc.querySelectorAll('trkpt')
  trkpts.forEach(trkpt => {
    const lat = parseFloat(trkpt.getAttribute('lat') || '0')
    const lon = parseFloat(trkpt.getAttribute('lon') || '0')
    if (lat && lon) {
      coords.push([lon, lat])
    }
  })

  return coords
}

// Create style for route line
function createRouteStyle(feature: Feature, isHighlight = false): Style[] {
  const country = feature.get('country') || 'NL'
  const color = ROUTE_COLORS[country] || ROUTE_COLORS.NL
  const name = feature.get('name') || ''

  const styles: Style[] = []

  // Route line - thicker when highlighted
  styles.push(new Style({
    stroke: new Stroke({
      color: isHighlight ? color : color,
      width: isHighlight ? 5 : 3,
      lineCap: 'round',
      lineJoin: 'round'
    })
  }))

  // White outline for contrast
  styles.unshift(new Style({
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.8)',
      width: isHighlight ? 8 : 5,
      lineCap: 'round',
      lineJoin: 'round'
    })
  }))

  return styles
}

// Create style for start point marker
function createStartPointStyle(feature: Feature): Style {
  const country = feature.get('country') || 'NL'
  const color = ROUTE_COLORS[country] || ROUTE_COLORS.NL
  const name = feature.get('name') || ''

  return new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({ color: color }),
      stroke: new Stroke({ color: '#ffffff', width: 2 })
    }),
    text: new Text({
      text: name,
      offsetY: -16,
      font: 'bold 11px sans-serif',
      fill: new Fill({ color: '#1a1a1a' }),
      stroke: new Stroke({ color: '#ffffff', width: 3 }),
      textAlign: 'center'
    })
  })
}

export async function createWandelroutesLayer(): Promise<VectorLayer<VectorSource>> {
  const features: Feature[] = []

  // Load all GPX files
  for (const route of ROUTES) {
    try {
      const response = await fetch(`/detect/data/wandelroutes/${route.file}.gpx`)
      if (!response.ok) continue

      const gpxText = await response.text()
      const coords = parseGPX(gpxText)

      if (coords.length < 2) continue

      // Create line feature for the route
      const lineCoords = coords.map(c => fromLonLat(c))
      const lineFeature = new Feature({
        geometry: new LineString(lineCoords),
        name: route.name,
        country: route.country,
        region: route.region,
        distance: route.distance,
        duration: route.duration,
        startAddress: route.startAddress,
        description: route.description,
        url: route.url,
        layerType: 'wandelroute',
        featureType: 'route'
      })
      features.push(lineFeature)

      // Create start point marker
      const startPoint = new Feature({
        geometry: new Point(fromLonLat(coords[0])),
        name: route.name,
        country: route.country,
        region: route.region,
        distance: route.distance,
        duration: route.duration,
        startAddress: route.startAddress,
        description: route.description,
        url: route.url,
        layerType: 'wandelroute',
        featureType: 'startpoint'
      })
      features.push(startPoint)

    } catch (err) {
      console.warn(`Failed to load GPX: ${route.file}`, err)
    }
  }

  const source = new VectorSource({ features })

  return new VectorLayer({
    source,
    style: (feature) => {
      const featureType = feature.get('featureType')
      if (featureType === 'startpoint') {
        return createStartPointStyle(feature as Feature)
      }
      return createRouteStyle(feature as Feature)
    },
    zIndex: 850,
    properties: {
      name: 'Wandelroutes',
      layerType: 'wandelroute'
    }
  })
}
