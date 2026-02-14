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
    const windowEl = document.querySelector(".letter-window");
    const winRect = windowEl.getBoundingClientRect();
    const padding = 20;
    
    const elWidth = el.offsetWidth;
    const elHeight = el.offsetHeight;

    // Reset transform to get original position relative to the document
    const originalTransform = el.style.transform;
    el.style.transform = 'none';
    const rect = el.getBoundingClientRect();
    el.style.transform = originalTransform;

    const originalLeft = rect.left;
    const originalTop = rect.top;

    // Constrain to the visible area of the letter-window
    const minX = winRect.left + padding;
    const maxX = winRect.right - elWidth - padding;
    const minY = winRect.top + padding;
    const maxY = winRect.bottom - elHeight - padding;

    // Safety check for narrow windows
    const targetX = Math.random() * (Math.max(minX, maxX) - minX) + minX;
    const targetY = Math.random() * (Math.max(minY, maxY) - minY) + minY;

    const moveX = targetX - originalLeft;
    const moveY = targetY - originalTop;

    el.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
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
