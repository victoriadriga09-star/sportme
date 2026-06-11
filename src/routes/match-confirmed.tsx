import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CalendarPlus, MessageCircle, Home as HomeIcon, PartyPopper } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/lib/store";
import { downloadIcs } from "@/lib/ics";
import { CONVERSATIONS, PARTNERS } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/match-confirmed")({
  head: () => ({ meta: [{ title: "Séance acceptée — ÉLAN" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    with: typeof s.with === "string" ? s.with : "marie",
    sport: typeof s.sport === "string" ? s.sport : "Yoga",
  }),
  component: MatchConfirmed,
});

function MatchConfirmed() {
  const { with: id, sport } = Route.useSearch();
  const [user] = useUser();
  const nav = useNavigate();
  const partner = PARTNERS.find((p) => p.id === id) ?? { name: CONVERSATIONS.find((c) => c.id === id)?.name ?? "Ton partenaire" } as any;
  const firstName = (partner.name as string).split(" ")[0];

  const add = () => {
    const start = new Date(); start.setDate(start.getDate() + 1); start.setHours(19, 0, 0, 0);
    downloadIcs({ title: `ÉLAN · ${sport} avec ${firstName}`, start, durationMinutes: 60 });
    toast.success("Séance ajoutée à ton agenda 📅");
  };

  return (
    <main className="relative min-h-[100dvh] bg-background overflow-hidden flex flex-col px-6 py-10">

      <div className="relative flex-1 flex flex-col items-center justify-center text-center">
        <div className="size-20 rounded-full bg-lime grid place-items-center lime-glow mb-6">
          <PartyPopper className="size-9 text-ink" />
        </div>
        <p className="text-[11px] tracking-[0.25em] font-bold text-ink/60">YOUHOU !</p>
        <h1 className="font-display font-extrabold text-[40px] leading-[0.95] mt-2 text-ink">
          Vous allez faire<br/>du <span className="text-ink underline decoration-lime decoration-[6px] underline-offset-4">{sport}</span>
        </h1>
        <p className="text-ink/70 mt-4 max-w-[30ch]">
          Tu as accepté la proposition de {firstName}. Bonne séance à vous deux !
        </p>

        <div className="mt-8 w-full glass-strong rounded-3xl p-5 flex items-center gap-3 text-left">
          <Avatar name={user.prenom || "Toi"} size={44} ring="lime" />
          <span className="font-display font-bold text-2xl text-ink">+</span>
          <Avatar name={partner.name as string} size={44} ring="lime" />
          <div className="ml-2">
            <p className="font-display font-bold text-ink text-sm">{user.prenom || "Toi"} & {firstName}</p>
            <p className="text-[11px] text-ink/60">{sport} · Demain 19h</p>
          </div>
        </div>
      </div>

      <div className="relative space-y-3">
        <button onClick={add} className="w-full flex items-center justify-center gap-2 pill bg-lime text-ink py-4 font-bold lime-glow">
          <CalendarPlus className="size-4" /> Ajouter à mon agenda
        </button>
        <Link to="/chat/$id" params={{ id }} className="w-full flex items-center justify-center gap-2 pill bg-ink text-background py-4 font-semibold">
          <MessageCircle className="size-4" /> Continuer la discussion
        </Link>
        <button onClick={() => nav({ to: "/home" })} className="w-full flex items-center justify-center gap-2 text-ink/60 py-2 text-sm font-semibold">
          <HomeIcon className="size-4" /> Accueil
        </button>
      </div>
    </main>
  );
}
