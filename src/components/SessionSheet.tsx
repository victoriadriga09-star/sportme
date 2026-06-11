import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { X, Clock, MapPin, Star, CalendarClock } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { randomKindMessage } from "@/lib/kindMessages";
import { toast } from "sonner";
import type { MockSession } from "@/data/sessions";

export function SessionSheet({ session, onClose }: { session: MockSession | null; onClose: () => void }) {
  const [mode, setMode] = useState<"detail" | "kind" | "reschedule">("detail");
  const [kindMsg] = useState(randomKindMessage());
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const nav = useNavigate();

  const handleCancel = () => setMode("kind");

  const submitReschedule = () => {
    if (!newDate || !newTime) { toast.error("Choisis une date et un horaire"); return; }
    toast.success(`Message envoyé à ${session?.partnerName.split(" ")[0]} ✨`, { description: `Nouveau créneau : ${newDate} à ${newTime}` });
    onClose();
  };

  return (
    <AnimatePresence>
      {session && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}>
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-[#F4F1EC] rounded-t-[28px] sm:rounded-3xl p-5 max-h-[88vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className={`pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                session.status === "planned" ? "bg-lavender text-ink" :
                session.status === "done" ? "bg-lime text-ink" : "bg-muted text-muted-foreground"
              }`}>{session.status === "planned" ? "Planifiée" : session.status === "done" ? "Terminée" : "Annulée"}</span>
              <button onClick={onClose} className="size-9 grid place-items-center rounded-full bg-white border border-black/5"><X className="size-4"/></button>
            </div>

            {mode === "detail" && (
              <div>
                <h2 className="font-display font-extrabold text-[26px] leading-tight text-ink">{session.sport}</h2>
                <div className="flex items-center gap-3 mt-4 p-3 rounded-2xl bg-white border border-black/5">
                  <Link to="/partner/$id" params={{ id: session.partnerId }} onClick={onClose}><Avatar name={session.partnerName} size={44} ring="lavender"/></Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-muted-foreground font-semibold">Avec</p>
                    <p className="font-bold text-ink">{session.partnerName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="rounded-2xl bg-white border border-black/5 p-3">
                    <Clock className="size-3.5 text-muted-foreground"/>
                    <p className="text-[11px] text-muted-foreground font-semibold mt-1">Horaire</p>
                    <p className="font-display font-extrabold text-[15px] mt-0.5">{session.time}</p>
                    <p className="text-[11px] text-ink/70">{session.date}</p>
                  </div>
                  <div className="rounded-2xl bg-white border border-black/5 p-3">
                    <MapPin className="size-3.5 text-muted-foreground"/>
                    <p className="text-[11px] text-muted-foreground font-semibold mt-1">Lieu</p>
                    <p className="font-display font-extrabold text-[15px] mt-0.5 truncate">{session.place}</p>
                  </div>
                </div>

                {session.status === "done" && (
                  <div className="mt-3 rounded-2xl bg-white border border-black/5 p-4">
                    <p className="text-[11px] text-muted-foreground font-semibold">Satisfaction</p>
                    <div className="flex gap-1 mt-1.5">
                      {[1,2,3,4,5].map((n) => (
                        <Star key={n} className={`size-5 ${n <= (session.score ?? 0) ? "fill-[#FACC15] text-[#FACC15]" : "text-ink/20"}`}/>
                      ))}
                    </div>
                  </div>
                )}

                {session.status === "planned" && (
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleCancel} className="flex-1 pill border border-ink/15 bg-white py-3.5 font-bold text-ink text-sm">Annuler</button>
                    <button onClick={() => setMode("reschedule")} className="flex-1 pill bg-ink text-background py-3.5 font-bold text-sm flex items-center justify-center gap-1.5">
                      <CalendarClock className="size-4"/> Reprogrammer
                    </button>
                  </div>
                )}
              </div>
            )}

            {mode === "kind" && (
              <div>
                <div className="rounded-[24px] bg-gradient-to-br from-[#E9E1FF] to-[#F4EEFF] p-5 border border-white/60">
                  <p className="text-3xl">🫶</p>
                  <p className="font-display font-extrabold text-[22px] leading-tight mt-2 text-ink">{kindMsg}</p>
                </div>
                <div className="space-y-2 mt-4">
                  <button onClick={() => setMode("reschedule")} className="w-full pill bg-ink text-background py-3.5 font-bold text-sm">Reprogrammer cette séance</button>
                  <button onClick={() => { onClose(); nav({ to: "/explorer" }); }} className="w-full pill border border-ink/15 bg-white py-3.5 font-bold text-sm text-ink">Planifier une autre séance</button>
                  <button onClick={onClose} className="w-full text-center text-[12px] text-muted-foreground font-semibold py-2">Plus tard</button>
                </div>
              </div>
            )}

            {mode === "reschedule" && (
              <div>
                <h3 className="font-display font-extrabold text-[20px] text-ink">Nouveau créneau</h3>
                <p className="text-[12px] text-muted-foreground font-medium mt-1">On préviendra {session.partnerName.split(" ")[0]} automatiquement.</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="h-12 px-3 rounded-2xl bg-white border border-black/5 text-sm font-medium"/>
                  <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="h-12 px-3 rounded-2xl bg-white border border-black/5 text-sm font-medium"/>
                </div>
                <button onClick={submitReschedule} className="mt-4 w-full pill bg-lime text-ink py-3.5 font-bold text-sm">Envoyer la proposition</button>
                <button onClick={() => setMode("detail")} className="mt-2 w-full text-[12px] text-muted-foreground font-semibold py-2">Retour</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
