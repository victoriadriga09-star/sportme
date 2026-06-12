import { useState } from "react";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable";

export function OrDivider() {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
      <span className="flex-1 h-px bg-border" /> ou <span className="flex-1 h-px bg-border" />
    </div>
  );
}

export function GoogleButton({ label = "Continuer avec Google" }: { label?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Connexion Google impossible", {
          description: result.error.message ?? "Réessaie dans un instant.",
        });
        setLoading(false);
        return;
      }
      // On redirect, browser navigates away. On token return, listener in __root handles nav.
    } catch (e) {
      toast.error("Connexion Google impossible", {
        description: e instanceof Error ? e.message : String(e),
      });
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="w-full h-12 rounded-2xl bg-surface border border-border text-ink font-semibold flex items-center justify-center gap-3 active:scale-[0.99] transition soft-shadow disabled:opacity-60"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.2 44 30 44 24c0-1.2-.1-2.3-.4-3.5z"/>
      </svg>
      {loading ? "Connexion…" : label}
    </button>
  );
}
