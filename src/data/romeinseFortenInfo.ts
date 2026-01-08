// Uitgebreide informatie over Romeinse forten en versterkingen
// Op B1 niveau geschreven voor detectoristen

export interface RomeinsFortInfo {
  naam: string
  latinNaam?: string
  type: 'castellum' | 'wachttoren' | 'vlootbasis' | 'legerkamp' | 'minifort' | 'versterking' | 'villa'
  periode: string
  beschrijving: string
  watWasHier: string
  watTeZien: string
  verwachteVondsten: string
  betekenis: string
  bronnen?: string[]
}

// Database met informatie per fort (key = Name uit GeoJSON)
export const ROMEINSE_FORTEN_INFO: Record<string, RomeinsFortInfo> = {
  'Fectio': {
    naam: 'Fectio',
    latinNaam: 'Fectio',
    type: 'castellum',
    periode: 'ca. 4 - 270 n.Chr.',
    beschrijving: 'Groot Romeins castellum bij Bunnik/Vechten, aan de splitsing van Rijn en Vecht. Een van de belangrijkste legerbases in Nederland met ruimte voor 500 soldaten. Het fort had barakken, badhuis, hospitaal en pakhuizen. Buiten de muren woonden handelaren en soldatenfamilies in een vicus. Hier is een compleet Romeins schip gevonden (De Meern 1). Strategisch gelegen voor transport over de rivieren. Veel vondsten door natte bodem: leer, hout, textiel naast munten en militaria. Te bezoeken: Archeologisch Park Castellum Hoge Woerd met reconstructie en museum.',
    watWasHier: 'Groot castellum met ruimte voor 500 soldaten, barakken, badhuis, hospitaal en pakhuizen. Buiten het fort een burgerdorp.',
    watTeZien: 'Archeologisch Park Castellum Hoge Woerd toont de contouren. Museum met veel vondsten waaronder een Romeins schip.',
    verwachteVondsten: 'Munten, fibulae, aardewerk, wapens, paardentuig, militaire uitrusting. Door natte bodem ook leer, hout en textiel.',
    betekenis: 'Een van de belangrijkste forten aan de Limes. Knooppunt voor troepen- en goederentransport.',
    bronnen: ['https://www.hogewoerd.nl', 'https://www.livius.org/articles/place/fectio-vechten/']
  },
  'Traiectum': {
    naam: 'Traiectum',
    latinNaam: 'Traiectum',
    type: 'castellum',
    periode: 'ca. 42 - 275 n.Chr.',
    beschrijving: 'Romeins castellum onder het huidige Domplein in Utrecht. De naam betekent "doorwaadbare plaats" - hier splitsten Rijn en Vecht. Het fort (124x152m in laatste fase) bood plaats aan ca. 500 soldaten. Vijf bouwfases: eerst hout, na 200 n.Chr. steen met tufsteen uit de Eifel. Cohors II Hispanorum peditata (Spaanse infanterie) was hier uniek gelegerd 88-275 n.Chr. - hun dakpanstempels zijn nergens anders aan de Limes gevonden! Het fort werd verwoest tijdens de Bataafse Opstand (69 n.Chr.). DOMunder onder het Domplein toont de opgegraven resten. UNESCO Werelderfgoed sinds 2021.',
    watWasHier: 'Castellum (500 soldaten) bij riviersplitsing. Cohors II Hispanorum gelegerd.',
    watTeZien: 'DOMunder onder het Domplein: opgravingen te bezoeken. Principia en poorten blootgelegd.',
    verwachteVondsten: 'Dakpannen met stempels, munten, aardewerk, tufsteen bouwmateriaal, militaria.',
    betekenis: 'UNESCO Werelderfgoed. Oorsprong van de stad Utrecht.',
    bronnen: [
      'https://www.livius.org/articles/place/traiectum-utrecht/',
      'https://www.utrechtaltijd.nl/verhalen/castellum-traiectum-een-romeinse-legerbasis-in-het-hart-van-de-domstad/',
      'https://www.romeinen.nl/locatie-overzicht/3447271878/domunder-castellum-traiectum'
    ]
  },
  'Laurum': {
    naam: 'Laurum',
    latinNaam: 'Laurum',
    type: 'castellum',
    periode: 'ca. 40 - 270 n.Chr.',
    beschrijving: 'Romeins castellum in het huidige Woerden aan de Oude Rijn. Garnizoen van ca. 500 soldaten in houten barakken. Bijzonder vanwege de natte veenbodem: organisch materiaal bleef bewaard zoals houten schrijfplankjes met Latijnse teksten, leren schoenen en een Romeinse boot. Het fort werd meerdere keren herbouwd na overstromingen. De contouren zijn in het stratenpatroon herkenbaar. Buiten de muren lag een vicus (burgerdorp). Vondsten in Stadsmuseum Woerden, waaronder unieke houten voorwerpen die elders zijn vergaan.',
    watWasHier: 'Castellum voor 500 soldaten met houten barakken, badhuis en pakhuizen. Vicus buiten de muren.',
    watTeZien: 'Stadsmuseum Woerden met bijzondere vondsten. Fort-contouren in stratenpatroon herkenbaar.',
    verwachteVondsten: 'Militaria, aardewerk, munten, schrijfplankjes. Door natte veengrond ook hout, leer en schoenen.',
    betekenis: 'Toont Romeins bouwen in moeilijk veengebied. Unieke organische vondsten.',
    bronnen: ['https://www.castellumwoerden.nl']
  },
  'Castellum Praetorium Agrippinae': {
    naam: 'Praetorium Agrippinae',
    latinNaam: 'Praetorium Agrippinae',
    type: 'castellum',
    periode: 'ca. 40 - 275 n.Chr.',
    beschrijving: 'Een van de best opgegraven Romeinse locaties van Nederland. Het castellum werd gesticht in de winter van 39/40 n.Chr. door keizer Caligula, vernoemd naar zijn moeder Vipsania Agrippina. Een opgegraven wijnvat bevatte wijn van de persoonlijke wijngaarden van de keizer! Er zijn 7 bouwfasen gevonden, 6 van hout en de laatste van steen - uniek compleet inzicht in Romeinse bouwtechnieken. Cohors III Gallorum equitata was hier gelegerd. Bij opgravingen (1941-1953) zijn door het grondwater veel organische vondsten bewaard: voedselresten, leer, touw. De vicus buiten het fort strekte zich 1 km uit met 700+ graven. Op het Castellumplein zijn de contouren in brons gemarkeerd.',
    watWasHier: 'Castellum met 7 bouwfasen. Vicus (1 km) met 700+ graven. Detachement Cohors III Gallorum.',
    watTeZien: 'Castellumplein met bronzen markeringen. Torenmuseum Valkenburg. Gereconstrueerde poort.',
    verwachteVondsten: 'Militaria, organisch materiaal (voedsel, leer, touw), aardewerk, munten, inscripties.',
    betekenis: 'Best gedocumenteerde Romeinse fort van Nederland. UNESCO Werelderfgoed.',
    bronnen: [
      'https://www.livius.org/articles/place/praetorium-agrippinae-valkenburg-zh/',
      'https://www.geschiedenisvanzuidholland.nl/zien-en-doen/locaties/praetorium-agrippinae-in-valkenburg/',
      'https://oudvalkenburgzh.nl/torenmuseum-5/'
    ]
  },
  'Castra Hunnerberg': {
    naam: 'Castra Hunnerberg',
    latinNaam: 'Castra',
    type: 'legerkamp',
    periode: 'ca. 16 v.Chr. - 104 n.Chr.',
    beschrijving: 'Enorm Romeins legerkamp op de Hunnerberg bij Nijmegen - 42 hectare (80 voetbalvelden), ruimte voor 12.000 man. De enige plek in Nederland waar echte legioenen (geen hulptroepen) verbleven! Na de Bataafse Opstand (69 n.Chr.) vestigde Legio X Gemina Pia Fidelis zich hier - opgericht door Julius Caesar en het bekendste legioen van Nederland. De afkorting LXG is talloze keren gevonden op dakpannen en tegels. Bij opgravingen zijn ruim 1000 fragmenten militaire uitrusting en paardentuig gevonden. In 104 n.Chr. vertrok het legioen naar de Balkan - een ramp voor de economie. UNESCO Werelderfgoed sinds 2021, omschreven als "bakermat van de Nederduitse Limes".',
    watWasHier: 'Legerkamp voor 12.000 man. Legio X Gemina (71-104 n.Chr.), opgericht door Julius Caesar.',
    watTeZien: 'Museum Het Valkhof. Museum Kam in de Hunnerberg. Grafvelden in Nijmegen-Oost.',
    verwachteVondsten: 'Legioenstempels LXG, militaria, paardentuig, dakpannen, munten, grafstenen.',
    betekenis: 'UNESCO Werelderfgoed. Bakermat van de Limes. Enige legioenskamp in Nederland.',
    bronnen: [
      'https://www.livius.org/articles/place/noviomagus-nijmegen-hunnerberg/',
      'https://www.welkominnijmegen.nl/pages/geschiedenis/de-romeinen-in-nijmegen/de-legerkampen.php',
      'https://mijngelderland.nl/inhoud/specials/archeokroniek/romeinse-militaire-uitrusting-en-paardentuig-van-de-hunerberg-te-nijmegen'
    ]
  },
  'Castellum Kops Plateau': {
    naam: 'Kops Plateau',
    latinNaam: 'Oppidum Batavorum',
    type: 'castellum',
    periode: 'ca. 10 v.Chr. - 70 n.Chr.',
    beschrijving: 'Vroege Romeinse basis op het Kops Plateau in Nijmegen, later de civiele hoofdstad van de Bataven: Oppidum Batavorum. Hier woonden Romeinen en Bataven samen - het eerste contactpunt tussen beide culturen. Verwoest tijdens de Bataafse Opstand van 69-70 n.Chr. onder leiding van Julius Civilis. Gemengde vondsten: Romeinse militaria én Keltisch-Bataafse voorwerpen. Vroege importaardewerk en munten van Augustus. Nu natuurgebied. Museum Het Valkhof toont de unieke vondsten van deze ontmoeting van culturen.',
    watWasHier: 'Eerst Romeins kamp, later Bataafse hoofdstad. Romeinen en Bataven woonden samen.',
    watTeZien: 'Kops Plateau is natuurgebied. Museum Het Valkhof toont de vondsten.',
    verwachteVondsten: 'Vroege militaria, Keltisch-Bataafse voorwerpen, importaardewerk, munten van Augustus.',
    betekenis: 'Eerste contactpunt Romeinen-Bataven. Begin van romanisering Nederland.',
    bronnen: ['https://www.livius.org/articles/place/noviomagus-nijmegen-kops-plateau/']
  },
  'Nijmegen, Valkhof': {
    naam: 'Valkhof Nijmegen',
    latinNaam: 'Valkhof',
    type: 'versterking',
    periode: 'ca. 270 - 400 n.Chr.',
    beschrijving: 'Laat-Romeinse versterking op het Valkhof in Nijmegen, aan de Waaloever. Gebouwd toen het Rijk onder druk stond van Germaanse invallen. Strategische positie boven de rivier. Continuïteit: Karel de Grote bouwde hier later zijn palts (koninklijke residentie). De Sint-Nicolaaskapel bevat mogelijk Karolingische elementen op Romeinse fundamenten. Typische laat-Romeinse vondsten: gordels met riemtongen, militaire gespen, munten van 3e-4e eeuwse keizers. Museum Het Valkhof toont de overgang van Romeinse tijd naar vroege middeleeuwen.',
    watWasHier: 'Laat-Romeinse versterking boven de Waal. Later Karolingische palts.',
    watTeZien: 'Valkhofpark met Sint-Nicolaaskapel. Museum Het Valkhof.',
    verwachteVondsten: 'Laat-Romeinse munten, gordels, riemtongen, militaire gespen, 3e-4e eeuws aardewerk.',
    betekenis: 'Toont overgang Romeinse tijd naar middeleeuwen. Nijmegen bleef machtscentrum.',
    bronnen: ['https://www.museumhetvalkhof.nl']
  },
  'Castellum Op de Hoge Woerd': {
    naam: 'Hoge Woerd',
    latinNaam: 'Castellum',
    type: 'castellum',
    periode: 'ca. 50 - 270 n.Chr.',
    beschrijving: 'Romeins castellum in Leidsche Rijn (Utrecht), nu een voorbeeldig archeologisch park. Middelgroot fort met houten gebouwen en een burgerdorp (vicus) buiten de muren. Hier is een compleet Romeins schip gevonden: De Meern 1, een 25 meter lange vrachtboot. Door de natte kleigrond bleef veel organisch materiaal bewaard. Het park toont de reconstructie van het fort - je kunt over de originele fundamenten lopen. Modern museum met interactieve presentatie. Ideale plek om te zien hoe een Romeins fort eruitzag.',
    watWasHier: 'Middelgroot castellum met houten gebouwen. Vicus buiten de muren. Compleet schip gevonden.',
    watTeZien: 'Archeologisch Park Hoge Woerd: reconstructie fort, museum, originele fundamenten.',
    verwachteVondsten: 'Militaria, scheepsonderdelen, aardewerk, munten. Door natte grond ook organisch materiaal.',
    betekenis: 'Best gepresenteerde Romeinse fort in Nederland. Ideaal om fort-layout te begrijpen.',
    bronnen: ['https://www.hogewoerd.nl']
  },
  'Lugdunum': {
    naam: 'Lugdunum',
    latinNaam: 'Lugdunum',
    type: 'vlootbasis',
    periode: 'ca. 40 - 270 n.Chr.',
    beschrijving: 'Romeinse vlootbasis en versterkte graanopslagplaats bij de monding van de Rijn, het westelijkste punt van de gehele Limes. Hier stond mogelijk een enorme vuurtoren (ca. 60m hoog) naar model van de Pharos van Ostia - vissers noemden deze "Kalla\'s toren" (Caligula). Door de vele dakpannen van de Romeinse vloot wordt aangenomen dat dit een vlootbasis was. Het fort is door kustafslag in zee verdwenen. Bij stormen in 1520, 1552 en 1562 waren de ruïnes van de "Brittenburg" zichtbaar op het strand; de laatst gedateerde vondst was 270 n.Chr. Het Rijksmuseum van Oudheden in Leiden toont vondsten. De beroemde kaart van Ortelius toont hoe het eruit zag.',
    watWasHier: 'Vlootbasis met vuurtoren bij Rijnmonding. Graanopslag voor Britannia.',
    watTeZien: 'Fort verdwenen in zee. RMO Leiden toont vondsten en kaart van Ortelius.',
    verwachteVondsten: 'Na stormen: munten, aardewerk, militaria. Fort zelf onbereikbaar in Noordzee.',
    betekenis: 'Westelijk eindpunt van de Limes. Verbinding met Britannia.',
    bronnen: [
      'https://www.livius.org/articles/place/lugdunum-katwijk/',
      'https://nl.wikipedia.org/wiki/Lugdunum_(Katwijk)'
    ]
  },
  'Vlootbasis Naaldwijk': {
    naam: 'Vlootbasis Naaldwijk',
    type: 'vlootbasis',
    periode: '1e - 2e eeuw n.Chr.',
    beschrijving: 'Vermoedelijke basis van de Classis Germanica (Germaanse vloot) bij Naaldwijk in het Westland. De Romeinse vloot patrouilleerde langs de Noordzeekust en vervoerde troepen en goederen naar Britannia. Haven met dokken voor oorlogsschepen en transportboten. Mariniers (classiarii) waren hier gestationeerd. Het gebied is nu landbouwgrond, maar bij opgravingen zijn haven-structuren en scheepsgerelateerde vondsten gedaan. Ankers, scheepsonderdelen en specifieke mariniers-uitrusting. Toont het belang van zeemacht voor de Romeinse grensverdediging.',
    watWasHier: 'Haven voor oorlogsschepen. Mariniers gestationeerd. Patrouilles langs Noordzeekust.',
    watTeZien: 'Gebied is landbouwgrond. Vondsten in lokale musea.',
    verwachteVondsten: 'Scheepsonderdelen, ankers, mariniers-uitrusting, importaardewerk.',
    betekenis: 'Toont belang Romeinse vloot voor kustverdediging.',
    bronnen: []
  },
  'Minifort Ockenburg': {
    naam: 'Minifort Ockenburg',
    type: 'minifort',
    periode: 'ca. 150 - 180 n.Chr.',
    beschrijving: 'Klein Romeins kustfort bij Ockenburg in Den Haag, op een oude strandwal. Bewaakte de kust tegen piraten en Germaanse invallen over zee. Ruimte voor slechts 20-30 soldaten - een wachtpost eerder dan een echt fort. Korte gebruiksperiode van ca. 30 jaar. Toont dat de Romeinen niet alleen de rivieren maar ook de Noordzeekust verdedigden. Het terrein is beschermd rijksmonument maar niet publiek toegankelijk. Vondsten in het Haags Historisch Museum: militaria, aardewerk en munten uit de 2e eeuw.',
    watWasHier: 'Kleine kustwachtpost voor 20-30 soldaten op strandwal.',
    watTeZien: 'Terrein beschermd maar niet toegankelijk. Haags Historisch Museum.',
    verwachteVondsten: 'Kleine hoeveelheden militaria, aardewerk, munten 2e eeuw.',
    betekenis: 'Toont Romeinse kustverdediging naast rivierforten.',
    bronnen: []
  },
  'Castellum Ceuclum': {
    naam: 'Ceuclum',
    latinNaam: 'Ceuclum',
    type: 'castellum',
    periode: 'ca. 70 - 270 n.Chr.',
    beschrijving: 'Romeins castellum bij Cuijk aan de Maas, waar de belangrijke weg naar het noorden de rivier kruiste. Het fort bewaakte een brug of veerpont. Garnizoen van hulptroepen. De naam Cuijk is afgeleid van Ceuclum. Bij de brug werden ritueel munten geofferd. Het fort lag op een strategisch punt waar de Maasroute de landweg kruiste. Vondsten wijzen op handel en militaire activiteit. Het Maasmuseum in Cuijk toont lokale Romeinse vondsten. Onder het centrum zijn bij bouwwerkzaamheden regelmatig resten gevonden.',
    watWasHier: 'Castellum bij Maasbrug. Belangrijke rivierovergang en kruispunt.',
    watTeZien: 'Maasmuseum Cuijk. Resten gevonden onder centrum.',
    verwachteVondsten: 'Munten (geofferd bij brug), fibulae, aardewerk, bruggerelateerde vondsten.',
    betekenis: 'Belangrijke schakel in wegennet langs de Maas.',
    bronnen: ['https://www.livius.org/articles/place/ceuclum-cuijk/']
  },
  'Castellum Meinerswijk': {
    naam: 'Meinerswijk',
    type: 'castellum',
    periode: 'ca. 40 - 270 n.Chr.',
    beschrijving: 'Romeins castellum in de uiterwaarden bij Arnhem-Meinerswijk aan de Rijn. Het fort bewaakt een strategisch punt waar de rivier goed te overzien was. Meerdere bouwfasen door overstromingen. In de uiterwaarden zijn bij erosie en opgravingen vondsten gedaan: militaria, aardewerk, munten en scheepsresten. Het gebied is nu natuurgebied Meinerswijk met wisselende waterstanden. Na hoog water kunnen vondsten aan de oppervlakte komen. Museum Arnhem toont Romeinse vondsten uit de regio.',
    watWasHier: 'Castellum in uiterwaarden. Meerdere bouwfasen door overstromingen.',
    watTeZien: 'Natuurgebied Meinerswijk. Museum Arnhem.',
    verwachteVondsten: 'Militaria, aardewerk, munten, scheepsresten. Na hoog water aan oppervlakte.',
    betekenis: 'Onderdeel fortenketen langs de Rijn.',
    bronnen: []
  },
  'Levefanum': {
    naam: 'Levefanum',
    latinNaam: 'Levefanum',
    type: 'versterking',
    periode: 'ca. 50 - 270 n.Chr.',
    beschrijving: 'Romeinse versterking bij Wijk bij Duurstede, waar de Rijn splitste in de Lek en Kromme Rijn. Strategisch cruciaal punt voor controle over het scheepvaartverkeer. Waarschijnlijk ook een haven voor overslag van goederen. Op dezelfde plek ontstond later de Karolingische handelsstad Dorestad, een van de belangrijkste havens van vroegmiddeleeuws Europa. De continuïteit toont het blijvende belang van deze locatie. Dorestad Museum vertelt het verhaal van Romeinse tijd tot Vikingaanvallen. Vondsten: munten, handelsaardewerk, militaria.',
    watWasHier: 'Versterking bij riviersplitsing. Haven en overslagpunt. Later Dorestad.',
    watTeZien: 'Dorestad Museum. Terrein bebouwd.',
    verwachteVondsten: 'Munten, handelsaardewerk, militaria, scheepsgerelateerde vondsten.',
    betekenis: 'Strategisch controlepunt waterwegen. Later belangrijke handelsstad Dorestad.',
    bronnen: []
  },
  'Nigrum Pullum': {
    naam: 'Nigrum Pullum',
    latinNaam: 'Nigrum Pullum (Zwarte Poel)',
    type: 'minifort',
    periode: 'ca. 40 - 270 n.Chr.',
    beschrijving: 'Romeins castellum bij Zwammerdam aan de Oude Rijn. Garnizoen van 100-150 soldaten met pakhuizen en haven voor riviertransport. Wereldberoemd door de vondst van 6 Romeinse schepen (1971-1974) in perfecte staat - bewaard door de natte veengrond. De Zwammerdamschepen zijn de best bewaarde Romeinse rivierschepen ter wereld en tonen uniek inzicht in Romeins transport en scheepsbouw. Vondsten: schepen, leren schoeisel, houten voorwerpen, aardewerk, munten, militaria. Te zien in Rijksmuseum van Oudheden, Leiden.',
    watWasHier: 'Klein fort met pakhuizen en haven. Bij opgravingen werden 6 Romeinse schepen gevonden.',
    watTeZien: 'De schepen zijn in het Rijksmuseum van Oudheden in Leiden. Het terrein zelf is niet te bezoeken.',
    verwachteVondsten: 'Scheepsonderdelen, leren schoeisel, houten voorwerpen, aardewerk, munten, en door de natte veengrond organisch materiaal.',
    betekenis: 'Wereldberoemd om de goed bewaarde Romeinse schepen. Toont transport over de Rijn.',
    bronnen: ['https://www.rmo.nl/collectie/themas/zwammerdam']
  },
  'Stenen wachttoren Vleuterweide': {
    naam: 'Wachttoren Vleuterweide',
    type: 'wachttoren',
    periode: 'ca. 150 - 250 n.Chr.',
    beschrijving: 'Bijzondere stenen wachttoren in Vleuterweide bij Utrecht - de meeste Romeinse wachttorens waren van hout. De stenen constructie wijst op permanentie en belang. Onderdeel van het signaleringssysteem langs de Limes: bij gevaar werden vuren aangestoken om forten te waarschuwen. De toren bood uitzicht over de omgeving en de rivier. Mogelijk woonden hier ook families van de soldaten. De fundamenten zijn gemarkeerd in de moderne woonwijk. Vondsten: bouwmateriaal (dakpannen, stenen), aardewerk, persoonlijke bezittingen. Centraal Museum Utrecht.',
    watWasHier: 'Stenen wachttoren (ongebruikelijk). Signaalpost voor waarschuwingssysteem.',
    watTeZien: 'Fundamenten gemarkeerd in wijk. Centraal Museum Utrecht.',
    verwachteVondsten: 'Dakpannen met legioenstempels, aardewerk, persoonlijke bezittingen.',
    betekenis: 'Een van weinige bekende stenen wachttorens. Toont variatie in bouwwijzen.',
    bronnen: []
  },
  'Wachttoren Bunnik': {
    naam: 'Wachttoren Bunnik',
    type: 'wachttoren',
    periode: 'ca. 50 - 270 n.Chr.',
    beschrijving: 'Houten wachttoren bij Bunnik aan de Rijn, onderdeel van het signaleringssysteem langs de Limes. Elke paar kilometer stond een toren met uitzicht over de rivier. Bij nadering van vijanden werden vuren of rooksignalen gegeven, zodat binnen minuten alle forten gewaarschuwd waren. De torens waren meestal van hout op een aarden verhoging. Kleine bezetting van 4-8 soldaten. De exacte locatie is niet precies bekend doordat het gebied nu bebouwd is. Vondsten zijn schaars: wat aardewerk en militaria.',
    watWasHier: 'Houten uitkijktoren voor signalering. Kleine bezetting van 4-8 soldaten.',
    watTeZien: 'Exacte locatie onbekend. Gebied bebouwd.',
    verwachteVondsten: 'Kleine hoeveelheden militaria en aardewerk.',
    betekenis: 'Onderdeel signaleringssysteem langs Limes.',
    bronnen: []
  },
  'Castellum Maastricht': {
    naam: 'Castellum Maastricht',
    latinNaam: 'Mosae Trajectum',
    type: 'versterking',
    periode: 'ca. 270 - 400 n.Chr.',
    beschrijving: 'Laat-Romeinse versterking in het centrum van Maastricht bij de brug over de Maas. Mosae Trajectum betekent "Maasoversteek". Gebouwd in een periode dat het Rijk onder druk stond van Germaanse invallen. Het fort bewaakte de strategische rivierovergang. Continuïteit van bewoning: Maastricht bleef bewoond tot op heden. Onder het Vrijthof en omgeving zijn Romeinse resten gevonden. Typische laat-Romeinse vondsten: gordels, riembeslag, munten 3e-4e eeuw, zwaar versterkte muren. Centre Ceramique vertelt de geschiedenis.',
    watWasHier: 'Laat-Romeinse versterking bij Maasbrug. Verdediging tegen Germaanse invallen.',
    watTeZien: 'Onder Vrijthof zijn resten. Centre Ceramique.',
    verwachteVondsten: 'Laat-Romeinse munten, militaire gordelbeslag, riemtongen, 3e-4e eeuws aardewerk.',
    betekenis: 'Toont continuïteit - Maastricht ononderbroken bewoond sinds Romeinse tijd.',
    bronnen: ['https://www.centreceramique.nl']
  },
  'Roompot': {
    naam: 'Roompot Fort',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Romeins kustfort bij de Roompot in Zeeland dat de toegang tot de Oosterschelde bewaakte. Het fort beschermde schepen tegen piraterij en controleerde de vaarroute. Door zeespiegelstijging en kustafslag is het fort in de golven verdwenen. De exacte locatie ligt nu onder water. Soms spoelen na stormen vondsten aan op de stranden van Noord-Beveland en Walcheren: munten, aardewerk, metalen voorwerpen. Toont dat de Romeinen de gehele Zeeuwse delta controleerden, niet alleen de grote rivieren.',
    watWasHier: 'Kustfort dat zeeroute bewaakte. Bescherming tegen piraterij.',
    watTeZien: 'Fort verdwenen in zee. Soms vondsten op strand na stormen.',
    verwachteVondsten: 'Na stormen: munten, aardewerk, metalen voorwerpen op Zeeuwse stranden.',
    betekenis: 'Toont Romeinse controle over Zeeuwse wateren.',
    bronnen: []
  },
  'Castellum Carvium': {
    naam: 'Carvium',
    latinNaam: 'Carvium',
    type: 'castellum',
    periode: 'ca. 40 - 270 n.Chr.',
    beschrijving: 'Romeins castellum bij Herwen-Aerdt (bij Lobith) waar Rijn en Waal samenkwamen - een strategisch knooppunt van eerste orde. Het fort controleerde het rivierverkeer op beide grote stromen. Garnizoen van hulptroepen. In de uiterwaarden zijn bij erosie en opgravingen vondsten gedaan. Het gebied is nu natuurgebied de Gelderse Poort met dynamische rivierlandschap. Na hoog water kunnen vondsten aan oppervlakte komen. Museum Het Valkhof in Nijmegen toont vondsten uit de regio. Scheepsresten gevonden.',
    watWasHier: 'Fort bij samenvloeiing Rijn en Waal. Controleerde twee grote rivieren.',
    watTeZien: 'Natuurgebied Gelderse Poort. Museum Het Valkhof Nijmegen.',
    verwachteVondsten: 'Militaria, aardewerk, munten, scheepsresten. Na hoog water aan oppervlakte.',
    betekenis: 'Controleerde strategisch knooppunt waterwegen.',
    bronnen: []
  },
  'Matilo': {
    naam: 'Matilo',
    latinNaam: 'Matilo',
    type: 'castellum',
    periode: 'ca. 70 - 260 n.Chr.',
    beschrijving: 'Romeins castellum bij Leiden-Roomburg, gebouwd na de Bataafse Opstand (69-70 n.Chr.) op een strategische plek aan de monding van het Kanaal van Corbulo. Het gigantische fort (80x120m) bood plaats aan ca. 500 soldaten en is een van de best bewaarde castella in Nederland. De archeologische resten liggen grotendeels intact onder Archeologisch Park Matilo. In het park staan 6 replica-wachttorens en een aarden wal die de omtrek van het fort visualiseert. Het fort werd tussen 240-260 n.Chr. opgeheven. De locatie Roomburg ("Romeinse burcht") verwijst naar de oorsprong. UNESCO Werelderfgoed sinds 2021.',
    watWasHier: 'Groot castellum (500 soldaten) bij monding Kanaal van Corbulo. Vicus buiten de muren.',
    watTeZien: 'Archeologisch Park Matilo met 6 wachttoren-replica\'s en aarden wal. Rijksmuseum van Oudheden.',
    verwachteVondsten: 'Militaria, grafgiften, crematie-urnen, aardewerk, munten, fibulae.',
    betekenis: 'UNESCO Werelderfgoed. Een van de best bewaarde castella van Nederland.',
    bronnen: [
      'https://parkmatilo.nl/het-verhaal-van-matilo/',
      'https://www.limeswerelderfgoed.nl/locaties/2016475046/archeologisch-park-matilo',
      'https://www.romeinen.nl/locatie-overzicht/2016475046/archeologisch-park-matilo'
    ]
  },
  'Corbulo': {
    naam: 'Forum Hadriani',
    latinNaam: 'Forum Hadriani (Municipium Aelium Cananefatium)',
    type: 'versterking',
    periode: 'ca. 70 - 270 n.Chr.',
    beschrijving: 'Forum Hadriani bij Voorburg was de noordelijkste Romeinse stad van het Europese continent en de enige stad met stadsrechten in Nederland. Gesticht rond 70 n.Chr. aan het Kanaal van Corbulo (34 km, verbinding Rijn-Maas). Keizer Hadrianus verleende in 121 n.Chr. marktrechten en gaf de stad zijn naam. Rond 150 n.Chr. kreeg het stadsrechten (Municipium). De stad had ca. 1000 inwoners, een stadsmuur met dubbele gracht, stenen gebouwen en tempels. Park Arentsburgh markeert de locatie. UNESCO Werelderfgoed sinds 2021. De eerste wetenschappelijke opgravingen (1827-1833) waren door Caspar Reuvens, de eerste hoogleraar archeologie ter wereld.',
    watWasHier: 'Enige Romeinse stad met stadsrechten in Nederland. Ca. 1000 inwoners.',
    watTeZien: 'Park Arentsburgh in Voorburg. Kanaal traceerbaar als de Vliet.',
    verwachteVondsten: 'Stedelijke vondsten: bouwmateriaal, aardewerk, munten, inscripties, religieuze voorwerpen.',
    betekenis: 'UNESCO Werelderfgoed. Noordelijkste Romeinse stad van Europa.',
    bronnen: [
      'https://www.awlv.nl/forum-hadriani/de-stad-forum-hadriani/',
      'https://www.romeinen.nl/weten/nederland-in-de-romeinse-tijd/zuid-holland/regio-voorburg',
      'https://kennis.cultureelerfgoed.nl/index.php/Monumenten/508083'
    ]
  },
  'Berg - Tomveld': {
    naam: 'Berg-Tomveld',
    type: 'villa',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Romeinse villa bij Berg in Zuid-Limburg, mogelijk tijdelijk militair gebruikt. Dit type gebouwen diende als landbouwbedrijf met luxe woondeel voor de eigenaar. De regio Zuid-Limburg was dicht bebouwd met villa\'s die graan en vee leverden aan het Romeinse leger. Vondsten wijzen op welvaart: mozaïekvloeren, beschilderd pleisterwerk, hypocaustum (vloerverwarming). De locatie Tomveld verwijst mogelijk naar Romeinse grafheuvels (tumuli) in de buurt. Thermenmuseum Heerlen toont de villa-cultuur.',
    watWasHier: 'Villa rustica met mogelijk militair gebruik. Landbouw voor legervoorraden.',
    watTeZien: 'Locatie in agrarisch gebied. Thermenmuseum Heerlen.',
    verwachteVondsten: 'Bouwmateriaal, dakpannen, aardewerk, munten, sieraden.',
    betekenis: 'Toont Romeinse landbouweconomie in Zuid-Limburg.',
    bronnen: []
  },
  'Berg - Trappenberg': {
    naam: 'Berg-Trappenberg',
    type: 'legerkamp',
    periode: '1e eeuw v.Chr. - 1e eeuw n.Chr.',
    beschrijving: 'Vroeg-Romeins legerkamp bij Berg in Zuid-Limburg dat later werd omgebouwd tot villa of boerderij. Toont de transitie van militaire bezetting naar civiele bewoning. Het kamp dateert uit de veroveringsperiode toen Rome dit gebied inlijfde. Na pacificatie was een fort niet meer nodig en werd het terrein civiel benut. Vondsten: vroege Romeinse militaria naast later agrarisch materiaal. Zuid-Limburg was een grenszone voordat de Limes naar de Rijn verplaatste.',
    watWasHier: 'Eerst legerkamp, later villa/boerderij. Overgang militair naar civiel.',
    watTeZien: 'Locatie in landbouwgebied.',
    verwachteVondsten: 'Vroege militaria, later agrarisch aardewerk, bouwmateriaal.',
    betekenis: 'Toont Romeinse verovering en pacificatie van Zuid-Limburg.',
    bronnen: []
  },
  'Castellum Blariacum': {
    naam: 'Blariacum',
    latinNaam: 'Blariacum',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Mogelijke locatie van het Romeinse castellum Blariacum bij Blerick (nu deel van Venlo). De naam leeft voort in de plaatsnaam. Het fort zou de Maasovergang hebben bewaakt op de route tussen Xanten en Maastricht. De exacte locatie is nooit definitief vastgesteld ondanks vele opgravingspogingen. Vondsten in de omgeving wijzen wel op Romeinse militaire aanwezigheid: militaria, munten, aardewerk. Het Limburgs Museum in Venlo toont de Romeinse geschiedenis van de regio.',
    watWasHier: 'Vermoedelijk castellum bij Maasovergang. Exacte locatie onzeker.',
    watTeZien: 'Locatie niet vastgesteld. Limburgs Museum Venlo.',
    verwachteVondsten: 'Militaria, munten, aardewerk als aanwijzingen voor fortlocatie.',
    betekenis: 'Plaatsnaam Blerick afgeleid van Blariacum. Schakel in Maasroute.',
    bronnen: []
  },
  'Fortificatie Bodegraven': {
    naam: 'Wachtpost Bodegraven',
    type: 'wachttoren',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Waarschijnlijke Romeinse wachtpost bij Bodegraven aan de Oude Rijn. Onderdeel van het signaleringssysteem tussen de grotere forten zoals Nigrum Pullum en Laurum. De wachttorens stonden om de paar kilometer en konden met vuur- of rooksignalen waarschuwingen doorgeven. Kleine bezetting van 4-8 soldaten. De exacte locatie is niet precies bekend. Bij graafwerkzaamheden in Bodegraven zijn wel Romeinse scherven gevonden die op aanwezigheid wijzen.',
    watWasHier: 'Kleine wachtpost voor signalering. 4-8 soldaten.',
    watTeZien: 'Exacte locatie onbekend.',
    verwachteVondsten: 'Aardewerk, kleine hoeveelheden militaria.',
    betekenis: 'Onderdeel communicatiesysteem langs de Limes.',
    bronnen: []
  },
  'Caestert': {
    naam: 'Caestert',
    type: 'versterking',
    periode: '1e eeuw v.Chr.',
    beschrijving: 'Mogelijk de locatie waar de Eburonen onder leiding van Ambiorix in 54 v.Chr. een Romeins legioen vernietigden - de zwaarste Romeinse nederlaag in de Lage Landen. Het plateau van Caestert bij Kanne (Belgisch Limburg) had een oppidum (versterkte nederzetting). Julius Caesar beschrijft de slag in zijn Gallische Oorlogen. De locatie is omstreden, maar Caestert is een sterke kandidaat. Symbolisch belangrijke plek voor de Belgische geschiedenis. De site is nu natuurgebied met grotten.',
    watWasHier: 'Mogelijk slagveld Ambiorix-opstand 54 v.Chr. Oppidum (versterking).',
    watTeZien: 'Plateau Caestert, natuurgebied met grotten.',
    verwachteVondsten: 'Keltische en vroeg-Romeinse voorwerpen, mogelijk slagveldvondsten.',
    betekenis: 'Mogelijke locatie grootste Romeinse nederlaag in de regio.',
    bronnen: []
  },
  'Castellum Driel?': {
    naam: 'Castellum Driel',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Mogelijke locatie van een Romeins castellum bij Driel in de Betuwe. Het bestaan en de exacte locatie zijn onzeker, vandaar het vraagteken. De Betuwe (Insula Batavorum - "Eiland der Bataven") was kerngebied van de Bataven, bondgenoten van Rome. Zij leverden beroemde hulptroepen aan het Romeinse leger. Een fort hier zou logisch zijn om het gebied te controleren. Vondsten in de omgeving wijzen op Romeinse aanwezigheid. Museum Het Valkhof Nijmegen toont de Bataafse cultuur.',
    watWasHier: 'Mogelijk castellum in Bataafs kerngebied. Bestaan onzeker.',
    watTeZien: 'Geen zichtbare resten. Museum Het Valkhof.',
    verwachteVondsten: 'Romeinse en Bataafse voorwerpen indien locatie juist.',
    betekenis: 'Zou Romeinse controle over Bataafs gebied tonen.',
    bronnen: []
  },
  'Castellum Duiven - Loowaard': {
    naam: 'Duiven-Loowaard',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Romeins castellum bij Duiven/Loowaard aan de Rijn, in de uiterwaarden tussen Arnhem en Zevenaar. Het fort bewaakte de rivierroute en de overgang naar het Bataafse gebied. De dynamische rivier heeft veel resten weggespoeld of diep begraven. Bij lage waterstanden en na erosie komen soms vondsten aan oppervlakte: munten, militaria, aardewerk. Het gebied is nu natuurgebied met grazende grote grazers. Museum Arnhem en Het Valkhof Nijmegen tonen vondsten uit de regio.',
    watWasHier: 'Castellum aan de Rijn in uiterwaarden. Bewaakte rivierovergang.',
    watTeZien: 'Natuurgebied. Na erosie mogelijk vondsten aan oppervlakte.',
    verwachteVondsten: 'Militaria, munten, aardewerk na erosie of bij laag water.',
    betekenis: 'Onderdeel fortenketen langs de Rijn.',
    bronnen: []
  },
  'Castellum Grinnes': {
    naam: 'Grinnes',
    latinNaam: 'Grinnes',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Romeins castellum bij Rossum in de gemeente Maasdriel - waarschijnlijk het antieke Grinnes vermeld op de Peutingerkaart. Het fort lag aan de Waal en controleerde de rivierroute. Bij opgravingen zijn resten van het fort gevonden. De omgeving is rijk aan Romeinse vondsten: militaria, munten, aardewerk, bouwmateriaal. Het Museum voor de Bommelerwaard in Ammerzoden toont lokale vondsten. De naam Grinnes leeft niet voort in moderne plaatsnamen.',
    watWasHier: 'Castellum aan de Waal. Vermeld op Peutingerkaart.',
    watTeZien: 'Locatie opgegraven. Museum Bommelerwaard.',
    verwachteVondsten: 'Militaria, munten, aardewerk, bouwmateriaal.',
    betekenis: 'Verbinding antieke bronnen met archeologische locatie.',
    bronnen: []
  },
  'Wachttoren Heumen': {
    naam: 'Wachttoren Heumen',
    type: 'wachttoren',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Romeinse wachttoren bij Heumen ten zuiden van Nijmegen. Onderdeel van het signaleringssysteem langs de Maas en verbindingswegen. De torens stonden op strategische punten met goed uitzicht. Bij nadering van vijanden werden signalen gegeven naar de grotere forten. Kleine bezetting van 4-8 soldaten die in de toren woonden. De exacte locatie is archeologisch vastgesteld. Vondsten: militaria, aardewerk, persoonlijke bezittingen.',
    watWasHier: 'Signaleertoren met klein garnizoen. Uitzichtpunt.',
    watTeZien: 'Locatie bekend maar geen zichtbare resten.',
    verwachteVondsten: 'Militaria, aardewerk, kleine persoonlijke voorwerpen.',
    betekenis: 'Onderdeel communicatienetwerk Romeins leger.',
    bronnen: []
  },
  'Castellum Huissen?': {
    naam: 'Castellum Huissen',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Mogelijke locatie van een Romeins castellum bij Huissen aan de Rijn. Het bestaan is niet zeker vastgesteld, vandaar het vraagteken. Huissen ligt op een logische plek tussen de bekende forten bij Arnhem en Zevenaar. Vondsten in de omgeving wijzen op Romeinse activiteit. De moderne bebouwing maakt onderzoek lastig. Als er een fort was, bewaakte het de rivierroute en mogelijk een oversteekplaats.',
    watWasHier: 'Mogelijk castellum aan de Rijn. Bestaan onzeker.',
    watTeZien: 'Geen resten zichtbaar. Gebied bebouwd.',
    verwachteVondsten: 'Romeinse vondsten die fortaanwezigheid zouden bevestigen.',
    betekenis: 'Zou gat in fortenketen opvullen indien bevestigd.',
    bronnen: []
  },
  'Castellum Kessel-Lith': {
    naam: 'Kessel-Lith',
    type: 'castellum',
    periode: '3e - 4e eeuw n.Chr.',
    beschrijving: 'Laat-Romeins castellum uit de 3e-4e eeuw bij Kessel-Lith aan de Maas. Gebouwd in een periode van Germaanse invallen toen de oude Limes niet meer te handhaven was. Dit type forten was compacter en zwaarder versterkt dan de vroege castella. De locatie bij een rivierovergang bleef strategisch. Typische laat-Romeinse vondsten: gordels met riemtongen, militaire gespen, munten van 3e-4e eeuwse keizers. Het fort toont de veranderde militaire strategie van het late Romeinse Rijk.',
    watWasHier: 'Laat-Romeins fort, compacter en zwaarder versterkt.',
    watTeZien: 'Locatie bekend, weinig zichtbaar.',
    verwachteVondsten: 'Laat-Romeinse munten, gordelbeslag, riemtongen, 3e-4e eeuws aardewerk.',
    betekenis: 'Toont Romeinse aanpassing aan nieuwe dreigingen.',
    bronnen: []
  },
  'Carvo': {
    naam: 'Carvo',
    latinNaam: 'Carvo',
    type: 'versterking',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Mogelijke Romeinse versterking nabij Kesteren in de Betuwe. De naam komt voor op de Peutingerkaart. Kesteren lag in het hart van het Bataafse stamgebied. De Bataven waren belangrijke bondgenoten van Rome en leverden beroemde cavalerie-eenheden. Een versterking hier zou zowel bescherming als controle bieden. De exacte locatie is niet vastgesteld. Vondsten in de regio tonen intensief Romeins-Bataafs contact: import-aardewerk, wapens, paardentuig.',
    watWasHier: 'Vermoedelijke versterking in Bataafs kerngebied.',
    watTeZien: 'Locatie onbekend.',
    verwachteVondsten: 'Gemengd Romeins-Bataafse voorwerpen, paardentuig.',
    betekenis: 'Zou Romeinse aanwezigheid in Bataafs gebied tonen.',
    bronnen: []
  },
  'Mannaricium': {
    naam: 'Mannaricium',
    latinNaam: 'Mannaricium',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Vermoedelijke locatie van het Romeinse castellum Mannaricium bij Maurik aan de Rijn. De naam komt voor op de Peutingerkaart. Het fort zou de rivierroute hebben bewaakt tussen Levefanum (Wijk bij Duurstede) en forten stroomopwaarts. De moderne plaats Maurik zou afgeleid kunnen zijn van Mannaricium. Bij bouwwerkzaamheden zijn Romeinse vondsten gedaan die op een fort wijzen. De exacte contouren zijn niet bekend.',
    watWasHier: 'Vermoedelijk castellum aan de Rijn. Vermeld op Peutingerkaart.',
    watTeZien: 'Geen zichtbare resten. Gebied bebouwd.',
    verwachteVondsten: 'Militaria, aardewerk, munten bij bouwwerkzaamheden.',
    betekenis: 'Mogelijke herkomst plaatsnaam Maurik.',
    bronnen: []
  },
  'Oostvoorne': {
    naam: 'Castellum Oostvoorne',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Romeins kustfort bij de monding van de Waal en Maas, nu verdwenen in zee door kustafslag. Het fort bewaakte de zeeroute en beschermde tegen piraterij. De kust lag in de Romeinse tijd kilometers verder westwaarts. Door zeespiegelstijging en erosie is het fort in de golven verdwenen. Na stormen spoelen soms vondsten aan op de stranden van Voorne-Putten: munten, aardewerk, metalen voorwerpen. De Brittenburg bij Katwijk was een soortgelijk lot beschoren.',
    watWasHier: 'Kustfort bij riviermonding. Bewaking zeeroute.',
    watTeZien: 'Fort verdwenen in zee. Soms strandvondsten na stormen.',
    verwachteVondsten: 'Na stormen: munten, aardewerk, metalen op strand.',
    betekenis: 'Toont voormalige kustlijn en Romeinse kustverdediging.',
    bronnen: []
  },
  'Castellum Randwijk': {
    naam: 'Castellum Randwijk',
    type: 'castellum',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Mogelijke locatie van een Romeins castellum bij Randwijk aan de Rijn in de Betuwe. Het bestaan en de exacte locatie zijn onzeker. De rivier heeft veel oude resten weggespoeld. Randwijk ligt tussen bekende fortlocaties wat een fort hier logisch zou maken. In de uiterwaarden zijn bij erosie Romeinse vondsten gedaan. Het dynamische rivierlandschap maakt onderzoek lastig maar kan ook vondsten blootleggen na hoog water.',
    watWasHier: 'Mogelijk castellum. Bestaan en locatie onzeker.',
    watTeZien: 'Geen zichtbare resten. Uiterwaarden.',
    verwachteVondsten: 'Mogelijk vondsten na erosie of hoog water.',
    betekenis: 'Zou gat in fortenketen opvullen indien bevestigd.',
    bronnen: []
  },
  'Versterking Scheveningseweg': {
    naam: 'Minifort Scheveningseweg',
    type: 'minifort',
    periode: '2e eeuw n.Chr.',
    beschrijving: 'Vermoede locatie van een klein Romeins kustfort bij de Scheveningseweg in Den Haag, vergelijkbaar met het nabije Minifort Ockenburg. Dit type miniforten bewaakte de kust tegen piraten en Germaanse raids over zee. Ruimte voor 20-30 soldaten. De exacte locatie is niet vastgesteld maar vondsten in de omgeving suggereren Romeinse militaire aanwezigheid. Het zou aantonen dat de gehele Noordzeekust werd bewaakt, niet alleen de riviermonding.',
    watWasHier: 'Vermoedelijk klein kustfort zoals Ockenburg. 20-30 soldaten.',
    watTeZien: 'Locatie niet vastgesteld.',
    verwachteVondsten: 'Militaria, aardewerk 2e eeuw indien locatie gevonden.',
    betekenis: 'Zou Romeinse kustverdediging Den Haag bevestigen.',
    bronnen: []
  },
  'Tongeren - Sacramentstraat': {
    naam: 'Atuatuca Tungrorum',
    latinNaam: 'Atuatuca Tungrorum / Municipium Tungrorum',
    type: 'legerkamp',
    periode: 'ca. 10 v.Chr. - 400 n.Chr.',
    beschrijving: 'Oudste stad van België, gesticht ca. 10 v.Chr. Hoofdstad van de Civitas Tungrorum - met 150 hectare de grootste civitas van Noordwest-Europa! Strategisch gelegen op de weg Boulogne-Bavay-Keulen. Onder keizer Trajanus (2e eeuw) ommuurd met meer dan 4,5 km muren en tot 3 grachten - waarvan nog 1,5 km staat! Een 1e-eeuwse buste van Julius Caesar is een topstuk. Het Gallo-Romeins Museum (Europees Museum van het Jaar 2011) toont een schat aan vondsten: beelden, steles, sieraden, architectuurelementen. Ook de Romeinse muren, het tempelcomplex, het aquaduct van Beukenberg en tumuli zijn te bezoeken.',
    watWasHier: 'Civitas-hoofdstad Tungri (150 ha). 4,5 km stadsmuur. Politiek en religieus centrum.',
    watTeZien: 'Gallo-Romeins Museum. Romeinse muren (1,5 km). Tempelcomplex. Aquaduct Beukenberg. Tumuli.',
    verwachteVondsten: 'Stadsaardewerk, bouwmateriaal, munten, inscripties, religieuze objecten.',
    betekenis: 'Oudste stad van België. Grootste civitas van Noordwest-Europa.',
    bronnen: [
      'https://www.galloromeinsmuseum.be',
      'https://www.canonvanvlaanderen.be/en/events/tongeren-a-roman-town/'
    ]
  },
  'Valkenburg-Marktveld, mini-castellum': {
    naam: 'Marktveld Valkenburg',
    type: 'minifort',
    periode: '1e - 2e eeuw n.Chr.',
    beschrijving: 'Klein Romeins castellum met wachttoren bij het Marktveld in Valkenburg (Zuid-Holland), nabij het grotere Praetorium Agrippinae. Dit type miniforten vulde de ruimtes tussen de grote castella op. Wachttoren voor signalering en kleine bezetting voor patrouilles. De combinatie van toren en klein fort was effectief voor grensbewaking. Bij opgravingen zijn de contouren vastgesteld. Vondsten in Archeologisch Steunpunt Valkenburg.',
    watWasHier: 'Klein fort met wachttoren. Aanvulling op Praetorium Agrippinae.',
    watTeZien: 'Archeologisch Steunpunt Valkenburg.',
    verwachteVondsten: 'Militaria, aardewerk, kleine persoonlijke voorwerpen.',
    betekenis: 'Toont gelaagdheid Romeinse grensverdediging.',
    bronnen: []
  },
  'Wachttoren a': {
    naam: 'Wachttoren Utrecht-West',
    type: 'wachttoren',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Een van meerdere Romeinse wachttorens in de omgeving van Utrecht, onderdeel van het signaleringssysteem langs de Limes. De torens stonden om de 1-2 kilometer met zicht op elkaar. Bij nadering van vijanden werden vuur- of rooksignalen gegeven. Binnen minuten kon de hele grens gewaarschuwd zijn. Kleine houten constructie op aarden verhoging met bezetting van 4-8 soldaten. Vondsten zijn schaars door de kleine schaal.',
    watWasHier: 'Houten signaleertoren. 4-8 soldaten.',
    watTeZien: 'Geen zichtbare resten.',
    verwachteVondsten: 'Kleine hoeveelheden aardewerk en militaria.',
    betekenis: 'Onderdeel vroegwaarschuwingssysteem.',
    bronnen: []
  },
  'Wachttoren b': {
    naam: 'Wachttoren Utrecht-Oost',
    type: 'wachttoren',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Romeinse wachttoren ten oosten van Utrecht, onderdeel van de keten signaleertorens langs de Rijn. Elke toren had zichtlijn naar de volgende. Dit systeem maakte snelle communicatie mogelijk in een tijd zonder telegraaf of telefoon. De soldaten woonden in of bij de toren en hielden permanent wacht. Bij gevaar werden brandende fakkels of rookpotten gebruikt. De locatie is archeologisch vastgesteld maar niet zichtbaar.',
    watWasHier: 'Signaleertoren in torenketen. Permanente wacht.',
    watTeZien: 'Geen zichtbare resten.',
    verwachteVondsten: 'Aardewerk, militaria, persoonlijke bezittingen.',
    betekenis: 'Onderdeel communicatienetwerk Limes.',
    bronnen: []
  },
  'Wachttoren c': {
    naam: 'Wachttoren Hoge Woerd',
    type: 'wachttoren',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Romeinse wachttoren nabij Castellum Op de Hoge Woerd, onderdeel van het signaleringssysteem. Torens bij forten dienden als vooruitgeschoven posten en waarschuwingsplaatsen. De combinatie van fort met omringende torens was de standaard Romeinse grensverdediging. Het Archeologisch Park Hoge Woerd geeft een goed beeld van hoe dit systeem functioneerde. De toren zelf is niet gereconstrueerd maar de context is te begrijpen.',
    watWasHier: 'Signaleertoren bij castellum. Vooruitgeschoven post.',
    watTeZien: 'Archeologisch Park Hoge Woerd toont context.',
    verwachteVondsten: 'Aardewerk, militaria.',
    betekenis: 'Toont samenhang fort en torens.',
    bronnen: []
  },
  'Zwammerdam-Rijksstraatweg': {
    naam: 'Zwammerdam-Rijksstraatweg',
    type: 'versterking',
    periode: '1e - 3e eeuw n.Chr.',
    beschrijving: 'Mogelijke militaire nederzetting aan de Rijksstraatweg in Zwammerdam, naast het bekende Nigrum Pullum fort. Mogelijk een vicus (burgerdorp) of aparte militaire faciliteit. Bij Zwammerdam werden de beroemde Romeinse schepen gevonden. De hele zone langs de Oude Rijn was dicht bezet met militaire en civiele structuren. Vondsten wijzen op intensieve Romeinse activiteit: aardewerk, munten, militaria en door de natte veenbodem ook organisch materiaal.',
    watWasHier: 'Mogelijk vicus of militaire faciliteit nabij Nigrum Pullum.',
    watTeZien: 'Geen zichtbare resten.',
    verwachteVondsten: 'Aardewerk, munten, militaria, organisch materiaal.',
    betekenis: 'Toont dichtheid Romeinse bewoning langs Oude Rijn.',
    bronnen: []
  },
  'Kastell Aachen': {
    naam: 'Aquae Granni',
    latinNaam: 'Aquae Granni',
    type: 'versterking',
    periode: '1e - 4e eeuw n.Chr.',
    beschrijving: 'Romeinse kuuroord bij de hete bronnen (tot 75°C!) gewijd aan Apollo en de Keltische geneesheer Grannos - "aan de wateren van Grannos". In de 1e eeuw uitgebouwd tot kurort voor de legioenen van Neder-Germanië. Onder keizer Trajanus bouwden legioenen uit Xanten een aquaduct en thermen onder de huidige Dom. De Münsterthermen hadden de indeling van een valetudinarium (Romeins hospitaal). Karel de Grote bouwde hier zijn Pfalz (793-813) en maakte Aken tot keizerlijke residentie - bewust als "vernieuwer van het Romeinse Rijk". De Dom (UNESCO 1978, eerste in Duitsland!) staat op Romeinse fundamenten. Karel stierf hier in 814.',
    watWasHier: 'Kurort voor legioenen. Thermen. Later keizerlijke Pfalz van Karel de Grote.',
    watTeZien: 'Dom (UNESCO). Centre Charlemagne. Thermen onder de stad.',
    verwachteVondsten: 'Badhuisresten, inscripties, munten, Romeins en Karolingisch bouwmateriaal.',
    betekenis: 'Ononderbroken bewoning van Romeinse tijd tot Karel de Grote. Eerste UNESCO-site Duitsland.',
    bronnen: [
      'https://centre-charlemagne.eu/zeitreise/?lang=en',
      'http://www.aquaegranni.de/',
      'https://de.wikipedia.org/wiki/Aquae_Granni'
    ]
  },
  'Hazerswoude': {
    naam: 'Hazerswoude-Rijndijk',
    type: 'wachttoren',
    periode: '2e - 3e eeuw n.Chr.',
    beschrijving: 'Bevestigde Romeinse wachtpost langs de Limesweg bij Hazerswoude-Rijndijk. Bij opgravingen in 2021-2023 door Vestigia BV en het Rijksmuseum van Oudheden zijn spectaculaire vondsten gedaan: resten van de houten Limesweg (eiken palen uit 124-125 n.Chr.), een Romeinse dam, en aanwijzingen voor een kleine wachtpost. Bijzondere vondsten: de eerste Romeinse mijlpaal in Nederland (2023), een muntschat met 22 zilveren munten (na 166 n.Chr.), aardewerk, mantelspelden, leren schoenzolen en ca. 40.000-50.000 objecten. De locatie ligt precies tussen Albaniana (Alphen) en Matilo (Leiden).',
    watWasHier: 'Wachtpost langs de Limesweg. Houten wegdek uit 124-125 n.Chr.',
    watTeZien: 'Opgravingen afgerond. Vondsten naar Rijksmuseum van Oudheden.',
    verwachteVondsten: 'Militaria, munten, aardewerk. Gebied grotendeels onderzocht.',
    betekenis: 'Eerste Romeinse mijlpaal in Nederland. Bevestigt tracé Limesweg.',
    bronnen: [
      'https://www.rmo.nl/onderzoek/opgravingsprojecten/hazerswoude/',
      'https://www.vestigia.nl/opgraving-hazerswoude-in-samenwerking-met-het-rijksmuseum-van-oudheden-en-de-gemeente-alphen-aan-den-rijn/',
      'https://romeinsalphen.nl/themas/romeinse-weg-hazerswoude-rijndijk'
    ]
  },
  'Albaniana': {
    naam: 'Albaniana',
    latinNaam: 'Albaniana',
    type: 'castellum',
    periode: '41 - 275 n.Chr.',
    beschrijving: 'Groot Romeins castellum bij Alphen aan den Rijn, een van de belangrijkste forten aan de Nederlandse Limes. Het fort werd gesticht in 41-42 n.Chr., kort na de dood van keizer Caligula. De locatie is nauwkeurig bekend: bij het Rijnplein en Theater Castellum aan de Castellumstraat. Het fort (80x120m) was beschermd door een omgrachte aarden wal. Bij opgravingen tussen 1950 en 2002 zijn uitgebreide resten gevonden. Door de natte bodem zijn veel houten structuren bewaard gebleven. Een bronzen maquette van het castellum staat op het Rijnplein.',
    watWasHier: 'Castellum met vicus. Locatie bekend: Rijnplein/Castellumstraat.',
    watTeZien: 'Bronzen maquette Rijnplein. Theater Castellum op fortlocatie. Archeon.',
    verwachteVondsten: 'Munten, militaria, aardewerk, dakpannen, fibulae. Veel bij bouwwerkzaamheden.',
    betekenis: 'Een van de hoofdforten aan de Limes. UNESCO Werelderfgoed.',
    bronnen: [
      'https://www.hierisalphen.nl/home/ontdekken/romeinse-limes',
      'https://www.romeinen.nl/weten/nederland-in-de-romeinse-tijd/zuid-holland/alphen-aan-den-rijn',
      'https://archeologiehuiszuidholland.nl/zien-en-doen/het-archeologiehuis/fort-aan-de-rijn'
    ]
  },
}

// Generieke informatie voor forten zonder specifieke data
export const GENERIEK_FORT_INFO: RomeinsFortInfo = {
  naam: 'Romeins fort',
  type: 'versterking',
  periode: '1e - 3e eeuw n.Chr.',
  beschrijving: 'Romeinse militaire versterking langs de Limes, de noordgrens van het Romeinse Rijk. Forten lagen om de 10-15 km langs de Rijn. Garnizoen van hulptroepen (auxilia) die de grens bewaakten tegen Germaanse invallen. Standaard rechthoekige plattegrond met houten of stenen muur, gracht, poorten en binnengebouwen (barakken, commandopost, graanopslagplaats, werkplaatsen). Buiten de muren vaak een vicus (burgerdorp) met handelaren en soldatenfamilies. Vondsten: munten, fibulae (mantelspelden), aardewerk, wapens, gereedschap. Onderdeel van UNESCO Werelderfgoed sinds 2021.',
  watWasHier: 'Militaire post met soldaten die de grens bewaakten. Vaak een burgerdorp (vicus) buiten de muren.',
  watTeZien: 'De meeste forten zijn verdwenen of overbouwd. Lokale musea tonen vaak vondsten.',
  verwachteVondsten: 'Munten, fibulae (mantelspelden), aardewerk, wapens en gereedschap.',
  betekenis: 'Onderdeel van de Limes, de noordelijke grens van het Romeinse Rijk. UNESCO Werelderfgoed.',
  bronnen: []
}

// Type vertalingen
export const FORT_TYPE_LABELS: Record<string, string> = {
  'castellum': 'Castellum (legerplaats)',
  'wachttoren': 'Wachttoren (signaalpost)',
  'vlootbasis': 'Vlootbasis (haven)',
  'legerkamp': 'Legerkamp (castra)',
  'minifort': 'Minifort (wachtpost)',
  'versterking': 'Versterking',
  'villa': 'Villa (militair gebruikt)'
}
