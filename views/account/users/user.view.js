var config = require('config/config')

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
        del: function(user){
            //本地删除
            this.users.$remove(user)
            //调用后端删除接口
            //$.del(config.api() + 'users_del.php', user.id)
            //获得新数据
            //this.users = $.fetch(config.api() + 'users.php?mode=has')
        }
    }
}