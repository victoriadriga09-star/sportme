import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MessageCircle } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";
import { PARTNERS } from "@/data/mock";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "Mes partenaires — ÉLAN" }] }),
  component: Partners,
});

function Partners() {
  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader back="/profile" title="Mes partenaires" />
      <div className="px-5 space-y-3">
        {PARTNERS.map((p, i) => (
          <article key={p.id} className="flex items-center gap-3 p-3 rounded-2xl bg-surface border border-border">
            <Avatar name={p.name} size={52} ring={p.online ? "lime" : "none"} />
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm">{p.name.split(" ")[0]}</p>
              <p className="text-[11px] text-muted-foreground">{i + 2} séances · {p.sport}</p>
            </div>
            <div className="flex gap-1.5">
              <Link to="/chat/$id" params={{ id: p.id }} aria-label="Écrire" className="size-9 grid place-items-center rounded-full bg-muted">
                <MessageCircle className="size-4" />
              </Link>
              <button aria-label="Favori" className="size-9 grid place-items-center rounded-full bg-lavender-soft">
                <Heart className="size-4" fill={i % 2 === 0 ? "currentColor" : "none"} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
