import type { Layer } from 'ol/layer'
import { Tile as TileLayer } from 'ol/layer'
import { OSM, XYZ } from 'ol/source'

export interface NamedLayer {
  id: string
  layer: Layer
}

export function createBaseLayers(): NamedLayer[] {
  return [
    {
      id: 'OpenStreetMap',
      layer: new TileLayer({
        properties: { title: 'OpenStreetMap', type: 'base' },
        visible: false,
        source: new OSM()
      })
    },
    {
      id: 'CartoDB (licht)',
      layer: new TileLayer({
        properties: { title: 'CartoDB (licht)', type: 'base' },
        visible: true,
        source: new XYZ({
          url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          attributions: '© OpenStreetMap contributors © CARTO'
        })
      })
    },
    {
      id: 'Luchtfoto',
      layer: new TileLayer({
        properties: { title: 'Luchtfoto', type: 'base' },
        visible: false,
        source: new XYZ({
          url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg',
          attributions: '© Kadaster / PDOK Luchtfoto',
          maxZoom: 19
        })
      })
    },
    {
      id: 'Satelliet (wereld)',
      layer: new TileLayer({
        properties: { title: 'Satelliet (wereld)', type: 'base' },
        visible: false,
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attributions: '© Esri, Maxar, Earthstar Geographics',
          maxZoom: 19,
          crossOrigin: 'anonymous'
        })
      })
    },
    {
      id: 'Labels Overlay',
      layer: new TileLayer({
        properties: { title: 'Labels Overlay', type: 'overlay' },
        visible: false,
        source: new XYZ({
          url: 'https://{a-d}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png',
          attributions: '© OpenStreetMap contributors © CARTO',
          maxZoom: 20
        }),
        zIndex: 100
      })
    },
    {
      id: 'TMK 1850',
      layer: new TileLayer({
        properties: { title: 'TMK 1850', type: 'base' },
        visible: false,
        source: new XYZ({
          url: 'https://s.map5.nl/map/gast/tiles/tmk_1850/EPSG3857/{z}/{x}/{y}.png',
          attributions: '© Kadaster / Map5.nl',
          crossOrigin: 'anonymous',
          maxZoom: 14
        })
      })
    },
    {
      id: 'Bonnebladen 1900',
      layer: new TileLayer({
        properties: { title: 'Bonnebladen 1900', type: 'base' },
        visible: false,
        source: new XYZ({
          url: 'https://s.map5.nl/map/gast/tiles/bonne_1900/EPSG3857/{z}/{x}/{y}.png',
          attributions: '© Kadaster / Map5.nl',
          crossOrigin: 'anonymous',
          maxZoom: 14
        })
      })
    },
  ]
}
