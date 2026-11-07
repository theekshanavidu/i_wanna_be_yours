/**
 * ==========================================================================
 * 💖 INTERACTIVE ROMANTIC SURPRISE GIFT ENGINE 💖
 * Designed with love, auto-changing cute cat photo polaroids,
 * intro entrance screen, mystery surprise gift boxes,
 * isolated audio playback inside boxes only, and seamless navigation.
 * ==========================================================================
 */

// --- Global State ---
const State = {
  currentScreen: 'intro-screen',
  enteredPin: '',
  isSoundEnabled: true,
  box1Audio: null,
  box2Audio: null,
  box3Audio: null,
  audioContext: null,
  activePhotoIndex: 0
};

// ==========================================================================
// 1. FLOATING HEARTS BACKGROUND CANVAS
// ==========================================================================
function initHeartsCanvas() {
  const canvas = document.getElementById('hearts-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const hearts = [];
  const colors = ['#ff758f', '#ffccd5', '#ffb3c6', '#ffd166', '#ff85a1', '#ffffff'];

  for (let i = 0; i < 30; i++) {
    hearts.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 0.8 + 0.35,
      speedX: Math.sin(Math.random() * Math.PI) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.45 + 0.2,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.02
    });
  }

  function drawHeart(x, y, size, color, opacity, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    const d = size;
    ctx.moveTo(0, d / 4);
    ctx.quadraticCurveTo(0, 0, d / 4, 0);
    ctx.quadraticCurveTo(d / 2, 0, d / 2, d / 4);
    ctx.quadraticCurveTo(d / 2, 0, (3 * d) / 4, 0);
    ctx.quadraticCurveTo(d, 0, d, d / 4);
    ctx.quadraticCurveTo(d, d / 2, (3 * d) / 4, (3 * d) / 4);
    ctx.lineTo(d / 2, d);
    ctx.lineTo(d / 4, (3 * d) / 4);
    ctx.quadraticCurveTo(0, d / 2, 0, d / 4);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let h of hearts) {
      h.y -= h.speedY;
      h.x += h.speedX;
      h.rotation += h.rotSpeed;
      if (h.y < -30) {
        h.y = height + 20;
        h.x = Math.random() * width;
      }
      if (h.x < -20) h.x = width + 20;
      if (h.x > width + 20) h.x = -20;
      drawHeart(h.x, h.y, h.size, h.color, h.opacity, h.rotation);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================================================
// 2. AMBIENT FALLING PETALS CANVAS (For Box 1 Flower Screen)
// ==========================================================================
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalColors = ['#ff758f', '#ff8da1', '#ffb3c6', '#ffd166', '#ff4d6d'];

  for (let i = 0; i < 28; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.sin(Math.random() * Math.PI) * 0.8,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.5 + 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04
    });
  }

  function drawPetal(x, y, size, color, opacity, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.6, size, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    if (State.currentScreen === 'flower-screen') {
      canvas.style.display = 'block';
      for (let p of petals) {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.02) * 0.8;
        p.rotation += p.rotSpeed;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        drawPetal(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
      }
    } else {
      canvas.style.display = 'none';
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================================================
// 3. SOUND SYNTHESIZER (Key clicks & Chimes)
// ==========================================================================
function getAudioContext() {
  if (!State.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    State.audioContext = new AudioCtx();
  }
  if (State.audioContext.state === 'suspended') {
    State.audioContext.resume();
  }
  return State.audioContext;
}

const CuteSounds = {
  keyPop() {
    if (!State.isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480 + Math.random() * 80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(960, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
  },

  giftChime() {
    if (!State.isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.65);
        }, idx * 90);
      });
    } catch (e) {}
  },

  unlockFanfare() {
    if (!State.isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.55);
        }, idx * 80);
      });
    } catch (e) {}
  },

  errorBoop() {
    if (!State.isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch (e) {}
  }
};

// ==========================================================================
// 4. AUDIO ENGINE SETUP (Isolated Audio Playback per Box)
// Box 1: "ආදරෙයි උතුරන්න" (loops)
// Box 2: "Arash - Pure Love Feat. Helena" (full song)
// Box 3: "video_2026-11-08_01-37-40.mp3" (loops)
// When leaving any box: all music STOPS immediately!
// ==========================================================================
function initAudioEngine() {
  function createAudio(path) {
    const audio = new Audio();
    audio.src = path;
    audio.preload = "auto";
    audio.loop = true;
    return audio;
  }

  // Box 1: "ආදරෙයි උතුරන්න"
  State.box1Audio = createAudio(
    (CONFIG.box1Music && CONFIG.box1Music.audioSrc) || "assets/audio/adarei-uthuranna-pasindu-gangadara.mp3"
  );

  // Box 2: "Pure Love - Arash Feat. Helena"
  State.box2Audio = createAudio(
    (CONFIG.box2Music && CONFIG.box2Music.audioSrc) || "assets/audio/Arash - Pure Love Feat. Helena.mp3"
  );

  // Box 3: Letter Song
  State.box3Audio = createAudio(
    (CONFIG.box3Music && CONFIG.box3Music.audioSrc) || "assets/audio/video_2026-11-08_01-37-40.mp3"
  );
}

function stopAllMusic() {
  [State.box1Audio, State.box2Audio, State.box3Audio].forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });

  // Reset Vinyl Turntable UI
  const vinylRecord = document.getElementById('vinyl-record');
  const tonearm = document.getElementById('tonearm-assembly');
  const playIcon = document.getElementById('play-icon');
  if (vinylRecord) vinylRecord.classList.add('paused');
  if (tonearm) tonearm.classList.remove('playing');
  if (playIcon) playIcon.textContent = '▶';
}

function playBox1Audio() {
  stopAllMusic();
  if (State.box1Audio) {
    State.box1Audio.play().catch(e => console.log("Audio gesture needed:", e));
  }
}

function playBox2Audio() {
  stopAllMusic();
  if (State.box2Audio) {
    State.box2Audio.play().then(() => {
      const vinylRecord = document.getElementById('vinyl-record');
      const tonearm = document.getElementById('tonearm-assembly');
      const playIcon = document.getElementById('play-icon');
      if (vinylRecord) {
        vinylRecord.classList.remove('paused');
        vinylRecord.classList.add('spinning');
      }
      if (tonearm) tonearm.classList.add('playing');
      if (playIcon) playIcon.textContent = '⏸';
    }).catch(e => console.log("Audio gesture needed:", e));
  }
}

function playBox3Audio() {
  stopAllMusic();
  if (State.box3Audio) {
    State.box3Audio.play().catch(e => console.log("Audio gesture needed:", e));
  }
}

// ==========================================================================
// 5. SCREEN NAVIGATION & BROWSER HISTORY SUPPORT (Backward & Forward)
// ==========================================================================
function switchScreen(targetScreenId, updateHistory = true) {
  const current = document.querySelector('.screen.active');
  const target = document.getElementById(targetScreenId);

  if (!target || current === target) return;

  if (current) {
    current.classList.remove('active');
  }
  target.classList.add('active');
  State.currentScreen = targetScreenId;

  // Manage browser history for backward/forward navigation
  if (updateHistory) {
    history.pushState({ screen: targetScreenId }, '', '#' + targetScreenId);
  }

  // --- STRICT AUDIO PLAYBACK RULE ---
  // Music ONLY plays when inside a box!
  // When leaving a box, music stops immediately!
  if (targetScreenId === 'flower-screen') {
    playBox1Audio();
  } else if (targetScreenId === 'music-screen') {
    playBox2Audio();
  } else if (targetScreenId === 'letter-screen') {
    playBox3Audio();
  } else {
    // Menu Screen, Lock Screen, Intro Screen: STOP ALL MUSIC!
    stopAllMusic();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Browser Back & Forward listener
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.screen) {
    switchScreen(e.state.screen, false);
  } else {
    switchScreen('intro-screen', false);
  }
});

// Setup click handlers for all buttons with data-nav attribute
function initNavigationButtons() {
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) {
      const targetScreen = navBtn.dataset.nav;
      CuteSounds.keyPop();
      if (targetScreen === 'lock-screen' && State.currentScreen === 'intro-screen') {
        triggerConfettiExplosion(window.innerWidth / 2, window.innerHeight / 2, 45);
      }
      switchScreen(targetScreen, true);
    }
  });
}

// ==========================================================================
// 6. LOCK SCREEN: AUTO-CHANGING 3 CAT COUPLE POLAROID PHOTOS
// Automatically cycles between the 3 photos continuously!
// ==========================================================================
function initCatPhotosGallery() {
  const polaroids = document.querySelectorAll('.cat-polaroid');
  const dots = document.querySelectorAll('.p-dot');
  if (!polaroids.length) return;

  function showPhoto(index) {
    State.activePhotoIndex = index;
    polaroids.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Click on polaroid card brings it to front
  polaroids.forEach((card, index) => {
    card.addEventListener('click', () => {
      CuteSounds.keyPop();
      showPhoto(index);
      triggerConfettiExplosion(card.getBoundingClientRect().left + 120, card.getBoundingClientRect().top + 100, 15);
    });
  });

  // Click on dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      CuteSounds.keyPop();
      showPhoto(index);
    });
  });

  // CONTINUOUS AUTO-CYCLE: Cycles photo every 2.6 seconds smoothly on its own!
  setInterval(() => {
    if (State.currentScreen === 'lock-screen') {
      const nextIndex = (State.activePhotoIndex + 1) % polaroids.length;
      showPhoto(nextIndex);
    }
  }, 2600);
}

// ==========================================================================
// 7. SECRET PASSCODE SCREEN CONTROLLER
// ==========================================================================
function initPasscodeScreen() {
  const pinDots = document.querySelectorAll('.pin-dot');
  const keypad = document.getElementById('lock-keypad');
  const pinDisplay = document.getElementById('pin-display');
  const hintBtn = document.getElementById('btn-passcode-hint');
  const hintContainer = document.getElementById('hint-container');

  function updatePinDisplay() {
    pinDots.forEach((dot, index) => {
      if (index < State.enteredPin.length) {
        dot.classList.add('filled');
        dot.textContent = '♥';
      } else {
        dot.classList.remove('filled');
        dot.textContent = '♡';
      }
    });
  }

  function handleDigit(digit) {
    if (State.enteredPin.length >= 4) return;
    State.enteredPin += digit;
    CuteSounds.keyPop();
    updatePinDisplay();

    if (State.enteredPin.length === 4) {
      setTimeout(verifyPin, 200);
    }
  }

  function handleBackspace() {
    if (State.enteredPin.length > 0) {
      State.enteredPin = State.enteredPin.slice(0, -1);
      CuteSounds.keyPop();
      updatePinDisplay();
    }
  }

  function handleClear() {
    State.enteredPin = '';
    CuteSounds.keyPop();
    updatePinDisplay();
  }

  function verifyPin() {
    const correctPin = CONFIG.passcode || '0711';
    if (State.enteredPin === correctPin) {
      // SUCCESS!
      CuteSounds.unlockFanfare();
      triggerConfettiExplosion(window.innerWidth / 2, window.innerHeight / 2, 45);

      pinDots.forEach(dot => {
        dot.style.background = '#70c1b3';
        dot.style.borderColor = '#2a9d8f';
      });

      setTimeout(() => {
        switchScreen('menu-screen', true);
      }, 650);
    } else {
      // WRONG PIN
      CuteSounds.errorBoop();
      pinDisplay.classList.add('shake');
      if (hintContainer) {
        hintContainer.textContent = 'Oops! Try again sweetie 🐾';
        hintContainer.style.color = '#ff4d6d';
      }

      setTimeout(() => {
        pinDisplay.classList.remove('shake');
        State.enteredPin = '';
        updatePinDisplay();
      }, 500);
    }
  }

  // Keypad Click Event
  if (keypad) {
    keypad.addEventListener('click', (e) => {
      const btn = e.target.closest('.key-btn');
      if (!btn) return;
      const key = btn.dataset.key;
      if (key >= '0' && key <= '9') {
        handleDigit(key);
      } else if (key === 'backspace') {
        handleBackspace();
      } else if (key === 'clear') {
        handleClear();
      }
    });
  }

  // Physical Keyboard Support
  window.addEventListener('keydown', (e) => {
    if (State.currentScreen !== 'lock-screen') return;
    if (e.key >= '0' && e.key <= '9') {
      handleDigit(e.key);
    } else if (e.key === 'Backspace') {
      handleBackspace();
    } else if (e.key === 'Escape') {
      handleClear();
    }
  });

  // Passcode Hint Button
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      if (hintContainer) {
        hintContainer.textContent = CONFIG.passcodeHint || 'Hint: Anniversary "MMDD" 🐾';
        hintContainer.style.color = 'var(--primary-pink)';
      }
    });
  }
}

// ==========================================================================
// 8. SURPRISE GIFT BOXES MENU CONTROLLER (Mystery Boxes - No Spoilers)
// ==========================================================================
function initMenuScreen() {
  const giftCards = document.querySelectorAll('.gift-card');

  giftCards.forEach((card) => {
    card.addEventListener('click', () => {
      const targetScreen = card.dataset.screen;
      CuteSounds.giftChime();
      triggerConfettiExplosion(card.getBoundingClientRect().left + 80, card.getBoundingClientRect().top + 80, 25);
      setTimeout(() => {
        switchScreen(targetScreen, true);
      }, 250);
    });
  });
}

// ==========================================================================
// 9. BOX 1: INTERACTIVE FLOWER BOUQUET WITH SURROUNDING BOUQUETS
// ==========================================================================
function initFlowerBouquet() {
  const showerBtn = document.getElementById('btn-shower-petals');
  const poemCard = document.getElementById('grand-poem-card');

  if (showerBtn) {
    showerBtn.addEventListener('click', () => {
      CuteSounds.giftChime();
      triggerConfettiExplosion(window.innerWidth / 2, window.innerHeight / 2, 60, [
        '#ff758f', '#ffccd5', '#ffd166', '#ff4d6d', '#ffffff', '#74c69d'
      ]);

      const catBouquet = document.querySelector('.cat-bouquet-img');
      if (catBouquet) {
        catBouquet.style.transform = 'scale(1.12) rotate(-3deg)';
        setTimeout(() => (catBouquet.style.transform = ''), 400);
      }
    });
  }

  if (poemCard) {
    poemCard.addEventListener('click', () => {
      CuteSounds.giftChime();
      triggerConfettiExplosion(window.innerWidth / 2, window.innerHeight / 2, 35);
    });
  }
}

// ==========================================================================
// 10. BOX 2: RETRO VINYL MUSIC PLAYER (Arash - Pure Love Feat. Helena)
// Plays full song from start to end without cutoffs!
// ==========================================================================
function initMusicPlayer() {
  const playBtn = document.getElementById('btn-play-pause');
  const progressBar = document.getElementById('music-progress-bar');
  const progressFill = document.getElementById('music-progress-fill');
  const currTimeSpan = document.getElementById('current-time');
  const durationSpan = document.getElementById('duration-time');
  const vinylRecord = document.getElementById('vinyl-record');
  const tonearm = document.getElementById('tonearm-assembly');
  const playIcon = document.getElementById('play-icon');
  const trackTitleSpan = document.getElementById('player-track-title');
  const trackArtistSpan = document.getElementById('player-track-artist');

  if (trackTitleSpan && CONFIG.box2Music) trackTitleSpan.textContent = CONFIG.box2Music.title;
  if (trackArtistSpan && CONFIG.box2Music) trackArtistSpan.textContent = CONFIG.box2Music.artist;

  function togglePlay() {
    if (!State.box2Audio) return;
    if (State.box2Audio.paused) {
      State.box2Audio.play().then(() => {
        if (vinylRecord) {
          vinylRecord.classList.remove('paused');
          vinylRecord.classList.add('spinning');
        }
        if (tonearm) tonearm.classList.add('playing');
        if (playIcon) playIcon.textContent = '⏸';
      });
    } else {
      State.box2Audio.pause();
      if (vinylRecord) vinylRecord.classList.add('paused');
      if (tonearm) tonearm.classList.remove('playing');
      if (playIcon) playIcon.textContent = '▶';
    }
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);

  if (State.box2Audio) {
    State.box2Audio.addEventListener('timeupdate', () => {
      if (State.box2Audio.duration && progressFill) {
        const pct = (State.box2Audio.currentTime / State.box2Audio.duration) * 100;
        progressFill.style.width = pct + '%';
        if (currTimeSpan) currTimeSpan.textContent = formatTime(State.box2Audio.currentTime);
      }
    });

    State.box2Audio.addEventListener('loadedmetadata', () => {
      if (durationSpan) durationSpan.textContent = formatTime(State.box2Audio.duration);
    });

    State.box2Audio.addEventListener('ended', () => {
      if (vinylRecord) vinylRecord.classList.add('paused');
      if (tonearm) tonearm.classList.remove('playing');
      if (playIcon) playIcon.textContent = '▶';
    });
  }

  // Seeking on Progress Bar
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      if (State.box2Audio && State.box2Audio.duration) {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = clickX / rect.width;
        State.box2Audio.currentTime = pct * State.box2Audio.duration;
      }
    });
  }

  function formatTime(sec) {
    if (isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }
}

// ==========================================================================
// 11. BOX 3: LOVE LETTER CONTROLLER
// ==========================================================================
function initLoveLetter() {
  const reactionBtn = document.getElementById('btn-love-reaction');
  const celebrationModal = document.getElementById('celebration-modal-overlay');
  const closeCelebBtn = document.getElementById('btn-close-celeb');

  if (reactionBtn) {
    reactionBtn.addEventListener('click', () => {
      CuteSounds.unlockFanfare();
      triggerConfettiExplosion(window.innerWidth / 2, window.innerHeight / 2, 70);
      if (celebrationModal) celebrationModal.classList.add('active');
    });
  }

  if (closeCelebBtn && celebrationModal) {
    closeCelebBtn.addEventListener('click', () => {
      celebrationModal.classList.remove('active');
    });
  }

  if (celebrationModal) {
    celebrationModal.addEventListener('click', (e) => {
      if (e.target === celebrationModal) celebrationModal.classList.remove('active');
    });
  }
}

// ==========================================================================
// 12. CONFETTI & HEARTS EXPLOSION ENGINE
// ==========================================================================
function triggerConfettiExplosion(originX, originY, count = 35, customColors = null) {
  const colors = customColors || ['#ff758f', '#ffccd5', '#ffd166', '#ff4d6d', '#70c1b3', '#ffffff'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const rand = Math.random();
    p.textContent = rand > 0.4 ? '❤️' : (rand > 0.2 ? '🌸' : '✨');
    p.style.position = 'fixed';
    p.style.left = originX + 'px';
    p.style.top = originY + 'px';
    p.style.fontSize = Math.random() * 16 + 14 + 'px';
    p.style.pointerEvents = 'none';
    p.style.zIndex = '9999';
    p.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
    p.style.transform = 'translate(-50%, -50%) scale(0.5)';
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200 + 60;
    const targetX = originX + Math.cos(angle) * distance;
    const targetY = originY + Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      p.style.transform = `translate(${targetX - originX}px, ${targetY - originY}px) scale(1.2) rotate(${Math.random() * 360}deg)`;
      p.style.opacity = '1';
    });

    setTimeout(() => {
      p.style.opacity = '0';
      p.style.transform += ' translateY(60px)';
      setTimeout(() => p.remove(), 600);
    }, 700);
  }
}

// ==========================================================================
// 13. INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initHeartsCanvas();
  initPetalsCanvas();
  initAudioEngine();
  initCatPhotosGallery();
  initPasscodeScreen();
  initMenuScreen();
  initFlowerBouquet();
  initMusicPlayer();
  initLoveLetter();
  initNavigationButtons();

  // Set initial history state to intro-screen
  history.replaceState({ screen: 'intro-screen' }, '', '#intro-screen');
});
