# Ontwikkelrichting Detect

## Uitgangspunt

Detect is uitsluitend Bobs persoonlijke onderzoeksapp. Geen verkoop, abonnementen, premiumlagen of publieke productambitie. De app ondersteunt metaaldetectie, steentijdonderzoek, archeologie, geomorfologie, bodem en bodemgebruik, hoogtekaarten, LiDAR en historische landschapsanalyse.

Vaste projectregel: eerst bron en endpoint controleren, alleen lagen toevoegen die werkelijk onderzoekswaarde hebben, popups toevoegen waar gegevens beschikbaar zijn, daarna broncommit → productiebuild → gegenereerde docs-commit → GitHub Pages → eindcontrole. Geen laag toevoegen alleen omdat hij op papier interessant klinkt.

## Prioriteit 1 — veldgebruik betrouwbaar maken

1. Gereed in 2.33.6 — hybride wereldkaart met straat-, water-, plaats- en gebiedsnamen en luchtfoto-tijdreis.
2. Gereed in 2.33.8 — Android-terug sluit Detect niet meer direct.
3. Gereed in 2.33.9 — GPS-punt, richtingstand en rust bij stilstand.
4. Gereed in 2.33.9 — GPS zoomt na opnieuw inschakelen weer op de eerste verse fix.

## Prioriteit 2 — Thédirac en omgeving

Doelgebied: Thédirac met de directe onderzoeksomgeving richting Catus, Montgesty, Lavercantière, Peyrilles, Uzech en Gindou. Exacte publieke broncoördinaten blijven exact; broncentroïden of globale posities worden als benadering gemarkeerd. Berekende analyse is altijd onderzoekshulp en nooit bewijs van archeologie.

### Stap 1 — terrein, water en landgebruik

Status: gereed.

- IGN LiDAR HD, BRGM geologie 1:50.000 en geologie + reliëf;
- BD TOPAGE 2026 voor actuele waterlopen;
- OCS GE landbedekking; de dubbele/zwakke tweede OCS-laag is verwijderd;
- alle onderzoekslagen vallen onder de Frankrijk-hoofdschakelaar en dezelfde zichtbaarheid/transparantie-routine.

### Stap 2 — officiële archeologie

Status: gereed voor de huidige onderzoeksset; verdere bronverrijking blijft mogelijk.

- ArcheOcc toont naam, periode, datering, vindplaats, omschrijving, gemeente, bescherming en bron waar beschikbaar;
- bestaande INRAP-sites en Franse historische/erfgoedlagen blijven beschikbaar als aanvullende context;
- de oude vier handmatige Thédirac-punten zijn verwijderd.

### Stap 3 — historisch landschap

Status: gereed.

- officiële IGN-laag Forêts anciennes toegevoegd;
- oude, recente en verdwenen bossen zijn direct vergelijkbaar met huidig landschap en reliëf;
- État-major, Cassini en historische luchtfoto's worden alleen later toegevoegd als een officiële stabiele kaartservice afzonderlijk is bevestigd.

### Stap 4 — bodem, karst en ondergrond

Status: gereed als aanvullende set.

- BRGM BSS-boringen, IDPR en gelokaliseerde cavités toegevoegd via officiële BRGM-services;
- deze lagen blijven aanvullende onderzoeksinformatie en staan niet standaard in de Frankrijk-preset;
- geologie blijft visueel bruikbaar; objectinformatie wordt getoond waar de service die levert.

### Stap 5 — lokale onderzoekszone

Status: gereed in 2.33.17.

- vaste kernzone Thédirac–Catus–Montgesty–Lavercantière–Peyrilles–Uzech–Gindou;
- ArcheOcc wordt voor dit onderzoek server-side tot deze gemeenten beperkt zodat niet heel Occitanie wordt geladen;
- de analysetlagen worden alleen binnen de lokale onderzoeksbbox berekend;
- een aparte Onderzoekszone Thédirac toont expliciet de werkafbakening zonder die als vindplaats te presenteren.

### Stap 6 — verklaarbare analyse Thédirac

Status: gereed in 2.33.17.

- Hellingklassen Thédirac worden berekend uit officiële IGN-hoogtegegevens; LiDAR HD is eerste bron, RGE ALTI is alleen fallback waar LiDAR geen geldige hoogte levert;
- per rastercel worden helling en lokaal hoogteverschil berekend;
- afstand tot BD TOPAGE-water en nabijheid van bekende ArcheOcc-context worden meegewogen;
- Onderzoekskaart Thédirac toont alleen hoger scorende cellen en vermeldt in de popup de gebruikte factoren, afstanden, hoogtebron en bronkwaliteit;
- OCS GE, BRGM-geologie en Forêts anciennes blijven zichtbare controlelagen naast de score, zodat de berekening controleerbaar blijft in plaats van een zwarte doos te worden.

### Stap 7 — interface en popups consequent

Status: gereed in 2.33.17.

De Frankrijk-sectie gebruikt voortaan de vaste groepen:

- Terrein & reliëf;
- Water & landschap;
- Bodem & geologie;
- Archeologie & historie;
- Analyse.

Lokale vectorlagen gebruiken compacte NL/FR-velden met naam, betekenis, bron en bronkwaliteit. Alle nieuwe lagen lopen mee met dezelfde zichtbaarheid- en transparantieregeling.

### Stap 8 — vaste bouw- en veldset

Status: gereed in 2.33.17.

- iedere release wordt pas afgetekend na productiebuild, docs-commit en Pages-deployment;
- onderaan Presets staat Frankrijk;
- Frankrijk gebruikt Hybride (wereld) en activeert de praktisch bruikbare veldset: LiDAR HD, BD TOPAGE-water, OCS GE landbedekking, geologie 1:50.000, Forêts anciennes, lokale ArcheOcc-context, Onderzoekskaart Thédirac en de onderzoekszone;
- BSS, IDPR en cavités blijven handmatig beschikbaar maar worden niet automatisch over de veldkaart heen gelegd.

## Volgende inhoudelijke richting

Nieuwe lagen worden alleen toegevoegd als ze aantoonbaar beter zijn dan wat er al staat. De eerstvolgende inhoudelijke winst zit daarom niet in meer losse WMS'en, maar in het verbeteren van bronattributen, lokale popups en de verklaarbare analyse met betrouwbare veldwaarnemingen.
