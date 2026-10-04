import type { GeoJSON } from 'geojson'
import type Feature from 'ol/Feature'
export function loadGeoJSON(url: string): Promise<GeoJSON>
export function loadTopoJSON(url: string): Promise<GeoJSON>
export function parseGeoJSON(geojson: GeoJSON): Feature[]
