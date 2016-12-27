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
Task.prototype.compoundTitile = function(data) {
    var str_arr = []
    if(typeof data.tags != "undefined"){
        for (var i = 0; i < data.tags.length; i++) {
            str_arr.push("#"+ data.tags[i].title +"#")
        }
    }
    return str_arr.join(' ') + (str_arr.length > 0 ? " " : "") + data.title
};
Task.prototype.dismantleTitle = function(title) {
    var tags = title.match(/#.[^#]*#/ig),
        result = {
            title: title.replace(/#.*#/ig,'').trim(),
            tags: []
        }

    if(tags != null){
        for (var i = 0; i < tags.length; i++) {
            result.tags.push({title: tags[i].replace(/#/ig,'')})
        }
    }
    return result
};

module.exports = new Task()