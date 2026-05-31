import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePlus, AtSign, Hash, X } from "lucide-react";

export const Route = createFileRoute("/social/new")({
  head: () => ({ meta: [{ title: "Nouveau post — ÉLAN" }] }),
  component: NewPost,
});

function NewPost() {
  const [text, setText] = useState("");
  return (
    <main className="min-h-[100dvh] flex flex-col bg-background">
      <header className="px-5 pt-5 pb-4 flex items-center justify-between">
        <Link to="/social" aria-label="Fermer" className="size-10 grid place-items-center rounded-full bg-surface border border-border">
          <X className="size-5" />
        </Link>
        <h1 className="font-display font-bold text-base">Nouveau post</h1>
        <Link to="/social" className={`pill px-4 py-2 text-xs font-bold ${text ? "bg-lime text-ink lime-glow" : "bg-input text-muted-foreground pointer-events-none"}`}>
          Publier
        </Link>
      </header>

      <div className="px-5 flex-1">
        <button className="w-full aspect-video rounded-3xl border-2 border-dashed border-border bg-surface flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImagePlus className="size-8" strokeWidth={1.5} />
          <span className="text-sm font-semibold">Ajouter une photo ou vidéo</span>
        </button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 500))}
          placeholder="Partage ton moment sportif…"
          className="mt-4 w-full h-44 p-4 rounded-2xl bg-input border-0 focus:ring-2 focus:ring-lime outline-none resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <button className="pill bg-surface border border-border px-3 py-1.5 text-xs font-semibold flex items-center gap-1"><Hash className="size-3.5" /> Sport</button>
            <button className="pill bg-surface border border-border px-3 py-1.5 text-xs font-semibold flex items-center gap-1"><AtSign className="size-3.5" /> Mention</button>
          </div>
          <span className="text-[11px] text-muted-foreground tabular-nums">{text.length}/500</span>
        </div>
      </div>
    </main>
  );
}
