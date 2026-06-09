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
| `monetag.js` | **The only file to edit for monetization** — ad zone IDs and affiliate URLs |

## Annual maintenance (once per season)

1. Edit `race-data.js`: new dates/times, update slugs to the new year,
   adjust sprint weekends, refresh the editorial text where needed.
2. Run `node tools/generate-site.js`.
3. Commit and push. That's it — countdowns, time zone conversion, past-race
   hiding and calendar files all follow from the data.

## Turning on ads / affiliate links

Open `monetag.js` and follow the comments at the top. Paste zone IDs from
the Monetag dashboard (non-intrusive formats only — never the
Multitag/popunder tag) and affiliate URLs. Slots stay hidden and take no
space until configured; once shown, their height is reserved so the layout
never shifts when an ad loads.
