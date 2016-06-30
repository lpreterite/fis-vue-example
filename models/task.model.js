var Model = require('/utils/model/restfulModel')

function Task(){
    this.init({
        name: "task",
        emulateIdKey: true
    })
}
Task.prototype = Object.create(Model.prototype)
Task.prototype.constructor = Task;
Task.prototype.default = function() {
    return {
        title: "",
        description: "",
        complete: false,
        tags: [],
        createAt: null,
        updateAt: null,
        deleteAt: null
    }
};
Task.prototype.complete = function(id, complete) {
    return this.save({id: id, complete: complete})
};
Task.prototype.search = function(title) {
    return this.fetch({keyword:title, limit: 0})
};

module.exports = new Task()