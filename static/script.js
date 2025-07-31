const input = document.getElementById("commandInput");
const feedback = document.getElementById("feedback");

let imageList = [];
let index = 0;
let showing = false;

fetch("/images")
  .then(response => response.json())
  .then(data => imageList = data);

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const value = input.value.toLowerCase().trim();
    if (value === "i belong to dahlia") {
      feedback.textContent = "⚠️ MIND LINK ESTABLISHED.";
      input.disabled = true;
      startMindCrash();
    } else {
      feedback.textContent = "Wrong. Try again.";
    }
  }
});

function startMindCrash() {
  document.body.classList.add("alert-mode");
  navigator.vibrate([200, 100, 200, 100, 300]);

  // Loop audio (aggiungilo tu in HTML)
  const audio = document.getElementById("audio");
  if (audio) audio.play();

  setInterval(() => {
    const text = document.createElement("div");
    text.textContent = randomPhrase();
    text.className = "alert-text";
    document.body.appendChild(text);
    setTimeout(() => text.remove(), 1000);
  }, 300);

  setInterval(() => {
    const img = document.createElement("img");
    img.src = "/static/images/" + imageList[Math.floor(Math.random() * imageList.length)];
    img.className = "popup-img";
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 800);
  }, 400);

  // Finale dopo 10s
  setTimeout(() => {
    document.body.innerHTML = `
      <div class="final-message">Session complete.<br>You belong to Dahlia.<br><a href="https://throne.com/dahliastar" class="tribute-button">TRIBUTE NOW</a></div>
    `;
  }, 10000);
}

function randomPhrase() {
  const phrases = ["OBEY", "DAHLIA OWNS YOU", "SURRENDER", "MIND ERASED", "TRIBUTE NOW"];
  return phrases[Math.floor(Math.random() * phrases.length)];
}


