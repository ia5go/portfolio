## Bilingual content

Every user-facing text added to the site ships in both Portuguese and English, as a **Localized Field** `{ en, pt }` (see `CONTEXT.md`). Portuguese is the default locale at `/`; English lives at `/en`. Write both sides in the same change; never leave one as a placeholder or a copy of the other.

Client-owned material (screenshots, client names, URLs) stays single-source, unless that client really has more than one language version.

## Design

Mobile first. Design and build for a phone-sized screen, then add desktop-only enhancements on top (custom cursor, heavy animation, extra interactions); the mobile version must be complete and fast on its own. Nothing from the draft is dropped: on mobile, heavy effects are hidden or disabled, while desktop keeps the full experience. Follow current mobile best practices: touch targets of at least 44px, readable text without zoom, no horizontal scroll, light assets, and `prefers-reduced-motion` respected on phones and touch devices. Exception, decided by the owner: on desktop (hover-capable fine pointer, 900px and wider) the vaporwave animations (pixel stars, grain, glitch, cursor) run regardless of `prefers-reduced-motion`; do not gate them on it. Keep the vaporwave layout and type from `reference/portfolio-html/portfolio-iago.html`, in the owner's Terminal Lo-Fi / Synthwave Coder style (palette in `src/styles/tokens.css`, monospace type, every section a terminal window), elegant rather than loud. The pixel starfield (`PixelStars`) replaced the draft's CSS stars and floating circles by owner decision; it also runs lighter on phones.

## Animation

Owner's standing rule: animation work is slow and verified; a good result beats a fast one. Every motion is *fluid*: eased in and out, continuous from first frame to last, and natural. Every visible change is one the design intended. The designed glitch effects are the only glitches; any other flicker, jump, empty frame or stutter is a bug.

An animation is done when you have watched it work, which is more than seeing it compile:

1. Record it in a real browser (Playwright video, frames pulled with ffmpeg) and inspect the frames of every transition.
2. Sample the animated values on each frame (`requestAnimationFrame`) and confirm each one moves in a single direction, without jumps.
3. Interrupt it: reverse it midway, hover or scroll during the motion, change page, try narrow screens and `prefers-reduced-motion` on a phone.
4. Fix what the frames show, then record again.

Design every motion as a senior motion designer would: before building, decide what fits this context, Terminal Lo-Fi / Synthwave and elegant rather than loud.

### GSAP

GSAP is the animation library (free, all plugins included, installed from the public `gsap` package). The official skills are in `.claude/skills/gsap-*`; read `gsap-react` before writing GSAP in a component.

- Import `gsap`, `useGSAP` and `MOTION` from `src/components/site/motion.ts`, where registration happens once and every plugin is registered.
- Write `useGSAP` with a `scope` ref. Callbacks created later go through `contextSafe`. GSAP never runs during SSR.
- Encode the motion rule with `gsap.matchMedia()` and the `MOTION` conditions:
  - desktop always animates;
  - phones that ask for reduced motion get the end state without motion.
- Animate `transform` and `opacity`; reach for Flip when a layout change has to look continuous.
- Use GSAP where it is clearly better (sequences, interruptible or reversible motion, Flip). Plain CSS transitions stay fine for simple hovers.

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
