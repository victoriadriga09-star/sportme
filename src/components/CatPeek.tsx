import { motion } from "framer-motion";

type Tone = "black" | "orange" | "lavender" | "white";
type Corner = "bl" | "br" | "tl" | "tr";

const TONE_FILL: Record<Tone, string> = {
  black: "#1f1f1f",
  orange: "#FF8A4C",
  lavender: "#B7A6FF",
  white: "#F7F2EA",
};

/**
 * Peeking cat mascot — soft blob head with pointed ears,
 * tiny dark eyes and a small "ω" mouth. Mirrors the reference art.
 */
export function CatPeek({
  tone = "black",
  corner = "bl",
  size = 64,
  delay = 0,
  flip = false,
  className = "",
}: {
  tone?: Tone;
  corner?: Corner;
  size?: number;
  delay?: number;
  flip?: boolean;
  className?: string;
}) {
  const fill = TONE_FILL[tone];
  // Dark facial features — slightly darker than the head fill, near-black always
  const feat = tone === "black" ? "#0a0a0a" : "#2A1F4A";

  const pos: Record<Corner, string> = {
    bl: "left-[-18px] bottom-[-22px]",
    br: "right-[-18px] bottom-[-22px] -scale-x-100",
    tl: "left-[-18px] top-[-22px]",
    tr: "right-[-18px] top-[-22px] -scale-x-100",
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
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
        style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.20))" }}
      >
        {/* Soft blob head with two pointed ears — single path */}
        <path
          d="
            M50,8
            L30,32
            Q14,34 10,52
            Q6,72 18,86
            Q34,98 50,98
            Q66,98 82,86
            Q94,72 90,52
            Q86,34 70,32
            Z
          "
          fill={fill}
        />
        {/* Tiny dark eyes — small dots */}
        <ellipse cx="38" cy="58" rx="3.2" ry="3.6" fill={feat} />
        <ellipse cx="62" cy="58" rx="3.2" ry="3.6" fill={feat} />
        {/* Small ω mouth */}
        <path
          d="M44,70 Q47,74 50,71 Q53,74 56,70"
          stroke={feat}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}
