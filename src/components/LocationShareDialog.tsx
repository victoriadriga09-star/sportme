import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Share2, Clock } from "lucide-react";

const DURATIONS = [15, 20, 30, 45, 60];

type Channel = "whatsapp" | "telegram" | "sms" | "copy";

export function LocationShareDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [duration, setDuration] = useState(30);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ensureCoords = async () => {
    if (coords) return coords;
    if (!("geolocation" in navigator)) {
      setError("Géolocalisation indisponible");
      return null;
    }
    setLoading(true);
    return new Promise<{ lat: number; lng: number } | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCoords(c);
          setLoading(false);
          resolve(c);
        },
        () => {
          setError("Impossible d'obtenir ta position");
          setLoading(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  };

  const share = async (channel: Channel) => {
    const c = await ensureCoords();
    if (!c) return;
    const mapsUrl = `https://maps.google.com/?q=${c.lat},${c.lng}`;
    const expires = new Date(Date.now() + duration * 60_000);
    const text = `📍 Je partage ma position pendant ${duration} min (jusqu'à ${expires.toLocaleTimeString(
      "fr-FR",
      { hour: "2-digit", minute: "2-digit" }
    )}) — ${mapsUrl}`;
    const encoded = encodeURIComponent(text);
    let url = "";
    if (channel === "whatsapp") url = `https://wa.me/?text=${encoded}`;
    else if (channel === "telegram")
      url = `https://t.me/share/url?url=${encodeURIComponent(mapsUrl)}&text=${encodeURIComponent(
        `Ma position pendant ${duration} min`
      )}`;
    else if (channel === "sms") url = `sms:?body=${encoded}`;
    else if (channel === "copy") {
      try {
        await navigator.clipboard.writeText(text);
      } catch {}
      onClose();
      return;
    }
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-ink/50 backdrop-blur-sm grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[360px] rounded-[28px] bg-background p-6 border border-border shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="size-10 grid place-items-center rounded-2xl bg-lavender-soft text-[#7C5CFF]">
                  <MapPin className="size-5" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="font-display font-extrabold text-[18px] text-ink leading-tight">
                    Partager ma position
                  </h3>
                  <p className="text-[11px] text-muted-foreground">en temps réel</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="size-9 grid place-items-center rounded-full bg-surface border border-border"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-[12px] font-semibold text-ink/70 flex items-center gap-1.5 mb-2">
              <Clock className="size-3.5" /> Durée du partage
            </p>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`pill px-4 py-2 text-sm font-semibold border transition ${
                    d === duration
                      ? "bg-[#7C5CFF] text-white border-[#7C5CFF]"
                      : "bg-surface text-ink border-border"
                  }`}
                >
                  {d < 60 ? `${d} min` : "1 h"}
                </button>
              ))}
            </div>

            <p className="text-[12px] font-semibold text-ink/70 mt-5 mb-2 flex items-center gap-1.5">
              <Share2 className="size-3.5" /> Envoyer via
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <ChannelButton
                label="WhatsApp"
                color="#25D366"
                onClick={() => share("whatsapp")}
              />
              <ChannelButton
                label="Telegram"
                color="#229ED9"
                onClick={() => share("telegram")}
              />
              <ChannelButton label="SMS" color="#7C5CFF" onClick={() => share("sms")} />
              <ChannelButton label="Copier le lien" color="#1A1A1A" onClick={() => share("copy")} />
            </div>

            {loading && (
              <p className="text-[12px] text-muted-foreground mt-4 text-center">
                Récupération de ta position…
              </p>
            )}
            {error && (
              <p className="text-[12px] text-destructive mt-4 text-center">{error}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChannelButton({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-12 rounded-2xl text-white font-bold text-sm active:scale-[0.97] transition shadow-sm"
      style={{ backgroundColor: color }}
    >
      {label}
    </button>
  );
}
