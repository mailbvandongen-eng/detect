const COVERAGE_LABELS: Record<string, string> = {
  CS1: 'Zonder vegetatie',
  'CS1.1': 'Door mensen gevormd oppervlak',
  'CS1.1.1': 'Ondoorlatend oppervlak',
  'CS1.1.1.1': 'Bebouwing',
  'CS1.1.1.2': 'Wegen, pleinen of parkeerterrein',
  'CS1.1.2': 'Doorlatend kunstmatig oppervlak',
  'CS1.1.2.1': 'Mineraal materiaal, zoals steen of aarde',
  'CS1.1.2.2': 'Samengesteld materiaal, zoals stort- of opslaggrond',
  'CS1.2': 'Natuurlijk oppervlak zonder vegetatie',
  'CS1.2.1': 'Kale bodem',
  'CS1.2.2': 'Water',
  'CS1.2.3': 'Sneeuw of gletsjer',
  CS2: 'Met vegetatie',
  'CS2.1': 'Houtige vegetatie',
  'CS2.1.1': 'Boomvegetatie',
  'CS2.1.1.1': 'Loofbos',
  'CS2.1.1.2': 'Naaldbos',
  'CS2.1.1.3': 'Gemengd bos',
  'CS2.1.2': 'Struiken en lage houtige begroeiing',
  'CS2.1.3': 'Andere houtige begroeiing',
  'CS2.1.3.1': 'Wijngaard',
  'CS2.1.3.2': 'Andere klimplanten',
  'CS2.2': 'Niet-houtige vegetatie',
  'CS2.2.1': 'Kruidachtige vegetatie',
  'CS2.2.1.1': 'Weide of grasland',
  'CS2.2.1.2': 'Gazon of korte grasvegetatie',
  'CS2.2.1.4': 'Akkerland',
  'CS2.2.1.5': 'Andere kruidachtige vegetatie',
  'CS2.2.2': 'Andere niet-houtige vegetatie'
}

const USAGE_LABELS: Record<string, string> = {
  US1: 'Primaire productie',
  'US1.1': 'Landbouw',
  'US1.2': 'Bosbouw',
  'US1.3': 'Winning of groeve',
  'US1.4': 'Visserij of aquacultuur',
  'US1.5': 'Andere primaire productie',
  US2: 'Industrie en productie',
  US3: 'Diensten en bedrijven',
  US235: 'Gemengd industrie-, diensten- of woongebruik',
  US4: 'Transport, logistiek of nutsvoorziening',
  'US4.1': 'Transportnetwerk',
  'US4.1.1': 'Wegverkeer',
  'US4.1.2': 'Spoorverkeer',
  'US4.1.3': 'Luchtvaart',
  'US4.1.4': 'Scheepvaart',
  'US4.1.5': 'Ander transportnetwerk',
  'US4.2': 'Logistiek of opslag',
  'US4.3': 'Nutsvoorziening',
  US5: 'Wonen',
  US6: 'Ander gebruik',
  'US6.1': 'Terrein in verandering of bouwplaats',
  'US6.2': 'Verlaten terrein',
  'US6.3': 'Geen gebruik',
  'US6.6': 'Gebruik onbekend'
}

function describeCode(value: unknown, labels: Record<string, string>): string {
  const code = String(value ?? '').trim().toUpperCase()
  if (!code) return 'Niet opgegeven'
  if (labels[code]) return labels[code]

  const parts = code.split('.')
  while (parts.length > 1) {
    parts.pop()
    const parent = parts.join('.')
    if (labels[parent]) return `${labels[parent]} — detailcode ${code}`
  }

  return `Onbekende broncode ${code}`
}

export function describeOcsCoverage(value: unknown): string {
  return describeCode(value, COVERAGE_LABELS)
}

export function describeOcsUsage(value: unknown): string {
  return describeCode(value, USAGE_LABELS)
}

export function formatOcsArea(value: unknown): string {
  const squareMetres = Number(value)
  if (!Number.isFinite(squareMetres) || squareMetres <= 0) return ''
  const hectares = squareMetres / 10_000
  return `${hectares.toLocaleString('nl-NL', { maximumFractionDigits: hectares < 10 ? 2 : 1 })} ha`
}

export function describeOcsArtificialisation(value: unknown): string {
  const normalized = String(value ?? '').trim().toLowerCase()
  if (!normalized) return ''
  if (normalized === 'non artif' || normalized === 'non artificialisé') return 'Niet als kunstmatig oppervlak aangemerkt'
  if (normalized === 'artif' || normalized === 'artificialisé') return 'Als kunstmatig oppervlak aangemerkt'
  return String(value)
}
