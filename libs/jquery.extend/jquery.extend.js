var $ = require('jquery')

$.fn.extend({
    serializeObject:function(){
        var obj=new Object();  
        $.each(this.serializeArray(),function(index,param){  
            if(param.name in obj){
                if(typeof obj[param.name] === "string"){
                    var val = obj[param.name]
                    obj[param.name] = [val];
                }
                obj[param.name].push(param.value)
            }else{
                obj[param.name]=param.value;
            }
        });  
        return obj; 
    }
});

$.extend({
    stripTags: function(str){
        return str.replace(/<[^>]+>/g,"")
    }
});