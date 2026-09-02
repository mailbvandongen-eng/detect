import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './detect-theme.css'
import { version } from '../package.json'
import { registerSW } from 'virtual:pwa-register'
import { allowDetectUnloadForInternalReload, installExitGuard } from './utils/installExitGuard'

// Version comes from package.json - only run `npm version patch/minor/major`
console.log(`%c🚀 DetectorApp v${version}`, 'background: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;')

if ('serviceWorker' in navigator) {
  let reloading = false

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return
    reloading = true
    allowDetectUnloadForInternalReload()
    window.location.reload()
  })

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      void updateSW(true)
    },
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return

      void registration.update()
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') void registration.update()
      })
    }
  })
}

installExitGuard()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
