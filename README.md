# Hello Card Demo Module

## 概述
Hello Card 是一个演示模块，展示如何在 Odoo 18 中创建自定义 OWL 组件。

## 功能特性
- 🎯 自定义 HelloCard OWL 组件
- ✨ 交互式演示界面
- 📱 响应式设计 (Bootstrap 5)
- ♿ 完整的键盘导航支持
- 🎨 多种卡片配置选项
- 🌙 深色模式支持

## 安装步骤

### 1. 复制模块文件
将整个 `hello_card` 文件夹复制到您的 Odoo addons 目录中：
```bash
cp -r hello_card /path/to/your/odoo/addons/
```

### 2. 更新应用列表
在 Odoo 后台：
1. 进入 **Apps** 菜单
2. 点击 **Update Apps List**
3. 搜索 "Hello Card Demo"
4. 点击 **Install**

### 3. 访问演示
安装完成后：
1. 在主菜单中找到 **Hello Demo**
2. 点击 **Card Demo** 子菜单
3. 开始体验 HelloCard 组件

## 文件结构
```
hello_card/
├── __init__.py                           # 模块初始化
├── __manifest__.py                       # 模块清单
├── README.md                            # 说明文档
├── static/
│   ├── description/
│   │   └── index.html                   # 模块描述页面
│   └── src/
│       ├── js/
│       │   ├── hello_card/
│       │   │   ├── hello_card.js        # HelloCard 组件
│       │   │   └── hello_card.xml       # HelloCard 模板
│       │   ├── hello_demo/
│       │   │   ├── hello_demo.js        # 演示组件
│       │   │   └── hello_demo.xml       # 演示模板
│       │   └── hello_demo_action.js     # 客户端动作注册
│       └── scss/
│           └── hello_card.scss          # 样式文件
└── views/
    └── hello_demo_views.xml             # 菜单和动作定义
```

## 组件使用示例

### 基本用法
```javascript
import { HelloCard } from '@hello_card/js/hello_card/hello_card';

// 在您的组件中
static components = { HelloCard };

// 在模板中使用
<HelloCard
    title="'我的卡片'"
    message="'这是一个示例消息'"
    onClick="() => this.handleClick()"
/>
```

### 高级配置
```javascript
<HelloCard
    title="'高级卡片'"
    message="'带有更多配置选项的卡片'"
    color="'success'"
    icon="'fa-star'"
    showBadge="true"
    badgeText="'热门'"
    isSelected="state.selectedId === card.id"
    onClick="() => this.selectCard(card)"
/>
```

## 属性说明

| 属性名 | 类型 | 必需 | 默认值 | 描述 |
|--------|------|------|--------|------|
| title | String | ✅ | - | 卡片标题 |
| message | String | ✅ | - | 卡片消息内容 |
| onClick | Function | ✅ | - | 点击事件处理函数 |
| isSelected | Boolean | ❌ | false | 是否选中状态 |
| color | String | ❌ | 'primary' | 卡片颜色主题 |
| icon | String | ❌ | 'fa-heart' | FontAwesome 图标类名 |
| showBadge | Boolean | ❌ | false | 是否显示徽章 |
| badgeText | String | ❌ | 'New' | 徽章文本内容 |

## 支持的颜色主题
- `primary` (蓝色)
- `secondary` (灰色)
- `success` (绿色)
- `danger` (红色)
- `warning` (黄色)
- `info` (青色)

## 开发说明

### 扩展组件
您可以通过继承 HelloCard 来创建自定义版本：

```javascript
import { HelloCard } from '@hello_card/js/hello_card/hello_card';

export class MyCustomCard extends HelloCard {
    static template = 'my_module.CustomCard';
    
    static props = {
        ...HelloCard.props,
        customProp: { type: String, optional: true },
    };
    
    // 添加自定义方法
    myCustomMethod() {
        // 自定义逻辑
    }
}
```

### 样式自定义
您可以通过 CSS 覆盖默认样式：

```scss
.hello-card {
    // 自定义样式
    border-radius: 15px;
    
    &.my-custom-theme {
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    }
}
```

## 故障排除

### 常见问题

**问题**: 模块安装后菜单不显示
- **解决**: 检查用户权限，确保有访问权限

**问题**: 组件样式不正确
- **解决**: 清除浏览器缓存，重启 Odoo 服务

**问题**: JavaScript 错误
- **解决**: 检查浏览器控制台，确保所有依赖正确加载

### 调试模式
启用 Odoo 调试模式以获得更多信息：
```
?debug=1
```

## 技术要求
- Odoo 18.0+
- 现代浏览器 (Chrome 90+, Firefox 88+, Safari 14+)
- JavaScript ES6+ 支持

## 许可证
LGPL-3

## 贡献
欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- 初始版本发布
- HelloCard 组件实现
- 交互式演示界面
- 响应式设计支持
- 键盘导航功能