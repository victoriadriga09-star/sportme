import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import type { Partner } from "@/data/mock";
import { CITY_COORDS } from "./ResultsMap";
import { useState } from "react";

function offsetFor(id: string, distanceKm: number): [number, number] {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const angle = (h % 360) * (Math.PI / 180);
  const km = Math.max(0.3, Math.min(distanceKm, 8));
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

      <Circle
        center={center}
        radius={2000}
        pathOptions={{ color: "#7C5CFF", fillColor: "#7C5CFF", fillOpacity: 0.08, weight: 1.5 }}
      />

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
