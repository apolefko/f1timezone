/* ============================================================
   F1 Timezone — extended per-race editorial content
   ============================================================
   Node-only file consumed by tools/generate-site.js. It is NOT
   loaded by the browser (keep it out of any <script src>), so
   adding prose here never slows the homepage down.

   Every race slug in race-data.js MUST have an entry here — the
   generator throws if one is missing. Shape per race:

     circuit:      array of paragraphs extending the intro in
                   race-data.js (rendered under "Circuit Guide")
     history:      one paragraph for the "Circuit History" heading
     viewingExtra: one paragraph extending viewingNotes under
                   "Watching from the US"
     faq:          hand-written Q&As appended to the auto-generated
                   per-race FAQ (start time / sprint / laps)
   ============================================================ */

const RACE_CONTENT = {
    "australia-2026": {
        circuit: [
            "Albert Park is a semi-permanent layout: for most of the year these are ordinary public roads around a lake in a Melbourne park, which is why the surface starts the weekend slippery and improves dramatically as rubber goes down. Lap times can tumble by two or three seconds between Friday practice and Sunday, so early-weekend form here is famously misleading. The 2022 resurfacing and layout revisions removed the old chicane at the far end of the lake, turning that section into a flat-out sweep and making Albert Park significantly faster than it was for its first 25 years.",
            "The lap rewards a car that changes direction well: the middle sector strings together quick left-right transitions where the walls are close enough to punish greed. The best overtaking chances come into Turn 1, Turn 3, and the fast Turn 9-10 chicane, with four DRS-assisted straights giving chasing cars a genuine shot. Melbourne's autumn weather is changeable, and a safety car appears in the majority of races here — the park's grass and gravel runoff means small mistakes often end in recovery vehicles rather than rejoins."
        ],
        history: "Melbourne took over the Australian Grand Prix from Adelaide in 1996 and has been F1's traditional season opener for most of the years since. Albert Park's roll call of winners reads like a history of the modern sport — Schumacher, Hakkinen, Alonso, Hamilton, Vettel — and the circuit has a habit of chaotic openers: multiple first-lap pileups, surprise podiums, and the occasional shock result as teams discover in racing conditions what winter testing hid.",
        viewingExtra: "If you can't stay up, the practical play is to record the race and watch over Sunday breakfast — just put your phone in another room, because a season opener result is the hardest spoiler of the year to dodge. Full session times for every US time zone are in the table above, and our guide to why F1 start times swing so wildly across the season explains when the calendar turns friendly again.",
        faq: [
            {
                q: "Why does the Australian Grand Prix run so late at night for US viewers?",
                a: "Melbourne is 14-16 hours ahead of US time zones depending on daylight saving, so a 3:00 PM Sunday race start in Australia lands on Saturday night or very early Sunday morning across the United States. It's one of only a handful of 2026 races with overnight US timing."
            }
        ]
    },

    "china-2026": {
        circuit: [
            "The Shanghai International Circuit was carved out of marshland on the edge of the city and its layout is drawn from the Chinese character 'shang' — most obviously in the extraordinary Turn 1-2-3 complex, a corner that keeps tightening as it climbs and then falls, testing patience as much as grip. Get the entry wrong and the exit compromises the run all the way to Turn 6. The middle sector's long, loaded right-handers punish the front-left tire harder than almost any corners on the calendar.",
            "The defining overtaking zone is the 1.2 km back straight into the Turn 14 hairpin — one of the longest full-throttle stretches of the season, where a car with a tow can sail past even a faster rival. Because the sprint format compresses setup time into a single practice session, teams arrive with educated guesses rather than dialed-in cars, and Shanghai's tire-hungry corners expose every mistake. Expect divergent strategies and genuine uncertainty in both races."
        ],
        history: "China joined the calendar in 2004 at the height of F1's eastward expansion, with Rubens Barrichello winning the first race for Ferrari. The circuit has since produced landmark moments: Michael Schumacher's final Grand Prix victory in 2006, and Lewis Hamilton's record haul of six Chinese GP wins. After a five-year absence around the pandemic, the race returned in 2024 — with a sprint — and immediately re-established itself as one of the better racing venues on the calendar.",
        viewingExtra: "The sprint format actually helps US viewers here: Friday's sprint qualifying and Saturday's sprint race land in the US evening and overnight windows, so you can treat them as a low-stakes preview and save your energy for Sunday's main event. If you only watch one Shanghai session live, the slipstream games down the back straight make qualifying the pick.",
        faq: [
            {
                q: "Why is the Chinese Grand Prix a sprint weekend in 2026?",
                a: "Shanghai hosts the first of the season's six sprint weekends, meaning a sprint qualifying session on Friday and a roughly 100 km sprint race on Saturday morning (local time) in addition to normal qualifying and the Grand Prix. Points are awarded in both the sprint and the main race."
            }
        ]
    },

    "japan-2026": {
        circuit: [
            "Suzuka was designed in 1962 by Dutch engineer John Hugenholtz as a Honda test track, and it remains the only figure-eight circuit in Formula 1 — the back straight crosses over the first sector on a bridge. The first-sector S-Curves are the section drivers talk about all year: five linked direction changes taken at speeds that leave no room to reset, where a tenth lost at the first apex compounds through every one that follows.",
            "The rest of the lap is just as demanding: the Degner curves arrive blind and punish a wide exit with gravel, the Spoon curve tightens deceptively, and 130R — a left-hander taken at over 300 km/h — remains one of the great tests of commitment in motorsport. Overtaking is hardest here of almost any permanent circuit, which puts enormous weight on Saturday qualifying and makes tire-offset strategies the main route past a rival on Sunday."
        ],
        history: "Suzuka joined the calendar in 1987 and immediately became the sport's title-decider: because Japan traditionally sat near the end of the season, more world championships were settled here than anywhere else, including the infamous Senna-Prost collisions of 1989 and 1990. The passionate, encyclopedically informed Japanese crowd — famous for handmade tributes to every driver on the grid — makes it one of the sport's most beloved stops.",
        viewingExtra: "This is the last overnight race until the Asian rounds return in the fall, so the sleep math gets easier from here. Suzuka rewards the committed viewer: watch qualifying live if you can (Saturday morning US Eastern time falls on Friday night Pacific), because a single flying lap through the S-Curves is the purest demonstration of what a Formula 1 car can do.",
        faq: [
            {
                q: "What makes Suzuka different from other F1 circuits?",
                a: "It's the only figure-eight track on the calendar — the back straight passes over the first sector on a bridge — and its first-sector S-Curves are widely rated by drivers as the most demanding sequence of corners in Formula 1."
            }
        ]
    },

    "miami-2026": {
        circuit: [
            "The Miami International Autodrome loops around Hard Rock Stadium, home of the NFL's Miami Dolphins, on a temporary layout that behaves like a permanent circuit — wide, mostly well-surfaced, and quick. Sector one flows through fast, connected corners where confidence pays; sector two is the polar opposite, a slow, tight chicane complex under the turnpike overpass that drivers routinely compare to a parking lot; and sector three is a long back straight into a heavy braking zone that produces most of the passing.",
            "Three DRS zones and big speed deltas between well- and poorly-exiting cars make Miami better for overtaking than most street-style venues. Florida heat is a real variable: track temperatures over 50°C push tire management to the front of every strategy call, and the 2023 and 2024 editions both turned on who kept their rubber alive longest. With sprint points on Saturday, expect teams to show their hand a day early."
        ],
        history: "Miami joined the calendar in 2022 after years of negotiation over a downtown layout that never materialized, and quickly became one of F1's biggest commercial spectacles — the fake marina with real boats in sector two became an instant meme, and celebrity-packed grids are the norm. On track it has history too: Lando Norris took his first career Grand Prix victory here in 2024, chasing down Max Verstappen after a mid-race safety car.",
        viewingExtra: "Miami and Austin are the two weekends each year when American fans get every session in comfortable daytime hours, and the 2026 sprint format doubles the value: Saturday runs a sprint race at midday Eastern followed by Grand Prix qualifying in the afternoon — the best single day of live F1 TV all season. Sunday's 4 PM Eastern start is practically built for a cookout.",
        faq: [
            {
                q: "Is the Miami Grand Prix good for first-time F1 viewers?",
                a: "Yes — it's one of the most accessible races of the season for US fans: every session is in US daytime hours, the sprint weekend means meaningful action on all three days, and the broadcast leans into explaining the sport for newer American audiences."
            }
        ]
    },

    "canada-2026": {
        circuit: [
            "Circuit Gilles Villeneuve sits on Île Notre-Dame, a man-made island in the St. Lawrence River built for Expo 67, and shares space with the rowing basin from the 1976 Olympics. The layout is pure point-and-shoot: chicanes and hairpins linked by full-throttle blasts, with the wall lining almost every exit. Braking stability and traction matter more here than aerodynamic sophistication, which historically lets scrappier cars punch above their weight.",
            "The final chicane is guarded by the most famous piece of concrete in the sport — the Wall of Champions, so named after Damon Hill, Michael Schumacher, and Jacques Villeneuve (all world champions) crashed there in the 1999 race alone. Add the long back straight's heavy braking zone into the hairpin, frequent safety cars, and Montreal's volatile spring weather, and Canada reliably produces one of the most eventful races of the year."
        ],
        history: "Montreal has hosted the Canadian Grand Prix since 1978, when local hero Gilles Villeneuve won the inaugural race in a Ferrari — the circuit was renamed in his honor after his death in 1982. Its greatest hits include the 2011 race, the longest in F1 history at over four hours of rain delays, won by Jenson Button from last place on the final lap. The 2026 move to May, paired with a first-ever Montreal sprint, is one of the year's biggest schedule experiments.",
        viewingExtra: "Every session lands in comfortable US afternoon and early-evening windows, and because Montreal shares the Eastern time zone, what you see on the schedule is what East Coast viewers get with zero conversion. One 2026-specific note: the date moved from June to late May to pair with Miami and cut Atlantic crossings, so update any calendar habits from previous seasons — better yet, grab the .ics file above.",
        faq: [
            {
                q: "Why did the Canadian Grand Prix move to May in 2026?",
                a: "F1 reorganized the 2026 calendar to group races geographically and reduce back-and-forth travel, moving Montreal from its traditional June date to late May alongside the Miami round. It also becomes a sprint weekend for the first time."
            }
        ]
    },

    "monaco-2026": {
        circuit: [
            "The lap of Monaco is barely 3.3 km, but it packs in more famous corners than circuits twice its length: the uphill charge from Sainte Dévote to Massenet, the blind crest into Casino Square, the tight Fairmont hairpin — the slowest corner in Formula 1, taken at under 50 km/h — the flat-out run through the tunnel, and the harbor-front chicane where the ground drops away under braking. There is no runoff, no margin, and no place to relax for 78 laps.",
            "Overtaking is close to impossible on track — entire races pass without a single genuine pass for position — so the weekend's competitive core is Saturday qualifying, the highest-stakes hour of the season. Race day then becomes a strategy chess match around the pit window, where an ill-timed safety car can hand victory to a midfield car. It's the one weekend where the sport's usual logic inverts: Sunday is the coronation, Saturday is the fight."
        ],
        history: "First run in 1929 and part of the World Championship since its inaugural 1950 season, Monaco is the race every driver wants on their resume, one third of motorsport's unofficial Triple Crown alongside the Indy 500 and Le Mans. Ayrton Senna's six wins remain the record — his 1988 qualifying lap here, over a second faster than teammate Alain Prost in identical machinery, is still spoken of as the greatest lap ever driven. Graham Hill's five wins in the 1960s earned him the nickname 'Mr. Monaco.'",
        viewingExtra: "Monaco opens the European stretch of the calendar, which means a fixed morning routine for US fans through midsummer: lights out mid-morning Eastern, breakfast-time Central, and an early alarm out West. Saturday qualifying is genuinely unmissable here — set the alarm for that even if you plan to catch the race on replay. Our race-weekend format guide explains how the qualifying hour is structured if you're new to it.",
        faq: [
            {
                q: "Why is qualifying more important than the race at Monaco?",
                a: "The streets are so narrow that overtaking is nearly impossible — grid position usually decides the podium. Pole position at Monaco has historically converted to victory more often than at any other circuit, which makes Saturday's qualifying session the real main event of the weekend."
            }
        ]
    },

    "spain-2026": {
        circuit: [
            "Barcelona-Catalunya is the most complete examination on the calendar: a long pit straight into a heavy braking zone, the fast, cambered Turn 3 right-hander that loads the outside tires for seconds at a time, a technical middle sector, and a final sector whose long-duration corners reveal exactly how much downforce a car really has. Engineers say a car that is quick here is quick everywhere, which is why decades of preseason testing happened on this tarmac.",
            "That familiarity cuts both ways for the racing: teams know the circuit so well that setups converge and race pace differences shrink. The main passing opportunity is the DRS run into Turn 1, and track position remains powerful despite layout tweaks that restored the fast final chicane-free corners. Expect strategy — two stops versus three, and when to pull the trigger on an undercut — to decide positions that raw pace can't."
        ],
        history: "Opened in 1991 in the build-up to Barcelona's 1992 Olympics, the Circuit de Barcelona-Catalunya announced itself immediately: its first Grand Prix produced the iconic image of Nigel Mansell and Ayrton Senna running wheel-to-wheel down the front straight, sparks flying, inches apart at 300 km/h. It was also the scene of Max Verstappen's shock maiden win in 2016 — at 18, the youngest Grand Prix winner in history, in his first race for Red Bull.",
        viewingExtra: "Standard European-round timing applies: a 9 AM Eastern / 6 AM Pacific race start on Sunday morning. With Spain hosting two Grands Prix in 2026, think of Barcelona as the form-book race — the track everyone understands, where the true pecking order shows — and September's new Madrid street event as the wildcard. Comparing the two weekends will tell you a lot about which teams adapt fastest.",
        faq: [
            {
                q: "Why are there two Formula 1 races in Spain in 2026?",
                a: "Barcelona keeps the traditional Spanish Grand Prix in June while the brand-new Madring circuit in Madrid debuts in September as the Madrid Grand Prix. 2026 is the first season both Spanish venues appear on the calendar together."
            }
        ]
    },

    "austria-2026": {
        circuit: [
            "The Red Bull Ring is a sprint up and down a Styrian hillside: just ten corners, four real straights, and around 65 seconds of lap time, with 60 meters of elevation change packed in. Three heavy braking zones — Turn 1, the steep climb to Turn 3, and the downhill entry to Turn 4 — are all genuine overtaking spots, which is rare for a modern circuit and keeps the racing honest.",
            "Short laps compress everything: qualifying gaps are measured in hundredths, traffic management becomes an art form, and a 20-second penalty can drop a driver half the field. The final two corners, both fast right-handers with unforgiving gravel and track-limit sensors, decide most flying laps and generate an annual bonfire of deleted times. The thin mountain air also mildly stresses cooling, punishing teams that cut their radiator openings too aggressively."
        ],
        history: "This hillside has hosted three eras of Austrian motorsport: the fearsome Österreichring of the 1970s — one of the fastest tracks ever used in F1 — the shortened A1-Ring of the late 1990s, and the current Red Bull Ring, rebuilt and reopened by the energy-drink company in 2014. The 2026 edition carries extra weight locally: it's the spiritual home race of Red Bull's F1 operation, and orange-clad Verstappen fans have adopted it as a second home Grand Prix.",
        viewingExtra: "Sunday morning viewing in the US, in line with the rest of the European summer. The Red Bull Ring's TV product is unusually good for nervous watchers: the whole lap fits in one broadcast minute, gaps are easy to read, and the three braking zones mean a battle rarely stays unresolved for long. Keep an eye on track-limit rulings at the final two corners — they have decided podiums here more than once.",
        faq: [
            {
                q: "How long is a lap of the Red Bull Ring?",
                a: "At 4.318 km with only ten corners, it's one of the shortest laps in F1 — pole position times run barely over a minute, and the field completes 71 laps on race day."
            }
        ]
    },

    "britain-2026": {
        circuit: [
            "Silverstone's character comes from its origins as a WWII bomber airfield: wide, open, exposed to the wind, and blisteringly fast. The Maggotts-Becketts-Chapel sequence is its crown jewel — a snaking chain of direction changes entered at over 290 km/h where a modern F1 car pulls 5g, and where the difference between a great car and a good one is visible to the naked eye. Copse, Stowe, and Abbey add three more corners most circuits would headline.",
            "For 2026 the weekend carries a sprint, so the classic Silverstone variables — wind direction changing corner speeds hour to hour, and weather fronts marching across the Midlands — get two races to interfere with instead of one. The Hangar Straight into Stowe and the Wellington Straight into Brooklands offer real overtaking, and the enormous, knowledgeable crowd generates an atmosphere only Monza rivals."
        ],
        history: "Silverstone hosted the first-ever Formula 1 World Championship race on May 13, 1950, won by Giuseppe Farina for Alfa Romeo in front of the royal family. It has anchored the British Grand Prix ever since, and its modern history belongs largely to Lewis Hamilton, whose record haul of home victories — including a win on three wheels in 2020 after a last-lap puncture — made the Silverstone crowd's annual pilgrimage part of the sport's fabric.",
        viewingExtra: "The 2026 schedule hands American fans a holiday gift: the sprint race runs on the morning of July 4th, with the Grand Prix following on Sunday July 5th at 10 AM Eastern / 7 AM Pacific. That's a legitimate Independence Day weekend double-header without a single late night. British weather is the wildcard worth planning around — a forecast shower turns Silverstone into the best racing of the season.",
        faq: [
            {
                q: "Was Silverstone really the first Formula 1 race ever?",
                a: "Yes — the 1950 British Grand Prix at Silverstone on May 13, 1950 was the first round of the inaugural Formula 1 World Championship, won by Giuseppe Farina for Alfa Romeo. The 2026 race continues the longest-running national Grand Prix in the sport."
            }
        ]
    },

    "belgium-2026": {
        circuit: [
            "Spa-Francorchamps runs through the Ardennes forest on public roads first used for racing in the 1920s, and at 7.004 km it remains the longest lap of the season — so long that rain regularly falls on one sector while another stays bone dry. Eau Rouge and Raidillon form the most famous corner combination in motorsport: a compression at the bottom of a valley followed by a blind, flat-out climb the height of a five-story building.",
            "The racing works because of what follows: the long Kemmel straight gives anyone who carries speed through Raidillon a slipstream run into the Les Combes chicane, the season's most reliable overtaking zone. Pouhon's double-apex left tests downforce like few corners anywhere, and the Bus Stop chicane funnels the field into a last-gasp passing chance. Low-drag versus high-downforce setup choices split the field every year and keep the racing unpredictable."
        ],
        history: "A World Championship venue since the very first 1950 season, Spa has produced more folklore than perhaps any circuit: the original 14 km road course where Fangio and Clark raced between farmhouses, the 1998 pileup that eliminated 13 cars at La Source, and the four-decade dominance of masters like Schumacher — who debuted here in 1991 and won six times. Its blend of speed, elevation, and Ardennes weather is why drivers consistently vote it the best circuit in the world.",
        viewingExtra: "A 9 AM Eastern Sunday start, mid-summer — comfortable on the East Coast, an early alarm out West. Watch with a weather radar open: Spa microclimates are genuinely part of the sport, and the transition laps when rain arrives at one corner of the circuit before the rest are some of the most skilled minutes of driving you'll see all year. Belgium is the classic answer to 'which race should a new fan watch first?'",
        faq: [
            {
                q: "Why is Spa considered the best track in Formula 1?",
                a: "It combines the longest lap on the calendar, over 100 meters of elevation change, the legendary Eau Rouge-Raidillon corner sequence, genuine overtaking on the Kemmel straight, and famously unpredictable Ardennes weather. Driver polls routinely rank it #1."
            }
        ]
    },

    "hungary-2026": {
        circuit: [
            "The Hungaroring sits in a natural bowl outside Budapest, which gives spectators a rare treat — most of the lap is visible from a single hillside — and gives drivers no rest at all. Fourteen corners arrive in relentless succession with only one real straight, coating the cars in the dust that blows across the little-used circuit and making the track evolve constantly through the weekend.",
            "July heat is the defining variable: track temperatures regularly exceed 50°C, turning the race into a tire-preservation exercise and making the pit-stop windows the primary battlefield. The undercut is more powerful here than almost anywhere, so watch the timing screens around the stops — races at the Hungaroring are won and lost in the two laps either side of them. Qualifying carries near-Monaco weight, since following another car closely through the endless corner sequence overheats tires within laps."
        ],
        history: "The 1986 Hungarian Grand Prix was the first World Championship race held behind the Iron Curtain, drawing an estimated 200,000 spectators, and Hungary has kept its calendar slot ever since. For a track where overtaking is famously hard, it has a strange gift for firsts and upsets: Damon Hill nearly won in an Arrows in 1997, Jenson Button took his maiden win in the wet chaos of 2006, and Esteban Ocon scored his first victory here in 2021.",
        viewingExtra: "Sunday morning US viewing once more — and note this is the final race before F1's mandatory summer shutdown, with nothing on track until the Dutch Grand Prix in late August. If the championship gap is tight going in, teams throw development everything at this weekend; if it's not, watch the midfield, where the Hungaroring's equalizing layout regularly lets a slower car hold off a faster one for 70 laps.",
        faq: [
            {
                q: "Why is the Hungarian Grand Prix called 'Monaco without walls'?",
                a: "Like Monaco, the Hungaroring is slow, narrow, and nearly impossible to overtake on — track position and strategy decide the race. The difference is generous runoff instead of barriers, so mistakes cost time rather than ending races."
            }
        ]
    },

    "netherlands-2026": {
        circuit: [
            "Zandvoort is an old-school rollercoaster through the North Sea dunes, and its 2020 renovation added the feature that defines it today: the final corner, the Arie Luyendyk Bocht, banked at 18 degrees — steeper than most NASCAR ovals — which lets cars carry huge speed onto the pit straight and was designed specifically to make the DRS run into Turn 1 a real overtaking chance. The Hugenholtz hairpin behind the pits is banked too, rewarding cars that can ride the camber.",
            "The circuit is narrow and mistakes are expensive — the dunes funnel sand onto the racing line, grip changes with every gust of wind off the sea, and the blind crests hide apexes all lap long. As a sprint weekend in 2026 with points available Saturday and Sunday, and with the whole venue drenched in orange smoke from the Dutch crowd, it's the loudest and most compact party on the calendar."
        ],
        history: "Zandvoort hosted the Dutch Grand Prix through F1's golden eras — Jim Clark won four times in the 1960s, and Niki Lauda took the last race of the original run in 1985 — before a 36-year absence ended in 2021 on the back of Max Verstappen mania. Verstappen duly won the first three revived editions in front of his home crowd. The 2026 race is a poignant one: it is scheduled to be Zandvoort's final Grand Prix for the foreseeable future, with the event leaving the calendar after this season.",
        viewingExtra: "F1 returns from its summer break here, with the sprint format easing everyone back in: Friday's sprint qualifying lands in the US morning, and both the Saturday sprint and Sunday Grand Prix start at 9 AM Eastern / 6 AM Pacific. With 2026 set to be the last Dutch Grand Prix for now, and a home crowd that treats every Verstappen lap like a goal in a World Cup final, this one is worth the early Sunday alarm.",
        faq: [
            {
                q: "Is 2026 really the last Dutch Grand Prix?",
                a: "Zandvoort's organizers announced that the Dutch Grand Prix will leave the F1 calendar after the 2026 edition, making this scheduled as the final race at the seaside circuit for the foreseeable future."
            }
        ]
    },

    "italy-2026": {
        circuit: [
            "Monza is about one thing: velocity. Cars run their skinniest wings of the season, spend around 80% of the lap at full throttle, and touch 360 km/h before the braking zones for the two chicanes — which, at 5g of deceleration, are among the hardest brake applications in the sport. The Curva Grande, the Lesmo rights, the Ascari chicane and the long Parabolica that sweeps onto the pit straight complete a lap that has barely changed in a century.",
            "Low downforce makes the cars skittish and braking-zone mistakes common, while the slipstream is so powerful that leading a qualifying lap is a disadvantage — expect the traditional tow-trading chess match in Q3, where teams stack their cars like cyclists in a sprint train. In the race, the run from the start line to the first chicane is one of the longest of the year, and the leader into Turn 1 is very often not the polesitter."
        ],
        history: "Built in 1922 in a royal park outside Milan, Monza is the oldest circuit on the calendar and has hosted the Italian Grand Prix in every World Championship season but one. Its abandoned banking still looms in the trees as a monument to a more dangerous age. The tifosi — Ferrari's fanatical supporters — define the event: when a Ferrari wins at Monza, the crowd storms the track beneath the podium in a sea of red flags, a spectacle unmatched anywhere in world sport.",
        viewingExtra: "A 9 AM Eastern Sunday start. Above all, watch the start live: the 600-meter drag from the lights to the first chicane routinely reshuffles the podium in eight seconds, and opening-lap chaos at the chicanes is practically a Monza tradition. If the title fight is close, Saturday's qualifying tow games — teams timing their laps to catch a slipstream without giving one — are half the weekend's entertainment on their own.",
        faq: [
            {
                q: "Why is Monza called the Temple of Speed?",
                a: "It's the fastest circuit in Formula 1 — cars average over 250 km/h for a full lap, spend about 80% of the lap flat out, and hit their highest top speeds of the season. It's also the oldest track on the calendar, in continuous use since 1922."
            }
        ]
    },

    "madrid-2026": {
        circuit: [
            "The Madring is 2026's great unknown: a 5.47 km hybrid circuit around the IFEMA exhibition center on Madrid's northeastern edge, mixing purpose-built sections with public roads. Its signature is a huge, steeply banked left-hander — nicknamed 'La Monumental' — that wraps around an arena and is unlike anything else on the calendar, plus a 22-corner layout with significant elevation change and a long full-throttle stretch for overtaking.",
            "Nobody has meaningful data: teams arrive with simulator models built from survey maps, drivers learn the track on foot and in the sim, and the first practice laps of the weekend will be genuine exploration. History says new street-style venues produce green, evolving track surfaces, close walls, safety cars, and at least one strategy gamble that steals a podium. Expect qualifying to overdeliver on drama — nobody knows where the limit is until someone finds it the hard way."
        ],
        history: "Madrid last hosted Formula 1 at the Jarama circuit north of the city, home of the Spanish Grand Prix on and off until 1981 — Gilles Villeneuve's famous last win, holding off a four-car train for 60 laps, happened there. The 2026 Madrid Grand Prix brings the World Championship back to the capital after 45 years, on a ten-year contract that signals F1's continued bet on destination street events in major cities.",
        viewingExtra: "Standard European timing: 9 AM Eastern / 6 AM Pacific on Sunday morning. For a first-ever race at a new circuit, the earlier sessions are unusually worth your time — Friday practice (US morning) is where you'll learn the track alongside the drivers, and a new-venue qualifying session almost always produces at least one shock result. Treat the whole weekend as appointment viewing; first editions only happen once.",
        faq: [
            {
                q: "Is the Madrid Grand Prix replacing the Spanish Grand Prix in Barcelona?",
                a: "Not in 2026 — both races run this season. Barcelona hosts the Spanish Grand Prix in June and Madrid debuts the Madrid Grand Prix in September, giving Spain two rounds of the same championship."
            }
        ]
    },

    "azerbaijan-2026": {
        circuit: [
            "Baku is two circuits welded together. The castle section climbs through the UNESCO-listed old town on cobble-adjacent streets so narrow — 7.6 meters at the tightest point — that a single mistake blocks the entire track. Then the layout tumbles back downhill onto the Caspian seafront for a 2.2 km full-throttle run to the line that is, in effect, the longest overtaking zone in Formula 1, with cars reaching 350 km/h in the tow.",
            "That combination breaks races open: teams must choose between the downforce the old town demands and the slippery straight-line speed the seafront rewards, and nobody gets both. Safety cars and restarts are near-certainties, and Baku restarts are uniquely explosive because the pack reaches the braking zone for Turn 1 four-wide. The 2026 edition adds a twist — a Thursday-to-Saturday schedule with the race on Saturday."
        ],
        history: "F1 first came to Baku in 2016, and the circuit wasted no time building a reputation for anarchy: the 2017 race featured Sebastian Vettel driving into Lewis Hamilton under the safety car and a Lance Stroll podium at 18; in 2018 the Red Bulls crashed into each other; and in 2021 Max Verstappen's tire exploded while leading with five laps left, followed by Hamilton locking up from the restart lead. No venue delivers chaos more reliably per race held.",
        viewingExtra: "Two scheduling quirks to burn into your calendar: the race is on Saturday, not Sunday, and it starts in the early morning hours for US viewers — 7 AM Eastern, 4 AM Pacific. Grab the .ics calendar file above rather than trusting habit. If you record it, stay off social media at all costs: Baku races are decided in the final five laps more often than the first fifty.",
        faq: [
            {
                q: "Why is the 2026 Azerbaijan Grand Prix on a Saturday?",
                a: "Baku runs a Thursday-to-Saturday schedule in 2026, with practice Thursday, qualifying Friday, and the Grand Prix on Saturday September 26 — one of only two Saturday championship races on the calendar alongside Las Vegas."
            }
        ]
    },

    "singapore-2026": {
        circuit: [
            "Marina Bay is F1's original night race and still its most physically brutal: 62 laps between concrete walls in 30°C heat and 90% humidity, with cockpit temperatures topping 50°C. Drivers lose up to three kilograms over a race distance and describe the final 20 laps as an exercise in pure willpower. The 2023 layout revision removed four corners along the waterfront, but 19 remain, most of them 90-degree street corners with no forgiveness.",
            "The 2026 sprint format is a fascinating stress test — two races' worth of physical punishment in one weekend at the season's most demanding venue. Safety cars have appeared in the overwhelming majority of Singapore races, so strategy teams treat an interruption as a certainty to plan around rather than a possibility. Under the floodlights the cars run in cooler evening air than a day race would give, but the humidity never relents."
        ],
        history: "The 2008 Singapore Grand Prix was the first night race in World Championship history, and its inaugural edition became infamous: Nelson Piquet Jr.'s deliberate crash — engineered to hand teammate Fernando Alonso the win — surfaced a year later as the 'Crashgate' scandal. On the sporting side, Singapore is where Sebastian Vettel and Lewis Hamilton traded era-defining wins, and where in 2023 Carlos Sainz ended Red Bull's record streak of consecutive victories.",
        viewingExtra: "Singapore's night race translates to genuinely civilized US viewing: the Grand Prix goes green at 8 AM Eastern on Sunday morning, with Saturday's sprint and qualifying in the same morning window. The floodlit skyline broadcast is the most beautiful of the year — this is the race to put on the big screen. Just remember Singapore has no daylight saving, so the offset shifts an hour when US clocks change in early November (after this race, conveniently).",
        faq: [
            {
                q: "Why is the Singapore Grand Prix held at night?",
                a: "The race runs under floodlights at 8 PM local time primarily so it airs in prime European viewing hours — and it has the side benefit of slightly cooler track conditions. It was Formula 1's first-ever night race in 2008."
            }
        ]
    },

    "austin-2026": {
        circuit: [
            "Circuit of the Americas opens with the most dramatic first corner in modern F1: a 40-meter climb to a blind, banked left-hand hairpin where the entire field funnels uphill on lap one. From there the track quotes the world's greats — an S-curve sequence inspired by Suzuka's Esses, a Hockenheim-style stadium section, and a multi-apex triple right modeled on Istanbul's Turn 8 — before a kilometer-long back straight delivers the lap's second guaranteed overtaking zone.",
            "COTA races tend to be strategy-rich: the abrasive surface and the long, loaded esses work the tires hard, two- and three-stop races both stay live, and the twin overtaking zones (Turn 1 and Turn 12) mean a faster car on fresher rubber can actually use its advantage. Bumps in the surface — a consequence of building on expansive Texas clay — add a physical dimension drivers grumble about and fans quietly enjoy."
        ],
        history: "Austin rescued the United States Grand Prix. After decades of wandering — ten different US venues had hosted F1, from Watkins Glen to a parking lot in Las Vegas — COTA opened in 2012 as America's first purpose-built F1 circuit, and Lewis Hamilton won a duel with Sebastian Vettel in its inaugural race. It became the sport's American heartland years before the Netflix boom, and now regularly draws over 400,000 fans across a race weekend, the biggest attendance on the calendar.",
        viewingExtra: "Peak time-zone comfort: the race starts at 3 PM Central — Austin's home zone — which is 4 PM Eastern and 1 PM Pacific, with every support session in daytime hours. COTA opens the season's Americas triple-header, with Mexico City and São Paulo following on consecutive weekends, so this stretch of the calendar is the most US-viewer-friendly month of the year. Lap one into Turn 1 is the single best start of the season; don't be late.",
        faq: [
            {
                q: "What is the famous first corner at COTA?",
                a: "Turn 1 is a blind left-hand hairpin at the top of a 40-meter climb from the start line — drivers brake uphill into a corner they can't see. On lap one, with 20 cars arriving together, it produces more position changes than almost any single corner in F1."
            }
        ]
    },

    "mexico-2026": {
        circuit: [
            "The Autódromo Hermanos Rodríguez sits at 2,200 meters above sea level, and the thin air — about 25% less dense than at sea level — warps every engineering assumption: wings produce Monza levels of downforce at maximum settings, brakes and power units run desperately hot, and the reduced drag makes the 1.2 km run to Turn 1 one of the fastest top-speed zones of the year despite the maximum-downforce setups.",
            "The lap's emotional core is the Foro Sol stadium section, where the track threads through a baseball arena packed with fans whose roar reaches the cockpits over the engines. The esses of the middle sector reward rhythm, while the flat-out kink through the old Peraltada's remnant tests commitment. Braking into Turn 1 after the enormous straight is the overtaking zone — and, on lap one, reliably the scene of contact as cars arrive four-wide with cold brakes biting unevenly in the thin air."
        ],
        history: "Named after Mexico's racing brothers Ricardo and Pedro Rodríguez — both lost to the sport young — the circuit first hosted F1 in 1963, and its modern revival in 2015 turned the race into a carnival that regularly wins F1's award for best-promoted event. The altitude has always shaped its stories: turbo cars thrived here in the 1980s, and the 2016-2018 editions saw championships clinched in the stadium's roar as Lewis Hamilton twice sealed titles mid-race.",
        viewingExtra: "The race starts at 2 PM local time, which lands at 3 PM Eastern / noon Pacific on Sunday — the middle weekend of the Americas triple-header and another zero-effort watch for US fans. Note that US clocks fall back the same weekend as this race in 2026, so double-check your calendar app against the times above (the .ics file handles the shift automatically). Watch the temperature graphics: brake cooling is a genuine retirement risk here.",
        faq: [
            {
                q: "How does Mexico City's altitude affect the race?",
                a: "At 2,200 meters, the air is roughly a quarter thinner than at sea level. Cars run maximum-downforce wings that behave like low-downforce ones, engines and brakes struggle for cooling, and top speeds on the main straight are among the highest of the season despite the big wings."
            }
        ]
    },

    "brazil-2026": {
        circuit: [
            "Interlagos packs remarkable variety into 4.3 anti-clockwise kilometers: the plunging Senna S at Turn 1 — downhill, off-camber, and the best overtaking zone in South America — a long, flat-out drink of a back section, and a climbing final sector that slingshots cars onto a pit straight where the tow decides everything. Anti-clockwise running loads drivers' neck muscles the 'wrong' way, an old-school test few modern circuits pose.",
            "The weather rolling off the surrounding hills is a genuine competitor: storms build over the circuit with minutes of warning, and Interlagos in mixed conditions is arguably the best racing spectacle in the sport. The compact lap keeps the field bunched, the crowd noise carries onto the broadcast, and slower cars can genuinely defend here — which is why so many of the sport's great comeback drives happened on this patch of São Paulo."
        ],
        history: "Interlagos is where championships come to be decided: Emerson Fittipaldi and José Carlos Pace (for whom the circuit is officially named) won its first F1 races in the 1970s, Ayrton Senna scored his cathartic home win in 1991 while stuck in sixth gear, and the 2008 finale — Lewis Hamilton snatching the title from Felipe Massa at the final corner of the final lap — remains the most dramatic conclusion in the sport's history. Max Verstappen's 2024 charge from 17th in the rain joined the legend instantly.",
        viewingExtra: "São Paulo is only two hours ahead of US Eastern time in November, so the race starts at a luxurious 11 AM Eastern / 8 AM Pacific on Sunday — the friendliest 'overseas' race of the year for American viewers. If the 2026 title fight is still mathematically alive, history says this is where it detonates: clear your Sunday morning and watch live, because Interlagos with championship stakes is the sport at its best.",
        faq: [
            {
                q: "Why do so many championships get decided at Interlagos?",
                a: "The Brazilian round traditionally sits near the end of the season, and the circuit's unpredictable weather, close racing, and frequent safety cars make it hard for points leaders to play it safe — producing legendary deciders like the 2008 Hamilton-Massa finale."
            }
        ]
    },

    "las-vegas-2026": {
        circuit: [
            "The Las Vegas Strip Circuit is built for top speed: 6.2 km of boulevard including a 1.9 km blast down the Strip itself, past the Sphere, Caesars Palace, and the Bellagio fountains, where cars exceed 340 km/h at night in the desert. The layout's 17 corners are mostly 90-degree street intersections, putting a premium on braking stability and traction rather than aerodynamic finesse.",
            "November desert nights are cold — often below 15°C — and that's the circuit's secret variable: tires fall out of their operating window on every safety car and struggle to warm up for restarts, keeping the field artificially close and the racing scrappy. The long straights make DRS overtaking almost routine, so track position matters less than tire temperature management, a complete inversion of the usual street-race logic."
        ],
        history: "F1 first raced in Las Vegas in 1981 and 1982 in the Caesars Palace parking lot — a forgettable venue that nonetheless decided the 1981 title. The 2023 return as a night race down the Strip was an entirely different scale of production: the sport's biggest promotional bet of the modern era, complete with a purpose-built pit building. After a rocky first practice (a loose drain cover), the race itself overdelivered, and the event has settled in as the sport's flagship US spectacle.",
        viewingExtra: "This is the one for American prime time: the race starts Saturday at 8 PM Pacific / 11 PM Eastern — F1's only true US evening broadcast slot. West Coast fans get the perfect Saturday night; East Coast fans face a midnight-adjacent finish, so plan the Sunday morning replay if you can't hang. Friday qualifying runs late into the Pacific night. Remember: no Sunday race this weekend — everything wraps Saturday.",
        faq: [
            {
                q: "Why is the Las Vegas Grand Prix on Saturday night?",
                a: "The Saturday 8 PM Pacific start puts the race in US prime time and lets the Strip's lights do the broadcast work — it's the only race of the 2026 season scheduled as a Saturday night event in the US, and there is no Sunday running at all."
            }
        ]
    },

    "qatar-2026": {
        circuit: [
            "Lusail was built in 2004 as a motorcycle Grand Prix venue, and its DNA shows: long, fast, cambered corners that flow into one another with barely a straight to rest on, originally drawn for bikes that need sweeping lines. In an F1 car that translates into sustained high-G loading, lap after lap, with the fast triple-apex section before the main straight punishing tires more severely than almost any sequence on the calendar.",
            "The desert night race conditions — cooler air, floodlights, occasional sand on the surface off-line — combine with the layout's relentless corner speeds to make this the season's biggest physical test alongside Singapore. Tire degradation dominates strategy; mandatory stint limits have even been imposed here in past seasons on safety grounds. Watch the gap between drivers who manage the rubber and those who burn it: three-stop races are genuinely live at Lusail."
        ],
        history: "Lusail hosted its first F1 race in 2021 as a late calendar addition, with Lewis Hamilton winning from pole. Its short history is already eventful: Max Verstappen clinched his third world title here during the 2023 sprint, and that same weekend's extreme heat and humidity pushed drivers to physical collapse, prompting rule changes around cockpit cooling. Moved to a cooler November-December slot, the penultimate round of 2026 could easily host a title decider.",
        viewingExtra: "The floodlit race translates to Sunday morning US viewing: 11 AM Eastern / 8 AM Pacific — one of the friendlier 'flyaway' starts of the year. As the penultimate round, the stakes tend to be arithmetic: watch with the championship permutations handy, because a title can be clinched here. The onboard shots through Lusail's fast sweeps at night are some of the most spectacular footage of the season.",
        faq: [
            {
                q: "Why is the Qatar Grand Prix so physically demanding?",
                a: "Lusail's MotoGP-derived layout strings together fast, high-G corners with almost no straights to recover on, and desert heat lingers even at night. Drivers have rated it the toughest race of the year physically, alongside Singapore."
            }
        ]
    },

    "abu-dhabi-2026": {
        circuit: [
            "Yas Marina was built as F1's showpiece finale venue: a twilight race that starts in desert daylight and finishes under floodlights, with the pit exit tunneling beneath the track and the LED-skinned W Hotel straddling the final sector. The 2021 layout revisions — replacing a fiddly chicane with a sweeping banked hairpin and opening up the marina section — transformed it from processional to genuinely raceable, with two long straights feeding heavy braking zones.",
            "As the season finale, the sporting mechanics are unique: this is where every tiebreaker lands, from the drivers' title down to the constructors' midfield positions that swing tens of millions in prize money. Teams empty their upgrade cupboards and their fuel of caution. The setting sun also changes track temperature significantly mid-race, shifting tire behavior between the first stint and the last — a subtle variable that has flipped strategies here more than once."
        ],
        history: "The finale slot has made Yas Marina's short history disproportionately dramatic: the 2010 four-way title decider that crowned Sebastian Vettel, and above all the 2021 finale — Verstappen versus Hamilton, equal on points, decided on a final-lap restart that remains the most contested single lap in the sport's history. Since opening in 2009 it has grown into F1's traditional farewell weekend, where retiring drivers take their last laps and the champagne lasts until winter.",
        viewingExtra: "The season signs off with a Sunday 8 AM Eastern / 5 AM Pacific start — one last early alarm, then nothing until March 2027. Even in years when the drivers' title is settled, the finale rewards watching: constructors' positions worth serious prize money are usually live into the final laps, and the twilight transition makes for gorgeous television. Thanks for following along all season — see you at the 2027 opener.",
        faq: [
            {
                q: "Why does the Abu Dhabi Grand Prix start at twilight?",
                a: "The 5 PM local start is timed so the race begins in daylight and ends under floodlights — a deliberate showcase for the Yas Marina setting, and a comfortable evening slot for the trackside crowd. For US viewers it means a Sunday morning start."
            }
        ]
    }
};

// Node (generator) export — this file is never loaded by browsers
if (typeof module !== "undefined" && module.exports) {
    module.exports = { RACE_CONTENT };
}
