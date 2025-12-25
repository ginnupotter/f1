const continentData = {
    "North America": [
        { name: "Honolulu", tz: "Pacific/Honolulu" },
        { name: "Anchorage", tz: "America/Anchorage" },
        { name: "Vancouver", tz: "America/Vancouver" },
        { name: "Denver", tz: "America/Denver" },
        { name: "Mexico City", tz: "America/Mexico_City" },
        { name: "New York", tz: "America/New_York" },
        { name: "St. John's", tz: "America/St_Johns" }
    ],
    "South America": [
        { name: "Galapagos", tz: "Pacific/Galapagos" },
        { name: "Lima", tz: "America/Lima" },
        { name: "La Paz", tz: "America/La_Paz" },
        { name: "Santiago", tz: "America/Santiago" },
        { name: "Buenos Aires", tz: "America/Argentina/Buenos_Aires" },
        { name: "São Paulo", tz: "America/Sao_Paulo" },
        { name: "Fernando de Noronha", tz: "America/Noronha" }
    ],
    "Europe": [
        { name: "Reykjavik", tz: "Atlantic/Reykjavik" },
        { name: "London", tz: "Europe/London" },
        { name: "Amsterdam", tz: "Europe/Amsterdam" },
        { name: "Helsinki", tz: "Europe/Helsinki" },
        { name: "Athens", tz: "Europe/Athens" },
        { name: "Istanbul", tz: "Europe/Istanbul" }
    ],
    "Asia & Oceania": [
        { name: "Dubai", tz: "Asia/Dubai" },
        { name: "Delhi", tz: "Asia/Kolkata" },
        { name: "Kathmandu", tz: "Asia/Kathmandu" },
        { name: "Bangkok", tz: "Asia/Bangkok" },
        { name: "Singapore", tz: "Asia/Singapore" },
        { name: "Tokyo", tz: "Asia/Tokyo" },
        { name: "Adelaide", tz: "Australia/Adelaide" },
        { name: "Sydney", tz: "Australia/Sydney" },
        { name: "Auckland", tz: "Pacific/Auckland" },
        { name: "Chatham Islands", tz: "Pacific/Chatham" },
    ],
    "Middle East & Africa": [
        { name: "Cape Verde", tz: "Atlantic/Cape_Verde" },
        { name: "Casablanca", tz: "Africa/Casablanca" },
        { name: "Lagos", tz: "Africa/Lagos" },
        { name: "Cairo", tz: "Africa/Cairo" },
        { name: "Nairobi", tz: "Africa/Nairobi" },
        { name: "Riyadh", tz: "Asia/Riyadh" },
        { name: "Tehran", tz: "Asia/Tehran" },
        { name: "Seychelles", tz: "Indian/Mahe" }
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
    } catch (e) { console.error(e); }
}

function updateUI(idx) {
    const race = allRaces[idx];
    document.getElementById('race-name').textContent = race.name + " GP";
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
            let content = `<strong>${city.name}</strong><br>`;
            
            for (const [s, t] of Object.entries(race.sessions)) {
                const date = new Date(t);
                const timeStr = date.toLocaleTimeString('en-GB', { timeZone: city.tz, hour: '2-digit', minute: '2-digit' });
                const dayStr = date.toLocaleDateString('en-GB', { timeZone: city.tz, weekday: 'short' });
                content += `<div class="tooltip-row"><span>${s.toUpperCase()}</span><span class="session-val">${dayStr} ${timeStr}</span></div>`;
            }
            tooltip.innerHTML = content;
            item.appendChild(tooltip);

            // COLLISION DETECTION LOGIC
            item.addEventListener('mouseenter', () => {
                const rect = item.getBoundingClientRect();
                const screenWidth = window.innerWidth;
                
                // Reset classes
                tooltip.classList.remove('tooltip-left', 'tooltip-right', 'tooltip-bottom');
                
                if (screenWidth < 768) {
                    // Handled by CSS fixed positioning
                } else if (rect.right + 260 > screenWidth) {
                    tooltip.classList.add('tooltip-left');
                } else {
                    tooltip.classList.add('tooltip-right');
                }
            });

            box.appendChild(item);
        });
        grid.appendChild(box);
    }
}
init();
