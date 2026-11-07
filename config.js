// ==========================================================================
// 💖 ROMANTIC SURPRISE CONFIGURATION 💖
// Customize your secret PIN, song details, and messages here!
// ==========================================================================

const CONFIG = {
  // 🔐 1. Passcode Settings
  passcode: "0711",
  passcodeHint: 'Hint: Anniversary "MMDD" 🐾',

  // 👑 2. Couple & Girlfriend Info
  girlfriendName: "My Princess",
  boyNickname: "Your Love",

  // 🎵 3. Box 1: Flower Bouquet Song (Plays on loop only inside Box 1)
  box1Music: {
    title: "ආදරෙයි උතුරන්න",
    artist: "පසිඳු ගංගාදර",
    audioSrc: "assets/audio/adarei-uthuranna-pasindu-gangadara.mp3",
    loop: true
  },

  // 🎵 4. Box 2: Retro Vinyl Player Song (Plays full song in Box 2)
  box2Music: {
    title: "Pure Love",
    artist: "Arash Feat. Helena",
    audioSrc: "assets/audio/Arash - Pure Love Feat. Helena.mp3",
    albumCover: "assets/images/cat-music.svg",
    loop: true
  },

  // 🎵 5. Box 3: Love Letter Song (Plays on loop only inside Box 3)
  box3Music: {
    audioSrc: "assets/audio/video_2026-11-08_01-37-40.mp3",
    loop: true
  },

  // 📜 Sinhala Love Poem for Box 1
  flowerPoem: [
    "අවාරෙක මෙහි ඇවිත් මගේ හද කියවන්න",
    "ලියා යමි ගැඹුරු තැන \"ආදරෙයි උතුරන්න\"",
    "හමා යන සුළඟකින් මගේ නම විමසන්න",
    "තබා ගිය පණිවුඩෙන් ආදරෙද පවසන්න"
  ],

  // 💌 6. Box 3: The Love Letter (from your heart)
  loveLetter: {
    salutation: "To the prettiest girl in my world,",
    paragraphs: [
      "Thank you for bringing so much warmth, laughter, and sweetness into my life. Every time I see you smile, all my worries just fade away, and being around you feels like home.",
      "Just like two cute cats curled up together, my absolute favorite place will always be right by your side. You are my princess, my peaceful escape, and the sweetest part of my everyday life.",
      "I love you more than words can ever describe, today and forever."
    ],
    closing: "Forever & Always Yours,",
    signature: "With All My Love ❤️🐾"
  },

  // 🔗 7. Website URL for QR Code
  siteUrl: window.location.href.split('#')[0].split('?')[0]
};
