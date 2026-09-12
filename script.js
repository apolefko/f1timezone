// F1 Timezone — homepage logic.
// Race data lives in race-data.js (loaded before this script).
const races = SEASON.races;

const US_ZONES = ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'];
const ZONE_NAMES = { 'America/New_York': 'Eastern', 'America/Chicago': 'Central', 'America/Denver': 'Mountain', 'America/Los_Angeles': 'Pacific' };

function storedTimezone() {
    try { return localStorage.getItem('selectedTimezone'); } catch (e) { return null; }
}

// Map the device's zone onto one of the four US zones by current UTC
// offset, so Detroit, Phoenix, Boise etc. land on the right column too.
function detectUsZone() {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!tz) return null;
        if (US_ZONES.includes(tz)) return tz;
        const offsetOf = zone => new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'longOffset' })
            .formatToParts(new Date()).find(p => p.type === 'timeZoneName').value;
        const mine = offsetOf(tz);
        return US_ZONES.find(zone => offsetOf(zone) === mine) || null;
    } catch (e) {
        return null;
    }
}

// Selected timezone: saved choice, else detected from the device, else Eastern
const detectedTimezone = storedTimezone() ? null : detectUsZone();
let userTimezone = storedTimezone() || detectedTimezone || 'America/New_York';

const tzNote = document.getElementById('tz-note');
if (tzNote && detectedTimezone) {
    tzNote.textContent = `Showing ${ZONE_NAMES[detectedTimezone]} time, detected from your device — change it above if that's wrong.`;
    tzNote.hidden = false;
}

// Initialize timezone buttons
document.querySelectorAll('.tz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.tz-btn.active');
        activeBtn.classList.remove('active');
        activeBtn.setAttribute('aria-pressed', 'false');

        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        userTimezone = btn.dataset.tz;
        try { localStorage.setItem('selectedTimezone', userTimezone); } catch (e) { /* private mode */ }
        if (tzNote) tzNote.hidden = true;
        updateDisplay();
    });

    // Set active button on load
    if (btn.dataset.tz === userTimezone) {
        const currentActive = document.querySelector('.tz-btn.active');
        if (currentActive) {
            currentActive.classList.remove('active');
            currentActive.setAttribute('aria-pressed', 'false');
        }
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
    }
});

// Convert time to user's timezone
function convertToUserTimezone(dateTimeStr, sourceTimezone) {
    const date = new Date(dateTimeStr);
    
    // Create formatter for user's timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: userTimezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    return formatter.format(date);
}

// Get next upcoming session
function getNextSession() {
    const now = new Date();
    let nextSession = null;
    let nextRace = null;
    
    for (const race of races) {
        for (const [sessionName, sessionTime] of Object.entries(race.sessions)) {
            const sessionDate = new Date(sessionTime);
            if (sessionDate > now && (!nextSession || sessionDate < nextSession.date)) {
                nextSession = {
                    date: sessionDate,
                    name: sessionName.replace('_', ' ').toUpperCase(),
                    raceName: race.name,
                    race: race
                };
            }
        }
        
        // Also track next race specifically
        const raceDate = new Date(race.sessions.race);
        if (raceDate > now && (!nextRace || raceDate < nextRace.date)) {
            nextRace = {
                date: raceDate,
                race: race
            };
        }
    }
    
    return { nextSession, nextRace };
}

// Update countdown timer
function updateCountdown() {
    const { nextSession } = getNextSession();
    
    if (!nextSession) {
        document.getElementById('countdown').textContent = 'Season Complete!';
        return;
    }
    
    const now = new Date();
    const diff = nextSession.date - now;
    
    if (diff <= 0) {
        document.getElementById('countdown').textContent = 'SESSION LIVE!';
        return;
    }
    
    document.getElementById('countdown').classList.toggle('imminent', diff < 3600000);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    let countdownText = '';
    if (days > 0) countdownText += `${days}d `;
    countdownText += `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('countdown').textContent = countdownText;
    document.getElementById('next-race-name').textContent = nextSession.raceName;
    const sessionTimeFormatted = convertToUserTimezone(
        nextSession.race.sessions[Object.keys(nextSession.race.sessions).find(k => 
            k.replace('_', ' ').toUpperCase() === nextSession.name
        )],
        nextSession.race.timezone
    );
    
    document.getElementById('next-session').innerHTML = 
        `Next: ${nextSession.name}<br><strong>${sessionTimeFormatted}</strong>`;
}

// Display race schedule
function displayRaces() {
    const raceList = document.getElementById('race-list');
    raceList.innerHTML = '';
    
    const now = new Date();
    let flapIndex = 0;

    races.forEach(race => {
        // Skip past races
        const raceDate = new Date(race.sessions.race);
        if (raceDate < now) return;
        
        const raceCard = document.createElement('div');
        raceCard.className = 'race-card';
        
        const raceHeader = document.createElement('div');
        raceHeader.className = 'race-header';
        
        const raceName = document.createElement('div');
        raceName.className = 'race-name';
        const raceLink = document.createElement('a');
        raceLink.href = `/races/${race.slug}.html`;
        raceLink.textContent = race.name;
        raceLink.title = `${race.gp}: full schedule, countdown & calendar download`;
        raceName.appendChild(raceLink);
        
        const raceLocation = document.createElement('div');
        raceLocation.className = 'race-date';
        raceLocation.textContent = race.location;
        
        raceHeader.appendChild(raceName);
        raceHeader.appendChild(raceLocation);
        
        const sessionTimes = document.createElement('div');
        sessionTimes.className = 'session-times';
        
        // Display each session
        Object.entries(race.sessions).forEach(([sessionName, sessionTime]) => {
            const session = document.createElement('div');
            session.className = 'session';
            
            const sessionNameDiv = document.createElement('div');
            sessionNameDiv.className = 'session-name';
            sessionNameDiv.textContent = (SESSION_LABELS[sessionName] || sessionName.replace('_', ' ')).toUpperCase();
            
            const sessionTimeDiv = document.createElement('div');
            sessionTimeDiv.className = 'session-time';
            sessionTimeDiv.textContent = convertToUserTimezone(sessionTime, race.timezone);
            sessionTimeDiv.style.setProperty('--i', flapIndex++);

            session.appendChild(sessionNameDiv);
            session.appendChild(sessionTimeDiv);
            sessionTimes.appendChild(session);
        });
        
        raceCard.appendChild(raceHeader);
        raceCard.appendChild(sessionTimes);
        raceList.appendChild(raceCard);
    });

    // Split-flap flip on the departures board whenever the times re-render
    raceList.classList.remove('flipping');
    void raceList.offsetWidth;
    raceList.classList.add('flipping');
    clearTimeout(displayRaces.flapTimer);
    displayRaces.flapTimer = setTimeout(() => raceList.classList.remove('flipping'), 1500 + flapIndex * 45);
}

// Update all displays
function updateDisplay() {
    displayRaces();
    updateCountdown();
}

// Initialize on load
updateDisplay();

// Update countdown every second
setInterval(updateCountdown, 1000);
