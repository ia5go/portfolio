# Review: quick version (ticket #16)

Method: production build (`npm run build && npm start`), headless Chromium (Playwright, installed outside the repo), Home and Projects in pt and en at 390px and 1440px, full-page screenshots inspected, plus automated DOM checks.

## Checks that passed
- No horizontal scroll at 390px or 1440px on any of the four pages (scrollWidth equals clientWidth).
- No link or button smaller than 44px in either dimension at 390px.
- No broken images (Home: 6, Projects: 24), no console or page errors.
- Mobile menu opens (button, then links plus PT | EN switch and close button) and is usable; PT | EN switch links to the equivalent page.
- Head tags: title, description, canonical, hreflang pt/en/x-default, Open Graph and Twitter tags correct per locale and page; icon served at `/icon.svg`.
- Content rules (spec #2): no 99Freelas, no excluded sites (Fatima Pissarra, Sou Mais Grafica, RR Medical, Plano Brasil Saude appear only in tests asserting their absence), no tracking parameters in links, numbers match spec (5+, 25+, 100+, infinity).
- Localized Fields: the guard test passes; no empty or copied-placeholder fields. The unused `home-placeholder.ts` was removed.

## Issues found
Fixed:
1. Home page title was only "Iago Benvindo"; now "Iago Benvindo | Full-Stack Developer".
2. Dead file `src/content/home-placeholder.ts` (leftover from the foundation ticket) removed.

Not fixed (for Iago to decide):
3. The Platinum card image (neutral crop, ~4KB) is almost fully black on Home and Projects, so the card looks empty next to the others. Needs a better neutral crop.
4. Several Projects page screenshots are dark or sparse at thumbnail size; worth checking that none contains a cookie banner or popup.
5. Mobile menu order lists "Projetos/Projects" after "Contato/Contact"; consider placing it second.
6. `siteUrl` is a placeholder (`https://iagobenvindo.example`); canonical, hreflang and Open Graph URLs must be updated once the domain exists. No social share image (og:image) exists yet, so Twitter card is `summary` without picture.
7. Experience bullet "almost 4 years at Hoom Interativa" in About is derived from 06/2021 to 02/2025 (about 3 years 8 months); acceptable, but confirm wording.
