/** @odoo-module **/

import { registry } from '@web/core/registry';
import { HelloDemo } from './hello_demo/hello_demo';

// 注册客户端动作
registry.category('actions').add('hello_demo_action', HelloDemo);