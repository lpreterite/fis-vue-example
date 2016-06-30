"use strict";

var Vue = require('config/config.vue'),
    VueRouter = require('vue-router')

Vue.use(VueRouter)
var router = new VueRouter()

//路由设定
router.map({
    "/":{
        name: "index",
        component: function(resolve){
            require(['views/task/list'], resolve)
        }
    },
    "/:id":{
        name: "detail",
        component: function(resolve){require(['views/task/detail'], resolve)}
    },
    //以上路由都不匹配时显示
    '*': {
        component: function(resolve){require(['views/common/empty'], resolve)}
    }
})

//路由跳转前的全局钩子
router.beforeEach(function(transition){
    transition.next()
})

//路由跳转后的全局钩子
router.afterEach(function(){
    window.scrollTo(0, 0)
})

module.exports = router