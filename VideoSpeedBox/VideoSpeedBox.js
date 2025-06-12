(() => {
  if (document.querySelector('[data-video-controller="true"]')) return;

  const box = document.createElement("div");
  box.setAttribute("data-video-controller", "true");
  Object.assign(box.style, {
    position: "fixed",
    top: "60px",
    right: "20px",
    background: "#111",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    zIndex: 99999,
    fontFamily: "sans-serif",
    fontSize: "14px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    display: "block",
    minWidth: "200px",
    maxWidth: "300px"
  });

  const miniToggle = document.createElement("div");
  miniToggle.textContent = "⛶";
  Object.assign(miniToggle.style, {
    position: "absolute",
    top: "5px",
    right: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#aaa"
  });
  box.appendChild(miniToggle);

  const title = document.createElement("div");
  title.textContent = "🎬 Speed Controller";
  title.style.marginBottom = "8px";
  box.appendChild(title);

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0.1";
  slider.max = "10";
  slider.step = "0.1";
  slider.value = "1";
  Object.assign(slider.style, { width: "100%" });
  box.appendChild(slider);

  const display = document.createElement("div");
  display.textContent = `Speed: 1x`;
  display.style.marginTop = "6px";
  box.appendChild(display);

  const presetContainer = document.createElement("div");
  presetContainer.style.marginTop = "8px";
  presetContainer.style.display = "flex";
  presetContainer.style.flexWrap = "wrap";
  presetContainer.style.gap = "4px";
  [1, 1.5, 2, 5, 10].forEach(val => {
    const btn = document.createElement("button");
    btn.textContent = `${val}x`;
    btn.onclick = () => {
      slider.value = val;
      updateSpeed(val);
    };
    Object.assign(btn.style, {
      flex: "1 0 20%",
      minWidth: "40px",
      padding: "4px",
      fontSize: "12px",
      background: "#444",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    });
    presetContainer.appendChild(btn);
  });
  box.appendChild(presetContainer);

  const autoWrapper = document.createElement("div");
  Object.assign(autoWrapper.style, {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "6px"
  });

  const autoBtn = document.createElement("button");
  autoBtn.textContent = "⏩ Auto-Speed";
  Object.assign(autoBtn.style, {
    background: "#2ecc71",
    color: "#fff",
    border: "none",
    padding: "6px",
    borderRadius: "5px",
    cursor: "pointer",
    flexGrow: 1,
    minWidth: "90px"
  });

  const autoMax = document.createElement("select");
  [1.5, 2, 3, 5, 10].forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = `${val}x`;
    autoMax.appendChild(opt);
  });
  autoMax.value = "2";
  Object.assign(autoMax.style, {
    padding: "4px",
    fontSize: "12px",
    borderRadius: "5px",
    flexShrink: 0,
    minWidth: "60px"
  });

  autoWrapper.appendChild(autoBtn);
  autoWrapper.appendChild(autoMax);
  box.appendChild(autoWrapper);

  let autoMode = false;
  let autoInterval = null;

  autoBtn.onclick = () => {
    if (autoMode) {
      clearInterval(autoInterval);
      autoBtn.textContent = "⏩ Auto-Speed";
      autoMode = false;
    } else {
      autoMode = true;
      autoBtn.textContent = "⏸️ Stop Auto";
      let current = 1;
      const max = parseFloat(autoMax.value);
      slider.value = "1";
      updateSpeed("1");

      autoInterval = setInterval(() => {
        if (current < max) {
          current = Math.min(max, current + 0.05);
          slider.value = current.toFixed(2);
          updateSpeed(current);
        } else {
          clearInterval(autoInterval);
          autoBtn.textContent = "⏩ Auto-Speed";
          autoMode = false;
        }
      }, 3000);
    }
  };

  slider.oninput = () => updateSpeed(slider.value);

  function updateSpeed(speed) {
    document.querySelectorAll("video").forEach(v => v.playbackRate = parseFloat(speed));
    display.textContent = `Speed: ${parseFloat(speed).toFixed(2)}x`;
  }

  new MutationObserver(() => {
    document.querySelectorAll("video").forEach(v => v.playbackRate = parseFloat(slider.value));
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener("keydown", e => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
  
    if (e.key === "+" || e.key === "=") slider.stepUp();
    if (e.key === "-" || e.key === "_") slider.stepDown();
    if (e.key === "s") floatToggle.click();
    updateSpeed(slider.value);
  });
  
  
  const originalStyles = new Map();
  [slider, display, presetContainer, autoWrapper].forEach(el => {
    originalStyles.set(el, getComputedStyle(el).display);
  });
  
  miniToggle.onclick = () => {
    const isHidden = slider.style.display === "none";
    [slider, display, presetContainer, autoWrapper].forEach(el => {
      el.style.display = isHidden ? originalStyles.get(el) : "none";
    });
    miniToggle.textContent = isHidden ? "⛶" : "◻";
  };

  box.onmousedown = function (e) {
    if (e.target !== box) return;
    let shiftX = e.clientX - box.getBoundingClientRect().left;
    let shiftY = e.clientY - box.getBoundingClientRect().top;
    function moveAt(pageX, pageY) {
      box.style.left = pageX - shiftX + 'px';
      box.style.top = pageY - shiftY + 'px';
      box.style.right = 'auto';
    }
    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.onmouseup = () => document.removeEventListener('mousemove', onMouseMove);
  };
  box.ondragstart = () => false;

  document.body.appendChild(box);

  const floatToggle = document.createElement("div");
  floatToggle.id = "videoSpeedToggle";
  Object.assign(floatToggle.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
    background: "#1db954",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "24px",
    borderRadius: "50%",
    zIndex: 10000,
    cursor: "move",
    userSelect: "none",
    boxShadow: "0 0 4px rgba(0,0,0,0.5)"
  });
  floatToggle.textContent = "▶";
  document.body.appendChild(floatToggle);

  let visible = true;
  floatToggle.onclick = () => {
    visible = !visible;
    box.style.display = visible ? "block" : "none";
    floatToggle.textContent = visible ? "▶" : "⏵";
  };

  floatToggle.onmousedown = function (e) {
    e.preventDefault();
    let shiftX = e.clientX - floatToggle.getBoundingClientRect().left;
    let shiftY = e.clientY - floatToggle.getBoundingClientRect().top;
    function moveAt(x, y) {
      floatToggle.style.left = x - shiftX + "px";
      floatToggle.style.top = y - shiftY + "px";
      floatToggle.style.right = "auto";
    }
    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }
    document.addEventListener("mousemove", onMouseMove);
    document.onmouseup = () => document.removeEventListener("mousemove", onMouseMove);
  };
  floatToggle.ondragstart = () => false;

})();
