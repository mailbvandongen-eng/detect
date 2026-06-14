import './style.css'
import { MapContainer } from './components/Map/MapContainer'
import { PasswordGate } from './components/Auth/PasswordGate'
import { OfflineIndicator } from './components/UI/OfflineIndicator'
import { AppBootstrap } from './app/AppBootstrap'
import { AppControls } from './app/AppControls'
import { AppDialogs } from './app/AppDialogs'
import { MapOverlays } from './app/MapOverlays'
import { useSettingsStore } from './store'

function App() {
  const fontScale = useSettingsStore(state => state.fontScale)
  const baseFontSize = (14 * fontScale) / 100

  return (
    <PasswordGate>
      <div style={{ fontSize: `${baseFontSize}px` }}>
        <AppBootstrap />
        <OfflineIndicator />
        <MapContainer />
        <MapOverlays />
        <AppControls />
        <AppDialogs />
      </div>
    </PasswordGate>
  )
}

export default App
