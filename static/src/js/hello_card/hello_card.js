/** @odoo-module **/

import { Component } from '@odoo/owl';

export class HelloCard extends Component {
    static template = 'hello_card.HelloCard';
    
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