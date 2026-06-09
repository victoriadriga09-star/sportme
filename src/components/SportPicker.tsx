import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check } from "lucide-react";
import { SPORTS } from "@/data/mock";

export function SportPicker({
  open, onClose, current, onAdd,
}: { open: boolean; onClose: () => void; current: string[]; onAdd: (s: string) => void }) {
  const [q, setQ] = useState("");
  const list = useMemo(
    () => SPORTS.filter((s) => s.label.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-[#F4F1EC] rounded-t-[28px] sm:rounded-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-extrabold text-xl text-ink">Ajouter un sport</h3>
              <button onClick={onClose} className="size-9 grid place-items-center rounded-full bg-white border border-black/5">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white border border-black/5 rounded-full px-4 py-3 mb-4">
              <Search className="size-4 text-ink/50" />
              <input
                autoFocus
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher un sport…"
                className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink/40"
              />
            </div>

            <div className="overflow-y-auto -mx-1 px-1 grid grid-cols-2 gap-2">
              {list.map((s) => {
                const added = current.includes(s.label);
                return (
                  <button
                    key={s.label}
                    onClick={() => !added && onAdd(s.label)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition ${
                      added ? "bg-lime/30 border-lime/50" : "bg-white border-black/5 active:scale-[0.98]"
                    }`}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <span className="flex-1 text-sm font-semibold text-ink truncate">{s.label}</span>
                    {added && <Check className="size-4 text-ink/70" />}
                  </button>
                );
              })}
              {list.length === 0 && (
                <p className="col-span-2 text-center text-sm text-ink/50 py-8">Aucun sport trouvé</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
