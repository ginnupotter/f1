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
        { name: "Lima", tz: "America/Lima" },
        { name: "Caracas", tz: "America/Caracas" },
        { name: "Manaus", tz: "America/Manaus" },
        { name: "Santiago", tz: "America/Santiago" },
        { name: "Buenos Aires", tz: "America/Argentina/Buenos_Aires" },
        { name: "São Paulo", tz: "America/Sao_Paulo" },
        { name: "Fernando de Noronha", tz: "America/Noronha" }
    ],
    "Europe": [
        { name: "Amsterdam", tz: "Europe/Amsterdam" },
        { name: "London", tz: "Europe/London" },
        { name: "Paris", tz: "Europe/Paris" },
        { name: "Berlin", tz: "Europe/Berlin" },
        { name: "Athens", tz: "Europe/Athens" },
        { name: "Istanbul", tz: "Europe/Istanbul" },
        { name: "Azores", tz: "Atlantic/Azores" }
    ],
    "Asia & Oceania": [
        { name: "Dubai", tz: "Asia/Dubai" },
        { name: "Kabul", tz: "Asia/Kabul" },
        { name: "Delhi", tz: "Asia/Kolkata" },
        { name: "Kathmandu", tz: "Asia/Kathmandu" },
        { name: "Singapore", tz: "Asia/Singapore" },
        { name: "Tokyo", tz: "Asia/Tokyo" },
        { name: "Darwin", tz: "Australia/Darwin" },
        { name: "Adelaide", tz: "Australia/Adelaide" },
        { name: "Sydney", tz: "Australia/Sydney" },
        { name: "Auckland", tz: "Pacific/Auckland" },
        { name: "Chatham Islands", tz: "Pacific/Chatham" },
        { name: "Kiritimati", tz: "Pacific/Kiritimati" }
    ],
    "Middle East & Africa": [
        { name: "Riyadh", tz: "Asia/Riyadh" },
        { name: "Tehran", tz: "Asia/Tehran" },
        { name: "Cairo", tz: "Africa/Cairo" },
        { name: "Johannesburg", tz: "Africa/Johannesburg" },
        { name: "Lagos", tz: "Africa/Lagos" },
        { name: "Cape Verde", tz: "Atlantic/Cape_Verde" }
    ]
};

let allRaces = [];

async function init() {
    try {
        const response = await fetch('races.json');
        allRaces = await response.json();
        const dropdown = document.getElementById('race-dropdown');
        
        allRaces.forEach((race, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = race.name;
            dropdown.appendChild(opt);
        });

        updateUI(0);
        dropdown.addEventListener('change', (e) => updateUI(e.target.value));
    } catch (err) { console.error("Data Load Error", err); }
}

function updateUI(index) {
    const race = allRaces[index];
    document.getElementById('race-name').textContent = race.name;
    document.getElementById('race-location').textContent = race.location;

    const grid = document.getElementById('continent-grid');
    grid.innerHTML = '';

    for (const [continent, cities] of Object.entries(continentData)) {
        const box = document.createElement('div');
        box.className = 'continent-box';
        box.innerHTML = `<h3>${continent}</h3>`;

        cities.forEach(city => {
            const cityEl = document.createElement('div');
            cityEl.className = 'city-item';
            cityEl.innerHTML = `<span>${city.name}</span>`;

            const tooltip = document.createElement('div');
            tooltip.className = 'session-tooltip';
            let content = `<strong>${city.name}</strong><br>`;

            for (const [session, time] of Object.entries(race.sessions)) {
                const date = new Date(time);
                const timeStr = date.toLocaleTimeString('en-GB', { timeZone: city.tz, hour: '2-digit', minute: '2-digit' });
                const dayStr = date.toLocaleDateString('en-GB', { timeZone: city.tz, weekday: 'short' });
                content += `<div class="tooltip-row"><span class="session-label">${session.toUpperCase()}</span><span class="session-val">${dayStr} ${timeStr}</span></div>`;
            }
            tooltip.innerHTML = content;
            cityEl.appendChild(tooltip);

            // SMART PLACEMENT LOGIC
            cityEl.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
                const rect = tooltip.getBoundingClientRect();
                // If tooltip goes off the right side of the screen
                if (rect.right > window.innerWidth) {
                    tooltip.style.left = 'auto';
                    tooltip.style.right = '105%';
                } else {
                    tooltip.style.left = '105%';
                    tooltip.style.right = 'auto';
                }
            });

            cityEl.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
            box.appendChild(cityEl);
        });
        grid.appendChild(box);
    }
}

init();
