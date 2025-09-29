/** @odoo-module **/

import { Component, useState } from '@odoo/owl';
import { HelloCard } from '../hello_card/hello_card';

export class HelloDemo extends Component {
    static template = 'hello_card.HelloDemo';
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