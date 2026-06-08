import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Flame, Trophy, Users, ChevronRight, Clock, MapPin, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/lib/store";
import { PARTNERS } from "@/data/mock";
import heroShapes from "@/assets/hero-shapes.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Accueil — ÉLAN" },
      { name: "description", content: "Ton dashboard sportif : prochaine séance, partenaires dispos et challenges du jour." },
    ],
  }),
  component: Home,
});

type DayItem = { date: Date; key: string; session?: Session };
type Session = { sport: string; with: string; time: string; place: string; tone: "lavender" | "peach" | "sky" };

const SCHEDULE: Record<string, Session> = {
  "+0": { sport: "Yoga Group", with: "Tiffany Way", time: "14:00–15:00", place: "Salle A5", tone: "peach" },
  "+1": { sport: "Running", with: "Léa Martin", time: "07:00–07:45", place: "Canal Saint-Martin", tone: "lavender" },
  "+3": { sport: "Balance", with: "Marie D.", time: "18:00–19:30", place: "Salle A2", tone: "sky" },
  "+5": { sport: "Boxe", with: "Adam B.", time: "19:00–20:00", place: "BoxLab Belleville", tone: "lavender" },
};

const DOW_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

function buildDays(): DayItem[] {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() + i);
    return { date: d, key: `+${i}`, session: SCHEDULE[`+${i}`] };
  });
}

function Home() {
  const [user] = useUser();
  const firstName = (user.prenom || "champion").split(" ")[0];
  const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  const days = useMemo(buildDays, []);
  const [activeKey, setActiveKey] = useState<string>("+0");
  const active = days.find((d) => d.key === activeKey)!;
  const nextSession = days.find((d) => d.session)!;
  const livePartners = useMemo(() => PARTNERS.filter((p) => p.online).slice(0, 6), []);

  const heroSession = active.session ?? nextSession.session!;
  const heroDate = active.session ? active.date : nextSession.date;
  const heroDayLabel = heroDate.toLocaleDateString("fr-FR", { weekday: "long" });
  const heroFullDate = heroDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <main className="min-h-[100dvh] pb-32 bg-surface">
      {/* Header */}
      <header className="px-5 pt-6 pb-2 grid grid-cols-[44px_1fr_44px] items-center gap-3">
        <Link to="/profile" aria-label="Mon profil" className="rounded-full">
          <Avatar name={user.prenom || "Toi"} size={44} ring="lavender" />
        </Link>
        <div className="text-center">
          <p className="font-display font-bold text-[17px] leading-tight">Hello, {firstName}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Aujourd'hui {today}</p>
        </div>
        <Link
          to="/explorer"
          aria-label="Rechercher"
          className="size-11 grid place-items-center rounded-full border border-border bg-surface"
        >
          <Search className="size-[18px]" strokeWidth={1.8} />
        </Link>
      </header>

      <div className="px-5 mt-4 space-y-5">
        {/* HERO — Prochaine séance (remplace Daily challenge) */}
        <Link
          to="/sessions"
          className="relative block overflow-hidden rounded-[28px] bg-gradient-to-br from-[#E9E1FF] via-lavender to-[#C9B8FF] p-6 min-h-[210px] soft-shadow active:scale-[0.99] transition-transform border border-white/60"
        >
          <div className="absolute -right-10 -top-12 size-44 rounded-full bg-white/40 blur-3xl float-slow" />
          <div className="absolute -left-12 -bottom-16 size-48 rounded-full bg-[#7C5CFF]/30 blur-3xl float-slow" style={{ animationDelay: "1.2s" }} />
          <div className="absolute inset-0 topo-dots opacity-25" />

          <div className="relative flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#7C5CFF] animate-pulse" />
            <p className="text-[10px] font-extrabold tracking-[0.22em] text-ink/70">PROCHAINE SÉANCE</p>
          </div>
          <h2 className="relative font-display font-extrabold text-[34px] leading-[0.95] text-ink tracking-tight mt-2">
            {nextSession.session!.sport}
          </h2>
          <div className="relative flex items-center gap-3 mt-3 text-[12px] text-ink/75 font-semibold">
            <span className="flex items-center gap-1"><Clock className="size-3" /> {nextSession.session!.time}</span>
            <span className="flex items-center gap-1"><MapPin className="size-3" /> {nextSession.session!.place}</span>
          </div>
          <div className="relative mt-4 flex items-center gap-2.5">
            <Avatar name={nextSession.session!.with} size={36} ring="lavender" />
            <div className="text-[12px] leading-tight">
              <p className="text-ink/60">Avec</p>
              <p className="font-bold text-ink">{nextSession.session!.with}</p>
            </div>
            <ChevronRight className="ml-auto size-5 text-ink/60" />
          </div>
          <img
            src={heroShapes}
            alt=""
            className="absolute -right-4 -bottom-4 w-[42%] max-w-[180px] object-contain pointer-events-none select-none opacity-95"
          />
        </Link>

        {/* Week calendar */}
        <div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1 snap-x snap-mandatory">
            {days.map((day) => {
              const isActive = day.key === activeKey;
              const hasSession = !!day.session;
              return (
                <button
                  key={day.key}
                  onClick={() => setActiveKey(day.key)}
                  className={`relative shrink-0 snap-start w-[48px] py-2 rounded-full border flex flex-col items-center justify-center transition-colors ${
                    isActive ? "bg-ink text-background border-ink" : "bg-surface text-ink border-border"
                  }`}
                >
                  {hasSession && (
                    <span className={`absolute top-1.5 size-1.5 rounded-full ${isActive ? "bg-background" : "bg-[#7C5CFF] animate-pulse"}`} />
                  )}
                  <span className={`text-[10px] font-semibold ${isActive ? "opacity-80" : "text-muted-foreground"}`}>
                    {DOW_FR[day.date.getDay()]}
                  </span>
                  <span className="text-[15px] font-display font-bold leading-none mt-1">{day.date.getDate()}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3">
            {active.session ? (
              <Link
                to="/sessions"
                className="block rounded-2xl bg-surface border border-border p-4 soft-shadow animate-in fade-in slide-in-from-top-1 duration-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                      {active.date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "short" })}
                    </p>
                    <p className="font-display font-bold text-[17px] leading-tight mt-1 truncate">{active.session.sport}</p>
                    <div className="mt-1.5 flex items-center gap-3 text-[12px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {active.session.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="size-3" /> {active.session.place}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Avatar name={active.session.with} size={36} ring="lavender" />
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl bg-surface border border-dashed border-border p-4 text-center animate-in fade-in duration-200">
                <p className="text-[13px] text-muted-foreground">
                  Aucune séance le {active.date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <Link to="/explorer" className="inline-flex items-center gap-1 mt-2 text-[12px] font-semibold text-ink">
                  Planifier une séance <ChevronRight className="size-3" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Disponibles maintenant — horizontal scroll */}
        <section>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display font-extrabold text-[24px] tracking-tight leading-none">Dispo maintenant</h3>
              <p className="text-[12px] text-muted-foreground mt-1 font-medium">Sportifs prêts à bouger près de toi</p>
            </div>
            <Link to="/results" className="text-[12px] font-bold text-[#7C5CFF] flex items-center gap-1">
              Voir tout <ChevronRight className="size-3" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 mt-3 snap-x snap-mandatory pb-2">
            {livePartners.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 snap-start w-[160px]"
              >
                <Link
                  to="/partner/$id"
                  params={{ id: p.id }}
                  className="block rounded-[22px] bg-surface border border-white/60 soft-shadow p-3 active:scale-[0.98] transition relative overflow-hidden"
                >
                  <div className="absolute -top-6 -right-6 size-20 rounded-full bg-lavender-soft/80 blur-2xl" />
                  <div className="relative flex items-center justify-between">
                    <div className="relative">
                      <Avatar name={p.name} size={48} ring="lavender" />
                      <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-surface" />
                    </div>
                    <span className="pill bg-[#7C5CFF] text-white text-[9px] font-bold px-2 py-0.5 flex items-center gap-1">
                      <Zap className="size-2.5 fill-current" /> LIVE
                    </span>
                  </div>
                  <p className="relative font-display font-extrabold text-[15px] leading-tight mt-3 text-ink truncate">
                    {p.name.split(" ")[0]}, {p.age}
                  </p>
                  <p className="relative text-[11px] font-semibold text-ink/70 mt-0.5">{p.sport}</p>
                  <div className="relative flex items-center gap-1 mt-2 text-[10px] text-muted-foreground font-semibold">
                    <MapPin className="size-2.5" /> {p.distanceKm} km
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section title */}
        <h3 className="font-display font-extrabold text-[24px] tracking-tight pt-1">Ton parcours</h3>

        <section className="grid grid-cols-2 gap-3">
          {/* Daily challenge (secondaire) */}
          <Link to="/explorer" className="rounded-[22px] bg-peach p-4 soft-shadow active:scale-[0.99] transition-transform relative overflow-hidden min-h-[150px] flex flex-col">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-ink" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-ink/70">Challenge</span>
            </div>
            <p className="font-display font-extrabold text-[20px] leading-tight mt-2 text-ink">Séance avant 9h</p>
            <div className="mt-auto inline-flex items-center gap-2 bg-white/40 backdrop-blur rounded-full pl-1 pr-3 py-1 w-fit">
              <div className="flex -space-x-2">
                <Avatar name="Marie D" size={20} />
                <Avatar name="Léa M" size={20} />
              </div>
              <span className="text-[10px] font-bold text-ink">+4</span>
            </div>
          </Link>

          <Link to="/stats" className="rounded-[22px] bg-ink text-background p-4 soft-shadow active:scale-[0.99] transition-transform relative overflow-hidden">
            <div className="size-8 rounded-full grid place-items-center bg-[#7C5CFF] text-white mb-2">
              <Trophy className="size-4" strokeWidth={2.2} />
            </div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-background/60">Séances</p>
            <p className="font-display font-extrabold text-[32px] leading-none mt-1">42</p>
            <p className="text-[10px] text-background/60 mt-1">+3 cette semaine</p>
          </Link>

          <Link to="/profile" className="col-span-2 rounded-[22px] bg-lavender-soft p-4 soft-shadow active:scale-[0.99] transition-transform relative overflow-hidden flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-white/70 backdrop-blur grid place-items-center">
              <Flame className="size-5 text-[#7C5CFF]" strokeWidth={2.2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-bold text-ink/70">Streak</p>
              <p className="font-display font-extrabold text-[24px] leading-none mt-0.5 text-ink">
                7<span className="text-base font-bold text-ink/60"> jours d'affilée</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 pill bg-white/60 px-3 py-1.5">
              <Users className="size-3 text-ink" strokeWidth={2.2} />
              <span className="text-[11px] font-bold text-ink">14</span>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
