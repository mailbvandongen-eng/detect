/**
 * ArcGIS AHN Layers
 *
 * Implementeert de AHN4 hoogte-lagen met de ArcGIS Maps SDK for JavaScript.
 * Deze lagen gebruiken de Esri Nederland ImageServer services met authenticatie
 * via de API key geconfigureerd in arcgisConfig.ts.
 *
 * Services:
 * - AHN4 DTM 50cm: Hoogste resolutie Digital Terrain Model
 * - AHN4 DTM 5m: Lagere resolutie, sneller laden
 */

import ImageryLayer from '@arcgis/core/layers/ImageryLayer'

// AHN4 ImageServer URLs
const AHN4_DTM_50CM_URL = 'https://ahn.arcgisonline.nl/arcgis/rest/services/Hoogtebestand/AHN4_DTM_50cm/ImageServer'
const AHN4_DTM_5M_URL = 'https://ahn.arcgisonline.nl/arcgis/rest/services/Hoogtebestand/AHN4_DTM_5m/ImageServer'

/**
 * AHN4 Hoogtekaart Kleur - 50cm resolutie
 * Toont hoogteverschillen in kleur (blauw=laag → groen → oranje/bruin=hoog)
 */
export function createArcGISAHN4ColorElevation(): ImageryLayer {
  return new ImageryLayer({
    url: AHN4_DTM_50CM_URL,
    title: 'AHN4 Hoogtekaart Kleur',
    visible: false,
    opacity: 1.0,
    renderingRule: {
      rasterFunction: 'AHN - Color Ramp D'
    }
  })
}

/**
 * AHN4 Hillshade NL - 5m resolutie
 * Grijze hillshade voor 3D-effect
 */
export function createArcGISAHN4Hillshade(): ImageryLayer {
  return new ImageryLayer({
    url: AHN4_DTM_5M_URL,
    title: 'AHN4 Hillshade NL',
    visible: false,
    opacity: 0.7,
    renderingRule: {
      rasterFunction: 'AHN - Hillshade'
    }
  })
}

/**
 * AHN4 Multi-Hillshade NL - 5m resolutie
 * Multidirectionele hillshade voor beter subtiel relief
 */
export function createArcGISAHN4MultiHillshade(): ImageryLayer {
  return new ImageryLayer({
    url: AHN4_DTM_5M_URL,
    title: 'AHN4 Multi-Hillshade NL',
    visible: false,
    opacity: 0.7,
    renderingRule: {
      rasterFunction: 'AHN - Hillshade (Multidirectionaal)'
    }
  })
}

/**
 * AHN4 Hillshade Kleur - 50cm resolutie
 * Combineert kleur met shaded relief effect
 */
export function createArcGISAHN4ShadedRelief(): ImageryLayer {
  return new ImageryLayer({
    url: AHN4_DTM_50CM_URL,
    title: 'AHN4 Hillshade Kleur',
    visible: false,
    opacity: 0.8,
    renderingRule: {
      rasterFunction: 'AHN - Shaded Relief'
    }
  })
}

/**
 * AHN4 Helling (Slope) - 5m resolutie
 * Toont hellingen/steilheid
 */
export function createArcGISAHN4Slope(): ImageryLayer {
  return new ImageryLayer({
    url: AHN4_DTM_5M_URL,
    title: 'AHN4 Helling NL',
    visible: false,
    opacity: 0.6,
    renderingRule: {
      rasterFunction: 'AHN - Slope'
    }
  })
}

/**
 * Alle beschikbare ArcGIS AHN lagen
 */
export const arcgisAHNLayerFactories = {
  'AHN4 Hoogtekaart Kleur': createArcGISAHN4ColorElevation,
  'AHN4 Hillshade NL': createArcGISAHN4Hillshade,
  'AHN4 Multi-Hillshade NL': createArcGISAHN4MultiHillshade,
  'AHN4 Hillshade Kleur': createArcGISAHN4ShadedRelief,
  'AHN4 Helling NL': createArcGISAHN4Slope
} as const

export type ArcGISAHNLayerName = keyof typeof arcgisAHNLayerFactories
