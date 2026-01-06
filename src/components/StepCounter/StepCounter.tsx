import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Footprints, Play, Pause, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react'
import { useStepCounterStore, detectStep, requestMotionPermission } from '../../store/stepCounterStore'
import { useSettingsStore } from '../../store/settingsStore'

export function StepCounter() {
  const {
    steps,
    distance,
    isActive,
    todaySteps,
    setActive,
    incrementStep,
    resetSession
  } = useStepCounterStore()

  const showStepCounter = useSettingsStore(state => state.showStepCounter)

  const [isExpanded, setIsExpanded] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null)

  // Format distance nicely
  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`
    }
    return `${Math.round(meters)} m`
  }

  // Format duration
  const formatDuration = (startTime: number | null) => {
    if (!startTime) return '0:00'
    const seconds = Math.floor((Date.now() - startTime) / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle device motion events
  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    if (!isActive) return

    const acceleration = event.accelerationIncludingGravity
    if (!acceleration) return

    if (detectStep({
      x: acceleration.x || 0,
      y: acceleration.y || 0,
      z: acceleration.z || 0
    })) {
      incrementStep()
    }
  }, [isActive, incrementStep])

  // Set up motion listener
  useEffect(() => {
    if (!isActive || !permissionGranted) return

    window.addEventListener('devicemotion', handleMotion)
    return () => {
      window.removeEventListener('devicemotion', handleMotion)
    }
  }, [isActive, permissionGranted, handleMotion])

  // Request permission and start counting
  const handleToggle = async () => {
    if (!isActive) {
      // Starting - request permission if needed
      if (permissionGranted === null) {
        const granted = await requestMotionPermission()
        setPermissionGranted(granted)

        if (!granted) {
          alert('Stappenteller heeft toegang tot bewegingssensoren nodig.')
          return
        }
      }
    }

    setActive(!isActive)
  }

  if (!showStepCounter) return null

  return (
    <motion.div
      className="fixed bottom-[120px] right-2 z-[800]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Collapsed view - just the button with step count */}
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="collapsed"
            onClick={() => setIsExpanded(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg transition-all ${
              isActive
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Footprints size={18} className={isActive ? 'animate-pulse' : ''} />
            <span className="font-medium text-sm">{steps.toLocaleString()}</span>
            <ChevronUp size={14} className="opacity-50" />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-48"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {/* Header */}
            <div className={`px-3 py-2 flex items-center justify-between ${
              isActive ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}>
              <div className="flex items-center gap-2">
                <Footprints size={16} className={isActive ? 'animate-pulse' : ''} />
                <span className="font-medium text-sm">Stappenteller</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-0.5 rounded hover:bg-black/10 transition-colors"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="p-3 space-y-2">
              {/* Current session */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {steps.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">stappen deze sessie</div>
              </div>

              {/* Distance */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Afstand:</span>
                <span className="font-medium">{formatDistance(distance)}</span>
              </div>

              {/* Today total */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vandaag:</span>
                <span className="font-medium">{todaySteps.toLocaleString()}</span>
              </div>

              {/* Controls */}
              <div className="flex gap-2 pt-2">
                <motion.button
                  onClick={handleToggle}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive ? (
                    <>
                      <Pause size={14} />
                      <span>Pauze</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      <span>Start</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={() => {
                    resetSession()
                  }}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  whileTap={{ scale: 0.95 }}
                  title="Reset sessie"
                >
                  <RotateCcw size={14} />
                </motion.button>
              </div>
            </div>

            {/* Permission warning */}
            {permissionGranted === false && (
              <div className="px-3 pb-3 text-xs text-red-500">
                Geen toegang tot bewegingssensoren
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default StepCounter
