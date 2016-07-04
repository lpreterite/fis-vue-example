var task = require('models/task.model')

module.exports = {
    name: "task_detail",
    template: __inline('detail.tpl'),
    data: function(){
        return {
            detail: task.default(),
            state: {
                ui: 'static'
            }
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
                    this.title = this.titleHandle
                    this.$nextTick(function(){
                        this.$els.input.focus()
                    })
                    break;
            }
        },
        save: function(){
            this.titleHandle = this.title
            task
                .save(this.detail)
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
    },
    computed:{
        titleHandle: {
            get: function(){
                var str_arr = []
                for (var i = 0; i < this.detail.tags.length; i++) {
                    str_arr.push("#"+ this.detail.tags[i].title +"#")
                }
                return str_arr.join(' ') + (str_arr.length > 0 ? " " : "") + this.detail.title
            },
            set: function(val){
                var title = val.replace(/#.*#/ig,'').trim(),
                    _tags = val.match(/#.[^#]*#/ig)

                if(_tags != null){
                    var tags = []
                    for (var i = 0; i < _tags.length; i++) {
                        tags.push({title: _tags[i].replace(/#/ig,'')})
                    }
                }
                this.detail.tags = tags
                this.detail.title = title
            }
        }
    }
}