import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileHeader } from "@/components/MobileHeader";
import { GoogleButton } from "@/components/GoogleButton";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — ÉLAN" }] }),
  component: Login,
});

function Login() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <MobileHeader back="/" />
      <div className="px-6 pt-2 flex-1">
        <h1 className="font-display font-extrabold text-[32px] leading-tight">Content de te<br/>revoir.</h1>
        <p className="text-muted-foreground mt-2">Connecte-toi pour retrouver tes partenaires.</p>

        <div className="mt-8 space-y-4">
          <GoogleButton />
          <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Email</span>
            <input
              type="email"
              placeholder="email@exemple.com"
              className="mt-1 w-full h-12 px-4 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Mot de passe</span>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full h-12 px-4 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none"
            />
          </label>
          <button className="text-xs text-muted-foreground underline underline-offset-4">Mot de passe oublié ?</button>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-3">
        <Link to="/home" className="block text-center w-full pill bg-lime text-ink py-4 font-semibold lime-glow">
          Se connecter
        </Link>
        <Link to="/onboarding" className="block text-center text-sm text-muted-foreground">
          Pas encore de compte ? <span className="text-ink font-semibold underline underline-offset-4">Créer un compte</span>
        </Link>
      </div>
    </div>
  );
}
