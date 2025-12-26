const continentData = {
    "North America": [
        { name: "Honolulu", tz: "Pacific/Honolulu" },
        { name: "Vancouver", tz: "America/Vancouver" },
        { name: "Los Angeles", tz: "America/Los_Angeles" },
        { name: "Phoenix", tz: "America/Phoenix" },
        { name: "Mexico City", tz: "America/Mexico_City" },
        { name: "Chicago", tz: "America/Chicago" },
        { name: "New York", tz: "America/New_York" },
    ],
    "South America": [
        { name: "Bogota", tz: "America/Bogota" },
        { name: "Lima", tz: "America/Lima" },
        { name: "Santiago", tz: "America/Santiago" },
        { name: "Caracas", tz: "America/Caracas" },
        { name: "Buenos Aires", tz: "America/Argentina/Buenos_Aires" },
        { name: "São Paulo", tz: "America/Sao_Paulo" },
        { name: "Fernando de Noronha", tz: "America/Noronha" }
    ],
    "Europe & Africa": [
        { name: "Ponta Delgada", tz: "Atlantic/Azores" },
        { name: "Casablanca", tz: "Africa/Casablanca" },
        { name: "London", tz: "Europe/London" },
        { name: "Amsterdam", tz: "Europe/Amsterdam" },
        { name: "Berlin", tz: "Europe/Berlin" },
        { name: "Johannesburg", tz: "Africa/Johannesburg" },
        { name: "Athens", tz: "Europe/Athens" },
    ],
    "Asia & Oceania": [
        { name: "Dubai", tz: "Asia/Dubai" },
        { name: "Delhi", tz: "Asia/Kolkata" },
        { name: "Singapore", tz: "Asia/Singapore" },
        { name: "Tokyo", tz: "Asia/Tokyo" },
        { name: "Adelaide", tz: "Australia/Adelaide" },
        { name: "Sydney", tz: "Australia/Sydney" },
        { name: "Auckland", tz: "Pacific/Auckland" }
    ]
};

let allRaces = [];

async function init() {
    try {
        const response = await fetch('races.json');
        allRaces = await response.json();
        
        const slider = document.getElementById('race-slider');
        const now = new Date();
        let nextIdx = allRaces.findIndex(r => new Date(r.sessions.gp) > now);
        if (nextIdx === -1) nextIdx = 0;

        allRaces.forEach((race, i) => {
            const card = document.createElement('div');
            card.className = `race-card ${i === nextIdx ? 'active' : ''}`;
            
            // Format date for the slider card
            const gpDate = new Date(race.sessions.gp);
            const dateStr = gpDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

            card.innerHTML = `
                <span>ROUND ${i+1}</span>
                <strong>${race.name}</strong>
                <small>${dateStr}</small>
            `;
            
            card.onclick = () => {
                document.querySelectorAll('.race-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                updateUI(i);
            };
            slider.appendChild(card);
            
            if (i === nextIdx) {
                setTimeout(() => card.scrollIntoView({ behavior: 'smooth', inline: 'center' }), 100);
            }
        });

        updateUI(nextIdx);
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
            
            // Re-adding the Close Button for mobile
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-tooltip';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                tooltip.style.display = 'none';
            };
            tooltip.appendChild(closeBtn);

            let content = `<h4 style="margin:0 0 10px 0; border-bottom:1px solid #ddd; padding-bottom:5px;">${city.name}</h4>`;
            for (const [s, t] of Object.entries(race.sessions)) {
                const d = new Date(t);
                const tStr = d.toLocaleTimeString('en-GB', { timeZone: city.tz, hour: '2-digit', minute: '2-digit' });
                const dStr = d.toLocaleDateString('en-GB', { timeZone: city.tz, weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

                content += `
                    <div class="tooltip-row">
                        <div style="display:flex; flex-direction:column">
                            <span style="font-weight:bold; font-size:0.75rem;">${s.toUpperCase()}</span>
                            <span style="font-size:0.6rem; color:#666">${dStr}</span>
                        </div>
                        <span class="session-val">${tStr}</span>
                    </div>`;
            }
            
            const contentWrap = document.createElement('div');
            contentWrap.innerHTML = content;
            tooltip.appendChild(contentWrap);
            item.appendChild(tooltip);

            item.onmouseenter = () => {
                tooltip.style.display = 'block';
                if (window.innerWidth >= 1024) {
                    const rect = tooltip.getBoundingClientRect();
                    // Detect right-side overflow and flip
                    if (rect.right > window.innerWidth || rect.left + rect.width > window.innerWidth) {
                        tooltip.style.left = 'auto';
                        tooltip.style.right = '105%';
                    } else {
                        tooltip.style.left = '105%';
                        tooltip.style.right = 'auto';
                    }
                    // Vertical flip
                    if (rect.bottom > window.innerHeight) {
                        tooltip.style.top = 'auto';
                        tooltip.style.bottom = '0';
                    } else {
                        tooltip.style.top = '0';
                        tooltip.style.bottom = 'auto';
                    }
                }
            };
            item.onmouseleave = () => { if (window.innerWidth >= 1024) tooltip.style.display = 'none'; };
            box.appendChild(item);
        });
        grid.appendChild(box);
    }
}
init();
