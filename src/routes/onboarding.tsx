import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Camera, MapPin, Eye, EyeOff } from "lucide-react";
import { Pill } from "@/components/Pill";
import { SPORTS } from "@/data/mock";
import { saveUser } from "@/lib/store";

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

  const steps: { title: string; sub?: string; ok: boolean; node: ReactNode }[] = [
    { title: "Comment tu t'appelles ?", sub: "Ton prénom sera visible par les autres sportifs.", ok: f.prenom.trim().length >= 2,
      node: <Input value={f.prenom} onChange={(v) => update("prenom", v)} placeholder="Ton prénom" autoFocus /> },
    { title: "Quelle est ta date de naissance ?", sub: "On ne l'affichera pas — c'est juste pour adapter ton expérience.", ok: f.dob.length === 10,
      node: <Input value={f.dob} onChange={(v) => update("dob", v)} placeholder="JJ / MM / AAAA" /> },
    { title: "Comment tu te définis ?", sub: "Certains sportifs préfèrent s'entraîner avec une personne du même genre.", ok: !!f.gender,
      node: <CardChoices value={f.gender} onChange={(v) => update("gender", v)} options={["Femme", "Homme", "Non-binaire", "Je préfère ne pas dire"]} /> },
    { title: "Ton adresse email", sub: "Pour ton compte et tes notifications.", ok: /.+@.+\..+/.test(f.email),
      node: <Input type="email" value={f.email} onChange={(v) => update("email", v)} placeholder="email@exemple.com" /> },
    { title: "Choisis un mot de passe", sub: "Minimum 8 caractères.", ok: f.password.length >= 8,
      node: <PasswordInput value={f.password} onChange={(v) => update("password", v)} /> },
    { title: "Où est-ce que tu habites ?", sub: "Pour te proposer des partenaires près de chez toi.", ok: f.city.trim().length >= 2,
      node: <CityInput value={f.city} onChange={(v) => update("city", v)} /> },
    { title: "Où pratiques-tu le sport ?", sub: "Tu peux en choisir plusieurs.", ok: f.lieux.length > 0,
      node: <Grid2 selected={f.lieux} onToggle={(v) => toggle("lieux", v)} options={[
        { v: "Salle", emoji: "🏋️" }, { v: "Extérieur", emoji: "🌳" },
        { v: "Maison", emoji: "🏠" }, { v: "Visio", emoji: "💻" },
      ]} /> },
    { title: "Dans quelle salle tu t'entraînes ?", sub: "Ça nous aide à te connecter avec des gens qui vont au même endroit.", ok: true,
      node: f.lieux.includes("Salle")
        ? <Input value={f.salle} onChange={(v) => update("salle", v)} placeholder="Ex : FitZone Belleville" />
        : <p className="text-center text-muted-foreground text-sm">On passe — tu n'as pas sélectionné « Salle ».</p>,
    },
    { title: "Quels sports tu aimes ?", sub: "Choisis tout ce qui te parle.", ok: f.sports.length >= 1,
      node: (
        <div className="flex flex-wrap gap-2 justify-center max-h-[50vh] overflow-y-auto no-scrollbar pb-4">
          {SPORTS.map((s) => {
            const on = f.sports.includes(s.label);
            return (
              <button key={s.label} onClick={() => toggle("sports", s.label)}
                className={`pill text-sm font-semibold px-4 py-2.5 border transition ${
                  on ? "bg-lime text-ink border-ink" : "bg-surface text-ink border-border"
                }`}>
                <span className="mr-1">{s.emoji}</span> {s.label}
              </button>
            );
          })}
        </div>
      ) },
    { title: "Quel est ton niveau ?", sub: "Pas de jugement — c'est pour trouver des partenaires au bon rythme.", ok: !!f.level,
      node: <CardChoices value={f.level} onChange={(v) => update("level", v)} options={[
        ["Débutant·e", "Je commence ou je reprends"],
        ["Intermédiaire", "Je pratique régulièrement"],
        ["Avancé·e", "Je m'entraîne sérieusement"],
        ["Expert·e", "Le sport, c'est ma vie"],
      ]} /> },
    { title: "Qu'est-ce qui te motive ?", sub: "Choisis l'objectif qui te parle le plus.", ok: !!f.goal,
      node: <CardChoices value={f.goal} onChange={(v) => update("goal", v)} options={[
        "💪 Me remettre en forme",
        "🔥 Perdre du poids",
        "🧘 Gagner en souplesse",
        "🤝 Trouver un·e partenaire d'entraînement",
        "✨ Rejoindre une communauté",
        "🎉 Juste découvrir et m'amuser",
      ]} /> },
    { title: "Combien de fois par semaine ?", sub: "Même une fois, c'est déjà bien.", ok: f.freq > 0,
      node: <FreqPicker value={f.freq} onChange={(v) => update("freq", v)} /> },
    { title: "Tes jours de sport sont plutôt…", ok: !!f.rythme,
      node: <CardChoices value={f.rythme} onChange={(v) => update("rythme", v)} options={[
        ["📅 Toujours les mêmes jours", "Tu as un planning régulier"],
        ["🔀 Ça change chaque semaine", "Tu t'adaptes selon ta dispo"],
      ]} /> },
    { title: "Tu préfères bouger quand ?", sub: "Choisis un ou plusieurs créneaux.", ok: f.creneaux.length > 0,
      node: <Grid2 selected={f.creneaux} onToggle={(v) => toggle("creneaux", v)} options={[
        { v: "Tôt le matin", emoji: "🌅", hint: "Avant 9h" },
        { v: "Le midi", emoji: "☀️", hint: "12h-14h" },
        { v: "Fin de journée", emoji: "🌇", hint: "17h-20h" },
        { v: "Le soir", emoji: "🌙", hint: "Après 20h" },
      ]} /> },
    { title: "Parle un peu de toi", sub: "Quelques mots pour donner envie. (Optionnel)", ok: true,
      node: (
        <div className="relative">
          <textarea
            value={f.bio} onChange={(e) => update("bio", e.target.value.slice(0, 300))}
            placeholder="Ex : J'adore courir le matin dans le parc. Je cherche quelqu'un pour me motiver les jours où Netflix gagne..."
            className="w-full h-40 p-4 rounded-2xl bg-input focus:ring-2 focus:ring-lime outline-none resize-none"
          />
          <span className="absolute bottom-3 right-4 text-[11px] text-muted-foreground">{f.bio.length}/300</span>
        </div>
      ) },
    { title: "Ajoute une photo", sub: "Les profils avec photo reçoivent 3× plus de demandes.", ok: true,
      node: (
        <div className="flex justify-center">
          <button
            onClick={() => update("photo", !f.photo)}
            className={`size-32 rounded-full grid place-items-center transition ${
              f.photo ? "bg-gradient-to-br from-lavender to-lime" : "bg-input"
            }`}
          >
            <Camera className="size-9" strokeWidth={1.6} />
          </button>
        </div>
      ) },
    { title: `Bienvenue, ${f.prenom || "champion"} !`, sub: "Ton profil est prêt. Trouve ton premier partenaire.", ok: true,
      node: (
        <div className="text-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {f.sports.slice(0, 3).map((s) => <Pill key={s} tone="lime" size="md">{s}</Pill>)}
            {f.city && <Pill tone="lavender" size="md">📍 {f.city}</Pill>}
            {f.freq > 0 && <Pill tone="ink" size="md">{f.freq}×/sem</Pill>}
          </div>
        </div>
      ) },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  // Skip salle screen automatically
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
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* progress + back */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={step === 0}
            className="size-9 grid place-items-center rounded-full bg-surface border border-border disabled:opacity-30"
            aria-label="Retour"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex-1 h-1.5 bg-input rounded-full overflow-hidden">
            <div className="h-full bg-lime transition-[width] duration-400" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[11px] text-muted-foreground tabular-nums font-semibold w-10 text-right">
            {step + 1}/{steps.length}
          </span>
        </div>
      </div>

      <div key={step} className="flex-1 px-6 pt-6 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
        <h1 className="font-display font-extrabold text-[28px] leading-tight">{current.title}</h1>
        {current.sub && <p className="text-sm text-muted-foreground mt-2">{current.sub}</p>}
        <div className="flex-1 mt-8 flex flex-col justify-center">{current.node}</div>
      </div>

      <div className="px-6 pb-10 pt-3">
        <button
          onClick={next}
          disabled={!current.ok}
          className="w-full pill bg-lime text-ink py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:bg-input disabled:text-muted-foreground transition lime-glow"
        >
          {isLast ? "Trouver un partenaire" : "Continuer"} <ChevronRight className="size-4" />
        </button>
        {isLast && (
          <button onClick={() => { saveUser({ prenom: f.prenom, city: f.city, sports: f.sports, gender: f.gender }); nav({ to: "/home" }); }} className="block mx-auto mt-3 text-sm text-muted-foreground">
            Explorer l'app
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
      className="w-full h-14 px-5 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none text-base font-medium"
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
          className="w-full h-14 px-5 pr-14 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none text-base font-medium"
        />
        <button onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${
            i < strength ? (strength === 3 ? "bg-success" : strength === 2 ? "bg-lime" : "bg-warning") : "bg-input"
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
          className="w-full h-14 pl-12 pr-5 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none text-base font-medium"
        />
      </div>
      <button onClick={() => onChange("Paris 11e")} className="w-full pill border border-ink py-3 text-sm font-semibold flex items-center justify-center gap-2">
        <MapPin className="size-4" /> Utiliser ma position
      </button>
    </div>
  );
}

function CardChoices({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: (string | [string, string])[] }) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => {
        const [label, desc] = Array.isArray(opt) ? opt : [opt, undefined];
        const on = value === label;
        return (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`w-full text-left rounded-2xl px-5 py-4 border-2 transition ${
              on ? "bg-lime border-ink" : "bg-surface border-border"
            }`}
          >
            <p className="font-semibold text-ink">{label}</p>
            {desc && <p className={`text-xs mt-0.5 ${on ? "text-ink/70" : "text-muted-foreground"}`}>{desc}</p>}
          </button>
        );
      })}
    </div>
  );
}

function Grid2({
  selected, onToggle, options,
}: { selected: string[]; onToggle: (v: string) => void; options: { v: string; emoji: string; hint?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((o) => {
        const on = selected.includes(o.v);
        return (
          <button
            key={o.v}
            onClick={() => onToggle(o.v)}
            className={`aspect-square rounded-3xl border-2 flex flex-col items-center justify-center gap-2 transition ${
              on ? "bg-lime border-ink" : "bg-surface border-border"
            }`}
          >
            <span className="text-3xl">{o.emoji}</span>
            <span className="font-semibold text-sm">{o.v}</span>
            {o.hint && <span className="text-[11px] text-ink/60">{o.hint}</span>}
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
              on ? "bg-lime text-ink size-20 text-3xl lime-glow" : "bg-surface border border-border text-ink size-14 text-xl"
            }`}
          >
            {n}{n === 5 && "+"}
          </button>
        );
      })}
    </div>
  );
}
