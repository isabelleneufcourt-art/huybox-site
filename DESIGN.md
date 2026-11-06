---
version: alpha
name: Huybox
description: Site vitrine et de réservation de Huybox (box de stockage) — Next.js + Tailwind.
colors:
  primary: "#0f273f"
  primary-light: "#1b3a5c"
  primary-dark: "#09172a"
  secondary: "#d70c2a"
  secondary-light: "#f2284a"
  accent: "#2c9669"
  neutral: "#ffffff"
  neutral-50: "#f8fafc"
  neutral-100: "#f1f5f9"
  neutral-200: "#e2e8f0"
  neutral-400: "#94a3b8"
  neutral-600: "#475569"
  neutral-800: "#1e293b"
  neutral-900: "#0f172a"
typography:
  h1:
    fontFamily: Poppins
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.1
  h2:
    fontFamily: Poppins
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
  h3:
    fontFamily: Poppins
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 600
rounded:
  lg: 0.5rem
  xl: 1rem
  2xl: 1.5rem
  full: 9999px
spacing:
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  section: 3.5rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.xl}"
  button-cta:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.xl}"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.neutral-800}"
    rounded: "{rounded.2xl}"
  badge-available:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
---

## Overview

Huybox est un service de box de stockage : le ton est professionnel, rassurant et clair. L'interface est aérée, sobre, avec un bleu marine dominant (confiance) et un rouge réservé à l'action (appeler, réserver). Elle doit rester lisible et simple sur mobile, la majorité des visiteurs cherchant vite un prix, une disponibilité ou un numéro.

## Colors

Source de vérité : variables CSS HSL dans [src/app/globals.css](src/app/globals.css), exposées via [tailwind.config.ts](tailwind.config.ts). Ne jamais coder de couleur en dur : utiliser les classes Tailwind (`primary`, `secondary`, `accent`, `neutral-*`).

- **Primary (#0f273f) :** bleu marine — titres, boutons principaux, liens, en-têtes.
- **Secondary (#d70c2a) :** rouge — uniquement pour les CTA principaux (« Appeler maintenant ») et accents critiques.
- **Accent (#2c9669) :** vert — badges « disponible » et états de succès.
- **Neutral :** blanc en fond de page, échelle slate pour texte (800/900), bordures (200) et fonds de section (50/100).

## Typography

- **Titres :** Poppins, semi-bold (600), couleur neutral-900.
- **Corps :** Inter, 400, couleur neutral-800.
- Les polices sont chargées via `next/font` (variables `--font-heading`, `--font-body`) ; utiliser `font-heading` / `font-body`.

## Layout

Conteneur `container-page` (max-w-7xl, padding 4/6/8) et espacement vertical de section `section-y` (py-14, py-20 dès `sm`). Approche mobile-first, grilles simples, beaucoup d'espace blanc.

## Elevation & Depth

Profondeur légère : ombre `shadow-card` (0 4px 24px -4px rgb(15 23 42 / 0.08)) pour les cartes, bordures fines neutral-200. `shadow-lg` seulement pour les éléments flottants.

## Shapes

Coins arrondis généreux : `rounded-2xl` pour les cartes et blocs, `rounded-xl` pour boutons et champs, `rounded-lg` pour petits éléments, `rounded-full` pour badges et pastilles.

## Components

- **Bouton principal :** fond primary, texte blanc, `rounded-xl`, texte semi-bold.
- **Bouton CTA :** fond secondary, texte blanc, `rounded-xl`, survol `brightness-95`.
- **Carte :** fond blanc, `rounded-2xl`, `shadow-card`, bordure neutral-200.
- **Badge disponible :** accent, `rounded-full`.

## Do's and Don'ts

- Do : réutiliser les tokens et classes existants avant d'en créer de nouveaux.
- Do : garder un seul CTA rouge dominant par écran.
- Do : vérifier le contraste (WCAG AA) pour tout nouveau couple texte/fond.
- Don't : introduire de nouvelles couleurs, polices ou rayons hors de ce fichier.
- Don't : utiliser le rouge pour de la décoration ou des états non critiques.
