/**
 * Vue Setting
 */
var Vue = require('vue'),
    VueRouter = require('vue-router')

Vue.config.delimiters = ['{%', '%}'] //设置标示
Vue.config.debug = true

Vue.use(VueRouter) //注册VueRouter组件

Vue.filter('extract', function (source, text, value) {
  return source.map(function (item) {
    return {'text':item[text], 'value':item[value]}
  })
})

Vue.filter('values', function (source, valueName) {
  return source.map(function (item) {
    return item[valueName]
  })
})

Vue.filter('stringify', function (source) {
  return JSON.stringify(source)
})

Vue.filter('active', function(link, path, activeClass){
    return path.indexOf(link) > -1 ? activeClass : ""
})