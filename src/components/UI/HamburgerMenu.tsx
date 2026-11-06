import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { X, Info, Settings, LogOut, User, MapPin, Route, Type, Cloud, Ruler, Pencil, Printer, RefreshCw, History, List, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { useSettingsStore } from '../../store/settingsStore'
import { useCloudSync } from '../../hooks/useCloudSync'
import { version } from '../../../package.json'
import { AppWindow } from './AppWindow'
import { useControlSlot } from '../../hooks/useControlSlot'
import { useUnseenChangeLog } from '../../hooks/useStartupWindows'

// Google logo SVG component
function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}


export function HamburgerMenu() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<{
    success: boolean
    uploaded: { layers: number; vondsten: number; routes: number }
    downloaded: { layers: number; vondsten: number; routes: number }
    error?: string
  } | null>(null)

  const { user, loading, signInWithGoogle, logout } = useAuthStore()
  const isOpen = useUIStore(state => state.activeWindow === 'menu')
  const openWindow = useUIStore(state => state.openWindow)
  const toggleWindow = useUIStore(state => state.toggleWindow)
  const closeWindow = useUIStore(state => state.closeWindow)
  const { syncNow, syncStatus, syncError } = useCloudSync()

  // Settings for font scale
  const fontScale = useSettingsStore(state => state.fontScale)
  const showFontSliders = useSettingsStore(state => state.showFontSliders)
  const setShowFontSliders = useSettingsStore(state => state.setShowFontSliders)
  const showVondstButton = useSettingsStore(state => state.showVondstButton)
  const setShowVondstButton = useSettingsStore(state => state.setShowVondstButton)
  const showRouteRecordButton = useSettingsStore(state => state.showRouteRecordButton)
  const setShowRouteRecordButton = useSettingsStore(state => state.setShowRouteRecordButton)
  const showWeatherButton = useSettingsStore(state => state.showWeatherButton)
  const setShowWeatherButton = useSettingsStore(state => state.setShowWeatherButton)
  const showMeasureTool = useSettingsStore(state => state.showMeasureTool)
  const setShowMeasureTool = useSettingsStore(state => state.setShowMeasureTool)
  const showDrawTool = useSettingsStore(state => state.showDrawTool)
  const setShowDrawTool = useSettingsStore(state => state.setShowDrawTool)
  const showPrintTool = useSettingsStore(state => state.showPrintTool)
  const setShowPrintTool = useSettingsStore(state => state.setShowPrintTool)

  // Safe top position for mobile browsers (accounts for notch/status bar)
  const slotStyle = useControlSlot('menu')
  const hasUnseenChanges = useUnseenChangeLog()

  const closeMenu = closeWindow

  const handleInfoClick = () => {
    openWindow('info')
  }

  const handleSettingsClick = () => {
    openWindow('settings')
  }

  const handleChangeLogClick = () => {
    openWindow('changeLog')
  }

  const handleLogin = () => {
    closeMenu()
    signInWithGoogle()
  }

  const handleLogout = () => {
    closeMenu()
    logout()
  }

  const handleSync = async () => {
    if (!user || isSyncing) return

    setIsSyncing(true)
    setSyncResult(null)

    try {
      const result = await syncNow()
      setSyncResult(result)
      // Auto-hide result after 5 seconds
      setTimeout(() => setSyncResult(null), 5000)
    } catch (err) {
      setSyncResult({
        success: false,
        uploaded: { layers: 0, vondsten: 0, routes: 0 },
        downloaded: { layers: 0, vondsten: 0, routes: 0 },
        error: err instanceof Error ? err.message : 'Sync mislukt'
      })
    } finally {
      setIsSyncing(false)
    }
  }

  // Eén globale schaal vergroot zowel tekst als verticale ruimte.
  const spacingScale = fontScale / 100
  const menuItemStyle = {
    fontSize: '0.95em',
    lineHeight: 1.35,
    paddingTop: `${10 * spacingScale}px`,
    paddingBottom: `${10 * spacingScale}px`
  }
  const toggleRowStyle = {
    lineHeight: 1.35,
    paddingTop: `${8 * spacingScale}px`,
    paddingBottom: `${8 * spacingScale}px`
  }

  return (
    <>
      {/* Settings menu button - preserve active colors */}
      <motion.button
        className={`fixed z-[800] w-11 h-11 flex items-center justify-center rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm ${
          isOpen
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-white/90 hover:bg-white'
        }`}
        style={slotStyle}
        onClick={() => toggleWindow('menu')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Menu"
        aria-label="Menu"
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <Menu size={22} className="text-gray-600 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
        )}
        {hasUnseenChanges && !isOpen && (
          <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-white" />
        )}
      </motion.button>

      <AppWindow
        isOpen={isOpen}
        title="Menu"
        placement="right"
        onClose={closeMenu}
        footer={(
          <div className="space-y-1">
            <button
              onClick={handleSettingsClick}
              className="w-full text-left flex items-center gap-3 border-0 outline-none bg-transparent transition-colors text-gray-700 hover:bg-gray-100 rounded-lg px-2"
              style={menuItemStyle}
            >
              <Settings size={18} className="text-gray-500" />
              <span>Instellingen</span>
            </button>
            <p className="text-center text-gray-400" style={{ fontSize: '0.75em' }}>Detect v{version}</p>
          </div>
        )}
      >
              <MenuSection title="Account" first>
              {loading ? (
                <div className="px-3 py-4 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                </div>
              ) : user ? (
                <div className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 truncate" style={{ fontSize: '0.85em' }}>
                        {user.displayName || 'Gebruiker'}
                      </div>
                      <div
                        className={syncStatus === 'error' ? 'text-red-600' : syncStatus === 'synced' ? 'text-green-600' : 'text-blue-600'}
                        style={{ fontSize: '0.7em' }}
                      >
                        {syncStatus === 'error'
                          ? 'Cloud niet beschikbaar'
                          : syncStatus === 'synced'
                            ? 'Cloud synchronisatie gereed'
                            : syncStatus === 'connecting'
                              ? 'Cloud verbinden...'
                              : 'Google-login actief'}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border-0 outline-none bg-transparent"
                      title="Uitloggen"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>

                  {/* Sync button */}
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="mt-2 w-full px-3 py-2 flex items-center gap-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border-0 outline-none disabled:opacity-50"
                  >
                    <RefreshCw size={16} className={`text-blue-500 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span className="text-blue-700" style={{ fontSize: '0.85em' }}>
                      {isSyncing ? 'Synchroniseren...' : 'Synchroniseren'}
                    </span>
                  </button>

                  {syncError && !syncResult && (
                    <div className="mt-2 p-2 rounded-lg bg-red-50 text-red-700" style={{ fontSize: '0.75em' }}>
                      {syncError}
                    </div>
                  )}

                  {/* Sync result */}
                  {syncResult && (
                    <div className={`mt-2 p-2 rounded-lg text-xs ${
                      syncResult.success
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {syncResult.error ? (
                        <p>{syncResult.error}</p>
                      ) : (
                        <p>
                          {syncResult.uploaded.layers + syncResult.uploaded.vondsten + syncResult.uploaded.routes > 0 && (
                            <span>{syncResult.uploaded.layers + syncResult.uploaded.vondsten + syncResult.uploaded.routes} geupload</span>
                          )}
                          {syncResult.uploaded.layers + syncResult.uploaded.vondsten + syncResult.uploaded.routes > 0 &&
                           syncResult.downloaded.layers + syncResult.downloaded.vondsten + syncResult.downloaded.routes > 0 && ', '}
                          {syncResult.downloaded.layers + syncResult.downloaded.vondsten + syncResult.downloaded.routes > 0 && (
                            <span>{syncResult.downloaded.layers + syncResult.downloaded.vondsten + syncResult.downloaded.routes} gedownload</span>
                          )}
                          {syncResult.uploaded.layers + syncResult.uploaded.vondsten + syncResult.uploaded.routes === 0 &&
                           syncResult.downloaded.layers + syncResult.downloaded.vondsten + syncResult.downloaded.routes === 0 && (
                            <span>Alles is gesynchroniseerd</span>
                          )}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full px-3 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors border-0 outline-none bg-transparent"
                >
                  <GoogleLogo size={18} />
                  <span className="text-gray-700" style={{ fontSize: '0.9em' }}>Inloggen met Google</span>
                </button>
              )}

              </MenuSection>

              <MenuSection title="Openen">
                <button onClick={() => useUIStore.getState().openPlaceList(useUIStore.getState().placeListScope)} className="w-full px-3 py-2.5 text-left flex items-center gap-3 border-0 outline-none bg-transparent text-gray-700 hover:bg-blue-50" style={menuItemStyle}>
                  <List size={18} className="text-blue-500" /><span>Lijstweergave</span>
                </button>
                <button
                  onClick={handleInfoClick}
                  className="w-full px-3 py-2.5 text-left flex items-center gap-3 border-0 outline-none bg-transparent transition-colors text-gray-700 hover:bg-blue-50"
                  style={menuItemStyle}
                >
                  <Info size={18} className="text-blue-500" />
                  <span>Info & handleiding</span>
                </button>

                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    handleChangeLogClick()
                  }}
                  className="w-full px-3 py-2.5 text-left flex items-center gap-3 border-0 outline-none bg-transparent transition-colors text-gray-700 hover:bg-blue-50"
                  style={menuItemStyle}
                >
                  <History size={18} className="text-blue-500" />
                  <span>Wijzigingen</span>
                  {hasUnseenChanges && (
                    <span className="ml-auto px-1.5 py-0.5 rounded-full bg-blue-500 text-white" style={{ fontSize: '0.7em' }}>Nieuw</span>
                  )}
                </button>
              </MenuSection>

              <MenuSection title="Knoppen op de kaart">
                <ToggleRow icon={<Ruler size={18} className="text-blue-500" />} label="Meten" checked={showMeasureTool} onChange={setShowMeasureTool} style={toggleRowStyle} />
                <ToggleRow icon={<Pencil size={18} className="text-orange-500" />} label="Tekenen" checked={showDrawTool} onChange={setShowDrawTool} style={toggleRowStyle} />
                <ToggleRow icon={<Printer size={18} className="text-indigo-500" />} label="Exporteren" checked={showPrintTool} onChange={setShowPrintTool} style={toggleRowStyle} />
                <ToggleRow icon={<Route size={18} className="text-green-500" />} label="Route opnemen" checked={showRouteRecordButton} onChange={setShowRouteRecordButton} style={toggleRowStyle} />
                <ToggleRow icon={<MapPin size={18} className="text-orange-500" />} label="Vondst toevoegen" checked={showVondstButton} onChange={setShowVondstButton} style={toggleRowStyle} />
                <ToggleRow icon={<Cloud size={18} className="text-cyan-500" />} label="Weer" checked={showWeatherButton} onChange={setShowWeatherButton} style={toggleRowStyle} />
              </MenuSection>

              <MenuSection title="Vensters">
                <ToggleRow icon={<Type size={18} className="text-purple-500" />} label="Tekstgrootte-schuifje" checked={showFontSliders} onChange={setShowFontSliders} style={toggleRowStyle} />
              </MenuSection>
      </AppWindow>

    </>
  )
}

function MenuSection({ title, first = false, children }: { title: string, first?: boolean, children: ReactNode }) {
  return (
    <section className={first ? 'pb-1' : 'py-1 border-t border-gray-100'}>
      <h3 className="px-3 pt-2 pb-1 font-semibold uppercase tracking-wide text-gray-400" style={{ fontSize: '0.68em' }}>{title}</h3>
      {children}
    </section>
  )
}

function ToggleRow({ icon, label, checked, onChange, style }: {
  icon: ReactNode
  label: string
  checked: boolean
  onChange: (value: boolean) => void
  style: CSSProperties
}) {
  return (
    <div className="px-3 py-2 flex items-center justify-between" style={style}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-gray-700" style={{ fontSize: '0.9em' }}>{label}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition-all border-0 outline-none relative ${checked ? 'bg-[var(--detect-accent,#3b82f6)]' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  )
}
