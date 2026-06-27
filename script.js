const countdown = document.getElementById("countdown");
const mask = document.getElementById("mask");

// 12:00 AM CDT June 27, 2026 (UTC 05:00)
const EVENT_START = new Date("2026-06-27T05:00:00Z").getTime();

// 6 hours reveal
const EVENT_DURATION = 6 * 60 * 60 * 1000;

function format(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));

    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    return `${h}h ${m}m ${s}s`;
}

function update() {
    const now = Date.now();

    // BEFORE START
    if (now < EVENT_START) {
        countdown.textContent = format(EVENT_START - now);
        mask.style.opacity = 1;
        requestAnimationFrame(update);
        return;
    }

    // DURING EVENT
    const elapsed = now - EVENT_START;
    const progress = Math.min(elapsed / EVENT_DURATION, 1);

    // MASK FADES OUT OVER TIME
    mask.style.opacity = 1 - progress;

    // COUNTDOWN
    const remaining = Math.max(EVENT_DURATION - elapsed, 0);
    countdown.textContent = format(remaining);

    requestAnimationFrame(update);
}

update();
