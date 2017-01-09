var task = require('models/task.model')

module.exports = {
    name: "task_list",
    template: __inline('list.tpl'),
    data: function(){
        return {
            tasks: [],
            state: {
                ui: 'static'
            }
        }
    },
    route: {
        data: function(transition){

            setTimeout(function(){
                transition.next({
                    tasks: task.fetch()
                })
            }, 1000)

            // return {
            //     tasks: task.fetch()
            // }
        }
    },
    methods: {
        removeItem: function(task){
            this.tasks.$remove(task)
        },
        create: function(data){
            this.tasks.push(data)
            this.$refs.creator.clear()
            this.$refs.creator.render('editing')
        },
        render: function(state){
            var state = typeof state == "undefined" ? 'static' : state
            switch(this.state.ui = state){
                case 'static':
                    break;
                case 'create':
                    this.$refs.creator.render('editing')
                    break;
            }
        }
    },
    components: {
        taskItem: require('pages/index/components/taskItem')
    }
}