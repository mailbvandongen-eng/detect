# Project Notes voor Claude

## PROJECT IDENTIFICATIE
**Dit is: DETECT** - Persoonlijke versie
- GitHub repo: `detect`
- Vite base path: `/detect/`
- Directory: `C:\VSCode\detect`

**Let op:** Er bestaan ook:
- `detectorapp-nl` - Commerciele Nederlandse versie
- `webapp` (detectorapp-v3) - Internationale versie met NL/BE/DE/FR

## EERSTE ACTIE BIJ NIEUWE SESSIE
**Lees ALTIJD eerst `.claude/notes.md` voor lopende taken, plannen en context uit vorige sessies!**

## VERSIE BUMPEN - ALLEEN NPM VERSION!
**Bij ELKE wijziging, alleen dit commando:**
```bash
npm version patch   # of: minor / major
```

Alle versies komen nu uit `package.json`:
- `src/main.tsx` -> `import { version } from '../package.json'`
- `src/components/UI/HamburgerMenu.tsx` -> `import { version } from '../../../package.json'`
- `src/components/UI/InfoButton.tsx` -> `import { version } from '../../../package.json'`

**Na versie bump: build en push!**
```bash
npm run build && git add -A && git commit -m "vX.X.X: beschrijving" && git push
```

## Belangrijke Regels
- **ALTIJD pushen naar GitHub na elke wijziging + versie bump**
- Screenshots staan in: `C:\VSCode\_Screenshots`
- Vite base path is `/detect/` - alle data paden moeten `/detect/data/...` zijn

## Firebase Setup
Dit project heeft een eigen Firebase project nodig (detect-personal of vergelijkbaar).
- `.env` file moet aangemaakt worden met Firebase credentials
- Zie `.env.example` voor het template

## Dutch RD Shapefiles (EPSG:28992)

Nederlandse overheidsdata komt vaak in Rijksdriehoek (RD) coordinaten. Herken dit aan:
- Coordinaten zoals `[155000, 463000]` of `[207260, 474100]`
- X tussen ~7000-300000, Y tussen ~289000-629000

### Oplossing voor OpenLayers:

```typescript
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4'

// Register Dutch RD projection (EPSG:28992)
proj4.defs('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs')
register(proj4)

// Bij het laden van GeoJSON:
const source = new VectorSource({
  features: new GeoJSON().readFeatures(geojson, {
    dataProjection: 'EPSG:28992',      // Bron is RD
    featureProjection: 'EPSG:3857'     // Doel is Web Mercator
  })
})
```

## React StrictMode
StrictMode is UITGESCHAKELD in `main.tsx` omdat het OpenLayers breekt (double-render van effects).

## Layer Paden
Alle layer files moeten `/detect/data/...` gebruiken, NIET `/data/...`

## MODAL TEMPLATE - ALTIJD GEBRUIKEN!

**Elke modal/venster MOET dit template volgen (zoals Instellingen):**

### Container:
```tsx
className="fixed inset-4 z-[1701] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-sm mx-auto my-auto max-h-[85vh]"
```

### Header (met font slider!):
```tsx
<div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
  <div className="flex items-center gap-2">
    <Icon size={18} />
    <span className="font-medium">Titel</span>
  </div>
  <div className="flex items-center gap-2">
    {/* Font size slider - ALTIJD TOEVOEGEN */}
    <span className="text-[10px] opacity-70">T</span>
    <input
      type="range" min="80" max="150" step="10"
      value={settings.fontScale}
      onChange={(e) => settings.setFontScale(parseInt(e.target.value))}
      className="header-slider w-16 opacity-70 hover:opacity-100 transition-opacity"
    />
    <span className="text-xs opacity-70">T</span>
    <button onClick={onClose} className="p-1 rounded hover:bg-white/20 transition-colors border-0 outline-none ml-1">
      <X size={18} />
    </button>
  </div>
</div>
```

### Input velden - GEEN BORDERS!
```tsx
// FOUT - geeft zwarte lijnen:
className="border border-gray-300"

// GOED - clean look:
className="w-full px-3 py-2 bg-gray-100 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500"
style={{ fontSize: '1em' }}
```

## NIEUWE LAGEN TOEVOEGEN - ALTIJD RESET UPDATEN!

**Bij ELKE nieuwe laag die je toevoegt, MOET je deze ook toevoegen aan de reset functie!**

| # | Bestand | Array | Wat toevoegen |
|---|---------|-------|---------------|
| 1 | `src/store/layerStore.ts` | `visible` | Nieuwe laag met `false` |
| 2 | `src/components/UI/PresetButtons.tsx` | `ALL_OVERLAYS` | Laagnaam als string |

## CLICK EVENTS IN PANELS - ALTIJD STOPPROPAGATION!

**KRITIEK:** Bij ELKE klikbare item (link, button) in een panel dat sluit bij "click outside":
```tsx
onClick={(e) => e.stopPropagation()}
```

## UI STYLING REGELS

### Icon Buttons (ONZICHTBAAR - alleen icoon)
```tsx
className="p-1.5 border-0 outline-none bg-transparent text-{color}-500 hover:text-{color}-600 transition-colors"
```

### Zichtbare Knoppen (met achtergrond)
```tsx
className="bg-white/80 hover:bg-white/90 rounded-xl shadow-sm backdrop-blur-sm"
```
