# FasadKungen Sverige AB

En statisk, tillgänglig webbplats och ett server-side offertformulär för FasadKungen.

## Kom igång

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fyll i `.env.local` för att aktivera SMS-notiser från formuläret:

- `ELKS_API_USERNAME` och `ELKS_API_PASSWORD`: 46elks API-uppgifter.
- `LEAD_NOTIFICATION_PHONE`: numret som ska få SMS om nya förfrågningar, i internationellt format.

Utan dessa uppgifter visas ett professionellt felmeddelande i formuläret och inga förfrågningar rapporteras som skickade.

## Bilder

Bildkonfigurationen finns i `lib/images.ts`. Bilderna ligger som optimerade WebP-filer i `public/images`. Billy/arbetsbilen och porträttet används som verksamhetsbilder. De två övriga är uttryckligen märkta som `Miljöbild`; de påstår inte att de visar genomförda FasadKungen-projekt. Ersätt posterna i `galleryImages` med kundgodkända, dokumenterade projektbilder och korrekta bildtexter när de finns.

## Kontroller

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
