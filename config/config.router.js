"use strict";

require('config/config.vue')

var VueRouter = require('vue-router'),
    router = new VueRouter(),
    permission = require('config/config.authority')

//路由设定
router.map({
    '/account': {
        component: {
            template: __inline('views/common/layout.tpl'),
        },
        subRoutes: { //子路由
            '/user': {
                component: require('views/account/users/user.view')
            }
        }
    },
    '/account/signin':{
        component: require('views/account/signin/signin'),
        auth: false //是否需要权限验证依凭，默认是true
    },
    '/account/signout':{
        component: require('views/account/signout/signout'),
        auth: false
    },
    '/': {
        component: {
            template: '<h1>index</h1><div><a v-link="\'/account/signin\'">登录</a> <a v-link="\'/account/user\'">用户列表</a></div>'
        },
        auth: false
    },
    //以上路由都不匹配时显示
    '*': {
        component: require('views/common/notfound/notfound')
    }
})

//路由跳转前的全局钩子
router.beforeEach(function(transition){
    if(typeof transition.to.auth != "undefined" || transition.to.auth === false){
        transition.next()
    }else{
        if(permission.auth('signin')) transition.next()
        else transition.abort()
    }
})

//路由跳转后的全局钩子
router.afterEach(function(){
    window.scrollTo(0, 0)
})

module.exports = router