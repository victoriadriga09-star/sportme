import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { Plus, SkipForward, RotateCcw, Music2 } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { MOODS, TRACKS, type Mood, type Track } from "@/data/moodTracks";
import { toast } from "sonner";


export const Route = createFileRoute("/melody")({
  head: () => ({ meta: [{ title: "Melody — ÉLAN" }] }),
  component: MelodyPage,
});

type Phase = "mood" | "searching" | "track";

function MelodyPage() {
  const [phase, setPhase] = useState<Phase>("mood");
  const [mood, setMood] = useState<Mood | null>(null);
  const [skipCount, setSkipCount] = useState(0);
  const [trackIdx, setTrackIdx] = useState(0);

  const tracks = mood ? TRACKS[mood] : [];
  const track: Track | undefined = tracks[trackIdx];

  const handleMoodPicked = (m: Mood) => {
    setMood(m); setSkipCount(0); setTrackIdx(0); setPhase("searching");
    setTimeout(() => { setPhase("track"); }, 2400);
  };


  const handleSkip = () => {
    if (skipCount >= 2) {
      toast("3 skips, on recommence !", { description: "Choisis à nouveau ton mood." });
      setPhase("mood"); setPlaying(false); return;
    }
    setSkipCount((s) => s + 1);
    setTrackIdx((i) => (i + 1) % tracks.length);
  };

  const addToPlaylist = () => {
    if (!track) return;
    try {
      const raw = localStorage.getItem("elan.playlist");
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({ ...track, mood, addedAt: Date.now() });
      localStorage.setItem("elan.playlist", JSON.stringify(arr));
    } catch {}
    toast.success("Ajouté à ta playlist 🎶");
  };

  return (
    <main className="min-h-[100dvh] pb-32 bg-gradient-to-b from-[#F4F1EC] via-background to-[#EDE6F5]">
      <MobileHeader title="Melody" back="/home" right={
        <Link to="/melody" aria-label="Recommencer" className="size-10 grid place-items-center rounded-full bg-surface border border-border" onClick={(e) => { e.preventDefault(); setPhase("mood"); setPlaying(false); }}>
          <RotateCcw className="size-4" />
        </Link>
      }/>

      <div className="px-5">
        <AnimatePresence mode="wait">
          {phase === "mood" && <MoodPicker key="mood" onPick={handleMoodPicked} />}
          {phase === "searching" && <Searching key="search" mood={mood!} />}
          {phase === "track" && track && (
            <TrackView
              key={"track-" + track.id}
              track={track}
              mood={mood!}
              playing={playing}
              onPlay={() => setPlaying((p) => !p)}
              onSkip={handleSkip}
              onAdd={addToPlaylist}
              skipsLeft={3 - skipCount}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ---------------- Mood picker ---------------- */
function MoodPicker({ onPick }: { onPick: (m: Mood) => void }) {
  const STOPS = MOODS.length; // 5
  const TRACK_H = 360;
  const STEP = TRACK_H / (STOPS - 1);
  const y = useMotionValue(STEP * 3); // start at "poor" like screenshot

  const [idx, setIdx] = useState(3);

  useEffect(() => {
    const unsub = y.on("change", (v) => {
      const i = Math.round(v / STEP);
      setIdx(Math.max(0, Math.min(STOPS - 1, i)));
    });
    return unsub;
  }, [y, STEP, STOPS]);

  const snap = () => {
    const target = idx * STEP;
    animate(y, target, { type: "spring", stiffness: 280, damping: 26 });
  };

  const active = MOODS[idx];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-3">
      <h2 className="font-display font-extrabold text-[34px] leading-[0.95] tracking-tight">Quel est ton mood<br/><span className="text-[#7C5CFF]">aujourd'hui ?</span></h2>
      <p className="text-[13px] text-muted-foreground mt-2 font-medium">Tire le curseur sur l'émoji qui te correspond.</p>

      <div className="mt-8 flex justify-center">
        <div className="relative flex gap-6" style={{ height: TRACK_H + 64 }}>
          {/* Left labels */}
          <div className="flex flex-col justify-between py-4 w-[110px]">
            {MOODS.map((m, i) => (
              <div key={m.id} className={`transition ${i === idx ? "opacity-100" : "opacity-50"}`}>
                <p className="font-display font-extrabold text-[15px] text-ink">{m.label}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">{m.hours}</p>
              </div>
            ))}
          </div>

          {/* Track */}
          <div className="relative w-[14px] my-4" style={{ height: TRACK_H }}>
            <div className="absolute inset-0 rounded-full bg-white/70 border border-black/5" />
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: TRACK_H }}
              dragElastic={0}
              dragMomentum={false}
              onDragEnd={snap}
              style={{ y, backgroundColor: active.color }}
              className="absolute -left-5 size-14 rounded-full grid place-items-center text-white shadow-xl cursor-grab active:cursor-grabbing"
            >
              <RotateCcw className="size-5 rotate-90" />
            </motion.div>
          </div>

          {/* Right emojis */}
          <div className="flex flex-col justify-between py-1 w-[60px]">
            {MOODS.map((m, i) => (
              <button
                key={m.id}
                onClick={() => { setIdx(i); animate(y, i * STEP, { type: "spring", stiffness: 280, damping: 26 }); }}
                className={`size-12 rounded-full grid place-items-center text-2xl transition ${i === idx ? "scale-110 shadow-lg" : "opacity-50"}`}
                style={{ background: m.color }}
                aria-label={m.label}
              >
                {m.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onPick(active.id)}
        className="mt-8 w-full pill bg-ink text-background py-4 font-bold flex items-center justify-center gap-2 active:scale-[0.99] transition"
      >
        <Music2 className="size-4"/> Trouver ma vibe {active.label}
      </button>
    </motion.div>
  );
}

/* ---------------- Searching ---------------- */
function Searching({ mood }: { mood: Mood }) {
  const color = MOODS.find((m) => m.id === mood)!.color;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 text-center">
      <div className="mx-auto size-32 rounded-full grid place-items-center relative" style={{ background: color + "33" }}>
        <motion.div className="absolute inset-0 rounded-full" style={{ background: color + "22" }} animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.8, repeat: Infinity }} />
        <div className="flex items-end gap-1.5 h-14">
          {[0,1,2,3,4].map((i) => (
            <motion.span key={i} className="w-2 rounded-full" style={{ background: color }}
              animate={{ height: ["10%", "100%", "30%", "80%", "20%"] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
      </div>
      <p className="mt-8 font-display font-extrabold text-[22px]">On cherche ta vibe…</p>
      <p className="text-[13px] text-muted-foreground mt-1">On compose une piste pour ton humeur.</p>
    </motion.div>
  );
}

/* ---------------- Track view ---------------- */
function TrackView({ track, mood, playing, onPlay, onSkip, onAdd, skipsLeft }: {
  track: Track; mood: Mood; playing: boolean; onPlay: () => void; onSkip: () => void; onAdd: () => void; skipsLeft: number;
}) {
  const color = MOODS.find((m) => m.id === mood)!.color;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="pt-2">
      <div className="relative rounded-[32px] p-6 overflow-hidden border border-white/60 soft-shadow" style={{ background: `linear-gradient(160deg, ${color}55, ${color}11)` }}>
        <div className="relative aspect-square rounded-3xl bg-white/70 backdrop-blur grid place-items-center text-[110px] shadow-xl">
          {track.cover}
        </div>
        <div className="relative mt-5">
          <span className="pill bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink/70">{track.tag}</span>
          <h2 className="font-display font-extrabold text-[28px] leading-tight mt-2 text-ink">{track.title}</h2>
          <p className="text-[14px] text-ink/70 font-semibold">{track.artist}</p>
        </div>
        <div className="relative mt-5 flex items-center gap-3">
          <button onClick={onPlay} className="size-14 rounded-full bg-ink text-background grid place-items-center active:scale-95 transition">
            {playing ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
          </button>
          <button onClick={onAdd} className="flex-1 pill bg-white/80 border border-black/5 py-3.5 font-bold text-ink text-sm flex items-center justify-center gap-1.5 active:scale-[0.98]">
            <Plus className="size-4"/> Ajouter à ma playlist
          </button>
        </div>
      </div>

      <button onClick={onSkip} className="mt-4 w-full pill border border-ink/15 bg-surface py-3.5 font-bold text-ink text-sm flex items-center justify-center gap-2 active:scale-[0.98]">
        <SkipForward className="size-4"/> Passer
        <span className="text-[11px] text-muted-foreground font-semibold">· {skipsLeft} restants</span>
      </button>
    </motion.div>
  );
}
