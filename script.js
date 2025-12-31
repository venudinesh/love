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
    
    // Trigger confetti
    createConfetti();
    
    // Trigger floating particles
    createParticles(event);
    
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
    
    // Show progress indicator and trigger emoji rain
    document.getElementById('progressIndicator').classList.remove('hidden');
    createEmojiRain();
});

// Open gift button handlers
const openGiftBtns = document.querySelectorAll('.open-gift-btn');
openGiftBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const giftNumber = btn.getAttribute('data-gift');
        const giftSelectionScreen = document.getElementById('giftSelectionScreen');
        
        // Trigger emoji rain
        createEmojiRain();
        
        if (giftNumber === '1') {
            // Show message screen for first gift
            const messageScreen = document.getElementById('messageScreen');
            giftSelectionScreen.classList.remove('show');
            messageScreen.classList.add('show');
        } else if (giftNumber === '2') {
            // Show photo gallery for second gift
            const photoGalleryModal = document.getElementById('photoGalleryModal');
            photoGalleryModal.classList.remove('hidden');
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
    
    // Reset the game state
    const middleHeart = document.getElementById('middleHeart');
    const winMessage = document.getElementById('winMessage');
    const hintMessage = document.getElementById('hintMessage');
    const middleCell = document.getElementById('middleCell');
    
    middleHeart.classList.remove('show');
    middleHeart.classList.add('hidden');
    winMessage.classList.remove('show');
    winMessage.classList.add('hidden');
    hintMessage.classList.remove('hidden');
    middleCell.classList.add('clickable');
    
    ticTacToeScreen.classList.remove('show');
    giftSelectionScreen.classList.add('show');
});

// Middle cell click - reveal heart and win message
const middleCell = document.getElementById('middleCell');
middleCell.addEventListener('click', () => {
    const middleHeart = document.getElementById('middleHeart');
    const winMessage = document.getElementById('winMessage');
    const hintMessage = document.getElementById('hintMessage');
    
    // Show the heart with animation
    middleHeart.classList.remove('hidden');
    middleHeart.classList.add('show');
    
    // Show win message and hide hint
    winMessage.classList.remove('hidden');
    winMessage.classList.add('show');
    hintMessage.classList.add('hidden');
    
    // Remove clickable class
    middleCell.classList.remove('clickable');
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

// ===== NEW FEATURES =====

// CONFETTI ANIMATION
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.delay = Math.random() * 0.5 + 's';
        confetti.style.background = ['#ff1493', '#ff69b4', '#ffb6d9', '#ff69b4'][Math.floor(Math.random() * 4)];
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// PARTICLES EFFECT
function createParticles(event) {
    const container = document.getElementById('particlesContainer');
    const x = event.clientX;
    const y = event.clientY;
    const particleEmojis = ['❤️', '💕', '💖', '✨', '⭐'];
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }
}

// EMOJI RAIN
function createEmojiRain() {
    const emojis = ['❤️', '💕', '💖', '✨', '⭐', '🎉'];
    
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = (3 + Math.random() * 2) + 's';
        document.body.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 5000);
    }
}

// MEMORY WALL
const memoryWallBtn = document.getElementById('memoryWallBtn');
const memoryWallModal = document.getElementById('memoryWallModal');
const closeMemoryWall = document.getElementById('closeMemoryWall');
const addMemoryBtn = document.getElementById('addMemoryBtn');
const memoryInput = document.getElementById('memoryInput');
const memoriesList = document.getElementById('memoriesList');

// Load memories from localStorage
let memories = JSON.parse(localStorage.getItem('memories')) || [];

function displayMemories() {
    memoriesList.innerHTML = '';
    memories.forEach((memory, index) => {
        const memoryItem = document.createElement('div');
        memoryItem.classList.add('memory-item');
        memoryItem.innerHTML = `
            <span>${memory}</span>
            <button style="float:right; background:none; border:none; cursor:pointer; color:#ff1493;" onclick="deleteMemory(${index})">✕</button>
        `;
        memoriesList.appendChild(memoryItem);
    });
}

window.deleteMemory = function(index) {
    memories.splice(index, 1);
    localStorage.setItem('memories', JSON.stringify(memories));
    displayMemories();
};

memoryWallBtn.addEventListener('click', () => {
    memoryWallModal.classList.remove('hidden');
    displayMemories();
});

closeMemoryWall.addEventListener('click', () => {
    memoryWallModal.classList.add('hidden');
});

addMemoryBtn.addEventListener('click', () => {
    if (memoryInput.value.trim()) {
        memories.push(memoryInput.value.trim());
        localStorage.setItem('memories', JSON.stringify(memories));
        memoryInput.value = '';
        displayMemories();
        createEmojiRain();
    }
});

memoryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addMemoryBtn.click();
    }
});

// PHOTO GALLERY
const photos = [
    'IMG_20250823_150008.jpg',
    'IMG_20250823_150009.jpg',
    'IMG_20250826_134906.jpg',
    'IMG_20250826_143711.jpg',
    'IMG_20250826_143728.jpg',
    'IMG_20250913_133048.jpg',
    'IMG_20250914_140715.jpg',
    'IMG_20250914_141540.jpg',
    'IMG_20250914_145053.jpg',
    'IMG_2991.JPG',
    'IMG_6342.JPG',
    'IMG_6365.JPG',
    'IMG_6370.JPG',
    'IMG_6371.JPG',
    'MVIMG_20251005_165544.jpg',
    'MVIMG_20251005_170844.jpg',
    'MVIMG_20251005_170958.jpg',
    'MVIMG_20251005_171004.jpg',
    'MVIMG_20251005_171447.jpg',
    'MVIMG_20251005_171849.jpg',
    'Snapchat-119234884.jpg',
    'Snapchat-1264720319.jpg',
    'Snapchat-161715935.jpg',
    'Snapchat-1737975376.jpg',
    'Snapchat-280325582.jpg',
    'Snapchat-348100013.jpg',
    'Snapchat-589063665.jpg',
    'Snapchat-813156926.jpg',
    'Snapchat-872477140.jpg',
    'Snapchat-947868443~2.jpg'
];

let currentPhotoIndex = 0;

const photoGalleryModal = document.getElementById('photoGalleryModal');
const galleryImage = document.getElementById('galleryImage');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const photoCounter = document.getElementById('photoCounter');
const closeGallery = document.getElementById('closeGallery');

function updateGallery() {
    galleryImage.src = 'pics/' + photos[currentPhotoIndex];
    photoCounter.textContent = (currentPhotoIndex + 1) + ' / ' + photos.length;
}

galleryPrev.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateGallery();
});

galleryNext.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateGallery();
});

closeGallery.addEventListener('click', () => {
    photoGalleryModal.classList.add('hidden');
});

photoGalleryModal.addEventListener('click', (e) => {
    if (e.target === photoGalleryModal) {
        photoGalleryModal.classList.add('hidden');
    }
});

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (!photoGalleryModal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') galleryPrev.click();
        if (e.key === 'ArrowRight') galleryNext.click();
        if (e.key === 'Escape') closeGallery.click();
    }
});
