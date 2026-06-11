import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Flame, Users, Sparkles, List as ListIcon, Map as MapIcon, Dumbbell } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { CatPeek } from "@/components/CatPeek";
import { Avatar } from "@/components/Avatar";
import { SPORTS, PARTNERS } from "@/data/mock";
import { SPORT_ICONS } from "@/lib/icons";

export const Route = createFileRoute("/sports/$slug")({
  head: () => ({ meta: [{ title: "Sport — ÉLAN" }] }),
  component: SportDetail,
});

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type Meta = {
  description: string;
  facts: string[];
  tone: string;
  cat: "black" | "orange" | "lavender" | "white";
  photos: string[];
  stats: { label: string; value: string }[];
};

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80&auto=format&fit=crop",
];

const META: Record<string, Meta> = {
  running: {
    description: "Sortir, respirer, avaler les kilomètres. Le running, c'est le réinitialiseur ultime.",
    facts: ["20 min suffisent à réduire le stress", "Brûle 600+ kcal/h", "Renforce le système immunitaire"],
    tone: "bg-lime/40", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "600" }, { label: "Pratiquants Paris 11e", value: "12k" }, { label: "Sessions/sem.", value: "3,2" }],
  },
  yoga: {
    description: "Mouvement, souffle, présence. Le yoga unit corps et esprit.",
    facts: ["Réduit le cortisol", "Améliore le sommeil", "+35% de mobilité en 10 séances"],
    tone: "bg-lavender-soft", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "250" }, { label: "Pratiquants", value: "8k" }, { label: "Niveau moyen", value: "Inter." }],
  },
  boxe: {
    description: "Précision, vitesse, mental. La boxe muscle le corps et la concentration.",
    facts: ["Brûle 800 kcal/h", "Améliore les réflexes", "Énorme libération d'endorphines"],
    tone: "bg-peach", cat: "black",
    photos: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "800" }, { label: "Salles 11e", value: "6" }, { label: "Sessions/sem.", value: "2,4" }],
  },
  pilates: {
    description: "Contrôle, gainage profond, alignement. Le pilates renforce de l'intérieur.",
    facts: ["Posture améliorée en 10 séances", "Très peu d'impact articulaire", "Recruté chez +90% des danseurs pro"],
    tone: "bg-blush", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "320" }, { label: "Studios 11e", value: "9" }, { label: "Sessions/sem.", value: "2" }],
  },
  padel: {
    description: "Mix tennis et squash. Convivial, addictif, ultra-rapide à prendre en main.",
    facts: ["Match moyen = 90 min de cardio", "Sport en duo par essence", "L'un des plus dynamiques au monde"],
    tone: "bg-sky", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/match", value: "900" }, { label: "Clubs Paris", value: "24" }, { label: "Match moyen", value: "90 min" }],
  },
  musculation: {
    description: "Construire, sculpter, progresser. La muscu, c'est l'art de la régularité.",
    facts: ["Densifie les os", "Booste le métabolisme 24h", "Excellente contre le stress chronique"],
    tone: "bg-peach", cat: "black",
    photos: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "450" }, { label: "Salles 11e", value: "14" }, { label: "Sessions/sem.", value: "3,5" }],
  },
  natation: {
    description: "Glisser, respirer, s'étirer. La natation libère le corps et l'esprit.",
    facts: ["Sollicite 80% des muscles", "Zéro impact articulaire", "Améliore la capacité pulmonaire"],
    tone: "bg-sky", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "550" }, { label: "Piscines 11e", value: "4" }, { label: "Sessions/sem.", value: "2" }],
  },
  cycling: {
    description: "Pédaler, accélérer, dévorer la ville. Le vélo, c'est la liberté en mouvement.",
    facts: ["Renforce le bas du corps", "Excellent cardio à faible impact", "Réduit le stress quotidien"],
    tone: "bg-lime/40", cat: "black",
    photos: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "650" }, { label: "Pratiquants", value: "9k" }, { label: "Sessions/sem.", value: "3" }],
  },
  danse: {
    description: "Bouger, vibrer, exprimer. La danse, c'est le sport qui devient art.",
    facts: ["Brûle 400 kcal/h", "Améliore la coordination", "Booste l'estime de soi"],
    tone: "bg-blush", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535525153412-5a092d46317e?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "400" }, { label: "Studios 11e", value: "11" }, { label: "Sessions/sem.", value: "2" }],
  },
  randonnee: {
    description: "Marcher, respirer, contempler. La rando, c'est se reconnecter à l'essentiel.",
    facts: ["Réduit l'anxiété de 40%", "Renforce le cœur", "Améliore la créativité"],
    tone: "bg-lime/40", cat: "black",
    photos: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "430" }, { label: "Groupes IDF", value: "18" }, { label: "Sorties/mois", value: "3" }],
  },
  tennis: {
    description: "Frapper, courir, anticiper. Le tennis aiguise corps et stratégie.",
    facts: ["1h = 600 kcal", "Améliore les réflexes", "Sport social par essence"],
    tone: "bg-sky", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "600" }, { label: "Clubs Paris", value: "32" }, { label: "Match moyen", value: "75 min" }],
  },
  football: {
    description: "Courir, passer, marquer. Le foot, c'est l'énergie collective à l'état pur.",
    facts: ["Brûle 700 kcal/match", "Renforce l'esprit d'équipe", "Excellent cardio explosif"],
    tone: "bg-lime/40", cat: "black",
    photos: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/match", value: "700" }, { label: "Terrains 11e", value: "5" }, { label: "Joueurs", value: "14k" }],
  },
  basketball: {
    description: "Dribbler, sauter, viser. Le basket muscle le mental autant que le corps.",
    facts: ["Brûle 750 kcal/h", "Améliore la détente", "Sport ultra-cardio"],
    tone: "bg-peach", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518614368389-9b4ac8b8b6c0?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "750" }, { label: "Playgrounds", value: "8" }, { label: "Sessions/sem.", value: "2,5" }],
  },
  escalade: {
    description: "Grimper, calculer, dépasser ses peurs. L'escalade, c'est un puzzle vertical.",
    facts: ["Renforce tout le haut du corps", "Booste la concentration", "Créatif et social"],
    tone: "bg-peach", cat: "black",
    photos: [
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "650" }, { label: "Salles Paris", value: "12" }, { label: "Sessions/sem.", value: "2" }],
  },
  crossfit: {
    description: "Intensité, variété, dépassement. Le CrossFit, c'est se transformer en 45 min.",
    facts: ["Brûle 800 kcal/h", "Combine cardio + force", "Communauté très soudée"],
    tone: "bg-peach", cat: "black",
    photos: [
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "800" }, { label: "Boxes 11e", value: "7" }, { label: "Sessions/sem.", value: "4" }],
  },
  stretching: {
    description: "Étirer, relâcher, respirer. Le stretching, c'est l'antidote au quotidien.",
    facts: ["Réduit les tensions", "Améliore la posture", "Récupération accélérée"],
    tone: "bg-lavender-soft", cat: "lavender",
    photos: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "180" }, { label: "Studios", value: "10" }, { label: "Sessions/sem.", value: "3" }],
  },
  "arts-martiaux": {
    description: "Discipline, respect, puissance. Les arts martiaux forgent le corps et le caractère.",
    facts: ["Améliore la confiance", "Brûle 700 kcal/h", "Renforce la discipline mentale"],
    tone: "bg-blush", cat: "black",
    photos: [
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80&auto=format&fit=crop",
    ],
    stats: [{ label: "Cal/h", value: "700" }, { label: "Dojos Paris", value: "16" }, { label: "Sessions/sem.", value: "2" }],
  },
};

function SportDetail() {
  const { slug } = Route.useParams();
  const sport = SPORTS.find((s) => slugify(s.label) === slug);
  if (!sport) throw notFound();
  const meta: Meta = META[slug] ?? {
    description: `Le ${sport.label} : un excellent moyen de bouger, se dépasser et créer du lien.`,
    facts: ["Bon pour la santé cardio", "Améliore l'humeur", "Crée du lien social"],
    tone: "bg-lavender-soft", cat: "black",
    photos: FALLBACK_PHOTOS,
    stats: [{ label: "Cal/h", value: "—" }, { label: "Pratiquants", value: "—" }, { label: "Sessions/sem.", value: "—" }],
  };
  const users = PARTNERS.filter((p) => slugify(p.sport) === slug);
  const [view, setView] = useState<"list" | "map">("list");
  const Icon = SPORT_ICONS[sport.label] ?? Dumbbell;

  return (
    <main className="relative min-h-[100dvh] pb-32 bg-background overflow-hidden">
      <MobileHeader title={sport.label} back="/sports" />
      <div className="px-5">
        {/* Hero */}
        <div className={`rounded-[32px] p-6 ${meta.tone} border border-white/60 soft-shadow relative overflow-hidden text-center`}>
          <Icon className="size-20 mx-auto text-ink" strokeWidth={1.6} />
          <h1 className="font-display font-extrabold text-[32px] leading-[0.95] tracking-[0.04em] uppercase mt-4">{sport.label}</h1>
          <p className="text-[14px] text-ink/75 font-medium mt-3 leading-snug">{meta.description}</p>
          <CatPeek tone={meta.cat} corner="br" size={84} delay={0.25} />
        </div>

        {/* Photos */}
        <div className="mt-5 flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 snap-x snap-mandatory pb-2">
          {meta.photos.map((src, i) => (
            <motion.div key={src}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 snap-start w-[240px] h-[160px] rounded-3xl overflow-hidden bg-muted relative">
              <img src={src} alt={`${sport.label} ${i+1}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-2 left-3 text-white text-[11px] font-bold tracking-wider uppercase">{sport.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Key numbers */}
        <h2 className="font-display font-extrabold text-[22px] tracking-tight mt-6">En chiffres</h2>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {meta.stats.map((s, i) => {
            const Icon = i === 0 ? Flame : i === 1 ? Users : Sparkles;
            return (
              <div key={s.label} className="rounded-2xl bg-surface border border-border p-3.5">
                <Icon className="size-4 text-[#7C5CFF]" strokeWidth={2.2} />
                <p className="font-display font-extrabold text-[22px] leading-none mt-2">{s.value}</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Fun facts */}
        <h2 className="font-display font-extrabold text-[22px] tracking-tight mt-7">Le sais-tu ?</h2>
        <div className="grid gap-2.5 mt-3">
          {meta.facts.map((f, i) => (
            <div key={i} className="rounded-2xl bg-surface border border-border p-4">
              <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">Fact #{i+1}</p>
              <p className="text-[14px] font-semibold text-ink mt-1">{f}</p>
            </div>
          ))}
        </div>

        {/* Users practicing — list + map toggle */}
        <div className="mt-7 flex items-center justify-between">
          <h2 className="font-display font-extrabold text-[22px] tracking-tight">Près de toi</h2>
          <div className="inline-flex rounded-full bg-surface border border-border p-1">
            <button onClick={() => setView("list")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold transition ${view === "list" ? "bg-ink text-background" : "text-ink/60"}`}>
              <ListIcon className="size-3" /> Liste
            </button>
            <button onClick={() => setView("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold transition ${view === "map" ? "bg-ink text-background" : "text-ink/60"}`}>
              <MapIcon className="size-3" /> Carte
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <p className="text-[13px] text-muted-foreground mt-3 font-medium">Personne dans tes alentours pour le moment.</p>
        ) : view === "list" ? (
          <div className="space-y-2.5 mt-3">
            {users.map((u) => (
              <Link key={u.id} to="/partner/$id" params={{ id: u.id }}
                className="flex items-center gap-3 rounded-2xl bg-surface border border-border p-3.5 active:scale-[0.99] transition">
                <Avatar name={u.name} size={48} ring="lavender" />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-[15px] leading-tight">{u.name}, {u.age}</p>
                  <p className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3" /> {u.distanceKm} km · {u.level}
                  </p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        ) : (
          <MapView users={users} />
        )}
      </div>
    </main>
  );
}

type MapUser = (typeof PARTNERS)[number];
function MapView({ users }: { users: MapUser[] }) {
  // Stylized faux-map: SVG grid + avatar pins positioned from distance/seed.
  const pins = users.map((u, i) => {
    const angle = (i * 137.5) % 360;
    const r = Math.min(45, 12 + u.distanceKm * 8);
    const x = 50 + r * Math.cos((angle * Math.PI) / 180);
    const y = 50 + r * Math.sin((angle * Math.PI) / 180);
    return { ...u, x, y };
  });
  return (
    <div className="mt-3 rounded-3xl overflow-hidden border border-border bg-lavender-soft relative h-[320px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#7C5CFF" strokeOpacity="0.15" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        <path d="M0,60 Q30,50 50,55 T100,52" stroke="#7C5CFF" strokeOpacity="0.3" strokeWidth="0.6" fill="none" />
        <path d="M0,30 Q40,20 70,35 T100,28" stroke="#FF8A4C" strokeOpacity="0.3" strokeWidth="0.6" fill="none" />
        <circle cx="50" cy="50" r="3" fill="#7C5CFF" />
        <circle cx="50" cy="50" r="8" fill="#7C5CFF" fillOpacity="0.15" />
      </svg>
      {pins.map((p) => (
        <Link key={p.id} to="/partner/$id" params={{ id: p.id }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <div className="size-10 rounded-full ring-2 ring-white shadow-lg overflow-hidden bg-white grid place-items-center">
            <Avatar name={p.name} size={36} />
          </div>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 pill bg-ink text-background text-[9px] font-bold px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
            {p.name.split(" ")[0]}
          </span>
        </Link>
      ))}
      <div className="absolute bottom-3 left-3 pill bg-white/90 backdrop-blur text-[10px] font-bold px-2.5 py-1 flex items-center gap-1">
        <MapPin className="size-3 text-[#7C5CFF]" /> Toi · Paris 11e
      </div>
    </div>
  );
}
