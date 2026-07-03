# Trattoria Vulcano — Cucina di Fuoco

Site 3D immersif pour une trattoria sicilienne fictive (pièce portfolio).
Scroll = la caméra traverse la salle : volcan par la fenêtre → salle → table → four à bois → cave à vins → réservation.

## Stack

- Vite + React 19
- Three.js + React Three Fiber + drei + postprocessing (bloom, vignette)
- Zustand (état partagé DOM ↔ 3D)
- Scène procédurale + 3 textures CC0 d'[ambientCG](https://ambientcg.com) (Tiles012, Plaster001, WoodFloor064 — aucune attribution requise)
- OG image capturée depuis le rendu réel (`public/img/og.jpg`)

## Commandes

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

## Interactions

- **Scroll** : trajet caméra amorti à travers la scène
- **Souris** : parallaxe caméra
- **Survol menu (DOM)** : le plat correspondant s'anime sur la table 3D (et inversement, survol 3D → tooltip)
- **Clic sur le volcan** : éruption (secousse caméra, braises ×4)
- **Bouton bas-droit** : bascule mode "flat" sans 3D (activé d'office si `prefers-reduced-motion`)

## Accessibilité / perf

- Sections DOM réelles (SEO, lecteurs d'écran), skip-link, focus visible
- `prefers-reduced-motion` → mode flat par défaut, marquee stoppé
- Post-processing et étoiles réduits sous 768 px, DPR plafonné
- Chunks séparés three / r3f / app (~195 kB gzip au total pour three+r3f)

## Assets optionnels (non requis, mais si tu veux monter le niveau)

Le site fonctionne sans aucun asset. Pour aller plus loin, fournir :

| Asset | Spécification | Usage |
|-------|--------------|-------|
| Image OG | 1200×630 JPG < 200 kB, capture du hero | `og:image` (absente pour l'instant) |
| Modèles 3D plats | GLB < 500 kB/pièce, ~2k tris, textures 1024² compressées (KTX2 idéalement) | Remplacer pizza/pasta/arancini procéduraux |
| Modèle four à bois | GLB < 1 Mo, pivot au sol | Remplacer le dôme procédural |
| Ambiance sonore | MP3/OGG < 300 kB en boucle (feu qui crépite, salle) | Toggle son (à implémenter) |
| Photos plats | Inutiles en l'état — le parti pris est 100 % 3D graphique | Mode flat, si souhaité |

## Déploiement

Vercel : framework auto-détecté (Vite), `vercel.json` fournit CSP + cache immutable des assets.
