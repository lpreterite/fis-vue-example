var config = require('config'),
    cookies = require('cookies'),
    $ = require('jquery')

module.exports = {
    template: __inline('signin.tpl'),
    data: function(){
        return {
            form: {
                name: "",
                password: ""
            },
            message: ""
        }
    },
    methods: {
        signin: function(e){
            $.save(config.api() + 'signin.php', this.$data.form)
             .then(this.onSuccess,this.onError)

            e.preventDefault()
            return false
        },
        onSuccess: function(data){
            cookies.set(config.cookies,data)
            this.$route.router.replace('/account/user')
        },
        onError: function(e){
            this.message = "登录失败，账号和密码不正确！"
            console.log(e)
        }
    }
}