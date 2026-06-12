# Plan

## 1. Move "Continuer avec Google" below "Se connecter"

**`src/routes/login.tsx`**
- Remove `<GoogleButton />` and its "ou" divider from the top of the form (above Email).
- In the bottom CTA block, render order becomes:
  1. `Se connecter` (existing lavender pill)
  2. `ou` divider
  3. `Continuer avec Google` (white pill)
  4. `Pas encore de compte ? Créer un compte`

**`src/routes/onboarding.tsx`**
- Same reorder on the email step: Google button moves from above the email input to below the "Continuer" primary CTA, with an `ou` divider between them.

**`src/components/GoogleButton.tsx`**
- Split into two pieces so the divider can live separately from the button (the divider currently sits above the button — we need it on top when the button is below the primary CTA).
- Export `<GoogleButton />` (just the button) and `<OrDivider />` (the "— ou —" line).
- Wire the button's `onClick` to the real OAuth call (see step 2). Remove the "bientôt disponible" toast.

## 2. Real Google sign-in via Lovable Cloud

- **Enable Lovable Cloud** (Supabase under the hood).
- **Configure Google provider** in Supabase Auth (managed via the social auth tool — no manual dashboard step for the user).
- **Schema migration** — create `profiles` table linked to `auth.users`:
  - Columns: `id uuid PK references auth.users(id) on delete cascade`, `email text`, `display_name text`, `avatar_url text`, `created_at timestamptz default now()`, `updated_at timestamptz default now()`.
  - `GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;` + `GRANT ALL ... TO service_role;`.
  - RLS enabled. Policies: a user can `SELECT`/`UPDATE` only their own row (`auth.uid() = id`).
  - Trigger `handle_new_user()` on `auth.users` insert → creates a matching `profiles` row, prefilling `email`, `display_name` (from `raw_user_meta_data->>'full_name'` or `name`), and `avatar_url` (from `raw_user_meta_data->>'avatar_url' / 'picture'`).
- **Sign-in call** in `GoogleButton.onClick`:
  ```ts
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/home` },
  });
  ```
  (uses the browser client from `@/integrations/supabase/client`).
- **Session listener** — add a single `supabase.auth.onAuthStateChange` in `src/routes/__root.tsx`:
  - On `SIGNED_IN` redirect to `/home`; on `SIGNED_OUT` redirect to `/`.
  - Also call `router.invalidate()` so any user-scoped data refetches.
- **Email/password buttons** keep their current demo behavior in this pass (the user only asked for Google to be functional). We can wire email/password to `supabase.auth.signInWithPassword` in a follow-up.

## 3. Consistent phone frame on every screen

The root layout (`src/routes/__root.tsx`) already wraps every route in `<div className="mobile-frame">` (max-width 430px, rounded outline on ≥640px). Every route currently uses `min-h-[100dvh]` inside that frame, so width is already consistent.

What can still drift: total height varies by content, and a few screens (`profile`, `melody`) use their own background, which leaks outside the rounded frame on desktop because backgrounds are set on `<main>` instead of the frame.

Fixes:
- In `src/styles.css` `.mobile-frame`, set `overflow: hidden` (currently `overflow-x: hidden`) on the ≥640px breakpoint so any inner background clips to the rounded corners.
- Audit and normalize: every route's outer wrapper uses `min-h-[100dvh]` (already the case) and avoids `w-screen` / `100vw` (none currently do — verified).
- No change to per-screen layouts otherwise; this preserves the existing design while guaranteeing every screen has identical width and the same outer rounded frame.

## Out of scope
- Email/password real auth (Google only this pass, as requested).
- Apple sign-in.
- Profile editor UI — we just create the table + auto-fill; existing `useUser()` mock stays for display until you ask to wire it to the real profile row.
