import { useUIStore } from '../store/uiStore'

const EXIT_GUARD_KEY = '__detectExitGuard'
let installed = false
let allowUnload = false
let exitArmed = false
let internalUnloadResetTimer: number | null = null

function isGuardState(state: unknown): boolean {
  if (!state || typeof state !== 'object') return false
  return (state as Record<string, unknown>)[EXIT_GUARD_KEY] === true
}

function guardState(): Record<string, unknown> {
  const state = window.history.state
  const base = state && typeof state === 'object' ? state as Record<string, unknown> : {}
  return { ...base, [EXIT_GUARD_KEY]: true }
}

function addGuardEntry(): void {
  if (isGuardState(window.history.state)) return
  window.history.pushState(guardState(), '', window.location.href)
}

function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
    || ('standalone' in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))
}

export function allowDetectUnloadForInternalReload(): void {
  allowUnload = true
  if (internalUnloadResetTimer !== null) window.clearTimeout(internalUnloadResetTimer)
  internalUnloadResetTimer = window.setTimeout(() => {
    allowUnload = false
    internalUnloadResetTimer = null
  }, 2000)
}

export function installExitGuard(): void {
  if (installed || typeof window === 'undefined') return
  installed = true
  addGuardEntry()

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (allowUnload) return
    event.preventDefault()
    event.returnValue = ''
  }

  const handlePopState = () => {
    if (exitArmed) {
      if (isStandalone()) {
        window.close()
      } else {
        window.setTimeout(() => window.history.back(), 0)
      }
      return
    }

    const ui = useUIStore.getState()
    if (ui.activeWindow) {
      ui.closeWindow()
      window.setTimeout(addGuardEntry, 0)
      return
    }

    const shouldClose = window.confirm('Weet je zeker dat je Detect wilt sluiten?')
    if (!shouldClose) {
      window.setTimeout(addGuardEntry, 0)
      return
    }

    allowUnload = true
    exitArmed = true

    // Na de eerste Terug-tik staan we al op de oorspronkelijke Detect-entry.
    // In een browser gaan we verder terug naar de vorige pagina. Een standalone
    // PWA proberen we direct te sluiten; als Android dat blokkeert staat er geen
    // bewakingsentry meer en sluit de volgende systeem-Terug-tik Detect normaal.
    if (isStandalone()) {
      window.close()
      window.history.back()
    } else {
      window.history.back()
      window.setTimeout(() => window.close(), 0)
    }
  }

  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('popstate', handlePopState)
}
