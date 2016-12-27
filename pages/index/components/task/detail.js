var task = require('models/task.model')

module.exports = {
    name: "task_detail",
    template: __inline('detail.tpl'),
    data: function(){
        return {
            detail: task.default(),
            state: {
                ui: 'static'
            },
            title: ""
        }
    },
    route: {
        data: function(){
            return {
                detail: task.find(this.$route.params.id)
            }
        }
    },
    methods:{
        render: function(state){
            switch(this.state.ui = state){
                case 'static':
                    break;
                case 'editing':
                    this.title = task.compoundTitile(this.detail)
                    this.$nextTick(function(){
                        this.$els.input.focus()
                    })
                    break;
            }
        },
        save: function(){
            var data = $.extend(this.detail, task.dismantleTitle(this.title))
            task
                .save(data)
                .then(function(){
                    this.render('static')
                }.bind(this))
                .catch(function(){

                }.bind(this))
        },
        delete: function(){
            if(!confirm('确定删除 ' + this.detail.title + '吗？')) return;

            task
                .delete(this.detail.id)
                .then(function(){
                    this.$route.router.go({name: 'index'})
                }.bind(this))
                .catch(function(){

                }.bind(this))
        }
    }
}