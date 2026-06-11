# Fixed iPhone-style frame, inner scroll only

## Goal
Make the preview behave like a real iPhone 14: the black phone frame, status bar area, and bottom tab bar stay perfectly still. Only the content feed inside scrolls.

Target dimensions: **390 × 844 CSS px** (iPhone 14). On narrower viewports (real phones), the frame fills the screen edge-to-edge with no outline; on wider viewports (desktop preview), it sits centered with the dark outline.

## Changes

### 1. `src/styles.css` — rework `.mobile-frame`
Turn the frame into a fixed-height device shell with an internal scroll container:

- Outer `.mobile-frame`: `width: 390px`, `height: 844px`, `overflow: hidden`, centered, rounded, dark outline. Becomes the static "phone".
- New inner class `.mobile-frame__scroll`: `height: 100%`, `overflow-y: auto`, `overscroll-behavior: contain`. This is the only thing that scrolls.
- On viewports `< 640px`: frame collapses to `100vw × 100dvh`, no outline / no border-radius, so real phones get full-bleed.

### 2. `src/routes/__root.tsx` — wrap children
Update the root layout so every page renders inside the scroll container:

```tsx
<div className="mobile-frame">
  <div className="mobile-frame__scroll">
    <Outlet />
    <BottomTabBar />  {/* moved inside the frame */}
  </div>
</div>
```

(Exact structure depends on what's currently in `__root.tsx` — I'll read it first and adapt without touching unrelated providers.)

### 3. `src/components/BottomTabBar.tsx` — anchor to the frame, not the viewport
Today it uses `fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+34px)]`, which pins it to the browser viewport. That's why it drifts outside the phone outline on desktop.

Change to `position: absolute` (or `sticky` at the bottom of the scroll container) so it pins to the bottom edge of `.mobile-frame` itself. The `max-w-[430px]` wrapper is no longer needed — the frame already constrains width.

### 4. Per-page padding sanity check
Pages currently add `pb-32` / `pb-40` to clear the floating bar. With the bar now anchored to the frame, recheck `src/routes/home.tsx`, `melody.tsx`, `profile.tsx`, `results.tsx` and trim padding so the last item sits a comfortable gap above the bar (probably `pb-24`).

## What this does NOT change
- No new dependencies.
- No route or data changes.
- No design tokens / colors changed.
- Doesn't affect real mobile devices — they still get full-screen behavior.

## Open question
Do you want the frame size to match **iPhone 14 (390×844)** or **iPhone 14 Pro Max (430×932)**? The current `max-w-[430px]` suggests Pro Max was the original intent. I'll default to **390×844 (iPhone 14)** as you mentioned, but say the word if you'd rather keep 430-wide.
