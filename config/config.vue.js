/**
 * Vue Setting
 */
var Vue = require('vue')

Vue.config.delimiters = ['{%', '%}']
Vue.config.debug = true

Vue.use(require('vue-animated-list'))

module.exports = Vue