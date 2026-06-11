import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Music2, MessageCircle, User } from "lucide-react";
import type { ReactNode } from "react";

export function BottomTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) =>
    to === "/home" ? pathname === "/home" : pathname.startsWith(to);

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
    >
      <div className="mx-auto max-w-[430px] px-4 pb-4 pt-2 pointer-events-auto">
        <div className="relative glass-dark text-background rounded-full pl-4 pr-4 py-2 flex items-center justify-between">
          <TabItem to="/home" label="Accueil" active={isActive("/home")}>
            <Home className="size-[22px]" strokeWidth={1.8} />
          </TabItem>
          {/* Loupe = parcourir les partenaires disponibles maintenant */}
          <TabItem to="/results" label="Disponibles" active={pathname === "/results"}>
            <Search className="size-[22px]" strokeWidth={1.8} />
          </TabItem>

          {/* FAB central = Melody (mood → music) */}
          <div className="w-16 shrink-0" aria-hidden />
          <Link
            to="/melody"
            aria-label="Melody"
            className="absolute left-1/2 -translate-x-1/2 -top-5 size-16 rounded-full bg-lime text-ink grid place-items-center lime-glow ring-[5px] ring-background"
          >
            <Music2 className="size-7" strokeWidth={2.4} />
          </Link>

          <TabItem to="/social" label="Social" active={isActive("/social")}>
            <MessageCircle className="size-[22px]" strokeWidth={1.8} />
          </TabItem>
          <TabItem to="/profile" label="Profil" active={isActive("/profile")}>
            <User className="size-[22px]" strokeWidth={1.8} />
          </TabItem>
        </div>
      </div>
    </nav>
  );
}

function TabItem({
  to, label, active, children,
}: { to: string; label: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      to={to}
      className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
        active ? "text-ink" : "text-background/60 hover:text-background"
      }`}
    >
      {active && (
        <span className="absolute inset-0 m-auto size-10 rounded-full bg-lime" aria-hidden />
      )}
      <span className="relative">{children}</span>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
