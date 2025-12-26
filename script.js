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
        { name: "Santiago", tz: "America/Santiago" },
        { name: "Buenos Aires", tz: "America/Argentina/Buenos_Aires" },
        { name: "São Paulo", tz: "America/Sao_Paulo" },
        { name: "Fernando de Noronha", tz: "America/Noronha" }
    ],
    "Europe & Africa": [
        { name: "London", tz: "Europe/London" },
        { name: "Amsterdam", tz: "Europe/Amsterdam" },
        { name: "Athens", tz: "Europe/Athens" },
        { name: "Istanbul", tz: "Europe/Istanbul" },
        { name: "Cairo", tz: "Africa/Cairo" },
        { name: "Johannesburg", tz: "Africa/Johannesburg" }
    ],
    "Asia & Oceania": [
        { name: "Dubai", tz: "Asia/Dubai" },
        { name: "Kabul", tz: "Asia/Kabul" },
        { name: "Delhi", tz: "Asia/Kolkata" },
        { name: "Kathmandu", tz: "Asia/Kathmandu" },
        { name: "Singapore", tz: "Asia/Singapore" },
        { name: "Tokyo", tz: "Asia/Tokyo" },
        { name: "Adelaide", tz: "Australia/Adelaide" },
        { name: "Sydney", tz: "Australia/Sydney" },
        { name: "Auckland", tz: "Pacific/Auckland" },
        { name: "Kiritimati", tz: "Pacific/Kiritimati" }
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
    } catch (e) { console.error("Error", e); }
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
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-tooltip';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = (e) => { e.stopPropagation(); tooltip.style.display = 'none'; };
            tooltip.appendChild(closeBtn);

            let content = `<h4 style="margin:0 0 10px 0">${city.name}</h4>`;
            for (const [s, t] of Object.entries(race.sessions)) {
                const date = new Date(t);
                
                // FIXED: Now includes Month and Year
                const timeStr = date.toLocaleTimeString('en-GB', { 
                    timeZone: city.tz, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                const dateStr = date.toLocaleDateString('en-GB', { 
                    timeZone: city.tz, 
                    weekday: 'short', 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                });

                content += `
                    <div class="tooltip-row">
                        <div style="display:flex; flex-direction:column">
                            <span class="session-label">${s.toUpperCase()}</span>
                            <span style="font-size:0.7rem; color:#666">${dateStr}</span>
                        </div>
                        <span class="session-val">${timeStr}</span>
                    </div>`;
            }
            
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = content;
            tooltip.appendChild(contentDiv);
            item.appendChild(tooltip);

            item.onmouseenter = () => {
                tooltip.style.display = 'block';
                if (window.innerWidth >= 1024) {
                    const rect = tooltip.getBoundingClientRect();
                    // If box hits right edge, move to left
                    if (rect.right > window.innerWidth) {
                        tooltip.style.left = 'auto';
                        tooltip.style.right = '105%';
                    } else {
                        tooltip.style.left = '105%';
                        tooltip.style.right = 'auto';
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
