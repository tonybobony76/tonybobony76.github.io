const video = document.getElementById("bgVideo");
const countdown = document.getElementById("countdown");

const TOTAL_TIME = 6 * 60 * 60 * 1000;

// 12 AM CST = 06:00 UTC
const startTime = new Date("2026-06-26T06:00:00Z").getTime();

video.addEventListener("loadedmetadata", () => {
  const duration = video.duration;
  video.play();

  function update() {
    const now = Date.now();
    const elapsed = now - startTime;

    // BEFORE START
    if (elapsed < 0) {
      video.currentTime = 0;
      countdown.textContent = "Starting soon";
      requestAnimationFrame(update);
      return;
    }

    let progress = elapsed / TOTAL_TIME;

    // AFTER END
    if (progress >= 1) {
      progress = 1;
    }

    video.currentTime = progress * duration;

    const remaining = Math.max(TOTAL_TIME - elapsed, 0);

    const seconds = Math.floor(remaining / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    countdown.textContent = `${h}h ${m}m ${s}s`;

    requestAnimationFrame(update);
  }

  update();
});
