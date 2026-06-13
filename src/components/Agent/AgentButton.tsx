import { Bot, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAgentStore } from '../../store/agentStore'

export function AgentButton() {
  const openPanel = useAgentStore((state) => state.openPanel)
  const runAnalysis = useAgentStore((state) => state.runAnalysis)
  const isAnalyzing = useAgentStore((state) => state.isAnalyzing)
  const isOpen = useAgentStore((state) => state.isOpen)
  const hasResult = useAgentStore((state) => Boolean(state.lastResult))

  async function handleClick() {
    if (isAnalyzing) {
      return
    }

    if (!hasResult) {
      await runAnalysis()
      return
    }

    if (!isOpen) {
      openPanel()
      return
    }

    await runAnalysis()
  }

  return (
    <motion.button
      className={`fixed right-2 z-[810] flex items-center gap-2 rounded-2xl border-0 px-3 py-2 outline-none shadow-lg backdrop-blur-sm transition-colors ${
        isOpen
          ? 'bg-emerald-600 text-white'
          : 'bg-white/95 text-gray-800 hover:bg-white'
      }`}
      style={{ top: 'calc(max(0.5rem, env(safe-area-inset-top, 0.5rem)) + 3.4rem)' }}
      onClick={() => void handleClick()}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      title="Open of heranalyseer de read-only agent"
    >
      {isAnalyzing ? (
        <Sparkles size={18} className="animate-pulse" />
      ) : (
        <Bot size={18} />
      )}
      <span className="text-sm font-medium">
        {isAnalyzing ? 'Agent analyseert' : !hasResult ? 'Start agent' : isOpen ? 'Heranalyseer' : 'Open agent'}
      </span>
    </motion.button>
  )
}
