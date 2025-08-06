// Race data for remaining 2025 season
// Times are in LOCAL track time with timezone offset
const races = [
    {
        name: "F1 Hungarian Grand Prix 2025",
        location: "Budapest, Hungary",
        timezone: "Europe/Budapest",
        sessions: {
            fp1: "2025-08-01T13:30:00+02:00",
            fp2: "2025-08-01T17:00:00+02:00",
            fp3: "2025-08-02T12:30:00+02:00",
            qualifying: "2025-08-02T16:00:00+02:00",
            race: "2025-08-03T15:00:00+02:00"
        }
    },
    {
        name: "F1 Dutch Grand Prix 2025",
        location: "Zandvoort, Netherlands",
        timezone: "Europe/Amsterdam",
        sessions: {
            fp1: "2025-08-29T12:30:00+02:00",
            fp2: "2025-08-29T16:00:00+02:00",
            fp3: "2025-08-30T11:30:00+02:00",
            qualifying: "2025-08-30T15:00:00+02:00",
            race: "2025-08-31T15:00:00+02:00"
        }
    },
    {
        name: "F1 Italian Grand Prix 2025",
        location: "Monza, Italy",
        timezone: "Europe/Rome",
        sessions: {
            fp1: "2025-09-05T13:30:00+02:00",
            fp2: "2025-09-05T17:00:00+02:00",
            fp3: "2025-09-06T12:30:00+02:00",
            qualifying: "2025-09-06T16:00:00+02:00",
            race: "2025-09-07T15:00:00+02:00"
        }
    },
    {
        name: "F1 Azerbaijan Grand Prix 2025",
        location: "Baku, Azerbaijan",
        timezone: "Asia/Baku",
        sessions: {
            fp1: "2025-09-19T13:30:00+04:00",
            fp2: "2025-09-19T17:00:00+04:00",
            fp3: "2025-09-20T12:30:00+04:00",
            qualifying: "2025-09-20T16:00:00+04:00",
            race: "2025-09-21T15:00:00+04:00"
        }
    },
    {
        name: "F1 Singapore Grand Prix 2025",
        location: "Marina Bay, Singapore",
        timezone: "Asia/Singapore",
        sessions: {
            fp1: "2025-10-03T17:30:00+08:00",
            fp2: "2025-10-03T21:00:00+08:00",
            fp3: "2025-10-04T17:30:00+08:00",
            qualifying: "2025-10-04T21:00:00+08:00",
            race: "2025-10-05T20:00:00+08:00"
        }
    },
    {
        name: "F1 United States Grand Prix 2025",
        location: "Austin, Texas",
        timezone: "America/Chicago",
        sessions: {
            fp1: "2025-10-17T13:30:00-05:00",
            sprint_qualifying: "2025-10-17T17:30:00-05:00",
            sprint: "2025-10-18T14:00:00-05:00",
            qualifying: "2025-10-18T18:00:00-05:00",
            race: "2025-10-19T14:00:00-05:00"
        }
    },
    {
        name: "F1 Mexico City Grand Prix 2025",
        location: "Mexico City, Mexico",
        timezone: "America/Mexico_City",
        sessions: {
            fp1: "2025-10-24T13:30:00-06:00",
            fp2: "2025-10-24T17:00:00-06:00",
            fp3: "2025-10-25T12:30:00-06:00",
            qualifying: "2025-10-25T16:00:00-06:00",
            race: "2025-10-26T14:00:00-06:00"
        }
    },
    {
        name: "F1 Brazilian Grand Prix 2025",
        location: "São Paulo, Brazil",
        timezone: "America/Sao_Paulo",
        sessions: {
            fp1: "2025-11-07T11:30:00-03:00",
            sprint_qualifying: "2025-11-07T15:30:00-03:00",
            sprint: "2025-11-08T11:00:00-03:00",
            qualifying: "2025-11-08T15:00:00-03:00",
            race: "2025-11-09T14:00:00-03:00"
        }
    },
    {
        name: "F1 Las Vegas Grand Prix 2025",
        location: "Las Vegas, Nevada",
        timezone: "America/Los_Angeles",
        sessions: {
            fp1: "2025-11-20T18:30:00-08:00",
            fp2: "2025-11-21T03:00:00-08:00",
            fp3: "2025-11-21T18:30:00-08:00",
            qualifying: "2025-11-22T00:00:00-08:00",
            race: "2025-11-22T22:00:00-08:00"
        }
    },
    {
        name: "F1 Qatar Grand Prix 2025",
        location: "Lusail, Qatar",
        timezone: "Asia/Qatar",
        sessions: {
            fp1: "2025-11-28T16:30:00+03:00",
            sprint_qualifying: "2025-11-28T20:30:00+03:00",
            sprint: "2025-11-29T17:00:00+03:00",
            qualifying: "2025-11-29T21:00:00+03:00",
            race: "2025-11-30T19:00:00+03:00"
        }
    },
    {
        name: "F1 Abu Dhabi Grand Prix 2025",
        location: "Abu Dhabi, UAE",
        timezone: "Asia/Dubai",
        sessions: {
            fp1: "2025-12-05T13:30:00+04:00",
            fp2: "2025-12-05T17:00:00+04:00",
            fp3: "2025-12-06T14:30:00+04:00",
            qualifying: "2025-12-06T18:00:00+04:00",
            race: "2025-12-07T17:00:00+04:00"
        }
    }
];

// Get user's selected timezone (default to EST)
let userTimezone = localStorage.getItem('selectedTimezone') || 'America/New_York';

// Initialize timezone buttons
document.querySelectorAll('.tz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tz-btn.active').classList.remove('active');
        btn.classList.add('active');
        userTimezone = btn.dataset.tz;
        localStorage.setItem('selectedTimezone', userTimezone);
        updateDisplay();
    });
    
    // Set active button on load
    if (btn.dataset.tz === userTimezone) {
        document.querySelector('.tz-btn.active').classList.remove('active');
        btn.classList.add('active');
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
        raceName.textContent = race.name;
        
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
            sessionNameDiv.textContent = sessionName.replace('_', ' ').toUpperCase();
            
            const sessionTimeDiv = document.createElement('div');
            sessionTimeDiv.className = 'session-time';
            sessionTimeDiv.textContent = convertToUserTimezone(sessionTime, race.timezone);
            
            session.appendChild(sessionNameDiv);
            session.appendChild(sessionTimeDiv);
            sessionTimes.appendChild(session);
        });
        
        raceCard.appendChild(raceHeader);
        raceCard.appendChild(sessionTimes);
        raceList.appendChild(raceCard);
    });
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

// Circuit animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    if (typeof anime === 'undefined') return;
    
    // Create observer for scroll-triggered animation
    const circuitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                // Animate the circuit path drawing
                anime({
                    targets: '.circuit-path',
                    strokeDashoffset: [1000, 0],
                    duration: 2000,
                    easing: 'easeInOutCubic',
                    complete: function() {
                        // After drawing, animate to red
                        anime({
                            targets: '.circuit-path',
                            stroke: '#e10600',
                            duration: 500,
                            easing: 'easeOutQuad'
                        });
                    }
                });
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe the circuit container
    const circuitContainer = document.querySelector('.circuit-container');
    if (circuitContainer) {
        circuitObserver.observe(circuitContainer);
    }
    
    // Update circuit based on next race (you can expand this)
    function updateCircuitForRace(raceName) {
        const circuits = {
            'Hungarian': 'M 100 150 Q 120 100, 180 90 T 250 100 Q 280 110, 290 140 T 280 180 Q 270 200, 240 210 T 180 220 L 140 220 Q 100 220, 80 190 T 70 140 Q 75 110, 100 150 Z',
            'Dutch': 'M 80 200 Q 100 150, 150 140 T 220 150 L 250 160 Q 280 170, 290 200 T 270 240 Q 250 260, 200 250 L 150 240 Q 100 230, 80 200 Z',
            'Italian': 'M 100 250 L 250 250 Q 280 250, 290 220 T 280 180 L 270 100 Q 260 70, 230 60 T 170 70 L 150 80 Q 120 90, 110 120 L 100 250 Z',
            // Add more circuits as needed
        };
        
        const label = document.querySelector('.circuit-label');
        const path = document.querySelector('.circuit-path');
        
        // Find matching circuit
        for (const [key, pathData] of Object.entries(circuits)) {
            if (raceName.includes(key)) {
                if (path) path.setAttribute('d', pathData);
                if (label) label.textContent = key + ' Circuit';
                break;
            }
        }
    }
    
    // Hook into your existing next race update
    const nextRaceName = document.getElementById('next-race-name');
    if (nextRaceName) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    updateCircuitForRace(nextRaceName.textContent);
                }
            });
        });
        observer.observe(nextRaceName, { childList: true, characterData: true, subtree: true });
        updateCircuitForRace(nextRaceName.textContent);
    }
});
