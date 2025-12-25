const fs = require('fs');
const path = require('path');

// Parse CSV (simple parser for quoted fields)
function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] === 'NULL' ? null : values[idx];
    });
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

// Period codes to Dutch descriptions
const periodMap = {
  'EN': 'Vroeg Neolithicum',
  'MN': 'Midden Neolithicum',
  'LN': 'Laat Neolithicum',
  'LMEN': 'Laat Mesolithicum / Vroeg Neolithicum',
  'UM': 'Onbekend Mesolithicum',
  'UN': 'Onbekend Neolithicum',
  'ENBA': 'Vroeg Neolithicum / Bronstijd'
};

// Type translations
const typeMap = {
  'Settlement': 'Nederzetting',
  'Enclosure': 'Omheining',
  'Burial': 'Grafveld',
  'Cave': 'Grot',
  'Megalith': 'Megaliet',
  'Hoard': 'Depot',
  'Other': 'Overig'
};

// Load sites
const sitesContent = fs.readFileSync(path.join(__dirname, 'euroevol_sites.csv'), 'utf8');
const sites = parseCSV(sitesContent);

// Load phases
const phasesContent = fs.readFileSync(path.join(__dirname, 'euroevol_phases.csv'), 'utf8');
const phases = parseCSV(phasesContent);

// Build phases lookup by SiteID
const phasesMap = {};
phases.forEach(p => {
  const id = p.SiteID;
  if (!phasesMap[id]) {
    phasesMap[id] = { cultures: new Set(), periods: new Set(), types: new Set() };
  }
  if (p.Culture) phasesMap[id].cultures.add(p.Culture);
  if (p.Period) phasesMap[id].periods.add(p.Period);
  if (p.Type) phasesMap[id].types.add(p.Type);
});

// Filter for NL and BE
const nlBeSites = sites.filter(s =>
  s.Country === 'Netherlands' || s.Country === 'Belgium'
);

console.log(`Total sites: ${sites.length}`);
console.log(`NL/BE sites: ${nlBeSites.length}`);

// Create GeoJSON
const features = nlBeSites.map(site => {
  const phaseInfo = phasesMap[site.SiteID] || { cultures: new Set(), periods: new Set(), types: new Set() };

  const cultures = Array.from(phaseInfo.cultures);
  const periods = Array.from(phaseInfo.periods).map(p => periodMap[p] || p);
  const types = Array.from(phaseInfo.types).map(t => typeMap[t] || t);

  return {
    type: 'Feature',
    properties: {
      name: site.SiteName,
      id: site.SiteID,
      country: site.Country === 'Netherlands' ? 'Nederland' : 'België',
      culture: cultures.length > 0 ? cultures.join(', ') : null,
      period: periods.length > 0 ? periods.join(', ') : null,
      type: types.length > 0 ? types.join(', ') : null
    },
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(site.Longitude), parseFloat(site.Latitude)]
    }
  };
});

const geojson = {
  type: 'FeatureCollection',
  name: 'EUROEVOL Neolithische Sites NL/BE',
  source: 'EUROEVOL Project (UCL)',
  license: 'CC0 Public Domain',
  url: 'https://discovery.ucl.ac.uk/id/eprint/1469811/',
  description: 'Neolithic archaeological sites with culture and period information',
  features: features
};

// Count enriched sites
const enriched = features.filter(f => f.properties.culture || f.properties.period || f.properties.type);
console.log(`Sites with extra info: ${enriched.length}`);

// Write output
const outputPath = path.join(__dirname, '..', 'public', 'data', 'steentijd', 'euroevol_nl_be.geojson');
fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2));
console.log(`Saved to: ${outputPath}`);
