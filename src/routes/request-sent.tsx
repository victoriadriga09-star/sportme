import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, MapPin } from "lucide-react";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/request-sent")({
  head: () => ({ meta: [{ title: "Demande envoyée — ÉLAN" }] }),
  component: Sent,
});

function Sent() {
  return (
    <main className="min-h-[100dvh] flex flex-col bg-background px-6 py-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative">
          <span className="absolute inset-0 -m-4 rounded-full bg-lime/40 animate-ping" />
          <span className="absolute inset-0 -m-2 rounded-full bg-lime/60 animate-pulse" />
          <div className="relative size-24 rounded-full bg-lime grid place-items-center lime-glow">
            <Check className="size-12 text-ink" strokeWidth={2.6} />
          </div>
        </div>
        <h1 className="font-display font-extrabold text-3xl mt-10">Demande envoyée !</h1>
        <p className="text-muted-foreground mt-3 max-w-[28ch]">
          Marie recevra ta proposition. On te notifie dès qu'elle répond.
        </p>

        <div className="mt-8 w-full rounded-3xl bg-surface border border-border p-5 soft-shadow text-left">
          <div className="flex items-center gap-3">
            <Avatar name="Marie Dupont" size={48} ring="lime" />
            <div>
              <p className="font-display font-bold">Yoga Vinyasa</p>
              <p className="text-xs text-muted-foreground">avec Marie</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <p className="flex items-center gap-2"><Clock className="size-3.5" /> Demain · 19h</p>
            <p className="flex items-center gap-2"><MapPin className="size-3.5" /> FitZone</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link to="/results" className="block text-center pill bg-lime text-ink py-4 font-bold lime-glow">
          Continuer à explorer
        </Link>
        <Link to="/sessions" className="block text-center text-sm text-muted-foreground">
          Voir mes demandes en cours
        </Link>
      </div>
    </main>
  );
}
