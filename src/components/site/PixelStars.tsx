"use client";

import { memo, useEffect, useRef } from "react";
import { DESKTOP_QUERY, matches } from "./effectsEnv";
import "./pixel-stars.css";

/*
 * Retro pixel starfield, ported from uicapsule's background-pixel-stars and recolored
 * to the Sakura Fade palette. Desktop runs the full animation regardless of reduced
 * motion (owner decision, see AGENTS.md); phones run the same light 16 FPS canvas but
 * draw a single still frame when the user asks for reduced motion.
 */

// Sakura Fade palette; Sakura Petal repeats so most stars stay soft white.
const STAR_COLORS = [
  "#FFF0F5",
  "#FFF0F5",
  "#FFF0F5",
  "#FFB7C5",
  "#E0A6AA",
  "#B388EB",
  "#8093F1",
] as const;

const starDensity = 0.00004;
const twinkleProbability = 0.7;
const minTwinkleSpeed = 2;
const maxTwinkleSpeed = 4;
const pixelSize = 5;
const starRegenerationIntervalMs = 5000;
const percentToRegenerate = 0.15;

// Shooting stars: head in Sakura Petal, trail fading from Anime Blush to Twilight Lavender.
const shootingStarPixelSize = 2;
const targetFps = 16;
const frameInterval = 1000 / targetFps;
const shootingStarWidth = 4;
const shootingStarHeight = 2;
const shootingStarMargin = 30;
const shootingStarHead = "#FFF0F5";
const trailNear = "255, 183, 197";
const trailFar = "179, 136, 235";

interface BackgroundStar {
  x: number;
  y: number;
  color: string;
  baseOpacity: number;
  currentOpacity: number;
  twinkle: boolean;
  twinkleSpeed: number;
  // -1 fading out, 1 fading in
  twinkleDirection: number;
  twinkleTimer: number;
}

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  distance: number;
  trail: TrailPoint[];
}

const randomStarColor = (): string =>
  STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)] ?? STAR_COLORS[0];

// A background star snapped to the pixel grid, at a random spot on the canvas.
const createBackgroundStar = (width: number, height: number): BackgroundStar => {
  const baseOpacity = Math.random() * 0.5 + 0.5;
  return {
    baseOpacity,
    color: randomStarColor(),
    currentOpacity: baseOpacity,
    twinkle: Math.random() < twinkleProbability,
    twinkleDirection: -1,
    twinkleSpeed: minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
    twinkleTimer: 0,
    x: Math.floor(Math.random() * (width / pixelSize)) * pixelSize,
    y: Math.floor(Math.random() * (height / pixelSize)) * pixelSize,
  };
};

// Enters anywhere along the top edge, heading 45-135 degrees (90 is straight down).
const createShootingStar = (width: number): ShootingStar => ({
  angle: 45 + Math.random() * 90,
  distance: 0,
  speed: Math.random() * 5 + 8,
  trail: [],
  x: Math.random() * width,
  y: 0,
});

/** Desktop always animates; phones and touch devices respect reduced motion. */
function shouldAnimate(): boolean {
  return matches(DESKTOP_QUERY) || !matches("(prefers-reduced-motion: reduce)");
}

function PixelStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = shouldAnimate();
    let backgroundStars: BackgroundStar[] = [];
    let shootingStars: ShootingStar[] = [];

    const initBackgroundStars = (): void => {
      const numStars = Math.floor(canvas.width * canvas.height * starDensity);
      backgroundStars = Array.from({ length: numStars }, () =>
        createBackgroundStar(canvas.width, canvas.height),
      );
    };

    // Swap out a slice of the field so the sky slowly reshuffles.
    const regenerateBackgroundStars = (): void => {
      if (backgroundStars.length === 0) return;
      const numToRegenerate = Math.max(1, Math.floor(backgroundStars.length * percentToRegenerate));
      for (let i = 0; i < numToRegenerate; i += 1) {
        const randomIndex = Math.floor(Math.random() * backgroundStars.length);
        backgroundStars[randomIndex] = createBackgroundStar(canvas.width, canvas.height);
      }
    };

    const drawBackgroundStars = (advance: boolean): void => {
      for (const star of backgroundStars) {
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.currentOpacity;
        ctx.fillRect(star.x, star.y, pixelSize, pixelSize);

        if (!advance || !star.twinkle) continue;

        star.twinkleTimer += 1 / targetFps;
        if (star.twinkleTimer >= star.twinkleSpeed) {
          star.twinkleTimer = 0;
          star.twinkleDirection *= -1;
        }

        // Stepped fade: two discrete opacity levels for the retro look.
        const firstHalf = star.twinkleTimer / star.twinkleSpeed < 0.5;
        const dim = star.baseOpacity * 0.3;
        star.currentOpacity =
          firstHalf === (star.twinkleDirection < 0) ? star.baseOpacity : dim;
      }
      ctx.globalAlpha = 1;
    };

    const updateShootingStars = (): void => {
      shootingStars = shootingStars
        .map((star) => {
          const radians = (star.angle * Math.PI) / 180;
          const distance = star.distance + star.speed;
          const trail = [...star.trail];

          // Only add to the trail every few frames for the pixelated effect.
          if (distance % 8 < star.speed) {
            trail.push({ opacity: 1, x: star.x, y: star.y });
          }

          return {
            ...star,
            distance,
            trail: trail
              .map((point) => ({ ...point, opacity: point.opacity - 0.1 }))
              .filter((point) => point.opacity > 0),
            x: star.x + star.speed * Math.cos(radians),
            y: star.y + star.speed * Math.sin(radians),
          };
        })
        .filter(
          (star) =>
            star.x >= -shootingStarMargin &&
            star.x <= canvas.width + shootingStarMargin &&
            star.y >= -shootingStarMargin &&
            star.y <= canvas.height + shootingStarMargin,
        );
    };

    const drawRotated = (x: number, y: number, radians: number, draw: () => void): void => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(radians);
      ctx.translate(-x, -y);
      draw();
      ctx.restore();
    };

    const drawShootingStars = (): void => {
      for (const star of shootingStars) {
        const radians = (star.angle * Math.PI) / 180;

        for (const point of star.trail) {
          drawRotated(point.x, point.y, radians, () => {
            const rgb = point.opacity > 0.5 ? trailNear : trailFar;
            ctx.fillStyle = `rgba(${rgb}, ${point.opacity})`;
            ctx.fillRect(point.x, point.y, shootingStarPixelSize, shootingStarPixelSize);
          });
        }

        drawRotated(star.x, star.y, radians, () => {
          ctx.fillStyle = shootingStarHead;
          for (let y = 0; y < shootingStarHeight; y += 1) {
            for (let x = 0; x < shootingStarWidth; x += 1) {
              // Skip corner pixels for the pixelated look.
              if ((x === 0 && y === 1) || (x === 3 && y === 0)) continue;
              ctx.fillRect(
                star.x + x * shootingStarPixelSize,
                star.y + y * shootingStarPixelSize,
                shootingStarPixelSize,
                shootingStarPixelSize,
              );
            }
          }
        });
      }
    };

    const drawFrame = (advance: boolean): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackgroundStars(advance);
      if (advance && shootingStars.length) {
        updateShootingStars();
        drawShootingStars();
      }
    };

    // Mobile browsers fire resize when the URL bar slides in and out; only rebuild the
    // field when the size really changes, so scrolling does not reshuffle the sky.
    const resizeCanvas = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const reshuffle =
        width !== canvas.width || Math.abs(height - canvas.height) > canvas.height * 0.25;
      canvas.width = width;
      canvas.height = height;
      if (reshuffle || backgroundStars.length === 0) initBackgroundStars();
      if (!animate) drawFrame(false);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (!animate) {
      return () => window.removeEventListener("resize", resizeCanvas);
    }

    let frameId = 0;
    let lastRenderTime = 0;
    let shootingStarTimer: ReturnType<typeof setTimeout> | undefined;
    let regenerationInterval: ReturnType<typeof setInterval> | undefined;

    const animateCanvas = (timestamp: number): void => {
      frameId = requestAnimationFrame(animateCanvas);
      if (timestamp - lastRenderTime < frameInterval) return;
      lastRenderTime = timestamp;
      drawFrame(true);
    };

    // Spawn shooting stars on a random 2-6 second cadence.
    const spawnShootingStar = (): void => {
      shootingStars = [...shootingStars, createShootingStar(canvas.width)];
      shootingStarTimer = setTimeout(spawnShootingStar, Math.random() * 4000 + 2000);
    };

    const start = (): void => {
      frameId = requestAnimationFrame(animateCanvas);
      shootingStarTimer = setTimeout(spawnShootingStar, Math.random() * 2000 + 500);
      regenerationInterval = setInterval(regenerateBackgroundStars, starRegenerationIntervalMs);
    };

    // Timers keep firing in hidden tabs; stop everything so stars don't pile up.
    const stop = (): void => {
      cancelAnimationFrame(frameId);
      clearTimeout(shootingStarTimer);
      clearInterval(regenerationInterval);
    };

    const onVisibilityChange = (): void => {
      if (document.hidden) {
        stop();
      } else {
        stop();
        shootingStars = [];
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-stars" aria-hidden="true" />;
}

export const PixelStars = memo(PixelStarsCanvas);
