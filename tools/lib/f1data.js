/* ============================================================
   Shared helpers for the maintenance scripts (Node-only)
   ============================================================
   - time zone math (offset lookup, local ISO strings)
   - Jolpica API access (the community-maintained Ergast successor;
     free, no API key: https://api.jolpi.ca/ergast/f1/)
   - matching API races to the entries in race-data.js
   ============================================================ */

const JOLPICA = "https://api.jolpi.ca/ergast/f1";

// Session keys in race-data.js → property names in the Ergast schema.
// SprintShootout is the pre-2024 name still used by some mirrors.
const SESSION_MAP = {
    fp1: ["FirstPractice"],
    fp2: ["SecondPractice"],
    fp3: ["ThirdPractice"],
    sprint_qualifying: ["SprintQualifying", "SprintShootout"],
    sprint: ["Sprint"],
    qualifying: ["Qualifying"]
};

// "+08:00" for the IANA zone at the given instant.
function offsetAt(instant, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
        .formatToParts(new Date(instant));
    const raw = parts.find(p => p.type === "timeZoneName").value; // "GMT+8", "GMT-04:00", "GMT"
    const m = /^GMT(?:([+-])(\d{1,2})(?::?(\d{2}))?)?$/.exec(raw);
    if (!m) throw new Error(`Unexpected offset format "${raw}" for ${timeZone}`);
    if (!m[1]) return "+00:00";
    return `${m[1]}${m[2].padStart(2, "0")}:${m[3] || "00"}`;
}

// The offset written in an ISO string: "2026-10-04T15:00:00+08:00" → "+08:00"
function statedOffset(iso) {
    const m = /([+-]\d{2}:\d{2}|Z)$/.exec(iso);
    if (!m) throw new Error(`No UTC offset in "${iso}"`);
    return m[1] === "Z" ? "+00:00" : m[1];
}

// Instant → "YYYY-MM-DDTHH:MM:SS+HH:MM" in the given zone (the format race-data.js uses)
function toLocalIso(instant, timeZone) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone, hourCycle: "h23",
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    }).formatToParts(new Date(instant));
    const get = t => parts.find(p => p.type === t).value;
    return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}${offsetAt(instant, timeZone)}`;
}

// Ergast gives "date" + optional "time" (always UTC, "07:00:00Z"). Returns ms or null.
function apiInstant(entry) {
    if (!entry || !entry.date) return null;
    if (!entry.time) return null;
    const t = entry.time.endsWith("Z") ? entry.time : entry.time + "Z";
    const ms = Date.parse(`${entry.date}T${t}`);
    return Number.isNaN(ms) ? null : ms;
}

// Date-only fallback (midnight UTC of the stated date)
function apiDateMs(entry) {
    return entry && entry.date ? Date.parse(`${entry.date}T00:00:00Z`) : null;
}

async function fetchJson(url, { retries = 3 } = {}) {
    let lastErr;
    for (let i = 0; i <= retries; i++) {
        try {
            const res = await fetch(url, { headers: { "User-Agent": "f1timezone-maintenance (github.com/apolefko/f1timezone)" } });
            if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
            if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status} for ${url}`), { fatal: true });
            return await res.json();
        } catch (e) {
            lastErr = e;
            if (e.fatal) break;
            await new Promise(r => setTimeout(r, 1500 * (i + 1)));
        }
    }
    throw lastErr;
}

// Fetch every page of a paginated Ergast list (Jolpica caps limit at 100).
async function fetchAll(url, pick) {
    const out = [];
    let offset = 0, total = Infinity;
    while (offset < total) {
        const sep = url.includes("?") ? "&" : "?";
        const data = await fetchJson(`${url}${sep}limit=100&offset=${offset}`);
        total = Number(data.MRData.total || 0);
        const items = pick(data.MRData) || [];
        out.push(...items);
        if (!items.length) break;
        offset += 100;
    }
    return out;
}

// Pair each API race with the race-data.js entry whose Grand Prix starts
// closest to it (within a 3-day window) — circuit ids and round numbers
// both change more often than race weekends do.
function matchRaces(ourRaces, apiRaces) {
    const WINDOW = 3 * 86400000;
    const pairs = [];
    const unmatchedApi = [];
    const taken = new Set();
    for (const api of apiRaces) {
        const target = apiInstant(api) ?? apiDateMs(api);
        let best = null, bestDiff = Infinity;
        for (const ours of ourRaces) {
            if (taken.has(ours.slug)) continue;
            const diff = Math.abs(Date.parse(ours.sessions.race) - target);
            if (diff < bestDiff) { best = ours; bestDiff = diff; }
        }
        if (best && bestDiff <= WINDOW) {
            taken.add(best.slug);
            pairs.push({ ours: best, api });
        } else {
            unmatchedApi.push(api);
        }
    }
    const unmatchedOurs = ourRaces.filter(r => !taken.has(r.slug));
    return { pairs, unmatchedApi, unmatchedOurs };
}

// Ergast session entry for one of our session keys ("race" is the race itself)
function apiSession(apiRace, key) {
    if (key === "race") return { date: apiRace.date, time: apiRace.time };
    for (const name of SESSION_MAP[key] || []) {
        if (apiRace[name]) return apiRace[name];
    }
    return null;
}

module.exports = {
    JOLPICA, SESSION_MAP, offsetAt, statedOffset, toLocalIso,
    apiInstant, apiDateMs, fetchJson, fetchAll, matchRaces, apiSession
};
