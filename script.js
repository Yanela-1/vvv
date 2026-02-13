let noClickCount = 0;
let yesScale = 1;

// Track how many times "No" has been attempted
const maxNoAttempts = 5; // After 5 attempts, No button disappears

// Phrases that change as they keep clicking No
const noPhrases = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Last chance!",
    "Please? 🥺"
];

function handleNo() {
    const noBtn = document.getElementById('noButton');
    const yesBtn = document.getElementById('yesButton');
    
    noClickCount++;
    
    // Increase Yes button size progressively
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;
    
    // Change the No button text
    if (noClickCount < noPhrases.length) {
        noBtn.textContent = noPhrases[noClickCount];
    }
    
    // Make the No button disappear after max attempts
    if (noClickCount >= maxNoAttempts) {
        noBtn.classList.add('hidden');
        // Add a little message
        const question = document.getElementById('question');
        question.textContent = "I knew you'd say yes! ❤️";
        question.style.animation = 'pulse 0.5s ease';
        return;
    }
    
    // Move the No button to a random position (only on desktop)
    if (window.innerWidth > 768) {
        moveButtonRandomly(noBtn);
    } else {
        // On mobile, just make it shake instead of moving
        noBtn.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            noBtn.style.animation = '';
        }, 500);
    }
}

function moveButtonRandomly(button) {
    // Get random position within viewport
    const maxX = window.innerWidth - button.offsetWidth - 40;
    const maxY = window.innerHeight - button.offsetHeight - 40;
    
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    
    button.style.position = 'fixed';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

function celebrate() {
    const card = document.getElementById('main-card');
    card.classList.add('success-state');
    
    card.innerHTML = `
        <img src="./celebration-cat.gif" alt="Celebration">
        <h1>Yay! I knew you'd say yes! ❤️</h1>
        <p style="color: #d63384; font-size: 1.2rem; margin-top: 20px;">
            Can't wait to see you on the 14th! 💕
        </p>
    `;
    
    // Trigger confetti
    launchConfetti();
    
    // Play celebratory animation
    setTimeout(() => {
        card.style.animation = 'celebration 0.5s ease';
    }, 100);
}

// Confetti animation
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 150;
    const colors = ['#ff4d6d', '#ff758f', '#ffc2d1', '#ff9eb6', '#ffb3c6', '#d63384'];
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }
    
    let animationFrame;
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((piece, index) => {
            ctx.beginPath();
            ctx.lineWidth = piece.r / 2;
            ctx.strokeStyle = piece.color;
            ctx.moveTo(piece.x + piece.tilt + piece.r / 4, piece.y);
            ctx.lineTo(piece.x + piece.tilt, piece.y + piece.tilt + piece.r / 4);
            ctx.stroke();
            
            // Update position
            piece.tiltAngle += piece.tiltAngleIncremental;
            piece.y += (Math.cos(piece.d) + 3 + piece.r / 2) / 2;
            piece.x += Math.sin(piece.d);
            piece.tilt = Math.sin(piece.tiltAngle - index / 3) * 15;
            
            // Reset if off screen
            if (piece.y > canvas.height) {
                confetti[index] = {
                    x: Math.random() * canvas.width,
                    y: -20,
                    r: piece.r,
                    d: piece.d,
                    color: piece.color,
                    tilt: piece.tilt,
                    tiltAngleIncremental: piece.tiltAngleIncremental,
                    tiltAngle: piece.tiltAngle
                };
            }
        });
        
        animationFrame = requestAnimationFrame(drawConfetti);
    }
    
    drawConfetti();
    
    // Stop confetti after 10 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 10000);
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Handle window resize to reset button positions if needed
window.addEventListener('resize', () => {
    const noBtn = document.getElementById('noButton');
    if (noBtn && window.innerWidth <= 768) {
        noBtn.style.position = 'relative';
        noBtn.style.left = '';
        noBtn.style.top = '';
    }
});
