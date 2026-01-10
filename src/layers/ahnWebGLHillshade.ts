/**
 * WebGL Hillshade Layer - SIMPLE VERSION
 * Just display elevation as grayscale to test if basic rendering works
 */

import WebGLTileLayer from 'ol/layer/WebGLTile'
import XYZ from 'ol/source/XYZ'
import { useHillshadeStore } from '../store/hillshadeStore'

// Terrarium tiles
const TERRARIUM_URL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'

// Netherlands extent in EPSG:3857 (Web Mercator)
// Bbox: 3.37°W to 7.21°E, 50.75°S to 53.47°N
const NL_EXTENT = [370000, 6580000, 810000, 7130000]

/**
 * SUPER SIMPLE - Just show red channel as grayscale
 */
export function createWebGLHillshadeLayerOL() {
  const store = useHillshadeStore.getState()

  // Just use the red band directly (0-1 normalized, scale to 0-255)
  const gray = ['*', 255, ['band', 1]]

  const layer = new WebGLTileLayer({
    properties: {
      title: 'Hillshade (WebGL)',
      type: 'webgl',
      isDynamic: true
    },
    extent: NL_EXTENT,
    visible: false,
    opacity: 0.7,
    source: new XYZ({
      url: TERRARIUM_URL,
      crossOrigin: 'anonymous',
      maxZoom: 15,
      attributions: '© Mapzen, AWS Terrain Tiles'
    }),
    style: {
      color: ['color', gray, gray, gray, 255]
    }
  })

  return layer
}

/**
 * Color Height - Simple version
 */
export function createWebGLColorHeightLayerOL() {
  const store = useHillshadeStore.getState()

  // Simple: just show RGB bands as-is (the raw Terrarium tile)
  const layer = new WebGLTileLayer({
    properties: {
      title: 'Hoogtekaart Kleur (WebGL)',
      type: 'webgl',
      isDynamic: true
    },
    extent: NL_EXTENT,
    visible: false,
    opacity: 0.8,
    source: new XYZ({
      url: TERRARIUM_URL,
      crossOrigin: 'anonymous',
      maxZoom: 15,
      attributions: '© Mapzen, AWS Terrain Tiles'
    }),
    style: {
      // Just pass through the tile as-is
      color: [
        'color',
        ['*', 255, ['band', 1]],  // R
        ['*', 255, ['band', 2]],  // G
        ['*', 255, ['band', 3]],  // B
        255
      ]
    }
  })

  return layer
}

/**
 * Combined - disabled for now
 */
export function createWebGLCombinedHillshadeLayerOL() {
  const store = useHillshadeStore.getState()

  // Same simple approach
  const gray = ['*', 255, ['band', 1]]

  const layer = new WebGLTileLayer({
    properties: {
      title: 'Reliëfkaart (WebGL)',
      type: 'webgl',
      isDynamic: true
    },
    extent: NL_EXTENT,
    visible: false,
    opacity: 0.8,
    source: new XYZ({
      url: TERRARIUM_URL,
      crossOrigin: 'anonymous',
      maxZoom: 15,
      attributions: '© Mapzen, AWS Terrain Tiles'
    }),
    style: {
      color: ['color', gray, gray, gray, 255]
    }
  })

  return layer
}
