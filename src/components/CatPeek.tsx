type Tone = "black" | "orange" | "lavender" | "white";
type Corner = "bl" | "br" | "tl" | "tr";

/**
 * Mascot removed per user request. Kept as a no-op so existing call sites
 * continue to type-check without churn.
 */
export function CatPeek(_props: {
  tone?: Tone;
  corner?: Corner;
  size?: number;
  delay?: number;
  flip?: boolean;
  className?: string;
}) {
  return null;
}

