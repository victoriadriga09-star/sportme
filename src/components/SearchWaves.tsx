import { motion } from "framer-motion";
import { Search } from "lucide-react";

/**
 * Fullscreen search animation — radial violet glow fading to white at edges,
 * concentric pulse rings + orbiting nodes + connection lines.
 */
export function SearchWaves({ label = "Recherche de partenaires…" }: { label?: string }) {
  const nodes = [
    { x: 0,    y: -110, d: 0.05 },
    { x: 95,   y: -55,  d: 0.15 },
    { x: 100,  y: 60,   d: 0.25 },
    { x: 0,    y: 115,  d: 0.35 },
    { x: -100, y: 55,   d: 0.45 },
    { x: -90,  y: -60,  d: 0.55 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-[100] grid place-items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #7C5CFF 0%, #A98BFF 22%, #D9CCFF 45%, #F3EEFF 70%, #FFFFFF 100%)",
      }}
    >
      {/* overlay pulse — soft expanding violet blob */}
      <motion.span
        initial={{ scale: 0.4, opacity: 0.55 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        className="absolute size-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.45), transparent 70%)" }}
      />

      {/* concentric waves */}
      <div className="relative size-[320px] grid place-items-center">
        {[0, 0.4, 0.8, 1.2, 1.6].map((delay, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.25, opacity: 0.6 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
            className="absolute size-40 rounded-full border-2 border-[#7C5CFF]/50 bg-[#7C5CFF]/5"
          />
        ))}

        {/* connection web */}
        <svg className="absolute inset-0" viewBox="-160 -160 320 320">
          {nodes.map((n, i) => (
            <motion.line
              key={`l${i}`}
              x1={0}
              y1={0}
              x2={n.x}
              y2={n.y}
              stroke="rgba(124,92,255,0.55)"
              strokeWidth={1}
              strokeDasharray="3 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: n.d, ease: "easeOut" }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={`c${i}`}
              cx={n.x}
              cy={n.y}
              r={4}
              fill="#7C5CFF"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ duration: 0.6, delay: n.d + 0.5 }}
            />
          ))}
        </svg>

        {/* center logo */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.08, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative size-20 rounded-3xl bg-white/85 backdrop-blur-xl border border-white grid place-items-center shadow-2xl"
        >
          <Search className="size-8 text-[#7C5CFF]" strokeWidth={2.4} />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="absolute bottom-[18%] text-ink font-display font-bold text-[18px] tracking-tight"
      >
        {label}
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 180 }}
        transition={{ delay: 0.5, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-[14%] h-[3px] rounded-full bg-[#7C5CFF]"
      />
    </motion.div>
  );
}
