import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { SplashElan } from "@/components/SplashElan";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ÉLAN — Ne fais plus de sport seul·e" },
      { name: "description", content: "Trouve un partenaire sportif près de chez toi, disponible quand tu l'es." },
    ],
  }),
  component: Welcome,
});

const SLIDES = [
  {
    eyebrow: "La promesse",
    title: "Ne fais plus\nde sport seul·e",
    body: "Trouve un partenaire sportif près de chez toi, disponible quand tu l'es.",
    bg: "bg-lime",
    blobs: ["bg-lavender", "bg-ink"],
  },
  {
    eyebrow: "Le mécanisme",
    title: "Sport.\nHoraire.\nLieu. Match.",
    body: "Dis-nous ce que tu veux faire, quand et où — on te connecte avec la bonne personne.",
    bg: "bg-lavender",
    blobs: ["bg-lime", "bg-peach"],
  },
  {
    eyebrow: "La communauté",
    title: "Rejoins\nune commu\nqui bouge",
    body: "Partage, motive-toi, progresse — ensemble.",
    bg: "bg-ink text-background",
    blobs: ["bg-lime", "bg-lavender"],
  },
] as const;

function Welcome() {
  const [i, setI] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("elan.splashSeen")) setShowSplash(false);
      else sessionStorage.setItem("elan.splashSeen", "1");
    } catch {}
  }, []);
  const slide = SLIDES[i];
  return (
    <>
      <AnimatePresence>{showSplash && <SplashElan onDone={() => setShowSplash(false)} />}</AnimatePresence>
      <main className="relative min-h-[100dvh] flex flex-col">
      <div className={`flex-1 ${slide.bg} relative overflow-hidden transition-colors duration-500`}>
        {/* deco blobs */}
        <div className={`absolute -top-16 -right-20 size-64 rounded-full ${slide.blobs[0]} opacity-80 blur-2xl`} />
        <div className={`absolute top-1/3 -left-20 size-48 rounded-full ${slide.blobs[1]} opacity-70 blur-2xl`} />
        <div className="absolute inset-0 topo-dots opacity-30" />

        <div className="relative px-6 pt-14 flex items-center justify-between">
          <span className="font-display font-extrabold text-2xl tracking-tight">ÉLAN</span>
          <button onClick={() => setI(SLIDES.length - 1)} className="text-xs font-semibold opacity-70">
            Passer
          </button>
        </div>

        <div className="relative px-6 mt-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70">
            {slide.eyebrow}
          </p>
          <h1 className="mt-3 font-display font-extrabold text-[44px] leading-[0.95] whitespace-pre-line tracking-tight">
            {slide.title}
          </h1>
          <p className="mt-5 text-base opacity-80 max-w-[28ch] leading-relaxed">{slide.body}</p>
        </div>
      </div>

      <div className="bg-background px-6 pt-6 pb-10 rounded-t-[32px] -mt-6 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          {SLIDES.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Slide ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                k === i ? "w-8 bg-ink" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>

        {i < SLIDES.length - 1 ? (
          <button
            onClick={() => setI(i + 1)}
            className="w-full pill bg-ink text-background py-4 font-semibold flex items-center justify-center gap-2"
          >
            Continuer <ArrowRight className="size-4" />
          </button>
        ) : (
          <Link
            to="/onboarding"
            className="w-full pill bg-lime text-ink py-4 font-semibold flex items-center justify-center gap-2 lime-glow"
          >
            Commencer <ArrowRight className="size-4" />
          </Link>
        )}

        <Link to="/login" className="block text-center mt-4 text-sm text-muted-foreground">
          J'ai déjà un compte — <span className="text-ink font-semibold underline underline-offset-4">Se connecter</span>
        </Link>
      </div>
    </main>
    </>
  );
}
