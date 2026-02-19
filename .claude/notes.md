# Detect - Sessienotities

## Huidige versie: 2.32.46

---

## PROJECT STATUS

**Detect** is de persoonlijke versie van de DetectorApp, gecloned van `detectorapp-nl`.

### Migratie voltooid (feb 2026):
- [x] Base path gewijzigd: `/detectorapp-nl/` -> `/detect/`
- [x] Alle 24 layer files geüpdatet
- [x] Config files geüpdatet (vite.config.ts, package.json, index.html)
- [x] Firebase deprecated API gefixed
- [x] Documentatie herschreven

### Nog te doen:
- [x] Firebase project aanmaken (detect-personal)
- [x] `.env` file aangemaakt met Firebase credentials
- [x] Authentication (Google Sign-In) enabled
- [x] Firestore Database aangemaakt (eur3, test mode tot 21 maart 2026)
- [ ] **Storage enablen** - Vereist Blaze plan upgrade (voor foto uploads)
- [ ] Functies uit webapp importeren (te bepalen)

### Firebase Storage Setup (LATER)
1. Ga naar Firebase Console → Project Settings → Usage and billing
2. Upgrade naar **Blaze plan** (pay-as-you-go, vrijwel gratis voor persoonlijk gebruik)
3. Koppel betaalmethode (creditcard/Google Pay)
4. Stel budget alert in (bijv. €1)
5. Ga naar Storage → Get started
6. Accepteer default rules
7. Kies locatie: **eur3 (europe-west)**

---

## FIREBASE SETUP

### Stappen:
1. Ga naar [Firebase Console](https://console.firebase.google.com/)
2. Maak nieuw project: `detect-personal`
3. Enable Authentication -> Google Sign-In
4. Enable Firestore Database
5. Enable Storage (voor foto's)
6. Kopieer credentials naar `.env`:

```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=detect-personal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=detect-personal
VITE_FIREBASE_STORAGE_BUCKET=detect-personal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

---

## WEBAPP FUNCTIES (te importeren)

Locatie: `C:\VSCode\webapp`

Mogelijke functies om te importeren:
- Internationale lagen (BE/DE/FR)
- Andere features uit webapp

*Te bepalen in volgende sessie*

---

## VERSIE REGELS

**ELKE code wijziging = versie ophogen**

```bash
npm version patch   # of: minor / major
npm run build && git add -A && git commit -m "vX.X.X: beschrijving" && git push
```

---

## BELANGRIJKE BESTANDEN

| Bestand | Doel |
|---------|------|
| `vite.config.ts` | Base path `/detect/`, PWA config |
| `package.json` | Naam "detect", scripts |
| `src/lib/firebase.ts` | Firebase initialisatie |
| `CLAUDE.md` | Project instructies |
| `.env` | Firebase credentials (NIET in git!) |
| `.env.example` | Template voor Firebase credentials |

---

## DATA LICENTIES

| Bron | Licentie |
|------|----------|
| RCE/Cultureelerfgoed | CC0/CC-BY |
| PDOK/Kadaster | CC0/CC-BY |
| OpenStreetMap | ODbL |
| Itiner-E | CC BY 4.0 |
| CARTO | CC BY 3.0 |

---

## GIT INFO

- Repo: `mailbvandongen-eng/detect`
- Branch: `main`
- GitHub Pages: `https://mailbvandongen-eng.github.io/detect/`
