import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Zap, MessageCircle, CalendarPlus, X, Home as HomeIcon } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/lib/store";
import { downloadIcs } from "@/lib/ics";
import { toast } from "sonner";

export const Route = createFileRoute("/match")({
  head: () => ({ meta: [{ title: "C'est un match ! — ÉLAN" }] }),
  component: Match,
});

const CONFETTI = Array.from({ length: 24 });

function Match() {
  const [user] = useUser();
  const nav = useNavigate();
  const partnerName = "Marie Dupont";
  const session = { title: "Yoga Vinyasa", when: "Demain · 19h · FitZone Belleville", duration: 60 };

  const addToCalendar = () => {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(19, 0, 0, 0);
    downloadIcs({
      title: `ÉLAN · ${session.title} avec ${partnerName.split(" ")[0]}`,
      description: `Séance ${session.title} organisée via ÉLAN.`,
      location: "FitZone Belleville",
      start,
      durationMinutes: session.duration,
    });
    toast.success("Séance ajoutée à ton agenda 📅");
  };

  return (
    <main className="relative min-h-[100dvh] bg-ink text-background overflow-hidden flex flex-col px-6 py-6">
      {/* Close */}
      <button
        onClick={() => nav({ to: "/home" })}
        aria-label="Fermer"
        className="absolute top-5 right-5 z-10 size-10 grid place-items-center rounded-full glass-ink text-background"
      >
        <X className="size-5" />
      </button>

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

      <div className="relative flex-1 flex flex-col items-center justify-center text-center pt-10">
        <div className="flex items-center gap-3">
          <Avatar name={user.prenom || "Toi"} size={92} ring="lime" />
          <div className="size-12 rounded-full bg-lime grid place-items-center lime-glow">
            <Zap className="size-6 text-ink" fill="currentColor" />
          </div>
          <Avatar name={partnerName} size={92} ring="lime" />
        </div>

        <h1 className="font-display font-extrabold text-5xl mt-10 leading-none">
          C'est un<br/><span className="text-lime">match !</span>
        </h1>
        <p className="text-background/70 mt-4 max-w-[28ch]">
          {partnerName.split(" ")[0]} et toi allez vous entraîner ensemble.
        </p>

        <div className="mt-8 w-full glass-ink rounded-3xl p-5 text-left">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-lime">SÉANCE CONFIRMÉE</p>
          <p className="font-display font-extrabold text-2xl mt-1">{session.title}</p>
          <p className="text-sm text-background/70 mt-1">{session.when}</p>
        </div>
      </div>

      <div className="relative space-y-3 pb-2">
        <Link to="/chat/$id" params={{ id: "marie" }} className="flex items-center justify-center gap-2 pill bg-lime text-ink py-4 font-bold lime-glow">
          <MessageCircle className="size-4" /> Envoyer un message
        </Link>
        <button onClick={addToCalendar} className="w-full flex items-center justify-center gap-2 pill glass-ink text-background py-4 font-semibold">
          <CalendarPlus className="size-4" /> Ajouter à mon agenda
        </button>
        <button onClick={() => nav({ to: "/home" })} className="w-full flex items-center justify-center gap-2 text-background/70 py-2 text-sm font-semibold">
          <HomeIcon className="size-4" /> Retour à l'accueil
        </button>
      </div>
    </main>
  );
}
