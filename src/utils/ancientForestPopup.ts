function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!))
}

function translate(value: unknown): string {
  const text = String(value ?? '').trim()
  const key = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ')
  const labels: Record<string, string> = {
    'foret ancienne': 'Oud bos',
    'forets anciennes': 'Oud bos',
    'foret recente': 'Recent bos',
    'foret disparue': 'Verdwenen bos',
    'autre foret': 'Overig bos',
    'foret': 'Bos',
    'bois': 'Bos',
    'feuillus': 'Loofbos',
    'resineux': 'Naaldbos',
    'foret mixte': 'Gemengd bos',
    'non renseigne': 'Niet opgegeven',
  }
  // Keep an unrecognized source value visible rather than inventing a category.
  return labels[key] ?? (text ? `Niet vertaald (${text})` : 'Niet opgegeven')
}

export function formatAncientForestPopup(properties: Record<string, unknown>): string {
  let html = '<strong class="text-green-800">Oude bossen</strong>'
  html += `<br/><span class="text-sm text-gray-700"><strong>Type:</strong> ${escapeHtml(translate(properties.nature))}</span>`
  const rawArea = properties.surface_m2
  const area = typeof rawArea === 'number' || (typeof rawArea === 'string' && rawArea.trim()) ? Number(rawArea) : NaN
  if (Number.isFinite(area) && area >= 0) {
    const hectares = (area / 10_000).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const metres = area.toLocaleString('nl-NL', { maximumFractionDigits: 0 })
    html += `<br/><span class="text-sm text-gray-700"><strong>Oppervlakte:</strong> ${hectares} ha <span class="text-xs text-gray-500">(${metres} m²)</span></span>`
  }
  if (properties.detail_em != null && String(properties.detail_em).trim()) {
    html += `<br/><span class="text-sm text-gray-700"><strong>Broncategorie:</strong> ${escapeHtml(translate(properties.detail_em))}</span>`
  }
  html += '<div class="mt-2 text-xs text-gray-500">Bron: IGN — kaart van oude bossen.</div>'
  return html
}
