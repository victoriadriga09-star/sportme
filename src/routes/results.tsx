import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Star, Clock, List, Map as MapIcon, Layers, Heart, X, Check } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";
import { PARTNERS } from "@/data/mock";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "Résultats — ÉLAN" }] }),
  component: Results,
});

type View = "list" | "map" | "swipe";

function Results() {
  const [view, setView] = useState<View>("list");

  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader back="/explorer" title={`${PARTNERS.length} partenaires`} />

      <div className="px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-5 px-5">
          <Pill tone="lime">Yoga</Pill>
          <Pill tone="ghost">Demain 19h</Pill>
          <Pill tone="ghost">Paris 11e</Pill>
          <Pill tone="ghost">5 km</Pill>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex bg-surface border border-border rounded-full p-1">
            <ViewBtn active={view === "list"} onClick={() => setView("list")} icon={<List className="size-4" />} />
            <ViewBtn active={view === "map"} onClick={() => setView("map")} icon={<MapIcon className="size-4" />} />
            <ViewBtn active={view === "swipe"} onClick={() => setView("swipe")} icon={<Layers className="size-4" />} />
          </div>
        </div>

        {view === "list" && <ListView />}
        {view === "map" && <MapView />}
        {view === "swipe" && <SwipeView />}
      </div>
    </main>
  );
}

function ViewBtn({ active, onClick, icon }: { active: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`size-9 grid place-items-center rounded-full transition ${active ? "bg-ink text-background" : "text-ink"}`}>
      {icon}
    </button>
  );
}

function ListView() {
  return (
    <div className="space-y-3">
      {PARTNERS.map((p) => (
        <article key={p.id} className="rounded-3xl bg-surface border border-border p-4 soft-shadow">
          <div className="flex items-start gap-3">
            <Avatar name={p.name} size={52} ring={p.online ? "lime" : "none"} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-[15px] leading-tight">{p.name.split(" ")[0]}, {p.age}</p>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Star className="size-3 fill-warning text-warning" /> {p.rating}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <Pill tone="lime" size="sm">{p.sport}</Pill>
                <Pill tone="lavender" size="sm">{p.level}</Pill>
              </div>
              <div className="mt-2 space-y-0.5 text-[11.5px] text-muted-foreground">
                <p className="flex items-center gap-1"><MapPin className="size-3" /> {p.distanceKm} km · {p.place}</p>
                <p className="flex items-center gap-1 text-emerald-600 font-semibold"><Clock className="size-3" /> {p.when}</p>
              </div>
              <p className="text-xs italic text-muted-foreground mt-2 line-clamp-1">« {p.bio} »</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Link to="/partner/$id" params={{ id: p.id }} className="flex-1 pill border border-ink text-ink py-2.5 text-xs font-semibold text-center">
              Voir le profil
            </Link>
            <Link to="/request-sent" className="flex-1 pill bg-lime text-ink py-2.5 text-xs font-bold text-center">
              Inviter →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function MapView() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-border h-[70vh] bg-[#dde4ec]">
      {/* faux map */}
      <div className="absolute inset-0 topo-lines opacity-30" />
      <div className="absolute inset-0 topo-dots opacity-20" />
      {/* rayon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-lime/15 border border-lime/40" />
      {/* user */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-5 rounded-full bg-ink ring-4 ring-background grid place-items-center">
        <span className="size-1.5 rounded-full bg-lime" />
      </div>
      {/* pins */}
      {PARTNERS.slice(0, 6).map((p, i) => {
        const pos = [
          { l: "20%", t: "30%" }, { l: "70%", t: "25%" }, { l: "65%", t: "60%" },
          { l: "28%", t: "65%" }, { l: "50%", t: "20%" }, { l: "40%", t: "75%" },
        ][i];
        return (
          <Link to="/partner/$id" params={{ id: p.id }} key={p.id} style={{ left: pos.l, top: pos.t }}
            className="absolute -translate-x-1/2 -translate-y-1/2 size-10 rounded-full bg-lime ring-4 ring-background grid place-items-center ink-shadow">
            <Avatar name={p.name} size={28} />
          </Link>
        );
      })}
      {/* bottom sheet preview */}
      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-surface p-3 flex items-center gap-3 soft-shadow">
        <Avatar name={PARTNERS[0].name} size={42} ring="lime" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-none">{PARTNERS[0].name.split(" ")[0]} · {PARTNERS[0].sport}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{PARTNERS[0].distanceKm} km · {PARTNERS[0].when}</p>
        </div>
        <Link to="/partner/$id" params={{ id: PARTNERS[0].id }} className="pill bg-ink text-background text-xs font-semibold px-3 py-2">Voir</Link>
      </div>
    </div>
  );
}

function SwipeView() {
  const [idx, setIdx] = useState(0);
  const p = PARTNERS[idx % PARTNERS.length];
  const next = () => setIdx((i) => i + 1);
  return (
    <div className="relative h-[65vh]">
      {/* stack derrière */}
      <div className="absolute inset-x-6 top-3 h-full rounded-[28px] bg-input scale-95 opacity-60" />
      <div className="absolute inset-x-3 top-1.5 h-full rounded-[28px] bg-surface border border-border scale-[0.98] opacity-80" />

      <article className="absolute inset-0 rounded-[28px] bg-surface border border-border overflow-hidden soft-shadow">
        <div className={`h-[60%] relative ${p.tone === "lime" ? "bg-lime" : p.tone === "lavender" ? "bg-lavender" : "bg-ink"}`}>
          <div className="absolute inset-0 topo-dots opacity-30" />
          <div className="absolute inset-0 grid place-items-center">
            <Avatar name={p.name} size={140} />
          </div>
        </div>
        <div className={`p-5 ${p.tone === "ink" ? "" : ""}`}>
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-2xl">{p.name.split(" ")[0]}, {p.age}</h3>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Star className="size-3 fill-warning text-warning" /> {p.rating}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <Pill tone="lime" size="sm">{p.sport}</Pill>
            <Pill tone="lavender" size="sm">{p.level}</Pill>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <MapPin className="size-3" /> {p.distanceKm} km · {p.when}
          </p>
          <p className="text-sm mt-3 line-clamp-2 text-ink/80">{p.bio}</p>
        </div>
      </article>

      <div className="absolute inset-x-0 -bottom-2 flex justify-center items-center gap-5">
        <button onClick={next} aria-label="Passer" className="size-14 rounded-full bg-surface border border-border grid place-items-center soft-shadow active:scale-95">
          <X className="size-6 text-destructive" strokeWidth={2.2} />
        </button>
        <button aria-label="Favori" className="size-12 rounded-full bg-surface border border-border grid place-items-center soft-shadow active:scale-95">
          <Heart className="size-5 text-lavender" strokeWidth={2} />
        </button>
        <Link to="/match" aria-label="Inviter" className="size-14 rounded-full bg-lime grid place-items-center lime-glow active:scale-95">
          <Check className="size-7 text-ink" strokeWidth={2.4} />
        </Link>
      </div>
    </div>
  );
}
