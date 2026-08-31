# Detect

Detect is Bobs persoonlijke mobiele onderzoekskaart voor veldwerk en voorbereiding. De app draait op GitHub Pages en combineert kaartlagen voor:

- metaaldetectie en toestemmingsterreinen;
- steentijd, archeologie en historische percelen;
- geomorfologie, bodem en bodemgebruik;
- hoogtekaarten, hillshade en LiDAR;
- eigen vondsten, notities, locaties en onderzoekspresets.

## Vaste koers

Detect is geen commercieel product. Er zijn geen abonnementen, premiumlagen, betaalmuren of verkoopplannen. Alle aanwezige functies en lagen zijn rechtstreeks beschikbaar. Nieuwe ontwikkeling ondersteunt Bobs eigen onderzoek; goed werkende bestaande functies blijven intact.

De actuele ontwikkelvolgorde staat in [ROADMAP.md](ROADMAP.md). Elke versie krijgt een wijzigingsoverzicht in gewone taal, dat bij de eerste start verschijnt en later via **Menu > Wijzigingen** terug te lezen is.

## Techniek

- React 18, TypeScript en Vite
- OpenLayers als kaartmotor
- Zustand voor lokale status
- Firebase Authentication en Firestore voor cloudinstellingen en presets
- GitHub Pages voor publicatie

## Ontwikkelen

```bash
npm ci
npm run dev
npm run build
```

Een broncode-update op `main` wordt door GitHub Actions gebouwd en naar `docs/` gepubliceerd. Daardoor is voor livegang geen werkende lokale pc nodig.

## Online

[Detect openen](https://mailbvandongen-eng.github.io/detect/)
