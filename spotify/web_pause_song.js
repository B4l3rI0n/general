(function () {
  const minutes = parseFloat(prompt("⏰ Enter sleep timer in minutes (e.g. 30):"));
  if (isNaN(minutes) || minutes <= 0) {
    alert("❌ Invalid time entered.");
    return;
  }

  let remaining = Math.floor(minutes * 60);

  // Create floating box
  const timerBox = document.createElement("div");
  timerBox.id = "spotifySleepTimerBox";
  Object.assign(timerBox.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#1db954",
    color: "white",
    padding: "10px 15px",
    borderRadius: "10px",
    fontSize: "16px",
    zIndex: "999999",
    fontFamily: "sans-serif",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    cursor: "move",
  });
  timerBox.textContent = `Pausing in ${minutes}:00`;
  document.body.appendChild(timerBox);

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  timerBox.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - timerBox.getBoundingClientRect().left;
    offsetY = e.clientY - timerBox.getBoundingClientRect().top;
    timerBox.style.transition = "none";
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      timerBox.style.left = e.clientX - offsetX + "px";
      timerBox.style.top = e.clientY - offsetY + "px";
      timerBox.style.right = "auto"; 
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

  
  const interval = setInterval(() => {
    if (!document.body.contains(timerBox)) {
      clearInterval(interval);
      return;
    }

    remaining--;
    const mins = Math.floor(remaining / 60);
    const secs = String(remaining % 60).padStart(2, '0');
    timerBox.textContent = `Pausing in ${mins}:${secs}`;

    if (remaining <= 10) timerBox.style.background = "#f39c12";
    if (remaining <= 0) {
      clearInterval(interval);
      tryPauseWithRetry();
    }
  }, 1000);

  
  function tryPauseWithRetry() {
    let attempts = 0;
    const maxAttempts = 10;

    const retryInterval = setInterval(() => {
      const pauseBtn =
        document.querySelector('[aria-label="Pause"]') ||
        document.querySelector('[data-testid="control-button-pause"]');

      if (pauseBtn) {
        pauseBtn.click();
        timerBox.textContent = "⏸️ Spotify Paused";
        timerBox.style.background = "#e74c3c";
        clearInterval(retryInterval);
      } else if (attempts >= maxAttempts) {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
        timerBox.textContent = "⏸️ Spotify Paused (fallback)";
        timerBox.style.background = "#e67e22";
        clearInterval(retryInterval);
      }

      attempts++;
    }, 1000);
  }
})();
