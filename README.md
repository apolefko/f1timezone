# f1timezone

F1 race times in US time zones — [f1timezone.com](https://f1timezone.com).

Fully static (no backend, no framework, no build pipeline). One data file
drives the whole site.

## How it's wired

| File | Role |
|---|---|
| `race-data.js` | **Single source of truth**: all races, session times, circuit facts, per-race editorial text |
| `tools/generate-site.js` | Zero-dependency Node script that generates everything below |
| `races/*.html` | One static page per Grand Prix (generated) |
| `races/index.html` | Season calendar index (generated) |
| `calendar/*.ics` | Per-race + full-season calendar downloads (generated) |
| `sitemap.xml`, `robots.txt` | SEO (generated) |
| `index.html`, `script.js`, `style.css` | Homepage (reads `race-data.js` in the browser) |

## Annual maintenance (once per season)

1. Edit `race-data.js`: new dates/times, update slugs to the new year,
   adjust sprint weekends, refresh the editorial text where needed.
2. Run `node tools/generate-site.js`.
3. Commit and push. That's it — countdowns, time zone conversion, past-race
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
