import './style.css'
import { MapContainer } from './components/Map/MapContainer'
import { GpsButton } from './components/GPS/GpsButton'
import { GpsMarker } from './components/GPS/GpsMarker'
import { LayerControlButton } from './components/LayerControl/LayerControlButton'
import { ThemesPanel } from './components/LayerControl/ThemesPanel'
import { Popup } from './components/Map/Popup'
import { LongPressMenu } from './components/Map/LongPressMenu'
import { PresetButtons } from './components/UI/PresetButtons'
import { CompassButton } from './components/UI/CompassButton'
import { OpacitySliders } from './components/UI/OpacitySliders'
import { SearchBox } from './components/UI/SearchBox'
import { ZoomButtons } from './components/UI/ZoomButtons'
import { SettingsPanel } from './components/UI/SettingsPanel'
import { HamburgerMenu } from './components/UI/HamburgerMenu'
import { InfoButton } from './components/UI/InfoButton'
// HillshadeControls uitgeschakeld - WebGL werkt niet in OL 10.7
import { AddVondstForm } from './components/Vondst/AddVondstForm'
import { AddVondstButton } from './components/Vondst/AddVondstButton'
import { RouteRecordButton, RouteRecordingLayer, SavedRoutesLayer, CoverageHeatmapLayer, GridOverlayLayer, RouteDashboard } from './components/Route'
import { WeatherWidget, RainRadarLayer } from './components/Weather'
import { LocalVondstMarkers } from './components/Vondst/LocalVondstMarkers'
import { CustomLayerMarkers } from './components/CustomLayers'
import { CustomPointMarkers, CreateLayerModal, AddPointModal, LayerManagerModal, LayerDashboard } from './components/CustomPoints'
import { OfflineIndicator } from './components/UI/OfflineIndicator'
import { MonumentSearch } from './components/UI/MonumentSearch'
import { MonumentFilter } from './components/UI/MonumentFilter'
import { WelcomeModal } from './components/UI/WelcomeModal'
import { ChangeLogModal } from './components/UI/ChangeLogModal'
import { HandleidingModal } from './components/UI/HandleidingModal'
import { MeasureTool } from './components/UI/MeasureTool'
import { DrawTool } from './components/UI/DrawTool'
import { PrintTool } from './components/UI/PrintTool'
import { useHeading } from './hooks/useHeading'
import { useDynamicAHN } from './hooks/useDynamicAHN'
import { useSettingsStore, useUIStore, useWeatherStore, useGPSStore } from './store'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { version } from '../package.json'
import { hasSeenChangeLog } from './data/changelog'

function App() {
  // Initialize hooks
  useHeading()
  useDynamicAHN()
  // Fetch passive position once on app start (shows blue dot)
  const fetchPassivePosition = useGPSStore(state => state.fetchPassivePosition)
  useEffect(() => {
    fetchPassivePosition()
  }, [fetchPassivePosition])

  // Get font scale setting (80-150%)
  const fontScale = useSettingsStore(state => state.fontScale)
  const uiTheme = useSettingsStore(state => state.uiTheme)
  // Base size is 14px, scale it based on setting
  const baseFontSize = 14 * fontScale / 100

  // Vondst form state
  const vondstFormOpen = useUIStore(state => state.activeWindow === 'vondstForm')
  const vondstFormLocation = useUIStore(state => state.vondstFormLocation)
  const closeVondstForm = useUIStore(state => state.closeVondstForm)

  // Route dashboard state
  const routeDashboardOpen = useUIStore(state => state.activeWindow === 'routeDashboard')
  const toggleRouteDashboard = useUIStore(state => state.toggleRouteDashboard)

  // Monument search state
  const monumentSearchOpen = useUIStore(state => state.activeWindow === 'monumentSearch')
  const closeMonumentSearch = useUIStore(state => state.closeMonumentSearch)

  // Rain radar state
  const showBuienradar = useWeatherStore(state => state.showBuienradar)
  const setShowBuienradar = useWeatherStore(state => state.setShowBuienradar)

  // Central window state: exactly one app window can be active.
  const activeWindow = useUIStore(state => state.activeWindow)
  const openWindow = useUIStore(state => state.openWindow)
  const closeWindow = useUIStore(state => state.closeWindow)

  // Startup windows are queued: welcome first, then the changelog.
  const hideWelcomeModal = useSettingsStore(state => state.hideWelcomeModal)
  const welcomeModalOpen = activeWindow === 'welcome'
  const manualOpen = activeWindow === 'manual'
  const startupInitialized = useRef(false)
  const [startupComplete, setStartupComplete] = useState(hideWelcomeModal)

  // Change log state - shown once after each version, after the welcome screen.
  const changeLogOpen = useUIStore(state => state.activeWindow === 'changeLog')
  const openChangeLog = useUIStore(state => state.openChangeLog)
  const closeChangeLog = useUIStore(state => state.closeChangeLog)

  useEffect(() => {
    if (startupInitialized.current) return
    startupInitialized.current = true

    if (hideWelcomeModal) {
      setStartupComplete(true)
    } else {
      openWindow('welcome')
    }
  }, [hideWelcomeModal, openWindow])

  useEffect(() => {
    if (startupComplete && activeWindow === null && !hasSeenChangeLog(version)) {
      openChangeLog()
    }
  }, [activeWindow, startupComplete, openChangeLog])

  const handleWelcomeClose = () => {
    closeWindow()
    setStartupComplete(true)
  }

  const handleOpenManual = () => {
    setStartupComplete(true)
    openWindow('manual')
  }

  return (
    <div data-detect-theme={uiTheme} style={{ fontSize: `${baseFontSize}px` }}>
      <OfflineIndicator />
      <MapContainer />
      <GpsMarker />
      <LocalVondstMarkers />
      <CustomLayerMarkers />
      <CustomPointMarkers />
      <RouteRecordingLayer />
      <SavedRoutesLayer />
      <CoverageHeatmapLayer />
      <GridOverlayLayer />
      <Popup />
      <LongPressMenu />
      <SearchBox />
      <GpsButton />
      <AddVondstButton />
      <RouteRecordButton />
      <ZoomButtons />
      <LayerControlButton />
      <ThemesPanel />
      <OpacitySliders />
      <HamburgerMenu />
      <PresetButtons />
      <MeasureTool />
      <DrawTool />
      <PrintTool />
      <InfoButton />
      <CompassButton />
      <WeatherWidget />
      <RainRadarLayer
        isVisible={showBuienradar}
        onClose={() => setShowBuienradar(false)}
      />
      <SettingsPanel />
      <CreateLayerModal />
      <AddPointModal />
      <LayerManagerModal />
      <LayerDashboard />
      <RouteDashboard
        isOpen={routeDashboardOpen}
        onClose={toggleRouteDashboard}
      />
      <AnimatePresence>
        {vondstFormOpen && (
          <AddVondstForm
            onClose={closeVondstForm}
            initialLocation={vondstFormLocation || undefined}
          />
        )}
      </AnimatePresence>
      <MonumentSearch
        isOpen={monumentSearchOpen}
        onClose={closeMonumentSearch}
      />
      <MonumentFilter />
      <WelcomeModal
        isOpen={welcomeModalOpen}
        onClose={handleWelcomeClose}
        onOpenManual={handleOpenManual}
      />
      <HandleidingModal
        isOpen={manualOpen}
        onClose={closeWindow}
      />
      <ChangeLogModal
        isOpen={changeLogOpen}
        onClose={closeChangeLog}
      />
    </div>
  )
}

export default App
