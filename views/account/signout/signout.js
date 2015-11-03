var config = require('config'),
    $ = require('jquery'),
    cookies = require('cookies')

module.exports = {
    data: function(){
        $.getJSON(config.api() + 'signout.php').done(this.signout).fail(this.onError)
    },
    methods: {
        signout: function(){
            cookies.remove(config.cookies)
            this.$route.router.replace('/')
        },
        onError: function(e){
            console.log(e)
        }
    }
}