import { useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight, Layers, Mountain, Landmark, TreePine, Shield, Map, Globe, Gem, Compass, Download, Sparkles } from 'lucide-react'
import { LayerGroup } from './LayerGroup'
import { LayerItem } from './LayerItem'
import { useSettingsStore } from '../../store'
import { BUILD_MODE } from '../../config/buildMode'

export function ThemesPanel() {
  const [expandedThemes, setExpandedThemes] = useState<Record<string, boolean>>({
    'Archeologie': true,
    'Erfgoed & Monumenten': false,
    'WOII & Militair': false,
    'Hillshade & LiDAR': false,
    'Terrein & Bodem': false,
    'Internationaal': false,
    'Fossielen, Mineralen & Goud': false,
    'Recreatie': false,
    "Provinciale Thema's": false,
    'Percelen': false,
    'Geïmporteerde lagen': false,
  })

  const enabledThemes = useSettingsStore((state) => state.enabledThemes)

  const toggleTheme = (theme: string) => {
    setExpandedThemes((prev) => ({
      ...prev,
      [theme]: !prev[theme]
    }))
  }

  const isThemeVisible = (theme: string) => enabledThemes.includes(theme)

  const themeIcons: Record<string, ReactNode> = {
    'Archeologie': <Landmark size={16} className="text-amber-700" />,
    'Erfgoed & Monumenten': <Sparkles size={16} className="text-purple-700" />,
    'WOII & Militair': <Shield size={16} className="text-red-700" />,
    'Hillshade & LiDAR': <Mountain size={16} className="text-slate-700" />,
    'Terrein & Bodem': <TreePine size={16} className="text-green-700" />,
    'Internationaal': <Globe size={16} className="text-blue-700" />,
    'Fossielen, Mineralen & Goud': <Gem size={16} className="text-cyan-700" />,
    'Recreatie': <Compass size={16} className="text-emerald-700" />,
    "Provinciale Thema's": <Map size={16} className="text-orange-700" />,
    'Percelen': <Layers size={16} className="text-lime-700" />,
    'Geïmporteerde lagen': <Download size={16} className="text-cyan-600" />,
  }

  const themes = [
    'Archeologie',
    'Erfgoed & Monumenten',
    'WOII & Militair',
    'Hillshade & LiDAR',
    'Terrein & Bodem',
    "Provinciale Thema's",
    'Percelen',
    'Fossielen, Mineralen & Goud',
    'Internationaal',
    'Recreatie',
    'Geïmporteerde lagen',
  ]

  return (
    <div className="space-y-2">
      {themes.filter(isThemeVisible).map((theme) => (
        <div key={theme} className="rounded-xl border border-white/60 bg-white/85 shadow-sm backdrop-blur-sm">
          <button
            type="button"
            onClick={() => toggleTheme(theme)}
            className="flex w-full items-center justify-between px-3 py-2 text-left"
          >
            <div className="flex items-center gap-2">
              {themeIcons[theme]}
              <span className="text-sm font-medium text-slate-800">{theme}</span>
            </div>
            {expandedThemes[theme] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {expandedThemes[theme] && (
            <div className="border-t border-slate-200/70 px-2 py-2">
              {theme === 'Archeologie' && (
                <>
                  <LayerGroup title="Archeologie" defaultExpanded={false} layerNames={['AMK Monumenten', 'AMK Romeins', 'AMK Steentijd', 'AMK Vroege ME', 'AMK Late ME', 'AMK Overig', 'Archeo Onderzoeken', 'Romeinse wegen (regio)', 'Romeinse wegen (Wereld)', 'Terpen', 'Hunebedden', 'Kansenkaart', 'Paleokaart 800 n.Chr.', 'Paleokaart 100 n.Chr.', 'Paleokaart 500 v.Chr.', 'Paleokaart 1500 v.Chr.', 'Paleokaart 2750 v.Chr.', 'Paleokaart 5500 v.Chr.', 'Paleokaart 9000 v.Chr.']}>
                    <LayerItem name="AMK Monumenten" type="overlay" />
                    <LayerItem name="AMK Romeins" type="overlay" />
                    <LayerItem name="AMK Steentijd" type="overlay" />
                    <LayerItem name="AMK Vroege ME" type="overlay" />
                    <LayerItem name="AMK Late ME" type="overlay" />
                    <LayerItem name="AMK Overig" type="overlay" />
                    <LayerItem name="Archeo Onderzoeken" type="overlay" />
                    <LayerItem name="Romeinse wegen (regio)" type="overlay" />
                    <LayerItem name="Romeinse wegen (Wereld)" type="overlay" />
                    <LayerItem name="Terpen" type="overlay" />
                    <LayerItem name="Hunebedden" type="overlay" />
                    <LayerItem name="Kansenkaart" type="overlay" />
                    <LayerItem name="Paleokaart 800 n.Chr." type="overlay" />
                    <LayerItem name="Paleokaart 100 n.Chr." type="overlay" />
                    <LayerItem name="Paleokaart 500 v.Chr." type="overlay" />
                    <LayerItem name="Paleokaart 1500 v.Chr." type="overlay" />
                    <LayerItem name="Paleokaart 2750 v.Chr." type="overlay" />
                    <LayerItem name="Paleokaart 5500 v.Chr." type="overlay" />
                    <LayerItem name="Paleokaart 9000 v.Chr." type="overlay" />
                  </LayerGroup>

                  <LayerGroup title="UIKAV" defaultExpanded={false} layerNames={['UIKAV Punten', 'UIKAV Vlakken', 'UIKAV Expert', 'UIKAV Buffer', 'UIKAV Indeling']}>
                    <LayerItem name="UIKAV Punten" type="overlay" />
                    <LayerItem name="UIKAV Vlakken" type="overlay" />
                    <LayerItem name="UIKAV Expert" type="overlay" />
                    <LayerItem name="UIKAV Buffer" type="overlay" />
                    <LayerItem name="UIKAV Indeling" type="overlay" />
                  </LayerGroup>
                </>
              )}

              {theme === 'Erfgoed & Monumenten' && (
                <LayerGroup title="Erfgoed & Monumenten" defaultExpanded={false} layerNames={['Rijksmonumenten', 'Werelderfgoed', 'Religieus Erfgoed', 'Kastelen', 'Ruïnes']}>
                  <LayerItem name="Rijksmonumenten" type="overlay" />
                  <LayerItem name="Werelderfgoed" type="overlay" />
                  <LayerItem name="Religieus Erfgoed" type="overlay" />
                  <LayerItem name="Kastelen" type="overlay" />
                  <LayerItem name="Ruïnes" type="overlay" />
                </LayerGroup>
              )}

              {theme === 'WOII & Militair' && (
                <LayerGroup title="WOII & Militair" defaultExpanded={false} layerNames={['WWII Bunkers', 'Slagvelden', 'Militaire Vliegvelden', 'Verdedigingslinies', 'Militaire Objecten', 'Inundatiegebieden']}>
                  <LayerItem name="WWII Bunkers" type="overlay" />
                  <LayerItem name="Slagvelden" type="overlay" />
                  <LayerItem name="Militaire Vliegvelden" type="overlay" />
                  <LayerItem name="Verdedigingslinies" type="overlay" />
                  <LayerItem name="Militaire Objecten" type="overlay" />
                  <LayerItem name="Inundatiegebieden" type="overlay" />
                </LayerGroup>
              )}

              {theme === 'Hillshade & LiDAR' && (
                <LayerGroup title="Hillshade & LiDAR" defaultExpanded={false} layerNames={['AHN4 Hoogtekaart Kleur', 'AHN4 Hillshade NL', 'AHN4 Multi-Hillshade NL', 'AHN4 Hillshade Kleur', 'AHN 0.5m']}>
                  <LayerItem name="AHN4 Hoogtekaart Kleur" type="overlay" />
                  <LayerItem name="AHN4 Hillshade NL" type="overlay" />
                  <LayerItem name="AHN4 Multi-Hillshade NL" type="overlay" />
                  <LayerItem name="AHN4 Hillshade Kleur" type="overlay" />
                  <LayerItem name="AHN 0.5m" type="overlay" />
                </LayerGroup>
              )}

              {theme === 'Terrein & Bodem' && (
                <LayerGroup title="Terrein & Bodem" defaultExpanded={false} layerNames={BUILD_MODE === 'commercial' ? ['Geomorfologie', 'Bodemkaart', 'Essen'] : ['Veengebieden', 'Geomorfologie', 'Bodemkaart', 'Essen']}>
                  {BUILD_MODE === 'personal' && <LayerItem name="Veengebieden" type="overlay" />}
                  <LayerItem name="Geomorfologie" type="overlay" />
                  <LayerItem name="Bodemkaart" type="overlay" />
                  <LayerItem name="Essen" type="overlay" />
                </LayerGroup>
              )}

              {theme === "Provinciale Thema's" && (
                <LayerGroup title="Provinciale Thema's" defaultExpanded={false} layerNames={['Scheepswrakken', 'Woonheuvels ZH', 'Windmolens', 'Erfgoedlijnen', 'Oude Kernen', 'Relictenkaart Punten', 'Relictenkaart Lijnen', 'Relictenkaart Vlakken', 'Verdronken Dorpen']}>
                  <LayerGroup title="Zuid-Holland" defaultExpanded={false} layerNames={['Scheepswrakken', 'Woonheuvels ZH', 'Windmolens', 'Erfgoedlijnen', 'Oude Kernen']}>
                    <LayerItem name="Scheepswrakken" type="overlay" />
                    <LayerItem name="Woonheuvels ZH" type="overlay" />
                    <LayerItem name="Windmolens" type="overlay" />
                    <LayerItem name="Erfgoedlijnen" type="overlay" />
                    <LayerItem name="Oude Kernen" type="overlay" />
                  </LayerGroup>
                  <LayerGroup title="Gelderland" defaultExpanded={false} layerNames={['Relictenkaart Punten', 'Relictenkaart Lijnen', 'Relictenkaart Vlakken']}>
                    <LayerItem name="Relictenkaart Punten" type="overlay" />
                    <LayerItem name="Relictenkaart Lijnen" type="overlay" />
                    <LayerItem name="Relictenkaart Vlakken" type="overlay" />
                  </LayerGroup>
                  <LayerGroup title="Zeeland" defaultExpanded={false} layerNames={['Verdronken Dorpen']}>
                    <LayerItem name="Verdronken Dorpen" type="overlay" />
                  </LayerGroup>
                </LayerGroup>
              )}

              {theme === 'Percelen' && (
                <LayerGroup title="Percelen" defaultExpanded={false} layerNames={['Gewaspercelen', 'Kadastrale Grenzen']}>
                  <LayerItem name="Gewaspercelen" type="overlay" />
                  <LayerItem name="Kadastrale Grenzen" type="overlay" />
                </LayerGroup>
              )}

              {theme === 'Fossielen, Mineralen & Goud' && (
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

              {theme === 'Internationaal' && (
                <>
                  <LayerGroup title="België" defaultExpanded={false} layerNames={['Monumenten BE', 'Archeo Zones BE', 'Arch Sites BE', 'Erfgoed Landschap BE', 'CAI Elementen']}>
                    <LayerItem name="Monumenten BE" type="overlay" />
                    <LayerItem name="Archeo Zones BE" type="overlay" />
                    <LayerItem name="Arch Sites BE" type="overlay" />
                    <LayerItem name="Erfgoed Landschap BE" type="overlay" />
                    <LayerItem name="CAI Elementen" type="overlay" />
                  </LayerGroup>

                  <LayerGroup title="Frankrijk" defaultExpanded={false} layerNames={[
                    'Sites Classés Bretagne', 'Sites Classés Normandie', 'Sites Classés Hauts-de-France',
                    'Sites Classés Grand Est', 'Sites Classés Île-de-France', 'Sites Classés Centre-Val de Loire',
                    'Sites Classés Bourgogne-FC', 'Sites Classés Pays de la Loire', 'Sites Classés Nouvelle-Aquitaine',
                    'Sites Classés Auvergne-RA', 'Sites Classés Occitanie', 'Sites Classés PACA', 'Sites Classés Corse',
                    'Monumenten IDF', 'Hist. Gebouwen FR', 'INRAP Sites FR', 'Archeo Sites Bretagne',
                    'Operaties Bretagne', 'Archeo Parijs', 'Sites Patrimoine Occitanie', 'Sites Patrimoine PACA',
                    'Sites Patrimoine Normandie', 'Maginotlinie'
                  ]}>
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
                </>
              )}

              {theme === 'Recreatie' && (
                <LayerGroup title="Recreatie" defaultExpanded={false} layerNames={['Ruiterpaden', 'Laarzenpaden', 'Parken', 'Speeltuinen', 'Musea', 'Strandjes', 'Kringloopwinkels']}>
                  <LayerItem name="Ruiterpaden" type="overlay" />
                  <LayerItem name="Laarzenpaden" type="overlay" />
                  <LayerItem name="Parken" type="overlay" />
                  <LayerItem name="Speeltuinen" type="overlay" />
                  <LayerItem name="Musea" type="overlay" />
                  <LayerItem name="Strandjes" type="overlay" />
                  <LayerItem name="Kringloopwinkels" type="overlay" />
                </LayerGroup>
              )}

              {theme === 'Geïmporteerde lagen' && (
                <div className="px-2 py-1 text-sm text-slate-600">
                  Geïmporteerde lagen worden apart beheerd via het importmenu.
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
