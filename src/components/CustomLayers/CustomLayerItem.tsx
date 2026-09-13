import { useMemo, useState } from 'react'
import { Check, ChevronDown, Settings2 } from 'lucide-react'
import {
  getGeometryCounts,
  getImportedPropertyKeys,
  useCustomLayerStore,
  type CustomLayer,
  type GeometryGroup,
} from '../../store/customLayerStore'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'
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
    updateGeometryStyle,
    toggleGeometryVisibility,
    updatePopupConfig,
  } = useCustomLayerStore()
  const [expanded, setExpanded] = useState(false)
  const linkedPointCount = useCustomPointLayerStore(state =>
    state.layers.find(pointLayer => pointLayer.linkedImportedLayerId === layer.id)?.points.length || 0
  )

  const counts = useMemo(() => getGeometryCounts(layer.features), [layer.features])
  const propertyKeys = useMemo(() => getImportedPropertyKeys(layer.features), [layer.features])
  const visiblePropertyKeys = propertyKeys.filter(key =>
    layer.popupConfig.showTechnicalFields || !isTechnicalImportedField(key)
  )
  const featureCount = layer.features.features.length + linkedPointCount
  const primaryColor = counts.points > 0
    ? layer.style.points.color
    : counts.lines > 0
      ? layer.style.lines.color
      : layer.style.polygons.strokeColor

  const togglePopupField = (key: string) => {
    const hidden = layer.popupConfig.hiddenFields.includes(key)
    updatePopupConfig(layer.id, {
      hiddenFields: hidden
        ? layer.popupConfig.hiddenFields.filter(field => field !== key)
        : [...layer.popupConfig.hiddenFields, key],
    })
  }

  const renderGeometryRow = (
    group: GeometryGroup,
    color: string,
    onColorChange: (color: string) => void
  ) => (
    <section className="rounded bg-gray-50 p-2">
      <div className="flex items-center gap-2">
        <VisibilityButton
          visible={layer.style[group].visible}
          color={color}
          onClick={() => toggleGeometryVisibility(layer.id, group)}
          title={layer.style[group].visible ? `${GROUP_LABELS[group]} verbergen` : `${GROUP_LABELS[group]} tonen`}
        />
        <span className="flex-1 text-xs font-medium text-gray-700">
          {GROUP_LABELS[group]} <span className="font-normal text-gray-400">({counts[group] + (group === 'points' ? linkedPointCount : 0)})</span>
        </span>
        <label className="flex items-center gap-1 text-[11px] text-gray-500">
          Kleur
          <input
            type="color"
            value={color}
            onChange={event => onColorChange(event.target.value)}
            className="h-7 w-8 border-0 bg-transparent p-0"
            title={`${GROUP_LABELS[group]}kleur`}
          />
        </label>
      </div>
    </section>
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

        <button
          onClick={() => toggleVisibility(layer.id)}
          className="text-left text-gray-700 truncate flex-1 min-w-0"
          style={{ fontSize: '0.9em' }}
          title={layer.name}
        >
          {layer.name}
        </button>

        <span className="text-[10px] text-gray-400 flex-shrink-0">{featureCount}</span>
        <button onClick={() => setExpanded(value => !value)} className="p-1 text-cyan-700" title="Weergave en popup instellen">
          {expanded ? <ChevronDown size={14} /> : <Settings2 size={14} />}
        </button>
      </div>

      {expanded && (
        <div className="mx-1 mb-2 mt-1 rounded-lg border border-cyan-100 bg-white p-2 space-y-3 shadow-sm">
          {(counts.points > 0 || linkedPointCount > 0) && renderGeometryRow(
            'points',
            layer.style.points.color,
            color => updateGeometryStyle(layer.id, 'points', { color })
          )}

          {counts.lines > 0 && renderGeometryRow(
            'lines',
            layer.style.lines.color,
            color => updateGeometryStyle(layer.id, 'lines', { color })
          )}

          {counts.polygons > 0 && renderGeometryRow(
            'polygons',
            layer.style.polygons.strokeColor,
            color => updateGeometryStyle(layer.id, 'polygons', { fillColor: color, strokeColor: color })
          )}

          <section className="space-y-2 rounded border border-gray-100 p-2">
            <div className="text-xs font-medium text-gray-700">Popup</div>
            <label className="block text-xs text-gray-600">
              Naamveld
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
        </div>
      )}
    </div>
  )
}
