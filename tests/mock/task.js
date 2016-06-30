var model = {
    get: function(req){
        return {
            id: 1,
            title: "这是一个任务",
            description: "",
            complete: false,
            tags: [],
            createAt: 1467275476779,
            updateAt: null,
            deleteAt: null
        }
    },
    post: function(req){
        return Object.assign(req.body, {id: 1})
    },
    put: function(req){
        return req.body
    },
    delete: function(req){
        return req.query.id
    }
}

module.exports = function(req, res, next) {
    var action = model[req.method.toLowerCase()]
    res.end(JSON.stringify(action(req)));
};