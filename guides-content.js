/* ============================================================
   F1 Timezone — evergreen guide articles
   ============================================================
   Node-only file consumed by tools/generate-site.js (never loaded
   by the browser). Each guide becomes /guides/<slug>.html plus an
   entry on /guides/index.html and in sitemap.xml.

   Anything derived from the calendar (sprint rounds, race count,
   opener/finale dates, per-race links) is computed from
   race-data.js at generation time so the articles can never drift
   out of sync with the schedule.
   ============================================================ */

const { SEASON } = require("./race-data.js");

const YEAR = SEASON.year;
const races = SEASON.races;
const sprintRaces = races.filter(r => "sprint" in r.sessions);
const opener = races[0];
const finale = races[races.length - 1];

const fmtDate = (dateStr, tz) => new Intl.DateTimeFormat("en-US", {
    timeZone: tz, month: "long", day: "numeric"
}).format(new Date(dateStr));

const raceLink = r => `<a href="/races/${r.slug}.html">${r.gp}</a>`;

const sprintListSentence = sprintRaces.map(raceLink).join(", ")
    .replace(/, ([^,]*)$/, ", and $1");

const GUIDES = [
    {
        slug: "how-to-watch-f1-in-the-us",
        title: `How to Watch F1 in the US in ${YEAR}: TV, Streaming & Free Options`,
        description: `Where to watch every ${YEAR} Formula 1 session in the United States — Apple TV coverage, free viewing options, audio broadcasts, and tips for catching races across US time zones.`,
        updated: "2026-07-09",
        bodyHtml: `
<p>${YEAR} is the biggest change in how Americans watch Formula 1 in a generation. After nearly two decades split between SPEED, NBC, and ESPN, US broadcast rights moved to Apple under a five-year deal — which means the way you watched last season no longer applies. Here's the full picture.</p>

<h2>Apple TV is the home of F1 in the US</h2>
<p>Starting with the ${YEAR} season, <strong>Apple TV is the exclusive US broadcaster of Formula 1</strong>. Every session of every race weekend — practice, qualifying, sprint sessions, and the Grand Prix itself — streams live on Apple TV, with races produced in 4K with Dolby Vision and 5.1 surround sound.</p>
<p>An Apple TV subscription runs $12.99 per month (or $99 per year), and despite the name you don't need Apple hardware: the Apple TV app is available on smart TVs, streaming sticks and boxes (Roku, Fire TV, Google TV), game consoles, Android devices, and any web browser at tv.apple.com.</p>
<p>One genuinely good wrinkle for hardcore fans: <strong>F1 TV Premium is included at no extra cost</strong> with an Apple TV subscription in the US. That's the sport's own streaming product — live onboard cameras for every driver, team radio, live timing and telemetry — which previously cost extra as a standalone subscription.</p>

<h2>Free ways to watch (and listen)</h2>
<p>Not ready to subscribe? ${YEAR} actually expanded the free options:</p>
<ul>
    <li><strong>Free sessions on Apple TV:</strong> all practice sessions and a selection of full race weekends throughout the season are free to watch in the Apple TV app, no subscription required.</li>
    <li><strong>Yahoo Sports:</strong> live practice and qualifying sessions stream free on the Yahoo Sports platform, including a mixed onboard feed during qualifying.</li>
    <li><strong>Tubi altcasts:</strong> the free streaming service Tubi carries alternative live broadcasts ("altcasts") of multiple races during the ${YEAR} season, with creator-led commentary.</li>
    <li><strong>Apple Music radio:</strong> free live audio broadcasts of every race — genuinely useful for early-morning European rounds when you'd rather listen from bed.</li>
</ul>

<h2>What happened to ESPN?</h2>
<p>ESPN's contract ran through the 2025 season, and the Sky Sports F1 commentary feed American fans knew came with it. Apple's coverage carries its own presentation with familiar F1 broadcast voices. If you had cable purely for F1, ${YEAR} is the year that stops being necessary — the sport is now streaming-only in the US.</p>

<h2>When are the races on? It depends where they are</h2>
<p>The bigger challenge for US fans has never been <em>where</em> to watch but <em>when</em>. In ${YEAR} the ${races.length}-race calendar spans every continent bar Africa and Antarctica, and start times in US time zones swing from the middle of the night to prime time:</p>
<ul>
    <li><strong>European races</strong> (${raceLink(races.find(r => r.slug.startsWith("monaco")))}, ${raceLink(races.find(r => r.slug.startsWith("britain")))}, ${raceLink(races.find(r => r.slug.startsWith("italy")))} and more) start mid-morning Eastern, early morning Pacific.</li>
    <li><strong>Races in the Americas</strong> (${raceLink(races.find(r => r.slug.startsWith("miami")))}, ${raceLink(races.find(r => r.slug.startsWith("canada")))}, ${raceLink(races.find(r => r.slug.startsWith("austin")))}, ${raceLink(races.find(r => r.slug.startsWith("mexico")))}, ${raceLink(races.find(r => r.slug.startsWith("brazil")))}) run in comfortable US afternoon slots.</li>
    <li><strong>${raceLink(races.find(r => r.slug.startsWith("las-vegas")))}</strong> is the outlier: a Saturday night race at 8 PM Pacific / 11 PM Eastern.</li>
    <li><strong>Asia-Pacific races</strong> (${raceLink(opener)}, ${raceLink(races.find(r => r.slug.startsWith("japan")))}, the relocated ${raceLink(races.find(r => r.slug.startsWith("bahrain")))} at Sepang) mean overnight or very early morning viewing.</li>
</ul>
<p>Our <a href="/guides/why-f1-race-times-vary.html">guide to why F1 start times vary so much</a> breaks this down in detail, and every race page on this site shows the full session schedule converted to Eastern, Central, Mountain, and Pacific time — see the <a href="/races/">complete ${YEAR} calendar</a>.</p>

<h2>Never miss a session</h2>
<p>The simplest insurance: <a href="/calendar/f1-${YEAR}-season.ics">download the full-season calendar file</a> from this site. It drops every practice, qualifying, sprint, and race into Google Calendar, Apple Calendar, or Outlook in your local time, with a 30-minute reminder before each session — daylight-saving shifts handled automatically.</p>
`
    },
    {
        slug: `f1-${YEAR}-season-guide`,
        title: `F1 ${YEAR} Season Guide: New Cars, New Rules, New Races`,
        description: `Everything that changed for the ${YEAR} Formula 1 season — the new regulations era, the ${races.length}-race calendar, sprint weekends, the Madrid debut, and what it all means for race fans.`,
        updated: "2026-07-09",
        bodyHtml: `
<p>${YEAR} isn't just another Formula 1 season — it's a hard reset. New technical regulations tore up the car design rulebook for the first time since 2022, the calendar gained a brand-new race, and the grid itself changed shape. Here's your orientation guide, whether you're new to the sport or returning after a break.</p>

<h2>The ${YEAR} regulations: smaller cars, active aero, half-electric power</h2>
<p>The headline change is the cars themselves. The ${YEAR} technical regulations produced machines that are smaller, narrower, and lighter than their predecessors, designed to be more agile and easier to race wheel-to-wheel. Two changes matter most for what you see on track:</p>
<ul>
    <li><strong>Active aerodynamics.</strong> The front and rear wings physically change shape on straights, shedding drag for speed, then snap back to high-downforce mode for corners. The old DRS overtaking flap is gone, replaced by a driver-controlled <em>manual override</em> energy boost for attacking the car ahead.</li>
    <li><strong>A near 50/50 hybrid split.</strong> The power units keep a V6 combustion engine but triple the electrical power, so roughly half the car's performance now comes from the battery — all of it burning 100% sustainable fuel.</li>
</ul>
<p>Rule resets historically scramble the competitive order: the team that nails a new formula can dominate for years (as happened in 2014 and 2022), and midfield teams can leap to the front overnight. That uncertainty is the story of the entire ${YEAR} season.</p>

<h2>A bigger grid</h2>
<p>${YEAR} welcomed the first all-new team in a decade, with General Motors' Cadillac brand joining as the 11th team on the grid — the first American works entry of the modern era. Elsewhere the engine landscape reshuffled: Audi completed its takeover of the Sauber team as a full factory operation, Honda switched its allegiance to Aston Martin, and Red Bull began building its own power units in partnership with Ford. More manufacturers have skin in the game than at any point in decades.</p>

<h2>The calendar: ${races.length} races, one debut</h2>
<p>The season runs from the ${raceLink(opener)} in Melbourne (race day ${fmtDate(opener.sessions.race, opener.timezone)}) to the ${raceLink(finale)} finale at Yas Marina on ${fmtDate(finale.sessions.race, finale.timezone)} — ${races.length} rounds in total. The <a href="/races/">full calendar with US session times is here</a>, but four scheduling notes stand out:</p>
<ul>
    <li><strong>Bahrain moved to Malaysia.</strong> Cancelled from its April date because of the conflict in the Middle East, the ${raceLink(races.find(r => r.slug.startsWith("bahrain")))} was reinstated for October 2–4 at Sepang — F1's first race in Malaysia since 2017, still run under the Bahrain Grand Prix name.</li>
    <li><strong>Madrid debuts.</strong> The new ${raceLink(races.find(r => r.slug.startsWith("madrid")))} joins in September on the brand-new Madring circuit — Spain's second race of the season alongside ${raceLink(races.find(r => r.slug.startsWith("spain")))} in Barcelona.</li>
    <li><strong>Two Saturday races.</strong> The ${raceLink(races.find(r => r.slug.startsWith("azerbaijan")))} and the ${raceLink(races.find(r => r.slug.startsWith("las-vegas")))} both run their Grand Prix on a Saturday, not Sunday. Don't get caught out.</li>
    <li><strong>Canada moved.</strong> The ${raceLink(races.find(r => r.slug.startsWith("canada")))} shifted from its traditional June date to late May, pairing with Miami to cut down transatlantic travel.</li>
</ul>

<h2>Sprint weekends: ${sprintRaces.length} rounds with extra points</h2>
<p>${sprintRaces.length} of the ${races.length} weekends run the sprint format, which adds a shorter Saturday race (about 100 km, roughly a third of Grand Prix distance) with its own qualifying session and its own points. The ${YEAR} sprint rounds are ${sprintListSentence}.</p>
<p>For viewers, sprint weekends simply mean more: meaningful, points-paying track action on all three days instead of two. Our <a href="/guides/f1-race-weekend-format.html">race weekend format guide</a> walks through exactly how both weekend types are structured, session by session.</p>

<h2>How to follow the season from the US</h2>
<p>Every session streams on Apple TV, which took over exclusive US broadcast rights this season — our <a href="/guides/how-to-watch-f1-in-the-us.html">complete US viewing guide</a> covers subscriptions, the free options, and audio broadcasts. Race start times for US viewers swing wildly across the calendar, from overnight (Melbourne) to prime time (Las Vegas); the <a href="/">homepage schedule</a> shows every session in your US time zone, and each race page has a live countdown plus a <a href="/calendar/f1-${YEAR}-season.ics">calendar download</a> so the odd Saturday race never catches you napping.</p>
`
    },
    {
        slug: "f1-race-weekend-format",
        title: `F1 Race Weekend Format Explained: Practice, Qualifying, Sprints & Points (${YEAR})`,
        description: `How a Formula 1 race weekend actually works in ${YEAR} — every session explained, the difference between standard and sprint weekends, how qualifying sets the grid, and how points are scored.`,
        updated: "2026-07-09",
        bodyHtml: `
<p>A Formula 1 "race" is really a three-day event with up to six distinct sessions, and in ${YEAR} the calendar runs two different weekend structures. Here's what every session is for, in the order you'll watch them.</p>

<h2>The standard weekend</h2>
<p>Most ${YEAR} rounds — ${races.length - sprintRaces.length} of ${races.length} — use the classic format:</p>
<ul>
    <li><strong>Friday — Practice 1 &amp; Practice 2</strong> (one hour each). Teams shake down the cars, trial setup changes, and run race-fuel simulations. Times are unrepresentative; treat Friday as reconnaissance.</li>
    <li><strong>Saturday — Practice 3</strong> (one hour), then <strong>Qualifying</strong>. FP3 is the final rehearsal before the weekend's first real competition.</li>
    <li><strong>Sunday — the Grand Prix.</strong> Roughly 305 km of racing (Monaco excepted), typically 90 minutes to two hours.</li>
</ul>

<h2>How qualifying works</h2>
<p>Qualifying is a three-stage knockout that sets Sunday's starting grid:</p>
<ul>
    <li><strong>Q1</strong> (18 minutes): all 20+ cars run; the slowest five are eliminated and fill the back of the grid.</li>
    <li><strong>Q2</strong> (15 minutes): the remaining cars run again; five more are knocked out.</li>
    <li><strong>Q3</strong> (12 minutes): a ten-car shootout for pole position, usually decided by a single flying lap in the final seconds.</li>
</ul>
<p>Because overtaking is difficult at circuits like <a href="/races/monaco-2026.html">Monaco</a> and the <a href="/races/hungary-2026.html">Hungaroring</a>, Saturday qualifying is often the most consequential hour of those weekends.</p>

<h2>The sprint weekend</h2>
<p>${sprintRaces.length} rounds in ${YEAR} — ${sprintListSentence} — compress practice and add a second race:</p>
<ul>
    <li><strong>Friday:</strong> a single practice session, then <strong>Sprint Qualifying</strong> — a shortened knockout (SQ1/SQ2/SQ3) that sets the grid for Saturday's sprint.</li>
    <li><strong>Saturday:</strong> the <strong>Sprint</strong> — about 100 km, roughly 30 minutes, no mandatory pit stops — followed later in the day by full Qualifying for Sunday's race.</li>
    <li><strong>Sunday:</strong> the Grand Prix, exactly as on a standard weekend.</li>
</ul>
<p>The practical upshot: with only one practice session before competitive running begins, teams have almost no time to fix a bad setup — which is why sprint weekends produce more surprises than standard ones.</p>

<h2>How the points work</h2>
<p>Grand Prix points go to the top ten finishers: <strong>25&ndash;18&ndash;15&ndash;12&ndash;10&ndash;8&ndash;6&ndash;4&ndash;2&ndash;1</strong>. The sprint pays a smaller scale to the top eight: <strong>8&ndash;7&ndash;6&ndash;5&ndash;4&ndash;3&ndash;2&ndash;1</strong>. (The old bonus point for fastest lap was abolished after 2024.) Drivers accumulate points for the Drivers' Championship; both cars' points combine for the Constructors' Championship, which determines each team's share of the sport's prize money — why midfield teams fight so hard over a single point in P10.</p>

<h2>Session lengths at a glance</h2>
<ul>
    <li>Practice sessions: 60 minutes each</li>
    <li>Qualifying: about 60 minutes including breaks</li>
    <li>Sprint Qualifying: about 45 minutes</li>
    <li>Sprint: about 30 minutes (~100 km)</li>
    <li>Grand Prix: 90 minutes to 2 hours (~305 km), 3-hour absolute cap</li>
</ul>

<h2>Planning your viewing weekend</h2>
<p>For US viewers the puzzle is that all these sessions land at very different local times depending on the host country — a Friday practice in Japan is a Thursday night in New York. Every race page on this site lists the complete weekend schedule in Eastern, Central, Mountain, and Pacific time (<a href="/races/">start here</a>), the <a href="/guides/why-f1-race-times-vary.html">start-times guide</a> explains the patterns, and the <a href="/guides/how-to-watch-f1-in-the-us.html">US viewing guide</a> covers where each session streams.</p>
`
    },
    {
        slug: "why-f1-race-times-vary",
        title: `Why F1 Race Times Vary So Much in the US (${YEAR} Guide)`,
        description: `Why Formula 1 start times swing from 1 AM to prime time for American fans — time zones, night races, daylight saving traps, and the ${YEAR} races with unusual schedules.`,
        updated: "2026-07-09",
        bodyHtml: `
<p>Ask an American F1 fan about start times and you'll get a war story: the 1 AM alarm for Melbourne, the accidental spoiler before a recorded Suzuka race, the Baku Grand Prix that turned out to be on a Saturday. Formula 1 start times in the US swing across a 20-hour range over the season. This guide explains why — and how to never get caught out.</p>

<h2>The core reason: F1 races on local time, worldwide</h2>
<p>Unlike the NFL or NBA, Formula 1 has no home time zone. Each of the ${YEAR} season's ${races.length} rounds starts at a time chosen for the <em>local</em> crowd and, often, for European television — typically 3 PM local time for daytime races. The US audience gets whatever that converts to:</p>
<ul>
    <li><strong>Europe</strong> (9 rounds in ${YEAR}): 3 PM in Monaco or Monza is <strong>9 AM Eastern / 6 AM Pacific</strong>. This is the famous "F1 brunch" slot that dominates the middle of the season.</li>
    <li><strong>Asia-Pacific:</strong> Melbourne is 14&ndash;16 hours ahead of the US, so the <a href="/races/australia-2026.html">Australian Grand Prix</a> starts around midnight Eastern on Saturday night. <a href="/races/china-2026.html">Shanghai</a> and <a href="/races/japan-2026.html">Suzuka</a> are similar overnighters.</li>
    <li><strong>The Americas</strong> (5 rounds): <a href="/races/miami-2026.html">Miami</a>, <a href="/races/canada-2026.html">Montreal</a>, <a href="/races/austin-2026.html">Austin</a>, <a href="/races/mexico-2026.html">Mexico City</a>, and <a href="/races/brazil-2026.html">São Paulo</a> all start in comfortable US afternoon or midday slots — the easiest stretch of the calendar.</li>
</ul>

<h2>Night races flip the math</h2>
<p>Five ${YEAR} venues race under floodlights, and counterintuitively, Asian night races are <em>good</em> news for Americans: <a href="/races/singapore-2026.html">Singapore's</a> 8 PM start lands at 8 AM Eastern on Sunday morning, and <a href="/races/qatar-2026.html">Qatar's</a> evening race arrives at 11 AM Eastern — far friendlier than their daytime equivalents would be. <a href="/races/las-vegas-2026.html">Las Vegas</a> inverts things for the home crowd instead: 8 PM Saturday in Nevada is the sport's only US prime-time slot (and a late 11 PM start back East). <a href="/races/abu-dhabi-2026.html">Abu Dhabi's</a> twilight finale rounds out the group at 8 AM Eastern.</p>

<h2>The daylight saving trap</h2>
<p>The sneakiest scheduling hazard: the US and Europe change their clocks on <em>different dates</em>. In ${YEAR}, Europe ends summer time in late October while the US holds on until November 1 — and countries like Singapore, Japan, and the UAE never shift at all. The result is that a race series you've watched at 9 AM all summer can suddenly appear an hour earlier or later for a couple of weeks. The <a href="/races/mexico-2026.html">Mexico City Grand Prix</a> weekend actually coincides with the US clock change in ${YEAR}. Every time on this site is computed for your chosen US zone on the actual race date, so daylight saving is already accounted for.</p>

<h2>Saturday races: read the schedule twice</h2>
<p>Two ${YEAR} Grands Prix don't run on Sunday at all. <a href="/races/azerbaijan-2026.html">Baku</a> uses a Thursday-to-Saturday schedule with the race on Saturday morning US time, and <a href="/races/las-vegas-2026.html">Las Vegas</a> races on Saturday night. Sprint weekends add another wrinkle: six rounds (see the <a href="/guides/f1-race-weekend-format.html">weekend format guide</a>) hold a points-paying sprint race on Saturday, so "the race" you hear about on social media may not be <em>the</em> race.</p>

<h2>How to actually never miss a session</h2>
<ul>
    <li><strong>Check the converted schedule, not the local time.</strong> The <a href="/">homepage</a> lists every ${YEAR} session in Eastern, Central, Mountain, or Pacific — pick your zone once and it sticks.</li>
    <li><strong>Use each race's page in the week before.</strong> Every race page has a live countdown to the next session, so there's no mental math — see the <a href="/races/">full calendar</a>.</li>
    <li><strong>Subscribe to the calendar file.</strong> The <a href="/calendar/f1-${YEAR}-season.ics">season .ics download</a> puts every session in your phone's calendar in your local time with a 30-minute alert — the set-and-forget option that survives clock changes, Saturday races, and sprint weekends alike.</li>
</ul>
<p>And if you're still deciding where to watch once the alarm goes off, the <a href="/guides/how-to-watch-f1-in-the-us.html">US viewing guide</a> has the ${YEAR} streaming landscape covered.</p>
`
    }
];

// Node (generator) export — this file is never loaded by browsers
if (typeof module !== "undefined" && module.exports) {
    module.exports = { GUIDES };
}
