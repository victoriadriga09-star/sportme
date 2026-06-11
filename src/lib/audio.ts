import { useEffect, useRef } from "react";
import type { Mood } from "@/data/moodTracks";

// Chord voicings per mood (Hz). Synthesized ambient pad — no external audio.
const CHORDS: Record<Mood, number[]> = {
  excellent: [261.63, 329.63, 392.0, 523.25],   // C major add tonic octave — upbeat
  good:      [293.66, 369.99, 440.0, 587.33],   // D major
  fair:      [220.0, 261.63, 329.63, 392.0],    // A minor
  poor:      [196.0, 233.08, 293.66, 349.23],   // G minor
  worst:     [164.81, 196.0, 246.94, 293.66],   // E minor low
};

type Voice = { osc: OscillatorNode; gain: GainNode };

export function useMoodAudio(mood: Mood | null, playing: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const voicesRef = useRef<Voice[]>([]);
  const masterRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  // Stop helper
  const stop = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    voicesRef.current.forEach((v) => {
      try { v.gain.gain.cancelScheduledValues(ctx.currentTime); } catch {}
      try { v.gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.2); } catch {}
      try { v.osc.stop(ctx.currentTime + 0.5); } catch {}
    });
    if (lfoRef.current) {
      try { lfoRef.current.osc.stop(ctx.currentTime + 0.5); } catch {}
    }
    voicesRef.current = [];
    lfoRef.current = null;
  };

  useEffect(() => {
    if (!playing || !mood) { stop(); return; }
    if (typeof window === "undefined") return;

    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!ctxRef.current) ctxRef.current = new AC();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    // Master gain w/ slow fade-in
    if (!masterRef.current) {
      masterRef.current = ctx.createGain();
      masterRef.current.gain.value = 0;
      masterRef.current.connect(ctx.destination);
    }
    const master = masterRef.current;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.2);

    // Slow tremolo LFO for life
    const lfoOsc = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfoOsc.frequency.value = 0.18;
    lfoGain.gain.value = 0.04;
    lfoOsc.connect(lfoGain).connect(master.gain);
    lfoOsc.start();
    lfoRef.current = { osc: lfoOsc, gain: lfoGain };

    // Voices: one per chord note
    const freqs = CHORDS[mood];
    voicesRef.current = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "sine" : i === freqs.length - 1 ? "triangle" : "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0;
      osc.connect(g).connect(master);
      osc.start();
      g.gain.linearRampToValueAtTime(0.12 / freqs.length + (i === 0 ? 0.04 : 0), ctx.currentTime + 1.5 + i * 0.25);
      return { osc, gain: g };
    });

    return () => { stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood, playing]);

  useEffect(() => () => {
    stop();
    if (ctxRef.current) { try { ctxRef.current.close(); } catch {} ctxRef.current = null; }
  }, []);
}
