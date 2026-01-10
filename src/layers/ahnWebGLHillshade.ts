/**
 * WebGL Hillshade Layer - Dynamic client-side rendering
 * Uses Terrarium elevation tiles and renders hillshade/color in WebGL
 * No Esri dependency!
 *
 * Based on OpenLayers WebGL Shaded Relief example
 * https://openlayers.org/en/latest/examples/webgl-shaded-relief.html
 */

import WebGLTileLayer from 'ol/layer/WebGLTile'
import XYZ from 'ol/source/XYZ'
import { useHillshadeStore, type ColorRamp } from '../store/hillshadeStore'

// Terrarium encoding: elevation = (R * 256 + G + B / 256) - 32768
// This gives us elevation in meters with ~0.1m precision
const TERRARIUM_URL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'

// Alternative: Mapbox Terrain RGB (requires API key)
// const MAPBOX_URL = 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=YOUR_TOKEN'

/**
 * Convert Terrarium RGB to elevation in meters
 * Formula: elevation = (R * 256 + G + B / 256) - 32768
 */
function getElevationExpression() {
  return [
    '-',
    [
      '+',
      ['*', ['band', 1], 256],  // R * 256
      ['band', 2],              // + G
      ['/', ['band', 3], 256]   // + B / 256
    ],
    32768  // - 32768
  ]
}

/**
 * Get color ramp expression for height visualization
 */
function getColorRampExpression(colorRamp: ColorRamp, minElev: number, maxElev: number) {
  const elevation = getElevationExpression()

  // Normalize elevation to 0-1 range
  const normalized = [
    '/',
    ['-', elevation, minElev],
    ['-', maxElev, minElev]
  ]

  // Clamp to 0-1
  const clamped = ['clamp', normalized, 0, 1]

  // Color ramps
  switch (colorRamp) {
    case 'terrain':
      // Blue (low/water) → Green → Yellow → Brown → White (high)
      return [
        'interpolate',
        ['linear'],
        clamped,
        0, [68, 1, 84, 255],      // Deep purple (below sea level)
        0.1, [59, 82, 139, 255],  // Blue
        0.25, [33, 145, 140, 255], // Teal
        0.4, [94, 201, 98, 255],   // Green
        0.55, [189, 223, 38, 255], // Yellow-green
        0.7, [253, 231, 37, 255],  // Yellow
        0.85, [254, 173, 84, 255], // Orange
        1, [189, 99, 38, 255]      // Brown
      ]

    case 'viridis':
      return [
        'interpolate',
        ['linear'],
        clamped,
        0, [68, 1, 84, 255],
        0.25, [59, 82, 139, 255],
        0.5, [33, 145, 140, 255],
        0.75, [94, 201, 98, 255],
        1, [253, 231, 37, 255]
      ]

    case 'magma':
      return [
        'interpolate',
        ['linear'],
        clamped,
        0, [0, 0, 4, 255],
        0.25, [81, 18, 124, 255],
        0.5, [183, 55, 121, 255],
        0.75, [252, 136, 97, 255],
        1, [252, 253, 191, 255]
      ]

    case 'spectral':
      return [
        'interpolate',
        ['linear'],
        clamped,
        0, [94, 79, 162, 255],    // Purple
        0.2, [50, 136, 189, 255], // Blue
        0.4, [102, 194, 165, 255], // Teal
        0.5, [254, 224, 139, 255], // Yellow
        0.6, [253, 174, 97, 255],  // Orange
        0.8, [244, 109, 67, 255],  // Red-orange
        1, [158, 1, 66, 255]       // Dark red
      ]

    case 'grayscale':
    default:
      return [
        'interpolate',
        ['linear'],
        clamped,
        0, [0, 0, 0, 255],
        1, [255, 255, 255, 255]
      ]
  }
}

/**
 * Create WebGL Hillshade Layer - Dynamisch instelbaar
 *
 * Uses Terrarium tiles and renders hillshade client-side with WebGL.
 * Parameters can be adjusted in real-time via the hillshade store.
 */
export function createWebGLHillshadeLayerOL() {
  // Get initial values from store
  const store = useHillshadeStore.getState()

  // Variables that can be updated dynamically
  const variables: Record<string, number> = {
    sunAzimuth: store.sunAzimuth,
    sunElevation: store.sunElevation,
    verticalExaggeration: store.verticalExaggeration
  }

  // Elevation extraction from Terrarium tiles
  const elevation = getElevationExpression()

  // Sample neighboring pixels for slope calculation
  // The 'band' operator with pixel offset samples adjacent pixels
  const elevationNW = ['-', ['+', ['*', ['band', 1, -1, -1], 256], ['band', 2, -1, -1], ['/', ['band', 3, -1, -1], 256]], 32768]
  const elevationN  = ['-', ['+', ['*', ['band', 1,  0, -1], 256], ['band', 2,  0, -1], ['/', ['band', 3,  0, -1], 256]], 32768]
  const elevationNE = ['-', ['+', ['*', ['band', 1,  1, -1], 256], ['band', 2,  1, -1], ['/', ['band', 3,  1, -1], 256]], 32768]
  const elevationW  = ['-', ['+', ['*', ['band', 1, -1,  0], 256], ['band', 2, -1,  0], ['/', ['band', 3, -1,  0], 256]], 32768]
  const elevationE  = ['-', ['+', ['*', ['band', 1,  1,  0], 256], ['band', 2,  1,  0], ['/', ['band', 3,  1,  0], 256]], 32768]
  const elevationSW = ['-', ['+', ['*', ['band', 1, -1,  1], 256], ['band', 2, -1,  1], ['/', ['band', 3, -1,  1], 256]], 32768]
  const elevationS  = ['-', ['+', ['*', ['band', 1,  0,  1], 256], ['band', 2,  0,  1], ['/', ['band', 3,  0,  1], 256]], 32768]
  const elevationSE = ['-', ['+', ['*', ['band', 1,  1,  1], 256], ['band', 2,  1,  1], ['/', ['band', 3,  1,  1], 256]], 32768]

  // Calculate slope derivatives using Horn's method (3x3 neighborhood)
  // dz/dx = ((NE + 2*E + SE) - (NW + 2*W + SW)) / (8 * cellSize)
  // dz/dy = ((SW + 2*S + SE) - (NW + 2*N + NE)) / (8 * cellSize)
  // We apply vertical exaggeration here
  const dzdx = [
    '*',
    ['var', 'verticalExaggeration'],
    [
      '/',
      [
        '-',
        ['+', elevationNE, ['*', 2, elevationE], elevationSE],
        ['+', elevationNW, ['*', 2, elevationW], elevationSW]
      ],
      8  // 8 * cellSize (cellSize normalized to 1)
    ]
  ]

  const dzdy = [
    '*',
    ['var', 'verticalExaggeration'],
    [
      '/',
      [
        '-',
        ['+', elevationSW, ['*', 2, elevationS], elevationSE],
        ['+', elevationNW, ['*', 2, elevationN], elevationNE]
      ],
      8
    ]
  ]

  // Calculate slope and aspect
  const slope = ['atan', ['^', ['+', ['^', dzdx, 2], ['^', dzdy, 2]], 0.5]]
  const aspect = ['atan', dzdx, dzdy]

  // Convert sun angles from degrees to radians
  const sunAzimuthRad = ['*', ['var', 'sunAzimuth'], Math.PI / 180]
  const sunElevationRad = ['*', ['var', 'sunElevation'], Math.PI / 180]

  // Calculate hillshade using the standard formula
  // hillshade = cos(zenith) * cos(slope) + sin(zenith) * sin(slope) * cos(azimuth - aspect)
  const zenith = ['-', Math.PI / 2, sunElevationRad]  // Convert elevation to zenith angle

  const cosIncidence = [
    '+',
    ['*', ['cos', zenith], ['cos', slope]],
    [
      '*',
      ['*', ['sin', zenith], ['sin', slope]],
      ['cos', ['-', sunAzimuthRad, aspect]]
    ]
  ]

  // Scale to 0-255 range and create grayscale color
  const scaled = ['*', 255, ['clamp', cosIncidence, 0, 1]]

  const layer = new WebGLTileLayer({
    properties: {
      title: 'Hillshade (WebGL)',
      type: 'webgl',
      isDynamic: true  // Flag to indicate this layer has dynamic controls
    },
    visible: false,
    opacity: 0.7,
    source: new XYZ({
      url: TERRARIUM_URL,
      crossOrigin: 'anonymous',
      maxZoom: 15,  // Terrarium tiles go up to zoom 15
      attributions: '© Mapzen, AWS Terrain Tiles'
    }),
    style: {
      variables,
      color: ['color', scaled, scaled, scaled, 255]
    }
  })

  // Subscribe to store changes and update layer dynamically
  useHillshadeStore.subscribe((state) => {
    layer.updateStyleVariables({
      sunAzimuth: state.sunAzimuth,
      sunElevation: state.sunElevation,
      verticalExaggeration: state.verticalExaggeration
    })
  })

  return layer
}

/**
 * Create WebGL Color Height Map Layer - Dynamisch instelbaar
 *
 * Shows elevation with color ramp, similar to Esri AHN4 Hoogtekaart Kleur
 * but rendered client-side with adjustable parameters.
 */
export function createWebGLColorHeightLayerOL() {
  // Get initial values from store
  const store = useHillshadeStore.getState()

  const variables: Record<string, number> = {
    minElevation: store.minElevation,
    maxElevation: store.maxElevation
  }

  // Initial color expression
  let colorExpression = getColorRampExpression(store.colorRamp, store.minElevation, store.maxElevation)

  const layer = new WebGLTileLayer({
    properties: {
      title: 'Hoogtekaart Kleur (WebGL)',
      type: 'webgl',
      isDynamic: true
    },
    visible: false,
    opacity: 0.8,
    source: new XYZ({
      url: TERRARIUM_URL,
      crossOrigin: 'anonymous',
      maxZoom: 15,
      attributions: '© Mapzen, AWS Terrain Tiles'
    }),
    style: {
      variables,
      color: colorExpression
    }
  })

  // Subscribe to store changes
  // For color ramp changes, we need to recreate the style
  let currentColorRamp = store.colorRamp
  let currentMinElev = store.minElevation
  let currentMaxElev = store.maxElevation

  useHillshadeStore.subscribe((state) => {
    // Check if we need to update the color expression
    if (state.colorRamp !== currentColorRamp ||
        state.minElevation !== currentMinElev ||
        state.maxElevation !== currentMaxElev) {
      currentColorRamp = state.colorRamp
      currentMinElev = state.minElevation
      currentMaxElev = state.maxElevation

      // Update the layer style with new color ramp
      const newColorExpression = getColorRampExpression(
        state.colorRamp,
        state.minElevation,
        state.maxElevation
      )

      layer.setStyle({
        variables: {
          minElevation: state.minElevation,
          maxElevation: state.maxElevation
        },
        color: newColorExpression
      })
    }
  })

  return layer
}

/**
 * Create combined Hillshade + Color layer
 * Blends hillshade with color height map for best visualization
 */
export function createWebGLCombinedHillshadeLayerOL() {
  const store = useHillshadeStore.getState()

  const variables: Record<string, number> = {
    sunAzimuth: store.sunAzimuth,
    sunElevation: store.sunElevation,
    verticalExaggeration: store.verticalExaggeration,
    minElevation: store.minElevation,
    maxElevation: store.maxElevation
  }

  // Elevation extraction
  const elevation = getElevationExpression()

  // Neighboring elevations for slope calculation
  const elevationNW = ['-', ['+', ['*', ['band', 1, -1, -1], 256], ['band', 2, -1, -1], ['/', ['band', 3, -1, -1], 256]], 32768]
  const elevationN  = ['-', ['+', ['*', ['band', 1,  0, -1], 256], ['band', 2,  0, -1], ['/', ['band', 3,  0, -1], 256]], 32768]
  const elevationNE = ['-', ['+', ['*', ['band', 1,  1, -1], 256], ['band', 2,  1, -1], ['/', ['band', 3,  1, -1], 256]], 32768]
  const elevationW  = ['-', ['+', ['*', ['band', 1, -1,  0], 256], ['band', 2, -1,  0], ['/', ['band', 3, -1,  0], 256]], 32768]
  const elevationE  = ['-', ['+', ['*', ['band', 1,  1,  0], 256], ['band', 2,  1,  0], ['/', ['band', 3,  1,  0], 256]], 32768]
  const elevationSW = ['-', ['+', ['*', ['band', 1, -1,  1], 256], ['band', 2, -1,  1], ['/', ['band', 3, -1,  1], 256]], 32768]
  const elevationS  = ['-', ['+', ['*', ['band', 1,  0,  1], 256], ['band', 2,  0,  1], ['/', ['band', 3,  0,  1], 256]], 32768]
  const elevationSE = ['-', ['+', ['*', ['band', 1,  1,  1], 256], ['band', 2,  1,  1], ['/', ['band', 3,  1,  1], 256]], 32768]

  // Slope derivatives
  const dzdx = [
    '*',
    ['var', 'verticalExaggeration'],
    ['/', ['-', ['+', elevationNE, ['*', 2, elevationE], elevationSE], ['+', elevationNW, ['*', 2, elevationW], elevationSW]], 8]
  ]

  const dzdy = [
    '*',
    ['var', 'verticalExaggeration'],
    ['/', ['-', ['+', elevationSW, ['*', 2, elevationS], elevationSE], ['+', elevationNW, ['*', 2, elevationN], elevationNE]], 8]
  ]

  const slope = ['atan', ['^', ['+', ['^', dzdx, 2], ['^', dzdy, 2]], 0.5]]
  const aspect = ['atan', dzdx, dzdy]

  const sunAzimuthRad = ['*', ['var', 'sunAzimuth'], Math.PI / 180]
  const sunElevationRad = ['*', ['var', 'sunElevation'], Math.PI / 180]
  const zenith = ['-', Math.PI / 2, sunElevationRad]

  const cosIncidence = [
    '+',
    ['*', ['cos', zenith], ['cos', slope]],
    ['*', ['*', ['sin', zenith], ['sin', slope]], ['cos', ['-', sunAzimuthRad, aspect]]]
  ]

  // Hillshade factor (0.5 to 1.5 range for multiply blend)
  const hillshadeFactor = ['+', 0.5, ['*', 0.5, ['clamp', cosIncidence, 0, 1]]]

  // Color based on elevation (terrain ramp)
  const normalized = ['/', ['-', elevation, ['var', 'minElevation']], ['-', ['var', 'maxElevation'], ['var', 'minElevation']]]
  const clamped = ['clamp', normalized, 0, 1]

  // Terrain color ramp
  const baseColor = [
    'interpolate',
    ['linear'],
    clamped,
    0, [68, 1, 84, 255],
    0.1, [59, 82, 139, 255],
    0.25, [33, 145, 140, 255],
    0.4, [94, 201, 98, 255],
    0.55, [189, 223, 38, 255],
    0.7, [253, 231, 37, 255],
    0.85, [254, 173, 84, 255],
    1, [189, 99, 38, 255]
  ]

  // Multiply blend: color * hillshade
  const finalColor = [
    'color',
    ['*', ['band', 1, 0, 0, baseColor], hillshadeFactor],  // R
    ['*', ['band', 2, 0, 0, baseColor], hillshadeFactor],  // G
    ['*', ['band', 3, 0, 0, baseColor], hillshadeFactor],  // B
    255  // A
  ]

  const layer = new WebGLTileLayer({
    properties: {
      title: 'Reliëfkaart (WebGL)',
      type: 'webgl',
      isDynamic: true
    },
    visible: false,
    opacity: 0.8,
    source: new XYZ({
      url: TERRARIUM_URL,
      crossOrigin: 'anonymous',
      maxZoom: 15,
      attributions: '© Mapzen, AWS Terrain Tiles'
    }),
    style: {
      variables,
      color: finalColor
    }
  })

  // Subscribe to store changes
  useHillshadeStore.subscribe((state) => {
    layer.updateStyleVariables({
      sunAzimuth: state.sunAzimuth,
      sunElevation: state.sunElevation,
      verticalExaggeration: state.verticalExaggeration,
      minElevation: state.minElevation,
      maxElevation: state.maxElevation
    })
  })

  return layer
}
