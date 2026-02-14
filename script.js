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

// Ensure music loops correctly
if (bgMusic) {
    bgMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

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
    const elWidth = el.offsetWidth;
    const elHeight = el.offsetHeight;

    // Use visualViewport if available for more accurate mobile dimensions
    const vWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const vHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

    // EXTREMELY AGGRESSIVE padding for iPhone (notches, browser bars, keyboard)
    const padL = 40;
    const padR = 40;
    const padT = 120; // Massive top pad for notch/URL bar
    const padB = 220; // Massive bottom pad for home indicator/tab bar

    // Reset transform to find the element's "home" position
    const originalTransform = el.style.transform;
    el.style.transform = 'none';
    const rect = el.getBoundingClientRect();
    el.style.transform = originalTransform;

    // Calculate safe boundaries in viewport coordinates
    // We force it to stay in the middle 60% of the screen height-wise
    const minY = padT;
    const maxY = vHeight - elHeight - padB;
    const minX = padL;
    const maxX = vWidth - elWidth - padR;

    // Ensure we don't have negative ranges
    const rangeY = Math.max(10, maxY - minY);
    const rangeX = Math.max(10, maxX - minX);

    // Random destination within safe bounds
    const targetX = minX + Math.random() * rangeX;
    const targetY = minY + Math.random() * rangeY;

    // Calculate translation from original position
    const moveX = targetX - rect.left;
    const moveY = targetY - rect.top;

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

    if (yayMusic) {
        yayMusic.play().catch(e => console.log("Yay audio play failed:", e));
    }

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
