import { CustomLayerMarkers } from '../components/CustomLayers'
import { CustomPointMarkers } from '../components/CustomPoints'
import { GpsMarker } from '../components/GPS/GpsMarker'
import { LongPressMenu } from '../components/Map/LongPressMenu'
import { Popup } from '../components/Map/Popup'
import {
  CoverageHeatmapLayer,
  GridOverlayLayer,
  RouteRecordingLayer,
  SavedRoutesLayer,
} from '../components/Route'
import { RainRadarLayer } from '../components/Weather'
import { LocalVondstMarkers } from '../components/Vondst/LocalVondstMarkers'
import { useWeatherStore } from '../store'

export function MapOverlays() {
  const showBuienradar = useWeatherStore((state) => state.showBuienradar)
  const setShowBuienradar = useWeatherStore((state) => state.setShowBuienradar)

  return (
    <>
      <GpsMarker />
      <LocalVondstMarkers />
      <CustomLayerMarkers />
      <CustomPointMarkers />
      <RouteRecordingLayer />
      <SavedRoutesLayer />
      <CoverageHeatmapLayer />
      <GridOverlayLayer />
      <Popup />
      <LongPressMenu />
      <RainRadarLayer
        isVisible={showBuienradar}
        onClose={() => setShowBuienradar(false)}
      />
    </>
  )
}
