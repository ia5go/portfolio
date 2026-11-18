# Slide deck layout

The partnership deck (in `reference/parceria/`, gitignored) is a column of 16:9 `.slide` windows sized with `container-type: inline-size`. Every length inside is in `cqw`, so a slide scales as one picture on screen and in print.

A blanket 15% type increase meant to fill empty space overflowed the flow slides and the card slides; it took three passes to settle.

**Why:** each slide has a different content density, so one global multiplier fits some slides and breaks others.

**How to apply:**
- Tune size per slide type (`.fill` for flows, `.kind` cards, `[aria-labelledby="sN"]` for one dense slide), not globally.
- After each change, run `node scripts/check-layout.mjs` on the deck and view the changed slides at full size ([[visual-verification-tools]]).
- Visual rules from the owner: [[external-document-style]]. Palette and terminal-window look come from `src/styles/tokens.css`.
