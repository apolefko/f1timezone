#!/usr/bin/env node
/* ============================================================
   F1 Timezone — static site generator (zero dependencies)
   ============================================================
   Reads ../race-data.js and writes:
     races/<slug>.html        one page per Grand Prix
     races/index.html         season index linking every race
     sitemap.xml              homepage + privacy + all race pages
     robots.txt               with sitemap reference
     calendar/<slug>.ics      per-race calendar (all sessions)
     calendar/f1-<year>-season.ics  full season calendar

   Usage (from the repo root, after editing race-data.js):
       node tools/generate-site.js
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { SEASON, SESSION_LABELS, SESSION_DURATIONS } = require("../race-data.js");

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
            <p><a href="/">Home</a> &middot; <a href="/races/">All Races</a> &middot; <a href="/privacy.html" rel="privacy-policy">Privacy Policy</a></p>
        </footer>`;

function adSlot(name) {
    return `        <aside class="ad-container ad-banner" data-ad-slot="${name}" hidden aria-label="Advertisement">
            <span class="ad-label">Advertisement</span>
            <div class="ad-frame"></div>
        </aside>`;
}

const AFFILIATE_SECTION = `        <!-- Affiliate slots: configure URLs in /monetag.js; hidden until set -->
        <section class="products" data-affiliate-section hidden>
            <h2>Race Day Essentials</h2>
            <div class="product-grid">
                <div class="product-card" data-affiliate-slot="watch" hidden>
                    <h3 class="affiliate-heading"></h3>
                    <p class="affiliate-body"></p>
                    <a class="product-link" href="#"></a>
                </div>
                <div class="product-card" data-affiliate-slot="gear" hidden>
                    <h3 class="affiliate-heading"></h3>
                    <p class="affiliate-body"></p>
                    <a class="product-link" href="#"></a>
                </div>
            </div>
            <p class="affiliate-disclosure">Some links above are affiliate links — purchases support this site at no extra cost to you.</p>
        </section>`;

/* ---------------- race page ---------------- */

function racePage(race, prev, next) {
    const url = `${SITE}/races/${race.slug}.html`;
    const sprint = isSprint(race);
    const raceET = fmtLong(race.sessions.race, "America/New_York");
    const racePT = fmt(race.sessions.race, "America/Los_Angeles",
        { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const localStart = fmt(race.sessions.race, race.timezone,
        { hour: "numeric", minute: "2-digit" });
    const range = weekendRange(race);

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

${GA_SNIPPET}

    <script type="application/ld+json">
${jsonLd}
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

${adSlot("race-mid")}

        <section class="schedule race-guide">
            <h2>Circuit Guide</h2>
            <p>${esc(race.intro)}</p>
            <div class="facts-grid">
${factEntries}
            </div>
            <h3>Watching from the US</h3>
            <p>${esc(race.viewingNotes)}</p>
${pager}
        </section>

${AFFILIATE_SECTION}

${adSlot("race-bottom")}

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
    <script src="/monetag.js"></script>
</body>
</html>
`;
}

/* ---------------- races index page ---------------- */

function indexPage() {
    const url = `${SITE}/races/`;
    const title = `F1 ${YEAR} Race Calendar: All ${SEASON.races.length} Grands Prix in US Time | F1 Timezone`;
    const description = `Every ${YEAR} Formula 1 race with start times in Eastern, Central, Mountain and Pacific time. Session schedules, sprint weekends, live countdowns and free calendar downloads for all ${SEASON.races.length} Grands Prix.`;

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

        <section class="schedule">
            <h2>${YEAR} Season</h2>
${cards}
        </section>

${adSlot("race-bottom")}

${FOOTER}
    </div>

    <script src="/monetag.js"></script>
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
        { loc: `${SITE}/privacy.html`, priority: "0.2", changefreq: "yearly" }
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
fs.mkdirSync(path.join(ROOT, "calendar"), { recursive: true });

SEASON.races.forEach((race, i) => {
    const prev = SEASON.races[i - 1] || null;
    const next = SEASON.races[i + 1] || null;
    fs.writeFileSync(path.join(ROOT, "races", `${race.slug}.html`), racePage(race, prev, next));
    fs.writeFileSync(path.join(ROOT, "calendar", `${race.slug}.ics`), icsCalendar(`F1 ${YEAR}: ${race.gp}`, [race]));
});

fs.writeFileSync(path.join(ROOT, "races", "index.html"), indexPage());
fs.writeFileSync(path.join(ROOT, "calendar", `f1-${YEAR}-season.ics`), icsCalendar(`F1 ${YEAR} Season`, SEASON.races));
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap());
fs.writeFileSync(path.join(ROOT, "robots.txt"), ROBOTS);

console.log(`Generated ${SEASON.races.length} race pages, races/index.html, sitemap.xml, robots.txt and ${SEASON.races.length + 1} calendar files.`);
