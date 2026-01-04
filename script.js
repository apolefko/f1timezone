// Race data for 2026 F1 season
// Times are in LOCAL track time with timezone offset
const races = [
    {
        name: "F1 Australian Grand Prix 2026",
        location: "Melbourne, Australia",
        timezone: "Australia/Melbourne",
        sessions: {
            fp1: "2026-03-06T13:30:00+11:00",
            fp2: "2026-03-06T17:00:00+11:00",
            fp3: "2026-03-07T12:30:00+11:00",
            qualifying: "2026-03-07T16:00:00+11:00",
            race: "2026-03-08T15:00:00+11:00"
        }
    },
    {
        name: "F1 Chinese Grand Prix 2026",
        location: "Shanghai, China",
        timezone: "Asia/Shanghai",
        sessions: {
            fp1: "2026-03-13T11:30:00+08:00",
            sprint_qualifying: "2026-03-13T15:30:00+08:00",
            sprint: "2026-03-14T11:00:00+08:00",
            qualifying: "2026-03-14T15:00:00+08:00",
            race: "2026-03-15T15:00:00+08:00"
        }
    },
    {
        name: "F1 Japanese Grand Prix 2026",
        location: "Suzuka, Japan",
        timezone: "Asia/Tokyo",
        sessions: {
            fp1: "2026-03-27T13:30:00+09:00",
            fp2: "2026-03-27T17:00:00+09:00",
            fp3: "2026-03-28T12:30:00+09:00",
            qualifying: "2026-03-28T16:00:00+09:00",
            race: "2026-03-29T15:00:00+09:00"
        }
    },
    {
        name: "F1 Bahrain Grand Prix 2026",
        location: "Sakhir, Bahrain",
        timezone: "Asia/Bahrain",
        sessions: {
            fp1: "2026-04-10T15:30:00+03:00",
            fp2: "2026-04-10T19:00:00+03:00",
            fp3: "2026-04-11T16:00:00+03:00",
            qualifying: "2026-04-11T19:00:00+03:00",
            race: "2026-04-12T18:00:00+03:00"
        }
    },
    {
        name: "F1 Saudi Arabian Grand Prix 2026",
        location: "Jeddah, Saudi Arabia",
        timezone: "Asia/Riyadh",
        sessions: {
            fp1: "2026-04-17T15:30:00+03:00",
            fp2: "2026-04-17T19:00:00+03:00",
            fp3: "2026-04-18T16:00:00+03:00",
            qualifying: "2026-04-18T19:00:00+03:00",
            race: "2026-04-19T18:00:00+03:00"
        }
    },
    {
        name: "F1 Miami Grand Prix 2026",
        location: "Miami, Florida",
        timezone: "America/New_York",
        sessions: {
            fp1: "2026-05-01T13:30:00-04:00",
            sprint_qualifying: "2026-05-01T17:30:00-04:00",
            sprint: "2026-05-02T12:00:00-04:00",
            qualifying: "2026-05-02T16:00:00-04:00",
            race: "2026-05-03T15:00:00-04:00"
        }
    },
    {
        name: "F1 Canadian Grand Prix 2026",
        location: "Montreal, Canada",
        timezone: "America/Toronto",
        sessions: {
            fp1: "2026-05-22T13:30:00-04:00",
            sprint_qualifying: "2026-05-22T17:30:00-04:00",
            sprint: "2026-05-23T12:00:00-04:00",
            qualifying: "2026-05-23T16:00:00-04:00",
            race: "2026-05-24T14:00:00-04:00"
        }
    },
    {
        name: "F1 Monaco Grand Prix 2026",
        location: "Monte Carlo, Monaco",
        timezone: "Europe/Monaco",
        sessions: {
            fp1: "2026-06-05T13:30:00+02:00",
            fp2: "2026-06-05T17:00:00+02:00",
            fp3: "2026-06-06T12:30:00+02:00",
            qualifying: "2026-06-06T16:00:00+02:00",
            race: "2026-06-07T15:00:00+02:00"
        }
    },
    {
        name: "F1 Spanish Grand Prix 2026",
        location: "Barcelona, Spain",
        timezone: "Europe/Madrid",
        sessions: {
            fp1: "2026-06-12T13:30:00+02:00",
            fp2: "2026-06-12T17:00:00+02:00",
            fp3: "2026-06-13T12:30:00+02:00",
            qualifying: "2026-06-13T16:00:00+02:00",
            race: "2026-06-14T15:00:00+02:00"
        }
    },
    {
        name: "F1 Austrian Grand Prix 2026",
        location: "Spielberg, Austria",
        timezone: "Europe/Vienna",
        sessions: {
            fp1: "2026-06-26T13:30:00+02:00",
            fp2: "2026-06-26T17:00:00+02:00",
            fp3: "2026-06-27T12:30:00+02:00",
            qualifying: "2026-06-27T16:00:00+02:00",
            race: "2026-06-28T15:00:00+02:00"
        }
    },
    {
        name: "F1 British Grand Prix 2026",
        location: "Silverstone, United Kingdom",
        timezone: "Europe/London",
        sessions: {
            fp1: "2026-07-03T13:30:00+01:00",
            sprint_qualifying: "2026-07-03T17:30:00+01:00",
            sprint: "2026-07-04T12:00:00+01:00",
            qualifying: "2026-07-04T16:00:00+01:00",
            race: "2026-07-05T15:00:00+01:00"
        }
    },
    {
        name: "F1 Belgian Grand Prix 2026",
        location: "Spa-Francorchamps, Belgium",
        timezone: "Europe/Brussels",
        sessions: {
            fp1: "2026-07-17T13:30:00+02:00",
            fp2: "2026-07-17T17:00:00+02:00",
            fp3: "2026-07-18T12:30:00+02:00",
            qualifying: "2026-07-18T16:00:00+02:00",
            race: "2026-07-19T15:00:00+02:00"
        }
    },
    {
        name: "F1 Hungarian Grand Prix 2026",
        location: "Budapest, Hungary",
        timezone: "Europe/Budapest",
        sessions: {
            fp1: "2026-07-24T13:30:00+02:00",
            fp2: "2026-07-24T17:00:00+02:00",
            fp3: "2026-07-25T12:30:00+02:00",
            qualifying: "2026-07-25T16:00:00+02:00",
            race: "2026-07-26T15:00:00+02:00"
        }
    },
    {
        name: "F1 Dutch Grand Prix 2026",
        location: "Zandvoort, Netherlands",
        timezone: "Europe/Amsterdam",
        sessions: {
            fp1: "2026-08-21T13:30:00+02:00",
            sprint_qualifying: "2026-08-21T17:30:00+02:00",
            sprint: "2026-08-22T12:00:00+02:00",
            qualifying: "2026-08-22T16:00:00+02:00",
            race: "2026-08-23T15:00:00+02:00"
        }
    },
    {
        name: "F1 Italian Grand Prix 2026",
        location: "Monza, Italy",
        timezone: "Europe/Rome",
        sessions: {
            fp1: "2026-09-04T13:30:00+02:00",
            fp2: "2026-09-04T17:00:00+02:00",
            fp3: "2026-09-05T12:30:00+02:00",
            qualifying: "2026-09-05T16:00:00+02:00",
            race: "2026-09-06T15:00:00+02:00"
        }
    },
    {
        name: "F1 Madrid Grand Prix 2026",
        location: "Madrid, Spain",
        timezone: "Europe/Madrid",
        sessions: {
            fp1: "2026-09-11T13:30:00+02:00",
            fp2: "2026-09-11T17:00:00+02:00",
            fp3: "2026-09-12T12:30:00+02:00",
            qualifying: "2026-09-12T16:00:00+02:00",
            race: "2026-09-13T15:00:00+02:00"
        }
    },
    {
        name: "F1 Azerbaijan Grand Prix 2026",
        location: "Baku, Azerbaijan",
        timezone: "Asia/Baku",
        sessions: {
            fp1: "2026-09-24T15:30:00+04:00",
            fp2: "2026-09-24T19:00:00+04:00",
            fp3: "2026-09-25T14:30:00+04:00",
            qualifying: "2026-09-25T18:00:00+04:00",
            race: "2026-09-26T17:00:00+04:00"
        }
    },
    {
        name: "F1 Singapore Grand Prix 2026",
        location: "Marina Bay, Singapore",
        timezone: "Asia/Singapore",
        sessions: {
            fp1: "2026-10-09T17:30:00+08:00",
            sprint_qualifying: "2026-10-09T21:30:00+08:00",
            sprint: "2026-10-10T19:00:00+08:00",
            qualifying: "2026-10-10T21:00:00+08:00",
            race: "2026-10-11T20:00:00+08:00"
        }
    },
    {
        name: "F1 United States Grand Prix 2026",
        location: "Austin, Texas",
        timezone: "America/Chicago",
        sessions: {
            fp1: "2026-10-23T13:30:00-05:00",
            fp2: "2026-10-23T17:00:00-05:00",
            fp3: "2026-10-24T12:30:00-05:00",
            qualifying: "2026-10-24T16:00:00-05:00",
            race: "2026-10-25T14:00:00-05:00"
        }
    },
    {
        name: "F1 Mexico City Grand Prix 2026",
        location: "Mexico City, Mexico",
        timezone: "America/Mexico_City",
        sessions: {
            fp1: "2026-10-30T13:30:00-06:00",
            fp2: "2026-10-30T17:00:00-06:00",
            fp3: "2026-10-31T12:30:00-06:00",
            qualifying: "2026-10-31T16:00:00-06:00",
            race: "2026-11-01T14:00:00-06:00"
        }
    },
    {
        name: "F1 Brazilian Grand Prix 2026",
        location: "São Paulo, Brazil",
        timezone: "America/Sao_Paulo",
        sessions: {
            fp1: "2026-11-06T11:30:00-03:00",
            fp2: "2026-11-06T15:00:00-03:00",
            fp3: "2026-11-07T11:30:00-03:00",
            qualifying: "2026-11-07T15:00:00-03:00",
            race: "2026-11-08T14:00:00-03:00"
        }
    },
    {
        name: "F1 Las Vegas Grand Prix 2026",
        location: "Las Vegas, Nevada",
        timezone: "America/Los_Angeles",
        sessions: {
            fp1: "2026-11-19T18:30:00-08:00",
            fp2: "2026-11-20T03:00:00-08:00",
            fp3: "2026-11-20T18:30:00-08:00",
            qualifying: "2026-11-21T00:00:00-08:00",
            race: "2026-11-21T22:00:00-08:00"
        }
    },
    {
        name: "F1 Qatar Grand Prix 2026",
        location: "Lusail, Qatar",
        timezone: "Asia/Qatar",
        sessions: {
            fp1: "2026-11-27T16:30:00+03:00",
            fp2: "2026-11-27T20:00:00+03:00",
            fp3: "2026-11-28T17:00:00+03:00",
            qualifying: "2026-11-28T21:00:00+03:00",
            race: "2026-11-29T19:00:00+03:00"
        }
    },
    {
        name: "F1 Abu Dhabi Grand Prix 2026",
        location: "Abu Dhabi, UAE",
        timezone: "Asia/Dubai",
        sessions: {
            fp1: "2026-12-04T13:30:00+04:00",
            fp2: "2026-12-04T17:00:00+04:00",
            fp3: "2026-12-05T14:30:00+04:00",
            qualifying: "2026-12-05T18:00:00+04:00",
            race: "2026-12-06T17:00:00+04:00"
        }
    }
];

// Get user's selected timezone (default to EST)
let userTimezone = localStorage.getItem('selectedTimezone') || 'America/New_York';

// Initialize timezone buttons
document.querySelectorAll('.tz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.tz-btn.active');
        activeBtn.classList.remove('active');
        activeBtn.setAttribute('aria-pressed', 'false');

        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        userTimezone = btn.dataset.tz;
        localStorage.setItem('selectedTimezone', userTimezone);
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
