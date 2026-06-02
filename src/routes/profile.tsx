import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronRight, Calendar, Users, BarChart3, Settings, HelpCircle, LogOut,
  Sparkles, PersonStanding, Dumbbell, Crown, Award, UserPlus, MessageSquare,
} from "lucide-react";
import { Pill } from "@/components/Pill";
import profileHero from "@/assets/profile-hero.png";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Mon profil — ÉLAN" }] }),
  component: Profile,
});

const MENU = [
  { to: "/stats",         icon: Crown,         label: "Devenir membre Pro",  tone: "from-[#FFD58B] to-[#FFB36B]" },
  { to: "/stats",         icon: BarChart3,     label: "Mes statistiques",    tone: "from-[#FFB5C5] to-[#FF8FA6]" },
  { to: "/sessions",      icon: Calendar,      label: "Mes séances",         tone: "from-[#C9B8FF] to-[#9A7BFF]" },
  { to: "/partners",      icon: Users,         label: "Mes partenaires",     tone: "from-[#B8E0FF] to-[#7CC1FF]" },
] as const;

const QUIET = [
  { to: "/notifications", icon: UserPlus,      label: "Inviter un·e ami·e" },
  { to: "/notifications", icon: MessageSquare, label: "Aide & contact" },
  { to: "/settings",      icon: Settings,      label: "Paramètres" },
] as const;

const spring = { type: "spring" as const, stiffness: 320, damping: 26 };

function Profile() {
  return (
    <main className="min-h-[100dvh] pb-32 bg-gradient-to-b from-lavender-soft via-background to-background">
      {/* hero */}
      <section className="px-6 pt-6 pb-8 text-center relative">
        <div className="flex items-center justify-between">
          <Link to="/home" aria-label="Retour" className="pill bg-white/70 backdrop-blur-xl border border-white/60 px-3.5 py-2 text-sm font-semibold text-ink shadow-sm flex items-center gap-1">
            <ChevronRight className="size-4 -scale-x-100" /> Retour
          </Link>
          <button className="pill bg-white/70 backdrop-blur-xl border border-white/60 px-3.5 py-2 text-xs font-semibold text-ink shadow-sm flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#7C5CFF]" /> Modifier
          </button>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={spring}
          className="relative mx-auto mt-4 size-44 grid place-items-center"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF8A65] via-[#FF7043] to-[#E64A19]" />
          <div className="absolute inset-0 rounded-full topo-dots opacity-25 mix-blend-overlay" />
          <img
            src={profileHero}
            alt="Sofia"
            width={176}
            height={176}
            className="relative size-44 object-contain drop-shadow-[0_12px_24px_rgba(80,40,160,0.25)]"
          />
        </motion.div>

        <h1 className="font-display font-extrabold text-2xl mt-4 text-ink">Sofia Lopez</h1>
        <div className="mt-2 inline-flex items-center gap-1.5 pill bg-white/80 backdrop-blur-xl border border-white/70 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
          <span className="grid place-items-center size-5 rounded-full bg-[#FF7043] text-white">
            <Award className="size-3" strokeWidth={2.5} />
          </span>
          Niveau Avancé
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 max-w-sm mx-auto">
          <Stat value="34" label="Séances" />
          <Stat value="12" label="Partenaires" />
          <Stat value="4.9" label="Note" />
        </div>
      </section>

      {/* white floating card */}
      <motion.section
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.08 }}
        className="mx-4 rounded-[32px] bg-white border border-white shadow-[0_24px_60px_-30px_rgba(80,40,160,0.35)] p-3 space-y-1"
      >
        {MENU.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05 }}>
            <Link
              to={m.to}
              className="flex items-center gap-3.5 px-3 py-3.5 rounded-2xl hover:bg-lavender-soft/50 active:bg-lavender-soft transition"
            >
              <span className={`size-11 rounded-2xl grid place-items-center bg-gradient-to-br ${m.tone} shadow-md`}>
                <m.icon className="size-5 text-white" strokeWidth={2.2} />
              </span>
              <span className="flex-1 text-[15px] font-semibold text-ink">{m.label}</span>
              <ChevronRight className="size-4 text-[#7C5CFF]" />
            </Link>
          </motion.div>
        ))}

        <div className="h-px bg-border my-2 mx-3" />

        {QUIET.map((m) => (
          <Link
            key={m.label}
            to={m.to}
            className="flex items-center gap-3.5 px-3 py-3 rounded-2xl hover:bg-muted/60 transition"
          >
            <span className="size-10 rounded-2xl grid place-items-center bg-muted">
              <m.icon className="size-4 text-muted-foreground" strokeWidth={2} />
            </span>
            <span className="flex-1 text-sm font-semibold text-muted-foreground">{m.label}</span>
            <ChevronRight className="size-4 text-muted-foreground/60" />
          </Link>
        ))}
      </motion.section>

      {/* tags */}
      <section className="px-6 mt-6 space-y-4">
        <Block title="Mes sports">
          <div className="flex flex-wrap gap-2">
            <Pill tone="lime"><PersonStanding className="size-3.5 inline -mt-0.5 mr-1" />Yoga</Pill>
            <Pill tone="lime"><PersonStanding className="size-3.5 inline -mt-0.5 mr-1" />Running</Pill>
            <Pill tone="lime"><Dumbbell className="size-3.5 inline -mt-0.5 mr-1" />Pilates</Pill>
            <Pill tone="ghost">+ Ajouter</Pill>
          </div>
        </Block>

        <Block title="Mon objectif">
          <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 p-4 flex items-center justify-between shadow-sm">
            <p className="text-sm font-semibold text-ink flex items-center gap-2">
              <Sparkles className="size-4 text-[#7C5CFF]" /> Rejoindre une communauté
            </p>
            <button className="text-xs font-semibold text-[#7C5CFF] underline">Modifier</button>
          </div>
        </Block>

        <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-destructive/80 hover:text-destructive transition">
          <LogOut className="size-4" /> Se déconnecter
        </button>
      </section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display font-bold text-base mb-2 text-ink/90">{title}</h2>
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 p-3 shadow-sm"
    >
      <p className="font-display font-extrabold text-xl text-ink">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
    </motion.div>
  );
}
