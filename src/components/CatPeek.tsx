import { motion } from "framer-motion";

type Tone = "black" | "orange" | "lavender" | "white";
type Corner = "bl" | "br" | "tl" | "tr";

const TONE_FILL: Record<Tone, string> = {
  black: "#1a1a1a",
  orange: "#FF8A4C",
  lavender: "#B7A6FF",
  white: "#F7F2EA",
};

/**
 * Minimalist peeking cat mascot — single solid color, rounded face,
 * two triangular ears, two dot eyes, "ω3" mouth.
 * Place inside a `relative` parent.
 */
export function CatPeek({
  tone = "black",
  corner = "bl",
  size = 84,
  delay = 0,
  flip = false,
  className = "",
}: {
  tone?: Tone;
  corner?: Corner;
  size?: number;
  delay?: number;
  /** Flip vertically (upside-down) */
  flip?: boolean;
  className?: string;
}) {
  const fill = TONE_FILL[tone];
  const dark = tone === "white" ? "#1a1a1a" : "#1a1a1a";

  const pos: Record<Corner, string> = {
    bl: "left-[-22px] bottom-[-28px]",
    br: "right-[-22px] bottom-[-28px] -scale-x-100",
    tl: "left-[-22px] top-[-28px]",
    tr: "right-[-22px] top-[-28px] -scale-x-100",
  };

  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute ${pos[corner]} ${className}`}
      style={{ width: size, height: size, transform: flip ? "rotate(180deg)" : undefined }}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        animate={{ rotate: [0, -1.5, 0, 1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.22))" }}
      >
        {/* Ears — sharp triangles */}
        <path d="M14,46 L28,8 L46,38 Z" fill={fill} />
        <path d="M86,46 L72,8 L54,38 Z" fill={fill} />
        {/* Head — rounded square */}
        <path
          d="M10,52 Q10,28 32,28 L68,28 Q90,28 90,52 L90,94 Q90,100 84,100 L16,100 Q10,100 10,94 Z"
          fill={fill}
        />
        {/* Eyes — large dots */}
        <ellipse cx="36" cy="62" rx="5" ry="5.5" fill={dark} />
        <ellipse cx="64" cy="62" rx="5" ry="5.5" fill={dark} />
        {/* Mouth — ω3 style */}
        <path
          d="M44,74 Q47,78 50,74 Q53,78 56,74"
          stroke={dark}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M56,74 Q58,80 56,82 Q53,84 55,79"
          stroke={dark}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}
