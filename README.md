# Weekrooster

Heel simpele weekrooster-app. Één bestand (`index.html`), geen installatie of internet nodig.

## Gebruik op je computer
Dubbelklik op `index.html` — opent in je browser. Alles wat je invult wordt automatisch lokaal opgeslagen (in de browser, per week), ook na herstarten.

## Gebruik op je telefoon
Twee opties:

**Optie A — bestand overzetten**
Stuur `index.html` naar jezelf (bijv. via WhatsApp/e-mail/AirDrop) en open het op je telefoon. Werkt volledig offline.

**Optie B — via wifi vanaf je computer**
Als je hem ook op je computer wilt bijhouden en synchroon wilt zien op je telefoon binnen hetzelfde wifi-netwerk:
1. Open een terminal in deze map.
2. Start een lokaal servertje:
   ```bash
   python -m http.server 8000
   ```
3. Zoek het IP-adres van je computer (bijv. `ipconfig` op Windows, kijk bij "IPv4-adres").
4. Open op je telefoon in de browser: `http://<dat-ip-adres>:8000`

Let op: bij optie B werkt het rooster nog steeds per apparaat/browser (opslag gebeurt lokaal, niet gedeeld tussen computer en telefoon).

## Afspraken toevoegen
Klik op een leeg tijdvak in het rooster (of op "+ Nieuw") om een afspraak in te vullen: titel, locatie (optioneel), datum, begin- en eindtijd (op het hele uur). Klik op een bestaande afspraak om 'm te bewerken of te verwijderen.

## Printen
Klik op "Printen". De pagina print altijd de volledige week (ook als je op je telefoon een dag-weergave hebt openstaan), liggend op één A4.

## Navigeren tussen weken
Gebruik de pijltjes of "Vandaag" om naar een andere week te gaan. Afspraken blijven altijd aan hun eigen datum gekoppeld.
