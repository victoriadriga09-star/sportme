import { createFileRoute } from "@tanstack/react-router";
import { Flame, Trophy, Heart, TrendingUp } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";

export const Route = createFileRoute("/stats")({
  head: () => ({ meta: [{ title: "Statistiques — ÉLAN" }] }),
  component: Stats,
});

const WEEKS = [3, 5, 2, 4, 6, 4, 7, 3, 5, 8, 6, 4];

function Stats() {
  const max = Math.max(...WEEKS);
  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader back="/profile" title="Statistiques" />

      <div className="px-5 space-y-4">
        <section className="rounded-3xl bg-ink text-background p-6 ink-shadow">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-lime">CE MOIS</p>
          <p className="font-display font-extrabold text-[56px] leading-none mt-2">12</p>
          <p className="text-sm text-background/70">séances réalisées</p>
          <div className="mt-4 flex gap-4 text-xs">
            <span className="flex items-center gap-1.5"><TrendingUp className="size-3.5 text-lime" /> +25% vs mois dernier</span>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <Card icon={<Flame className="size-5 text-orange-500" />} value="4" label="Jours d'affilée" tone="bg-peach" />
          <Card icon={<Heart className="size-5 text-pink-500" />} value="12" label="Partenaires" tone="bg-blush" />
          <Card icon={<Trophy className="size-5 text-ink" />} value="34" label="Total séances" tone="bg-lime" />
          <Card icon={<TrendingUp className="size-5 text-ink" />} value="4.9" label="Note moyenne" tone="bg-lavender" />
        </div>

        <section className="rounded-3xl bg-surface border border-border p-5 soft-shadow">
          <h2 className="font-display font-bold text-lg mb-1">Activité hebdo</h2>
          <p className="text-xs text-muted-foreground mb-5">12 dernières semaines</p>
          <div className="flex items-end justify-between gap-1 h-32">
            {WEEKS.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end">
                <div
                  className={`w-full rounded-t-md ${i === WEEKS.length - 1 ? "bg-ink" : "bg-lime"}`}
                  style={{ height: `${(w / max) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-lavender p-5">
          <h2 className="font-display font-bold text-ink">Sports favoris</h2>
          <div className="mt-3 space-y-2">
            {[["Yoga", 45], ["Running", 30], ["Pilates", 25]].map(([n, v]) => (
              <div key={n as string}>
                <div className="flex justify-between text-xs font-semibold text-ink">
                  <span>{n}</span><span>{v}%</span>
                </div>
                <div className="h-2 rounded-full bg-ink/15 mt-1 overflow-hidden">
                  <div className="h-full bg-ink rounded-full" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ icon, value, label, tone }: { icon: React.ReactNode; value: string; label: string; tone: string }) {
  return (
    <div className={`rounded-3xl p-5 ${tone}`}>
      <div className="size-9 rounded-full bg-background/40 grid place-items-center">{icon}</div>
      <p className="font-display font-extrabold text-3xl mt-3 text-ink">{value}</p>
      <p className="text-[11px] text-ink/70 mt-1 font-semibold">{label}</p>
    </div>
  );
}
