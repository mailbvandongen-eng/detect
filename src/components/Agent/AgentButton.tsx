import { Bot, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useAgentStore } from '../../store/agentStore'
import { useMapStore } from '../../store'

export function AgentButton() {
  const map = useMapStore((state) => state.map)
  const openPanel = useAgentStore((state) => state.openPanel)
  const runAnalysis = useAgentStore((state) => state.runAnalysis)
  const isAnalyzing = useAgentStore((state) => state.isAnalyzing)
  const isOpen = useAgentStore((state) => state.isOpen)
  const hasResult = useAgentStore((state) => Boolean(state.lastResult))
  const [compassVisible, setCompassVisible] = useState(false)

  useEffect(() => {
    if (!map) return

    const view = map.getView()

    const updateCompassVisibility = () => {
      setCompassVisible(Math.abs(view.getRotation()) > 0.087)
    }

    updateCompassVisibility()
    view.on('change:rotation', updateCompassVisibility)

    return () => {
      view.un('change:rotation', updateCompassVisibility)
    }
  }, [map])

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

  const topPosition = compassVisible
    ? 'calc(max(0.5rem, env(safe-area-inset-top, 0.5rem)) + 164px)'
    : 'calc(max(0.5rem, env(safe-area-inset-top, 0.5rem)) + 104px)'

  const label = isAnalyzing
    ? 'Detect Agent analyseert'
    : !hasResult
      ? 'Start Detect Agent'
      : isOpen
        ? 'Heranalyseer met Detect Agent'
        : 'Open Detect Agent'

  return (
    <motion.button
      className={`
        fixed right-2 z-[800]
        w-11 h-11 cursor-pointer border-0 outline-none
        flex items-center justify-center
        rounded-xl backdrop-blur-sm
        transition-all duration-200
        ${isOpen
          ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/30'
          : 'bg-white/80 text-gray-500 hover:bg-white/90 shadow-sm'
        }
      `}
      style={{ top: topPosition }}
      animate={{ top: topPosition }}
      transition={{ duration: 0.2 }}
      onClick={() => void handleClick()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      title={label}
    >
      {isAnalyzing ? (
        <Sparkles size={22} strokeWidth={2} className="animate-pulse drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
      ) : (
        <Bot size={22} strokeWidth={2} className="drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
      )}
    </motion.button>
  )
}
