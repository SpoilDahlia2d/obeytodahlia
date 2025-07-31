const input = document.getElementById("submission");
const feedback = document.getElementById("feedback");
const audio = document.getElementById("audio");

let imageList = [];
let showInterval;

fetch("/images")
  .then((res) => res.json())
  .then((data) => {
    imageList = data;
  });

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = input.value.toLowerCase().trim();
    if (value === "i belong to dahlia") {
      input.disabled = true;
      feedback.textContent = "Obedience unlocked.";
      document.body.style.animation = "bgFlash 0.3s infinite alternate";
      audio.play();
      navigator.vibrate?.([200, 100, 200, 100]);

      setInterval(showImage, 300);
      setInterval(showText, 800);
    } else {
      feedback.textContent = "Try again. Say it properly.";
    }
  }
});

function showImage() {
  if (imageList.length === 0) return;

  const img = document.createElement("img");
  img.src = "/static/images/" + imageList[Math.floor(Math.random() * imageList.length)];
  img.style.position = "absolute";
  img.style.left = Math.random() * window.innerWidth + "px";
  img.style.top = Math.random() * window.innerHeight + "px";
  img.style.maxWidth = "200px";
  img.style.zIndex = 999;
  document.body.appendChild(img);

  setTimeout(() => img.remove(), 4000);
}

const phrases = [
  "Obey. Submit. Serve.",
  "You are mine now.",
  "Think only of Dahlia.",
  "No escape. No thoughts.",
  "Worship. Tribute. Repeat.",
];

function showText() {
  const p = document.createElement("div");
  p.classList.add("hypnotic-text");
  p.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  p.style.left = Math.random() * window.innerWidth + "px";
  p.style.top = Math.random() * window.innerHeight + "px";
  document.body.appendChild(p);

  setTimeout(() => p.remove(), 4000);
}
