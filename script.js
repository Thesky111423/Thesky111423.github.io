document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initQuiz();
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['rgba(255, 182, 193, 0.4)', 'rgba(102, 126, 234, 0.4)', 'rgba(118, 75, 162, 0.4)'];
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

function initQuiz() {
    const startBtn = document.getElementById('startBtn');
    const introScreen = document.getElementById('introScreen');
    const quizSection = document.getElementById('quizSection');
    const calculating = document.getElementById('calculating');
    const resultSection = document.getElementById('resultSection');
    const easterEgg = document.getElementById('easterEgg');
    
    const questions = document.querySelectorAll('.quiz-question');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    let currentQuestion = 0;
    let correctCount = 0;
    let answers = [];
    let selectedPerfect = false;

    // 开始按钮
    startBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        quizSection.classList.remove('hidden');
    });

    // 问题选项点击
    questions.forEach((question, index) => {
        const options = question.querySelectorAll('.option-btn');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                // 禁用所有选项
                options.forEach(opt => opt.disabled = true);
                
                // 标记选中的选项
                option.classList.add('selected');
                
                // 检查是否正确
                const isCorrect = option.dataset.correct === 'true';
                if (isCorrect) {
                    correctCount++;
                    option.classList.add('correct');
                } else {
                    option.classList.add('wrong');
                    // 显示正确答案
                    options.forEach(opt => {
                        if (opt.dataset.correct === 'true') {
                            opt.classList.add('correct');
                        }
                    });
                }
                
                // 记录答案
                answers.push({
                    question: index + 1,
                    correct: isCorrect,
                    answer: option.textContent
                });
                
                // 检查是否选了"超级完美"
                if (option.dataset.score === '15') {
                    selectedPerfect = true;
                }
                
                // 延迟后进入下一题或显示结果
                setTimeout(() => {
                    if (index < questions.length - 1) {
                        // 下一题
                        question.classList.add('hidden');
                        questions[index + 1].classList.remove('hidden');
                        currentQuestion = index + 1;
                        
                        // 更新进度条
                        progressFill.style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
                        progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
                    } else {
                        // 显示计算中
                        quizSection.classList.add('hidden');
                        calculating.classList.remove('hidden');
                        
                        // 3秒后显示结果
                        setTimeout(() => {
                            calculating.classList.add('hidden');
                            showResult();
                        }, 3000);
                    }
                }, 1000);
            });
        });
    });

    function showResult() {
        resultSection.classList.remove('hidden');
        
        const scoreNum = document.getElementById('scoreNum');
        const resultEmoji = document.getElementById('resultEmoji');
        const resultMessage = document.getElementById('resultMessage');
        const resultDetails = document.getElementById('resultDetails');
        const resultHint = document.getElementById('resultHint');
        
        // 计算分数（基础分 + 随机加成）
        let baseScore = Math.round((correctCount / questions.length) * 100);
        let randomBonus = Math.floor(Math.random() * 15); // 随机加成
        let finalScore = Math.min(baseScore + randomBonus, 100);
        
        // 如果选了"超级完美"，给高分
        if (selectedPerfect) {
            finalScore = Math.max(finalScore, 88);
        }
        
        // 动画显示分数
        let displayScore = 0;
        const scoreInterval = setInterval(() => {
            displayScore += 2;
            scoreNum.textContent = displayScore;
            if (displayScore >= finalScore) {
                clearInterval(scoreInterval);
                scoreNum.textContent = finalScore;
            }
        }, 30);
        
        // 根据分数显示不同的结果
        if (finalScore >= 90) {
            resultEmoji.textContent = '🎉';
            resultMessage.innerHTML = '哇！默契度超高！<br>看来我们真的很合得来呢 ✨';
        } else if (finalScore >= 70) {
            resultEmoji.textContent = '😊';
            resultMessage.innerHTML = '还不错哦！<br>默契度挺高的嘛～';
        } else if (finalScore >= 50) {
            resultEmoji.textContent = '🤔';
            resultMessage.innerHTML = '嗯...还有进步空间<br>看来要多聊聊了';
        } else {
            resultEmoji.textContent = '😂';
            resultMessage.innerHTML = '哈哈，这都能答错？<br>你是故意的吧！';
        }
        
        // 显示答题详情
        resultDetails.innerHTML = `
            <p><span>正确题数</span><span>${correctCount} / ${questions.length}</span></p>
            <p><span>认识地点</span><span>${answers[0]?.correct ? '✓ 正确' : '✗ 错误'}</span></p>
            <p><span>我的位置</span><span>${answers[1]?.correct ? '✓ 正确' : '✗ 错误'}</span></p>
            <p><span>认识时间</span><span>${answers[2]?.correct ? '✓ 正确' : '✗ 错误'}</span></p>
        `;
        
        // 如果选了"超级完美"，显示提示
        if (selectedPerfect) {
            resultHint.textContent = '💡 提示：点击"再玩一次"有惊喜哦~';
        } else {
            resultHint.textContent = '';
        }
    }

    // 再玩一次按钮
    const retryBtn = document.getElementById('retryBtn');
    retryBtn.addEventListener('click', () => {
        if (selectedPerfect) {
            // 显示恶作剧彩蛋
            resultSection.classList.add('hidden');
            easterEgg.classList.remove('hidden');
        } else {
            // 重新开始
            location.reload();
        }
    });

    // 返回结果按钮
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', () => {
        easterEgg.classList.add('hidden');
        resultSection.classList.remove('hidden');
    });
}