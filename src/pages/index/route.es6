export default {
    "/":{
        name: "index",
        component: require('./pages/task/list')
        //异步
        // component: resolve => require(['./pages/task/list'], resolve)
    },
    "/:id":{
        name: "detail",
        component: require('./pages/task/detail')
        //异步
        // component: resolve => require(['./pages/task/detail'], resolve)
    },
    //以上路由都不匹配时显示
    '*': {
        component: resolve => require(['./pages/common/empty'], resolve)
    }
}