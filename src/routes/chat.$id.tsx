import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Paperclip, Send, Phone, MoreVertical } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { Avatar } from "@/components/Avatar";
import { CONVERSATIONS } from "@/data/mock";

export const Route = createFileRoute("/chat/$id")({
  loader: ({ params }) => {
    const c = CONVERSATIONS.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Chat"} — ÉLAN` }] }),
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center text-muted-foreground">Conversation introuvable.</div>,
  component: Chat,
});

type Msg = { id: string; from: "me" | "them"; text: string; t: string };

const SEED: Msg[] = [
  { id: "1", from: "them", text: "Salut Sofia ! On confirme pour demain 19h ?", t: "18:42" },
  { id: "2", from: "me",   text: "Oui carrément. FitZone Belleville c'est bien ça ?", t: "18:44" },
  { id: "3", from: "them", text: "Yes ! J'apporte mon tapis, prends une bouteille d'eau.", t: "18:45" },
  { id: "4", from: "me",   text: "Parfait. Tu fais combien d'enchaînements en général ?", t: "18:47" },
  { id: "5", from: "them", text: "Une heure de vinyasa modéré. On adapte selon ta forme.", t: "18:48" },
];

function Chat() {
  const c = Route.useLoaderData();
  const [msgs, setMsgs] = useState<Msg[]>(SEED);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMsgs((m) => [...m, { id: String(Date.now()), from: "me", text: draft.trim(), t: "now" }]);
    setDraft("");
  };

  return (
    <main className="min-h-[100dvh] flex flex-col bg-background">
      <header className="sticky top-0 z-20 px-3 py-3 flex items-center gap-3 bg-background/90 backdrop-blur border-b border-border">
        <MobileHeader back transparent />
      </header>
      <div className="-mt-[60px] px-5 pt-3 pb-2 flex items-center justify-between bg-background/95 backdrop-blur border-b border-border">
        <div className="ml-12 flex items-center gap-3">
          <Avatar name={c.name} size={36} ring={c.online ? "lime" : "none"} />
          <div>
            <p className="font-display font-bold text-sm leading-none">{c.name.split(" ")[0]}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{c.online ? "En ligne" : "Vu récemment"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button aria-label="Appel" className="size-9 grid place-items-center rounded-full bg-surface border border-border"><Phone className="size-4" /></button>
          <button aria-label="Plus" className="size-9 grid place-items-center rounded-full bg-surface border border-border"><MoreVertical className="size-4" /></button>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-3 overflow-y-auto">
        <div className="text-center">
          <span className="pill bg-muted text-muted-foreground text-[10px] font-semibold px-3 py-1">Aujourd'hui</span>
        </div>
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] px-4 py-2.5 text-sm leading-snug ${
              m.from === "me"
                ? "bg-lime text-ink rounded-2xl rounded-br-md"
                : "bg-surface border border-border text-ink rounded-2xl rounded-bl-md"
            }`}>
              {m.text}
              <span className="block text-[10px] mt-1 opacity-60 text-right">{m.t}</span>
            </div>
          </div>
        ))}

        {/* session card */}
        <div className="flex justify-center pt-2">
          <div className="rounded-2xl bg-lavender p-4 max-w-[80%] text-sm">
            <p className="font-display font-bold text-ink">Yoga Vinyasa</p>
            <p className="text-xs text-ink/70 mt-1">Demain · 19h · FitZone</p>
            <div className="flex gap-2 mt-3">
              <button className="pill bg-ink text-background px-3 py-1.5 text-xs font-semibold">Accepter</button>
              <button className="pill bg-background text-ink px-3 py-1.5 text-xs font-semibold">Décliner</button>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 px-3 py-3 bg-background border-t border-border">
        <div className="flex items-center gap-2">
          <button aria-label="Pièce jointe" className="size-11 grid place-items-center rounded-full bg-surface border border-border"><Paperclip className="size-4" /></button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Écris un message…"
            className="flex-1 h-11 px-4 rounded-full bg-input border-0 focus:ring-2 focus:ring-lime outline-none text-sm"
          />
          <button onClick={send} aria-label="Envoyer" className={`size-11 grid place-items-center rounded-full transition ${draft ? "bg-lime text-ink lime-glow" : "bg-input text-muted-foreground"}`}>
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
