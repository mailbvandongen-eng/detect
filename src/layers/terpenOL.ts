import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'

/**
 * Terpen (dwelling mounds) WMS layer from Friesland geoportal
 * Layer 66 from ProvinciaalGeoRegister/PGR2 MapServer
 * Shows historic terpen (artificial dwelling mounds) in Friesland
 */
export function createTerpenLayerOL() {
  const layer = new TileLayer({
    properties: {
      title: 'Terpen',
      type: 'wms'
    },
    visible: false,
    opacity: 0.7,
    source: new TileWMS({
      url: 'https://geoportaal.fryslan.nl/arcgis/services/ProvinciaalGeoRegister/PGR2/MapServer/WMSServer',
      params: {
        'LAYERS': '66',  // Terpen layer
        'STYLES': '',
        'TILED': true,
        'FORMAT': 'image/png'
      },
      crossOrigin: 'anonymous'
    })
  })

  console.log('🏔️ Terpen WMS layer loaded (Friesland)')
  return layer
}
