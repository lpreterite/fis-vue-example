"use strict";

import RestfulModel from '../utils/model/restfulModel';
import {api} from 'config';

class Task extends RestfulModel{
    constructor(){
        super('task', true, api());
    }
    defaults(){
        return {
            title: "",
            description: "",
            complete: false,
            tags: [],
            createAt: null,
            updateAt: null,
            deleteAt: null
        };
    }
    complete(id, complete){
        return this.save({id, complete});
    }
    search(title){
        return this.fetch({keyword: title, limit: 0});
    }
    fetch(query){
        return this.get(this.api + '/search', Object.assign({}, query));
    }
    compoundTitile(data){
        let str_arr = [];
        if(typeof data.tags != "undefined"){
            for (let i = 0; i < data.tags.length; i++) {
                str_arr.push("#"+ data.tags[i].title +"#");
            }
        }
        return str_arr.join(' ') + (str_arr.length > 0 ? " " : "") + data.title;
    }
    dismantleTitle(title){
        let tags = title.match(/#.[^#]*#/ig),
            result = {
                title: title.replace(/#.*#/ig,'').trim(),
                tags: []
            };

        if(tags !== null){
            for (let i = 0; i < tags.length; i++) {
                result.tags.push({title: tags[i].replace(/#/ig,'')});
            }
        }
        return result;
    }
}

export default new Task();