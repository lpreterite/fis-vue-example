"use strict";

/**
 * @require libs/normalize-css/normalize.css
 * @require libs/font-awesome/css/font-awesome.css
 */

var route = require('./route')

/**
 * Vue Setting
 */
var Vue = require('vue'),
    VueRouter = require('vue-router')

Vue.config.delimiters = ['{%', '%}']
Vue.config.debug = true

Vue.use(require('vue-animated-list'))


Vue.use(VueRouter)
var router = new VueRouter()

router.map(route)

//路由跳转前的全局钩子
router.beforeEach(function(transition){
    transition.next()
})

//路由跳转后的全局钩子
router.afterEach(function(){
    window.scrollTo(0, 0)
})

var App = Vue.extend({
    components:{
        layout: require('./pages/common/layout/layout')
    }
})
router.start(App, "#app")