let allRaces = [];

// Embedded fallback when fetch('races.json') fails (e.g. opening file directly)
const RACES_FALLBACK = [{"name":"Australian","location":"Melbourne","sessions":{"fp1":"2026-03-06T01:30:00Z","fp2":"2026-03-06T05:00:00Z","fp3":"2026-03-07T01:30:00Z","qualifying":"2026-03-07T05:00:00Z","gp":"2026-03-08T04:00:00Z"}},{"name":"Chinese","location":"Shanghai","sessions":{"fp1":"2026-03-13T03:30:00Z","sprintQualifying":"2026-03-13T07:30:00Z","sprint":"2026-03-14T03:00:00Z","qualifying":"2026-03-14T07:00:00Z","gp":"2026-03-15T07:00:00Z"}},{"name":"Japanese","location":"Suzuka","sessions":{"fp1":"2026-03-27T02:30:00Z","fp2":"2026-03-27T06:00:00Z","fp3":"2026-03-28T02:30:00Z","qualifying":"2026-03-28T06:00:00Z","gp":"2026-03-29T05:00:00Z"}},{"name":"Bahrain","location":"Sakhir","cancelled":true,"sessions":{"fp1":"2026-04-10T11:30:00Z","fp2":"2026-04-10T15:00:00Z","fp3":"2026-04-11T12:30:00Z","qualifying":"2026-04-11T16:00:00Z","gp":"2026-04-12T15:00:00Z"}},{"name":"Saudi Arabian","location":"Jeddah","cancelled":true,"sessions":{"fp1":"2026-04-17T13:30:00Z","fp2":"2026-04-17T17:00:00Z","fp3":"2026-04-18T13:30:00Z","qualifying":"2026-04-18T17:00:00Z","gp":"2026-04-19T17:00:00Z"}},{"name":"Miami","location":"Miami","sessions":{"fp1":"2026-05-01T16:30:00Z","sprintQualifying":"2026-05-01T20:30:00Z","sprint":"2026-05-02T16:00:00Z","qualifying":"2026-05-02T20:00:00Z","gp":"2026-05-03T20:00:00Z"}},{"name":"Canadian","location":"Montreal","sessions":{"fp1":"2026-05-22T16:30:00Z","sprintQualifying":"2026-05-22T20:30:00Z","sprint":"2026-05-23T16:00:00Z","qualifying":"2026-05-23T20:00:00Z","gp":"2026-05-24T20:00:00Z"}},{"name":"Monaco","location":"Monte Carlo","sessions":{"fp1":"2026-06-05T11:30:00Z","fp2":"2026-06-05T15:00:00Z","fp3":"2026-06-06T10:30:00Z","qualifying":"2026-06-06T14:00:00Z","gp":"2026-06-07T13:00:00Z"}},{"name":"Spanish","location":"Barcelona","sessions":{"fp1":"2026-06-12T11:30:00Z","fp2":"2026-06-12T15:00:00Z","fp3":"2026-06-13T10:30:00Z","qualifying":"2026-06-13T14:00:00Z","gp":"2026-06-14T13:00:00Z"}},{"name":"Austrian","location":"Spielberg","sessions":{"fp1":"2026-06-26T11:30:00Z","fp2":"2026-06-26T15:00:00Z","fp3":"2026-06-27T10:30:00Z","qualifying":"2026-06-27T14:00:00Z","gp":"2026-06-28T13:00:00Z"}},{"name":"British","location":"Silverstone","sessions":{"fp1":"2026-07-03T11:30:00Z","sprintQualifying":"2026-07-03T15:30:00Z","sprint":"2026-07-04T11:00:00Z","qualifying":"2026-07-04T15:00:00Z","gp":"2026-07-05T14:00:00Z"}},{"name":"Belgian","location":"Spa-Francorchamps","sessions":{"fp1":"2026-07-17T11:30:00Z","fp2":"2026-07-17T15:00:00Z","fp3":"2026-07-18T10:30:00Z","qualifying":"2026-07-18T14:00:00Z","gp":"2026-07-19T13:00:00Z"}},{"name":"Hungarian","location":"Budapest","sessions":{"fp1":"2026-07-24T11:30:00Z","fp2":"2026-07-24T15:00:00Z","fp3":"2026-07-25T10:30:00Z","qualifying":"2026-07-25T14:00:00Z","gp":"2026-07-26T13:00:00Z"}},{"name":"Dutch","location":"Zandvoort","sessions":{"fp1":"2026-08-21T10:30:00Z","sprintQualifying":"2026-08-21T14:30:00Z","sprint":"2026-08-22T10:00:00Z","qualifying":"2026-08-22T14:00:00Z","gp":"2026-08-23T13:00:00Z"}},{"name":"Italian","location":"Monza","sessions":{"fp1":"2026-09-04T10:30:00Z","fp2":"2026-09-04T14:00:00Z","fp3":"2026-09-05T10:30:00Z","qualifying":"2026-09-05T14:00:00Z","gp":"2026-09-06T13:00:00Z"}},{"name":"Spanish","location":"Madrid","sessions":{"fp1":"2026-09-11T11:30:00Z","fp2":"2026-09-11T15:00:00Z","fp3":"2026-09-12T10:30:00Z","qualifying":"2026-09-12T14:00:00Z","gp":"2026-09-13T13:00:00Z"}},{"name":"Azerbaijan","location":"Baku","sessions":{"fp1":"2026-09-24T08:30:00Z","fp2":"2026-09-24T12:00:00Z","fp3":"2026-09-25T08:30:00Z","qualifying":"2026-09-25T12:00:00Z","gp":"2026-09-26T11:00:00Z"}},{"name":"Singapore","location":"Singapore","sessions":{"fp1":"2026-10-09T09:30:00Z","sprintQualifying":"2026-10-09T12:30:00Z","sprint":"2026-10-10T09:00:00Z","qualifying":"2026-10-10T13:00:00Z","gp":"2026-10-11T12:00:00Z"}},{"name":"United States","location":"Austin","sessions":{"fp1":"2026-10-23T17:30:00Z","fp2":"2026-10-23T21:00:00Z","fp3":"2026-10-24T17:30:00Z","qualifying":"2026-10-24T21:00:00Z","gp":"2026-10-25T20:00:00Z"}},{"name":"Mexican","location":"Mexico City","sessions":{"fp1":"2026-10-30T18:30:00Z","fp2":"2026-10-30T22:00:00Z","fp3":"2026-10-31T17:30:00Z","qualifying":"2026-10-31T21:00:00Z","gp":"2026-11-01T20:00:00Z"}},{"name":"Brazilian","location":"Sao Paulo","sessions":{"fp1":"2026-11-06T15:30:00Z","fp2":"2026-11-06T19:00:00Z","fp3":"2026-11-07T14:30:00Z","qualifying":"2026-11-07T18:00:00Z","gp":"2026-11-08T17:00:00Z"}},{"name":"Las Vegas","location":"Las Vegas","sessions":{"fp1":"2026-11-20T00:30:00Z","fp2":"2026-11-20T04:00:00Z","fp3":"2026-11-21T00:30:00Z","qualifying":"2026-11-21T04:00:00Z","gp":"2026-11-22T04:00:00Z"}},{"name":"Qatar","location":"Doha","sessions":{"fp1":"2026-11-27T13:30:00Z","fp2":"2026-11-27T17:00:00Z","fp3":"2026-11-28T14:30:00Z","qualifying":"2026-11-28T18:00:00Z","gp":"2026-11-29T16:00:00Z"}},{"name":"Abu Dhabi","location":"Yas Marina","sessions":{"fp1":"2026-12-04T09:30:00Z","fp2":"2026-12-04T13:00:00Z","fp3":"2026-12-05T10:30:00Z","qualifying":"2026-12-05T14:00:00Z","gp":"2026-12-06T13:00:00Z"}}];

// Session key → display label
const SESSION_LABELS = {
    fp1: 'FP1',
    fp2: 'FP2',
    fp3: 'FP3',
    qualifying: 'Qualifying',
    gp: 'Race',
    sprintQualifying: 'Sprint Qualifying',
    sprint: 'Sprint'
};

function getUserTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
        return null;
    }
}

function isRaceCancelled(race) {
    return race && race.cancelled === true;
}

/** Next Grand Prix race start (sessions.gp), skipping cancelled rounds */
function getNextRaceGp(races) {
    const now = new Date();
    for (const race of races) {
        if (isRaceCancelled(race)) continue;
        const d = new Date(race.sessions.gp);
        if (d > now) return { race, date: d };
    }
    return null;
}

function formatInTimezone(date, userTz) {
    const dateStr = date.toLocaleDateString('en-GB', {
        timeZone: userTz,
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('en-GB', {
        timeZone: userTz,
        hour: '2-digit',
        minute: '2-digit'
    });
    return { dateStr, timeStr };
}

function updateNextRaceStrip(races, userTz) {
    const detailEl = document.getElementById('next-race-detail');
    const tzLabelEl = document.getElementById('user-tz-label');
    if (!detailEl || !tzLabelEl) return;

    if (!userTz) {
        detailEl.textContent = 'Timezone could not be detected';
        tzLabelEl.textContent = '';
        return;
    }

    tzLabelEl.textContent = `(${userTz})`;

    const next = getNextRaceGp(races);
    if (!next) {
        detailEl.textContent = 'No upcoming races this season';
        return;
    }

    const { dateStr, timeStr } = formatInTimezone(next.date, userTz);
    detailEl.textContent = `${next.race.name} GP — ${dateStr}, ${timeStr}`;
}

let countdownInterval = null;

function clearCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function formatCountdown(ms) {
    if (ms <= 0) return null;
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (d > 0) {
        return `${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
    }
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startCountdownForRace(race) {
    clearCountdown();
    const display = document.getElementById('countdown-display');
    const block = document.getElementById('countdown-block');
    if (!display || !block) return;

    if (isRaceCancelled(race)) {
        display.textContent = 'Grand Prix cancelled';
        display.classList.add('countdown-muted');
        return;
    }

    const gp = new Date(race.sessions.gp);
    const tick = () => {
        const ms = gp - Date.now();
        const formatted = formatCountdown(ms);
        if (formatted) {
            display.textContent = formatted;
            display.classList.remove('countdown-muted');
        } else {
            display.textContent = 'Race started';
            display.classList.add('countdown-muted');
            clearCountdown();
        }
    };

    tick();
    countdownInterval = setInterval(tick, 1000);
}

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

async function init() {
    try {
        try {
            const response = await fetch('races.json');
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length) allRaces = data;
            }
        } catch (e) { /* fetch failed, e.g. file:// */ }
        if (!allRaces.length) allRaces = RACES_FALLBACK;

        const slider = document.getElementById('race-slider');
        const now = new Date();

        function defaultActiveIndex() {
            let idx = allRaces.findIndex(r => !isRaceCancelled(r) && new Date(r.sessions.gp) > now);
            if (idx === -1) idx = allRaces.findIndex(r => !isRaceCancelled(r));
            if (idx === -1) idx = 0;
            return idx;
        }
        const nextIdx = defaultActiveIndex();

        allRaces.forEach((race, i) => {
            const gpDate = new Date(race.sessions.gp);
            const cancelled = isRaceCancelled(race);
            const isPast = !cancelled && gpDate < now;

            const card = document.createElement('div');
            card.className = `race-card ${i === nextIdx ? 'active' : ''} ${isPast ? 'past' : ''} ${cancelled ? 'race-card-cancelled' : ''}`;
            card.setAttribute('aria-disabled', cancelled ? 'true' : 'false');

            const dateStr = gpDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
            const statusLine = cancelled
                ? '<small class="cancelled-label">Cancelled</small>'
                : `<small>${dateStr}</small>`;

            card.innerHTML = `
                <span>ROUND ${i + 1}</span>
                <strong>${race.name}</strong>
                ${statusLine}
            `;

            if (!cancelled) {
                card.onclick = () => {
                    document.querySelectorAll('.race-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    updateUI(i);
                };
            }
            slider.appendChild(card);
            
            if (i === nextIdx) {
                setTimeout(() => card.scrollIntoView({ behavior: 'smooth', inline: 'center' }), 100);
            }
        });

        // BUTTON NAVIGATION LOGIC
        const scrollAmount = 300;
        document.getElementById('next-btn').onclick = () => {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        };
        document.getElementById('prev-btn').onclick = () => {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        };

        const userTz = getUserTimezone();
        updateNextRaceStrip(allRaces, userTz);

        updateUI(nextIdx);
    } catch (e) { console.error(e); }
}

function updateUI(idx) {
    const race = allRaces[idx];
    document.getElementById('race-name').textContent = race.name + " GP";
    document.getElementById('race-location').textContent = race.location;

    startCountdownForRace(race);

    const grid = document.getElementById('continent-grid');
    grid.innerHTML = '';

    for (const [continent, cities] of Object.entries(continentData)) {
        const box = document.createElement('div');
        box.className = 'continent-box';
        box.innerHTML = `<h3>${continent}</h3>`;
        
        cities.forEach(city => {
            const item = document.createElement('div');
            item.className = 'city-item';
            item.innerHTML = `<span>${city.name.replace('_', ' ')}</span>`;

            const tooltip = document.createElement('div');
            tooltip.className = 'session-tooltip';
            
            // Mobile Close Button
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-tooltip';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = (e) => { e.stopPropagation(); tooltip.style.display = 'none'; };
            tooltip.appendChild(closeBtn);

            let content = `<h4 style="margin:0 0 10px 0; border-bottom:1px solid #ddd; padding-bottom:5px;">${city.name.replace('_', ' ')}</h4>`;
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
            
            const wrap = document.createElement('div');
            wrap.innerHTML = content;
            tooltip.appendChild(wrap);
            item.appendChild(tooltip);

            item.onmouseenter = () => {
                tooltip.style.display = 'block';
                if (window.innerWidth >= 1024) {
                    const rect = tooltip.getBoundingClientRect();
                    if (rect.right > window.innerWidth) {
                        tooltip.style.left = 'auto';
                        tooltip.style.right = '105%';
                    } else {
                        tooltip.style.left = '105%';
                        tooltip.style.right = 'auto';
                    }
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