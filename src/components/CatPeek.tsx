import { motion } from "framer-motion";

type Tone = "black" | "orange" | "lavender" | "white";
type Corner = "bl" | "br" | "tl" | "tr";

const TONE_FILL: Record<Tone, string> = {
  black: "#1a1a1a",
  orange: "#FF8A4C",
  lavender: "#B7A6FF",
  white: "#F7F2EA",
};

const TONE_INNER: Record<Tone, string> = {
  black: "#FFB17A",
  orange: "#FFD9B8",
  lavender: "#E7DFFF",
  white: "#FFD9B8",
};

/**
 * Half-hidden cat mascot peeking from a corner.
 * Position it inside a `relative` parent. Defaults to bottom-left.
 */
export function CatPeek({
  tone = "black",
  corner = "bl",
  size = 84,
  delay = 0,
  className = "",
}: {
  tone?: Tone;
  corner?: Corner;
  size?: number;
  delay?: number;
  className?: string;
}) {
  const fill = TONE_FILL[tone];
  const inner = TONE_INNER[tone];
  const eyeBg = tone === "white" ? "#1a1a1a" : "#0a0a0a";

  const pos: Record<Corner, string> = {
    bl: "left-[-18px] bottom-[-22px]",
    br: "right-[-18px] bottom-[-22px] -scale-x-100",
    tl: "left-[-18px] top-[-22px] rotate-180 -scale-x-100",
    tr: "right-[-18px] top-[-22px] rotate-180",
  };

  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute ${pos[corner]} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        animate={{ rotate: [0, -2, 0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.18))" }}
      >
        {/* ears */}
        <polygon points="18,40 28,12 46,32" fill={fill} />
        <polygon points="82,40 72,12 54,32" fill={fill} />
        <polygon points="24,34 30,20 38,30" fill={inner} opacity="0.85" />
        <polygon points="76,34 70,20 62,30" fill={inner} opacity="0.85" />
        {/* head */}
        <ellipse cx="50" cy="58" rx="38" ry="32" fill={fill} />
        {/* cheek blush */}
        <ellipse cx="28" cy="68" rx="6" ry="3" fill={inner} opacity="0.55" />
        <ellipse cx="72" cy="68" rx="6" ry="3" fill={inner} opacity="0.55" />
        {/* eyes */}
        <ellipse cx="38" cy="55" rx="4.5" ry="5.5" fill={eyeBg} />
        <ellipse cx="62" cy="55" rx="4.5" ry="5.5" fill={eyeBg} />
        <circle cx="39.5" cy="53.5" r="1.4" fill="#fff" />
        <circle cx="63.5" cy="53.5" r="1.4" fill="#fff" />
        {/* nose + mouth */}
        <path d="M47,65 L53,65 L50,68 Z" fill={tone === "white" ? "#1a1a1a" : "#2a1810"} />
        <path d="M50,68 Q46,72 43,70 M50,68 Q54,72 57,70" stroke={tone === "white" ? "#1a1a1a" : "#2a1810"} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* whiskers */}
        <path d="M22,62 L34,63 M22,68 L34,67 M78,62 L66,63 M78,68 L66,67"
          stroke={tone === "white" ? "#888" : "#fff"} strokeOpacity="0.6" strokeWidth="0.8" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}
