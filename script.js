/ Race data for remaining 2025 season
// Times are in LOCAL track time with timezone offset
const races = [
    {
        name: "Hungarian Grand Prix",
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
        name: "Dutch Grand Prix",
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
        name: "Italian Grand Prix",
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
        name: "Azerbaijan Grand Prix",
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
        name: "Singapore Grand Prix",
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
        name: "United States Grand Prix",
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
        name: "Mexico City Grand Prix",
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
        name: "Brazilian Grand Prix",
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
        name: "Las Vegas Grand Prix",
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
        name: "Qatar Grand Prix",
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
        name: "Abu Dhabi Grand Prix",
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
    document.getElementById('next-session').textContent = `Next: ${nextSession.name}`;
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
