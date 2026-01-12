import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, X } from 'lucide-react'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setIsDismissed(false) // Reset dismiss when back online
    }
    const handleOffline = () => {
      setIsOnline(false)
      setIsDismissed(false) // Show banner when going offline
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Don't show if online or dismissed
  if (isOnline || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[2000] bg-amber-500 text-white px-4 py-2 shadow-lg"
      >
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <WifiOff size={18} />
            <span className="text-sm font-medium">
              Offline modus - Kaart werkt met gecachede data
            </span>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-white/20 rounded transition-colors border-0 outline-none bg-transparent"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
