const overlays = [];
let blurVisible = true;
let blurIntensity = 8;

function createOverlay(x = 50, y = 50) {
  const overlay = document.createElement('div');
  overlay.className = 'custom-blur-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: `${y}px`,
    left: `${x}px`,
    width: '300px',
    height: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: `blur(${blurIntensity}px)`,
    WebkitBackdropFilter: `blur(${blurIntensity}px)`, 
    zIndex: '999999',
    resize: 'both',
    overflow: 'auto',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    cursor: 'move',
    boxSizing: 'border-box',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' 
});


  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  overlay.addEventListener('mousedown', (e) => {
    const isResizing = e.offsetX > overlay.clientWidth - 20 && e.offsetY > overlay.clientHeight - 20;
    if (!isResizing) {
      isDragging = true;
      offsetX = e.clientX - overlay.offsetLeft;
      offsetY = e.clientY - overlay.offsetTop;
      e.preventDefault();
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      overlay.style.left = `${e.clientX - offsetX}px`;
      overlay.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  document.body.appendChild(overlay);
  overlays.push(overlay);
}

document.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key.toLowerCase() === 'b') {
    blurVisible = !blurVisible;
    overlays.forEach(o => o.style.display = blurVisible ? 'block' : 'none');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'add-overlay') {
    createOverlay();
  } else if (request.action === 'toggle-blur') {
    blurVisible = !blurVisible;
    overlays.forEach(o => o.style.display = blurVisible ? 'block' : 'none');
  } else if (request.action === 'set-blur') {
    blurIntensity = request.value;
    overlays.forEach(o => {
      o.style.backdropFilter = `blur(${blurIntensity}px)`;
      o.style.WebkitBackdropFilter = `blur(${blurIntensity}px)`;
    });
  }
});
