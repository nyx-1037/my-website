/**
 * Internationalization (i18n) Module
 * Handles language switching and text translation
 */

class I18n {
    constructor() {
        this.currentLanguage = 'zh-CN';
        this.translations = {};
        this.fallbackLanguage = 'zh-CN';
        this.supportedLanguages = ['zh-CN', 'en'];
        
        this.init();
    }
    
    async init() {
        // Get saved language from localStorage or detect from browser
        this.currentLanguage = this.getSavedLanguage() || this.detectBrowserLanguage();
        
        // Load translations
        await this.loadTranslations();
        
        // Apply translations
        this.applyTranslations();
        
        // Update UI
        this.updateLanguageUI();
        
        // Bind events
        this.bindEvents();
    }
    
    getSavedLanguage() {
        return localStorage.getItem('preferred-language');
    }
    
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Check if browser language is supported
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }
        
        // Check if browser language prefix is supported (e.g., 'en-US' -> 'en')
        const langPrefix = browserLang.split('-')[0];
        const matchedLang = this.supportedLanguages.find(lang => lang.startsWith(langPrefix));
        
        return matchedLang || this.fallbackLanguage;
    }
    
    async loadTranslations() {
        try {
            // Load all supported languages
            const loadPromises = this.supportedLanguages.map(async (lang) => {
                const response = await fetch(`i18n/${lang}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${lang} translations`);
                }
                const translations = await response.json();
                this.translations[lang] = translations;
            });
            
            await Promise.all(loadPromises);
            console.log('All translations loaded successfully');
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to default language if available
            if (!this.translations[this.fallbackLanguage]) {
                console.warn('Fallback language not available');
            }
        }
    }
    
    translate(key, lang = this.currentLanguage) {
        const translation = this.getNestedValue(this.translations[lang], key);
        
        if (translation) {
            return translation;
        }
        
        // Fallback to default language
        if (lang !== this.fallbackLanguage) {
            const fallbackTranslation = this.getNestedValue(this.translations[this.fallbackLanguage], key);
            if (fallbackTranslation) {
                console.warn(`Translation missing for key '${key}' in language '${lang}', using fallback`);
                return fallbackTranslation;
            }
        }
        
        console.warn(`Translation missing for key '${key}'`);
        return key; // Return key as fallback
    }
    
    getNestedValue(obj, key) {
        return key.split('.').reduce((current, keyPart) => {
            return current && current[keyPart] !== undefined ? current[keyPart] : null;
        }, obj);
    }
    
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n-key]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            const translation = this.translate(key);
            
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.value = translation;
                } else {
                    element.placeholder = translation;
                }
            } else if (element.hasAttribute('title')) {
                element.title = translation;
            } else if (element.hasAttribute('alt')) {
                element.alt = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update document title and meta description
        this.updateDocumentMeta();
    }
    
    updateDocumentMeta() {
        const title = this.translate('site.title');
        const description = this.translate('site.description');
        
        if (title) {
            document.title = title;
        }
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && description) {
            metaDescription.setAttribute('content', description);
        }
        
        // Update html lang attribute
        document.documentElement.lang = this.currentLanguage;
    }
    
    updateLanguageUI() {
        const langSwitch = document.getElementById('lang-switch');
        
        if (langSwitch) {
            // Update switch state: checked = English, unchecked = Chinese
            langSwitch.checked = this.currentLanguage === 'en';
            
            // Update container title
            const container = langSwitch.closest('.switch-container');
            if (container) {
                const title = this.currentLanguage === 'zh-CN' ? '切换语言' : 'Switch Language';
                container.title = title;
                container.setAttribute('aria-label', title);
            }
        }
    }
    
    async switchLanguage(newLanguage) {
        if (!this.supportedLanguages.includes(newLanguage)) {
            console.warn(`Language '${newLanguage}' is not supported`);
            return;
        }
        
        if (newLanguage === this.currentLanguage) {
            return;
        }
        
        // Show loading state
        this.showLoadingState();
        
        try {
            this.currentLanguage = newLanguage;
            
            // Save to localStorage
            localStorage.setItem('preferred-language', newLanguage);
            
            // Apply new translations
            this.applyTranslations();
            
            // Update UI
            this.updateLanguageUI();
            
            // Trigger custom event
            this.dispatchLanguageChangeEvent();
            
            // Add smooth transition effect
            this.addTransitionEffect();
            
        } catch (error) {
            console.error('Error switching language:', error);
        } finally {
            this.hideLoadingState();
        }
    }
    
    showLoadingState() {
        const langSwitch = document.getElementById('lang-switch');
        if (langSwitch) {
            langSwitch.disabled = true;
            const container = langSwitch.closest('.switch-container');
            if (container) {
                container.classList.add('loading');
            }
        }
    }
    
    hideLoadingState() {
        const langSwitch = document.getElementById('lang-switch');
        if (langSwitch) {
            langSwitch.disabled = false;
            const container = langSwitch.closest('.switch-container');
            if (container) {
                container.classList.remove('loading');
            }
        }
    }
    
    addTransitionEffect() {
        document.body.classList.add('language-transition');
        setTimeout(() => {
            document.body.classList.remove('language-transition');
        }, 300);
    }
    
    dispatchLanguageChangeEvent() {
        const event = new CustomEvent('languageChanged', {
            detail: {
                newLanguage: this.currentLanguage,
                translations: this.translations[this.currentLanguage]
            }
        });
        document.dispatchEvent(event);
    }
    
    bindEvents() {
        // Language switch
        const langSwitch = document.getElementById('lang-switch');
        if (langSwitch) {
            langSwitch.addEventListener('change', (e) => {
                this.toggleLanguage();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + L to toggle language
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                this.toggleLanguage();
            }
        });
        
        // Handle dynamic content updates
        this.observeContentChanges();
    }
    
    toggleLanguage() {
        const currentIndex = this.supportedLanguages.indexOf(this.currentLanguage);
        const nextIndex = (currentIndex + 1) % this.supportedLanguages.length;
        const nextLanguage = this.supportedLanguages[nextIndex];
        this.switchLanguage(nextLanguage);
    }
    
    observeContentChanges() {
        // Use MutationObserver to handle dynamically added content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const i18nElements = node.querySelectorAll('[data-i18n-key]');
                        if (i18nElements.length > 0 || node.hasAttribute('data-i18n-key')) {
                            // Apply translations to new elements
                            setTimeout(() => this.applyTranslations(), 0);
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Public API methods
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getSupportedLanguages() {
        return [...this.supportedLanguages];
    }
    
    isLanguageSupported(language) {
        return this.supportedLanguages.includes(language);
    }
    
    // Format numbers and dates according to current locale
    formatNumber(number, options = {}) {
        try {
            return new Intl.NumberFormat(this.currentLanguage, options).format(number);
        } catch (error) {
            console.warn('Number formatting failed:', error);
            return number.toString();
        }
    }
    
    formatDate(date, options = {}) {
        try {
            return new Intl.DateTimeFormat(this.currentLanguage, options).format(date);
        } catch (error) {
            console.warn('Date formatting failed:', error);
            return date.toString();
        }
    }
    
    formatRelativeTime(value, unit) {
        try {
            const rtf = new Intl.RelativeTimeFormat(this.currentLanguage, { numeric: 'auto' });
            return rtf.format(value, unit);
        } catch (error) {
            console.warn('Relative time formatting failed:', error);
            return `${value} ${unit}`;
        }
    }
}

// CSS for language transition effect
const i18nStyle = document.createElement('style');
i18nStyle.textContent = `
    .language-transition {
        transition: opacity 0.3s ease;
    }
    
    .language-transition * {
        transition: opacity 0.3s ease;
    }
    
    #lang-btn.loading {
        opacity: 0.6;
        pointer-events: none;
    }
    
    .language-dropdown button.active {
        background: var(--primary-color);
        color: white;
    }
`;
document.head.appendChild(i18nStyle);

// Initialize i18n when DOM is loaded
let i18nInstance;

function initializeI18n() {
    console.log('🔄 开始初始化 I18n 类...');
    try {
        i18nInstance = new I18n();
        window.i18n = i18nInstance;
        console.log('✅ I18n 模块初始化成功，已导出到 window.i18n');
    } catch (error) {
        console.error('❌ I18n 模块初始化失败:', error);
    }
}

if (document.readyState === 'loading') {
    console.log('⏳ DOM 正在加载，等待 DOMContentLoaded 事件...');
    document.addEventListener('DOMContentLoaded', initializeI18n);
} else {
    console.log('✅ DOM 已加载完成，立即初始化 I18n');
    initializeI18n();
}