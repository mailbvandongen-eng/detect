const fs = require('fs');
const path = require('path');

const data = require('./grafheuvels_osm.json');

const features = data.elements.map(el => {
  let coords;
  if (el.type === 'node') {
    coords = [el.lon, el.lat];
  } else if (el.geometry) {
    // For ways, use centroid
    const lons = el.geometry.map(p => p.lon);
    const lats = el.geometry.map(p => p.lat);
    coords = [
      lons.reduce((a,b) => a+b, 0) / lons.length,
      lats.reduce((a,b) => a+b, 0) / lats.length
    ];
  } else {
    return null;
  }

  return {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: coords },
    properties: {
      name: el.tags?.name || 'Grafheuvel',
      site_type: el.tags?.archaeological_site || 'tumulus',
      wikidata: el.tags?.wikidata || null,
      source: 'OpenStreetMap'
    }
  };
}).filter(f => f !== null);

const geojson = {
  type: 'FeatureCollection',
  features: features
};

const outputPath = path.join(__dirname, '..', 'public', 'data', 'grafheuvels.geojson');
fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2));
console.log('Created grafheuvels.geojson with', features.length, 'features');
