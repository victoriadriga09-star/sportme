import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronRight, Users, BarChart3, Settings, LogOut,
  Sparkles, Crown, Award, Camera, Heart, Trophy, Flame, Plus, X,
} from "lucide-react";
import { Pill } from "@/components/Pill";
import { Avatar } from "@/components/Avatar";
import { SportPicker } from "@/components/SportPicker";
import { useUser, saveUser } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Mon profil — ÉLAN" }] }),
  component: Profile,
});

const EASE = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring" as const, stiffness: 320, damping: 26 };

// Editorial workout-themed photos (Unsplash, hot-linked)
const GALLERY = [
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=70",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=70",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=70",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=70",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&q=70",
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=400&q=70",
];

function Profile() {
  const [user] = useUser();
  const name = user.prenom || "Toi";
  const firstName = name.split(" ")[0];

  return (
    <main className="min-h-[100dvh] pb-32 bg-[#F4F1EC]">
      {/* Top bar */}
      <header className="px-5 pt-6 flex items-center justify-between">
        <Link to="/home" aria-label="Retour" className="size-10 grid place-items-center rounded-full bg-white border border-black/5 shadow-sm">
          <ChevronRight className="size-5 -scale-x-100" />
        </Link>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/60">Mon profil</p>
        <Link to="/settings" aria-label="Paramètres" className="size-10 grid place-items-center rounded-full bg-white border border-black/5 shadow-sm">
          <Settings className="size-[18px]" strokeWidth={1.8} />
        </Link>
      </header>

      {/* Identity */}
      <section className="px-5 mt-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-4">
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#7C5CFF] via-[#FFB58D] to-[#CCFF00] blur-[2px] opacity-90" />
            <span className="relative block rounded-full p-[3px] bg-[#F4F1EC]">
              <Avatar name={name} size={76} />
            </span>
            <button aria-label="Modifier la photo" className="absolute -bottom-1 -right-1 size-7 grid place-items-center rounded-full bg-ink text-background shadow-md">
              <Camera className="size-3.5" strokeWidth={2} />
            </button>
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-extrabold text-[28px] leading-none tracking-tight text-ink">{name}</h1>
            <p className="text-xs text-muted-foreground mt-1.5">@{firstName.toLowerCase().replace(/\s+/g, "")} · {user.city}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 pill bg-white border border-black/5 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
              <Award className="size-3 text-[#FF7043]" strokeWidth={2.5} /> Niveau Avancé
            </div>
          </div>
        </motion.div>

        {/* Followers / Following / Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ...spring }}
          className="mt-5 grid grid-cols-3 rounded-3xl bg-white border border-black/5 shadow-sm overflow-hidden"
        >
          <SocialStat value="1.2k" label="Followers" />
          <SocialStat value="248" label="Suivis" middle />
          <SocialStat value="34" label="Séances" />
        </motion.div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="pill bg-ink text-background py-3 text-sm font-bold">Suivre</button>
          <button className="pill bg-white border border-black/10 text-ink py-3 text-sm font-bold">Message</button>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="px-5 mt-6 grid grid-cols-6 gap-3">
        {/* Mes séances (calendar) — primary, large */}
        <BentoCard
          to="/sessions"
          className="col-span-6 bg-[#1A1A1A] text-background min-h-[148px]"
          delay={0.05}
        >
          <div className="flex items-start justify-between h-full">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/60">Mes séances</p>
              <p className="font-display font-extrabold text-[34px] leading-none mt-3">12</p>
              <p className="text-xs text-background/70 mt-1.5">à venir · calendrier</p>
            </div>
            <div className="grid grid-cols-4 gap-1.5 max-w-[140px]">
              {[..."MMJVMMJ"].slice(0, 12).map((_, i) => (
                <span key={i} className={`size-5 rounded-md ${[3,5,7,10].includes(i) ? "bg-lime" : "bg-background/10"}`} />
              ))}
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-lime">
            Ouvrir l'agenda <ChevronRight className="size-3.5" />
          </div>
        </BentoCard>

        {/* Stats */}
        <BentoCard to="/stats" className="col-span-3 bg-[#FFC9DE] text-ink min-h-[130px]" delay={0.1}>
          <div className="flex flex-col h-full">
            <BarChart3 className="size-5" strokeWidth={2} />
            <p className="font-display font-extrabold text-lg mt-auto leading-tight">Mes stats</p>
            <p className="text-[11px] text-ink/70">cette semaine</p>
          </div>
        </BentoCard>

        {/* Partenaires */}
        <BentoCard to="/partners" className="col-span-3 bg-[#C9B8FF] text-ink min-h-[130px]" delay={0.15}>
          <div className="flex flex-col h-full">
            <Users className="size-5" strokeWidth={2} />
            <p className="font-display font-extrabold text-lg mt-auto leading-tight">Partenaires</p>
            <p className="text-[11px] text-ink/70">12 personnes</p>
          </div>
        </BentoCard>

        {/* Notes */}
        <BentoCard to="/stats" className="col-span-2 bg-[#FFE9A8] text-ink min-h-[110px]" delay={0.2}>
          <Trophy className="size-5" strokeWidth={2} />
          <p className="font-display font-extrabold text-base mt-3 leading-none">4.9<span className="text-xs font-bold text-ink/60"> /5</span></p>
          <p className="text-[10px] text-ink/70 mt-1">Note moyenne</p>
        </BentoCard>

        {/* Streak */}
        <BentoCard to="/stats" className="col-span-2 bg-white text-ink min-h-[110px]" delay={0.25}>
          <Flame className="size-5 text-[#FF7043]" strokeWidth={2} />
          <p className="font-display font-extrabold text-base mt-3 leading-none">7 jours</p>
          <p className="text-[10px] text-ink/70 mt-1">de série</p>
        </BentoCard>

        {/* Favoris */}
        <BentoCard to="/partners" className="col-span-2 bg-[#B8E0FF] text-ink min-h-[110px]" delay={0.3}>
          <Heart className="size-5" strokeWidth={2} />
          <p className="font-display font-extrabold text-base mt-3 leading-none">23</p>
          <p className="text-[10px] text-ink/70 mt-1">Favoris</p>
        </BentoCard>
      </section>

      {/* Photo gallery */}
      <section className="mt-7">
        <div className="px-5 flex items-center justify-between mb-3">
          <h2 className="font-display font-extrabold text-lg text-ink tracking-tight">Galerie</h2>
          <button className="text-xs font-semibold text-ink/60 flex items-center gap-1">
            <Plus className="size-3.5" /> Ajouter
          </button>
        </div>
        <div className="flex gap-2.5 overflow-x-auto px-5 pb-2 no-scrollbar snap-x snap-mandatory">
          {GALLERY.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i, ...spring }}
              className="snap-start shrink-0 w-[140px] h-[180px] rounded-3xl overflow-hidden bg-white border border-black/5 shadow-sm relative"
            >
              <img src={src} alt="" className="size-full object-cover" loading="lazy" />
              <span className="absolute bottom-2 left-2 pill bg-white/90 backdrop-blur text-[10px] font-semibold px-2 py-0.5">#{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sports tags */}
      <section className="px-5 mt-6">
        <h2 className="font-display font-extrabold text-lg text-ink tracking-tight mb-3">Mes sports</h2>
        <div className="flex flex-wrap gap-2">
          {user.sports.map((s) => (<Pill key={s} tone="lime">{s}</Pill>))}
          <Pill tone="ghost"><Plus className="size-3 inline -mt-0.5" /> Ajouter</Pill>
        </div>
      </section>

      {/* Pro membership — moved to secondary */}
      <section className="px-5 mt-6">
        <Link to="/stats" className="block">
          <motion.div whileTap={{ scale: 0.98 }} className="relative overflow-hidden rounded-3xl p-4 flex items-center gap-3 bg-gradient-to-r from-[#1A1A1A] via-[#2A1F4A] to-[#7C5CFF] text-background shadow-lg">
            <div className="absolute -right-6 -top-6 size-28 rounded-full bg-white/10 blur-2xl" />
            <span className="size-11 rounded-2xl grid place-items-center bg-white/15 backdrop-blur">
              <Crown className="size-5 text-[#FFD58B]" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display font-extrabold text-[15px] leading-tight">Devenir membre Pro</p>
              <p className="text-[11px] text-background/70 mt-0.5">Stats avancées, sans pub, badge exclusif</p>
            </div>
            <ChevronRight className="size-5" />
          </motion.div>
        </Link>
      </section>

      {/* Objective */}
      <section className="px-5 mt-5">
        <div className="rounded-3xl bg-white border border-black/5 p-4 flex items-center justify-between shadow-sm">
          <p className="text-sm font-semibold text-ink flex items-center gap-2">
            <Sparkles className="size-4 text-[#7C5CFF]" /> Rejoindre une communauté
          </p>
          <button className="text-xs font-bold text-[#7C5CFF]">Modifier</button>
        </div>
      </section>

      <section className="px-5 mt-5">
        <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-destructive/80 hover:text-destructive transition">
          <LogOut className="size-4" /> Se déconnecter
        </button>
      </section>
    </main>
  );
}

function SocialStat({ value, label, middle }: { value: string; label: string; middle?: boolean }) {
  return (
    <div className={`py-3 text-center ${middle ? "border-x border-black/5" : ""}`}>
      <p className="font-display font-extrabold text-xl text-ink leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function BentoCard({
  to, children, className = "", delay = 0,
}: { to: string; children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ...spring }}
      whileTap={{ scale: 0.97 }}
    >
      <Link to={to} className={`relative block rounded-3xl p-4 shadow-sm overflow-hidden ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
