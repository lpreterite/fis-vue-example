var config = require('config'),
    cookies = require('cookies'),
    rules = {
        signin: function(){
            return !!cookies.get(config.cookies)
        }
    }

module.exports = {
    auth: function(ruleName){
        return rules[ruleName].call(this)
    }
}