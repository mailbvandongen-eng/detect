import { useState } from 'react'
import { FileText, Ruler, Clock, Calendar, MapPin } from 'lucide-react'
import { useRouteRecordingStore } from '../../store/routeRecordingStore'
import type { RecordedRoute } from '../../store/routeRecordingStore'
import { AppWindow } from '../UI/AppWindow'

interface RouteDetailsModalProps {
  route: RecordedRoute
  onClose: () => void
}

const formatDistance = (meters: number) => {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(2)} km`
}

const formatDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}u ${m}m`
  return `${m} min`
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function RouteDetailsModal({ route, onClose }: RouteDetailsModalProps) {
  const { updateRouteNotes } = useRouteRecordingStore()
  const [notes, setNotes] = useState(route.notes || '')
  const [activeTab, setActiveTab] = useState<'info' | 'notes'>('info')

  const handleSaveNotes = () => {
    updateRouteNotes(route.id, notes)
  }

  // Get fresh route data
  const currentRoute = useRouteRecordingStore(state =>
    state.savedRoutes.find(r => r.id === route.id)
  ) || route

  return (
    <AppWindow
      isOpen
      title={currentRoute.name}
      icon={<MapPin size={18} />}
      placement="modal"
      onClose={onClose}
      onBack={onClose}
      subHeader={
        <>
          <p className="px-4 py-1.5 text-xs text-gray-500">{formatDate(currentRoute.createdAt)}</p>
          <div className="flex border-t border-gray-100">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 text-sm font-medium border-0 outline-none transition-colors ${
                activeTab === 'info' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MapPin size={16} className="inline mr-1" /> Info
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 text-sm font-medium border-0 outline-none transition-colors ${
                activeTab === 'notes' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText size={16} className="inline mr-1" /> Notities
            </button>
          </div>
        </>
      }
    >
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <Ruler size={16} />
                    <span className="text-xs text-gray-500">Afstand</span>
                  </div>
                  <p className="text-lg font-semibold">{formatDistance(currentRoute.totalDistance)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Clock size={16} />
                    <span className="text-xs text-gray-500">Duur</span>
                  </div>
                  <p className="text-lg font-semibold">{formatDuration(currentRoute.totalDuration)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <MapPin size={16} />
                  <span className="text-xs text-gray-500">Punten</span>
                </div>
                <p className="text-lg font-semibold">{currentRoute.points.length} GPS punten</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <Calendar size={16} />
                  <span className="text-xs text-gray-500">Aangemaakt</span>
                </div>
                <p className="text-sm">{formatDate(currentRoute.createdAt)}</p>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Voeg notities toe over deze route..."
                className="w-full h-48 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <button
                onClick={handleSaveNotes}
                className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors border-0 outline-none"
              >
                Notities opslaan
              </button>
            </div>
          )}
        </div>
    </AppWindow>
  )
}
