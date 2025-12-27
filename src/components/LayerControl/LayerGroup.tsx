import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronRight, Folder, FolderOpen } from 'lucide-react'
import { useLayerStore } from '../../store'

interface Props {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  layerNames?: string[]  // Optional: list of layer names in this group for active indicator
}

export function LayerGroup({ title, children, defaultExpanded = true, layerNames }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const visible = useLayerStore(state => state.visible)

  // Count active layers in this group
  const activeCount = layerNames?.filter(name => visible[name]).length || 0

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-1 py-1 px-1 bg-transparent border-0 outline-none hover:bg-blue-100 transition-colors text-left"
      >
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className="text-gray-400"
        >
          <ChevronRight size={14} />
        </motion.span>
        {expanded ? (
          <FolderOpen size={16} className="text-blue-500" />
        ) : (
          <Folder size={16} className="text-blue-500" />
        )}
        <span className="text-sm text-gray-700 font-medium">{title}</span>
        {/* Active layers indicator - show when collapsed and has active layers */}
        {!expanded && activeCount > 0 && (
          <span className="ml-auto mr-1 px-1.5 py-0.5 text-[10px] font-medium bg-blue-500 text-white rounded-full">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ overflow: 'hidden' }}
            className="ml-5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
