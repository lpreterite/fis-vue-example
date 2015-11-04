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
                users: $.fetch(config.api() + 'users.php?mode=has')
            }
        }
    }
}