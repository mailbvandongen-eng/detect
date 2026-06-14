/**
 * ArcGIS SDK Configuration
 *
 * Configureert de ArcGIS Maps SDK for JavaScript met de API key
 * voor toegang tot Esri Nederland AHN services.
 *
 * API Key geldig tot: 27 januari 2027
 * Toegestane referrers:
 * - https://mailbvandongen-eng.github.io
 * - https://mailbvandongen-eng.github.io/detect
 * - http://localhost:5173
 * - http://localhost:5174
 */

import esriConfig from '@arcgis/core/config'

// ArcGIS Location Platform API Key
const ARCGIS_API_KEY = 'fef02a7628814a519d5f0eeb2d82656e'

/**
 * Initialiseert de ArcGIS SDK met de API key.
 * Moet aangeroepen worden voordat ArcGIS lagen worden gebruikt.
 */
export function initArcGIS(): void {
  esriConfig.apiKey = ARCGIS_API_KEY

  // Optioneel: assets path configureren als nodig
  // esriConfig.assetsPath = '/detect/assets'
}

/**
 * Geeft de API key terug (voor debugging/logging)
 */
export function getArcGISApiKey(): string {
  return ARCGIS_API_KEY
}

/**
 * Controleert of de ArcGIS SDK is geïnitialiseerd
 */
export function isArcGISInitialized(): boolean {
  return esriConfig.apiKey === ARCGIS_API_KEY
}
