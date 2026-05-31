import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, MessageCircle, CalendarPlus } from "lucide-react";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/match")({
  head: () => ({ meta: [{ title: "C'est un match ! — ÉLAN" }] }),
  component: Match,
});

const CONFETTI = Array.from({ length: 24 });

function Match() {
  return (
    <main className="relative min-h-[100dvh] bg-ink text-background overflow-hidden flex flex-col px-6 py-10">
      {/* confetti */}
      {CONFETTI.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i % 8) * 120;
        const color = i % 3 === 0 ? "bg-lime" : i % 3 === 1 ? "bg-lavender" : "bg-background";
        return (
          <span key={i} style={{ left: `${left}%`, animationDelay: `${delay}ms` }}
            className={`${color} absolute top-0 size-2 rounded-sm animate-bounce`} />
        );
      })}
      {/* glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-80 rounded-full bg-lime/30 blur-3xl" />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-3">
          <Avatar name="Sofia Lopez" size={92} ring="lime" />
          <div className="size-12 rounded-full bg-lime grid place-items-center lime-glow">
            <Zap className="size-6 text-ink" fill="currentColor" />
          </div>
          <Avatar name="Marie Dupont" size={92} ring="lime" />
        </div>

        <h1 className="font-display font-extrabold text-5xl mt-10 leading-none">
          C'est un<br/><span className="text-lime">match !</span>
        </h1>
        <p className="text-background/70 mt-4 max-w-[28ch]">
          Marie et toi allez vous entraîner ensemble.
        </p>

        <div className="mt-8 w-full rounded-3xl bg-background/10 backdrop-blur p-5 border border-background/10 text-left">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-lime">SÉANCE CONFIRMÉE</p>
          <p className="font-display font-extrabold text-2xl mt-1">Yoga Vinyasa</p>
          <p className="text-sm text-background/70 mt-1">Demain · 19h · FitZone Belleville</p>
        </div>
      </div>

      <div className="relative space-y-3">
        <Link to="/chat/$id" params={{ id: "marie" }} className="flex items-center justify-center gap-2 pill bg-lime text-ink py-4 font-bold lime-glow">
          <MessageCircle className="size-4" /> Envoyer un message
        </Link>
        <button className="w-full flex items-center justify-center gap-2 pill border border-background/30 text-background py-4 font-semibold">
          <CalendarPlus className="size-4" /> Ajouter à mon agenda
        </button>
      </div>
    </main>
  );
}
