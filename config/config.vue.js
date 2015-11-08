/**
 * Vue Setting
 */
var Vue = require('vue'),
    VueRouter = require('vue-router'),
    _ = require('underscore')

Vue.config.delimiters = ['{%', '%}']
Vue.config.debug = true

Vue.use(VueRouter)

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

Vue.filter('find', function(source, value, key){
    var key = typeof key == "undefined" ? 'id' : key
    return source.length <=0 ? {} : _.find(source, function(item){
        return item[key] == value
    })
})

Vue.filter('value', function(source, key){
    return source[key]
})

Vue.filter('stringify', function (source) {
  return JSON.stringify(source)
})

Vue.filter('active', function(link, path, activeClass){
    return path.indexOf(link) > -1 ? activeClass : ""
})