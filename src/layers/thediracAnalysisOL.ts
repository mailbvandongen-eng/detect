export const THEDIRAC_RESEARCH_BBOX = [1.12, 44.45, 1.57, 44.81] as const

export const THEDIRAC_RESEARCH_COMMUNES = [
  'Thédirac',
  'Catus',
  'Montgesty',
  'Lavercantière',
  'Peyrilles',
  'Uzech',
  'Gindou',
  'Cazals',
  'Salviac',
  'Léobard',
  'Gourdon',
  'Payrignac',
  'Fajoles',
  'Saint-Cirq-Madelon',
  'Ginouillac',
  'Soucirac',
  'Saint-Projet',
  'Cras',
  'Luzech',
  'Vers',
  'Prayssac',
  'Frayssinet-le-Gélat'
] as const

const ARCHEOCC_EXPORT = 'https://data.laregion.fr/api/explore/v2.1/catalog/datasets/base_archeocc_opendata/exports/geojson'

let archeOccPromise: Promise<Record<string, unknown>> | null = null

function buildArcheOccUrl(): string {
  const url = new URL(ARCHEOCC_EXPORT)
  const communeList = THEDIRAC_RESEARCH_COMMUNES.map(name => `"${name}"`).join(', ')
  url.searchParams.set('where', `commune IN (${communeList})`)
  url.searchParams.set('lang', 'fr')
  url.searchParams.set('timezone', 'Europe/Paris')
  return url.toString()
}

export function getThediracArcheOccUrl(): string {
  return buildArcheOccUrl()
}

export async function fetchThediracArcheOccGeoJson(): Promise<Record<string, unknown>> {
  if (!archeOccPromise) {
    archeOccPromise = (async () => {
      const response = await fetch(buildArcheOccUrl())
      if (!response.ok) throw new Error(`ArcheOcc ${response.status}`)
      return await response.json() as Record<string, unknown>
    })()
  }

  return archeOccPromise
}
