# Trattoria Vulcano — Higgsfield Asset Brief

## Art direction anchor (append to EVERY prompt)

```
Contemporary Sicilian volcanic mood. Palette: lava orange #FF4D00, molten amber #FFB347, basalt black #100D0B, warm cream #F4EBDC. Dramatic single-source firelight from the side, deep black shadows, high contrast, subtle film grain, editorial poster energy, slightly asymmetric composition. No text, no watermark, no logo.
```

**Negative prompt (all images):**
```
text, typography, watermark, logo, signature, people, hands, blurry, washed out, pastel colors, daylight, blue tones, cluttered background
```

**Consistency:** generate the dish set (§3) in one session, same style preset + same seed family. Higgsfield Soul (photoreal) for photos/textures; video model for §6.

---

## 1. OG / social image — `public/img/og.jpg`

- **Size:** 1200×630 (generate 1536×864 landscape 16:9 or 1.91:1, crop)
- **Format:** JPG < 200 kB
- **Constraint:** top-left third mostly dark/empty — type gets overlaid later

```
Cinematic wide shot inside a Sicilian trattoria at night, long table with red and white gingham tablecloth, wood-fired pizza and a glass of red wine in the foreground right, huge arched window in the background revealing Mount Etna erupting with glowing lava streaks and drifting embers, checkerboard floor, hanging red pendant lamp, candlelight. Composition weighted to the right, upper left third almost pure black basalt shadow.
```

## 2. Volcano window backdrop — `public/img/volcano-night.jpg`

Replaces/backs the procedural volcano behind the arch (large plane or partial skybox).

- **Size:** 2048×2048 (or 2560×1440 if panorama)
- **Constraint:** volcano centered, horizon in lower third, NO foreground objects, sky fades to pure black at edges (blends with scene fog #0a0705)

```
Mount Etna at night seen from a distance, stylized cinematic matte painting, glowing orange lava streaks running down the black volcanic cone, embers and sparks rising from the crater, thin smoke plume, starry night sky, moonless, darkness at the image edges fading to pure black, low horizon line, no buildings, no foreground.
```

## 3. Dish set ×6 — `public/img/dish-*.jpg` (flat mode + menu)

- **Size:** 1600×1600 (1:1), JPG, WebP after compression
- **Shared setup, same seed family:** 45° angle, rough black basalt stone slab, single warm firelight from the left, deep shadow right, one dish only, sparse crumbs/ingredients scattered asymmetrically

| File | Subject prompt (prepend shared setup) |
|------|--------------------------------------|
| `dish-pizza.jpg` | Neapolitan pizza with 'nduja sausage, fior di latte mozzarella, black olives and fresh basil, leopard-charred crust, wood-fired |
| `dish-spaghetti.jpg` | Black squid-ink spaghetti twirled in a nest in a cream ceramic bowl, one bright red gambero rosso prawn on top, glossy strands |
| `dish-arancini.jpg` | Three golden fried arancini rice balls on a cream plate, one cut open with molten spicy ragù flowing out like lava, saffron rice visible |
| `dish-vino.jpg` | Glass of Etna Rosso red wine and dark green bottle with cream paper label, wine glowing ruby in firelight |
| `dish-caponata.jpg` | Sicilian caponata, glossy confit eggplant with capers and pine nuts on a cream plate, rustic |
| `dish-cannolo.jpg` | Sicilian cannolo filled with smoked ricotta, crushed bright green Bronte pistachios on the ends, dusting of cocoa on black stone |

Shared setup string:
```
Overhead 45-degree food photography on a rough black basalt stone slab, single warm firelight from the left, deep shadows on the right, [SUBJECT], scattered ingredients asymmetrically placed, macro detail, steam catching the light.
```

## 4. Storia archival photo — `public/img/storia-1962.jpg`

- **Size:** 1200×1500 (4:5 portrait), JPG
- Goes in the empty left column of the Storia section

```
Black and white archival photograph from 1962, elderly Sicilian grandmother kneading pizza dough in a stone cellar in Catania, flour dust in the air catching window light, wood-fired oven glowing in the background, heavy film grain, scratched vintage print, documentary style.
```
(Drop the color palette line from the anchor for this one; keep grain/asymmetry. Negative: keep `text, watermark`, allow people.)

## 5. Tileable textures — `public/tex/*.jpg`

Replace the flat canvas textures in `src/textures.js` (load via `useTexture`, set `RepeatWrapping`).

- **Size:** 2048×2048, JPG
- **Hard requirements:** perfectly top-down orthographic, flat even lighting, NO shadows, NO perspective, seamless/tileable. AI tiling is never perfect — run Photoshop Offset filter (1024/1024) and heal the seams, or check "seamless/tile" option if Higgsfield exposes one.

| File | Prompt |
|------|--------|
| `tex-floor.jpg` | Top-down orthographic texture of aged checkerboard ceramic floor tiles, alternating cream white and near-black, worn edges, subtle scratches, flat even lighting, seamless tileable pattern |
| `tex-plaster.jpg` | Top-down orthographic texture of aged dark warm plaster wall, smoke-stained patina, hairline cracks, flat even lighting, seamless tileable |
| `tex-wood.jpg` | Top-down orthographic texture of dark olive wood planks, tight grain, oiled finish, flat even lighting, seamless tileable |
| `tex-gingham.jpg` | Top-down orthographic texture of red and cream gingham checkered tablecloth fabric, visible woven threads, flat even lighting, seamless tileable |

## 6. Video loops (Higgsfield video) — `public/video/*.mp4`

Used as `VideoTexture` on the oven mouth + volcano crater. H.264 MP4, muted, no audio track.

- **Specs:** 1:1, 720×720 max, 3–5 s, **must loop seamlessly** (generate with "loop" setting or crossfade the ends), pure black background (blended additively in scene — black = transparent)

| File | Prompt |
|------|--------|
| `fire-loop.mp4` | Close-up wood fire burning inside a dark pizza oven, orange and amber flames licking upward, embers popping, pure black background, seamless loop, camera static |
| `smoke-loop.mp4` | Thin column of dark volcanic smoke rising slowly and dispersing, backlit by faint orange glow from below, pure black background, seamless loop, camera static |

## 7. Optional brand extras

- **Poster** 2000×3000 (2:3): hero art for the case-study/portfolio card — same prompt as §1 but vertical, volcano dominant, table bottom third.
- **Menu paper texture** 1600×2000: cream paper, slight scorch marks on one corner, flat scan look — background for a printable menu PDF.

---

## Integration map

| Asset | Wire into |
|-------|-----------|
| og.jpg | `index.html` → `<meta property="og:image" content="/img/og.jpg">` |
| volcano-night.jpg | New backdrop plane behind arch in `src/scene/Volcano.jsx` (keep 3D cone in front for parallax, or replace) |
| dish-*.jpg | Flat mode menu cards in `src/ui/Sections.jsx`; optional hover preview |
| storia-1962.jpg | Left column of Storia section (`src/ui/Sections.jsx`) |
| tex-*.jpg | Swap canvas textures in `src/textures.js` for `useTexture` loads |
| fire-loop.mp4 | `VideoTexture` on oven mouth circle (`src/scene/Oven.jsx`), `AdditiveBlending` |
| smoke-loop.mp4 | Billboard plane above crater (`src/scene/Volcano.jsx`), replaces sphere puffs |

**Budget targets:** each JPG < 300 kB (WebP < 150 kB), each MP4 < 1 MB. Compress before commit — total added weight should stay under ~4 MB.
