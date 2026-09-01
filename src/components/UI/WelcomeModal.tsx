import { Layers, Search, MapPin, Compass, SlidersHorizontal, Filter, Menu, RotateCcw, BookOpen } from 'lucide-react'
import { useSettingsStore } from '../../store/settingsStore'
import { AppWindow } from './AppWindow'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenManual: () => void
}

export function WelcomeModal({ isOpen, onClose, onOpenManual }: WelcomeModalProps) {
  const setHideWelcomeModal = useSettingsStore(state => state.setHideWelcomeModal)

  const handleClose = () => {
    onClose()
  }

  const handleDontShowAgain = () => {
    setHideWelcomeModal(true)
    onClose()
  }

  const handleShowHandleiding = () => {
    onOpenManual()
  }

  return (
    <AppWindow
      isOpen={isOpen}
      title="Hoe werkt Detect?"
      icon={<BookOpen size={18} />}
      placement="modal"
      onClose={handleClose}
      footer={
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleDontShowAgain}
            className="detect-window-secondary-button"
          >
            Toon niet meer
          </button>
          <button
            onClick={handleClose}
            className="detect-window-primary-button"
          >
            Begrepen
          </button>
        </div>
      }
    >
              <div className="p-4 space-y-4">
                {/* Tools section */}
                <section>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Knoppen op de kaart</h3>
                  <p className="text-xs text-gray-500 mb-3">Aan de linker- en rechterkant vind je tools:</p>

                  <div className="space-y-2">
                    <ToolItem icon={<Layers size={16} />} title="Kaartlagen" description="Selecteer welke lagen je wilt zien" />
                    <ToolItem icon={<Search size={16} />} title="Zoeken" description="Zoek naar een adres of plaatsnaam in heel Europa" />
                    <ToolItem icon={<MapPin size={16} />} title="GPS Locatie" description="Volg je positie op de kaart" />
                    <ToolItem icon={<Compass size={16} />} title="Presets" description="Snel wisselen tussen kaartlagen" />
                    <ToolItem icon={<Filter size={16} />} title="Monument Filter" description="Filter monumenten op periode" />
                    <ToolItem icon={<SlidersHorizontal size={16} />} title="Transparantie" description="Pas doorzichtigheid aan" />
                    <ToolItem icon={<Menu size={16} />} title="Menu" description="Instellingen en meer" />
                    <ToolItem icon={<RotateCcw size={16} />} title="Reset" description="Kaart naar beginstand" />
                  </div>
                </section>

                {/* Kaartlagen info */}
                <section className="bg-blue-50 rounded-xl p-3">
                  <h3 className="text-sm font-semibold text-blue-800 mb-1">Kaartlagen gebruiken</h3>
                  <p className="text-xs text-blue-700">
                    Klik op een locatie om informatie te zien over monumenten en archeologische gegevens.
                  </p>
                </section>

                {/* Handleiding link */}
                <button
                  onClick={handleShowHandleiding}
                  className="w-full flex items-start gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border-0 outline-none text-left"
                >
                  <BookOpen size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-0.5">Handleiding</h3>
                    <span className="text-xs text-blue-600">
                      Bekijk volledige handleiding &rarr;
                    </span>
                  </div>
                </button>
              </div>
    </AppWindow>
  )
}

function ToolItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-gray-700">{title}</span>
        <span className="text-xs text-gray-400 ml-1">- {description}</span>
      </div>
    </div>
  )
}
