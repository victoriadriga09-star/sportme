import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#7C5CFF";

/**
 * Minimal monochrome splash: a single dot travels left → right at a steady
 * pace, leaving a thin pulse-monitor trail behind it. When the dot reaches
 * the right edge the trail becomes a clean horizontal underline, and the
 * ÉLAN wordmark fades in just above the line.
 */
export function SplashElan({ onDone, duration = 2400 }: { onDone?: () => void; duration?: number }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!onDone) return;
    const t = setTimeout(onDone, reduce ? 500 : duration);
    return () => clearTimeout(t);
  }, [onDone, duration, reduce]);

  // Geometry — a horizontal line stretched across most of the screen width.
  const LINE_W = 280;
  const BASELINE = "52%"; // vertical position of the trail line
  const TRAVEL_MS = 1400;

  // Pulse-monitor profile: subtle dip then a sharp QRS-like spike, then flat.
  // Each point is a fraction of LINE_W → vertical offset in px (negative = up).
  const wavePts = [
    [0.00,  0], [0.18,  0], [0.22, -2], [0.26,  3],
    [0.30, -22], [0.34, 10], [0.38,  -3], [0.44,  0],
    [1.00,  0],
  ];
  const pathD = wavePts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x * LINE_W} ${y}`).join(" ");

  return (
    <motion.div
      className="fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: EASE } }}
    >
      {/* Centered stack: wordmark above, line+dot below */}
      <div className="relative" style={{ width: LINE_W, top: 0 }}>
        {/* Wordmark — fades in toward the end of the dot travel */}
        <motion.div
          initial={{ opacity: 0, y: 6, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
          transition={{ duration: 0.7, delay: (TRAVEL_MS - 200) / 1000, ease: EASE }}
          className="absolute left-0 right-0 -top-10 text-center font-display font-extrabold text-ink text-[34px] leading-none select-none"
        >
          ÉLAN
        </motion.div>

        {/* Pulse SVG — the trail traces from left to right as the dot moves */}
        <svg
          width={LINE_W}
          height={60}
          viewBox={`0 -30 ${LINE_W} 60`}
          className="block"
          aria-hidden
        >
          {/* Baseline underline that brightens once the trace completes */}
          <motion.line
            x1={0} y1={0} x2={LINE_W} y2={0}
            stroke={ACCENT}
            strokeWidth={1}
            strokeLinecap="round"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.15, 1] }}
            transition={{ duration: TRAVEL_MS / 1000, times: [0, 0.95, 1], ease: "linear" }}
          />

          {/* The traced pulse path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{
              pathLength: { duration: TRAVEL_MS / 1000, ease: "linear" },
              opacity:    { duration: 0.6, delay: (TRAVEL_MS + 100) / 1000, ease: EASE },
            }}
          />
        </svg>

        {/* Traveling dot — sits on the SVG baseline (svg top=0, baseline at 30px) */}
        <motion.span
          className="absolute size-2 rounded-full"
          style={{
            top: 30,
            left: 0,
            background: ACCENT,
            boxShadow: `0 0 12px ${ACCENT}`,
            marginLeft: -4,
            marginTop: -4,
          }}
          initial={{ x: 0, opacity: 1 }}
          animate={{
            x: [0, LINE_W * 0.3, LINE_W * 0.34, LINE_W],
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: TRAVEL_MS / 1000,
            times: [0, 0.3, 0.34, 1],
            ease: "linear",
          }}
        />

      </div>

      {/* Subtle tagline beneath */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, delay: (TRAVEL_MS + 100) / 1000, ease: EASE }}
        className="absolute bottom-[22%] text-ink/60 text-[10px] tracking-[0.4em] uppercase font-semibold"
      >
        Bouge ensemble
      </motion.p>
    </motion.div>
  );
}
