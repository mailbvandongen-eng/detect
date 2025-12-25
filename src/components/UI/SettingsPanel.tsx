import { X, Settings, Globe, Palette, Ruler, Map, Navigation, Eye, Smartphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore, useSettingsStore } from '../../store'
import type { Language, ColorScheme, Units, DefaultBackground } from '../../store/settingsStore'

export function SettingsPanel() {
  const { settingsPanelOpen, toggleSettingsPanel } = useUIStore()
  const settings = useSettingsStore()

  return (
    <AnimatePresence>
      {settingsPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[1600] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSettingsPanel}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-4 z-[1601] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-sm mx-auto my-auto max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-center gap-2">
                <Settings size={18} />
                <span className="font-medium">Instellingen</span>
              </div>
              <button
                onClick={toggleSettingsPanel}
                className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Algemeen */}
              <Section title="Algemeen" icon={<Globe size={16} />}>
                <OptionRow label="Taal">
                  <div className="flex gap-1">
                    <OptionButton
                      active={settings.language === 'nl'}
                      onClick={() => settings.setLanguage('nl')}
                      label="NL"
                    />
                    <OptionButton
                      active={settings.language === 'en'}
                      onClick={() => settings.setLanguage('en')}
                      label="EN"
                    />
                  </div>
                </OptionRow>
                <OptionRow label="Eenheden">
                  <div className="flex gap-1">
                    <OptionButton
                      active={settings.units === 'metric'}
                      onClick={() => settings.setUnits('metric')}
                      label="km"
                    />
                    <OptionButton
                      active={settings.units === 'imperial'}
                      onClick={() => settings.setUnits('imperial')}
                      label="mi"
                    />
                  </div>
                </OptionRow>
              </Section>

              {/* Kaart */}
              <Section title="Kaart" icon={<Map size={16} />}>
                <OptionRow label="Standaard achtergrond">
                  <select
                    value={settings.defaultBackground}
                    onChange={(e) => settings.setDefaultBackground(e.target.value as DefaultBackground)}
                    className="px-2 py-1 text-sm bg-gray-100 rounded border-0 outline-none"
                  >
                    <option value="CartoDB (licht)">Licht</option>
                    <option value="CartoDB (donker)">Donker</option>
                    <option value="Luchtfoto">Luchtfoto</option>
                    <option value="OpenTopoMap">Topo</option>
                  </select>
                </OptionRow>
                <ToggleRow
                  label="Onthoud locatie"
                  checked={settings.rememberLastLocation}
                  onChange={settings.setRememberLastLocation}
                />
                <ToggleRow
                  label="Schaalbalk tonen"
                  checked={settings.showScaleBar}
                  onChange={settings.setShowScaleBar}
                />
              </Section>

              {/* GPS */}
              <Section title="GPS" icon={<Navigation size={16} />}>
                <ToggleRow
                  label="GPS aan bij start"
                  checked={settings.gpsAutoStart}
                  onChange={settings.setGpsAutoStart}
                />
                <ToggleRow
                  label="Kaart draait mee (heading up)"
                  checked={settings.headingUpMode}
                  onChange={settings.setHeadingUpMode}
                />
                <ToggleRow
                  label="Nauwkeurigheidscirkel"
                  checked={settings.showAccuracyCircle}
                  onChange={settings.setShowAccuracyCircle}
                />
              </Section>

              {/* Weergave */}
              <Section title="Weergave" icon={<Eye size={16} />}>
                <ToggleRow
                  label="Marker clustering"
                  checked={settings.markerClustering}
                  onChange={settings.setMarkerClustering}
                />
                <ToggleRow
                  label="Coordinaten tonen"
                  checked={settings.showCoordinates}
                  onChange={settings.setShowCoordinates}
                />
              </Section>

              {/* Feedback */}
              <Section title="Feedback" icon={<Smartphone size={16} />}>
                <ToggleRow
                  label="Trillen bij acties"
                  checked={settings.hapticFeedback}
                  onChange={settings.setHapticFeedback}
                />
              </Section>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 text-center">
              Instellingen worden lokaal opgeslagen
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Section component
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-100">
        <span className="text-blue-600">{icon}</span>
        <span className="font-medium text-gray-800 text-sm">{title}</span>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </section>
  )
}

// Option row with label and control
function OptionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      {children}
    </div>
  )
}

// Toggle switch row
function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition-colors border-0 outline-none relative ${
          checked ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

// Option button
function OptionButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-xs border-0 outline-none transition-colors ${
        active
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  )
}
