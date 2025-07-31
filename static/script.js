document.getElementById("confirm").addEventListener("click", () => {
    const value = document.getElementById("submission").value.trim();
    if (value.toLowerCase() === "i belong to dahlia") {
        startEffects();
    }
});

function startEffects() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("effect-screen").style.display = "block";

    const audio = document.getElementById("audio");
    audio.play().catch(() => console.log("Audio blocked"));

    // Fetch and show images
    fetch("/images")
        .then(res => res.json())
        .then(data => {
            data.images.forEach((filename, i) => {
                setTimeout(() => {
                    const img = document.createElement("img");
                    img.src = `/images/${filename}`;
                    img.className = "popup";
                    img.style.top = Math.random() * 80 + "vh";
                    img.style.left = Math.random() * 80 + "vw";
                    document.body.appendChild(img);
                    setTimeout(() => img.remove(), 3000);
                }, i * 600);
            });
        });

    // Show phrases
    const phrases = [
        "Obey Dahlia",
        "You are mine",
        "No escape",
        "You crave submission",
        "Total control"
    ];
    let idx = 0;
    const textContainer = document.getElementById("text-container");
    setInterval(() => {
        textContainer.innerText = phrases[idx % phrases.length];
        idx++;
    }, 1500);

    // Open Throne after 90 sec
    setTimeout(() => {
        window.open("https://throne.com/dahliastar", "_blank");
    }, 90000);
}
