let allRaces = [];
let activeTimezones = []; // Stores the timezones the user has added

async function init() {
    try {
        const response = await fetch('races.json');
        if (!response.ok) throw new Error("Check if races.json is in your GitHub repo.");
        allRaces = await response.json();

        setupRaceDropdown();
        setupCityDropdown();
        
        // Default: Show the next race in the user's current local timezone
        const now = new Date();
        const nextRace = allRaces.find(r => new Date(r.sessions.gp) > now) || allRaces[0];
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        activeTimezones.push(userTz);
        
        updateUI(nextRace);
    } catch (err) {
        document.getElementById('race-name').innerText = "Load Failed";
        console.error(err);
    }
}

function setupRaceDropdown() {
    const drp = document.getElementById('race-dropdown');
    allRaces.forEach((race, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${race.round}. ${race.name} GP`;
        drp.appendChild(opt);
    });
    drp.addEventListener('change', () => updateUI(allRaces[drp.value]));
}

function setupCityDropdown() {
    const drp = document.getElementById('city-dropdown');
    // Gets all 400+ IANA timezones (e.g., "Europe/London", "Asia/Tokyo")
    const zones = Intl.supportedValuesOf('timeZone');

    zones.forEach(zone => {
        const opt = document.createElement('option');
        opt.value = zone;
        // Clean up the name for the dropdown (e.g., "America/New_York" -> "New York")
        opt.textContent = zone.split('/').pop().replace(/_/g, ' ');
        drp.appendChild(opt);
    });

    drp.addEventListener('change', (e) => {
        if (!activeTimezones.includes(e.target.value)) {
            activeTimezones.push(e.target.value);
            const selectedIdx = document.getElementById('race-dropdown').value || 0;
            updateUI(allRaces[selectedIdx]);
        }
    });
}

function updateUI(race) {
    document.getElementById('race-name').innerText = `${race.name} Grand Prix`;
    document.getElementById('race-location').innerText = race.location;
    
    const grid = document.getElementById('timezone-grid');
    grid.innerHTML = '';

    activeTimezones.forEach(tz => {
        const box = document.createElement('div');
        box.className = 'continent-box';
        
        const cityName = tz.split('/').pop().replace(/_/g, ' ');
        let html = `<h3>${cityName} <small style="display:block; font-size:12px; color:gray">${tz}</small></h3>`;
        
        for (const [session, time] of Object.entries(race.sessions)) {
            const date = new Date(time);
            // Formats to 24hr time in the SPECIFIC chosen timezone
            const timeStr = date.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
            const dayStr = date.toLocaleDateString('en-GB', { timeZone: tz, weekday: 'short', day: '2-digit', month: 'short' });

            html += `
                <div class="session-row">
                    <span class="session-name">${session.toUpperCase()}</span>
                    <span class="session-time"><strong>${dayStr}</strong> — ${timeStr}</span>
                </div>`;
        }
        box.innerHTML = html;
        grid.appendChild(box);
    });
}

function clearCities() {
    activeTimezones = [Intl.DateTimeFormat().resolvedOptions().timeZone];
    const selectedIdx = document.getElementById('race-dropdown').value || 0;
    updateUI(allRaces[selectedIdx]);
}

init();
