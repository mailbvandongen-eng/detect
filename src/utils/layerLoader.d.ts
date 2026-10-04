import type { GeoJSON } from 'geojson'
import type { GeoJSON as LeafletGeoJSON, GeoJSONOptions } from 'leaflet'
export function loadGeoJSON(url: string): Promise<GeoJSON>
export function loadTopoJSON(url: string): Promise<GeoJSON>
export function createGeoJSONLayer(geojson: GeoJSON, options?: GeoJSONOptions): LeafletGeoJSON
