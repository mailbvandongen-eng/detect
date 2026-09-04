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

Doelgebied: een kader van circa 35 × 40 kilometer rond Thédirac, met de kern Catus–Montgesty–Lavercantière–Uzech–Gindou en uitlopers naar Gourdon, Luzech en Murcens. Exacte publieke broncoördinaten blijven exact; broncentroïden of globale posities worden als benadering gemarkeerd. Berekende analyse is altijd onderzoekshulp en nooit bewijs van archeologie.

### Stap 1 — terrein, water en landgebruik

Status: gereed.

- IGN LiDAR HD, BRGM geologie 1:50.000 en geologie + reliëf;
- BD TOPAGE 2026 voor actuele waterlopen; 150 klikbare vectorobjecten binnen het verruimde onderzoekskader liggen boven de landelijke WMS, zodat water op dorpsniveau dik genoeg blijft en de 75 beschikbare bronnamen zichtbaar zijn;
- OCS GE landbedekking; de dubbele/zwakke tweede OCS-laag is verwijderd en de overgebleven CS/US-broncodes worden in de popup naar gewone Nederlandse termen vertaald;
- alle onderzoekslagen vallen onder de Frankrijk-hoofdschakelaar en dezelfde zichtbaarheid/transparantie-routine.

### Stap 2 — officiële archeologie

Status: gereed voor de huidige onderzoeksset; verdere bronverrijking blijft mogelijk.

- Archeologische plekken · regio Thédirac (38) toont de nader onderzochte steentijd-, Keltische, Romeinse en middeleeuwse locaties ook wanneer ze beschermd of no-detect zijn; dat is kaartcontext, geen zoekadvies;
- de verruiming in 2.33.22 voegt 16 bronlocaties toe, waaronder vier paleolithische afzettingen/grotten, zes dolmens, twee oppida, Romeinse infrastructuur en drie verlaten of versterkte middeleeuwse complexen;
- de eerder gebruikte ArcheOcc-publieksdataset bevat 35 musea of publiekslocaties in heel Occitanie, maar nul objecten in de zeven onderzoeksgemeenten; de misleidende lege lokale laag is daarom in 2.33.21 verwijderd;
- exacte openbare bronpunten blijven exact, terwijl lieu-ditcentra en onbekende historische vindplekken zichtbaar als benadering zijn gemarkeerd;
- bestaande INRAP-sites en Franse historische/erfgoedlagen blijven beschikbaar als aanvullende context;
- de oude vier zwak onderbouwde handmatige punten zijn vervangen door afzonderlijk beschreven bronobjecten met locatiekwaliteit en bronlink.

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

- de kernzone blijft Thédirac–Catus–Montgesty–Lavercantière–Peyrilles–Uzech–Gindou; het werkvenster loopt nu iets ruimer van Prayssac en Frayssinet-le-Gélat tot Fajoles, Ginouillac en Murcens;
- de afbakening wordt intern gebruikt voor de lokale TOPAGE-lijnen en gerichte bronselectie en hoeft niet als groot los kaartvlak zichtbaar te zijn;
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

De Frankrijk-sectie gebruikt zeven groepen:

- Terrein & reliëf;
- Water & landschap;
- Bodem & geologie;
- Mineralen & fossielen;
- Archeologie & historie;
- Bezienswaardigheden.
- Wandelroutes.

Een aparte groep Analyse keert pas terug wanneer er een aantoonbaar bruikbare analysefunctie is. Lokale vectorlagen gebruiken compacte NL/FR-velden met naam, betekenis, bron en bronkwaliteit. Alle actieve Frankrijk-lagen lopen mee met dezelfde zichtbaarheid- en transparantieregeling.

### Stap 8 — vaste bouw- en veldset

Status: gereed en opgeschoond in 2.33.18.

- iedere release wordt pas afgetekend na productiebuild, docs-commit en Pages-deployment;
- onderaan Presets staat Frankrijk · Thédirac, ook wanneer een oudere lokale of cloudlijst de preset nog niet kende;
- Frankrijk · Thédirac gebruikt Hybride (wereld), opent de onderzoeksregio en activeert de bewezen veldset: LiDAR HD, BD TOPAGE-water, OCS GE landbedekking, geologie 1:50.000, Forêts anciennes, de 38 beschreven archeologische bronlocaties, Mineralen, Fossielen, Bezienswaardigheden en de officiële wandelroutes;
- BSS, IDPR, cavités en geologie + reliëf blijven handmatig beschikbaar maar worden niet automatisch over de veldkaart heen gelegd;
- afgekeurde Thédirac-rasteranalyse wordt ook uit eerder opgeslagen presets gemigreerd.

### Stap 9 — bezienswaardigheden op rijafstand

Status: uitgebreid in 2.33.24.

- de aparte laag Bezienswaardigheden bevat 69 gecontroleerde publieke bestemmingen in zeven herkenbare categorieën, waaronder apart Prehistorie & archeologie;
- iedere popup bevat een korte Nederlandse en Franse uitleg, bezoeknotitie, openbaar markerpunt, bronlink, autoroute en een OSRM-richttijd vanaf Thédirac zonder actuele verkeersdrukte;
- betekenis gaat voor een starre uurgrens: 66 bestemmingen liggen binnen circa drie uur; Niaux, Gargas en Pair-non-Pair blijven als expliciete uitzonderingen zichtbaar op circa 3 uur 02 tot 3 uur 13;
- langere ritten krijgen een veld Waarom de rit waard; replica’s, tijdelijke sluiting, verplichte reservering, steile toegang en trappen worden zonder toeristische mist vermeld;
- de selectie gebruikt echte grotten, kastelen, ruïnes, dorpen, bossen, natuurgebieden, uitzichtpunten en waterlandschappen; er zijn geen fictieve locaties toegevoegd.

### Stap 10 — spectaculaire officiële wandelroutes

Status: gereed in 2.33.25.

- de aparte laag Spectaculaire wandelroutes bevat elf lijnen uit GPX-bestanden die rechtstreeks door officiële toerisme- of departementale routepagina’s worden aangeboden;
- de selectie omvat kalkkliffen, watervallen en karst in Lot en Dordogne, de kloven van Bozouls en Viaur en vulkaan- en watervalroutes in de Cantal;
- iedere popup vermeldt afstand, D+, duur, zwaarte, routevorm en markering, bijzonderheden, natuur en wildlife, klim- of klauterwerk, kniebelasting, omstandigheden, route naar de start en de officiële website en GPX;
- de gekoppelde GPX van Micoque meet 12,3 km terwijl de bronpagina varianten van 8 en 15 km noemt; Pas de Cère toont de enkele lijn van 1 km terwijl de officiële afstand van 2 km heen-en-terug is. Beide bronafwijkingen staan zichtbaar in de popup;
- tijdelijk gesloten routes zijn niet opgenomen. De Cantal-trail rond Bec de l’Aigle en Puy Griou staat eerlijk als gemarkeerde trailroute vermeld, inclusief ruimer te plannen wandeltijd en bergweerwaarschuwing.

### Stap 11 — mineralen en fossielen

Status: gereed in 2.33.26.

- twee aparte puntlagen bevatten 12 mineralogische locaties en 22 fossielvindplaatsen uit de publiek gevalideerde INPG-inventaris, aangevuld met officiële bezoekers- en beheerbronnen;
- de selectie onderscheidt bovengrondse ontsluitingen en steengroeven van ondergrondse mijnen, grotten en karstvullingen; een historisch rijke vindplaats wordt niet automatisch als actuele oppervlaktevondst verkocht;
- vrijwel alles ligt binnen circa 1½ uur rijden vanaf Thédirac. Alleen de uitzonderlijk rijke, officieel bezoekbare paleosites Béon en Sansan zijn als langere fossieldagtocht opgenomen;
- ieder punt vermeldt bewijs, geologische context, oppervlakte-status, rijtijd, bron, markerprecisie, toegang en verzamelregels. INPG-contourcentra worden nadrukkelijk niet als ingang of toestemming gepresenteerd;
- verzamelen en prospecteren staat bij de Réserve naturelle nationale géologique du Lot en de beschermde géotopes Thézels en Combe Dorée als verboden. Verlaten mijnen, schachten en niet-openbare groeves krijgen een expliciete niet-betredenwaarschuwing.

## Volgende inhoudelijke richting

Nieuwe lagen worden alleen toegevoegd als ze aantoonbaar beter zijn dan wat er al staat. De eerstvolgende winst zit in rijkere bronattributen en betrouwbare popups op echte objecten. Een nieuwe lokale analyse wordt pas gebouwd wanneer zij op één aangeklikte plek helder kan uitleggen wat er feitelijk bekend is over reliëf, water, landbedekking, geologie en archeologische context, zonder grote nietszeggende kleurvlakken.
