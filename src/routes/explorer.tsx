import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { X, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Pill } from "@/components/Pill";
import { MobileHeader } from "@/components/MobileHeader";

export const Route = createFileRoute("/explorer")({
  head: () => ({ meta: [{ title: "Nouvelle séance — ÉLAN" }] }),
  component: Explorer,
});

const SPORTS_PILLS = ["Yoga", "Running", "Boxe", "Pilates", "Padel", "CrossFit"];
const DURATIONS = ["20 min", "30 min", "45 min", "1h", "1h30", "2h+"];
const QUICK_TIMES = ["Maintenant", "Aujourd'hui", "Demain", "Choisir…"];

function Explorer() {
  const [sport, setSport] = useState("Yoga");
  const [when, setWhen] = useState("Demain");
  const [duration, setDuration] = useState("45 min");
  const [radius, setRadius] = useState(5);
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState("Tous");
  const [gender, setGender] = useState("Peu importe");

  return (
    <main className="min-h-[100dvh] pb-40 bg-background">
      <MobileHeader
        title="Nouvelle séance"
        right={
          <Link to="/home" aria-label="Fermer" className="size-10 grid place-items-center rounded-full bg-surface border border-border">
            <X className="size-5" />
          </Link>
        }
      />

      <div className="px-5 space-y-7 mt-2">
        {/* Sport */}
        <section>
          <Label>Quel sport ?</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {SPORTS_PILLS.map((s) => (
              <button key={s} onClick={() => setSport(s)}
                className={`pill text-sm font-semibold px-4 py-2.5 border transition ${
                  s === sport ? "bg-lime text-ink border-ink" : "bg-surface text-ink border-border"
                }`}>{s}</button>
            ))}
          </div>
        </section>

        {/* Quand */}
        <section>
          <Label>Quand ?</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {QUICK_TIMES.map((t) => (
              <button key={t} onClick={() => setWhen(t)}
                className={`pill text-sm font-semibold px-4 py-2.5 border transition ${
                  t === when ? "bg-ink text-background border-ink" : "bg-surface text-ink border-border"
                }`}>{t}</button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 mb-2 font-semibold">Durée</p>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <button key={d} onClick={() => setDuration(d)}
                className={`pill text-xs font-semibold px-3.5 py-2 border transition ${
                  d === duration ? "bg-lavender text-ink border-ink" : "bg-surface text-ink border-border"
                }`}>{d}</button>
            ))}
          </div>
        </section>

        {/* Où */}
        <section>
          <Label>Où ?</Label>
          <div className="relative mt-3">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              defaultValue="Paris 11e"
              className="w-full h-14 pl-12 pr-5 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none text-base font-medium"
            />
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">Dans un rayon de</p>
              <Pill tone="lime" size="sm">{radius} km</Pill>
            </div>
            <input
              type="range" min={1} max={20} value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full mt-3 accent-ink"
            />
          </div>
        </section>

        {/* Filtres */}
        <section className="rounded-2xl bg-surface border border-border">
          <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4">
            <span className="font-semibold text-ink">Filtres</span>
            {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {open && (
            <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">Niveau</p>
                <div className="flex flex-wrap gap-2">
                  {["Tous", "Débutant", "Intermédiaire", "Avancé"].map((l) => (
                    <button key={l} onClick={() => setLevel(l)}
                      className={`pill text-xs font-semibold px-3 py-1.5 border ${l === level ? "bg-ink text-background border-ink" : "bg-background text-ink border-border"}`}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">Genre préféré</p>
                <div className="flex flex-wrap gap-2">
                  {["Peu importe", "Femme", "Homme"].map((g) => (
                    <button key={g} onClick={() => setGender(g)}
                      className={`pill text-xs font-semibold px-3 py-1.5 border ${g === gender ? "bg-ink text-background border-ink" : "bg-background text-ink border-border"}`}>{g}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="fixed bottom-0 inset-x-0 px-5 pb-28 pt-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <div className="max-w-[430px] mx-auto pointer-events-auto">
          <Link to="/results" className="w-full pill bg-lime text-ink py-4 font-bold flex items-center justify-center lime-glow">
            Chercher des partenaires
          </Link>
        </div>
      </div>
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-display font-bold text-[20px] tracking-tight">{children}</p>;
}
