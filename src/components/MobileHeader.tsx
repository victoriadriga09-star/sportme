import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function MobileHeader({
  title, back, right, transparent = false,
}: { title?: string; back?: boolean | string; right?: ReactNode; transparent?: boolean }) {
  const router = useRouter();
  return (
    <header
      className={`sticky top-0 z-20 px-5 py-3.5 flex items-center justify-between ${
        transparent ? "bg-transparent" : "bg-background/85 backdrop-blur-lg border-b border-border/60"
      }`}
    >
      <div className="w-10">
        {back ? (
          typeof back === "string" ? (
            <Link to={back} aria-label="Retour" className="size-10 grid place-items-center rounded-full bg-surface border border-border">
              <ChevronLeft className="size-5" strokeWidth={1.8} />
            </Link>
          ) : (
            <button
              onClick={() => router.history.back()}
              aria-label="Retour"
              className="size-10 grid place-items-center rounded-full bg-surface border border-border"
            >
              <ChevronLeft className="size-5" strokeWidth={1.8} />
            </button>
          )
        ) : null}
      </div>
      {title && (
        <h1 className="font-display font-bold text-base text-ink">{title}</h1>
      )}
      <div className="w-10 flex justify-end">{right}</div>
    </header>
  );
}
