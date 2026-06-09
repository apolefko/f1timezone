/* ============================================================
   F1 Timezone — MONETIZATION CONFIG + LOADER
   ============================================================

   ┌──────────────────────────────────────────────────────────┐
   │  THIS IS THE ONLY FILE YOU EDIT TO TURN ADS ON.          │
   │                                                          │
   │  1. In the Monetag dashboard, create a zone using a      │
   │     NON-INTRUSIVE format only (e.g. In-Page Push /       │
   │     native banner). NEVER paste a Multitag, Popunder,    │
   │     Vignette or Interstitial tag here — that's the       │
   │     format that was disabled on purpose.                 │
   │  2. The dashboard gives you a tag like:                  │
   │       <script src="https://SOMETHING/tag.js"             │
   │               data-zone="1234567" async></script>        │
   │     Copy the script URL into `src` and the zone number   │
   │     into `zone` for the slot you want to fill.           │
   │  3. Leave `zone` empty ("") to keep a slot hidden —      │
   │     empty slots take up no space on the page.            │
   └──────────────────────────────────────────────────────────┘
*/

// If all your zones share one script URL, set it once here and
// leave the per-slot `src` empty.
const MONETAG_DEFAULT_SRC = "";

const MONETAG_ZONES = {
    // Homepage: under the countdown, above the schedule (728x90 / 300x250)
    "home-top":    { zone: "", src: "" },
    // Homepage: below the schedule, above the fan-gear section
    "home-bottom": { zone: "", src: "" },
    // Race pages: between the session times and the circuit guide
    "race-mid":    { zone: "", src: "" },
    // Race pages: bottom of page, above the footer
    "race-bottom": { zone: "", src: "" }
};

/* ------------------------------------------------------------
   AFFILIATE SLOTS — paste your affiliate URLs here.
   A slot stays hidden until `url` is filled in.
   Suggested programs that fit this audience:
     - "watch": VPN / streaming access (how-to-watch intent
       pairs perfectly with what-time-is-the-race searches)
     - "gear": F1 merch & LEGO/scale models (Amazon Associates
       or an F1 store affiliate program)
   ------------------------------------------------------------ */
const AFFILIATE_SLOTS = {
    "watch": {
        url: "",
        heading: "Stream Every Session",
        body: "Watch practice, qualifying and the race live from anywhere.",
        cta: "How to Watch"
    },
    "gear": {
        url: "",
        heading: "Race Day Gear",
        body: "Team caps, scale models and LEGO F1 sets for race Sunday.",
        cta: "Shop Fan Gear"
    }
};

/* ------------------------------------------------------------
   Loader — no need to edit below this line.
   Containers are hidden by default; a slot is revealed (with
   its space reserved via CSS min-height, so the layout never
   shifts when the ad loads) only when it has a zone configured.
   ------------------------------------------------------------ */
(function () {
    document.querySelectorAll("[data-ad-slot]").forEach(function (el) {
        const cfg = MONETAG_ZONES[el.dataset.adSlot];
        const src = cfg && (cfg.src || MONETAG_DEFAULT_SRC);
        if (!cfg || !cfg.zone || !src) return;

        el.hidden = false;
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.setAttribute("data-zone", cfg.zone);
        s.setAttribute("data-cfasync", "false");
        (el.querySelector(".ad-frame") || el).appendChild(s);
    });

    let anyAffiliate = false;
    document.querySelectorAll("[data-affiliate-slot]").forEach(function (el) {
        const cfg = AFFILIATE_SLOTS[el.dataset.affiliateSlot];
        if (!cfg || !cfg.url) return;

        anyAffiliate = true;
        el.hidden = false;
        el.querySelector(".affiliate-heading").textContent = cfg.heading;
        el.querySelector(".affiliate-body").textContent = cfg.body;
        const link = el.querySelector(".product-link");
        link.textContent = cfg.cta;
        link.href = cfg.url;
        link.rel = "sponsored nofollow noopener";
        link.target = "_blank";
    });

    // The whole fan-gear section only appears if at least one
    // affiliate slot is live.
    const section = document.querySelector("[data-affiliate-section]");
    if (section && anyAffiliate) section.hidden = false;
})();
