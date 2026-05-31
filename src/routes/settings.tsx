import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Paramètres — ÉLAN" }] }),
  component: Settings,
});

const SECTIONS = [
  {
    title: "Compte",
    items: [
      { label: "Modifier l'email" },
      { label: "Modifier le mot de passe" },
      { label: "Numéro de téléphone" },
    ],
  },
  {
    title: "Préférences",
    items: [
      { label: "Notifications matchs", toggle: true },
      { label: "Notifications messages", toggle: true },
      { label: "Notifications communauté", toggle: false },
      { label: "Rappels de séance", toggle: true },
      { label: "Visibilité du profil" },
      { label: "Langue", value: "Français" },
    ],
  },
  {
    title: "Intégrations",
    items: [
      { label: "Google Calendar" },
      { label: "Apple Santé / Google Fit" },
      { label: "Strava" },
    ],
  },
  {
    title: "Confidentialité",
    items: [
      { label: "Politique de confidentialité" },
      { label: "Conditions d'utilisation" },
      { label: "Gérer mes données (RGPD)" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Aide & FAQ" },
      { label: "Signaler un problème" },
      { label: "Contacter le support" },
    ],
  },
] as const;

function Settings() {
  const nav = useNavigate();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Notifications matchs": true, "Notifications messages": true,
    "Notifications communauté": false, "Rappels de séance": true,
  });
  const handleAction = (label: string) => {
    if (label === "Se déconnecter") { toast.success("Déconnecté·e. À bientôt !"); setTimeout(() => nav({ to: "/login" }), 600); return; }
    if (label === "Supprimer mon compte") { toast.error("Suppression de compte demandée — confirme par email."); return; }
    if (label.startsWith("Modifier")) { toast(`${label} — un email te sera envoyé pour confirmer.`); return; }
    if (label === "Langue") { toast("Langue : français (seule disponible pour l'instant)."); return; }
    if (label === "Visibilité du profil") { toast("Ton profil est visible par les sportifs de ta zone."); return; }
    if (["Google Calendar", "Apple Santé / Google Fit", "Strava"].includes(label)) { toast(`Connexion à ${label} bientôt disponible 🔌`); return; }
    if (["Politique de confidentialité", "Conditions d'utilisation"].includes(label)) { toast(`Ouverture de : ${label}`); return; }
    if (label === "Gérer mes données (RGPD)") { toast.success("Export de tes données préparé — tu recevras un lien."); return; }
    if (label === "Aide & FAQ") { toast("Centre d'aide ÉLAN — bientôt en ligne."); return; }
    if (label === "Signaler un problème") { toast.success("Merci ! Notre équipe va regarder ça."); return; }
    if (label === "Contacter le support") { toast("support@elan.app — réponse sous 24h."); return; }
    if (label === "Numéro de téléphone") { toast("Vérification par SMS bientôt disponible."); return; }
    toast(label);
  };
  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader back="/profile" title="Paramètres" />
      <div className="px-5 space-y-5">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-2">{s.title}</h2>
            <div className="rounded-3xl bg-surface border border-border divide-y divide-border overflow-hidden">
              {s.items.map((it: any) => (
                <button key={it.label} onClick={() => !("toggle" in it) && handleAction(it.label)} className="flex items-center gap-3 px-5 py-3.5 w-full text-left active:bg-muted">
                  <span className="flex-1 text-sm font-medium">{it.label}</span>
                  {"toggle" in it ? (
                    <Toggle on={!!toggles[it.label]} onChange={(v) => { setToggles((p) => ({ ...p, [it.label]: v })); toast(`${it.label} : ${v ? "activé" : "désactivé"}`); }} />
                  ) : (
                    <>
                      {"value" in it && <span className="text-xs text-muted-foreground">{it.value}</span>}
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-destructive mb-2 px-2">Danger zone</h2>
          <div className="rounded-3xl bg-surface border border-border divide-y divide-border overflow-hidden">
            <button onClick={() => handleAction("Se déconnecter")} className="flex items-center gap-3 px-5 py-3.5 w-full text-left text-sm font-medium">Se déconnecter</button>
            <button onClick={() => handleAction("Supprimer mon compte")} className="flex items-center gap-3 px-5 py-3.5 w-full text-left text-sm font-semibold text-destructive">Supprimer mon compte</button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative w-11 h-6 rounded-full transition ${on ? "bg-lime" : "bg-input"}`}
      role="switch"
      aria-checked={on}
    >
      <span className={`absolute top-0.5 size-5 rounded-full bg-surface shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}
