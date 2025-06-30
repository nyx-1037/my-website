/**
 * Statistics Module
 * Handles uptime calculation, visitor counting, and other site statistics
 * Version: 1.0.1
 */

class StatsManager {
    constructor() {
        this.startDate = null; // Will be loaded from stats.json
        this.updateInterval = 60000; // Update every minute
        this.uptimeTimer = null;
        this.visitorCount = 0;
        this.pageViews = 0;
        this.sessionStartTime = Date.now();
        
        this.init();
    }
    
    init() {
        // Wait for fileStorage to be ready before initializing
        this.loadStartDate();
        this.startInitialization();
    }
    
    loadStartDate() {
        this.startDate = new Date('2025-06-21T00:00:00Z');
        console.log('📊 使用硬编码的网站启动时间: 2025-06-21T00:00:00Z');
    }
    
    startInitialization() {
        // Start uptime counter
        this.startUptimeCounter();
        
        // Initialize visitor tracking
        this.initVisitorTracking();
        
        // Track page view
        this.trackPageView();
        
        // Bind events
        this.bindEvents();
        
        // Initial display update
        this.updateDisplay();
    }
    
    startUptimeCounter() {
        // Update immediately
        this.updateUptime();
        
        // Set up interval for regular updates
        this.uptimeTimer = setInterval(() => {
            this.updateUptime();
        }, this.updateInterval);
    }
    
    updateUptime() {
        const now = new Date();
        const diff = now.getTime() - this.startDate.getTime();
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const uptimeData = {
            days,
            hours,
            minutes,
            seconds,
            totalDays: days,
            totalHours: Math.floor(diff / (1000 * 60 * 60)),
            totalMinutes: Math.floor(diff / (1000 * 60)),
            totalSeconds: Math.floor(diff / 1000)
        };
        
        this.displayUptime(uptimeData);
        
        // Trigger custom event
        this.dispatchUptimeUpdateEvent(uptimeData);
    }
    
    displayUptime(uptimeData) {
        const uptimeElement = document.getElementById('uptime-display');
        if (!uptimeElement) return;
        
        // Format uptime string based on current language
        const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'zh-CN';
        let uptimeString;
        
        if (lang === 'en') {
            if (uptimeData.days > 0) {
                uptimeString = `${uptimeData.days}d ${uptimeData.hours}h ${uptimeData.minutes}m`;
            } else if (uptimeData.hours > 0) {
                uptimeString = `${uptimeData.hours}h ${uptimeData.minutes}m`;
            } else {
                uptimeString = `${uptimeData.minutes}m ${uptimeData.seconds}s`;
            }
        } else {
            if (uptimeData.days > 0) {
                uptimeString = `${uptimeData.days}天 ${uptimeData.hours}小时 ${uptimeData.minutes}分钟`;
            } else if (uptimeData.hours > 0) {
                uptimeString = `${uptimeData.hours}小时 ${uptimeData.minutes}分钟`;
            } else {
                uptimeString = `${uptimeData.minutes}分钟 ${uptimeData.seconds}秒`;
            }
        }
        
        uptimeElement.textContent = uptimeString;
        
        // Add animation class for visual feedback
        uptimeElement.classList.add('updated');
        setTimeout(() => {
            uptimeElement.classList.remove('updated');
        }, 500);
    }
    
    initVisitorTracking() {
        // 等待文件存储管理器初始化完成
        this.setupVisitorTracking();
    }
    
    setupVisitorTracking() {
        // 每次进入或刷新页面都增加访问量并加载访问者数量
        this.incrementVisitorCount();
        
        // 立即更新显示
        this.updateDisplay();
    }
    
    incrementVisitorCount() {
        var settings = {
            "url": "/api/visitor/increment?target=nie1037",
            "method": "GET",
            "timeout": 0,
        };
        
        $.ajax(settings)
            .done((response) => {
                this.visitorCount = response.count; // API返回的访问量
                // this.pageViews = response.pageViews; // 页面浏览量目前API未提供，暂时注释
                console.log(`📊 访问量已通过API更新: ${this.visitorCount}`);
                this.displayVisitorCount();
                this.displayPageViews();
            })
            .fail((error) => {
                console.error('❌ 调用访问量API失败:', error);
                this.visitorCount = 0;
                this.pageViews = 0;
                this.displayVisitorCount();
                this.displayPageViews();
            });
    }
    
    trackPageView() {
        // 页面浏览量已在 incrementVisitorCount 中通过API更新，此处无需额外操作
        console.log('📊 页面浏览量已在 incrementVisitorCount 中通过API更新');
    }
    
    // 这些方法不再需要，因为数据直接通过API获取和更新
    getStoredStats() {
        console.warn('⚠️ getStoredStats 不再使用，请直接从API获取数据');
        return { totalVisitors: this.visitorCount, pageViews: this.pageViews };
    }
    
    saveStats(stats) {
        console.warn('⚠️ saveStats 不再使用，数据通过API自动保存');
    }
    
    updateDisplay() {
        this.displayVisitorCount();
        this.displayPageViews();
    }
    
    displayVisitorCount() {
        const visitorElement = document.getElementById('visitor-count');
        if (!visitorElement) {
            console.warn('⚠️ 未找到访问量显示元素 #visitor-count');
            return;
        }
        
        // 确保使用最新的访问量数据
        if (window.fileStorage) {
            const stats = window.fileStorage.getStats();
            this.visitorCount = stats.totalVisitors;
        }
        
        // 访问量直接从API获取，无需本地恢复或强制设置为1
        // this.visitorCount 已经在 incrementVisitorCount 中更新
        
        // Format number with locale-specific formatting
        const formattedCount = this.formatNumber(this.visitorCount);
        visitorElement.textContent = this.visitorCount === 0 ? '-' : formattedCount;
        
        console.log(`📊 显示访问量: ${formattedCount}`);
        
        // Add visual feedback
        visitorElement.classList.add('updated');
        setTimeout(() => {
            visitorElement.classList.remove('updated');
        }, 500);
    }
    
    displayPageViews() {
        const pageViewsElement = document.getElementById('page-views');
        if (!pageViewsElement) return;
        pageViewsElement.textContent = this.pageViews > 0 ? this.pageViews : '-';
        pageViewsElement.classList.add('updated');
        setTimeout(() => {
            pageViewsElement.classList.remove('updated');
        }, 500);
    }
    
    formatNumber(number) {
        if (window.i18n && typeof window.i18n.formatNumber === 'function') {
            return window.i18n.formatNumber(number);
        }
        
        // Fallback formatting
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number.toLocaleString();
    }
    
    animateCounter(element, start, end, duration) {
        if (start === end) return;
        
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = this.formatNumber(Math.floor(current));
        }, 16);
    }
    
    // Session tracking
    getSessionDuration() {
        return Date.now() - this.sessionStartTime;
    }
    
    getFormattedSessionDuration() {
        const duration = this.getSessionDuration();
        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        
        if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
    }
    
    // Performance metrics
    getPerformanceMetrics() {
        if (!window.performance) return null;
        
        const navigation = performance.getEntriesByType('navigation')[0];
        if (!navigation) return null;
        
        return {
            loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
            domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
            firstPaint: this.getFirstPaint(),
            firstContentfulPaint: this.getFirstContentfulPaint()
        };
    }
    
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? Math.round(firstPaint.startTime) : null;
    }
    
    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? Math.round(fcp.startTime) : null;
    }
    
    bindEvents() {
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseTracking();
            } else {
                this.resumeTracking();
            }
        });
        
        // Track when user leaves the page
        window.addEventListener('beforeunload', () => {
            this.trackSessionEnd();
        });
        
        // Listen for language changes to update display format
        document.addEventListener('languageChanged', () => {
            this.updateDisplay();
            this.updateUptime(); // Refresh uptime display with new language
        });
        
        // Listen for theme changes to preserve visitor count
        document.addEventListener('themeChanged', () => {
            // 主题切换后，确保访问量显示正确
            setTimeout(() => {
                this.updateDisplay();
            }, 100);
        });
        
        // Track scroll depth
        this.trackScrollDepth();
    }
    
    pauseTracking() {
        if (this.uptimeTimer) {
            clearInterval(this.uptimeTimer);
            this.uptimeTimer = null;
        }
    }
    
    resumeTracking() {
        if (!this.uptimeTimer) {
            this.startUptimeCounter();
        }
    }
    
    trackSessionEnd() {
        const sessionData = {
            duration: this.getSessionDuration(),
            endTime: new Date().toISOString(),
            performance: this.getPerformanceMetrics(),
            visitorId: 'unknown'
        };
        
        console.log('📊 会话结束，会话数据 (未保存):', sessionData);
    }
    
    trackScrollDepth() {
        let maxScrollDepth = 0;
        
        const updateScrollDepth = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollDepth = Math.round((scrollTop / documentHeight) * 100);
            
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                
                // Track milestone scroll depths
                if (scrollDepth >= 25 && !this.scrollMilestones?.['25']) {
                    this.trackScrollMilestone(25);
                } else if (scrollDepth >= 50 && !this.scrollMilestones?.['50']) {
                    this.trackScrollMilestone(50);
                } else if (scrollDepth >= 75 && !this.scrollMilestones?.['75']) {
                    this.trackScrollMilestone(75);
                } else if (scrollDepth >= 90 && !this.scrollMilestones?.['90']) {
                    this.trackScrollMilestone(90);
                }
            }
        };
        
        this.scrollMilestones = {};
        window.addEventListener('scroll', updateScrollDepth, { passive: true });
    }
    
    trackScrollMilestone(percentage) {
        this.scrollMilestones[percentage] = true;
        console.log(`📊 滚动里程碑达成: ${percentage}%`);
        
        // 不再使用文件存储管理器记录滚动里程碑
    }
    
    dispatchUptimeUpdateEvent(uptimeData) {
        const event = new CustomEvent('uptimeUpdated', {
            detail: uptimeData
        });
        document.dispatchEvent(event);
    }
    
    // Public API methods
    getCurrentStats() {
        return {
            uptime: this.getUptimeData(),
            visitors: this.visitorCount,
            pageViews: this.pageViews,
            sessionDuration: this.getSessionDuration(),
            performance: this.getPerformanceMetrics()
        };
    }
    
    getUptimeData() {
        const now = new Date();
        const diff = now.getTime() - this.startDate.getTime();
        
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
            totalSeconds: Math.floor(diff / 1000)
        };
    }
    
    destroy() {
        if (this.uptimeTimer) {
            clearInterval(this.uptimeTimer);
        }
    }
}

// CSS for stats animations
const statsStyle = document.createElement('style');
statsStyle.textContent = `
    #uptime-display.updated {
        color: var(--primary-color);
        transform: scale(1.05);
        transition: all 0.3s ease;
    }
    
    .stat-item {
        transition: all 0.3s ease;
    }
    
    .stat-item:hover {
        transform: translateY(-2px);
        color: var(--primary-color);
    }
    
    @keyframes countUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .counter-animation {
        animation: countUp 0.5s ease-out;
    }
`;
document.head.appendChild(statsStyle);

// Initialize stats manager when DOM is loaded
let statsManagerInstance;

function initializeStatsManager() {
    console.log('🔄 开始初始化 StatsManager 类...');
    try {
        statsManagerInstance = new StatsManager();
        // 立即设置到 window 对象
        window.statsManager = statsManagerInstance;
        console.log('✅ StatsManager 模块初始化成功，已导出到 window.statsManager');
        
        // 触发自定义事件通知模块已加载
        const event = new CustomEvent('statsManagerReady', { detail: statsManagerInstance });
        document.dispatchEvent(event);
    } catch (error) {
        console.error('❌ StatsManager 模块初始化失败:', error);
        window.statsManager = null;
    }
}

// 立即初始化，不等待 DOM
console.log('🚀 立即初始化 StatsManager');
initializeStatsManager();

// 如果 DOM 还没准备好，也监听 DOMContentLoaded 事件
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 如果之前初始化失败，重试
        if (!window.statsManager) {
            console.log('🔄 DOM 加载完成，重试初始化 StatsManager');
            initializeStatsManager();
        }
    });
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.statsManager) {
        window.statsManager.destroy();
    }
});