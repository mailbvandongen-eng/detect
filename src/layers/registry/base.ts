import type { LayerDefinition } from './shared'

export const baseLayerRegistry: Record<string, LayerDefinition> = {
  'Kansenkaart': {
    name: 'Kansenkaart',
    factory: async () => {
      const { createKansenkaartLayerOL } = await import('../kansenkaartOL')
      return createKansenkaartLayerOL()
    },
    immediateLoad: false,
    tier: 'premium'
  },
  'TMK 1850': {
    name: 'TMK 1850',
    factory: async () => null,
    immediateLoad: true,
    tier: 'premium'
  },
  'Bonnebladen 1900': {
    name: 'Bonnebladen 1900',
    factory: async () => null,
    immediateLoad: true,
    tier: 'premium'
  },
}
