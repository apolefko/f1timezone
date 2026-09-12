#!/usr/bin/env node
/* ============================================================
   F1 Timezone — live-data audit (zero dependencies, no API key)
   ============================================================
   Compares what this site says against the Jolpica F1 API
   (the community-maintained Ergast successor) and reports drift:

     * schedule: session dates/times, added or dropped races
     * drivers:  who actually raced in the latest round vs
                 drivers-data.js (catches injury stand-ins)

   Usage:
       node tools/audit-live-data.js              report only
       node tools/audit-live-data.js --apply      also rewrite changed
                                                  session times into
                                                  race-data.js
       node tools/audit-live-data.js --fixture DIR  read schedule.json /
                                                  results.json from DIR
                                                  instead of the network

   Writes a markdown report to audit-report.md (repo root).
   Exit codes: 0 = in sync, 2 = drift found, 1 = error.

   The GitHub Action in .github/workflows/audit.yml runs this daily
   and turns drift into an issue + a ready-to-merge pull request.
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { SEASON } = require("../race-data.js");
const { TEAMS } = require("../drivers-data.js");
const {
    JOLPICA, fetchAll, matchRaces, apiSession, apiInstant, toLocalIso
} = require("./lib/f1data.js");

const ROOT = path.join(__dirname, "..");
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const fixtureIdx = args.indexOf("--fixture");
const FIXTURE = fixtureIdx !== -1 ? args[fixtureIdx + 1] : null;
const YEAR = SEASON.year;

const SESSION_NAMES = {
    fp1: "Practice 1", fp2: "Practice 2", fp3: "Practice 3",
    sprint_qualifying: "Sprint Qualifying", sprint: "Sprint", qualifying: "Qualifying", race: "Race"
};

async function load(name, url, pick) {
    if (FIXTURE) {
        const file = path.join(FIXTURE, `${name}.json`);
        if (!fs.existsSync(file)) return null;
        return pick(JSON.parse(fs.readFileSync(file, "utf8")).MRData);
    }
    return fetchAll(url, pick);
}

// Human-readable time in track-local + Eastern
function fmtBoth(ms, tz) {
    const opts = { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" };
    return `${new Intl.DateTimeFormat("en-US", { timeZone: tz, ...opts }).format(ms)} (${new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", ...opts }).format(ms)})`;
}

async function main() {
    const report = [];
    const changes = [];          // { slug, key, from, to } applied into race-data.js
    let drift = false;

    /* ---------------- schedule ---------------- */
    const apiRaces = await load("schedule", `${JOLPICA}/${YEAR}.json`, d => d.RaceTable && d.RaceTable.Races);
    if (!apiRaces) throw new Error("no schedule data");

    const { pairs, unmatchedApi, unmatchedOurs } = matchRaces(SEASON.races, apiRaces);
    const scheduleLines = [];

    for (const { ours, api } of pairs) {
        for (const key of Object.keys(ours.sessions)) {
            const entry = apiSession(api, key);
            const theirs = apiInstant(entry);
            if (theirs === null) continue;                    // API has no time for this session
            const mine = Date.parse(ours.sessions[key]);
            if (mine === theirs) continue;
            drift = true;
            const proposed = toLocalIso(theirs, ours.timezone);
            scheduleLines.push(`- **${ours.gp} — ${SESSION_NAMES[key]}**: site says ${fmtBoth(mine, ours.timezone)}, API says ${fmtBoth(theirs, ours.timezone)}`);
            changes.push({ slug: ours.slug, key, from: ours.sessions[key], to: proposed });
        }
        // Layout drift: sprint weekend added/removed
        const apiSprint = Boolean(apiSession(api, "sprint"));
        const oursSprint = "sprint" in ours.sessions;
        if (apiSprint !== oursSprint) {
            drift = true;
            scheduleLines.push(`- **${ours.gp}**: API ${apiSprint ? "lists" : "does not list"} a Sprint, but the site ${oursSprint ? "has" : "lacks"} one — edit the session layout in race-data.js by hand`);
        }
    }
    for (const api of unmatchedApi) {
        drift = true;
        scheduleLines.push(`- **NEW RACE on the API not on the site**: Round ${api.round} ${api.raceName} at ${api.Circuit && api.Circuit.circuitName} on ${api.date}${api.time ? " " + api.time : ""} — add it to race-data.js + race-content.js`);
    }
    for (const ours of unmatchedOurs) {
        drift = true;
        scheduleLines.push(`- **Race on the site not on the API**: ${ours.gp} (${ours.sessions.race.slice(0, 10)}) — cancelled, moved, or the API is lagging; verify before removing`);
    }

    report.push(`## Schedule (${pairs.length} of ${SEASON.races.length} rounds matched to the API's ${apiRaces.length})`);
    report.push(scheduleLines.length ? scheduleLines.join("\n") : "✅ Every matched session time agrees with the API.");

    /* ---------------- drivers ---------------- */
    const lastRaces = await load("results", `${JOLPICA}/${YEAR}/last/results.json`, d => d.RaceTable && d.RaceTable.Races);
    const last = lastRaces && lastRaces[0];
    const driverLines = [];
    if (last && Array.isArray(last.Results) && last.Results.length) {
        const listed = new Map(); // familyName(lower) → { team, status?, standIn? }
        for (const team of TEAMS) {
            for (const d of team.drivers) listed.set(surname(d.name), { team: team.name, status: d.status || null });
            if (team.standIn) listed.set(surname(team.standIn.name), { team: team.name, standIn: true });
        }
        const raced = new Set();
        for (const r of last.Results) {
            const key = r.Driver.familyName.toLowerCase();
            raced.add(key);
            if (!listed.has(key)) {
                drift = true;
                driverLines.push(`- **${r.Driver.givenName} ${r.Driver.familyName}** (#${r.number}, ${r.Constructor.name}) raced in the ${last.raceName} but is not on the drivers page — add as a standIn or driver in drivers-data.js`);
            }
        }
        for (const [key, info] of listed) {
            if (!raced.has(key) && !info.status && !info.standIn) {
                drift = true;
                driverLines.push(`- **${cap(key)}** (${info.team}) is listed as a full-season driver but did not start the ${last.raceName} — add a \`status\` note or check the lineup`);
            }
            if (info.standIn && !raced.has(key)) {
                drift = true;
                driverLines.push(`- Stand-in **${cap(key)}** (${info.team}) did not race in the ${last.raceName} — the substitution may be over; remove the standIn`);
            }
        }
        report.push(`\n## Drivers (checked against the ${last.raceName}, round ${last.round})`);
        report.push(driverLines.length ? driverLines.join("\n") : "✅ Everyone who raced is on the drivers page, and nobody listed without a note was missing.");
    } else {
        report.push(`\n## Drivers\nℹ️ No ${YEAR} race results on the API yet — lineup check skipped.`);
    }

    /* ---------------- apply ---------------- */
    let applied = 0;
    if (APPLY && changes.length) {
        const file = path.join(ROOT, "race-data.js");
        let src = fs.readFileSync(file, "utf8");
        for (const c of changes) {
            const block = new RegExp(`(slug: "${c.slug}",[\\s\\S]*?${c.key}: ")${escapeRe(c.from)}(")`);
            if (!block.test(src)) { report.push(`\n⚠️ Could not locate ${c.slug}.${c.key} in race-data.js to apply "${c.to}"`); continue; }
            src = src.replace(block, `$1${c.to}$2`);
            applied++;
        }
        fs.writeFileSync(file, src);
        report.push(`\n## Applied\n${applied} session time(s) rewritten in race-data.js — regenerate with \`node tools/generate-site.js\` and review the diff.`);
    } else if (changes.length) {
        report.push(`\n_Run with \`--apply\` to write the ${changes.length} proposed session time(s) into race-data.js._`);
    }

    const header = `# F1 data audit — ${new Date().toISOString().slice(0, 10)}\n\nSource: [Jolpica F1 API](https://api.jolpi.ca/ergast/f1/${YEAR}.json) vs \`race-data.js\` / \`drivers-data.js\`.\n\n`;
    const md = header + report.join("\n") + "\n";
    fs.writeFileSync(path.join(ROOT, "audit-report.md"), md);
    console.log(md);
    process.exit(drift ? 2 : 0);
}

const surname = name => name.trim().split(/\s+/).pop().toLowerCase();
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

main().catch(e => {
    console.error("audit failed:", e.message);
    process.exit(1);
});
