
    document.addEventListener('DOMContentLoaded', function() {
        const carouselSlide = document.querySelector('.carousel-slide');
        const carouselImages = document.querySelectorAll('.carousel-slide a'); // 获取所有图片链接
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const dotsContainer = document.querySelector('.carousel-dots');

        let currentIndex = 0;
        const totalImages = carouselImages.length;
        let slideWidth = carouselImages[0].clientWidth; // 获取单张图片的宽度
        let autoSlideInterval;

        // 动态创建指示器圆点
        function createDots() {
            for (let i = 0; i < totalImages; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = i;
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            updateDots();
        }

        // 更新指示器圆点状态
        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // 移动到指定索引的图片
        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex < 0) {
                currentIndex = totalImages - 1;
            } else if (currentIndex >= totalImages) {
                currentIndex = 0;
            }
            carouselSlide.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            updateDots();
        }

        // 下一张
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        // 上一张
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        // 自动播放
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 3000); // 每3秒切换一次
        }

        // 停止自动播放
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // 事件监听
        nextBtn.addEventListener('click', () => {
            stopAutoSlide(); // 用户点击时暂停自动播放
            nextSlide();
            startAutoSlide(); // 重新开始自动播放
        });

        prevBtn.addEventListener('click', () => {
            stopAutoSlide(); // 用户点击时暂停自动播放
            prevSlide();
            startAutoSlide(); // 重新开始自动播放
        });

        // 窗口大小改变时重新计算图片宽度
        window.addEventListener('resize', () => {
            slideWidth = carouselImages[0].clientWidth;
            goToSlide(currentIndex); // 调整位置
        });

        // 初始化轮播图
        createDots();
        goToSlide(0); // 显示第一张图片
        startAutoSlide(); // 开始自动播放

        // 鼠标悬停时停止自动播放
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    });
