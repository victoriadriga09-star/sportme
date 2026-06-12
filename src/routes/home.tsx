import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Music2, Dumbbell, CalendarDays, ChevronRight, Clock, MapPin, Zap, CheckCircle2, XCircle, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/Avatar";
import { CatPeek } from "@/components/CatPeek";
import { LocationShareDialog } from "@/components/LocationShareDialog";
import { useUser } from "@/lib/store";
import { PARTNERS } from "@/data/mock";
import { countThisMonth, type SessionStatus } from "@/data/sessions";

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
  const [shareOpen, setShareOpen] = useState(false);
  const firstName = (user.prenom || "champion").split(" ")[0];
  const [today, setToday] = useState<string>("");
  useEffect(() => { setToday(new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short" })); }, []);

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
      <header className="px-5 pt-6 pb-2 grid grid-cols-[44px_1fr_auto] items-center gap-3">
        <Link to="/profile" aria-label="Mon profil" className="rounded-full">
          <Avatar name={user.prenom || "Toi"} size={44} ring="lavender" />
        </Link>
        <div className="text-center">
          <p className="font-display font-bold text-[17px] leading-tight">Hello, {firstName}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Aujourd'hui {today}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShareOpen(true)}
            aria-label="Partager ma position"
            className="size-11 grid place-items-center rounded-full border border-border bg-lavender-soft text-[#7C5CFF] active:scale-95 transition"
          >
            <MapPin className="size-[18px]" strokeWidth={2} />
          </button>
          <Link
            to="/explorer"
            aria-label="Rechercher"
            className="size-11 grid place-items-center rounded-full border border-border bg-surface"
          >
            <Search className="size-[18px]" strokeWidth={1.8} />
          </Link>
        </div>
      </header>

      <div className="px-5 mt-4 space-y-5">
        {/* HERO — Prochaine séance (remplace Daily challenge) */}
        {/* HERO — Séance du jour sélectionné */}
        {heroSession ? (
          <Link
            to="/sessions"
            className="relative block overflow-hidden rounded-[28px] bg-gradient-to-br from-[#E9E1FF] via-lavender to-[#C9B8FF] p-6 min-h-[220px] soft-shadow active:scale-[0.99] transition-transform border border-white/60"
          >
            
            <CatPeek tone="black" corner="br" size={130} delay={0.2} />

            <div className="relative flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#7C5CFF] animate-pulse" />
              <p className="text-[11px] font-extrabold tracking-[0.22em] text-ink/70 uppercase" suppressHydrationWarning>
                {active.session ? "Séance" : "Prochaine séance"} · {heroDayLabel}
              </p>
            </div>
            <motion.h2
              key={heroSession.sport + heroDate.toISOString()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative font-display font-extrabold text-[34px] leading-[0.95] text-ink tracking-tight mt-2"
            >
              {heroSession.sport}
            </motion.h2>
            <div className="relative flex items-center gap-3 mt-3 text-[12px] text-ink/75 font-semibold">
              <span className="flex items-center gap-1"><Clock className="size-3" /> {heroSession.time}</span>
              <span className="flex items-center gap-1"><MapPin className="size-3" /> {heroSession.place}</span>
            </div>
            <div className="relative mt-4 flex items-center gap-2.5">
              <Avatar name={heroSession.with} size={36} ring="lavender" />
              <div className="text-[12px] leading-tight">
                <p className="text-ink/60">Avec</p>
                <p className="font-bold text-ink">{heroSession.with}</p>
              </div>
              <ChevronRight className="ml-auto size-5 text-ink/60" />
            </div>
          </Link>

        ) : null}

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
                  <span className={`text-[10px] font-semibold ${isActive ? "opacity-80" : "text-muted-foreground"}`} suppressHydrationWarning>
                    {DOW_FR[day.date.getDay()]}
                  </span>
                  <span className="text-[15px] font-display font-bold leading-none mt-1" suppressHydrationWarning>{day.date.getDate()}</span>
                </button>
              );
            })}
          </div>

          {!active.session && (
            <p className="text-[12px] text-muted-foreground text-center mt-3 font-medium">
              Aucune séance le {heroFullDate}
            </p>
          )}

          {/* Quick actions — 3 distinct features */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              { to: "/melody" as const, label: "Music", Icon: Music2, bg: "bg-lavender-soft", fg: "text-[#7C5CFF]" },
              { to: "/sports" as const, label: "Sports", Icon: BookOpen, bg: "bg-lime/40", fg: "text-ink" },
              { to: "/agenda" as const, label: "Agenda", Icon: CalendarDays, bg: "bg-peach", fg: "text-ink" },
            ].map(({ to, label, Icon, bg, fg }) => (
              <Link
                key={label}
                to={to}
                className="flex flex-col items-center gap-2 p-3 rounded-[20px] bg-surface border border-border/70 active:scale-[0.96] transition"
              >
                <span className={`size-12 grid place-items-center rounded-2xl ${bg} ${fg}`}>
                  <Icon className="size-5" strokeWidth={2.2} />
                </span>
                <span className="text-[12px] font-bold text-ink">{label}</span>
              </Link>
            ))}
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

        {/* Stats du mois */}
        <h3 className="font-display font-extrabold text-[24px] tracking-tight pt-1">Ton mois</h3>
        <section className="grid grid-cols-3 gap-2.5">
          {[
            { to: "/sessions" as const, status: "done"      as const, label: "Complétées", Icon: CheckCircle2,  tile: "bg-peach text-ink",                 iconBg: "bg-white/70",     iconFg: "text-[#C2410C]", numFg: "text-[#9A3412]" },
            { to: "/sessions" as const, status: "planned"   as const, label: "Planifiées", Icon: CalendarClock, tile: "bg-[#C9B8FF] text-ink",             iconBg: "bg-white/60",     iconFg: "text-[#4C3BCF]", numFg: "text-[#1A1A1A]" },
            { to: "/sessions" as const, status: "cancelled" as const, label: "Annulées",   Icon: XCircle,       tile: "bg-[#1A1A1A] text-background",      iconBg: "bg-peach",        iconFg: "text-ink",       numFg: "text-peach" },
          ].map(({ to, status, label, Icon, tile, iconBg, iconFg, numFg }) => (
            <Link
              key={label}
              to={to}
              search={{ status }}
              className={`rounded-[20px] p-3.5 active:scale-[0.97] transition relative flex flex-col items-center text-center ${tile}`}
            >
              <span className={`size-9 grid place-items-center rounded-xl ${iconBg} ${iconFg} mb-2`}>
                <Icon className="size-4" strokeWidth={2.2} />
              </span>
              <ClientCount status={status} className={`font-display font-extrabold text-[28px] leading-none ${numFg}`} />
              <p className="text-[11px] font-bold mt-1 opacity-70">{label}</p>
            </Link>
          ))}
        </section>


      </div>

      <LocationShareDialog open={shareOpen} onClose={() => setShareOpen(false)} />
    </main>
  );
}

/** Avoids SSR/CSR mismatch since countThisMonth depends on the current date. */
function ClientCount({ status, className }: { status: SessionStatus; className?: string }) {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => { setN(countThisMonth(status)); }, [status]);
  return (
    <p className={className ?? "font-display font-extrabold text-[28px] leading-none text-ink"}>
      {n ?? "—"}
    </p>
  );
}

