var Model = require('/utils/model/restfulModel')

function Tag(){
    this.init({
        name: "tag",
        emulateIdKey: true
    })
}
Tag.prototype = Object.create(Model.prototype)
Tag.prototype.constructor = Tag;
Tag.prototype.default = function() {
    return {
        title: ""
    }
};
Tag.prototype.search = function(title) {
    return this.fetch({keyword:title, limit: 0})
};

module.exports = new Tag()