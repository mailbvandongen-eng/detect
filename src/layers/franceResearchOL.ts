import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { THEDIRAC_RESEARCH_SITES, type ThediracResearchSite } from '../data/thediracResearchSites'

const researchStyles: Record<ThediracResearchSite['category'], Style> = {
  prehistorie: new Style({ image: new CircleStyle({ radius: 8, fill: new Fill({ color: '#b45309' }), stroke: new Stroke({ color: '#fff', width: 2 }) }) }),
  middeleeuwen: new Style({ image: new CircleStyle({ radius: 8, fill: new Fill({ color: '#7c3aed' }), stroke: new Stroke({ color: '#fff', width: 2 }) }) }),
  romeins: new Style({ image: new CircleStyle({ radius: 8, fill: new Fill({ color: '#b91c1c' }), stroke: new Stroke({ color: '#fff', width: 2 }) }) })
}

function createResearchVectorLayer(title: string, categories: ThediracResearchSite['category'][]) {
  const features = THEDIRAC_RESEARCH_SITES.filter(site => categories.includes(site.category)).map(site => new Feature({
    geometry: new Point(fromLonLat([site.lon, site.lat])),
    layerType: 'thediracResearch',
    ...site
  }))

  return new VectorLayer({
    properties: { title, type: 'overlay' },
    visible: false,
    source: new VectorSource({ features }),
    style: feature => researchStyles[feature.get('category') as ThediracResearchSite['category']]
  })
}

export function createThediracPrehistoryLayerOL() {
  return createResearchVectorLayer('Thédirac prehistorie & megalieten', ['prehistorie'])
}

export function createThediracHistoryLayerOL() {
  return createResearchVectorLayer('Thédirac Romeins & middeleeuws', ['romeins', 'middeleeuwen'])
}

export const FRANCE_RESEARCH_FACTORIES: Record<string, () => any> = {
  'Thédirac prehistorie & megalieten': createThediracPrehistoryLayerOL,
  'Thédirac Romeins & middeleeuws': createThediracHistoryLayerOL
}
