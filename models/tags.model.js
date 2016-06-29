var Model = require('/utils/model/restfulModel')

function Tags(){
    this.init({
        name: "tags",
        emulateIdKey: true
    })
}
Tags.prototype = Object.create(Model.prototype)
Tags.prototype.constructor = Tags;

module.exports = new Tags()