import {
  Search, MapPin, Compass, SlidersHorizontal, Filter, Menu, RotateCcw,
  Cloud, Ruler, Pencil, Printer, Plus, Navigation, Map,
  ChevronRight, Settings, Route, Star, Eye
} from 'lucide-react'
import { AppWindow } from './AppWindow'

interface HandleidingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HandleidingModal({ isOpen, onClose }: HandleidingModalProps) {
  return (
    <AppWindow
      isOpen={isOpen}
      title="Handleiding"
      icon={<Map size={18} />}
      placement="modal"
      onClose={onClose}
      footer={
        <button
          onClick={onClose}
          className="detect-window-primary-button w-full"
        >
          Sluiten
        </button>
      }
    >
              <div className="p-4 space-y-6">

                {/* Intro */}
                <section>
                  <p className="text-sm text-gray-600">
                    Detect is een kaartapp voor metaaldetectoristen, fossielen- en mineralenzoekers en amateur-archeologen.
                    De app combineert <strong>100+ kaartlagen</strong> met GPS, routes, eigen lagen, kaartimports en uitgebreid vondstenbeheer.
                  </p>
                </section>

                {/* Schermindeling */}
                <Section title="Schermindeling" icon={<Map size={16} />}>
                  <p className="text-xs text-gray-600 mb-3">
                    De knoppen zijn verdeeld over het scherm voor optimaal gebruik:
                  </p>

                  <div className="space-y-3">
                    <LocationGroup title="Linksboven" items={[
                      { icon: <Cloud size={14} />, name: "Weerwidget", desc: "Optioneel: actueel weer en buienradar" },
                      { icon: <Ruler size={14} />, name: "Meten", desc: "Afstanden meten; via Menu aan/uit" },
                      { icon: <Pencil size={14} />, name: "Tekenen", desc: "Punten, lijnen en vlakken tekenen" },
                      { icon: <Printer size={14} />, name: "Exporteren", desc: "Kaart downloaden of printen" },
                    ]} />

                    <LocationGroup title="Rechtsboven" items={[
                      { icon: <Search size={14} />, name: "Zoeken", desc: "Zoek adressen en plaatsen in heel Europa" },
                      { icon: <Menu size={14} />, name: "Menu", desc: "Instellingen en opties" },
                      { icon: <Compass size={14} />, name: "Kompas", desc: "Verschijnt bij gedraaide kaart" },
                      { icon: <Map size={14} />, name: "Kaartlagen", desc: "Lagen aan/uit zetten" },
                    ]} />

                    <LocationGroup title="Rechtsonder" items={[
                      { icon: <Navigation size={14} />, name: "GPS", desc: "Je locatie volgen" },
                      { icon: <Plus size={14} />, name: "Zoom", desc: "In- en uitzoomen" },
                      { icon: <SlidersHorizontal size={14} />, name: "Transparantie", desc: "Dekking van actieve lagen aanpassen" },
                    ]} />

                    <LocationGroup title="Linksonder" items={[
                      { icon: <RotateCcw size={14} />, name: "Reset", desc: "Kaart en lagen terugzetten" },
                      { icon: <Star size={14} />, name: "Presets", desc: "Snel een lagencombinatie kiezen" },
                      { icon: <Filter size={14} />, name: "Monumentfilter", desc: "AMK-monumenten op periode filteren" },
                    ]} />

                    <LocationGroup title="Optioneel onderaan" items={[
                      { icon: <MapPin size={14} />, name: "Vondst knop", desc: "Verschijnt wanneer ingeschakeld in Menu" },
                      { icon: <Route size={14} />, name: "Route knop", desc: "GPS-route opnemen en beheren" },
                    ]} />
                  </div>
                </Section>

                {/* Hamburger Menu */}
                <Section title="Menu opties" icon={<Menu size={16} />}>
                  <p className="text-xs text-gray-600 mb-3">
                    Het hamburger menu (rechtsboven) bevat belangrijke functies:
                  </p>

                  <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                    <MenuItem icon={<Cloud size={14} />} name="Google-account" desc="Inloggen en handmatig synchroniseren" />
                    <MenuItem icon={<Star size={14} />} name="Info & handleiding" desc="App-informatie en deze handleiding" />
                    <MenuItem icon={<Search size={14} />} name="Zoek in monumenten" desc="Zoek specifieke monumenten" />
                    <MenuItem icon={<Settings size={14} />} name="Instellingen" desc="Kaart, lagen, presets en vondsten beheren" />
                  </div>

                  <div className="mt-3 p-3 bg-blue-50 rounded-xl">
                    <h4 className="text-xs font-semibold text-blue-800 mb-2 flex items-center gap-1">
                      <Eye size={12} />
                      Knoppen aan/uit zetten
                    </h4>
                    <p className="text-xs text-blue-700 mb-2">
                      In het menu kun je knoppen tonen of verbergen om je scherm overzichtelijk te houden:
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
                      <li><strong>Vondst knop</strong> - Knop voor vondsten vastleggen</li>
                      <li><strong>Route knop</strong> - Knop voor routes opnemen en beheren</li>
                      <li><strong>Weerwidget</strong> - Actueel weer linksboven</li>
                      <li><strong>Mijn lagen</strong> - Eigen kaartobjecten tonen of verbergen</li>
                      <li><strong>Meten, Tekenen en Exporteren</strong> - Gereedschappen linksboven</li>
                      <li><strong>Tekstgrootte</strong> - Schuifregelaars in panelen tonen</li>
                    </ul>
                  </div>
                </Section>

                {/* GPS Functie */}
                <Section title="GPS Locatie" icon={<Navigation size={16} />}>
                  <p className="text-xs text-gray-600 mb-2">
                    De GPS-knop heeft drie standen (Google Maps stijl):
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm">
                        <Navigation size={16} className="text-gray-400" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-700">Uit</span>
                        <span className="text-xs text-gray-500 ml-1">- GPS niet actief</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-lg shadow-sm">
                        <Navigation size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-700">Volgen</span>
                        <span className="text-xs text-blue-600 ml-1">- Kaart gecentreerd op je locatie</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-lg shadow-sm">
                        <Navigation size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-green-700">Rijmodus</span>
                        <span className="text-xs text-green-600 ml-1">- Kaart draait met je mee</span>
                      </div>
                    </div>
                  </div>
                </Section>

                {/* Kaartlagen */}
                <Section title="Kaartlagen (100+)">
                  <p className="text-xs text-gray-600 mb-2">
                    Open Kaartlagen rechtsboven en kies een basiskaart, thema of land. Lagen worden pas geladen wanneer je ze inschakelt.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <LayerCategory name="Archeologie" items={["AMK per periode", "IKAW", "Onderzoeken", "Kansenkaart"]} />
                    <LayerCategory name="Prehistorie" items={["Hunebedden", "Grafheuvels", "Terpen", "Paleokaarten"]} />
                    <LayerCategory name="Romeins" items={["Romeinse wegen", "Forten", "AMK Romeins"]} />
                    <LayerCategory name="WOII & Militair" items={["Bunkers", "Slagvelden", "Vliegvelden", "Linies"]} />
                    <LayerCategory name="Hoogte & Terrein" items={["AHN", "Hillshade", "Bodemkaart", "Geomorfologie"]} />
                    <LayerCategory name="Erfgoed" items={["Rijksmonumenten", "Kastelen", "Ruïnes", "Religieus erfgoed"]} />
                    <LayerCategory name="Fossielen & Goud" items={["Hotspots", "Mineralen", "Goudrivieren", "Fossieldata"]} />
                    <LayerCategory name="Buitenland" items={["België", "Duitsland", "Frankrijk", "Regionale datasets"]} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Tip: tik op de kaart om de informatie van alle actieve lagen op die locatie te bekijken.
                  </p>
                </Section>

                {/* Popups */}
                <Section title="Kaartinformatie en popups" icon={<MapPin size={16} />}>
                  <p className="text-xs text-gray-600 mb-2">
                    Tik kort op de kaart of op een zichtbaar object. De popup toont direct lokale informatie en vult die zo nodig aan met live kaartservices.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Gebruik de pijlen in de blauwe kop wanneer meerdere lagen informatie geven.</li>
                    <li>Gebruik <strong>+</strong> om het object aan een bestaande of nieuwe laag in Mijn Lagen toe te voegen.</li>
                    <li>Open de locatie in Google Maps of Street View via de pictogrammen in de kop.</li>
                    <li>Pas de tekstgrootte aan met de schuifregelaar onderaan de popup.</li>
                    <li>Bij geschikte percelen kan de popup ook een hoogtekaart tonen.</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Een long-press opent het locatiemenu; dit is een andere actie dan de gewone kaartpopup.
                  </p>
                </Section>

                {/* Meet en Tekentool */}
                <Section title="Meten en Tekenen" icon={<Ruler size={16} />}>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <h4 className="text-xs font-semibold text-blue-800 mb-1 flex items-center gap-1">
                        <Ruler size={12} />
                        Meetgereedschap
                      </h4>
                      <p className="text-xs text-blue-700">
                        Klik om te meten, dubbelklik om te stoppen. De afstand wordt automatisch berekend in meters of kilometers.
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl">
                      <h4 className="text-xs font-semibold text-orange-800 mb-1 flex items-center gap-1">
                        <Pencil size={12} />
                        Tekengereedschap
                      </h4>
                      <p className="text-xs text-orange-700 mb-2">
                        Teken punten, lijnen en vlakken op de kaart. Kies uit:
                      </p>
                      <div className="flex gap-2">
                        <span className="text-xs bg-orange-100 px-2 py-1 rounded">Punt</span>
                        <span className="text-xs bg-orange-100 px-2 py-1 rounded">Lijn</span>
                        <span className="text-xs bg-orange-100 px-2 py-1 rounded">Vlak</span>
                      </div>
                      <p className="text-xs text-orange-600 mt-2">
                        Tekeningen kunnen opgeslagen worden naar je eigen lagen.
                      </p>
                    </div>
                  </div>
                </Section>

                {/* Presets */}
                <Section title="Presets" icon={<Star size={16} />}>
                  <p className="text-xs text-gray-600 mb-2">
                    Presets zijn vooraf ingestelde combinaties van kaartlagen. Ideaal om snel te wisselen tussen:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li><strong>Detectie</strong> - AMK, percelen, geomorfologie, hoogte en kadaster</li>
                    <li><strong>Steentijd</strong> - Hunebedden, grafheuvels, terpen, FAMKE/AMK en hillshade</li>
                    <li><strong>Romeins - Mid vroeg</strong> - Romeinse wegen en forten, AMK en percelen</li>
                    <li><strong>Mid laat - Nieuwe tijd</strong> - Kastelen, essen, monumenten en oude kernen</li>
                    <li><strong>WOII & Militair</strong> - Bunkers, slagvelden, vliegvelden, linies en inundaties</li>
                    <li><strong>Terrein Analyse</strong> - IKAW, bodem, geomorfologie en AHN</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Gebruik het opslaan-icoon naast een preset om de huidige lagen erin vast te leggen. Via Instellingen → Lagen kun je presets maken, hernoemen of verwijderen.
                  </p>
                </Section>

                {/* Mijn Lagen */}
                <Section title="Mijn Lagen" icon={<MapPin size={16} />}>
                  <p className="text-xs text-gray-600 mb-2">
                    Sla interessante locaties op in eigen lagen:
                  </p>
                  <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
                    <li>Tik op een object op de kaart (monument, bunker, etc.)</li>
                    <li>Tik op <strong>+</strong> in de blauwe kop van de popup</li>
                    <li>Kies een bestaande laag of maak een nieuwe aan</li>
                  </ol>
                  <div className="mt-2 p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-700">
                      <strong>Tip:</strong> De volledige vorm (polygoon) en popup-info worden mee opgeslagen!
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Beheer namen en inhoud via Instellingen → Lagen → Mijn lagen. In dezelfde tab kun je GeoJSON-, KML- en GPX-bestanden als kaartlaag importeren.
                  </p>
                </Section>

                {/* Vondsten */}
                <Section title="Vondsten Registreren" icon={<MapPin size={16} />}>
                  <p className="text-xs text-gray-600 mb-2">
                    Registreer je vondsten met locatie, foto's en details:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li><strong>Vondstknop:</strong> zet Menu → Vondst knop aan en gebruik de oranje knop onderaan</li>
                    <li><strong>Long-press:</strong> Houd vinger op kaart → "Vondst toevoegen"</li>
                    <li><strong>Velden:</strong> Type, materiaal, periode, diepte, conditie, gewicht</li>
                    <li><strong>Export:</strong> Excel, CSV, GeoJSON, GPX, KML</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    Open Instellingen → Vondsten voor het dashboard en de exportknoppen. Vondsten worden altijd eerst lokaal op dit apparaat opgeslagen.
                  </p>
                </Section>

                {/* Routes */}
                <Section title="Routes Opnemen" icon={<Route size={16} />}>
                  <p className="text-xs text-gray-600 mb-2">
                    Zet Menu → Route knop aan om een GPS-route op te nemen.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Tik op de groene routeknop om te starten; tik opnieuw om te pauzeren of hervatten.</li>
                    <li>Bekijk tijdens de opname tijd, afstand en gemiddelde snelheid.</li>
                    <li>Na stoppen geef je de route een naam en kun je hem direct als GPX exporteren.</li>
                    <li>Open het routedashboard om opgeslagen routes te bekijken, importeren, exporteren of verwijderen.</li>
                  </ul>
                </Section>

                {/* Cloud Sync */}
                <Section title="Cloud Sync" icon={<Cloud size={16} />}>
                  <p className="text-xs text-gray-600 mb-2">
                    Synchroniseer je data tussen apparaten met Google login:
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-700">
                        <strong>Wat wordt gesynchroniseerd:</strong><br/>
                        • Mijn Lagen (eigen punten)<br/>
                        • Vondsten registraties<br/>
                        • Opgeslagen routes
                      </p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <strong>Locatiegegevens:</strong> De losse GPS-positie wordt niet als geschiedenis bewaard. Locaties van vondsten en opgenomen routes worden wél opgeslagen en bij ingelogde cloud-sync gesynchroniseerd.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Presets en algemene instellingen blijven lokaal op het apparaat. Gebruik Synchroniseren in het menu om de cloud-sync handmatig uit te voeren.
                  </p>
                </Section>

                {/* Settings and field mode */}
                <Section title="Instellingen en Veldmodus" icon={<Settings size={16} />}>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li><strong>Algemeen:</strong> kies de standaardkaart, schaalbalk, GPS-start, feedback en weerwidget.</li>
                    <li><strong>Veldmodus:</strong> hergebruikt eerder geladen kaarttegels en kan plaatsnamen tonen op luchtfoto, satelliet en historische kaarten.</li>
                    <li><strong>Lagen:</strong> beheer Mijn Lagen, importeer GeoJSON/KML/GPX en beheer presets.</li>
                    <li><strong>Vondsten:</strong> open het dashboard en exporteer je registraties.</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Schakel vóór vertrek online door je werkgebied. Alleen gegevens die eerder zijn geladen, zijn later uit de lokale cache beschikbaar.
                  </p>
                </Section>

                {/* Monster Filter */}
                <Section title="Monument Filter" icon={<Filter size={16} />}>
                  <p className="text-xs text-gray-600">
                    Filter AMK monumenten op tijdsperiode. Handig om specifieke periodes te onderzoeken zoals de Romeinse tijd, Middeleeuwen of Bronstijd.
                  </p>
                </Section>

                {/* Exporteren */}
                <Section title="Kaart Exporteren" icon={<Printer size={16} />}>
                  <p className="text-xs text-gray-600">
                    Exporteer je huidige kaartweergave als PNG of JPEG, of open het afdrukvenster om te printen of als PDF op te slaan. Je kunt een titel toevoegen; datum en tijd worden automatisch vermeld.
                  </p>
                </Section>

                {/* Tips */}
                <section className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Tips voor gebruik</h3>
                  <ul className="text-xs text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Detectie:</strong> Combineer AMK + Gewaspercelen + IKAW voor kansrijke locaties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Terrein:</strong> AHN Hillshade toont grafheuvels, wallen en greppels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Fossielen:</strong> Check Fossiel Hotspots + Geomorfologie voor oude zeebodems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Historisch:</strong> TMK 1850 toont verdwenen structuren en oude wegen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Zonder login:</strong> Kaartgebruik, Mijn Lagen, vondsten en routes werken lokaal; alleen cloud-sync vereist een Google-account</span>
                    </li>
                  </ul>
                </section>

              </div>
    </AppWindow>
  )
}

// Helper components
function Section({ title, icon, children }: { title: string, icon?: React.ReactNode, children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
        {icon && <span className="text-blue-500">{icon}</span>}
        {title}
      </h3>
      {children}
    </section>
  )
}

function LocationGroup({ title, items }: { title: string, items: { icon: React.ReactNode, name: string, desc: string }[] }) {
  return (
    <div className="p-2 bg-gray-50 rounded-lg">
      <h4 className="text-xs font-semibold text-gray-600 mb-1.5">{title}</h4>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-blue-500">{item.icon}</span>
            <span className="text-xs text-gray-700 font-medium">{item.name}</span>
            <span className="text-xs text-gray-400">- {item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MenuItem({ icon, name, desc }: { icon: React.ReactNode, name: string, desc: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500">{icon}</span>
      <span className="text-xs text-gray-700 font-medium">{name}</span>
      <span className="text-xs text-gray-400">- {desc}</span>
    </div>
  )
}

function LayerCategory({ name, items }: { name: string, items: string[] }) {
  return (
    <div className="p-2 bg-gray-50 rounded-lg">
      <h4 className="text-xs font-semibold text-gray-600 mb-1">{name}</h4>
      <div className="text-xs text-gray-500 space-y-0.5">
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  )
}
