import { useState } from 'react'
import { Layers, Check, Upload, Plus, ExternalLink, Globe, ChevronDown, ChevronRight, Settings2, Trash2 } from 'lucide-react'
import { useUIStore } from '../../store'
import { useCustomPointLayerStore, type CustomPointLayer } from '../../store/customPointLayerStore'
import { useCustomLayerStore } from '../../store/customLayerStore'
import { LayerGroup } from './LayerGroup'
import { LayerItem } from './LayerItem'
import { CustomLayerItem } from '../CustomLayers/CustomLayerItem'
import { isThemeVisible, isSpecialSectionVisible } from '../../config/buildMode'
import { AppWindow } from '../UI/AppWindow'
import { getStandalonePointLayers } from '../../utils/userLayerCatalog'

// Speciale archeologische 3D projecten - externe links
const SPECIAL_PROJECTS = [
  { name: 'Rapa Nui - Moai Productie', url: 'https://arcg.is/qu59O1', desc: 'Paaseiland steengroeve in 3D' },
  { name: 'Digital Giza - Piramides', url: 'http://giza.fas.harvard.edu/giza3d/', desc: 'Harvard 3D reconstructie' },
  { name: 'Stonehenge 360°', url: 'https://www.english-heritage.org.uk/visit/places/stonehenge/history-and-stories/stonehenge360/', desc: 'English Heritage virtuele tour' },
  { name: 'Pompeii 3D Explorer', url: 'https://www.cyark.org/projects/pompeii/3D-Explorer', desc: 'CyArk LiDAR scans' },
  { name: 'Virtual Angkor Wat', url: 'https://www.virtualangkor.com/', desc: '3D reconstructie 1300 n.Chr.' },
  { name: 'Petra Virtuele Tour', url: 'https://www.zamaniproject.org/site-jordan-petra.html', desc: 'Zamani Project 3D' },
]

const HERITAGE_PLATFORMS = [
  { name: 'CyArk (200+ sites)', url: 'https://www.cyark.org/projects/', desc: 'Wereldwijd erfgoed archief' },
  { name: 'Google Open Heritage', url: 'https://artsandculture.google.com/project/openheritage', desc: '26+ UNESCO sites in 3D' },
]

function PointLayerItem({ layer, onToggle, onDelete }: {
  layer: CustomPointLayer
  onToggle: () => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  const handleDelete = () => {
    const pointLabel = layer.points.length === 1 ? '1 punt' : `${layer.points.length} punten`
    if (!window.confirm(
      `Laag “${layer.name}” met ${pointLabel} verwijderen? Dit kan niet ongedaan worden gemaakt.`
    )) return

    onDelete()
    setExpanded(false)
  }

  return (
    <div className="border-b border-gray-100 py-0.5">
      <div className="flex items-center gap-2 rounded px-1 py-1 hover:bg-purple-50">
        <button
          onClick={(event) => { event.stopPropagation(); onToggle() }}
          className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: layer.visible ? layer.color : 'white',
            border: `2px solid ${layer.visible ? layer.color : '#9ca3af'}`,
          }}
          title={layer.visible ? 'Laag verbergen' : 'Laag tonen'}
        >
          {layer.visible && <Check size={11} strokeWidth={3} color="white" />}
        </button>
        <button
          onClick={(event) => { event.stopPropagation(); onToggle() }}
          className="min-w-0 flex-1 truncate text-left text-gray-700"
          style={{ fontSize: '0.9em' }}
          title={layer.name}
        >
          {layer.name}
        </button>
        <span className="flex-shrink-0 text-[10px] text-gray-400">{layer.points.length}</span>
        <button
          onClick={(event) => { event.stopPropagation(); setExpanded(value => !value) }}
          className={`p-1 ${expanded ? 'text-red-600' : 'text-purple-700'}`}
          title="Laaginstellingen"
          aria-expanded={expanded}
        >
          <Settings2 size={14} />
        </button>
      </div>

      {expanded && (
        <div className="mx-1 mb-2 mt-1 rounded-lg border border-red-100 bg-white p-2 shadow-sm">
          <button
            onClick={handleDelete}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            <Trash2 size={15} />
            Laag verwijderen
          </button>
        </div>
      )}
    </div>
  )
}

export function ThemesPanel() {
  const themesPanelOpen = useUIStore(state => state.activeWindow === 'layers')
  const toggleThemesPanel = useUIStore(state => state.toggleThemesPanel)
  const openWindow = useUIStore(state => state.openWindow)
  const { layers: customLayers, toggleVisibility, removeLayer } = useCustomPointLayerStore()
  const importedLayers = useCustomLayerStore(state => state.layers)
  const standalonePointLayers = getStandalonePointLayers(customLayers, importedLayers)

  // State for special projects section
  const [specialProjectsOpen, setSpecialProjectsOpen] = useState(false)

  return (
    <AppWindow
      isOpen={themesPanelOpen}
      title="Kaartlagen"
      icon={<Layers size={18} />}
      placement="right"
      onClose={toggleThemesPanel}
    >
      <div className="p-2">
            {/* Eén lijst voor zelfgemaakte en geïmporteerde lagen. */}
            <div className="mb-2 pb-1 border-b border-gray-100">
              <div className="flex items-center gap-1 py-0.5 px-1 mb-1">
                <Layers size={12} className="text-purple-600" />
                <span className="text-purple-600 font-medium" style={{ fontSize: '0.9em' }}>Mijn lagen</span>
              </div>
              {standalonePointLayers.map(layer => (
                <PointLayerItem
                  key={layer.id}
                  layer={layer}
                  onToggle={() => toggleVisibility(layer.id)}
                  onDelete={() => removeLayer(layer.id)}
                />
              ))}
              {importedLayers.map(layer => (
                <CustomLayerItem key={layer.id} layer={layer} compact />
              ))}
              <div className="grid grid-cols-2 gap-2 px-1 pt-2">
                <button
                  onClick={(event) => { event.stopPropagation(); openWindow('createLayer', 'layers') }}
                  className="flex items-center justify-center gap-1 rounded-lg bg-purple-50 px-2 py-2 text-xs text-purple-700 hover:bg-purple-100"
                >
                  <Plus size={14} /> Nieuwe laag
                </button>
                <button
                  onClick={(event) => { event.stopPropagation(); openWindow('importLayer', 'layers') }}
                  className="flex items-center justify-center gap-1 rounded-lg bg-cyan-50 px-2 py-2 text-xs text-cyan-700 hover:bg-cyan-100"
                >
                  <Upload size={14} /> Importeren
                </button>
              </div>
            </div>

            {/* Basislaag - vaste sectie zonder pijltje */}
            <div className="mb-2">
              <div className="flex items-center gap-1 py-1 px-1 mb-1">
                <span className="text-blue-600 font-medium" style={{ fontSize: '0.95em' }}>Basislaag</span>
              </div>
              <div className="space-y-0">
                <LayerItem name="Esri (licht)" type="base" displayName="Lichtgrijs (wereld)" />
                <LayerItem name="OpenStreetMap" type="base" />
                <LayerItem name="Luchtfoto" type="base" hasOverlay displayName="Luchtfoto (NL)" />
                <LayerItem name="Satelliet (wereld)" type="base" hasOverlay />
                <LayerItem name="TMK 1850" type="base" hasOverlay />
                <LayerItem name="Bonnebladen 1900" type="base" hasOverlay />
              </div>
            </div>

            {/* Thema's - vaste sectie, daaronder inklapbare groepen */}
            <div className="mb-2">
              <div className="flex items-center gap-1 py-1 px-1 mb-1 border-t border-gray-100 pt-2">
                <span className="text-blue-600 font-medium" style={{ fontSize: '0.95em' }}>Thema's</span>
              </div>
              {/* Steentijd (Stone Age) */}
              {isThemeVisible('Steentijd & Prehistorie') && (
                <LayerGroup title="Steentijd & Prehistorie" defaultExpanded={false} layerNames={['Hunebedden', 'Grafheuvels', 'Terpen', 'FAMKE Steentijd', 'FAMKE IJzertijd']}>
                  <LayerItem name="Hunebedden" type="overlay" />
                  <LayerItem name="Grafheuvels" type="overlay" />
                  <LayerItem name="Terpen" type="overlay" />
                  <LayerItem name="FAMKE Steentijd" type="overlay" />
                  <LayerItem name="FAMKE IJzertijd" type="overlay" />
                </LayerGroup>
              )}

              {/* Paleogeografische kaarten - eigen groep */}
              {isThemeVisible('Paleokaarten') && (
                <LayerGroup title="Paleokaarten" defaultExpanded={false} layerNames={['Paleokaart 9000 v.Chr.', 'Paleokaart 5500 v.Chr.', 'Paleokaart 2750 v.Chr.', 'Paleokaart 1500 v.Chr.', 'Paleokaart 500 v.Chr.', 'Paleokaart 100 n.Chr.', 'Paleokaart 800 n.Chr.']}>
                  <LayerItem name="Paleokaart 9000 v.Chr." type="overlay" />
                  <LayerItem name="Paleokaart 5500 v.Chr." type="overlay" />
                  <LayerItem name="Paleokaart 2750 v.Chr." type="overlay" />
                  <LayerItem name="Paleokaart 1500 v.Chr." type="overlay" />
                  <LayerItem name="Paleokaart 500 v.Chr." type="overlay" />
                  <LayerItem name="Paleokaart 100 n.Chr." type="overlay" />
                  <LayerItem name="Paleokaart 800 n.Chr." type="overlay" />
                </LayerGroup>
              )}

              {/* Archaeological Layers */}
              {isThemeVisible('Archeologische lagen') && (
                <LayerGroup title="Archeologische lagen" defaultExpanded={false} layerNames={['AMK Monumenten', 'AMK Romeins', 'AMK Steentijd', 'AMK Vroege ME', 'AMK Late ME', 'AMK Overig', 'Archeo Onderzoeken', 'Romeinse wegen (regio)', 'Romeinse wegen (Wereld)', 'Romeinse Forten']}>
                  <LayerItem name="AMK Monumenten" type="overlay" />
                  {/* AMK per periode */}
                  <LayerGroup title="Per periode" defaultExpanded={false} layerNames={['AMK Romeins', 'AMK Steentijd', 'AMK Vroege ME', 'AMK Late ME', 'AMK Overig']}>
                    <LayerItem name="AMK Romeins" type="overlay" />
                    <LayerItem name="AMK Steentijd" type="overlay" />
                    <LayerItem name="AMK Vroege ME" type="overlay" />
                    <LayerItem name="AMK Late ME" type="overlay" />
                    <LayerItem name="AMK Overig" type="overlay" />
                  </LayerGroup>
                  <LayerItem name="Archeo Onderzoeken" type="overlay" />
                  {/* Romeinse tijd - wegen en forten */}
                  <LayerGroup title="Romeinse tijd" defaultExpanded={false} layerNames={['Romeinse wegen (regio)', 'Romeinse wegen (Wereld)', 'Romeinse Forten']}>
                    <LayerItem name="Romeinse wegen (regio)" type="overlay" />
                    <LayerItem name="Romeinse wegen (Wereld)" type="overlay" />
                    <LayerItem name="Romeinse Forten" type="overlay" />
                  </LayerGroup>
                </LayerGroup>
              )}

              {/* Archeologische verwachtingen */}
              {isThemeVisible('Archeologische verwachtingen') && (
                <LayerGroup title="Archeologische verwachtingen" defaultExpanded={false} layerNames={['Kansenkaart', 'IKAW', 'UIKAV Punten', 'UIKAV Vlakken', 'UIKAV Expert', 'UIKAV Buffer', 'UIKAV Indeling']}>
                  <LayerItem name="Kansenkaart" type="overlay" />
                  <LayerItem name="IKAW" type="overlay" />
                  <LayerItem name="UIKAV Punten" type="overlay" />
                  <LayerItem name="UIKAV Vlakken" type="overlay" />
                  <LayerItem name="UIKAV Expert" type="overlay" />
                  <LayerItem name="UIKAV Buffer" type="overlay" />
                  <LayerItem name="UIKAV Indeling" type="overlay" />
                </LayerGroup>
              )}

              {/* Erfgoed & Monumenten */}
              {isThemeVisible('Erfgoed & Monumenten') && (
                <LayerGroup title="Erfgoed & Monumenten" defaultExpanded={false} layerNames={['Rijksmonumenten', 'Werelderfgoed', 'Religieus Erfgoed', 'Kastelen', 'Ruïnes']}>
                  <LayerItem name="Rijksmonumenten" type="overlay" />
                  <LayerItem name="Werelderfgoed" type="overlay" />
                  <LayerItem name="Religieus Erfgoed" type="overlay" />
                  <LayerItem name="Kastelen" type="overlay" />
                  <LayerItem name="Ruïnes" type="overlay" />
                </LayerGroup>
              )}

              {/* WOII & Militair */}
              {isThemeVisible('WOII & Militair') && (
                <LayerGroup title="WOII & Militair" defaultExpanded={false} layerNames={['WWII Bunkers', 'Slagvelden', 'Militaire Vliegvelden', 'Verdedigingslinies', 'Militaire Objecten', 'Inundatiegebieden']}>
                  <LayerItem name="WWII Bunkers" type="overlay" />
                  <LayerItem name="Slagvelden" type="overlay" />
                  <LayerItem name="Militaire Vliegvelden" type="overlay" />
                  <LayerItem name="Verdedigingslinies" type="overlay" />
                  <LayerItem name="Militaire Objecten" type="overlay" />
                  <LayerItem name="Inundatiegebieden" type="overlay" />
                </LayerGroup>
              )}

              {/* Hillshade & LiDAR Layers - via ArcGIS SDK */}
              {isThemeVisible('Hillshade & LiDAR') && (
                <LayerGroup title="Hillshade & LiDAR" defaultExpanded={false} layerNames={['AHN4 Hoogtekaart Kleur', 'AHN4 Hillshade NL', 'AHN4 Multi-Hillshade NL', 'AHN4 Hillshade Kleur', 'AHN 0.5m']}>
                  <LayerItem name="AHN4 Hoogtekaart Kleur" type="overlay" />
                  <LayerItem name="AHN4 Hillshade NL" type="overlay" />
                  <LayerItem name="AHN4 Multi-Hillshade NL" type="overlay" />
                  <LayerItem name="AHN4 Hillshade Kleur" type="overlay" />
                  <LayerItem name="AHN 0.5m" type="overlay" />
                </LayerGroup>
              )}

              {/* Terrain Layers */}
              {isThemeVisible('Terrein & Bodem') && (
                <LayerGroup title="Terrein & Bodem" defaultExpanded={false} layerNames={['Veengebieden', 'Geomorfologie', 'Bodemkaart', 'Essen']}>
                  <LayerItem name="Veengebieden" type="overlay" />
                  <LayerItem name="Geomorfologie" type="overlay" />
                  <LayerItem name="Bodemkaart" type="overlay" />
                  <LayerItem name="Essen" type="overlay" />
                </LayerGroup>
              )}

              {/* Percelen - Kadaster & Landbouw */}
              {isThemeVisible('Percelen') && (
                <LayerGroup title="Percelen" defaultExpanded={false} layerNames={['Gewaspercelen', 'Kadastrale Grenzen']}>
                  <LayerItem name="Gewaspercelen" type="overlay" />
                  <LayerItem name="Kadastrale Grenzen" type="overlay" />
                </LayerGroup>
              )}

              {/* Provinciale Thema's */}
              {isThemeVisible("Provinciale Thema's") && (
                <LayerGroup title="Provinciale Thema's" defaultExpanded={false} layerNames={['Scheepswrakken', 'Woonheuvels ZH', 'Windmolens', 'Erfgoedlijnen', 'Oude Kernen', 'Relictenkaart Punten', 'Relictenkaart Lijnen', 'Relictenkaart Vlakken', 'Verdronken Dorpen']}>
                  {/* Zuid-Holland */}
                  <LayerGroup title="Zuid-Holland" defaultExpanded={false} layerNames={['Scheepswrakken', 'Woonheuvels ZH', 'Windmolens', 'Erfgoedlijnen', 'Oude Kernen']}>
                    <LayerItem name="Scheepswrakken" type="overlay" />
                    <LayerItem name="Woonheuvels ZH" type="overlay" />
                    <LayerItem name="Windmolens" type="overlay" />
                    <LayerItem name="Erfgoedlijnen" type="overlay" />
                    <LayerItem name="Oude Kernen" type="overlay" />
                  </LayerGroup>
                  {/* Gelderland */}
                  <LayerGroup title="Gelderland" defaultExpanded={false} layerNames={['Relictenkaart Punten', 'Relictenkaart Lijnen', 'Relictenkaart Vlakken']}>
                    <LayerItem name="Relictenkaart Punten" type="overlay" />
                    <LayerItem name="Relictenkaart Lijnen" type="overlay" />
                    <LayerItem name="Relictenkaart Vlakken" type="overlay" />
                  </LayerGroup>
                  {/* Zeeland */}
                  <LayerGroup title="Zeeland" defaultExpanded={false} layerNames={['Verdronken Dorpen']}>
                    <LayerItem name="Verdronken Dorpen" type="overlay" />
                  </LayerGroup>
                </LayerGroup>
              )}

              {/* Fossils, Minerals & Gold */}
              {isThemeVisible('Fossielen, Mineralen & Goud') && (
                <LayerGroup title="Fossielen, Mineralen & Goud" defaultExpanded={false} layerNames={['Fossiel Hotspots', 'Mineralen Hotspots', 'Goudrivieren', 'Fossielen Nederland', 'Fossielen België', 'Fossielen Duitsland', 'Fossielen Frankrijk']}>
                  <LayerItem name="Fossiel Hotspots" type="overlay" />
                  <LayerItem name="Mineralen Hotspots" type="overlay" />
                  <LayerItem name="Goudrivieren" type="overlay" />
                  <LayerItem name="Fossielen Nederland" type="overlay" />
                  <LayerItem name="Fossielen België" type="overlay" />
                  <LayerItem name="Fossielen Duitsland" type="overlay" />
                  <LayerItem name="Fossielen Frankrijk" type="overlay" />
                </LayerGroup>
              )}

              {/* België */}
              <LayerGroup title="België" defaultExpanded={false} layerNames={['Monumenten BE', 'Archeo Zones BE', 'Arch Sites BE', 'Erfgoed Landschap BE', 'CAI Elementen']}>
                <LayerItem name="Monumenten BE" type="overlay" />
                <LayerItem name="Archeo Zones BE" type="overlay" />
                <LayerItem name="Arch Sites BE" type="overlay" />
                <LayerItem name="Erfgoed Landschap BE" type="overlay" />
                <LayerItem name="CAI Elementen" type="overlay" />
              </LayerGroup>

              {/* Frankrijk */}
              <LayerGroup title="Frankrijk" defaultExpanded={false} layerNames={[
                'Sites Classés Bretagne', 'Sites Classés Normandie', 'Sites Classés Hauts-de-France',
                'Sites Classés Grand Est', 'Sites Classés Île-de-France', 'Sites Classés Centre-Val de Loire',
                'Sites Classés Bourgogne-FC', 'Sites Classés Pays de la Loire', 'Sites Classés Nouvelle-Aquitaine',
                'Sites Classés Auvergne-RA', 'Sites Classés Occitanie', 'Sites Classés PACA', 'Sites Classés Corse',
                'Monumenten IDF', 'Hist. Gebouwen FR', 'INRAP Sites FR', 'Archeo Sites Bretagne',
                'Operaties Bretagne', 'Archeo Parijs', 'Sites Patrimoine Occitanie', 'Sites Patrimoine PACA',
                'Sites Patrimoine Normandie', 'Maginotlinie'
              ]}>
                {/* Sites Classés per regio */}
                <LayerGroup title="Sites Classés (13 regio's)" defaultExpanded={false} layerNames={[
                  'Sites Classés Bretagne', 'Sites Classés Normandie', 'Sites Classés Hauts-de-France',
                  'Sites Classés Grand Est', 'Sites Classés Île-de-France', 'Sites Classés Centre-Val de Loire',
                  'Sites Classés Bourgogne-FC', 'Sites Classés Pays de la Loire', 'Sites Classés Nouvelle-Aquitaine',
                  'Sites Classés Auvergne-RA', 'Sites Classés Occitanie', 'Sites Classés PACA', 'Sites Classés Corse'
                ]}>
                  <LayerItem name="Sites Classés Bretagne" type="overlay" />
                  <LayerItem name="Sites Classés Normandie" type="overlay" />
                  <LayerItem name="Sites Classés Pays de la Loire" type="overlay" />
                  <LayerItem name="Sites Classés Centre-Val de Loire" type="overlay" />
                  <LayerItem name="Sites Classés Île-de-France" type="overlay" />
                  <LayerItem name="Sites Classés Hauts-de-France" type="overlay" />
                  <LayerItem name="Sites Classés Grand Est" type="overlay" />
                  <LayerItem name="Sites Classés Bourgogne-FC" type="overlay" />
                  <LayerItem name="Sites Classés Nouvelle-Aquitaine" type="overlay" />
                  <LayerItem name="Sites Classés Auvergne-RA" type="overlay" />
                  <LayerItem name="Sites Classés Occitanie" type="overlay" />
                  <LayerItem name="Sites Classés PACA" type="overlay" />
                  <LayerItem name="Sites Classés Corse" type="overlay" />
                </LayerGroup>
                <LayerItem name="Monumenten IDF" type="overlay" />
                <LayerItem name="Hist. Gebouwen FR" type="overlay" />
                <LayerItem name="INRAP Sites FR" type="overlay" />
                <LayerItem name="Archeo Sites Bretagne" type="overlay" />
                <LayerItem name="Operaties Bretagne" type="overlay" />
                <LayerItem name="Archeo Parijs" type="overlay" />
                <LayerItem name="Sites Patrimoine Occitanie" type="overlay" />
                <LayerItem name="Sites Patrimoine PACA" type="overlay" />
                <LayerItem name="Sites Patrimoine Normandie" type="overlay" />
                <LayerItem name="Maginotlinie" type="overlay" />
              </LayerGroup>

              {/* Recreation */}
              {isThemeVisible('Recreatie') && (
                <LayerGroup title="Recreatie" defaultExpanded={false} layerNames={['Parken', 'Speeltuinen', 'Strandjes']}>
                  <LayerItem name="Parken" type="overlay" />
                  <LayerItem name="Speeltuinen" type="overlay" />
                  <LayerItem name="Strandjes" type="overlay" />
                </LayerGroup>
              )}

              {/* Specials (3D) - externe 3D archeologische sites */}
              {isSpecialSectionVisible('Specials (3D)') && (
                <div className="mb-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSpecialProjectsOpen(!specialProjectsOpen) }}
                    className="w-full flex items-center gap-1 py-1 px-1 hover:bg-purple-50 rounded transition-colors border-0 outline-none bg-transparent"
                  >
                    {specialProjectsOpen ? (
                      <ChevronDown size={14} className="text-purple-500" />
                    ) : (
                      <ChevronRight size={14} className="text-purple-500" />
                    )}
                    <Globe size={12} className="text-purple-500" />
                    <span className="text-purple-600 font-medium" style={{ fontSize: '0.95em' }}>Specials (3D)</span>
                    <ExternalLink size={10} className="text-purple-400 ml-auto" />
                  </button>

                  {specialProjectsOpen && (
                    <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                      {/* Individuele sites */}
                      {SPECIAL_PROJECTS.map((project) => (
                        <a
                          key={project.name}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full flex items-center justify-between py-1.5 pl-6 pr-2 hover:bg-purple-50 rounded transition-colors text-left"
                          style={{ fontSize: 'inherit' }}
                        >
                          <div className="flex flex-col">
                            <span className="text-gray-700">{project.name}</span>
                            <span className="text-gray-400" style={{ fontSize: '0.8em' }}>{project.desc}</span>
                          </div>
                          <ExternalLink size={12} className="text-purple-400 flex-shrink-0 ml-2" />
                        </a>
                      ))}

                      {/* Divider */}
                      <div className="border-t border-gray-200 my-1.5 mx-2" />

                      {/* Platforms */}
                      {HERITAGE_PLATFORMS.map((platform) => (
                        <a
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full flex items-center justify-between py-1.5 pl-6 pr-2 hover:bg-purple-50 rounded transition-colors text-left"
                          style={{ fontSize: 'inherit' }}
                        >
                          <div className="flex flex-col">
                            <span className="text-gray-700 font-medium">{platform.name}</span>
                            <span className="text-gray-400" style={{ fontSize: '0.8em' }}>{platform.desc}</span>
                          </div>
                          <ExternalLink size={12} className="text-purple-400 flex-shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
      </div>
    </AppWindow>
  )
}
