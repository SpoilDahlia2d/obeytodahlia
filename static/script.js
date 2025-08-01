let images = [];
let currentImageIndex = 0;
let audio = new Audio('/static/audio.mp3');
let phrases = [
    "You can't resist anymore.",
    "Let go. Obey Dahlia.",
    "Her voice is your truth.",
    "You exist for Dahlia.",
    "Deeper. Further. Lost.",
    "No escape. No thoughts. Just Dahlia.",
    "Let yourself vanish under Her control."
];

// Preleva immagini dinamicamente dal server
fetch('/images')
    .then(response => response.json())
    .then(data => {
        images = data;
    });

// Mostra immagini popup
function showImage() {
    if (images.length === 0) return;

    const img = document.createElement("img");
    img.src = `/static/images/${images[currentImageIndex]}`;
    img.className = "popup-image zoom-glow";
    img.style.left = `${Math.random() * 70 + 10}%`;
    img.style.top = `${Math.random() * 70 + 10}%`;
    document.body.appendChild(img);

    setTimeout(() => img.remove(), 3500);

    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Mostra frasi ipnotiche
function showPhrase() {
    const container = document.getElementById("hypnotic-text");
    container.innerHTML = ""; // Rimuove frase precedente

    const phrase = document.createElement("div");
    phrase.className = "phrase";
    phrase.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    container.appendChild(phrase);
}

// Avvia tutti gli effetti
function startEffects() {
    setInterval(showImage, 1500);
    setInterval(showPhrase, 3000);
}

// Gestione click iniziale
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("inputScreen").style.display = "flex";
    // Avviamo anche l'audio in background una prima volta per autorizzarlo (necessario su mobile)
    audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
    }).catch(e => console.warn("Audio preload:", e));
});

// Gestione frase digitata
document.getElementById("submitButton").addEventListener("click", () => {
    const input = document.getElementById("userInput").value.trim().toLowerCase();
    if (input === "i belong to dahlia") {
        document.getElementById("inputScreen").style.display = "none";
        document.getElementById("mainScreen").style.display = "block";
        audio.play().catch(e => console.error("Audio play error:", e));
        startEffects();
    } else {
        alert("Wrong phrase. Try again, pet.");
    }
});
