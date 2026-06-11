export type Mood = "excellent" | "good" | "fair" | "poor" | "worst";

export const MOODS: { id: Mood; label: string; emoji: string; hours: string; color: string }[] = [
  { id: "excellent", label: "Excellent", emoji: "😄", hours: "7-9h", color: "#7CC97A" },
  { id: "good",      label: "Good",      emoji: "🙂", hours: "6-7h", color: "#F5D451" },
  { id: "fair",      label: "Fair",      emoji: "😐", hours: "5h",   color: "#A89A8E" },
  { id: "poor",      label: "Poor",      emoji: "🙁", hours: "3-4h", color: "#F08C5A" },
  { id: "worst",     label: "Worst",     emoji: "😣", hours: "<3h",  color: "#8E7BD9" },
];

export type Track = { id: string; title: string; artist: string; cover: string; tag: string };

export const TRACKS: Record<Mood, Track[]> = {
  excellent: [
    { id: "e1", title: "Sunlight Drive", artist: "Aurora Beat", cover: "🌞", tag: "Upbeat pop" },
    { id: "e2", title: "Top of the World", artist: "Kite", cover: "🎉", tag: "Indie dance" },
    { id: "e3", title: "Golden", artist: "Lumen", cover: "🏆", tag: "Feel-good" },
    { id: "e4", title: "Run the City", artist: "Nova", cover: "⚡", tag: "Energy" },
  ],
  good: [
    { id: "g1", title: "Easy Sunday", artist: "Marlow", cover: "🌤", tag: "Chill pop" },
    { id: "g2", title: "Warm Hours", artist: "June Sky", cover: "☕", tag: "Mellow" },
    { id: "g3", title: "Smile Lines", artist: "Petal", cover: "🌼", tag: "Indie folk" },
    { id: "g4", title: "Light Steps", artist: "Cova", cover: "🚶", tag: "Acoustic" },
  ],
  fair: [
    { id: "f1", title: "In Between", artist: "Hollow Moon", cover: "🌫", tag: "Lo-fi" },
    { id: "f2", title: "Drift", artist: "Pale Sea", cover: "🌊", tag: "Ambient" },
    { id: "f3", title: "Reset", artist: "Cassia", cover: "🔄", tag: "Focus" },
    { id: "f4", title: "Quiet Room", artist: "Ember", cover: "🪟", tag: "Neo-classical" },
  ],
  poor: [
    { id: "p1", title: "Breathe Slow", artist: "Solene", cover: "🍂", tag: "Soothing" },
    { id: "p2", title: "Soft Landing", artist: "Halo", cover: "🪶", tag: "Calm" },
    { id: "p3", title: "Walk With Me", artist: "Mira", cover: "🌧", tag: "Indie" },
    { id: "p4", title: "Tomorrow", artist: "Lone Pine", cover: "🌅", tag: "Hopeful" },
  ],
  worst: [
    { id: "w1", title: "Hold On", artist: "Vespers", cover: "🌙", tag: "Healing" },
    { id: "w2", title: "Stillness", artist: "Aria", cover: "🕯", tag: "Meditation" },
    { id: "w3", title: "Soft Rain", artist: "Mossy", cover: "💧", tag: "Ambient" },
    { id: "w4", title: "Cocoon", artist: "Veil", cover: "🛌", tag: "Sleep" },
  ],
};
