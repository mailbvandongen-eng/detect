// Esri levert de Wayback-capabilities sinds 2026 met https-namespace-URI's.
// OpenLayers 10.7 herkent voor WMTS/OWS/XLink alleen de officiële http-URI's,
// waardoor een geldig document anders als een leeg archief wordt gelezen.
export function normalizeWaybackCapabilitiesXml(xml: string): string {
  return xml
    .replace('xmlns="https://www.opengis.net/wmts/1.0"', 'xmlns="http://www.opengis.net/wmts/1.0"')
    .replace('xmlns:ows="https://www.opengis.net/ows/1.1"', 'xmlns:ows="http://www.opengis.net/ows/1.1"')
    .replace('xmlns:xlink="https://www.w3.org/1999/xlink"', 'xmlns:xlink="http://www.w3.org/1999/xlink"')
}
