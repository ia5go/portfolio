## Bilingual content

Every user-facing text added to the site ships in both Portuguese and English, as a **Localized Field** `{ en, pt }` (see `CONTEXT.md`). Portuguese is the default locale at `/`; English lives at `/en`. Write both sides in the same change; never leave one as a placeholder or a copy of the other.

Client-owned material (screenshots, client names, URLs) stays single-source, unless that client really has more than one language version.

## Design

Mobile first. Design and build for a phone-sized screen, then add desktop-only enhancements on top (custom cursor, heavy animation, extra interactions); the mobile version must be complete and fast on its own. Nothing from the draft is dropped: on mobile, heavy effects are hidden or disabled, while desktop keeps the full experience. Follow current mobile best practices: touch targets of at least 44px, readable text without zoom, no horizontal scroll, light assets, and `prefers-reduced-motion` respected on phones and touch devices. Exception, decided by the owner: on desktop (hover-capable fine pointer, 900px and wider) the vaporwave animations (stars, circles, grain, glitch, cursor) run regardless of `prefers-reduced-motion`; do not gate them on it. Keep the vaporwave style from `reference/portfolio-html/portfolio-iago.html`, elegant rather than loud.

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues, managed via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five canonical labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
