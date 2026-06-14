# Sprint 1

Doel: de fundering rechtzetten zonder grote functionele herbouw.

Focus:
- ArcGIS uit de standaard opstart en kaartflow halen
- centrale laagdefinities voorbereiden
- `layerStore` terugbrengen tot runtime state

## Tickets

### Ticket 1: ArcGIS uit app-start halen

Doel:
- De app start zonder ArcGIS-bootstrap.

Bestanden:
- `src/main.tsx`
- `src/config/arcgisConfig.ts`

Wijziging:
- Verwijder ArcGIS CSS import uit `main.tsx`
- Verwijder `initArcGIS()` uit `main.tsx`
- Laat `arcgisConfig.ts` tijdelijk bestaan maar ongebruikt

Acceptatiecriteria:
- App buildt
- App start
- Geen ArcGIS-init meer in console
- OpenLayers-kaart werkt nog

Testcheck:
- `npm run build`
- app openen
- kaart zichtbaar

Status:
- Completed

### Ticket 2: ArcGIS uit `MapContainer` halen

Doel:
- `MapContainer` rendert alleen OpenLayers.

Bestanden:
- `src/components/Map/MapContainer.tsx`

Wijziging:
- Verwijder ArcGIS imports
- Verwijder ArcGIS overlay refs en state
- Verwijder ArcGIS initialisatie en view-sync
- Verwijder tweede kaartcontainer in JSX

Acceptatiecriteria:
- Kaart rendert nog steeds
- Geen dubbele kaartengine meer in `MapContainer`
- Geen ArcGIS overlay DOM meer

Testcheck:
- `npm run build`
- app openen
- basislagen zichtbaar

Status:
- Completed

### Ticket 3: `mapStore` terugbrengen naar één engine

Doel:
- `mapStore` beheert alleen de OpenLayers-map en viewstate.

Bestanden:
- `src/store/mapStore.ts`

Wijziging:
- Verwijder ArcGIS state en types
- Verwijder `setArcGISMap`
- Houd alleen OL-map en rotatiegedrag over

Acceptatiecriteria:
- Store compileert
- Geen ArcGIS references meer vanuit `mapStore`

Testcheck:
- `npm run build`

Status:
- Completed

## Validatie

Verplicht na Sprint 1:
- `npm run build`
- app start lokaal
- basiskaart werkt
- geen ArcGIS bootstrap in app-start
