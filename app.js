var Vue = require('vue'),
    router = require('config/config.router')

var App = Vue.extend({
    components:{
        layout: require('views/common/layout/layout')
    }
})
router.start(App, "#app")