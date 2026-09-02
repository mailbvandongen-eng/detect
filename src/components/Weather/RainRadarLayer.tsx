import { useEffect, useRef, useState, useCallback } from 'react'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { useMapStore } from '../../store/mapStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudRain, Play, Pause, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface RadarFrame { path: string; time: number }
interface RainRadarLayerProps { isVisible: boolean; onClose: () => void }

export function RainRadarLayer({ isVisible, onClose }: RainRadarLayerProps) {
  const map = useMapStore(state => state.map)
  const layerRef = useRef<TileLayer<XYZ> | null>(null)
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [opacity, setOpacity] = useState(70)

  const fetchRadarData = useCallback(async () => {
    setIsLoading(true)
    setError(false)
    try {
      const response = await fetch('https://api.rainviewer.com/public/weather-maps.json')
      if (!response.ok) throw new Error('Radar niet bereikbaar')
      const data = await response.json()
      const past: RadarFrame[] = (data.radar?.past || []).map((frame: { path: string; time: number }) => ({ path: frame.path, time: frame.time * 1000 }))
      setFrames(past)
      setCurrentFrameIndex(Math.max(0, past.length - 1))
      if (!past.length) setError(true)
    } catch {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return
    fetchRadarData()
    const refresh = setInterval(fetchRadarData, 5 * 60 * 1000)
    return () => clearInterval(refresh)
  }, [isVisible, fetchRadarData])

  useEffect(() => {
    if (!map || !isVisible || !frames.length) return
    const frame = frames[currentFrameIndex]
    if (!frame) return
    const tileUrl = `https://tilecache.rainviewer.com${frame.path}/256/{z}/{x}/{y}/2/1_1.png`
    if (layerRef.current) {
      layerRef.current.getSource()?.setUrl(tileUrl)
      layerRef.current.getSource()?.refresh()
    } else {
      const layer = new TileLayer({
        source: new XYZ({ url: tileUrl, crossOrigin: 'anonymous', maxZoom: 7 }),
        opacity: opacity / 100,
        zIndex: 1500,
        properties: { name: 'rain-radar-layer', title: 'Regenradar' }
      })
      layerRef.current = layer
      map.addLayer(layer)
    }
  }, [map, isVisible, frames, currentFrameIndex])

  useEffect(() => { layerRef.current?.setOpacity(opacity / 100) }, [opacity])
  useEffect(() => {
    if (!isVisible && layerRef.current && map) {
      map.removeLayer(layerRef.current)
      layerRef.current = null
    }
  }, [isVisible, map])
  useEffect(() => () => {
    if (layerRef.current && map) map.removeLayer(layerRef.current)
    if (animationRef.current) clearInterval(animationRef.current)
  }, [map])

  useEffect(() => {
    if (!isPlaying || !frames.length || !isVisible) return
    animationRef.current = setInterval(() => setCurrentFrameIndex(prev => (prev + 1) % frames.length), 600)
    return () => { if (animationRef.current) clearInterval(animationRef.current) }
  }, [isPlaying, frames.length, isVisible])

  const label = frames[currentFrameIndex]
    ? new Date(frames[currentFrameIndex].time).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
    : '--:--'

  const step = (delta: number) => {
    setIsPlaying(false)
    setCurrentFrameIndex(prev => (prev + delta + frames.length) % frames.length)
  }

  if (!isVisible) return null
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-20 left-2 right-2 z-[1600] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2"><CloudRain size={15} className="text-blue-500" /><b className="text-xs text-gray-700">Regenradar · afgelopen ±2 uur</b></div>
          <button onClick={onClose} className="p-1 border-0 bg-transparent"><X size={15} /></button>
        </div>
        {error ? <div className="p-3 text-sm text-amber-700">Radar tijdelijk niet beschikbaar. De weersverwachting blijft wel werken.</div> : (
          <>
            <div className="px-3 pt-2 text-xs text-gray-600">{isLoading ? 'Radar bijwerken…' : `${label} · historische radar, geen voorspelling`}</div>
            <div className="px-3 py-2 flex items-center gap-2">
              <button onClick={() => step(-1)} className="p-1.5 border-0 bg-gray-50 rounded"><ChevronLeft size={15} /></button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 border-0 bg-blue-50 text-blue-600 rounded">{isPlaying ? <Pause size={15} /> : <Play size={15} />}</button>
              <button onClick={() => step(1)} className="p-1.5 border-0 bg-gray-50 rounded"><ChevronRight size={15} /></button>
              <span className="text-[10px] text-gray-400">-2u</span>
              <input className="flex-1" type="range" min="0" max={Math.max(0, frames.length - 1)} value={currentFrameIndex} onChange={e => { setIsPlaying(false); setCurrentFrameIndex(Number(e.target.value)) }} />
              <span className="text-[10px] text-gray-500">nu</span>
            </div>
            <div className="px-3 pb-2 flex items-center gap-2"><span className="text-[10px] text-gray-500">Dekking</span><input className="flex-1" type="range" min="20" max="100" value={opacity} onChange={e => setOpacity(Number(e.target.value))} /><span className="text-[10px] text-gray-500">{opacity}%</span></div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
