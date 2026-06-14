import { useEffect, useRef } from 'react'

interface UseGpsAutostartOptions {
  mapReady: boolean
  gpsAutoStart: boolean
  startTracking: () => void
}

export function useGpsAutostart({
  mapReady,
  gpsAutoStart,
  startTracking,
}: UseGpsAutostartOptions) {
  const gpsStarted = useRef(false)

  useEffect(() => {
    if (!mapReady || gpsStarted.current || !gpsAutoStart) {
      return
    }

    const timer = setTimeout(() => {
      startTracking()
      gpsStarted.current = true
    }, 500)

    return () => clearTimeout(timer)
  }, [mapReady, gpsAutoStart, startTracking])
}
