# Firebase eenmalig goedzetten voor Detect

Detect publiceert de website via GitHub Pages. Firestore Security Rules moeten apart naar Firebase worden gepubliceerd. GitHub doet dat voortaan automatisch via `.github/workflows/firebase-rules.yml`.

## Eenmalige setup

1. Open Firebase Console en kies het project dat door Detect wordt gebruikt.
2. Ga naar **Projectinstellingen → Serviceaccounts → Firebase Admin SDK**.
3. Kies **Nieuwe privésleutel genereren** en download het JSON-bestand.
4. Open GitHub → repository **mailbvandongen-eng/detect** → **Settings → Secrets and variables → Actions**.
5. Kies **New repository secret**.
6. Naam: `FIREBASE_SERVICE_ACCOUNT_DETECT`.
7. Waarde: plak de **volledige inhoud** van het gedownloade JSON-bestand.
8. Bewaar het secret.
9. Ga in GitHub naar **Actions → Publiceer Firestore-regels → Run workflow** en voer hem één keer handmatig uit.

Daarna hoeft Firebase niet meer handmatig te worden bijgewerkt. Iedere wijziging aan `firestore.rules`, `firebase.json` of de rules-workflow wordt automatisch naar hetzelfde Firebase-project gepubliceerd.

## Huidige buddy-laagregels

De repository bevat regels voor:
- persoonlijke gebruikersdata onder `users/{uid}`;
- gedeelde importlagen;
- `buddyLayers/{layerId}`;
- `buddyLayers/{layerId}/points/{pointId}`.

Buddy-lagen kunnen alleen door ingelogde gebruikers worden aangemaakt. Alleen de eigenaar beheert leden en laagmetadata. Leden met **bewerken** mogen gedeelde punten toevoegen, wijzigen en verwijderen.

## Als de workflow op rechten faalt

De gebruikte serviceaccount moet Firestore Security Rules mogen publiceren. De benodigde Firebase Rules-permissies zijn onder andere `firebaserules.rulesets.create` en `firebaserules.releases.create/update`. Geef de serviceaccount zo nodig in Google Cloud IAM de rol **Firebase Rules Admin** (`roles/firebaserules.admin`).
