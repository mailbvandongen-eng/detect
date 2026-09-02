# Ontwikkelrichting Detect

## Uitgangspunt

Detect is uitsluitend Bobs persoonlijke onderzoeksapp. Geen verkoop, abonnementen, premiumlagen of publieke productambitie. De app ondersteunt metaaldetectie, steentijdonderzoek, archeologie, geomorfologie, bodem en bodemgebruik, hoogtekaarten, LiDAR en historische percelen.

Bij iedere wijziging gelden vaste regels:

1. bestaande goed werkende functies blijven intact;
2. de wijziging wordt in gewone taal in het wijzigingsoverzicht gezet;
3. bouwen en publiceren verlopen automatisch via GitHub;
4. nieuwe externe lagen worden vóór inbouw gecontroleerd op officiële bron, actuele service, bruikbare data en licentie;
5. iedere stap wordt afzonderlijk gebouwd, gepusht en gecontroleerd: broncommit → productiebuild → gegenereerde docs-commit → GitHub Pages-deployment → functionele controle;
6. pas na een geslaagde stap wordt aan de volgende stap begonnen.

## Prioriteit 1 — veldgebruik betrouwbaar maken

1. Gereed in 2.33.6 — hybride wereldkaart met duidelijke straat-, water-, plaats- en gebiedsnamen, plus luchtfoto-tijdreis: officiële PDOK-jaargangen vanaf 2016 in Nederland en Esri World Imagery Wayback vanaf 2014 wereldwijd.
2. Gereed in 2.33.8 — Android-terug sluit Detect niet meer direct: een open venster sluit eerst en vanaf de kaart volgt een expliciete sluitvraag. Dezelfde bescherming geldt in de browser, met de browser-eigen waarschuwing bij sluiten, verversen of verlaten waar het platform dat toestaat.
3. Gereed in 2.33.9 — GPS-weergave vereenvoudigd: één tik toont een locatiepunt en zoomt naar straatniveau; de tweede stand toont de richtingpijl en meedraaiende kaart; bij stilstand worden koers, rotatie en kaartvolging bevroren.
4. Gereed in 2.33.9 — opnieuw starten van GPS wacht op de eerste nieuwe actieve GPS-fix en zoomt daarna iedere sessie opnieuw betrouwbaar naar straatniveau.

## Prioriteit 2 — Thédirac en omgeving

Doelgebied: Thédirac met de directe onderzoeksomgeving richting Catus, Montgesty, Lavercantière, Peyrilles, Uzech en Gindou. Geen verzameling experimentele WMS-lagen: alleen bronnen die aantoonbaar werken en onderzoekswaarde hebben.

### Stap 1 — terrein, water en landgebruik

- bestaande IGN LiDAR HD, BRGM geologie 1:50.000 en geologie + reliëf behouden en functioneel controleren;
- BD TOPAGE 2026 toevoegen voor actuele metrische waterlopen; waar praktisch ook relevante waterobjecten;
- OCS GE Lot 2022 toevoegen voor metrische bodem-/landbedekking en landgebruik;
- nieuwe lagen vallen onder de hoofdschakelaar Frankrijk en dezelfde zichtbaarheid/transparantie-routine;
- objectdata krijgen een popup wanneer de bron attributen levert.

### Stap 2 — officiële archeologie

- ArcheOcc omzetten van kale punten naar bruikbare objecten met naam, periode, datering, beschrijving en bron;
- INRAP-opgravingen toevoegen waar de officiële dataset voldoende locatie- en objectinformatie levert;
- Mérimée/POP toevoegen voor officiële beschermde archeologische en historische objecten;
- exacte publieke broncoördinaten exact bewaren; broncentroïden of globale posities expliciet als zodanig markeren.

### Stap 3 — historisch landschap

- officiële IGN-laag Forêts anciennes toevoegen;
- daarna alleen geverifieerde officiële bronnen voor État-major, Cassini en historische luchtfoto's toevoegen;
- historische verandering bruikbaar maken voor vergelijking met huidig landgebruik en reliëf.

### Stap 4 — bodem, karst en ondergrond

- BRGM-objectlagen alleen toevoegen als objectinformatie bruikbaar kan worden uitgelezen;
- BSS-boringen, karst/cavités en hydrogeologie gericht toevoegen wanneer locatie en attributen betrouwbaar beschikbaar zijn;
- geen laag behouden die uitsluitend kaartbeeld geeft terwijl de verwachte objectinformatie ontbreekt, tenzij het kaartbeeld zelf aantoonbare onderzoekswaarde heeft.

### Stap 5 — lokale onderzoekszone

- lokale bronnen filteren op de kernzone rond Thédirac zodat telefoon en pc geen onnodige regionale datasets laden;
- zwakke handmatige referentiepunten vervangen door officiële objecten waar beschikbaar;
- bron, bronkwaliteit, datering en locatiekwaliteit zichtbaar houden.

### Stap 6 — verklaarbare analyse Thédirac

- hellingklassen en vlakke/zwak hellende zones uit hoogtegegevens;
- relatie tot waterlopen en terras-/rugposities;
- combinatie met landgebruik, geologie en bekende archeologische context;
- uiteindelijke Onderzoekskaart Thédirac toont waarom een zone opvalt en presenteert dit nooit als bewijs van archeologie.

### Vaste bouwvolgorde

Elke stap afzonderlijk uitvoeren. Na iedere stap: pushen, productiebuild controleren, gegenereerde docs-commit controleren, Pages-publicatie controleren en de nieuwe laag/functionele koppeling testen. Geen volgende stap voordat de vorige aantoonbaar groen en bruikbaar is.

## Prioriteit 3 — onderzoeksgebieden

Een onderzoeksgebied bewaart bij elkaar:

- locatie, kaartuitsnede en zoomniveau;
- gekozen preset en actieve lagen;
- toestemming en contactinformatie;
- notities, bezoekdatum en eigen punten of vondsten.

Dit is de logischste grotere uitbreiding: voorbereiding, veldwerk en terugkijken worden één werkwijze, op telefoon en pc via dezelfde cloudgegevens.

## Prioriteit 4 — gebiedsprofiel

Van één punt of getekend vlak automatisch een leesbaar profiel maken met beschikbare hoogte, geomorfologie, bodem, bodemgebruik en nabije archeologische signalen. Bronnen en ontbrekende gegevens worden altijd zichtbaar vermeld.

## Prioriteit 5 — lagen vergelijken

- twee lagen met een veeglijn of snelle wissel vergelijken;
- dekking, volgorde en transparantie per onderzoek bewaren;
- nuttige kaartbeelden als bladwijzer of momentopname opslaan.

## Prioriteit 6 — sterker veldgebruik

- geselecteerde kaart en onderzoeksgegevens vooraf beschikbaar maken waar bronvoorwaarden dat toestaan;
- wijzigingen veilig lokaal bewaren bij slecht bereik;
- later automatisch synchroniseren zonder dubbele gegevens.

## Prioriteit 7 — gerichte Europese uitbreiding

Niet heel Europa blind vullen. Per concreet onderzoeksgebied de beste officiële lagen toevoegen, met zichtbare bronstatus, dekking en actualiteit.

## Prioriteit 8 — verklaarbare analyse

Ondersteun combinaties zoals beekdal + verhoging + geschikte bodem + bekende archeologische context. Toon altijd waarom een gebied opvalt; geen zwarte doos die schijnzekerheid verkoopt.
