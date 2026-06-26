const video = document.getElementById("bgVideo");
const countdown = document.getElementById("countdown");

// 6 hours total duration
const TOTAL_TIME = 6 * 60 * 60 * 1000;

// GLOBAL FIXED START TIME
// 12:00 AM CST June 26, 2026 = 06:00 UTC
const startTime = new Date("2026-06-26T06:00:00Z").getTime();

video.addEventListener("loadedmetadata", () => {
  const duration = video.duration;

  video.play();

  function update() {
    const now = Date.now();

    // progress across 6-hour event
    let progress = (now - startTime) / TOTAL_TIME;

    // clamp 0–1
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    // scrub video across full duration
    video.currentTime = progress * duration;

    // countdown (only runs during event window)
    const remaining = Math.max(TOTAL_TIME - (now - startTime), 0);

    const seconds = Math.floor(remaining / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    countdown.textContent = `${h}h ${m}m ${s}s`;

    requestAnimationFrame(update);
  }

  update();
});
