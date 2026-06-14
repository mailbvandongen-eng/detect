import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Layers, RefreshCw, Sparkles, Target, X, ZoomIn } from 'lucide-react'

interface AgentGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AgentGuideModal({ isOpen, onClose }: AgentGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[2002] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-4 top-4 bottom-4 z-[2003] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="pointer-events-auto flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-emerald-700 px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                  <Bot size={18} />
                  <span className="font-medium">Detect Agent</span>
                </div>
                <button
                  onClick={onClose}
                  className="rounded p-1 transition-colors hover:bg-white/20"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto p-4">
                <section>
                  <p className="text-sm text-gray-700">
                    De Detect Agent is een <strong>read-only analysehulp</strong>. Hij leest alleen het huidige
                    kaartgebied en de actieve lagen. Hij verandert niets automatisch.
                  </p>
                </section>

                <section className="rounded-xl bg-emerald-50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-emerald-900">Zo start je hem</h3>
                  <ol className="list-decimal space-y-2 pl-4 text-sm text-emerald-900">
                    <li>Zoom in op een gebied dat je wilt beoordelen.</li>
                    <li>Zet een paar inhoudelijke lagen aan, bijvoorbeeld AHN, bodem, geomorfologie en AMK of IKAW.</li>
                    <li>Klik rechtsboven op de knop met het robot-icoon.</li>
                    <li>Bij de eerste keer start meteen de analyse. Daarna opent dezelfde knop het agentpaneel of heranalyseert hij.</li>
                  </ol>
                </section>

                <section>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">Wat hij leest</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <ZoomIn size={16} className="mt-0.5 text-emerald-700" />
                      <span>Het huidige kaartgebied en zoomniveau</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Layers size={16} className="mt-0.5 text-emerald-700" />
                      <span>De actieve inhoudelijke lagen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target size={16} className="mt-0.5 text-emerald-700" />
                      <span>Jouw zoekperioden en voorkeurssliders</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">Wat je terugkrijgt</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="mt-0.5 text-emerald-700" />
                      <span>Een samenvatting van het gebied</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="mt-0.5 text-emerald-700" />
                      <span>Gelezen signalen zoals reliëf, bodem, bekende sites en verstoring</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="mt-0.5 text-emerald-700" />
                      <span>Gerichte kansen, brede kansen en verrassende kansen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="mt-0.5 text-emerald-700" />
                      <span>Waarschuwingen en suggesties voor extra analyselagen</span>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl bg-amber-50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-amber-900">Belangrijk</h3>
                  <ul className="list-disc space-y-2 pl-4 text-sm text-amber-900">
                    <li>De agent is nu geen chat-assistent, maar een lokale regelgestuurde analyse.</li>
                    <li>Hij werkt beter als je niet te ver uitgezoomd bent.</li>
                    <li>Meer relevante lagen aan betekent meestal een sterkere analyse.</li>
                    <li>Alleen als jij op de knop drukt kan hij aanbevolen lagen aanzetten voor een tweede analyse.</li>
                  </ul>
                </section>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <RefreshCw size={14} />
                  <span>Te vinden via menu → Detect Agent</span>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
                >
                  Sluiten
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
