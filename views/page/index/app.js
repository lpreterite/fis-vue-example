var Vue = require('vue'),
    router = require('config/config.router')

var App = Vue.extend({
    components:{
        layout: require('views/template/common/layout/layout')
    }
})
router.start(App, "#app")