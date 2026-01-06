import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StepCounterState {
  // Current session steps
  steps: number
  // Total distance in meters (estimated)
  distance: number
  // Session start time
  startTime: number | null
  // Is counting active
  isActive: boolean
  // Today's total steps (persisted)
  todaySteps: number
  // Date of todaySteps
  todayDate: string
  // Step length in meters (adjustable)
  stepLength: number

  // Actions
  incrementStep: () => void
  resetSession: () => void
  setActive: (active: boolean) => void
  setStepLength: (length: number) => void
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

export const useStepCounterStore = create<StepCounterState>()(
  persist(
    (set, get) => ({
      steps: 0,
      distance: 0,
      startTime: null,
      isActive: false,
      todaySteps: 0,
      todayDate: getTodayDate(),
      stepLength: 0.75, // Average step length 75cm

      incrementStep: () => {
        const state = get()
        const today = getTodayDate()

        // Reset todaySteps if it's a new day
        const newTodaySteps = state.todayDate === today
          ? state.todaySteps + 1
          : 1

        set({
          steps: state.steps + 1,
          distance: (state.steps + 1) * state.stepLength,
          todaySteps: newTodaySteps,
          todayDate: today
        })
      },

      resetSession: () => {
        set({
          steps: 0,
          distance: 0,
          startTime: null
        })
      },

      setActive: (active: boolean) => {
        set({
          isActive: active,
          startTime: active ? Date.now() : get().startTime
        })
      },

      setStepLength: (length: number) => {
        const state = get()
        set({
          stepLength: length,
          distance: state.steps * length
        })
      }
    }),
    {
      name: 'step-counter-storage',
      partialize: (state) => ({
        todaySteps: state.todaySteps,
        todayDate: state.todayDate,
        stepLength: state.stepLength
      })
    }
  )
)

// Step detection algorithm using accelerometer data
let lastPeakTime = 0
let lastAccelMagnitude = 0
let isInStep = false

const STEP_THRESHOLD = 1.2 // Acceleration threshold for step detection
const MIN_STEP_INTERVAL = 250 // Minimum ms between steps (prevents double counting)
const SMOOTHING_FACTOR = 0.8 // Low-pass filter smoothing

export function detectStep(acceleration: { x: number; y: number; z: number }): boolean {
  // Calculate acceleration magnitude
  const magnitude = Math.sqrt(
    acceleration.x ** 2 +
    acceleration.y ** 2 +
    acceleration.z ** 2
  )

  // Apply low-pass filter for smoothing
  const smoothedMagnitude = SMOOTHING_FACTOR * lastAccelMagnitude + (1 - SMOOTHING_FACTOR) * magnitude
  lastAccelMagnitude = smoothedMagnitude

  // Detect step: look for peak above threshold
  const now = Date.now()
  const timeSinceLastStep = now - lastPeakTime

  // Peak detection: above threshold, wasn't in step before, enough time passed
  if (
    smoothedMagnitude > STEP_THRESHOLD &&
    !isInStep &&
    timeSinceLastStep > MIN_STEP_INTERVAL
  ) {
    isInStep = true
    lastPeakTime = now
    return true
  }

  // Reset step state when magnitude drops
  if (smoothedMagnitude < STEP_THRESHOLD * 0.8) {
    isInStep = false
  }

  return false
}

// Request permission for DeviceMotion (required on iOS 13+)
export async function requestMotionPermission(): Promise<boolean> {
  // Check if DeviceMotionEvent exists
  if (typeof DeviceMotionEvent === 'undefined') {
    console.warn('DeviceMotion not supported')
    return false
  }

  // Check if permission request is needed (iOS 13+)
  if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
    try {
      const permission = await (DeviceMotionEvent as any).requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('DeviceMotion permission denied:', error)
      return false
    }
  }

  // No permission needed (Android, older iOS)
  return true
}
