/** @odoo-module **/

import { registry } from '@web/core/registry';
import { HelloDemo } from './hello_demo/hello_demo';

// 注册客户端动作 说明：第一个参数是动作的唯一标识符，第二个参数是动作组件
registry.category('actions').add('hello_demo_action', HelloDemo);