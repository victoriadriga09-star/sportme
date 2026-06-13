import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
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

// Deterministic offset around a center (in degrees) — keeps pins stable per id.
function offsetFor(id: string, distanceKm: number): [number, number] {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const angle = (h % 360) * (Math.PI / 180);
  const km = Math.max(0.3, Math.min(distanceKm, 8));
  // ~111 km per degree latitude
  const dLat = (km / 111) * Math.sin(angle);
  const dLng = (km / (111 * Math.cos(45 * (Math.PI / 180)))) * Math.cos(angle);
  return [dLat, dLng];
}

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(center, map.getZoom()); }, [center, map]);
  return null;
}

function avatarIcon(initials: string, color = "#CCFF00") {
  return L.divIcon({
    className: "",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    html: `
      <div style="position:relative;width:44px;height:44px;">
        <div style="position:absolute;inset:0;border-radius:9999px;background:${color};
          box-shadow:0 0 0 4px #fff, 0 6px 16px -6px rgba(0,0,0,.4);
          display:grid;place-items:center;font-family:'Bricolage Grotesque',system-ui,sans-serif;
          font-weight:800;font-size:13px;color:#0F0C24;">${initials}</div>
      </div>
    `,
  });
}

export function LeafletMap({ list, city }: { list: Partner[]; city: string }) {
  const initialKey = (city || "paris").toLowerCase().split(" ")[0];
  const [center, setCenter] = useState<[number, number]>(CITY_COORDS[initialKey] ?? CITY_COORDS.paris);

  useEffect(() => {
    const k = (city || "paris").toLowerCase().split(" ")[0];
    if (CITY_COORDS[k]) { setCenter(CITY_COORDS[k]); return; }
    let cancelled = false;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((data: Array<{ lat: string; lon: string }>) => {
        if (cancelled || !data?.[0]) return;
        setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [city]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      zoomControl={false}
      className="absolute inset-0 h-full w-full"
      style={{ background: "#f3eefb" }}
    >
      <Recenter center={center} />
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Search radius */}
      <Circle
        center={center}
        radius={2000}
        pathOptions={{ color: "#7C5CFF", fillColor: "#7C5CFF", fillOpacity: 0.08, weight: 1.5 }}
      />

      {/* "You" marker */}
      <CircleMarker
        center={center}
        radius={8}
        pathOptions={{ color: "#fff", weight: 4, fillColor: "#0F0C24", fillOpacity: 1 }}
      >
        <Popup>Toi</Popup>
      </CircleMarker>

      {list.map((p) => {
        const [dLat, dLng] = offsetFor(p.id, p.distanceKm);
        const initials = p.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
        return (
          <Marker
            key={p.id}
            position={[center[0] + dLat, center[1] + dLng]}
            icon={avatarIcon(initials)}
          >
            <Popup>
              <div style={{ fontFamily: "Manrope, system-ui, sans-serif", minWidth: 160 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name} · {p.sport}</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                  {p.distanceKm} km · {p.when}
                </div>
                <a
                  href={`/partner/${p.id}`}
                  style={{
                    display: "inline-block", marginTop: 8, padding: "6px 12px",
                    borderRadius: 999, background: "#0F0C24", color: "#fff",
                    fontSize: 11, fontWeight: 700, textDecoration: "none",
                  }}
                >
                  Voir le profil
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

// Wrapper that adds the floating UI chrome around the interactive map.
export function MapView({ list, city }: { list: Partner[]; city: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-border h-[70vh] bg-[#f3eefb]">
      {mounted ? (
        <LeafletMap list={list} city={city} />
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
