import type { ReactNode } from "react";

type Tone = "lime" | "lavender" | "ink" | "outline" | "ghost" | "white";

const TONE: Record<Tone, string> = {
  lime: "bg-lime text-ink",
  lavender: "bg-lavender text-ink",
  ink: "bg-ink text-background",
  outline: "border border-ink/80 text-ink bg-transparent",
  ghost: "bg-muted text-ink",
  white: "bg-surface text-ink border border-border",
};

export function Pill({
  children, tone = "ghost", size = "md", className = "",
}: { children: ReactNode; tone?: Tone; size?: "sm" | "md" | "lg"; className?: string }) {
  const s =
    size === "sm" ? "text-[11px] px-2.5 py-1 font-semibold"
    : size === "lg" ? "text-sm px-5 py-2.5 font-semibold"
    : "text-xs px-3.5 py-1.5 font-semibold";
  return (
    <span className={`inline-flex items-center gap-1.5 pill ${TONE[tone]} ${s} ${className}`}>
      {children}
    </span>
  );
}
