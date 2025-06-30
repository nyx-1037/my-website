/**
 * Main Application Entry Point
 * Coordinates all modules and handles page initialization
 */

class App {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        this.loadingElement = null;
        this.errorHandlers = new Map();
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 开始初始化网站应用...');
            
            // Show loading state
            console.log('🔄 显示加载状态...');
            this.showLoading();
            
            // Initialize error handling
            console.log('🔄 设置错误处理...');
            this.setupErrorHandling();
            
            // Wait for DOM to be ready
            console.log('🔄 等待DOM加载完成...');
            await this.waitForDOM();
            console.log('✅ DOM已准备就绪');
            
            // Initialize all modules in sequence
            await this.initializeModules();
            
            // Setup page interactions
            console.log('🔄 设置页面交互...');
            this.setupPageInteractions();
            console.log('✅ 页面交互设置完成');
            
            // Setup performance monitoring
            console.log('🔄 设置性能监控...');
            this.setupPerformanceMonitoring();
            console.log('✅ 性能监控设置完成');
            
            // Hide loading state
            console.log('🔄 隐藏加载状态...');
            this.hideLoading();
            console.log('✅ 加载状态已隐藏');
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Dispatch ready event
            this.dispatchReadyEvent();
            
            console.log('🎉 网站初始化完成！');
            
            // 初始化数据管理器
            this.initializeDataManager();
            
        } catch (error) {
            console.error('❌ 网站初始化失败:', error);
            console.error('错误堆栈:', error.stack);
            this.handleInitializationError(error);
        }
    }
    
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }
    
    async initializeModules() {
        console.log('🔄 开始初始化模块...');
        const moduleInitializers = [
            { name: 'i18n', init: () => this.initI18n() },
            { name: 'theme', init: () => this.initTheme() },
            { name: 'stats', init: () => this.initStats() },
            { name: 'animations', init: () => this.initAnimations() },
            { name: 'navigation', init: () => this.initNavigation() },
            { name: 'cards', init: () => this.initCards() },
            { name: 'accessibility', init: () => this.initAccessibility() }
        ];
        
        for (const module of moduleInitializers) {
            try {
                console.log(`🔄 正在初始化 ${module.name} 模块...`);
                await module.init();
                console.log(`✅ ${module.name} 模块初始化成功`);
                this.modules[module.name] = { status: 'loaded', timestamp: Date.now() };
            } catch (error) {
                console.error(`❌ ${module.name} 模块初始化失败:`, error);
                this.modules[module.name] = { status: 'error', error, timestamp: Date.now() };
                // Continue with other modules even if one fails
            }
        }
        console.log('📊 模块初始化状态:', this.modules);
    }
    
    initI18n() {
        return new Promise((resolve) => {
            console.log('🔍 检查 i18n 模块是否可用...');
            if (window.i18n) {
                console.log('✅ i18n 模块已可用');
                resolve();
            } else {
                console.log('⏳ 等待 i18n 模块加载...');
                let attempts = 0;
                const maxAttempts = 50; // 5秒超时
                const checkI18n = () => {
                    attempts++;
                    if (window.i18n) {
                        console.log(`✅ i18n 模块在第 ${attempts} 次检查后可用`);
                        resolve();
                    } else if (attempts >= maxAttempts) {
                        console.error('❌ i18n 模块加载超时');
                        resolve(); // 继续执行，不阻塞其他模块
                    } else {
                        setTimeout(checkI18n, 100);
                    }
                };
                checkI18n();
            }
        });
    }
    
    initTheme() {
        return new Promise((resolve) => {
            console.log('🔍 检查 theme 模块是否可用...');
            
            if (window.themeManager) {
                console.log('✅ theme 模块已可用');
                resolve();
                return;
            }
            
            console.log('⏳ 等待 theme 模块加载...');
            
            let attempts = 0;
            const maxAttempts = 10; // 减少最大尝试次数
            
            // 监听自定义事件
            const handleThemeReady = () => {
                console.log('✅ 收到 theme 模块就绪事件');
                document.removeEventListener('themeManagerReady', handleThemeReady);
                resolve();
            };
            
            document.addEventListener('themeManagerReady', handleThemeReady);
            
            const checkTheme = () => {
                attempts++;
                if (window.themeManager) {
                    console.log(`✅ theme 模块在第 ${attempts} 次检查后可用`);
                    document.removeEventListener('themeManagerReady', handleThemeReady);
                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.error('❌ theme 模块加载超时');
                    document.removeEventListener('themeManagerReady', handleThemeReady);
                    resolve();
                } else {
                    setTimeout(checkTheme, 100);
                }
            };
            
            checkTheme();
        });
    }
    
    initStats() {
        return new Promise((resolve) => {
            console.log('🔍 检查 stats 模块是否可用...');
            
            if (window.statsManager) {
                console.log('✅ stats 模块已可用');
                resolve();
                return;
            }
            
            console.log('⏳ 等待 stats 模块加载...');
            
            let attempts = 0;
            const maxAttempts = 10; // 减少最大尝试次数
            
            // 监听自定义事件
            const handleStatsReady = () => {
                console.log('✅ 收到 stats 模块就绪事件');
                document.removeEventListener('statsManagerReady', handleStatsReady);
                resolve();
            };
            
            document.addEventListener('statsManagerReady', handleStatsReady);
            
            const checkStats = () => {
                attempts++;
                if (window.statsManager) {
                    console.log(`✅ stats 模块在第 ${attempts} 次检查后可用`);
                    document.removeEventListener('statsManagerReady', handleStatsReady);
                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.error('❌ stats 模块加载超时');
                    document.removeEventListener('statsManagerReady', handleStatsReady);
                    resolve();
                } else {
                    setTimeout(checkStats, 100);
                }
            };
            
            checkStats();
        });
    }
    
    initAnimations() {
        // Initialize intersection observer for animations
        this.setupIntersectionObserver();
        
        // Initialize scroll animations
        this.setupScrollAnimations();
        
        // Initialize hover effects
        this.setupHoverEffects();
        
        return Promise.resolve();
    }
    
    initNavigation() {
        // Setup smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Setup mobile navigation
        this.setupMobileNavigation();
        
        // Setup keyboard navigation
        this.setupKeyboardNavigation();
        
        return Promise.resolve();
    }
    
    initCards() {
        // Setup card interactions
        this.setupCardInteractions();
        
        // Setup card lazy loading
        this.setupCardLazyLoading();
        
        // Setup image preview
        this.setupImagePreview();
        
        return Promise.resolve();
    }
    
    setupImagePreview() {
        console.log('🔍 设置图片预览功能...');
        const cardImages = document.querySelectorAll('.card-img');
        const overlay = document.querySelector('.image-overlay');
        
        if (!overlay) {
            console.error('❌ 未找到图片预览遮罩元素');
            return;
        }
        
        console.log(`📷 找到 ${cardImages.length} 张图片需要设置预览功能`);
        
        // 为遮罩添加点击事件，点击遮罩时关闭预览
        overlay.addEventListener('click', () => {
            console.log('🔍 点击遮罩，关闭所有预览');
            const enlargedImg = document.querySelector('.card-img.enlarged');
            if (enlargedImg) {
                enlargedImg.classList.remove('enlarged');
            }
            // 恢复所有图片的可见性
            document.querySelectorAll('.card-img').forEach(img => {
                img.style.visibility = 'visible';
            });
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('image-preview-active'); // 恢复卡片hover效果
        });
        
        cardImages.forEach((img, index) => {
            // 确保图片有效
            if (img.src && img.src !== '') {
                console.log(`🔄 为图片 ${index + 1} 设置点击事件: ${img.src}`);
                
                // 移除可能存在的旧事件监听器
                const newImg = img.cloneNode(true);
                if (img.parentNode) {
                    img.parentNode.replaceChild(newImg, img);
                }
                
                // 添加点击事件处理图片预览
                newImg.addEventListener('click', function handleImageClick(e) {
                    e.stopPropagation(); // 阻止事件冒泡
                    console.log(`👆 图片 ${index + 1} 被点击`);
                    
                    // 检查图片当前是否已经放大
                    if (newImg.classList.contains('enlarged')) {
                        // 如果已经放大，则缩小并隐藏遮罩
                        console.log('🔍 缩小图片并隐藏遮罩');
                        newImg.classList.remove('enlarged');
                        // 恢复所有图片的可见性
                        document.querySelectorAll('.card-img').forEach(img => {
                            img.style.visibility = 'visible';
                        });
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                        document.body.classList.remove('image-preview-active'); // 恢复卡片hover效果
                    } else {
                        // 如果未放大，则先移除所有图片的放大状态
                        document.querySelectorAll('.card-img.enlarged').forEach(img => {
                            img.classList.remove('enlarged');
                        });
                        
                        // 隐藏所有其他图片，避免层级冲突
                        document.querySelectorAll('.card-img').forEach(img => {
                            if (img !== newImg) {
                                img.style.visibility = 'hidden';
                            }
                        });
                        
                        // 先显示遮罩，确保遮罩在所有普通图片之上
                        overlay.classList.add('active');
                        document.body.style.overflow = 'hidden'; // 防止背景滚动
                        document.body.classList.add('image-preview-active'); // 禁用卡片hover效果
                        
                        // 延迟一帧添加放大状态，确保DOM更新顺序正确
                        requestAnimationFrame(() => {
                            // 添加放大状态，确保放大的图片在遮罩之上
                            newImg.classList.add('enlarged');
                            console.log('🔍 放大图片并显示遮罩');
                        });
                    }
                });
            }
        });
        
        // ESC键关闭预览
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                console.log('🔍 按下ESC键，关闭所有预览');
                const enlargedImg = document.querySelector('.card-img.enlarged');
                if (enlargedImg) {
                    enlargedImg.classList.remove('enlarged');
                }
                // 恢复所有图片的可见性
                document.querySelectorAll('.card-img').forEach(img => {
                    img.style.visibility = 'visible';
                });
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('image-preview-active'); // 恢复卡片hover效果
            }
        });
    }
    
    initAccessibility() {
        // Setup focus management
        this.setupFocusManagement();
        
        // Setup ARIA live regions
        this.setupAriaLiveRegions();
        
        // Setup reduced motion preferences
        this.setupReducedMotion();
        
        return Promise.resolve();
    }
    
    setupIntersectionObserver() {
        if (!window.IntersectionObserver) {
            console.warn('IntersectionObserver not supported');
            return;
        }
        
        const observerOptions = {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '50px 0px -50px 0px'
        };
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add visible class for CSS animations
                    element.classList.add('in-view');
                    
                    // Trigger custom animations based on data attributes
                    const animationType = element.dataset.animation;
                    if (animationType) {
                        this.triggerAnimation(element, animationType);
                    }
                    
                    // Stop observing once animated
                    if (!element.dataset.repeatAnimation) {
                        this.intersectionObserver.unobserve(element);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll('[data-animation], .animate-on-scroll');
        animatedElements.forEach(el => this.intersectionObserver.observe(el));
    }
    
    triggerAnimation(element, animationType) {
        switch (animationType) {
            case 'fadeIn':
                element.classList.add('fade-in');
                break;
            case 'slideUp':
                element.classList.add('slide-up');
                break;
            case 'scaleIn':
                element.classList.add('scale-in');
                break;
            case 'bounceIn':
                element.classList.add('bounce-in');
                break;
            default:
                element.classList.add(animationType);
        }
    }
    
    setupScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Parallax effect for hero section
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                if (scrollY < heroHeight) {
                    const parallaxSpeed = 0.5;
                    heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
                }
            }
            
            // Update navigation background opacity
            const header = document.querySelector('.header');
            if (header) {
                const opacity = Math.min(scrollY / 100, 1);
                header.style.setProperty('--header-bg-opacity', opacity);
            }
            
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
    
    setupHoverEffects() {
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.card, .btn, .nav-link, .social-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                if (!this.prefersReducedMotion()) {
                    e.target.classList.add('hover-active');
                }
            });
            
            element.addEventListener('mouseleave', (e) => {
                e.target.classList.remove('hover-active');
            });
        });
    }
    
    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without triggering scroll
                    history.pushState(null, null, `#${targetId}`);
                    
                    // Focus target for accessibility
                    targetElement.focus({ preventScroll: true });
                }
            });
        });
    }
    
    setupMobileNavigation() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navigation = document.querySelector('.nav');
        
        if (mobileMenuToggle && navigation) {
            mobileMenuToggle.addEventListener('click', () => {
                const isOpen = navigation.classList.contains('nav-open');
                
                if (isOpen) {
                    navigation.classList.remove('nav-open');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('nav-open');
                } else {
                    navigation.classList.add('nav-open');
                    mobileMenuToggle.setAttribute('aria-expanded', 'true');
                    document.body.classList.add('nav-open');
                }
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navigation.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navigation.classList.remove('nav-open');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('nav-open');
                }
            });
        }
    }
    
    setupKeyboardNavigation() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile menu
            if (e.key === 'Escape') {
                const navigation = document.querySelector('.nav');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                
                if (navigation?.classList.contains('nav-open')) {
                    navigation.classList.remove('nav-open');
                    mobileMenuToggle?.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('nav-open');
                    mobileMenuToggle?.focus();
                }
            }
            
            // Ctrl/Cmd + K for search (if implemented)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // Trigger search functionality
                console.log('Search shortcut triggered');
            }
            
            // Theme toggle with Ctrl/Cmd + Shift + T
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                if (window.themeManager) {
                    window.themeManager.toggleTheme();
                }
            }
        });
    }
    
    setupCardInteractions() {
        const cards = document.querySelectorAll('.card');
        const isMobile = this.isMobileDevice();
        
        cards.forEach(card => {
            let isFlipped = false;
            
            // Mobile touch interactions
            if (isMobile) {
                // Set tap hint text based on current language
                this.setCardTapHint(card);
                
                // Simple click to flip card on mobile
                card.addEventListener('click', (e) => {
                    // If clicking on a link or button, let it handle normally
                    if (e.target.closest('a, button')) {
                        return;
                    }
                    
                    e.preventDefault();
                    
                    // If card is already flipped and user clicks on back content, navigate
                    if (isFlipped && e.target.closest('.card-back')) {
                        const link = card.querySelector('.card-back a, .card-link');
                        if (link) {
                            window.location.href = link.href;
                            return;
                        }
                    }
                    
                    // Otherwise, flip the card
                    isFlipped = !isFlipped;
                    card.classList.toggle('flipped', isFlipped);
                });
            } else {
                // Desktop click handler for card navigation
                const link = card.querySelector('a');
                if (link) {
                    card.addEventListener('click', (e) => {
                        if (e.target === card || card.contains(e.target)) {
                            if (!e.target.closest('a, button')) {
                                link.click();
                            }
                        }
                    });
                }
            }
            
            // Make card focusable
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    
                    if (isMobile) {
                        // On mobile, flip card with keyboard
                        isFlipped = !isFlipped;
                        card.classList.toggle('flipped', isFlipped);
                    } else {
                        // On desktop, navigate directly
                        const link = card.querySelector('a');
                        if (link) link.click();
                    }
                }
            });
        });
    }
    
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    }
    
    setCardTapHint(card) {
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');
        const currentLang = document.documentElement.lang || 'zh-CN';
        
        if (cardFront) {
            const flipHintText = currentLang === 'en' ? '👆 Tap to flip' : '👆 点击翻转';
            cardFront.setAttribute('data-tap-hint', flipHintText);
        }
        
        if (cardBack) {
            const visitHintText = currentLang === 'en' ? '👆 Tap to visit' : '👆 点击访问';
            cardBack.setAttribute('data-visit-hint', visitHintText);
        }
    }
    
    setupCardLazyLoading() {
        // Lazy load card images
        const cardImages = document.querySelectorAll('.card img[data-src]');
        
        if (cardImages.length > 0 && window.IntersectionObserver) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            cardImages.forEach(img => imageObserver.observe(img));
        }
        
        // 处理已有图片，隐藏占位符内容
        this.handleExistingImages();
    }
    
    handleExistingImages() {
        // 获取所有卡片图片
        const cardImages = document.querySelectorAll('.card-img[src]:not([src=""])');
        
        // 为每个有效图片添加has-image类到父元素
        cardImages.forEach(img => {
            // 确保图片有效
            if (img.complete && img.naturalWidth > 0) {
                const placeholder = img.closest('.image-placeholder');
                if (placeholder) {
                    placeholder.classList.add('has-image');
                }
                // 添加点击事件（确保setupImagePreview中的事件绑定不会遗漏）
                this.addImageClickEvent(img);
            } else {
                // 为尚未加载完成的图片添加加载事件
                img.addEventListener('load', () => {
                    const placeholder = img.closest('.image-placeholder');
                    if (placeholder) {
                        placeholder.classList.add('has-image');
                    }
                    // 图片加载后添加点击事件
                    this.addImageClickEvent(img);
                });
            }
        });
    }
    
    addImageClickEvent(img) {
        console.log('🔄 为已加载图片添加点击事件:', img.src);
        const overlay = document.querySelector('.image-overlay');
        
        if (!overlay) {
            console.error('❌ 未找到图片预览遮罩元素');
            return;
        }
        
        // 确保遮罩有点击事件（如果尚未添加）
        if (!overlay.hasClickListener) {
            overlay.addEventListener('click', () => {
                const enlargedImg = document.querySelector('.card-img.enlarged');
                if (enlargedImg) {
                    enlargedImg.classList.remove('enlarged');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            overlay.hasClickListener = true;
        }
        
        // 移除可能存在的旧事件监听器
        const newImg = img.cloneNode(true);
        if (img.parentNode) {
            img.parentNode.replaceChild(newImg, img);
        }
        
        // 添加点击事件
        newImg.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            console.log('👆 已加载图片被点击:', newImg.src);
            
            // 切换放大状态
            newImg.classList.toggle('enlarged');
            
            // 显示/隐藏遮罩
            if (newImg.classList.contains('enlarged')) {
                console.log('🔍 放大图片并显示遮罩');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            } else {
                console.log('🔍 缩小图片并隐藏遮罩');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    setupFocusManagement() {
        // Skip to main content link
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const mainContent = document.querySelector('main, #main-content');
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView();
                }
            });
        }
        
        // Focus management for modal dialogs (if any)
        this.setupModalFocusManagement();
    }
    
    setupModalFocusManagement() {
        // This would be used for any modal dialogs
        const modals = document.querySelectorAll('[role="dialog"]');
        
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    this.trapFocus(modal, e);
                }
            });
        });
    }
    
    trapFocus(container, event) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
    
    setupAriaLiveRegions() {
        // Create live region for announcements
        if (!document.getElementById('aria-live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'aria-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            document.body.appendChild(liveRegion);
        }
    }
    
    announceToScreenReader(message) {
        const liveRegion = document.getElementById('aria-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
    
    setupReducedMotion() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleReducedMotion = (mediaQuery) => {
            if (mediaQuery.matches) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        };
        
        handleReducedMotion(prefersReducedMotion);
        prefersReducedMotion.addEventListener('change', handleReducedMotion);
    }
    
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    setupPageInteractions() {
        // Setup scroll to top button
        this.setupScrollToTop();
        
        // Setup external link handling
        this.setupExternalLinks();
        
        // Setup copy to clipboard functionality
        this.setupCopyToClipboard();
    }
    
    setupScrollToTop() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (!scrollToTopBtn) return;
        
        const toggleScrollToTop = () => {
            const scrolled = window.pageYOffset > 300;
            scrollToTopBtn.classList.toggle('visible', scrolled);
        };
        
        window.addEventListener('scroll', toggleScrollToTop, { passive: true });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        
        externalLinks.forEach(link => {
            // Add external link attributes
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add visual indicator
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.setAttribute('aria-hidden', 'true');
                icon.innerHTML = ' ↗';
                link.appendChild(icon);
            }
        });
    }
    
    setupCopyToClipboard() {
        const copyButtons = document.querySelectorAll('[data-copy]');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const textToCopy = button.dataset.copy || button.textContent;
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    this.announceToScreenReader('Copied to clipboard');
                    
                    // Visual feedback
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.classList.remove('copied');
                    }, 2000);
                } catch (error) {
                    console.error('Failed to copy to clipboard:', error);
                    this.announceToScreenReader('Failed to copy');
                }
            });
        });
    }
    
    setupPerformanceMonitoring() {
        // Monitor performance metrics
        if (window.performance && window.performance.observer) {
            // Monitor largest contentful paint
            this.observeLCP();
            
            // Monitor first input delay
            this.observeFID();
            
            // Monitor cumulative layout shift
            this.observeCLS();
        }
        
        // Monitor memory usage (if available)
        this.monitorMemoryUsage();
    }
    
    observeLCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
            console.warn('LCP observation not supported:', error);
        }
    }
    
    observeFID() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            observer.observe({ entryTypes: ['first-input'] });
        } catch (error) {
            console.warn('FID observation not supported:', error);
        }
    }
    
    observeCLS() {
        try {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
            console.warn('CLS observation not supported:', error);
        }
    }
    
    monitorMemoryUsage() {
        if (window.performance && window.performance.memory) {
            const logMemoryUsage = () => {
                const memory = window.performance.memory;
                console.log('Memory usage:', {
                    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
                    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
                    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
                });
            };
            
            // Log memory usage every 30 seconds
            setInterval(logMemoryUsage, 30000);
        }
    }
    
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleError(event.error, 'global');
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleError(event.reason, 'promise');
        });
    }
    
    handleError(error, type) {
        // Log error details
        const errorInfo = {
            message: error.message || error,
            stack: error.stack,
            type,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.error('Error details:', errorInfo);
        
        // In a real application, you might send this to an error tracking service
        // this.sendErrorToService(errorInfo);
    }
    
    handleInitializationError(error) {
        // Show user-friendly error message
        const errorContainer = document.createElement('div');
        errorContainer.className = 'initialization-error';
        errorContainer.innerHTML = `
            <div class="error-content">
                <h2>Oops! Something went wrong</h2>
                <p>We're having trouble loading the website. Please try refreshing the page.</p>
                <button onclick="window.location.reload()" class="btn btn-primary">Refresh Page</button>
            </div>
        `;
        
        document.body.appendChild(errorContainer);
        this.hideLoading();
    }
    
    showLoading() {
        console.log('🔄 查找加载屏幕元素...');
        this.loadingElement = document.querySelector('.loading-screen');
        if (this.loadingElement) {
            console.log('✅ 找到加载屏幕元素，显示加载状态');
            this.loadingElement.style.display = 'flex';
            this.loadingElement.classList.remove('hidden');
        } else {
            console.error('❌ 未找到加载屏幕元素 (.loading-screen)');
        }
    }
    
    hideLoading() {
        console.log('🔄 准备隐藏加载屏幕...');
        if (this.loadingElement) {
            console.log('✅ 隐藏加载屏幕');
            this.loadingElement.classList.add('hidden');
            setTimeout(() => {
                this.loadingElement.style.display = 'none';
                console.log('✅ 加载屏幕完全隐藏');
            }, 500);
        } else {
            console.error('❌ 加载屏幕元素不存在，无法隐藏');
        }
    }
    
    dispatchReadyEvent() {
        const event = new CustomEvent('appReady', {
            detail: {
                modules: this.modules,
                timestamp: Date.now()
            }
        });
        document.dispatchEvent(event);
    }
    
    initializeDataManager() {
        try {
            const dataManagerBtn = document.getElementById('data-manager-btn');
            if (dataManagerBtn) {
                dataManagerBtn.addEventListener('click', () => {
                    if (window.dataManager) {
                        window.dataManager.show();
                    } else {
                        console.warn('⚠️ 数据管理器未就绪');
                    }
                });
                console.log('✅ 数据管理器按钮初始化完成');
            } else {
                console.warn('⚠️ 未找到数据管理器按钮');
            }
        } catch (error) {
            console.error('❌ 数据管理器初始化失败:', error);
        }
    }
    
    // Public API
    getModuleStatus(moduleName) {
        return this.modules[moduleName] || { status: 'not-found' };
    }
    
    getAllModulesStatus() {
        return { ...this.modules };
    }
    
    isReady() {
        return this.isInitialized;
    }
    
    destroy() {
        // Clean up observers and event listeners
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        // Clean up modules
        Object.keys(this.modules).forEach(moduleName => {
            const module = window[moduleName + 'Manager'];
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
    }
}

// Initialize the application
const app = new App();

// Export for global access
window.app = app;

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.app) {
        window.app.destroy();
    }
});