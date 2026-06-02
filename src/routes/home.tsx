import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Flame, Trophy, Users, ChevronRight, X, Clock, MapPin } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/lib/store";
import heroShapes from "@/assets/hero-shapes.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Accueil — ÉLAN" },
      { name: "description", content: "Ton dashboard sportif : challenge du jour, planning et partenaires." },
    ],
  }),
  component: Home,
});

// Génère 14 jours à partir d'aujourd'hui pour un calendrier scrollable
type DayItem = { date: Date; key: string; session?: Session };
type Session = { sport: string; with: string; time: string; place: string; tone: "lavender" | "peach" | "sky" };

const SCHEDULE: Record<string, Session> = {
  // offsets en jours depuis aujourd'hui
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

  return (
    <main className="min-h-[100dvh] pb-32 bg-surface">
      {/* Header */}
      <header className="px-5 pt-6 pb-2 grid grid-cols-[44px_1fr_44px] items-center gap-3">
        <Avatar name={user.prenom || "Toi"} size={44} ring="lavender" />
        <div className="text-center">
          <p className="font-display font-bold text-[17px] leading-tight">Hello, {firstName}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Aujourd'hui {today}</p>
        </div>
        <Link
          to="/results"
          aria-label="Rechercher"
          className="size-11 grid place-items-center rounded-full border border-border bg-surface"
        >
          <Search className="size-[18px]" strokeWidth={1.8} />
        </Link>
      </header>

      <div className="px-5 mt-4 space-y-5">
        {/* Hero — Daily challenge */}
        <Link
          to="/explorer"
          className="relative block overflow-hidden rounded-[28px] bg-lavender p-6 pr-3 min-h-[200px] soft-shadow active:scale-[0.99] transition-transform"
        >
          <h2 className="font-display font-extrabold text-[40px] leading-[0.95] text-ink tracking-tight">
            Daily<br />challenge
          </h2>
          <p className="text-[13px] text-ink/75 mt-2 font-medium">
            Fais ta séance avant 09:00
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-lavender-soft/70 rounded-full pl-1 pr-3 py-1">
            <div className="flex -space-x-2">
              <Avatar name="Marie D" size={24} />
              <Avatar name="Léa M" size={24} />
              <Avatar name="Adam B" size={24} />
            </div>
            <span className="text-[11px] font-bold text-ink">+4</span>
          </div>
          <img
            src={heroShapes}
            alt=""
            width={768}
            height={768}
            className="absolute -right-2 -top-4 w-[58%] max-w-[230px] object-contain pointer-events-none select-none"
          />
        </Link>

        {/* Week calendar — scrollable + cliquable, popover sous le calendrier */}
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
                    isActive
                      ? "bg-ink text-background border-ink"
                      : "bg-surface text-ink border-border"
                  }`}
                  aria-label={day.date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                >
                  {hasSession && (
                    <span
                      className={`absolute top-1.5 size-1.5 rounded-full ${isActive ? "bg-background" : "bg-lime animate-pulse"}`}
                      aria-label="Séance planifiée"
                    />
                  )}
                  <span className={`text-[10px] font-semibold ${isActive ? "opacity-80" : "text-muted-foreground"}`}>
                    {DOW_FR[day.date.getDay()]}
                  </span>
                  <span className="text-[15px] font-display font-bold leading-none mt-1">{day.date.getDate()}</span>
                </button>
              );
            })}
          </div>

          {/* Popover du jour sélectionné */}
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

        {/* Section title */}
        <h3 className="font-display font-extrabold text-[28px] tracking-tight pt-1">Ton planning</h3>

        {/* Plan grid : prochaine séance + stats clés */}
        <section className="grid grid-cols-2 gap-3">
          {/* Prochaine séance — grande carte gauche */}
          <Link
            to="/sessions"
            className="row-span-2 rounded-[26px] bg-peach p-5 flex flex-col soft-shadow active:scale-[0.99] transition-transform relative overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-ink/60">Prochaine</span>
              <span className="size-1.5 rounded-full bg-ink/40" />
              <span className="text-[10px] font-bold uppercase text-ink/60">
                {nextSession.date.toLocaleDateString("fr-FR", { weekday: "short" })}
              </span>
            </div>
            <h4 className="font-display font-extrabold text-[26px] leading-tight mt-3 text-ink">
              {nextSession.session!.sport}
            </h4>
            <div className="mt-3 text-[13px] text-ink/80 space-y-0.5 font-medium">
              <p>{nextSession.date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</p>
              <p>{nextSession.session!.time}</p>
              <p>{nextSession.session!.place}</p>
            </div>
            <div className="mt-auto pt-5 flex items-center gap-3">
              <Avatar name={nextSession.session!.with} size={36} ring="lavender" />
              <div className="text-[12px] leading-tight">
                <p className="text-ink/60">Avec</p>
                <p className="font-bold text-ink">{nextSession.session!.with}</p>
              </div>
            </div>
          </Link>

          {/* Stat — Séances totales (remplace la carte bleue) */}
          <Link to="/stats" className="rounded-[26px] bg-ink text-background p-5 soft-shadow active:scale-[0.99] transition-transform relative overflow-hidden">
            <div className="size-9 rounded-full grid place-items-center bg-lime text-ink mb-3">
              <Trophy className="size-4" strokeWidth={2.2} />
            </div>
            <p className="text-[11px] uppercase tracking-wider font-bold text-background/60">Séances</p>
            <p className="font-display font-extrabold text-[36px] leading-none mt-1">42</p>
            <p className="text-[11px] text-background/60 mt-1">+3 cette semaine</p>
          </Link>

          {/* Stat — Streak + Partenaires (remplace la carte sociale) */}
          <Link to="/profile" className="rounded-[26px] bg-lavender-soft p-5 soft-shadow active:scale-[0.99] transition-transform relative overflow-hidden">
            <div className="flex items-center gap-1">
              <Flame className="size-4 text-ink" strokeWidth={2.2} />
              <span className="text-[11px] uppercase tracking-wider font-bold text-ink/70">Streak</span>
            </div>
            <p className="font-display font-extrabold text-[32px] leading-none mt-1 text-ink">7<span className="text-base font-bold text-ink/60"> jours</span></p>
            <div className="mt-3 pt-3 border-t border-ink/10 flex items-center gap-2">
              <Users className="size-3.5 text-ink/70" strokeWidth={2.2} />
              <span className="text-[12px] font-semibold text-ink">14 partenaires</span>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
