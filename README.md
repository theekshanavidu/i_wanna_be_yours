# 💖 Romantic Interactive Surprise Gift Website 🐾🐱

A soft aesthetic, pastel-pink interactive surprise website designed with cute cartoon cat couple illustrations & real cute cat polaroids, created as a special gift for your girlfriend!

---

## ✨ Features & Flow

1. **🎁 Screen 0: Welcome Landing Screen ("Surprise! Click To Enter")**:
   - Cute cat couple artwork.
   - Large glowing pulsating button: `[ 🎁 Surprise! Click To Enter ✨ ]`.
   - On click, explodes confetti and smoothly opens the Secret Passcode screen.

2. **🔐 Screen 1: Secret Passcode Lock Screen (Split Layout)**:
   - **Left**: 3 Polaroid-style real cat couple photos that **auto-change continuously with love** every 2.6 seconds!
   - **Right**: 4-Digit Heart PIN lock (`♡ ♡ ♡ ♡` ➔ `♥ ♥ ♥ ♥`).
   - Keypad with click sounds and wrong-PIN wobble animation.
   - **Passcode:** `0711`
   - **Hint:** `Anniversary "MMDD"` (Revealed on clicking "Need a hint, sweetie?").

3. **🎀 Screen 2: Mystery Gift Boxes Menu**:
   - 3 mysterious boxes with no spoilers:
     - **Surprise Gift 1 🎁** [ Open 🎀 ]
     - **Surprise Gift 2 🎁** [ Open 🎀 ]
     - **Surprise Gift 3 🎁** [ Open 🎀 ]
   - Music is quiet on this screen so each box is a total surprise!

4. **💐 Screen 3: Box 1 (Bouquet of Love)**:
   - Huge blooming flower bouquets surrounding the screen + continuous falling rose petals.
   - Cat couple bouquet artwork + handwritten Sinhala poem card:
     > *"අවාරෙක මෙහි ඇවිත් මගේ හද කියවන්න*  
     > *ලියා යමි ගැඹුරු තැන 'ආදරෙයි උතුරන්න'*  
     > *හමා යන සුළඟකින් මගේ නම විමසන්න*  
     > *තබා ගිය පණිවුඩෙන් ආදරෙද පවසන්න"*
   - Automatically plays **"ආදරෙයි උතුරන්න" - පසිඳු ගංගාදර** on loop while inside Box 1!
   - Stops immediately when leaving Box 1.

5. **🎵 Screen 4: Box 2 (Retro Vinyl Player)**:
   - Retro turntable with spinning vinyl and movable needle arm.
   - Plays full song: **"Pure Love" - Arash Feat. Helena**.
   - Play/Pause toggle, seek bar, time display.
   - Stops immediately when leaving Box 2.

6. **💌 Screen 5: Box 3 (Love Letter)**:
   - Romantic stationery with washi tapes and wax seal.
   - Automatically plays **`video_2026-11-08_01-37-40.mp3`** on loop while inside Box 3!
   - Full heartfelt love letter from your heart.
   - Interactive "I Love You More! 💖" button triggering a screen-filling celebration modal with hearts and dancing cats.
   - Stops immediately when leaving Box 3.

7. **💖 Heart-Shaped QR Code ([qr.html](qr.html))**:
   - Dedicated printable card generator to download a printable PNG gift card with your live website link!

---

## 📁 File Structure

```
d:\SE\Hart\
├── index.html          # Main web application
├── style.css           # Pastel pink soft romantic design & animations
├── script.js           # Audio engine, navigation & interactions
├── config.js           # Easy settings (PIN: 0711, hints, songs)
├── qr.html             # Printable Heart QR Code generator
├── package.json        # Node.js runner config (npm start)
├── README.md           # Documentation
└── assets\
    ├── audio\
    │   ├── adarei-uthuranna-pasindu-gangadara.mp3   # Box 1 song
    │   ├── Arash - Pure Love Feat. Helena.mp3      # Box 2 song
    │   └── video_2026-11-08_01-37-40.mp3           # Box 3 song
    ├── images\
    │   ├── cat-couple-1.jpg
    │   ├── cat-couple-2.jpg
    │   ├── cat-couple-3.jpg
    │   ├── cat-couple-main.svg
    │   ├── cat-bouquet.svg
    │   ├── cat-music.svg
    │   ├── cat-letter.svg
    │   ├── cat-paw.svg
    │   ├── giftbox.svg
    │   ├── big-bouquet-left.svg
    │   └── big-bouquet-right.svg
    └── qrcode.min.js
```

---

## 🚀 How to Run Locally

Double-click `index.html` in Chrome or Edge, or run `npm start` in the folder.
Passcode: `0711` (Hint: `Anniversary "MMDD"`).
