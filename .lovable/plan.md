# Fit-to-screen + Map polish on /results & /onboarding

## 1. Onboarding — fit each step in one phone screen (no scroll)

File: `src/routes/onboarding.tsx`

- Root container: change `min-h-[100dvh] flex flex-col` to `h-[100dvh] overflow-hidden flex flex-col` so the page is locked to the visible frame.
- Reduce vertical paddings: top bar `pt-6 pb-2` → `pt-4 pb-1`; content section `pt-6 pb-2` → `pt-3 pb-1`; glass card `p-7 pt-8` → `p-5 pt-6`; spacing under title `mt-10` → `mt-5`; footer `pb-8 pt-4` → `pb-5 pt-2`.
- Sports step (step 9): change `max-h-[42vh]` → `max-h-[38vh]` and keep its internal scroll (only that grid is scrollable, page itself is not).
- Bio textarea height `h-40` → `h-32`.
- Photo step circle `size-36` → `size-28`.
- Final step orb `size-24` → `size-20`.

## 2. Swipe card — fit inside frame (slightly shorter)

File: `src/routes/results.tsx` (`SwipeView` + `SwipeCard`)

- `SwipeView` wrapper: `h-[68vh]` → `h-[58vh]` so action buttons sit above the bottom tab bar without the page scrolling.
- `SwipeCard` article: `h-[64vh]` → `h-[54vh]`.
- Avatar inside card: `size={150}` → `size={130}` for proportion.

## 3. Map view — bring time/distance label closer to avatar pin

File: `src/routes/results.tsx` (`MapView`)

- Per-pin tooltip: change `-top-12` → `-top-7` and tighten paddings (`px-2 py-1` stays, but the offset is the visible fix).
- "Toi" pill: change `translate-x-3 -translate-y-9` → `translate-x-2 -translate-y-6`.

## 4. "Toi" user marker — bigger pulse, smaller black dot

File: `src/routes/results.tsx` (`MapView` user marker)

Current: `size-6 rounded-full bg-ink` with inner `size-2 bg-lime animate-pulse`.

Change to a layered marker:
- Outer pulse ring: absolutely positioned `size-10 rounded-full bg-lavender/40 animate-ping` (uses existing lavender token) underneath.
- Center dot: `size-4 rounded-full bg-ink ring-4 ring-background` (smaller than today's size-6).
- Remove inner lime dot (the pulse ring replaces it).

## 5. Sync map data with active filters + list under the map

File: `src/routes/results.tsx`

Today `MapView` already receives the filtered `list` (the same `list` used by List/Swipe), so the data source already matches. Two adjustments:

- Render ALL filtered partners on the map (not capped at `positions.length = 8`). Generate deterministic positions for any list length:
  - Replace the hard-coded `positions` array with a function `getPos(i, total)`: places pins on concentric rings around the user marker using `angle = (i * 137.5°) % 360` (golden-angle) and `radius = 22% + (Math.floor(i / 8) * 12%)`, clamped to `[12%, 86%]` for both `left` and `top`. This gives a pleasant, non-overlapping spread for any count.
- Below the map container, add a partner list section inside the map view:
  - Heading: `<p>{list.length} partenaire(s) sur la carte</p>` styled like other section labels.
  - Render `<ListView list={list} />` reused as-is (already defined in the file) so the cards match the List tab exactly.
- Remove the bottom-sheet preview (`absolute inset-x-3 bottom-3 ...`) from the map since the full list now lives directly below — it duplicates info and crowds the map.
- Shorten map height `h-[70vh]` → `h-[52vh]` so both map and list fit naturally without the page feeling map-dominant.

Net result: List, Map, and Swipe all show the exact same filtered partners (already from one `list` source), and Map now shows every one of them as a pin plus the same cards below.

## Out of scope

- No changes to filter logic, store, or data shape.
- No changes to BottomTabBar or routing.
