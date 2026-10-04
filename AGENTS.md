# Detect regressieafspraken

Bij een reparatie moeten aangrenzende functies blijven werken. Benoem de geraakte
functies en test hun gedrag, niet alleen de aangepaste code.

Voor wijzigingen aan opstarten, accounts, cache of updates:
- Test herhaald verversen, gelezen/ongelezen wijzigingen, welkomstscherm,
  accountwisseling en falende opslag.
- Test mobiel invoeren/delen en behoud van eigen lagen, imports en kleuren.
- Herladen mag actieve routeopname en invoer niet onderbreken.
- Herstel mag alleen appbestanden en de bijbehorende serviceworker vervangen.
  Nooit localStorage, IndexedDB, foto's, login of offlinekaartcache wissen.
- Geen automatische herlaadactie bij beschikbaar komen van een update.
- Publiceer pas nadat types, relevante regressies en mobiele tests slagen.
