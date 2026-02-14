// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const bgMusic = document.getElementById("bg-music");
const yayMusic = document.getElementById("yay-music");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const endCat = document.getElementById("end-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let yesMoveCount = 0;

// Try to play music on load
window.addEventListener("load", () => {
    if (bgMusic) {
        bgMusic.play().catch(() => {
            // Autoplay blocked, will play on click
            console.log("Autoplay blocked - will play on first interaction");
        });
    }
});

// Start music on first click anywhere (to bypass autoplay blocks)
document.addEventListener("click", () => {
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
    }
}, { once: true });

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    // Play music on interaction
    if (bgMusic) {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
    }

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

const moveRandomly = (el) => {
    const padding = 20;
    const vWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const vHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    
    const elWidth = el.offsetWidth;
    const elHeight = el.offsetHeight;

    // Reset transform to get original position
    const originalTransform = el.style.transform;
    el.style.transform = 'none';
    const rect = el.getBoundingClientRect();
    el.style.transform = originalTransform;

    const originalLeft = rect.left;
    const originalTop = rect.top;

    const maxX = vWidth - elWidth - padding;
    const maxY = vHeight - elHeight - padding;

    const targetX = Math.random() * (maxX - padding) + padding;
    const targetY = Math.random() * (maxY - padding) + padding;

    const moveX = targetX - originalLeft;
    const moveY = targetY - originalTop;

    el.style.transition = "transform 0.3s ease";
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
};

noBtn.addEventListener("mouseover", () => moveRandomly(noBtn));
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveRandomly(noBtn);
});

// Logic to make YES btn to grow
// ... existing commented out code ...

// Logic to make YES btn to move away 10 times
const handleYesMove = (e) => {
    if (yesMoveCount < 10) {
        if (e.type === 'touchstart') e.preventDefault();
        moveRandomly(yesBtn);
        yesMoveCount++;
    }
};

yesBtn.addEventListener("mouseover", handleYesMove);
yesBtn.addEventListener("touchstart", handleYesMove);

// YES is clicked

yesBtn.addEventListener("click", () => {
    if (yesMoveCount < 10) return;

    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";
    endCat.style.display = "inline-block";

    if (bgMusic) {
        bgMusic.pause();
    }

    if (yayMusic) {
        yayMusic.play().catch(e => console.log("Yay audio play failed:", e));
    }

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
