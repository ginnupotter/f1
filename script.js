const raceData = [
    {
      name: "Australian",
      location: "Melbourne",
      sessions: { fp1: "2026-03-06T01:30:00Z", fp2: "2026-03-06T05:00:00Z", fp3: "2026-03-07T01:30:00Z", qualifying: "2026-03-07T05:00:00Z", gp: "2026-03-08T04:00:00Z" }
    },
    {
      name: "Chinese",
      location: "Shanghai",
      sessions: { fp1: "2026-03-13T03:30:00Z", sprintQualifying: "2026-03-13T07:30:00Z", sprint: "2026-03-14T03:00:00Z", qualifying: "2026-03-14T07:00:00Z", gp: "2026-03-15T07:00:00Z" }
    }
];

const continents = [
    { name: "Europe", tz: "Europe/London", label: "UK / GMT" },
    { name: "Europe (Central)", tz: "Europe/Paris", label: "CET" },
    { name: "Americas (East)", tz: "America/New_York", label: "ET" },
    { name: "Americas (West)", tz: "America/Los_Angeles", label: "PT" },
    { name: "Asia", tz: "Asia/Tokyo", label: "JST" },
    { name: "Australia", tz: "Australia/Melbourne", label: "AEDT" }
];

function init() {
    // 1. Find the next race (first race where GP time > now)
    const now = new Date();
    const nextRace = raceData.find(r => new Date(r.sessions.gp) > now) || raceData[0];

    // 2. Update Hero
    document.getElementById('race-name').innerText = `${nextRace.name} Grand Prix`;
    document.getElementById('race-location').innerText = nextRace.location;

    // 3. Generate Continent Boxes
    const grid = document.getElementById('timezone-grid');
    
    continents.forEach(cont => {
        const box = document.createElement('div');
        box.className = 'continent-box';
        
        let sessionsHtml = `<h3>${cont.name} <small style="font-size:0.6em; color:gray">(${cont.label})</small></h3>`;
        
        for (const [session, utcTime] of Object.entries(nextRace.sessions)) {
            const localTime = new Date(utcTime).toLocaleTimeString('en-GB', {
                timeZone: cont.tz,
                hour: '2-digit',
                minute: '2-digit'
            });
            const localDate = new Date(utcTime).toLocaleDateString('en-GB', {
                timeZone: cont.tz,
                weekday: 'short'
            });

            sessionsHtml += `
                <div class="session-row">
                    <span class="session-name">${session}</span>
                    <span class="session-time">${localDate} ${localTime}</span>
                </div>`;
        }
        
        box.innerHTML = sessionsHtml;
        grid.appendChild(box);
    });
}

init();
