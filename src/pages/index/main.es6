"use strict";

/**
 * @require libs/normalize-css/normalize.css
 * @require libs/font-awesome/css/font-awesome.css
 */

import route from './route';

/**
 * Vue Setting
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import layout from './pages/common/layout';

Vue.config.delimiters = ['{%', '%}']
Vue.config.debug = true

Vue.use(require('vue-animated-list'))


Vue.use(VueRouter)
var router = new VueRouter()
router.map(route)

//路由跳转前的全局钩子
router.beforeEach(transition => transition.next())
//路由跳转后的全局钩子
router.afterEach(() => window.scrollTo(0, 0))

var App = Vue.extend({
    components:{layout}
})
router.start(App, "#app")