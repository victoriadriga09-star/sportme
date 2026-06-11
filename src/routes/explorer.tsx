import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { X, MapPin, ChevronDown, ChevronUp, Star, Pencil, Video, Users, CalendarIcon, Zap, Plus } from "lucide-react";
import { TimeWheel } from "@/components/TimeWheel";
import { CatPeek } from "@/components/CatPeek";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AnimatePresence } from "framer-motion";
import { Pill } from "@/components/Pill";
import { MobileHeader } from "@/components/MobileHeader";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SearchWaves } from "@/components/SearchWaves";
import { SportPicker } from "@/components/SportPicker";
import { useFilters, useUser } from "@/lib/store";
import { SPORTS } from "@/data/mock";

export const Route = createFileRoute("/explorer")({
  head: () => ({ meta: [{ title: "Nouvelle séance — ÉLAN" }] }),
  component: Explorer,
});

const TOP_SPORTS = ["Running", "Yoga", "Boxe", "Pilates", "Padel"];
const DURATIONS = ["20 min", "30 min", "45 min", "1h", "1h30", "2h+"];
const QUICK_TIMES = ["Maintenant", "Aujourd'hui", "Demain"];

function Explorer() {
  const nav = useNavigate();
  const [user] = useUser();
  const [f, setF] = useFilters();
  const [open, setOpen] = useState(false);
  const [customDur, setCustomDur] = useState(false);
  const [pickedDate, setPickedDate] = useState<Date | undefined>();
  const [dateOpen, setDateOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [extraSports, setExtraSports] = useState<string[]>([]);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));

  const sportTiles = useMemo(() => {
    const base = TOP_SPORTS.map((label) => SPORTS.find((s) => s.label === label)!).filter(Boolean);
    const extras = extraSports.map((label) => SPORTS.find((s) => s.label === label)).filter(Boolean) as typeof base;
    return [...base, ...extras];
  }, [extraSports]);

  const launchSearch = () => {
    setSearching(true);
    setTimeout(() => nav({ to: "/results" }), 1700);
  };

  return (
    <main className="min-h-[100dvh] pb-56 bg-background">
      <MobileHeader
        title="Nouvelle séance"
        right={
          <Link to="/home" aria-label="Fermer" className="size-10 grid place-items-center rounded-full glass border border-white/50">
            <X className="size-5" />
          </Link>
        }
      />

      <div className="px-5 space-y-7 mt-2">
        {/* Intro hero — clean lavender card, black peeking cat (same as home) */}
        <section className="relative overflow-hidden rounded-[32px] p-6 bg-gradient-to-br from-[#E9E1FF] via-lavender-soft to-[#F4EEFF] border border-white/70 soft-shadow">
          <div className="absolute inset-0 topo-dots opacity-25" />

          <CatPeek tone="black" corner="br" size={120} delay={0.15} />

          <div className="relative max-w-[78%]">
            <h2 className="font-display font-extrabold text-[32px] leading-[0.95] text-ink tracking-[-0.02em] uppercase">
              Salut {user.prenom || "toi"}
            </h2>
            <h3 className="font-display font-extrabold text-[22px] leading-[1.05] mt-3 text-ink tracking-tight">
              Trouve ton{" "}
              <span className="font-display font-extrabold uppercase tracking-[0.04em] text-[#5B3FD1]">
                partenaire
              </span>{" "}
              idéal
            </h3>
            <p className="text-[12px] text-ink/70 mt-2 leading-snug font-medium">
              Sport, créneau, zone. On te trouve les sportifs dispo près de toi.
            </p>
          </div>
        </section>



        {/* Sport — grid of tiles */}
        <section>
          <Label>Quel sport ?</Label>
          <div className="grid grid-cols-3 gap-2.5 mt-3">
            {sportTiles.map((s) => {
              const active = s.label === f.sport;
              return (
                <button key={s.label} onClick={() => set("sport", s.label)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 border transition active:scale-[0.97] ${
                    active ? "bg-lime border-ink text-ink shadow-lg" : "bg-surface border-border text-ink"
                  }`}>
                  <span className="text-3xl">{s.emoji}</span>
                  <span className="text-[12px] font-bold leading-none text-center px-1">{s.label}</span>
                </button>
              );
            })}
            <button onClick={() => setPickerOpen(true)}
              className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 border border-dashed border-ink/30 bg-surface/60 text-ink/70 active:scale-[0.97] transition">
              <Plus className="size-6" strokeWidth={2.2} />
              <span className="text-[12px] font-bold leading-none">Autre</span>
            </button>
          </div>
        </section>

        {/* Quand */}
        <section>
          <Label>Quand ?</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {QUICK_TIMES.map((t) => (
              <button key={t} onClick={() => { set("when", t); setPickedDate(undefined); }}
                className={`pill text-sm font-semibold px-4 py-2.5 border transition ${
                  t === f.when && !pickedDate ? "bg-ink text-background border-ink" : "bg-surface text-ink border-border"
                }`}>{t}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <button
                  className={`h-12 px-4 rounded-2xl border transition flex items-center gap-2 text-sm font-semibold ${
                    pickedDate ? "bg-ink text-background border-ink" : "bg-surface text-ink border-border"
                  }`}
                >
                  <CalendarIcon className="size-4" />
                  {pickedDate ? format(pickedDate, "EEE d MMM", { locale: fr }) : "Date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={pickedDate}
                  onSelect={(d) => { if (d) { setPickedDate(d); set("when", format(d, "EEE d MMM", { locale: fr })); setDateOpen(false); } }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
            <div className={`h-12 px-3 rounded-2xl border flex items-center gap-2 text-sm font-semibold transition ${
              f.whenTime ? "bg-ink text-background border-ink" : "bg-surface text-ink border-border"
            }`}>
              <ClockIcon className="size-4" />
              <input type="time" value={f.whenTime ?? ""} onChange={(e) => set("whenTime", e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm font-semibold"/>
            </div>
          </div>
        </section>

        {/* Durée */}
        <section>
          <Label>Durée</Label>
          <div className="flex items-center justify-end mt-3 mb-2">
            <button
              onClick={() => setCustomDur((v) => !v)}
              className={`pill text-[11px] font-semibold px-3 py-1.5 border flex items-center gap-1 ${customDur ? "bg-ink text-background border-ink" : "bg-surface text-ink border-border"}`}
            >
              <Pencil className="size-3" /> Choisir
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <button key={d} onClick={() => { set("duration", d); set("durationCustom", undefined); setCustomDur(false); }}
                className={`pill text-xs font-semibold px-3.5 py-2 border transition ${
                  d === f.duration && !f.durationCustom ? "bg-lavender text-ink border-ink" : "bg-surface text-ink border-border"
                }`}>{d}</button>
            ))}
          </div>
          {customDur && (
            <div className="mt-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <input
                type="text"
                inputMode="numeric"
                value={f.durationCustom ?? ""}
                onChange={(e) => set("durationCustom", e.target.value)}
                placeholder="Ex : 75"
                className="flex-1 h-12 px-4 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none text-sm font-medium"
              />
              <span className="text-sm text-muted-foreground font-semibold">min</span>
            </div>
          )}
        </section>

        {/* Où */}
        <section>
          <Label>Où ?</Label>
          <div className="relative mt-3">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              value={f.city}
              onChange={(e) => set("city", e.target.value)}
              className="w-full h-14 pl-12 pr-5 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none text-base font-medium"
            />
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">Dans un rayon de</p>
              <Pill tone="lime" size="sm">{f.radius} km</Pill>
            </div>
            <input
              type="range" min={1} max={20} value={f.radius}
              onChange={(e) => set("radius", Number(e.target.value))}
              className="w-full mt-3 accent-ink"
            />
          </div>
        </section>

        {/* Filtres */}
        <section className="rounded-2xl bg-surface border border-border">
          <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4">
            <span className="font-semibold text-ink">Filtres avancés</span>
            {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {open && (
            <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">Type d'entraînement</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { v: "Tous",        icon: <Sparkles className="size-3.5" /> },
                    { v: "Présentiel",  icon: <Users    className="size-3.5" /> },
                    { v: "Visio",       icon: <Video    className="size-3.5" /> },
                  ] as const).map((m) => (
                    <button key={m.v} onClick={() => set("mode", m.v)}
                      className={`pill text-xs font-semibold px-3 py-2 border flex items-center justify-center gap-1.5 ${m.v === f.mode ? "bg-ink text-background border-ink" : "bg-background text-ink border-border"}`}>
                      {m.icon} {m.v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">Niveau</p>
                <div className="flex flex-wrap gap-2">
                  {["Tous", "Débutant", "Intermédiaire", "Avancé"].map((l) => (
                    <button key={l} onClick={() => set("level", l)}
                      className={`pill text-xs font-semibold px-3 py-1.5 border ${l === f.level ? "bg-ink text-background border-ink" : "bg-background text-ink border-border"}`}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">Genre préféré</p>
                <div className="flex flex-wrap gap-2">
                  {["Peu importe", "Femme", "Homme", "Non-binaire"].map((g) => (
                    <button key={g} onClick={() => set("gender", g)}
                      className={`pill text-xs font-semibold px-3 py-1.5 border ${g === f.gender ? "bg-ink text-background border-ink" : "bg-background text-ink border-border"}`}>{g}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="fixed bottom-0 inset-x-0 px-5 pb-24 pt-6 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
        <div className="max-w-[430px] mx-auto pointer-events-auto">
          <button
            onClick={launchSearch}
            disabled={searching}
            className="w-full pill bg-[#7C5CFF] text-white py-4 font-bold flex items-center justify-center gap-2 violet-glow shadow-lg active:scale-[0.99] transition"
          >
            <Zap className="size-4 fill-current" /> Chercher des partenaires
          </button>
        </div>
      </div>

      <AnimatePresence>{searching && <SearchWaves />}</AnimatePresence>
      <SportPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        current={[...TOP_SPORTS, ...extraSports]}
        onAdd={(s) => { setExtraSports((p) => [...p, s]); set("sport", s); setPickerOpen(false); }}
      />
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-display font-bold text-[20px] tracking-tight">{children}</p>;
}
