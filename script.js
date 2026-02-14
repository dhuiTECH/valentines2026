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

    // Very conservative padding for mobile (notches, browser bars, home indicator)
    const padL = 25;
    const padR = 25;
    const padT = 80;
    const padB = 160; // Extra large bottom padding to avoid iPhone bottom bar

    // Reset transform to find the element's "home" position
    const originalTransform = el.style.transform;
    el.style.transform = 'none';
    const rect = el.getBoundingClientRect();
    el.style.transform = originalTransform;

    // Calculate safe bounds within the viewport
    const minX = padL;
    const maxX = Math.max(minX, vWidth - elWidth - padR);
    const minY = padT;
    const maxY = Math.max(minY, vHeight - elHeight - padB);

    // Random destination within safe bounds
    const targetX = Math.random() * (maxX - minX) + minX;
    const targetY = Math.random() * (maxY - minY) + minY;

    // Calculate how much we need to translate from original position
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
