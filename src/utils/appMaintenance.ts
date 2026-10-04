export interface MaintenanceActions {
  scope: string
  online: boolean
  repair: boolean
  assertIdle: () => void
  verifyNetwork: () => Promise<void>
  update: () => Promise<void>
  registrations: () => Promise<readonly { scope: string; unregister: () => Promise<boolean> }[]>
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
    const registrations = await actions.registrations()
    actions.assertIdle()
    for (const registration of registrations.filter(item => item.scope === actions.scope)) {
      if (!await registration.unregister()) throw new Error('Appbestanden konden niet worden vrijgegeven. Probeer opnieuw.')
    }
    const names = await actions.cacheNames()
    actions.assertIdle()
    for (const name of names.filter(name => isAppCodeCache(name, actions.scope))) {
      await actions.deleteCache(name)
    }
  } else {
    await actions.update()
  }
  actions.assertIdle()
  actions.reload()
}
