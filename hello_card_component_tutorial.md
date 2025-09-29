# HelloCard 组件完整开发教程

## 概述
本教程将基于 ProductCard 组件的开发模式，从零开始创建一个简单的 HelloCard 组件，并提供完整的实现和使用指导。

## 1. 项目结构准备

首先创建组件所需的文件结构：

```
your_module/
├── static/
│   └── src/
│       └── js/
│           ├── hello_card/
│           │   ├── hello_card.js
│           │   └── hello_card.xml
│           └── hello_demo/
│               ├── hello_demo.js
│               └── hello_demo.xml
└── views/
    └── hello_demo_views.xml
```

## 2. HelloCard 组件实现

### 2.1 JavaScript 组件定义
**文件**: `static/src/js/hello_card/hello_card.js`

```javascript
/** @odoo-module **/

import { Component } from '@odoo/owl';

export class HelloCard extends Component {
    static template = 'your_module.HelloCard';
    
    static props = {
        // 必需属性
        title: String,
        message: String,
        onClick: Function,
        
        // 可选属性
        isSelected: { type: Boolean, optional: true },
        color: { type: String, optional: true },
        icon: { type: String, optional: true },
        showBadge: { type: Boolean, optional: true },
        badgeText: { type: String, optional: true },
    };

    static defaultProps = {
        isSelected: false,
        color: 'primary',
        icon: 'fa-heart',
        showBadge: false,
        badgeText: 'New',
    };

    /**
     * 获取卡片的CSS类名
     * @returns {string} CSS类名字符串
     */
    get cardClasses() {
        const baseClasses = 'hello-card card cursor-pointer';
        const selectedClass = this.props.isSelected ? 'selected' : '';
        const colorClass = `border-${this.props.color}`;
        
        return `${baseClasses} ${selectedClass} ${colorClass}`.trim();
    }

    /**
     * 获取图标的CSS类名
     * @returns {string} 图标CSS类名
     */
    get iconClasses() {
        return `fa ${this.props.icon} me-2`;
    }

    /**
     * 处理键盘事件
     * @param {KeyboardEvent} event 键盘事件
     */
    onKeyPress(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            this.props.onClick();
        }
    }

    /**
     * 获取徽章的CSS类名
     * @returns {string} 徽章CSS类名
     */
    get badgeClasses() {
        return `badge bg-${this.props.color}`;
    }
}
```

### 2.2 XML 模板定义
**文件**: `static/src/js/hello_card/hello_card.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<templates xml:space="preserve">
    <t t-name="your_module.HelloCard">
        <div
            tabindex="0"
            t-attf-class="{{cardClasses}}"
            t-on-click="props.onClick"
            t-on-keypress="onKeyPress"
            role="button"
            t-attf-aria-label="Hello card: {{props.title}}"
            t-attf-aria-pressed="{{props.isSelected ? 'true' : 'false'}}"
        >
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <i t-attf-class="{{iconClasses}}" aria-hidden="true"/>
                    <h5 class="card-title mb-0" t-out="props.title"/>
                </div>
                <span 
                    t-if="props.showBadge" 
                    t-attf-class="{{badgeClasses}}"
                    t-out="props.badgeText"
                />
            </div>
            <div class="card-body">
                <p class="card-text" t-out="props.message"/>
                <div class="card-footer-info">
                    <small class="text-muted">
                        Click to interact with this card
                    </small>
                </div>
            </div>
        </div>
    </t>
</templates>
```

### 2.3 CSS 样式定义
**文件**: `static/src/scss/hello_card.scss`

```scss
.hello-card {
    transition: all 0.3s ease;
    border-width: 2px;
    max-width: 300px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    
    &.selected {
        background-color: #f8f9fa;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        
        .card-header {
            background-color: rgba(0, 123, 255, 0.1);
        }
    }
    
    .card-header {
        background-color: transparent;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    }
    
    .card-title {
        color: #495057;
        font-weight: 600;
    }
    
    .card-text {
        color: #6c757d;
        margin-bottom: 1rem;
    }
    
    .card-footer-info {
        border-top: 1px solid rgba(0, 0, 0, 0.125);
        padding-top: 0.5rem;
        margin-top: 0.5rem;
    }
}
```

## 3. 演示组件实现

### 3.1 HelloDemo 组件
**文件**: `static/src/js/hello_demo/hello_demo.js`

```javascript
/** @odoo-module **/

import { Component, useState } from '@odoo/owl';
import { HelloCard } from '../hello_card/hello_card';

export class HelloDemo extends Component {
    static template = 'your_module.HelloDemo';
    static components = { HelloCard };

    setup() {
        this.state = useState({
            selectedCardId: null,
            clickCount: 0,
            cards: [
                {
                    id: 1,
                    title: 'Hello World',
                    message: 'This is my first HelloCard component!',
                    color: 'primary',
                    icon: 'fa-globe',
                    showBadge: true,
                    badgeText: 'New'
                },
                {
                    id: 2,
                    title: 'Welcome',
                    message: 'Welcome to Odoo component development.',
                    color: 'success',
                    icon: 'fa-check-circle',
                    showBadge: false,
                },
                {
                    id: 3,
                    title: 'Learning',
                    message: 'Learning OWL framework is fun and easy!',
                    color: 'info',
                    icon: 'fa-graduation-cap',
                    showBadge: true,
                    badgeText: 'Hot'
                },
                {
                    id: 4,
                    title: 'Development',
                    message: 'Building reusable components in Odoo.',
                    color: 'warning',
                    icon: 'fa-code',
                    showBadge: false,
                }
            ]
        });
    }

    /**
     * 处理卡片点击事件
     * @param {Object} card 被点击的卡片对象
     */
    onCardClick(card) {
        this.state.selectedCardId = card.id;
        this.state.clickCount++;
        
        // 显示通知或执行其他操作
        console.log(`Card "${card.title}" clicked! Total clicks: ${this.state.clickCount}`);
        
        // 可以添加更多交互逻辑
        this.showNotification(card);
    }

    /**
     * 显示通知消息
     * @param {Object} card 卡片对象
     */
    showNotification(card) {
        // 这里可以集成 Odoo 的通知系统
        // 或者使用简单的 alert 作为演示
        alert(`You clicked on "${card.title}"!\nMessage: ${card.message}`);
    }

    /**
     * 重置选择状态
     */
    resetSelection() {
        this.state.selectedCardId = null;
        this.state.clickCount = 0;
    }

    /**
     * 检查卡片是否被选中
     * @param {Object} card 卡片对象
     * @returns {boolean} 是否选中
     */
    isCardSelected(card) {
        return this.state.selectedCardId === card.id;
    }

    /**
     * 获取统计信息
     * @returns {string} 统计文本
     */
    get statsText() {
        const selectedCard = this.state.cards.find(card => card.id === this.state.selectedCardId);
        const selectedText = selectedCard ? `Selected: ${selectedCard.title}` : 'No selection';
        return `${selectedText} | Total clicks: ${this.state.clickCount}`;
    }
}
```

### 3.2 HelloDemo 模板
**文件**: `static/src/js/hello_demo/hello_demo.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<templates xml:space="preserve">
    <t t-name="your_module.HelloDemo">
        <div class="hello-demo-container p-4">
            <div class="demo-header mb-4">
                <h2 class="mb-3">HelloCard Component Demo</h2>
                <p class="text-muted">
                    This demo shows how to use the HelloCard component with different configurations.
                </p>
                
                <div class="demo-stats alert alert-info">
                    <i class="fa fa-info-circle me-2"/>
                    <span t-out="statsText"/>
                </div>
                
                <button 
                    class="btn btn-secondary mb-3" 
                    t-on-click="resetSelection"
                    type="button"
                >
                    <i class="fa fa-refresh me-1"/>
                    Reset Selection
                </button>
            </div>
            
            <div class="demo-content">
                <div class="row g-3">
                    <div 
                        t-foreach="state.cards" 
                        t-as="card" 
                        t-key="card.id"
                        class="col-12 col-md-6 col-lg-4"
                    >
                        <HelloCard
                            title="card.title"
                            message="card.message"
                            color="card.color"
                            icon="card.icon"
                            showBadge="card.showBadge"
                            badgeText="card.badgeText"
                            isSelected="isCardSelected(card)"
                            onClick="() => this.onCardClick(card)"
                        />
                    </div>
                </div>
            </div>
            
            <div class="demo-footer mt-4">
                <div class="alert alert-light">
                    <h5>Usage Instructions:</h5>
                    <ul class="mb-0">
                        <li>Click on any card to select it</li>
                        <li>Use Tab key to navigate between cards</li>
                        <li>Press Space or Enter to activate focused card</li>
                        <li>Click "Reset Selection" to clear the selection</li>
                    </ul>
                </div>
            </div>
        </div>
    </t>
</templates>
```

## 4. Odoo 视图集成

### 4.1 创建菜单和动作
**文件**: `views/hello_demo_views.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- 客户端动作定义 -->
    <record id="action_hello_demo" model="ir.actions.client">
        <field name="name">Hello Card Demo</field>
        <field name="tag">hello_demo_action</field>
    </record>

    <!-- 菜单项定义 -->
    <menuitem 
        id="menu_hello_demo_root"
        name="Hello Demo"
        sequence="100">
        
        <menuitem 
            id="menu_hello_demo"
            name="Card Demo"
            action="action_hello_demo"
            sequence="10"/>
    </menuitem>
</odoo>
```

### 4.2 注册客户端动作
**文件**: `static/src/js/hello_demo_action.js`

```javascript
/** @odoo-module **/

import { registry } from '@web/core/registry';
import { HelloDemo } from './hello_demo/hello_demo';

// 注册客户端动作
registry.category('actions').add('hello_demo_action', HelloDemo);
```

## 5. 模块配置

### 5.1 __manifest__.py 配置
```python
{
    'name': 'Hello Card Demo',
    'version': '18.0.1.0.0',
    'category': 'Tools',
    'summary': 'HelloCard Component Demo',
    'description': """
        A simple demo module showing how to create and use
        a custom HelloCard component in Odoo 18.
    """,
    'depends': ['web'],
    'data': [
        'views/hello_demo_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'your_module/static/src/js/hello_card/hello_card.js',
            'your_module/static/src/js/hello_card/hello_card.xml',
            'your_module/static/src/js/hello_demo/hello_demo.js',
            'your_module/static/src/js/hello_demo/hello_demo.xml',
            'your_module/static/src/js/hello_demo_action.js',
            'your_module/static/src/scss/hello_card.scss',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}
```

## 6. 安装和测试步骤

### 6.1 安装模块
```bash
# 1. 将模块文件放置到 addons 目录
# 2. 更新应用列表
./odoo-bin -u your_module -d your_database

# 或者通过界面安装
# Apps -> Update Apps List -> 搜索 "Hello Card Demo" -> Install
```

### 6.2 访问演示
1. 登录 Odoo 后台
2. 在主菜单中找到 "Hello Demo"
3. 点击 "Card Demo" 子菜单
4. 查看和交互 HelloCard 组件

## 7. 扩展和自定义

### 7.1 添加动画效果
```javascript
// 在 HelloCard 组件中添加
onCardEnter() {
    // 卡片进入动画
    this.el.style.opacity = '0';
    this.el.style.transform = 'scale(0.8)';
    
    requestAnimationFrame(() => {
        this.el.style.transition = 'all 0.3s ease';
        this.el.style.opacity = '1';
        this.el.style.transform = 'scale(1)';
    });
}
```

### 7.2 添加更多交互
```javascript
// 扩展 HelloCard 组件
static props = {
    ...HelloCard.props,
    onDoubleClick: { type: Function, optional: true },
    onRightClick: { type: Function, optional: true },
};

onDoubleClick(event) {
    if (this.props.onDoubleClick) {
        this.props.onDoubleClick(event);
    }
}

onContextMenu(event) {
    event.preventDefault();
    if (this.props.onRightClick) {
        this.props.onRightClick(event);
    }
}
```

### 7.3 添加数据绑定
```javascript
// 连接到 Odoo 模型
import { useService } from '@web/core/utils/hooks';

setup() {
    super.setup();
    this.orm = useService('orm');
    this.loadData();
}

async loadData() {
    const records = await this.orm.searchRead(
        'your.model',
        [],
        ['name', 'description', 'color']
    );
    
    this.state.cards = records.map(record => ({
        id: record.id,
        title: record.name,
        message: record.description,
        color: record.color || 'primary',
    }));
}
```

## 8. 调试和故障排除

### 8.1 常见问题

**问题**: 组件不显示
```javascript
// 检查模板注册
console.log('Template registered:', this.constructor.template);

// 检查组件注册
import { HelloCard } from './hello_card/hello_card';
console.log('Component loaded:', HelloCard);
```

**问题**: 样式不生效
```xml
<!-- 确保 CSS 文件在 manifest 中正确引用 -->
'web.assets_backend': [
    'your_module/static/src/scss/hello_card.scss',
],
```

**问题**: 事件不触发
```javascript
// 检查事件绑定
t-on-click="props.onClick"  // 正确
t-on-click="onClick"        // 错误，缺少 props
```

### 8.2 开发工具
```javascript
// 添加调试信息
setup() {
    super.setup();
    if (odoo.debug) {
        console.log('HelloCard props:', this.props);
        console.log('HelloCard state:', this.state);
    }
}
```

## 9. 最佳实践总结

1. **组件设计**
   - 保持组件简单和专注
   - 使用清晰的 props 接口
   - 提供合理的默认值

2. **性能优化**
   - 避免不必要的重新渲染
   - 使用 memo 优化纯组件
   - 合理使用事件委托

3. **可访问性**
   - 添加适当的 ARIA 属性
   - 支持键盘导航
   - 提供语义化的 HTML 结构

4. **测试**
   - 编写单元测试
   - 测试不同的 props 组合
   - 验证事件处理逻辑

这个完整的 HelloCard 组件教程展示了从基础实现到高级功能的完整开发流程，可以作为学习 Odoo 组件开发的起点。