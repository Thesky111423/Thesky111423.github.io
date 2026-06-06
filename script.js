document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initGiftBox();
    initQuiz();
    initMessage();
    initFinalSection();
    initSuccessScreen();
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['rgba(255, 182, 193, 0.6)', 'rgba(255, 107, 138, 0.6)', 'rgba(102, 126, 234, 0.6)'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 6) + 's';
        particlesContainer.appendChild(particle);
    }
}

function initGiftBox() {
    const giftBox = document.getElementById('giftBox');
    const introScreen = document.getElementById('introScreen');
    const quizSection = document.getElementById('quizSection');
    
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('opened');
        
        setTimeout(() => {
            introScreen.classList.add('hidden');
            quizSection.classList.remove('hidden');
        }, 600);
    });
}

function initQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    const quizResult = document.getElementById('quizResult');
    const resultScore = document.getElementById('resultScore');
    const resultMessage = document.getElementById('resultMessage');
    const messageSection = document.getElementById('messageSection');
    
    let currentQuestion = 0;
    let totalScore = 0;
    
    questions.forEach((question, index) => {
        const options = question.querySelectorAll('.option-btn');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                const score = parseInt(option.dataset.score);
                totalScore += score;
                
                options.forEach(opt => opt.disabled = true);
                option.classList.add('correct');
                
                setTimeout(() => {
                    if (index < questions.length - 1) {
                        question.classList.add('hidden');
                        questions[index + 1].classList.remove('hidden');
                    } else {
                        question.classList.add('hidden');
                        quizResult.classList.remove('hidden');
                        
                        let displayScore = 0;
                        const scoreInterval = setInterval(() => {
                            displayScore += 5;
                            resultScore.textContent = displayScore;
                            if (displayScore >= totalScore) {
                                clearInterval(scoreInterval);
                                
                                setTimeout(() => {
                                    if (totalScore >= 35) {
                                        resultMessage.textContent = '太棒了！你真的很了解我 💕';
                                    } else if (totalScore >= 20) {
                                        resultMessage.textContent = '还不错哦，继续加油！✨';
                                    } else {
                                        resultMessage.textContent = '哈哈，看来要多聊聊了 😄';
                                    }
                                    
                                    setTimeout(() => {
                                        quizResult.classList.add('hidden');
                                        messageSection.classList.remove('hidden');
                                    }, 2000);
                                }, 1000);
                            }
                        }, 100);
                    }
                }, 800);
            });
        });
    });
}

function initMessage() {
    const replyBtn = document.getElementById('replyBtn');
    const messageSection = document.getElementById('messageSection');
    const finalSection = document.getElementById('finalSection');
    
    replyBtn.addEventListener('click', () => {
        messageSection.classList.add('hidden');
        finalSection.classList.remove('hidden');
        startCountdown();
        createFallingHearts();
    });
}

function initFinalSection() {
    const yesBtn = document.getElementById('yesBtn');
    const maybeBtn = document.getElementById('maybeBtn');
    const finalSection = document.getElementById('finalSection');
    const successScreen = document.getElementById('successScreen');
    
    yesBtn.addEventListener('click', () => {
        finalSection.classList.add('hidden');
        successScreen.classList.remove('hidden');
        createConfetti();
        createSuccessHearts();
    });
    
    maybeBtn.addEventListener('click', () => {
        const messages = [
            '真的不考慮一下嗎？🥺',
            '好吧，我會等你的 💫',
            '給你時間想想～ 🤗',
            '不管怎樣，我都在 💕'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        maybeBtn.textContent = randomMessage;
        maybeBtn.style.background = 'linear-gradient(135deg, #ffd700, #ffec8b)';
        maybeBtn.style.color = '#333';
    });
}

function initSuccessScreen() {
    // Success screen initialization
}

function startCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    
    let seconds = 0;
    
    setInterval(() => {
        seconds++;
        
        if (seconds >= 60) {
            seconds = 0;
            const currentMinutes = parseInt(minutesEl.textContent);
            minutesEl.textContent = currentMinutes + 1;
        }
        
        if (parseInt(minutesEl.textContent) >= 60) {
            minutesEl.textContent = '0';
            const currentHours = parseInt(hoursEl.textContent);
            hoursEl.textContent = currentHours + 1;
        }
        
        if (parseInt(hoursEl.textContent) >= 24) {
            hoursEl.textContent = '0';
            const currentDays = parseInt(daysEl.textContent);
            daysEl.textContent = currentDays + 1;
        }
    }, 1000);
}

function createFallingHearts() {
    const heartRain = document.querySelector('.heart-rain');
    
    setInterval(() => {
        const heart = document.createElement('span');
        heart.className = 'falling-heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heartRain.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

function createConfetti() {
    const confetti = document.querySelector('.confetti');
    const colors = ['#ff6b8a', '#ffd700', '#667eea', '#764ba2', '#00b894', '#ff4757'];
    
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 3 + 's';
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        piece.style.width = (Math.random() * 10 + 5) + 'px';
        piece.style.height = (Math.random() * 10 + 5) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.appendChild(piece);
    }
}

function createSuccessHearts() {
    const futureHearts = document.querySelector('.future-hearts');
    futureHearts.innerHTML = '';
    
    const hearts = ['❤️', '💕', '💗', '💖', '💝', '💘', '💓'];
    hearts.forEach((heart, index) => {
        const span = document.createElement('span');
        span.textContent = heart;
        span.style.animationDelay = index * 0.2 + 's';
        futureHearts.appendChild(span);
    });
}
