/**
 * Theme Management Module
 * Handles dark/light mode switching and theme persistence
 * Version: 1.0.1
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themes = ['light', 'dark'];
        this.storageKey = 'preferred-theme';
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        this.init();
    }
    
    init() {
        // Get saved theme or detect system preference
        this.currentTheme = this.getSavedTheme() || this.getSystemTheme();
        
        // Apply initial theme
        this.applyTheme(this.currentTheme);
        
        // Update UI
        this.updateThemeUI();
        
        // Bind events
        this.bindEvents();
        
        // Listen for system theme changes
        this.listenForSystemThemeChanges();
    }
    
    getSavedTheme() {
        return localStorage.getItem(this.storageKey);
    }
    
    getSystemTheme() {
        return this.mediaQuery.matches ? 'dark' : 'light';
    }
    
    applyTheme(theme) {
        if (!this.themes.includes(theme)) {
            console.warn(`Theme '${theme}' is not supported`);
            return;
        }
        
        // Remove all theme classes
        this.themes.forEach(t => {
            document.documentElement.classList.remove(`theme-${t}`);
        });
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.add(`theme-${theme}`);
        
        console.log(`Applied theme: ${theme}, data-theme attribute set to: ${document.documentElement.getAttribute('data-theme')}`);
        console.log(`Document classes: ${document.documentElement.className}`);
        
        this.currentTheme = theme;
        
        // Save to localStorage
        localStorage.setItem(this.storageKey, theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor();
        
        // Force update modal styles if modal is open
        this.updateModalTheme();
        
        // Trigger custom event
        this.dispatchThemeChangeEvent();
        
        console.log(`Theme switched to: ${theme}`);
    }
    
    updateModalTheme() {
        // Check if Bootstrap modal is open
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            // Force re-render modal styles by toggling a class
            openModal.classList.add('theme-updating');
            setTimeout(() => {
                openModal.classList.remove('theme-updating');
            }, 50);
        }
    }
    
    updateMetaThemeColor() {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        const colors = {
            light: '#ffffff',
            dark: '#0f172a'
        };
        
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', colors[this.currentTheme]);
        } else {
            // Create meta theme-color if it doesn't exist
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = colors[this.currentTheme];
            document.head.appendChild(meta);
        }
    }
    
    updateThemeUI() {
        const themeSwitch = document.getElementById('theme-switch');
        if (!themeSwitch) return;
        
        // Update switch state based on current theme
        themeSwitch.checked = this.currentTheme === 'dark';
        
        // Update container title
        const container = themeSwitch.closest('.switch-container');
        if (container) {
            const title = this.currentTheme === 'dark' ? '切换到浅色模式' : '切换到深色模式';
            container.title = title;
            container.setAttribute('aria-label', title);
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.switchTheme(newTheme);
    }
    
    switchTheme(theme) {
        if (theme === this.currentTheme) return;
        
        // Add transition effect
        this.addTransitionEffect();
        
        // Apply new theme
        this.applyTheme(theme);
        
        // Update UI
        this.updateThemeUI();
    }
    
    addTransitionEffect() {
        // Add smooth transition class
        document.documentElement.classList.add('theme-transition');
        
        // Remove transition class after animation
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 500);
    }
    
    dispatchThemeChangeEvent() {
        // 在主题切换时保存访问量数据
        if (window.statsManager && window.statsManager.visitorCount > 0) {
            localStorage.setItem('visitor-count-backup', window.statsManager.visitorCount.toString());
            console.log(`📊 主题切换前保存访问量: ${window.statsManager.visitorCount}`);
        }
        
        const event = new CustomEvent('themeChanged', {
            detail: {
                theme: this.currentTheme,
                previousTheme: this.currentTheme === 'dark' ? 'light' : 'dark'
            }
        });
        document.dispatchEvent(event);
    }
    
    bindEvents() {
        // Theme toggle switch
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) {
            themeSwitch.addEventListener('change', (e) => {
                this.toggleTheme();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + D to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // Listen for theme change events from other sources
        document.addEventListener('themeChanged', (e) => {
            this.handleExternalThemeChange(e.detail);
        });
    }
    
    listenForSystemThemeChanges() {
        this.mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!this.getSavedTheme()) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.switchTheme(systemTheme);
            }
        });
    }
    
    handleExternalThemeChange(detail) {
        // Handle theme changes from external sources (e.g., other scripts)
        console.log('External theme change detected:', detail);
    }
    
    // Auto theme based on time of day
    enableAutoTheme() {
        const hour = new Date().getHours();
        const isDayTime = hour >= 6 && hour < 18;
        const autoTheme = isDayTime ? 'light' : 'dark';
        
        this.switchTheme(autoTheme);
        
        // Set up automatic switching
        this.scheduleAutoThemeSwitch();
    }
    
    scheduleAutoThemeSwitch() {
        const now = new Date();
        const hour = now.getHours();
        
        let nextSwitchTime;
        if (hour < 6) {
            // Switch to light at 6 AM
            nextSwitchTime = new Date(now);
            nextSwitchTime.setHours(6, 0, 0, 0);
        } else if (hour < 18) {
            // Switch to dark at 6 PM
            nextSwitchTime = new Date(now);
            nextSwitchTime.setHours(18, 0, 0, 0);
        } else {
            // Switch to light at 6 AM next day
            nextSwitchTime = new Date(now);
            nextSwitchTime.setDate(now.getDate() + 1);
            nextSwitchTime.setHours(6, 0, 0, 0);
        }
        
        const timeUntilSwitch = nextSwitchTime.getTime() - now.getTime();
        
        setTimeout(() => {
            this.enableAutoTheme();
        }, timeUntilSwitch);
    }
    
    disableAutoTheme() {
        // Clear any scheduled auto theme switches
        // This would require storing timeout IDs, which we'll skip for simplicity
        console.log('Auto theme disabled');
    }
    
    // Theme presets
    getThemePresets() {
        return {
            light: {
                name: 'Light',
                description: 'Clean and bright interface',
                preview: '#ffffff'
            },
            dark: {
                name: 'Dark',
                description: 'Easy on the eyes in low light',
                preview: '#0f172a'
            }
        };
    }
    
    // Accessibility features
    enableHighContrast() {
        document.documentElement.classList.add('high-contrast');
        localStorage.setItem('high-contrast', 'true');
    }
    
    disableHighContrast() {
        document.documentElement.classList.remove('high-contrast');
        localStorage.removeItem('high-contrast');
    }
    
    isHighContrastEnabled() {
        return localStorage.getItem('high-contrast') === 'true';
    }
    
    // Public API methods
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getAvailableThemes() {
        return [...this.themes];
    }
    
    isThemeSupported(theme) {
        return this.themes.includes(theme);
    }
    
    // Theme analytics (optional)
    trackThemeUsage() {
        const usage = JSON.parse(localStorage.getItem('theme-usage') || '{}');
        usage[this.currentTheme] = (usage[this.currentTheme] || 0) + 1;
        localStorage.setItem('theme-usage', JSON.stringify(usage));
    }
    
    getThemeUsageStats() {
        return JSON.parse(localStorage.getItem('theme-usage') || '{}');
    }
}

// CSS for theme transitions
const themeStyle = document.createElement('style');
themeStyle.textContent = `
    .theme-transition,
    .theme-transition *,
    .theme-transition *:before,
    .theme-transition *:after {
        transition: background-color 0.5s ease,
                    color 0.5s ease,
                    border-color 0.5s ease,
                    box-shadow 0.5s ease !important;
    }
    
    #theme-btn.theme-changed {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    
    .high-contrast {
        filter: contrast(150%) brightness(110%);
    }
    
    /* Smooth icon transition */
    #theme-btn i {
        transition: transform 0.3s ease;
    }
    
    #theme-btn:hover i {
        transform: rotate(20deg);
    }
    
    /* Theme button loading state */
    #theme-btn.loading {
        opacity: 0.6;
        pointer-events: none;
    }
    
    #theme-btn.loading i {
        animation: rotate 1s linear infinite;
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Respect user's motion preferences */
    @media (prefers-reduced-motion: reduce) {
        .theme-transition,
        .theme-transition *,
        .theme-transition *:before,
        .theme-transition *:after {
            transition: none !important;
        }
        
        #theme-btn i,
        #theme-btn:hover i {
            transform: none !important;
        }
    }
`;
document.head.appendChild(themeStyle);

// Initialize theme manager
function initializeThemeManager() {
    console.log('🔄 开始初始化 ThemeManager 类...');
    try {
        const themeManagerInstance = new ThemeManager();
        // 立即设置到 window 对象
        window.themeManager = themeManagerInstance;
        console.log('✅ ThemeManager 模块初始化成功，已导出到 window.themeManager');
        
        // Apply high contrast if previously enabled
        if (localStorage.getItem('high-contrast') === 'true') {
            console.log('🔄 应用之前保存的高对比度设置...');
            themeManagerInstance.enableHighContrast();
        }
        
        // 触发自定义事件通知模块已加载
        const event = new CustomEvent('themeManagerReady', { detail: themeManagerInstance });
        document.dispatchEvent(event);
    } catch (error) {
        console.error('❌ ThemeManager 模块初始化失败:', error);
        window.themeManager = null;
    }
}

// 立即初始化，不等待 DOM
console.log('🚀 立即初始化 ThemeManager');
initializeThemeManager();

// 如果 DOM 还没准备好，也监听 DOMContentLoaded 事件
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 如果之前初始化失败，重试
        if (!window.themeManager) {
            console.log('🔄 DOM 加载完成，重试初始化 ThemeManager');
            initializeThemeManager();
        }
    });
}

// Listen for system theme changes even before initialization
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (window.themeManager && !localStorage.getItem('preferred-theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            window.themeManager.switchTheme(systemTheme);
        }
    });
}