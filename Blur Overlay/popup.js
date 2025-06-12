document.getElementById('toggle-blur').onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: 'toggle-blur' });
  });
};

document.getElementById('add-overlay').onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: 'add-overlay' });
  });
};

document.getElementById('blur-slider').oninput = (e) => {
  const intensity = e.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: 'set-blur', value: intensity });
  });
};
