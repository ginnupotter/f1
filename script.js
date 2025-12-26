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
    document.getElementById('race-location').textContent
