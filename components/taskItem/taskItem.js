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
            this.titleHandle = this.title
            task
                .save(this.data)
                .then(function(){
                    this.state.ui = 'display'
                    this.$emit('saved', this.data)
                }.bind(this))
                .catch(function(){

                })
        },
        delete: function(){
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
                    this.title = this.titleHandle
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
    },
    computed:{
        titleHandle: {
            get: function(){
                var str_arr = []
                if(typeof this.data.tags != "undefined"){
                    for (var i = 0; i < this.data.tags.length; i++) {
                        str_arr.push("#"+ this.data.tags[i].title +"#")
                    }
                }
                return str_arr.join(' ') + (str_arr.length > 0 ? " " : "") + this.data.title
            },
            set: function(val){
                var title = val.replace(/#.*# /ig,''),
                    _tags = val.match(/#.[^#]*#/ig)

                if(_tags != null){
                    var tags = []
                    for (var i = 0; i < _tags.length; i++) {
                        tags.push({title: _tags[i].replace(/#/ig,'')})
                    }
                }
                this.data.tags = tags
                this.data.title = title
            }
        }
    }
}