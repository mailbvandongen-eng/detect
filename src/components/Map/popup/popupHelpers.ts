import { toLonLat } from 'ol/proj'
import proj4 from 'proj4'

proj4.defs('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs')

// Translate opening hours from English to Dutch
export function translateOpeningHours(hours: string): string {
  if (!hours) return hours

  // Day abbreviations: English to Dutch
  const dayMap: Record<string, string> = {
    'Mo': 'ma', 'Tu': 'di', 'We': 'wo', 'Th': 'do',
    'Fr': 'vr', 'Sa': 'za', 'Su': 'zo',
    'Mon': 'ma', 'Tue': 'di', 'Wed': 'wo', 'Thu': 'do',
    'Fri': 'vr', 'Sat': 'za', 'Sun': 'zo',
    'PH': 'feestdagen', 'SH': 'schoolvakantie'
  }

  let result = hours
  // Replace day abbreviations (case-insensitive, whole word)
  Object.entries(dayMap).forEach(([en, nl]) => {
    result = result.replace(new RegExp(`\\b${en}\\b`, 'gi'), nl)
  })

  // Replace common words
  result = result
    .replace(/\boff\b/gi, 'gesloten')
    .replace(/\bclosed\b/gi, 'gesloten')
    .replace(/\bopen\b/gi, 'open')

  return result
}

export const POPUP_REQUEST_TIMEOUT_MS = 5000
export const MOBILE_HIT_TOLERANCE_PX = 10

export function escapePopupHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function getPhoneHref(phone: string): string {
  return phone.replace(/[^+\d]/g, '')
}

export function getSafeExternalHref(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const candidate = /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    const url = new URL(candidate)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = POPUP_REQUEST_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    window.clearTimeout(timeoutId)
  }
}

// AHN hoogte query - direct via WMS GetFeatureInfo
export async function queryAHNHeight(coordinate: number[]): Promise<number | null> {
  try {
    const lonLat = toLonLat(coordinate)
    const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)

    // Check if within Netherlands bounds
    if (rd[0] < 7000 || rd[0] > 300000 || rd[1] < 289000 || rd[1] > 629000) {
      return null
    }

    const buffer = 1 // 1m buffer
    const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

    const url = `https://service.pdok.nl/rws/ahn/wms/v1_0?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=dtm_05m&QUERY_LAYERS=dtm_05m&INFO_FORMAT=application/json&CRS=EPSG:28992&BBOX=${bbox}&WIDTH=1&HEIGHT=1&I=0&J=0`

    const response = await fetchWithTimeout(url)
    const data = await response.json()

    if (data.features && data.features.length > 0) {
      // AHN returns value_list as elevation in meters NAP (can be string or number)
      const props = data.features[0].properties
      const heightRaw = props?.value_list ?? props?.GRAY_INDEX ?? props?.value ?? props?.gray_index
      if (heightRaw !== undefined && heightRaw !== null) {
        const height = typeof heightRaw === 'number' ? heightRaw : parseFloat(heightRaw)
        if (!isNaN(height)) {
          return height
        }
      }
    }
  } catch (error) {
    console.warn('AHN height query failed:', error)
  }
  return null
}

// Kadastrale gemeente codes naar namen (meest voorkomende)
export const KADASTRALE_GEMEENTEN: Record<string, string> = {
  'ABG': 'Alphen-Chaam', 'ACM': 'Alkmaar', 'ALF': 'Alfen', 'ALK': 'Alkemade',
  'AML': 'Ameland', 'AMR': 'Amerongen', 'AMS': 'Amsterdam', 'ANL': 'Anloo',
  'APD': 'Apeldoorn', 'ARN': 'Arnhem', 'ASN': 'Assen', 'AVW': 'Avenhorn',
  'BDA': 'Breda', 'BLK': 'Blokker', 'BRN': 'Barneveld', 'DEL': 'Delft',
  'DHG': 'Den Haag', 'DRD': 'Dordrecht', 'EHV': 'Eindhoven', 'EMN': 'Emmen',
  'EPE': 'Epe', 'GNP': 'Gennep', 'GRN': 'Groningen', 'GRV': 'Grave',
  'GTB': 'Giethoorn', 'HDK': 'Harderwijk', 'HLM': 'Haarlem', 'HLN': 'Heiloo',
  'HRL': 'Harlingen', 'HTN': 'Houten', 'LDN': 'Leiden', 'LWR': 'Leeuwarden',
  'MST': 'Maastricht', 'NKK': 'Nijkerk', 'NMG': 'Nijmegen', 'OTM': 'Ootmarsum',
  'RTD': 'Rotterdam', 'SND': 'Sneek', 'TBG': 'Tilburg', 'UTR': 'Utrecht',
  'VLO': 'Venlo', 'WGN': 'Wageningen', 'ZWL': 'Zwolle', 'ZTP': 'Zutphen',
  // Numerieke codes (kadastrale gemeentecodes)
  '444': 'Houten', '811': 'Gouda', '310': 'Utrecht', '344': 'Amsterdam',
  '363': 'Rotterdam', '518': 'Den Haag', '758': 'Eindhoven', '772': 'Tilburg',
  '855': 'Breda', '85': 'Arnhem', '268': 'Nijmegen', '14': 'Groningen',
  '80': 'Leeuwarden', '995': 'Maastricht', '106': 'Enschede', '153': 'Zwolle',
  '34': 'Almere',
}

// IKAW trefkans waarden
export const IKAW_VALUES: Record<number, string> = {
  1: 'Zeer lage trefkans op archeologische resten',
  2: 'Lage trefkans op archeologische resten',
  3: 'Middelhoge trefkans op archeologische resten',
  4: 'Hoge trefkans op archeologische resten',
  5: 'Lage trefkans (water)',
  6: 'Middelhoge trefkans (water)',
  7: 'Hoge trefkans (water)',
  8: 'Water',
  9: 'Niet gekarteerd'
}

// Bodem uitleg - praktische info voor detectoristen
export function getSoilExplanation(soilName: string, soilCode?: string): string[] {
  const tips: string[] = []
  const nameLower = soilName.toLowerCase()
  const codeLower = (soilCode || '').toLowerCase()

  // Kalk check - belangrijk voor conservering
  if (nameLower.includes('kalkhoudend') || codeLower.endsWith('a')) {
    tips.push('Kalkhoudend = goede metaalconservering')
  } else if (nameLower.includes('kalkarm') || nameLower.includes('kalkloos')) {
    tips.push('Kalkarm = meer corrosie op metalen')
  }

  // Grondsoort - wat betekent het voor graven/conservering
  if (nameLower.includes('poldervaag')) {
    tips.push('Poldervaaggrond = jonge rivierklei, ingepolderd gebied')
  } else if (nameLower.includes('enkeerdgrond') || nameLower.includes('enk')) {
    tips.push('Enkeerdgrond = oude akkers met plaggenbemesting - archeologisch interessant!')
  } else if (nameLower.includes('podzol')) {
    tips.push('Podzolgrond = uitgeloogde zandgrond, vaak zuur')
  } else if (nameLower.includes('veengrond') || nameLower.includes('veen')) {
    tips.push('Veengrond = zuur, slechte metaalconservering (tenzij waterverzadigd)')
  }

  // Textuur - graven
  if (nameLower.includes('zware klei')) {
    tips.push('Zware klei = moeilijk graven, goede conservering')
  } else if (nameLower.includes('lichte klei') || nameLower.includes('zavel')) {
    tips.push('Zavel/lichte klei = redelijk te graven')
  } else if (nameLower.includes('zand') && !nameLower.includes('zavel')) {
    tips.push('Zandgrond = makkelijk graven')
  }

  // Rivier vs zee
  if (nameLower.includes('rivierklei') || codeLower.startsWith('r')) {
    tips.push('Rivierafzetting')
  } else if (nameLower.includes('zeeklei') || codeLower.startsWith('m')) {
    tips.push('Zeekleiafzetting')
  }

  return tips
}
