# Language switches in place, with the URL as the source of truth

Switching between Portuguese (`/`) and English (`/en`) no longer navigates. The language toggle calls `history.replaceState` to swap the URL, every text re-renders in the new language, and the texts on screen scramble from the old wording to the new one (`src/components/site/scramble.ts`). The owner wanted the toggle to feel like flipping a switch: no reload and no page fade. The page fade stays for real page changes only.

## Decisions

- **The URL decides the language.** `parsePath` reads the page and language from the path, and `LocaleProvider` derives the locale from `usePathname`. Each locale keeps its own prerendered route and root layout, so SEO, `lang`, and a reload on `/en` behave as before.
- **`replaceState`, not `pushState`.** A language switch adds no history entry, so Back leaves the page instead of flipping the language. This follows the Next.js docs' own locale-switcher example.
- **Pages are client components.** `HomePage` and `ProjectsPage` are `"use client"`, so every text can follow the switch. No content needs the server.
- **The page stays mounted.** `PageTransition` is keyed by page, not by URL.
- **One reflow, hidden in the noise.** The scramble keeps the old text's shape until a single swap frame, then switches to the new shape. To make that the only layout change:
  - text below the viewport switches only after the scramble;
  - text above the viewport is compensated by scrolling;
  - browser scroll anchoring is held off from before React writes, so it cannot react to the transient commit.

## Consequences

After a switch, the client router still holds the other locale's layout tree. A later link to another page therefore loads it fully, behind the usual page fade. This costs nothing visible.
