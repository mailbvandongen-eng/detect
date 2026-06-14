import type { Layer } from 'ol/layer'
import type { LayerTier, Region } from '../../store/subscriptionStore'

export interface LayerDefinition {
  name: string
  factory: () => Promise<Layer | null>
  immediateLoad: boolean
  tier?: LayerTier
  regions?: Region[]
}
