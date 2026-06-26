const video = document.getElementById("bgVideo");
const countdown = document.getElementById("countdown");

// Event starts:
// June 27, 2026 - 12:00 AM CDT
const EVENT_START = new Date("2026-06-27T05:00:00Z").getTime();

// Event lasts 6 hours
const EVENT_DURATION = 6 * 60 * 60 * 1000;

let videoReady = false;

video.addEventListener("loadedmetadata", () => {
    video.pause();
    video.currentTime = 0;
    videoReady = true;
});

function formatTime(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
}

function update() {
    const now = Date.now();

    // BEFORE EVENT
    if (now < EVENT_START) {
        countdown.textContent = formatTime(EVENT_START - now);

        if (videoReady) {
            video.currentTime = 0;
        }

        requestAnimationFrame(update);
        return;
    }

    // DURING EVENT
    const elapsed = now - EVENT_START;
    const progress = Math.min(elapsed / EVENT_DURATION, 1);

    if (videoReady) {
        const targetTime = progress * video.duration;

        // Only seek if necessary to avoid excessive seeking
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
            video.currentTime = targetTime;
        }
    }

    const remaining = Math.max(EVENT_DURATION - elapsed, 0);
    countdown.textContent = formatTime(remaining);

    requestAnimationFrame(update);
}

update();
