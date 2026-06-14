import { useEffect, useRef } from 'react'
import { BASE_LAYER_IDS } from '../../layers/layerConfig'

interface UseDefaultBackgroundOptions {
  mapReady: boolean
  defaultBackground: string
  setLayerVisibility: (name: string, visible: boolean) => void
}

export function useDefaultBackground({
  mapReady,
  defaultBackground,
  setLayerVisibility,
}: UseDefaultBackgroundOptions) {
  const initialBackgroundApplied = useRef(false)

  useEffect(() => {
    if (!mapReady || initialBackgroundApplied.current) {
      return
    }

    const timer = setTimeout(() => {
      const backgroundToApply = defaultBackground || 'CartoDB (licht)'

      BASE_LAYER_IDS.forEach((layerId) => {
        setLayerVisibility(layerId, false)
      })

      if (BASE_LAYER_IDS.includes(backgroundToApply)) {
        setLayerVisibility(backgroundToApply, true)
      } else {
        setLayerVisibility('CartoDB (licht)', true)
      }

      initialBackgroundApplied.current = true
    }, 100)

    return () => clearTimeout(timer)
  }, [mapReady, defaultBackground, setLayerVisibility])
}
