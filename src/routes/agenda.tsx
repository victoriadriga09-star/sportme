import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { CatPeek } from "@/components/CatPeek";
import { SessionSheet } from "@/components/SessionSheet";
import { SESSIONS, type MockSession } from "@/data/sessions";

export const Route = createFileRoute("/agenda")({
  head: () => ({ meta: [{ title: "Agenda — ÉLAN" }] }),
  component: Agenda,
});

type View = "month" | "week" | "day";
const FR_DOW = ["L","M","M","J","V","S","D"];
const FR_MONTH = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addDays(d: Date, n: number) { const x = new Date(d); x.setDate(d.getDate()+n); return x; }
function iso(d: Date) { return d.toISOString().slice(0,10); }

function statusColor(s: MockSession["status"]) {
  return s === "planned" ? "bg-[#7C5CFF]" : s === "done" ? "bg-lime" : "bg-muted-foreground/50";
}

function Agenda() {
  const [view, setView] = useState<View>("month");
  const [cursor, setCursor] = useState<Date>(() => { const d = new Date(); d.setHours(0,0,0,0); return d; });
  const [sheet, setSheet] = useState<MockSession | null>(null);

  const byDate = useMemo(() => {
    const m: Record<string, MockSession[]> = {};
    SESSIONS.forEach((s) => { (m[s.date] ||= []).push(s); });
    return m;
  }, []);

  const monthDays = useMemo(() => {
    const first = startOfMonth(cursor);
    const offset = (first.getDay() + 6) % 7; // Monday=0
    return Array.from({ length: 42 }, (_, i) => addDays(first, i - offset));
  }, [cursor]);

  const weekDays = useMemo(() => {
    const offset = (cursor.getDay() + 6) % 7;
    const start = addDays(cursor, -offset);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [cursor]);

  const visible: MockSession[] = view === "day" ? (byDate[iso(cursor)] ?? [])
    : view === "week" ? weekDays.flatMap((d) => byDate[iso(d)] ?? [])
    : Object.entries(byDate).filter(([k]) => { const d = new Date(k); return d.getMonth() === cursor.getMonth() && d.getFullYear() === cursor.getFullYear(); }).flatMap(([,v]) => v);

  return (
    <main className="relative min-h-[100dvh] pb-32 bg-background overflow-hidden">
      <CatPeek tone="lavender" corner="tr" size={70} delay={0.4} className="!top-2 !right-2" />
      <MobileHeader title="Agenda" back="/home" />

      <div className="px-5">
        {/* View switcher */}
        <div className="inline-flex bg-surface border border-border rounded-full p-1 w-full">
          {(["month","week","day"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`flex-1 py-2 text-[12px] font-bold rounded-full ${view === v ? "bg-ink text-background" : "text-ink"}`}>
              {v === "month" ? "Mois" : v === "week" ? "Semaine" : "Jour"}
            </button>
          ))}
        </div>

        {/* Header period */}
        <div className="flex items-center justify-between mt-4">
          <button onClick={() => { const d = new Date(cursor); view==="month" ? d.setMonth(d.getMonth()-1) : d.setDate(d.getDate() - (view==="week"?7:1)); setCursor(d); }} className="size-9 rounded-full bg-surface border border-border grid place-items-center">‹</button>
          <p className="font-display font-extrabold text-[18px]">
            {view === "month" ? `${FR_MONTH[cursor.getMonth()]} ${cursor.getFullYear()}`
              : view === "week" ? `Semaine du ${weekDays[0].getDate()} ${FR_MONTH[weekDays[0].getMonth()].slice(0,3)}.`
              : cursor.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <button onClick={() => { const d = new Date(cursor); view==="month" ? d.setMonth(d.getMonth()+1) : d.setDate(d.getDate() + (view==="week"?7:1)); setCursor(d); }} className="size-9 rounded-full bg-surface border border-border grid place-items-center">›</button>
        </div>

        {view === "month" && (
          <div className="mt-4 rounded-3xl bg-surface border border-border p-3">
            <div className="grid grid-cols-7 gap-1 mb-1">
              {FR_DOW.map((d, i) => <p key={i} className="text-[10px] font-bold text-muted-foreground text-center py-1">{d}</p>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthDays.map((d, i) => {
                const inMonth = d.getMonth() === cursor.getMonth();
                const items = byDate[iso(d)] ?? [];
                const isToday = iso(d) === iso(new Date());
                const hasDone = items.some((s) => s.status === "done");
                const hasPlanned = items.some((s) => s.status === "planned");
                const hasCancelled = !hasDone && !hasPlanned && items.some((s) => s.status === "cancelled");
                return (
                  <button key={i} onClick={() => { setCursor(d); setView("day"); }}
                    className={`aspect-square rounded-xl flex items-center justify-center text-[12px] font-semibold relative ${inMonth ? "text-ink" : "text-muted-foreground/40"} ${isToday && !hasPlanned && !hasDone ? "bg-ink text-background" : ""}`}>
                    {/* status circle around the date */}
                    {hasDone && (
                      <span className="absolute inset-1.5 rounded-full border-2 border-dashed border-lime" />
                    )}
                    {hasPlanned && (
                      <span className="absolute inset-1.5 rounded-full bg-[#7C5CFF] text-white grid place-items-center font-extrabold">
                        {d.getDate()}
                      </span>
                    )}
                    {hasCancelled && (
                      <span className="absolute inset-1.5 rounded-full border-2 border-muted-foreground/40" />
                    )}
                    {!hasPlanned && <span className="relative">{d.getDate()}</span>}
                    {hasDone && (
                      <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-lime text-ink grid place-items-center">
                        <Check className="size-2.5" strokeWidth={3.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {view === "week" && (
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {weekDays.map((d, i) => {
              const items = byDate[iso(d)] ?? [];
              const isToday = iso(d) === iso(new Date());
              return (
                <button key={i} onClick={() => { setCursor(d); setView("day"); }}
                  className={`flex flex-col items-center py-3 rounded-2xl ${isToday ? "bg-ink text-background" : "bg-surface border border-border"}`}>
                  <span className="text-[10px] font-bold uppercase">{FR_DOW[i]}</span>
                  <span className="font-display font-extrabold text-[18px] mt-0.5">{d.getDate()}</span>
                  <div className="flex gap-0.5 mt-1.5 h-1.5">
                    {items.slice(0,3).map((s) => <span key={s.id} className={`size-1.5 rounded-full ${statusColor(s.status)}`}/>)}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Session list */}
        <h3 className="font-display font-extrabold text-[18px] tracking-tight mt-6">
          {visible.length} séance{visible.length > 1 ? "s" : ""}
        </h3>
        <div className="mt-3 space-y-2.5">
          {visible.length === 0 && <p className="text-[13px] text-muted-foreground font-medium">Rien de prévu sur cette période.</p>}
          {visible.map((s) => (
            <button key={s.id} onClick={() => setSheet(s)} className="w-full text-left flex items-center gap-3 rounded-2xl bg-surface border border-border p-3.5 active:scale-[0.99] transition">
              <span className={`size-10 rounded-full grid place-items-center text-white ${statusColor(s.status)}`}>
                {s.status === "planned" ? "📅" : s.status === "done" ? "✓" : "✕"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-[15px] leading-tight">{s.sport}</p>
                <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">{s.date} · {s.time} · avec {s.partnerName.split(" ")[0]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <SessionSheet session={sheet} onClose={() => setSheet(null)} />
    </main>
  );
}
