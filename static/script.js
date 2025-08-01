const phrases = [
  "You can't resist anymore.",
  "Your mind belongs to Dahlia.",
  "Deeper...",
  "No thoughts. Only devotion.",
  "You are hers. Fully.",
];

let showingPhrases = false;
let phraseIndex = 0;
let imageIndex = 0;
let images = [];

function checkPhrase() {
  const input = document.getElementById('input').value.trim().toLowerCase();
  if (input === "i belong to dahlia") {
    document.getElementById('overlay').remove();
    startEffects();
  }
}

async function startEffects() {
  const audio = document.getElementById("audio");
  try { audio.play(); } catch (e) {}

  const res = await fetch("/images");
  images = await res.json();

  setInterval(showPhrase, 2000);
  setInterval(showImage, 1500);
  setInterval(() => {
    document.body.style.backgroundColor = 
      document.body.style.backgroundColor === "black" ? "#1a001a" : "black";
  }, 800);

  setTimeout(() => {
    window.open("https://throne.com/dahliastar", "_blank");
  }, 90000);
}

function showPhrase() {
  const container = document.getElementById("phrases");
  container.innerText = phrases[phraseIndex];
  phraseIndex = (phraseIndex + 1) % phrases.length;
}

function showImage() {
  if (!images.length) return;
  const img = document.createElement("img");
  img.src = images[imageIndex];
  img.className = "popup";
  img.style.top = Math.random() * 70 + "%";
  img.style.left = Math.random() * 70 + "%";
  document.body.appendChild(img);
  setTimeout(() => img.remove(), 3000);
  imageIndex = (imageIndex + 1) % images.length;
}
