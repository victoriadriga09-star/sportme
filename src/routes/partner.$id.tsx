import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Star, Clock, MessageCircle, Shield } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";
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

function Detail() {
  const p = Route.useLoaderData();
  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      {/* hero — violet liquid glass */}
      <div className="relative h-[48vh] overflow-hidden text-background">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CFF] via-[#9B7BFF] to-[#5B3FD1]" />
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-white/30 blur-3xl float-slow" />
        <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-[#C9B8FF]/60 blur-3xl float-slow" style={{ animationDelay: "1.4s" }} />
        <div className="absolute inset-0 topo-dots opacity-20" />
        <div className="relative z-10">
          <MobileHeader back transparent />
        </div>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/30 blur-2xl scale-110" />
            <div className="relative rounded-full p-1.5 bg-white/25 backdrop-blur-xl border border-white/40 shadow-2xl">
              <Avatar name={p.name} size={156} />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-5 bottom-6">
          <h1 className="font-display font-extrabold text-4xl leading-none drop-shadow-sm">{p.name.split(" ")[0]}, {p.age}</h1>
          <div className="flex gap-2 mt-3 text-xs font-semibold">
            <span className="pill bg-white/20 backdrop-blur-xl border border-white/30 px-3 py-1.5 flex items-center gap-1"><Star className="size-3 fill-current" /> {p.rating}</span>
            <span className="pill bg-white/20 backdrop-blur-xl border border-white/30 px-3 py-1.5">{p.sessions} séances</span>
            <span className="pill bg-white/20 backdrop-blur-xl border border-white/30 px-3 py-1.5 flex items-center gap-1"><Shield className="size-3" /> {p.reliability}%</span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 relative space-y-5 pt-2">
        <section className="rounded-3xl bg-surface border border-border p-5 soft-shadow">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Sport</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Pill tone="lime">{p.sport}</Pill>
            <Pill tone="lavender">{p.level}</Pill>
          </div>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-5">Dispo</p>
          <p className="mt-2 text-sm flex items-center gap-2 font-semibold text-emerald-700"><Clock className="size-4" /> {p.when}</p>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-5">Lieu</p>
          <p className="mt-2 text-sm flex items-center gap-2"><MapPin className="size-4" /> {p.place} · {p.distanceKm} km</p>
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
      </div>

      {/* sticky actions */}
      <div className="fixed bottom-0 inset-x-0 px-5 pb-7 pt-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <div className="max-w-[430px] mx-auto flex gap-2 pointer-events-auto">
          <Link to="/chat/$id" params={{ id: p.id }} className="flex-1 pill border border-ink text-ink py-3.5 font-semibold flex items-center justify-center gap-2">
            <MessageCircle className="size-4" /> Écrire
          </Link>
          <Link to="/request-sent" className="flex-1 pill bg-lime text-ink py-3.5 font-bold lime-glow text-center">
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
