import type { CSSProperties } from "react";

const GRADIENTS = [
  "linear-gradient(135deg, #CCFF00, #8DDA00)",
  "linear-gradient(135deg, #C8B8FF, #E0B0FF)",
  "linear-gradient(135deg, #FFB58D, #FFD080)",
  "linear-gradient(135deg, #FFC9DE, #FFB5C5)",
  "linear-gradient(135deg, #B8E0FF, #9DC8FF)",
  "linear-gradient(135deg, #1A1A1A, #4A4A4A)",
] as const;

function hashIndex(seed: string, mod: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h) % mod;
}

export function Avatar({
  name, size = 40, ring, className = "",
}: { name: string; size?: number; ring?: "lime" | "lavender" | "none"; className?: string }) {
  const initials = name
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bg = GRADIENTS[hashIndex(name, GRADIENTS.length)];
  const isDark = bg.includes("#1A1A1A");
  const ringClass =
    ring === "lime" ? "ring-2 ring-lime ring-offset-2 ring-offset-background"
    : ring === "lavender" ? "ring-2 ring-lavender ring-offset-2 ring-offset-background"
    : "";
  const style: CSSProperties = {
    width: size, height: size, background: bg,
    fontSize: Math.max(11, size / 2.6),
    color: isDark ? "#F5F5F0" : "#1A1A1A",
  };
  return (
    <span
      className={`inline-grid place-items-center rounded-full font-display font-bold shrink-0 ${ringClass} ${className}`}
      style={style}
      aria-label={name}
    >
      {initials}
    </span>
  );
}
