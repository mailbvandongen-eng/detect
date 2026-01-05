import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Circle, Ban, Edit2, MapPin, ExternalLink, Trash2 } from 'lucide-react'
import { useUIStore, useSettingsStore } from '../../store'
import { useCustomPointLayerStore, type PointStatus, type CustomPoint } from '../../store/customPointLayerStore'

type FilterType = 'all' | 'todo' | 'completed' | 'skipped'

export function LayerDashboard() {
  const { layerDashboardOpen, layerDashboardLayerId, closeLayerDashboard } = useUIStore()
  const { getLayer, setPointStatus, updatePoint, removePoint } = useCustomPointLayerStore()
  const settings = useSettingsStore()

  const [filter, setFilter] = useState<FilterType>('all')
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const layer = layerDashboardLayerId ? getLayer(layerDashboardLayerId) : null

  const baseFontSize = 14 * settings.fontScale / 100

  if (!layer) return null

  // Filter points
  const filteredPoints = layer.points.filter(p => {
    if (filter === 'all') return true
    return p.status === filter
  })

  // Stats
  const totalPoints = layer.points.length
  const completedCount = layer.points.filter(p => p.status === 'completed').length
  const todoCount = layer.points.filter(p => p.status === 'todo').length
  const skippedCount = layer.points.filter(p => p.status === 'skipped').length

  const handleStatusChange = (pointId: string, newStatus: PointStatus) => {
    setPointStatus(layer.id, pointId, newStatus)
  }

  const handleSaveNotes = (pointId: string) => {
    updatePoint(layer.id, pointId, { notes: notesValue })
    setEditingNotes(null)
    setNotesValue('')
  }

  const handleDelete = (pointId: string) => {
    if (confirmDelete === pointId) {
      removePoint(layer.id, pointId)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(pointId)
      setTimeout(() => setConfirmDelete(null), 3000)
    }
  }

  const handleClose = () => {
    setEditingNotes(null)
    setConfirmDelete(null)
    closeLayerDashboard()
  }

  const getStatusIcon = (status: PointStatus) => {
    switch (status) {
      case 'completed':
        return <Check size={16} className="text-green-500" />
      case 'skipped':
        return <Ban size={16} className="text-gray-400" />
      default:
        return <Circle size={16} className="text-orange-400" />
    }
  }

  const getStatusLabel = (status: PointStatus) => {
    switch (status) {
      case 'completed': return 'Voltooid'
      case 'skipped': return 'Overgeslagen'
      default: return 'Te doen'
    }
  }

  return (
    <AnimatePresence>
      {layerDashboardOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[1700] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 z-[1701] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-lg mx-auto my-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Header - oranje voor eigen lagen */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/50"
                  style={{ backgroundColor: layer.color }}
                />
                <span className="font-medium truncate">{layer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Font size slider */}
                <span className="text-[10px] opacity-70">T</span>
                <input
                  type="range"
                  min="80"
                  max="150"
                  step="10"
                  value={settings.fontScale}
                  onChange={(e) => settings.setFontScale(parseInt(e.target.value))}
                  className="header-slider w-16 opacity-70 hover:opacity-100 transition-opacity"
                  title={`Tekstgrootte: ${settings.fontScale}%`}
                />
                <span className="text-xs opacity-70">T</span>
                <button
                  onClick={handleClose}
                  className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none ml-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Stats bar */}
            <div className="px-4 py-2 bg-orange-50 flex items-center justify-between text-sm">
              <span className="text-orange-800 font-medium">
                {completedCount}/{totalPoints} voltooid
              </span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-orange-600">{todoCount} te doen</span>
                {skippedCount > 0 && (
                  <span className="text-gray-500">{skippedCount} overgeslagen</span>
                )}
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex border-b border-gray-100">
              {(['all', 'todo', 'completed', 'skipped'] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 px-3 py-2 text-sm transition-colors border-0 outline-none ${
                    filter === f
                      ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {f === 'all' && 'Alles'}
                  {f === 'todo' && 'Te doen'}
                  {f === 'completed' && 'Voltooid'}
                  {f === 'skipped' && 'Overgeslagen'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto" style={{ fontSize: `${baseFontSize}px` }}>
              {filteredPoints.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Geen punten gevonden</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredPoints.map(point => (
                    <div key={point.id} className="p-3">
                      <div className="flex items-start gap-3">
                        {/* Status toggle */}
                        <div className="flex flex-col gap-1 pt-0.5">
                          <button
                            onClick={() => handleStatusChange(point.id, point.status === 'completed' ? 'todo' : 'completed')}
                            className={`w-6 h-6 flex items-center justify-center rounded border-0 outline-none transition-colors ${
                              point.status === 'completed'
                                ? 'bg-green-100 hover:bg-green-200'
                                : 'bg-gray-100 hover:bg-green-100'
                            }`}
                            title={point.status === 'completed' ? 'Markeer als te doen' : 'Markeer als voltooid'}
                          >
                            <Check size={14} className={point.status === 'completed' ? 'text-green-600' : 'text-gray-400'} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(point.id, point.status === 'skipped' ? 'todo' : 'skipped')}
                            className={`w-6 h-6 flex items-center justify-center rounded border-0 outline-none transition-colors ${
                              point.status === 'skipped'
                                ? 'bg-gray-200 hover:bg-gray-300'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            title={point.status === 'skipped' ? 'Markeer als te doen' : 'Overslaan'}
                          >
                            <Ban size={14} className={point.status === 'skipped' ? 'text-gray-600' : 'text-gray-400'} />
                          </button>
                        </div>

                        {/* Point info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium truncate ${
                              point.status === 'completed' ? 'text-green-700 line-through' :
                              point.status === 'skipped' ? 'text-gray-400 line-through' :
                              'text-gray-800'
                            }`}>
                              {point.name}
                            </span>
                            {point.sourceLayer && (
                              <span className="text-xs text-gray-400 truncate">
                                via {point.sourceLayer}
                              </span>
                            )}
                          </div>

                          {/* Notes */}
                          {editingNotes === point.id ? (
                            <div className="mt-2">
                              <textarea
                                value={notesValue}
                                onChange={(e) => setNotesValue(e.target.value)}
                                placeholder="Notities..."
                                rows={2}
                                className="w-full px-2 py-1 bg-white rounded border-0 outline-none hover:bg-blue-50 transition-colors resize-none text-sm"
                                autoFocus
                              />
                              <div className="flex gap-2 mt-1">
                                <button
                                  onClick={() => handleSaveNotes(point.id)}
                                  className="px-2 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 border-0 outline-none"
                                >
                                  Opslaan
                                </button>
                                <button
                                  onClick={() => { setEditingNotes(null); setNotesValue('') }}
                                  className="px-2 py-1 text-xs bg-white text-gray-600 rounded hover:bg-blue-50 border-0 outline-none"
                                >
                                  Annuleren
                                </button>
                              </div>
                            </div>
                          ) : point.notes ? (
                            <p className="text-sm text-gray-600 mt-1">{point.notes}</p>
                          ) : null}

                          {/* URL link */}
                          {point.url && (
                            <a
                              href={point.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-1"
                            >
                              <ExternalLink size={12} />
                              Link
                            </a>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setEditingNotes(point.id)
                              setNotesValue(point.notes)
                            }}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded border-0 outline-none"
                            title="Notities bewerken"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              // Open in Google Maps
                              window.open(`https://www.google.com/maps/dir/?api=1&destination=${point.coordinates[1]},${point.coordinates[0]}`, '_blank')
                            }}
                            className="w-6 h-6 flex items-center justify-center text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded border-0 outline-none"
                            title="Navigeer naar"
                          >
                            <MapPin size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(point.id)}
                            className={`w-6 h-6 flex items-center justify-center rounded border-0 outline-none ${
                              confirmDelete === point.id
                                ? 'text-white bg-red-500 hover:bg-red-600'
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                            title={confirmDelete === point.id ? 'Klik nogmaals' : 'Verwijderen'}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
