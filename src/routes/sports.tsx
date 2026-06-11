import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MobileHeader } from "@/components/MobileHeader";

import { SPORTS } from "@/data/mock";
import { SPORT_ICONS } from "@/lib/icons";
import { Dumbbell } from "lucide-react";

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
      <MobileHeader title="Sports" back="/home" />
      <div className="px-5">
        <div className="text-center">
          <h2 className="font-display font-extrabold text-[34px] leading-[0.95] tracking-tight">
            Explore les
          </h2>
          <h2 className="font-display font-extrabold text-[34px] leading-[0.95] tracking-[0.06em] uppercase text-[#7C5CFF] mt-1">
            disciplines
          </h2>
          <p className="text-[13px] text-muted-foreground mt-3 font-medium">
            Découvre chaque sport et les personnes qui le pratiquent.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {SPORTS.map((s, i) => {
            const Icon = SPORT_ICONS[s.label] ?? Dumbbell;
            return (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.4, ease: [0.22,1,0.36,1] }}>
                <Link to="/sports/$slug" params={{ slug: slugify(s.label) }}
                  className={`block rounded-3xl p-4 aspect-square ${TONES[i % TONES.length]} border border-white/60 soft-shadow active:scale-[0.97] hover:scale-[1.02] transition cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center`}>
                  <Icon className="size-16 text-ink" strokeWidth={1.6} />
                  <p className="font-display font-extrabold text-[18px] leading-tight mt-4 tracking-[0.04em] uppercase">{s.label}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
