import { AgentButton } from '../components/Agent/AgentButton'
import { GpsButton } from '../components/GPS/GpsButton'
import { LayerControlButton } from '../components/LayerControl/LayerControlButton'
import { ThemesPanel } from '../components/LayerControl/ThemesPanel'
import { RouteRecordButton } from '../components/Route'
import { CompassButton } from '../components/UI/CompassButton'
import { DrawTool } from '../components/UI/DrawTool'
import { HamburgerMenu } from '../components/UI/HamburgerMenu'
import { InfoButton } from '../components/UI/InfoButton'
import { MeasureTool } from '../components/UI/MeasureTool'
import { MonumentFilter } from '../components/UI/MonumentFilter'
import { OpacitySliders } from '../components/UI/OpacitySliders'
import { PresetButtons } from '../components/UI/PresetButtons'
import { PrintTool } from '../components/UI/PrintTool'
import { SearchBox } from '../components/UI/SearchBox'
import { SettingsPanel } from '../components/UI/SettingsPanel'
import { WeatherWidget } from '../components/Weather'
import { AddVondstButton } from '../components/Vondst/AddVondstButton'
import { ZoomButtons } from '../components/UI/ZoomButtons'

export function AppControls() {
  return (
    <>
      <SearchBox />
      <GpsButton />
      <AddVondstButton />
      <RouteRecordButton />
      <ZoomButtons />
      <LayerControlButton />
      <ThemesPanel />
      <OpacitySliders />
      <HamburgerMenu />
      <PresetButtons />
      <MeasureTool />
      <DrawTool />
      <PrintTool />
      <InfoButton />
      <CompassButton />
      <AgentButton />
      <WeatherWidget />
      <SettingsPanel />
      <MonumentFilter />
    </>
  )
}
