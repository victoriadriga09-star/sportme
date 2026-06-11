import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { MapPin, Star, Clock, List, Map as MapIcon, Layers, Heart, X, Check, Video, Users as UsersIcon, Sparkles, RotateCcw } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { CatPeek } from "@/components/CatPeek";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";
import { PARTNERS, type Partner } from "@/data/mock";
import { useFilters, useFavorites, DEFAULT_FILTERS } from "@/lib/store";
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
  const [filters, setFilters] = useFilters();
  const [showAll, setShowAll] = useState(false);
  const list = useMemo(
    () => (showAll ? PARTNERS : applyFilters(PARTNERS, filters)),
    [filters, showAll]
  );

  const hasActiveFilters =
    filters.gender !== "Peu importe" ||
    filters.mode !== "Tous" ||
    filters.level !== "Tous" ||
    filters.radius < 20;

  const clearFilters = () => {
    setFilters({ ...DEFAULT_FILTERS, sport: filters.sport, city: filters.city, radius: 20 });
    setShowAll(false);
    toast("Filtres réinitialisés");
  };

  return (
    <main className="relative min-h-[100dvh] pb-32 bg-background overflow-hidden">
      <CatPeek tone="orange" corner="tr" size={64} delay={0.4} className="!top-3 !right-3" />
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

        {/* Quick controls — clear filters / show all */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={clearFilters}
            disabled={!hasActiveFilters && !showAll}
            className="pill bg-surface border border-border px-3 py-1.5 text-[11px] font-bold text-ink flex items-center gap-1.5 disabled:opacity-40 active:scale-95 transition"
          >
            <RotateCcw className="size-3" /> Effacer les filtres
          </button>
          <button
            onClick={() => setShowAll((v) => !v)}
            className={`pill px-3 py-1.5 text-[11px] font-bold flex items-center gap-1.5 active:scale-95 transition ${
              showAll ? "bg-ink text-background" : "bg-surface border border-border text-ink"
            }`}
          >
            <UsersIcon className="size-3" /> {showAll ? "Filtrer à nouveau" : `Voir tous (${PARTNERS.length})`}
          </button>
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
            <p className="text-sm text-muted-foreground mb-5">Élargis ton rayon ou efface les filtres.</p>
            <button onClick={clearFilters} className="inline-flex pill bg-ink text-background px-5 py-3 text-sm font-semibold">
              Effacer les filtres
            </button>
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
                  <Sparkle className="size-3 fill-[#7C5CFF] text-[#7C5CFF]" /> {p.rating}
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
  // Carte Google Static réelle de la ville (style minimal lavande)
  const browserKey = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;
  const styleParams = [
    "feature:poi|visibility:off",
    "feature:transit|visibility:off",
    "feature:road|element:labels|visibility:off",
    "feature:administrative|element:labels.text.fill|color:0x6b6485",
    "feature:water|color:0xd9e2ef",
    "feature:landscape|color:0xf3eefb",
    "feature:road|color:0xffffff",
  ].map((s) => `style=${encodeURIComponent(s)}`).join("&");
  const mapUrl = browserKey
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(city)}&zoom=13&size=600x900&scale=2&${styleParams}&key=${browserKey}`
    : null;

  return (
    <div className="relative rounded-3xl overflow-hidden border border-border h-[70vh] bg-[#f3eefb]">
      {mapUrl ? (
        <img
          src={mapUrl}
          alt={`Carte de ${city}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground p-6 text-center">
          Carte indisponible — connecte Google Maps pour voir la ville réelle.
        </div>
      )}

      {/* city pill */}
      <div className="absolute top-3 left-3 glass-strong pill px-3 py-1.5 text-[11px] font-bold text-ink flex items-center gap-1.5">
        <MapPin className="size-3" /> {city}
      </div>

      {/* radius */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-lime/15 border-2 border-lime/60" />
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
        <Avatar name={list[0].name} size={42} ring="lavender" />
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
  const visible = [0, 1, 2].map((o) => list[(idx + o) % list.length]);
  const top = visible[0];
  const fav = isFav(top.id);

  const advance = (dir: "left" | "right") => {
    if (dir === "right") toast.success(`${top.name.split(" ")[0]} invité·e ✨`);
    setIdx((i) => i + 1);
  };

  return (
    <div className="relative h-[68vh] select-none">
      <AnimatePresence initial={false}>
        {visible.map((p, layer) => (
          <SwipeCard
            key={`${p.id}-${idx + layer}`}
            partner={p}
            layer={layer}
            onSwipe={layer === 0 ? advance : undefined}
          />
        ))}
      </AnimatePresence>

      <div className="absolute inset-x-0 -bottom-2 z-30 flex justify-center items-center gap-5">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => advance("left")}
          aria-label="Passer"
          className="size-14 rounded-full bg-white/80 backdrop-blur-xl border border-white/70 grid place-items-center shadow-lg"
        >
          <X className="size-6 text-destructive" strokeWidth={2.4} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => { toggle(top.id); toast(fav ? "Retiré des favoris" : `${top.name.split(" ")[0]} ajouté·e ❤`); }}
          aria-label="Favori"
          className={`size-12 rounded-full grid place-items-center shadow-lg backdrop-blur-xl transition ${fav ? "bg-[#7C5CFF] border border-white/70" : "bg-white/80 border border-white/70"}`}
        >
          <Heart className={`size-5 ${fav ? "text-white" : "text-[#7C5CFF]"}`} fill={fav ? "currentColor" : "none"} strokeWidth={2.2} />
        </motion.button>
        <motion.div whileTap={{ scale: 0.85 }}>
          <Link
            to="/match"
            aria-label="Inviter"
            className="size-14 rounded-full bg-gradient-to-br from-[#9B7BFF] to-[#5B3FD1] grid place-items-center violet-glow shadow-xl"
          >
            <Check className="size-7 text-white" strokeWidth={2.6} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function SwipeCard({ partner, layer, onSwipe }: { partner: Partner; layer: number; onSwipe?: (dir: "left" | "right") => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const nopeOpacity = useTransform(x, [-140, -40], [1, 0]);
  const isTop = layer === 0;
  const nav = useNavigate();

  const handleEnd = (_: unknown, info: PanInfo) => {
    if (!onSwipe) return;
    if (info.offset.x > 110 || info.velocity.x > 600) onSwipe("right");
    else if (info.offset.x < -110 || info.velocity.x < -600) onSwipe("left");
  };

  // Tap (not drag) → open partner profile
  const handleTap = (_: unknown, info: { point: { x: number; y: number } } & Record<string, unknown>) => {
    if (!isTop) return;
    if (Math.abs(x.get()) > 8) return; // ignore swipes
    void info;
    nav({ to: "/partner/$id", params: { id: partner.id } });
  };

  const gradient =
    partner.tone === "lime"
      ? "from-[#9B7BFF] via-[#7C5CFF] to-[#5B3FD1]"
      : partner.tone === "lavender"
      ? "from-[#FFB58D] via-[#FF8A65] to-[#FF6B6B]"
      : "from-[#1F1B3A] via-[#2D2658] to-[#0F0C24]";

  return (
    <motion.article
      drag={isTop ? "x" : false}
      dragElastic={0.6}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleEnd}
      onTap={handleTap}
      style={isTop ? { x, rotate, zIndex: 20 } : { zIndex: 20 - layer }}
      initial={{ scale: 1 - layer * 0.05, y: layer * 14, opacity: layer > 2 ? 0 : 1 }}
      animate={{ scale: 1 - layer * 0.05, y: layer * 14, opacity: 1 }}
      exit={{ x: x.get() > 0 ? 600 : -600, opacity: 0, rotate: x.get() > 0 ? 24 : -24, transition: { duration: 0.35 } }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={`absolute inset-x-2 top-0 h-[64vh] rounded-[32px] overflow-hidden ${isTop ? "cursor-pointer active:cursor-grabbing" : ""}`}
    >
      {/* gradient base */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      {/* glass orbs */}
      <div className="absolute -top-20 -left-12 size-56 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-10 size-64 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute inset-0 topo-dots opacity-15 mix-blend-overlay" />

      {/* avatar */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-white/30 blur-2xl scale-110" />
          <div className="relative rounded-full p-1.5 bg-white/25 backdrop-blur-xl border border-white/40 shadow-2xl">
            <Avatar name={partner.name} size={150} />
          </div>
        </div>
      </div>

      {/* top pill */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="pill bg-white/25 backdrop-blur-xl border border-white/40 px-3 py-1.5 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-sm">
          <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse" /> Actif·ve
        </div>
        <div className="pill bg-white/25 backdrop-blur-xl border border-white/40 px-3 py-1.5 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-sm">
          <Clock className="size-3" /> {partner.timeShort}
        </div>
      </div>

      {/* like / nope stamps */}
      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-12 left-6 rotate-[-14deg] pill border-4 border-emerald-300 px-4 py-1.5 text-emerald-200 font-display font-extrabold text-2xl tracking-widest"
          >
            LIKE
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-12 right-6 rotate-[14deg] pill border-4 border-rose-300 px-4 py-1.5 text-rose-200 font-display font-extrabold text-2xl tracking-widest"
          >
            NOPE
          </motion.div>
        </>
      )}

      {/* glass info card bottom */}
      <div className="absolute inset-x-3 bottom-3 rounded-3xl p-4 bg-white/20 backdrop-blur-2xl border border-white/40 shadow-2xl text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-extrabold text-2xl leading-none drop-shadow-sm">
              {partner.name.split(" ")[0]}, {partner.age}
            </h3>
            <p className="text-xs mt-1.5 flex items-center gap-1 text-white/85">
              <MapPin className="size-3" /> {partner.place} · {partner.distanceKm} km
            </p>
          </div>
          <span className="text-xs flex items-center gap-1 bg-white/25 pill px-2 py-1 font-bold">
            <Star className="size-3 fill-[#FACC15] text-[#FACC15]" /> {partner.rating}
          </span>
        </div>
        <div className="flex gap-1.5 mt-3">
          <span className="pill bg-white/25 border border-white/40 px-2.5 py-1 text-[11px] font-bold flex items-center gap-1">
            <Sparkles className="size-3" /> {partner.sport}
          </span>
          <span className="pill bg-white/25 border border-white/40 px-2.5 py-1 text-[11px] font-bold">{partner.level}</span>
          <span className="pill bg-white/25 border border-white/40 px-2.5 py-1 text-[11px] font-bold flex items-center gap-1">
            {partner.mode === "Visio" ? <Video className="size-3" /> : <UsersIcon className="size-3" />} {partner.mode}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
