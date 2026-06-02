import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, ChevronRight, Calendar, Users, BarChart3, Settings, HelpCircle, LogOut, Sparkles, PersonStanding, Dumbbell } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Mon profil — ÉLAN" }] }),
  component: Profile,
});

const MENU = [
  { to: "/sessions",  icon: Calendar,    label: "Mes séances" },
  { to: "/partners",  icon: Users,       label: "Mes partenaires" },
  { to: "/stats",     icon: BarChart3,   label: "Statistiques" },
  { to: "/settings",  icon: Settings,    label: "Paramètres" },
  { to: "/notifications", icon: HelpCircle, label: "Aide & contact" },
] as const;

function Profile() {
  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <section className="px-5 pt-8 pb-6 text-center relative">
        <div className="absolute inset-x-5 top-0 h-40 rounded-b-[40px] bg-lavender -z-0" />
        <div className="absolute inset-x-5 top-0 h-40 rounded-b-[40px] topo-dots opacity-30 -z-0" />
        <div className="relative inline-block">
          <Avatar name="Sofia Lopez" size={120} ring="lime" />
          <button className="absolute bottom-0 right-0 size-9 rounded-full bg-ink text-background grid place-items-center ring-4 ring-background" aria-label="Modifier">
            <Pencil className="size-4" strokeWidth={2} />
          </button>
        </div>
        <h1 className="relative font-display font-extrabold text-2xl mt-3">Sofia, 27</h1>
        <p className="relative text-sm text-muted-foreground">Paris 11e</p>

        <div className="relative mt-5 grid grid-cols-3 gap-3">
          <Stat value="34" label="Séances" />
          <Stat value="12" label="Partenaires" />
          <Stat value="4.9" label="Note" />
        </div>
      </section>

      <section className="px-5 space-y-5">
        <Block title="Mes sports">
          <div className="flex flex-wrap gap-2">
            <Pill tone="lime">🧘 Yoga</Pill>
            <Pill tone="lime">🏃 Running</Pill>
            <Pill tone="lime">🤸 Pilates</Pill>
            <Pill tone="ghost">+ Ajouter</Pill>
          </div>
        </Block>

        <Block title="Mon objectif">
          <div className="rounded-2xl bg-lavender-soft p-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">✨ Rejoindre une communauté</p>
            <button className="text-xs font-semibold text-ink underline">Modifier</button>
          </div>
        </Block>

        <Block title="Ma bio">
          <p className="text-sm text-ink/80 leading-relaxed">
            Yoga le soir, running le week-end. Je cherche des partenaires qui prennent ça sérieusement sans se prendre au sérieux.
          </p>
        </Block>

        <Block title="Mes dispos">
          <div className="flex flex-wrap gap-2">
            <Pill tone="ghost">3×/semaine</Pill>
            <Pill tone="ghost">Soir</Pill>
            <Pill tone="ghost">Week-end</Pill>
          </div>
        </Block>

        <div className="rounded-3xl bg-surface border border-border divide-y divide-border overflow-hidden">
          {MENU.map((m) => (
            <Link key={m.to} to={m.to} className="flex items-center gap-3 px-5 py-4 active:bg-muted transition">
              <span className="size-9 rounded-full bg-muted grid place-items-center">
                <m.icon className="size-4" strokeWidth={1.8} />
              </span>
              <span className="flex-1 text-sm font-semibold">{m.label}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
          <button className="flex items-center gap-3 px-5 py-4 w-full text-destructive">
            <span className="size-9 rounded-full bg-destructive/10 grid place-items-center">
              <LogOut className="size-4" strokeWidth={1.8} />
            </span>
            <span className="flex-1 text-left text-sm font-semibold">Se déconnecter</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display font-bold text-base mb-2">{title}</h2>
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-surface border border-border p-3">
      <p className="font-display font-extrabold text-xl">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
