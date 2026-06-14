import type { LayerDefinition } from './shared'

export const internationalLayerRegistry: Record<string, LayerDefinition> = {
  'Fossielen België': {
    name: 'Fossielen België',
    factory: async () => {
      const { createFossielenBelgieLayerOL } = await import('../fossielenBelgieOL')
      return createFossielenBelgieLayerOL()
    },
    immediateLoad: false,
    tier: 'premium',
    regions: ['be']
  },
  'Fossielen Duitsland': {
    name: 'Fossielen Duitsland',
    factory: async () => {
      const { createFossielenDuitslandLayerOL } = await import('../fossielenDuitslandOL')
      return createFossielenDuitslandLayerOL()
    },
    immediateLoad: false,
    tier: 'premium',
    regions: ['de']
  },
  'Fossielen Frankrijk': {
    name: 'Fossielen Frankrijk',
    factory: async () => {
      const { createFossielenFrankrijkLayerOL } = await import('../fossielenFrankrijkOL')
      return createFossielenFrankrijkLayerOL()
    },
    immediateLoad: false,
    tier: 'premium',
    regions: ['fr']
  },
  'Fossiel Hotspots': {
    name: 'Fossiel Hotspots',
    factory: async () => {
      const { createFossielHotspotsLayerOL } = await import('../fossielHotspotsOL')
      return createFossielHotspotsLayerOL()
    },
    immediateLoad: false,
    tier: 'premium',
    regions: ['nl', 'be', 'de', 'fr']
  },
  'Mineralen Hotspots': {
    name: 'Mineralen Hotspots',
    factory: async () => {
      const { createMineralenHotspotsLayerOL } = await import('../mineralenHotspotsOL')
      return createMineralenHotspotsLayerOL()
    },
    immediateLoad: false,
    tier: 'premium',
    regions: ['nl', 'be', 'de', 'fr']
  },
  'Goudrivieren': {
    name: 'Goudrivieren',
    factory: async () => {
      const { createGoudrivierenLayerOL } = await import('../goudrivierenOL')
      return createGoudrivierenLayerOL()
    },
    immediateLoad: false,
    tier: 'premium',
    regions: ['nl', 'be', 'de', 'fr']
  },
  'Monumenten BE': {
    name: 'Monumenten BE',
    factory: async () => {
      const { createBeschermdeMonumentenBELayerOL } = await import('../belgieErfgoedLayers')
      return createBeschermdeMonumentenBELayerOL()
    },
    immediateLoad: false,
    regions: ['be']
  },
  'Archeo Zones BE': {
    name: 'Archeo Zones BE',
    factory: async () => {
      const { createArcheoZonesBELayerOL } = await import('../belgieErfgoedLayers')
      return createArcheoZonesBELayerOL()
    },
    immediateLoad: false,
    regions: ['be']
  },
  'Arch Sites BE': {
    name: 'Arch Sites BE',
    factory: async () => {
      const { createBeschArchSitesBELayerOL } = await import('../belgieErfgoedLayers')
      return createBeschArchSitesBELayerOL()
    },
    immediateLoad: false,
    regions: ['be']
  },
  'Erfgoed Landschap BE': {
    name: 'Erfgoed Landschap BE',
    factory: async () => {
      const { createErfgoedLandschappenBELayerOL } = await import('../belgieErfgoedLayers')
      return createErfgoedLandschappenBELayerOL()
    },
    immediateLoad: false,
    regions: ['be']
  },
  'CAI Elementen': {
    name: 'CAI Elementen',
    factory: async () => {
      const { createCAIElementenBELayerOL } = await import('../belgieErfgoedLayers')
      return createCAIElementenBELayerOL()
    },
    immediateLoad: false,
    regions: ['be']
  },
  'Hist. Gebouwen FR': {
    name: 'Hist. Gebouwen FR',
    factory: async () => {
      const { createFrankrijkMonumentenLayerOL } = await import('../frankrijkMonumentenOL')
      return createFrankrijkMonumentenLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'INRAP Sites FR': {
    name: 'INRAP Sites FR',
    factory: async () => {
      const { createInrapSitesFRLayerOL } = await import('../inrapSitesFROL')
      return createInrapSitesFRLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Archeo Sites Bretagne': {
    name: 'Archeo Sites Bretagne',
    factory: async () => {
      const { createArcheoBretagneLayerOL } = await import('../archeoBretagneOL')
      return createArcheoBretagneLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Operaties Bretagne': {
    name: 'Operaties Bretagne',
    factory: async () => {
      const { createBretagneOperationsLayerOL } = await import('../bretagneOperationsOL')
      return createBretagneOperationsLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Archeo Parijs': {
    name: 'Archeo Parijs',
    factory: async () => {
      const { createParisArcheoLayerOL } = await import('../parisArcheoOL')
      return createParisArcheoLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Patrimoine Occitanie': {
    name: 'Sites Patrimoine Occitanie',
    factory: async () => {
      const { createOccitaniePatrimoineLayerOL } = await import('../occitaniePatrimoineOL')
      return createOccitaniePatrimoineLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Patrimoine PACA': {
    name: 'Sites Patrimoine PACA',
    factory: async () => {
      const { createPacaPatrimoineLayerOL } = await import('../pacaPatrimoineOL')
      return createPacaPatrimoineLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Patrimoine Normandie': {
    name: 'Sites Patrimoine Normandie',
    factory: async () => {
      const { createNormandiePatrimoineLayerOL } = await import('../normandiePatrimoineOL')
      return createNormandiePatrimoineLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Maginotlinie': {
    name: 'Maginotlinie',
    factory: async () => {
      const { createWikimaginotLayerOL } = await import('../wikimaginotOL')
      return createWikimaginotLayerOL()
    },
    immediateLoad: false,
    regions: ['fr', 'de']
  },
  'Sites Classés Bretagne': {
    name: 'Sites Classés Bretagne',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Bretagne')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Normandie': {
    name: 'Sites Classés Normandie',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Normandie')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Hauts-de-France': {
    name: 'Sites Classés Hauts-de-France',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Hauts-de-France')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Grand Est': {
    name: 'Sites Classés Grand Est',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Grand Est')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Île-de-France': {
    name: 'Sites Classés Île-de-France',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Île-de-France')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Centre-Val de Loire': {
    name: 'Sites Classés Centre-Val de Loire',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Centre-Val de Loire')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Bourgogne-FC': {
    name: 'Sites Classés Bourgogne-FC',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Bourgogne-FC')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Pays de la Loire': {
    name: 'Sites Classés Pays de la Loire',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Pays de la Loire')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Nouvelle-Aquitaine': {
    name: 'Sites Classés Nouvelle-Aquitaine',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Nouvelle-Aquitaine')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Auvergne-RA': {
    name: 'Sites Classés Auvergne-RA',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Auvergne-RA')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Occitanie': {
    name: 'Sites Classés Occitanie',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Occitanie')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés PACA': {
    name: 'Sites Classés PACA',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés PACA')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Sites Classés Corse': {
    name: 'Sites Classés Corse',
    factory: async () => {
      const { createSitesClassesRegionLayerOL } = await import('../sitesClassesRegionOL')
      return createSitesClassesRegionLayerOL('Sites Classés Corse')
    },
    immediateLoad: false,
    regions: ['fr']
  },
  'Monumenten IDF': {
    name: 'Monumenten IDF',
    factory: async () => {
      const { createMonumentsIdfLayerOL } = await import('../monumentsIdfOL')
      return createMonumentsIdfLayerOL()
    },
    immediateLoad: false,
    regions: ['fr']
  },
}
