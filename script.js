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
const goBackBtn = document.getElementById('goBackBtn');

giftBtn.addEventListener('click', () => {
    const successScreen = document.getElementById('successScreen');
    const giftScreen = document.getElementById('giftScreen');
    
    successScreen.classList.remove('show');
    giftScreen.classList.add('show');
});

// Gift Yes button - accept the gift
giftYesBtn.addEventListener('click', () => {
    const giftScreen = document.getElementById('giftScreen');
    const giftSelectionScreen = document.getElementById('giftSelectionScreen');
    
    giftScreen.classList.remove('show');
    giftSelectionScreen.classList.add('show');
});

// Open gift button handlers
const openGiftBtns = document.querySelectorAll('.open-gift-btn');
openGiftBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const giftNumber = btn.getAttribute('data-gift');
        const giftSelectionScreen = document.getElementById('giftSelectionScreen');
        
        if (giftNumber === '1') {
            // Show message screen for first gift
            const messageScreen = document.getElementById('messageScreen');
            giftSelectionScreen.classList.remove('show');
            messageScreen.classList.add('show');
        } else if (giftNumber === '2') {
            // Show video overlay for second gift
            const videoOverlay = document.getElementById('videoOverlay');
            const giftVideo = document.getElementById('giftVideo');
            videoOverlay.classList.add('show');
            giftVideo.play();
        } else if (giftNumber === '3') {
            // Show tic-tac-toe game for third gift
            const ticTacToeScreen = document.getElementById('ticTacToeScreen');
            giftSelectionScreen.classList.remove('show');
            ticTacToeScreen.classList.add('show');
        }
    });
});

// Back button from tic-tac-toe
const backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', () => {
    const ticTacToeScreen = document.getElementById('ticTacToeScreen');
    const giftSelectionScreen = document.getElementById('giftSelectionScreen');
    
    ticTacToeScreen.classList.remove('show');
    giftSelectionScreen.classList.add('show');
});

// Close video overlay
const closeVideo = document.getElementById('closeVideo');
const videoOverlay = document.getElementById('videoOverlay');
const giftVideo = document.getElementById('giftVideo');

closeVideo.addEventListener('click', () => {
    videoOverlay.classList.remove('show');
    giftVideo.pause();
    giftVideo.currentTime = 0;
});

// Close video when clicking outside
videoOverlay.addEventListener('click', (e) => {
    if (e.target === videoOverlay) {
        videoOverlay.classList.remove('show');
        giftVideo.pause();
        giftVideo.currentTime = 0;
    }
});

// Next message button - navigate to second message
const nextMessageBtn = document.getElementById('nextMessageBtn');
nextMessageBtn.addEventListener('click', () => {
    const messageScreen = document.getElementById('messageScreen');
    const messageScreen2 = document.getElementById('messageScreen2');
    
    messageScreen.classList.remove('show');
    messageScreen2.classList.add('show');
});

// Gift No button - show rejected screen
giftNoBtn.addEventListener('click', () => {
    const giftScreen = document.getElementById('giftScreen');
    const rejectedScreen = document.getElementById('rejectedScreen');
    
    giftScreen.classList.remove('show');
    rejectedScreen.classList.add('show');
});

// Go back button - return to gift screen
goBackBtn.addEventListener('click', () => {
    const rejectedScreen = document.getElementById('rejectedScreen');
    const giftScreen = document.getElementById('giftScreen');
    
    rejectedScreen.classList.remove('show');
    giftScreen.classList.add('show');
});

// Back to gifts buttons - return to gift selection screen
const backToGifts1 = document.getElementById('backToGifts1');
const backToGifts2 = document.getElementById('backToGifts2');

backToGifts1.addEventListener('click', () => {
    const messageScreen = document.getElementById('messageScreen');
    const giftSelectionScreen = document.getElementById('giftSelectionScreen');
    
    messageScreen.classList.remove('show');
    giftSelectionScreen.classList.add('show');
});

backToGifts2.addEventListener('click', () => {
    const messageScreen2 = document.getElementById('messageScreen2');
    const giftSelectionScreen = document.getElementById('giftSelectionScreen');
    
    messageScreen2.classList.remove('show');
    giftSelectionScreen.classList.add('show');
});
