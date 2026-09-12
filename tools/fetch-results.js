#!/usr/bin/env node
/* ============================================================
   F1 Timezone — results & standings fetcher (no API key)
   ============================================================
   Pulls the season's race podiums and championship standings
   from the Jolpica F1 API and writes results-data.json, which
   tools/generate-site.js renders onto completed race pages, the
   races index and /standings.html.

   Usage:
       node tools/fetch-results.js                 fetch from the API
       node tools/fetch-results.js --fixture DIR   read podium-1.json,
                                                   podium-2.json, podium-3.json,
                                                   driver-standings.json,
                                                   constructor-standings.json
                                                   from DIR instead

   Exit code 0 always on success; 3 if results-data.json changed
   (the results workflow uses this to decide whether to commit).
   The API only ever adds data, so the file is only rewritten when
   something actually changed.
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { SEASON } = require("../race-data.js");
const { JOLPICA, fetchJson, matchRaces } = require("./lib/f1data.js");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "results-data.json");
const YEAR = SEASON.year;
const args = process.argv.slice(2);
const fixtureIdx = args.indexOf("--fixture");
const FIXTURE = fixtureIdx !== -1 ? args[fixtureIdx + 1] : null;

async function load(name, url) {
    if (FIXTURE) {
        const file = path.join(FIXTURE, `${name}.json`);
        return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")).MRData : null;
    }
    return (await fetchJson(url)).MRData;
}

const driverName = d => `${d.givenName} ${d.familyName}`;

async function main() {
    // Positions 1–3 across the season: three small requests instead of
    // paging through every classified finisher.
    const podiumByRace = new Map(); // api race key → [p1, p2, p3]
    const apiRaces = new Map();
    for (const pos of [1, 2, 3]) {
        const data = await load(`podium-${pos}`, `${JOLPICA}/${YEAR}/results/${pos}.json?limit=100`);
        const races = (data && data.RaceTable && data.RaceTable.Races) || [];
        for (const race of races) {
            const key = `${race.date}`;
            apiRaces.set(key, race);
            const r = race.Results && race.Results[0];
            if (!r) continue;
            const list = podiumByRace.get(key) || [];
            list[pos - 1] = {
                position: pos,
                driver: driverName(r.Driver),
                code: r.Driver.code || null,
                number: r.number || r.Driver.permanentNumber || null,
                team: r.Constructor.name,
                time: pos === 1 && r.Time ? r.Time.time : (r.Time ? r.Time.time : null),
                status: r.status || null
            };
            podiumByRace.set(key, list);
        }
    }

    const { pairs } = matchRaces(SEASON.races, [...apiRaces.values()]);
    const races = {};
    for (const { ours, api } of pairs) {
        const podium = (podiumByRace.get(api.date) || []).filter(Boolean);
        if (!podium.length) continue;
        races[ours.slug] = { round: ours.round, apiRound: Number(api.round), podium };
    }

    const ds = await load("driver-standings", `${JOLPICA}/${YEAR}/driverStandings.json?limit=100`);
    const dsList = ds && ds.StandingsTable && ds.StandingsTable.StandingsLists && ds.StandingsTable.StandingsLists[0];
    const driverStandings = ((dsList && dsList.DriverStandings) || []).map(s => ({
        position: Number(s.position || s.positionText),
        driver: driverName(s.Driver),
        code: s.Driver.code || null,
        number: s.Driver.permanentNumber || null,
        team: (s.Constructors || []).map(c => c.name).join(" / "),
        points: Number(s.points),
        wins: Number(s.wins)
    }));

    const cs = await load("constructor-standings", `${JOLPICA}/${YEAR}/constructorStandings.json?limit=100`);
    const csList = cs && cs.StandingsTable && cs.StandingsTable.StandingsLists && cs.StandingsTable.StandingsLists[0];
    const constructorStandings = ((csList && csList.ConstructorStandings) || []).map(s => ({
        position: Number(s.position || s.positionText),
        team: s.Constructor.name,
        points: Number(s.points),
        wins: Number(s.wins)
    }));

    const afterRound = Number((dsList && dsList.round) || (csList && csList.round) || Object.keys(races).length) || 0;
    const next = {
        season: YEAR,
        afterRound,
        races,
        driverStandings,
        constructorStandings
    };

    // Keep "updated" out of the comparison so an unchanged season doesn't
    // produce a commit every day.
    let prev = null;
    try { prev = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch (e) { /* first run */ }
    const same = prev && JSON.stringify({ ...prev, updated: undefined }) === JSON.stringify({ ...next, updated: undefined });
    if (same) {
        console.log(`results-data.json unchanged (${Object.keys(races).length} races with podiums, standings after round ${afterRound}).`);
        process.exit(0);
    }
    fs.writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), ...next }, null, 2) + "\n");
    console.log(`results-data.json written: ${Object.keys(races).length} races with podiums, ${driverStandings.length} drivers and ${constructorStandings.length} teams in the standings after round ${afterRound}.`);
    process.exit(3);
}

main().catch(e => {
    console.error("fetch-results failed:", e.message);
    process.exit(1);
});
