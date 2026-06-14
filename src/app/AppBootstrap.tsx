import { useEffect } from 'react'
import { useCloudSync } from '../hooks/useCloudSync'
import { useDynamicAHN } from '../hooks/useDynamicAHN'
import { useHeading } from '../hooks/useHeading'
import { useGPSStore } from '../store'

export function AppBootstrap() {
  useHeading()
  useDynamicAHN()
  useCloudSync()

  const fetchPassivePosition = useGPSStore((state) => state.fetchPassivePosition)

  useEffect(() => {
    fetchPassivePosition()
  }, [fetchPassivePosition])

  return null
}
