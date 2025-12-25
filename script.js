const continentData = {
    "North America": [
        { name: "Honolulu", tz: "Pacific/Honolulu" },
        { name: "Anchorage", tz: "America/Anchorage" },
        { name: "Los Angeles", tz: "America/Los_Angeles" },
        { name: "Denver", tz: "America/Denver" },
        { name: "Chicago", tz: "America/Chicago" },
        { name: "New York", tz: "America/New_York" },
        { name: "St. John's", tz: "America/St_Johns" }
    ],
    "South America": [
        { name: "Galapagos", tz: "Pacific/Galapagos" },
        { name: "Lima", tz: "America/Lima" },
        { name: "La Paz", tz: "America/La_Paz" },
        { name: "Santiago", tz: "America/Santiago" },
        { name: "Buenos Aires", tz: "America/Argentina/Buenos_Aires" },
        { name: "São Paulo", tz: "America/Sao_Paulo" }
    ],
    "Europe & Africa": [
        { name: "London", tz: "Europe/London" },
        { name: "Amsterdam", tz: "Europe/Amsterdam" },
        { name: "Athens", tz: "Europe/Athens" },
        { name: "Istanbul", tz: "Europe/Istanbul" },
        { name: "Lagos", tz: "Africa/Lagos" },
        { name: "Cairo", tz: "Africa/Cairo" },
        { name: "Johannesburg", tz: "Africa/Johannesburg" }
    ],
    "Asia": [
        { name: "Dubai", tz: "Asia/Dubai" },
        { name: "Tehran", tz: "Asia/Tehran" },
        { name: "Kabul", tz: "Asia/Kabul" },
        { name: "Delhi", tz: "Asia/Kolkata" },
        { name: "Kathmandu", tz: "Asia/Kathmandu" },
        { name: "Bangkok", tz: "Asia/Bangkok" },
        { name: "Singapore", tz: "Asia/Singapore" },
        { name: "Tokyo", tz: "Asia/Tokyo" }
    ],
    "Oceania": [
        { name: "Perth", tz: "Australia/Perth" },
        { name: "Eucla", tz: "Australia/Eucla" },
        { name: "Adelaide", tz: "Australia/Adelaide" },
        { name: "Sydney", tz: "Australia/Sydney" },
        { name: "Auckland", tz: "Pacific/Auckland" },
        { name: "Chatham Islands", tz: "Pacific/Chatham" }
    ]
};

let allRaces = [];

async function init() {
    try {
        const response = await fetch('races.json');
        allRaces = await response.json();
        const drp = document.getElementById('race-dropdown');
        allRaces.forEach((r, i) => {
            const opt = document.createElement('option');
            opt.value = i; opt.textContent = r.name;
            drp.appendChild(opt);
        });
        updateUI(0);
        drp.addEventListener('change', (e) => updateUI(e.target.value));
    } catch (e) { console.error("Error loading JSON", e); }
}

function updateUI(idx) {
    const race = allRaces[idx];
    document.getElementById('race-name').textContent = race.name + " Grand Prix";
    document.getElementById('race-location').textContent = race.location;
    const grid = document.getElementById('continent-grid');
    grid.innerHTML = '';

    for (const [continent, cities] of Object.entries(continentData)) {
        const box = document.createElement('div');
        box.className = 'continent-box';
        box.innerHTML = `<h3>${continent}</h3>`;
        
        cities.forEach(city => {
            const item = document.createElement('div');
            item.className = 'city-item';
            item.innerHTML = `<span>${city.name}</span>`;

            const tooltip = document.createElement('div');
            tooltip.className = 'session-tooltip';
            let content = `<h4 style="margin:0 0 10px 0">${city.name}</h4>`;
            
            for (const [s, t] of Object.entries(race.sessions)) {
                const date = new Date(t);
                const timeStr = date.toLocaleTimeString('en-GB', { timeZone: city.tz, hour: '2-digit', minute: '2-digit' });
                const dayStr = date.toLocaleDateString('en-GB', { timeZone: city.tz, weekday: 'short', day: '2-digit' });
                content += `<div class="tooltip-row"><span>${s.toUpperCase()}</span><span class="session-val">${dayStr} ${timeStr}</span></div>`;
            }
            tooltip.innerHTML = content;
            item.appendChild(tooltip);
            box.appendChild(item);
        });
        grid.appendChild(box);
    }
}
init();
