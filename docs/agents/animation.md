# Animation

Owner's standing rule: animation work is slow and verified; a good result beats a fast one. Every motion is *fluid*: eased in and out, continuous from first frame to last, and natural. Every visible change is one the design intended. The designed glitch effects are the only glitches; any other flicker, jump, empty frame or stutter is a bug.

An animation is done when you have watched it work, which is more than seeing it compile:

1. Record it in a real browser (Playwright video, frames pulled with ffmpeg) and inspect the frames of every transition.
2. Sample the animated values on each frame (`requestAnimationFrame`) and confirm each one moves in a single direction, without jumps.
3. Interrupt it: reverse it midway, hover or scroll during the motion, change page, try narrow screens and `prefers-reduced-motion` on a phone.
4. Fix what the frames show, then record again.

Design every motion as a senior motion designer would: before building, decide what fits this context, Terminal Lo-Fi / Synthwave and elegant rather than loud.

## GSAP

GSAP is the animation library (free, all plugins included, installed from the public `gsap` package). The official skills are in `.claude/skills/gsap-*`; read `gsap-react` before writing GSAP in a component.

- Import `gsap`, `useGSAP` and `MOTION` from `src/components/site/motion.ts`, where registration happens once and every plugin is registered.
- Write `useGSAP` with a `scope` ref. Callbacks created later go through `contextSafe`. GSAP never runs during SSR.
- Encode the motion rule with `gsap.matchMedia()` and the `MOTION` conditions:
  - desktop always animates;
  - phones that ask for reduced motion get the end state without motion.
- Animate `transform` and `opacity`; reach for Flip when a layout change has to look continuous.
- Use GSAP where it is clearly better (sequences, interruptible or reversible motion, Flip). Plain CSS transitions stay fine for simple hovers.
