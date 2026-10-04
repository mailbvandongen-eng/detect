import type { StateStorage } from 'zustand/middleware'

const marker = 'detect-account-owner'
export const accountStoreNames = [
  'detectorapp-custom-point-layers', 'detectorapp-custom-layers',
  'detectorapp-local-vondsten', 'detectorapp-route-recording',
  'detectorapp-settings', 'detectorapp-presets', 'detect-private-sync',
]
const savedOwner = localStorage.getItem(marker)
// Never show the last signed-in person's data before Firebase resolves identity.
let scope = savedOwner && savedOwner !== 'anonymous' ? 'locked' : savedOwner || 'legacy'
let generation = 0
let switching = false
const key = (owner: string, name: string) => owner === 'legacy' ? name : `detect-account:${owner}:${name}`

export const accountStorage: StateStorage = {
  getItem: name => scope === 'locked' ? null : localStorage.getItem(key(scope, name)),
  setItem: (name, value) => { if (!switching && scope !== 'locked') localStorage.setItem(key(scope, name), value) },
  removeItem: name => { if (!switching && scope !== 'locked') localStorage.removeItem(key(scope, name)) },
}

export function accountSession(uid: string) {
  const captured = generation
  return () => !switching && scope === uid && generation === captured
}

export function beginAccountSwitch(uid: string | null): boolean {
  const next = uid || 'anonymous'
  if (scope === next) return false
  generation++
  // Claim the old, unscoped installation once. Original keys remain a backup.
  const claimAnonymous = scope === 'anonymous' && uid !== null && !localStorage.getItem('detect-legacy-claimed')
  if (scope === 'legacy' || claimAnonymous) {
    for (const name of accountStoreNames) {
      const original = localStorage.getItem(key(scope, name))
      if (original !== null && localStorage.getItem(key(next, name)) === null) {
        localStorage.setItem(key(next, name), original)
      }
    }
  }
  for (const name of accountStoreNames) {
    const saved = localStorage.getItem(key(next, name))
    if (saved === null) continue
    const parsed = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object' || (name !== 'detect-private-sync' && !parsed.state)) {
      throw new Error('Lokale accountgegevens zijn beschadigd; synchronisatie is gestopt om gegevensverlies te voorkomen.')
    }
  }
  if (uid) {
    localStorage.setItem('detect-legacy-claimed', 'true')
    if (claimAnonymous) for (const name of accountStoreNames) localStorage.removeItem(key('anonymous', name))
  }
  localStorage.setItem(marker, next)
  scope = next
  switching = true
  return true
}

export function finishAccountSwitch() { switching = false }
export function currentAccountScope() { return scope }

export function lockAccountStorage() { generation++; scope = 'locked'; switching = false }
