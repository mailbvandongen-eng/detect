import type { CustomFeature } from '../store/customLayerStore'
import { useCustomLayerStore } from '../store/customLayerStore'
import { THEDIRAC_RESEARCH_SITES, researchSiteProperties } from '../data/thediracResearchSites'
import { THEDIRAC_SIGHTS } from '../data/thediracSights'
import { THEDIRAC_MINERAL_SITES, THEDIRAC_FOSSIL_SITES } from '../data/thediracGeologySites'
import { THEDIRAC_HIKES } from '../data/thediracHikes'

const SEED_VERSION = 'france-2026-curated-v1'
const TARGET_LAYER_NAMES = [
  'Frankrijk 2026',
  'Vakantie Frankrijk 2026',
  'Frankrijk · Thédirac',
  'Thédirac',
  'Thedirac',
]

function pointFeature(
  seedId: string,
  lon: number,
  lat: number,
  properties: Record<string, unknown>,
): CustomFeature {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lon, lat],
    },
    properties: {
      ...properties,
      detectSeed: SEED_VERSION,
      detectSeedId: seedId,
    },
  }
}

export function buildFrance2026SeedFeatures(): CustomFeature[] {
  const archaeology = THEDIRAC_RESEARCH_SITES.map(site => pointFeature(
    `archeologie:${site.id}`,
    site.lon,
    site.lat,
    researchSiteProperties(site),
  ))

  const sights = THEDIRAC_SIGHTS.map(site => pointFeature(
    `bezienswaardigheid:${site.id}`,
    site.lon,
    site.lat,
    {
      naam: site.name,
      categorie: 'Bezienswaardigheid',
      type: site.category,
      omschrijving: site.descriptionNl,
      bezoek: site.visitNl,
      waarom: site.whyWorthItNl,
      rijtijd: `${site.driveMinutes} min`,
      afstand: `${site.driveKm} km`,
      marker: site.markerType,
      bron: site.source,
      link: site.sourceUrl,
    },
  ))

  const minerals = THEDIRAC_MINERAL_SITES.map(site => pointFeature(
    `mineraal:${site.id}`,
    site.lon,
    site.lat,
    {
      naam: site.name,
      categorie: 'Mineraal / geologie',
      materiaal: site.materialOrAge,
      bewijs: site.evidenceNl,
      terrein: site.terrainNl,
      oppervlak: site.surfaceNl,
      toegang: site.accessNl,
      verzamelen: site.collectingNl,
      bescherming: site.protectionNl,
      rijtijd: `${site.driveMinutes} min`,
      afstand: `${site.driveKm} km`,
      bron: site.sourceUrl || site.officialUrl,
      link: site.officialUrl || site.sourceUrl,
    },
  ))

  const fossils = THEDIRAC_FOSSIL_SITES.map(site => pointFeature(
    `fossiel:${site.id}`,
    site.lon,
    site.lat,
    {
      naam: site.name,
      categorie: 'Fossiel',
      materiaal: site.materialOrAge,
      bewijs: site.evidenceNl,
      terrein: site.terrainNl,
      oppervlak: site.surfaceNl,
      toegang: site.accessNl,
      verzamelen: site.collectingNl,
      bescherming: site.protectionNl,
      rijtijd: `${site.driveMinutes} min`,
      afstand: `${site.driveKm} km`,
      bron: site.sourceUrl || site.officialUrl,
      link: site.officialUrl || site.sourceUrl,
    },
  ))

  const hikes = THEDIRAC_HIKES.map(hike => pointFeature(
    `wandeling:${hike.id}`,
    hike.startLon,
    hike.startLat,
    {
      naam: hike.name,
      categorie: 'Wandeling',
      afstand: hike.distance,
      duur: hike.duration,
      stijgen: hike.ascent,
      moeilijkheid: hike.difficulty,
      highlights: hike.highlights,
      natuur: hike.natureWildlife,
      knieën: hike.kneeTerrain,
      omstandigheden: hike.conditions,
      bron: hike.source,
      link: hike.officialPage,
      gpx: hike.officialGpx,
    },
  ))

  return [...archaeology, ...sights, ...minerals, ...fossils, ...hikes]
}

function seedMarkerKey(layerId: string): string {
  return `detect:${SEED_VERSION}:${layerId}`
}

export function seedFrance2026LayerIfPresent(): number {
  const state = useCustomLayerStore.getState()
  const layer = TARGET_LAYER_NAMES
    .map(name => state.layers.find(candidate => candidate.name.trim().toLowerCase() === name.toLowerCase()))
    .find(Boolean)

  if (!layer || layer.sharePermission === 'read') return 0

  const markerKey = seedMarkerKey(layer.id)
  if (typeof localStorage !== 'undefined' && localStorage.getItem(markerKey) === 'done') return 0

  const seedFeatures = buildFrance2026SeedFeatures()
  const existingSeedIds = new Set(
    layer.features.features
      .map(feature => feature.properties?.detectSeedId)
      .filter((value): value is string => typeof value === 'string')
  )
  const missing = seedFeatures.filter(feature => !existingSeedIds.has(String(feature.properties.detectSeedId)))

  if (missing.length > 0) {
    state.updateLayer(layer.id, {
      features: {
        ...layer.features,
        features: [...layer.features.features, ...missing],
      },
      visible: true,
      popupConfig: {
        ...layer.popupConfig,
        titleField: 'naam',
        hiddenFields: Array.from(new Set([
          ...layer.popupConfig.hiddenFields,
          'detectSeed',
          'detectSeedId',
        ])),
      },
    })
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(markerKey, 'done')
  }

  return missing.length
}
