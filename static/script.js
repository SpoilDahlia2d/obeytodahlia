const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const spiralScreen = document.getElementById("spiral-screen");
const input = document.getElementById("user-input");
const prompt = document.getElementById("prompt");
const feedback = document.getElementById("feedback");
const audio = document.getElementById("audio");
const overlayText = document.getElementById("overlay-text");

let imageList = [];

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  spiralScreen.classList.remove("hidden");
  audio.play();
  vibrate();
  fetchImages();
};

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const value = input.value.trim().toLowerCase();
    if (value === "i belong to dahlia") {
      feedback.textContent = "Good boy. Obedience is bliss.";
      input.value = "";
      startShowLoop();
    } else {
      feedback.textContent = "Wrong. Try again.";
    }
  }
});

function fetchImages() {
  fetch('/images')
    .then(res => res.json())
    .then(images => {
      imageList = images;
    });
}

function startShowLoop() {
  setInterval(() => {
    showText(randomPhrase());
    showImage();
    vibrate();
  }, 3000);
}

const phrases = [
  "Obey Dahlia.",
  "You are hers now.",
  "Submission is pleasure.",
  "Let go and serve.",
  "You belong to Dahlia.",
  "No thoughts. Only devotion.",
  "Keep typing, good boy."
];

function showText(text) {
  overlayText.textContent = text;
  overlayText.classList.remove("hidden");
  setTimeout(() => {
    overlayText.classList.add("hidden");
  }, 2000);
}

function randomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function showImage() {
  if (imageList.length === 0) return;
  const img = document.createElement("img");
  const folder = "static/images/";
  const index = Math.floor(Math.random() * imageList.length);
  img.src = folder + imageList[index];
  img.style.position = "absolute";
  img.style.top = Math.random() * 80 + "%";
  img.style.left = Math.random() * 80 + "%";
  img.style.width = "150px";
  img.style.zIndex = 999;
  img.style.opacity = 0.9;
  img.style.borderRadius = "15px";
  document.body.appendChild(img);
  setTimeout(() => img.remove(), 2000);
}

function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
}

