module.exports = {
    "/":{
        name: "index",
        component: require('./pages/task/list')
        // component: function(resolve){require(['./pages/task/list'], resolve)}
    },
    "/:id":{
        name: "detail",
        component: require('./pages/task/detail')
        // component: function(resolve){require(['./pages/task/detail'], resolve)}
    },
    //以上路由都不匹配时显示
    '*': {
        component: function(resolve){require(['./pages/common/empty/empty'], resolve)}
    }
}