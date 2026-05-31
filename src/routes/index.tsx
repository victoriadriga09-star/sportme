import { createFileRoute } from "@tanstack/react-router";
import {
  Bell, Zap, Heart, Users, Clock, MapPin, Home as HomeIcon,
  Search, MessageCircle, User, ChevronRight, Flame, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ÉLAN — Trouve ton partenaire de sport" },
      { name: "description", content: "ÉLAN connecte les sportifs selon le sport, l'horaire et la proximité. Ne fais plus de sport seul·e." },
      { property: "og:title", content: "ÉLAN — Trouve ton partenaire de sport" },
      { property: "og:description", content: "ÉLAN connecte les sportifs selon le sport, l'horaire et la proximité." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-lg border-b border-border/60">
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-gradient-to-br from-lavender to-lime ring-2 ring-ink/10 grid place-items-center font-display font-bold text-ink">
              S
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-none">Bonsoir,</p>
              <p className="font-display font-bold text-lg leading-tight">Sofia</p>
            </div>
          </div>
          <button aria-label="Notifications" className="relative size-11 grid place-items-center rounded-full bg-card border border-border">
            <Bell className="size-5" strokeWidth={1.6} />
            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-destructive" />
          </button>
        </div>
      </header>

      <div className="px-5 pt-5 space-y-6">
        {/* Wordmark + hero claim */}
        <section className="flex items-end justify-between">
          <h1 className="font-display font-extrabold text-[34px] leading-[0.95] tracking-tight">
            Bouge.<br/>
            <span className="bg-ink text-lime px-2 -mx-0.5 inline-block rounded-md">Ensemble.</span>
          </h1>
          <span className="font-display font-bold text-sm text-muted-foreground tracking-widest">ÉLAN</span>
        </section>

        {/* Prochaine séance */}
        <section className="relative overflow-hidden rounded-3xl bg-ink text-background p-5 lime-glow">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-lime/20 blur-2xl" />
          <p className="text-[10px] font-semibold tracking-[0.18em] text-lime">PROCHAINE SÉANCE</p>
          <h2 className="font-display font-bold text-[26px] mt-2 leading-tight">Yoga Vinyasa</h2>
          <p className="text-sm text-background/70 mt-1">Demain · 19h00 · 45 min</p>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-lavender to-pink-200 ring-2 ring-lime grid place-items-center font-bold text-ink">M</div>
              <div className="text-sm">
                <p className="font-semibold leading-none">Marie, 28</p>
                <p className="text-background/60 text-xs mt-1 flex items-center gap-1">
                  <MapPin className="size-3" /> Salle FitZone · 1.2 km
                </p>
              </div>
            </div>
            <button className="pill bg-lime text-ink text-xs font-semibold px-4 py-2 flex items-center gap-1">
              Détails <ChevronRight className="size-3.5" />
            </button>
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-lg">Actions rapides</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <QuickAction icon={<Zap className="size-5" />} label="Séance flash" accent />
            <QuickAction icon={<Heart className="size-5" />} label="Favoris" />
            <QuickAction icon={<Users className="size-5" />} label="Commu" />
            <QuickAction icon={<Clock className="size-5" />} label="Historique" />
          </div>
        </section>

        {/* Partenaires suggérés */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-lg">Dispo près de toi</h3>
            <a className="text-xs font-medium text-muted-foreground flex items-center gap-0.5">
              Voir tout <ChevronRight className="size-3" />
            </a>
          </div>
          <div className="-mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <PartnerCard name="Léa" age={26} sport="Running" distance="0.8 km" when="Ce soir 19h" tone="lime" initials="L" />
            <PartnerCard name="Adam" age={31} sport="Boxe" distance="1.5 km" when="Demain 7h" tone="lavender" initials="A" />
            <PartnerCard name="Inès" age={24} sport="Pilates" distance="2.1 km" when="Ce soir 20h" tone="ink" initials="I" />
            <PartnerCard name="Théo" age={29} sport="Padel" distance="3.4 km" when="Sam. 10h" tone="lime" initials="T" />
          </div>
        </section>

        {/* Stats / parcours */}
        <section className="rounded-3xl bg-card border border-border p-5 card-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">Ton parcours</h3>
            <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">CE MOIS-CI</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Stat value="12" label="Séances" />
            <Stat value="7" label="Partenaires" />
            <Stat value="4" label="Jours suite" icon={<Flame className="size-4 text-orange-500" />} />
          </div>
          <div className="mt-5 rounded-2xl bg-lavender/40 p-4 flex items-start gap-3">
            <Sparkles className="size-5 text-ink shrink-0 mt-0.5" />
            <p className="text-sm text-ink leading-snug">
              Même 10 minutes comptent. Tu es exactement où tu dois être.
            </p>
          </div>
        </section>

        {/* Communauté preview */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-lg">Dans ta communauté</h3>
            <a className="text-xs font-medium text-muted-foreground flex items-center gap-0.5">Feed <ChevronRight className="size-3" /></a>
          </div>
          <article className="rounded-2xl bg-card border border-border p-4 card-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-9 rounded-full bg-gradient-to-br from-lime to-lavender grid place-items-center text-xs font-bold text-ink">J</div>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-none">Julie</p>
                <p className="text-xs text-muted-foreground mt-0.5">Il y a 2 h · Boxe</p>
              </div>
              <span className="pill bg-lime/30 text-ink text-[10px] font-semibold px-2.5 py-1">+2 ❤️</span>
            </div>
            <p className="text-sm leading-snug">
              Première séance de boxe avec <span className="font-semibold">@Marie</span> — trop bien, on remet ça mercredi !
            </p>
          </article>
        </section>
      </div>

      {/* Tab bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 pointer-events-none">
        <div className="mx-auto max-w-md px-4 pb-4 pointer-events-auto">
          <div className="relative glass-dark text-background rounded-full px-5 py-3 flex items-center justify-between">
            <TabIcon icon={<HomeIcon className="size-5" />} label="Accueil" active />
            <TabIcon icon={<Search className="size-5" />} label="Explorer" />
            <div className="w-14" aria-hidden /> {/* spacer for FAB */}
            <TabIcon icon={<MessageCircle className="size-5" />} label="Social" />
            <TabIcon icon={<User className="size-5" />} label="Profil" />

            {/* FAB */}
            <button
              aria-label="Nouvelle séance"
              className="absolute left-1/2 -translate-x-1/2 -top-6 size-16 rounded-full bg-lime text-ink grid place-items-center lime-glow ring-4 ring-background"
            >
              <Zap className="size-6" strokeWidth={2.4} fill="currentColor" />
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}

function QuickAction({ icon, label, accent }: { icon: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <button
      className={`rounded-2xl aspect-square flex flex-col items-center justify-center gap-1.5 transition-transform active:scale-95 ${
        accent
          ? "bg-lime text-ink lime-glow"
          : "bg-card border border-border text-ink card-soft"
      }`}
    >
      <div className={accent ? "" : "text-ink/80"}>{icon}</div>
      <span className="text-[10.5px] font-semibold leading-tight text-center px-1">{label}</span>
    </button>
  );
}

function PartnerCard({
  name, age, sport, distance, when, tone, initials,
}: {
  name: string; age: number; sport: string; distance: string; when: string;
  tone: "lime" | "lavender" | "ink"; initials: string;
}) {
  const toneMap = {
    lime: "bg-lime text-ink",
    lavender: "bg-lavender text-ink",
    ink: "bg-ink text-background",
  };
  const avatarBg = {
    lime: "bg-gradient-to-br from-lime to-emerald-300",
    lavender: "bg-gradient-to-br from-lavender to-pink-200",
    ink: "bg-gradient-to-br from-ink to-zinc-700 text-background",
  };
  return (
    <div className="snap-start shrink-0 w-[180px] rounded-2xl bg-card border border-border p-4 card-soft">
      <div className="flex items-center justify-between mb-3">
        <div className={`size-12 rounded-full grid place-items-center font-bold ${avatarBg[tone]}`}>
          {initials}
        </div>
        <span className="size-2.5 rounded-full bg-success ring-2 ring-success/30" aria-label="En ligne" />
      </div>
      <p className="font-semibold text-sm leading-tight">{name}, {age}</p>
      <span className={`inline-block pill text-[10px] font-semibold px-2.5 py-1 mt-2 ${toneMap[tone]}`}>{sport}</span>
      <div className="mt-3 space-y-1 text-[11px] text-muted-foreground">
        <p className="flex items-center gap-1"><MapPin className="size-3" /> {distance}</p>
        <p className="flex items-center gap-1 text-emerald-600 font-medium"><Clock className="size-3" /> {when}</p>
      </div>
    </div>
  );
}

function Stat({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="font-display font-extrabold text-3xl flex items-center justify-center gap-1">
        {value}{icon}
      </div>
      <p className="text-[11px] text-muted-foreground mt-1 font-medium">{label}</p>
    </div>
  );
}

function TabIcon({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-0.5 px-2 ${active ? "text-lime" : "text-background/60"}`}>
      {icon}
      <span className="text-[9px] font-medium">{label}</span>
    </button>
  );
}
