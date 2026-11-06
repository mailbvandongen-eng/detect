import TileWMS from 'ol/source/TileWMS'
import TileLayer from 'ol/layer/Tile'
import { toLonLat } from 'ol/proj'
import proj4 from 'proj4'
import { describeOcsArtificialisation, describeOcsCoverage, describeOcsUsage, formatOcsArea } from '../../../utils/ocsGe'
import { formatAncientForestPopup } from '../../../utils/ancientForestPopup'
import type OlMap from 'ol/Map'
import { findGeologyUnit, formatGeologyPopup } from '../../../utils/franceGeology'
import { fetchWithTimeout, KADASTRALE_GEMEENTEN, IKAW_VALUES, getSoilExplanation } from './popupHelpers'

// Query WMS layers for feature info - returns array of all results
const GEOLOGY_TITLES = new Set(['Bodem/geologie 1:50.000 FR', 'Geologie + reliëf FR', 'Geologie kaartbladen FR (origineel)'])

/** Geologische eenheid met legenda uit de lokale BD Charm-50-data. */
async function queryGeology(map: OlMap, coordinate: number[]): Promise<string[]> {
  const visible = map.getLayers().getArray().some(layer => GEOLOGY_TITLES.has(layer.get('title')) && layer.getVisible())
  if (!visible) return []
  const [lon, lat] = toLonLat(coordinate)
  const informationLink = `https://infoterre.brgm.fr/viewer/MainTileForward.do?lon=${lon}&lat=${lat}`
  const found = await findGeologyUnit(lon, lat).catch(() => null)
  if (found) return [formatGeologyPopup(found.unit, found.legend, found.dept, informationLink)]
  return [`<strong>Geologische kaart · BRGM 1:50.000</strong><div class="text-sm text-gray-700 mt-1">Eenheid en legenda zijn beschikbaar in de departementen met lokale BRGM-data (o.a. Dordogne, Lot en Lot-et-Garonne). Hier vind je de toelichting in BRGM InfoTerre.</div><div class="mt-2"><a href="${informationLink}" target="_blank" rel="noopener noreferrer" class="text-blue-700 text-sm underline">Open kaart en kaartbladtoelichting in BRGM InfoTerre</a></div>`]
}

export async function queryWMSLayers(map: OlMap, coordinate: number[], viewResolution: number): Promise<string[]> {
  const [geology, wms] = await Promise.all([queryGeology(map, coordinate), queryWmsServices(map, coordinate, viewResolution)])
  return [...geology, ...wms]
}

async function queryWmsServices(map: OlMap, coordinate: number[], viewResolution: number): Promise<string[]> {
  // Een trage of onbereikbare kaartdienst mag niet alle popups blokkeren.
  const fetch = (input: RequestInfo | URL, init?: RequestInit) => fetchWithTimeout(input, init)

  const wmsLayers = map.getLayers().getArray().filter(layer => {
    if (layer instanceof TileLayer && layer.getVisible()) {
      const source = layer.getSource()
      return source instanceof TileWMS
    }
    return false
  }) as TileLayer<TileWMS>[]

  // Query visible services concurrently. On mobile connections, a single
  // slow service must not delay all other popup results.
  const layerResults = await Promise.all(wmsLayers.map(async wmsLayer => {
    const results: string[] = []

    // Retain the existing early `continue` flow for each individual layer.
    for (const layer of [wmsLayer]) {
    const source = layer.getSource()
    if (!source) continue

    const title = layer.get('title') || ''

    // Skip Paleokaarten - they're just visual overlays with no meaningful feature info
    if (title.startsWith('Paleokaart')) {
      continue
    }

    // Archeo Landschappen (RCE) - B1 stijl
    if (title === 'Archeo Landschappen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 100
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://services.rce.geovoorziening.nl/landschappenkaart/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=landschappenkaart_nl&QUERY_LAYERS=landschappenkaart_nl&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const naam = props.landschapsnaam || props.naam || 'Archeologisch Landschap'
          const omschrijving = props.omschrijving || ''

          let html = `<strong class="text-green-800">${naam}</strong>`

          if (omschrijving) {
            html += `<br/><span class="text-sm text-gray-600">${omschrijving}</span>`
          }

          // Wat zie je hier
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat zie je hier?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">Een archeologisch landschap is een gebied waar het landschap nog sporen draagt van menselijke activiteit uit het verleden. Denk aan oude akkers, nederzettingen of verdedigingswerken.</div>`

          // Wat kun je hier vinden
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je hier vinden?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">Aardewerk, munten, gereedschap en andere voorwerpen van vroegere bewoners. De kans op vondsten hangt af van het type landschap.</div>`

          // Meer weten
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer weten?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1"><a href="https://www.cultureelerfgoed.nl/onderwerpen/bronnen-en-kaarten/overzicht/landschappenkaart" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">RCE Landschappenkaart</a></div>`
          html += `<div class="text-sm text-gray-700 mt-1"><a href="https://nl.wikipedia.org/wiki/Landschapstypen_van_Nederland" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wikipedia: Landschapstypen</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Archeo Landschappen WMS query failed:', error)
      }
      continue
    }

    // Essen - Historische akkercomplexen
    if (title === 'Essen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 100
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://services.rce.geovoorziening.nl/landschapsatlas/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=essen&QUERY_LAYERS=essen&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          let html = `<strong class="text-amber-800">Es (historisch akkercomplex)</strong>`
          if (props.naam || props.Naam || props.NAME) {
            html += `<br/><span class="text-sm font-semibold text-amber-700">${props.naam || props.Naam || props.NAME}</span>`
          }
          if (props.type || props.Type || props.TYPE) {
            html += `<br/><span class="text-xs text-gray-600">${props.type || props.Type || props.TYPE}</span>`
          }
          if (props.omschrijving || props.Omschrijving) {
            html += `<br/><span class="text-xs text-gray-500">${props.omschrijving || props.Omschrijving}</span>`
          }

          // Wat is een es?
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is een es?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">Een es is een oud akkercomplex op hogere zandgronden. Eeuwenlang werden hier gewassen verbouwd. De bodem werd bemest met plaggen en mest, waardoor de grond donker en vruchtbaar werd.</div>`

          // Wat kun je hier vinden?
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je hier vinden?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">Munten, gespen, knopen, aardewerk en soms bijzondere voorwerpen die door bemesting op het land terechtkwamen. Essen behoren tot de beste vindplaatsen voor metaaldetectie.</div>`

          // Conservering
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Conservering</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1 italic">De zure zandgrond tast metaal aan. IJzer en koper zijn vaak slecht bewaard. Zilver en brons houden zich beter.</div>`

          // Meer weten
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer weten?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1"><a href="https://nl.wikipedia.org/wiki/Es_(geografie)" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wikipedia: Es (geografie)</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Essen WMS query failed:', error)
      }
      continue
    }

    // FAMKE Steentijd-Bronstijd (Friese Archeologische Monumentenkaart Extra) - ArcGIS REST
    if (title === 'FAMKE Steentijd') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)

        // ArcGIS REST query - Layer 2 = steentijd-bronstijd
        const url = `https://geoportaal.fryslan.nl/arcgis/rest/services/Themas/cultuurhistorie/MapServer/2/query?` +
          `geometry=${rd[0]},${rd[1]}&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects` +
          `&outFields=BESCHR,BESCHRTOELICHTING,BESCHRLINK&returnGeometry=false&f=json`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const attrs = data.features[0].attributes
          let html = `<strong class="text-amber-800">FAMKE Steentijd-Bronstijd</strong>`
          html += `<br/><span class="text-sm text-gray-500">Friese verwachtingskaart</span>`

          // BESCHR - korte beschrijving
          const beschr = attrs.BESCHR || ''
          if (beschr) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Advies</span></div>`
            html += `<div class="text-sm text-amber-700 mt-1 font-medium">${beschr}</div>`
          }

          // BESCHRTOELICHTING - uitgebreide toelichting
          const toelichting = attrs.BESCHRTOELICHTING || ''
          if (toelichting) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Toelichting</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${toelichting}</div>`
          }

          // BESCHRLINK - link naar meer info
          const link = attrs.BESCHRLINK || ''
          if (link) {
            html += `<div class="mt-3"><a href="${link}" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-600 hover:underline">Meer informatie</a></div>`
          }

          // Wat is FAMKE
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is FAMKE?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">FAMKE is de Friese Archeologische Monumentenkaart Extra. Deze kaart toont waar in Friesland vondsten uit de steentijd en bronstijd te verwachten zijn.</div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('FAMKE Steentijd query failed:', error)
      }
      continue
    }

    // FAMKE IJzertijd-Middeleeuwen (Friese Archeologische Monumentenkaart Extra) - ArcGIS REST
    if (title === 'FAMKE IJzertijd') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)

        // ArcGIS REST query - Layer 1 = ijzertijd-middeleeuwen
        const url = `https://geoportaal.fryslan.nl/arcgis/rest/services/Themas/cultuurhistorie/MapServer/1/query?` +
          `geometry=${rd[0]},${rd[1]}&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects` +
          `&outFields=BESCHR,BESCHRTOELICHTING,BESCHRLINK&returnGeometry=false&f=json`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const attrs = data.features[0].attributes
          let html = `<strong class="text-orange-800">FAMKE IJzertijd-Middeleeuwen</strong>`
          html += `<br/><span class="text-sm text-gray-500">Friese verwachtingskaart</span>`

          // BESCHR - korte beschrijving
          const beschr = attrs.BESCHR || ''
          if (beschr) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Advies</span></div>`
            html += `<div class="text-sm text-orange-700 mt-1 font-medium">${beschr}</div>`
          }

          // BESCHRTOELICHTING - uitgebreide toelichting
          const toelichting = attrs.BESCHRTOELICHTING || ''
          if (toelichting) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Toelichting</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${toelichting}</div>`
          }

          // BESCHRLINK - link naar meer info
          const link = attrs.BESCHRLINK || ''
          if (link) {
            html += `<div class="mt-3"><a href="${link}" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-600 hover:underline">Meer informatie</a></div>`
          }

          // Wat is FAMKE
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is FAMKE?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">FAMKE is de Friese Archeologische Monumentenkaart Extra. Deze kaart toont waar in Friesland vondsten uit de ijzertijd tot en met de middeleeuwen te verwachten zijn.</div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('FAMKE IJzertijd query failed:', error)
      }
      continue
    }

    // Archeo Onderzoeken (RCE) - archaeological research locations
    // Nu met ondersteuning voor meerdere overlappende onderzoeken
    if (title === 'Archeo Onderzoeken') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 100
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        // Request more features with FEATURE_COUNT parameter
        const url = `https://data.geo.cultureelerfgoed.nl/openbaar/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=archeologische_onderzoeksmeldingen_openbaar_rd&QUERY_LAYERS=archeologische_onderzoeksmeldingen_openbaar_rd&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}&FEATURE_COUNT=20`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          // Process EACH feature as a separate popup
          for (const feature of data.features) {
            const props = feature.properties

            // Verzamel alle bruikbare info
            const onderzoekType = props.type_onderzoek || ''
            const rawNaam = props.projectnaam || props.project_naam || props.naam || ''
            // Filter ongeldige namen (-, leeg, alleen cijfers)
            const projectNaam = (rawNaam && rawNaam !== '-' && rawNaam.trim() !== '' && !/^\d+$/.test(rawNaam.trim())) ? rawNaam : ''
            const gemeente = props.gemeente || ''
            const uitvoerder = props.uitvoerder || ''
            const omNummer = props.onderzoeksmeldingnummer || ''
            const adres = props.adres || props.straat || ''

            // Maak een duidelijke kop
            let kopTekst = 'Archeologisch Onderzoek'
            if (projectNaam) {
              kopTekst = projectNaam
            } else if (gemeente && adres) {
              kopTekst = `${gemeente} - ${adres}`
            } else if (gemeente) {
              kopTekst = `Onderzoek ${gemeente}`
            }

            let html = `<strong class="text-blue-800">${kopTekst}</strong>`

            // Research type
            if (onderzoekType) {
              html += `<br/><span class="text-sm font-semibold text-blue-700">${onderzoekType}</span>`
            }

            // Locatie info (alleen als niet al in kop)
            if (gemeente && !kopTekst.includes(gemeente)) {
              html += `<br/><span class="text-sm text-gray-700">${gemeente}</span>`
            }
            if (adres && !kopTekst.includes(adres)) {
              html += `<br/><span class="text-sm text-gray-600">${adres}</span>`
            }

            if (omNummer) {
              html += `<br/><span class="text-xs text-gray-500 font-mono">OM: ${omNummer}</span>`
            }
            if (uitvoerder) {
              html += `<br/><span class="text-sm text-gray-700">Uitvoerder: ${uitvoerder}</span>`
            }
            if (props.startdatum || props.einddatum) {
              const periode = [props.startdatum, props.einddatum].filter(Boolean).join(' - ')
              html += `<br/><span class="text-xs text-gray-600">Periode: ${periode}</span>`
            }

            // Periodes/dateringen gevonden
            const periodes: string[] = []
            if (props.periode_paleolithicum) periodes.push('Paleolithicum')
            if (props.periode_mesolithicum) periodes.push('Mesolithicum')
            if (props.periode_neolithicum) periodes.push('Neolithicum')
            if (props.periode_bronstijd) periodes.push('Bronstijd')
            if (props.periode_ijzertijd) periodes.push('IJzertijd')
            if (props.periode_romeins) periodes.push('Romeins')
            if (props.periode_middeleeuwen) periodes.push('Middeleeuwen')
            if (props.periode_nieuwe_tijd) periodes.push('Nieuwe tijd')
            if (periodes.length > 0) {
              html += `<br/><span class="text-sm text-purple-700">Datering: ${periodes.join(', ')}</span>`
            }

            // Wat betekent dit?
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat betekent dit?</span></div>`
            if (onderzoekType.toLowerCase().includes('opgraving')) {
              html += `<div class="text-sm text-gray-700 mt-1">Hier is een archeologische opgraving gedaan. Professionele archeologen hebben vondsten en sporen gedocumenteerd en geborgen.</div>`
            } else if (onderzoekType.toLowerCase().includes('bureauonderzoek')) {
              html += `<div class="text-sm text-gray-700 mt-1">Een bureauonderzoek naar de archeologische verwachting op basis van historische bronnen en kaarten.</div>`
            } else if (onderzoekType.toLowerCase().includes('booronderzoek')) {
              html += `<div class="text-sm text-gray-700 mt-1">Met boringen is onderzocht wat er in de grond zit. Vaak de eerste stap om te bepalen of er verder onderzoek nodig is.</div>`
            } else if (onderzoekType.toLowerCase().includes('proefsleuven')) {
              html += `<div class="text-sm text-gray-700 mt-1">Proefsleuven zijn gegraven om te kijken of er archeologische sporen in de grond zitten.</div>`
            } else if (onderzoekType.toLowerCase().includes('begeleiding')) {
              html += `<div class="text-sm text-gray-700 mt-1">Archeologische begeleiding bij graafwerk. Een archeoloog was aanwezig om te controleren of er vondsten naar boven kwamen.</div>`
            } else if (onderzoekType.toLowerCase().includes('inventariserend') || onderzoekType.toLowerCase().includes('karterend')) {
              html += `<div class="text-sm text-gray-700 mt-1">Verkennend onderzoek om te bepalen of er archeologische resten in de grond kunnen zitten.</div>`
            } else {
              html += `<div class="text-sm text-gray-700 mt-1">Op deze locatie is archeologisch onderzoek uitgevoerd. De resultaten zijn opgeslagen in het landelijke archief.</div>`
            }

            // Interesse voor detectoristen
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Interessant voor detectie?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1 italic">Onderzoekslocaties kunnen interessant zijn: archeologen vinden vaak niet alles. Maar check altijd eerst of je daar mag zoeken.</div>`

            // Meer weten - met directe links naar het rapport
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Rapport opzoeken</span></div>`

            // Bouw slimme zoekterm: projectnaam > uitvoerder+gemeente > gemeente
            let zoekterm = ''
            if (projectNaam) {
              zoekterm = projectNaam
            } else if (uitvoerder && gemeente) {
              // Combineer uitvoerder met gemeente voor betere hits
              zoekterm = `${uitvoerder} ${gemeente}`
            } else if (gemeente) {
              zoekterm = gemeente
            }

            if (zoekterm) {
              // Directe zoeklink naar DANS Data Station Archaeology
              const displayTerm = zoekterm.length > 35 ? zoekterm.substring(0, 35) + '...' : zoekterm
              html += `<div class="text-sm text-gray-700 mt-1"><a href="https://archaeology.datastations.nl/dataverse/root?q=${encodeURIComponent(zoekterm)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Zoek "${displayTerm}" in DANS</a></div>`

              // Google Scholar zoeklink
              html += `<div class="text-sm text-gray-700 mt-1"><a href="https://scholar.google.nl/scholar?q=${encodeURIComponent(zoekterm + ' archeologisch rapport')}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Zoek in Google Scholar</a></div>`
            }

            if (omNummer) {
              // ARCHIS zoekfunctie
              html += `<div class="text-sm text-gray-700 mt-1"><a href="https://archis.cultureelerfgoed.nl/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Zoek OM ${omNummer} in ARCHIS</a> <span class="text-xs text-gray-400">(account nodig)</span></div>`
            }

            results.push(html)
          }
        }
      } catch (error) {
        console.warn('Archeo Onderzoeken WMS query failed:', error)
      }
      continue
    }

    // Special handling for IKAW (Indicatieve Kaart Archeologische Waarden) - B1 stijl
    if (title === 'IKAW') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 500 // Larger buffer for IKAW's 50m raster cells
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://services.rce.geovoorziening.nl/ikaw/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=IKAW3Indicatievekaartarcheologischewaarden2008&QUERY_LAYERS=IKAW3Indicatievekaartarcheologischewaarden2008&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const value = Math.round(props.PALETTE_INDEX || props.palette_index || 0)
          const label = IKAW_VALUES[value] || `Trefkans onbekend (${value})`

          let html = `<strong class="text-orange-800">IKAW Verwachtingskaart</strong>`
          html += `<br/><span class="text-sm text-gray-500">Kaart met kansen op archeologische vondsten</span>`

          // Wat betekent dit sectie
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat betekent dit?</span></div>`
          html += `<div class="text-sm text-orange-700 mt-1">${label}</div>`

          // Uitgebreide uitleg per trefkans categorie in B1 taal
          const uitleg: Record<number, { tekst: string; vondsten: string; kleur: string }> = {
            1: {
              tekst: 'De kans op archeologische vondsten is hier zeer klein. De grond is waarschijnlijk verstoord of te jong.',
              vondsten: 'Niet veel te verwachten, maar verrassingen zijn altijd mogelijk.',
              kleur: 'text-gray-600'
            },
            2: {
              tekst: 'De kans op vondsten is laag, maar niet uitgesloten. Soms worden hier toch interessante objecten gevonden.',
              vondsten: 'Af en toe losse vondsten uit verschillende periodes.',
              kleur: 'text-yellow-600'
            },
            3: {
              tekst: 'Dit is een interessant gebied met een redelijke kans op vondsten. Hier woonden of werkten mensen in het verleden.',
              vondsten: 'Aardewerk, munten, metalen voorwerpen uit verschillende tijdperken.',
              kleur: 'text-amber-600'
            },
            4: {
              tekst: 'Dit is een zeer kansrijk gebied! Hier zijn waarschijnlijk resten van oude bewoning of activiteit. Let op: bij graafwerk kan een vergunning nodig zijn.',
              vondsten: 'Grote kans op interessante vondsten: aardewerk, munten, sieraden, gereedschap.',
              kleur: 'text-orange-600'
            },
            5: {
              tekst: 'Dit is een waterbodem. Vondsten zijn hier moeilijker te bereiken maar kunnen goed bewaard zijn gebleven.',
              vondsten: 'Scheepswrakken, verloren lading, gedumpte voorwerpen.',
              kleur: 'text-blue-600'
            },
            6: {
              tekst: 'Waterbodem met archeologische potentie. Hier kunnen interessante vondsten liggen die door het water goed bewaard zijn.',
              vondsten: 'Scheepsresten, ankers, aardewerk, metalen voorwerpen.',
              kleur: 'text-blue-600'
            },
            7: {
              tekst: 'Waterbodem met hoge archeologische waarde. Hier zijn bekende vindplaatsen of scheepswrakken.',
              vondsten: 'Belangrijke maritieme vondsten, beschermd gebied.',
              kleur: 'text-blue-700'
            }
          }

          const info = uitleg[value]
          if (info) {
            html += `<div class="text-sm ${info.kleur} mt-1">${info.tekst}</div>`

            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je hier vinden?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${info.vondsten}</div>`
          }

          // Wat is IKAW
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is de IKAW?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">De IKAW (Indicatieve Kaart Archeologische Waarden) toont de kans op archeologische vondsten in heel Nederland. De kaart is gemaakt door de Rijksdienst voor het Cultureel Erfgoed.</div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('IKAW WMS query failed:', error)
      }
      continue
    }

    // Inundatiegebieden (RCE Linies en Stellingen)
    if (title === 'Inundatiegebieden') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 100
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://services.rce.geovoorziening.nl/liniesenstellingen/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=inundaties&QUERY_LAYERS=inundaties&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          let html = `<strong class="text-blue-800">Inundatiegebied</strong>`

          if (props['linie-naam'] || props.linie_naam) {
            html += `<br/><span class="text-sm font-semibold text-blue-700">${props['linie-naam'] || props.linie_naam}</span>`
          }
          if (props.naam) {
            html += `<br/><span class="text-sm text-gray-700">${props.naam}</span>`
          }
          if (props.periode) {
            html += `<br/><span class="text-xs text-gray-500">${props.periode}</span>`
          }
          if (props.lin_period) {
            html += `<br/><span class="text-xs text-gray-400">${props.lin_period}</span>`
          }

          results.push(html)
        }
      } catch (error) {
        console.warn('Inundatiegebieden WMS query failed:', error)
      }
      continue
    }

    // Militaire Objecten (RCE Linies en Stellingen) - B1 stijl
    if (title === 'Militaire Objecten') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 50
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://services.rce.geovoorziening.nl/liniesenstellingen/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=objecten&QUERY_LAYERS=objecten&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const soort = props.obj_soort || ''
          const naam = props.obj_naam || ''
          const periode = props.lin_period || ''
          const linie = props['linie-naam'] || props.linie_naam || ''

          // Bepaal type en beschrijving op basis van obj_soort
          let typeTitel = soort || 'Militair Object'
          let uitleg = 'Dit is een historisch militair object uit de Nederlandse verdedigingsgeschiedenis.'
          let vondsten = ''

          const soortLower = soort.toLowerCase()

          if (soortLower.includes('fort')) {
            uitleg = 'Een fort is een versterkte verdedigingspost, vaak met dikke muren en geschutsopstellingen. Forten maakten deel uit van grotere verdedigingslinies.'
            vondsten = 'Rond forten worden soms kogels, knopen van uniformen, muntjes of andere militaire voorwerpen gevonden.'
          } else if (soortLower.includes('schans')) {
            uitleg = 'Een schans is een kleinere versterking, vaak gemaakt van aarde en palissaden. Schansen werden gebruikt om strategische punten te verdedigen.'
            vondsten = 'Bij schansen kun je musketkogels, knopen en soms munten uit de 17e-18e eeuw tegenkomen.'
          } else if (soortLower.includes('batterij') || soortLower.includes('battery')) {
            uitleg = 'Een batterij is een geschutsopstelling, vaak op een strategische plek om vijanden onder vuur te nemen.'
            vondsten = 'Bij batterijen worden soms kanonkogels of onderdelen van geschut gevonden.'
          } else if (soortLower.includes('bunker') || soortLower.includes('kazemat')) {
            uitleg = 'Een bunker of kazemat is een versterkte betonnen schuilplaats. Veel werden gebouwd rond 1940 als onderdeel van verdedigingslinies.'
            vondsten = 'Bij bunkers worden soms militaire voorwerpen uit WOII gevonden, zoals knopen, gespen of munitieresten.'
          } else if (soortLower.includes('sluis') || soortLower.includes('inlaatwerk')) {
            uitleg = 'Militaire sluizen en inlaatwerken werden gebruikt om land onder water te zetten (inunderen). Dit was een belangrijke verdedigingstactiek.'
            vondsten = 'Bij historische sluizen worden soms voorwerpen gevonden van soldaten die deze bewaakten.'
          } else if (soortLower.includes('toren') || soortLower.includes('wachttoren')) {
            uitleg = 'Wachttorens werden gebruikt om de omgeving in de gaten te houden en vijandelijke bewegingen te signaleren.'
            vondsten = 'Bij torens worden soms persoonlijke voorwerpen van soldaten gevonden.'
          } else if (soortLower.includes('kazerne')) {
            uitleg = 'Een kazerne is een gebouw waar soldaten gelegerd waren. Hier woonden, aten en oefenden de troepen.'
            vondsten = 'Rond kazernes worden regelmatig knopen, gespen en andere persoonlijke voorwerpen gevonden.'
          }

          // Bouw popup HTML
          let html = `<strong class="text-stone-800">${typeTitel}</strong>`

          if (naam) {
            html += `<br/><span class="text-sm font-semibold text-stone-700">${naam}</span>`
          }
          if (linie) {
            html += `<br/><span class="text-sm text-blue-600">${linie}</span>`
          }
          if (periode) {
            html += `<br/><span class="text-xs text-gray-500">${periode}</span>`
          }

          // Wat zie je hier
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat zie je hier?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${uitleg}</div>`

          // Wat kun je hier vinden (als er specifieke info is)
          if (vondsten) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je hier vinden?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${vondsten}</div>`
          }

          // Meer weten
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer weten?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">`
          html += `<a href="https://erfgoedenlocatie.nl/linies-en-stellingen" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">RCE Linies en Stellingen</a>`
          html += `</div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Militaire Objecten WMS query failed:', error)
      }
      continue
    }

    // Verdedigingslinies (RCE Linies en Stellingen)
    if (title === 'Verdedigingslinies') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 100
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://services.rce.geovoorziening.nl/liniesenstellingen/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=linies&QUERY_LAYERS=linies&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          let html = `<strong class="text-amber-800">Verdedigingslinie</strong>`

          // Uitleg per bekende linie
          const linieInfo: Record<string, string> = {
            'Hollandse Waterlinie': 'Verdedigingsstelsel (1815-1940) dat gebruik maakte van inundaties om Holland te beschermen. UNESCO Werelderfgoed.',
            'Nieuwe Hollandse Waterlinie': 'Uitgebreide versie (1815-1940) met forten en inundatiegebieden van Muiden tot Gorinchem.',
            'Stelling van Amsterdam': 'Ringverdediging rond Amsterdam (1880-1920) met 42 forten. UNESCO Werelderfgoed.',
            'Grebbelinie': 'Verdedigingslinie langs de Grebbe (17e-20e eeuw). Zware gevechten in mei 1940.',
            'IJssellinie': 'Koude Oorlog verdediging (1950-1968) langs de IJssel tegen Sovjet-invasie.',
            'Atlantikwall': 'Duitse kustverdediging WOII (1942-1945) van Noorwegen tot Spanje.',
            'Peel-Raamstelling': 'Verdedigingslinie in Brabant/Limburg. Gevechten mei 1940.',
            'Maas-Waalstelling': 'Linie tussen Maas en Waal, onderdeel landsverdediging.',
            'Zuiderwaterlinie': 'Waterlinie in West-Brabant en Zeeland (17e-19e eeuw).',
            'Staats-Spaanse Linies': 'Vestingwerken uit de 80-jarige oorlog (1568-1648).'
          }

          const linieName = props.naam || props.lin_naam || ''
          if (linieName) {
            html += `<br/><span class="text-sm font-semibold text-amber-700">${linieName}</span>`
            // Zoek uitleg (partial match)
            const matchingInfo = Object.entries(linieInfo).find(([key]) =>
              linieName.toLowerCase().includes(key.toLowerCase()) ||
              key.toLowerCase().includes(linieName.toLowerCase())
            )
            if (matchingInfo) {
              html += `<br/><span class="text-sm text-gray-700">${matchingInfo[1]}</span>`
            }
          }
          if (props.lin_period) {
            html += `<br/><span class="text-xs text-purple-600">${props.lin_period}</span>`
          }
          if (props.status) {
            html += `<br/><span class="text-xs text-gray-400">${props.status}</span>`
          }

          results.push(html)
        }
      } catch (error) {
        console.warn('Verdedigingslinies WMS query failed:', error)
      }
      continue
    }

    // Rijksmonumenten (RCE)
    if (title === 'Rijksmonumenten') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 50
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://data.geo.cultureelerfgoed.nl/openbaar/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=rijksmonumentpunten&QUERY_LAYERS=rijksmonumentpunten&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          let html = `<strong class="text-red-800">Rijksmonument</strong>`

          if (props.cbsNaam || props.cbs_naam) {
            html += `<br/><span class="text-sm font-semibold">${props.cbsNaam || props.cbs_naam}</span>`
          }
          if (props.hoofdcategorie) {
            html += `<br/><span class="text-sm text-red-700">${props.hoofdcategorie}</span>`
          }
          if (props.subcategorie) {
            html += `<br/><span class="text-xs text-gray-600">${props.subcategorie}</span>`
          }
          if (props.rijksmonumentnummer) {
            html += `<br/><span class="text-xs text-gray-500">Nr: ${props.rijksmonumentnummer}</span>`
          }
          if (props.bouwjaar || props.oorspronkelijkebouwjaar) {
            html += `<br/><span class="text-xs text-gray-500">Bouwjaar: ${props.bouwjaar || props.oorspronkelijkebouwjaar}</span>`
          }

          // Meer weten - clickable links
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer weten?</span></div>`
          if (props.rijksmonumentnummer) {
            html += `<div class="text-sm text-gray-700 mt-1"><a href="https://monumentenregister.cultureelerfgoed.nl/monumenten/${props.rijksmonumentnummer}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Bekijk in Monumentenregister</a></div>`
          }
          html += `<div class="text-sm text-gray-700 mt-1"><a href="https://nl.wikipedia.org/wiki/Rijksmonument" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wikipedia: Rijksmonument</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Rijksmonumenten WMS query failed:', error)
      }
      continue
    }

    // Werelderfgoed (UNESCO)
    if (title === 'Werelderfgoed') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 500
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://service.pdok.nl/rce/ps-ch/wms/v1_0?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=PS.ProtectedSite&QUERY_LAYERS=PS.ProtectedSite&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          let html = `<strong class="text-cyan-800">UNESCO Werelderfgoed</strong>`

          if (props.siteName || props.naam) {
            html += `<br/><span class="text-sm font-semibold text-cyan-700">${props.siteName || props.naam}</span>`
          }
          if (props.siteDesignation) {
            html += `<br/><span class="text-xs text-gray-600">${props.siteDesignation}</span>`
          }

          results.push(html)
        }
      } catch (error) {
        console.warn('Werelderfgoed WMS query failed:', error)
      }
      continue
    }

    // Terpen (Friesland) - ArcGIS REST API + RCE cross-reference
    if (title === 'Terpen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)

        // ArcGIS REST query - Layer 66 = Terpen in PGR2 MapServer
        const terpUrl = `https://geoportaal.fryslan.nl/arcgis/rest/services/ProvinciaalGeoRegister/PGR2/MapServer/66/query?` +
          `geometry=${rd[0]},${rd[1]}&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects` +
          `&outFields=SOORT,SHAPE_Area&returnGeometry=false&f=json`

        const terpResponse = await fetch(terpUrl)
        const terpData = await terpResponse.json()

        if (terpData.features && terpData.features.length > 0) {
          const attrs = terpData.features[0].attributes
          const soort = attrs.SOORT || 'Terp'
          const oppervlak = attrs.SHAPE_Area ? Math.round(attrs.SHAPE_Area) : null

          // Cross-reference met RCE Rijksmonumenten voor naam
          let monumentNaam = ''
          let monumentNummer = ''
          let isRijksmonument = false
          try {
            const buffer = 100
            const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`
            const rceUrl = `https://service.pdok.nl/rce/ps-ch/wms/v1_0?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=PS.ProtectedSite&QUERY_LAYERS=PS.ProtectedSite&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`
            const rceResponse = await fetch(rceUrl)
            const rceData = await rceResponse.json()
            if (rceData.features && rceData.features.length > 0) {
              const rceProps = rceData.features[0].properties
              monumentNaam = rceProps.siteName || rceProps.naam || ''
              monumentNummer = rceProps.inspireId || rceProps.monumentnummer || ''
              isRijksmonument = true
            }
          } catch {
            // RCE query failed, continue without
          }

          // Header met naam indien beschikbaar
          let html = ''
          if (monumentNaam) {
            html = `<strong class="text-orange-800">${monumentNaam}</strong>`
            html += `<br/><span class="text-sm text-orange-600 font-medium">${soort}</span>`
          } else {
            html = `<strong class="text-orange-800">${soort}</strong>`
          }
          html += `<br/><span class="text-sm text-gray-600">Friese terp (woonheuvel)</span>`

          // Info afhankelijk van soort
          const soortInfo: Record<string, { uitleg: string; periode: string }> = {
            'terp': { uitleg: 'Een kunstmatige woonheuvel waar mensen woonden om droge voeten te houden.', periode: 'IJzertijd tot Middeleeuwen' },
            'afgegraven terp': { uitleg: 'Deze terp is deels of geheel afgegraven voor de vruchtbare grond (terpaarde).', periode: 'Oorspronkelijk IJzertijd-Middeleeuwen' },
            'terprestant': { uitleg: 'Hier lag ooit een terp, waarvan nu alleen nog resten over zijn.', periode: 'IJzertijd tot Middeleeuwen' },
            'deels afgegraven terp': { uitleg: 'Een deel van deze terp is afgegraven, een deel is nog intact.', periode: 'IJzertijd tot Middeleeuwen' },
            'verhoogd kerkhof': { uitleg: 'Een verhoogd kerkhof, vaak op een oude terplocatie gebouwd.', periode: 'Middeleeuwen' },
            'kerkterp': { uitleg: 'Een terp met daarop een kerk, vaak het centrum van een terpdorp.', periode: 'IJzertijd tot heden' }
          }

          const info = soortInfo[soort.toLowerCase()] || { uitleg: 'Een kunstmatige woonheuvel uit de tijd dat dit gebied vaak overstroomde.', periode: 'IJzertijd tot Middeleeuwen' }

          // B1 uitleg
          html += `<div class="mt-2 text-sm text-gray-700">${info.uitleg}</div>`
          html += `<br/><span class="text-sm text-gray-600">Periode: ${info.periode}</span>`

          // Oppervlak indien beschikbaar
          if (oppervlak && oppervlak > 100) {
            const ha = (oppervlak / 10000).toFixed(1)
            html += `<br/><span class="text-sm text-gray-500">Oppervlak: ${ha} hectare</span>`
          }

          // Rijksmonument badge
          if (isRijksmonument) {
            html += `<div class="mt-2 p-2 bg-orange-100 rounded text-xs text-orange-800">`
            html += `<strong>⚠️ Rijksmonument</strong> - Deze terp is wettelijk beschermd. Detecteren is niet toegestaan zonder vergunning.`
            if (monumentNummer) {
              html += `<br/>Monumentnummer: ${monumentNummer}`
            }
            html += `</div>`
          }

          // Detectietip
          html += `<div class="mt-2 p-2 bg-amber-50 rounded text-xs text-amber-800">`
          html += `<strong>Detectietip:</strong> `
          if (soort.toLowerCase().includes('afgegraven')) {
            html += `Afgegraven terpen zijn interessant! Bij het afgraven kwam materiaal aan de oppervlakte. Zoek op akkers rond de oude terplocatie.`
          } else {
            html += `Terpen zijn rijk aan vondsten: aardewerk, munten, fibulae, botten, gereedschap. De grond is vaak donker en vruchtbaar door eeuwenlange bewoning.`
          }
          html += `</div>`

          // Links
          html += `<div class="mt-3 space-y-1">`
          html += `<a href="https://www.terpenonderzoek.nl/" target="_blank" class="block text-blue-600 hover:underline text-sm">Terpenonderzoek.nl - Wetenschappelijk onderzoek</a>`
          html += `<a href="https://www.friesmuseum.nl/collectie/archeologie/" target="_blank" class="block text-blue-600 hover:underline text-sm">Fries Museum - Terpvondsten</a>`
          html += `<a href="https://nl.wikipedia.org/wiki/Terp" target="_blank" class="block text-blue-600 hover:underline text-sm">Wikipedia - Terpen</a>`
          if (monumentNaam) {
            const searchTerm = encodeURIComponent(monumentNaam + ' terp friesland')
            html += `<a href="https://www.google.com/search?q=${searchTerm}" target="_blank" class="block text-blue-600 hover:underline text-sm">Zoek meer over ${monumentNaam}</a>`
          }
          html += `</div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Terpen query failed:', error)
      }
      continue
    }

    // Religieus Erfgoed (RCE Landschapsatlas) - B1 stijl
    if (title === 'Religieus Erfgoed') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 50
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://services.rce.geovoorziening.nl/landschapsatlas_view/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=religieuserfgoed&QUERY_LAYERS=religieuserfgoed&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const naam = props.naam || props.NAAM || props.name || props.NAME || 'Onbekend'
          const denominatie = props.denominatie || props.DENOMINATIE || props.religie || ''
          const type = props.type || props.TYPE || props.functie || ''
          const bouwjaar = props.bouwjaar || props.BOUWJAAR || props.jaar || ''
          const gemeente = props.gemeente || props.GEMEENTE || props.plaats || ''

          let html = `<strong class="text-purple-800">${naam}</strong>`

          // Type en denominatie
          const typeLabel = type.toLowerCase()
          let typeUitleg = 'Een religieus gebouw of heilige plek.'
          let typeVondsten = 'Munten van kerkgangers, knopen, gespen, religieuze voorwerpen'

          if (typeLabel.includes('kerk') || typeLabel.includes('church')) {
            typeUitleg = 'Een kerk was het hart van de gemeenschap. Hier kwamen mensen samen voor diensten, maar ook voor belangrijke gebeurtenissen.'
            typeVondsten = 'Munten uit de collecte, knopen, gespen, pelgrimsinsignes, loden zegels'
          } else if (typeLabel.includes('kapel') || typeLabel.includes('chapel')) {
            typeUitleg = 'Een kapel is een klein gebedshuis, vaak bij een landgoed, langs een weg, of op een bijzondere plek.'
            typeVondsten = 'Devotionalia, munten, kruisjes, rozenkransen'
          } else if (typeLabel.includes('synagoge')) {
            typeUitleg = 'Een synagoge is een Joods gebedshuis. Veel synagogen in Nederland zijn verwoest of herbestemd na de Tweede Wereldoorlog.'
            typeVondsten = 'Munten, knopen, kleine religieuze voorwerpen'
          } else if (typeLabel.includes('klooster') || typeLabel.includes('monastery')) {
            typeUitleg = 'Een klooster was een woon- en werkplek voor monniken of nonnen. Veel kloosters hadden eigen werkplaatsen en landerijen.'
            typeVondsten = 'Religieuze voorwerpen, zegels, gereedschap, aardewerk, middeleeuwse munten'
          } else if (typeLabel.includes('toren') || typeLabel.includes('tower')) {
            typeUitleg = 'Een kerktoren of klokkentoren. Soms is alleen de toren nog over van een verdwenen kerk.'
            typeVondsten = 'Munten, knopen, bouwmateriaal'
          } else if (typeLabel.includes('begraafplaats') || typeLabel.includes('cemetery')) {
            typeUitleg = 'Een historische begraafplaats. Detecteren op begraafplaatsen is niet toegestaan zonder toestemming.'
            typeVondsten = 'Detecteren hier niet toegestaan'
          }

          // Denominatie (Rooms-Katholiek, Protestant, etc.)
          if (denominatie) {
            html += `<br/><span class="text-sm text-purple-600">${denominatie}</span>`
          }
          if (type) {
            html += `<br/><span class="text-sm text-gray-600">${type}</span>`
          }
          if (bouwjaar) {
            html += `<br/><span class="text-sm text-gray-500">Bouwjaar: ${bouwjaar}</span>`
          }
          if (gemeente) {
            html += `<br/><span class="text-xs text-gray-400">${gemeente}</span>`
          }

          // Wat zie je hier
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat zie je hier?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${typeUitleg}</div>`

          // Wat kun je hier vinden
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je hier vinden?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${typeVondsten}</div>`

          // Bezoeken
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Bezoeken</span></div>`
          if (typeLabel.includes('begraafplaats')) {
            html += `<div class="text-sm text-red-600 mt-1">Detecteren op begraafplaatsen is niet toegestaan. Respecteer de rust van de overledenen.</div>`
          } else {
            html += `<div class="text-sm text-gray-700 mt-1">Veel kerken en religieuze gebouwen zijn beschermd monument. Vraag altijd toestemming voordat je gaat detecteren op het terrein.</div>`
          }

          results.push(html)
        }
      } catch (error) {
        console.warn('Religieus Erfgoed WMS query failed:', error)
      }
      continue
    }

    // Gewaspercelen (BRP) - enriched with soil type from Bodemkaart
    if (title === 'Gewaspercelen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 50
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        // Query BRP and Bodemkaart in parallel
        const brpUrl = `https://service.pdok.nl/rvo/brpgewaspercelen/wms/v1_0?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=BrpGewas&QUERY_LAYERS=BrpGewas&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`
        const bodemUrl = `https://service.pdok.nl/bzk/bro-bodemkaart/wms/v1_0?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=soilarea&QUERY_LAYERS=soilarea&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const [brpResponse, bodemResponse] = await Promise.all([
          fetch(brpUrl),
          fetch(bodemUrl).catch(() => null) // Don't fail if bodem query fails
        ])

        const brpData = await brpResponse.json()

        if (brpData.features && brpData.features.length > 0) {
          const props = brpData.features[0].properties
          let html = `<strong class="text-green-800">Landbouwperceel</strong>`

          if (props.gewas || props.gewasnaam) {
            html += `<br/><span class="text-sm font-semibold text-green-700">${props.gewas || props.gewasnaam}</span>`
          }
          if (props.categorie || props.category) {
            html += `<br/><span class="text-xs text-gray-600">${props.categorie || props.category}</span>`
          }
          if (props.oppervlakte) {
            html += `<br/><span class="text-xs text-gray-500">${props.oppervlakte} ha</span>`
          }

          // Add soil type from Bodemkaart if available
          if (bodemResponse) {
            try {
              const bodemData = await bodemResponse.json()
              if (bodemData.features && bodemData.features.length > 0) {
                const bodemProps = bodemData.features[0].properties
                const soilName = bodemProps.first_soilname || bodemProps.soilname || bodemProps.bodemtype
                const soilCode = bodemProps.first_soilcode || bodemProps.soilcode || bodemProps.maparea_soilcode
                if (soilName) {
                  html += `<br/><span class="text-xs text-amber-700 font-medium">Grondsoort: ${soilName}</span>`
                  // Praktische uitleg toevoegen
                  const tips = getSoilExplanation(soilName, soilCode)
                  if (tips.length > 0) {
                    html += `<br/><span class="text-xs text-gray-500 italic">${tips.join(' · ')}</span>`
                  }
                }
              }
            } catch {
              // Ignore bodem parsing errors
            }
          }

          results.push(html)
        }
      } catch (error) {
        console.warn('BRP Gewaspercelen WMS query failed:', error)
      }
      continue
    }

    // Kadastrale Grenzen
    if (title === 'Kadastrale Grenzen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 20
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=Perceel&QUERY_LAYERS=Perceel&STYLES=&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties

          // Extract parcel info - try multiple field name variations
          const gemeente = props.kadastraleGemeenteWaarde || props.kadastrale_gemeente_waarde ||
                           props.kadastraleGemeente || KADASTRALE_GEMEENTEN[String(props.kadastraleGemeenteCode)] ||
                           props.kadastraleGemeenteCode
          const sectie = props.sectie || props.Sectie || ''
          const perceelnummer = props.perceelnummer || props.perceelNummer || props.Perceelnummer || ''
          const oppervlakte = props.kadastraleGrootteWaarde || props.kadastrale_grootte_waarde ||
                              props.kadastraleGrootte || props.oppervlakte

          // Get AKR gemeente code for kadastralekaart.com link (e.g., "VBG01", "AMF00", "APT00")
          // The code is in AKRKadastraleGemeenteCodeWaarde field from PDOK WMS
          const akrGemeenteCode = props.AKRKadastraleGemeenteCodeWaarde ||
                                  props.akrKadastraleGemeenteCodeWaarde ||
                                  ''

          // Build kadastrale aanduiding for display (e.g., "Voorburg E 7139")
          const aanduiding = [gemeente, sectie, perceelnummer].filter(Boolean).join(' ')

          // Build perceelnummer for kadastralekaart.com (e.g., "VBG01-E-7139")
          const perceelId = akrGemeenteCode && sectie && perceelnummer
            ? `${akrGemeenteCode}-${sectie}-${perceelnummer}`
            : ''

          let html = `<strong class="text-indigo-800">Kadastraal Perceel</strong>`

          if (aanduiding) {
            html += `<br/><span class="text-sm text-indigo-700">${aanduiding}</span>`
          }

          // Show perceelId prominently - this is what users need to copy for Kadaster search
          if (perceelId) {
            html += `<br/><span class="text-sm font-bold text-gray-800 font-mono">${perceelId}</span>`
          }

          if (oppervlakte) {
            const opp = typeof oppervlakte === 'number' ? oppervlakte : parseFloat(oppervlakte)
            if (!isNaN(opp)) {
              html += `<br/><span class="text-xs text-gray-600">${opp.toLocaleString('nl-NL')} m²</span>`
            }
          }

          // Eigenaar opzoeken uitleg met link naar Kadaster winkel
          html += `<br/><br/><span class="text-xs text-gray-600">Eigenaar opzoeken? Kopieer bovenstaande code, ga naar </span><a href="https://www.kadaster.nl/winkel" target="_blank" rel="noopener" class="text-xs text-blue-600 hover:underline">kadaster.nl/winkel</a><span class="text-xs text-gray-600"> en klik "Zoek op aanduiding"</span><span class="text-xs text-gray-400"> (betaalde dienst)</span>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Kadastrale Grenzen WMS query failed:', error)
      }
      continue
    }

    // === PROVINCIALE WAARDENKAARTEN ===

    // Zuid-Holland: Scheepswrakken - uitgebreide B1 info
    if (title === 'Scheepswrakken') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 100
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geodata.zuid-holland.nl/geoserver/cultuur/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=CHS_2015_ARCHEOLOGIE_SCHEEPSRESTANTEN&QUERY_LAYERS=CHS_2015_ARCHEOLOGIE_SCHEEPSRESTANTEN&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const wrakNaam = props.naam || props.NAAM || 'Scheepswrak'
          let html = `<strong class="text-cyan-800">${wrakNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Historisch scheepswrak in Zuid-Holland</span>`

          // B1 uitleg
          html += `<div class="mt-2 text-sm text-gray-700">`
          html += `Op deze plek ligt een oud scheepswrak. Dit is een schip dat lang geleden is gezonken. `
          html += `In de bodem kunnen nog resten van het schip en de lading liggen.`
          html += `</div>`

          if (props.type || props.TYPE) {
            html += `<br/><span class="text-sm text-cyan-700">Type: ${props.type || props.TYPE}</span>`
          }
          if (props.datering || props.DATERING) {
            html += `<br/><span class="text-sm text-gray-600">Periode: ${props.datering || props.DATERING}</span>`
          }
          if (props.bron || props.BRON) {
            html += `<br/><span class="text-xs text-gray-500">Bron: ${props.bron || props.BRON}</span>`
          }

          // Detectietip
          html += `<div class="mt-2 p-2 bg-cyan-50 rounded text-xs text-cyan-800">`
          html += `<strong>Detectietip:</strong> Bij scheepswrakken kun je bijzondere vondsten doen zoals scheepsonderdelen, munten, gereedschap en lading. Let op: vaak is een vergunning nodig.`
          html += `</div>`

          // Link naar erfgoed
          html += `<div class="mt-2"><a href="https://www.zuid-holland.nl/onderwerpen/cultuur-erfgoed/" target="_blank" class="text-blue-600 hover:underline text-sm">Meer over erfgoed Zuid-Holland</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Scheepswrakken WMS query failed:', error)
      }
      continue
    }

    // Zuid-Holland: Woonheuvels - uitgebreide B1 info
    if (title === 'Woonheuvels ZH') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 100
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geodata.zuid-holland.nl/geoserver/cultuur/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=CHS_2015_ARCHEOLOGIE_WOONHEUVEL&QUERY_LAYERS=CHS_2015_ARCHEOLOGIE_WOONHEUVEL&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const heuvelNaam = props.naam || props.NAAM || 'Woonheuvel'
          let html = `<strong class="text-orange-800">${heuvelNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Historische woonheuvel (terp)</span>`

          // B1 uitleg
          html += `<div class="mt-2 text-sm text-gray-700">`
          html += `Een woonheuvel is een door mensen opgeworpen heuvel. Mensen woonden hierop om droge voeten te houden bij hoog water. `
          html += `Deze heuvels werden steeds hoger gemaakt. Je vindt ze vooral in laaggelegen gebieden.`
          html += `</div>`

          if (props.type || props.TYPE) {
            html += `<br/><span class="text-sm text-orange-700">Type: ${props.type || props.TYPE}</span>`
          }

          // Detectietip
          html += `<div class="mt-2 p-2 bg-orange-50 rounded text-xs text-orange-800">`
          html += `<strong>Detectietip:</strong> Woonheuvels zijn rijk aan vondsten! Denk aan aardewerk, munten, sieraden en huisraad uit de middeleeuwen. De grond bevat vaak veel materiaal.`
          html += `</div>`

          // Link naar erfgoed
          html += `<div class="mt-2"><a href="https://www.zuid-holland.nl/onderwerpen/cultuur-erfgoed/" target="_blank" class="text-blue-600 hover:underline text-sm">Meer over erfgoed Zuid-Holland</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Woonheuvels WMS query failed:', error)
      }
      continue
    }

    // Zuid-Holland: Romeinse Forten - uitgebreide B1 info
    if (title === 'Romeinse Forten') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 200
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geodata.zuid-holland.nl/geoserver/cultuur/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=CHS_2015_ARCHEOLOGIE_ROMEINSFORT&QUERY_LAYERS=CHS_2015_ARCHEOLOGIE_ROMEINSFORT&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const fortNaam = props.naam || props.NAAM || 'Romeins Fort'
          let html = `<strong class="text-red-800">${fortNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Romeins militair fort (castellum)</span>`

          // B1 uitleg
          html += `<div class="mt-2 text-sm text-gray-700">`
          html += `Dit was een Romeins legerfort. De Romeinen bouwden deze forten langs de Rijn, de grens van hun rijk. `
          html += `Soldaten woonden hier en bewaakten de grens. Deze forten zijn ongeveer 2000 jaar oud.`
          html += `</div>`

          if (props.type || props.TYPE) {
            html += `<br/><span class="text-sm text-red-700">Type: ${props.type || props.TYPE}</span>`
          }
          if (props.periode || props.PERIODE) {
            html += `<br/><span class="text-sm text-gray-600">Periode: ${props.periode || props.PERIODE}</span>`
          }

          // Detectietip
          html += `<div class="mt-2 p-2 bg-red-50 rounded text-xs text-red-800">`
          html += `<strong>Detectietip:</strong> Romeinse forten zijn toplocaties! Je kunt hier Romeinse munten, fibulae (mantelspelden), militaire uitrusting en aardewerk vinden. Vaak beschermd, check de regels!`
          html += `</div>`

          // Link naar Limes
          html += `<div class="mt-2"><a href="https://www.limesworld.nl/" target="_blank" class="text-blue-600 hover:underline text-sm">Meer over de Romeinse Limes</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Romeinse Forten WMS query failed:', error)
      }
      continue
    }

    // Zuid-Holland: Windmolens - uitgebreide B1 info
    if (title === 'Windmolens') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 50
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geodata.zuid-holland.nl/geoserver/cultuur/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=CHS_2015_NEDERZETTING_WINDMOLENS&QUERY_LAYERS=CHS_2015_NEDERZETTING_WINDMOLENS&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const molenNaam = props.naam || props.NAAM || 'Windmolen'
          let html = `<strong class="text-amber-800">${molenNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Historische windmolen</span>`

          // B1 uitleg
          html += `<div class="mt-2 text-sm text-gray-700">`
          html += `Windmolens gebruikten de kracht van de wind. Ze maalden graan tot meel of pompten water weg uit polders. `
          html += `Nederland heeft veel molens omdat we laaggelegen land droog moesten houden.`
          html += `</div>`

          if (props.type || props.TYPE || props.functie || props.FUNCTIE) {
            const functie = props.functie || props.FUNCTIE || props.type || props.TYPE
            html += `<br/><span class="text-sm text-amber-700">Functie: ${functie}</span>`
          }
          if (props.bouwjaar || props.BOUWJAAR) {
            html += `<br/><span class="text-sm text-gray-600">Bouwjaar: ${props.bouwjaar || props.BOUWJAAR}</span>`
          }

          // Detectietip
          html += `<div class="mt-2 p-2 bg-amber-50 rounded text-xs text-amber-800">`
          html += `<strong>Detectietip:</strong> Bij molens vind je vaak voorwerpen van de molenaar en bezoekers: munten, knopen, gereedschap. Ook de grond rond verdwenen molens kan interessant zijn.`
          html += `</div>`

          // Link naar molens
          html += `<div class="mt-2"><a href="https://www.molendatabase.nl/" target="_blank" class="text-blue-600 hover:underline text-sm">Meer over Nederlandse molens</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Windmolens WMS query failed:', error)
      }
      continue
    }

    // Zuid-Holland: Erfgoedlijnen - uitgebreide B1 info
    if (title === 'Erfgoedlijnen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 200
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geodata.zuid-holland.nl/geoserver/cultuur/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=CHS_ERFGOEDLIJN_HOOFDSTRUCTUUR&QUERY_LAYERS=CHS_ERFGOEDLIJN_HOOFDSTRUCTUUR&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const lijnNaam = props.naam || props.NAAM || props.erfgoedlijn || 'Erfgoedlijn'
          let html = `<strong class="text-purple-800">${lijnNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Historische lijn in het landschap</span>`

          // B1 uitleg
          html += `<div class="mt-2 text-sm text-gray-700">`
          html += `Een erfgoedlijn is een route of lijn met veel geschiedenis. Dit kunnen oude dijken, wegen, kanalen of verdedigingslinies zijn. `
          html += `Langs deze lijnen vind je vaak bijzondere plekken.`
          html += `</div>`

          if (props.type || props.TYPE) {
            html += `<br/><span class="text-sm text-purple-700">Type: ${props.type || props.TYPE}</span>`
          }
          if (props.omschrijving || props.OMSCHRIJVING) {
            html += `<br/><span class="text-sm text-gray-600">${props.omschrijving || props.OMSCHRIJVING}</span>`
          }

          // Detectietip
          html += `<div class="mt-2 p-2 bg-purple-50 rounded text-xs text-purple-800">`
          html += `<strong>Detectietip:</strong> Erfgoedlijnen volgen oude routes waar mensen langskwamen. Denk aan munten, knopen, gespen en andere verloren voorwerpen. Dijken en wegen zijn vaak interessant.`
          html += `</div>`

          // Link naar erfgoedlijnen
          html += `<div class="mt-2"><a href="https://www.erfgoedlijnen.nl/" target="_blank" class="text-blue-600 hover:underline text-sm">Meer over Erfgoedlijnen</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Erfgoedlijnen WMS query failed:', error)
      }
      continue
    }

    // Zuid-Holland: Oude Kernen - uitgebreide B1 info
    if (title === 'Oude Kernen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 200
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geodata.zuid-holland.nl/geoserver/cultuur/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=CHS_2015_ARCHEOLOGIE_KERNEN&QUERY_LAYERS=CHS_2015_ARCHEOLOGIE_KERNEN&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const kernNaam = props.naam || props.NAAM || 'Historische Kern'
          let html = `<strong class="text-stone-800">${kernNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Oude dorps- of stadskern</span>`

          // B1 uitleg
          html += `<div class="mt-2 text-sm text-gray-700">`
          html += `Dit is het oude centrum van een dorp of stad. Hier woonden en werkten mensen al honderden jaren geleden. `
          html += `De grond bevat vaak veel sporen van het verleden.`
          html += `</div>`

          if (props.type || props.TYPE) {
            html += `<br/><span class="text-sm text-stone-700">Type: ${props.type || props.TYPE}</span>`
          }
          if (props.periode || props.PERIODE) {
            html += `<br/><span class="text-sm text-gray-600">Periode: ${props.periode || props.PERIODE}</span>`
          }

          // Detectietip
          html += `<div class="mt-2 p-2 bg-stone-100 rounded text-xs text-stone-800">`
          html += `<strong>Detectietip:</strong> Oude kernen zijn rijk aan vondsten! Munten, knopen, sieraden, gereedschap en huisraad. Let op: detecteren is vaak niet toegestaan in beschermde kernen.`
          html += `</div>`

          // Link naar erfgoed
          html += `<div class="mt-2"><a href="https://www.zuid-holland.nl/onderwerpen/cultuur-erfgoed/" target="_blank" class="text-blue-600 hover:underline text-sm">Meer over erfgoed Zuid-Holland</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Oude Kernen WMS query failed:', error)
      }
      continue
    }

    // Gelderland: Relictenkaart Punten - uitgebreide B1 info
    if (title === 'Relictenkaart Punten') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 50
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geoserver.gelderland.nl/geoserver/ngr_a/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=ChAr_Relictenkaart_p&QUERY_LAYERS=ChAr_Relictenkaart_p&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties

          // Uitgebreide type codes met B1 uitleg
          const typeInfo: Record<string, { naam: string, uitleg: string }> = {
            'KV': { naam: 'Kasteel of Vesting', uitleg: 'Een versterkt gebouw uit de middeleeuwen. Vaak zijn er nog resten in de grond.' },
            'K': { naam: 'Kapel', uitleg: 'Een klein kerkgebouw. Rond kapellen worden vaak religieuze voorwerpen gevonden.' },
            'KE': { naam: 'Kerkhof', uitleg: 'Historische begraafplaats. Respecteer deze plek en vraag altijd toestemming.' },
            'B': { naam: 'Buitenhuis', uitleg: 'Een landhuis van welgestelde families. Vaak met tuinen en bijgebouwen.' },
            'OB': { naam: 'Oud Bebouwingsrelict', uitleg: 'Resten van oude bebouwing. Hier stonden ooit huizen of boerderijen.' },
            'OV': { naam: 'Oude Verkaveling', uitleg: 'Historisch patroon van akkers en weilanden uit vroeger tijden.' },
            'NR': { naam: 'Nijverheidsrelict', uitleg: 'Plek waar vroeger ambacht of industrie was, zoals smederijen of molens.' },
            'GH': { naam: 'Grafheuvel', uitleg: 'Prehistorische begraafplaats. Beschermd monument - niet detecteren!' },
            'BP': { naam: 'Begraafplaats', uitleg: 'Historische begraafplaats. Respecteer deze plek.' },
            'HH': { naam: 'Havezate', uitleg: 'Adellijk huis met landerijen. Interessant voor middeleeuwse vondsten.' },
            'RM': { naam: 'Rosmolen', uitleg: 'Molen aangedreven door paarden. Zeldzaam cultuurhistorisch object.' },
            'WM': { naam: 'Windmolen', uitleg: 'Historische windmolen. Vaak zijn funderingen nog zichtbaar.' },
            'PM': { naam: 'Poldermolen', uitleg: 'Molen voor waterbeheer. Belangrijk voor de waterhuishouding.' },
            'EK': { naam: 'Eendenkooi', uitleg: 'Plek om wilde eenden te vangen. Bijzonder cultuurlandschap.' },
            'SH': { naam: 'Scholtenhoeve', uitleg: 'Boerderij van een welgestelde boer. Vaak eeuwenoud.' },
            'SL': { naam: 'Slot', uitleg: 'Versterkt kasteel of adellijke woning.' },
            'MO': { naam: 'Motte', uitleg: 'Vroegmiddeleeuwse kasteelberg. Zeer interessant voor detectie.' },
            'BR': { naam: 'Borg', uitleg: 'Versterkte adellijke woning, typisch voor het noorden.' }
          }

          const typeCode = props.type?.replace(/[0-9]/g, '') || ''
          const info = typeInfo[typeCode] || { naam: props.type || 'Cultuurhistorisch object', uitleg: 'Een historisch relict in het Gelderse landschap.' }

          let html = `<strong class="text-emerald-800">${info.naam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Gelders cultuurhistorisch relict</span>`

          if (props.streek) {
            html += `<br/><span class="text-sm text-gray-600">Streek: ${props.streek}</span>`
          }

          // B1 uitleg
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is dit?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${info.uitleg}</div>`

          // Link naar Gelderland erfgoed
          html += `<div class="mt-3"><a href="https://www.gelderland.nl/erfgoed" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-sm">Meer over Gelders erfgoed</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Relictenkaart Punten WMS query failed:', error)
      }
      continue
    }

    // Gelderland: Relictenkaart Lijnen - uitgebreide B1 info
    if (title === 'Relictenkaart Lijnen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 50
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geoserver.gelderland.nl/geoserver/ngr_a/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=ChAr_Relictenkaart_l&QUERY_LAYERS=ChAr_Relictenkaart_l&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties

          // Uitgebreide klasse info met B1 uitleg
          const klasseInfo: Record<number, { naam: string, uitleg: string }> = {
            1: { naam: 'Sprengenbeek', uitleg: 'Kunstmatig aangelegde beek voor waterkracht. Vaak bij papiermolens.' },
            2: { naam: 'Oude waterloop', uitleg: 'Historische beek of rivier. Langs waterlopen vind je vaak oude bewoningssporen.' },
            3: { naam: 'Doorgaande weg', uitleg: 'Eeuwenoude handelsroute. Langs deze wegen gingen reizigers en handelaren.' },
            4: { naam: 'Hessenweg', uitleg: 'Historische handelsweg naar Duitsland. Gebruikt door marskramers en kooplieden.' },
            5: { naam: 'Oude weg', uitleg: 'Historische route door het landschap. Vaak al eeuwen in gebruik.' },
            6: { naam: 'Historische grens', uitleg: 'Oude eigendoms- of gebiedsgrens. Soms gemarkeerd met grenspalen.' },
            7: { naam: 'Trekpad', uitleg: 'Pad langs een kanaal waar paarden schepen trokken.' },
            8: { naam: 'Jaagpad', uitleg: 'Pad langs water voor scheepvaart met paardentractie.' }
          }

          const info = klasseInfo[props.klasse] || { naam: `Historisch lijnrelict`, uitleg: 'Een lijnvormig historisch element in het landschap.' }

          let html = `<strong class="text-teal-800">${info.naam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Gelders lijnrelict</span>`

          // B1 uitleg
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is dit?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${info.uitleg}</div>`

          // Tip voor detectie
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Tip</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">Langs oude wegen en waterlopen worden vaak vondsten gedaan. Mensen verloren er munten en voorwerpen.</div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Relictenkaart Lijnen WMS query failed:', error)
      }
      continue
    }

    // Gelderland: Relictenkaart Vlakken - uitgebreide B1 info
    if (title === 'Relictenkaart Vlakken') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 100
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://geoserver.gelderland.nl/geoserver/ngr_a/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=ChAr_Relictenkaart_v&QUERY_LAYERS=ChAr_Relictenkaart_v&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties

          // Uitgebreide klasse info met B1 uitleg
          const klasseInfo: Record<number, { naam: string, uitleg: string }> = {
            1: { naam: 'Oud agrarisch land', uitleg: 'Gebied dat al voor 1850 als landbouwgrond werd gebruikt. Rijk aan geschiedenis.' },
            2: { naam: 'Jonge heideontginning', uitleg: 'Heide die tussen 1850 en 1950 is ontgonnen voor landbouw.' },
            3: { naam: 'Open essencomplex', uitleg: 'Historische akkers op hoge grond. Vaak eeuwenoud en rijk aan vondsten.' },
            4: { naam: 'Kampenlandschap', uitleg: 'Landschap met kleine akkers omringd door houtwallen. Typisch voor Oost-Nederland.' },
            5: { naam: 'Heiderelict', uitleg: 'Restant van het vroegere uitgestrekte heidelandschap. Vaak prehistorische vondsten.' },
            6: { naam: 'Oud bosrelict', uitleg: 'Bos dat al in 1850 bestond. Oude bossen bevatten vaak cultuurhistorische resten.' },
            7: { naam: 'Stuifzandrelict', uitleg: 'Overblijfsel van actief stuifzand. Vaak bij grafheuvels en prehistorische sites.' },
            8: { naam: 'Oud bouwland', uitleg: 'Historische akkergrond. Boeren hebben hier eeuwenlang gewerkt.' },
            9: { naam: 'Historisch grasland', uitleg: 'Oud weiland of hooiland. Vaak bij boerderijen en dorpen.' },
            10: { naam: 'Beekdal', uitleg: 'Laagte langs een beek. Mensen woonden graag bij water.' }
          }

          const info = klasseInfo[props.klasse] || { naam: `Historisch landschap`, uitleg: 'Een waardevol cultuurlandschap in Gelderland.' }

          let html = `<strong class="text-lime-800">${info.naam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Gelders landschapsrelict</span>`

          if (props.st_area_shape_) {
            const ha = (props.st_area_shape_ / 10000).toFixed(1)
            html += `<br/><span class="text-sm text-gray-600">${ha} hectare</span>`
          }

          // B1 uitleg
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is dit?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${info.uitleg}</div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Relictenkaart Vlakken WMS query failed:', error)
      }
      continue
    }

    // Zeeland: Verdronken Dorpen - uitgebreide B1 info
    if (title === 'Verdronken Dorpen') {
      try {
        const lonLat = toLonLat(coordinate)
        const rd = proj4('EPSG:4326', 'EPSG:28992', lonLat)
        const buffer = 200
        const bbox = `${rd[0]-buffer},${rd[1]-buffer},${rd[0]+buffer},${rd[1]+buffer}`

        const url = `https://opengeodata.zeeland.nl/geoserver/chs/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=geocmd_vrddrppnt&QUERY_LAYERS=geocmd_vrddrppnt&INFO_FORMAT=application/json&I=50&J=50&WIDTH=100&HEIGHT=100&CRS=EPSG:28992&BBOX=${bbox}`

        const response = await fetch(url)
        const data = await response.json()

        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties
          const dorpNaam = props.naam || props.NAAM || 'Verdronken dorp'
          let html = `<strong class="text-blue-800">${dorpNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Verdronken dorp in Zeeland</span>`

          // B1 uitleg
          html += `<div class="mt-2 text-sm text-gray-700">`
          html += `Dit dorp is lang geleden door de zee verzwolgen. Bij stormvloeden brak de zeedijk door en liep het land onder water. `
          html += `De mensen vluchtten, maar hun huizen en bezittingen bleven achter. In de bodem liggen nog resten van dit dorp.`
          html += `</div>`

          if (props.verdronken || props.VERDRONKEN || props.jaar || props.JAAR) {
            html += `<br/><span class="text-sm text-blue-700">Verdronken in: ${props.verdronken || props.VERDRONKEN || props.jaar || props.JAAR}</span>`
          }
          if (props.gemeente || props.GEMEENTE) {
            html += `<br/><span class="text-sm text-gray-600">Gemeente: ${props.gemeente || props.GEMEENTE}</span>`
          }
          if (props.bron || props.BRON) {
            html += `<br/><span class="text-xs text-gray-500">Bron: ${props.bron || props.BRON}</span>`
          }

          // Detectietip
          html += `<div class="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">`
          html += `<strong>Detectietip:</strong> Verdronken dorpen bevatten veel vondsten! Aardewerk, munten, sieraden, gereedschap en huisraad. Bij laag water komen soms stukken vrij. Let op getijden en veiligheid!`
          html += `</div>`

          // Link naar Zeeuws erfgoed
          html += `<div class="mt-2"><a href="https://www.verdronkengeschiedenis.nl/" target="_blank" class="text-blue-600 hover:underline text-sm">Meer over verdronken dorpen</a></div>`

          results.push(html)
        }
      } catch (error) {
        console.warn('Verdronken Dorpen WMS query failed:', error)
      }
      continue
    }

    // Scanned 1:50,000 geology is not queryable: request formation attributes from
    // the BRGM harmonised vector service (same map coordinate).
    // Geologie wordt hierboven één keer per tik afgehandeld.
    if (GEOLOGY_TITLES.has(title)) continue

    const url = source.getFeatureInfoUrl(
      coordinate,
      viewResolution,
      'EPSG:3857',
      { 'INFO_FORMAT': 'application/json' }
    )

    if (!url) continue

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.features && data.features.length > 0) {
        const props = data.features[0].properties

        if (title === 'Oude bossen · Forêts anciennes') {
          results.push(formatAncientForestPopup(props))
          continue
        }

        if (title === 'OCS GE landbedekking 2021-2023') {
          const coverageCode = String(props.code_cs ?? '').trim()
          const usageCode = String(props.code_us ?? '').trim()
          const area = formatOcsArea(props.aire)
          const artificialisation = describeOcsArtificialisation(props.artif)
          let html = `<strong class="text-green-800">OCS GE landbedekking</strong>`
          html += `<br/><span class="text-sm text-green-700"><strong>Bodembedekking:</strong> ${describeOcsCoverage(coverageCode)}</span>`
          html += `<br/><span class="text-sm text-gray-700"><strong>Gebruik:</strong> ${describeOcsUsage(usageCode)}</span>`
          if (coverageCode || usageCode) {
            html += `<br/><span class="text-xs text-gray-500">Broncodes: ${[coverageCode, usageCode].filter(Boolean).join(' · ')}</span>`
          }
          if (props.millesime) html += `<br/><span class="text-xs text-gray-500">Peiljaar: ${props.millesime}</span>`
          if (area) html += `<br/><span class="text-xs text-gray-500">Oppervlakte kaartvlak: ${area}</span>`
          if (artificialisation) html += `<br/><span class="text-xs text-gray-500">${artificialisation}</span>`
          html += `<div class="mt-2 text-xs text-gray-500">Bron: IGN OCS GE. De kaart beschrijft huidig bodemgebruik; dit is geen archeologische waardering.</div>`
          results.push(html)
          continue
        }

        // AHN 0.5m specific handling - show height in meters NAP
        if (title === 'AHN 0.5m') {
          let html = `<strong class="text-blue-800">AHN Hoogtekaart</strong>`

          // Try various property name patterns for height value (value_list is most common)
          const heightRaw = props.value_list ?? props.GRAY_INDEX ?? props.value ?? props.gray_index ??
                         props.dtm_05m ?? props.DTM_05M ?? props.hoogte ?? props.HOOGTE ??
                         props.elevation ?? props.ELEVATION

          if (heightRaw !== undefined && heightRaw !== null && !isNaN(Number(heightRaw))) {
            const heightValue = typeof heightRaw === 'number' ? heightRaw.toFixed(2) : Number(heightRaw).toFixed(2)
            html += `<br/><span class="text-sm text-blue-700">Hoogte: ${heightValue} m NAP</span>`
            results.push(html)
          } else {
            // Fallback: show all properties
            let hasContent = false
            const skipKeys = ['geometry', 'id', 'fid', 'gml_id', 'bbox']
            for (const [key, value] of Object.entries(props)) {
              if (!skipKeys.includes(key.toLowerCase()) && value !== null && value !== '') {
                html += `<br/><span class="text-xs text-gray-600">${key}: ${value}</span>`
                hasContent = true
              }
            }
            if (hasContent) {
              results.push(html)
            }
          }
          continue
        }

        // Geomorfologie specific handling - clean output
        if (title === 'Geomorfologie') {
          let html = `<strong class="text-green-800">Geomorfologie</strong>`
          let hasContent = false

          // Actual property names from PDOK BRO Geomorfologie WMS
          const landformType = props.landformSubgroupDescription ?? props.landform_subgroup_description
          const reliefKlasse = props.reliefKlasse ?? props.relief_klasse
          const reliefSubklasse = props.reliefSubklasse ?? props.relief_subklasse
          const slope = props.helling ?? props.slope
          const genese = props.geneseDescription ?? props.genese_description
          const activeProcess = props.activeProcess ?? props.active_process

          // Main landform type (e.g. "Dekzandruggen en -koppen")
          if (landformType) {
            html += `<br/><span class="text-sm text-green-700">${landformType}</span>`
            hasContent = true
          }
          // Relief info
          if (reliefKlasse) {
            const reliefText = reliefSubklasse && reliefSubklasse !== reliefKlasse
              ? `${reliefKlasse} (${reliefSubklasse})`
              : reliefKlasse
            html += `<br/><span class="text-xs text-gray-600">Relief: ${reliefText}</span>`
            hasContent = true
          }
          if (slope) {
            html += `<br/><span class="text-xs text-gray-600">Helling: ${slope}</span>`
            hasContent = true
          }
          // Genesis (origin, e.g. "eolisch")
          if (genese) {
            html += `<br/><span class="text-xs text-gray-500">Ontstaan: ${genese}</span>`
            hasContent = true
          }
          // Active process
          if (activeProcess && activeProcess !== 'onbekend') {
            html += `<br/><span class="text-xs text-gray-500">Actief proces: ${activeProcess}</span>`
            hasContent = true
          }

          // Fallback: show all properties if no specific ones found
          if (!hasContent) {
            const skipKeys = ['geometry', 'id', 'fid', 'gml_id', 'bbox', 'fuuid', 'geom', 'collection_id']
            for (const [key, value] of Object.entries(props)) {
              if (!skipKeys.includes(key.toLowerCase()) && value !== null && value !== '' && !key.includes('validfrom') && !key.includes('validto')) {
                html += `<br/><span class="text-xs text-gray-600">${key}: ${value}</span>`
              }
            }
          }

          // Link naar WUR legenda
          html += `<br/><a href="https://legendageomorfologie.wur.nl/" target="_blank" rel="noopener" class="text-xs text-blue-600 hover:underline">Meer over geomorfologie</a>`

          results.push(html)
          continue
        }

        let html = `<strong>${title}</strong>`

        // Bodemkaart specific fields
        const soilName = props.first_soilname || props.soilname
        const soilCode = props.soilcode || props.first_soilcode
        if (soilName) {
          html += `<br/><span class="text-sm text-amber-700">${soilName}</span>`
          // Praktische uitleg toevoegen (geen externe links meer nodig)
          if (title === 'Bodemkaart') {
            const tips = getSoilExplanation(soilName, soilCode)
            if (tips.length > 0) {
              html += `<br/><span class="text-xs text-gray-500 italic">${tips.join(' · ')}</span>`
            }
          }
        }
        if (props.soilslope && props.soilslope !== 'Niet opgenomen') {
          html += `<br/><span class="text-xs text-gray-500">Helling: ${props.soilslope}</span>`
        }

        // Generic fallback for other properties
        if (!soilName) {
          const skipKeys = ['geometry', 'id', 'fid', 'gml_id', 'GRAY_INDEX', 'gray_index', 'value']
          for (const [key, value] of Object.entries(props)) {
            if (!skipKeys.includes(key) && value && value !== 'Niet opgenomen') {
              html += `<br/><span class="text-xs text-gray-600">${key}: ${value}</span>`
            }
          }
        }

        results.push(html)
      }
    } catch (error) {
      console.warn('WMS GetFeatureInfo failed:', error)
    }
    }

    return results
  }))

  return layerResults.flat()
}
