import { useMemo, useState } from 'react'
import { Check, Settings2, Trash2 } from 'lucide-react'
import { getGeometryCounts, useCustomLayerStore, type CustomLayer } from '../../store/customLayerStore'
import { useCustomPointLayerStore } from '../../store/customPointLayerStore'

interface Props {
  layer: CustomLayer
  compact?: boolean
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
  const toggleVisibility = useCustomLayerStore(state => state.toggleVisibility)
  const removeImportedLayer = useCustomLayerStore(state => state.removeLayer)
  const linkedPointLayer = useCustomPointLayerStore(state =>
    state.layers.find(pointLayer => pointLayer.linkedImportedLayerId === layer.id)
  )
  const removePointLayer = useCustomPointLayerStore(state => state.removeLayer)
  const [expanded, setExpanded] = useState(false)

  const counts = useMemo(() => getGeometryCounts(layer.features), [layer.features])
  const linkedPointCount = linkedPointLayer?.points.length || 0
  const featureCount = layer.features.features.length + linkedPointCount
  const primaryColor = counts.points > 0 || linkedPointCount > 0
    ? layer.style.points.color
    : counts.lines > 0
      ? layer.style.lines.color
      : layer.style.polygons.strokeColor

  const handleDelete = () => {
    const objectLabel = featureCount === 1 ? '1 object' : `${featureCount} objecten`
    if (!window.confirm(
      `Laag “${layer.name}” met ${objectLabel} verwijderen? Dit kan niet ongedaan worden gemaakt.`
    )) return

    removeImportedLayer(layer.id)
    if (linkedPointLayer) removePointLayer(linkedPointLayer.id)
    setExpanded(false)
  }

  return (
    <div className={`border-b border-gray-100 ${compact ? 'py-0.5' : 'py-1'}`}>
      <div className="flex items-center gap-2 rounded px-1 py-1 hover:bg-cyan-50">
        <VisibilityButton
          visible={layer.visible}
          color={primaryColor}
          onClick={() => toggleVisibility(layer.id)}
          title={layer.visible ? 'Laag verbergen' : 'Laag tonen'}
        />

        <button
          onClick={() => toggleVisibility(layer.id)}
          className="min-w-0 flex-1 truncate text-left text-gray-700"
          style={{ fontSize: '0.9em' }}
          title={layer.name}
        >
          {layer.name}
        </button>

        <span className="flex-shrink-0 text-[10px] text-gray-400">{featureCount}</span>
        <button
          onClick={() => setExpanded(value => !value)}
          className={`p-1 ${expanded ? 'text-red-600' : 'text-cyan-700'}`}
          title="Laaginstellingen"
          aria-expanded={expanded}
        >
          <Settings2 size={14} />
        </button>
      </div>

      {expanded && (
        <div className="mx-1 mb-2 mt-1 rounded-lg border border-red-100 bg-white p-2 shadow-sm">
          <button
            onClick={handleDelete}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            <Trash2 size={15} />
            Laag verwijderen
          </button>
        </div>
      )}
    </div>
  )
}
