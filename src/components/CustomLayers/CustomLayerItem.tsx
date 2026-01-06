import { useState, useRef, useEffect } from 'react'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import { useCustomLayerStore, type CustomLayer } from '../../store/customLayerStore'

// Preset colors for quick selection
const PRESET_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#6b7280', // gray
]

interface Props {
  layer: CustomLayer
  compact?: boolean // For ThemesPanel display
}

export function CustomLayerItem({ layer, compact = false }: Props) {
  const { toggleVisibility, removeLayer, updateLayer, setColor } = useCustomLayerStore()
  const [showConfirm, setShowConfirm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(layer.name)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const featureCount = layer.features.features.length
  const geometryTypes = [...new Set(layer.features.features.map(f => f.geometry?.type).filter(Boolean))]

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // Close color picker on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false)
      }
    }
    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker])

  const handleDelete = () => {
    if (showConfirm) {
      removeLayer(layer.id)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 3000)
    }
  }

  const handleSaveName = () => {
    const trimmed = editName.trim()
    if (trimmed && trimmed !== layer.name) {
      updateLayer(layer.id, { name: trimmed })
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditName(layer.name)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveName()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const handleColorSelect = (color: string) => {
    setColor(layer.id, color)
    setShowColorPicker(false)
  }

  // Compact view for ThemesPanel
  if (compact) {
    return (
      <div className="flex items-center gap-1 py-0.5 px-1 hover:bg-blue-50 transition-colors rounded">
        {/* Color indicator & toggle */}
        <button
          onClick={() => toggleVisibility(layer.id)}
          className="w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-100 flex-shrink-0"
          style={{
            backgroundColor: layer.visible ? layer.color : 'white',
            border: `2px solid ${layer.color}`,
          }}
          title={layer.visible ? 'Verbergen' : 'Tonen'}
        >
          {layer.visible && (
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path
                d="M2 5 L4 7 L8 3"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Layer name */}
        <span
          className="text-gray-700 truncate flex-1 cursor-pointer"
          style={{ fontSize: '0.9em' }}
          onClick={() => toggleVisibility(layer.id)}
        >
          {layer.name}
        </span>

        {/* Feature count badge */}
        <span className="text-[10px] text-gray-400 flex-shrink-0">
          {featureCount}
        </span>
      </div>
    )
  }

  // Full view for Settings panel
  return (
    <div className="flex items-center justify-between py-1.5 group">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Color picker button */}
        <div className="relative" ref={colorPickerRef}>
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-5 h-5 rounded border-2 border-white shadow-sm flex-shrink-0 hover:scale-110 transition-transform"
            style={{ backgroundColor: layer.color }}
            title="Kleur wijzigen"
          />

          {/* Color picker popup */}
          {showColorPicker && (
            <div className="absolute top-6 left-0 z-50 bg-white rounded-lg shadow-lg border p-2 grid grid-cols-3 gap-1">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-6 h-6 rounded border-2 transition-transform hover:scale-110 ${
                    color === layer.color ? 'border-gray-800 scale-110' : 'border-white'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>

        {/* Layer info */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-1">
              <input
                ref={inputRef}
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 text-sm px-1 py-0.5 border rounded min-w-0"
              />
              <button
                onClick={handleSaveName}
                className="p-0.5 text-green-600 hover:bg-green-50 rounded"
                title="Opslaan"
              >
                <Check size={14} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-0.5 text-gray-400 hover:bg-gray-100 rounded"
                title="Annuleren"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-700 truncate">{layer.name}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-0.5 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Naam wijzigen"
                >
                  <Pencil size={12} />
                </button>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <span>{featureCount} {featureCount === 1 ? 'feature' : 'features'}</span>
                {geometryTypes.length > 0 && (
                  <>
                    <span className="mx-0.5">·</span>
                    <span>{geometryTypes.join(', ')}</span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Visibility toggle checkbox - same style as LayerItem */}
        <button
          onClick={() => toggleVisibility(layer.id)}
          className="w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-100 flex-shrink-0"
          style={{
            backgroundColor: layer.visible ? layer.color : 'white',
            border: `2px solid ${layer.visible ? layer.color : '#9ca3af'}`,
          }}
          title={layer.visible ? 'Verbergen' : 'Tonen'}
        >
          {layer.visible && (
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path
                d="M2 5 L4 7 L8 3"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className={`p-1 rounded transition-colors border-0 outline-none ${
            showConfirm
              ? 'text-white bg-red-500 hover:bg-red-600'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
          title={showConfirm ? 'Klik nogmaals om te verwijderen' : 'Verwijderen'}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
