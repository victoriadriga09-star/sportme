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
 * Peeking cat mascot — rounded square head, tan inner ears,
 * two white dot eyes, small pink nose. Minimal & cute.
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
  flip?: boolean;
  className?: string;
}) {
  const fill = TONE_FILL[tone];
  const innerEar = "#E8B89A";
  const nose = "#D98A8A";
  const eye = "#FFFFFF";

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
        {/* Ears — outer triangles */}
        <path d="M12,46 L26,10 L46,40 Z" fill={fill} />
        <path d="M88,46 L74,10 L54,40 Z" fill={fill} />
        {/* Inner ears */}
        <path d="M22,40 L27,20 L37,38 Z" fill={innerEar} />
        <path d="M78,40 L73,20 L63,38 Z" fill={innerEar} />
        {/* Head — rounded square */}
        <path
          d="M8,58 Q8,30 34,30 L66,30 Q92,30 92,58 L92,92 Q92,100 84,100 L16,100 Q8,100 8,92 Z"
          fill={fill}
        />
        {/* Eyes — white dots */}
        <ellipse cx="36" cy="64" rx="4.2" ry="4.8" fill={eye} />
        <ellipse cx="64" cy="64" rx="4.2" ry="4.8" fill={eye} />
        {/* Nose */}
        <ellipse cx="50" cy="78" rx="3.4" ry="2.6" fill={nose} />
      </motion.svg>
    </motion.div>
  );
}
