var $ = require('jquery'),
    config = require('config/config')

module.exports = {
    template: __inline('user.item.tpl'),
    data: function(){
        return {
            user: {
                "id": -1,
                "name": '',
                "sex": '',
                "is_display": 1,
                "tags": []
            },
            tags:[]
        }
    },
    route: {
        data: function(){
            return {
                user: $.fetch(config.api() + 'user.php'), //返回必须是一个Promise对象
                tags: $.fetch(config.api() + 'tags.php')
            }
        }
    },
    methods: {
        submit: function(e){
            e.preventDefault()

            alert('更新成功')
        }
    },
    components: {
        "selection": require('components/selection/selection')
    }
}