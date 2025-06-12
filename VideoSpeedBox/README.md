# 🎬 VideoSpeedBox

**VideoSpeedBox** is a floating, draggable speed controller that gives you total control over video playback on any website. It works with most HTML5 videos and gives you a visual interface to change playback speed — with presets, fine-tuning, auto-speed ramp-up, and more.

![VideoSpeedBox Screenshot](https://github.com/user-attachments/assets/754232d0-2f96-4d27-b525-0a4063108817)

---

## 🚀 Features

- 🖱️ **Draggable Controller** – Move it anywhere on your screen
- ⚡ **Speed Presets** – Instantly jump to `1x`, `1.5x`, `2x`, `5x`, or `10x`
- 🎚️ **Fine Slider Control** – Adjust speed smoothly from `0.1x` up to `10x`
- ⏩ **Auto-Speed Ramp-Up** – Gradually increases speed to a max value
- ◻️ **Minimize/Expand Button** – Clean up your screen when not in use
- 🔄 **Works on New Videos Dynamically** – No need to reload!
- ⌨️ **Keyboard Shortcuts**:
  - `+` or `=` → Increase speed
  - `-` or `_` → Decrease speed
  - `s` → Show/hide controller box

---

## 🧩 How to Use

### as extension

1. Clone or download this [directory](https://github.com/B4l3rI0n/general/blob/main/VideoSpeedBox/video-speed-controller.zip)
2. Extract it
3. Go to chrome://extensions/
4. Enable Developer mode
5. Click Load unpacked and select the project folder
6. Click the extension icon in the toolbar
7. Click the icon and then use the Slider or any feature of the speed controller 

### 🛠️ From the Developer console

1. Open the website with a video.
2. Right-click anywhere on the page → click **Inspect** → go to the **Console** tab or just hit F12.
3. Paste this code in VideoSpeedBox.js and press **Enter**:
4. The controller will appear on the screen.

---

## 🔮 Planned Improvements

These features are in development to make the tool even smarter:

* ⏸️ **Auto-Speed Pause Detection**
  When the video is paused, auto-speed temporarily stops and resumes from the **current** speed — not from scratch.

* 🎯 **Smart Resume Point**
  If auto-speed target is higher than the current speed, auto resumes from where you are.
  If you're already faster than the target, auto-speed starts over from `1x`.

* 🧠 **Auto-Speed Catch-Up Logic**
  If auto-speed was interrupted, it will complete the ramp-up instead of restarting.

---

## 💡 Tips

* VideoSpeedBox works on **most websites** using normal HTML5 video.
* Some sites like **Netflix**, **Prime Video**, or **YouTube TV** may not work due to DRM or custom players.
* You can move the controller around by dragging its top bar.
---


