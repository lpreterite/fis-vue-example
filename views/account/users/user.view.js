var $ = require('jquery'),
    config = require('config/config')

module.exports = {
    template: __inline('user.view.tpl'),
    data: function(){
        return {
            users:[]
        }
    },
    route: {
        data: function(){
            return {
                users: $.fetch(config.api() + 'users.php?mode=has') //返回必须是一个Promise对象
            }
        }
    },
    methods: {
        display: function(user){
            user.is_display = user.is_display == 1 ? 0 : 1
            //调用后端修改接口
            //$.save(config.api() + 'users_update.php', user)
        },
        del: function(id){
            //本地删除
            var result = []
            for (var i = 0; i < this.$data.users.length; i++) {
                if(this.$data.users[i].id == id) continue
                result.push(this.$data.users[i])
            };
            this.users = result
            //调用后端删除接口
            //$.del(config.api() + 'users_del.php', id)
            //获得新数据
            //this.users = $.fetch(config.api() + 'users.php?mode=has')
        }
    }
}