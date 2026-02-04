import { useEffect, useRef } from 'react'
import { useGPSStore } from '../store/gpsStore'

/**
 * Circular buffer for heading smoothing.
 * Uses weighted moving average - newer samples weigh more.
 */
class HeadingBuffer {
  private buffer: number[] = []
  private readonly size: number
  private readonly weights: number[]

  constructor(size = 8) {
    this.size = size
    // Exponential weights: newer samples have more weight
    this.weights = Array.from({ length: size }, (_, i) => Math.pow(2, i))
    const sum = this.weights.reduce((a, b) => a + b, 0)
    this.weights = this.weights.map(w => w / sum)
  }

  add(heading: number): void {
    if (this.buffer.length > 0) {
      const last = this.buffer[this.buffer.length - 1]
      let diff = heading - last
      if (diff > 180) heading -= 360
      if (diff < -180) heading += 360
    }

    this.buffer.push(heading)
    if (this.buffer.length > this.size) {
      this.buffer.shift()
    }
  }

  getSmoothed(): number | null {
    if (this.buffer.length === 0) return null
    if (this.buffer.length === 1) return this.normalize(this.buffer[0])

    let sum = 0
    let weightSum = 0
    const startIdx = this.size - this.buffer.length

    for (let i = 0; i < this.buffer.length; i++) {
      const weight = this.weights[startIdx + i]
      sum += this.buffer[i] * weight
      weightSum += weight
    }

    return this.normalize(sum / weightSum)
  }

  private normalize(h: number): number {
    return ((h % 360) + 360) % 360
  }

  clear(): void {
    this.buffer = []
  }
}

/**
 * Unified heading hook - SINGLE source of truth for heading.
 *
 * - Subscribes to gpsStore for raw GPS heading (from watchPosition in useGPS)
 * - Listens to deviceorientation for compass heading
 * - Processes both through HeadingBuffer for smooth output
 * - Writes final smoothed heading to gpsStore.setSmoothedHeading
 *
 * NO duplicate watchPosition - only useGPS.ts calls watchPosition.
 */
export function useHeading() {
  const tracking = useGPSStore(state => state.tracking)
  const headingSource = useGPSStore(state => state.headingSource)
  const rawGPSHeading = useGPSStore(state => state.rawGPSHeading)
  const setSmoothedHeading = useGPSStore(state => state.setSmoothedHeading)

  const gpsBufferRef = useRef(new HeadingBuffer(6))
  const compassBufferRef = useRef(new HeadingBuffer(10))
  const lastUpdateRef = useRef(0)
  const prevRawGPSHeadingRef = useRef<number | null>(null)

  // Rate limiting: max 30fps
  const MIN_UPDATE_INTERVAL = 33

  // Process GPS heading when rawGPSHeading changes and source is 'gps'
  useEffect(() => {
    if (!tracking || headingSource !== 'gps') return
    if (rawGPSHeading === null) return
    // Skip if same value (avoid duplicate processing)
    if (rawGPSHeading === prevRawGPSHeadingRef.current) return
    prevRawGPSHeadingRef.current = rawGPSHeading

    const now = performance.now()
    if (now - lastUpdateRef.current < MIN_UPDATE_INTERVAL) return

    gpsBufferRef.current.add(rawGPSHeading)
    const smoothed = gpsBufferRef.current.getSmoothed()
    if (smoothed !== null) {
      lastUpdateRef.current = now
      setSmoothedHeading(smoothed)
    }
  }, [tracking, headingSource, rawGPSHeading, setSmoothedHeading])

  // Compass heading handler - only active when headingSource === 'compass'
  useEffect(() => {
    if (!tracking || headingSource !== 'compass') return

    let lastCompassUpdate = 0
    const COMPASS_THROTTLE = 80 // ~12Hz

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const now = performance.now()
      if (now - lastCompassUpdate < COMPASS_THROTTLE) return
      if (now - lastUpdateRef.current < MIN_UPDATE_INTERVAL) return
      lastCompassUpdate = now

      let heading: number | null = null

      // iOS Safari: webkitCompassHeading (already returns 0-360, 0=North)
      if ((event as any).webkitCompassHeading !== undefined) {
        heading = (event as any).webkitCompassHeading
      } else if (event.alpha !== null) {
        // Android: convert alpha (0=North in absolute mode)
        heading = (360 - event.alpha) % 360
      }

      if (heading !== null) {
        compassBufferRef.current.add(heading)
        const smoothed = compassBufferRef.current.getSmoothed()
        if (smoothed !== null) {
          lastUpdateRef.current = now
          setSmoothedHeading(smoothed)
        }
      }
    }

    // Prefer absolute orientation (true north) over relative
    window.addEventListener('deviceorientationabsolute', handleOrientation)
    window.addEventListener('deviceorientation', handleOrientation)

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation)
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [tracking, headingSource, setSmoothedHeading])

  // Clear buffers when tracking stops
  useEffect(() => {
    if (!tracking) {
      gpsBufferRef.current.clear()
      compassBufferRef.current.clear()
      prevRawGPSHeadingRef.current = null
    }
  }, [tracking])
}
