# f1timezone

F1 race times in US time zones — [f1timezone.com](https://f1timezone.com).

Fully static (no backend, no framework, no build pipeline). One data file
drives the whole site.

## How it's wired

| File | Role |
|---|---|
| `race-data.js` | **Single source of truth**: all races, session times, circuit facts, per-race intro/viewing text |
| `race-content.js` | Extended per-race editorial (circuit guide paragraphs, history, FAQ) — Node-only, never shipped to the browser |
| `guides-content.js` | Guide articles (how to watch, season guide, weekend format, start times) — Node-only |
| `drivers-data.js` | Current teams & drivers (incl. stand-ins) — Node-only, becomes `drivers.html` |
| `tools/generate-site.js` | Zero-dependency Node script that generates everything below |
| `races/*.html` | One static page per Grand Prix (generated) |
| `drivers.html` | Current driver lineup page (generated) |
| `races/index.html` | Season calendar index (generated) |
| `guides/*.html`, `guides/index.html` | Guide articles (generated) |
| `calendar/*.ics` | Per-race + full-season calendar downloads (generated) |
| `sitemap.xml`, `robots.txt`, `ads.txt` | SEO + AdSense (generated) |
| `index.html`, `script.js`, `style.css` | Homepage (hand-edited; the schedule block between the `RACE-CARDS` markers is injected by the generator, then progressively enhanced by `script.js`) |
| `about.html`, `contact.html`, `terms.html`, `privacy.html` | Static info pages (hand-edited) |

## Annual maintenance (once per season)

1. Edit `race-data.js`: new dates/times, update slugs to the new year,
   adjust sprint weekends, refresh the editorial text where needed.
2. Update `race-content.js` to match the new slugs (the generator refuses
   to build if a race is missing its extended content) and skim
   `guides-content.js` + the homepage FAQ for stale year-specific facts
   (broadcast rights, sprint rounds, regulation notes).
3. Run `node tools/generate-site.js`.
4. Commit and push. That's it — countdowns, time zone conversion, past-race
   hiding and calendar files all follow from the data.

## Ads (Google AdSense)

Paste your AdSense snippet at the `<!-- Google AdSense ... -->` marker in:

- `index.html` (homepage `<head>`)
- `privacy.html` (`<head>`)
- `tools/generate-site.js` — fill the `ADSENSE_SNIPPET` constant, then run
  `node tools/generate-site.js` so every race page + the season index pick
  it up.

The privacy policy already discloses Google AdSense cookie usage, as required
for approval.
