# Parallax Layers — Asset Spec (AI generation)

Drop each file into `public/layers/` with the EXACT filename. Refresh — placeholder disparaît, l'asset prend sa place. Aucun changement de code requis.

## Style anchor (à coller à la fin de CHAQUE prompt)

```
Style: contemporary Italian poster illustration, bold flat shapes with subtle grain texture, dramatic firelight. Palette: lava orange #FF4D00, molten amber #FFB347, basalt black #100D0B, warm cream #F4EBDC, deep shadow. High contrast, moody, cinematic. No text, no watermark, no people.
```

**Negative prompt:** `text, typography, watermark, logo, people, hands, daylight, blue sky, pastel, photorealistic clutter`

**PNG transparent = obligatoire** pour les fichiers marqués (cutout). Générer avec fond uni (blanc ou vert), puis détourer (remove.bg gratuit, ou l'option background removal de l'outil).

## Fichiers

| Fichier | Type | Taille | Prompt sujet |
|---------|------|--------|--------------|
| `hero-sky.jpg` | full-bleed | 1920×1080, <300 kB | Night sky over Sicily, deep black fading to dark amber glow near the horizon, scattered stars, thin drifting smoke wisps, empty lower half |
| `hero-volcano.png` | cutout | 1600×1200 | Mount Etna erupting at night, stylized volcano silhouette with glowing orange lava streams running down black slopes, embers rising from the crater, sharp silhouette edges — isolated, transparent background |
| `hero-town.png` | cutout, ancré bas | 1920×800 | Sicilian hillside town rooftops silhouette at night, terracotta roofs and a church bell tower in dark shadow, a few warm lit windows, horizontal skyline strip — isolated, transparent background |
| `hero-arch.png` | cadre avant-plan | 1920×1080 | Stone arch window frame seen from inside a dark trattoria, rough volcanic stone blocks, the CENTER of the image fully transparent (only the frame visible on the edges), hanging vine on one corner |
| `storia-kitchen.jpg` | full-bleed sombre | 1920×1080, <300 kB | Dark rustic Sicilian cellar kitchen interior, stone walls, copper pots hanging, flour dust in a beam of light, very dark and moody, empty center |
| `storia-nonna.jpg` | photo cadrée | 1200×1500 (4:5) | Black and white archival photograph from 1962, elderly Sicilian grandmother kneading pizza dough in a stone cellar, flour dust, heavy film grain, scratched vintage print — (pas de style anchor couleur ici, garder N&B; personnes autorisées) |
| `menu-table.jpg` | full-bleed sombre | 1920×1080, <300 kB | Dark wooden trattoria table surface seen from above at an angle, candlelight from the left, scattered flour and herbs, empty space on the right half |
| `dish-pizza.png` | cutout top-down | 1000×1000 | Neapolitan pizza with 'nduja, mozzarella, black olives and basil, leopard-charred crust, seen directly from above — isolated, transparent background |
| `dish-spaghetti.png` | cutout top-down | 1000×1000 | Black squid-ink spaghetti in a cream ceramic bowl with one red prawn on top, seen from above — isolated, transparent background |
| `dish-arancini.png` | cutout top-down | 1000×1000 | Three golden arancini on a cream plate, one cut open with molten ragù, seen from above — isolated, transparent background |
| `dish-vino.png` | cutout | 1000×1000 | Glass of red wine and dark bottle with cream label, warm firelight, slight top-down angle — isolated, transparent background |
| `forno-wall.jpg` | full-bleed sombre | 1920×1080, <300 kB | Dark brick wall of a pizzeria kitchen at night, faint warm glow from the right side, very dark, empty left half |
| `forno-oven.png` | cutout | 1400×1400 | Rustic wood-fired pizza oven, brick dome with arched mouth glowing bright orange with fire inside, small chimney, three-quarter front view — isolated, transparent background |
| `vini-cellar.jpg` | full-bleed sombre | 1920×1080, <300 kB | Dark wine cellar carved in volcanic rock, wooden shelves in shadow, single candle glow, empty right half |
| `vini-bottles.png` | cutout | 1200×1400 | Row of Etna wine bottles on a rough wooden shelf, dark green glass catching amber light, cream paper labels (blank), slight low angle — isolated, transparent background |
| `prenota-dusk.jpg` | full-bleed | 1920×1080, <300 kB | Wide silhouette of Mount Etna at dusk seen from a terrace, deep red-orange horizon fading to black sky, tiny glowing crater, minimal, lots of dark empty space in the center |

## Règles de génération

1. **Cohérence** : même outil, même session, style anchor identique partout.
2. **Full-bleed JPG** : zones sombres/vides là où le texte passe (indiqué par prompt) — le CSS assombrit encore (`brightness(.45)`).
3. **Cutouts PNG** : silhouette nette, pas d'ombre portée intégrée (le CSS gère les ombres au hover).
4. **Poids** : JPG < 300 kB (qualité ~80), PNG cutouts < 400 kB. Compresser via squoosh.app si besoin.
5. Ordre de priorité si quota limité : `hero-volcano.png` → `hero-arch.png` → `forno-oven.png` → les 4 `dish-*.png` → le reste.

## Outils gratuits

- **Google AI Studio** (nano banana) — meilleure qualité, quota quotidien gratuit
- **Bing / Microsoft Designer** — boosts quotidiens
- **Ideogram** — bon pour le style poster
- Détourage : remove.bg, ou Photopea (gratuit, web)
