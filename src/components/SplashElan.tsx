import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SplashElan({ onDone, duration = 2400 }: { onDone?: () => void; duration?: number }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!onDone) return;
    const t = setTimeout(onDone, reduce ? 600 : duration);
    return () => clearTimeout(t);
  }, [onDone, duration, reduce]);

  // ÉLAN. — alternating white / lavender, dot lavender
  const chars = [
    { c: "É", color: "#FFFFFF" },
    { c: "L", color: "#C9B8FF" },
    { c: "A", color: "#FFFFFF" },
    { c: "N", color: "#C9B8FF" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[999] grid place-items-center overflow-hidden"
      style={{ background: "radial-gradient(120% 80% at 50% 40%, #1a1430 0%, #08060f 60%, #000 100%)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
    >
      {/* aurora blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-16 size-[60vmin] rounded-full blur-[80px] opacity-50"
        style={{ background: "radial-gradient(circle, #7C5CFF 0%, transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -right-16 size-[55vmin] rounded-full blur-[80px] opacity-40"
        style={{ background: "radial-gradient(circle, #C9B8FF 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* concentric rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full border border-white/15"
          style={{ width: 220 + i * 120, height: 220 + i * 120 }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: [0, 0.6, 0] }}
          transition={{ duration: 2.2, delay: 0.2 + i * 0.25, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Wordmark */}
      <div className="relative flex items-end gap-[2px] font-display font-extrabold tracking-tight text-[clamp(64px,18vw,160px)] leading-none select-none">
        {chars.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: 80, opacity: 0, filter: "blur(16px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
            style={{ color: ch.color, textShadow: "0 8px 40px rgba(124,92,255,0.35)" }}
          >
            {ch.c}
          </motion.span>
        ))}
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.55, type: "spring", stiffness: 320, damping: 18 }}
          className="inline-block ml-1 mb-[0.12em] size-[0.32em] rounded-full"
          style={{ background: "#C9B8FF", boxShadow: "0 0 24px #C9B8FF" }}
        />
      </div>

      {/* underline sweep */}
      <motion.div
        aria-hidden
        className="absolute bottom-[34%] h-[3px] rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, #C9B8FF, transparent)" }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "62vw", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
      />

      {/* tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
        className="absolute bottom-[22%] text-white/70 text-xs tracking-[0.4em] uppercase font-semibold"
      >
        Bouge ensemble
      </motion.p>

      {/* loader dots */}
      <div className="absolute bottom-[12%] flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-white/80"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
