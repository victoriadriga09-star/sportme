## 1. `/results` — real map background

The current `MapView` loads `https://staticmap.openstreetmap.de/...` which is unreliable and is currently rendering as a blank/error in the preview. Replace it with the **OpenStreetMap embed iframe** (no API key, always works), which produces the exact tiled map look from the attached reference (street names, neighborhoods, etc.).

In `src/routes/results.tsx` (MapView):
- Compute a small bbox from the existing `coords` (delta ~0.018° → roughly the zoom level shown in the reference).
- Replace the `<img>` with:
  ```tsx
  <iframe
    title={`Carte de ${city}`}
    src={`https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik`}
    className="absolute inset-0 w-full h-full pointer-events-none"
    loading="lazy"
  />
  ```
- Keep the existing lavender gradient overlay on top so the map keeps the ÉLAN tint from the reference.
- Keep all pins, radius circle, "Toi" marker, and bottom sheet unchanged — they already match the attachment.
- Keep the `useEffect` Nominatim geocoder for unknown cities.

## 2. SearchWaves — center on one iPhone screen, no scroll

Root cause: `SearchWaves` is rendered inside `explorer.tsx`'s `<main>`, which lives inside `.mobile-scroll` (the scrollable area of the iPhone frame). Even with `absolute inset-0`, it stretches to the full scrollable content height (explorer is taller than 844px), so the logo sits high and the page can still scroll.

Fix: render the overlay as a **direct child of `.mobile-frame`** (sibling of `.mobile-scroll`) via a React portal. Then `absolute inset-0` maps to exactly one iPhone screen (390×844) with no scroll.

Changes:
1. **`src/routes/__root.tsx`** — inside `AppShell`'s `.mobile-frame` div, add a fixed overlay mount node:
   ```tsx
   <div id="phone-overlay-root" className="absolute inset-0 pointer-events-none z-[200]" />
   ```
   (sibling of `.mobile-scroll` and `<BottomTabBar />`, last child so it stacks on top).

2. **`src/components/SearchWaves.tsx`** — wrap the returned JSX in `createPortal(..., document.getElementById("phone-overlay-root"))` (guarded for SSR with a `useEffect` + `mounted` flag). The overlay keeps `absolute inset-0 grid place-items-center overflow-hidden` and gets `pointer-events-auto` so it blocks interaction while visible.

3. No changes needed in `explorer.tsx` — `{searching && <SearchWaves />}` still works; the portal redirects rendering to the frame-level node.

Result: the loop icon + concentric waves are perfectly centered in the iPhone 14 viewport, the label/progress bar sit near the bottom of that same screen, and the page beneath cannot scroll while the animation is showing.

## Files touched
- `src/routes/results.tsx` — swap broken static map for OSM embed iframe in `MapView`.
- `src/routes/__root.tsx` — add `#phone-overlay-root` inside `.mobile-frame`.
- `src/components/SearchWaves.tsx` — portal into `#phone-overlay-root`.
