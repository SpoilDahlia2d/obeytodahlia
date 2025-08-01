let images = [];
let isActive = false;
let currentPhraseIndex = 0;
const phrases = [
  "Obey deeper.",
  "No thoughts, only Dahlia.",
  "Sink and submit.",
  "You belong to Her.",
  "Let go. Let Her control.",
  "Dahlia owns your mind.",
];

function fetchImages() {
  fetch('/images')
    .then(res => res.json())
    .then(data => { images = data; });
}

function showHypnoText() {
  const textDiv = document.getElementById("hypnoText");
  textDiv.textContent = phrases[currentPhraseIndex];
  currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
  setTimeout(() => { textDiv.textContent = ""; }, 2000);
}

function showImagePopup() {
  if (!isActive || images.length === 0) return;

  const container = document.getElementById("popupContainer");
  const img = document.createElement("img");
  img.src = `/static/images/${images[Math.floor(Math.random() * images.length)]}`;
  img.classList.add("popupImage");
  img.style.top = `${Math.random() * 80 + 10}%`;
  img.style.left = `${Math.random() * 80 + 10}%`;
  container.appendChild(img);

  setTimeout(() => { container.removeChild(img); }, 1500);
}

function startSequence() {
  isActive = true;
  setInterval(showImagePopup, 300);  // immagini più frequenti
  setInterval(showHypnoText, 2500);
  document.getElementById("hypnoAudio").play();
  setTimeout(() => { window.open("https://throne.com/dahliastar", "_blank"); }, 90000);
}

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("inputSection").classList.remove("hidden");
});

document.getElementById("hypnoInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.target.value.trim().toLowerCase() === "i belong to dahlia") {
      document.getElementById("inputSection").classList.add("hidden");
      startSequence();
    } else {
      e.target.value = "";
      e.target.placeholder = "Try again. You know the truth.";
    }
  }
});

fetchImages();
