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
    const elWidth = el.offsetWidth || 80;
    const elHeight = el.offsetHeight || 40;

    const vWidth = window.innerWidth;
    const vHeight = window.innerHeight;

    // Use a very safe middle area (centered)
    // 70% of width, 50% of height
    const safeAreaW = vWidth * 0.7;
    const safeAreaH = vHeight * 0.5;
    
    const minX = (vWidth - safeAreaW) / 2;
    const minY = (vHeight - safeAreaH) / 2;

    const targetX = minX + Math.random() * (safeAreaW - elWidth);
    const targetY = minY + Math.random() * (safeAreaH - elHeight);

    // Force fixed positioning to avoid layout issues
    el.style.position = 'fixed';
    el.style.left = '0';
    el.style.top = '0';
    el.style.margin = '0';
    el.style.zIndex = '9999';
    
    el.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    el.style.transform = `translate(${targetX}px, ${targetY}px)`;
};

noBtn.addEventListener("mouseover", () => moveRandomly(noBtn));
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveRandomly(noBtn);
}, { passive: false });

// Logic to make YES btn to grow
// ... existing commented out code ...

// Logic to make YES btn to move away 10 times
const handleYesMove = (e) => {
    if (yesMoveCount < 10) {
        if (e.type === 'touchstart') {
            e.preventDefault();
        }
        moveRandomly(yesBtn);
        yesMoveCount++;
    }
};

yesBtn.addEventListener("mouseover", handleYesMove);
yesBtn.addEventListener("touchstart", handleYesMove, { passive: false });

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
