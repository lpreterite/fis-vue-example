var task = require('models/task.model')

module.exports = {
    name: "task_list",
    template: __inline('list.tpl'),
    data: function(){
        return {
            tasks: []
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
        }
    },
    components: {
        taskItem: require('components/taskItem/taskItem')
    }
}