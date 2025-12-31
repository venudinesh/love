const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

// Function to get random position within the card boundaries
function getRandomPosition() {
    const card = document.querySelector('.question-card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Calculate boundaries relative to the card
    const maxX = cardRect.width - btnWidth - 40; // 40px for padding
    const maxY = cardRect.height - btnHeight - 40;
    
    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(20, Math.random() * maxY);
    
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
    const heartAnimation = document.getElementById('heartAnimation');
    const questionCard = document.getElementById('questionCard');
    const successScreen = document.getElementById('successScreen');
    
    // Show heart animation
    heartAnimation.classList.add('show');
    
    // After 3 seconds, hide heart and show success screen
    setTimeout(() => {
        heartAnimation.classList.remove('show');
        questionCard.style.display = 'none';
        successScreen.classList.add('show');
    }, 3000);
});

// Gift button action
const giftBtn = document.getElementById('giftBtn');
const giftNoBtn = document.getElementById('giftNoBtn');
const giftYesBtn = document.getElementById('giftYesBtn');

giftBtn.addEventListener('click', () => {
    const successScreen = document.getElementById('successScreen');
    const giftScreen = document.getElementById('giftScreen');
    
    successScreen.classList.remove('show');
    giftScreen.classList.add('show');
});

// Gift screen - No button moves away
giftNoBtn.addEventListener('mouseover', () => {
    giftNoBtn.classList.add('moving');
    const card = document.querySelector('.gift-screen');
    const cardRect = card.getBoundingClientRect();
    const btnRect = giftNoBtn.getBoundingClientRect();
    
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    const maxX = cardRect.width - btnWidth - 40;
    const maxY = cardRect.height - btnHeight - 40;
    
    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(20, Math.random() * maxY);
    
    giftNoBtn.style.left = x + 'px';
    giftNoBtn.style.top = y + 'px';
});

giftNoBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    giftNoBtn.classList.add('moving');
    const card = document.querySelector('.gift-screen');
    const cardRect = card.getBoundingClientRect();
    const btnRect = giftNoBtn.getBoundingClientRect();
    
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    const maxX = cardRect.width - btnWidth - 40;
    const maxY = cardRect.height - btnHeight - 40;
    
    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(20, Math.random() * maxY);
    
    giftNoBtn.style.left = x + 'px';
    giftNoBtn.style.top = y + 'px';
});

// Gift Yes button - accept the gift
giftYesBtn.addEventListener('click', () => {
    alert('🎁 Yay! Gift accepted! 💕');
});
