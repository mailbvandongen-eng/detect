import { useEffect, useState } from 'react'
import { Check, Settings2, Trash2 } from 'lucide-react'
import { useCustomLayerStore, type CustomLayer } from '../../store/customLayerStore'

interface Props {
  layer: CustomLayer
  compact?: boolean
}

function VisibilityButton({ visible, onClick, title }: {
  visible: boolean
  onClick: () => void
  title: string
}) {
  return (
    <button
      onClick={onClick}
      className="detect-layer-visibility rounded flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: visible ? 'var(--detect-accent)' : 'transparent',
        border: `2px solid ${visible ? 'var(--detect-accent)' : 'var(--detect-window-muted)'}`,
      }}
      title={title}
    >
      {visible && <Check size={11} strokeWidth={3} color="white" />}
    </button>
  )
}

export function CustomLayerItem({ layer, compact = false }: Props) {
  const toggleVisibility = useCustomLayerStore(state => state.toggleVisibility)
  const updateImportedLayer = useCustomLayerStore(state => state.updateLayer)
  const removeImportedLayer = useCustomLayerStore(state => state.removeLayer)
  const [expanded, setExpanded] = useState(false)
  const [nameDraft, setNameDraft] = useState(layer.name)
  useEffect(() => { setNameDraft(layer.name) }, [layer.name])

  const featureCount = layer.features.features.length

  const handleRename = () => {
    const nextName = nameDraft.trim()
    if (!nextName || nextName === layer.name) {
      setNameDraft(layer.name)
      return
    }

    updateImportedLayer(layer.id, { name: nextName })
  }

  const handleDelete = () => {
    const objectLabel = featureCount === 1 ? '1 object' : `${featureCount} objecten`
    if (!window.confirm(
      `Laag “${layer.name}” met ${objectLabel} verwijderen? Dit kan niet ongedaan worden gemaakt.`
    )) return

    removeImportedLayer(layer.id)
    setExpanded(false)
  }

  return (
    <div className={`border-b border-gray-100 ${compact ? 'py-0.5' : 'py-1'}`}>
      <div className="detect-layer-row flex items-center gap-2 rounded px-1 py-1">
        <VisibilityButton
          visible={layer.visible}
          onClick={() => toggleVisibility(layer.id)}
          title={layer.visible ? 'Laag verbergen' : 'Laag tonen'}
        />

        <button
          onClick={() => toggleVisibility(layer.id)}
          className="detect-layer-name min-w-0 flex-1 truncate text-left text-gray-700"
          style={{ fontSize: '0.9em' }}
          title={layer.name}
        >
          {layer.name}
        </button>

        <span className="flex-shrink-0 text-[10px] text-gray-400">{featureCount}</span>
        <button
          onClick={() => setExpanded(value => !value)}
          className="detect-window-icon-button shrink-0"
          title="Laaginstellingen"
          aria-expanded={expanded}
        >
          <Settings2 size={14} />
        </button>
      </div>

      {expanded && (
        <div className="mx-1 mb-2 mt-1 space-y-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
            <div className="space-y-1">
              <div className="text-[11px] font-medium text-gray-600">Naam</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nameDraft}
                  onChange={event => setNameDraft(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') handleRename()
                    if (event.key === 'Escape') setNameDraft(layer.name)
                  }}
                  className="detect-form-field min-w-0 flex-1"
                  aria-label="Laagnaam"
                />
                <button
                  onClick={handleRename}
                  disabled={!nameDraft.trim() || nameDraft.trim() === layer.name}
                  className="detect-window-primary-button disabled:opacity-40"
                >
                  Opslaan
                </button>
              </div>
            </div>

            <button
              onClick={handleDelete}
              className="detect-danger-button flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
            >
              <Trash2 size={15} />
              Laag verwijderen
            </button>
        </div>
      )}
    </div>
  )
}
