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

Status: gereed en vereenvoudigd in 2.33.18.

- de kernzone blijft Thédirac–Catus–Montgesty–Lavercantière–Peyrilles–Uzech–Gindou;
- ArcheOcc wordt voor dit onderzoek server-side tot deze gemeenten beperkt zodat niet heel Occitanie wordt geladen;
- de afbakening wordt intern gebruikt voor gerichte bronselectie en hoeft niet als groot los kaartvlak zichtbaar te zijn;
- officiële objecten en hun broninformatie blijven leidend; er worden geen kunstmatige lokale vindplaatsen toegevoegd.

### Stap 6 — verklaarbare analyse Thédirac

Status: eerste uitwerking afgekeurd na veldtest en verwijderd in 2.33.18.

- de eerste versie met Hellingklassen, Onderzoekskaart en een zichtbaar onderzoekszone-vlak leverde in de praktijk vooral grote gekleurde rastervakken op;
- de beloofde informatiewaarde was daarmee onvoldoende, ook al bevatte de berekening helling, reliëf, waterafstand en ArcheOcc-context;
- deze drie kaartlagen zijn daarom volledig uit de interface, fabrieken en Frankrijk-preset gehaald;
- een analysekaart komt alleen terug als een aangeklikte locatie direct bruikbare, begrijpelijke informatie geeft en de kaart ook zonder popup leesbaar blijft;
- LiDAR, waterlopen, landbedekking, geologie, oude bossen en echte archeologische bronobjecten blijven voorlopig de betrouwbare analysemiddelen.

### Stap 7 — interface en popups consequent

Status: opgeschoond in 2.33.18.

De Frankrijk-sectie gebruikt voorlopig vier groepen:

- Terrein & reliëf;
- Water & landschap;
- Bodem & geologie;
- Archeologie & historie.

Een aparte groep Analyse keert pas terug wanneer er een aantoonbaar bruikbare analysefunctie is. Lokale vectorlagen gebruiken compacte NL/FR-velden met naam, betekenis, bron en bronkwaliteit. Alle actieve Frankrijk-lagen lopen mee met dezelfde zichtbaarheid- en transparantieregeling.

### Stap 8 — vaste bouw- en veldset

Status: gereed en opgeschoond in 2.33.18.

- iedere release wordt pas afgetekend na productiebuild, docs-commit en Pages-deployment;
- onderaan Presets staat Frankrijk · Thédirac, ook wanneer een oudere lokale of cloudlijst de preset nog niet kende;
- Frankrijk · Thédirac gebruikt Hybride (wereld), opent de onderzoeksregio en activeert de bewezen veldset: LiDAR HD, BD TOPAGE-water, OCS GE landbedekking, geologie 1:50.000, Forêts anciennes en lokale ArcheOcc-context;
- BSS, IDPR, cavités en geologie + reliëf blijven handmatig beschikbaar maar worden niet automatisch over de veldkaart heen gelegd;
- afgekeurde Thédirac-rasteranalyse wordt ook uit eerder opgeslagen presets gemigreerd.

## Volgende inhoudelijke richting

Nieuwe lagen worden alleen toegevoegd als ze aantoonbaar beter zijn dan wat er al staat. De eerstvolgende winst zit in rijkere bronattributen en betrouwbare popups op echte objecten. Een nieuwe lokale analyse wordt pas gebouwd wanneer zij op één aangeklikte plek helder kan uitleggen wat er feitelijk bekend is over reliëf, water, landbedekking, geologie en archeologische context, zonder grote nietszeggende kleurvlakken.
