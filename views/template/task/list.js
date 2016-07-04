var task = require('models/task.model')

module.exports = {
    name: "task_list",
    template: __inline('list.tpl'),
    data: function(){
        return {
            tasks: [],
            creature: task.default(),
            title: "",
            state: {
                ui: 'static'
            }
        }
    },
    route: {
        data: function(transition){
            return {
                tasks: task.fetch()
            }
        }
    },
    methods: {
        removeItem: function(task){
            this.tasks.$remove(task)
        },
        create: function(){
            this.titleHandle = this.title
            task
                .save(this.creature)
                .then(function(data){
                    this.add(data)
                    this.render('static')
                    this.creature = task.default()
                }.bind(this))
                .catch(function(){

                }.bind(this))
        },
        add: function(data){
            this.tasks.push(data)
        },
        render: function(state){
            var state = typeof state == "undefined" ? 'static' : state
            switch(this.state.ui = state){
                case 'static':
                    this.title = ""
                    break;
                case 'create':
                    this.title = this.titleHandle
                    this.$nextTick(function(){
                        this.$els.input.focus()
                    })
                    break;
            }
        }
    },
    computed:{
        titleHandle: {
            get: function(){
                var str_arr = []
                for (var i = 0; i < this.creature.tags.length; i++) {
                    str_arr.push("#"+ this.creature.tags[i].title +"#")
                }
                return str_arr.join(' ') + (str_arr.length > 0 ? " " : "") + this.creature.title
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
                this.creature.tags = tags
                this.creature.title = title
            }
        }
    },
    components: {
        taskItem: require('components/taskItem/taskItem')
    }
}