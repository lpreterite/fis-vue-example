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
            return $.getJSON(config.api() + 'users.php?mode=has')
                    .then(this.onSuccess)
                    .fail(this.onError)
        }
    },
    methods: {
        onSuccess: function(data){
            return {users: data}
        },
        onError: function(e){
            return {users: []}
        }
    }
}