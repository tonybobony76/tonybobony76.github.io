const video = document.getElementById("bgVideo");
const layerA = document.getElementById("layerA");
const layerB = document.getElementById("layerB");
const countdown = document.getElementById("countdown");

// 6 hours total duration
const TOTAL_TIME = 6 * 60 * 60 * 1000;

// persistent start time (survives refresh)
const startTime =
  parseInt(localStorage.getItem("startTime")) ||
  Date.now();

localStorage.setItem("startTime", startTime);

video.addEventListener("loadedmetadata", () => {
  const duration = video.duration;

  video.play();

  function update() {
    const now = Date.now();

    let progress = (now - startTime) / TOTAL_TIME;

    // clamp 0–1
    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;

    // VIDEO SCRUB (key part)
    video.currentTime = progress * duration;

    // IMAGE CROSSFADE
    layerA.style.opacity = 1 - progress;
    layerB.style.opacity = progress;

    // COUNTDOWN
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
