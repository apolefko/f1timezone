/* ============================================================
   F1 Timezone — current drivers & teams
   ============================================================
   Node-only file consumed by tools/generate-site.js, which turns
   it into /drivers.html (plus its sitemap entry).

   MAINTENANCE: when the grid changes (a substitution starts or
   ends, a seat changes hands), edit the entries below, bump
   DRIVERS_UPDATED, then run:  node tools/generate-site.js

   Teams are listed alphabetically on purpose — no stale
   championship-order claims to maintain mid-season.
   ============================================================ */

const DRIVERS_UPDATED = "2026-09-12";

// One optional `standIn` per team: someone currently racing in place of a
// listed full-season driver. A full-season driver with `status` text is
// shown with that note (injured, deputizing elsewhere, etc.).
const TEAMS = [
    {
        name: "Alpine",
        engine: "Mercedes power unit",
        drivers: [
            { name: "Pierre Gasly", number: 10, country: "France" },
            { name: "Franco Colapinto", number: 43, country: "Argentina" }
        ]
    },
    {
        name: "Aston Martin",
        engine: "Honda power unit",
        drivers: [
            { name: "Fernando Alonso", number: 14, country: "Spain" },
            { name: "Lance Stroll", number: 18, country: "Canada" }
        ]
    },
    {
        name: "Audi",
        engine: "Audi power unit (works team)",
        drivers: [
            { name: "Nico Hülkenberg", number: 27, country: "Germany" },
            { name: "Gabriel Bortoleto", number: 5, country: "Brazil" }
        ]
    },
    {
        name: "Cadillac",
        engine: "Ferrari power unit",
        drivers: [
            { name: "Sergio Pérez", number: 11, country: "Mexico" },
            { name: "Valtteri Bottas", number: 77, country: "Finland" }
        ]
    },
    {
        name: "Ferrari",
        engine: "Ferrari power unit (works team)",
        drivers: [
            { name: "Charles Leclerc", number: 16, country: "Monaco" },
            { name: "Lewis Hamilton", number: 44, country: "United Kingdom" }
        ]
    },
    {
        name: "Haas",
        engine: "Ferrari power unit",
        drivers: [
            { name: "Esteban Ocon", number: 31, country: "France" },
            { name: "Oliver Bearman", number: 87, country: "United Kingdom" }
        ]
    },
    {
        name: "McLaren",
        engine: "Mercedes power unit",
        drivers: [
            { name: "Lando Norris", number: 1, country: "United Kingdom", champion: true },
            { name: "Oscar Piastri", number: 81, country: "Australia" }
        ]
    },
    {
        name: "Mercedes",
        engine: "Mercedes power unit (works team)",
        drivers: [
            { name: "George Russell", number: 63, country: "United Kingdom" },
            { name: "Kimi Antonelli", number: 12, country: "Italy" }
        ]
    },
    {
        name: "Racing Bulls",
        engine: "Red Bull Ford power unit",
        drivers: [
            {
                name: "Liam Lawson", number: 30, country: "New Zealand",
                status: "Temporarily promoted to Red Bull Racing to cover Isack Hadjar's injury"
            },
            { name: "Arvid Lindblad", number: 41, country: "United Kingdom", rookie: true }
        ],
        standIn: {
            name: "Yuki Tsunoda", number: 22, country: "Japan",
            note: "Red Bull's test & reserve driver is back on the grid: with Hadjar injured and Lawson promoted to Red Bull, Tsunoda has taken over the second Racing Bulls seat since the Dutch Grand Prix — his third straight race weekend at the Spanish GP in Madrid."
        }
    },
    {
        name: "Red Bull Racing",
        engine: "Red Bull Ford power unit (works team)",
        drivers: [
            { name: "Max Verstappen", number: 3, country: "Netherlands" },
            {
                name: "Isack Hadjar", number: 6, country: "France",
                status: "Sidelined since the Dutch Grand Prix with a wrist injury; Liam Lawson is deputizing"
            }
        ]
    },
    {
        name: "Williams",
        engine: "Mercedes power unit",
        drivers: [
            { name: "Alexander Albon", number: 23, country: "Thailand" },
            { name: "Carlos Sainz", number: 55, country: "Spain" }
        ]
    }
];

// Node (generator) export — this file is never loaded by browsers
if (typeof module !== "undefined" && module.exports) {
    module.exports = { TEAMS, DRIVERS_UPDATED };
}
