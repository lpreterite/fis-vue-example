var config = require('config'),
    $ = require('jquery'),
    cookies = require('cookies')

module.exports = {
    data: function(){
        $.fetch(config.api() + 'signout.php').then(this.signout,this.onError)
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