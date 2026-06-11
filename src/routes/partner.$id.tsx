import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Star, Clock, MessageCircle, Shield, Dumbbell, Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { PARTNERS } from "@/data/mock";

export const Route = createFileRoute("/partner/$id")({
  loader: ({ params }) => {
    const p = PARTNERS.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.name ?? "Partenaire"} — ÉLAN` }],
  }),
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center text-muted-foreground">Partenaire introuvable.</div>,
  component: Detail,
});

const REVIEWS = [
  { id: "r1", name: "Marie D.", sport: "Yoga", rating: 5, text: "Super partenaire, ponctuel et motivant. On a tenu un rythme top sur 6 semaines.", tone: "lavender" as const },
  { id: "r2", name: "Léa M.",   sport: "Running", rating: 5, text: "Énergie au top dès 7h du matin. Sans lui je n'aurais jamais couru sous la pluie.", tone: "peach"    as const },
  { id: "r3", name: "Adam B.",  sport: "Padel",  rating: 4, text: "Bon niveau, esprit fair-play. Toujours dispo pour rejouer.",                          tone: "sky"      as const },
  { id: "r4", name: "Inès R.",  sport: "Pilates", rating: 5, text: "Hyper respectueux, séances vraiment cadrées. Je recommande à 100%.",                  tone: "lime"     as const },
];

const TONE_BG: Record<string, string> = {
  lavender: "bg-lavender-soft",
  peach: "bg-peach",
  sky: "bg-sky-100",
  lime: "bg-lime/40",
};

function Detail() {
  const p = Route.useLoaderData();
  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      {/* hero — violet liquid glass */}
      <div className="relative h-[48vh] overflow-hidden text-background">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CFF] via-[#9B7BFF] to-[#5B3FD1]" />
        
        <div className="relative z-10">
          <MobileHeader back transparent />
        </div>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="relative">
            <div className="relative rounded-full p-1.5 bg-white/25 backdrop-blur-xl border border-white/40 shadow-2xl">
              <Avatar name={p.name} size={156} />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-5 bottom-6">
          <h1 className="font-display font-extrabold text-4xl leading-none drop-shadow-sm">{p.name.split(" ")[0]}, {p.age}</h1>
          <div className="flex gap-2 mt-3 text-xs font-semibold">
            <span className="pill bg-white/20 backdrop-blur-xl border border-white/30 px-3 py-1.5 flex items-center gap-1"><Star className="size-3 fill-[#FACC15] text-[#FACC15]" /> {p.rating}</span>
            <span className="pill bg-white/20 backdrop-blur-xl border border-white/30 px-3 py-1.5">{p.sessions} séances</span>
            <span className="pill bg-white/20 backdrop-blur-xl border border-white/30 px-3 py-1.5 flex items-center gap-1"><Shield className="size-3" /> {p.reliability}%</span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 relative space-y-6 pt-2">
        {/* Sport · Dispo · Lieu — restylé */}
        <section className="relative rounded-[28px] bg-surface border border-white/60 p-5 soft-shadow overflow-hidden">
          

          {/* Sport */}
          <div className="relative flex items-start gap-3">
            <div className="size-11 rounded-2xl bg-gradient-to-br from-[#7C5CFF] to-[#5B3FD1] grid place-items-center shrink-0 shadow-lg">
              <Dumbbell className="size-5 text-white" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.22em] font-bold text-muted-foreground">SPORT</p>
              <p className="font-display font-extrabold text-[26px] leading-tight mt-0.5 text-ink">{p.sport}</p>
              <div className="mt-1.5 inline-flex pill bg-lavender-soft text-ink px-3 py-1 text-[11px] font-bold border border-white/60">
                {p.level}
              </div>
            </div>
          </div>

          <div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent my-5" />

          {/* Dispo + Lieu en split */}
          <div className="relative grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-emerald-600" />
                <p className="text-[10px] tracking-[0.22em] font-bold text-muted-foreground">DISPO</p>
              </div>
              <p className="font-display font-bold text-[18px] leading-tight mt-1 text-emerald-700">{p.when}</p>
              <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Confirmé
              </div>
            </div>
            <div className="border-l border-border pl-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-[#7C5CFF]" />
                <p className="text-[10px] tracking-[0.22em] font-bold text-muted-foreground">LIEU</p>
              </div>
              <p className="font-display font-bold text-[18px] leading-tight mt-1 text-ink">{p.place}</p>
              <p className="text-[11px] text-muted-foreground font-semibold mt-1">à {p.distanceKm} km de toi</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display font-bold text-lg mb-2">À propos</h2>
          <p className="text-sm leading-relaxed text-ink/80">{p.bio}</p>
        </section>

        <section className="grid grid-cols-3 gap-3">
          <Stat value={p.sessions} label="Séances" />
          <Stat value={14} label="Partenaires" />
          <Stat value={`${p.reliability}%`} label="Fiabilité" />
        </section>

        {/* Reviews — horizontal scroll */}
        <section>
          <div className="flex items-end justify-between mb-3">
            <div>
              <h2 className="font-display font-extrabold text-[22px] tracking-tight leading-none">Avis</h2>
              <p className="text-[12px] text-muted-foreground mt-1 font-medium">Ce que ses partenaires disent</p>
            </div>
            <span className="pill bg-lavender-soft text-ink px-3 py-1 text-[11px] font-bold flex items-center gap-1">
              <Sparkles className="size-3" /> {REVIEWS.length}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 snap-x snap-mandatory pb-2">
            {REVIEWS.map((r, i) => (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`shrink-0 snap-start w-[78%] rounded-[24px] ${TONE_BG[r.tone]} border border-white/60 p-5 soft-shadow relative overflow-hidden`}
              >
                <Quote className="absolute top-3 right-3 size-7 text-ink/15" strokeWidth={2.5} />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className={`size-3.5 ${k < r.rating ? "fill-[#FACC15] text-[#FACC15]" : "text-ink/20"}`} />
                  ))}
                </div>
                <p className="mt-3 text-[14px] leading-snug text-ink font-medium">"{r.text}"</p>
                <div className="mt-4 flex items-center gap-2.5">
                  <Avatar name={r.name} size={36} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-ink leading-tight">{r.name}</p>
                    <p className="text-[11px] text-ink/60 font-semibold">{r.sport}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      {/* sticky actions */}
      <div className="fixed bottom-0 inset-x-0 px-5 pb-7 pt-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <div className="max-w-[430px] mx-auto flex gap-2 pointer-events-auto">
          <Link to="/chat/$id" params={{ id: p.id }} className="flex-1 pill border border-ink text-ink py-3.5 font-semibold flex items-center justify-center gap-2">
            <MessageCircle className="size-4" /> Écrire
          </Link>
          <Link to="/request-sent" className="flex-1 pill bg-[#7C5CFF] text-white py-3.5 font-bold violet-glow text-center shadow-lg">
            S'entraîner ensemble
          </Link>
        </div>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-2xl bg-surface border border-border p-4 text-center">
      <p className="font-display font-extrabold text-2xl">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
