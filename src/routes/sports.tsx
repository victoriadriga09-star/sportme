import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MobileHeader } from "@/components/MobileHeader";
import { CatPeek } from "@/components/CatPeek";
import { SPORTS } from "@/data/mock";

export const Route = createFileRoute("/sports")({
  head: () => ({ meta: [{ title: "Sports — ÉLAN" }] }),
  component: SportsLibrary,
});

const TONES = ["bg-lavender-soft", "bg-peach", "bg-lime/40", "bg-sky", "bg-blush"];

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function SportsLibrary() {
  return (
    <main className="relative min-h-[100dvh] pb-32 bg-background overflow-hidden">
      <CatPeek tone="orange" corner="tr" size={72} delay={0.3} className="!top-3 !right-3" />
      <MobileHeader title="Sports" back="/home" />
      <div className="px-5">
        <h2 className="font-display font-extrabold text-[34px] leading-[0.95] tracking-tight">Explore les<br/><span className="italic text-[#7C5CFF]">disciplines</span></h2>
        <p className="text-[13px] text-muted-foreground mt-2 font-medium">Découvre chaque sport et les personnes qui le pratiquent.</p>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {SPORTS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4, ease: [0.22,1,0.36,1] }}>
              <Link to="/sports/$slug" params={{ slug: slugify(s.label) }}
                className={`block rounded-3xl p-4 aspect-square ${TONES[i % TONES.length]} border border-white/60 soft-shadow active:scale-[0.97] hover:scale-[1.02] transition cursor-pointer relative overflow-hidden`}>
                <span className="text-4xl">{s.emoji}</span>
                <p className="font-display font-extrabold text-[18px] leading-tight mt-auto absolute bottom-4 left-4 right-4">{s.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Cat hiding bottom-left */}
        <div className="relative h-16 mt-8">
          <CatPeek tone="black" corner="bl" size={64} delay={0.5} />
        </div>
      </div>
    </main>
  );
}

