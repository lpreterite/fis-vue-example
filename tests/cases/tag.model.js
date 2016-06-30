var assert = require("base").assert;

var tag = require('/models/tag.model')

module.exports = function(){
    suite('tags', function(){

        test('fetch', function(){
            return assert.eventually.isArray(tag.fetch());
        });

        test('find', function(){
            return assert.eventually.property(tag.find(1), 'id');
        });
        
        test('create', function(){
            return assert.eventually.property(tag.save({
                title: "测试"
            }), 'id');
        });

        test('update', function(){
            return assert.eventually.property(tag.save({
                id: 3,
                title: "意念"
            }), 'id');
        });
        
        test('delete', function(){
            return assert.eventually.property(tag.delete(3), 'id');
        });
        
    });
}