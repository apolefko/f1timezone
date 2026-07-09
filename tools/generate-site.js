#!/usr/bin/env node
/* ============================================================
   F1 Timezone — static site generator (zero dependencies)
   ============================================================
   Reads ../race-data.js, ../race-content.js and
   ../guides-content.js and writes:
     races/<slug>.html        one page per Grand Prix
     races/index.html         season index linking every race
     guides/<slug>.html       one page per guide article
     guides/index.html        guides index
     index.html               homepage race schedule (injected
                              between BEGIN/END:RACE-CARDS markers;
                              the rest of the file is hand-edited)
     sitemap.xml              every indexable page
     robots.txt               with sitemap reference
     ads.txt                  Google AdSense seller declaration
     calendar/<slug>.ics      per-race calendar (all sessions)
     calendar/f1-<year>-season.ics  full season calendar

   Usage (from the repo root, after editing race-data.js):
       node tools/generate-site.js
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { SEASON, SESSION_LABELS, SESSION_DURATIONS } = require("../race-data.js");
const { RACE_CONTENT } = require("../race-content.js");
const { GUIDES } = require("../guides-content.js");

// Every race must have extended editorial content — a thin page is
// worse than a build failure.
for (const race of SEASON.races) {
    const c = RACE_CONTENT[race.slug];
    if (!c || !Array.isArray(c.circuit) || !c.circuit.length || !c.history || !c.viewingExtra) {
        throw new Error(`race-content.js is missing (or incomplete) for "${race.slug}"`);
    }
}

const ROOT = path.join(__dirname, "..");
const SITE = SEASON.siteUrl;
const YEAR = SEASON.year;
const TODAY = new Date().toISOString().slice(0, 10);

const US_ZONES = [
    ["Eastern", "America/New_York"],
    ["Central", "America/Chicago"],
    ["Mountain", "America/Denver"],
    ["Pacific", "America/Los_Angeles"]
];

/* ---------------- helpers ---------------- */

const esc = s => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function fmt(dateStr, timeZone, options) {
    return new Intl.DateTimeFormat("en-US", { timeZone, ...options })
        .format(new Date(dateStr));
}

// "Fri, May 1, 1:30 PM EDT"
function fmtCell(dateStr, tz) {
    return fmt(dateStr, tz, {
        weekday: "short", month: "short", day: "numeric",
        hour: "numeric", minute: "2-digit", timeZoneName: "short"
    });
}

// "Sunday, May 3 at 4:00 PM EDT"
function fmtLong(dateStr, tz) {
    const day = fmt(dateStr, tz, { weekday: "long", month: "long", day: "numeric" });
    const time = fmt(dateStr, tz, { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    return `${day} at ${time}`;
}

// Track-local weekend range, e.g. "March 6–8, 2026" or "Oct 30 – Nov 1, 2026"
function weekendRange(race) {
    const times = Object.values(race.sessions);
    const first = times[0], last = times[times.length - 1];
    const tz = race.timezone;
    const m1 = fmt(first, tz, { month: "long" }), m2 = fmt(last, tz, { month: "long" });
    const d1 = fmt(first, tz, { day: "numeric" }), d2 = fmt(last, tz, { day: "numeric" });
    return m1 === m2
        ? `${m1} ${d1}–${d2}, ${YEAR}`
        : `${m1} ${d1} – ${m2} ${d2}, ${YEAR}`;
}

const isSprint = race => "sprint" in race.sessions;

/* ---------------- shared page fragments ---------------- */

// Google AdSense snippet — appears in the <head> of every generated race
// page + the season index.
const ADSENSE_SNIPPET = `<!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5921648961583075"
         crossorigin="anonymous"></script>`;

const GA_SNIPPET = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-T7CQYP0VK8"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-T7CQYP0VK8');
</script>`;

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Poiret+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/style.css">`;

const FOOTER = `        <footer role="contentinfo">
            <p>F1 Timezone is not affiliated with Formula 1. F1, Formula One, and related marks are trademarks of Formula One Licensing B.V.</p>
            <p><a href="/">Home</a> &middot; <a href="/races/">All Races</a> &middot; <a href="/guides/">Guides</a> &middot; <a href="/about.html">About</a> &middot; <a href="/contact.html">Contact</a> &middot; <a href="/privacy.html" rel="privacy-policy">Privacy</a> &middot; <a href="/terms.html">Terms</a></p>
        </footer>`;

/* ---------------- race page ---------------- */

function racePage(race, prev, next) {
    const url = `${SITE}/races/${race.slug}.html`;
    const content = RACE_CONTENT[race.slug];
    const sprint = isSprint(race);
    const raceET = fmtLong(race.sessions.race, "America/New_York");
    const raceCT = fmt(race.sessions.race, "America/Chicago",
        { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const raceMT = fmt(race.sessions.race, "America/Denver",
        { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const racePT = fmt(race.sessions.race, "America/Los_Angeles",
        { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const localStart = fmt(race.sessions.race, race.timezone,
        { hour: "numeric", minute: "2-digit" });
    const range = weekendRange(race);

    // Per-race FAQ: schedule answers generated from the data (so they can
    // never go stale), plus hand-written entries from race-content.js.
    // Rendered as visible text AND as FAQPage JSON-LD built from the same
    // array, so the markup always matches the on-page content.
    const raceKm = parseFloat(race.facts.length);
    const faq = [
        {
            q: `What time does the ${YEAR} ${race.gp} start in the US?`,
            a: `The race starts ${raceET}. That's ${raceCT} Central, ${raceMT} Mountain, and ${racePT} Pacific.`
        },
        {
            q: `Is the ${YEAR} ${race.gp} a sprint weekend?`,
            a: sprint
                ? `Yes. In addition to the Grand Prix, the weekend includes Sprint Qualifying (${fmtLong(race.sessions.sprint_qualifying, "America/New_York")}) and a points-paying Sprint race (${fmtLong(race.sessions.sprint, "America/New_York")}).`
                : `No, it uses the standard format: three practice sessions, qualifying (${fmtLong(race.sessions.qualifying, "America/New_York")}), and the Grand Prix.`
        },
        {
            q: `How many laps is the ${YEAR} ${race.gp}?`,
            a: `${race.facts.laps} laps of the ${race.facts.length} ${race.circuit}, a race distance of about ${Math.round(race.facts.laps * raceKm)} km.`
        },
        ...(content.faq || [])
    ];

    const title = `${race.gp} ${YEAR}: Race Start Time in ET, CT, MT & PT | F1 Timezone`;
    const description = `What time is the ${YEAR} ${race.gp}? The race starts ${raceET} (${racePT}). Full ${race.location} session schedule${sprint ? " including the sprint" : ""} in Eastern, Central, Mountain and Pacific time, with live countdown and calendar download.`;

    const rows = Object.entries(race.sessions).map(([key, time]) => {
        const cells = US_ZONES.map(([, tz]) => `<td>${fmtCell(time, tz)}</td>`).join("\n                        ");
        return `                    <tr${key === "race" ? ' class="row-race"' : ""}>
                        <th scope="row">${SESSION_LABELS[key]}</th>
                        ${cells}
                    </tr>`;
    }).join("\n");

    const jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "name": `${YEAR} ${race.gp}`,
        "description": description,
        "sport": "Formula One Racing",
        "startDate": Object.values(race.sessions)[0],
        "endDate": race.sessions.race,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": race.circuit,
            "address": race.location
        },
        "organizer": { "@type": "Organization", "name": "Formula One Management" },
        "subEvent": Object.entries(race.sessions).map(([key, time]) => ({
            "@type": "SportsEvent",
            "name": `${YEAR} ${race.gp} — ${SESSION_LABELS[key]}`,
            "startDate": time,
            "location": { "@type": "Place", "name": race.circuit, "address": race.location }
        }))
    }, null, 2);

    const breadcrumbLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}` },
            { "@type": "ListItem", "position": 2, "name": `F1 ${YEAR} Races`, "item": `${SITE}/races/` },
            { "@type": "ListItem", "position": 3, "name": `${race.gp} ${YEAR}`, "item": url }
        ]
    }, null, 2);

    const faqLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map(({ q, a }) => ({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a }
        }))
    }, null, 2);

    const factEntries = [
        ["Circuit", race.circuit],
        ["Length", race.facts.length],
        ["Laps", race.facts.laps],
        ["Corners", race.facts.corners],
        ["First GP", race.facts.firstGp],
        ["Local Start", `${localStart} (${race.location.split(",")[0]})`]
    ].map(([k, v]) => `                <div class="fact">
                    <div class="fact-label">${esc(k)}</div>
                    <div class="fact-value">${esc(v)}</div>
                </div>`).join("\n");

    const pager = `            <nav class="race-pager" aria-label="More races">
                ${prev ? `<a href="/races/${prev.slug}.html">&larr; ${esc(prev.gp)}</a>` : "<span></span>"}
                <a href="/races/">All ${SEASON.races.length} Races</a>
                ${next ? `<a href="/races/${next.slug}.html">${esc(next.gp)} &rarr;</a>` : "<span></span>"}
            </nav>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${esc(title)}</title>
    <meta name="title" content="${esc(title)}">
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#0a0a0a">
    <link rel="canonical" href="${url}">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="F1 Timezone">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${esc(`${race.gp} ${YEAR} — US Session Times & Countdown`)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${esc(`${race.gp} ${YEAR} — US Session Times & Countdown`)}">
    <meta name="twitter:description" content="${esc(description)}">

    ${ADSENSE_SNIPPET}

${GA_SNIPPET}

    <script type="application/ld+json">
${jsonLd}
    </script>
    <script type="application/ld+json">
${breadcrumbLd}
    </script>
    <script type="application/ld+json">
${faqLd}
    </script>

    ${FONTS}
</head>
<body>

    <div class="container">
        <header>
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">F1 Timezone</a> <span aria-hidden="true">&rsaquo;</span>
                <a href="/races/">${YEAR} Races</a> <span aria-hidden="true">&rsaquo;</span>
                <span>${esc(race.gp)}</span>
            </nav>
            <div class="deco-ornament" aria-hidden="true"></div>
            <h1>${esc(race.gp)} ${YEAR}</h1>
            <p class="tagline">Round ${race.round} of ${SEASON.races.length}&nbsp;&middot;&nbsp;${esc(race.circuit)}&nbsp;&middot;&nbsp;${esc(range)}${sprint ? "&nbsp;&middot;&nbsp;Sprint Weekend" : ""}</p>
            <div class="deco-rule" aria-hidden="true"></div>
        </header>

        <article class="next-race">
            <h2>Race Start</h2>
            <div class="race-info">${esc(raceET)}</div>
            <div class="countdown" id="countdown" aria-live="polite" aria-atomic="true">--:--:--</div>
            <div class="race-info" id="countdown-session">&nbsp;</div>
            <div class="calendar-buttons">
                <a class="product-link" href="/calendar/${race.slug}.ics" download>&#128197; Add This Race to Calendar</a>
                <a class="product-link" href="/calendar/f1-${YEAR}-season.ics" download>Add Full ${YEAR} Season</a>
            </div>
            <p class="calendar-note">Free .ics download &mdash; sessions appear in your local time in Google, Apple &amp; Outlook calendars.</p>
        </article>

        <section class="schedule">
            <h2>Session Times (US Time Zones)</h2>
            <div class="table-scroll">
                <table class="session-table">
                    <thead>
                        <tr>
                            <th scope="col">Session</th>
                            <th scope="col">Eastern</th>
                            <th scope="col">Central</th>
                            <th scope="col">Mountain</th>
                            <th scope="col">Pacific</th>
                        </tr>
                    </thead>
                    <tbody>
${rows}
                    </tbody>
                </table>
            </div>
        </section>

        <section class="schedule race-guide">
            <h2>Circuit Guide</h2>
            <p>${esc(race.intro)}</p>
${content.circuit.map(p => `            <p>${esc(p)}</p>`).join("\n")}
            <div class="facts-grid">
${factEntries}
            </div>
            <h3>Circuit History</h3>
            <p>${esc(content.history)}</p>
            <h3>Watching from the US</h3>
            <p>${esc(race.viewingNotes)}</p>
            <p>${esc(content.viewingExtra)}</p>
        </section>

        <section class="schedule race-guide">
            <h2>${esc(race.gp)} ${YEAR} FAQ</h2>
${faq.map(({ q, a }) => `            <h3>${esc(q)}</h3>
            <p>${esc(a)}</p>`).join("\n")}
            <p>New to Formula 1 or planning your viewing weekend? Read our guides to
                <a href="/guides/how-to-watch-f1-in-the-us.html">watching F1 in the US</a>,
                <a href="/guides/f1-race-weekend-format.html">how a race weekend works</a>, and
                <a href="/guides/why-f1-race-times-vary.html">why F1 start times vary</a>.</p>
${pager}
        </section>

${FOOTER}
    </div>

    <script>
    // Countdown to this race's next session (times baked in at generation)
    (function () {
        const sessions = ${JSON.stringify(
            Object.entries(race.sessions).map(([key, time]) => [SESSION_LABELS[key], time])
        )};
        const el = document.getElementById("countdown");
        const label = document.getElementById("countdown-session");

        function tick() {
            const now = Date.now();
            const upcoming = sessions.find(s => new Date(s[1]).getTime() > now);
            if (!upcoming) {
                el.textContent = "Race Complete";
                label.innerHTML = "See the <a href='/races/'>full ${YEAR} calendar</a> for the next round.";
                return;
            }
            let diff = new Date(upcoming[1]).getTime() - now;
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor(diff % 86400000 / 3600000);
            const minutes = Math.floor(diff % 3600000 / 60000);
            const seconds = Math.floor(diff % 60000 / 1000);
            el.textContent = (days > 0 ? days + "d " : "") +
                String(hours).padStart(2, "0") + ":" +
                String(minutes).padStart(2, "0") + ":" +
                String(seconds).padStart(2, "0");
            label.textContent = "Until " + upcoming[0];
            setTimeout(tick, 1000);
        }
        tick();
    })();
    </script>
</body>
</html>
`;
}

/* ---------------- races index page ---------------- */

function indexPage() {
    const url = `${SITE}/races/`;
    const title = `F1 ${YEAR} Race Calendar: All ${SEASON.races.length} Grands Prix in US Time | F1 Timezone`;
    const description = `Every ${YEAR} Formula 1 race with start times in Eastern, Central, Mountain and Pacific time. Session schedules, sprint weekends, live countdowns and free calendar downloads for all ${SEASON.races.length} Grands Prix.`;

    const sprints = SEASON.races.filter(isSprint);
    const opener = SEASON.races[0];
    const finale = SEASON.races[SEASON.races.length - 1];
    const sprintNames = sprints.map(r => `<a href="/races/${r.slug}.html">${esc(r.gp)}</a>`)
        .join(", ").replace(/, ([^,]*)$/, ", and $1");
    const intro = `            <p>The ${YEAR} Formula 1 World Championship runs ${SEASON.races.length} rounds, opening with the <a href="/races/${opener.slug}.html">${esc(opener.gp)}</a> in ${esc(opener.location.split(",")[0])} on ${fmt(opener.sessions.race, opener.timezone, { month: "long", day: "numeric" })} and closing with the <a href="/races/${finale.slug}.html">${esc(finale.gp)}</a> at ${esc(finale.circuit)} on ${fmt(finale.sessions.race, finale.timezone, { month: "long", day: "numeric" })}. It's the first season of the sport's new technical regulations — smaller, lighter cars with active aerodynamics — and the calendar brings a brand-new race in Madrid alongside the classics.</p>
            <p>${sprints.length} weekends run the sprint format with points on offer across all three days: ${sprintNames}. Two races don't run on a Sunday at all — Baku and Las Vegas both race on Saturday — so double-check the dates below. If you're new to how a Grand Prix weekend is structured, our <a href="/guides/f1-race-weekend-format.html">race weekend format guide</a> walks through every session.</p>
            <p>Every race below links to a full session schedule converted to Eastern, Central, Mountain, and Pacific time, with a live countdown and a free .ics calendar download. For the ${YEAR} US streaming landscape, see <a href="/guides/how-to-watch-f1-in-the-us.html">how to watch F1 in the US</a>.</p>`;

    const cards = SEASON.races.map(race => {
        const raceET = fmtCell(race.sessions.race, "America/New_York");
        return `            <div class="race-card index-card">
                <div class="race-header">
                    <div class="race-name"><a href="/races/${race.slug}.html">${esc(race.gp)}</a>${isSprint(race) ? ' <span class="sprint-badge">Sprint</span>' : ""}</div>
                    <div class="race-date">Round ${race.round}&nbsp;&middot;&nbsp;${esc(race.location)}</div>
                </div>
                <div class="index-meta">
                    <span>${esc(weekendRange(race))}</span>
                    <span>Race: ${esc(raceET)}</span>
                </div>
            </div>`;
    }).join("\n");

    const itemListLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `F1 ${YEAR} Race Calendar`,
        "itemListElement": SEASON.races.map((race, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": `${race.gp} ${YEAR}`,
            "url": `${SITE}/races/${race.slug}.html`
        }))
    }, null, 2);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${esc(title)}</title>
    <meta name="title" content="${esc(title)}">
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#0a0a0a">
    <link rel="canonical" href="${url}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="F1 Timezone">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="F1 ${YEAR} Race Calendar — Every Race in US Time">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:locale" content="en_US">

    ${ADSENSE_SNIPPET}

${GA_SNIPPET}

    <script type="application/ld+json">
${itemListLd}
    </script>

    ${FONTS}
</head>
<body>

    <div class="container">
        <header>
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">F1 Timezone</a> <span aria-hidden="true">&rsaquo;</span>
                <span>${YEAR} Races</span>
            </nav>
            <div class="deco-ornament" aria-hidden="true"></div>
            <h1>F1 ${YEAR} Calendar</h1>
            <p class="tagline">All ${SEASON.races.length} Grands Prix&nbsp;&middot;&nbsp;US Race Times&nbsp;&middot;&nbsp;Calendar Downloads</p>
            <div class="deco-rule" aria-hidden="true"></div>
            <div class="calendar-buttons">
                <a class="product-link" href="/calendar/f1-${YEAR}-season.ics" download>&#128197; Add Full ${YEAR} Season to Calendar</a>
            </div>
        </header>

        <section class="schedule race-guide">
            <h2>The ${YEAR} Season at a Glance</h2>
${intro}
        </section>

        <section class="schedule">
            <h2>${YEAR} Season</h2>
${cards}
        </section>

${FOOTER}
    </div>
</body>
</html>
`;
}

/* ---------------- homepage schedule injection ---------------- */

// Static race cards for index.html, matching the markup script.js builds,
// with times in the site's default zone (Eastern). JS progressively
// enhances this into the visitor's chosen time zone; crawlers and no-JS
// visitors get the full schedule either way.
function homeRaceCards() {
    return SEASON.races.map(race => {
        const sessions = Object.entries(race.sessions).map(([key, time]) => `
                        <div class="session">
                            <div class="session-name">${SESSION_LABELS[key].toUpperCase()}</div>
                            <div class="session-time">${fmtCell(time, "America/New_York")}</div>
                        </div>`).join("");
        return `                <div class="race-card">
                    <div class="race-header">
                        <div class="race-name"><a href="/races/${race.slug}.html" title="${esc(`${race.gp}: full schedule, countdown & calendar download`)}">${esc(race.name)}</a></div>
                        <div class="race-date">${esc(race.location)}</div>
                    </div>
                    <div class="session-times">${sessions}
                    </div>
                </div>`;
    }).join("\n");
}

const BEGIN_MARK = "<!-- BEGIN:RACE-CARDS (generated by tools/generate-site.js — do not edit by hand) -->";
const END_MARK = "<!-- END:RACE-CARDS -->";

function injectBetweenMarkers(filePath, begin, end, html) {
    const src = fs.readFileSync(filePath, "utf8");
    const i = src.indexOf(begin), j = src.indexOf(end);
    if (i === -1 || j === -1 || j < i) {
        throw new Error(`${path.basename(filePath)}: missing ${begin} / ${end} markers — restore them so the generator can inject the schedule.`);
    }
    const out = src.slice(0, i + begin.length) + "\n" + html + "\n            " + src.slice(j);
    if (out !== src) fs.writeFileSync(filePath, out);
}

/* ---------------- guide pages ---------------- */

function guidePage(guide) {
    const url = `${SITE}/guides/${guide.slug}.html`;

    const articleLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guide.title,
        "description": guide.description,
        "dateModified": guide.updated,
        "author": { "@type": "Organization", "name": "F1 Timezone", "url": SITE },
        "publisher": { "@type": "Organization", "name": "F1 Timezone", "url": SITE },
        "mainEntityOfPage": url
    }, null, 2);

    const breadcrumbLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}` },
            { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${SITE}/guides/` },
            { "@type": "ListItem", "position": 3, "name": guide.title, "item": url }
        ]
    }, null, 2);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${esc(guide.title)} | F1 Timezone</title>
    <meta name="title" content="${esc(guide.title)} | F1 Timezone">
    <meta name="description" content="${esc(guide.description)}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#0a0a0a">
    <link rel="canonical" href="${url}">

    <meta property="og:type" content="article">
    <meta property="og:site_name" content="F1 Timezone">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${esc(guide.title)}">
    <meta property="og:description" content="${esc(guide.description)}">
    <meta property="og:locale" content="en_US">

    ${ADSENSE_SNIPPET}

${GA_SNIPPET}

    <script type="application/ld+json">
${articleLd}
    </script>
    <script type="application/ld+json">
${breadcrumbLd}
    </script>

    ${FONTS}
</head>
<body>

    <div class="container">
        <header>
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">F1 Timezone</a> <span aria-hidden="true">&rsaquo;</span>
                <a href="/guides/">Guides</a> <span aria-hidden="true">&rsaquo;</span>
                <span>${esc(guide.title)}</span>
            </nav>
            <div class="deco-ornament" aria-hidden="true"></div>
            <h1>${esc(guide.title)}</h1>
            <p class="tagline">Updated ${fmt(guide.updated + "T12:00:00Z", "UTC", { month: "long", day: "numeric", year: "numeric" })}</p>
            <div class="deco-rule" aria-hidden="true"></div>
        </header>

        <div class="privacy-content">
${guide.bodyHtml.trim()}
        </div>

${FOOTER}
    </div>
</body>
</html>
`;
}

function guidesIndexPage() {
    const url = `${SITE}/guides/`;
    const title = `F1 Guides: Watching, Schedules & How the Sport Works | F1 Timezone`;
    const description = `Practical guides for US Formula 1 fans: where to watch every ${YEAR} session, how race weekends and sprints work, and why F1 start times vary so much across the season.`;

    const cards = GUIDES.map(g => `            <div class="race-card index-card">
                <div class="race-header">
                    <div class="race-name"><a href="/guides/${g.slug}.html">${esc(g.title)}</a></div>
                </div>
                <div class="index-meta">
                    <span>${esc(g.description)}</span>
                </div>
            </div>`).join("\n");

    const itemListLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "F1 Timezone Guides",
        "itemListElement": GUIDES.map((g, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": g.title,
            "url": `${SITE}/guides/${g.slug}.html`
        }))
    }, null, 2);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${esc(title)}</title>
    <meta name="title" content="${esc(title)}">
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#0a0a0a">
    <link rel="canonical" href="${url}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="F1 Timezone">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="F1 Guides for US Fans">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:locale" content="en_US">

    ${ADSENSE_SNIPPET}

${GA_SNIPPET}

    <script type="application/ld+json">
${itemListLd}
    </script>

    ${FONTS}
</head>
<body>

    <div class="container">
        <header>
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">F1 Timezone</a> <span aria-hidden="true">&rsaquo;</span>
                <span>Guides</span>
            </nav>
            <div class="deco-ornament" aria-hidden="true"></div>
            <h1>F1 Guides</h1>
            <p class="tagline">Watching &middot; Schedules &middot; How the Sport Works</p>
            <div class="deco-rule" aria-hidden="true"></div>
        </header>

        <section class="schedule race-guide">
            <h2>Guides for US F1 Fans</h2>
            <p>Everything on this site exists to answer one question — <em>when is the race, in my time zone?</em> — but the schedule is only half the battle. These guides cover the rest: where to actually watch each session in the US, how a Grand Prix weekend is structured, what changed for the ${YEAR} season, and why the start times bounce between 1 AM and prime time. Pair them with the <a href="/races/">full ${YEAR} race calendar</a> and the <a href="/calendar/f1-${YEAR}-season.ics">season calendar download</a>.</p>
        </section>

        <section class="schedule">
            <h2>All Guides</h2>
${cards}
        </section>

${FOOTER}
    </div>
</body>
</html>
`;
}

/* ---------------- sitemap + robots ---------------- */

function sitemap() {
    const urls = [
        { loc: `${SITE}/`, priority: "1.0", changefreq: "daily" },
        { loc: `${SITE}/races/`, priority: "0.9", changefreq: "weekly" },
        ...SEASON.races.map(r => ({
            loc: `${SITE}/races/${r.slug}.html`, priority: "0.8", changefreq: "weekly"
        })),
        { loc: `${SITE}/guides/`, priority: "0.7", changefreq: "monthly" },
        ...GUIDES.map(g => ({
            loc: `${SITE}/guides/${g.slug}.html`, priority: "0.6", changefreq: "monthly"
        })),
        { loc: `${SITE}/about.html`, priority: "0.3", changefreq: "yearly" },
        { loc: `${SITE}/contact.html`, priority: "0.3", changefreq: "yearly" },
        { loc: `${SITE}/privacy.html`, priority: "0.2", changefreq: "yearly" },
        { loc: `${SITE}/terms.html`, priority: "0.2", changefreq: "yearly" }
    ];
    const entries = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const ROBOTS = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

// Google AdSense seller declaration — must be served at ${SITE}/ads.txt
const ADS_TXT = `google.com, pub-5921648961583075, DIRECT, f08c47fec0942fa0
`;

/* ---------------- .ics calendars ---------------- */

// RFC 5545: UTC timestamps, CRLF line endings, 75-octet line folding.
const icsStamp = d => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const escIcs = s => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

function foldLine(line) {
    const out = [];
    let rest = line;
    while (Buffer.byteLength(rest, "utf8") > 73) {
        let i = 73;
        while (Buffer.byteLength(rest.slice(0, i), "utf8") > 73) i--;
        out.push(rest.slice(0, i));
        rest = " " + rest.slice(i);
    }
    out.push(rest);
    return out.join("\r\n");
}

function icsEvent(race, sessionKey, time, dtstamp) {
    const start = new Date(time);
    const end = new Date(start.getTime() + (SESSION_DURATIONS[sessionKey] || 60) * 60000);
    const summary = `F1: ${race.gp} — ${SESSION_LABELS[sessionKey]}`;
    const description = `${race.gp} ${YEAR} ${SESSION_LABELS[sessionKey]} at ${race.circuit}. Full schedule & US times: ${SITE}/races/${race.slug}.html`;
    return [
        "BEGIN:VEVENT",
        `UID:${race.slug}-${sessionKey}@f1timezone.com`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART:${icsStamp(start)}`,
        `DTEND:${icsStamp(end)}`,
        `SUMMARY:${escIcs(summary)}`,
        `LOCATION:${escIcs(`${race.circuit}, ${race.location}`)}`,
        `DESCRIPTION:${escIcs(description)}`,
        `URL:${SITE}/races/${race.slug}.html`,
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        `DESCRIPTION:${escIcs(summary + " starts in 30 minutes")}`,
        "TRIGGER:-PT30M",
        "END:VALARM",
        "END:VEVENT"
    ];
}

function icsCalendar(name, races) {
    const dtstamp = icsStamp(new Date());
    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//F1 Timezone//f1timezone.com//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        `X-WR-CALNAME:${escIcs(name)}`,
        "X-WR-CALDESC:Session times from f1timezone.com — shown in your local time zone"
    ];
    for (const race of races) {
        for (const [key, time] of Object.entries(race.sessions)) {
            lines.push(...icsEvent(race, key, time, dtstamp));
        }
    }
    lines.push("END:VCALENDAR");
    return lines.map(foldLine).join("\r\n") + "\r\n";
}

/* ---------------- write everything ---------------- */

fs.mkdirSync(path.join(ROOT, "races"), { recursive: true });
fs.mkdirSync(path.join(ROOT, "guides"), { recursive: true });
fs.mkdirSync(path.join(ROOT, "calendar"), { recursive: true });

SEASON.races.forEach((race, i) => {
    const prev = SEASON.races[i - 1] || null;
    const next = SEASON.races[i + 1] || null;
    fs.writeFileSync(path.join(ROOT, "races", `${race.slug}.html`), racePage(race, prev, next));
    fs.writeFileSync(path.join(ROOT, "calendar", `${race.slug}.ics`), icsCalendar(`F1 ${YEAR}: ${race.gp}`, [race]));
});

GUIDES.forEach(guide => {
    fs.writeFileSync(path.join(ROOT, "guides", `${guide.slug}.html`), guidePage(guide));
});

injectBetweenMarkers(path.join(ROOT, "index.html"), BEGIN_MARK, END_MARK, homeRaceCards());

fs.writeFileSync(path.join(ROOT, "races", "index.html"), indexPage());
fs.writeFileSync(path.join(ROOT, "guides", "index.html"), guidesIndexPage());
fs.writeFileSync(path.join(ROOT, "calendar", `f1-${YEAR}-season.ics`), icsCalendar(`F1 ${YEAR} Season`, SEASON.races));
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap());
fs.writeFileSync(path.join(ROOT, "robots.txt"), ROBOTS);
fs.writeFileSync(path.join(ROOT, "ads.txt"), ADS_TXT);

console.log(`Generated ${SEASON.races.length} race pages, ${GUIDES.length} guide pages, races/index.html, guides/index.html, the homepage schedule, sitemap.xml, robots.txt, ads.txt and ${SEASON.races.length + 1} calendar files.`);
