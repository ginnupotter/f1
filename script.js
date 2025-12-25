// Organized City Data
const continentData = {
    "Europe": [
        { name: "Amsterdam", tz: "Europe/Amsterdam" },
        { name: "London", tz: "Europe/London" },
        { name: "Paris", tz: "Europe/Paris" },
        { name: "Monaco", tz: "Europe/Monaco" }
    ],
    "Asia & Oceania": [
        { name: "Delhi", tz: "Asia/Kolkata" },
        { name: "Tokyo", tz: "Asia/Tokyo" },
        { name: "Singapore", tz: "Asia/Singapore" },
        { name: "Melbourne", tz: "Australia/Melbourne" }
    ],
    "Americas": [
        { name: "New York", tz: "America/New_York" },
        { name: "Mexico City", tz: "America/Mexico_City" },
        { name: "São Paulo", tz: "America/Sao_Paulo" },
        { name: "Los Angeles", tz: "America/Los_Angeles" }
    ]
};

let allRaces = [];

// Initialize: Load your races.json
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

        // Set default to first race
        updateUI(0);

        dropdown.addEventListener('change', (e) => updateUI(e.target.value));
    } catch (err) {
        console.error("Could not load races.json", err);
    }
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

            // Tooltip generation
            const tooltip = document.createElement('div');
            tooltip.className = 'session-tooltip';
            let content = `<strong>${city.name}</strong><br><br>`;

            for (const [session, time] of Object.entries(race.sessions)) {
                const date = new Date(time);
                const timeStr = date.toLocaleTimeString('en-GB', { 
                    timeZone: city.tz, hour: '2-digit', minute: '2-digit' 
                });
                const dayStr = date.toLocaleDateString('en-GB', { 
                    timeZone: city.tz, weekday: 'short' 
                });

                content += `
                    <div class="tooltip-row">
                        <span class="session-name">${session.toUpperCase()}</span>
                        <span class="session-time">${dayStr} ${timeStr}</span>
                    </div>`;
            }

            tooltip.innerHTML = content;
            cityEl.appendChild(tooltip);
            box.appendChild(cityEl);
        });
        grid.appendChild(box);
    }
}

init();
