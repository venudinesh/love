// ============ ENHANCEMENTS ============

// 1. NEW YEAR THEME CHECK & SPECIAL CONFETTI
let isNewYearMode = false;

function checkNewYearTheme() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    if ((month === 12 && day === 31) || (month === 1 && day === 1)) {
        document.body.classList.add('new-year-theme');
        isNewYearMode = true;
        
        // Special New Year celebration every 30 seconds
        setInterval(() => {
            createNewYearCelebration();
        }, 30000);
    }
}
checkNewYearTheme();

// Special New Year & Love Celebration
function createNewYearCelebration() {
    if (isNewYearMode) {
        createConfetti('gold');
        setTimeout(() => createConfetti('rainbow'), 300);
        createHeartSparkles();
    }
}

// Heart Sparkles for New Year theme
function createHeartSparkles() {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '💖';
        sparkle.style.position = 'fixed';
        sparkle.style.fontSize = '30px';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.zIndex = '5';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }
}

// 2. PARALLAX SCROLLING
document.addEventListener('mousemove', (e) => {
    const bgGifs = document.querySelectorAll('.bg-gif');
    const xPercent = e.clientX / window.innerWidth;
    const yPercent = e.clientY / window.innerHeight;
    
    bgGifs.forEach((gif, index) => {
        const speed = (index % 3 + 1) * 2;
        const moveX = (xPercent - 0.5) * speed;
        const moveY = (yPercent - 0.5) * speed;
        gif.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// 3. FLOATING ROMANTIC QUOTES
const quotes = [
    "You make my heart smile 💕",
    "Forever with you 💑",
    "My love, my life, my everything 💗",
    "You are my greatest blessing 🌟",
    "With you, I found home ❤️",
    "Every moment with you is precious ✨",
    "You're the one I want forever 💝"
];

const newYearQuotes = [
    "Happy New Year, my love 🎆💕",
    "2026 starts with you 💖✨",
    "Forever begins now 🥂❤️",
    "My New Year wish: you, always 💝",
    "Cheers to us 🎉💗",
    "Happy New Year, soulmate 🎊💑",
    "Another year of loving you 🥰💕"
];

function createFloatingQuote() {
    const quoteList = isNewYearMode ? newYearQuotes : quotes;
    const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-quote';
    floatingText.textContent = quote;
    
    const startX = Math.random() * window.innerWidth;
    floatingText.style.left = startX + 'px';
    floatingText.style.bottom = '-50px';
    floatingText.style.animationDuration = (3 + Math.random() * 3) + 's';
    
    document.body.appendChild(floatingText);
    
    setTimeout(() => floatingText.remove(), 6500);
}

// Create floating quotes every 8 seconds
setInterval(createFloatingQuote, 8000);

// 4. SOUND EFFECT TOGGLE
let soundEnabled = true;

function createSoundIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'sound-indicator';
    indicator.innerHTML = '🔊';
    indicator.addEventListener('click', toggleSound);
    document.body.appendChild(indicator);
}
createSoundIndicator();

function toggleSound() {
    soundEnabled = !soundEnabled;
    const indicator = document.querySelector('.sound-indicator');
    if (soundEnabled) {
        indicator.classList.remove('muted');
        indicator.innerHTML = '🔊';
    } else {
        indicator.classList.add('muted');
        indicator.innerHTML = '🔇';
    }
}

// 5. SOUND EFFECTS
function playSound(type) {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    switch(type) {
        case 'click':
            playTone(audioContext, 800, 0.1);
            break;
        case 'success':
            playTone(audioContext, 1000, 0.15);
            setTimeout(() => playTone(audioContext, 1200, 0.15), 100);
            break;
        case 'confetti':
            playTone(audioContext, 600, 0.1);
            break;
    }
}

function playTone(audioContext, frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// ============ ORIGINAL CODE ============

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
    playSound('success');
    
    const heartAnimation = document.getElementById('heartAnimation');
    const questionCard = document.getElementById('questionCard');
    const successScreen = document.getElementById('successScreen');
    
    // Show heart animation
    heartAnimation.classList.add('show');
    
    // Trigger confetti with variation (rainbow for this one)
    createConfetti('rainbow');
    
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
    playSound('click');
});

// Gift Yes button - accept the gift
giftYesBtn.addEventListener('click', () => {
    playSound('success');
    
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
function createConfetti(variation = 'default') {
    const container = document.getElementById('confettiContainer');
    const confettiCount = 50;
    
    playSound('confetti');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        
        if (variation === 'rainbow') {
            confetti.classList.add('confetti', 'rainbow');
        } else if (variation === 'gold') {
            confetti.classList.add('confetti', 'gold');
        } else {
            confetti.classList.add('confetti');
            confetti.style.background = ['#ff1493', '#ff69b4', '#ffb6d9', '#ff69b4'][Math.floor(Math.random() * 4)];
        }
        
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.delay = Math.random() * 0.5 + 's';
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

// ===== CUSTOM CURSOR WITH HEART TRAIL =====

const cursorHeart = document.createElement('div');
cursorHeart.classList.add('custom-cursor');
cursorHeart.innerHTML = '💗';
document.body.appendChild(cursorHeart);

let mouseX = 0;
let mouseY = 0;
let lastTrailTime = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position
    cursorHeart.style.left = mouseX + 'px';
    cursorHeart.style.top = mouseY + 'px';
    
    // Create trail hearts (throttled to every 30ms)
    const now = Date.now();
    if (now - lastTrailTime > 30) {
        createCursorTrail(mouseX, mouseY);
        lastTrailTime = now;
    }
});

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-heart-trail');
    
    const hearts = ['💗', '❤️', '💕', '💖'];
    trail.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    
    // Random offset for trail
    const angle = Math.random() * Math.PI * 2;
    const distance = 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    trail.style.setProperty('--tx', tx + 'px');
    trail.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(trail);
    
    // Remove after animation
    setTimeout(() => trail.remove(), 1500);
}

// Hide cursor heart on mouse leave
document.addEventListener('mouseleave', () => {
    cursorHeart.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursorHeart.style.display = 'flex';
});

// ===== TOP LEFT BACK BUTTONS =====

// Back from success screen to question card
const backFromSuccess = document.getElementById('backFromSuccess');
if (backFromSuccess) {
    backFromSuccess.addEventListener('click', () => {
        const successScreen = document.getElementById('successScreen');
        const questionCard = document.getElementById('questionCard');
        
        successScreen.classList.remove('show');
        questionCard.style.display = 'block';
    });
}

// Back from gift screen to success screen
const backFromGift = document.getElementById('backFromGift');
if (backFromGift) {
    backFromGift.addEventListener('click', () => {
        const giftScreen = document.getElementById('giftScreen');
        const successScreen = document.getElementById('successScreen');
        
        giftScreen.classList.remove('show');
        successScreen.classList.add('show');
    });
}

// Back from gift selection screen to gift screen
const backFromGiftSelection = document.getElementById('backFromGiftSelection');
if (backFromGiftSelection) {
    backFromGiftSelection.addEventListener('click', () => {
        const giftSelectionScreen = document.getElementById('giftSelectionScreen');
        const giftScreen = document.getElementById('giftScreen');
        
        giftSelectionScreen.classList.remove('show');
        giftScreen.classList.add('show');
    });
}
