let noClickCount = 0;
let yesScale = 1;

// Track how many times "No" has been clicked
const maxNoAttempts = 5; // After 5 clicks, No button disappears

// Phrases that change as they keep clicking No
const noPhrases = [
    "No",
    "Are you sure? 🥺",
    "Really though? 💔",
    "Think again! 💭",
    "Pretty please? 🙏",
    "One more chance? ✨"
];

function handleNo() {
    const noBtn = document.getElementById('noButton');
    const yesBtn = document.getElementById('yesButton');
    
    noClickCount++;
    
    // Increase Yes button size progressively (increased from 0.3 to 0.5)
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Add a bounce animation to the Yes button
    yesBtn.style.animation = 'none';
    setTimeout(() => {
        yesBtn.style.animation = 'gentlePulse 3s ease-in-out infinite';
    }, 10);
    
    // Change the No button text
    if (noClickCount < noPhrases.length) {
        noBtn.querySelector('.button-text').textContent = noPhrases[noClickCount];
    }
    
    // Make the No button shake
    noBtn.classList.add('shake-animation');
    setTimeout(() => {
        noBtn.classList.remove('shake-animation');
    }, 500);
    
    // Make the No button disappear after max attempts
    if (noClickCount >= maxNoAttempts) {
        noBtn.classList.add('hidden');
        
        // Update the question text
        const question = document.getElementById('question');
        question.textContent = "I knew you'd say yes! 💕";
        question.style.animation = 'successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        // Make the Yes button even more prominent
        yesBtn.style.animation = 'heartBeat 1s ease-in-out infinite';
        return;
    }
    
    // Move the No button on mobile too (was previously disabled)
    moveButtonRandomly(noBtn);
}

function moveButtonRandomly(button) {
    // Get random position within viewport with safer margins
    const margin = 60; // Increased margin to keep button visible
    const maxX = window.innerWidth - button.offsetWidth - margin;
    const maxY = window.innerHeight - button.offsetHeight - margin;
    
    const randomX = Math.max(margin, Math.random() * maxX);
    const randomY = Math.max(margin, Math.random() * maxY);
    
    button.style.position = 'fixed';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.transition = 'all 0.3s ease';
}

function celebrate() {
    const card = document.getElementById('main-card');
    card.classList.add('success-state');
    
    card.innerHTML = `
        <div class="gif-container">
            <img src="./celebration-cat.gif" alt="Celebration" id="status-gif">
        </div>
        <h1>Yay! I knew you'd say yes! 💕</h1>
        <div class="heart-divider">❤️ 💖 ❤️</div>
        <p class="celebration-message">
            Can't wait to see you on the 14th! 🎉
        </p>
    `;
    
    // Trigger confetti
    launchConfetti();
}

// Confetti animation
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 200;
    const colors = ['#ff6b9d', '#ffa5c4', '#ffc4e0', '#ff8fb3', '#ffb3d9', '#ff4d6d'];
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    
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
            tiltAngle: 0,
            velocityY: Math.random() * 3 + 2,
            velocityX: Math.random() * 4 - 2
        });
    }
    
    let animationFrame;
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((piece, index) => {
            // Draw confetti piece
            ctx.beginPath();
            ctx.lineWidth = piece.r / 2;
            ctx.strokeStyle = piece.color;
            ctx.moveTo(piece.x + piece.tilt + piece.r / 4, piece.y);
            ctx.lineTo(piece.x + piece.tilt, piece.y + piece.tilt + piece.r / 4);
            ctx.stroke();
            
            // Update position with physics
            piece.tiltAngle += piece.tiltAngleIncremental;
            piece.velocityY += gravity;
            piece.velocityY = Math.min(piece.velocityY, terminalVelocity);
            piece.velocityX -= piece.velocityX * drag;
            
            piece.y += piece.velocityY;
            piece.x += piece.velocityX;
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
                    tiltAngle: piece.tiltAngle,
                    velocityY: Math.random() * 3 + 2,
                    velocityX: Math.random() * 4 - 2
                };
            }
        });
        
        animationFrame = requestAnimationFrame(drawConfetti);
    }
    
    drawConfetti();
    
    // Stop confetti after 12 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        // Fade out
        let opacity = 1;
        const fadeOut = setInterval(() => {
            opacity -= 0.05;
            canvas.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fadeOut);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.opacity = 1;
            }
        }, 50);
    }, 12000);
}

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
