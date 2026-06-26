const video = document.getElementById("bgVideo");
const countdown = document.getElementById("countdown");

// Midnight June 27, 2026 CDT (UTC-5)
const EVENT_START = new Date("2026-06-27T05:00:00Z").getTime();

// 6 hours
const EVENT_DURATION = 6 * 60 * 60 * 1000;

function format(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));

    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    if (d > 0) {
        return `${d}d ${h}h ${m}m ${s}s`;
    }

    return `${h}h ${m}m ${s}s`;
}

function syncVideo() {
    if (!video.duration || !isFinite(video.duration))
        return;

    const now = Date.now();

    if (now < EVENT_START) {
        if (Math.abs(video.currentTime) > 0.25)
            video.currentTime = 0;

        return;
    }

    const elapsed = now - EVENT_START;
    const progress = Math.min(elapsed / EVENT_DURATION, 1);

    const target = progress * video.duration;

    if (Math.abs(video.currentTime - target) > 0.5) {
        video.currentTime = target;
    }
}

function updateCountdown() {
    const now = Date.now();

    if (now < EVENT_START) {
        countdown.textContent = format(EVENT_START - now);
    } else {
        const remaining = Math.max(EVENT_DURATION - (now - EVENT_START), 0);
        countdown.textContent = format(remaining);
    }
}

video.addEventListener("loadedmetadata", () => {
    video.play().catch(() => {});
});

setInterval(updateCountdown, 1000);
setInterval(syncVideo, 1000);

updateCountdown();
