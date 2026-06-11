import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { SessionSheet } from "@/components/SessionSheet";
import { SESSIONS, type MockSession, type SessionStatus } from "@/data/sessions";

const searchSchema = z.object({
  status: fallback(z.enum(["planned","done","cancelled"]).optional(), undefined),
});

export const Route = createFileRoute("/sessions")({
  head: () => ({ meta: [{ title: "Mes séances — ÉLAN" }] }),
  validateSearch: zodValidator(searchSchema),
  component: Sessions,
});

const LABELS: Record<SessionStatus, string> = { planned: "À venir", done: "Terminées", cancelled: "Annulées" };

function Sessions() {
  const search = Route.useSearch();
  const [tab, setTab] = useState<SessionStatus>(search.status ?? "planned");
  const [sheet, setSheet] = useState<MockSession | null>(null);

  const items = SESSIONS.filter((s) => s.status === tab).sort((a,b) => a.date.localeCompare(b.date));

  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader back="/profile" title="Mes séances" />

      <div className="px-5">
        <div className="inline-flex bg-surface border border-border rounded-full p-1 w-full">
          {(["planned","done","cancelled"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 text-[12px] font-bold rounded-full ${tab === t ? "bg-ink text-background" : "text-ink"}`}>
              {LABELS[t]}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-2.5">
          {items.length === 0 && <p className="text-[13px] text-muted-foreground font-medium text-center mt-8">Rien à afficher ici.</p>}
          {items.map((s) => (
            <button key={s.id} onClick={() => setSheet(s)} className="w-full text-left rounded-3xl bg-surface border border-border p-4 soft-shadow active:scale-[0.99] transition">
              <div className="flex items-start gap-3">
                <Avatar name={s.partnerName} size={48} ring="lavender" />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-[15px] leading-tight">{s.sport}</p>
                  <p className="text-[11px] text-muted-foreground font-semibold mt-1 flex items-center gap-1"><Clock className="size-3"/> {s.date} · {s.time}</p>
                  <p className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1"><MapPin className="size-3"/> {s.place} · avec {s.partnerName.split(" ")[0]}</p>
                </div>
                {s.status === "done" && (
                  <div className="flex items-center gap-0.5">
                    <Sparkles className="size-3.5 fill-[#7C5CFF] text-[#7C5CFF]"/>
                    <span className="text-[12px] font-bold">{s.score}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <SessionSheet session={sheet} onClose={() => setSheet(null)} />
    </main>
  );
}
