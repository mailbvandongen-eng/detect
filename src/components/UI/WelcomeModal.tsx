import { Layers, Search, LocateFixed, Bookmark, SlidersHorizontal, Filter, Settings, RotateCcw, BookOpen, Ruler, Pencil, Printer, History, Hand } from 'lucide-react'
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
                <ToolGroup title="Rechtsboven">
                  <ToolItem icon={<Search size={16} />} title="Zoeken" description="adres of plaatsnaam in heel Europa" />
                  <ToolItem icon={<Settings size={16} />} title="Menu" description="account, lijsten, handleiding en instellingen" />
                  <ToolItem icon={<Layers size={16} />} title="Kaartlagen" description="basiskaart en thema's kiezen" />
                </ToolGroup>

                <ToolGroup title="Links">
                  <ToolItem icon={<Ruler size={16} />} title="Meten" description="afstanden op de kaart" />
                  <ToolItem icon={<Pencil size={16} />} title="Tekenen" description="punten, lijnen en vlakken" />
                  <ToolItem icon={<Printer size={16} />} title="Exporteren" description="kaart printen of opslaan" />
                </ToolGroup>

                <ToolGroup title="Onderaan">
                  <ToolItem icon={<Bookmark size={16} />} title="Presets" description="vaste laagcombinaties in één tik" />
                  <ToolItem icon={<RotateCcw size={16} />} title="Reset" description="alle lagen uit, lichtgrijze kaart" />
                  <ToolItem icon={<LocateFixed size={16} />} title="GPS" description="tik nogmaals: kaart draait mee" />
                </ToolGroup>

                <ToolGroup title="Verschijnen alleen als ze nodig zijn">
                  <ToolItem icon={<SlidersHorizontal size={16} />} title="Transparantie" description="zodra er een laag aan staat" />
                  <ToolItem icon={<History size={16} />} title="Jaarkeuze" description="bij luchtfoto's met meerdere jaren" />
                  <ToolItem icon={<Filter size={16} />} title="Monumentfilter" description="bij AMK-lagen" />
                </ToolGroup>

                <section className="bg-blue-50 rounded-xl p-3 space-y-1">
                  <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-1.5"><Hand size={15} /> Op de kaart</h3>
                  <p className="text-xs text-blue-700">Tik op de kaart voor informatie over monumenten, bodem en archeologie.</p>
                  <p className="text-xs text-blue-700">Houd lang ingedrukt om een punt of vondst toe te voegen aan een laag.</p>
                  <p className="text-xs text-blue-700">Zoom met twee vingers of dubbeltik.</p>
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

function ToolGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </section>
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
        <span className="text-xs text-gray-400 ml-1">– {description}</span>
      </div>
    </div>
  )
}
