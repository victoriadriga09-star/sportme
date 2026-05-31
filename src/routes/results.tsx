import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Star, Clock, List, Map as MapIcon, Layers, Heart, X, Check, Video, Users as UsersIcon } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";
import { PARTNERS, type Partner } from "@/data/mock";
import { useFilters, useFavorites } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "Résultats — ÉLAN" }] }),
  component: Results,
});

type View = "list" | "map" | "swipe";

function applyFilters(list: Partner[], f: ReturnType<typeof useFilters>[0]): Partner[] {
  return list.filter((p) => {
    if (f.gender !== "Peu importe" && p.gender !== f.gender) return false;
    if (f.mode !== "Tous" && p.mode !== f.mode) return false;
    if (f.level !== "Tous" && p.level !== f.level) return false;
    if (p.distanceKm > f.radius) return false;
    return true;
  });
}

function Results() {
  const [view, setView] = useState<View>("list");
  const [filters] = useFilters();
  const list = useMemo(() => applyFilters(PARTNERS, filters), [filters]);

  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader back="/explorer" title={`${list.length} partenaire${list.length > 1 ? "s" : ""}`} />

      <div className="px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-5 px-5">
          <Pill tone="lime">{filters.sport}</Pill>
          <Pill tone="ghost">{filters.when} · {filters.durationCustom ? `${filters.durationCustom} min` : filters.duration}</Pill>
          <Pill tone="ghost">{filters.city}</Pill>
          <Pill tone="ghost">{filters.radius} km</Pill>
          {filters.mode !== "Tous" && <Pill tone="lavender">{filters.mode}</Pill>}
          {filters.gender !== "Peu importe" && <Pill tone="lavender">{filters.gender}</Pill>}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex bg-surface border border-border rounded-full p-1">
            <ViewBtn active={view === "list"} onClick={() => setView("list")} icon={<List className="size-4" />} />
            <ViewBtn active={view === "map"} onClick={() => setView("map")} icon={<MapIcon className="size-4" />} />
            <ViewBtn active={view === "swipe"} onClick={() => setView("swipe")} icon={<Layers className="size-4" />} />
          </div>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-16 px-6">
            <p className="font-display font-bold text-xl mb-2">Aucun partenaire ne correspond</p>
            <p className="text-sm text-muted-foreground mb-5">Élargis ton rayon ou assouplis tes filtres.</p>
            <Link to="/explorer" className="inline-flex pill bg-ink text-background px-5 py-3 text-sm font-semibold">Modifier les filtres</Link>
          </div>
        ) : (
          <>
            {view === "list" && <ListView list={list} />}
            {view === "map" && <MapView list={list} city={filters.city} />}
            {view === "swipe" && <SwipeView list={list} />}
          </>
        )}
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

function ListView({ list }: { list: Partner[] }) {
  return (
    <div className="space-y-3">
      {list.map((p) => (
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
                <Pill tone="ghost" size="sm">{p.mode === "Visio" ? <><Video className="size-3" /> Visio</> : <><UsersIcon className="size-3" /> Présentiel</>}</Pill>
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

function MapView({ list, city }: { list: Partner[]; city: string }) {
  const positions = [
    { l: "22%", t: "30%" }, { l: "70%", t: "26%" }, { l: "65%", t: "60%" },
    { l: "28%", t: "65%" }, { l: "50%", t: "20%" }, { l: "44%", t: "78%" },
    { l: "82%", t: "45%" }, { l: "15%", t: "50%" },
  ];
  return (
    <div className="relative rounded-3xl overflow-hidden border border-border h-[70vh] bg-[#e8eef5]">
      {/* faux ville map */}
      <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full opacity-90">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c8d4e3" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="600" fill="url(#grid)" />
        {/* Seine / rivière */}
        <path d="M -20,360 C 80,300 160,400 240,340 C 320,290 380,360 420,320 L 420,420 C 380,460 320,400 240,440 C 160,490 80,420 -20,460 Z" fill="#b8d4e8" opacity="0.6" />
        {/* avenues */}
        <path d="M 0,200 L 400,260" stroke="#c8d4e3" strokeWidth="6" fill="none" />
        <path d="M 200,0 L 240,600" stroke="#c8d4e3" strokeWidth="6" fill="none" />
        <path d="M 50,600 L 350,0" stroke="#c8d4e3" strokeWidth="4" fill="none" opacity="0.6" />
        {/* parks */}
        <circle cx="100" cy="150" r="35" fill="#c8e0b8" opacity="0.7" />
        <ellipse cx="320" cy="480" rx="55" ry="35" fill="#c8e0b8" opacity="0.7" />
        {/* labels */}
        <text x="100" y="155" textAnchor="middle" fontSize="9" fill="#5a7a4a" fontFamily="system-ui" fontWeight="600">Parc</text>
        <text x="320" y="485" textAnchor="middle" fontSize="9" fill="#5a7a4a" fontFamily="system-ui" fontWeight="600">Square</text>
      </svg>

      {/* city pill */}
      <div className="absolute top-3 left-3 glass-strong pill px-3 py-1.5 text-[11px] font-bold text-ink flex items-center gap-1.5">
        <MapPin className="size-3" /> {city}
      </div>

      {/* radius */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-lime/15 border-2 border-lime/50" />
      {/* user */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-6 rounded-full bg-ink ring-4 ring-background grid place-items-center">
        <span className="size-2 rounded-full bg-lime animate-pulse" />
      </div>
      <span className="absolute left-1/2 top-1/2 translate-x-3 -translate-y-9 glass-strong pill px-2 py-0.5 text-[9px] font-bold text-ink whitespace-nowrap">
        Toi
      </span>

      {/* pins with info tooltip */}
      {list.slice(0, positions.length).map((p, i) => {
        const pos = positions[i];
        return (
          <Link to="/partner/$id" params={{ id: p.id }} key={p.id} style={{ left: pos.l, top: pos.t }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group">
            {/* info card above */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-12 glass-strong pill px-2 py-1 text-[10px] font-bold text-ink whitespace-nowrap flex items-center gap-1.5">
              <Clock className="size-2.5" /> {p.timeShort}
              <span className="text-muted-foreground">·</span>
              {p.distanceKm} km
            </div>
            <div className="size-11 rounded-full bg-lime ring-4 ring-background grid place-items-center ink-shadow group-active:scale-95 transition">
              <Avatar name={p.name} size={30} />
            </div>
          </Link>
        );
      })}

      {/* bottom sheet preview */}
      <div className="absolute inset-x-3 bottom-3 glass-strong rounded-2xl p-3 flex items-center gap-3">
        <Avatar name={list[0].name} size={42} ring="lime" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-none text-ink">{list[0].name.split(" ")[0]} · {list[0].sport}</p>
          <p className="text-[11px] text-ink/70 mt-1">{list[0].distanceKm} km · {list[0].when}</p>
        </div>
        <Link to="/partner/$id" params={{ id: list[0].id }} className="pill bg-ink text-background text-xs font-semibold px-3 py-2">Voir</Link>
      </div>
    </div>
  );
}

function SwipeView({ list }: { list: Partner[] }) {
  const [idx, setIdx] = useState(0);
  const { isFav, toggle } = useFavorites();
  const p = list[idx % list.length];
  const next = () => setIdx((i) => i + 1);
  const fav = isFav(p.id);
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
          <div className="absolute top-3 left-3 glass-strong pill px-2.5 py-1 text-[10px] font-bold text-ink flex items-center gap-1">
            <Clock className="size-3" /> {p.timeShort} · {p.distanceKm} km
          </div>
        </div>
        <div className="p-5">
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
        <button
          onClick={() => { toggle(p.id); toast(fav ? "Retiré des favoris" : `${p.name.split(" ")[0]} ajouté·e à tes favoris ❤`); }}
          aria-label="Favori"
          aria-pressed={fav}
          className={`size-12 rounded-full grid place-items-center soft-shadow active:scale-95 transition ${fav ? "bg-lavender border-2 border-ink" : "bg-surface border border-border"}`}
        >
          <Heart className={`size-5 ${fav ? "text-ink" : "text-lavender"}`} fill={fav ? "currentColor" : "none"} strokeWidth={2} />
        </button>
        <Link to="/match" aria-label="Inviter" className="size-14 rounded-full bg-lime grid place-items-center lime-glow active:scale-95">
          <Check className="size-7 text-ink" strokeWidth={2.4} />
        </Link>
      </div>
    </div>
  );
}
