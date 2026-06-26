const startTime = new Date("2026-06-26T00:00:00Z").getTime();
const endTime   = new Date("2026-07-10T00:00:00Z").getTime();

const layerA = document.getElementById("layerA");
const layerB = document.getElementById("layerB");
const countdown = document.getElementById("countdown");

function update() {
  const now = Date.now();

  let progress = (now - startTime) / (endTime - startTime);
  progress = Math.min(Math.max(progress, 0), 1);

  // Crossfade images
  layerA.style.opacity = 1 - progress;
  layerB.style.opacity = progress;

  // Countdown
  const remaining = Math.max(endTime - now, 0);
  const seconds = Math.floor(remaining / 1000);

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  countdown.textContent =
    `${d}d ${h}h ${m}m ${s}s`;

  requestAnimationFrame(update);
}

update();
