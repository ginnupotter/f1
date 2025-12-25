const continents = [
    { name: "Europe", tz: "Europe/London", label: "UK / GMT" },
    { name: "Europe (Central)", tz: "Europe/Paris", label: "CET" },
    { name: "Americas (East)", tz: "America/New_York", label: "ET" },
    { name: "Americas (West)", tz: "America/Los_Angeles", label: "PT" },
    { name: "Asia", tz: "Asia/Tokyo", label: "JST" },
    { name: "Australia", tz: "Australia/Melbourne", label: "AEDT" }
];

async function loadRacePage() {
    try {
        // 1. Fetch the data from the external JSON file
        const response = await fetch('races.json');
        if (!response.ok) throw new Error("Could not load race data.");
        const raceData = await response.json();

        // 2. Find the next race
        const now = new Date();
        const nextRace = raceData.find(r => new Date(r.sessions.gp) > now) || raceData[0];

        // 3. Update Hero Section
        document.getElementById('race-name').innerText = `${nextRace.name} Grand Prix`;
        document.getElementById('race-location').innerText = nextRace.location;

        // 4. Generate Continent Boxes
        const grid = document.getElementById('timezone-grid');
        grid.innerHTML = ''; // Clear "Loading..." text

        continents.forEach(cont => {
            const box = document.createElement('div');
            box.className = 'continent-box';
            
            let sessionsHtml = `<h3>${cont.name} <small style="font-size:0.6em; color:gray">(${cont.label})</small></h3>`;
            
            // Loop through the sessions object in the JSON
            for (const [session, utcTime] of Object.entries(nextRace.sessions)) {
                const dateObj = new Date(utcTime);
                
                const localTime = dateObj.toLocaleTimeString('en-GB', {
                    timeZone: cont.tz,
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                const localDate = dateObj.toLocaleDateString('en-GB', {
                    timeZone: cont.tz,
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short'
                });

                sessionsHtml += `
                    <div class="session-row">
                        <span class="session-name">${session.replace(/([A-Z])/g, ' $1')}</span>
                        <span class="session-time">${localDate} — ${localTime}</span>
                    </div>`;
            }
            
            box.innerHTML = sessionsHtml;
            grid.appendChild(box);
        });

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('race-name').innerText = "Error loading schedule";
    }
}

loadRacePage();
