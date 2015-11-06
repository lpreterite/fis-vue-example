#fis-vue-example
基于fis构建的vuejs事例（包含vue-router的使用）

> 目前使用vue的0.12版本

##vue-router使用经验分享
###router的生命周期

```
module.exports = {
    template: __inline('user.view.tpl'),
    data: function(){...},
    route: {                            //注册vue-router后，每个组件都有route模块
        data: function(){...},          //用于加载数据，可选择性返回一个Promise
        activate: function(){...},      //在激活阶段，当组件被创建而且将要切入的时候被调用
        deactivate: function(){...},    //在激活阶段，当一个组件将要被禁用和移除之时被调用。
        canActivate: function(){...},   //在验证阶段，当一个组件将要被切入的时候被调用
        canDeactivate: function(){...}, //在验证阶段，当一个组件将要被切出的时候被调用。
        canReuse: true                  //决定组件是否可以被重用。可重用时任然会进入data钩子，不可重用时从新经历验证和激活阶段。
    },
    methods: {...}
}

//全局钩子可设置多个，按设置顺序执行。
//全局的前置钩子，路由切换开始时调用，如果此钩子函数拒绝了切换，整个切换流水线根本就不会启动。
router.beforeEach(function (transition) {...})
//全局的后置钩子，该函数会在每次路由切换成功进入激活阶段时被调用。在这个后置钩子函数里不能调用任何切换函数。
router.afterEach(function (transition) {...})
```

###路由钩子使用说明

1. 所有钩子都有一个transition传入对象。
2. 在canActivate和canDeactivate钩子必须使用transition.next()让组件进入渲染阶段，当使用transition.abort()否决时会回退到前一个路由状态。
3. transition.to和transition.from都是一个[路由对象](#_2)。
4. canReuse钩子中只能访问transition.to 和 transition.from。

```
route: {
    data: function(transition){
        var userId = transition.to.params.userId
        return {
          user: userService.get(userId),
          post: postsService.getForUser(userId)
        }
    }
    
    //ES6 语法
    data: ({ to: { params: { userId }}}) => ({
        user: userService.get(userId),
        post: postsService.getForUser(userId)
    })
}
```

###路由对象
在使用了 vue-router 的应用中，路由对象会被注入每个组件中，赋值为 this.$route ，并且当路由切换时，路由对象会被更新。

```
module.exports = {
    ...
    data: function(){
        var path = this.$route.path // "/account/signin"
        var params = this.$route.params //包含所有动态片段，详细看下文
        var query = this.$route.query // 无视它用params
        var matched = this.$route.matched // 无视它用params

        this.$route.router //路由本身
    }
    ...
}

```

####动态片段说明
当路由是'/user/:username'时，可这样`this.$router.params.username`获得username，
当路径包含 '?uid=2'时，也可以`this.$router.params.uid`获得uid

####自定义字段
```
router.map({
  '/a': {
    component: { ... },
    auth: true // 这里 auth 是一个自定义字段
  }
})

router.beforeEach(function (transition) {
  if (transition.to.auth) {
    // 对用户身份进行验证...
  }
})
```

###v-link
```
<!-- 字面量路径 -->
<a v-link="'home'">Home</a>
<!-- 传参数 -->
<a v-link="'account/user?uid=' + user.id">User detail</a>

<!-- 效果同上 -->
<a v-link="{ path: 'home' }">Home</a>

<!-- 具名路径 -->
<a v-link="{ name: 'user', params: { userId: 123 }}">User</a>

<!-- 跳转不留下历史记录 -->
<a v-link="{ path: '/abc', replace: true }"></a>
```


##例子使用说明

```
//安装支持
$ npm install

//fis构建
$ fis3 release -w -d ../fis-vue-example-release

```

##参考文档

[vue-router文档](http://vuejs.github.io/vue-router/zh-cn/index.html)
[vue v0.12文档](http://cn.vuejs.org/)