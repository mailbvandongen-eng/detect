export interface MaintenanceActions {
  scope: string
  online: boolean
  repair: boolean
  assertIdle: () => void
  verifyNetwork: () => Promise<void>
  update: () => Promise<void>
  cacheNames: () => Promise<string[]>
  deleteCache: (name: string) => Promise<boolean>
  reload: () => void
}

// Workbox app precache is scoped. Map tiles and other apps are excluded.
export function isAppCodeCache(name: string, scope: string): boolean {
  return name === `workbox-precache-v2-${scope}`
}

export async function refreshAppSafely(actions: MaintenanceActions): Promise<void> {
  if (!actions.online) throw new Error('Maak eerst verbinding met internet. Je offlinegegevens blijven behouden.')
  actions.assertIdle()
  // Verify an actual connection before touching any offline app files.
  await actions.verifyNetwork()
  actions.assertIdle()
  if (actions.repair) {
    const names = await actions.cacheNames()
    actions.assertIdle()
    for (const name of names.filter(name => isAppCodeCache(name, actions.scope))) {
      await actions.deleteCache(name)
    }
  }
  await actions.update()
  actions.assertIdle()
  actions.reload()
}
