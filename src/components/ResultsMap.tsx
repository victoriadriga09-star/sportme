import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Clock } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import type { Partner } from "@/data/mock";

const CITY_COORDS: Record<string, [number, number]> = {
  paris: [48.8566, 2.3522],
  lyon: [45.764, 4.8357],
  marseille: [43.2965, 5.3698],
  bordeaux: [44.8378, -0.5792],
  toulouse: [43.6047, 1.4442],
  lille: [50.6292, 3.0573],
  nantes: [47.2184, -1.5536],
  nice: [43.7102, 7.262],
  strasbourg: [48.5734, 7.7521],
  rennes: [48.1173, -1.6778],
  montpellier: [43.6108, 3.8767],
};

export function MapView({ list, city }: { list: Partner[]; city: string }) {
  const [Comp, setComp] = useState<null | React.ComponentType<{ list: Partner[]; city: string }>>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("./ResultsMap.client");
      if (!cancelled) setComp(() => mod.LeafletMap);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-border h-[70vh] bg-[#f3eefb]">
      {Comp ? (
        <Comp list={list} city={city} />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">
          Chargement de la carte…
        </div>
      )}

      {/* city pill */}
      <div className="absolute top-3 left-3 z-[500] glass-strong pill px-3 py-1.5 text-[11px] font-bold text-ink flex items-center gap-1.5 pointer-events-none">
        <MapPin className="size-3" /> {city}
      </div>

      {/* bottom sheet preview */}
      {list.length > 0 && (
        <div className="absolute inset-x-3 bottom-3 z-[500] glass-strong rounded-2xl p-3 flex items-center gap-3">
          <Avatar name={list[0].name} size={42} ring="lavender" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-none text-ink">
              {list[0].name.split(" ")[0]} · {list[0].sport}
            </p>
            <p className="text-[11px] text-ink/70 mt-1 flex items-center gap-1">
              <Clock className="size-3" /> {list[0].distanceKm} km · {list[0].when}
            </p>
          </div>
          <Link
            to="/partner/$id"
            params={{ id: list[0].id }}
            className="pill bg-ink text-background text-xs font-semibold px-3 py-2"
          >
            Voir
          </Link>
        </div>
      )}
    </div>
  );
}

export { CITY_COORDS };
