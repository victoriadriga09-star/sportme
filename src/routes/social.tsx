import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Heart, MessageCircle, Share2, MoreHorizontal, Search, X } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Pill } from "@/components/Pill";
import { POSTS, CONVERSATIONS, PARTNERS } from "@/data/mock";

export const Route = createFileRoute("/social")({
  head: () => ({ meta: [{ title: "Communauté — ÉLAN" }] }),
  component: Social,
});

function Social() {
  const [tab, setTab] = useState<"feed" | "messages">("feed");
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const results = q.trim().length > 0
    ? PARTNERS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.sport.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <header className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h1 className="font-display font-extrabold text-[28px] tracking-tight">Communauté</h1>
        <div className="flex gap-2">
          <button onClick={() => setSearchOpen(true)} aria-label="Rechercher une personne" className="size-11 grid place-items-center rounded-full bg-surface border border-border">
            <Search className="size-5" />
          </button>
          <Link to="/social/new" className="size-11 grid place-items-center rounded-full bg-lime text-ink lime-glow" aria-label="Nouveau post">
            <Plus className="size-5" strokeWidth={2.4} />
          </Link>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-start justify-center pt-16 px-4" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-[420px] glass-strong rounded-3xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
              <Search className="size-5 text-ink/60" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un nom ou un sport…" className="flex-1 h-11 bg-transparent outline-none text-sm font-medium text-ink placeholder:text-ink/40" />
              <button onClick={() => setSearchOpen(false)} aria-label="Fermer"><X className="size-5 text-ink/60" /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto space-y-2">
              {results.length === 0 && q && <p className="text-sm text-ink/60 text-center py-6">Aucun résultat</p>}
              {results.map((p) => (
                <Link key={p.id} to="/partner/$id" params={{ id: p.id }} onClick={() => setSearchOpen(false)} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/40">
                  <Avatar name={p.name} size={40} ring={p.online ? "lime" : "none"} />
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-ink">{p.name}</p><p className="text-[11px] text-ink/60">{p.sport} · {p.distanceKm} km</p></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-5 mb-4">
        <div className="inline-flex bg-surface border border-border rounded-full p-1 w-full">
          <Tab active={tab === "feed"} onClick={() => setTab("feed")}>Feed</Tab>
          <Tab active={tab === "messages"} onClick={() => setTab("messages")}>Mes discussions</Tab>
        </div>
      </div>

      {tab === "feed" ? <Feed /> : <Messages />}
    </main>
  );
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition ${active ? "bg-ink text-background" : "text-ink"}`}>
      {children}
    </button>
  );
}

function Feed() {
  return (
    <>
      {/* stories */}
      <div className="px-5 -mx-5 flex gap-3 overflow-x-auto no-scrollbar pb-4 px-5">
        <button className="shrink-0 flex flex-col items-center gap-1 w-16">
          <div className="size-14 rounded-full bg-surface border-2 border-dashed border-ink grid place-items-center">
            <Plus className="size-5" />
          </div>
          <span className="text-[10px] font-semibold">Ta story</span>
        </button>
        {["Marie", "Adam", "Léa", "Inès", "Théo", "Yann"].map((n) => (
          <button key={n} className="shrink-0 flex flex-col items-center gap-1 w-16">
            <span className="p-0.5 rounded-full bg-gradient-to-br from-lime to-lavender">
              <Avatar name={n} size={52} />
            </span>
            <span className="text-[10px] font-semibold truncate w-16 text-center">{n}</span>
          </button>
        ))}
      </div>

      {/* posts */}
      <div className="px-5 space-y-4">
        {POSTS.map((p) => (
          <article key={p.id} className="rounded-3xl bg-surface border border-border overflow-hidden soft-shadow">
            <div className="flex items-center gap-3 p-4">
              <Avatar name={p.author} size={40} />
              <div className="flex-1">
                <p className="font-semibold text-sm leading-none">{p.author}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{p.when} · {p.sport}</p>
              </div>
              <button aria-label="Plus"><MoreHorizontal className="size-5 text-muted-foreground" /></button>
            </div>
            <div className={`aspect-[4/3] ${p.bg === "lime" ? "bg-lime" : p.bg === "lavender" ? "bg-lavender" : "bg-ink"} relative`}>
              <div className="absolute inset-0 topo-dots opacity-30" />
              <div className="absolute inset-0 grid place-items-center">
                <Pill tone={p.bg === "ink" ? "lime" : "ink"} size="lg">{p.sport}</Pill>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-5 mb-3 text-ink">
                <button className="flex items-center gap-1.5 text-sm font-semibold"><Heart className="size-5" /> {p.likes}</button>
                <button className="flex items-center gap-1.5 text-sm font-semibold"><MessageCircle className="size-5" /> {p.comments}</button>
                <button className="ml-auto"><Share2 className="size-5" /></button>
              </div>
              <p className="text-sm"><span className="font-semibold">{p.author}</span> · {p.text}</p>
              <button className="text-xs text-muted-foreground mt-2">Voir les {p.comments} commentaires</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Messages() {
  return (
    <div className="px-5 space-y-2">
      {CONVERSATIONS.map((c) => (
        <Link
          key={c.id}
          to="/chat/$id"
          params={{ id: c.id }}
          className="flex items-center gap-3 p-3 rounded-2xl bg-surface border border-border active:scale-[0.99] transition"
        >
          <div className="relative">
            <Avatar name={c.name} size={52} />
            {c.online && <span className="absolute bottom-0 right-0 size-3.5 rounded-full bg-success ring-2 ring-surface" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{c.name.split(" ")[0]}</p>
            <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] text-muted-foreground">{c.when}</span>
            {c.unread > 0 && (
              <span className="size-5 rounded-full bg-lime text-ink text-[10px] grid place-items-center font-bold">
                {c.unread}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
