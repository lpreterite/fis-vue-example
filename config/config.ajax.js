/**
 * Ajax Setting
 */
var $ = require('jquery')

$.ajaxSetup({
    error: function(XMLHttpRequest, textStatus, errorThrown){
        console.log(XMLHttpRequest)
        var router = require('config/config.router')
        if(XMLHttpRequest.status == 401) router.go('/account/signout')
    }
})

$.extend({
    save: function(url,data){
        var isNew = typeof data.id === "undefined";

        return $.ajax({
            url: isNew ? url : url + '/' + data.id,
            data: JSON.stringify(data),
            type: isNew ? 'post' : 'put',
            dataType: 'json',
            contentType: 'application/json',
            processData: false
        })
    },
    delete: function(url,id){
        return $.ajax({
            url: url + '/' + id,
            type: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            processData: false
        })
    },
    stripTags: function(str){
        return str.replace(/<[^>]+>/g,"")
    }
});
