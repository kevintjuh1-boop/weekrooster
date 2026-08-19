# Weekrooster

Heel simpele weekrooster-app, nu ook installeerbaar als app op je telefoon (PWA).

**Live app:** https://kevintjuh1-boop.github.io/weekrooster/

## Op je telefoon installeren
1. Open bovenstaande link in Chrome (Android) of Safari (iPhone).
2. **Android/Chrome:** tik op het menu (⋮) → "App installeren" (of "Toevoegen aan startscherm").
   **iPhone/Safari:** tik op het deel-icoon (□↑) → "Zet op beginscherm".
3. Je krijgt een icoon op je startscherm dat opent als een echte app (geen browserbalk) en ook offline werkt.

Let op: al je afspraken worden lokaal op je telefoon opgeslagen (in de app, niet in de cloud). Er is geen account en niets wordt gesynchroniseerd tussen apparaten — vul je iets in op je telefoon, dan zie je dat niet automatisch terug op je computer.

## Gebruik op je computer
Open dezelfde link gewoon in je browser. Werkt ook prima zonder installeren.

## Iets aanpassen aan de app
De broncode staat in dit mapje (`index.html`, `manifest.json`, `sw.js`, `icons/`). Na een wijziging: committen en pushen naar de `main`-branch van [github.com/kevintjuh1-boop/weekrooster](https://github.com/kevintjuh1-boop/weekrooster) — GitHub Pages werkt de live app dan automatisch bij (duurt meestal 1-2 minuten).

## Afspraken toevoegen
Klik op een leeg tijdvak in het rooster (of op "+ Nieuw") om een afspraak in te vullen: titel, locatie (optioneel), datum, begin- en eindtijd (op het hele uur). Klik op een bestaande afspraak om 'm te bewerken of te verwijderen.

## Printen
Klik op "Printen". De pagina print altijd de volledige week (ook als je op je telefoon een dag-weergave hebt openstaan), liggend op één A4.

## Navigeren tussen weken
Gebruik de pijltjes of "Vandaag" om naar een andere week te gaan. Afspraken blijven altijd aan hun eigen datum gekoppeld.
