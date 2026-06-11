import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, MapPin } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { SPORTS, PARTNERS } from "@/data/mock";

export const Route = createFileRoute("/sports/$slug")({
  head: () => ({ meta: [{ title: "Sport — ÉLAN" }] }),
  component: SportDetail,
});

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const META: Record<string, { description: string; facts: string[]; tone: string }> = {
  running:   { description: "Sortir, respirer, avaler les kilomètres. Le running, c'est le réinitialiseur ultime.", facts: ["20 min suffisent à réduire le stress", "Brûle 600+ kcal/h", "Renforce le système immunitaire"], tone: "bg-lime/40" },
  yoga:      { description: "Mouvement, souffle, présence. Le yoga unit corps et esprit.", facts: ["Réduit le cortisol", "Améliore le sommeil", "Augmente la mobilité de 35%"], tone: "bg-lavender-soft" },
  boxe:      { description: "Précision, vitesse, mental. La boxe muscle le corps et la concentration.", facts: ["Brûle 800 kcal/h", "Améliore les réflexes", "Libère un max d'endorphines"], tone: "bg-peach" },
  pilates:   { description: "Contrôle, gainage profond, alignement. Le pilates renforce de l'intérieur.", facts: ["Centre = source de force", "Posture améliorée en 10 séances", "Très peu d'impact articulaire"], tone: "bg-blush" },
  padel:     { description: "Mix tennis et squash. Convivial, addictif, ultra-rapide à prendre en main.", facts: ["Match moyen = 90 min de cardio", "Sport en duo par essence", "L'un des plus dynamiques au monde"], tone: "bg-sky" },
  musculation:{description:"Construire, sculpter, progresser. La muscu, c'est l'art de la régularité.", facts:["Densifie les os","Booste le métabolisme 24h","Excellente contre le stress"], tone:"bg-lavender-soft" },
};

function SportDetail() {
  const { slug } = Route.useParams();
  const sport = SPORTS.find((s) => slugify(s.label) === slug);
  if (!sport) throw notFound();
  const meta = META[slug] ?? { description: `Le ${sport.label} : un excellent moyen de bouger, se dépasser et créer du lien.`, facts: ["Bon pour la santé cardio", "Améliore l'humeur", "Crée du lien social"], tone: "bg-lavender-soft" };
  const users = PARTNERS.filter((p) => slugify(p.sport) === slug);

  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader title={sport.label} back="/sports" />
      <div className="px-5">
        <div className={`rounded-[32px] p-6 ${meta.tone} border border-white/60 soft-shadow relative overflow-hidden`}>
          <div className="text-7xl">{sport.emoji}</div>
          <h1 className="font-display font-extrabold text-[36px] leading-[0.95] tracking-tight mt-3">{sport.label}</h1>
          <p className="text-[14px] text-ink/75 font-medium mt-3 leading-snug">{meta.description}</p>
        </div>

        <h2 className="font-display font-extrabold text-[22px] tracking-tight mt-7">Le sais-tu ?</h2>
        <div className="grid gap-2.5 mt-3">
          {meta.facts.map((f, i) => (
            <div key={i} className="rounded-2xl bg-surface border border-border p-4">
              <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">Fact #{i+1}</p>
              <p className="text-[14px] font-semibold text-ink mt-1">{f}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display font-extrabold text-[22px] tracking-tight mt-7">Ils pratiquent ce sport</h2>
        {users.length === 0 ? (
          <p className="text-[13px] text-muted-foreground mt-3 font-medium">Personne dans tes alentours pour le moment.</p>
        ) : (
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
        )}
      </div>
    </main>
  );
}
