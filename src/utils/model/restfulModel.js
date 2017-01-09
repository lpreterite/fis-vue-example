var Model = require('model')

var config = require('config'),
    Promise = require('bluebird')

function RestfulModel(name, emulateIdKey){
    this.init({
        name: name,
        emulateIdKey: emulateIdKey
    })
}
RestfulModel.prototype = Object.create(Model.prototype)
RestfulModel.prototype.constructor = RestfulModel;
RestfulModel.prototype.init = function(options) {
    if(typeof options !== "undefined"){
        if(typeof options.name !== "undefined") this.api(config.api() + '/' + options.name)
        if(typeof options.name !== "undefined") this._emulateIdKey = options.emulateIdKey
    }
};
RestfulModel.prototype.fetch = function(query) {
    return this.get(this.api() + '/search', query)
};
RestfulModel.prototype.find = function(id) {
    return this.get(this._getUrl(id), this._emulateIdKey ? {id: id} : undefined)
};
RestfulModel.prototype.save = function(data) {
    var isNew = this.isNew(data),
        url = isNew ? this.api() : this._getUrl(data.id),
        request = this.getRequestData(url, JSON.stringify(data), isNew ? 'post' : 'put')
    request.contentType = 'application/json'
    request.processData = false
    return this._sync(request)
};
RestfulModel.prototype.delete = function(id) {
    return this.get(this._getUrl(id), this._emulateIdKey ? {id: id} : undefined, 'delete')
};
RestfulModel.prototype.isNew = function(data) {
    return typeof data.id === "undefined";
};
RestfulModel.prototype._getUrl = function(id) {
    return this._emulateIdKey ? this.api() : this.api() + '/' + id
};
RestfulModel.prototype._api = ""
RestfulModel.prototype.api = function(val) {
    if(typeof val !== "undefined") this._api = val;
    else return this._api;
};
RestfulModel.prototype._emulateIdKey = false

module.exports = RestfulModel