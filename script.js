/**
 * F1 Global Race Timings - script.js
 * ---------------------------------
 * Features:
 * - Auto-detects the next upcoming race.
 * - Responsive tooltips with boundary detection (prevents vibration).
 * - Comprehensive timezone support (including 30/45 min offsets).
 * - Full date formatting (Day, Month, Year).
 */

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
        
        const dropdown = document.getElementById('race-dropdown');
        allRaces.forEach((race, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = race.name;
            dropdown.appendChild(option);
        });

        // AUTO-SELECT LOGIC: Find the next race after today
        const now = new Date();
        const nextRaceIndex = allRaces.findIndex(r => new Date(r.sessions.gp) > now);
        const startIndex = (nextRaceIndex !== -1) ? nextRaceIndex : 0;
        
        dropdown.value = startIndex;
        updateUI(startIndex);

        dropdown.addEventListener('change', (e) => updateUI(e.target.value));
    } catch (error) {
        console.error("Critical Error: Could not load race data.", error);
    }
}

function updateUI(raceIndex) {
    const race = allRaces[raceIndex];
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

            // Create Tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'session-tooltip';
            
            // Mobile Close Button (X)
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-tooltip';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = (e) => {
                e.stopPropagation(); // Prevents immediate re-opening
                tooltip.style.display = 'none';
            };
            tooltip.appendChild(closeBtn);

            // Tooltip Content Construction
            let content = `<h4 style="margin:0 0 10px 0; border-bottom:1px solid #ddd; padding-bottom:5px;">${city.name}</h4>`;
            for (const [sessionName, sessionTime] of Object.entries(race.sessions)) {
                const dateObj = new Date(sessionTime);
                
                // Format: HH:MM
                const timeString = dateObj.toLocaleTimeString('en-GB', { 
                    timeZone: city.tz, hour: '2-digit', minute: '2-digit' 
                });
                
                // Format: Day, DD Month YYYY
                const dateString = dateObj.toLocaleDateString('en-GB', { 
                    timeZone: city.tz, weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' 
                });

                content += `
                    <div class="tooltip-row">
                        <div style="display:flex; flex-direction:column">
                            <span style="font-weight:bold; font-size:0.8rem;">${sessionName.toUpperCase()}</span>
                            <span style="font-size:0.65rem; color:#666">${dateString}</span>
                        </div>
                        <span class="session-val">${timeString}</span>
                    </div>`;
            }
            
            const wrapper = document.createElement('div');
            wrapper.innerHTML = content;
            tooltip.appendChild(wrapper);
            item.appendChild(tooltip);

            /**
             * POSITIONING & VIBRATION FIX
             */
            item.onmouseenter = () => {
                tooltip.style.display = 'block';
                
                // Boundary checking for PC (min-width 1024px)
                if (window.innerWidth >= 1024) {
                    const rect = tooltip.getBoundingClientRect();
                    const winH = window.innerHeight;
                    const winW = window.innerWidth;

                    // Horizontal flip if it hits the right edge
                    if (rect.right > winW) {
                        tooltip.style.left = 'auto';
                        tooltip.style.right = '105%';
                    } else {
                        tooltip.style.left = '105%';
                        tooltip.style.right = 'auto';
                    }

                    // Vertical flip if it hits the bottom edge (prevents scroll-vibration)
                    if (rect.bottom > winH) {
                        tooltip.style.top = 'auto';
                        tooltip.style.bottom = '0';
                    } else {
                        tooltip.style.top = '0';
                        tooltip.style.bottom = 'auto';
                    }
                }
            };

            // Remove tooltip on mouse exit for PC
            item.onmouseleave = () => {
                if (window.innerWidth >= 1024) {
                    tooltip.style.display = 'none';
                }
            };

            box.appendChild(item);
        });
        grid.appendChild(box);
    }
}

// Fire it up
init();
