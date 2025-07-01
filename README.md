# 个人静态网站

一个现代化的个人静态网站，采用纯前端技术栈构建，注重性能、可访问性和用户体验。

## ✨ 特性

- 🎨 **现代设计**: 简洁优雅的界面设计，支持深色/浅色主题切换
- 🌍 **多语言支持**: 中文/英文双语切换
- 📱 **响应式设计**: 完美适配桌面端、平板和移动设备
- ♿ **无障碍访问**: 遵循WCAG 2.1 AA标准，支持键盘导航和屏幕阅读器
- ⚡ **性能优化**: 快速加载，优秀的Core Web Vitals指标
- 🔧 **零依赖**: 纯原生JavaScript，无框架依赖
- 📊 **统计功能**: 网站运行时间和访问统计
- 🎭 **动画效果**: 流畅的CSS动画和交互效果

## 🚀 快速开始

### 环境要求

- 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+, Edge 90+）
- 本地Web服务器（推荐使用Live Server或类似工具）

### 安装和运行

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd my-website
   ```

2. **启动本地服务器**
   
   使用VS Code Live Server插件：
   - 安装Live Server扩展
   - 右键点击`index.html`
   - 选择"Open with Live Server"
   
   或使用Python内置服务器：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   或使用Node.js http-server：
   ```bash
   npx http-server -p 8000
   ```

3. **访问网站**
   
   打开浏览器访问 `http://localhost:8000`

## 📁 项目结构

```
my-website/
├── index.html              # 主页面
├── css/                    # 样式文件
│   ├── main.css           # 主样式文件
│   ├── themes.css         # 主题样式
│   └── animations.css     # 动画样式
├── js/                     # JavaScript文件
│   ├── main.js            # 主应用入口
│   ├── i18n.js            # 国际化模块
│   ├── theme.js           # 主题管理
│   └── stats.js           # 统计功能
├── i18n/                   # 多语言资源
│   ├── zh-CN.json         # 中文语言包
│   └── en.json            # 英文语言包
├── assets/                 # 静态资源
│   ├── images/            # 图片资源
│   ├── icons/             # 图标文件
│   └── fonts/             # 字体文件
├── .trae/                  # 项目配置
│   └── rules/             # 项目规则
└── README.md              # 项目说明
```

## 🎯 核心功能

### 主题系统

网站支持深色和浅色两种主题模式：

- **自动检测**: 根据系统偏好自动选择主题
- **手动切换**: 点击主题切换按钮或使用快捷键 `Ctrl/Cmd + Shift + T`
- **持久化**: 用户选择会保存在本地存储中
- **无障碍**: 支持高对比度模式和减少动画偏好

### 国际化

支持中文和英文两种语言：

- **自动检测**: 根据浏览器语言偏好自动选择
- **手动切换**: 点击语言切换按钮
- **动态加载**: 语言资源按需加载
- **格式化**: 支持数字和日期的本地化格式

### 统计功能

实时显示网站统计信息：

- **运行时间**: 网站上线以来的运行时间
- **访问统计**: 访问者数量和页面浏览量
- **性能监控**: Core Web Vitals指标
- **用户行为**: 滚动深度和会话时长

### 响应式设计

采用移动优先的设计策略：

- **断点设置**: 
  - 移动端: < 768px
  - 平板: 768px - 1024px
  - 桌面端: > 1024px
- **弹性布局**: 使用CSS Grid和Flexbox
- **自适应图片**: 根据设备分辨率加载合适尺寸的图片

## 🛠️ 自定义配置

### 修改个人信息

编辑语言文件来更新个人信息：

**中文** (`i18n/zh-CN.json`):
```json
{
  "hero": {
    "name": "你的姓名",
    "title": "你的职位",
    "description": "你的个人介绍"
  }
}
```

**英文** (`i18n/en.json`):
```json
{
  "hero": {
    "name": "Your Name",
    "title": "Your Title",
    "description": "Your Description"
  }
}
```

### 修改主题颜色

在 `css/themes.css` 中修改CSS自定义属性：

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* 其他颜色变量 */
}
```

### 添加新的卡片

在 `index.html` 中的卡片区域添加新卡片：

```html
<div class="card" data-animation="fadeIn">
  <div class="card-icon">
    <i class="fas fa-your-icon"></i>
  </div>
  <h3 data-i18n="cards.yourCard.title">卡片标题</h3>
  <p data-i18n="cards.yourCard.description">卡片描述</p>
  <a href="#" class="card-link" data-i18n="cards.yourCard.link">查看更多</a>
</div>
```

然后在语言文件中添加对应的翻译。

### 修改统计起始时间

在 `js/stats.js` 中修改网站启动日期：

```javascript
this.startDate = new Date('2025-01-21T00:00:00Z'); // 修改为你的网站上线日期
```

## 🎨 样式指南

### CSS架构

项目采用模块化的CSS架构：

- **main.css**: 基础样式、布局、组件
- **themes.css**: 主题相关的颜色和样式
- **animations.css**: 动画效果和过渡

### 命名规范

使用BEM (Block Element Modifier) 命名方法论：

```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }

/* Modifier */
.card--featured { }
.card--large { }
```

### 响应式断点

```css
/* 移动端优先 */
.component { }

/* 平板 */
@media (min-width: 768px) {
  .component { }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .component { }
}

/* 大屏幕 */
@media (min-width: 1200px) {
  .component { }
}
```

## 🔧 开发指南

### 代码规范

- **HTML**: 使用语义化标签，确保无障碍访问，并确保所有图片包含 `alt` 属性。
- **CSS**: 遵循BEM命名，使用CSS自定义属性，并避免使用 `!important` 除非绝对必要，以提高样式可维护性。
- **JavaScript**: 使用ES6+语法，模块化设计，确保函数职责单一，并添加清晰的注释和JSDoc。
- **一致性**: 建议使用 ESLint 和 Prettier 等工具来强制执行代码风格和格式化，确保团队协作时代码风格的一致性。

### 性能优化

- **图片优化**: 使用WebP/AVIF格式，启用懒加载，并根据设备分辨率提供不同尺寸的图片。
- **关键渲染路径**: 优化CSS和JavaScript的加载顺序，确保关键资源优先加载，非关键资源延迟加载。
- **代码分割**: 按需加载JavaScript模块，减少初始加载文件大小。
- **缓存策略**: 合理设置缓存头，并考虑使用Service Worker实现更强大的离线缓存能力。
- **压缩**: 压缩HTML、CSS、JavaScript文件，并启用Gzip/Brotli压缩。
- **CDN**: 对于外部资源（如Font Awesome、Bootstrap），确保使用中国区可用的CDN，以提高加载速度和稳定性。

### 无障碍性

- **键盘导航**: 确保所有交互元素（按钮、链接、表单控件等）均可通过键盘完全访问和操作。
- **屏幕阅读器**: 使用适当的ARIA属性（`aria-label`, `aria-describedby`, `role`等）来增强语义，确保屏幕阅读器能正确解析页面内容。
- **颜色对比**: 确保文本与背景之间有足够的颜色对比度（至少4.5:1），以满足WCAG 2.1 AA标准。
- **焦点管理**: 提供清晰的焦点指示（如 `:focus` 样式），帮助用户了解当前焦点位置。
- **语义化HTML**: 优先使用语义化的HTML标签，而不是依赖CSS或JavaScript来模拟元素行为。

## 📊 性能指标

### Core Web Vitals目标

- **LCP (Largest Contentful Paint)**: < 2.5秒
- **FID (First Input Delay)**: < 100毫秒
- **CLS (Cumulative Layout Shift)**: < 0.1

### 其他性能指标

- **FCP (First Contentful Paint)**: < 1.8秒
- **TTI (Time to Interactive)**: < 3.8秒
- **页面大小**: < 1MB（初始加载）

### 性能监控

使用以下工具监控性能：

- **Lighthouse**: 综合性能审计
- **WebPageTest**: 详细的性能分析
- **Chrome DevTools**: 实时性能监控

## 🧪 测试

### 浏览器兼容性测试

在以下浏览器中测试：

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 功能测试清单

- [ ] 主题切换功能
- [ ] 语言切换功能
- [ ] 响应式布局
- [ ] 键盘导航
- [ ] 屏幕阅读器兼容性
- [ ] 性能指标达标
- [ ] 移动端体验

### 单元测试 (Unit Testing)

- 考虑为核心JavaScript模块（如 `theme.js`, `i18n.js`, `stats.js`）编写单元测试，确保其独立功能的正确性。
- 可以使用 Jest 或 Mocha 等测试框架。

### 端到端测试 (End-to-End Testing)

- 对于关键用户流程（如主题切换、语言切换、导航），可以考虑使用 Cypress 或 Playwright 进行端到端测试，模拟用户行为，确保整个应用的正常运行。

### 无障碍性测试

使用以下工具进行无障碍性测试：

- **axe DevTools**: 自动化无障碍测试
- **WAVE**: Web无障碍评估工具
- **Lighthouse**: 无障碍性审计

## 🚀 部署

### 静态托管平台

推荐的部署平台：

- **Netlify**: 自动部署，支持表单处理
- **Vercel**: 快速部署，优秀的性能
- **GitHub Pages**: 免费托管，与GitHub集成
- **Cloudflare Pages**: 全球CDN，快速访问

### 部署步骤

1. **构建优化**
   ```bash
   # 压缩图片
   # 压缩CSS和JavaScript
   # 生成sitemap
   ```

2. **上传文件**
   - 将所有文件上传到托管平台
   - 配置自定义域名（可选）
   - 设置HTTPS

3. **配置缓存**
   ```
   # 静态资源缓存1年
   Cache-Control: public, max-age=31536000
   
   # HTML文件不缓存
   Cache-Control: no-cache
   ```

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

### 贡献指南

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

### 代码审查

所有Pull Request都需要通过以下检查：

- 代码符合项目规范
- 功能测试通过
- 性能指标达标
- 无障碍性测试通过
- **安全性审查**: 检查是否存在潜在的安全漏洞，如XSS、CSRF等，并确保所有外部依赖项都是安全的。

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔒 安全性

- **内容安全策略 (CSP)**: 考虑为网站配置严格的CSP，限制可加载的资源来源，有效防范跨站脚本 (XSS) 攻击。
- **输入验证与转义**: 对所有用户输入进行严格的验证和适当的转义，避免注入攻击。
- **依赖项安全**: 定期检查项目依赖项（如通过CDN引入的库）是否存在已知漏洞，并及时更新。
- **HTTPS**: 确保网站通过HTTPS提供服务，保护数据传输的完整性和机密性。

## 🙏 致谢

- [Font Awesome](https://fontawesome.com/) - 图标库
- [Google Fonts](https://fonts.google.com/) - 字体服务
- [MDN Web Docs](https://developer.mozilla.org/) - 技术文档
- [web.dev](https://web.dev/) - 性能指南

## 📞 联系方式

如果你有任何问题或建议，请通过以下方式联系：

- 邮箱: your-email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- 网站: [your-website.com](https://your-website.com)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！