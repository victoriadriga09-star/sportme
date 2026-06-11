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
 * Cute peeking cat mascot — rounded face, tan inner ears,
 * white eyes with pupils, pink nose, whiskers.
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
  const innerEar = "#E8B89A"; // tan
  const nose = "#E89AA8"; // pink
  const eyeWhite = "#FFFFFF";
  const pupil = "#1a1a1a";
  const whisker = tone === "white" ? "#1a1a1a" : "rgba(255,255,255,0.55)";

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
        {/* Ears — outer */}
        <path d="M10,44 L26,8 L44,38 Z" fill={fill} />
        <path d="M90,44 L74,8 L56,38 Z" fill={fill} />
        {/* Inner ears */}
        <path d="M20,38 L27,18 L36,36 Z" fill={innerEar} />
        <path d="M80,38 L73,18 L64,36 Z" fill={innerEar} />
        {/* Head — rounded */}
        <path
          d="M8,56 Q8,28 34,28 L66,28 Q92,28 92,56 L92,92 Q92,100 84,100 L16,100 Q8,100 8,92 Z"
          fill={fill}
        />
        {/* Eyes — white with pupils */}
        <ellipse cx="36" cy="62" rx="7" ry="7.5" fill={eyeWhite} />
        <ellipse cx="64" cy="62" rx="7" ry="7.5" fill={eyeWhite} />
        <ellipse cx="37" cy="63" rx="3" ry="3.5" fill={pupil} />
        <ellipse cx="65" cy="63" rx="3" ry="3.5" fill={pupil} />
        {/* Eye sparkle */}
        <circle cx="34.5" cy="60.5" r="1.1" fill="#fff" />
        <circle cx="62.5" cy="60.5" r="1.1" fill="#fff" />
        {/* Nose */}
        <ellipse cx="50" cy="76" rx="4.2" ry="3" fill={nose} />
        {/* Mouth */}
        <path
          d="M50,79 Q47,84 43,82 M50,79 Q53,84 57,82"
          stroke={pupil}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Whiskers */}
        <path d="M14,70 L30,72 M14,76 L30,75" stroke={whisker} strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M86,70 L70,72 M86,76 L70,75" stroke={whisker} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </motion.svg>
    </motion.div>
  );
}
