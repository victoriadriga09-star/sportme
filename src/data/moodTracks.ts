export type Mood = "excellent" | "good" | "fair" | "poor" | "worst";

export const MOODS: { id: Mood; label: string; emoji: string; hours: string; color: string }[] = [
  { id: "excellent", label: "Excellent", emoji: "😄", hours: "7-9h", color: "#7CC97A" },
  { id: "good",      label: "Good",      emoji: "🙂", hours: "6-7h", color: "#F5D451" },
  { id: "fair",      label: "Fair",      emoji: "😐", hours: "5h",   color: "#A89A8E" },
  { id: "poor",      label: "Poor",      emoji: "🙁", hours: "3-4h", color: "#F08C5A" },
  { id: "worst",     label: "Worst",     emoji: "😣", hours: "<3h",  color: "#8E7BD9" },
];

export type Track = { id: string; title: string; artist: string; cover: string; tag: string };

// Popular contemporary hits curated per mood
export const TRACKS: Record<Mood, Track[]> = {
  excellent: [
    { id: "e1", title: "Espresso",            artist: "Sabrina Carpenter",   cover: "☕", tag: "Pop hit" },
    { id: "e2", title: "Houdini",             artist: "Dua Lipa",            cover: "✨", tag: "Dance pop" },
    { id: "e3", title: "Pink Pony Club",      artist: "Chappell Roan",       cover: "🎀", tag: "Pop anthem" },
    { id: "e4", title: "Padam Padam",         artist: "Kylie Minogue",       cover: "💓", tag: "Nu-disco" },
    { id: "e5", title: "As It Was",           artist: "Harry Styles",        cover: "🌈", tag: "Synth pop" },
  ],
  good: [
    { id: "g1", title: "Lose Control",        artist: "Teddy Swims",         cover: "🎙", tag: "Soul pop" },
    { id: "g2", title: "Greedy",              artist: "Tate McRae",          cover: "💃", tag: "Pop" },
    { id: "g3", title: "Cruel Summer",        artist: "Taylor Swift",        cover: "☀️", tag: "Pop" },
    { id: "g4", title: "Beautiful Things",    artist: "Benson Boone",        cover: "🌼", tag: "Indie pop" },
    { id: "g5", title: "Mon Amour",           artist: "Aya Nakamura",        cover: "💛", tag: "Afro pop" },
  ],
  fair: [
    { id: "f1", title: "Snooze",              artist: "SZA",                 cover: "🌙", tag: "R&B" },
    { id: "f2", title: "Vampire",             artist: "Olivia Rodrigo",      cover: "🩸", tag: "Alt pop" },
    { id: "f3", title: "Flowers",             artist: "Miley Cyrus",         cover: "🌷", tag: "Pop" },
    { id: "f4", title: "Daylight",            artist: "David Kushner",       cover: "🌫", tag: "Folk pop" },
    { id: "f5", title: "Glimpse of Us",       artist: "Joji",                cover: "🪞", tag: "Ballad" },
  ],
  poor: [
    { id: "p1", title: "Stick Season",        artist: "Noah Kahan",          cover: "🍂", tag: "Folk" },
    { id: "p2", title: "Lovin On Me",         artist: "Jack Harlow",         cover: "🪶", tag: "Hip hop" },
    { id: "p3", title: "Lavender Haze",       artist: "Taylor Swift",        cover: "💜", tag: "Synth pop" },
    { id: "p4", title: "Si tu savais",        artist: "Shay",                cover: "🌧", tag: "FR pop" },
    { id: "p5", title: "Kill Bill",           artist: "SZA",                 cover: "🗡", tag: "R&B" },
  ],
  worst: [
    { id: "w1", title: "Liability",           artist: "Lorde",               cover: "🌙", tag: "Ballad" },
    { id: "w2", title: "Weightless",          artist: "Marconi Union",       cover: "🕯", tag: "Ambient" },
    { id: "w3", title: "Skinny Love",         artist: "Bon Iver",            cover: "💧", tag: "Indie folk" },
    { id: "w4", title: "Pluto Projector",     artist: "Rex Orange County",   cover: "🛌", tag: "Soft pop" },
    { id: "w5", title: "Motion Sickness",     artist: "Phoebe Bridgers",     cover: "🌑", tag: "Indie" },
  ],
};
