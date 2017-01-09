/**
 * jquery extend
 */
require('jquery');
    stripTags: function(str){
        return str.replace(/<[^>]+>/g,"")
    }
});
