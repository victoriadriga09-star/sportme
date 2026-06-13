import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ChevronLeft, ArrowRight, Camera, MapPin, Eye, EyeOff, Check, Sparkles, type LucideIcon } from "lucide-react";
import { Pill } from "@/components/Pill";
import { SPORTS } from "@/data/mock";
import { saveUser } from "@/lib/store";
import { LIEU_ICONS, CRENEAU_ICONS, GOAL_ICONS, RYTHME_ICONS, SPORT_ICONS } from "@/lib/icons";
import { GoogleButton, OrDivider } from "@/components/GoogleButton";


export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Créer mon compte — ÉLAN" }] }),
  component: Onboarding,
});

type Form = {
  prenom: string; dob: string; gender: string;
  email: string; password: string;
  city: string; lieux: string[]; salle: string;
  sports: string[]; level: string; goal: string;
  freq: number; rythme: string; jours: string[]; creneaux: string[];
  bio: string; photo: boolean;
};

const INITIAL: Form = {
  prenom: "", dob: "", gender: "",
  email: "", password: "",
  city: "", lieux: [], salle: "",
  sports: [], level: "", goal: "",
  freq: 0, rythme: "", jours: [], creneaux: [],
  bio: "", photo: false,
};

function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(INITIAL);
  const update = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (k: "lieux" | "sports" | "jours" | "creneaux", v: string) =>
    setF((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  const steps: { title: string; sub?: string; eyebrow: string; ok: boolean; node: ReactNode }[] = [
    { eyebrow: "Profil", title: "Comment tu t'appelles ?", sub: "Ton prénom sera visible par les autres sportifs.", ok: f.prenom.trim().length >= 2,
      node: <Input value={f.prenom} onChange={(v) => update("prenom", v)} placeholder="Ton prénom" autoFocus /> },
    { eyebrow: "Profil", title: "Date de naissance", sub: "On ne l'affichera pas — c'est juste pour adapter ton expérience.", ok: f.dob.length === 10,
      node: <Input value={f.dob} onChange={(v) => update("dob", v)} placeholder="JJ / MM / AAAA" /> },
    { eyebrow: "Profil", title: "Comment tu te définis ?", sub: "Certains préfèrent s'entraîner avec une personne du même genre.", ok: !!f.gender,
      node: <CardChoices value={f.gender} onChange={(v) => update("gender", v)} options={["Femme", "Homme", "Non-binaire", "Je préfère ne pas dire"]} /> },
    { eyebrow: "Compte", title: "Ton adresse email", sub: "Pour ton compte et tes notifications.", ok: /.+@.+\..+/.test(f.email),
      node: (
        <div className="space-y-4">
          <Input type="email" value={f.email} onChange={(v) => update("email", v)} placeholder="email@exemple.com" />
          <OrDivider />
          <GoogleButton />
        </div>
      ) },
    { eyebrow: "Compte", title: "Choisis un mot de passe", sub: "Minimum 8 caractères.", ok: f.password.length >= 8,
      node: <PasswordInput value={f.password} onChange={(v) => update("password", v)} /> },
    { eyebrow: "Localisation", title: "Où est-ce que tu habites ?", sub: "Pour te proposer des partenaires près de chez toi.", ok: f.city.trim().length >= 2,
      node: <CityInput value={f.city} onChange={(v) => update("city", v)} /> },
    { eyebrow: "Localisation", title: "Où pratiques-tu le sport ?", sub: "Tu peux en choisir plusieurs.", ok: f.lieux.length > 0,
      node: <Grid2 selected={f.lieux} onToggle={(v) => toggle("lieux", v)} options={[
        { v: "Salle", icon: LIEU_ICONS.Salle }, { v: "Extérieur", icon: LIEU_ICONS.Extérieur },
        { v: "Maison", icon: LIEU_ICONS.Maison }, { v: "Visio", icon: LIEU_ICONS.Visio },
      ]} /> },
    { eyebrow: "Localisation", title: "Dans quelle salle tu t'entraînes ?", sub: "Ça nous aide à te connecter avec des gens qui vont au même endroit.", ok: true,
      node: f.lieux.includes("Salle")
        ? <Input value={f.salle} onChange={(v) => update("salle", v)} placeholder="Ex : FitZone Belleville" />
        : <p className="text-center text-background/60 text-sm">On passe — tu n'as pas sélectionné « Salle ».</p>,
    },
    { eyebrow: "Sport", title: "Quels sports tu aimes ?", sub: "Choisis tout ce qui te parle.", ok: f.sports.length >= 1,
      node: (
        <div className="flex flex-wrap gap-2 justify-center max-h-[38vh] overflow-y-auto no-scrollbar pb-2">
          {SPORTS.map((s) => {
            const on = f.sports.includes(s.label);
            const Icon = SPORT_ICONS[s.label] ?? Sparkles;
            return (
              <button key={s.label} onClick={() => toggle("sports", s.label)}
                className={`pill text-sm font-semibold pl-2.5 pr-4 py-2 border transition flex items-center gap-2 ${
                  on ? "bg-ink text-background border-ink ink-shadow" : "bg-surface text-ink border-border"
                }`}>
                <span className={`size-7 rounded-full grid place-items-center ${on ? "bg-background/15" : "bg-lavender-soft/70"}`}>
                  <Icon className="size-3.5" strokeWidth={2.2} />
                </span>
                {s.label}
              </button>
            );
          })}
        </div>
      ) },
    { eyebrow: "Sport", title: "Quel est ton niveau ?", sub: "Pas de jugement — c'est pour trouver des partenaires au bon rythme.", ok: !!f.level,
      node: <CardChoices value={f.level} onChange={(v) => update("level", v)} options={[
        ["Débutant·e", "Je commence ou je reprends"],
        ["Intermédiaire", "Je pratique régulièrement"],
        ["Avancé·e", "Je m'entraîne sérieusement"],
        ["Expert·e", "Le sport, c'est ma vie"],
      ]} /> },
    { eyebrow: "Sport", title: "Qu'est-ce qui te motive ?", sub: "Choisis l'objectif qui te parle le plus.", ok: !!f.goal,
      node: <CardChoices value={f.goal} onChange={(v) => update("goal", v)} iconMap={GOAL_ICONS} options={[
        "Me remettre en forme",
        "Perdre du poids",
        "Gagner en souplesse",
        "Trouver un·e partenaire d'entraînement",
        "Rejoindre une communauté",
        "Juste découvrir et m'amuser",
      ]} /> },
    { eyebrow: "Rythme", title: "Combien de fois par semaine ?", sub: "Même une fois, c'est déjà bien.", ok: f.freq > 0,
      node: <FreqPicker value={f.freq} onChange={(v) => update("freq", v)} /> },
    { eyebrow: "Rythme", title: "Tes jours de sport sont plutôt…", ok: !!f.rythme,
      node: <CardChoices value={f.rythme} onChange={(v) => update("rythme", v)} iconMap={RYTHME_ICONS} options={[
        ["Toujours les mêmes jours", "Tu as un planning régulier"],
        ["Ça change chaque semaine", "Tu t'adaptes selon ta dispo"],
      ]} /> },
    { eyebrow: "Rythme", title: "Tu préfères bouger quand ?", sub: "Choisis un ou plusieurs créneaux.", ok: f.creneaux.length > 0,
      node: <Grid2 selected={f.creneaux} onToggle={(v) => toggle("creneaux", v)} options={[
        { v: "Tôt le matin", icon: CRENEAU_ICONS["Tôt le matin"], hint: "Avant 9h" },
        { v: "Le midi", icon: CRENEAU_ICONS["Le midi"], hint: "12h-14h" },
        { v: "Fin de journée", icon: CRENEAU_ICONS["Fin de journée"], hint: "17h-20h" },
        { v: "Le soir", icon: CRENEAU_ICONS["Le soir"], hint: "Après 20h" },
      ]} /> },
    { eyebrow: "Bio", title: "Parle un peu de toi", sub: "Quelques mots pour donner envie. (Optionnel)", ok: true,
      node: (
        <div className="relative">
          <textarea
            value={f.bio} onChange={(e) => update("bio", e.target.value.slice(0, 300))}
            placeholder="Ex : J'adore courir le matin dans le parc. Je cherche quelqu'un pour me motiver les jours où Netflix gagne..."
            className="w-full h-32 p-4 rounded-2xl bg-surface border border-border text-ink placeholder:text-muted-foreground focus:ring-2 focus:ring-ink outline-none resize-none"
          />
          <span className="absolute bottom-3 right-4 text-[11px] text-muted-foreground">{f.bio.length}/300</span>
        </div>
      ) },
    { eyebrow: "Profil", title: "Ajoute une photo", sub: "Les profils avec photo reçoivent 3× plus de demandes.", ok: true,
      node: (
        <div className="flex justify-center">
          <button
            onClick={() => update("photo", !f.photo)}
            className={`size-28 rounded-full grid place-items-center transition relative ${
              f.photo ? "orb-3d ink-shadow" : "bg-surface border-2 border-dashed border-border"
            }`}
          >
            <Camera className={`size-9 ${f.photo ? "text-ink" : "text-muted-foreground"}`} strokeWidth={1.6} />
            {f.photo && <span className="absolute -top-1 -right-1 size-8 rounded-full bg-ink text-background grid place-items-center ink-shadow"><Check className="size-4" strokeWidth={3} /></span>}
          </button>
        </div>
      ) },
    { eyebrow: "Terminé", title: `Bienvenue, ${f.prenom || "champion"} !`, sub: "Ton profil est prêt. Trouve ton premier partenaire.", ok: true,
      node: (
        <div className="text-center space-y-5">
          <div className="mx-auto size-20 rounded-full grid place-items-center orb-3d violet-glow">
            <Sparkles className="size-8 text-ink" strokeWidth={2} />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {f.sports.slice(0, 3).map((s) => <Pill key={s} tone="lime" size="md">{s}</Pill>)}
            {f.city && <Pill tone="lavender" size="md"><MapPin className="size-3.5 inline -mt-0.5 mr-1" />{f.city}</Pill>}
            {f.freq > 0 && <Pill tone="white" size="md">{f.freq}×/sem</Pill>}
          </div>
        </div>
      ) },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const totalSegments = steps.length;

  const next = () => {
    let s = step + 1;
    if (s === 7 && !f.lieux.includes("Salle")) s = 8;
    if (s >= steps.length) {
      saveUser({ prenom: f.prenom, city: f.city, sports: f.sports, gender: f.gender });
      nav({ to: "/home" });
      return;
    }
    setStep(s);
  };
  const prev = () => {
    let s = step - 1;
    if (s === 7 && !f.lieux.includes("Salle")) s = 6;
    setStep(Math.max(0, s));
  };

  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col bg-background text-ink relative">
      {/* Ambient floating shapes — pastel sur fond clair */}

      {/* Top bar — segmented progress */}
      <div className="relative px-5 pt-4 pb-1 z-10">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSegments }).map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-ink/10">
              <div className={`h-full rounded-full transition-all duration-500 ${
                i <= step ? "bg-ink w-full" : "w-0"
              }`} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-ink/70">{current.eyebrow}</p>
          <span className="text-[11px] tabular-nums font-semibold text-muted-foreground">
            étape {step + 1}/{totalSegments}
          </span>
        </div>
      </div>

      {/* Content card — liquid glass clair, contenu centré */}
      <div className="relative z-10 flex-1 min-h-0 px-4 pt-3 pb-1 flex flex-col">
        <div
          key={step}
          className="glass-strong rounded-[36px] p-5 pt-6 flex-1 min-h-0 flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-400 overflow-hidden"
        >
          <div className="text-center max-w-[340px] mx-auto">
            <h1 className="font-display font-extrabold text-[26px] leading-[1.08] text-ink">
              {current.title}
            </h1>
            {current.sub && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{current.sub}</p>}
          </div>
          <div className="flex-1 min-h-0 mt-5 flex flex-col justify-center overflow-y-auto no-scrollbar">{current.node}</div>
        </div>
      </div>

      {/* Footer — pill nav */}
      <div className="relative z-10 px-5 pb-5 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={step === 0}
            aria-label="Retour"
            className="size-14 grid place-items-center rounded-full bg-surface border border-border text-ink soft-shadow disabled:opacity-30 shrink-0"
          >
            <ChevronLeft className="size-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={next}
            disabled={!current.ok}
            className="flex-1 h-14 pill bg-ink text-background font-bold flex items-center justify-between gap-2 px-2 pl-6 disabled:opacity-30 transition ink-shadow"
          >
            <span className="text-[15px]">{isLast ? "Trouver un partenaire" : "Continuer"}</span>
            <span className="size-10 rounded-full bg-lime text-ink grid place-items-center">
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </span>
          </button>
        </div>
        {isLast && (
          <button
            onClick={() => { saveUser({ prenom: f.prenom, city: f.city, sports: f.sports, gender: f.gender }); nav({ to: "/home" }); }}
            className="block mx-auto mt-3 text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Explorer l'app sans matcher
          </button>
        )}
      </div>
    </div>
  );
}

function Input(props: { value: string; onChange: (v: string) => void; placeholder: string; type?: string; autoFocus?: boolean }) {
  return (
    <input
      type={props.type ?? "text"}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      className="w-full h-14 px-5 rounded-2xl bg-surface border border-border text-ink placeholder:text-muted-foreground focus:ring-2 focus:ring-ink focus:border-ink outline-none text-base font-medium"
    />
  );
}

function PasswordInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  const strength = value.length >= 12 ? 3 : value.length >= 8 ? 2 : value.length > 0 ? 1 : 0;
  return (
    <div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="w-full h-14 px-5 pr-14 rounded-2xl bg-surface border border-border text-ink placeholder:text-muted-foreground focus:ring-2 focus:ring-ink outline-none text-base font-medium"
        />
        <button onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${
            i < strength ? (strength === 3 ? "bg-success" : strength === 2 ? "bg-ink" : "bg-warning") : "bg-ink/10"
          }`} />
        ))}
      </div>
    </div>
  );
}

function CityInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paris, Lyon, Marseille…"
          className="w-full h-14 pl-12 pr-5 rounded-2xl bg-surface border border-border text-ink placeholder:text-muted-foreground focus:ring-2 focus:ring-ink outline-none text-base font-medium"
        />
      </div>
      <button onClick={() => onChange("Paris 11e")} className="w-full pill bg-lavender text-ink py-3 text-sm font-semibold flex items-center justify-center gap-2">
        <MapPin className="size-4" /> Utiliser ma position
      </button>
    </div>
  );
}

function CardChoices({
  value, onChange, options, iconMap,
}: { value: string; onChange: (v: string) => void; options: (string | [string, string])[]; iconMap?: Record<string, LucideIcon> }) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => {
        const [label, desc] = Array.isArray(opt) ? opt : [opt, undefined];
        const on = value === label;
        const Icon = iconMap?.[label];
        return (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`w-full text-left rounded-2xl px-4 py-4 border transition flex items-center justify-between gap-3 ${
              on
                ? "bg-ink border-ink text-background ink-shadow"
                : "bg-surface border-border text-ink hover:border-ink/40"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {Icon && (
                <span className={`size-10 rounded-2xl grid place-items-center shrink-0 ${on ? "bg-background/15" : "bg-lavender-soft/70"}`}>
                  <Icon className={`size-5 ${on ? "text-background" : "text-ink"}`} strokeWidth={2} />
                </span>
              )}
              <div className="min-w-0">
                <p className="font-semibold">{label}</p>
                {desc && <p className={`text-xs mt-0.5 ${on ? "text-background/70" : "text-muted-foreground"}`}>{desc}</p>}
              </div>
            </div>
            {on && <span className="size-7 rounded-full bg-lime text-ink grid place-items-center shrink-0"><Check className="size-4" strokeWidth={3} /></span>}
          </button>
        );
      })}
    </div>
  );
}

function Grid2({
  selected, onToggle, options,
}: { selected: string[]; onToggle: (v: string) => void; options: { v: string; icon: LucideIcon; hint?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((o) => {
        const on = selected.includes(o.v);
        const Icon = o.icon;
        return (
          <button
            key={o.v}
            onClick={() => onToggle(o.v)}
            className={`aspect-square rounded-3xl border flex flex-col items-center justify-center gap-2 transition relative ${
              on
                ? "bg-ink border-ink text-background ink-shadow"
                : "bg-surface border-border text-ink hover:border-ink/40"
            }`}
          >
            <span className={`size-12 rounded-2xl grid place-items-center ${on ? "bg-background/15" : "bg-lavender-soft/70"}`}>
              <Icon className={`size-6 ${on ? "text-background" : "text-ink"}`} strokeWidth={2} />
            </span>
            <span className="font-semibold text-sm">{o.v}</span>
            {o.hint && <span className={`text-[11px] ${on ? "text-background/60" : "text-muted-foreground"}`}>{o.hint}</span>}
            {on && <span className="absolute top-3 right-3 size-6 rounded-full bg-lime text-ink grid place-items-center"><Check className="size-3.5" strokeWidth={3} /></span>}
          </button>
        );
      })}
    </div>
  );
}

function FreqPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-2">
      {[1, 2, 3, 4, 5].map((n) => {
        const on = value === n;
        return (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`rounded-full font-display font-extrabold transition-all grid place-items-center ${
              on
                ? "bg-ink text-background size-20 text-3xl ink-shadow"
                : "bg-surface border border-border text-ink size-14 text-xl"
            }`}
          >
            {n}{n === 5 && "+"}
          </button>
        );
      })}
    </div>
  );
}
