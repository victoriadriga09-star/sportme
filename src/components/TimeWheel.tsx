import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ITEM_H = 40;

function pad(n: number) { return String(n).padStart(2, "0"); }

function Column({
  values,
  value,
  onChange,
}: { values: number[]; value: number; onChange: (v: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const idx = values.indexOf(value);
    if (idx >= 0) el.scrollTo({ top: idx * ITEM_H });
  }, [value, values]);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const idx = Math.round(el.scrollTop / ITEM_H);
      const next = values[Math.max(0, Math.min(values.length - 1, idx))];
      if (next !== value) onChange(next);
      el.scrollTo({ top: idx * ITEM_H, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative w-16 h-[200px] overflow-hidden">
      <div
        ref={ref}
        onScroll={onScroll}
        className="h-full overflow-y-scroll no-scrollbar snap-y snap-mandatory"
        style={{ scrollPaddingTop: ITEM_H * 2 }}
      >
        <div style={{ height: ITEM_H * 2 }} />
        {values.map((v) => (
          <div
            key={v}
            className={`snap-center flex items-center justify-center text-[20px] font-semibold transition-colors ${
              v === value ? "text-[#7C5CFF]" : "text-ink/40"
            }`}
            style={{ height: ITEM_H }}
            onClick={() => onChange(v)}
          >
            {pad(v)}
          </div>
        ))}
        <div style={{ height: ITEM_H * 2 }} />
      </div>
    </div>
  );
}

export function TimeWheel({
  value,
  onChange,
  className = "",
}: { value: string; onChange: (v: string) => void; className?: string }) {
  const [open, setOpen] = useState(false);
  const [h, m] = (value || "12:00").split(":").map(Number);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const setH = (nh: number) => onChange(`${pad(nh)}:${pad(m || 0)}`);
  const setM = (nm: number) => onChange(`${pad(h || 0)}:${pad(nm)}`);
  const nearest5 = (n: number) => minutes.reduce((p, c) => Math.abs(c - n) < Math.abs(p - n) ? c : p, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`h-12 px-4 rounded-2xl border flex items-center gap-2 text-sm font-semibold transition ${
            value ? "bg-ink text-background border-ink" : "bg-surface text-ink border-border"
          } ${className}`}
        >
          <Clock className="size-4" />
          {value || "Heure"}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-3 rounded-2xl w-auto">
        <div className="relative flex items-center gap-2">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[40px] rounded-xl bg-[#7C5CFF]/10 border-y border-[#7C5CFF]/30 pointer-events-none" />
          <Column values={hours} value={h || 0} onChange={setH} />
          <span className="text-[20px] font-bold text-ink">:</span>
          <Column values={minutes} value={nearest5(m || 0)} onChange={setM} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
