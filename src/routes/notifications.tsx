import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Zap, MessageCircle, Clock, Flame } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { NOTIFICATIONS } from "@/data/mock";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — ÉLAN" }] }),
  component: Notifs,
});

const ICONS = {
  request: <Heart className="size-5 text-ink" />,
  match: <Zap className="size-5 text-ink" fill="currentColor" />,
  message: <MessageCircle className="size-5 text-ink" />,
  reminder: <Clock className="size-5 text-ink" />,
  streak: <Flame className="size-5 text-ink" />,
} as const;

const TONE = {
  request: "bg-lavender",
  match: "bg-lime",
  message: "bg-surface border border-border",
  reminder: "bg-blush",
  streak: "bg-peach",
} as const;

function Notifs() {
  return (
    <main className="min-h-[100dvh] pb-32 bg-background">
      <MobileHeader back="/home" title="Notifications" />
      <div className="px-5 space-y-2.5">
        {NOTIFICATIONS.map((n) => (
          <Link key={n.id} to="/home" className={`flex items-start gap-3 p-4 rounded-2xl ${TONE[n.type as keyof typeof TONE]}`}>
            <span className="size-10 rounded-full bg-background/50 grid place-items-center shrink-0">
              {ICONS[n.type as keyof typeof ICONS]}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-ink">{n.title}</p>
              <p className="text-xs text-ink/70 mt-0.5">{n.body}</p>
              <p className="text-[10px] text-ink/50 mt-1.5 font-semibold">{n.when}</p>
            </div>
            {n.unread && <span className="size-2 rounded-full bg-ink mt-2 shrink-0" />}
          </Link>
        ))}
      </div>
    </main>
  );
}
