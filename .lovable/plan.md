## 1. "Continuer avec Google" button on /login and /onboarding

- Add a Google button (white pill, Google "G" icon, "Continuer avec Google") above the email/password block on `src/routes/login.tsx` and on the relevant step of `src/routes/onboarding.tsx`.
- Below it, a thin divider "ou" separating it from the email flow.
- Visual only — no auth backend in this pass. Clicking shows a toast ("Bientôt disponible") and routes the user forward like the existing CTA, so the demo flow keeps working.
- If you want it actually wired to Google sign-in, that needs Lovable Cloud + Google provider enabled; tell me and I'll do that in a follow-up.

## 2. Editable filter pills on /results

Today the row of pills at the top of `src/routes/results.tsx` (Sport / Quand+durée / Ville / Rayon / Mode / Genre) is read-only. Make each pill a dropdown trigger:

- Click a pill → small popover opens just below it with a scrollable list of options + a "Peu importe" entry at the top (French equivalent of "any") to clear that filter.
- Selecting an option updates the shared filters store (`useFilters` in `src/lib/store.ts`) and closes the popover; the results list re-filters immediately.
- Active pill keeps the lime/lavender tone; reset pills use the neutral ghost tone. A small chevron is added to each pill to signal it's interactive.

Pill → options mapping:
- **Sport**: list from `SPORTS` in `src/data/mock.ts` (Yoga, Course, Tennis, …).
- **Quand · durée**: two-section popover — "Quand" (Aujourd'hui, Demain, Cette semaine, Peu importe) and "Durée" (30, 45, 60, 90 min, Peu importe).
- **Ville**: list of cities present in `PARTNERS` + "Peu importe".
- **Rayon**: 2, 5, 10, 20, 50 km + "Peu importe" (= 50 km max).
- **Mode** (only shown when active today — will always be visible now): Tous, Présentiel, Visio.
- **Genre**: Peu importe, Femmes, Hommes, Mixte.

Implementation uses the existing shadcn `Popover` component to stay consistent with the rest of the UI; no new deps.

## Out of scope
- Real Google OAuth wiring (needs backend opt-in).
- Changes to the bottom tab bar or other screens.
