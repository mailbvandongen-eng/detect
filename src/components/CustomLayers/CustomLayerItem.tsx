import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Pencil, RotateCcw, Save, Settings2, Trash2, X } from 'lucide-react'
import {
  getGeometryCounts,
  getImportedPropertyKeys,
  useCustomLayerStore,
  type CustomLayer,
  type GeometryGroup,
} from '../../store/customLayerStore'
import { formatImportedFieldLabel, isTechnicalImportedField } from '../../utils/importedLayerPopup'

interface Props {
  layer: CustomLayer
  compact?: boolean
}

const GROUP_LABELS: Record<GeometryGroup, string> = {
  points: 'Punten',
  lines: 'Lijnen',
  polygons: 'Vlakken',
}

function VisibilityButton({ visible, color, onClick, title }: {
  visible: boolean
  color: string
  onClick: () => void
  title: string
}) {
  return (
    <button
      onClick={onClick}
      className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: visible ? color : 'white',
        border: `2px solid ${visible ? color : '#9ca3af'}`,
      }}
      title={title}
    >
      {visible && <Check size={11} strokeWidth={3} color="white" />}
    </button>
  )
}

export function CustomLayerItem({ layer, compact = false }: Props) {
  const {
    toggleVisibility,
    removeLayer,
    updateLayer,
    setOpacity,
    updateGeometryStyle,
    toggleGeometryVisibility,
    updatePopupConfig,
    resetLayerStyle,
    saveLayerStyleAsDefaults,
    removeGeometryGroup,
  } = useCustomLayerStore()
  const [expanded, setExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(layer.name)
  const [deleteLayerConfirm, setDeleteLayerConfirm] = useState(false)
  const [deleteGroupConfirm, setDeleteGroupConfirm] = useState<GeometryGroup | null>(null)
  const [defaultsSaved, setDefaultsSaved] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const counts = useMemo(() => getGeometryCounts(layer.features), [layer.features])
  const propertyKeys = useMemo(() => getImportedPropertyKeys(layer.features), [layer.features])
  const visiblePropertyKeys = propertyKeys.filter(key =>
    layer.popupConfig.showTechnicalFields || !isTechnicalImportedField(key)
  )
  const featureCount = layer.features.features.length
  const primaryColor = counts.points > 0
    ? layer.style.points.color
    : counts.lines > 0
      ? layer.style.lines.color
      : layer.style.polygons.strokeColor

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const saveName = () => {
    const name = editName.trim()
    if (name && name !== layer.name) updateLayer(layer.id, { name })
    setIsEditing(false)
  }

  const cancelName = () => {
    setEditName(layer.name)
    setIsEditing(false)
  }

  const confirmLayerDelete = () => {
    if (deleteLayerConfirm) {
      removeLayer(layer.id)
      return
    }
    setDeleteLayerConfirm(true)
    window.setTimeout(() => setDeleteLayerConfirm(false), 3500)
  }

  const confirmGroupDelete = (group: GeometryGroup) => {
    if (deleteGroupConfirm === group) {
      removeGeometryGroup(layer.id, group)
      setDeleteGroupConfirm(null)
      return
    }
    setDeleteGroupConfirm(group)
    window.setTimeout(() => setDeleteGroupConfirm(current => current === group ? null : current), 3500)
  }

  const togglePopupField = (key: string) => {
    const hidden = layer.popupConfig.hiddenFields.includes(key)
    updatePopupConfig(layer.id, {
      hiddenFields: hidden
        ? layer.popupConfig.hiddenFields.filter(field => field !== key)
        : [...layer.popupConfig.hiddenFields, key],
    })
  }

  const saveDefaults = () => {
    saveLayerStyleAsDefaults(layer.id)
    setDefaultsSaved(true)
    window.setTimeout(() => setDefaultsSaved(false), 2500)
  }

  const renderGroupHeader = (group: GeometryGroup, color: string) => (
    <div className="flex items-center gap-2">
      <VisibilityButton
        visible={layer.style[group].visible}
        color={color}
        onClick={() => toggleGeometryVisibility(layer.id, group)}
        title={layer.style[group].visible ? `${GROUP_LABELS[group]} verbergen` : `${GROUP_LABELS[group]} tonen`}
      />
      <span className="text-xs font-medium text-gray-700 flex-1">
        {GROUP_LABELS[group]} <span className="font-normal text-gray-400">({counts[group]})</span>
      </span>
      <button
        onClick={() => confirmGroupDelete(group)}
        className={`p-1 rounded ${deleteGroupConfirm === group ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-red-600'}`}
        title={deleteGroupConfirm === group ? `Nogmaals: ${GROUP_LABELS[group].toLowerCase()} definitief wissen` : `${GROUP_LABELS[group]} definitief wissen`}
      >
        <Trash2 size={12} />
      </button>
    </div>
  )

  return (
    <div className={`border-b border-gray-100 ${compact ? 'py-0.5' : 'py-1'}`}>
      <div className="flex items-center gap-1 px-1 py-1 hover:bg-cyan-50 rounded">
        <VisibilityButton
          visible={layer.visible}
          color={primaryColor}
          onClick={() => toggleVisibility(layer.id)}
          title={layer.visible ? 'Hele import verbergen' : 'Hele import tonen'}
        />

        {isEditing ? (
          <div className="flex flex-1 items-center gap-1 min-w-0">
            <input
              ref={inputRef}
              value={editName}
              onChange={event => setEditName(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') saveName()
                if (event.key === 'Escape') cancelName()
              }}
              className="min-w-0 flex-1 border rounded px-1 py-0.5 text-xs"
            />
            <button onClick={saveName} title="Naam opslaan"><Check size={13} className="text-green-600" /></button>
            <button onClick={cancelName} title="Annuleren"><X size={13} className="text-gray-500" /></button>
          </div>
        ) : (
          <button
            onClick={() => toggleVisibility(layer.id)}
            className="text-left text-gray-700 truncate flex-1 min-w-0"
            style={{ fontSize: '0.9em' }}
            title={layer.name}
          >
            {layer.name}
          </button>
        )}

        <span className="text-[10px] text-gray-400 flex-shrink-0">{featureCount}</span>
        <button onClick={() => setExpanded(value => !value)} className="p-1 text-cyan-700" title="Weergave instellen">
          {expanded ? <ChevronDown size={14} /> : <Settings2 size={14} />}
        </button>
      </div>

      {expanded && (
        <div className="mx-1 mb-2 mt-1 rounded-lg border border-cyan-100 bg-white p-2 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsEditing(true)} className="text-xs text-gray-500 flex items-center gap-1">
              <Pencil size={12} /> Naam
            </button>
            <button
              onClick={confirmLayerDelete}
              className={`ml-auto text-xs flex items-center gap-1 rounded px-1.5 py-1 ${deleteLayerConfirm ? 'bg-red-500 text-white' : 'text-gray-500'}`}
            >
              <Trash2 size={12} /> {deleteLayerConfirm ? 'Nogmaals wissen' : 'Import wissen'}
            </button>
          </div>

          <label className="block text-xs text-gray-600">
            <span className="flex justify-between"><span>Totale dekking</span><span>{Math.round(layer.opacity * 100)}%</span></span>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={Math.round(layer.opacity * 100)}
              onChange={event => setOpacity(layer.id, Number(event.target.value) / 100)}
              className="w-full"
            />
          </label>

          {counts.points > 0 && (
            <section className="space-y-2 rounded bg-gray-50 p-2">
              {renderGroupHeader('points', layer.style.points.color)}
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 text-xs text-gray-600">
                <input
                  type="color"
                  value={layer.style.points.color}
                  onChange={event => updateGeometryStyle(layer.id, 'points', { color: event.target.value })}
                  className="h-7 w-8 p-0 border-0 bg-transparent"
                  title="Puntkleur"
                />
                <label>Grootte</label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={layer.style.points.radius}
                  onChange={event => updateGeometryStyle(layer.id, 'points', { radius: Number(event.target.value) })}
                  className="w-20"
                />
              </div>
              <label className="flex items-center justify-between gap-2 text-xs text-gray-600">
                <span>Clusteren bij uitzoomen</span>
                <input
                  type="checkbox"
                  checked={layer.style.points.cluster}
                  onChange={event => updateGeometryStyle(layer.id, 'points', { cluster: event.target.checked })}
                />
              </label>
            </section>
          )}

          {counts.lines > 0 && (
            <section className="space-y-2 rounded bg-gray-50 p-2">
              {renderGroupHeader('lines', layer.style.lines.color)}
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 text-xs text-gray-600">
                <input
                  type="color"
                  value={layer.style.lines.color}
                  onChange={event => updateGeometryStyle(layer.id, 'lines', { color: event.target.value })}
                  className="h-7 w-8 p-0 border-0 bg-transparent"
                  title="Lijnkleur"
                />
                <label>Dikte</label>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={layer.style.lines.width}
                  onChange={event => updateGeometryStyle(layer.id, 'lines', { width: Number(event.target.value) })}
                  className="w-20"
                />
              </div>
            </section>
          )}

          {counts.polygons > 0 && (
            <section className="space-y-2 rounded bg-gray-50 p-2">
              {renderGroupHeader('polygons', layer.style.polygons.strokeColor)}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                <label className="flex items-center gap-1">Vulling
                  <input
                    type="color"
                    value={layer.style.polygons.fillColor}
                    onChange={event => updateGeometryStyle(layer.id, 'polygons', { fillColor: event.target.value })}
                    className="h-7 w-8 p-0 border-0 bg-transparent"
                  />
                </label>
                <label className="flex items-center gap-1">Rand
                  <input
                    type="color"
                    value={layer.style.polygons.strokeColor}
                    onChange={event => updateGeometryStyle(layer.id, 'polygons', { strokeColor: event.target.value })}
                    className="h-7 w-8 p-0 border-0 bg-transparent"
                  />
                </label>
              </div>
              <label className="block text-xs text-gray-600">
                <span className="flex justify-between"><span>Vulling</span><span>{Math.round(layer.style.polygons.fillOpacity * 100)}%</span></span>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="2"
                  value={Math.round(layer.style.polygons.fillOpacity * 100)}
                  onChange={event => updateGeometryStyle(layer.id, 'polygons', { fillOpacity: Number(event.target.value) / 100 })}
                  className="w-full"
                />
              </label>
            </section>
          )}

          <section className="space-y-2 rounded border border-gray-100 p-2">
            <div className="text-xs font-medium text-gray-700">Popup</div>
            <label className="block text-xs text-gray-600">
              Titel
              <select
                value={layer.popupConfig.titleField || ''}
                onChange={event => updatePopupConfig(layer.id, { titleField: event.target.value || null })}
                className="mt-1 w-full rounded border border-gray-200 bg-white px-2 py-1 text-xs"
              >
                <option value="">Automatisch</option>
                {propertyKeys.filter(key => !isTechnicalImportedField(key)).map(key => (
                  <option key={key} value={key}>{formatImportedFieldLabel(key)}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center justify-between text-xs text-gray-600">
              <span>Technische velden tonen</span>
              <input
                type="checkbox"
                checked={layer.popupConfig.showTechnicalFields}
                onChange={event => updatePopupConfig(layer.id, { showTechnicalFields: event.target.checked })}
              />
            </label>
            {visiblePropertyKeys.length > 0 && (
              <details>
                <summary className="cursor-pointer text-xs text-cyan-700">Velden kiezen</summary>
                <div className="mt-1 max-h-36 overflow-y-auto space-y-1 border-t border-gray-100 pt-1">
                  {visiblePropertyKeys.map(key => (
                    <label key={key} className="flex items-center gap-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        checked={!layer.popupConfig.hiddenFields.includes(key)}
                        onChange={() => togglePopupField(key)}
                      />
                      <span className="truncate">{formatImportedFieldLabel(key)}</span>
                    </label>
                  ))}
                </div>
              </details>
            )}
          </section>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => resetLayerStyle(layer.id)} className="detect-window-secondary-button text-xs">
              <RotateCcw size={13} /> Herstel
            </button>
            <button onClick={saveDefaults} className="detect-window-secondary-button text-xs">
              {defaultsSaved ? <Check size={13} /> : <Save size={13} />}
              {defaultsSaved ? 'Bewaard' : 'Als standaard'}
            </button>
          </div>
          <p className="text-[10px] text-gray-400">
            Standaard geldt voor volgende imports; hun kleur blijft automatisch verschillend.
          </p>
        </div>
      )}
    </div>
  )
}
