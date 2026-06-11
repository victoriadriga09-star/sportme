export type Mood = "excellent" | "good" | "fair" | "poor" | "worst";

export const MOODS: { id: Mood; label: string; emoji: string; hours: string; color: string }[] = [
  { id: "excellent", label: "Excellent", emoji: "😄", hours: "7-9h", color: "#7CC97A" },
  { id: "good",      label: "Good",      emoji: "🙂", hours: "6-7h", color: "#F5D451" },
  { id: "fair",      label: "Fair",      emoji: "😐", hours: "5h",   color: "#A89A8E" },
  { id: "poor",      label: "Poor",      emoji: "🙁", hours: "3-4h", color: "#F08C5A" },
  { id: "worst",     label: "Worst",     emoji: "😣", hours: "<3h",  color: "#8E7BD9" },
];

export type Track = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  tag: string;
  /** 22-char Spotify track ID. When present, /melody renders the official Spotify embed player. */
  spotifyId?: string;
};

// Popular contemporary hits curated per mood.
// spotifyId is the 22-char ID from the Spotify track URL: open.spotify.com/track/{ID}.
export const TRACKS: Record<Mood, Track[]> = {
  excellent: [
    { id: "e1", title: "Espresso",            artist: "Sabrina Carpenter",   cover: "☕", tag: "Pop hit",     spotifyId: "2qSkIjg1o9h3YT9RAgYN75" },
    { id: "e2", title: "Houdini",             artist: "Dua Lipa",            cover: "✨", tag: "Dance pop",   spotifyId: "1NeLwFETswBuvyo1n7lzCi" },
    { id: "e3", title: "Pink Pony Club",      artist: "Chappell Roan",       cover: "🎀", tag: "Pop anthem",  spotifyId: "7y9XQYHF2lDsmGuMMqYIVu" },
    { id: "e4", title: "Padam Padam",         artist: "Kylie Minogue",       cover: "💓", tag: "Nu-disco",    spotifyId: "5GUYJTQap5F3RTPwvxJZll" },
    { id: "e5", title: "As It Was",           artist: "Harry Styles",        cover: "🌈", tag: "Synth pop",   spotifyId: "4LRPiXqCikLlN15c3yImP7" },
  ],
  good: [
    { id: "g1", title: "Lose Control",        artist: "Teddy Swims",         cover: "🎙", tag: "Soul pop",    spotifyId: "5PjdY0CKGZdEuoNab3yDmX" },
    { id: "g2", title: "Greedy",              artist: "Tate McRae",          cover: "💃", tag: "Pop",         spotifyId: "3rUGC1vUpkDG9CZFHMur1t" },
    { id: "g3", title: "Cruel Summer",        artist: "Taylor Swift",        cover: "☀️", tag: "Pop",         spotifyId: "1BxfuPKGuaTgP7aM0Bbdwr" },
    { id: "g4", title: "Beautiful Things",    artist: "Benson Boone",        cover: "🌼", tag: "Indie pop",   spotifyId: "6tNQ70jh4OwmPGpYy6R2o9" },
    { id: "g5", title: "Mon Amour",           artist: "Aya Nakamura",        cover: "💛", tag: "Afro pop",    spotifyId: "5TxR6mYWQUYV3X7sLDjPjg" },
  ],
  fair: [
    { id: "f1", title: "Snooze",              artist: "SZA",                 cover: "🌙", tag: "R&B",         spotifyId: "5N3hjp1WNayUPZrA8kJmJP" },
    { id: "f2", title: "Vampire",             artist: "Olivia Rodrigo",      cover: "🩸", tag: "Alt pop",     spotifyId: "1kuGVB7EU95pJObxwvfwKS" },
    { id: "f3", title: "Flowers",             artist: "Miley Cyrus",         cover: "🌷", tag: "Pop",         spotifyId: "0yLdNVWF3Srea0uzk55zFn" },
    { id: "f4", title: "Daylight",            artist: "David Kushner",       cover: "🌫", tag: "Folk pop",    spotifyId: "5odlY52u43F5BjByhxg7wg" },
    { id: "f5", title: "Glimpse of Us",       artist: "Joji",                cover: "🪞", tag: "Ballad",      spotifyId: "3IUNn0vO1MlanaXJqGGJTd" },
  ],
  poor: [
    { id: "p1", title: "Stick Season",        artist: "Noah Kahan",          cover: "🍂", tag: "Folk",        spotifyId: "1pIIfdSWQDdcM6lyA1FUSi" },
    { id: "p2", title: "Lovin On Me",         artist: "Jack Harlow",         cover: "🪶", tag: "Hip hop",     spotifyId: "4xhsWYTOGcal8zt0J161CU" },
    { id: "p3", title: "Lavender Haze",       artist: "Taylor Swift",        cover: "💜", tag: "Synth pop",   spotifyId: "5jQI2r1RdgtuT8S3iG8zFC" },
    { id: "p4", title: "Si tu savais",        artist: "Shay",                cover: "🌧", tag: "FR pop",      spotifyId: "1HNUYzc6Obxd17g3FoQRQq" },
    { id: "p5", title: "Kill Bill",           artist: "SZA",                 cover: "🗡", tag: "R&B",         spotifyId: "3OHfY25tqY28d16oZczHc8" },
  ],
  worst: [
    { id: "w1", title: "Liability",           artist: "Lorde",               cover: "🌙", tag: "Ballad",      spotifyId: "1wsRitfRRtWyEapl0q22o8" },
    { id: "w2", title: "Weightless",          artist: "Marconi Union",       cover: "🕯", tag: "Ambient",     spotifyId: "5UqCQaDshqbIk3pkhy4Pjg" },
    { id: "w3", title: "Skinny Love",         artist: "Bon Iver",            cover: "💧", tag: "Indie folk",  spotifyId: "1qrpoAMXodY6895hwGpvyp" },
    { id: "w4", title: "Pluto Projector",     artist: "Rex Orange County",   cover: "🛌", tag: "Soft pop",    spotifyId: "1ygyEYbmhVgRkPCBhQVR3I" },
    { id: "w5", title: "Motion Sickness",     artist: "Phoebe Bridgers",     cover: "🌑", tag: "Indie",       spotifyId: "0KXiB4FrLZ5pa3sN0aaCSn" },
  ],
};
