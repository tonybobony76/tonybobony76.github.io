const countdown = document.getElementById("countdown");

if (!countdown) {
    console.error("Countdown element not found");
}

function tick() {
    const now = new Date();
    countdown.textContent = now.toLocaleTimeString();
}

setInterval(() => {
    if (countdown) tick();
}, 1000);

tick();
