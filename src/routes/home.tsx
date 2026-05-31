import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Instagram, Youtube, Twitter } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/lib/store";
import heroShapes from "@/assets/hero-shapes.png";
import heroBalance from "@/assets/hero-balance.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Accueil — ÉLAN" },
      { name: "description", content: "Ton dashboard sportif : challenge du jour, planning et partenaires." },
    ],
  }),
  component: Home,
});

const DAYS = [
  { d: "Sun", n: 22, dot: false },
  { d: "Mon", n: 23, dot: true },
  { d: "Tue", n: 24, dot: false },
  { d: "Wed", n: 25, dot: true, active: true },
  { d: "Thu", n: 26, dot: false },
  { d: "Fri", n: 27, dot: true },
  { d: "Sat", n: 28, dot: true },
];

function Home() {
  const [user] = useUser();
  const firstName = (user.prenom || "champion").split(" ")[0];
  const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

  return (
    <main className="min-h-[100dvh] pb-32 bg-surface">
      {/* Header */}
      <header className="px-5 pt-6 pb-2 grid grid-cols-[44px_1fr_44px] items-center gap-3">
        <Avatar name={user.prenom || "Toi"} size={44} ring="lime" />
        <div className="text-center">
          <p className="font-display font-bold text-[17px] leading-tight">Hello, {firstName}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Aujourd'hui {today}</p>
        </div>
        <Link
          to="/results"
          aria-label="Rechercher"
          className="size-11 grid place-items-center rounded-full border border-border bg-surface"
        >
          <Search className="size-[18px]" strokeWidth={1.8} />
        </Link>
      </header>

      <div className="px-5 mt-4 space-y-5">
        {/* Hero — Daily challenge */}
        <Link
          to="/explorer"
          className="relative block overflow-hidden rounded-[28px] bg-lavender p-6 pr-3 min-h-[200px] soft-shadow active:scale-[0.99] transition-transform"
        >
          <h2 className="font-display font-extrabold text-[40px] leading-[0.95] text-ink tracking-tight">
            Daily<br />challenge
          </h2>
          <p className="text-[13px] text-ink/75 mt-2 font-medium">
            Fais ta séance avant 09:00
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-lavender-soft/70 rounded-full pl-1 pr-3 py-1">
            <div className="flex -space-x-2">
              <Avatar name="Marie D" size={24} />
              <Avatar name="Léa M" size={24} />
              <Avatar name="Adam B" size={24} />
            </div>
            <span className="text-[11px] font-bold text-ink">+4</span>
          </div>
          <img
            src={heroShapes}
            alt=""
            width={768}
            height={768}
            className="absolute -right-2 -top-4 w-[58%] max-w-[230px] object-contain pointer-events-none select-none"
          />
        </Link>

        {/* Week calendar */}
        <div className="-mx-1 flex gap-1.5 justify-between overflow-x-auto no-scrollbar">
          {DAYS.map((day) => {
            const active = day.active;
            return (
              <button
                key={day.d}
                className={`relative shrink-0 w-[44px] py-2 rounded-full border flex flex-col items-center justify-center transition-colors ${
                  active
                    ? "bg-ink text-background border-ink"
                    : "bg-surface text-ink border-border"
                }`}
              >
                {day.dot && (
                  <span className={`absolute top-1.5 size-1 rounded-full ${active ? "bg-background" : "bg-ink"}`} />
                )}
                <span className={`text-[10px] font-semibold ${active ? "opacity-80" : "text-muted-foreground"}`}>{day.d}</span>
                <span className="text-[15px] font-display font-bold leading-none mt-1">{day.n}</span>
              </button>
            );
          })}
        </div>

        {/* Section title */}
        <h3 className="font-display font-extrabold text-[28px] tracking-tight pt-1">Ton planning</h3>

        {/* Plan grid */}
        <section className="grid grid-cols-2 gap-3">
          {/* Yoga — tall orange */}
          <Link
            to="/sessions"
            className="row-span-2 rounded-[26px] bg-peach p-5 flex flex-col soft-shadow active:scale-[0.99] transition-transform"
          >
            <span className="self-start text-[11px] font-semibold bg-white/55 text-ink rounded-full px-3 py-1">
              Medium
            </span>
            <h4 className="font-display font-extrabold text-[26px] leading-tight mt-4 text-ink">
              Yoga<br />Group
            </h4>
            <div className="mt-3 text-[13px] text-ink/80 space-y-0.5 font-medium">
              <p>25 Nov.</p>
              <p>14:00–15:00</p>
              <p>Salle A5</p>
            </div>
            <div className="mt-auto pt-5 flex items-center gap-3">
              <Avatar name="Tiffany Way" size={36} ring="lime" />
              <div className="text-[12px] leading-tight">
                <p className="text-ink/60">Coach</p>
                <p className="font-bold text-ink">Tiffany Way</p>
              </div>
            </div>
          </Link>

          {/* Balance — blue */}
          <Link
            to="/sessions"
            className="relative overflow-hidden rounded-[26px] bg-sky p-5 min-h-[180px] soft-shadow active:scale-[0.99] transition-transform"
          >
            <span className="text-[11px] font-semibold bg-white/55 text-ink rounded-full px-3 py-1">
              Light
            </span>
            <h4 className="font-display font-extrabold text-[22px] leading-tight mt-3 text-ink">
              Balance
            </h4>
            <div className="mt-2 text-[12px] text-ink/80 space-y-0.5 font-medium relative z-10">
              <p>28 Nov.</p>
              <p>18:00–19:30</p>
              <p>Salle A2</p>
            </div>
            <img
              src={heroBalance}
              alt=""
              width={640}
              height={640}
              loading="lazy"
              className="absolute -right-3 -bottom-3 w-[55%] max-w-[140px] object-contain pointer-events-none select-none"
            />
          </Link>

          {/* Social pink */}
          <div className="rounded-[26px] bg-blush p-4 flex items-center justify-around soft-shadow">
            <SocialBtn icon={<Instagram className="size-[18px]" />} />
            <SocialBtn icon={<Youtube className="size-[18px]" />} />
            <SocialBtn icon={<Twitter className="size-[18px]" />} />
          </div>
        </section>
      </div>
    </main>
  );
}

function SocialBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <Link
      to="/social"
      className="size-11 rounded-full bg-white/65 text-ink grid place-items-center active:scale-95 transition-transform"
    >
      {icon}
    </Link>
  );
}
