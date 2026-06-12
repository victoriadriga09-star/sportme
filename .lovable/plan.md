## Goal

On `/melody`, swap the fake synthesized pad for real Spotify playback using Spotify's open embed player — no Spotify account, no API key, no OAuth.

## How Spotify embeds work

Spotify exposes a public iframe player at `https://open.spotify.com/embed/track/{TRACK_ID}` (also `/playlist/{ID}`, `/album/{ID}`). Anyone can press play and hear a 30-second preview; logged-in Spotify users hear the full track. We just need the canonical Spotify track ID for each curated song.

## Changes

### 1. `src/data/moodTracks.ts`
Add a `spotifyId` field to the `Track` type and fill it in for the 25 curated songs (5 per mood). IDs are the 22-character string from each track's Spotify URL (e.g. `Espresso` → `2qSkIjg1o9h3YT9RAgYN75`). The emoji `cover` stays as a graceful fallback.

### 2. New `src/components/SpotifyEmbed.tsx`
Tiny wrapper that renders the official iframe with the right attributes:

```tsx
<iframe
  src={`https://open.spotify.com/embed/track/${id}?utm_source=elan`}
  width="100%" height="152" loading="lazy"
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
  className="rounded-2xl border-0"
  title={`Spotify – ${title}`}
/>
```

Heights: 152 px (compact) or 352 px (with cover art). We'll use 152 to keep the existing emoji cover as the visual hero.

### 3. `src/routes/melody.tsx`
- Remove the `useMoodAudio` synthesizer call (the embed handles playback).
- Remove the custom Play/Pause button — Spotify's embed has its own transport. Keep Skip and "Ajouter à ma playlist".
- Drop the big emoji cover down a bit and mount `<SpotifyEmbed id={track.spotifyId} title={track.title}/>` directly under the title/artist block.
- Keep the mood picker, searching animation, and skip/add flow untouched.

### 4. Graceful fallback
If a track has no `spotifyId` (or the iframe fails), keep the emoji card visible and show a small "Aperçu indisponible" hint instead of the player. No app crash.

## What this does NOT do

- No Spotify login, no per-user playlists in the user's Spotify account, no "save to Spotify library" button (that requires OAuth — separate plan).
- No live search by mood. The mood → track mapping stays our curated list.
- No `LocationShareDialog`-style backend; everything stays client-side.

## Files touched
- `src/data/moodTracks.ts` — add `spotifyId` per track
- `src/components/SpotifyEmbed.tsx` — new
- `src/routes/melody.tsx` — drop synth + custom play button, mount embed
