#!/usr/bin/env node
/* ============================================================
   F1 Timezone — data & site integrity checks (zero dependencies)
   ============================================================
   Run locally before committing, and in CI on every pull request:
       node tools/validate.js

   Checks:
     1. every session's hardcoded UTC offset matches the race's IANA
        time zone on that date (the DST typo this site fears most)
     2. sessions are chronological within a weekend, races across
        the season, rounds numbered 1..N, slugs unique
     3. each weekend uses a known session layout (standard or sprint)
     4. every race has extended editorial content and coordinates
     5. drivers-data.js is well-formed (unique numbers, 2 per team)
     6. every internal link in the generated HTML resolves to a file
   Exit code 1 with a list of problems if anything fails.
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { SEASON } = require("../race-data.js");
const { RACE_CONTENT } = require("../race-content.js");
const { TEAMS } = require("../drivers-data.js");
const { offsetAt, statedOffset } = require("./lib/f1data.js");

const ROOT = path.join(__dirname, "..");
const problems = [];
const fail = msg => problems.push(msg);

const STANDARD = ["fp1", "fp2", "fp3", "qualifying", "race"];
const SPRINT = ["fp1", "sprint_qualifying", "sprint", "qualifying", "race"];

/* ---- 1-4: race data ---- */
let prevRaceMs = 0;
const slugs = new Set();
SEASON.races.forEach((race, i) => {
    const where = `${race.slug}`;
    if (slugs.has(race.slug)) fail(`${where}: duplicate slug`);
    slugs.add(race.slug);
    if (!race.slug.endsWith(`-${SEASON.year}`)) fail(`${where}: slug should end with -${SEASON.year}`);
    if (race.round !== i + 1) fail(`${where}: round is ${race.round}, expected ${i + 1} (races must be listed in calendar order)`);

    const keys = Object.keys(race.sessions);
    const layout = keys.join(",");
    if (layout !== STANDARD.join(",") && layout !== SPRINT.join(",")) {
        fail(`${where}: unexpected session layout [${layout}]`);
    }

    let prevMs = 0;
    for (const [key, iso] of Object.entries(race.sessions)) {
        const ms = Date.parse(iso);
        if (Number.isNaN(ms)) { fail(`${where}.${key}: unparseable time "${iso}"`); continue; }
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(iso)) {
            fail(`${where}.${key}: must be local time with explicit offset, got "${iso}"`);
        }
        if (ms <= prevMs) fail(`${where}.${key}: not after the previous session`);
        prevMs = ms;

        let expected;
        try { expected = offsetAt(ms, race.timezone); }
        catch (e) { fail(`${where}: bad timezone "${race.timezone}" (${e.message})`); break; }
        const stated = statedOffset(iso);
        if (stated !== expected) {
            fail(`${where}.${key}: offset ${stated} but ${race.timezone} is ${expected} on ${iso.slice(0, 10)}`);
        }
        if (!iso.startsWith(String(SEASON.year))) fail(`${where}.${key}: not in season year ${SEASON.year}`);
    }
    const raceMs = Date.parse(race.sessions.race);
    if (raceMs <= prevRaceMs) fail(`${where}: race is not after the previous round's race`);
    prevRaceMs = raceMs;

    const c = RACE_CONTENT[race.slug];
    if (!c || !Array.isArray(c.circuit) || !c.circuit.length || !c.history || !c.viewingExtra) {
        fail(`${where}: race-content.js entry missing or incomplete`);
    }
    for (const f of ["gp", "name", "location", "circuit", "intro", "viewingNotes"]) {
        if (!race[f]) fail(`${where}: missing "${f}"`);
    }
    if (!race.facts || !race.facts.laps || !race.facts.length) fail(`${where}: missing facts`);
    if (!Array.isArray(race.coords) || race.coords.length !== 2 ||
        Math.abs(race.coords[0]) > 90 || Math.abs(race.coords[1]) > 180) {
        fail(`${where}: coords must be [latitude, longitude]`);
    }
});
for (const slug of Object.keys(RACE_CONTENT)) {
    if (!slugs.has(slug)) fail(`race-content.js: "${slug}" has no matching race in race-data.js`);
}

/* ---- 5: drivers ---- */
const numbers = new Map();
for (const team of TEAMS) {
    if (!team.name || !team.engine) fail(`drivers-data.js: team missing name/engine`);
    if (!Array.isArray(team.drivers) || team.drivers.length !== 2) fail(`${team.name}: expected exactly 2 full-season drivers`);
    const all = [...(team.drivers || []), ...(team.standIn ? [team.standIn] : [])];
    for (const d of all) {
        if (!d.name || !d.number || !d.country) fail(`${team.name}: driver entry incomplete (${JSON.stringify(d)})`);
        if (numbers.has(d.number)) fail(`${team.name}: car number ${d.number} also used by ${numbers.get(d.number)}`);
        numbers.set(d.number, d.name);
    }
    if (team.standIn && !team.standIn.note) fail(`${team.name}: standIn needs a note`);
}

/* ---- 6: internal links in generated HTML ---- */
function htmlFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return e.name === ".git" || e.name === "node_modules" || e.name === "tools" ? [] : htmlFiles(p);
        return e.name.endsWith(".html") ? [p] : [];
    });
}
function resolves(href) {
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) return true;
    const rel = clean.endsWith("/") ? clean + "index.html" : clean;
    return fs.existsSync(path.join(ROOT, rel));
}
for (const file of htmlFiles(ROOT)) {
    const html = fs.readFileSync(file, "utf8");
    const re = /(?:href|src)="(\/[^"]*)"/g;
    let m;
    while ((m = re.exec(html))) {
        if (!resolves(m[1])) fail(`${path.relative(ROOT, file)}: broken internal link ${m[1]}`);
    }
}
const requiredPages = ["index.html", "drivers.html", "standings.html", "races/index.html", "guides/index.html", "sitemap.xml", "robots.txt", "ads.txt"];
for (const p of requiredPages) if (!fs.existsSync(path.join(ROOT, p))) fail(`missing generated file ${p} — run node tools/generate-site.js`);

/* ---- report ---- */
if (problems.length) {
    console.error(`✗ ${problems.length} problem(s):\n` + problems.map(p => "  - " + p).join("\n"));
    process.exit(1);
}
console.log(`✓ ${SEASON.races.length} races, ${TEAMS.length} teams, all offsets/links/content OK`);
