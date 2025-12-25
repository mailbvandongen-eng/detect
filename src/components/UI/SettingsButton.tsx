import { Settings } from 'lucide-react'
import { useUIStore } from '../../store'

export function SettingsButton() {
  const toggleSettingsPanel = useUIStore(state => state.toggleSettingsPanel)

  return (
    <button
      onClick={toggleSettingsPanel}
      className="w-11 h-11 flex items-center justify-center bg-white/80 hover:bg-white/90 rounded-xl shadow-sm border-0 outline-none transition-colors backdrop-blur-sm"
      title="Instellingen"
    >
      <Settings size={22} className="text-gray-600" />
    </button>
  )
}
