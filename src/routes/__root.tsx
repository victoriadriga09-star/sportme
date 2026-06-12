import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BottomTabBar } from "../components/BottomTabBar";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="mobile-frame flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold">404</p>
        <p className="mt-2 text-muted-foreground">Cette page n'existe pas.</p>
        <Link to="/home" className="mt-6 inline-flex pill bg-lime text-ink px-6 py-3 font-semibold">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="mobile-frame flex items-center justify-center px-6">
      <div className="text-center max-w-xs">
        <h1 className="font-display text-2xl font-bold">Oups, on a un souci</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ce n'est pas toi — on corrige ça.</p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="pill bg-lime text-ink px-5 py-3 font-semibold"
          >
            Réessayer
          </button>
          <a href="/home" className="pill border border-ink text-ink px-5 py-3 font-semibold">Retour à l'accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1A1A1A" },
      { title: "ÉLAN — Trouve ton partenaire de sport" },
      { name: "description", content: "ÉLAN connecte les sportifs selon le sport, l'horaire et la proximité." },
      { property: "og:title", content: "ÉLAN — Trouve ton partenaire de sport" },
      { property: "og:description", content: "ÉLAN connecte les sportifs selon le sport, l'horaire et la proximité." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "ÉLAN — Trouve ton partenaire de sport" },
      { name: "twitter:description", content: "ÉLAN connecte les sportifs selon le sport, l'horaire et la proximité." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f387a51c-4842-4a5c-a4c5-6ca65d1499bc/id-preview-a733e87f--c4b75b54-db47-4084-a74c-eb642dc33f3b.lovable.app-1780253304992.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f387a51c-4842-4a5c-a4c5-6ca65d1499bc/id-preview-a733e87f--c4b75b54-db47-4084-a74c-eb642dc33f3b.lovable.app-1780253304992.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Routes qui n'affichent PAS la tab bar
const HIDE_TAB_BAR = ["/", "/login", "/onboarding", "/match", "/match-confirmed", "/request-sent"];
const HIDE_TAB_BAR_PREFIX = ["/chat", "/partner"];

function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hide =
    HIDE_TAB_BAR.includes(pathname) ||
    HIDE_TAB_BAR_PREFIX.some((p) => pathname.startsWith(p));

  return (
    <div className="mobile-frame">
      <div className="mobile-scroll">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      {!hide && <BottomTabBar />}
      <Toaster position="top-center" />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    let mounted = true;
    import("@/integrations/supabase/client").then(({ supabase }) => {
      if (!mounted) return;
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_IN") {
          router.navigate({ to: "/home" });
          router.invalidate();
          queryClient.invalidateQueries();
        } else if (event === "SIGNED_OUT") {
          queryClient.clear();
          router.navigate({ to: "/" });
        }
      });
      (window as unknown as { __elanAuthSub?: { unsubscribe: () => void } }).__elanAuthSub = subscription;
    });
    return () => {
      mounted = false;
      const sub = (window as unknown as { __elanAuthSub?: { unsubscribe: () => void } }).__elanAuthSub;
      sub?.unsubscribe();
    };
  }, [router, queryClient]);
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
