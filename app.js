require('config/config.ajax')

var Vue = require('vue'),
    router = require('config/config.router')

var App = new Vue({})
router.start(App, ".container-full")