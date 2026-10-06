import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { List, MapPin, Search, SlidersHorizontal, ChevronRight, Pencil, ArrowLeft, X } from 'lucide-react'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'
import { fromLonLat, transformExtent } from 'ol/proj'
import { useUIStore } from '../../store/uiStore'
import { usePresetStore } from '../../store/presetStore'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { useCustomPointLayerStore, type PointStatus } from '../../store/customPointLayerStore'
import { useGPSStore } from '../../store/gpsStore'
import { useLayerStore } from '../../store/layerStore'
import { useMapStore } from '../../store/mapStore'
import { buildPersonalPlaceSources, collectPlaces, distanceToPlace, filterPlaces, getScopedSources, placeResearchMetadata, placeSourceUrl, type PlaceListScope } from '../../utils/placeList'
import { getThediracPlaceSources } from '../../utils/thediracPlaceSources'
import { formatImportedLayerPopup } from '../../utils/importedLayerPopup'
import { sanitizePopupHtml } from '../../utils/safePopupHtml'
import { AppWindow } from '../UI/AppWindow'
import { BuddyWriteStatus } from '../CustomPoints/BuddyWriteStatus'
import './place-list.css'

type Draft = {name: string; category: string; notes: string; phone: string; url: string; status: PointStatus}
const PAGE_SIZE = 80
const statusLabels = {todo: 'Te bezoeken', completed: 'Bezocht', skipped: 'Overgeslagen'}
function formatDistance(km: number | null) {
  if (km === null) return ''
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toLocaleString('nl-NL', {maximumFractionDigits: 1})} km`
}

// Keep the large catalog out of startup; retain the session only after the first opening.
export function PlaceList() {
  const isOpen = useUIStore(s => s.activeWindow === 'placeList')
  const [visited, setVisited] = useState(false)
  useEffect(() => {if (isOpen) setVisited(true)}, [isOpen])
  return isOpen || visited ? <PlaceListSession /> : null
}
function PlaceListSession() {
  const isOpen = useUIStore(s => s.activeWindow === 'placeList')
  const activeWindow = useUIStore(s => s.activeWindow)
  const scope = useUIStore(s => s.placeListScope)
  const request = useUIStore(s => s.placeListRequest)
  const openPlaceList = useUIStore(s => s.openPlaceList)
  const closeWindow = useUIStore(s => s.closeWindow)
  const pointLayers = useCustomPointLayerStore(s => s.layers)
  const importedLayers = useCustomLayerStore(s => s.layers)
  const presets = usePresetStore(s => s.presets)
  const visible = useLayerStore(s => s.visible)
  const gps = useGPSStore(s => s.position)
  const map = useMapStore(s => s.map)
  const personalSources = useMemo(() => buildPersonalPlaceSources(pointLayers, []), [pointLayers])
  const importSources = useMemo(() => buildPersonalPlaceSources([], importedLayers), [importedLayers])
  const sources = useMemo(() => [...personalSources, ...importSources, ...getThediracPlaceSources(visible)], [personalSources, importSources, visible])
  const scopedSources = useMemo(() => getScopedSources(sources, scope, presets), [sources, scope, presets])
  const entries = useMemo(() => collectPlaces(scopedSources), [scopedSources])
  const [query, setQuery] = useState('')
  const [layer, setLayer] = useState('')
  const [category, setCategory] = useState('')
  const [period, setPeriod] = useState('')
  const [evidence, setEvidence] = useState('')
  const [precision, setPrecision] = useState('')
  const [sort, setSort] = useState<'name' | 'distance' | 'latest'>('name')
  const [onlyMap, setOnlyMap] = useState(false)
  const [extent, setExtent] = useState<number[] | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mapPreview, setMapPreview] = useState(false)
  const [draft, setDraft] = useState<Draft | null>(null)
  const originalDraft = useRef<Draft | null>(null)
  const [saveError, setSaveError] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollPosition = useRef(0)
  const selected = entries.find(e => e.id === selectedId)
  const selectedSourceUrl = selected ? placeSourceUrl(selected) : null
  const selectedMetadata = selected ? placeResearchMetadata(selected) : null
  const currentPointLayer = selected?.pointId ? pointLayers.find(l => l.id === selected.layerId) : undefined
  const currentPoint = currentPointLayer?.points.find(p => p.id === selected?.pointId)
  const dirty = draft !== null && JSON.stringify(draft) !== JSON.stringify(originalDraft.current)

  useEffect(() => {
    setQuery(''); setLayer(''); setCategory(''); setPeriod(''); setEvidence(''); setPrecision(''); setSort('name'); setOnlyMap(false); setFiltersOpen(false)
    setLimit(PAGE_SIZE); setSelectedId(null); setMapPreview(false); setDraft(null); setSaveError(''); scrollPosition.current = 0
  }, [request])
  useEffect(() => {setLimit(PAGE_SIZE)}, [query, layer, category, period, evidence, precision, sort, onlyMap])
  useEffect(() => {
    if (selectedId && !selected) {setSelectedId(null); setDraft(null); setMapPreview(false)}
    if (draft && selected && !selected.editable) {setDraft(null); setSaveError('Je kunt deze plek nu alleen bekijken.')}
  }, [selected, selectedId, draft])
  useEffect(() => {
    if (!map) return
    const update = () => {
      const size = map.getSize()
      setExtent(size ? transformExtent(map.getView().calculateExtent(size), map.getView().getProjection(), 'EPSG:4326') : null)
    }
    update(); map.on('moveend', update)
    return () => {map.un('moveend', update)}
  }, [map])
  useLayoutEffect(() => {
    const body = contentRef.current?.closest('.detect-window__body')
    if (body) body.scrollTop = selectedId ? 0 : scrollPosition.current
  }, [selectedId, isOpen, request])
  useEffect(() => {
    if (!mapPreview || !map || !selected?.coordinates) return
    const preview = new VectorLayer({
      source: new VectorSource({features: [selected.geometry && selected.geometryType !== 'Point' ? new Feature(new GeoJSON().readGeometry(selected.geometry, {featureProjection:'EPSG:3857'})) : new Feature(new Point(fromLonLat(selected.coordinates)))]}),
      zIndex: 2500,
      properties: {name: 'place-list-preview'},
      style: new Style({fill:new Fill({color:'rgba(15,118,110,0.06)'}), stroke:new Stroke({color:selected.color,width:3,lineDash:[8,6]}), image: new CircleStyle({radius: 10, fill: new Fill({color: selected.color}), stroke: new Stroke({color: '#fff', width: 3})}), text: new Text({text: selected.name, offsetY: -24, font: 'bold 13px system-ui', fill: new Fill({color: '#111827'}), stroke: new Stroke({color: '#fff', width: 4})})})
    })
    map.addLayer(preview)
    return () => {map.removeLayer(preview)}
  }, [map, mapPreview, selected?.id, selected?.coordinates?.[0], selected?.coordinates?.[1], selected?.name, selected?.color])

  const filtered = useMemo(() => isOpen ? filterPlaces(entries, {query, layer, category, period, evidence, precision, sort, gps, extent: onlyMap ? extent : null}) : [], [isOpen, entries, query, layer, category, period, evidence, precision, sort, gps, onlyMap, extent])
  const categories = useMemo(() => [...new Set(entries.filter(e => !layer || e.sourceKey === layer).map(e => e.category))].sort((a,b) => a.localeCompare(b,'nl')), [entries, layer])
  const researchOptions = useMemo(() => {
    const metadata = entries.map(placeResearchMetadata)
    const unique = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a,b) => a.localeCompare(b,'nl'))
    return {periods:unique(metadata.flatMap(m => m.periods)), evidence:unique(metadata.map(m => m.evidence)), precision:unique(metadata.map(m => m.precision))}
  }, [entries])
  const filtersActive = !!(layer || category || period || evidence || precision || onlyMap)
  const clearFilters = () => {setQuery(''); setLayer(''); setCategory(''); setPeriod(''); setEvidence(''); setPrecision(''); setOnlyMap(false)}
  const mayLeave = () => !dirty || window.confirm('Je wijzigingen zijn nog niet opgeslagen. Wijzigingen weggooien?')
  const close = () => {if (mayLeave()) {setDraft(null); setMapPreview(false); closeWindow()}}
  const back = () => {if (mayLeave()) {setDraft(null); setSaveError(''); setSelectedId(null)}}
  useEffect(() => {
    if (!isOpen) return
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {e.preventDefault(); if (selectedId) back(); else close()}
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  })
  const showOnMap = () => {
    if (!map || !selected?.coordinates || !mayLeave()) return
    setDraft(null); useGPSStore.getState().stopTracking()
    if (selected.geometry && selected.geometryType !== 'Point') {
      const geometry = new GeoJSON().readGeometry(selected.geometry, {featureProjection:'EPSG:3857'})
      map.getView().fit(geometry.getExtent(), {padding:[48,48,100,48], maxZoom:15, duration:400})
    } else map.getView().animate({center: fromLonLat(selected.coordinates), zoom: 15, duration: 400})
    setMapPreview(true); closeWindow()
  }
  const edit = () => {
    if (!selected?.editable || !currentPoint) return
    const initial: Draft = {name: currentPoint.name, category: currentPoint.category, notes: currentPoint.notes || '', phone: currentPoint.phone || '', url: currentPoint.url || '', status: currentPoint.status || 'todo'}
    originalDraft.current = initial; setDraft({...initial}); setSaveError('')
  }
  const save = () => {
    if (!draft || !selected?.editable || !selected.pointId || !currentPoint) return
    const cleaned = {...draft, name: draft.name.trim(), category: draft.category.trim() || 'Overig'}
    if (!cleaned.name) return
    const changes = Object.fromEntries(Object.entries(cleaned).filter(([key,value]) => value !== originalDraft.current?.[key as keyof Draft]))
    if (!useCustomPointLayerStore.getState().updatePoint(selected.layerId, selected.pointId, changes)) {
      setSaveError('Opslaan is niet gelukt. Je invoer blijft staan; controleer je account en bewerkrechten.'); return
    }
    setDraft(null); setSaveError('')
  }
  const scopeName = scope.startsWith('preset:') ? presets.find(p => `preset:${p.id}` === scope)?.name : sources.find(s => s.key === scope)?.name
  const scopeExists = scope === 'all' || scope === 'visible' || !!scopeName
  const listTitle = selected ? (draft ? 'Plek bewerken' : 'Plek bekijken') : 'Lijstweergave'

  return <>
    {mapPreview && !activeWindow && selected && <button type="button" className="place-list-return" onClick={() => {setMapPreview(false); useUIStore.getState().openWindow('placeList')}}><ArrowLeft size={18}/> Terug naar lijst</button>}
    <AppWindow isOpen={isOpen} title={listTitle} icon={<List size={18}/>} placement="modal" className="place-list-window" showScaleControl={false} onClose={close} onBack={selected ? back : undefined}
      subHeader={!selected && <div className="place-list-controls">
        <label className="place-list-source"><span>Bekijk</span><select aria-label="Lijst van" value={scope} onChange={e => openPlaceList(e.target.value as PlaceListScope)}>
          {!scopeExists && <option value={scope} disabled>Selectie niet meer beschikbaar</option>}
          <option value="visible">Zichtbare lagen</option><option value="all">Alle plekken</option>
          <optgroup label="Presets">{presets.map(p => <option key={p.id} value={`preset:${p.id}`}>{p.name}</option>)}</optgroup>
          <optgroup label="Mijn lagen en imports">{sources.filter(s => s.kind !== 'builtin').map(s => <option key={s.key} value={s.key}>{s.name}{s.kind === 'imported' ? ' · import' : ''}</option>)}</optgroup>
          <optgroup label="Vakantieplekken">{sources.filter(s => s.kind === 'builtin').map(s => <option key={s.key} value={s.key}>{s.name}</option>)}</optgroup>
        </select></label>
        <div className="place-list-search"><Search size={18}/><input type="search" aria-label="Zoek plekken" placeholder="Zoek naam, periode, bron of notitie…" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button type="button" aria-label="Zoekopdracht wissen" onClick={() => setQuery('')}><X size={18}/></button>}</div>
        <div className="place-list-summary"><span role="status">{filtered.length} van {entries.length} items</span><button type="button" aria-expanded={filtersOpen} className="place-list-filter-toggle" onClick={() => setFiltersOpen(v => !v)}><SlidersHorizontal size={16}/> Filters{filtersActive ? ' · actief' : ''}</button></div>
        {!filtersOpen && filtersActive && <button type="button" className="place-list-filter-toggle" onClick={clearFilters}>Filters wissen</button>}
        {filtersOpen && <div className="place-list-filters">
          <label>Laag<select aria-label="Filter op laag" value={layer} onChange={e => {setLayer(e.target.value); setCategory('')}}><option value="">Alle lagen</option>{scopedSources.map(s => <option key={s.key} value={s.key}>{s.name}</option>)}</select></label>
          <label>Categorie<select aria-label="Filter op categorie" value={category} onChange={e => setCategory(e.target.value)}><option value="">Alle categorieën</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
          {researchOptions.periods.length > 0 && <label>Periode<select aria-label="Filter op periode" value={period} onChange={e => setPeriod(e.target.value)}><option value="">Alle perioden</option>{researchOptions.periods.map(p => <option key={p}>{p}</option>)}</select></label>}
          {researchOptions.evidence.length > 0 && <label>Bewijsstatus<select aria-label="Filter op bewijsstatus" value={evidence} onChange={e => setEvidence(e.target.value)}><option value="">Alle bewijsstatussen</option>{researchOptions.evidence.map(p => <option key={p}>{p}</option>)}</select></label>}
          {researchOptions.precision.length > 0 && <label>Locatieprecisie<select aria-label="Filter op locatieprecisie" value={precision} onChange={e => setPrecision(e.target.value)}><option value="">Alle posities</option>{researchOptions.precision.map(p => <option key={p}>{p}</option>)}</select></label>}
          <label className="place-list-sort">Volgorde<select aria-label="Sorteer plekken" value={sort} onChange={e => setSort(e.target.value as typeof sort)}><option value="name">Naam A–Z</option><option value="distance" disabled={!gps}>Dichtstbij · GPS</option><option value="latest">Nieuwste eerst</option></select></label>
          <label className="place-list-map-filter"><input type="checkbox" checked={onlyMap} disabled={!extent} onChange={e => setOnlyMap(e.target.checked)}/> Alleen in huidig kaartbeeld</label>
          {!gps && <p>Afstand wordt beschikbaar zodra je GPS-locatie bekend is.</p>}
          {filtersActive && <button type="button" className="detect-window-secondary-button" onClick={clearFilters}>Filters wissen</button>}
        </div>}
      </div>}
      footer={draft ? <div key="edit-actions" className="place-list-actions"><button type="button" className="detect-window-secondary-button" onClick={() => {if(mayLeave()) {setDraft(null); setSaveError('')}}}>Annuleren</button><button type="submit" form="place-list-edit" className="detect-window-primary-button" disabled={!draft.name.trim()}>Opslaan</button></div> : selected ? <div key="detail-actions" className="place-list-actions"><button type="button" className="detect-window-primary-button" onClick={showOnMap} disabled={!selected.coordinates || !map}><MapPin size={18}/> Toon op kaart</button>{selectedSourceUrl && <a className="detect-window-secondary-button" href={selectedSourceUrl} target="_blank" rel="noopener noreferrer">Open bron</a>}{selected.editable && <button type="button" className="detect-window-secondary-button" onClick={e => {e.preventDefault(); edit()}}><Pencil size={16}/> Bewerken</button>}</div> : <div className="place-list-footer"><span>{scopeName || (scope === 'all' ? 'Eigen lagen, imports en vakantieplekken' : 'Plekken uit je zichtbare lagen')}</span><button type="button" className="detect-window-secondary-button" onClick={close}><MapPin size={16}/> Kaart</button></div>}
    >
      <div ref={contentRef}>
        {selected ? <div className="place-list-detail">
          <div className="place-list-layer-label"><i style={{background: selected.color}}/>{selected.layerName}</div>
          <h2>{selected.name}</h2><div className="place-list-meta">{selected.category}{selected.coordinates && <span> · {formatDistance(distanceToPlace(selected.coordinates, gps)) || 'Locatie beschikbaar'}</span>}</div>
          {selectedMetadata && <div className="place-list-badges">{[selectedMetadata.period,selectedMetadata.evidence,selectedMetadata.precision].filter(Boolean).map((label,i) => <span key={i}>{label}</span>)}</div>}
          {draft ? <form id="place-list-edit" onSubmit={e => {e.preventDefault();save()}} className="place-list-edit">
            <label>Naam<input aria-label="Naam van plek" value={draft.name} onChange={e => setDraft({...draft, name:e.target.value})} required/></label>
            <label>Categorie<input aria-label="Categorie van plek" value={draft.category} onChange={e => setDraft({...draft, category:e.target.value})}/></label>
            <label>Notities<textarea aria-label="Notities van plek" rows={5} value={draft.notes} onChange={e => setDraft({...draft, notes:e.target.value})}/></label>
            <label>Status<select aria-label="Status van plek" value={draft.status} onChange={e => setDraft({...draft,status:e.target.value as PointStatus})}>{Object.entries(statusLabels).map(([v,n]) => <option key={v} value={v}>{n}</option>)}</select></label>
            <label>Telefoon<input type="tel" aria-label="Telefoon van plek" value={draft.phone} onChange={e => setDraft({...draft,phone:e.target.value})}/></label>
            <label>Website<input aria-label="Website van plek" value={draft.url} onChange={e => setDraft({...draft,url:e.target.value})}/></label>
          </form> : <>
            {currentPoint ? <><p className="place-list-notes">{currentPoint.notes || 'Geen notities toegevoegd.'}</p><p className="place-list-meta">{statusLabels[currentPoint.status] || 'Te bezoeken'}</p>{(currentPoint.phone || currentPoint.url || selected.popupHtml) && <div className="place-list-detail-html" dangerouslySetInnerHTML={{__html:sanitizePopupHtml((selected.popupHtml || '') + formatImportedLayerPopup({telefoon: currentPoint.phone, link: currentPoint.url, layerName:selected.layerName}))}}/>}</> : <div className="place-list-detail-html" dangerouslySetInnerHTML={{__html:sanitizePopupHtml(formatImportedLayerPopup({...selected.properties, layerName:selected.layerName, layerColor:selected.color, layerPopupConfig:importedLayers.find(l => l.id === selected.layerId)?.popupConfig || {titleField:'naam', hiddenFields:['detectSeed','detectSeedId','periodegroep','locatienauwkeurigheid'], showTechnicalFields:false}}))}}/>}
            {!selected.editable && <p className="place-list-meta">{currentPointLayer?.buddyRole === 'read' ? 'Gedeelde laag · alleen bekijken' : selected.sourceKey.startsWith('imported:') ? 'Import · alleen bekijken' : 'Brongegevens · alleen bekijken'}</p>}
            {!selected.coordinates && <p className="place-list-meta">Deze plek heeft geen geldige kaartlocatie.</p>}
          </>}
          {saveError && <p role="alert" className="place-list-error">{saveError}</p>}
          {currentPointLayer?.buddyLayerId && <BuddyWriteStatus/>}
        </div> : filtered.length ? <>
          <ul className="place-list-rows">{filtered.slice(0,limit).map(entry => {const meta=placeResearchMetadata(entry); return <li key={entry.id}><button type="button" className="place-list-row" onClick={() => {scrollPosition.current = contentRef.current?.closest('.detect-window__body')?.scrollTop || 0;setSelectedId(entry.id);setSaveError('')}}>
            <span className="place-list-dot" style={{background:entry.color}}/><span className="place-list-row-content"><strong>{entry.name}</strong><span className="place-list-meta">{entry.category} · {entry.layerName}</span>{meta.evidence && <span className="place-list-badges">{[...(meta.period === 'Alle perioden' ? ['Alle perioden'] : meta.periods),meta.evidence,meta.precision].filter(Boolean).map((label,i) => <span key={i}>{label}</span>)}</span>}{entry.description && <span className="place-list-description">{entry.description}</span>}{meta.source && meta.evidence && <span className="place-list-meta place-list-row-source">Bron: {meta.source}</span>}<span className="place-list-meta">{formatDistance(distanceToPlace(entry.coordinates,gps))}{entry.geometryType && entry.geometryType !== 'Point' && ` · ${entry.geometryType.includes('Polygon') ? 'Gebied' : 'Route / lijn'}`}</span></span><ChevronRight size={18} className="place-list-chevron"/>
          </button></li>})}</ul>
          {filtered.length > limit && <div className="place-list-more"><button type="button" className="detect-window-secondary-button" onClick={() => setLimit(v => v + PAGE_SIZE)}>Meer plekken ({Math.min(PAGE_SIZE, filtered.length-limit)})</button></div>}
        </> : <div className="place-list-empty"><List size={32}/><h2>{entries.length ? 'Geen plekken gevonden' : 'Geen plekken in deze selectie'}</h2><p>{entries.length ? 'Pas je zoekopdracht of filters aan.' : 'Kies een andere preset of laag. Achtergrondkaarten leveren geen lijstregels op.'}</p>{entries.length > 0 && !filtersActive && <button type="button" className="detect-window-secondary-button" onClick={clearFilters}>Filters wissen</button>}</div>}
      </div>
    </AppWindow>
  </>
}
