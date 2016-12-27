var task = require('models/task.model')

module.exports = {
    name: "taskItem",
    template: __inline('taskItem.tpl'),
    props: {
        data: {
            default: function(){
                return task.default()
            }
        },
        isNews:{
            default: true
        }
    },
    data: function(){
        return {
            title: '',
            state: {
                ui: 'display'
            }
        }
    },
    methods: {
        complete: function(){
            task
                .complete(this.data.id, this.data.complete)
                .then(function(){

                })
                .catch(function(){

                })
        },
        save: function(){
            var data = $.extend(this.data, task.dismantleTitle(this.title))
            task
                .save(data)
                .then(function(){
                    this.state.ui = 'display'
                    this.$emit('saved', this.data)
                }.bind(this))
                .catch(function(){

                })
        },
        delete: function(){
            if(!confirm('确定删除 ' + this.data.title + '吗？')) return;

            task
                .delete(this.data.id)
                .then(function(){
                    this.$emit('remove', this.data)
                }.bind(this))
                .catch(function(){

                })
        },
        render: function(state){
            switch(this.state.ui = state){
                case 'display':
                    break;
                case 'editing':
                    this.title = task.compoundTitile(this.data)
                    this.$nextTick(function(){
                        this.$els.input.focus()
                    })
                    break;
            }
            if(state == 'display'){
                this.$emit('display', state)
            }
        },
        clear: function(){
            this.data = task.default()
            this.title = this.titleHandle
        }
    },
    watch: {
        'data.complete': function(){
            this.complete()
        }
    }
}