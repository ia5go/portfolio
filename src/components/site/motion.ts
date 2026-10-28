"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DESKTOP_QUERY } from "./effectsEnv";

// The one place GSAP is set up. Import `gsap` and `useGSAP` from here, not from the
// packages, so registration happens exactly once. Register any plugin here too.
gsap.registerPlugin(useGSAP);

/**
 * The owner's motion rule as `gsap.matchMedia` conditions (see AGENTS.md):
 *  - `animate`: desktop always animates, regardless of prefers-reduced-motion; phones
 *    and touch devices animate unless they ask for reduced motion.
 *  - `still`: phones and touch devices that ask for reduced motion. Jump to the end
 *    state, with no motion.
 *
 * Use it like this:
 *   const mm = gsap.matchMedia();
 *   mm.add(MOTION, ({ conditions }) => { if (conditions?.still) ...; else ... });
 */
export const MOTION = {
  animate: `${DESKTOP_QUERY}, (prefers-reduced-motion: no-preference)`,
  still: `(prefers-reduced-motion: reduce) and (not (${DESKTOP_QUERY}))`,
};

export { gsap, useGSAP };
