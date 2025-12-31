const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

// Function to get random position within viewport boundaries
function getRandomPosition() {
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;
    
    const x = Math.max(0, Math.random() * maxX);
    const y = Math.max(0, Math.random() * maxY);
    
    return { x, y };
}

// Move button on mouse over
noBtn.addEventListener('mouseover', () => {
    noBtn.classList.add('moving');
    const { x, y } = getRandomPosition();
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

// Move button on touch for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    noBtn.classList.add('moving');
    const { x, y } = getRandomPosition();
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

// Yes button action
yesBtn.addEventListener('click', () => {
    alert('❤️ I love you too! ❤️');
});
