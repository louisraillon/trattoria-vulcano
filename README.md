# Trattoria Vulcano — Cucina di Fuoco

Site parallaxe 2D pour une trattoria sicilienne fictive (pièce portfolio).
Couches d'images animées au scroll + pointeur pour simuler la profondeur — zéro WebGL.

## Stack

- Vite + React 19 (+ zustand) — **~65 kB gzip au total**
- Moteur parallaxe maison : 1 rAF par scène, tué hors écran (IntersectionObserver), transforms GPU uniquement
- Assets images générés par IA — spec complète dans [layers-spec.md](layers-spec.md)
- Placeholders automatiques : chaque couche manquante affiche son nom de fichier — déposer le PNG/JPG dans `public/layers/`, refresh, terminé

## Commandes

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

## Interactions

- **Scroll** : couches translatées à vitesses différentes (profondeur simulée)
- **Pointeur** : parallaxe subtile x/y sur toutes les couches
- **Survol menu** : le plat correspondant se soulève de la table (cutout PNG)
- **Clic sur le volcan** (hero) : éruption — secousse + flash de lave
- Braises CSS animées (hero, forno, prenota)

## Accessibilité / perf

- Sections DOM réelles, skip-link, focus visible
- `prefers-reduced-motion` → parallaxe désactivée, contenu statique complet
- Aucune animation JS hors écran ; embers = CSS compositor only
- `og:image` : `public/img/og.jpg` (à recapturer une fois les couches finales en place)

## Historique

La v1 était une scène 3D Three.js/R3F complète (volcan, salle, four Hunyuan-3D) — remplacée par ce système 2D parallaxe pour la performance et la direction artistique. Voir l'historique git (`git log`) pour la version 3D.

## Déploiement

Vercel : auto-détection Vite, `vercel.json` fournit CSP + cache des assets.
