import { useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { useLayerStore } from '../../store/layerStore'
import { useUIStore } from '../../store/uiStore'
import { getActiveOpacityLayers } from '../../utils/opacityLayers'
import { AppWindow } from './AppWindow'
import { MapControlButton } from './MapControlButton'

export function OpacitySliders() {
  const isOpen = useUIStore(state => state.activeWindow === 'opacity')
  const toggleWindow = useUIStore(state => state.toggleWindow)
  const closeWindow = useUIStore(state => state.closeWindow)
  const visibleLayers = useLayerStore(state => state.visible)
  const opacities = useLayerStore(state => state.opacity)
  const registeredLayers = useLayerStore(state => state.layers)
  const setLayerOpacity = useLayerStore(state => state.setLayerOpacity)
  const imports = useCustomLayerStore(state => state.layers)
  const setImportOpacity = useCustomLayerStore(state => state.setOpacity)
  const activeSliders = getActiveOpacityLayers(visibleLayers, opacities, registeredLayers, imports)

  useEffect(() => {
    if (isOpen && activeSliders.length === 0) closeWindow()
  }, [activeSliders.length, closeWindow, isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeWindow()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeWindow])

  if (activeSliders.length === 0) return null

  return (
    <div className="detect-opacity-control">
      <MapControlButton
        label="Transparantie"
        controls="opacity-slider-list"
        isOpen={isOpen}
        onClick={() => toggleWindow('opacity')}
      >
        <SlidersHorizontal size={22} strokeWidth={2} aria-hidden="true" />
      </MapControlButton>
      <AppWindow
        isOpen={isOpen}
        title="Transparantie"
        placement="right"
        showScaleControl={false}
        className="detect-window--compact-bottom-right"
        onClose={closeWindow}
      >
        <div id="opacity-slider-list" className="detect-opacity-list">
          {activeSliders.map(layer => (
            <div key={layer.id} className="detect-opacity-row">
              <label className="detect-opacity-label" htmlFor={`opacity-${layer.id}`}>
                <span>{layer.name}</span>
                <output>{Math.round(layer.opacity * 100)}%</output>
              </label>
              <input
                id={`opacity-${layer.id}`}
                type="range"
                min="0"
                max="100"
                step="1"
                value={Math.round(layer.opacity * 100)}
                aria-valuetext={`${Math.round(layer.opacity * 100)}%`}
                onChange={event => {
                  const opacity = Number(event.target.value) / 100
                  if (layer.kind === 'imported') setImportOpacity(layer.layerKey, opacity)
                  else setLayerOpacity(layer.layerKey, opacity)
                }}
              />
            </div>
          ))}
        </div>
      </AppWindow>
    </div>
  )
}
