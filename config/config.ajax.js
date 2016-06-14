/**
 * Ajax Setting
 */
require('jquery');
var expired = function(XMLHttpRequest){
        var router = require('config/config.router')
        if(XMLHttpRequest.status == 401) router.go('/account/signout')
    }

$.extend({
    fetch: function(url, data){
        return new Promise(function(resolve,reject){
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                type: 'get',
                success: function(data){
                    resolve(data)
                    return data
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    reject()
                    expired(XMLHttpRequest)
                }
            })
        })
    },
    save: function(url,data){
        var isNew = typeof data.id === "undefined";

        return new Promise(function(resolve,reject){ 
            $.ajax({
                url: isNew ? url : url + '/' + data.id,
                data: JSON.stringify(data),
                type: isNew ? 'post' : 'put',
                dataType: 'json',
                contentType: 'application/json',
                processData: false,
                success: function(data){
                    resolve(data)
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    reject(XMLHttpRequest)
                    expired(XMLHttpRequest)
                }
            })
        })
    },
    delete: function(url,id){
        return new Promise(function(resolve,reject){ 
            $.ajax({
                url: url + '/' + id,
                type: 'delete',
                dataType: 'json',
                success: function(data){
                    resolve(data)
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    reject(XMLHttpRequest)
                    expired(XMLHttpRequest)
                }
            })
        })
    },
    stripTags: function(str){
        return str.replace(/<[^>]+>/g,"")
    }
});
