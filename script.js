let yesSize = 1.2;

function moveButton() {
    const noBtn = document.getElementById('noButton');
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.position = 'fixed';

    // Make the Yes button bigger every time No is hovered/clicked!
    yesSize += 0.3;
    document.getElementById('yesButton').style.transform = `scale(${yesSize})`;
}

function celebrate() {
    const card = document.getElementById('main-card');
    card.innerHTML = `
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmtpZzh4bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3bmZ3JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/v6aOjy0QJD1YOY9NqL/giphy.gif" alt="Happy">
        <h1>Yay! I love you! ❤️ See you on the 14th!</h1>
    `;
}
