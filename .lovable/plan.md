ns
# Plan — ÉLAN, refonte design + toutes les pages

## Objectif
Reproduire fidèlement le langage visuel des captures d'écran fournies (style mobile moderne : grandes cartes arrondies, accents lime #CCFF00 et lavande, fonds doux, photos rondes, tab-bar pilule sombre avec FAB) et construire **toutes les pages** de la spec ÉLAN comme **routes séparées** (pas une seule page).

## 1. Système de design (refait)
- **Typographie** : remplacer Syne/Inter par un couple plus proche des maquettes
  - Titres : `Bricolage Grotesque` (display moderne, géométrique, comme « Fast Feet 2.0 », « Daily challenge », « Air quality data »)
  - Texte : `Manrope` (lisible, doux, proche des captures)
- **Couleurs** (oklch dans `styles.css`) :
  - `--lime` #CCFF00, `--lavender` #C8B8FF, `--ink` #1A1A1A, `--bg` #F5F5F0
  - Ajouts pour coller aux maquettes : `--surface` blanc pur, `--surface-2` blanc cassé, `--bubble` lavande pâle, `--chip` gris très clair
- **Composants** :
  - Cards XL coins 24–28px, ombre douce
  - Pills full-rounded (boutons date, filtres, sport, niveau)
  - Hero cards à fond plein (lime, lavande, ink) avec gros titre display
  - Tab-bar sombre flottante en pilule + FAB éclair lime surélevé
  - Avatars ronds 40/48/56/120 avec ring lime quand actif

## 2. Architecture des routes (toutes les pages)
Chaque écran = route TanStack dédiée sous `src/routes/` avec `head()` propre.

```
/                       Splash / Welcome (3 slides swipables)
/login                  Connexion
/onboarding             Flow 17 étapes (state interne, une question par écran, barre de progression)
/home                   Dashboard
/explorer               Paramétrage nouvelle séance
/explorer/results       Vue Liste (+ toggle vers map/swipe via tabs internes)
/explorer/results/map   Vue Map
/explorer/results/swipe Vue Cards swipe
/partner/$id            Profil détaillé partenaire
/request/sent           Demande envoyée
/match                  Match confirmé (animation confetti)
/social                 Communauté (feed + stories)
/social/new             Créer un post
/social/messages        Liste conversations
/social/chat/$id        Écran de chat
/profile                Mon profil
/profile/sessions       Mes séances (à venir / passées)
/profile/partners       Mes partenaires
/profile/stats          Statistiques
/profile/settings       Paramètres
/notifications          Centre de notifications
```

Layout partagé `_app.tsx` (ou wrapper dans `__root.tsx`) qui :
- centre le viewport sur 430px max (mobile-first sur desktop)
- gère la tab-bar pilule fixe en bas (visible sur Home/Explorer/Social/Profile, cachée sur onboarding/match/chat)

## 3. Contenu et fidélité visuelle
- Hero cards inspirées des captures : « Daily challenge » lavande, « Run · Daily » lime, « Air quality data » dégradé, « Fast Feet 2.0 » ink + lavande
- Photos d'illustration : générer 4–6 images (coureuse, yoga, boxe, padel, salle) en ratio portrait pour habiller les cards et l'écran Match
- Avatars : placeholders générés (initiales sur dégradé) — pas de photos de vraies personnes
- Icônes : Lucide (outlined, 1.5px) comme déjà en place

## 4. Onboarding (17 écrans, état local)
Une route `/onboarding` avec composant qui gère un wizard interne :
- barre de progression fine lime en haut
- transitions slide horizontal
- chaque étape = composant dédié (Prénom, DDN, Genre, Email, MDP, Ville, Lieu pratique, Salle conditionnelle, Sports, Niveau, Objectif, Fréquence, Jours, Créneaux, Bio, Photo, Bienvenue)
- bouton « Continuer » désactivé tant que pas valide
- pas de backend — état local, redirige vers `/home` à la fin

## 5. Détails techniques
- **TanStack Router** file-based (un fichier par route, conventions `.` = `/`, `$param` pour dynamique)
- **Pas de backend** dans cette itération (tout en données mock dans `src/data/mock.ts`)
- **Animations** : `tw-animate-css` déjà présent + classes utilitaires pour transitions douces ; pas d'install supplémentaire
- **Fonts** : chargées via `<link>` Google Fonts dans `__root.tsx`
- **SEO** : `head()` titre + description FR uniques par route

## 6. Livrables
1. `src/styles.css` refait (palette, fonts, radius, ombres)
2. `src/routes/__root.tsx` : import fonts, layout mobile centré
3. ~18 fichiers de routes ci-dessus
4. `src/components/` : `BottomTabBar`, `HeroCard`, `PartnerCard`, `Pill`, `SectionTitle`, `OnboardingStep`, `ChatBubble`, etc.
5. `src/data/mock.ts` : utilisateurs, séances, posts, messages factices
6. 4–6 images générées dans `src/assets/`

## Hors scope (pour itérations futures)
- Auth réelle, base de données, push notifs réelles
- Intégrations Calendar / Strava / Maps live
- Système de notation post-séance (UI seulement, pas de logique)

Si tu valides, je passe en mode build et je commence par le design system + le shell d'app (root layout + tab bar + fonts), puis Home refaite façon maquettes, puis les autres écrans.
