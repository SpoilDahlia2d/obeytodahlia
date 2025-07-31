const phrases = [
  "Obey me.",
  "You're mine now.",
  "Deeper into Dahlia.",
  "No escape.",
  "Surrender completely.",
  "Worship without thought."
];

let started = false;

function checkPhrase() {
  const input = document.getElementById("submission").value.trim().toLowerCase();
  if (input === "i belong to dahlia") {
    document.getElementById("intro").style.display = "none";
    document.getElementById("effects").style.display = "block";
    startEffects();
  }
}

function startEffects() {
  if (started) return;
  started = true;

  // audio
  const audio = document.getElementById("hypnoAudio");
  audio.play().catch(() => console.warn("Audio autoplay blocked."));

  // background flashing
  document.body.style.animation = "flashBg 0.5s infinite alternate";
  const style = document.createElement("style");
  style.innerHTML = `@keyframes flashBg {
    0% { background-color: black; }
    100% { background-color: #1f001f; }
  }`;
  document.head.appendChild(style);

  // show phrases
  setInterval(() => {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    const textDiv = document.getElementById("hypnoText");
    textDiv.textContent = phrase;
  }, 2000);

  // load images
  fetch('/images').then(res => res.json()).then(data => {
    showImagesLoop(data.images);
  });

  // open throne link after 90 sec
  setTimeout(() => {
    window.open("https://throne.com/dahliastar", "_blank");
  }, 90000);
}

function showImagesLoop(images) {
  let i = 0;
  setInterval(() => {
    const img = document.createElement("img");
    img.src = `/static/images/${images[i % images.length]}`;
    img.className = "popup-image";
    img.style.top = `${Math.random() * 80 + 10}%`;
    img.style.left = `${Math.random() * 80 + 10}%`;
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 5000);
    i++;
  }, 1500);
}

