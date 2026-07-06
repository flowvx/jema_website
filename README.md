# Jema — Landing Page

Site vitrine officiel de **Jema**, l'éditeur de texte littéraire augmenté par l'IA locale.
Slogan : _« Racontez, on s'occupe du reste. »_

SPA React + Vite + Tailwind, reprenant à l'identique le design de l'application de bureau
(glassmorphism éditorial, polices Inter + Merriweather, thèmes **Clair / Sombre / Éditorial**).

## Stack

- React 18 + Vite 6
- Tailwind CSS 3 (tokens de thème pilotés par variables CSS)
- Framer Motion (animations premium, respecte `prefers-reduced-motion`)
- Tiptap / ProseMirror (simulateur d'éditeur réel, bubble menu inclus)
- Lucide React (icônes, identiques à l'app)

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bundle de production → dist/
npm run preview  # sert le build
```

## Structure

```
src/
  App.jsx                  # assemblage des sections
  context/ThemeContext.jsx # thèmes light / dark / editorial (comme l'app)
  components/
    Navbar.jsx             # nav responsive + sélecteur de thème
    ThemeSwitcher.jsx      # bascule Clair/Sombre/Éditorial en direct
    Hero.jsx               # slogan + CTA
    Showcase.jsx           # mockup fenêtre = éditeur + panneau Jema
    EditorPreview.jsx      # éditeur Tiptap + toolbar + bouton Correction
    ChatSimulation.jsx     # panneau « Jema Intelligence » scripté
    Features.jsx           # grille de fonctionnalités
    Download.jsx           # cartes Windows / macOS / Linux
    Pricing.jsx            # licences (MASQUÉ : <Pricing enabled={false} />)
    Contact.jsx            # formulaire → mailto
    Footer.jsx
```

## Section Licence (monétisation)

Le composant `Pricing` existe mais reste **masqué** tant que le modèle économique
n'est pas arrêté. Pour l'activer, dans `App.jsx` :

```jsx
<Pricing enabled={true} onPurchase={(plan) => /* brancher le flux de licence */} />
```

## Thèmes

Les tokens CSS de `src/index.css` sont copiés depuis
`jema-editor_v2/src/renderer/src/assets/main.css` pour une fidélité visuelle exacte.
La classe de thème (`light` / `dark` / `editorial`) est posée sur `<html>`, comme dans l'app.
