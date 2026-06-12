import { useState, type ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";

type Tone = "lime" | "lavender" | "ghost";

const TONE: Record<Tone, string> = {
  lime: "bg-lime text-ink",
  lavender: "bg-lavender text-ink",
  ghost: "bg-surface text-ink border border-border",
};

export type FilterOption = { value: string; label: ReactNode };

export function FilterPill({
  label,
  value,
  options,
  onChange,
  tone = "ghost",
  anyValue,
}: {
  label: ReactNode;
  value: string;
  options: FilterOption[];
  onChange: (v: string) => void;
  tone?: Tone;
  /** Value that represents "no filter". When omitted, no "Peu importe" entry is added. */
  anyValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const items: FilterOption[] = anyValue !== undefined
    ? [{ value: anyValue, label: "Peu importe" }, ...options.filter((o) => o.value !== anyValue)]
    : options;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`pill ${TONE[tone]} text-xs px-3.5 py-1.5 font-semibold inline-flex items-center gap-1.5 active:scale-95 transition whitespace-nowrap`}
        >
          {label}
          <ChevronDown className="size-3" strokeWidth={2.5} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-56 p-1.5 rounded-2xl">
        <div className="max-h-[260px] overflow-y-auto">
          {items.map((opt) => {
            const selected = opt.value === value;
            return (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between gap-2 ${
                  selected ? "bg-ink text-background" : "hover:bg-muted text-ink"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {selected && <Check className="size-4 shrink-0" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
