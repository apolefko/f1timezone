# f1timezone

F1 race times in US time zones — [f1timezone.com](https://f1timezone.com).

Fully static (no backend, no framework, no build pipeline, no API keys).
One data file drives the whole site, and three GitHub Actions keep it
current with the real F1 season.

## How it's wired

| File | Role |
|---|---|
| `race-data.js` | **Single source of truth**: all races, session times, circuit facts + coordinates, per-race intro/viewing text |
| `race-content.js` | Extended per-race editorial (circuit guide paragraphs, history, FAQ) — Node-only, never shipped to the browser |
| `guides-content.js` | Guide articles (how to watch, season guide, weekend format, start times) — Node-only |
| `drivers-data.js` | Current teams & drivers (incl. stand-ins) — Node-only, becomes `drivers.html` |
| `results-data.json` | Race podiums + championship standings, **written automatically** by the results workflow (don't edit by hand) |
| `tools/generate-site.js` | Zero-dependency Node script that generates everything below |
| `tools/validate.js` | Data & site integrity checks (UTC offsets vs IANA zones, ordering, content, internal links) |
| `tools/audit-live-data.js` | Compares the site with the F1 API: schedule drift + driver lineup |
| `tools/fetch-results.js` | Pulls podiums and standings from the F1 API into `results-data.json` |
| `races/*.html` | One static page per Grand Prix (generated; shows the podium once the race is run) |
| `races/index.html` | Season calendar index (generated; shows winners for completed rounds) |
| `drivers.html`, `standings.html` | Current lineup and championship tables (generated) |
| `guides/*.html`, `guides/index.html` | Guide articles (generated) |
| `calendar/*.ics` | Per-race + full-season calendar files (generated; the season file is meant to be *subscribed* to via `webcal://`, so it updates in people's calendars when the data changes) |
| `sitemap.xml`, `robots.txt`, `ads.txt` | SEO + AdSense (generated) |
| `index.html`, `script.js`, `style.css` | Homepage (hand-edited; the schedule block between the `RACE-CARDS` markers is injected by the generator, then progressively enhanced by `script.js`, which also auto-detects the visitor's US time zone) |
| `about.html`, `contact.html`, `terms.html`, `privacy.html` | Static info pages (hand-edited) |

Race pages also show a session-by-session weather forecast (Open-Meteo,
fetched in the browser, no key) once the weekend is within 15 days.

## Automation (`.github/workflows/`)

All three use the free [Jolpica F1 API](https://api.jolpi.ca/) and the
built-in `GITHUB_TOKEN` — nothing to configure.

| Workflow | When | What it does |
|---|---|---|
| **CI** (`ci.yml`) | every PR and push to `main` | Regenerates the site, runs `tools/validate.js`, and fails if committed generated files are stale |
| **Live data audit** (`audit.yml`) | daily 06:17 UTC + manual | Diffs session times, race list and driver lineup against the API. Time changes → PR on `auto/schedule-sync` (merge it and you're done). Anything needing a human (new/cancelled race, sprint change, driver substitution) → one tracking issue that updates itself and auto-closes when resolved |
| **Update results & standings** (`results.yml`) | daily + every 3 h on Sat/Sun, + manual | Fetches podiums/standings; if anything changed, regenerates and commits straight to `main` |

Both scheduled workflows can be run on demand from the Actions tab
("Run workflow").

## Day-to-day maintenance

Mostly none. When the audit opens a PR, review the diff and merge. When it
opens an issue, edit the file it names (`race-data.js`, `race-content.js`
or `drivers-data.js`), run the two commands below, and push:

```
node tools/generate-site.js
node tools/validate.js
```

## Annual maintenance (once per season)

1. Edit `race-data.js`: new dates/times, update slugs to the new year,
   adjust sprint weekends, refresh the editorial text where needed.
2. Update `race-content.js` to match the new slugs (the generator refuses
   to build if a race is missing its extended content), refresh
   `drivers-data.js`, and skim `guides-content.js` + the homepage FAQ for
   stale year-specific facts.
3. Delete `results-data.json` (the results workflow recreates it after the
   first race).
4. Run `node tools/generate-site.js && node tools/validate.js`.
5. Commit and push. Countdowns, time zone conversion, past-race hiding,
   calendar feeds and standings all follow from the data.

## Ads (Google AdSense)

Paste your AdSense snippet at the `<!-- Google AdSense ... -->` marker in:

- `index.html` (homepage `<head>`)
- `privacy.html` (`<head>`)
- `tools/generate-site.js` — fill the `ADSENSE_SNIPPET` constant, then run
  `node tools/generate-site.js` so every generated page picks it up.

The privacy policy already discloses Google AdSense cookie usage, as required
for approval.
