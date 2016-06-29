require('jquery')

var config = require('config'),
    Promise = require('promise')

function Model(){
    this.init()
}
Model.prototype.default = function() {
    return {}
};
Model.prototype.init = function(options) {

};
Model.prototype.post = function(url, query) {
    return this.sync(url, this.filterQuery(query), 'post')
};
Model.prototype.get = function(url, query) {
    return this.sync(url, this.filterQuery(query), 'get')
};
Model.prototype.getRequestData = function(url, query, type) {
    if(typeof url !== "String" && url.length <= 0) throw new Error('url must is String and not empty')
    return {
        url: url,
        data: query,
        type: type,
        dataType: 'json'
    }
};
Model.prototype.sync = function(url, query, type) {
    return this._sync(this.getRequestData(url, query, type))
}
Model.prototype._sync = function(options) {
    return new Promise(function(resolve, reject){
        var opt = $.extend(
            options,
            {
                success: resolve,
                error: reject
            }
        )
        $.ajax(opt)
    })
};
Model.prototype.filterQuery = function(query) {
    return query
};

module.exports = Model