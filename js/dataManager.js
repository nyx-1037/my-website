/**
 * Data Manager
 * 提供数据管理界面和功能
 * Version: 1.0.0
 */

class DataManager {
    constructor() {
        this.isVisible = false;
        this.init();
    }
    
    init() {
        this.createDataManagerUI();
        this.bindEvents();
        console.log('✅ DataManager 初始化成功');
    }
    
    createDataManagerUI() {
        // 创建数据管理面板
        const panel = document.createElement('div');
        panel.id = 'data-manager-panel';
        panel.className = 'data-manager-panel';
        panel.innerHTML = `
            <div class="data-manager-content">
                <div class="data-manager-header">
                    <h3>📊 数据管理中心</h3>
                    <button class="close-btn" id="close-data-manager">&times;</button>
                </div>
                
                <div class="data-manager-body">
                    <div class="stats-overview">
                        <h4>📈 统计概览</h4>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <span class="stat-label">总访问者</span>
                                <span class="stat-value" id="total-visitors">-</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-label">页面浏览量</span>
                                <span class="stat-value" id="total-pageviews">-</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-label">今日访问</span>
                                <span class="stat-value" id="today-visitors">-</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-label">最后更新</span>
                                <span class="stat-value" id="last-updated">-</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="data-actions">
                        <h4>🔧 数据操作</h4>
                        <div class="action-buttons">
                            <button class="action-btn export-btn" id="export-data">
                                <i class="fas fa-download"></i>
                                导出数据
                            </button>
                            <button class="action-btn import-btn" id="import-data">
                                <i class="fas fa-upload"></i>
                                导入数据
                            </button>
                            <button class="action-btn refresh-btn" id="refresh-stats">
                                <i class="fas fa-sync-alt"></i>
                                刷新统计
                            </button>
                            <button class="action-btn reset-btn" id="reset-data">
                                <i class="fas fa-trash-alt"></i>
                                重置数据
                            </button>
                        </div>
                    </div>
                    
                    <div class="data-details">
                        <h4>📋 详细信息</h4>
                        <div class="details-content">
                            <div class="detail-section">
                                <h5>访问类型分布</h5>
                                <div id="visitor-types">-</div>
                            </div>
                            <div class="detail-section">
                                <h5>滚动里程碑</h5>
                                <div id="scroll-milestones">-</div>
                            </div>
                            <div class="detail-section">
                                <h5>会话信息</h5>
                                <div id="session-info">-</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="file" id="import-file-input" accept=".json" style="display: none;">
        `;
        
        document.body.appendChild(panel);
        
        // 添加样式
        this.addStyles();
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .data-manager-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(5px);
            }
            
            .data-manager-panel.visible {
                display: flex;
            }
            
            .data-manager-content {
                background: var(--card-bg);
                border-radius: 12px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                border: 1px solid var(--border-color);
            }
            
            .data-manager-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid var(--border-color);
                background: var(--primary-color);
                color: white;
                border-radius: 12px 12px 0 0;
            }
            
            .data-manager-header h3 {
                margin: 0;
                font-size: 1.2rem;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.3s ease;
            }
            
            .close-btn:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            .data-manager-body {
                padding: 20px;
            }
            
            .data-manager-body h4 {
                margin: 0 0 15px 0;
                color: var(--text-color);
                font-size: 1.1rem;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
            }
            
            .stat-card {
                background: var(--bg-color);
                padding: 15px;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .stat-label {
                font-size: 0.9rem;
                color: var(--text-secondary);
                margin-bottom: 8px;
            }
            
            .stat-value {
                font-size: 1.4rem;
                font-weight: bold;
                color: var(--primary-color);
            }
            
            .action-buttons {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 10px;
                margin-bottom: 30px;
            }
            
            .action-btn {
                padding: 12px 16px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.3s ease;
                font-weight: 500;
            }
            
            .export-btn {
                background: var(--success-color, #28a745);
                color: white;
            }
            
            .import-btn {
                background: var(--info-color, #17a2b8);
                color: white;
            }
            
            .refresh-btn {
                background: var(--warning-color, #ffc107);
                color: #212529;
            }
            
            .reset-btn {
                background: var(--danger-color, #dc3545);
                color: white;
            }
            
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            
            .details-content {
                display: grid;
                gap: 20px;
            }
            
            .detail-section {
                background: var(--bg-color);
                padding: 15px;
                border-radius: 8px;
                border: 1px solid var(--border-color);
            }
            
            .detail-section h5 {
                margin: 0 0 10px 0;
                color: var(--text-color);
                font-size: 1rem;
            }
            
            .detail-section div {
                color: var(--text-secondary);
                font-size: 0.9rem;
                line-height: 1.5;
            }
            
            @media (max-width: 768px) {
                .data-manager-content {
                    width: 95%;
                    margin: 10px;
                }
                
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .action-buttons {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    bindEvents() {
        // 关闭按钮
        document.getElementById('close-data-manager').addEventListener('click', () => {
            this.hide();
        });
        
        // 点击背景关闭
        document.getElementById('data-manager-panel').addEventListener('click', (e) => {
            if (e.target.id === 'data-manager-panel') {
                this.hide();
            }
        });
        
        // 导出数据
        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });
        
        // 导入数据
        document.getElementById('import-data').addEventListener('click', () => {
            document.getElementById('import-file-input').click();
        });
        
        // 文件选择
        document.getElementById('import-file-input').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.importData(file);
            }
        });
        
        // 刷新统计
        document.getElementById('refresh-stats').addEventListener('click', () => {
            this.refreshStats();
        });
        
        // 重置数据
        document.getElementById('reset-data').addEventListener('click', () => {
            this.resetData();
        });
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }
    
    show() {
        this.isVisible = true;
        document.getElementById('data-manager-panel').classList.add('visible');
        this.updateDisplay();
        document.body.style.overflow = 'hidden';
    }
    
    hide() {
        this.isVisible = false;
        document.getElementById('data-manager-panel').classList.remove('visible');
        document.body.style.overflow = '';
    }
    
    updateDisplay() {
        if (!window.fileStorage) {
            console.warn('⚠️ 文件存储管理器未就绪');
            return;
        }
        
        const stats = window.fileStorage.getStats();
        const summary = window.fileStorage.getStatsSummary();
        
        // 更新统计概览
        document.getElementById('total-visitors').textContent = stats.totalVisitors.toLocaleString();
        document.getElementById('total-pageviews').textContent = stats.pageViews.toLocaleString();
        document.getElementById('today-visitors').textContent = summary.today.visitors.toLocaleString();
        document.getElementById('last-updated').textContent = new Date(stats.lastUpdated).toLocaleString();
        
        // 更新访问类型分布
        const visitorTypes = Object.entries(stats.visitsByType)
            .map(([type, count]) => `${type}: ${count}`)
            .join(', ') || '暂无数据';
        document.getElementById('visitor-types').textContent = visitorTypes;
        
        // 更新滚动里程碑
        const scrollMilestones = Object.entries(stats.scrollMilestones || {})
            .map(([percentage, count]) => `${percentage}%: ${count}次`)
            .join(', ') || '暂无数据';
        document.getElementById('scroll-milestones').textContent = scrollMilestones;
        
        // 更新会话信息
        const sessionCount = window.fileStorage.cache?.userSessions?.length || 0;
        const avgSessionTime = this.calculateAverageSessionTime();
        document.getElementById('session-info').textContent = `总会话: ${sessionCount}, 平均时长: ${avgSessionTime}`;
    }
    
    calculateAverageSessionTime() {
        if (!window.fileStorage?.cache?.userSessions?.length) {
            return '暂无数据';
        }
        
        const sessions = window.fileStorage.cache.userSessions;
        const totalDuration = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
        const avgDuration = totalDuration / sessions.length;
        
        const minutes = Math.floor(avgDuration / 60000);
        const seconds = Math.floor((avgDuration % 60000) / 1000);
        
        return `${minutes}分${seconds}秒`;
    }
    
    exportData() {
        if (window.fileStorage) {
            const success = window.fileStorage.exportData();
            if (success) {
                this.showNotification('✅ 数据导出成功', 'success');
            } else {
                this.showNotification('❌ 数据导出失败', 'error');
            }
        } else {
            this.showNotification('⚠️ 文件存储管理器未就绪', 'warning');
        }
    }
    
    async importData(file) {
        if (window.fileStorage) {
            const success = await window.fileStorage.importData(file);
            if (success) {
                this.showNotification('✅ 数据导入成功', 'success');
                this.updateDisplay();
                // 刷新页面统计显示
                if (window.statsManager) {
                    window.statsManager.incrementVisitorCount();
                    window.statsManager.updateDisplay();
                }
            } else {
                this.showNotification('❌ 数据导入失败', 'error');
            }
        } else {
            this.showNotification('⚠️ 文件存储管理器未就绪', 'warning');
        }
    }
    
    refreshStats() {
        this.updateDisplay();
        if (window.statsManager) {
            window.statsManager.incrementVisitorCount();
            window.statsManager.updateDisplay();
        }
        this.showNotification('🔄 统计数据已刷新', 'info');
    }
    
    resetData() {
        if (confirm('⚠️ 确定要重置所有统计数据吗？此操作不可撤销！')) {
            if (window.fileStorage) {
                window.fileStorage.createDefaultData();
                window.fileStorage.saveData();
                this.updateDisplay();
                if (window.statsManager) {
                    window.statsManager.incrementVisitorCount();
                    window.statsManager.updateDisplay();
                }
                this.showNotification('🗑️ 数据已重置', 'warning');
            } else {
                this.showNotification('⚠️ 文件存储管理器未就绪', 'warning');
            }
        }
    }
    
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加通知样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // 设置颜色
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#28a745';
                break;
            case 'error':
                notification.style.backgroundColor = '#dc3545';
                break;
            case 'warning':
                notification.style.backgroundColor = '#ffc107';
                notification.style.color = '#212529';
                break;
            default:
                notification.style.backgroundColor = '#17a2b8';
        }
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// 创建全局实例
let dataManagerInstance;

function initializeDataManager() {
    try {
        dataManagerInstance = new DataManager();
        window.dataManager = dataManagerInstance;
        console.log('✅ DataManager 模块初始化成功');
        return dataManagerInstance;
    } catch (error) {
        console.error('❌ DataManager 模块初始化失败:', error);
        return null;
    }
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDataManager);
} else {
    initializeDataManager();
}

// 添加快捷键支持（Ctrl+Shift+D 打开数据管理面板）
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        if (window.dataManager) {
            window.dataManager.show();
        }
    }
});