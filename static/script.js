document.getElementById('start-btn').addEventListener('click', async () => {
  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';

  const audio = document.getElementById('audio');
  audio.play().catch(e => console.log("Audio play error:", e));

  const phrases = [
    "Obey and surrender",
    "Your mind belongs to Dahlia",
    "Feel the control",
    "No thoughts. Only submission.",
    "You are hers now."
  ];

  // Load image list from server
  const res = await fetch('/images');
  const images = await res.json();

  let phraseIndex = 0;
  setInterval(() => {
    const textContainer = document.getElementById('text-container');
    textContainer.innerText = phrases[phraseIndex % phrases.length];
    phraseIndex++;
  }, 3000);

  setInterval(() => {
    const img = document.createElement('img');
    img.src = `/static/images/${images[Math.floor(Math.random() * images.length)]}`;
    img.className = 'popup-image';
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 2000);
  }, 4000);

  setTimeout(() => {
    window.open("https://throne.com/dahliastar", "_blank");
  }, 90000); // 1.5 minuti
});
