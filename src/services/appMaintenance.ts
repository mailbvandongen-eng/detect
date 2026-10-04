import { useAppUpdateStore } from '../store/appUpdateStore'
import { useAuthStore } from '../store/authStore'
import { useUIStore } from '../store/uiStore'
import { useRouteRecordingStore } from '../store/routeRecordingStore'
import { allowDetectUnloadForInternalReload } from '../utils/installExitGuard'
import { refreshAppSafely } from '../utils/appMaintenance'

const scope = new URL(import.meta.env.BASE_URL, window.location.origin).href
let registration: ServiceWorkerRegistration | undefined
let registrationPromise: Promise<ServiceWorkerRegistration> | undefined

function observeRegistration(next: ServiceWorkerRegistration) {
  registration = next
  const reportWaiting = () => {
    useAppUpdateStore.setState({ updateAvailable: !!next.waiting })
  }
  reportWaiting()
  next.addEventListener('updatefound', () => {
    next.installing?.addEventListener('statechange', reportWaiting)
  })
}

export function initializeAppUpdates() {
  if (!('serviceWorker' in navigator) || registrationPromise) return
  // Native registration avoids the plugin's implicit controller-change reload.
  registrationPromise = navigator.serviceWorker.getRegistration(scope).then(existing => {
    const script = existing?.active?.scriptURL || existing?.waiting?.scriptURL || existing?.installing?.scriptURL
    if (existing?.scope === scope && script && new URL(script).pathname === new URL('sw.js', scope).pathname) return existing
    return navigator.serviceWorker.register(new URL('sw.js', scope).href, { scope, updateViaCache: 'none' })
  })
  void registrationPromise.then(next => {
    observeRegistration(next)
    void next.update().catch(() => {})
  }).catch(() => { registrationPromise = undefined })
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && navigator.onLine) void registration?.update().catch(() => {})
  })
}

function assertIdle() {
  const auth = useAuthStore.getState()
  if (!auth.ready || auth.loading) throw new Error('Wacht tot je account en instellingen geladen zijn.')
  if (useRouteRecordingStore.getState().state !== 'idle') throw new Error('Sla je route eerst op voordat je de app vernieuwt.')
  const ui = useUIStore.getState()
  if (ui.isDrawingMode || (ui.activeWindow && !['settings', 'menu', 'changeLog'].includes(ui.activeWindow))) {
    throw new Error('Rond je invoer of kaartbewerking eerst af voordat je de app vernieuwt.')
  }
}

async function verifyNetwork() {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 12000)
  try {
    const url = new URL('index.html', scope)
    url.searchParams.set('detect-check', String(Date.now()))
    const response = await fetch(url, { cache: 'no-store', signal: controller.signal })
    if (!response.ok || !(await response.text()).includes('<html')) throw new Error('Geen werkende verbinding met Detect. Probeer later opnieuw.')
  } catch {
    throw new Error('Geen werkende verbinding met Detect. Je appbestanden blijven behouden.')
  } finally { window.clearTimeout(timer) }
}

function waitForWorker(worker: ServiceWorker, desired: 'installed' | 'activated') {
  return new Promise<void>((resolve, reject) => {
    const check = () => {
      if (worker.state === desired || worker.state === 'activated') finish()
      else if (worker.state === 'redundant') finish(new Error('De update kon niet worden geladen. Probeer opnieuw.'))
    }
    const timer = window.setTimeout(() => finish(new Error('De update duurt te lang. Probeer opnieuw.')), 15000)
    function finish(error?: Error) {
      window.clearTimeout(timer)
      worker.removeEventListener('statechange', check)
      if (error) reject(error)
      else resolve()
    }
    worker.addEventListener('statechange', check)
    check()
  })
}

async function applyUpdate(repair = false) {
  if (!('serviceWorker' in navigator)) return
  let current = registration || await registrationPromise || await navigator.serviceWorker.getRegistration(scope)
  if (repair) {
    // Keep the registration: WebKit can discard ALL origin caches on unregister.
    const script = new URL('sw.js', scope)
    script.searchParams.set('detect-repair', String(Date.now()))
    current = await navigator.serviceWorker.register(script.href, { scope, updateViaCache: 'none' })
    observeRegistration(current)
  } else if (current) await current.update()
  if (!current) return
  if (current.installing) await waitForWorker(current.installing, 'installed')
  assertIdle()
  if (current.waiting) {
    const waiting = current.waiting
    const activated = waitForWorker(waiting, 'activated')
    waiting.postMessage({ type: 'SKIP_WAITING' })
    await activated
  }
}

export async function renewApp(repair = false) {
  if (useAppUpdateStore.getState().busy) return
  useAppUpdateStore.setState({ busy: true, error: null })
  try {
    await refreshAppSafely({
      scope, repair, online: navigator.onLine, assertIdle, verifyNetwork, update: () => applyUpdate(repair),
      cacheNames: () => 'caches' in window ? caches.keys() : Promise.resolve([]),
      deleteCache: name => caches.delete(name),
      reload: () => {
        allowDetectUnloadForInternalReload()
        const url = new URL(window.location.href)
        url.searchParams.set('detect-refresh', String(Date.now()))
        window.location.replace(url.href)
      },
    })
  } catch (error) {
    useAppUpdateStore.setState({ error: error instanceof Error ? error.message : 'Vernieuwen mislukt. Probeer opnieuw.' })
  } finally { useAppUpdateStore.setState({ busy: false }) }
}
