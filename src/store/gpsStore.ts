import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type NavigationMode = 'free' | 'headingUp'

interface GPSPosition {
  lat: number
  lng: number
}

interface GPSState {
  // State
  tracking: boolean
  position: GPSPosition | null
  heading: number | null
  smoothHeading: number | null
  rawGPSHeading: number | null
  accuracy: number | null
  speed: number | null
  headingSource: 'gps' | 'compass' | null
  watchId: number | null
  firstFix: boolean
  navigationMode: NavigationMode
  navigationMoving: boolean

  // Configuration
  config: {
    centerOnUser: boolean
  }

  // Actions
  fetchPassivePosition: () => void
  startTracking: () => void
  stopTracking: () => void
  updatePosition: (pos: GeolocationPosition) => void
  setSmoothedHeading: (heading: number) => void
  setWatchId: (id: number) => void
  resetFirstFix: () => void
  setNavigationMode: (mode: NavigationMode) => void
  toggleNavigationMode: () => void
}

const NAVIGATION_STOP_SPEED = 0.4
const NAVIGATION_START_SPEED = 0.8

export const useGPSStore = create<GPSState>()(
  immer((set, get) => ({
    // Initial state
    tracking: false,
    position: null,
    heading: null,
    smoothHeading: null,
    rawGPSHeading: null,
    accuracy: null,
    speed: null,
    headingSource: null,
    watchId: null,
    firstFix: true,
    navigationMode: 'free' as NavigationMode,
    navigationMoving: false,

    config: {
      centerOnUser: true
    },

    // Actions
    fetchPassivePosition: () => {
      if (!navigator.geolocation) return
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          set(state => {
            // Only set passive position if not already tracking
            if (!state.tracking) {
              state.position = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              }
              state.accuracy = pos.coords.accuracy
            }
          })
        },
        () => {
          // Silently fail - passive position is not critical
        },
        { enableHighAccuracy: false, maximumAge: 60000, timeout: 10000 }
      )
    },

    startTracking: () => {
      set(state => {
        state.tracking = true
        // Every new GPS session gets a fresh street-level jump on its first NEW fix.
        state.firstFix = true
        state.navigationMoving = false
      })
    },

    stopTracking: () => {
      set(state => {
        const { watchId } = get()
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId)
        }

        state.tracking = false
        state.speed = null
        state.headingSource = null
        state.heading = null
        state.smoothHeading = null
        state.rawGPSHeading = null
        state.watchId = null
        state.navigationMode = 'free'
        state.navigationMoving = false
        // Position stays visible as a passive dot
      })
    },

    updatePosition: (pos: GeolocationPosition) => {
      set(state => {
        state.position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        state.accuracy = pos.coords.accuracy
        state.speed = pos.coords.speed

        // Store raw GPS heading for useHeading to process
        state.rawGPSHeading = pos.coords.heading

        // In heading-up mode use hysteresis so GPS speed jitter around zero does
        // not repeatedly start and stop map rotation while the phone is still.
        if (state.navigationMode === 'headingUp') {
          const currentSpeed = pos.coords.speed

          if (currentSpeed === null) {
            state.navigationMoving = false
          } else if (state.navigationMoving) {
            if (currentSpeed < NAVIGATION_STOP_SPEED) {
              state.navigationMoving = false
            }
          } else if (currentSpeed > NAVIGATION_START_SPEED) {
            state.navigationMoving = true
          }
        } else {
          state.navigationMoving = false
        }

        // Determine heading source based on GPS quality and movement.
        const GPS_ACCURACY_THRESHOLD = 20
        const SPEED_THRESHOLD = 0.5 // ~1.8 km/h

        const isGPSReliable =
          pos.coords.accuracy !== null &&
          pos.coords.accuracy < GPS_ACCURACY_THRESHOLD

        if (!isGPSReliable) {
          // Poor GPS - no reliable heading source
          state.headingSource = null
        } else if (state.navigationMode === 'headingUp') {
          if (!state.navigationMoving) {
            // Freeze the last reliable course while stationary.
            state.headingSource = null
          } else if (pos.coords.heading !== null) {
            state.headingSource = 'gps'
          } else {
            // Moving but GPS bearing unavailable: compass is the fallback.
            state.headingSource = 'compass'
          }
        } else if (
          pos.coords.heading !== null &&
          pos.coords.speed !== null &&
          pos.coords.speed > SPEED_THRESHOLD
        ) {
          // Moving with good GPS - use GPS bearing
          state.headingSource = 'gps'
        } else {
          // North-up tracking can keep the compass warm without affecting the map.
          state.headingSource = 'compass'
        }
      })
    },

    setSmoothedHeading: (heading: number) => {
      set(state => {
        state.smoothHeading = heading
        state.heading = heading
      })
    },

    setWatchId: (id: number) => {
      set(state => {
        state.watchId = id
      })
    },

    resetFirstFix: () => {
      set(state => {
        state.firstFix = false
      })
    },

    setNavigationMode: (mode: NavigationMode) => {
      set(state => {
        state.navigationMode = mode

        if (mode === 'headingUp') {
          state.navigationMoving = state.speed !== null && state.speed > NAVIGATION_START_SPEED
          if (!state.navigationMoving) {
            state.headingSource = null
          }
        } else {
          state.navigationMoving = false
        }
      })
    },

    toggleNavigationMode: () => {
      set(state => {
        const nextMode = state.navigationMode === 'free' ? 'headingUp' : 'free'
        state.navigationMode = nextMode

        if (nextMode === 'headingUp') {
          state.navigationMoving = state.speed !== null && state.speed > NAVIGATION_START_SPEED
          if (!state.navigationMoving) {
            state.headingSource = null
          }
        } else {
          state.navigationMoving = false
        }
      })
    }
  }))
)
