import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, CalendarPlus, MessageCircle } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";

export const Route = createFileRoute("/sessions")({
  head: () => ({ meta: [{ title: "Mes séances — ÉLAN" }] }),
  component: Sessions,
});

const UPCOMING = [
  { sport: "Yoga Vinyasa", with: "Marie Dupont", when: "Demain · 19h", place: "FitZone", status: "Confirmée" },
  { sport: "Boxe technique", with: "Adam Bensaïd", when: "Sam. · 8h", place: "BoxLab", status: "En attente" },
];
const PAST = [
  { sport: "Running", with: "Léa Martin", when: "Hier · 7h", place: "Canal Saint-Martin", reviewed: false },
  { sport: "Pilates", with: "Inès Roche", when: "Lun. · 18h", place: "Studio Mouv'", reviewed: true },
  { sport: "Padel", with: "Théo Lambert", when: "Sam. dernier", place: "Padel Up", reviewed: true },
];

function Sessions() {
  const [tab, setTab] = useState<"up" | "past">("up");
  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader back="/profile" title="Mes séances" />

      <div className="px-5">
        <div className="inline-flex bg-surface border border-border rounded-full p-1 w-full">
          <button onClick={() => setTab("up")} className={`flex-1 py-2.5 text-sm font-semibold rounded-full ${tab === "up" ? "bg-ink text-background" : ""}`}>À venir</button>
          <button onClick={() => setTab("past")} className={`flex-1 py-2.5 text-sm font-semibold rounded-full ${tab === "past" ? "bg-ink text-background" : ""}`}>Passées</button>
        </div>

        <div className="mt-4 space-y-3">
          {tab === "up" ? UPCOMING.map((s, i) => (
            <article key={i} className="rounded-3xl bg-surface border border-border p-4 soft-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display font-bold">{s.sport}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.when} · {s.place}</p>
                </div>
                <Pill tone={s.status === "Confirmée" ? "lime" : "lavender"} size="sm">{s.status}</Pill>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Avatar name={s.with} size={36} />
                <p className="text-xs">avec <span className="font-semibold">{s.with.split(" ")[0]}</span></p>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 pill border border-ink text-ink py-2.5 text-xs font-semibold">Annuler</button>
                <button className="flex-1 pill bg-lime text-ink py-2.5 text-xs font-bold flex items-center justify-center gap-1">
                  <CalendarPlus className="size-3.5" /> Agenda
                </button>
              </div>
            </article>
          )) : PAST.map((s, i) => (
            <article key={i} className="rounded-3xl bg-surface border border-border p-4 soft-shadow flex items-center gap-3">
              <Avatar name={s.with} size={48} />
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm">{s.sport}</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><Clock className="size-3" /> {s.when}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" /> {s.place}</p>
              </div>
              {s.reviewed
                ? <span className="text-[10px] text-muted-foreground">Noté ★</span>
                : <button className="pill bg-lime text-ink text-xs font-bold px-3 py-2">Noter</button>}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
