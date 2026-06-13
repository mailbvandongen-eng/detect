import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Compass, Layers, Lightbulb, Map, Mountain, RefreshCw, SlidersHorizontal, Sparkles, Target, TriangleAlert, Wand2, X } from 'lucide-react'
import { AGENT_PERIODS } from '../../lib/agent/analysisEngine'
import { useAgentStore } from '../../store/agentStore'
import type { AgentOpportunity, AgentSignal } from '../../types/agent'

function formatPeriods(item: AgentOpportunity): string {
  return item.periods
    .map((periodId) => AGENT_PERIODS.find((period) => period.id === periodId)?.shortLabel ?? periodId)
    .join(' | ')
}

function formatGeneratedAt(value: string): string {
  const date = new Date(value)
  return new Intl.DateTimeFormat('nl-NL', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

function ScoreBadge({ label, value, tone }: { label: string; value: number; tone: 'emerald' | 'amber' | 'rose' | 'sky' | 'violet' }) {
  const tones: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
  }

  return (
    <div className={`rounded-xl border px-2.5 py-2 ${tones[tone]}`}>
      <div className="text-[11px] uppercase tracking-wide">{label}</div>
      <div className="mt-0.5 text-base font-semibold">{value}</div>
    </div>
  )
}

function OpportunityCard({ item }: { item: AgentOpportunity }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-gray-400">{item.type}</div>
          <h4 className="mt-1 text-sm font-semibold text-gray-900">{item.title}</h4>
          <p className="mt-1 text-xs text-gray-500">
            {formatPeriods(item)} | confidence {item.confidence}
          </p>
        </div>
        <div className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
          Match {item.scores.profileMatch}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <ScoreBadge label="Vondstkans" value={item.scores.findChance} tone="emerald" />
        <ScoreBadge label="Context" value={item.scores.contextChance} tone="sky" />
        <ScoreBadge label="Verstoring" value={item.scores.disturbanceChance} tone="amber" />
        <ScoreBadge label="Verrassing" value={item.scores.surpriseChance} tone="violet" />
      </div>

      <div className="mt-3 space-y-2 text-sm text-gray-700">
        {item.reason.map((reason, index) => (
          <p key={`${item.id}-reason-${index}`}>{reason}</p>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
        <span className="font-medium">Advies:</span> {item.recommendation}
      </div>

      {item.caution && (
        <div className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
          <span className="font-medium">Let op:</span> {item.caution}
        </div>
      )}
    </div>
  )
}

function SignalCard({ signal }: { signal: AgentSignal }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{signal.label}</h4>
          <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">Impact {signal.impact}</p>
        </div>
        <div className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">
          {signal.layers.length} laag{signal.layers.length === 1 ? '' : 'lagen'}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {signal.layers.map((layer) => (
          <span key={`${signal.key}-${layer}`} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-700">
            {layer}
          </span>
        ))}
      </div>
    </div>
  )
}

export function AgentPanel() {
  const isOpen = useAgentStore((state) => state.isOpen)
  const closePanel = useAgentStore((state) => state.closePanel)
  const isAnalyzing = useAgentStore((state) => state.isAnalyzing)
  const selectedPeriods = useAgentStore((state) => state.selectedPeriods)
  const togglePeriod = useAgentStore((state) => state.togglePeriod)
  const surpriseMode = useAgentStore((state) => state.surpriseMode)
  const setSurpriseMode = useAgentStore((state) => state.setSurpriseMode)
  const preferences = useAgentStore((state) => state.preferences)
  const setPreference = useAgentStore((state) => state.setPreference)
  const runAnalysis = useAgentStore((state) => state.runAnalysis)
  const enableRecommendedLayers = useAgentStore((state) => state.enableRecommendedLayers)
  const lastResult = useAgentStore((state) => state.lastResult)
  const lastError = useAgentStore((state) => state.lastError)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[1690] bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          />

          <motion.aside
            className="fixed inset-x-3 bottom-3 top-[5.75rem] z-[1691] overflow-hidden rounded-[28px] bg-stone-50 shadow-2xl md:inset-y-3 md:left-auto md:right-3 md:top-3 md:w-[30rem]"
            initial={{ opacity: 0, y: 16, x: 12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 16, x: 12 }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3 bg-emerald-700 px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <div>
                    <div className="text-sm font-semibold">Detect Agent</div>
                    <div className="text-xs text-emerald-100">Read-only analyse van dit kaartgebied</div>
                  </div>
                </div>
                <button
                  onClick={closePanel}
                  className="rounded-xl bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <section className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Kader</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        De agent wijzigt niets aan bronnen of kaartlagen. Hij leest alleen het zichtbare gebied en maakt een kansanalyse op basis van actieve lagen.
                      </p>
                    </div>
                    <button
                      onClick={() => void runAnalysis()}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                      <RefreshCw size={16} className={isAnalyzing ? 'animate-spin' : ''} />
                      Heranalyseer
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-xl bg-stone-100 px-3 py-2">
                      <div className="flex items-center gap-2 text-stone-700">
                        <Map size={15} />
                        Gebied
                      </div>
                      <div className="mt-1 font-medium text-gray-900">
                        {lastResult ? `${lastResult.area.widthKm} x ${lastResult.area.heightKm} km` : 'Nog niet geanalyseerd'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-stone-100 px-3 py-2">
                      <div className="flex items-center gap-2 text-stone-700">
                        <Layers size={15} />
                        Actieve lagen
                      </div>
                      <div className="mt-1 font-medium text-gray-900">
                        {lastResult ? lastResult.checkedLayers.length : 0}
                      </div>
                    </div>
                  </div>

                  {lastResult && (
                    <p className="mt-3 text-xs text-gray-500">
                      Laatste analyse: {formatGeneratedAt(lastResult.generatedAt)}
                    </p>
                  )}
                </section>

                <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Zoekprofiel</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        De agent weegt jouw perioden mee, maar kan daarnaast ook verrassende adviezen geven.
                      </p>
                    </div>
                    <button
                      onClick={() => setSurpriseMode(!surpriseMode)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        surpriseMode
                          ? 'bg-violet-100 text-violet-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Verrassingsmodus {surpriseMode ? 'aan' : 'uit'}
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {AGENT_PERIODS.map((period) => {
                      const active = selectedPeriods.includes(period.id)
                      return (
                        <button
                          key={period.id}
                          onClick={() => togglePeriod(period.id)}
                          className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                            active
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          }`}
                          title={period.description}
                        >
                          {period.label}
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-900">
                    <SlidersHorizontal size={16} />
                    <h3 className="text-sm font-semibold">Jouw sturing</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Deze voorkeuren blijven lokaal op dit apparaat. De agent gebruikt ze alleen om de read-only analyse te wegen.
                  </p>

                  <div className="mt-4 space-y-4">
                    {[
                      ['findFocus', 'Nadruk op vondstkans', preferences.findFocus],
                      ['contextFocus', 'Nadruk op intacte context', preferences.contextFocus],
                      ['surpriseFocus', 'Openheid voor verrassingen', preferences.surpriseFocus],
                      ['disturbanceTolerance', 'Acceptatie van verstoring of stortgrond', preferences.disturbanceTolerance],
                    ].map(([key, label, value]) => (
                      <div key={String(key)}>
                        <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
                          <span>{label}</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={Number(value)}
                          onChange={(e) => setPreference(key as 'findFocus' | 'contextFocus' | 'surpriseFocus' | 'disturbanceTolerance', Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {lastError && (
                  <section className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm text-rose-800 shadow-sm">
                    <div className="flex items-center gap-2 font-medium">
                      <TriangleAlert size={16} />
                      Analyse mislukt
                    </div>
                    <p className="mt-2">{lastError}</p>
                  </section>
                )}

                {!lastResult && !lastError && (
                  <section className="mt-4 rounded-2xl bg-white p-5 text-sm text-gray-600 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-900">
                      <Sparkles size={16} />
                      Eerste analyse
                    </div>
                    <p className="mt-2">
                      Start de agent om het huidige kaartgebied te laten lezen op basis van actieve lagen, terreincontext en jouw profiel.
                    </p>
                  </section>
                )}

                {lastResult && (
                  <>
                    <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                      <h3 className="text-sm font-semibold text-gray-900">Plan</h3>
                      <div className="mt-3 space-y-2 text-sm text-gray-700">
                        <p>1. Lees huidige extent, zoom en actieve lagen.</p>
                        <p>2. Vertaal zichtbare lagen naar archeologische signalen zoals relief, bodem, bekende sites en verstoring.</p>
                        <p>3. Scoor gericht op jouw perioden en op verrassende afwijkingen zoals stortgrond of verplaatste context.</p>
                        <p>4. Toon shortlist, waarschuwingen en praktische zoekadviezen zonder iets in detect te wijzigen.</p>
                      </div>
                    </section>

                    <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-gray-900">
                        <Compass size={16} />
                        <h3 className="text-sm font-semibold">Samenvatting</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{lastResult.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {lastResult.keySignals.map((signal) => (
                          <span
                            key={signal.key}
                            className="rounded-full bg-stone-100 px-3 py-1.5 text-xs text-stone-700"
                          >
                            {signal.label}
                          </span>
                        ))}
                      </div>
                    </section>

                    {lastResult.keySignals.length > 0 && (
                      <section className="mt-4">
                        <div className="flex items-center gap-2 text-gray-900">
                          <Layers size={16} />
                          <h3 className="text-sm font-semibold">Gelezen signalen</h3>
                        </div>
                        <div className="mt-3 space-y-3">
                          {lastResult.keySignals.map((signal) => (
                            <SignalCard key={signal.key} signal={signal} />
                          ))}
                        </div>
                      </section>
                    )}

                    <section className="mt-4">
                      <div className="flex items-center gap-2 text-gray-900">
                        <Target size={16} />
                        <h3 className="text-sm font-semibold">Gerichte kansen</h3>
                      </div>
                      <div className="mt-3 space-y-3">
                        {lastResult.targetedOpportunities.map((item) => (
                          <OpportunityCard key={item.id} item={item} />
                        ))}
                      </div>
                    </section>

                    {lastResult.broadOpportunities.length > 0 && (
                      <section className="mt-4">
                        <div className="flex items-center gap-2 text-gray-900">
                          <Mountain size={16} />
                          <h3 className="text-sm font-semibold">Brede archeologische kansen</h3>
                        </div>
                        <div className="mt-3 space-y-3">
                          {lastResult.broadOpportunities.map((item) => (
                            <OpportunityCard key={item.id} item={item} />
                          ))}
                        </div>
                      </section>
                    )}

                    {lastResult.surpriseOpportunities.length > 0 && (
                      <section className="mt-4">
                        <div className="flex items-center gap-2 text-gray-900">
                          <Lightbulb size={16} />
                          <h3 className="text-sm font-semibold">Verrassende kansen</h3>
                        </div>
                        <div className="mt-3 space-y-3">
                          {lastResult.surpriseOpportunities.map((item) => (
                            <OpportunityCard key={item.id} item={item} />
                          ))}
                        </div>
                      </section>
                    )}

                    <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                      <h3 className="text-sm font-semibold text-gray-900">Gecontroleerde lagen</h3>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-700">
                        {lastResult.checkedLayers.length > 0 ? lastResult.checkedLayers.map((layer) => (
                          <span key={layer} className="rounded-full bg-stone-100 px-3 py-1.5">
                            {layer}
                          </span>
                        )) : (
                          <p className="text-sm text-gray-600">Er stonden nog geen analyseerbare inhoudelijke lagen aan.</p>
                        )}
                      </div>
                    </section>

                    <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                      <h3 className="text-sm font-semibold text-gray-900">Aanbevelingen</h3>
                      <div className="mt-3 space-y-2 text-sm text-gray-700">
                        {lastResult.recommendations.map((item, index) => (
                          <p key={`recommendation-${index}`}>{item}</p>
                        ))}
                      </div>
                    </section>

                    {(lastResult.warnings.length > 0 || lastResult.missingLayers.length > 0) && (
                      <section className="mt-4 rounded-2xl bg-amber-50 p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-amber-900">
                          <TriangleAlert size={16} />
                          <h3 className="text-sm font-semibold">Aandachtspunten</h3>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-amber-900">
                          {lastResult.warnings.map((warning, index) => (
                            <p key={`warning-${index}`}>{warning}</p>
                          ))}
                          {lastResult.missingLayers.length > 0 && (
                            <p>
                              Zet voor een sterkere tweede analyse bij voorkeur ook aan: {lastResult.missingLayers.join(', ')}.
                            </p>
                          )}
                        </div>
                        {lastResult.missingLayers.length > 0 && (
                          <button
                            onClick={() => void enableRecommendedLayers()}
                            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                          >
                            <Wand2 size={16} />
                            Zet aanbevolen analyselagen aan
                          </button>
                        )}
                      </section>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
