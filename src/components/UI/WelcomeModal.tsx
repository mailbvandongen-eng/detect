import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Layers, Search, MapPin, Compass, SlidersHorizontal, Filter, Menu, RotateCcw, BookOpen } from 'lucide-react'
import { useSettingsStore } from '../../store/settingsStore'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const { hideWelcomeModal, setHideWelcomeModal } = useSettingsStore()
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const handleClose = () => {
    if (dontShowAgain) {
      setHideWelcomeModal(true)
    }
    onClose()
  }

  const handleDontShowAgain = () => {
    setHideWelcomeModal(true)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[2000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[2001] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:max-w-2xl md:w-full md:max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Hoe werkt de app?</h2>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors border-0 outline-none"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Tools section */}
              <section>
                <h3 className="text-base font-semibold text-gray-700 mb-3">Knoppen op de kaart</h3>
                <p className="text-sm text-gray-500 mb-4">Aan de linker- en rechterkant vind je tools, o.a.:</p>

                <div className="space-y-3">
                  <ToolItem
                    icon={<Layers size={18} />}
                    title="Kaartlagen"
                    description="Selecteer welke lagen je wilt zien op de kaart"
                  />
                  <ToolItem
                    icon={<Search size={18} />}
                    title="Zoeken"
                    description="Zoek naar een adres of plaatsnaam"
                  />
                  <ToolItem
                    icon={<MapPin size={18} />}
                    title="GPS Locatie"
                    description="Volg je huidige positie op de kaart"
                  />
                  <ToolItem
                    icon={<Compass size={18} />}
                    title="Presets"
                    description="Snel wisselen tussen vooraf ingestelde kaartlagen"
                  />
                  <ToolItem
                    icon={<Filter size={18} />}
                    title="Monument Filter"
                    description="Filter archeologische monumenten op periode"
                  />
                  <ToolItem
                    icon={<SlidersHorizontal size={18} />}
                    title="Transparantie"
                    description="Pas de doorzichtigheid van lagen aan"
                  />
                  <ToolItem
                    icon={<Menu size={18} />}
                    title="Menu"
                    description="Instellingen, info en meer opties"
                  />
                  <ToolItem
                    icon={<RotateCcw size={18} />}
                    title="Reset"
                    description="Zet de kaart terug naar de beginstand"
                  />
                </div>
              </section>

              {/* Kaartlagen info */}
              <section className="bg-blue-50 rounded-xl p-4">
                <h3 className="text-base font-semibold text-blue-800 mb-2">Kaartlagen gebruiken</h3>
                <p className="text-sm text-blue-700">
                  Klik op een locatie op de kaart om informatie te zien over monumenten, rijksmonumenten
                  en andere archeologische gegevens. De informatie verschijnt in een popup.
                </p>
              </section>

              {/* Handleiding link */}
              <section className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <BookOpen size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-1">Handleiding</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Bekijk de volledige handleiding voor meer informatie over alle functies.
                  </p>
                  <a
                    href="https://github.com/user/detectorapp-nl/wiki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Naar handleiding &rarr;
                  </a>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleDontShowAgain}
                className="px-5 py-2.5 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors outline-none"
              >
                Toon niet meer
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors border-0 outline-none"
              >
                Begrepen
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ToolItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-gray-700">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  )
}
