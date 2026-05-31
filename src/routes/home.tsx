import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell, Zap, Heart, Clock, MapPin, ChevronRight, Flame, Sparkles, ArrowUpRight,
} from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";
import { PARTNERS, POSTS } from "@/data/mock";
import { useUser } from "@/lib/store";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Accueil — ÉLAN" },
      { name: "description", content: "Ton dashboard sportif quotidien : prochaine séance, partenaires dispo et activité." },
    ],
  }),
  component: Home,
});

function Home() {
  const [user] = useUser();
  const firstName = (user.prenom || "champion").split(" ")[0];
  return (
    <main className="min-h-[100dvh] pb-32">
      {/* Header */}
      <header className="px-5 pt-5 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={user.prenom || "Toi"} size={44} ring="lime" />
          <div>
            <p className="text-xs text-muted-foreground leading-none">Bonsoir,</p>
            <p className="font-display font-bold text-lg leading-tight mt-1">{firstName}</p>
          </div>
        </div>
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="relative size-11 grid place-items-center rounded-full glass border border-white/50"
        >
          <Bell className="size-5" strokeWidth={1.8} />
          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Link>
      </header>

      <div className="px-5 mt-3 space-y-5">
        {/* Hero card — Daily challenge style */}
        <section className="relative overflow-hidden rounded-[28px] bg-lavender p-6 soft-shadow">
          <div className="absolute -right-8 -bottom-8 size-48 rounded-full bg-lime/40 blur-3xl" />
          <div className="absolute top-4 right-4 flex -space-x-2">
            <Avatar name="Marie D" size={28} />
            <Avatar name="Léa M" size={28} />
            <Avatar name="Adam B" size={28} />
            <span className="size-7 rounded-full bg-ink text-background text-[10px] grid place-items-center font-bold">+4</span>
          </div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-ink/70">PROCHAINE SÉANCE</p>
          <h2 className="font-display font-extrabold text-[34px] leading-[0.95] mt-2 text-ink">
            Yoga<br/>Vinyasa
          </h2>
          <p className="text-sm text-ink/70 mt-3">Demain · 19h00 · 45 min</p>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar name="Marie Dupont" size={36} ring="lime" />
              <div className="text-xs text-ink">
                <p className="font-semibold leading-none">Marie · 28</p>
                <p className="opacity-70 mt-1 flex items-center gap-1">
                  <MapPin className="size-3" /> FitZone · 1.2 km
                </p>
              </div>
            </div>
            <button className="pill bg-ink text-background text-xs font-semibold pl-4 pr-3 py-2.5 flex items-center gap-1.5">
              Détails <ChevronRight className="size-3.5" />
            </button>
          </div>
        </section>

        {/* Wordmark + claim */}
        <section className="flex items-end justify-between pt-1">
          <h1 className="font-display font-extrabold text-[26px] leading-[1] tracking-tight">
            Bouge. <span className="text-muted-foreground">Ensemble.</span>
          </h1>
          <span className="font-display font-bold text-xs text-muted-foreground tracking-[0.2em]">ÉLAN</span>
        </section>

        {/* Quick actions */}
        <section className="grid grid-cols-4 gap-3">
          <QuickAction to="/explorer" icon={<Zap className="size-5" />} label="Séance" accent />
          <QuickAction to="/partners" icon={<Heart className="size-5" />} label="Favoris" />
          <QuickAction to="/social" icon={<Sparkles className="size-5" />} label="Commu" />
          <QuickAction to="/sessions" icon={<Clock className="size-5" />} label="Histo." />
        </section>

        {/* Partenaires suggérés */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-[18px]">Dispo près de toi</h3>
            <Link to="/explorer" className="text-xs font-semibold text-muted-foreground flex items-center gap-0.5">
              Voir tout <ChevronRight className="size-3" />
            </Link>
          </div>
          <div className="-mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar">
            {PARTNERS.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                to="/partner/$id"
                params={{ id: p.id }}
                className="snap-start shrink-0 w-[170px] rounded-3xl bg-surface border border-border p-4 soft-shadow active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <Avatar name={p.name} size={48} ring={p.online ? "lime" : "none"} />
                  {p.online && <span className="text-[10px] font-semibold text-emerald-600 pill bg-emerald-50 px-2 py-0.5 border border-emerald-100">●&nbsp;Live</span>}
                </div>
                <p className="font-display font-bold text-[15px] leading-tight">{p.name.split(" ")[0]}, {p.age}</p>
                <Pill tone={p.tone} size="sm" className="mt-2">{p.sport}</Pill>
                <div className="mt-3 space-y-1 text-[11px] text-muted-foreground">
                  <p className="flex items-center gap-1"><MapPin className="size-3" /> {p.distanceKm} km</p>
                  <p className="flex items-center gap-1 text-ink font-semibold">{p.when}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="rounded-[28px] bg-ink text-background p-6 ink-shadow">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-bold text-lg">Ton parcours</h3>
            <span className="text-[10px] font-semibold tracking-widest text-background/60">CE MOIS</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Stat value="12" label="Séances" />
            <Stat value="07" label="Partenaires" />
            <Stat value="04" label="Streak" icon={<Flame className="size-4 text-orange-400" />} />
          </div>
          <Link
            to="/stats"
            className="mt-5 flex items-center justify-between bg-background/10 rounded-2xl px-4 py-3"
          >
            <p className="text-sm flex items-center gap-2">
              <Sparkles className="size-4 text-lime" />
              <span>Même 10 minutes comptent.</span>
            </p>
            <ArrowUpRight className="size-4" />
          </Link>
        </section>

        {/* Communauté */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-[18px]">Dans ta commu</h3>
            <Link to="/social" className="text-xs font-semibold text-muted-foreground flex items-center gap-0.5">
              Feed <ChevronRight className="size-3" />
            </Link>
          </div>
          <article className="rounded-3xl bg-surface border border-border p-4 soft-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={POSTS[0].author} size={36} />
              <div className="flex-1">
                <p className="text-sm font-semibold leading-none">{POSTS[0].author}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{POSTS[0].when} · {POSTS[0].sport}</p>
              </div>
              <Pill tone="lime" size="sm">❤ {POSTS[0].likes}</Pill>
            </div>
            <p className="text-sm leading-snug">{POSTS[0].text}</p>
          </article>
        </section>
      </div>
    </main>
  );
}

function QuickAction({
  to, icon, label, accent,
}: { to: string; icon: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <Link
      to={to}
      className={`rounded-2xl aspect-square flex flex-col items-center justify-center gap-1.5 transition-transform active:scale-95 ${
        accent ? "bg-lime text-ink lime-glow" : "bg-surface border border-border text-ink soft-shadow"
      }`}
    >
      {icon}
      <span className="text-[10.5px] font-semibold leading-tight">{label}</span>
    </Link>
  );
}

function Stat({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div>
      <div className="font-display font-extrabold text-[32px] leading-none flex items-center gap-1">
        {value}{icon}
      </div>
      <p className="text-[11px] text-background/60 mt-1.5">{label}</p>
    </div>
  );
}
