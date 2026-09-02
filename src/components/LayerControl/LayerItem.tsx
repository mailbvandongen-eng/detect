import { Check, Loader2, AlertCircle, Tag } from 'lucide-react'
import { useLayerStore } from '../../store'
import type { LoadingState } from '../../store/layerStore'

interface Props {
  name: string
  type: 'overlay' | 'base'
  hasOverlay?: boolean  // Show Labels Overlay toggle for this base layer
  displayName?: string  // Optional display name (uses 'name' for layer lookup)
}

const BASE_LAYER_NAMES = [
  'Esri (licht)',
  'OpenStreetMap',
  'Luchtfoto',
  'Satelliet (wereld)',
  'Hybride (wereld)',
  'TMK 1850',
  'Bonnebladen 1900'
]

export function LayerItem({ name, type, hasOverlay, displayName }: Props) {
  const visible = useLayerStore(state => state.visible[name])
  const labelsVisible = useLayerStore(state => state.visible['Labels Overlay'])
  const hybridVisible = useLayerStore(state => state.visible['Hybride (wereld)'])
  const loadingState = useLayerStore(state => state.loadingState[name]) as LoadingState | undefined
  const toggleLayer = useLayerStore(state => state.toggleLayer)
  const setLayerVisibility = useLayerStore(state => state.setLayerVisibility)
  const isLoading = loadingState === 'loading'
  const hasError = loadingState === 'error'
  const showHybridCompanion = type === 'base' && name === 'Satelliet (wereld)'

  const selectBaseLayer = (layerName: string) => {
    BASE_LAYER_NAMES.forEach(baseLayerName => {
      setLayerVisibility(baseLayerName, baseLayerName === layerName)
    })
  }

  const handleChange = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isLoading) return

    if (type === 'overlay') {
      toggleLayer(name)
    } else {
      selectBaseLayer(name)
    }
  }

  const handleHybridChange = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectBaseLayer('Hybride (wereld)')
  }

  const handleLabelsToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLayerVisibility('Labels Overlay', !labelsVisible)
  }

  const isChecked = visible ?? false

  return (
    <div className={showHybridCompanion ? 'space-y-0' : undefined}>
      <div className="flex items-center gap-1">
        <button
          onClick={handleChange}
          disabled={isLoading}
          className={`flex-1 flex items-center justify-between py-1 pl-3 pr-2 border-0 outline-none transition-colors text-left ${
            isLoading
                ? 'opacity-70 cursor-wait bg-transparent'
                : isChecked
                  ? 'bg-blue-50 hover:bg-blue-100'
                  : 'bg-transparent hover:bg-blue-50'
          }`}
          style={{ fontSize: 'inherit' }}
        >
          <span className={`flex items-center gap-1 ${hasError ? 'text-red-500' : 'text-gray-600'}`}>
            {displayName || name}
            {hasError && <AlertCircle size={12} className="text-red-500" />}
          </span>
          <div
            className="w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-100 flex-shrink-0"
            style={{
              backgroundColor: isLoading ? '#93c5fd' : isChecked ? '#3b82f6' : 'white',
              border: isLoading ? '2px solid #93c5fd' : isChecked ? '2px solid #3b82f6' : '2px solid #60a5fa',
              color: 'white'
            }}
          >
            {isLoading ? (
              <Loader2 size={10} strokeWidth={3} className="animate-spin" />
            ) : isChecked ? (
              <Check size={12} strokeWidth={3} />
            ) : null}
          </div>
        </button>

        {hasOverlay && isChecked && (
          <button
            onClick={handleLabelsToggle}
            className={`p-1 rounded transition-colors border-0 outline-none ${
              labelsVisible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
            title={labelsVisible ? 'Labels verbergen' : 'Labels tonen'}
          >
            <Tag size={12} />
          </button>
        )}
      </div>

      {showHybridCompanion && (
        <button
          onClick={handleHybridChange}
          className={`w-full flex items-center justify-between py-1 pl-3 pr-2 border-0 outline-none transition-colors text-left ${
            hybridVisible ? 'bg-blue-50 hover:bg-blue-100' : 'bg-transparent hover:bg-blue-50'
          }`}
          style={{ fontSize: 'inherit' }}
          title="Esri World Imagery met dynamische wegen, plaatsen en gebiedsnamen"
        >
          <span className="flex items-center gap-1 text-gray-600">Hybride (wereld)</span>
          <div
            className="w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-100 flex-shrink-0"
            style={{
              backgroundColor: hybridVisible ? '#3b82f6' : 'white',
              border: hybridVisible ? '2px solid #3b82f6' : '2px solid #60a5fa',
              color: 'white'
            }}
          >
            {hybridVisible && <Check size={12} strokeWidth={3} />}
          </div>
        </button>
      )}
    </div>
  )
}
