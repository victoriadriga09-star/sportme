
# Plan — Restructure home + new features + Explorer redesign

## 1. Home screen restructure (`src/routes/home.tsx`)

Replace the 4 quick-action buttons (Trouver / Match / Groupes / Planning) with **3 purposeful actions** that no longer duplicate the bottom tab bar:

- **Melody** (replaces "Match" / loop) → opens `/melody` (mood→music)
- **Sports** (replaces "Groupes") → opens `/sports` (sports library)
- **Agenda** (replaces "Planning") → opens `/agenda` (calendar view)

The "Trouver" tile is removed (the search icon in the header already goes to `/explorer`).

Below, replace the "Ton parcours" bento (Daily challenge / Séances / Streak) with **3 KPI tiles tied to real data**:
- **Complétées ce mois** → `/sessions?status=done`
- **Planifiées** → `/sessions?status=planned`
- **Annulées** → `/sessions?status=cancelled`

Each KPI is clickable and routes to a filtered list (see §5).

## 2. Melody — mood → music (`src/routes/melody.tsx` + assets)

New full-screen flow inspired by the attached mood-slider screenshot:

1. **Mood picker**: vertical track with 5 emoji stops (Excellent / Good / Fair / Poor / Worst) — draggable orange thumb snaps to the closest emoji. Built with `framer-motion` `drag="y"` + `useMotionValue` mapped to 0–4 index.
2. **Searching state** (2–3 s): animated equalizer bars + "On cherche ta vibe…".
3. **Track card**: cover art, title, artist, mood tag, play/pause (HTML `<audio>` with a short mock mp3 per mood).
4. **Actions**: `Ajouter à ma playlist` (saves to `localStorage` `elan.playlist`) · `Passer` (next track, **max 3 skips**, then forces "Choisis à nouveau ton mood" reset).

Mock data: `src/data/moodTracks.ts` → 4–5 tracks per mood, free CDN audio. Skip counter held in component state, reset on mood re-pick.

## 3. Sports library (`src/routes/sports.tsx` + `src/routes/sports.$slug.tsx`)

- Grid of sport cards (2 per row) using existing `SPORTS` from `src/data/mock.ts` (extend with `description`, `funFacts`, `cover`).
- Tap → sport detail page with hero, "À propos", 3 fun facts, and a list of users practicing it (filtered from `PARTNERS`). Each user row links to `/partner/$id`.

## 4. Agenda (`src/routes/agenda.tsx`)

- Tabs **Mois / Semaine / Jour**, default Mois.
- Reuses shadcn `Calendar` component for month view; custom week/day grids.
- Days with sessions show a colored dot (planned = lavender, completed = lime, cancelled = muted).
- Tap a session → **Session sheet** (shared component `SessionSheet.tsx`):
  - Key details: sport, partner avatar+name, time, place, status.
  - If **planned**: buttons `Annuler` and `Reprogrammer`.
    - `Annuler` → random kind message from a list (`"C'est pas grave, on remet ça demain ?"`, `"On respire, et on repart plus fort 💪"`, etc.) + two CTAs: `Reprogrammer` (date+time picker → toast "Message envoyé à {partner}") · `Planifier une autre séance` (→ `/explorer`).
    - `Reprogrammer` → date+time picker → same toast.
  - If **completed**: read-only score 0–5 ⭐.

Random-message helper in `src/lib/kindMessages.ts`.

## 5. Stats drilldown (`src/routes/sessions.tsx`)

Extend existing Sessions page to honor `?status=done|planned|cancelled` search param (validated via zod adapter). Add a third tab "Annulées". Each completed item shows a 0–5 satisfaction score.

## 6. Explorer redesign (`src/routes/explorer.tsx`)

- **Sports**: replace pill chips with a **3-col grid of square tiles** (emoji + label), plus an "Autre" tile that opens the existing `SportPicker` modal with search.
- **Quand**: keep quick pills (Maintenant / Aujourd'hui / Demain) + date picker, and **add a time picker** (`<input type="time">`) right next to the date. Stored in filters as `whenTime`.
- **Durée**: moves below "Quand" (already is — just visually grouped under the same card).
- Tighter visual rhythm: each section becomes a rounded `bg-surface/60` card with consistent padding; the hero stays.

Add `whenTime?: string` to `Filters` in `src/lib/store.ts`.

## 7. Bottom tab bar

Update `BottomTabBar.tsx` so the loop/center icon points to **Melody** (replacing the unused loop slot), keeping Home / Explorer / Profile as the other tabs.

## Technical summary

- New routes: `/melody`, `/sports`, `/sports/$slug`, `/agenda`.
- New components: `MoodSlider`, `MelodyPlayer`, `SessionSheet`, `SportTile`, `AgendaMonth/Week/Day`.
- New data: `src/data/moodTracks.ts`, extend `SPORTS`, `src/lib/kindMessages.ts`.
- Store: extend `Filters` with `whenTime`; add `usePlaylist` hook.
- Mock session data centralized in `src/data/sessions.ts` (status: planned/done/cancelled + score) so home KPIs, Sessions page, and Agenda all read from one source.
- All animations via `framer-motion` (already installed). No backend changes — everything stays client-side with `localStorage`.

## Out of scope (ask if you want them)

- Real audio streaming / Spotify integration (we use mock mp3s).
- Real push messaging to the partner on reschedule (we just toast).
