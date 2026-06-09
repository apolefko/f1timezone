/* ============================================================
   F1 Timezone — SINGLE SOURCE OF TRUTH for the season
   ============================================================
   This file drives EVERYTHING:
     - the homepage schedule + countdown (script.js)
     - the per-race static pages, races index, sitemap.xml and
       .ics calendar files (regenerate with: node tools/generate-site.js)

   NEXT SEASON CHECKLIST (the only maintenance this site needs):
     1. Update SEASON.year and the races below (dates, times, sprints).
     2. Update slugs to the new year (e.g. miami-2027).
     3. Run:  node tools/generate-site.js
     4. Commit + push. Done.

   Times are in LOCAL track time with the correct UTC offset for
   that date (mind DST at the track!). The browser and the
   generator convert them to US time zones automatically.
   ============================================================ */

const SEASON = {
    year: 2026,
    siteUrl: "https://f1timezone.com",
    races: [
        {
            slug: "australia-2026",
            round: 1,
            name: "F1 Australian Grand Prix 2026",
            gp: "Australian Grand Prix",
            location: "Melbourne, Australia",
            circuit: "Albert Park Circuit",
            timezone: "Australia/Melbourne",
            sessions: {
                fp1: "2026-03-06T13:30:00+11:00",
                fp2: "2026-03-06T17:00:00+11:00",
                fp3: "2026-03-07T12:30:00+11:00",
                qualifying: "2026-03-07T16:00:00+11:00",
                race: "2026-03-08T15:00:00+11:00"
            },
            facts: { length: "5.278 km", laps: 58, corners: 14, firstGp: 1996 },
            intro: "The 2026 season opens where modern F1 traditions begin: Albert Park in Melbourne. The semi-permanent parkland circuit winds around a lake and rewards confidence over its fast, flowing middle sector. As the first race of the all-new 2026 regulations era, this is the weekend the entire grid finds out who got the new cars right — expect the form book to be rewritten in a single afternoon.",
            viewingNotes: "Melbourne is brutal for US fans: the race goes green on Saturday night/Sunday very early morning in American time zones. Set an alarm or record it — season openers are the one race you don't want spoiled before breakfast. The good news: it's a one-time sacrifice, as most of the season runs at far friendlier hours."
        },
        {
            slug: "china-2026",
            round: 2,
            name: "F1 Chinese Grand Prix 2026",
            gp: "Chinese Grand Prix",
            location: "Shanghai, China",
            circuit: "Shanghai International Circuit",
            timezone: "Asia/Shanghai",
            sessions: {
                fp1: "2026-03-13T11:30:00+08:00",
                sprint_qualifying: "2026-03-13T15:30:00+08:00",
                sprint: "2026-03-14T11:00:00+08:00",
                qualifying: "2026-03-14T15:00:00+08:00",
                race: "2026-03-15T15:00:00+08:00"
            },
            facts: { length: "5.451 km", laps: 56, corners: 16, firstGp: 2004 },
            intro: "Shanghai hosts the first sprint weekend of 2026, which means meaningful track action on all three days and double the points-paying sessions. The Shanghai International Circuit is defined by its snail-shell Turn 1-2-3 complex and a 1.2 km back straight that produces some of the best slipstream battles of the year. With the new 2026 cars still an unknown quantity, a sprint this early is a gift: twice the racing data, twice the chaos potential.",
            viewingNotes: "Like Melbourne, Shanghai runs overnight for US viewers — the Grand Prix starts Saturday evening to overnight depending on your time zone. The sprint race on Friday night US time is a lower-stakes way to stay up late. If you only catch one session live, make it qualifying: Shanghai's long back straight makes for dramatic final-sector swings."
        },
        {
            slug: "japan-2026",
            round: 3,
            name: "F1 Japanese Grand Prix 2026",
            gp: "Japanese Grand Prix",
            location: "Suzuka, Japan",
            circuit: "Suzuka Circuit",
            timezone: "Asia/Tokyo",
            sessions: {
                fp1: "2026-03-27T13:30:00+09:00",
                fp2: "2026-03-27T17:00:00+09:00",
                fp3: "2026-03-28T12:30:00+09:00",
                qualifying: "2026-03-28T16:00:00+09:00",
                race: "2026-03-29T14:00:00+09:00"
            },
            facts: { length: "5.807 km", laps: 53, corners: 18, firstGp: 1987 },
            intro: "Suzuka is the drivers' favorite for a reason: the only figure-eight circuit on the calendar, with the relentless S-Curves of sector one demanding a rhythm no other track does. It is the truest test of aerodynamic efficiency on the calendar, which makes the 2026 edition fascinating — the new regulations' active aero will be stressed nowhere harder than through 130R and the Esses.",
            viewingNotes: "Suzuka is the last of the early-season overnighters for US fans — the race starts Saturday night/early Sunday morning in US time zones. After this weekend the calendar swings toward the Americas and Europe and the viewing times get dramatically easier. Qualifying at Suzuka is appointment viewing: a single lap here is the best showcase of car and driver all season."
        },
        {
            slug: "miami-2026",
            round: 4,
            name: "F1 Miami Grand Prix 2026",
            gp: "Miami Grand Prix",
            location: "Miami, Florida",
            circuit: "Miami International Autodrome",
            timezone: "America/New_York",
            sessions: {
                fp1: "2026-05-01T13:30:00-04:00",
                sprint_qualifying: "2026-05-01T17:30:00-04:00",
                sprint: "2026-05-02T12:00:00-04:00",
                qualifying: "2026-05-02T16:00:00-04:00",
                race: "2026-05-03T16:00:00-04:00"
            },
            facts: { length: "5.412 km", laps: 57, corners: 19, firstGp: 2022 },
            intro: "F1 comes home for American fans: the Miami International Autodrome around Hard Rock Stadium, and in 2026 it's a sprint weekend, so every single day carries championship points. The circuit blends a fast, flowing first sector with a tight, technical chicane section, and its three DRS-era straights have historically produced plenty of overtaking. Expect the usual Miami spectacle dialed up to eleven for the new-regulations era.",
            viewingNotes: "This is the easy one — every session falls in comfortable US daytime hours. The Grand Prix starts Sunday afternoon Eastern, and Saturday's double-header of sprint race and qualifying makes it one of the best single days of TV on the calendar. No alarms, no spoiler-dodging: just watch it live."
        },
        {
            slug: "canada-2026",
            round: 5,
            name: "F1 Canadian Grand Prix 2026",
            gp: "Canadian Grand Prix",
            location: "Montreal, Canada",
            circuit: "Circuit Gilles Villeneuve",
            timezone: "America/Toronto",
            sessions: {
                fp1: "2026-05-22T13:30:00-04:00",
                sprint_qualifying: "2026-05-22T17:30:00-04:00",
                sprint: "2026-05-23T12:00:00-04:00",
                qualifying: "2026-05-23T16:00:00-04:00",
                race: "2026-05-24T16:00:00-04:00"
            },
            facts: { length: "4.361 km", laps: 70, corners: 14, firstGp: 1978 },
            intro: "Circuit Gilles Villeneuve moves to May for 2026 and picks up a sprint weekend — a big change for one of the calendar's most reliable chaos generators. The track on Île Notre-Dame is a point-and-shoot layout of long straights, heavy braking zones, and the infamous Wall of Champions waiting at the final chicane. Walls are close, safety cars are frequent, and strategy gambles often decide the result.",
            viewingNotes: "Another fully US-friendly weekend: every session is in afternoon or early-evening Eastern time, and the race starts Sunday afternoon across all US time zones. Montreal in May can bring wild weather — rain here has produced some of the most famous races in F1 history, so don't skip the sprint."
        },
        {
            slug: "monaco-2026",
            round: 6,
            name: "F1 Monaco Grand Prix 2026",
            gp: "Monaco Grand Prix",
            location: "Monte Carlo, Monaco",
            circuit: "Circuit de Monaco",
            timezone: "Europe/Monaco",
            sessions: {
                fp1: "2026-06-05T13:30:00+02:00",
                fp2: "2026-06-05T17:00:00+02:00",
                fp3: "2026-06-06T12:30:00+02:00",
                qualifying: "2026-06-06T16:00:00+02:00",
                race: "2026-06-07T15:00:00+02:00"
            },
            facts: { length: "3.337 km", laps: 78, corners: 19, firstGp: 1950 },
            intro: "The jewel in the crown. Monaco is the shortest, slowest, and most unforgiving lap of the year — 78 laps threading the streets of Monte Carlo with zero margin for error through Casino Square, the Tunnel, and the swimming pool chicane. Overtaking is nearly impossible, which makes Saturday qualifying the real main event: pole position here is worth more than anywhere else on Earth.",
            viewingNotes: "Monaco kicks off the European-season morning routine for US fans: lights out Sunday morning Eastern time — brunch racing on the East Coast, an early alarm on the West Coast. Make time for qualifying on Saturday morning; watching a driver commit to a flying lap between Monaco's barriers is the single best spectacle in motorsport."
        },
        {
            slug: "spain-2026",
            round: 7,
            name: "F1 Spanish Grand Prix 2026",
            gp: "Spanish Grand Prix",
            location: "Barcelona, Spain",
            circuit: "Circuit de Barcelona-Catalunya",
            timezone: "Europe/Madrid",
            sessions: {
                fp1: "2026-06-12T13:30:00+02:00",
                fp2: "2026-06-12T17:00:00+02:00",
                fp3: "2026-06-13T12:30:00+02:00",
                qualifying: "2026-06-13T16:00:00+02:00",
                race: "2026-06-14T15:00:00+02:00"
            },
            facts: { length: "4.657 km", laps: 66, corners: 14, firstGp: 1991 },
            intro: "Barcelona-Catalunya is the calendar's great measuring stick: every team has tested here for decades, and a car that's quick through the long, loaded corners of sector three is usually quick everywhere. In 2026 Spain has two races — this one in Barcelona and the new Madrid event in September — giving Spanish fans a double helping and the rest of us a perfect mid-season form check.",
            viewingNotes: "Standard European timing: the race starts Sunday morning in US time zones — comfortable on the East Coast, early on the Pacific. Historically a hard track to overtake on, so qualifying position matters enormously; Saturday morning's qualifying session is worth your time."
        },
        {
            slug: "austria-2026",
            round: 8,
            name: "F1 Austrian Grand Prix 2026",
            gp: "Austrian Grand Prix",
            location: "Spielberg, Austria",
            circuit: "Red Bull Ring",
            timezone: "Europe/Vienna",
            sessions: {
                fp1: "2026-06-26T13:30:00+02:00",
                fp2: "2026-06-26T17:00:00+02:00",
                fp3: "2026-06-27T12:30:00+02:00",
                qualifying: "2026-06-27T16:00:00+02:00",
                race: "2026-06-28T15:00:00+02:00"
            },
            facts: { length: "4.318 km", laps: 71, corners: 10, firstGp: 1970 },
            intro: "The Red Bull Ring is the shortest lap by time on the calendar — barely over a minute — carved into the Styrian mountains with just ten corners, three big braking zones, and constant elevation change. Short laps mean tight qualifying margins, packed midfield battles, and track-limit drama. It's a compact, high-intensity weekend where small mistakes are punished instantly.",
            viewingNotes: "Sunday morning racing for US viewers, like the rest of the European summer. The whole lap takes about 65 seconds, so even a small gap on track looks tiny on TV — great for nervous viewing. With three genuine overtaking zones, this one rewards watching live rather than catching highlights."
        },
        {
            slug: "britain-2026",
            round: 9,
            name: "F1 British Grand Prix 2026",
            gp: "British Grand Prix",
            location: "Silverstone, United Kingdom",
            circuit: "Silverstone Circuit",
            timezone: "Europe/London",
            sessions: {
                fp1: "2026-07-03T13:30:00+01:00",
                sprint_qualifying: "2026-07-03T17:30:00+01:00",
                sprint: "2026-07-04T12:00:00+01:00",
                qualifying: "2026-07-04T16:00:00+01:00",
                race: "2026-07-05T15:00:00+01:00"
            },
            facts: { length: "5.891 km", laps: 52, corners: 18, firstGp: 1950 },
            intro: "Silverstone hosted the first-ever World Championship Grand Prix in 1950, and in 2026 the home of British motorsport gets a sprint weekend — points on Independence Day weekend, with the main race on Sunday July 5. Maggotts-Becketts-Chapel remains the most awe-inspiring sequence of corners in racing, taken nearly flat in a modern F1 car. The crowd, the history, and the high-speed layout make this one of the season's marquee events.",
            viewingNotes: "A sprint race on the Fourth of July, starting Saturday morning US time, then the Grand Prix on Sunday morning — a solid holiday-weekend double for American fans. British summer weather is famously unstable; a dry forecast at Silverstone means nothing, which is exactly why you watch."
        },
        {
            slug: "belgium-2026",
            round: 10,
            name: "F1 Belgian Grand Prix 2026",
            gp: "Belgian Grand Prix",
            location: "Spa-Francorchamps, Belgium",
            circuit: "Circuit de Spa-Francorchamps",
            timezone: "Europe/Brussels",
            sessions: {
                fp1: "2026-07-17T13:30:00+02:00",
                fp2: "2026-07-17T17:00:00+02:00",
                fp3: "2026-07-18T12:30:00+02:00",
                qualifying: "2026-07-18T16:00:00+02:00",
                race: "2026-07-19T15:00:00+02:00"
            },
            facts: { length: "7.004 km", laps: 44, corners: 19, firstGp: 1950 },
            intro: "Spa-Francorchamps is the longest lap of the year at over seven kilometers, plunging through the Ardennes forest with the legendary Eau Rouge-Raidillon climb as its centerpiece. The circuit is so long that it can be raining at one end and dry at the other — a recipe that has produced decades of unforgettable races. If a first-time viewer asks which race to watch, the answer is usually Spa.",
            viewingNotes: "Sunday morning start for US viewers. Keep an eye on the weather radar as much as the timing tower: Ardennes microclimates flip races here, and a well-timed switch to intermediate tires can be worth more than 20 seconds of pace. The long Kemmel straight guarantees genuine overtaking all race long."
        },
        {
            slug: "hungary-2026",
            round: 11,
            name: "F1 Hungarian Grand Prix 2026",
            gp: "Hungarian Grand Prix",
            location: "Budapest, Hungary",
            circuit: "Hungaroring",
            timezone: "Europe/Budapest",
            sessions: {
                fp1: "2026-07-24T13:30:00+02:00",
                fp2: "2026-07-24T17:00:00+02:00",
                fp3: "2026-07-25T12:30:00+02:00",
                qualifying: "2026-07-25T16:00:00+02:00",
                race: "2026-07-26T15:00:00+02:00"
            },
            facts: { length: "4.381 km", laps: 70, corners: 14, firstGp: 1986 },
            intro: "The Hungaroring is often called \"Monaco without the walls\" — a tight, twisting ribbon outside Budapest where corners arrive relentlessly and overtaking takes either bravery or strategy. It traditionally closes the first half of the season before the summer break, and July heat makes tire management decisive. Despite its reputation, Hungary has a habit of producing shock results: first-time winners and strategy masterstrokes thrive here.",
            viewingNotes: "Sunday morning viewing in the US, and the last race before F1's month-long summer shutdown — after this, nothing until late August, so enjoy it. Track position is king at the Hungaroring; watch the pit windows around laps 20-30, because the undercut is the main overtaking tool here."
        },
        {
            slug: "netherlands-2026",
            round: 12,
            name: "F1 Dutch Grand Prix 2026",
            gp: "Dutch Grand Prix",
            location: "Zandvoort, Netherlands",
            circuit: "Circuit Zandvoort",
            timezone: "Europe/Amsterdam",
            sessions: {
                fp1: "2026-08-21T13:30:00+02:00",
                sprint_qualifying: "2026-08-21T17:30:00+02:00",
                sprint: "2026-08-22T12:00:00+02:00",
                qualifying: "2026-08-22T16:00:00+02:00",
                race: "2026-08-23T15:00:00+02:00"
            },
            facts: { length: "4.259 km", laps: 72, corners: 14, firstGp: 1952 },
            intro: "F1 returns from summer break at Zandvoort, in the dunes on the Dutch coast — and in 2026 it's a sprint weekend, so the second half of the season opens with points on all three days. Zandvoort's signature is its banking: the final corner is steeper than many ovals, slingshotting cars onto the main straight. Narrow, old-school, and surrounded by an orange sea of fans, it's one of the most atmospheric stops of the year.",
            viewingNotes: "Saturday and Sunday morning sessions for US viewers, with the sprint adding a Friday-afternoon (US time) qualifying hit to ease you back in after the summer break. Coastal wind off the North Sea is Zandvoort's invisible variable — it changes braking points lap to lap and catches drivers out all weekend."
        },
        {
            slug: "italy-2026",
            round: 13,
            name: "F1 Italian Grand Prix 2026",
            gp: "Italian Grand Prix",
            location: "Monza, Italy",
            circuit: "Autodromo Nazionale Monza",
            timezone: "Europe/Rome",
            sessions: {
                fp1: "2026-09-04T13:30:00+02:00",
                fp2: "2026-09-04T17:00:00+02:00",
                fp3: "2026-09-05T12:30:00+02:00",
                qualifying: "2026-09-05T16:00:00+02:00",
                race: "2026-09-06T15:00:00+02:00"
            },
            facts: { length: "5.793 km", laps: 53, corners: 11, firstGp: 1950 },
            intro: "Monza is the Temple of Speed — the fastest lap of the season, where cars run skinny wings and spend over 80% of the lap at full throttle. The atmosphere is unmatched: the tifosi turn the royal park red for Ferrari regardless of where the team sits in the standings. Slipstreaming makes qualifying a tactical chess match, and the two chicanes guarantee late-braking drama into the first lap.",
            viewingNotes: "Sunday morning race for US fans. Monza rewards watching the start above all: the run from pole to the first chicane is long enough that the leader almost never exits Turn 1 first. If the championship is close, the tow games in Saturday qualifying are half the entertainment."
        },
        {
            slug: "madrid-2026",
            round: 14,
            name: "F1 Madrid Grand Prix 2026",
            gp: "Madrid Grand Prix",
            location: "Madrid, Spain",
            circuit: "Madring",
            timezone: "Europe/Madrid",
            sessions: {
                fp1: "2026-09-11T13:30:00+02:00",
                fp2: "2026-09-11T17:00:00+02:00",
                fp3: "2026-09-12T12:30:00+02:00",
                qualifying: "2026-09-12T16:00:00+02:00",
                race: "2026-09-13T15:00:00+02:00"
            },
            facts: { length: "5.47 km", laps: 57, corners: 22, firstGp: 2026 },
            intro: "Brand new for 2026: the Madring, a hybrid street-and-permanent circuit around Madrid's IFEMA exhibition district, hosting Spain's second Grand Prix of the season. Its headline feature is a huge banked corner — one of the steepest in modern F1 — and a layout no team has real data for. New circuits reset the pecking order for a weekend: simulator quality and driver adaptability matter more than the car's championship position.",
            viewingNotes: "Sunday morning start in the US, like the other European rounds. First-ever races at new circuits are unpredictable by nature — expect evolving grip, surprise qualifying results, and at least one strategy gamble that pays off big. Worth watching practice highlights just to learn the track with the drivers."
        },
        {
            slug: "azerbaijan-2026",
            round: 15,
            name: "F1 Azerbaijan Grand Prix 2026",
            gp: "Azerbaijan Grand Prix",
            location: "Baku, Azerbaijan",
            circuit: "Baku City Circuit",
            timezone: "Asia/Baku",
            sessions: {
                fp1: "2026-09-24T15:30:00+04:00",
                fp2: "2026-09-24T19:00:00+04:00",
                fp3: "2026-09-25T14:30:00+04:00",
                qualifying: "2026-09-25T18:00:00+04:00",
                race: "2026-09-26T15:00:00+04:00"
            },
            facts: { length: "6.003 km", laps: 51, corners: 20, firstGp: 2016 },
            intro: "Baku is F1's beautiful contradiction: a flat-out 2.2 km blast along the Caspian seafront bolted onto a medieval old-town section so narrow the cars barely fit past the castle walls. The result is the calendar's most reliable chaos — late safety cars, restarts, and last-lap lead changes are practically tradition here. Note the unusual schedule: in 2026 Baku runs Thursday-to-Saturday, with the race on Saturday.",
            viewingNotes: "Read the schedule twice: the race is on SATURDAY, not Sunday, starting in the early morning hours for US viewers. Baku races are rarely decided until the final laps — multiple editions have flipped on a restart with five laps to go — so if you record it, avoid social media until you've watched the end."
        },
        {
            slug: "singapore-2026",
            round: 16,
            name: "F1 Singapore Grand Prix 2026",
            gp: "Singapore Grand Prix",
            location: "Marina Bay, Singapore",
            circuit: "Marina Bay Street Circuit",
            timezone: "Asia/Singapore",
            sessions: {
                fp1: "2026-10-09T17:30:00+08:00",
                sprint_qualifying: "2026-10-09T21:30:00+08:00",
                sprint: "2026-10-10T19:00:00+08:00",
                qualifying: "2026-10-10T21:00:00+08:00",
                race: "2026-10-11T20:00:00+08:00"
            },
            facts: { length: "4.94 km", laps: 62, corners: 19, firstGp: 2008 },
            intro: "F1's original night race becomes a sprint weekend in 2026 — Marina Bay under floodlights, with points available on all three days. Singapore is the most physically demanding race of the year: 90%+ humidity, cockpit temperatures over 50°C, and nearly two hours of wall-to-wall concentration with no rest. The combination of a sprint format and a circuit where safety cars are near-guaranteed makes this one of the most strategically volatile weekends of the season.",
            viewingNotes: "The night-race timing is actually friendly to US mornings: sessions land in the morning hours US time, with the Grand Prix on Sunday morning Eastern. The spectacle of F1 cars between skyscrapers under lights is the best-looking broadcast of the year — watch this one on the biggest screen you have."
        },
        {
            slug: "austin-2026",
            round: 17,
            name: "F1 United States Grand Prix 2026",
            gp: "United States Grand Prix",
            location: "Austin, Texas",
            circuit: "Circuit of the Americas",
            timezone: "America/Chicago",
            sessions: {
                fp1: "2026-10-23T13:30:00-05:00",
                fp2: "2026-10-23T17:00:00-05:00",
                fp3: "2026-10-24T12:30:00-05:00",
                qualifying: "2026-10-24T16:00:00-05:00",
                race: "2026-10-25T15:00:00-05:00"
            },
            facts: { length: "5.513 km", laps: 56, corners: 20, firstGp: 2012 },
            intro: "Circuit of the Americas in Austin is America's permanent F1 home and one of the best modern circuits anywhere: a steep climb into the blind Turn 1 hairpin, an Esses sequence borrowed from Suzuka, and a long back straight with real overtaking. COTA draws the biggest crowds of the F1 season, and the racing consistently delivers. It also opens a three-race swing through the Americas that often decides the championship.",
            viewingNotes: "Home-country timing: every session is in comfortable US afternoon hours, with the race starting Sunday mid-afternoon. No conversions, no alarms — this and Miami are the two weekends the time zones work entirely in your favor. The run up the hill into Turn 1 on lap one is the best start of the year."
        },
        {
            slug: "mexico-2026",
            round: 18,
            name: "F1 Mexico City Grand Prix 2026",
            gp: "Mexico City Grand Prix",
            location: "Mexico City, Mexico",
            circuit: "Autódromo Hermanos Rodríguez",
            timezone: "America/Mexico_City",
            sessions: {
                fp1: "2026-10-30T13:30:00-06:00",
                fp2: "2026-10-30T17:00:00-06:00",
                fp3: "2026-10-31T12:30:00-06:00",
                qualifying: "2026-10-31T16:00:00-06:00",
                race: "2026-11-01T14:00:00-06:00"
            },
            facts: { length: "4.304 km", laps: 71, corners: 17, firstGp: 1963 },
            intro: "Mexico City sits at 2,200 meters above sea level, and the thin air changes everything: engines lose power, brakes overheat, and cars run maximum downforce wings that behave like Monza-spec ones. The Autódromo Hermanos Rodríguez funnels the field down a 1.2 km straight into a tight first-corner complex, then through the Foro Sol stadium section, where the crowd noise rivals a World Cup final.",
            viewingNotes: "Another Americas-friendly weekend: the race starts Sunday afternoon US time, back-to-back with Austin the week before. Watch the first lap closely — the long run to Turn 1 plus the altitude-induced braking problems makes lap-one contact more likely here than almost anywhere."
        },
        {
            slug: "brazil-2026",
            round: 19,
            name: "F1 Brazilian Grand Prix 2026",
            gp: "São Paulo Grand Prix",
            location: "São Paulo, Brazil",
            circuit: "Autódromo José Carlos Pace (Interlagos)",
            timezone: "America/Sao_Paulo",
            sessions: {
                fp1: "2026-11-06T11:30:00-03:00",
                fp2: "2026-11-06T15:00:00-03:00",
                fp3: "2026-11-07T11:30:00-03:00",
                qualifying: "2026-11-07T15:00:00-03:00",
                race: "2026-11-08T14:00:00-03:00"
            },
            facts: { length: "4.309 km", laps: 71, corners: 15, firstGp: 1973 },
            intro: "Interlagos is the title-decider track: more championships have swung on this old-school, anti-clockwise rollercoaster outside São Paulo than anywhere else in the modern era. The Senna S at Turn 1 drops downhill into one of F1's great overtaking zones, and the weather off the surrounding hills is famously unstable. Short lap, passionate crowd, unpredictable rain — Interlagos rarely produces a boring race.",
            viewingNotes: "Very US-friendly: São Paulo is only 1-2 hours ahead of Eastern time in November, so the race starts late Sunday morning/midday for American viewers. If championship math is still alive by November, this is historically where it gets settled — clear your Sunday."
        },
        {
            slug: "las-vegas-2026",
            round: 20,
            name: "F1 Las Vegas Grand Prix 2026",
            gp: "Las Vegas Grand Prix",
            location: "Las Vegas, Nevada",
            circuit: "Las Vegas Strip Circuit",
            timezone: "America/Los_Angeles",
            sessions: {
                fp1: "2026-11-19T18:30:00-08:00",
                fp2: "2026-11-20T03:00:00-08:00",
                fp3: "2026-11-20T18:30:00-08:00",
                qualifying: "2026-11-21T00:00:00-08:00",
                race: "2026-11-21T20:00:00-08:00"
            },
            facts: { length: "6.201 km", laps: 50, corners: 17, firstGp: 2023 },
            intro: "F1 races down the Las Vegas Strip at night, past the Sphere and the casinos, on one of the fastest street layouts ever built — the cars hit over 210 mph on the boulevard. The November desert cold makes tire warm-up a genuine problem, which keeps the field closer than the layout suggests. It's the only Saturday-night points race on the calendar and the closest thing F1 has to a home prime-time event for US TV.",
            viewingNotes: "Mark it: the RACE IS ON SATURDAY NIGHT, 8 PM Pacific / 11 PM Eastern — prime time on the West Coast, a late one back East. Qualifying runs after midnight Pacific on Friday night. It's the one weekend of the year where US fans get the 'European fan experience' in reverse, and East Coast viewers may want coffee."
        },
        {
            slug: "qatar-2026",
            round: 21,
            name: "F1 Qatar Grand Prix 2026",
            gp: "Qatar Grand Prix",
            location: "Lusail, Qatar",
            circuit: "Lusail International Circuit",
            timezone: "Asia/Qatar",
            sessions: {
                fp1: "2026-11-27T16:30:00+03:00",
                fp2: "2026-11-27T20:00:00+03:00",
                fp3: "2026-11-28T17:00:00+03:00",
                qualifying: "2026-11-28T21:00:00+03:00",
                race: "2026-11-29T19:00:00+03:00"
            },
            facts: { length: "5.419 km", laps: 57, corners: 16, firstGp: 2021 },
            intro: "Lusail is a floodlit, flowing circuit originally built for MotoGP, which shows in its fast, cambered medium-speed corners that punish tires harder than almost any other track. The penultimate round of 2026 runs at night in the desert, and the relentless corner sequence makes it one of the most physical races of the year — drivers regularly call it tougher than Singapore. If the title fight is alive, the high-degradation racing here can flip it.",
            viewingNotes: "The night race in Qatar translates to morning viewing in the US — lights out Sunday morning Eastern, very early Pacific. Tire life is the story to follow: watch the gap between cars that nurse the rubber and those that burn it, because three-stop strategies are live here."
        },
        {
            slug: "abu-dhabi-2026",
            round: 22,
            name: "F1 Abu Dhabi Grand Prix 2026",
            gp: "Abu Dhabi Grand Prix",
            location: "Abu Dhabi, UAE",
            circuit: "Yas Marina Circuit",
            timezone: "Asia/Dubai",
            sessions: {
                fp1: "2026-12-04T13:30:00+04:00",
                fp2: "2026-12-04T17:00:00+04:00",
                fp3: "2026-12-05T14:30:00+04:00",
                qualifying: "2026-12-05T18:00:00+04:00",
                race: "2026-12-06T17:00:00+04:00"
            },
            facts: { length: "5.281 km", laps: 58, corners: 16, firstGp: 2009 },
            intro: "The season finale at Yas Marina is F1's twilight signature: the race starts in daylight and ends under floodlights, with the marina and the LED-skinned hotel as the backdrop. The 2021 layout revisions turned a processional track into a genuine racer's circuit with long DRS zones and a banked hairpin. As the last round of the first new-regulations season, expect every championship position — and millions in prize money — to be decided here.",
            viewingNotes: "The 2026 season ends with a Sunday morning race for US fans — one final early-ish start before the long winter break. Even if the title is sewn up, the midfield fight for constructors' positions is usually frantic, and it's your last live F1 until March 2027. Savor it."
        }
    ]
};

// Human-readable session labels (used by homepage, race pages and ICS files)
const SESSION_LABELS = {
    fp1: "Practice 1",
    fp2: "Practice 2",
    fp3: "Practice 3",
    sprint_qualifying: "Sprint Qualifying",
    sprint: "Sprint Race",
    qualifying: "Qualifying",
    race: "Race"
};

// Session durations in minutes (used for .ics calendar events)
const SESSION_DURATIONS = {
    fp1: 60,
    fp2: 60,
    fp3: 60,
    sprint_qualifying: 60,
    sprint: 60,
    qualifying: 60,
    race: 120
};

// Node (generator) export — ignored by browsers
if (typeof module !== "undefined" && module.exports) {
    module.exports = { SEASON, SESSION_LABELS, SESSION_DURATIONS };
}
