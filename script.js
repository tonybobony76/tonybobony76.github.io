const countdown = document.getElementById("countdown");
const mask = document.getElementById("mask");

console.log("SCRIPT LOADED", { countdown, mask });

// June 27 2026 12:00 AM CDT (UTC)
const EVENT_START = new Date("2026-06-27T05:00:00Z").getTime();
const EVENT_DURATION = 6 * 60 * 60 * 1000;

function update() {
    const now = Date.now();

    if (!mask) {
        console.error("MASK ELEMENT NOT FOUND");
        return;
    }

    const elapsed = now - EVENT_START;
    const progress = Math.min(Math.max(elapsed / EVENT_DURATION, 0), 1);

    console.log("progress:", progress);

    mask.style.opacity = 1 - progress;

    requestAnimationFrame(update);
}

update();
