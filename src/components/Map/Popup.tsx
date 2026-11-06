import { sanitizePopupHtml } from '../../utils/safePopupHtml'
import { BuddyWriteStatus } from '../CustomPoints/BuddyWriteStatus'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { toLonLat } from 'ol/proj'
import { X, ChevronLeft, ChevronRight, Mountain, Loader2, Trash2, Type, ExternalLink, Plus, Check, Pencil, PersonStanding, GripHorizontal } from 'lucide-react'
import { useMapStore, useUIStore } from '../../store'
import { canShowParcelHeightMapAt, showParcelHeightMap, clearParcelHighlight } from '../../layers/parcelHighlight'
import { useLocalVondstenStore, type LocalVondst } from '../../store/localVondstenStore'
import { useCustomPointLayerStore, type FeatureGeometry, type GeometryType } from '../../store/customPointLayerStore'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { ROMEINSE_FORTEN_INFO, GENERIEK_FORT_INFO, FORT_TYPE_LABELS } from '../../data/romeinseFortenInfo'
import { formatImportedLayerPopup } from '../../utils/importedLayerPopup'
import { buildUserLayerCatalog, type UserLayerTarget } from '../../utils/userLayerCatalog'
import { isMapPopupGestureAllowed } from '../../utils/fieldReliability'
import type { MapBrowserEvent } from 'ol'
import { translateOpeningHours, MOBILE_HIT_TOLERANCE_PX, escapePopupHtml, getPhoneHref, getSafeExternalHref, queryAHNHeight } from './popup/popupHelpers'
import { queryWMSLayers } from './popup/queryWmsFeatureInfo'

type PopupFeatureData = {
  geometry?: FeatureGeometry
  properties?: Record<string, unknown>
  popupHtml?: string
  isOwnLayer?: boolean
  customPointRef?: { layerId: string; pointId: string }
}

type EditableCustomPoint = {
  original?: {name:string;phone:string;notes:string;url:string}
  name: string
  phone: string
  notes: string
  url: string
}

// Register RD New projection
export function Popup() {
  const map = useMapStore(state => state.map)
  const removeVondst = useLocalVondstenStore(state => state.removeVondst)
  const updateVondst = useLocalVondstenStore(state => state.updateVondst)
  const vondsten = useLocalVondstenStore(state => state.vondsten)
  const {
    layers: customLayers,
    addPoint: addPointToLayer,
    addLayer: createNewLayer,
    updateLayer: updatePointLayer,
    updatePoint: updateCustomPoint,
    removePoint: removeCustomPoint,
  } = useCustomPointLayerStore()
  const importedLayers = useCustomLayerStore(state => state.layers)
  const selectableUserLayers = buildUserLayerCatalog(customLayers, importedLayers)
  const [quickInfo, setQuickInfo] = useState<Array<{ layer: string; name: string; detail: string }> | null>(null)
  const [hoverInfo, setHoverInfo] = useState<Array<{ layer: string; name: string; detail: string }> | null>(null)
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const confirmedClickRef = useRef(false)
  const resumeClickRef = useRef<(() => void) | null>(null)
  const [allContents, setAllContents] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [parcelCoordinate, setParcelCoordinate] = useState<number[] | null>(null)
  const [showingHeightMap, setShowingHeightMap] = useState(false)
  const [loadingHeightMap, setLoadingHeightMap] = useState(false)
  const [heightMapError, setHeightMapError] = useState<string | null>(null)
  const [currentVondstId, setCurrentVondstId] = useState<string | null>(null)
  const [editingVondst, setEditingVondst] = useState<LocalVondst | null>(null)
  const [mapsUrl, setMapsUrl] = useState<string | null>(null)
  const [streetViewUrl, setStreetViewUrl] = useState<string | null>(null)
  const [showLayerPicker, setShowLayerPicker] = useState(false)
  const [addedToLayer, setAddedToLayer] = useState<string | null>(null)
  const [popupCoordinate, setPopupCoordinate] = useState<number[] | null>(null)
  const [showNewLayerInput, setShowNewLayerInput] = useState(false)
  const [newLayerName, setNewLayerName] = useState('')
  const [editingCustomPoint, setEditingCustomPoint] = useState<EditableCustomPoint | null>(null)
  const [confirmCustomPointDelete, setConfirmCustomPointDelete] = useState(false)
  // Store feature data for each popup content (parallel to allContents)
  const [allFeatureData, setAllFeatureData] = useState<Array<PopupFeatureData | null>>([])
  // Get current feature data based on index
  const currentFeatureData = allFeatureData[currentIndex] || null
  const currentCustomPointRef = currentFeatureData?.customPointRef || null
  const currentCustomPointLayer = currentCustomPointRef
    ? customLayers.find(layer => layer.id === currentCustomPointRef.layerId)
    : undefined
  const currentCustomPoint = currentCustomPointRef
    ? currentCustomPointLayer?.points.find(point => point.id === currentCustomPointRef.pointId)
    : undefined
  // Popup text scale: 100 = normal, 120 = 20% bigger, etc
  const [textScale, setTextScale] = useState(() => {
    const saved = localStorage.getItem('popupTextScale')
    return saved ? parseInt(saved) : 100
  })
  // Popup height: 'half' (50vh) or 'full' (90vh)
  const [popupHeight, setPopupHeight] = useState<'half' | 'full'>('half')
  const popupRequestIdRef = useRef(0)
  const heightMapAbortRef = useRef<AbortController | null>(null)

  // Map listeners live for the lifetime of the map; read current UI state.
  const previewStateRef = useRef({ visible, quickInfo })
  previewStateRef.current = { visible, quickInfo }

  useLayoutEffect(() => {
    const card = previewRef.current
    if (!card || !previewPosition) return
    const place = () => {
      const viewport = window.visualViewport
      const left = (viewport?.offsetLeft ?? 0) + 12
      const top = (viewport?.offsetTop ?? 0) + 12
      const width = Math.max(1, (viewport?.width ?? window.innerWidth) - 24)
      const height = Math.max(1, (viewport?.height ?? window.innerHeight) - 24)
      card.style.width = `${Math.min(300, width)}px`
      card.style.maxHeight = `${Math.min(height, (viewport?.height ?? window.innerHeight) * 0.35)}px`
      const bounds = card.getBoundingClientRect()
      const x = Math.max(left, Math.min(previewPosition.x, left + width - bounds.width))
      const below = previewPosition.y + 14
      const preferredY = below + bounds.height <= top + height ? below : previewPosition.y - bounds.height - 14
      const y = Math.max(top, Math.min(preferredY, top + height - bounds.height))
      card.style.left = `${x}px`
      card.style.top = `${y}px`
    }
    place()
    const observer = new ResizeObserver(place)
    observer.observe(card)
    window.addEventListener('resize', place)
    window.visualViewport?.addEventListener('resize', place)
    window.visualViewport?.addEventListener('scroll', place)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', place)
      window.visualViewport?.removeEventListener('resize', place)
      window.visualViewport?.removeEventListener('scroll', place)
    }
  }, [previewPosition, quickInfo, hoverInfo, visible])

  // Save text scale to localStorage
  const handleTextScaleChange = (value: number) => {
    setTextScale(value)
    localStorage.setItem('popupTextScale', value.toString())
  }

  // Current content based on index
  const content = allContents[currentIndex] || ''
  const hasMultiple = allContents.length > 1
  // Extract title from content (first <strong> tag) and remove it from content
  const extractTitleAndContent = (html: string): { title: string; contentWithoutTitle: string } => {
    const match = html.match(/<strong[^>]*>(.*?)<\/strong>/)
    if (match) {
      const title = match[1].replace(/<[^>]+>/g, '') // Strip any inner tags
      const contentWithoutTitle = html.replace(match[0], '').replace(/^(<br\s*\/?>)+/, '') // Remove title and leading <br>
      return { title, contentWithoutTitle }
    }
    return { title: '', contentWithoutTitle: html }
  }

  // Transform HTML to use em-based font sizes instead of rem-based Tailwind classes
  // This allows the font size slider to actually scale the text
  const transformForScaling = (html: string): string => {
    // First pass: convert text-xs to em-based (0.857em = 12/14)
    let result = html.replace(/class="([^"]*)"/g, (match, classes) => {
      if (classes.includes('text-xs')) {
        const newClasses = classes.replace(/\btext-xs\b/g, '').trim()
        return newClasses
          ? `style="font-size:0.857em" class="${newClasses}"`
          : 'style="font-size:0.857em"'
      }
      if (classes.includes('text-sm')) {
        // Remove text-sm, will inherit 1em from parent
        const newClasses = classes.replace(/\btext-sm\b/g, '').trim()
        return newClasses ? `class="${newClasses}"` : ''
      }
      return match
    })
    // Clean up empty class attributes
    return result.replace(/class=""/g, '')
  }

  const { title: extractedTitle, contentWithoutTitle: rawContent } = extractTitleAndContent(sanitizePopupHtml(content))
  const contentWithoutTitle = sanitizePopupHtml(transformForScaling(rawContent))

  const addPopupPointToLayer = (layerId: string, layerName: string) => {
    if (!popupCoordinate) return
    const featureData = currentFeatureData
    const saved=addPointToLayer(layerId, {
      name: extractedTitle || 'Punt',
      category: 'Overig',
      notes: '',
      coordinates: [popupCoordinate[0], popupCoordinate[1]],
      sourceLayer: extractedTitle,
      geometry: featureData?.geometry,
      sourceProperties: featureData?.properties,
      popupContent: featureData?.popupHtml,
    })
    if(!saved)return
    setShowLayerPicker(false)
    setShowNewLayerInput(false)
    setNewLayerName('')
    setAddedToLayer(layerName)
    setTimeout(() => setAddedToLayer(null), 2000)
  }

  const addPopupPointToUserLayer = (target: UserLayerTarget, layerName: string) => {
    if (target.kind === 'point') {
      updatePointLayer(target.id, { visible: true })
      addPopupPointToLayer(target.id, layerName)
      return
    }


  }

  const createLayerAndAddPopupPoint = () => {
    const layerName = newLayerName.trim()
    if (!layerName) return
    const layerId = createNewLayer(layerName, [])
    addPopupPointToLayer(layerId, layerName)
  }

  // Check if current content is a parcel
  const isParcel = content.includes('Landbouwperceel')
  const hasVisibleParcelLayer = Boolean(map?.getLayers().getArray().some(layer =>
    layer.get('title') === 'Gewaspercelen' && layer.getVisible()
  ))
  const canShowHeightMap = Boolean(
    parcelCoordinate &&
    (isParcel || hasVisibleParcelLayer) &&
    canShowParcelHeightMapAt(parcelCoordinate)
  )
  // Check if current content is a vondst
  const isVondst = content.includes('data-vondst-id=')

  const goToPrevious = () => {
    setEditingCustomPoint(null)
    setConfirmCustomPointDelete(false)
    setCurrentIndex(i => (i - 1 + allContents.length) % allContents.length)
  }

  const goToNext = () => {
    setEditingCustomPoint(null)
    setConfirmCustomPointDelete(false)
    setCurrentIndex(i => (i + 1) % allContents.length)
  }

  const handleShowHeightMap = async () => {
    if (!map || !parcelCoordinate || loadingHeightMap) {
      return
    }

    heightMapAbortRef.current?.abort()
    const controller = new AbortController()
    heightMapAbortRef.current = controller
    setHeightMapError(null)
    setLoadingHeightMap(true)

    try {
      const result = await showParcelHeightMap(map, parcelCoordinate, controller.signal)
      if (controller.signal.aborted) return

      if (result.status === 'shown') {
        setShowingHeightMap(true)
        return
      }

      if (result.status === 'not-found') {
        setHeightMapError('Op deze plek is geen landbouwperceel gevonden.')
      } else if (result.status === 'outside-netherlands') {
        setHeightMapError('De perceelhoogtekaart is alleen in Nederland beschikbaar.')
      } else if (result.status === 'image-error') {
        setHeightMapError(navigator.onLine
          ? 'Het hoogtebeeld kon niet worden geladen. Probeer het opnieuw.'
          : 'Het hoogtebeeld is hier nog niet offline opgeslagen.')
      } else if (result.status === 'connection-error') {
        setHeightMapError(navigator.onLine
          ? 'De perceelgegevens konden niet worden geladen. Probeer het opnieuw.'
          : 'Geen verbinding en dit perceel is nog niet offline opgeslagen.')
      }
    } catch (error) {
      console.error('Failed to load height map:', error)
      if (!controller.signal.aborted) {
        setHeightMapError('De hoogtekaart kon niet worden geladen. Probeer het opnieuw.')
      }
    } finally {
      if (heightMapAbortRef.current === controller) {
        heightMapAbortRef.current = null
        setLoadingHeightMap(false)
      }
    }
  }

  const handleHideHeightMap = () => {
    heightMapAbortRef.current?.abort()
    heightMapAbortRef.current = null
    if (map) {
      clearParcelHighlight(map)
      setShowingHeightMap(false)
    }
    setLoadingHeightMap(false)
    setHeightMapError(null)
  }

  const openPopup = (
    coordinate: number[],
    contents: string[],
    featureData: Array<PopupFeatureData | null>,
    resetIndex = true
  ) => {
    if (contents.length === 0) {
      return
    }

    // Identieke antwoorden zijn geen nieuwe keuzemogelijkheden.
    const uniqueContents: string[] = []
    const uniqueData: Array<PopupFeatureData | null> = []
    const seen = new Set<string>()
    contents.forEach((html, index) => {
      const plain = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      if (!plain || seen.has(plain)) return
      seen.add(plain)
      uniqueContents.push(html)
      uniqueData.push(featureData[index] ?? null)
    })
    if (!uniqueContents.length) return
    setAllContents(uniqueContents)
    setAllFeatureData(uniqueData)
    // Original data is kept aligned with the deduplicated list.
    if (resetIndex) {
      setCurrentIndex(0)
    }

    console.log(`📌 KLIK OPGESLAGEN: [${coordinate[0].toFixed(0)}, ${coordinate[1].toFixed(0)}]`)
    setParcelCoordinate(coordinate)
    setShowLayerPicker(false)
    setShowNewLayerInput(false)
    setNewLayerName('')
    setAddedToLayer(null)
    setEditingCustomPoint(null)
    setConfirmCustomPointDelete(false)

    const lonLat = toLonLat(coordinate)
    setPopupCoordinate(lonLat)
    setMapsUrl(`https://www.google.com/maps/dir/?api=1&destination=${lonLat[1]},${lonLat[0]}`)
    setStreetViewUrl(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lonLat[1]},${lonLat[0]}`)
    setVisible(true)
  }

  useEffect(() => {
    if (!map) return

    // Format AMK popup from local data (no WMS query needed)
    const formatAMKPopup = (props: Record<string, any>): string => {
      let html = `<strong class="text-purple-800">AMK Monument</strong>`

      if (props.toponiem) {
        html += `<br/><span class="text-sm font-semibold">${props.toponiem}</span>`
      }
      if (props.kwaliteitswaarde) {
        html += `<br/><span class="text-sm text-purple-700">${props.kwaliteitswaarde}</span>`
      }
      if (props.omschrijving) {
        html += `<br/><span class="text-xs text-gray-600 mt-1 block">${props.omschrijving}</span>`
      }
      if (props.txt_label) {
        // Shorten long labels
        const labels = props.txt_label.split(', ').slice(0, 3).join(', ')
        html += `<br/><span class="text-xs text-gray-500 italic">${labels}${props.txt_label.split(', ').length > 3 ? '...' : ''}</span>`
      }

      return html
    }

    const isAMKFeature = (props: Record<string, any>): boolean => {
      return typeof props.kwaliteitswaarde === 'string' &&
        props.kwaliteitswaarde.includes('archeologische waarde')
    }

    let lastPointerDragAt = Number.NEGATIVE_INFINITY
    const handlePointerDrag = () => {
      lastPointerDragAt = performance.now()
      setQuickInfo(null)
      setHoverInfo(null)
      resumeClickRef.current = null
    }
    const setPointPosition = (pixel: number[]) => {
      const rect = map.getTargetElement().getBoundingClientRect()
      setPreviewPosition({
        x: Math.max(12, Math.min(window.innerWidth - 12, rect.left + pixel[0])),
        y: Math.max(12, Math.min(window.innerHeight - 12, rect.top + pixel[1])),
      })
    }

    // Alleen lokale punten krijgen een snelle preview. Vlakken en WMS blijven
    // beschikbaar via de gewone kaartinformatie, zonder hover-ruis.
    const previewAtPixel = (pixel: number[], hitTolerance: number) => {
      const matches: Array<{ layer: string; name: string; detail: string }> = []
      const seen = new Set<string>()
      map.forEachFeatureAtPixel(pixel, (feature, sourceLayer) => {
        const p = feature.getProperties()
        const kind = p.layerType
        const sourceName = String(sourceLayer?.get('title') || sourceLayer?.get('name') || '')
        const isThedirac = /thedirac/i.test(sourceName) || /thedirac/i.test(String(p.layerName || ''))
        if (kind !== 'importedLayer' && kind !== 'customPoint' && !p.vondst && !isThedirac) return
        const type = feature.getGeometry()?.getType()
        if (type !== 'Point' && type !== 'MultiPoint') return
        const point = p.customPoint || p.vondst || {}
        const layer = String(p.layerName || p.customLayerName || sourceName || (p.vondst ? 'Vondsten' : 'Laag'))
        const name = String(point.name || point.objectType || p.name || p.naam || p.title || p.titel || p.toponiem || p.site || p.locatie || 'Punt')
        const detail = String(point.period || point.category || p.datering || p.periode || p.type || '')
        const key = [kind, p.layerId || p.customLayerId || '', p.featureIndex ?? point.id ?? '', name].join(':')
        if (seen.has(key)) return
        seen.add(key)
        matches.push({ layer, name, detail })
      }, { hitTolerance })
      return matches.slice(0, 30)
    }

    const setDetailsTarget = (evt: Pick<MapBrowserEvent<any>, 'coordinate'>) => {
      // Native OpenLayers events expose coordinate/pixel through prototype
      // getters: spreading the event drops them. Capture the location now,
      // then recompute its pixel if the viewport changes before Details.
      const coordinate = [...evt.coordinate]
      resumeClickRef.current = () => {
        confirmedClickRef.current = true
        void handleClick({ coordinate, pixel: map.getPixelFromCoordinate(coordinate) })
      }
    }

    const handleHover = (evt: MapBrowserEvent<any>) => {
      if (evt.dragging || useUIStore.getState().isDrawingMode || previewStateRef.current.visible) {
        setHoverInfo(null)
        return
      }
      const original = evt.originalEvent as PointerEvent
      if (original.pointerType !== 'mouse' && original.pointerType !== 'pen') return
      const matches = previewAtPixel(evt.pixel, 3)
      if (previewStateRef.current.quickInfo) return
      if (matches.length) {
        setPointPosition(evt.pixel)
        setDetailsTarget(evt)
      } else {
        resumeClickRef.current = null
      }
      setHoverInfo(matches.length ? matches : null)
      map.getTargetElement().style.cursor = matches.length ? 'pointer' : ''
    }

    // Handle deliberate map taps. Small pan gestures and kinetic movement
    // must not open the blocking bottom sheet.
    const handleClick = async (evt: Pick<MapBrowserEvent<any>, 'coordinate' | 'pixel'>) => {
      // Don't show popups when in drawing/measuring mode
      if (useUIStore.getState().isDrawingMode) return
      // A native singleclick arrives after a delay. Details may already have
      // opened from the mouse hover card; never create a hidden preview then.
      if (previewStateRef.current.visible && !confirmedClickRef.current) return

      const view = map.getView()
      if (!isMapPopupGestureAllowed({
        now: performance.now(),
        lastPointerDragAt,
        viewInteracting: view.getInteracting(),
        viewAnimating: view.getAnimating(),
      })) return

      if (!confirmedClickRef.current) {
        const matches = previewAtPixel(evt.pixel, MOBILE_HIT_TOLERANCE_PX)
        if (matches.length) {
          setQuickInfo(matches)
          setPointPosition(evt.pixel)
          setHoverInfo(null)
          setDetailsTarget(evt)
          return
        }
      }
      if (!confirmedClickRef.current && previewStateRef.current.quickInfo) {
        // Een tik elders sluit een vastgezet kaartje. Zonder kaartje blijft
        // de gewone klikroute voor vlakken, andere punten en WMS bereikbaar.
        setQuickInfo(null)
        setHoverInfo(null)
        resumeClickRef.current = null
        return
      }
      confirmedClickRef.current = false
      setQuickInfo(null)
      setHoverInfo(null)

      heightMapAbortRef.current?.abort()
      heightMapAbortRef.current = null
      clearParcelHighlight(map)
      setShowingHeightMap(false)
      setLoadingHeightMap(false)
      setHeightMapError(null)

      // Collect all popup contents from all sources
      const collectedContents: string[] = []
      // Parallel array for feature data (geometry + properties)
      const collectedFeatureData: Array<PopupFeatureData | null> = []

      // Helper to extract geometry from OpenLayers feature
      const extractGeometry = (olGeometry: any): FeatureGeometry | undefined => {
        if (!olGeometry) return undefined
        const type = olGeometry.getType() as GeometryType
        // Convert to WGS84 (lon/lat) coordinates
        const cloned = olGeometry.clone().transform('EPSG:3857', 'EPSG:4326')
        const coords = cloned.getCoordinates()
        return { type, coordinates: coords }
      }

      const requestId = ++popupRequestIdRef.current

      // Collect ALL vector features at click location and handle AMK first.
      const features: any[] = []
      map.forEachFeatureAtPixel(
        evt.pixel,
        f => {
          features.push(f)
        },
        { hitTolerance: MOBILE_HIT_TOLERANCE_PX }
      )

      const orderedFeatures = [...features].sort((a, b) => {
        const { geometry: _aGeometry, ...aProps } = a.getProperties()
        const { geometry: _bGeometry, ...bProps } = b.getProperties()
        const aIsAMK = isAMKFeature(aProps)
        const bIsAMK = isAMKFeature(bProps)

        if (aIsAMK === bIsAMK) return 0
        return aIsAMK ? -1 : 1
      })

      const totalAMKFeatures = orderedFeatures.reduce((count, feature) => {
        const { geometry: _geometry, ...dataProps } = feature.getProperties()
        return count + (isAMKFeature(dataProps) ? 1 : 0)
      }, 0)

      let remainingAMKFeatures = totalAMKFeatures
      let priorityPopupShown = false
      let priorityPopupContentCount = 0

      // Process each vector feature
      for (const feature of orderedFeatures) {
        const properties = feature.getProperties()

        // Skip geometry property
        const { geometry, ...dataProps } = properties
        // Achtergrondvlakken (zoals lokale geologie) krijgen hun info via de kaartdiensten.
        if (dataProps.popupIgnore) continue

        // Check if this is a vondst marker
        if (dataProps.vondst) {
          const v = dataProps.vondst as LocalVondst
          const vondstHtml = `<strong>${v.objectType}</strong>
            <div data-vondst-id="${v.id}"></div>
            <br/><span class="text-sm text-gray-600"><strong>Materiaal:</strong> ${v.material}</span>
            <br/><span class="text-sm text-gray-600"><strong>Periode:</strong> ${v.period}</span>
            ${v.depth ? `<br/><span class="text-sm text-gray-600"><strong>Diepte:</strong> ${v.depth} cm</span>` : ''}
            ${v.condition && v.condition !== 'Onbekend' ? `<br/><span class="text-sm text-gray-600"><strong>Conditie:</strong> ${v.condition}</span>` : ''}
            ${v.weight ? `<br/><span class="text-sm text-gray-600"><strong>Gewicht:</strong> ${v.weight} gram</span>` : ''}
            ${v.notes ? `<br/><span class="text-sm text-gray-600"><strong>Notities:</strong> ${v.notes}</span>` : ''}
            <br/><span class="text-xs text-gray-400">${new Date(v.timestamp).toLocaleDateString('nl-NL')}</span>`
          collectedContents.push(vondstHtml)
          collectedFeatureData.push(null) // Vondsten don't need to be added to layers
          setCurrentVondstId(v.id)
          continue
        }

        // Custom Point (Mijn Lagen)
        if (dataProps.layerType === 'customPoint' && dataProps.customPoint) {
          const point = dataProps.customPoint
          const layerName = dataProps.customLayerName || 'Mijn Laag'
          const layerColor = dataProps.customLayerColor || '#f97316'

          // The popup header identifies the layer; the point name belongs in the body.
          let pointHtml = `<strong>${escapePopupHtml(layerName)}</strong><br/>`

          if (point.popupContent) {
            pointHtml += point.popupContent
          } else {
            pointHtml += `<strong style="color:${escapePopupHtml(layerColor)}">${escapePopupHtml(point.name)}</strong>`
            if (point.category && point.category !== 'Overig') {
              pointHtml += `<br/><span class="text-sm text-gray-600"><strong>Categorie:</strong> ${escapePopupHtml(point.category)}</span>`
            }
          }

          if (point.phone) {
            const phoneHref = getPhoneHref(point.phone)
            pointHtml += `<br/><a href="tel:${escapePopupHtml(phoneHref)}" class="text-sm text-blue-600 hover:underline">${escapePopupHtml(point.phone)}</a>`
          }
          // Notes (always show if available and no popup content)
          if (point.notes && !point.popupContent) {
            pointHtml += `<br/><span class="text-sm text-gray-600 mt-1">${escapePopupHtml(point.notes)}</span>`
          }
          if (point.url) {
            const safeHref = getSafeExternalHref(point.url)
            if (safeHref) {
              pointHtml += `<br/><a href="${escapePopupHtml(safeHref)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-sm">Meer info</a>`
            }
          }
          pointHtml += `<br/><span class="text-xs text-gray-400">${new Date(point.createdAt).toLocaleDateString('nl-NL')}</span>`
          collectedContents.push(pointHtml)
          collectedFeatureData.push({
            isOwnLayer: true,
            customPointRef: { layerId: dataProps.customLayerId, pointId: point.id },
          })
          continue
        }

        // Geïmporteerde lagen: betekenisvolle titel, bruikbare velden en technische rommel verborgen.
        if (dataProps.layerType === 'importedLayer') {
          const html = formatImportedLayerPopup(dataProps)

          collectedContents.push(html)
          // Capture geometry and properties for imported layers (allow adding to other layers)
          collectedFeatureData.push({
            geometry: extractGeometry(geometry),
            properties: dataProps,
            popupHtml: html,
            isOwnLayer: true,
          })
          continue
        }

        // Check if this is an AMK feature - use local data (no WMS needed)
        if (isAMKFeature(dataProps)) {
          const amkHtml = formatAMKPopup(dataProps)
          collectedContents.push(amkHtml)
          // Capture AMK geometry for adding to layers
          collectedFeatureData.push({
            geometry: extractGeometry(geometry),
            properties: dataProps,
            popupHtml: amkHtml
          })

          remainingAMKFeatures -= 1
          if (!priorityPopupShown && remainingAMKFeatures === 0) {
            priorityPopupShown = true
            priorityPopupContentCount = collectedContents.length
            openPopup(evt.coordinate, [...collectedContents], [...collectedFeatureData])
          }
          continue
        }

        // Sites Classés Frankrijk (GeoJSON) - beschermde gebieden
        if (dataProps.nomgen && dataProps.typesite) {
          const naam = dataProps.nomgen || 'Beschermd gebied'
          const type = dataProps.typesite || ''
          const isClasse = type.toLowerCase().includes('class')

          // Header met naam
          let sitesHtml = `<strong class="text-green-800">${naam}</strong>`

          // Type: Site classé (strengste bescherming) of Site inscrit (minder streng)
          const typeLabel = isClasse ? 'Site classé (strikt beschermd)' : 'Site inscrit (beschermd)'
          sitesHtml += `<br/><span class="text-sm text-green-700">${typeLabel}</span>`

          // Datum bescherming
          if (dataProps.datecrea) {
            sitesHtml += `<br/><span class="text-xs text-gray-500">Beschermd sinds: ${dataProps.datecrea}</span>`
          }

          // Oppervlakte (waarde is in m², omrekenen naar ha)
          if (dataProps.surfdclha) {
            const ha = (dataProps.surfdclha / 10000).toFixed(1)
            sitesHtml += `<br/><span class="text-xs text-gray-500">Oppervlakte: ${ha} ha</span>`
          }

          // Beheerder
          if (dataProps.gestnom) {
            const regio = dataProps.gestnom.replace('DREAL ', '').split(' -')[0]
            sitesHtml += `<br/><span class="text-xs text-gray-500">Regio: ${regio}</span>`
          }

          // Uitleg wat Sites Classés zijn
          sitesHtml += `<div class="mt-2 pt-2 border-t border-gray-200">`
          sitesHtml += `<span class="text-xs text-gray-600">`
          if (isClasse) {
            sitesHtml += `<strong>Site classé</strong>: Hoogste beschermingsniveau in Frankrijk. Geen wijzigingen toegestaan zonder speciale vergunning. Vergelijkbaar met Nederlands Rijksmonument.`
          } else {
            sitesHtml += `<strong>Site inscrit</strong>: Beschermd gebied waar wijzigingen moeten worden gemeld. Minder streng dan Site classé.`
          }
          sitesHtml += `</span></div>`

          // Link naar meer info
          sitesHtml += `<div class="mt-2"><a href="https://fr.wikipedia.org/wiki/Site_class%C3%A9_ou_inscrit_(France)" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-xs">Meer over Sites Classés</a></div>`

          collectedContents.push(sitesHtml)
          collectedFeatureData.push({
            geometry: extractGeometry(geometry),
            properties: dataProps,
            popupHtml: sitesHtml
          })
          continue
        }

        // Romeinse Forten (GeoJSON) - compacte popup zoals AMK stijl
        if (dataProps.layerType === 'romeinsFort' || dataProps.layerType === 'romeinsFortLijn') {
          const fortNaam = dataProps.Name || dataProps.name || ''

          // Zoek specifieke info voor dit fort
          const fortInfo = ROMEINSE_FORTEN_INFO[fortNaam] || null
          const info = fortInfo || GENERIEK_FORT_INFO

          // Header - fort naam
          let fortHtml = `<strong class="text-red-800">${fortInfo ? info.naam : fortNaam || 'Romeins Fort'}</strong>`

          // Type en periode op één regel
          fortHtml += `<br/><span class="text-sm text-red-700">${FORT_TYPE_LABELS[info.type] || info.type}</span>`
          fortHtml += `<br/><span class="text-sm text-gray-500">${info.periode}</span>`

          // Als het een lijn (fortomtrek) is, toon speciale tekst
          if (dataProps.layerType === 'romeinsFortLijn') {
            fortHtml += `<br/><span class="text-sm text-red-600">📍 Gereconstrueerde fortomtrek</span>`
          }

          // Compacte beschrijving - alleen de hoofdtekst, geen secties
          fortHtml += `<br/><span class="text-xs text-gray-600 mt-1 block">${info.beschrijving}</span>`

          // Bronnen als link onderaan
          if (fortInfo?.bronnen && fortInfo.bronnen.length > 0) {
            const domain = fortInfo.bronnen[0].replace(/^https?:\/\//, '').split('/')[0]
            fortHtml += `<br/><a href="${fortInfo.bronnen[0]}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-xs">${domain}</a>`
          }

          collectedContents.push(fortHtml)
          collectedFeatureData.push({
            geometry: extractGeometry(geometry),
            properties: dataProps,
            popupHtml: fortHtml
          })
          continue
        }

        // Try to find a title/name - with better fallbacks for OSM data
        let name = dataProps.name || dataProps.Name || dataProps.naam || dataProps.title ||
                   dataProps.NAAM || dataProps.NAME || dataProps.label ||
                   dataProps.route_name || dataProps.road_name

        // Better fallback for generic OSM leisure data
        if (!name) {
          if (dataProps.leisure === 'playground') {
            name = 'Speeltuin'
          } else if (dataProps.leisure === 'park') {
            name = 'Park'
          } else if (dataProps.leisure === 'swimming_area' || dataProps.sport === 'swimming') {
            name = 'Zwemplek'
          } else if (dataProps.tourism === 'museum') {
            name = 'Museum'
          } else if (dataProps.amenity === 'cafe' || dataProps.amenity === 'restaurant') {
            name = dataProps.amenity === 'cafe' ? 'Café' : 'Restaurant'
          } else if (dataProps.historic === 'castle') {
            name = 'Kasteel'
          } else {
            name = 'Info'
          }
        }

        // Override name for specific layer types to have consistent headers
        // Bunkers: always "Bunker" as header, specific name as subtitle
        if (dataProps.bunker_type || (dataProps.name && (dataProps.name.toLowerCase().includes('bunker') || dataProps.name.toLowerCase().includes('kazemat') || dataProps.name.toLowerCase().includes('schuilplaats')))) {
          name = 'Bunker'
        }
        // Slagvelden: always "Historisch slagveld" as header, battle name as subtitle
        if (dataProps.historic === 'battlefield') {
          name = 'Historisch slagveld'
        }

        let html = `<strong>${name}</strong>`
        // Flag to track if feature was handled by specific handler (prevents duplicate generic content)
        let isSpecificHandled = false

        // Archis / Kromme Rijn Aardewerk: Show category
        if (dataProps.category) {
          html += `<br/><span class="text-sm text-gray-600">Categorie: ${dataProps.category}</span>`
        }

        // Romeinse wegen: Show from-to info if different from name
        if (dataProps.from_to && dataProps.from_to !== name) {
          html += `<br/><span class="text-sm text-gray-600">${dataProps.from_to}</span>`
        }
        if (dataProps.route && dataProps.route !== name) {
          html += `<br/><span class="text-sm text-gray-600">${dataProps.route}</span>`
        }

        // Itiner-E Romeinse wegen use a different property schema. Without
        // this formatter, segments such as "Kromme Rijngebied" only had a
        // title, which became an empty popup body after title extraction.
        const isRomanRoad = dataProps.segmentCertainty !== undefined &&
          (dataProps.type === 'Main Road' || dataProps.type === 'Secondary Road')

        if (isRomanRoad) {
          const roadType = dataProps.type === 'Main Road'
            ? 'Romeinse hoofdweg'
            : 'Secundaire Romeinse weg'
          const certaintyLabels: Record<string, string> = {
            Certain: 'zeker tracé',
            Conjectured: 'vermoedelijk tracé',
            Hypothetical: 'hypothetisch tracé'
          }
          const certainty = certaintyLabels[String(dataProps.segmentCertainty)] || String(dataProps.segmentCertainty)

          html += `<br/><span class="text-sm font-medium text-red-700">${roadType}</span>`
          html += `<br/><span class="text-xs text-gray-600">Ligging: ${certainty}</span>`

          if (typeof dataProps._lengthInKm === 'number') {
            html += `<br/><span class="text-xs text-gray-600">Lengte segment: ${dataProps._lengthInKm.toFixed(2)} km</span>`
          }
          if (dataProps.itinerary) {
            html += `<br/><span class="text-xs text-gray-600">Routebron: ${dataProps.itinerary}</span>`
          }
          if (dataProps.bibliography) {
            html += `<br/><span class="text-xs text-gray-500">Bron: ${dataProps.bibliography}</span>`
          }
        }

        // UIKAV Archeo Punten: Show archaeological details
        if (dataProps.TOPONIEM) {
          html += `<br/><span class="text-sm font-semibold text-gray-800">${dataProps.TOPONIEM}</span>`
          if (dataProps.PLAATS) {
            html += `<br/><span class="text-xs text-gray-500">${dataProps.PLAATS}</span>`
          }
        }
        if (dataProps.AARD_VINDP || dataProps.Aard_vindp) {
          html += `<br/><span class="text-sm text-gray-700">Aard: ${dataProps.AARD_VINDP || dataProps.Aard_vindp}</span>`
        }
        if (dataProps.BEGIN_PER && dataProps.EIND_PER) {
          html += `<br/><span class="text-sm text-purple-700">Periode: ${dataProps.BEGIN_PER} - ${dataProps.EIND_PER}</span>`
        }
        if (dataProps.AARD_OPM || dataProps.Aard_opmer) {
          html += `<br/><span class="text-xs text-gray-600 italic">${dataProps.AARD_OPM || dataProps.Aard_opmer}</span>`
        }

        // UIKAV Vlakken: Show polygon details
        if (dataProps.Gemeente) {
          html += `<br/><span class="text-sm text-gray-600">Gemeente: ${dataProps.Gemeente}</span>`
        }
        if (dataProps.Bron) {
          html += `<br/><span class="text-xs text-gray-500">Bron: ${dataProps.Bron}</span>`
        }
        if (dataProps.Bron_besch) {
          html += `<br/><span class="text-xs text-gray-500">${dataProps.Bron_besch}</span>`
        }
        if (dataProps.Dat_st_z && dataProps.Dat_ei_z) {
          html += `<br/><span class="text-sm text-purple-700">Datering: ${dataProps.Dat_st_z} - ${dataProps.Dat_ei_z}</span>`
        }
        if (dataProps.Begin && dataProps.Einde) {
          html += `<br/><span class="text-sm text-purple-700">Periode: ${dataProps.Begin} - ${dataProps.Einde}</span>`
        }

        // UIKAV Uiterwaarden: Show river info
        if (dataProps.Uiterwaard) {
          html += `<br/><span class="text-sm font-semibold">${dataProps.Uiterwaard}</span>`
        }
        if (dataProps.rivier) {
          html += `<br/><span class="text-sm text-blue-600">Rivier: ${dataProps.rivier}</span>`
        }

        // Beschrijving veld
        if (dataProps.Beschrijvi) {
          html += `<br/><span class="text-sm text-gray-700">${dataProps.Beschrijvi}</span>`
        }

        // Park / green area (OSM data) - uitgebreide info met groene kop
        if (dataProps.leisure === 'park') {
          isSpecificHandled = true
          const parkNaam = dataProps.name || 'Park'
          html = `<strong class="text-green-800">${parkNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Park</span>`

          // Beschrijving
          if (dataProps.description) {
            html += `<div class="mt-2 text-sm text-gray-700">${dataProps.description}</div>`
          }

          // Oppervlakte als beschikbaar
          if (dataProps.area) {
            html += `<br/><span class="text-sm text-gray-600">Oppervlakte: ${dataProps.area}</span>`
          }

          // Voorzieningen
          const voorzieningen: string[] = []
          if (dataProps.dog === 'yes') voorzieningen.push('Honden toegestaan')
          if (dataProps.lit === 'yes') voorzieningen.push('Verlicht')
          if (dataProps.bench === 'yes') voorzieningen.push('Bankjes')
          if (voorzieningen.length > 0) {
            html += `<br/><span class="text-sm text-gray-600">${voorzieningen.join(' • ')}</span>`
          }

          // Beheerder
          if (dataProps.operator) {
            html += `<br/><span class="text-xs text-gray-500">Beheer: ${dataProps.operator}</span>`
          }

          // Tip voor detectoristen
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Tip voor detectie</span></div>`
          html += `<div class="text-sm text-gray-700">Groene verblijfsplekken zijn populair bij detectoristen. Mensen verliezen hier munten en sieraden. Vraag eerst toestemming aan de gemeente of beheerder.</div>`

          // Website link
          if (dataProps.website) {
            const domain = dataProps.website.replace(/^https?:\/\//, '').split('/')[0]
            html += `<div class="mt-2"><a href="${dataProps.website}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-sm">${domain}</a></div>`
          }
        }
        // Playground (OSM data) - aparte behandeling
        else if (dataProps.leisure === 'playground') {
          isSpecificHandled = true
          const speeltuinNaam = dataProps.name || 'Speeltuin'
          html = `<strong class="text-orange-800">${speeltuinNaam}</strong>`
          html += `<br/><span class="text-sm text-gray-800">Speeltuin</span>`

          if (dataProps.description) {
            html += `<div class="mt-2 text-sm text-gray-700">${dataProps.description}</div>`
          }
        }
        // Museum (OSM data) - uitgebreide info met paarse kop
        if ((dataProps.tourism === 'museum' || dataProps.museum)) {
          isSpecificHandled = true
          const museumNaam = dataProps.name || 'Museum'

          // Museum type bepalen
          const museumType = dataProps.museum || dataProps['museum:type'] || ''
          const typeMap: Record<string, string> = {
            'art': 'Kunstmuseum',
            'history': 'Geschiedenismuseum',
            'archaeology': 'Archeologisch museum',
            'science': 'Wetenschapsmuseum',
            'technology': 'Techniekmuseum',
            'nature': 'Natuurmuseum',
            'open_air': 'Openluchtmuseum',
            'local': 'Streekmuseum',
            'military': 'Militair museum',
            'railway': 'Spoorwegmuseum',
            'maritime': 'Maritiem museum',
            'children': 'Kindermuseum'
          }
          const typeLabel = (museumType && museumType !== 'yes') ? typeMap[museumType.toLowerCase()] || museumType : 'Museum'

          // Header: Museum naam
          html = `<strong class="text-purple-800">${museumNaam}</strong>`
          html += `<br/><span class="text-sm text-purple-600">${typeLabel}</span>`

          // Beschrijving als beschikbaar
          if (dataProps.description) {
            html += `<div class="mt-2 text-sm text-gray-700">${dataProps.description}</div>`
          }

          // Toegangsprijs
          if (dataProps.fee) {
            const feeText = dataProps.fee === 'yes' ? 'Toegangsprijs' : dataProps.fee === 'no' ? 'Gratis toegang' : dataProps.fee
            html += `<div class="mt-2"><span class="text-sm text-gray-600">${feeText}</span></div>`
          }

          // Openingstijden (vertaald naar Nederlands)
          if (dataProps.opening_hours) {
            const dutchHours = translateOpeningHours(String(dataProps.opening_hours))
            html += `<div class="mt-2"><span class="text-xs text-green-600">Open: ${dutchHours}</span></div>`
          }

          // Website link met logische naam
          if (dataProps.website || dataProps.url) {
            const url = dataProps.website || dataProps.url
            html += `<div class="mt-1"><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-sm">Bezoek ${museumNaam}</a></div>`
          }

          // Wikipedia link
          if (dataProps.wikipedia) {
            const wikiLang = dataProps.wikipedia.split(':')[0] || 'nl'
            const wikiTitle = dataProps.wikipedia.split(':')[1] || dataProps.wikipedia
            html += `<div class="text-sm"><a href="https://${wikiLang}.wikipedia.org/wiki/${encodeURIComponent(wikiTitle)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Meer info op Wikipedia</a></div>`
          }

          // Adres onderaan
          if (dataProps['addr:street'] || dataProps['addr:housenumber'] || dataProps['addr:city']) {
            html += `<div class="mt-2 text-xs text-gray-400">`
            if (dataProps['addr:street'] || dataProps['addr:housenumber']) {
              const adres = [dataProps['addr:street'], dataProps['addr:housenumber']].filter(Boolean).join(' ')
              if (adres) html += `${adres}<br/>`
            }
            if (dataProps['addr:city']) {
              html += `${dataProps['addr:postcode'] || ''} ${dataProps['addr:city']}`
            }
            html += `</div>`
          }
        }
        // Swimming area / beach (OSM data) - uitgebreide info
        if (dataProps.leisure === 'swimming_area' || dataProps.sport === 'swimming' || dataProps.natural === 'beach') {
          isSpecificHandled = true
          const strandNaam = dataProps.name || 'Zwemplek'
          html = `<strong class="text-cyan-800">${strandNaam}</strong>`

          // Type bepalen
          const typeLabel = dataProps.natural === 'beach' ? 'Strand' :
                           dataProps.leisure === 'swimming_area' ? 'Zwemplek' : 'Zwemwater'
          html += `<br/><span class="text-sm text-gray-800">${typeLabel}</span>`

          // Water type
          if (dataProps.water) {
            const waterTypes: Record<string, string> = {
              'lake': 'Meer',
              'river': 'Rivier',
              'pond': 'Vijver',
              'reservoir': 'Reservoir',
              'canal': 'Kanaal'
            }
            html += `<br/><span class="text-sm text-gray-700">${waterTypes[dataProps.water] || dataProps.water}</span>`
          }

          // Voorzieningen
          if (dataProps.supervised === 'yes') {
            html += `<br/><span class="text-sm text-green-700">Met toezicht</span>`
          }
          if (dataProps.changing_rooms === 'yes') {
            html += `<br/><span class="text-sm text-gray-600">Kleedruimte aanwezig</span>`
          }

          // Beschrijving
          if (dataProps.description) {
            html += `<div class="mt-2 text-sm text-gray-700">${dataProps.description}</div>`
          }

          // Tip voor detectoristen
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Tip voor detectie</span></div>`
          html += `<div class="text-sm text-gray-700">Zwemplekken kunnen interessant zijn voor detectie. Mensen verliezen hier sieraden en munten. Let op: niet overal is detecteren toegestaan.</div>`
        }
        // Retail amenity (OSM data)
        if (dataProps.osm_id && dataProps.address !== undefined) {
          html += `<br/><span class="text-sm text-lime-700">Kringloopwinkel</span>`
          if (dataProps.address) {
            html += `<br/><span class="text-xs text-gray-500">${dataProps.address}</span>`
          }
          if (dataProps.phone) {
            html += `<br/><span class="text-xs text-gray-600">${dataProps.phone}</span>`
          }
        }

        // Grafheuvels (tumuli) - B1 stijl informatief
        if (dataProps.site_type === 'tumulus') {
          isSpecificHandled = true
          // Bepaal regio op basis van coördinaten (Web Mercator -> WGS84)
          const coords = feature.getGeometry()?.getCoordinates()
          let regio = ''
          let regioInfo = ''

          if (coords) {
            // Convert Web Mercator to WGS84
            const lonLat = toLonLat(coords)
            const lon = lonLat[0]
            const lat = lonLat[1]

            // Veluwe: roughly 5.5-6.2 lon, 52.0-52.4 lat
            if (lon > 5.5 && lon < 6.3 && lat > 52.0 && lat < 52.5) {
              regio = 'Veluwe'
              regioInfo = 'De Veluwe heeft de grootste concentratie grafheuvels van Nederland. Veel heuvels liggen in grafvelden met tientallen heuvels bij elkaar.'
            }
            // Drenthe: roughly 6.2-7.0 lon, 52.6-53.2 lat
            else if (lon > 6.2 && lon < 7.1 && lat > 52.6 && lat < 53.3) {
              regio = 'Drenthe'
              regioInfo = 'Drenthe is beroemd om zijn prehistorische monumenten. Naast hunebedden liggen hier honderden grafheuvels uit de Bronstijd.'
            }
            // Noord-Brabant: roughly 4.5-6.0 lon, 51.3-51.8 lat
            else if (lon > 4.5 && lon < 6.0 && lat > 51.3 && lat < 51.9) {
              regio = 'Noord-Brabant'
              regioInfo = 'Op de Brabantse zandgronden liggen veel grafheuvels, vaak in kleine groepjes op hogere gronden.'
            }
            // Limburg: roughly 5.5-6.2 lon, 50.7-51.5 lat
            else if (lon > 5.5 && lon < 6.3 && lat > 50.7 && lat < 51.6) {
              regio = 'Limburg'
              regioInfo = 'De Limburgse heuvels en plateaus herbergen grafheuvels uit verschillende periodes, van Bronstijd tot Romeinse tijd.'
            }
            // Utrecht/Gooi: roughly 5.0-5.5 lon, 52.0-52.4 lat
            else if (lon > 5.0 && lon < 5.6 && lat > 52.0 && lat < 52.4) {
              regio = 'Utrechtse Heuvelrug'
              regioInfo = 'De stuwwallen van de Utrechtse Heuvelrug en het Gooi waren al in de prehistorie bewoond. Grafheuvels markeren de laatste rustplaats van de vroege bewoners.'
            }
          }

          html += `<br/><span class="text-sm text-amber-700">Grafheuvel uit de Bronstijd of IJzertijd</span>`
          if (regio) {
            html += `<br/><span class="text-sm text-gray-500">${regio}</span>`
          }

          // Wat zie je hier
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat zie je hier?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">Een grafheuvel is een kunstmatige heuvel over een of meerdere graven. De meeste Nederlandse grafheuvels zijn 3000 tot 4000 jaar oud, uit de Bronstijd (2000-800 v.Chr.) of vroege IJzertijd.</div>`

          // Regionale context
          if (regioInfo) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Over deze regio</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${regioInfo}</div>`
          }

          // Hoe herken je een grafheuvel
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Hoe herken je een grafheuvel?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">Grafheuvels zijn vaak ronde, lage heuvels van 10-30 meter doorsnee en 1-3 meter hoog. Ze liggen meestal op zandgronden, vaak in groepjes (grafvelden). Let op de kenmerkende ronde vorm in het landschap.</div>`

          // Wikipedia link via wikidata
          if (dataProps.wikidata) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer informatie</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1"><a href="https://www.wikidata.org/wiki/${dataProps.wikidata}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Bekijk op Wikidata</a></div>`
          } else {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer informatie</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1"><a href="https://nl.wikipedia.org/wiki/Grafheuvel" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Lees meer over grafheuvels op Wikipedia</a></div>`
          }
        }

        // Kastelen (OSM data) - B1 stijl
        if (dataProps.historic === 'castle' || dataProps.castle_type) {
          isSpecificHandled = true
          // Type vertalingen en uitleg
          const castleTypes: Record<string, { label: string; uitleg: string; vondsten: string }> = {
            'manor': {
              label: 'Landhuis',
              uitleg: 'Een landhuis of havezate was het woonhuis van een adellijke familie. Vaak met een landgoed eromheen.',
              vondsten: 'Sieraden, gespen, munten, aardewerk van rijke bewoners'
            },
            'stately': {
              label: 'Statig huis',
              uitleg: 'Een groot en deftig woonhuis, vaak van welgestelde families. Soms met kasteelachtige kenmerken.',
              vondsten: 'Huishoudelijke voorwerpen, munten, knopen, aardewerk'
            },
            'fortress': {
              label: 'Fort/Vesting',
              uitleg: 'Een versterkte militaire bouwwerk, gebouwd om een gebied te verdedigen.',
              vondsten: 'Militaire voorwerpen, kogels, gespen, uniformonderdelen'
            },
            'defensive': {
              label: 'Verdedigingskasteel',
              uitleg: 'Een kasteel gebouwd voor verdediging, met dikke muren, een gracht en torens.',
              vondsten: 'Wapens, harnasonderdelen, pijlpunten, middeleeuwse munten'
            },
            'palace': {
              label: 'Paleis',
              uitleg: 'Een groot en luxueus gebouw voor koningen, prinsen of zeer rijke families.',
              vondsten: 'Luxe voorwerpen, sieraden, zegels, zeldzame munten'
            },
            'castrum': {
              label: 'Romeins fort',
              uitleg: 'Een Romeins legerkamp of fort. Deze zijn bijna 2000 jaar oud!',
              vondsten: 'Romeinse munten, fibulae, militaria, aardewerk'
            },
            'citadel': {
              label: 'Citadel',
              uitleg: 'Een sterk versterkte kern binnen een stad, als laatste verdedigingslinie.',
              vondsten: 'Militaire voorwerpen uit verschillende periodes'
            }
          }

          const typeInfo = dataProps.castle_type ? castleTypes[dataProps.castle_type] : null
          const typeLabel = typeInfo?.label || 'Kasteel'

          // Type onder naam - met proper spacing (AMK standaard: text-sm text-{color}-700)
          html += `<br/><span class="text-sm text-purple-700">${typeLabel}</span>`

          if (dataProps.start_date) {
            html += `<br/><span class="text-xs text-gray-500">Bouwjaar: ${dataProps.start_date}</span>`
          }

          if (dataProps.heritage) {
            html += `<br/><span class="text-sm text-amber-700">Rijksmonument</span>`
          }

          // Wat zie je hier
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat zie je hier?</span></div>`
          if (typeInfo) {
            html += `<div class="text-sm text-gray-700 mt-1">${typeInfo.uitleg}</div>`
          } else {
            html += `<div class="text-sm text-gray-700 mt-1">Een historisch kasteel of adellijk huis. Kastelen waren vaak het middelpunt van macht en rijkdom in een gebied.</div>`
          }

          // Wat kun je hier vinden
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je hier vinden?</span></div>`
          if (typeInfo) {
            html += `<div class="text-sm text-gray-700 mt-1">${typeInfo.vondsten}</div>`
          } else {
            html += `<div class="text-sm text-gray-700 mt-1">Munten, sieraden, gespen, aardewerk en andere voorwerpen van de vroegere bewoners.</div>`
          }

          // Meer weten - Wikipedia en website links
          if (dataProps.wikipedia || dataProps.website) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer weten?</span></div>`
            if (dataProps.wikipedia) {
              const wikiUrl = dataProps.wikipedia.startsWith('http')
                ? dataProps.wikipedia
                : `https://nl.wikipedia.org/wiki/${dataProps.wikipedia.replace(/^nl:/, '')}`
              html += `<div class="text-sm text-gray-700 mt-1"><a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wikipedia</a></div>`
            }
            if (dataProps.website) {
              html += `<div class="text-sm text-gray-700 mt-1"><a href="${dataProps.website}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Website bezoeken</a></div>`
            }
          }
        }

        // Ruïnes (OSM data) - B1 stijl
        if (dataProps.historic === 'ruins') {
          // Type tonen
          const ruinsType = dataProps.ruins_type || ''
          let typeLabel = 'Ruïne'
          let typeUitleg = 'Een ruïne is wat overblijft van een oud gebouw. Het kan een kerk, kasteel, molen of ander bouwwerk zijn geweest.'
          let typeVondsten = 'Baksteenfragmenten, aardewerk, metalen voorwerpen van vroegere bewoners of gebruikers'

          if (ruinsType.toLowerCase().includes('church') || ruinsType.toLowerCase().includes('kerk')) {
            typeLabel = 'Kerkruïne'
            typeUitleg = 'De overblijfselen van een oude kerk. Vaak nog te herkennen aan de fundering of een paar muren.'
            typeVondsten = 'Religieuze voorwerpen, munten van kerkgangers, knopen, gespen'
          } else if (ruinsType.toLowerCase().includes('castle') || ruinsType.toLowerCase().includes('kasteel')) {
            typeLabel = 'Kasteelruïne'
            typeUitleg = 'De resten van een middeleeuws kasteel. Soms is alleen de gracht of fundering nog zichtbaar.'
            typeVondsten = 'Middeleeuwse munten, sieraden, harnasonderdelen, pijlpunten'
          } else if (ruinsType.toLowerCase().includes('mill') || ruinsType.toLowerCase().includes('molen')) {
            typeLabel = 'Molenruïne'
            typeUitleg = 'Wat rest van een oude molen. Vaak nog te zien aan de stenen fundering of de molenberg.'
            typeVondsten = 'Gereedschap, munten, huishoudelijke voorwerpen'
          } else if (ruinsType.toLowerCase().includes('fort')) {
            typeLabel = 'Fortruïne'
            typeUitleg = 'De overblijfselen van een militair fort of verdedigingswerk.'
            typeVondsten = 'Militaire voorwerpen, kogels, gespen, uniformonderdelen'
          }

          html += `<br/><span class="text-sm text-amber-700">${typeLabel}</span>`

          // Wat zie je hier
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat zie je hier?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${typeUitleg}</div>`

          // Wat kun je hier vinden
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je hier vinden?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${typeVondsten}</div>`

          // Extra info als beschikbaar
          if (dataProps.description) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Beschrijving</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.description}</div>`
          }

          // Meer weten - Wikipedia link
          if (dataProps.wikipedia) {
            const wikiUrl = dataProps.wikipedia.startsWith('http')
              ? dataProps.wikipedia
              : `https://${dataProps.wikipedia.split(':')[0] || 'nl'}.wikipedia.org/wiki/${dataProps.wikipedia.replace(/^[a-z]{2}:/, '')}`
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer weten?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">Lees meer op <a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wikipedia</a></div>`
          }
        }

        // Bunkers (WOII) - B1 stijl met regio-specifieke info
        if (dataProps.bunker_type || (dataProps.name && (dataProps.name.toLowerCase().includes('bunker') || dataProps.name.toLowerCase().includes('kazemat') || dataProps.name.toLowerCase().includes('schuilplaats')))) {
          isSpecificHandled = true
          // Bunker type vertalingen
          const bunkerTypeLabels: Record<string, string> = {
            'munitions': 'Munitiebunker',
            'personnel_shelter': 'Personeelsschuilplaats',
            'personell_shelter': 'Personeelsschuilplaats',
            'command': 'Commandobunker',
            'gun_emplacement': 'Geschutsbunker',
            'mg_nest': 'Mitrailleursnest',
            'technical': 'Technische bunker',
            'storage': 'Opslagbunker',
            'tobruk': 'Tobruk',
            'kazemat': 'Kazemat',
            'Flak': 'Luchtafweerstelling',
            'hardened_aircraft_shelter': 'Vliegtuigshelter',
            'shelter': 'Schuilkelder',
            'observation': 'Observatiebunker',
            'anti_aircraft': 'Luchtafweerstelling'
          }

          // Toon bunkernaam als subtitle (niet als header - header is nu altijd "Bunker")
          const bunkerNaam = dataProps.name || ''
          const bunkerType = dataProps.bunker_type ? (bunkerTypeLabels[dataProps.bunker_type] || dataProps.bunker_type) : ''

          if (bunkerNaam && bunkerNaam !== 'Bunker') {
            html += `<br/><span class="text-sm font-semibold text-gray-700">${bunkerNaam}</span>`
          }
          if (bunkerType && bunkerType !== bunkerNaam) {
            html += `<br/><span class="text-xs text-gray-500">${bunkerType}</span>`
          }

          // Detecteer regio op basis van coördinaten voor context
          const coords = feature.getGeometry()?.getCoordinates()
          let regioContext = ''
          let regioLink = ''
          let regioLinkLabel = ''

          if (coords) {
            const lonLat = toLonLat(coords)
            const lon = lonLat[0]
            const lat = lonLat[1]

            // Kustgebied = Atlantikwall (west van 5.0 of dicht bij kust)
            const isKust = lon < 4.8 || (lon < 5.2 && lat > 51.8 && lat < 53.5)
            // Scheveningen/Den Haag gebied
            const isScheveningen = lon > 4.2 && lon < 4.4 && lat > 52.0 && lat < 52.15
            // IJmuiden gebied
            const isIJmuiden = lon > 4.5 && lon < 4.7 && lat > 52.4 && lat < 52.5
            // Hoek van Holland
            const isHoekVanHolland = lon > 4.0 && lon < 4.2 && lat > 51.95 && lat < 52.05
            // Zeeland kust
            const isZeeland = lon < 4.2 && lat < 51.6
            // Grebbelinie (Utrecht/Gelderland)
            const isGrebbelinie = lon > 5.2 && lon < 5.8 && lat > 51.9 && lat < 52.3

            if (isScheveningen) {
              regioContext = `Deze bunker maakt deel uit van de Atlantikwall bij Scheveningen. De Duitsers bouwden hier tijdens WOII zo'n 80 bunkers in de duinen. De muren zijn soms 3 meter dik beton. Voor deze bunkers moesten 138.000 mensen uit Den Haag en Scheveningen hun huis verlaten.`
              regioLink = 'https://nl.wikipedia.org/wiki/Atlantikwall_Museum_Scheveningen'
              regioLinkLabel = 'Atlantikwall Museum Scheveningen'
            } else if (isIJmuiden) {
              regioContext = `Deze bunker hoort bij Festung IJmuiden, een van de zwaarst verdedigde punten van de Atlantikwall. De Duitsers bouwden hier bunkers om de haventoegang te beschermen. Er zijn nu rondleidingen door het Bunkermuseum.`
              regioLink = 'https://www.bunkermuseum.nl/'
              regioLinkLabel = 'Bunkermuseum IJmuiden'
            } else if (isHoekVanHolland) {
              regioContext = `Deze bunker maakt deel uit van de Atlantikwall bij Hoek van Holland. Dit was een strategisch punt voor de Duitsers vanwege de Nieuwe Waterweg. Veel bunkers zijn nog te bezoeken.`
              regioLink = 'https://www.atlantikwallhoekvanholland.nl/'
              regioLinkLabel = 'Atlantikwall Hoek van Holland'
            } else if (isZeeland) {
              regioContext = `Deze bunker hoort bij de Atlantikwall in Zeeland. De Duitsers verdedigden hier de Westerschelde en de kust. Bij Zoutelande en Westkapelle zijn veel bunkers bewaard gebleven.`
              regioLink = 'https://www.bunkermuseumzoutelande.nl/'
              regioLinkLabel = 'Bunkermuseum Zoutelande'
            } else if (isKust) {
              regioContext = `Deze bunker maakt deel uit van de Atlantikwall: de Duitse verdedigingslinie langs de hele kust van Europa. In Nederland bouwden de Duitsers duizenden bunkers tussen 1942 en 1944.`
              regioLink = 'https://nl.wikipedia.org/wiki/Atlantikwall'
              regioLinkLabel = 'Atlantikwall (Wikipedia)'
            } else if (isGrebbelinie) {
              regioContext = `Deze bunker hoort mogelijk bij de Grebbelinie of de Nieuwe Hollandse Waterlinie. Dit waren Nederlandse verdedigingslinies die de Duitsers na 1940 versterkten met bunkers.`
              regioLink = 'https://nl.wikipedia.org/wiki/Grebbelinie'
              regioLinkLabel = 'Grebbelinie (Wikipedia)'
            } else {
              regioContext = `Een bunker uit de Tweede Wereldoorlog. De meeste bunkers in Nederland zijn gebouwd tussen 1940 en 1944, als onderdeel van de Duitse verdediging of langs bestaande Nederlandse linies.`
              regioLink = 'https://nl.wikipedia.org/wiki/Atlantikwall'
              regioLinkLabel = 'WOII bunkers (Wikipedia)'
            }
          } else {
            regioContext = `Een bunker uit de Tweede Wereldoorlog.`
            regioLink = 'https://nl.wikipedia.org/wiki/Atlantikwall'
            regioLinkLabel = 'WOII bunkers (Wikipedia)'
          }

          // Wat zie je hier?
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat zie je hier?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">${regioContext}</div>`

          // Wat kun je vinden?
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je vinden?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">Bij bunkers worden soms voorwerpen gevonden zoals patronen, uniformknopen, gespen en persoonlijke spullen van soldaten.</div>`

          // Let op - subtiel, klein, italic
          html += `<div class="mt-2 text-xs text-gray-500 italic">Let op: betreed nooit een bunker zonder toestemming. Raak munitieresten niet aan.</div>`

          // Bronnen
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Bronnen</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">`
          html += `<a href="${regioLink}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${regioLinkLabel}</a>`
          if (dataProps.website) {
            html += `<br/><a href="${dataProps.website}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">TracesOfWar</a>`
          } else {
            html += `<br/><a href="https://www.tracesofwar.nl/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">TracesOfWar</a>`
          }
          html += `</div>`
        }

        // Slagvelden (battlefields) - B1 stijl met specifieke slag-info
        if (dataProps.historic === 'battlefield') {
          isSpecificHandled = true
          // Specifieke info per slag (header is al "Historisch slagveld", naam als subtitle)
          const slagNaam = dataProps.name || 'Onbekend slagveld'

          // Database van bekende slagen met B1 info
          const slagInfo: Record<string, { periode: string; samenvatting: string; watZieJe: string; uitkomst: string; wikiUrl: string }> = {
            'Slag om Arnhem': {
              periode: 'September 1944',
              samenvatting: 'De Slag om Arnhem was onderdeel van Operatie Market Garden. Geallieerde parachutisten probeerden de brug over de Rijn te veroveren. Na negen dagen hevige gevechten moesten ze zich terugtrekken. Van de 10.000 Britse soldaten werden er 1.500 gedood en 6.500 krijgsgevangen gemaakt.',
              watZieJe: 'Er zijn veel monumenten en infoborden. Het Airborne Museum in Oosterbeek vertelt het hele verhaal. Elk jaar in september is er een herdenking.',
              uitkomst: 'De geallieerden verloren de slag. Nederland bleef nog tot mei 1945 bezet.',
              wikiUrl: 'https://nl.wikipedia.org/wiki/Slag_om_Arnhem'
            },
            'Slag om de Sloedam': {
              periode: '1-2 november 1944',
              samenvatting: 'Canadese soldaten vielen de Sloedam aan om Walcheren te bevrijden. De dam was smal en de Duitsers verdedigden fel. Veel soldaten sneuvelden bij deze bloedige aanval.',
              watZieJe: 'Bij de dam staat een monument voor de gevallen Canadezen. Er zijn infoborden die de slag uitleggen.',
              uitkomst: 'De Canadezen wonnen na zware verliezen. Dit opende de weg naar de bevrijding van Walcheren.',
              wikiUrl: 'https://nl.wikipedia.org/wiki/Slag_om_de_Sloedam'
            },
            'Slag bij Heiligerlee (1568)': {
              periode: '23 mei 1568',
              samenvatting: 'De eerste veldslag van de Tachtigjarige Oorlog. Lodewijk van Nassau versloeg het Spaanse leger. Zijn broer Adolf sneuvelde tijdens de strijd.',
              watZieJe: 'In Heiligerlee staat het Slag bij Heiligerlee monument. Het klooster waar Adolf van Nassau begraven ligt is nog te bezoeken.',
              uitkomst: 'De opstandelingen wonnen, maar dit was pas het begin van 80 jaar oorlog.',
              wikiUrl: 'https://nl.wikipedia.org/wiki/Slag_bij_Heiligerlee_(1568)'
            },
            'Overloon': {
              periode: 'Oktober 1944',
              samenvatting: 'Bij Overloon vochten Britten en Amerikanen tegen de Duitsers. Het was een van de zwaarste tankgevechten op Nederlandse bodem. Het dorp werd volledig verwoest.',
              watZieJe: 'Het Oorlogsmuseum Overloon staat op het voormalige slagveld. Je kunt tanks, vliegtuigen en andere voertuigen zien.',
              uitkomst: 'De geallieerden wonnen na wekenlange gevechten.',
              wikiUrl: 'https://nl.wikipedia.org/wiki/Slag_om_Overloon'
            },
            'Slagveld Lanakerveld': {
              periode: '1568',
              samenvatting: 'Onderdeel van de Nederlandse opstand tegen Spanje. Hier vonden gevechten plaats tijdens de beginjaren van de Tachtigjarige Oorlog.',
              watZieJe: 'Het gebied is nu grotendeels landbouwgrond. Lokaal zijn er soms infoborden.',
              uitkomst: 'Onderdeel van de lange strijd tegen de Spaanse overheersing.',
              wikiUrl: 'https://nl.wikipedia.org/wiki/Tachtigjarige_Oorlog'
            },
            'Blessebrugschans': {
              periode: 'Diverse periodes',
              samenvatting: 'Een historische schans die meerdere keren werd gebruikt in militaire conflicten.',
              watZieJe: 'De resten van de schans zijn nog zichtbaar in het landschap.',
              uitkomst: 'De schans speelde een rol in verschillende conflicten.',
              wikiUrl: 'https://nl.wikipedia.org/wiki/Schans_(vestingwerk)'
            }
          }

          // Zoek specifieke info voor deze slag
          const info = slagInfo[slagNaam]

          // Toon slagnaam als subtitle (header is al "Historisch slagveld")
          if (slagNaam !== 'Onbekend slagveld' && slagNaam !== 'Historisch slagveld') {
            html += `<br/><span class="text-sm font-semibold text-red-700">${slagNaam}</span>`
          }

          if (info) {
            // Periode
            html += `<br/><span class="text-xs text-gray-500">${info.periode}</span>`

            // Wat gebeurde hier?
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat gebeurde hier?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${info.samenvatting}</div>`

            // Uitkomst
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Hoe liep het af?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${info.uitkomst}</div>`

            // Wat kun je zien?
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kun je zien?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${info.watZieJe}</div>`

            // Bronnen
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Bronnen</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">`
            html += `<a href="${info.wikiUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wikipedia</a>`
            if (slagNaam.includes('Arnhem')) {
              html += `<br/><a href="https://www.airbornemuseum.nl/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Airborne Museum Oosterbeek</a>`
            }
            if (slagNaam.includes('Overloon')) {
              html += `<br/><a href="https://www.oorlogsmuseum.nl/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Oorlogsmuseum Overloon</a>`
            }
            html += `</div>`
          } else {
            // Fallback voor onbekende slagvelden
            if (dataProps.date) {
              html += `<br/><span class="text-xs text-gray-500">${dataProps.date}</span>`
            }
            if (dataProps.description) {
              html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat gebeurde hier?</span></div>`
              html += `<div class="text-sm text-gray-700 mt-1">${dataProps.description}</div>`
            } else {
              html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat gebeurde hier?</span></div>`
              html += `<div class="text-sm text-gray-700 mt-1">Op deze plek vonden historische gevechten plaats. Zoek lokaal naar infoborden of monumenten.</div>`
            }

            // Wikipedia link als beschikbaar
            if (dataProps.wikipedia) {
              const wikiUrl = dataProps.wikipedia.startsWith('http')
                ? dataProps.wikipedia
                : `https://nl.wikipedia.org/wiki/${dataProps.wikipedia.replace('nl:', '')}`
              html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Bronnen</span></div>`
              html += `<div class="text-sm text-gray-700 mt-1"><a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wikipedia</a></div>`
            }
          }
        }

        // Fossielen (PBDB data) - B1 stijl
        if (dataProps.bron === 'Paleobiology Database') {
          // Helper functie voor Nederlandse taxonomie uitleg
          const getTaxonomieUitleg = (taxonomie: string): string => {
            const uitleg: Record<string, string> = {
              'Mollusca': 'weekdieren zoals schelpen en slakken',
              'Brachiopoda': 'armpotigen, schelp-achtige dieren',
              'Echinodermata': 'stekelhuidigen zoals zee-egels en zeesterren',
              'Chordata': 'gewervelde dieren',
              'Arthropoda': 'geleedpotigen zoals kreeften en trilobieten',
              'Cnidaria': 'neteldieren zoals koralen en kwallen',
              'Bryozoa': 'mosdiertjes',
              'Foraminifera': 'eencellige schelpdieren',
              'Plantae': 'planten',
              'Crinoidea': 'zeelelies',
              'Gastropoda': 'slakken',
              'Bivalvia': 'tweekleppigen zoals mossels en oesters',
              'Cephalopoda': 'koppotigen zoals inktvissen en ammonieten',
              'Trilobita': 'trilobieten, uitgestorven kreeftachtigen',
              'Mammalia': 'zoogdieren',
              'Reptilia': 'reptielen',
              'Pisces': 'vissen',
              'Amphibia': 'amfibieën'
            }
            for (const [term, uitlegTekst] of Object.entries(uitleg)) {
              if (taxonomie.toLowerCase().includes(term.toLowerCase())) {
                return uitlegTekst
              }
            }
            return ''
          }

          // Helper voor periode uitleg
          const getPeriodeUitleg = (periode: string): string => {
            const periodeInfo: Record<string, string> = {
              'Cambrium': '541-485 miljoen jaar geleden',
              'Ordovicium': '485-444 miljoen jaar geleden',
              'Siluur': '444-419 miljoen jaar geleden',
              'Devoon': '419-359 miljoen jaar geleden',
              'Carboon': '359-299 miljoen jaar geleden',
              'Perm': '299-252 miljoen jaar geleden',
              'Trias': '252-201 miljoen jaar geleden',
              'Jura': '201-145 miljoen jaar geleden',
              'Krijt': '145-66 miljoen jaar geleden',
              'Paleogeen': '66-23 miljoen jaar geleden',
              'Neogeen': '23-2,6 miljoen jaar geleden',
              'Kwartair': '2,6 miljoen jaar - nu',
              'Pleistoceen': '2,6 miljoen - 11.700 jaar geleden',
              'Holoceen': '11.700 jaar geleden - nu'
            }
            for (const [term, info] of Object.entries(periodeInfo)) {
              if (periode.toLowerCase().includes(term.toLowerCase())) {
                return info
              }
            }
            return ''
          }

          // Helper voor gesteente vertaling
          const vertaalGesteente = (gesteente: string): string => {
            const vertalingen: Record<string, string> = {
              'limestone': 'kalksteen', 'sandstone': 'zandsteen', 'shale': 'schalie',
              'clay': 'klei', 'sand': 'zand', 'gravel': 'grind', 'marl': 'mergel',
              'chalk': 'krijt', 'mudstone': 'moddersteen', 'siltstone': 'siltsteen'
            }
            let result = gesteente
            for (const [eng, nl] of Object.entries(vertalingen)) {
              result = result.replace(new RegExp(eng, 'gi'), nl)
            }
            return result
          }

          // Helper voor milieu vertaling
          const vertaalMilieu = (milieu: string): string => {
            const vertalingen: Record<string, string> = {
              'marine': 'zee', 'coastal': 'kust', 'terrestrial': 'land',
              'fluvial': 'rivier', 'lacustrine': 'meer', 'reef': 'rif',
              'deltaic': 'delta', 'shallow': 'ondiep water', 'deep': 'diep water'
            }
            let result = milieu
            for (const [eng, nl] of Object.entries(vertalingen)) {
              result = result.replace(new RegExp(eng, 'gi'), nl)
            }
            return result
          }

          // Vindplaats onder titel
          if (dataProps.vindplaats) {
            html += `<br/><span class="text-xs text-gray-600">${dataProps.vindplaats}</span>`
          }

          // Wat is hier gevonden?
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is hier gevonden?</span></div>`

          if (dataProps.taxonomie && dataProps.taxonomie !== 'Onbekend') {
            const uitleg = getTaxonomieUitleg(dataProps.taxonomie)
            if (uitleg) {
              html += `<div class="text-sm text-gray-700 mt-1">${uitleg}</div>`
              html += `<div class="text-xs text-gray-500 italic">(${dataProps.taxonomie})</div>`
            } else {
              html += `<div class="text-sm text-gray-700 mt-1">${dataProps.taxonomie}</div>`
            }
          }

          if (dataProps.aantal_fossielen) {
            const aantal = parseInt(dataProps.aantal_fossielen)
            const aantalTekst = aantal > 100 ? 'Veel fossielen gevonden op deze locatie.' :
                               aantal > 10 ? 'Meerdere fossielen gevonden op deze locatie.' :
                               `${dataProps.aantal_fossielen} fossiel${aantal > 1 ? 'en' : ''} gevonden op deze locatie.`
            html += `<div class="text-sm text-gray-600 mt-1">${aantalTekst}</div>`
          }

          // Wanneer leefden deze dieren?
          if (dataProps.periode && dataProps.periode !== 'Onbekend') {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wanneer leefden deze dieren?</span></div>`
            const periodeUitleg = getPeriodeUitleg(dataProps.periode)
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.periode}</div>`
            if (periodeUitleg) {
              html += `<div class="text-sm text-gray-600">${periodeUitleg}</div>`
            }
            if (dataProps.ouderdom && dataProps.ouderdom !== 'Onbekend') {
              html += `<div class="text-sm text-gray-600">Ouderdom: ${dataProps.ouderdom}</div>`
            }
          }

          // In wat voor gesteente?
          if (dataProps.gesteente || dataProps.formatie || dataProps.milieu) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">In wat voor gesteente?</span></div>`
            if (dataProps.gesteente) {
              html += `<div class="text-sm text-gray-700 mt-1">${vertaalGesteente(dataProps.gesteente)}</div>`
            }
            if (dataProps.formatie) {
              html += `<div class="text-sm text-gray-600">Formatie: ${dataProps.formatie}</div>`
              if (dataProps.lid) {
                html += `<div class="text-sm text-gray-600 ml-3">Lid: ${dataProps.lid}</div>`
              }
            }
            if (dataProps.milieu) {
              html += `<div class="text-sm text-gray-600">Leefomgeving: ${vertaalMilieu(dataProps.milieu)}</div>`
            }
          }
        }

        // Fossiel Hotspots (populaire zoeklocaties) - B1 stijl
        if (dataProps.layerType === 'fossielHotspot') {
          // Type en regio onder titel
          const locationParts: string[] = []
          if (dataProps.type) locationParts.push(dataProps.type)
          if (dataProps.region) locationParts.push(dataProps.region)
          if (dataProps.country) {
            const countryNames: Record<string, string> = { 'NL': 'Nederland', 'BE': 'België', 'DE': 'Duitsland', 'FR': 'Frankrijk' }
            locationParts.push(countryNames[dataProps.country] || dataProps.country)
          }
          if (locationParts.length > 0) {
            html += `<br/><span class="text-xs text-gray-600">${locationParts.join(' · ')}</span>`
          }

          // Wat kan ik er vinden?
          if (dataProps.finds || dataProps.period) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kan ik er vinden?</span></div>`
            if (dataProps.finds) {
              html += `<div class="text-sm text-gray-700 mt-1">${dataProps.finds}</div>`
            }
            if (dataProps.period) {
              html += `<div class="text-sm text-gray-600 mt-1">Periode: ${dataProps.period}</div>`
            }
            if (dataProps.geology) {
              html += `<div class="text-sm text-gray-600 mt-1">Geologie: ${dataProps.geology}</div>`
            }
          }

          // Hoe kom ik er?
          if (dataProps.access || dataProps.tips) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Hoe kom ik er?</span></div>`
            if (dataProps.access) {
              const isVerboden = dataProps.access.toLowerCase().includes('verboden') ||
                                dataProps.access.toLowerCase().includes('niet toegankelijk')
              const accessColor = isVerboden ? 'text-red-600' : 'text-gray-700'
              html += `<div class="text-sm ${accessColor} mt-1">${dataProps.access}</div>`
            }
            if (dataProps.tips) {
              html += `<div class="text-sm text-gray-600 mt-1 italic">Tip: ${dataProps.tips}</div>`
            }
          }
        }

        // Mineralen Hotspots (NL/FR/BE/DE) - B1 stijl
        if (dataProps.layerType === 'mineralenHotspot') {
          // Regio en land onder titel
          const locationParts: string[] = []
          if (dataProps.region) locationParts.push(dataProps.region)
          if (dataProps.country) {
            const countryNames: Record<string, string> = { 'NL': 'Nederland', 'BE': 'België', 'DE': 'Duitsland', 'FR': 'Frankrijk' }
            locationParts.push(countryNames[dataProps.country] || dataProps.country)
          }
          if (locationParts.length > 0) {
            html += `<br/><span class="text-xs text-gray-600">${locationParts.join(' · ')}</span>`
          }

          // Wat kan ik er vinden?
          if (dataProps.minerals) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kan ik er vinden?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.minerals}</div>`
            if (dataProps.geology) {
              html += `<div class="text-sm text-gray-600 mt-1">Geologie: ${dataProps.geology}</div>`
            }
          }

          // Hoe kom ik er?
          if (dataProps.access || dataProps.tips) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Hoe kom ik er?</span></div>`
            if (dataProps.access) {
              const isVerboden = dataProps.access.toLowerCase().includes('verboden') ||
                                dataProps.access.toLowerCase().includes('niet toegankelijk') ||
                                dataProps.access.toLowerCase().includes('gesloten')
              const accessColor = isVerboden ? 'text-red-600' : 'text-gray-700'
              html += `<div class="text-sm ${accessColor} mt-1">${dataProps.access}</div>`
            }
            if (dataProps.tips) {
              html += `<div class="text-sm text-gray-600 mt-1 italic">Tip: ${dataProps.tips}</div>`
            }
          }
        }

        // Goudrivieren (NL/BE/DE/FR) - B1 stijl
        if (dataProps.layerType === 'goudrivier') {
          // Rivier, regio en land onder titel
          const locationParts: string[] = []
          if (dataProps.river) locationParts.push(dataProps.river)
          if (dataProps.region) locationParts.push(dataProps.region)
          if (dataProps.country) {
            const countryNames: Record<string, string> = { 'NL': 'Nederland', 'BE': 'België', 'DE': 'Duitsland', 'FR': 'Frankrijk' }
            locationParts.push(countryNames[dataProps.country] || dataProps.country)
          }
          if (locationParts.length > 0) {
            html += `<br/><span class="text-xs text-gray-600">${locationParts.join(' · ')}</span>`
          }

          // Wat kan ik er vinden?
          if (dataProps.goldType || dataProps.origin) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat kan ik er vinden?</span></div>`
            if (dataProps.goldType) {
              html += `<div class="text-sm text-gray-700 mt-1">${dataProps.goldType}</div>`
            }
            if (dataProps.origin) {
              html += `<div class="text-sm text-gray-600 mt-1">Herkomst: ${dataProps.origin}</div>`
            }
          }

          // Mag ik hier zoeken?
          if (dataProps.legal || dataProps.tips) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Mag ik hier zoeken?</span></div>`
            if (dataProps.legal) {
              const isProhibited = dataProps.legal.includes('VERBODEN')
              const colorClass = isProhibited ? 'text-red-600 font-semibold' : 'text-gray-700'
              html += `<div class="text-sm ${colorClass} mt-1">${dataProps.legal}</div>`
            }
            if (dataProps.tips) {
              html += `<div class="text-sm text-gray-600 mt-1 italic">Tip: ${dataProps.tips}</div>`
            }
          }
        }

        // Wandelroutes - startpunten populaire wandelingen - B1 stijl
        if (dataProps.layerType === 'wandelroute') {
          // Regio en land onder titel
          const locationParts: string[] = []
          if (dataProps.region) locationParts.push(dataProps.region)
          if (dataProps.country) {
            const countryNames: Record<string, string> = { 'NL': 'Nederland', 'BE': 'België' }
            locationParts.push(countryNames[dataProps.country] || dataProps.country)
          }
          if (locationParts.length > 0) {
            html += `<br/><span class="text-xs text-gray-600">${locationParts.join(' · ')}</span>`
          }

          // Afstand en duur
          if (dataProps.distance || dataProps.duration) {
            const distanceText = dataProps.distance ? `${dataProps.distance} km` : ''
            const durationText = dataProps.duration ? `${dataProps.duration}` : ''
            const combined = [distanceText, durationText].filter(Boolean).join(' · ')
            if (combined) {
              html += `<br/><span class="text-sm text-green-700 font-medium">${combined}</span>`
            }
          }

          // Wat ga je zien?
          if (dataProps.description || dataProps.highlights) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat ga je zien?</span></div>`
            if (dataProps.description) {
              html += `<div class="text-sm text-gray-700 mt-1">${dataProps.description}</div>`
            }
            if (dataProps.highlights) {
              html += `<div class="text-sm text-gray-600 mt-1">Hoogtepunten: ${dataProps.highlights}</div>`
            }
          }

          // Waar begin ik?
          if (dataProps.startAddress) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Waar begin ik?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.startAddress}</div>`
          }

          // Meer info link
          if (dataProps.url) {
            html += `<div class="mt-3"><a href="${dataProps.url}" target="_blank" class="text-sm text-blue-600 hover:underline">Bekijk route en download GPX</a></div>`
          }
        }

        // Hunebedden (megalithische grafmonumenten) - B1 stijl
        if (dataProps.layerType === 'hunebed') {
          // Periode direct onder titel
          if (dataProps.period) {
            html += `<br/><span class="text-sm text-purple-700">Periode: ${dataProps.period}</span>`
          }

          // "Wat zie je hier?" sectie
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat zie je hier?</span></div>`

          // Intro tekst
          if (dataProps.description) {
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.description}</div>`
          }

          // Bullet points voor stenen en afmetingen
          const bulletPoints: string[] = []
          if (dataProps.stones) {
            // Parse stones string into separate items
            const stonesLower = dataProps.stones.toLowerCase()
            const dekMatch = stonesLower.match(/(\d+)\s*dekst[^\s,]*/i)
            const draagMatch = stonesLower.match(/(\d+)\s*draagst[^\s,]*/i)
            const sluitMatch = stonesLower.match(/(\d+)\s*sluitst[^\s,]*/i)
            const poortMatch = stonesLower.match(/(\d+)\s*poortst[^\s,]*/i)
            const gangdekMatch = stonesLower.match(/(\d+)\s*gangdekst[^\s,]*/i)
            const gangzijMatch = stonesLower.match(/(\d+)\s*gangzijst[^\s,]*/i)

            if (dekMatch) bulletPoints.push(`${dekMatch[1]} deksteen${parseInt(dekMatch[1]) > 1 ? 'en' : ''} (de grote steen${parseInt(dekMatch[1]) > 1 ? 'en' : ''} bovenop)`)
            if (draagMatch) bulletPoints.push(`${draagMatch[1]} draagstenen (de stenen die de dekstenen dragen)`)
            if (sluitMatch) bulletPoints.push(`${sluitMatch[1]} sluitsteen${parseInt(sluitMatch[1]) > 1 ? 'en' : ''} (afsluiting aan de korte zijden)`)
            if (poortMatch) bulletPoints.push(`${poortMatch[1]} poortsteen${parseInt(poortMatch[1]) > 1 ? 'en' : ''} (bij de ingang)`)
            if (gangdekMatch) bulletPoints.push(`${gangdekMatch[1]} gangdeksteen${parseInt(gangdekMatch[1]) > 1 ? 'en' : ''} (boven de toegangsgang)`)
            if (gangzijMatch) bulletPoints.push(`${gangzijMatch[1]} gangzijstenen (langs de toegangsgang)`)
          }
          if (dataProps.length) {
            bulletPoints.push(`Een grafkamer van ${dataProps.length} lang`)
          }
          if (dataProps.width) {
            bulletPoints.push(`${dataProps.width}`)
          }

          if (bulletPoints.length > 0) {
            html += `<div class="text-sm text-gray-700 mt-1">Het hunebed heeft:</div>`
            html += `<ul class="list-disc list-inside text-sm text-gray-700 mt-1 space-y-0.5">`
            bulletPoints.forEach(point => {
              html += `<li>${point}</li>`
            })
            html += `</ul>`
          }

          // "Waarom is dit hunebed bijzonder?" of andere notable info
          if (dataProps.notable) {
            // Bepaal een passende vraag op basis van de notable tekst
            const notableLower = dataProps.notable.toLowerCase()
            let questionTitle = 'Wat is hier bijzonder?'
            if (notableLower.includes('grootste')) {
              questionTitle = 'Waarom is dit het grootste hunebed?'
            } else if (notableLower.includes('klein') || notableLower.includes('kindhunebed')) {
              questionTitle = 'Waarom is dit hunebed zo klein?'
            } else if (notableLower.includes('cluster') || notableLower.includes('naast elkaar')) {
              questionTitle = 'Waarom liggen hier meerdere hunebedden?'
            } else if (notableLower.includes('enige') || notableLower.includes('westelijk') || notableLower.includes('noordelijk')) {
              questionTitle = 'Wat maakt deze locatie bijzonder?'
            }

            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">${questionTitle}</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.notable}</div>`
          }

          // "Wat is de Trechterbeker cultuur?" - standaard uitleg
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is de Trechterbeker cultuur?</span></div>`
          html += `<div class="text-sm text-gray-700 mt-1">De Trechterbeker cultuur is de naam voor de mensen die 5.000 jaar geleden in Nederland woonden. Ze maakten potten met een trechter-vorm. Daarom heten ze zo. Deze mensen bouwden de hunebedden als graven voor hun doden.</div>`

          // Vondsten (als er zijn)
          if (dataProps.finds) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Wat is hier gevonden?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.finds}</div>`
          }

          // Museum info
          if (dataProps.museum) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Museum in de buurt</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.museum}</div>`
          }

          // "Bezoeken" sectie
          html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Bezoeken</span></div>`
          if (dataProps.access) {
            html += `<div class="text-sm text-gray-700 mt-1">${dataProps.access}</div>`
          } else {
            html += `<div class="text-sm text-gray-700 mt-1">Je kunt dit hunebed gratis bezoeken.</div>`
          }

          // "Meer weten?" sectie
          if (dataProps.wikipedia) {
            html += `<div class="mt-3"><span class="text-sm font-semibold text-gray-800">Meer weten?</span></div>`
            html += `<div class="text-sm text-gray-700 mt-1">Lees meer op <a href="${dataProps.wikipedia}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Wikipedia</a></div>`
          }
        }

        // CAI Vlaanderen
        if (dataProps.inventarisnummer || dataProps.locatie_naam) {
          if (dataProps.locatie_naam) {
            html += `<br/><span class="text-sm font-semibold">${dataProps.locatie_naam}</span>`
          }
          if (dataProps.inventarisnummer) {
            html += `<br/><span class="text-xs text-gray-500">CAI: ${dataProps.inventarisnummer}</span>`
          }
          if (dataProps.datering_tekst) {
            html += `<br/><span class="text-sm text-purple-700">${dataProps.datering_tekst}</span>`
          }
        }

        // Veengebieden
        if (dataProps.veensoort || dataProps.dikte) {
          if (dataProps.veensoort) {
            html += `<br/><span class="text-sm text-amber-700">${dataProps.veensoort}</span>`
          }
          if (dataProps.dikte) {
            html += `<br/><span class="text-xs text-gray-600">Dikte: ${dataProps.dikte}</span>`
          }
        }

        // Bretagne Archaeological Sites (Carte Archeologique Nationale)
        if (dataProps.nature && dataProps.debut) {
          html += `<br/><span class="text-sm text-purple-700">${dataProps.nature}</span>`
          const periode = dataProps.debut === dataProps.fin ? dataProps.debut : `${dataProps.debut} - ${dataProps.fin}`
          if (periode) {
            html += `<br/><span class="text-sm text-gray-700">Periode: ${periode}</span>`
          }
          if (dataProps.structure) {
            html += `<br/><span class="text-xs text-gray-600">${dataProps.structure}</span>`
          }
          if (dataProps.commune) {
            html += `<br/><span class="text-xs text-gray-500">${dataProps.commune}</span>`
          }
          if (dataProps.decouvert) {
            html += `<br/><span class="text-xs text-gray-400">Ontdekt: ${dataProps.decouvert}</span>`
          }
          if (dataProps.numero) {
            html += `<br/><span class="text-xs text-gray-400">${dataProps.numero}</span>`
          }
        }

        // Bretagne Operations (excavations/diagnostics)
        if (dataProps.NATURE_OPE || dataProps.CODE_OPERA) {
          if (dataProps.TITRE) {
            html += `<br/><span class="text-sm font-semibold">${dataProps.TITRE}</span>`
          }
          if (dataProps.NATURE_OPE) {
            html += `<br/><span class="text-sm text-amber-700">${dataProps.NATURE_OPE}</span>`
          }
          if (dataProps.AUTEUR) {
            html += `<br/><span class="text-xs text-gray-600">Auteur: ${dataProps.AUTEUR}</span>`
          }
          if (dataProps.DATE) {
            html += `<br/><span class="text-xs text-gray-500">Datum: ${dataProps.DATE}</span>`
          }
          if (dataProps.COMMUNE) {
            html += `<br/><span class="text-xs text-gray-500">${dataProps.COMMUNE}</span>`
          }
        }

        // Occitanie Heritage Sites (Sites Classes & Inscrits)
        if (dataProps.type_protection && (dataProps.n_site || dataProps.t_site)) {
          const protColor = dataProps.type_protection === 'Classe' ? 'text-red-700' : 'text-amber-700'
          html += `<br/><span class="text-sm ${protColor}">${dataProps.type_protection}</span>`
          if (dataProps.n_site) {
            html += `<br/><span class="text-sm font-semibold">${dataProps.n_site}</span>`
          }
          if (dataProps.t_site) {
            html += `<br/><span class="text-xs text-gray-600">${dataProps.t_site}</span>`
          }
          if (dataProps.c_site) {
            html += `<br/><span class="text-xs text-gray-500">Code: ${dataProps.c_site}</span>`
          }
          if (dataProps.d_creation) {
            html += `<br/><span class="text-xs text-gray-400">Beschermd sinds: ${dataProps.d_creation}</span>`
          }
        }

        // PACA Heritage Sites (Sites Classes & Inscrits)
        if (dataProps.type_protection && dataProps.cod_diren) {
          const protColor = dataProps.type_protection === 'Classe' ? 'text-red-700' : 'text-amber-700'
          html += `<br/><span class="text-sm ${protColor}">${dataProps.type_protection}</span>`
          if (dataProps.proced) {
            html += `<br/><span class="text-xs text-gray-600">${dataProps.proced}</span>`
          }
          if (dataProps.d_proced) {
            html += `<br/><span class="text-xs text-gray-500">Date: ${dataProps.d_proced}</span>`
          }
          if (dataProps.comment) {
            const comment = String(dataProps.comment).slice(0, 150)
            html += `<br/><span class="text-xs text-gray-600 italic">${comment}${String(dataProps.comment).length > 150 ? '...' : ''}</span>`
          }
        }

        // Normandie Heritage Sites (Sites Classes & Inscrits)
        if (dataProps.type_protection && dataProps.nomsite) {
          const protColor = dataProps.type_protection === 'Classe' ? 'text-red-700' : 'text-amber-700'
          html += `<br/><span class="text-sm ${protColor}">${dataProps.type_protection}</span>`
          if (dataProps.caractere) {
            html += `<br/><span class="text-xs text-gray-600">${dataProps.caractere}</span>`
          }
          if (dataProps.datedecis) {
            html += `<br/><span class="text-xs text-gray-500">Date: ${dataProps.datedecis}</span>`
          }
          if (dataProps.descriptio) {
            const desc = String(dataProps.descriptio).slice(0, 150)
            html += `<br/><span class="text-xs text-gray-600 italic">${desc}${String(dataProps.descriptio).length > 150 ? '...' : ''}</span>`
          }
        }

        // Wikimaginot - Maginot Line fortifications
        if (dataProps.secteur && dataProps.style) {
          html += `<br/><span class="text-sm text-gray-700">${dataProps.secteur}</span>`
          if (dataProps['sous-secteur']) {
            html += `<br/><span class="text-xs text-gray-600">${dataProps['sous-secteur']}</span>`
          }
          if (dataProps.description) {
            const desc = String(dataProps.description).slice(0, 150)
            html += `<br/><span class="text-xs text-gray-600 italic">${desc}${String(dataProps.description).length > 150 ? '...' : ''}</span>`
          }
          if (dataProps.url) {
            html += `<br/><a href="${dataProps.url}" target="_blank" class="text-xs text-blue-600 hover:underline">Meer info</a>`
          }
        }

        // Paris Archaeological Reference (R&CAP project)
        if (dataProps.nature_operation || dataProps.synthese) {
          if (dataProps.nature_operation) {
            html += `<br/><span class="text-sm text-red-700">${dataProps.nature_operation}</span>`
          }
          if (dataProps.responsable_operation) {
            html += `<br/><span class="text-xs text-gray-600">Responsable: ${dataProps.responsable_operation}</span>`
          }
          if (dataProps.date_operation) {
            html += `<br/><span class="text-xs text-gray-500">Datum: ${dataProps.date_operation}</span>`
          }
          // Show periods found
          const periods = []
          if (dataProps.prehistoire === 'Oui') periods.push('Prehistorie')
          if (dataProps.protohistoire === 'Oui') periods.push('Protohistorie')
          if (dataProps.antiquite === 'Oui') periods.push('Romeins')
          if (dataProps.moyen_age === 'Oui') periods.push('Middeleeuwen')
          if (dataProps.temps_modernes === 'Oui') periods.push('Moderne tijd')
          if (periods.length > 0) {
            html += `<br/><span class="text-sm text-purple-700">${periods.join(', ')}</span>`
          }
          if (dataProps.adresse) {
            html += `<br/><span class="text-xs text-gray-500">${dataProps.adresse}</span>`
          }
          if (dataProps.synthese) {
            // Truncate long text
            const synthese = String(dataProps.synthese).slice(0, 200)
            html += `<br/><span class="text-xs text-gray-600 italic">${synthese}${String(dataProps.synthese).length > 200 ? '...' : ''}</span>`
          }
        }
        if (dataProps.operator) {
          html += `<br/><span class="text-sm text-gray-600">${dataProps.operator}</span>`
        }
        // Generic opening hours and website - skip if already handled by specific handler
        if (!isSpecificHandled) {
          if (dataProps.opening_hours) {
            const dutchHours = translateOpeningHours(String(dataProps.opening_hours))
            html += `<br/><span class="text-xs text-green-600">Open: ${dutchHours}</span>`
          }
          if (dataProps.website) {
            html += `<br/><a href="${dataProps.website}" target="_blank" class="text-xs text-blue-600 underline">Website</a>`
          }
        }
        if (dataProps.addr_street) {
          const addr = [dataProps.addr_street, dataProps.addr_housenumber, dataProps.addr_postcode].filter(Boolean).join(' ')
          html += `<br/><span class="text-xs text-gray-500">${addr}</span>`
        }

        // Generic description fields
        const description = dataProps.description || dataProps.omschrijving ||
                           dataProps.descr || dataProps.info
        if (description && description !== name) {
          html += `<br/><span class="text-sm text-gray-600">${description}</span>`
        }

        collectedContents.push(html)
        // Capture geometry for generic vector features
        collectedFeatureData.push({
          geometry: extractGeometry(geometry),
          properties: dataProps,
          popupHtml: html
        })
      }

      const hasImmediateContent = collectedContents.length > 0
      const baseContents = [...collectedContents]
      const baseFeatureData = [...collectedFeatureData]

      if (!hasImmediateContent) {
        const loadingHtml = `<strong class="text-blue-800">Kaartinformatie</strong>
          <br/><span class="text-sm text-gray-600">Informatie ophalen…</span>`
        openPopup(evt.coordinate, [loadingHtml], [null])
      }

      if (!priorityPopupShown && hasImmediateContent) {
        openPopup(evt.coordinate, baseContents, baseFeatureData)
      }

      if (priorityPopupShown && baseContents.length > priorityPopupContentCount) {
        openPopup(evt.coordinate, baseContents, baseFeatureData)
      }

      // Only after local content is shown do we enrich with live layers.
      const viewResolution = map.getView().getResolution() || 1
      const [wmsResults, height] = await Promise.all([
        queryWMSLayers(map, evt.coordinate, viewResolution),
        queryAHNHeight(evt.coordinate)
      ])

      if (popupRequestIdRef.current !== requestId) {
        return
      }

      const finalContents = [...baseContents]
      const finalFeatureData = [...baseFeatureData]

      finalContents.push(...wmsResults)
      // WMS results don't have local geometry (only point coordinate)
      for (const _wms of wmsResults) {
        finalFeatureData.push(null)
      }

      // If no features found anywhere, check for just height info
      if (finalContents.length === 0 && height !== null) {
        const heightHtml = `<strong class="text-blue-800">Terrein</strong>
          <br/><div class="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1">
            <span class="text-xs text-gray-400">Hoogte:</span>
            <span class="text-sm font-medium text-blue-600">${height.toFixed(2)} m NAP</span>
          </div>`
        finalContents.push(heightHtml)
        finalFeatureData.push(null) // Height-only doesn't have geometry
      }

      // Add height info to first popup if we have features
      if (finalContents.length > 0 && height !== null) {
        finalContents[0] += `<br/><div class="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1">
          <span class="text-xs text-gray-400">Hoogte:</span>
          <span class="text-sm font-medium text-blue-600">${height.toFixed(2)} m NAP</span>
        </div>`
      }

      // Refresh popup only when there is deferred live info,
      // or when we had no local content to show immediately.
      const hasDeferredInfo = wmsResults.length > 0 || height !== null
      if (finalContents.length > 0 && (!hasImmediateContent || hasDeferredInfo)) {
        openPopup(evt.coordinate, finalContents, finalFeatureData, !hasImmediateContent)
      } else if (!hasImmediateContent) {
        const noInfoHtml = `<strong class="text-gray-700">Kaartinformatie</strong>
          <br/><span class="text-sm text-gray-500">Op deze plek is geen informatie gevonden.</span>`
        openPopup(evt.coordinate, [noInfoHtml], [null], false)
      }
    }

    map.on('pointerdrag', handlePointerDrag)
    map.on('pointermove', handleHover)
    map.on('singleclick', handleClick)

    return () => {
      map.un('pointerdrag', handlePointerDrag)
      map.un('pointermove', handleHover)
      map.getTargetElement().style.cursor = ''
      map.un('singleclick', handleClick)
    }
  }, [map])

  const handleClose = () => {
    setQuickInfo(null)
    setHoverInfo(null)
    resumeClickRef.current = null
    confirmedClickRef.current = false
    popupRequestIdRef.current += 1
    heightMapAbortRef.current?.abort()
    heightMapAbortRef.current = null
    setVisible(false)
    setPopupHeight('half') // Reset to half height for next popup
    setEditingCustomPoint(null)
    setConfirmCustomPointDelete(false)
    setLoadingHeightMap(false)
    setHeightMapError(null)
    // Clear a visible or still-loading height map when closing the popup.
    if (map && (showingHeightMap || loadingHeightMap)) {
      clearParcelHighlight(map)
      setShowingHeightMap(false)
    }
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    const velocity = info.velocity.y
    const offset = info.offset.y

    if (popupHeight === 'half') {
      // In half mode: swipe up → full, swipe down → close
      if (offset < -50 || velocity < -500) {
        // Swipe up → expand to full
        setPopupHeight('full')
      } else if (offset > 100 || velocity > 500) {
        // Swipe down → close
        handleClose()
      }
    } else {
      // In full mode: swipe down → back to half
      if (offset > 50 || velocity > 300) {
        setPopupHeight('half')
      }
    }
  }

  return (
    <>
      {!visible && (quickInfo || hoverInfo) && previewPosition && (
        <div ref={previewRef} data-map-preview className="fixed z-[1490] overflow-auto rounded-xl bg-white text-gray-900 shadow-xl border border-gray-200 p-3"
          style={{ boxSizing: 'border-box', overflowWrap: 'anywhere' }} role="status">
          <div className="flex justify-between items-center gap-2 mb-2">
            <strong className="text-sm">{quickInfo ? 'Punten op deze plek' : 'Puntinformatie'}</strong>
            {quickInfo && <button className="text-gray-600 p-1" onClick={() => setQuickInfo(null)} aria-label="Sluiten"><X size={18}/></button>}
          </div>
          {(quickInfo || hoverInfo || []).slice(0, 3).map((item, index) => (
            <div key={index} className="py-1.5 border-t border-gray-100 text-sm">
              <div className="text-xs text-gray-500">{item.layer}</div>
              <div className="font-medium">{item.name}</div>
              {item.detail && <div className="text-xs text-gray-600">{item.detail}</div>}
            </div>
          ))}
          {(quickInfo || hoverInfo || []).length > 3 && <div className="text-xs text-gray-500">+ {(quickInfo || hoverInfo || []).length - 3} andere punten</div>}
          <button className="w-full mt-2 rounded-lg bg-blue-600 text-white py-2 text-sm font-medium" onClick={() => resumeClickRef.current?.()}>Details bekijken</button>
        </div>
      )}
      <AnimatePresence>
      {visible && (
        <>
          {/* Close on a new pointer gesture. Using click here makes the
              compatibility click from the map tap fall through onto this
              newly mounted backdrop and immediately close the popup. */}
          <motion.div
            className="fixed inset-0 z-[1500]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={handleClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            data-map-details
            className="fixed bottom-0 left-0 right-0 z-[1501] bg-white rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              fontSize: `${14 * textScale / 100}px`,
              // In half mode: auto height up to 35vh. In full mode: fixed 90vh
              height: popupHeight === 'full' ? '90vh' : 'auto',
              maxHeight: popupHeight === 'full' ? '90vh' : '35vh'
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
          >
            {/* Blue gradient header - like MonumentSearch */}
            <div
              className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-grab active:cursor-grabbing rounded-t-xl select-none"
              onClick={() => setPopupHeight(popupHeight === 'half' ? 'full' : 'half')}
            >
              {/* Left side: navigation (if multiple) + title */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Navigation buttons (only if multiple) */}
                {hasMultiple && (
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                      className="p-1 text-white/80 hover:text-white transition-colors border-0 outline-none bg-transparent"
                      aria-label="Vorige laag"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-white/80 font-medium min-w-[32px] text-center" style={{ fontSize: '0.75em' }}>
                      {currentIndex + 1}/{allContents.length}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); goToNext(); }}
                      className="p-1 text-white/80 hover:text-white transition-colors border-0 outline-none bg-transparent"
                      aria-label="Volgende laag"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}

                {/* Title */}
                <span className="font-medium text-white truncate" style={{ fontSize: '0.9em' }}>
                  {extractedTitle || 'Info'}
                </span>
              </div>

              {/* Right side: action icons + grip handle + close */}
              <div className="flex items-center gap-1 flex-shrink-0">

              {/* Add to layer button */}
              {popupCoordinate && !currentFeatureData?.isOwnLayer && (
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowLayerPicker(!showLayerPicker); }}
                    className={`p-1 transition-colors flex-shrink-0 border-0 outline-none bg-transparent rounded hover:bg-white/20 ${
                      addedToLayer
                        ? 'text-green-300'
                        : 'text-white/80 hover:text-white'
                    }`}
                    title="Toevoegen aan mijn laag"
                    aria-label="Toevoegen aan mijn laag"
                  >
                    {addedToLayer ? <Check size={16} /> : <Plus size={16} />}
                  </button>

                  {/* Layer picker dropdown - opent naar beneden, binnen de popup content */}
                  {showLayerPicker && (
                    <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[180px] max-w-[220px]">
                      <div className="px-3 py-1 text-xs text-gray-400 font-medium">Toevoegen aan:</div>
                      {/* Scrollable layer list */}
                      <div className="max-h-[200px] overflow-y-auto">
                        {selectableUserLayers.map(layer => (
                          <button
                            key={layer.key}
                            onClick={() => addPopupPointToUserLayer(layer.target, layer.name)}
                            className="w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-blue-50 border-0 outline-none bg-transparent flex items-center gap-2"
                          >
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: layer.color }}></span>
                            <span className="truncate">{layer.name}</span>
                          </button>
                        ))}
                      </div>
                      {/* Nieuwe laag maken optie */}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        {showNewLayerInput ? (
                          <div className="px-2 py-1">
                            <input
                              type="text"
                              value={newLayerName}
                              onChange={(e) => setNewLayerName(e.target.value)}
                              placeholder="Naam nieuwe laag..."
                              className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-orange-400"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && newLayerName.trim()) {
                                  createLayerAndAddPopupPoint()
                                } else if (e.key === 'Escape') {
                                  setShowNewLayerInput(false)
                                  setNewLayerName('')
                                }
                              }}
                            />
                            <div className="flex gap-1 mt-1">
                              <button
                                onClick={createLayerAndAddPopupPoint}
                                disabled={!newLayerName.trim()}
                                className="flex-1 px-2 py-1 text-xs bg-orange-500 text-white rounded disabled:opacity-50"
                              >
                                Toevoegen
                              </button>
                              <button
                                onClick={() => {
                                  setShowNewLayerInput(false)
                                  setNewLayerName('')
                                }}
                                className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                              >
                                Annuleer
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowNewLayerInput(true)}
                            className="w-full px-3 py-1.5 text-left text-sm text-orange-600 hover:bg-orange-50 border-0 outline-none bg-transparent flex items-center gap-2"
                          >
                            <Plus size={14} />
                            <span>Nieuwe laag maken...</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Street View button */}
              {streetViewUrl && (
                <a
                  href={streetViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-amber-500 hover:text-amber-600 transition-colors flex-shrink-0"
                  title="Open Street View"
                  aria-label="Open Street View"
                >
                  <PersonStanding size={18} />
                </a>
              )}

              {/* Open in Google Maps button */}
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 text-white/80 hover:text-white transition-colors flex-shrink-0 rounded hover:bg-white/20"
                  title="Navigeer naar locatie"
                  aria-label="Open in Google Maps"
                >
                  <ExternalLink size={16} />
                </a>
              )}

              {/* Drag handle indicator */}
              <GripHorizontal size={18} className="text-white/60 mx-1" />

              {/* Close button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                className="p-1 text-white/80 hover:text-white transition-colors flex-shrink-0 border-0 outline-none bg-transparent rounded hover:bg-white/20"
                aria-label="Sluiten"
              >
                <X size={16} />
              </button>
              </div>
            </div>

            {/* Content - scrollable, without title */}
            <div
              className={`px-4 py-3 overflow-y-auto select-text min-h-0 ${popupHeight === 'full' ? 'flex-1' : ''}`}
              style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
              dangerouslySetInnerHTML={{ __html: contentWithoutTitle }}
            />


            {/* Font size slider */}
            <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-2 flex-shrink-0">
              <Type size={14} className="text-gray-400 flex-shrink-0" />
              <input
                type="range"
                min="80"
                max="150"
                value={textScale}
                onChange={(e) => handleTextScaleChange(parseInt(e.target.value))}
                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-gray-400 w-8 text-right" style={{ fontSize: '0.857em' }}>{textScale}%</span>
            </div>

            {currentCustomPointLayer?.buddyLayerId && <BuddyWriteStatus />}
            {/* Handmatig toegevoegde punten worden rechtstreeks vanuit hun popup beheerd. */}
            {currentCustomPointRef && currentCustomPoint && !editingCustomPoint && currentCustomPointLayer?.buddyRole !== 'read' && (
              <div className="px-4 pb-4 flex gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    setConfirmCustomPointDelete(false)
                    setEditingCustomPoint({
                      original:{name:currentCustomPoint.name,phone:currentCustomPoint.phone || '',notes:currentCustomPoint.notes || '',url:currentCustomPoint.url || ''},
                      name: currentCustomPoint.name,
                      phone: currentCustomPoint.phone || '',
                      notes: currentCustomPoint.notes || '',
                      url: currentCustomPoint.url || '',
                    })
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors border-0 outline-none"
                >
                  <Pencil size={16} />
                  <span>Bewerken</span>
                </button>
                <button
                  onClick={() => {
                    if (!confirmCustomPointDelete) {
                      setConfirmCustomPointDelete(true)
                      return
                    }
                    removeCustomPoint(currentCustomPointRef.layerId, currentCustomPointRef.pointId)
                    setVisible(false)
                    setConfirmCustomPointDelete(false)
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-white rounded-lg transition-colors border-0 outline-none ${
                    confirmCustomPointDelete ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  <Trash2 size={16} />
                  <span>{confirmCustomPointDelete ? 'Nogmaals' : 'Verwijderen'}</span>
                </button>
              </div>
            )}

            {editingCustomPoint && currentCustomPointRef && currentCustomPointLayer?.buddyRole !== 'read' && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3 flex-shrink-0 overflow-y-auto max-h-[50vh]">
                <div className="text-sm font-medium text-blue-600">Punt bewerken</div>
                <div>
                  <label className="text-xs text-gray-500">Naam *</label>
                  <input
                    type="text"
                    value={editingCustomPoint.name}
                    onChange={(event) => setEditingCustomPoint({ ...editingCustomPoint, name: event.target.value })}
                    className="w-full px-2 py-1.5 text-sm bg-gray-50 rounded border-0 outline-none focus:bg-blue-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Telefoonnummer</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={editingCustomPoint.phone}
                    onChange={(event) => setEditingCustomPoint({ ...editingCustomPoint, phone: event.target.value })}
                    className="w-full px-2 py-1.5 text-sm bg-gray-50 rounded border-0 outline-none focus:bg-blue-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Notitie</label>
                  <textarea
                    value={editingCustomPoint.notes}
                    onChange={(event) => setEditingCustomPoint({ ...editingCustomPoint, notes: event.target.value })}
                    className="w-full h-16 px-2 py-1.5 text-sm bg-gray-50 rounded border-0 outline-none focus:bg-blue-50 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Link</label>
                  <input
                    type="url"
                    value={editingCustomPoint.url}
                    onChange={(event) => setEditingCustomPoint({ ...editingCustomPoint, url: event.target.value })}
                    className="w-full px-2 py-1.5 text-sm bg-gray-50 rounded border-0 outline-none focus:bg-blue-50"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingCustomPoint(null)}
                    className="flex-1 px-3 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border-0 outline-none text-sm"
                  >
                    Annuleren
                  </button>
                  <button
                    disabled={!editingCustomPoint.name.trim()}
                    onClick={() => {
                      const fields = Object.fromEntries((['name','phone','notes','url'] as const)
                        .filter(key=>editingCustomPoint[key].trim()!==editingCustomPoint.original?.[key])
                        .map(key=>[key,editingCustomPoint[key].trim()]))
                      if(!updateCustomPoint(currentCustomPointRef.layerId, currentCustomPointRef.pointId, fields))return
                      setEditingCustomPoint(null)
                      setVisible(false)
                    }}
                    className="flex-1 px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg transition-colors border-0 outline-none text-sm"
                  >
                    Opslaan
                  </button>
                </div>
              </div>
            )}

            {/* Edit/Delete buttons for vondsten */}
            {isVondst && currentVondstId && !editingVondst && (
              <div className="px-4 pb-4 flex gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    const vondst = vondsten.find(v => v.id === currentVondstId)
                    if (vondst) setEditingVondst(vondst)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors border-0 outline-none"
                >
                  <Pencil size={16} />
                  <span>Bewerken</span>
                </button>
                <button
                  onClick={() => {
                    removeVondst(currentVondstId)
                    setVisible(false)
                    setCurrentVondstId(null)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors border-0 outline-none"
                >
                  <Trash2 size={16} />
                  <span>Verwijderen</span>
                </button>
              </div>
            )}

            {/* Inline edit form for vondsten */}
            {editingVondst && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3 flex-shrink-0 overflow-y-auto max-h-[40vh]">
                <div className="text-sm font-medium text-blue-600">Vondst bewerken</div>
                <div>
                  <label className="text-xs text-gray-500">Objecttype</label>
                  <input
                    type="text"
                    value={editingVondst.objectType}
                    onChange={(e) => setEditingVondst({ ...editingVondst, objectType: e.target.value })}
                    className="w-full px-2 py-1 text-sm bg-gray-50 rounded border-0 outline-none focus:bg-blue-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Materiaal</label>
                  <input
                    type="text"
                    value={editingVondst.material}
                    onChange={(e) => setEditingVondst({ ...editingVondst, material: e.target.value })}
                    className="w-full px-2 py-1 text-sm bg-gray-50 rounded border-0 outline-none focus:bg-blue-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Periode</label>
                  <input
                    type="text"
                    value={editingVondst.period}
                    onChange={(e) => setEditingVondst({ ...editingVondst, period: e.target.value })}
                    className="w-full px-2 py-1 text-sm bg-gray-50 rounded border-0 outline-none focus:bg-blue-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Notities</label>
                  <textarea
                    value={editingVondst.notes}
                    onChange={(e) => setEditingVondst({ ...editingVondst, notes: e.target.value })}
                    className="w-full px-2 py-1 text-sm bg-gray-50 rounded border-0 outline-none focus:bg-blue-50 resize-none h-16"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingVondst(null)}
                    className="flex-1 px-3 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border-0 outline-none text-sm"
                  >
                    Annuleren
                  </button>
                  <button
                    onClick={() => {
                      updateVondst(editingVondst.id, {
                        objectType: editingVondst.objectType,
                        material: editingVondst.material,
                        period: editingVondst.period,
                        notes: editingVondst.notes
                      })
                      setEditingVondst(null)
                      setVisible(false)
                    }}
                    className="flex-1 px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors border-0 outline-none text-sm"
                  >
                    Opslaan
                  </button>
                </div>
              </div>
            )}

            {/* Height map button stays available while the parcel layer is active,
                even when the live parcel-info request is slow or unavailable. */}
            {canShowHeightMap && (
              <div className="px-4 pb-4 border-t border-gray-100">
                {showingHeightMap ? (
                  <button
                    onClick={handleHideHeightMap}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border-0 outline-none"
                  >
                    <Mountain size={16} />
                    <span>Hoogtekaart verbergen</span>
                  </button>
                ) : (
                  <button
                    onClick={handleShowHeightMap}
                    disabled={loadingHeightMap}
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2 mt-3 text-white rounded-lg transition-colors border-0 outline-none ${
                      loadingHeightMap ? 'bg-blue-400 cursor-wait' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {loadingHeightMap ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Laden...</span>
                      </>
                    ) : (
                      <>
                        <Mountain size={16} />
                        <span>{heightMapError ? 'Opnieuw proberen' : 'Hoogtekaart tonen'}</span>
                      </>
                    )}
                  </button>
                )}
                {heightMapError && !showingHeightMap && (
                  <p className="mt-2 text-xs text-amber-700 text-center" role="status" aria-live="polite">
                    {heightMapError}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </>
  )
}
